import { GoogleGenAI } from "@google/genai";
import { SearchResult } from "../types";
import { extractDataFromJson, extractSources } from "../utils/helpers";

export const generateIntegratedMarketReport = async (
  niche: string
): Promise<SearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = `
    Act as a senior global sourcing agent and market analyst. I need a comprehensive report for the niche: "${niche}".
    
    Phase 1: Market Intelligence
    - Identify the overall market status.
    - Find 3 key trends driving demand right now.
    
    Phase 2: Product Identification
    - Find 5-7 high-demand, hot-selling products in this niche.
    
    Phase 3: Deep Sourcing (DIRECTLY INSIDE REPORT)
    - For EVERY product identified, use Google Search to find 2-3 real, high-quality suppliers, manufacturers, or vetted wholesalers.
    - Look for direct manufacturers or top-tier wholesale platforms.
    - Estimate a quality score (1-100) based on market reputation and certifications found.

    OUTPUT FORMAT:
    Provide a brief professional introduction.
    Then, provide the data strictly in a JSON block with the following structure:
    {
      "analysis": {
        "niche": "string",
        "overview": "string (markdown allowed)",
        "keyTrends": ["string"],
        "competitiveLandscape": "string"
      },
      "products": [
        {
          "name": "string",
          "description": "string",
          "targetPrice": "string",
          "trendingReason": "string",
          "category": "string",
          "demandLevel": "Low|Medium|High|Explosive",
          "suppliers": [
            {
              "name": "string",
              "type": "Manufacturer|Wholesaler|Trading Company|Dropshipper",
              "location": "string",
              "specialty": "string",
              "estimatedQualityScore": number,
              "url": "string (direct link if found)"
            }
          ]
        }
      ]
    }
    
    Wrap the JSON in \`\`\`json blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const extracted = extractDataFromJson(text);

    if (!extracted) {
      throw new Error("Could not extract structured report data.");
    }

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = extractSources(groundingChunks);

    return {
      analysis: extracted.analysis,
      products: extracted.products,
      sources,
    };
  } catch (error) {
    console.error("Gemini Report Error:", error);
    throw error;
  }
};
