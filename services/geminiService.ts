import { SearchResult, ProductListing, FormInputs } from "@/types";

export const saveListing = async (
  listing: ProductListing
): Promise<ProductListing> => {
  const res = await fetch("/api/listings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(listing),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to save listing");
  }

  return res.json();
};

export const generateIntegratedMarketReport = async (
  niche: string
): Promise<SearchResult> => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ niche }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate market report");
  }

  return res.json();
};

export const scrapeAndGenerateListing = async (
  inputs: FormInputs
): Promise<Partial<ProductListing>> => {
  const res = await fetch("/api/gemini/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });

  if (!res.ok) {
    throw new Error("Failed to generate listing");
  }

  return res.json();
};
