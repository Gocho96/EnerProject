import { z } from "zod";

export const materialSchema = z.object({
  materialDescription: z
    .string()
    .trim()
    .min(1, { message: "La descripción del material es obligatoria" }),
  materialQuantity: z.number({
    required_error: "La cantidad del material es obligatoria.",
  }),
  materialSupplier: z.string().min(1).optional(),
  materialInvoice: z.string().optional(),
  materialDate: z.coerce.date().optional(),
  materialSubtotal: z.number().optional(),
  materialIVA: z.number().optional(),
  materialTotal: z.number().optional(),
});
