import { z } from "zod";

export const publicationSchema = z.object({
  platform: z.enum([
    "Facebook",
    "Instagram",
    "Youtube",
    "LinkedIn",
    "Sitio web",
    "Otro",
  ]),
  publicationDate: z.coerce.date().optional(),
  publicationUrl: z.string().trim().url().optional(),
});

export const createMarketingSchema = z
  .object({
    projectId: z.string().min(1, "El ID del proyecto es obligatorio"),

    sendSurvey: z.boolean({
      required_error: "El campo sendSurvey es obligatorio",
      invalid_type_error: "Debe ser true o false",
    }),

    sendSurveyDate: z.coerce.date().optional(),

    publications: publicationSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.sendSurvey === true) {
        return !!data.sendSurveyDate;
      }
      return true;
    },
    {
      message: "La fecha de envío de encuesta es obligatoria si se activa sendSurvey",
      path: ["sendSurveyDate"],
    }
  );

  export const updateSurveySchema = z
  .object({
    sendSurvey: z.boolean().optional(),
    sendSurveyDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (data.sendSurvey === true) {
        return !!data.sendSurveyDate;
      }
      return true;
    },
    {
      message: "La fecha de envío de encuesta es obligatoria si se activa sendSurvey",
      path: ["sendSurveyDate"],
    }
  );

