import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Example: dynamic data (blog posts, products, deals)
  const posts = await fetch("", {
    cache: "no-store",
  }).then((res) => res.json());

  const postUrls = posts.map((post: any) => ({
    url: `https://www.suyooh.com/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.suyooh.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.suyooh.com/deal",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...postUrls,
  ];
}
