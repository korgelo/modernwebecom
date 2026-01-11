import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find the Best Tech Deals on Suyooh – Laptops, Headsets & Gadgets",
  description:
    "Discover the best tech deals on Suyooh. Find discounted laptops, gadgets, accessories, and electronics—all curated to help you save more.",
  alternates: {
    canonical: "https://www.suyooh.com/deal",
  },
  openGraph: {
    title: "Find the Best Tech Deals on Suyooh – Laptops, Headsets & Gadgets",
    description:
      "Discover the best tech deals on Suyooh. Find discounted laptops, gadgets, accessories, and electronics—all curated to help you save more.",
    url: "https://www.suyooh.com/deal",
    siteName: "Suyooh",
    images: [
      {
        url: "/assets/images/suyoohdeal.jpg",
        width: 1200,
        height: 630,
        alt: "Suyooh Deals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best Tech Deals on Suyooh",
    description:
      "Discover curated tech deals—laptops, headsets, accessories and more.",
  },
};

export default function DealLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
