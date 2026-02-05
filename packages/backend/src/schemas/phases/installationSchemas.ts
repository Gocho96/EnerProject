import { z } from "zod";

export const dailyLogSchema = z.object({
  date: z.coerce.date({
    required_error: "La fecha es obligatoria",
    invalid_type_error: "La fecha debe tener un formato válido",
  }),

  content: z
    .string({
      required_error: "El contenido es obligatorio",
      invalid_type_error: "El contenido debe ser un texto",
    })
    .min(1, "El contenido no puede estar vacío"),

  installationNews: z
    .string().optional()
});
