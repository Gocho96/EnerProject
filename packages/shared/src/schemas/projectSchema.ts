import { z } from "zod";

export const createProjectSchema = z.object({
  code: z.string()
    .min(1, "El código del proyecto es obligatorio")
    .trim(),

  name: z.string()
    .min(1, "El nombre del proyecto es obligatorio")
    .trim(),

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
  ]).pipe(z.enum([
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
  ])),

  state: z.enum([
    "Por iniciar",
    "En curso",
    "Pausado",
    "Finalizado",
    "Cancelado",
  ]),

  startContract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined))
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "La fecha de inicio del contrato debe ser válida",
    }),

  endContract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined))
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "La fecha de fin del contrato debe ser válida",
    }),

  nextMaintenance: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined))
    .refine((val) => val === undefined || !isNaN(val.getTime()), {
      message: "La fecha del próximo mantenimiento debe ser válida",
    }),
});

export type CreateProject = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();
export type UpdateProject = z.infer<typeof updateProjectSchema>;