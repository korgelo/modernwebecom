import { Product, Source, MarketAnalysis } from "../types";
import { generateAmazonSearchUrl } from "./affiliateManager";

export const extractDataFromJson = (
  text: string
): { products: Product[]; analysis: MarketAnalysis } | null => {
  try {
    const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonBlockRegex);

    let jsonString = "";
    if (match && match[1]) {
      jsonString = match[1];
    } else {
      const fallbackRegex = /\{\s*"analysis"[\s\S]*\}\s*/;
      const fallbackMatch = text.match(fallbackRegex);
      if (fallbackMatch) {
        jsonString = fallbackMatch[0];
      }
    }

    if (!jsonString) return null;

    const parsed = JSON.parse(jsonString);

    const products = (parsed.products || []).map((item: any, index: number) => {
      const category = item.category || "General";
      const productName = item.name || "Unknown Product";

      return {
        id: `prod-${Date.now()}-${index}`,
        name: productName,
        description: item.description || "",
        targetPrice: item.targetPrice || "N/A",
        trendingReason: item.trendingReason || "",
        category,
        demandLevel: item.demandLevel || "Medium",
        // High-intent: Generate search link for every product found
        affiliateUrl: generateAmazonSearchUrl(productName),
        suppliers: (item.suppliers || []).map((s: any) => ({
          name: s.name || "Unknown Supplier",
          type: s.type || "Wholesaler",
          location: s.location || "Global",
          specialty: s.specialty || "General Sourcing",
          estimatedQualityScore: s.estimatedQualityScore || 70,
          url: s.url || "",
        })),
      };
    });

    const analysis: MarketAnalysis = {
      niche: parsed.analysis?.niche || "Current Niche",
      overview: parsed.analysis?.overview || "No overview available.",
      keyTrends: parsed.analysis?.keyTrends || [],
      competitiveLandscape:
        parsed.analysis?.competitiveLandscape || "No landscape data.",
    };

    return { products, analysis };
  } catch (e) {
    console.error("Failed to parse market JSON:", e);
    return null;
  }
};

export const extractSources = (groundingChunks: any[] = []): Source[] => {
  const sources: Source[] = [];
  if (!groundingChunks || !Array.isArray(groundingChunks)) return sources;

  groundingChunks.forEach((chunk) => {
    if (chunk.web) {
      sources.push({
        title: chunk.web.title || "Web Source",
        uri: chunk.web.uri,
      });
    }
  });

  const uniqueSources = new Map();
  sources.forEach((s) => uniqueSources.set(s.uri, s));
  return Array.from(uniqueSources.values());
};
