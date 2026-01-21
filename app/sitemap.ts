import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const posts = allPosts.map((post) => ({
    url: `${"https://www.suyooh.com"}/post/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: `${"https://www.suyooh.com"}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${"https://www.suyooh.com"}/deal`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${"https://www.suyooh.com"}/product`,
      lastModified: new Date(),
      priority: 0.7,
    },
        {
      url: `${"https://www.suyooh.com"}/category/laptops`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${"https://www.suyooh.com"}/category/headset`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${"https://www.suyooh.com"}/category/smartwatch`,
      lastModified: new Date(),
      priority: 0.7,
    },
  ];

  return [...staticPages, ...posts];
}
