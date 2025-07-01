import { z } from "zod";

export const dailyLogSchema = z.object({
  projectId: z
    .string({
      required_error: "El ID del proyecto es obligatorio",
      invalid_type_error: "El ID del proyecto debe ser un string",
    })
    .min(1, "El ID del proyecto no puede estar vacío"),

  date: z
    .coerce.date({
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
    .string({
      required_error: "Las novedades de instalación son obligatorias",
      invalid_type_error: "Las novedades deben ser un texto",
    })
    .min(1, "Las novedades no pueden estar vacías"),
});
