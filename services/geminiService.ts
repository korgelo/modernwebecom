import { SearchResult } from "@/types";

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
  inputs: string
): Promise<SearchResult> => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate listing");
  }

  return res.json();
};
