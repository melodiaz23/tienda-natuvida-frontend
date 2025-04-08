import { z } from 'zod';

export const orderSchema = z.object({

})


export type OrderSchema = z.infer<typeof orderSchema>
// This give us a type which we can then use in the form to tell what values it should be expecting.