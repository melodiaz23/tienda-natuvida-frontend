import { z } from 'zod';

// Esquema de precio
const PriceSchema = z.object({
  id: z.string().optional(),
  unit: z.number().positive('El precio unitario debe ser mayor a 0'),
  twoUnits: z.number().positive('El precio de dos unidades debe ser mayor a 0').optional(),
  threeUnits: z.number().positive('El precio de tres unidades debe ser mayor a 0').optional()
});

// Esquema de imagen de producto
const ProductImageSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().url('URL de imagen inválida'),
  altText: z.string().optional(),
  displayOrder: z.number().int().optional(),
  isPrimary: z.boolean().optional()
});


// Esquema para creación/actualización de producto
export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  presentation: z.string().min(3, 'La presentación debe tener al menos 3 caracteres'),
  usageMode: z.string().optional(),
  ingredients: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  price: PriceSchema,
  categories: z.array(z.string()).default([]),
  images: z.array(ProductImageSchema).optional().default([]),
  enabled: z.boolean().default(true)
});