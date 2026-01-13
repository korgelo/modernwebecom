import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(connectionString);

async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS product_listings (
        id SERIAL PRIMARY KEY,
        asin TEXT UNIQUE NOT NULL,
        slug TEXT,
        title TEXT,
        excerpt TEXT,
        category TEXT,
        publish_date TEXT,
        featured_image TEXT,
        content TEXT,
        product_details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table 'product_listings' created or already exists.");
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

setupDatabase();
