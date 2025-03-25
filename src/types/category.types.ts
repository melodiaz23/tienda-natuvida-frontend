export interface Category {
  id: string;
  name: string;
  description: string;
  // imageUrl: string; // TODO: Add this property to the API
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRequest {
  id?: string | null;
  name: string;
  description?: string;
}