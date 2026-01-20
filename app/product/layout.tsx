import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Amazon Best Seller Electronics – Best Tech Deals Right Now",
  description:
    "Shop Amazon’s best-selling electronics in one place. These top-rated gadgets are trending for a reason—excellent performance, strong reviews, and unbeatable value — whether you’re upgrading your setup or buying your next must-have device.",
  alternates: {
    canonical: "https://www.suyooh.com/product",
  },
  openGraph: {
    title: "Most Popular Electronics on Amazon (Best Sellers & Top Reviews)",
    description:
      "Looking for electronics that thousands of buyers trust? This collection highlights Amazon’s best-selling tech products with proven ratings and real-world performance. Perfect for smart shoppers who want quality electronics without the guesswork.",
    url: "https://www.suyooh.com/product",
    siteName: "Suyooh",
    images: [
      {
        url: "/assets/images/suyoohdeal.jpg",
        width: 1200,
        height: 630,
        alt: "Suyooh Product",
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
