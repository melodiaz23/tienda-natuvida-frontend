import { z } from 'zod';

export const restartPasswordSchema = z.object({
  email: z.string().email({ message: 'Ingresa un email válido' }),
})


export type RestartPasswordSchema = z.infer<typeof restartPasswordSchema>
// This give us a type which we can then use in the form to tell what values it should be expecting.