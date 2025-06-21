import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Contraseña debe ser superior a 6 caracteres' }),
  confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
}) // With refine we can validate that the password and confirm password are the same.


export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;