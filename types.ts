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
  description: string;
  content: string;
  category: Category;
  date: string;
  featuredImage: string;
  featured?: boolean;
  product?: Product;
  compareWith?: Product;
}

// DealFinder

export interface Supplier {
  name: string;
  type: "Manufacturer" | "Wholesaler" | "Trading Company" | "Dropshipper";
  location: string;
  specialty: string;
  estimatedQualityScore: number; // 1-100
  url?: string;
}

export interface AmzProduct {
  id: string;
  name: string;
  description: string;
  targetPrice: string;
  trendingReason: string;
  category: string;
  demandLevel: "Low" | "Medium" | "High" | "Explosive";
  suppliers: Supplier[];
  affiliateUrl?: string;
}

export interface MarketAnalysis {
  niche: string;
  overview: string;
  keyTrends: string[];
  competitiveLandscape: string;
}

export interface SearchResult {
  analysis: MarketAnalysis;
  products: AmzProduct[];
  sources: Source[];
}

export interface Source {
  title: string;
  uri: string;
}

// Added to resolve import error in components/SupplierModal.tsx
/**
 * Detailed sourcing report for a specific product
 */
export interface SupplierReport {
  content: string;
  sources: Source[];
}

export enum AppView {
  HOME = "HOME",
  RESULTS = "RESULTS",
  SAVED = "SAVED",
}

export interface SavedReport {
  id: string;
  niche: string;
  timestamp: number;
  data: SearchResult;
}

// Scraper

export interface ProductSpec {
  label: string;
  value: string;
}
export interface ProductDetails {
  name: string;
  brand: string;
  price: string; // String with $ sign
  rating: number;
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  amazonLink: string;
  imageUrl: string;
}

export interface ProductListing {
  id: string; // Amazon ASIN
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featuredImage: string; // New field for blog post assets
  content: string;
  product: ProductDetails;

  // Internal tracking fields for the UI
  internalId: string;
  sourceLink: string;
  timestamp: number;
  originalPrice: number;
  reviews: number;
  isSaved?: boolean;
}

export interface FormInputs {
  sourceLink: string;
  amazonLink: string;
  imageUrl: string;
}

export enum GenerationStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
