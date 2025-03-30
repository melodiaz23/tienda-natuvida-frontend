import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'El nombre debe contener al menos 3 caracteres' }),
    email: z.string().email({ message: 'Ingresa un email válido' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe contener al menos 6 caracteres' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
          'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
      }),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Las contraseñas no coinciden',
    path: ['password2'], // Esto indica que el error se mostrará en el campo "password2"
  });

export const profileSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe contener al menos 3 caracteres' }),
  email: z.string().email({ message: 'Ingresa un email válido' }).optional(),
  phone: z.string().min(10, { message: 'El teléfono debe contener al menos 10 caracteres' }),
  address: z.string().min(6, { message: 'La dirección debe contener al menos 6 caracteres' }),
  city: z.string().min(3, { message: 'La ciudad debe contener al menos 3 caracteres' }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;