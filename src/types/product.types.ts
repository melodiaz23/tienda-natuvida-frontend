export interface Price {
  id?: string;
  unit: number;
  twoUnits?: number;
  threeUnits?: number;
}


export interface Product {
  id: string;
  name: string;
  customName: string;
  slug: string;
  description: string;
  presentation: string;
  usageMode?: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
  bonuses: string[];
  contraindications: string[];
  price: Price;
  categories: {
    id: string;
    name: string;
    description?: string;
    productIds: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  images: ProductImage[];
  primaryImageUrl: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRequest {
  id?: string; // UUID en TypeScript
  name: string;
  customName?: string;
  description?: string;
  presentation?: string;
  usageMode?: string;
  ingredients: string[];
  benefits: string[];
  tags: string[];
  bonuses: string[];
  contraindications: string[];
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
  // product?: Product;
}


export interface Category {
  id: string;
  name: string;
  description?: string;
  productIds: string[];
  // imageUrl: string; // TODO: Add this property to the API
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRequest {
  id?: string | null;
  name: string;
  description?: string;
}

