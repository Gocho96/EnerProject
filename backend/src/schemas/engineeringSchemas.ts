import { z } from "zod";

export const engineeringSchema = z
  .object({
    projectId: z.string({
      required_error: "El ID del proyecto es obligatorio",
    }),

    statusElectricalPlan: z.boolean({
      required_error: "El estado del plano eléctrico es obligatorio",
    }),
    dateElectricalPlan: z.coerce.date().nullable(),

    statusConstructionPlan: z.boolean({
      required_error: "El estado del plano constructivo es obligatorio",
    }),
    dateConstructionPlan: z.coerce.date().nullable(),

    statusUnifilar: z.boolean({
      required_error: "El estado del diagrama unifilar es obligatorio",
    }),
    dateUnifilar: z.coerce.date().nullable(),

    statusPlantModel: z.boolean({
      required_error: "El estado del modelo de planta es obligatorio",
    }),
    datePlantModel: z.coerce.date().nullable(),

    statusMemories: z.boolean({
      required_error: "El estado de las memorias es obligatorio",
    }),
    dateMemories: z.coerce.date().nullable(),
  })
  .refine((data) => {
    return !data.statusElectricalPlan || data.dateElectricalPlan instanceof Date;
  }, {
    message: "La fecha del plano eléctrico es obligatoria y debe ser válida",
    path: ["dateElectricalPlan"],
  })
  .refine((data) => {
    return !data.statusConstructionPlan || data.dateConstructionPlan instanceof Date;
  }, {
    message: "La fecha del plano constructivo es obligatoria y debe ser válida",
    path: ["dateConstructionPlan"],
  })
  .refine((data) => {
    return !data.statusUnifilar || data.dateUnifilar instanceof Date;
  }, {
    message: "La fecha del diagrama unifilar es obligatoria y debe ser válida",
    path: ["dateUnifilar"],
  })
  .refine((data) => {
    return !data.statusPlantModel || data.datePlantModel instanceof Date;
  }, {
    message: "La fecha del modelo de planta es obligatoria y debe ser válida",
    path: ["datePlantModel"],
  })
  .refine((data) => {
    return !data.statusMemories || data.dateMemories instanceof Date;
  }, {
    message: "La fecha de las memorias es obligatoria y debe ser válida",
    path: ["dateMemories"],
  });
