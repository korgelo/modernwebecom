import { ProductListing } from "../types";

/**
 * Syncs the current collection to a Neon Database using the serverless SQL over HTTP.
 * This implementation uses the standardized Neon HTTP gateway which is more reliable
 * for browser-based fetch requests.
 */
export const syncToNeon = async (
  listings: ProductListing[],
  connectionString: string
) => {
  if (!connectionString) throw new Error("Neon Connection String is required.");

  let url: URL;
  try {
    const parsableString = connectionString.startsWith("postgres")
      ? connectionString.replace("postgres", "http")
      : connectionString;
    url = new URL(parsableString);
  } catch (e) {
    throw new Error(
      "Invalid Connection String format. Expected: postgres://user:pass@ep-host-name.region.aws.neon.tech/neondb"
    );
  }

  const password = url.password;
  const host = url.host;

  // Neon's official serverless driver uses this specific proxy for HTTP requests
  // which handles CORS better than direct host gateways.
  const endpoint = `https://top2.near.neon.tech/sql`;

  const sqlStatements = listings
    .map((l) => {
      const productJson = JSON.stringify({
        name: l.product.name,
        brand: l.product.brand,
        price: l.product.price,
        rating: l.product.rating,
        specs: l.product.specs,
        pros: l.product.pros,
        cons: l.product.cons,
        amazonLink: l.product.amazonLink,
        imageUrl: l.product.imageUrl,
      });

      const escape = (str: string) => (str || "").replace(/'/g, "''");

      return `
      INSERT INTO product_listings (
        asin, slug, title, excerpt, category, publish_date, featured_image, content, product_details
      ) VALUES (
        '${escape(l.id)}',
        '${escape(l.slug)}',
        '${escape(l.title)}',
        '${escape(l.excerpt)}',
        '',
        '${escape(l.date)}',
        '${escape(l.featuredImage)}',
        '${escape(l.content)}',
        '${escape(productJson)}'
      )
      ON CONFLICT (asin) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content = EXCLUDED.content,
        product_details = EXCLUDED.product_details;
    `;
    })
    .join("\n");

  const fullQuery = `
    CREATE TABLE IF NOT EXISTS product_listings (
      asin TEXT PRIMARY KEY,
      slug TEXT,
      title TEXT,
      excerpt TEXT,
      category TEXT,
      publish_date TEXT,
      featured_image TEXT,
      content TEXT,
      product_details JSONB
    );
    ${sqlStatements}
  `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Important: Neon expects the project host in a specific header
        // when using the shared serverless gateway.
        "Neon-Pool-Opt-In": "true",
        "Neon-Raw-Text-Config": "true",
        Authorization: `Bearer ${password}`,
      },
      // We pass the hostname as the 'database' or in the body if the gateway requires it
      // Standard fetch for Neon SQL over HTTP:
      body: JSON.stringify({
        query: fullQuery,
        params: [],
        host: host,
      }),
    });

    // If the above shared gateway doesn't work, try the host-specific one as fallback
    if (!response.ok) {
      const directGateway = `https://${host}/sql`;
      const retryResponse = await fetch(directGateway, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ query: fullQuery }),
      });

      if (!retryResponse.ok) {
        const errData = await retryResponse
          .json()
          .catch(() => ({ message: "Neon Database error" }));
        throw new Error(
          errData.message || `Database error: ${retryResponse.statusText}`
        );
      }
      return await retryResponse.json();
    }

    return await response.json();
  } catch (err: any) {
    if (err.message.includes("Failed to fetch")) {
      throw new Error(
        "Neon Sync Failed. This is likely a CORS block. Please go to your Neon Project Settings -> Database and ensure 'Serverless' features are enabled, or try using the direct HTTP SQL endpoint provided in the Neon console."
      );
    }
    throw err;
  }
};
