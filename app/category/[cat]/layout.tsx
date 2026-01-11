import type { Metadata } from "next";
import { Category } from "@/types";
import { getSiteName, getPostCountByCategory } from "@/lib/posts";

const slugToCategoryMap: Record<string, Category> = {
  "audio-devices": Category.AUDIO_DEVICES,
  "laptop-pc": Category.LAPTOP_PC,
  smartwatch: Category.SMARTWATCH,
};

const slugToDisplayName: Record<string, string> = {
  "audio-devices": "Headset",
  "laptop-pc": "Laptops",
  smartwatch: "Smartwatch",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = (await params) || { cat: undefined };
  const siteName = await getSiteName();

  const category = cat
    ? slugToCategoryMap[cat] ||
      (Object.values(Category).includes(cat as Category)
        ? (cat as Category)
        : undefined)
    : undefined;

  const displayName = cat
    ? slugToDisplayName[cat] ?? (category ? cat : "All Reviews")
    : "All Reviews";

  let description = `Latest ${displayName} reviews and buying guides on ${siteName}.`;

  if (category) {
    const count = await getPostCountByCategory(category);
    description = `${displayName} reviews — ${count} articles. Find top ${displayName} reviews, comparisons and buying guides on ${siteName}.`;
  }

  const title = `${displayName} - ${siteName}`;
  const canonical = cat
    ? `https://www.suyooh.com/category/${cat}`
    : "https://www.suyooh.com/category/";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: "/assets/images/suyoohdeal.jpg",
          width: 1200,
          height: 630,
          alt: `${displayName} - ${siteName}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
