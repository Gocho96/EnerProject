import { z } from "zod";
import { Types } from "mongoose";

const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "projectId inválido",
});

const phaseStatusEnum = z.enum(["En progreso", "Pausado", "Completado", "N/A"]);

const phaseSectionSchema = z.object({
  status: phaseStatusEnum.default("En progreso"),
  workProgress: z.number().min(0).max(100).default(0),
  news: z.string().optional(),
});

export const phaseSchema = z.object({
  projectId: objectId,
  code: z.string().min(1, { message: "El código del proyecto es requerido" }),

  phaseDocumental: phaseSectionSchema,
  phaseEngineering: phaseSectionSchema,
  phaseShopping: phaseSectionSchema,
  phaseInstallation: phaseSectionSchema,
  phaseTaxIncentive: phaseSectionSchema,
  phaseRetie: phaseSectionSchema,
  phaseNetworkOperator: phaseSectionSchema,
  phaseMarketing: phaseSectionSchema,
  phaseMaintenance: phaseSectionSchema,
  phaseBilling: phaseSectionSchema,
});
