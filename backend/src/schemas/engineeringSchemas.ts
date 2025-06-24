import { z } from "zod";

export const createEngineeringSchema = z.object({
  statusElectricalPlan: z.boolean({
    required_error: "El estado del plano eléctrico es obligatorio",
  }),

  dateElectricalPlan: z.coerce.date().optional(),

  statusConstructionPlan: z.boolean({
    required_error: "El estado del plano constructivo es obligatorio",
  }),

  dateConstructionPlan: z.coerce.date().optional(),

  statusUnifilar: z.boolean({
    required_error: "El estado del diagrama unifilar es obligatorio",
  }),

  dateUnifilar: z.coerce.date().optional(),

  statusPlantModel: z.boolean({
    required_error: "El estado del modelo de planta es obligatorio",
  }),

  datePlantModel: z.coerce.date().optional(),

  statusMemories: z.boolean({
    required_error: "El estado de las memorias es obligatorio",
  }),

  dateMemories: z.coerce.date().optional(),
});
