import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { extractDataFromJson, extractSources } from "@/utils/helpers";
import { ProductListing, FormInputs } from "@/types";

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const model = "gemini-3-flash-preview";

    const prompt = `
    Act as a senior global sourcing agent and market analyst. I need a comprehensive report for the niche: "${niche}".
    
    Phase 1: Market Intelligence
    - Identify the overall market status.
    - Find 3 key trends driving demand right now.
    
    Phase 2: Product Identification
    - Find 5-7 high-demand, hot-selling products in this niche.
    - IMPORTANT: When assigning a category, try to use one of these standard segments if relevant: 
      Accessories & Supplies, Camera & Photo, Car & Vehicle Electronics, Cell Phones & Accessories, Computers & Accessories, Headphones, Home Audio, Office Electronics, Security & Surveillance, Television & Video, Video Game Consoles, Wearable Technology, Computer Components, Monitors, Networking Products, Printers, Smart Home Lighting, Security Cameras and Systems, Smart Pet, Home Entertainment, Kitchen, Vacuums and Mops, Lawn and Garden.
    
    Phase 3: Editorial Content Rules
    - Write product descriptions that feel human-written and editorial.
    - Focus on benefits and real-world utility.
    - Do NOT over-link; use anchor text that targets high-intent keywords naturally.
    - Do NOT highlight specific prices in the description text.
    
    Phase 4: Deep Sourcing
    - For EVERY product identified, find 2-3 high-quality real suppliers.
    - Provide direct links if found via Google Search grounding.

    OUTPUT FORMAT:
    Provide a professional introduction.
    Then, provide the data strictly in a JSON block:
    {
      "analysis": {
        "niche": "string",
        "overview": "string",
        "keyTrends": ["string"],
        "competitiveLandscape": "string"
      },
      "products": [
        {
          "name": "string",
          "description": "string (Benefit-based, human-written style)",
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
              "url": "string"
            }
          ]
        }
      ]
    }
    
    Wrap the JSON in \`\`\`json blocks.
  `;

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
      return NextResponse.json(
        { error: "Failed to extract structured data" },
        { status: 500 }
      );
    }

    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    const sources = extractSources(groundingChunks);

    return NextResponse.json({
      analysis: extracted.analysis,
      products: extracted.products,
      sources,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Gemini request failed" },
      { status: 500 }
    );
  }
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const scrapeAndGenerateListing = async (
  inputs: FormInputs
): Promise<Partial<ProductListing>> => {
  const prompt = `
    Using Google Search grounding, extract product details from this Amazon URL: ${inputs.sourceLink}
    
    Act as a senior affiliate SEO manager. Generate the following metadata for a high-converting product review page.
    
    FIELDS TO GENERATE:
    - id: The exact Amazon ASIN (Product ID).
    - title: An optimized, SEO-friendly product title for a blog.
    - slug: A URL-friendly version of the title (lowercase, hyphens).
    - excerpt: A persuasive meta description (formerly description).
    - category: The product niche.
    - content: A long marketing description in HTML (<p>, <strong> tags).
    
    - product object:
        - name: The specific product name.
        - brand: The brand name.
        - price: Current price as a STRING WITH $ SIGN (e.g., "$29.99").
        - rating: Rating out of 5.
        - specs: Array of objects with "label" (e.g., "Weight") and "value" (e.g., "1.2 lbs").
        - pros: Array of 4-5 strings.
        - cons: Array of 2-3 strings.
    - originalPrice: MSRP as a number.
    - reviews: Total review count.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          slug: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          category: { type: Type.STRING },
          content: { type: Type.STRING },
          product: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              brand: { type: Type.STRING },
              price: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              specs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                  },
                  required: ["label", "value"],
                },
              },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: [
              "name",
              "brand",
              "price",
              "rating",
              "specs",
              "pros",
              "cons",
            ],
          },
          originalPrice: { type: Type.NUMBER },
          reviews: { type: Type.INTEGER },
        },
        required: [
          "id",
          "title",
          "slug",
          "excerpt",
          "category",
          "content",
          "product",
          "originalPrice",
          "reviews",
        ],
      },
    },
  });

  const text = response.text?.trim();
  if (!text) throw new Error("AI failed to extract data from the link.");

  return JSON.parse(text);
};
