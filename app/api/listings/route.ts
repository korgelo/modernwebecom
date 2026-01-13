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
      ON CONFLICT (asin) DO NOTHING
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

    const result = await query(insertQuery, params);

    // Check if a row was inserted or if it was a conflict
    if (result.length === 0) {
      // This case means the ASIN already existed, and we did nothing.
      // We can consider this a "soft" success, as the data is in the DB.
      // We'll return the original listing data and mark it as saved.
      return NextResponse.json({ ...listing, isSaved: true });
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
