import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
import { ProductListing, FormInputs } from "@/types";

export async function POST(req: Request) {
  try {
    const inputs: FormInputs = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

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
    if (!text) return NextResponse.json({ error: "AI failed to extract data" }, { status: 500 });

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Scrape route error:", err);
    return NextResponse.json({ error: (err as any).message || "Scrape failed" }, { status: 500 });
  }
}
