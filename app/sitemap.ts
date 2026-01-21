import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const posts = allPosts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.8,
  }));

  const categories = [...new Set(allPosts.map((post) => post.category))].map(
    (category) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category}`,
      lastModified: new Date(),
      priority: 0.6,
    })
  );

  const staticPages = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/deal`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
      lastModified: new Date(),
      priority: 0.7,
    },
  ];

  return [...staticPages, ...posts, ...categories];
}
