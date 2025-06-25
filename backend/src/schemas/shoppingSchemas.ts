import { z } from "zod";

export const createShoppingSchema = z.object({
  projectId: z.string({
    required_error: "El ID del proyecto es obligatorio",
  }),

  materialDescription: z
    .string({
      required_error: "La descripción del material es obligatoria",
    })
    .trim(),

  materialQuantity: z
    .number({
      required_error: "La cantidad del material es obligatoria",
      invalid_type_error: "La cantidad del material debe ser un número",
    })
    .min(1, { message: "La cantidad del material debe ser mayor a cero" }),

  materialSupplier: z
    .string({
      required_error: "El proveedor del material es obligatorio",
    })
    .trim(),

  materialInvoice: z
    .string({
      required_error: "El número de factura es obligatorio",
    })
    .trim(),

  materialDate: z.coerce.date({
    required_error: "La fecha del material es obligatoria",
  }),

  materialSubtotal: z
    .number({
      required_error: "El subtotal es obligatorio",
      invalid_type_error: "El subtotal debe ser un número",
    })
    .min(0, { message: "El subtotal no puede ser negativo" }),

  materialIVA: z
    .number({
      required_error: "El IVA es obligatorio",
      invalid_type_error: "El IVA debe ser un número",
    })
    .min(0, { message: "El IVA no puede ser negativo" }),
});
