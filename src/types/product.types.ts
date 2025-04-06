import { Category } from "./category.types";

export interface Price {
  id?: string;
  unit: number;
  twoUnits: number;
  threeUnits: number;
  threeByTwo: number;
  fiveByThree: number;
}


export interface Product {
  id: string;
  name: string;
  description: string;
  presentation: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
  usageMode?: string;
  price: Price;
  categories: Category[];
  images: ProductImage[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  primaryImageUrl?: string | null;
}

export interface ProductRequest {
  id?: string; // UUID en TypeScript
  name: string;
  description: string;
  presentation: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
  usageMode?: string;
  price: Price;
  categories: string[];
  images: ProductImage[];
  enabled: boolean;
}

export interface ProductImage {
  id?: string;
  imageUrl: string;
  altText?: string;
  displayOrder?: number;
  isPrimary?: boolean;
  product?: Product;
}




