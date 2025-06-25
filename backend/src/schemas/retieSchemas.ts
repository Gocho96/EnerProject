import { z } from "zod";

export const createRetieSchema = z.object({
  projectId: z.string({
    required_error: "El ID del proyecto es obligatorio",
  }),

  applicationDateRetie: z.coerce.date().optional(),

  commercialOfferNumberRetie: z
    .number()
    .int("El número de oferta debe ser un número entero")
    .nonnegative("El número de oferta no puede ser negativo")
    .optional(),

  supplierRetie: z.string().trim().optional(),

  paymentDateRetie: z.coerce.date().optional(),

  inspectionDateRetie: z.coerce.date().optional(),

  dictamenDateRetie: z.coerce.date().optional(),

  dictamenNumberRetie: z
    .number()
    .int("El número de dictamen debe ser un número entero")
    .nonnegative("El número de dictamen no puede ser negativo")
    .optional(),
}).refine(
  (data) => {
    if (data.dictamenDateRetie && !data.inspectionDateRetie) {
      return false;
    }
    return true;
  },
  {
    message:
      "No se puede registrar un dictamen sin haber realizado la inspección previa.",
    path: ["dictamenDateRetie"],
  }
);
