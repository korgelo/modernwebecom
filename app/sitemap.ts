import { MetadataRoute } from "next";
<<<<<<< HEAD

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
=======
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
>>>>>>> 913e71b10d43871c3e7e8c01859117e661ef9dda
}
