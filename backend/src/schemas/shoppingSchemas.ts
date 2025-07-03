import { z } from "zod";

export const createShoppingSchema = z.object({
  materialDescription: z.string().trim().optional(),
  materialQuantity: z.number().optional(),
  materialSupplier: z.string().trim().optional(),
  materialInvoice: z.string().trim().optional(),
  materialDate: z.coerce.date().optional(),
  materialSubtotal: z.number().optional(),
  materialIVA: z.number().optional(),
});
