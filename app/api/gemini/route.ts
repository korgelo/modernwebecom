import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { extractDataFromJson, extractSources } from "@/utils/helpers";

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
