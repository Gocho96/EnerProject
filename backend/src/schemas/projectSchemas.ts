import { date, z } from "zod";

export const createProjectSchema = z.object({
  code: z.string({
    required_error: "El código del proyecto es obligatorio",
  }),

  name: z.string({
    required_error: "El nombre del proyecto es obligatorio",
  }),

  type_service: z.string({
    required_error: "El tipo de proyecto es obligatorio",
  }),

  state: z.enum(["Finalizado", "En curso", "Pendiente", "Cancelado"], {
    required_error: "El estado del proyecto es obligatorio",
  }),

  start_contract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  end_contract: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  next_maintenance: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});
