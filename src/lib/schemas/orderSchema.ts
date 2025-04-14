import { z } from 'zod';

export const orderSchema = z.object({
  firstName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  phone: z.string().regex(/^3[0-9]{9}$/, "El número debe comenzar con 3 y tener 10 dígitos"),
  nationalId: z.string().regex(/^[0-9]{5,20}$/, "Documento de identidad inválido").optional(),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  city: z.string().min(3, "Ingresa un nombre de ciudad válido"),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "MOBILE_PAYMENT"], {
    errorMap: () => ({ message: "Selecciona un método de pago válido" }),
  }),
  notes: z.string().optional(),
});

export type OrderSchema = z.infer<typeof orderSchema>;