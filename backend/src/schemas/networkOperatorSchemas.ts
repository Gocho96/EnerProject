import { z } from "zod";

export const createNetworkOperatorSchema = z.object({
  projectId: z
    .string({
      required_error: "El ID del proyecto es obligatorio",
    })
    .trim(),

  applicationDateOr: z.coerce.date().optional(),

  applicationNumberOr: z
    .string()
    .trim()
    .optional(),

  nameOr: z
    .string()
    .trim()
    .optional(),

  meterDeliveryDateOr: z.coerce.date().optional(),

  inspectionDateOr: z.coerce.date().optional(),

  approvalDateOr: z.coerce.date().optional(),
});
