"use server";

import { query } from "@/lib/db";
import { ProductListing } from "@/types";
import { revalidatePath } from "next/cache";

export async function addOrUpdateListing(listing: ProductListing) {
  const {
    id,
    slug,
    title,
    excerpt,
    category,
    date,
    featuredImage,
    content,
    product,
  } = listing;

  const productJson = JSON.stringify({
    name: product.name,
    brand: product.brand,
    price: product.price,
    rating: product.rating,
    specs: product.specs,
    pros: product.pros,
    cons: product.cons,
    amazonLink: product.amazonLink,
    imageUrl: product.imageUrl,
  });

  const sql = `
    INSERT INTO product_listings (
      asin, slug, title, excerpt, category, publish_date, featured_image, content, product_details
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    )
    ON CONFLICT (asin) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content,
      product_details = EXCLUDED.product_details,
      updated_at = NOW()
    RETURNING *;
  `;

  try {
    const result = await query(sql, [
      id,
      slug,
      title,
      excerpt,
      category,
      date,
      featuredImage,
      content,
      productJson,
    ]);
    revalidatePath("/scraper");
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Database error in addOrUpdateListing:", error);
    return { success: false, error: "Failed to save listing to the database." };
  }
}

export async function getListings() {
  try {
    const listings = await query("SELECT * FROM product_listings ORDER BY created_at DESC", []);
    return listings;
  } catch (error) {
    console.error("Database error in getListings:", error);
    return [];
  }
}
