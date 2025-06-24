import { z } from "zod";

export const policySchema = z.object({
  policyType: z.enum(
    [
      "Cumplimiento",
      "Estabilidad y calidad",
      "Buen manejo del anticipo",
      "Prestaciones sociales",
      "Responsabilidad civil",
      "Montaje",
    ],
  ),

  policyNumber: z
    .string()
    .trim(),

  policyValue: z
    .number()
    .nonnegative("El valor de la póliza no puede ser negativo"),

  policyDate: z.coerce.date(),

  policyExpiration: z.coerce.date(),

  policyIssuer: z
    .string()
    .trim(),
});

export const contractSchema = z.object({
  contractNumber: z
    .string()
    .trim(),

  contractDate: z.coerce.date(),

  contractValue: z
    .number()
    .nonnegative("El valor del contrato no puede ser negativo"),

  contractExpiration: z.coerce.date(),
});

export const createDocumentalSchema = z.object({
  serviceOrderDate: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  certificateDate: z.coerce.date().optional(),
  contracts: z.array(contractSchema),
})
