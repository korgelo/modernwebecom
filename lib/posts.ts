import { unstable_cache } from "next/cache";
import { query } from "./db";
import { DbPost, DbProduct, mapDbPostToPost } from "./db-types";
import { Post, Category } from "@/types";

const CACHE_REVALIDATE_SECONDS = 60;

async function fetchAllPostsFromDb(): Promise<Post[]> {
  const [posts, products, compareProducts] = await Promise.all([
    query<DbPost>(`
    SELECT id, slug, title, description, content, category, date, 
           featured_image, featured, created_at, updated_at
    FROM posts
    ORDER BY created_at DESC
  `),
    query<DbProduct>(`
    SELECT id, post_id, name, brand, price, rating, amazon_link, 
           image_url, specs, pros, cons
    FROM products
  `),
    query<DbProduct>(`
    SELECT id, post_id, name, brand, price, rating, amazon_link, 
           image_url, specs, pros, cons
    FROM compare_products
  `),
  ]);

  const productMap = new Map<string, DbProduct>();
  for (const product of products) {
    productMap.set(product.post_id, product);
  }

  const compareProductMap = new Map<string, DbProduct>();
  for (const product of compareProducts) {
    compareProductMap.set(product.post_id, product);
  }

  return posts.map((post) =>
    mapDbPostToPost(
      post,
      productMap.get(post.id),
      compareProductMap.get(post.id)
    )
  );
}

export const getAllPosts = unstable_cache(fetchAllPostsFromDb, ["all-posts"], {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: ["posts"],
});

async function fetchPostBySlugFromDb(slug: string): Promise<Post | null> {
  const posts = await query<DbPost>(
    `SELECT id, slug, title, description, content, category, date, 
            featured_image, featured, created_at, updated_at
     FROM posts WHERE slug = $1`,
    [slug]
  );

  if (posts.length === 0) {
    return null;
  }

  const post = posts[0];

  const [products, compareProducts] = await Promise.all([
    query<DbProduct>(
      `SELECT id, post_id, name, brand, price, rating, amazon_link, 
            image_url, specs, pros, cons
     FROM products WHERE post_id = $1`,
      [post.id]
    ),
    query<DbProduct>(
      `SELECT id, post_id, name, brand, price, rating, amazon_link, 
            image_url, specs, pros, cons
     FROM compare_products WHERE post_id = $1`,
      [post.id]
    ),
  ]);

  return mapDbPostToPost(
    post,
    products[0] || undefined,
    compareProducts[0] || undefined
  );
}

export const getPostBySlug = unstable_cache(
  fetchPostBySlugFromDb,
  ["post-by-slug"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["posts"] }
);

async function fetchPostsByCategoryFromDb(category: Category): Promise<Post[]> {
  const posts = await query<DbPost>(
    `SELECT id, slug, title, description, content, category, date, 
            featured_image, featured, created_at, updated_at
     FROM posts WHERE category = $1
     ORDER BY created_at DESC`,
    [category]
  );

  const postIds = posts.map((p) => p.id);
  if (postIds.length === 0) {
    return [];
  }

  const [products, compareProducts] = await Promise.all([
    query<DbProduct>(
      `SELECT id, post_id, name, brand, price, rating, amazon_link, 
            image_url, specs, pros, cons
     FROM products WHERE post_id = ANY($1)`,
      [postIds]
    ),
    query<DbProduct>(
      `SELECT id, post_id, name, brand, price, rating, amazon_link, 
            image_url, specs, pros, cons
     FROM compare_products WHERE post_id = ANY($1)`,
      [postIds]
    ),
  ]);

  const productMap = new Map<string, DbProduct>();
  for (const product of products) {
    productMap.set(product.post_id, product);
  }

  const compareProductMap = new Map<string, DbProduct>();
  for (const product of compareProducts) {
    compareProductMap.set(product.post_id, product);
  }

  return posts.map((post) =>
    mapDbPostToPost(
      post,
      productMap.get(post.id),
      compareProductMap.get(post.id)
    )
  );
}

export const getPostsByCategory = unstable_cache(
  fetchPostsByCategoryFromDb,
  ["posts-by-category"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["posts"] }
);

async function fetchFeaturedPostFromDb(): Promise<Post | null> {
  const posts = await query<DbPost>(
    `SELECT id, slug, title, description, content, category, date, 
            featured_image, featured, created_at, updated_at
     FROM posts WHERE featured = true
     ORDER BY created_at DESC
     LIMIT 1`
  );

  if (posts.length === 0) {
    const allPosts = await query<DbPost>(
      `SELECT id, slug, title, description, content, category, date, 
              featured_image, featured, created_at, updated_at
       FROM posts
       ORDER BY created_at DESC
       LIMIT 1`
    );
    if (allPosts.length === 0) {
      return null;
    }
    const post = allPosts[0];
    const products = await query<DbProduct>(
      `SELECT id, post_id, name, brand, price, rating, amazon_link, 
              image_url, specs, pros, cons
       FROM products WHERE post_id = $1`,
      [post.id]
    );
    return mapDbPostToPost(post, products[0] || undefined);
  }

  const post = posts[0];
  const products = await query<DbProduct>(
    `SELECT id, post_id, name, brand, price, rating, amazon_link, 
            image_url, specs, pros, cons
     FROM products WHERE post_id = $1`,
    [post.id]
  );

  return mapDbPostToPost(post, products[0] || undefined);
}

export const getFeaturedPost = unstable_cache(
  fetchFeaturedPostFromDb,
  ["featured-post"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: ["posts"] }
);

export async function getPostCountByCategory(
  category: Category
): Promise<number> {
  try {
    const result = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM posts WHERE category = $1`,
      [category]
    );
    return parseInt(result[0]?.count || "0", 10);
  } catch (error) {
    console.warn(`Failed to get post count for category "${category}":`, error);
    return 0;
  }
}
