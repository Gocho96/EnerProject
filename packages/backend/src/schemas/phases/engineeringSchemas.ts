import { z } from "zod";

export const engineeringSchema = z.object({
  statusElectricalPlan: z.boolean({
    required_error: "El estado del plano eléctrico es obligatorio",
  }),
  dateElectricalPlan: z.coerce.date().optional().nullable(),

  statusConstructionPlan: z.boolean({
    required_error: "El estado del plano constructivo es obligatorio",
  }),
  dateConstructionPlan: z.coerce.date().optional().nullable(),

  statusUnifilar: z.boolean({
    required_error: "El estado del diagrama unifilar es obligatorio",
  }),
  dateUnifilar: z.coerce.date().optional().nullable(),

  statusPlantModel: z.boolean({
    required_error: "El estado del modelo de planta es obligatorio",
  }),
  datePlantModel: z.coerce.date().optional().nullable(),

  statusMemories: z.boolean({
    required_error: "El estado de las memorias es obligatorio",
  }),
  dateMemories: z.coerce.date().optional().nullable(),
  
}).superRefine((data, ctx) => {
  if (data.statusElectricalPlan && !(data.dateElectricalPlan instanceof Date && !isNaN(data.dateElectricalPlan.getTime()))) {
    ctx.addIssue({
      path: ["dateElectricalPlan"],
      message: "La fecha del plano eléctrico es obligatoria.",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.statusConstructionPlan && !(data.dateConstructionPlan instanceof Date && !isNaN(data.dateConstructionPlan.getTime()))) {
    ctx.addIssue({
      path: ["dateConstructionPlan"],
      message: "La fecha del plano constructivo es obligatoria.",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.statusUnifilar && !(data.dateUnifilar instanceof Date && !isNaN(data.dateUnifilar.getTime()))) {
    ctx.addIssue({
      path: ["dateUnifilar"],
      message: "La fecha del diagrama unifilar es obligatoria.",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.statusPlantModel && !(data.datePlantModel instanceof Date && !isNaN(data.datePlantModel.getTime()))) {
    ctx.addIssue({
      path: ["datePlantModel"],
      message: "La fecha del modelo de planta es obligatoria.",
      code: z.ZodIssueCode.custom,
    });

  }

  if (data.statusMemories && !(data.dateMemories instanceof Date && !isNaN(data.dateMemories.getTime()))) {
    ctx.addIssue({
      path: ["dateMemories"],
      message: "La fecha de las memorias es obligatoria.",
      code: z.ZodIssueCode.custom,
    });
  }
});
