import { z } from "zod";

export const createBillingSchema = z.object({
    projectId: z
      .string({
      required_error: "El ID del proyecto es obligatorio",
      }),

    billingNumber: z
      .string({
        required_error: "Debes ingresar un numero de factura",
      })
      .trim()
      .min(1, { message: "El numero de factura no puede estar vacio" }),

    billingDate: z
      .string({
        required_error: "Debes ingresar la fecha de la factura",
        invalid_type_error: "La fecha debe estar en formato de texto",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha ingresada no es válida",
      })
      .transform((val) => new Date(val)),

    billingConcept: z
      .string({
        required_error: "Debes ingresar el concepto de la factura",
      })
      .trim()
      .min(1, { message: "El concepto de la factura no puede estar vacio" }),

    billingSubtotal: z
      .number({
        required_error: "El subtotal es obligatorio",
        invalid_type_error: "El subtotal debe ser un número",
      })
      .min(0, { message: "El subtotal no puede ser negativo" }),

    billingIva: z
      .number({
        required_error: "El IVA es obligatorio",
        invalid_type_error: "El IVA debe ser un número",
      })
      .min(0, { message: "El IVA no puede ser negativo" }),

  })
