import { z } from "zod";

export const maintenanceEntrySchema = z.object({
  maintenanceDate: z.coerce.date().optional(),
  typeMaintenance: z
    .enum(["Preventivo", "Correctivo"], {
      required_error: "El tipo de mantenimiento es obligatorio",
    })
    .optional(),
  maintenanceReportDate: z.coerce.date().optional(),
  maintenanceInvoiceDate: z.coerce.date().optional(),
  maintenanceNotes: z.string().trim().optional(),
});

export const createMaintenanceSchema = z.object({
  projectId: z.string({
    required_error: "El ID del proyecto es obligatorio",
  }),
  maintenanceFrequency: z
    .number({
      required_error: "La frecuencia de mantenimiento es obligatoria",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .min(1, { message: "La frecuencia debe ser al menos 1" }),
  nextMaintenance: z.coerce.date().optional(),

  maintenanceDate: z.coerce.date().optional(),
  typeMaintenance: z.enum(["Preventivo", "Correctivo"]).optional(),
  maintenanceReportDate: z.coerce.date().optional(),
  maintenanceInvoiceDate: z.coerce.date().optional(),
  maintenanceNotes: z.string().trim().optional(),
});

export const entryMaintenanceSchema = z.object({
  maintenanceDate: z.coerce.date().optional(),
  typeMaintenance: z
    .enum(["Preventivo", "Correctivo"], {
      invalid_type_error: "Debe ser 'Preventivo' o 'Correctivo'",
    })
    .optional(),
  maintenanceReportDate: z.coerce.date().optional(),
  maintenanceInvoiceDate: z.coerce.date().optional(),
  maintenanceNotes: z.string().trim().optional(),
});

export const updateFrequencySchema = z.object({
  maintenanceFrequency: z.number().int().min(1).optional(),
  nextMaintenance: z.coerce.date().optional(),
});