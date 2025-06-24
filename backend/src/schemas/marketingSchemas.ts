import { z } from "zod";

export const createMarketingSchema = z.object({
  platform: z
    .enum([
      "Facebook",
      "Instagram",
      "Youtube",
      "TikTok",
      "LinkedIn",
      "Sitio web",
      "Otro",
    ])
    .optional(),

  publicationDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  publicationUrl: z
    .string()
    .url({ message: "Debe ser una URL válida" })
    .trim()
    .optional(),

  sendSurvey: z
    .boolean({ required_error: "El campo de encuesta es obligatorio" }),

  sendSurveyDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
});
