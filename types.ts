export enum Category {
  LAPTOP_PC = "Laptop & PC Reviews",
  SMARTPHONES = "Smartphones & Accessories",
  AUDIO_DEVICES = "Audio Devices",
  SMART_HOME = "Smart Home & Electronics",
  BUYING_GUIDES = "Buying Guides",
  COMPARISONS = "Comparisons",
  HOW_TO = "How-To Guides",
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  name: string;
  brand: string;
  price: string;
  rating: number;
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  amazonLink: string;
  imageUrl: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  date: string;
  featuredImage: string;
  featured?: boolean;
  product?: Product;
  compareWith?: Product;
}
