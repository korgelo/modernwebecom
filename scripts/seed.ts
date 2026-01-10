import { neon } from "@neondatabase/serverless";
import { MOCK_POSTS, TRENDING_POSTS, SITE_NAME, AFFILIATE_DISCLAIMER } from "../constants";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = neon(connectionString);

async function seed() {
  console.log("Starting database seed...");

  try {
    console.log("Inserting site settings...");
    await sql`
      INSERT INTO site_settings (key, value) 
      VALUES ('SITE_NAME', ${SITE_NAME}), ('AFFILIATE_DISCLAIMER', ${AFFILIATE_DISCLAIMER})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;

    console.log("Inserting trending posts...");
    for (const post of TRENDING_POSTS) {
      await sql`
        INSERT INTO trending_posts (id, title, short_title, slug, description, key_insight, category, cta_text)
        VALUES (${post.id}, ${post.title}, ${post.shortTitle}, ${post.slug}, ${post.description}, ${post.keyInsight}, ${post.category}, ${post.ctaText})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          short_title = EXCLUDED.short_title,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          key_insight = EXCLUDED.key_insight,
          category = EXCLUDED.category,
          cta_text = EXCLUDED.cta_text
      `;
    }
    console.log(`Inserted ${TRENDING_POSTS.length} trending posts`);

    console.log("Inserting posts and products...");
    for (const post of MOCK_POSTS) {
      await sql`
        INSERT INTO posts (id, slug, title, description, content, category, date, featured_image, featured)
        VALUES (${post.id}, ${post.slug}, ${post.title}, ${post.description}, ${post.content}, ${post.category}, ${post.date}, ${post.featuredImage}, ${post.featured || false})
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          content = EXCLUDED.content,
          category = EXCLUDED.category,
          date = EXCLUDED.date,
          featured_image = EXCLUDED.featured_image,
          featured = EXCLUDED.featured,
          updated_at = NOW()
      `;

      if (post.product) {
        const specs = JSON.stringify(post.product.specs);
        await sql`
          INSERT INTO products (post_id, name, brand, price, rating, amazon_link, image_url, specs, pros, cons)
          VALUES (${post.id}, ${post.product.name}, ${post.product.brand}, ${post.product.price}, ${post.product.rating}, ${post.product.amazonLink}, ${post.product.imageUrl}, ${specs}::jsonb, ${post.product.pros}, ${post.product.cons})
          ON CONFLICT (post_id) DO UPDATE SET
            name = EXCLUDED.name,
            brand = EXCLUDED.brand,
            price = EXCLUDED.price,
            rating = EXCLUDED.rating,
            amazon_link = EXCLUDED.amazon_link,
            image_url = EXCLUDED.image_url,
            specs = EXCLUDED.specs,
            pros = EXCLUDED.pros,
            cons = EXCLUDED.cons
        `;
      }

      if (post.compareWith) {
        const specs = JSON.stringify(post.compareWith.specs);
        await sql`
          INSERT INTO compare_products (post_id, name, brand, price, rating, amazon_link, image_url, specs, pros, cons)
          VALUES (${post.id}, ${post.compareWith.name}, ${post.compareWith.brand}, ${post.compareWith.price}, ${post.compareWith.rating}, ${post.compareWith.amazonLink}, ${post.compareWith.imageUrl}, ${specs}::jsonb, ${post.compareWith.pros}, ${post.compareWith.cons})
          ON CONFLICT (post_id) DO UPDATE SET
            name = EXCLUDED.name,
            brand = EXCLUDED.brand,
            price = EXCLUDED.price,
            rating = EXCLUDED.rating,
            amazon_link = EXCLUDED.amazon_link,
            image_url = EXCLUDED.image_url,
            specs = EXCLUDED.specs,
            pros = EXCLUDED.pros,
            cons = EXCLUDED.cons
        `;
      }
    }
    console.log(`Inserted ${MOCK_POSTS.length} posts with products`);

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
