import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, ingresa un email válido' }),
  password: z.string().min(6, { message: 'Por favor, ingresa una contraseña válida' }),
})

export type LoginSchema = z.infer<typeof loginSchema>



