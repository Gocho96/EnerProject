// schemas/maintenanceSchemas.ts
import { z } from "zod";

export const createMaintenanceSchema = z.object({
  maintenanceFrequency: z
    .number({
      required_error: "La frecuencia de mantenimiento es obligatoria",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .min(1, { message: "La frecuencia debe ser al menos 1" }),

  nextMaintenance: z.coerce.date().optional(),

  maintenanceNumber: z
    .number({
      invalid_type_error: "Debe ser un número",
    })
    .optional(),

  maintenanceDate: z.coerce.date().optional(),

  typeMaintenance: z
    .enum(["Preventivo", "Correctivo"], {
      required_error: "El tipo de mantenimiento es obligatorio",
      invalid_type_error: "Debe ser 'Preventivo' o 'Correctivo'",
    })
    .optional(),

  maintenanceReportDate: z.coerce.date().optional(),

  maintenanceInvoiceDate: z.coerce.date().optional(),

  maintenanceNotes: z
    .string()
    .trim()
    .optional(),
});

export const updateMaintenanceSchema = createMaintenanceSchema.partial();
