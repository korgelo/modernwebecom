export enum Category {
  LAPTOP_PC = "laptops",
  SMARTWATCH = "smartwatch",
  AUDIO_DEVICES = "headset",
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
