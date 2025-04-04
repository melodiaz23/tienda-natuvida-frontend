import { Category } from "./category.types";

export interface ProductPricing {
  id: string | undefined;
  unitPrice: number;
  priceTwoUnits?: number;
  priceThreeUnits?: number;
  previousPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  presentation: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
  usageMode: string;
  price: {
    id: string;
    unit: number;
    twoUnits: number;
    threeUnits: number;
    threeByTwo: number | null;
    fiveByThree: number | null;
  };
  categories: Category[];
  images: ProductImage[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  primaryImageUrl?: string | null;
}



export interface ProductRequest {
  name: string;
  description?: string;
  preparation?: string;
  ingredients?: string;
  pricing: ProductPricing;
  categoryIds?: string[];
  images?: ProductImage[];
  tags?: string[]; // Lista de tags para la creación/actualización
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isPrimary: boolean;
  product?: Product;
}




