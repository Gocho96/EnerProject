import { z } from "zod";

export const createTaxIncentiveSchema = z.object({
  filingNumberIt: z
    .string()
    .trim()
    .optional(),

  dateFilingIt: z
    .union([z.string(), z.date()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),

  investmentValueIt: z
    .number()
    .min(0, { message: "El valor de la inversión no puede ser negativo" })
    .optional(),

  paymentValueIt: z
    .number()
    .min(0, { message: "El valor del pago no puede ser negativo" })
    .optional(),

  paymentDateIt: z
    .union([z.string(), z.date()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),

  paymentNumberIt: z
    .string()
    .trim()
    .optional(),

  evaluationDateIt: z
    .union([z.string(), z.date()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),

  certificateNumberIt: z
    .string()
    .trim()
    .optional(),

  certificateDateIt: z
    .union([z.string(), z.date()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),

  secondaryBeneficiaryName: z
    .string()
    .trim()
    .optional(),
});
