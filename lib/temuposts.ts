import { neon } from "@neondatabase/serverless";
import { temuPost, temuProduct, Category } from "@/types";

const sql = neon(process.env.DATABASE_URL!);

// Helper function to map DB row to temuPost
function mapRowToPost(row: any): temuPost {
  // Map DB fields to temuProduct
  let product: temuProduct | undefined = undefined;

  if (row.product_name) {
    product = {
      name: row.product_name,
      brand: row.brand,
      price: row.price,
      rating: Number(row.rating),
      ratingCount: Number(row.ratingcount),
      specs: row.specs || [],
      pros: row.pros || [],
      cons: row.cons || [],
      temuLink: row.temu_link,
      imageUrl: row.product_image_url,
    };
  }

  // Map DB fields to temuPost
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    category: row.category as Category,
    date: row.date,
    featuredImage: row.featured_image,
    featured: row.featured,
    product: product,
  };
}

export async function getAllPosts(): Promise<temuPost[]> {
  const posts = await sql`
    SELECT 
      tp.id, tp.slug, tp.title, tp.description, tp.content, tp.category, tp.date, tp.featured_image, tp.featured,
      tprod.name as product_name, tprod.brand, tprod.price, tprod.rating, tprod.ratingcount, 
      tprod.temu_link, tprod.image_url as product_image_url, tprod.specs, tprod.pros, tprod.cons
    FROM temuposts tp
    LEFT JOIN temuproducts tprod ON tp.id = tprod.post_id
  `;

  return posts.map(mapRowToPost);
}

export async function getPostBySlug(slug: string): Promise<temuPost | null> {
  const posts = await sql`
    SELECT 
      tp.id, tp.slug, tp.title, tp.description, tp.content, tp.category, tp.date, tp.featured_image, tp.featured,
      tprod.name as product_name, tprod.brand, tprod.price, tprod.rating, tprod.ratingcount, 
      tprod.temu_link, tprod.image_url as product_image_url, tprod.specs, tprod.pros, tprod.cons
    FROM temuposts tp
    LEFT JOIN temuproducts tprod ON tp.id = tprod.post_id
    WHERE tp.slug = ${slug}
    LIMIT 1
  `;

  if (posts.length === 0) {
    return null;
  }

  return mapRowToPost(posts[0]);
}

export async function getPostsByCategory(category: Category): Promise<temuPost[]> {
  const posts = await sql`
    SELECT 
      tp.id, tp.slug, tp.title, tp.description, tp.content, tp.category, tp.date, tp.featured_image, tp.featured,
      tprod.name as product_name, tprod.brand, tprod.price, tprod.rating, tprod.ratingcount, 
      tprod.temu_link, tprod.image_url as product_image_url, tprod.specs, tprod.pros, tprod.cons
    FROM temuposts tp
    LEFT JOIN temuproducts tprod ON tp.id = tprod.post_id
    WHERE tp.category = ${category}
  `;

  return posts.map(mapRowToPost);
}