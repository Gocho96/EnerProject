// schemas/installationSchemas.ts
import { z } from "zod";

export const dailyLogSchema = z.object({
  date: z.coerce.date().optional(),
  content: z.string().trim().optional(),
  installationNews: z.string().trim().optional(),
});

export const createInstallationSchema = z.object({
  projectId: z
    .string({ required_error: "El ID del proyecto es obligatorio" })
    .min(1, { message: "El ID del proyecto no puede estar vacío" }),

  dateInstallation: z.coerce.date().optional(),

  dailyLog: z.array(dailyLogSchema).optional(),
});
