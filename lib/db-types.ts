import { Category, Post, Product, ProductSpec } from "@/types";

export interface DbPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  featured_image: string;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface DbProduct {
  id: number;
  post_id: string;
  name: string;
  brand: string;
  price: string;
  rating: string;
  ratingCount: number;
  amazon_link: string;
  image_url: string;
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
}

export interface DbTrendingPost {
  id: string;
  title: string;
  short_title: string;
  slug: string;
  description: string;
  key_insight: string;
  category: string;
  cta_text: string;
}

export interface DbSiteSetting {
  key: string;
  value: string;
}

export function mapDbPostToPost(
  dbPost: DbPost,
  product?: DbProduct,
  compareWith?: DbProduct
): Post {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    description: dbPost.description,
    content: dbPost.content,
    category: dbPost.category as Category,
    date: dbPost.date,
    featuredImage: dbPost.featured_image,
    featured: dbPost.featured,
    product: product ? mapDbProductToProduct(product) : undefined,
    compareWith: compareWith ? mapDbProductToProduct(compareWith) : undefined,
  };
}

export function mapDbProductToProduct(dbProduct: DbProduct): Product {
  return {
    name: dbProduct.name,
    brand: dbProduct.brand,
    price: dbProduct.price,
    rating: parseFloat(dbProduct.rating),
    ratingCount: dbProduct.ratingCount,
    specs: dbProduct.specs,
    pros: dbProduct.pros,
    cons: dbProduct.cons,
    amazonLink: dbProduct.amazon_link,
    imageUrl: dbProduct.image_url,
  };
}

export interface TrendingPost {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  keyInsight: string;
  category: string;
  ctaText: string;
}

export function mapDbTrendingPostToTrendingPost(
  dbTrendingPost: DbTrendingPost
): TrendingPost {
  return {
    id: dbTrendingPost.id,
    title: dbTrendingPost.title,
    shortTitle: dbTrendingPost.short_title,
    slug: dbTrendingPost.slug,
    description: dbTrendingPost.description,
    keyInsight: dbTrendingPost.key_insight,
    category: dbTrendingPost.category,
    ctaText: dbTrendingPost.cta_text,
  };
}
