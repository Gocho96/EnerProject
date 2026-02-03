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

  policyNumber: z
    .string()
    .trim()
    .min(1, { message: "El número de la póliza es obligatorio." }),

  policyDate: z
    .string()
    .min(1, { message: "La fecha de emisión de la póliza es obligatoria." }),

  policyExpiration: z
    .string()
    .min(1, {
      message: "La fecha de vencimiento de la póliza es obligatoria.",
    }),

  policyValue: z
    .number({ required_error: "El valor de la póliza es obligatorio." }),

  policyIssuer: z
    .string()
    .trim()
    .min(1, { message: "El emisor de la póliza es obligatorio." }),
});

export const contractSchema = z.object({
  contractNumber: z
    .string()
    .trim()
    .min(1, { message: "El número de contrato es obligatorio." }),

  contractValue: z
    .number({ required_error: "El valor del contrato es obligatorio." })
    .gt(0, { message: "El valor del contrato debe ser mayor a 0." }),

  contractDate: z
    .string()
    .min(1, { message: "La fecha de firma del contrato es obligatoria." }),

  contractExpiration: z
    .string()
    .min(1, {
      message: "La fecha de vencimiento del contrato es obligatoria.",
    }),
});
