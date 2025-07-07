import { z } from "zod";

export const createProjectSchema = z.object({
  code: z.string({
    required_error: "El código del proyecto es obligatorio",
  }),

  name: z.string({
    required_error: "El nombre del proyecto es obligatorio",
  }),

  typeOfService: z.enum([
    "Diseño, suministro e instalación SSFV",
    "Incentivos tributarios",
    "Análisis de calidad de la energía",
    "Consultoria técnica",
    "Mantenimiento",
    "Normalización",
    "Diseño / ingeniería",
    "Instalación / mano de obra",
    "Suministro de materiales / equipos",
    "Otro servicio",
  ], {
    required_error: "El tipo de proyecto es obligatorio",
  }),

  state: z.enum([
    "Por iniciar",
    "En curso",
    "Finalizado",
    "Cancelado",
  ], {
    required_error: "El estado del proyecto es obligatorio",
  }),

  startContract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  endContract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  nextMaintenance: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});
