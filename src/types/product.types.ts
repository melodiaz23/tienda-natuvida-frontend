import { Category } from "./category.types";
import { OrderItem } from "./orderItem.types";

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
  preparation: string;
  ingredients: string;
  pricing: ProductPricing;
  category: Category | null;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  primaryImageUrl: string | null;
}

export interface ProductRequest {
  name: string;
  description?: string;
  preparation?: string;
  ingredients?: string;
  pricing: ProductPricing;
  categoryId?: string;
  images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isPrimary: boolean;
  product?: Product;
}




