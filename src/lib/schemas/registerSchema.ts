import { z } from 'zod';

export const registerSchema = z.object({
  // If we need something to be required then we need to use a minimun property
  name: z.string().min(3, { message: 'El nombre debe contener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Ingresa un email válido' }),
  password: z.string().min(6, { message: 'La contraseña debe contener al menos 6 caracteres' }),
})

export const profileSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe contener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Ingresa un email válido' }).optional(),
  phone: z.string().min(10, { message: 'El teléfono debe contener al menos 10 caracteres' }),
  address: z.string().min(6, { message: 'La dirección debe contener al menos 6 caracteres' }),
  city: z.string().min(3, { message: 'La ciudad debe contener al menos 3 caracteres' }),
})

export type ProfileSchema = z.infer<typeof profileSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>
// This give us a type which we can then use in the form to tell what values it should be expecting.