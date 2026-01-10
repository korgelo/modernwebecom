import { neon } from "@neondatabase/serverless";

function getConnectionString(): string {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return connectionString;
}

export type QueryResult<T> = T[];

export async function query<T>(
  queryText: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const sql = neon(getConnectionString());
  try {
    const result = await sql.query(queryText, params || []);
    return result as QueryResult<T>;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error(
      `Database query failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
