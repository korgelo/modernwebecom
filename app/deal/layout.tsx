import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Find the Best Tech Deals on Suyooh – Laptops, Headsets & Gadgets",
    description:
      "Discover the best tech deals on Suyooh. Find discounted laptops, gadgets, accessories, and electronics—all curated to help you save more.",
    alternates: {
      canonical: "https://www.suyooh.com/deal",
    },
  };
}
