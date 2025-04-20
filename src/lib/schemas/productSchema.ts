import { z } from 'zod';

const PriceRequired = z.object({
  unit: z.number().positive("El precio unitario debe ser mayor a 0"),
});

const PriceOptional = z
  .object({
    id: z.string().optional(),
    twoUnits: z
      .number()
      .positive("El precio de dos unidades debe ser mayor a 0")
      .optional()
      .or(z.literal(0)),
    threeUnits: z
      .number()
      .positive("El precio de tres unidades debe ser mayor a 0")
      .optional()
      .or(z.literal(0)),
  })
  .partial(); // opcionales


const PriceSchema = PriceRequired.merge(PriceOptional);

const ProductRequired = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  price: PriceSchema,
});

// Esquema de imagen de producto
const ProductImageSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().url('URL de imagen inválida'),
  altText: z.string().optional(),
  displayOrder: z.number().int().optional(),
  isPrimary: z.boolean().optional()
});


const ProductOptional = z
  .object({
    id: z.string().uuid("El ID debe ser un UUID válido").optional(),
    customName: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    presentation: z.string().optional(),
    usageMode: z.string().optional(),
    ingredients: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    bonuses: z.array(z.string()).default([]),
    contraindications: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    images: z.array(ProductImageSchema).default([]),
    enabled: z.boolean().default(true),
  })
  .partial();

export const ProductSchema = ProductRequired.merge(ProductOptional);