import { NextResponse } from "next/server";
import { ProductListing } from "@/types";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const listing: ProductListing = await req.json();

    // Basic validation
    if (!listing || !listing.id) {
      return NextResponse.json(
        { error: "Invalid product listing data provided." },
        { status: 400 }
      );
    }

    const {
      id: asin,
      slug,
      title,
      excerpt,
      category,
      date: publish_date,
      featuredImage: featured_image,
      content,
      product: product_details,
    } = listing;

    const insertQuery = `
      INSERT INTO product_listings (
        asin, slug, title, excerpt, category, publish_date, featured_image, content, product_details
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (asin) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        category = EXCLUDED.category,
        publish_date = EXCLUDED.publish_date,
        featured_image = EXCLUDED.featured_image,
        content = EXCLUDED.content,
        product_details = EXCLUDED.product_details,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const params = [
      asin,
      slug,
      title,
      excerpt,
      category,
      publish_date,
      featured_image,
      content,
      JSON.stringify(product_details),
    ];

    const result = await query<{ id: number }>(insertQuery, params);

    // With ON CONFLICT DO UPDATE, we should always get a result back.
    if (result.length === 0) {
      return NextResponse.json(
        { error: "Database operation failed to return a result." },
        { status: 500 }
      );
    }

    const savedListing = result[0];

    return NextResponse.json({
      ...listing,
      isSaved: true,
      dbId: savedListing.id,
    });
  } catch (err) {
    console.error("API route error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json(
      { error: `Failed to save listing: ${errorMessage}` },
      { status: 500 }
    );
  }
}
