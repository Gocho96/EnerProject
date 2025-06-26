import { z } from "zod";

export const policySchema = z.object({
  policyType: z.enum([
    "Cumplimiento",
    "Estabilidad y calidad",
    "Buen manejo del anticipo",
    "Prestaciones sociales",
    "Responsabilidad civil",
    "Montaje",
  ]),
  policyNumber: z.string().trim(),
  policyValue: z.number(),
  policyDate: z.coerce.date(),
  policyExpiration: z.coerce.date(),
  policyIssuer: z.string().trim(),
});

export const contractSchema = z.object({
  contractNumber: z.string().trim().optional(),
  contractDate: z.coerce.date().optional(),
  contractValue: z.number().optional(),
  contractExpiration: z.coerce.date().optional(),
  policies: z
    .array(policySchema)
    .optional()
    .refine(
      (policies) =>
        !policies || policies.every((p) => policySchema.safeParse(p).success),
      {
        message: "Debes ingeresar todos los datos de la poliza.",
      }
    ),
});

export const createDocumentalSchema = z.object({
  projectId: z.string().refine((val) => /^[a-f\d]{24}$/i.test(val), {
    message: "projectId debe ser un ObjectId válido",
  }),
  serviceOrderDate: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  certificateDate: z.coerce.date().optional(),
  contracts: z
    .array(contractSchema)
    .optional()
    .refine(
      (contracts) =>
        !contracts ||
        contracts.every((c) => {
          const result = contractSchema.safeParse(c);
          return result.success;
        }),
      {
        message:
          "Cada contrato debe tener contractNumber, contractDate, contractValue y contractExpiration.",
      }
    ),
});
