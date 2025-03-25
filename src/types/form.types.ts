
export interface ProductFormData {
  name: string;
  description?: string;
  preparation?: string;
  ingredients?: string;
  unitPrice: number;
  priceTwoUnits?: number;
  priceThreeUnits?: number;
  previousPrice?: number;
  categoryId: string;
}