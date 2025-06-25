import { z } from "zod";

export const createProjectDetailsSchema = z.object({
  projectOwner: z.string().trim().optional(),

  typeDocument: z.enum([
    "Cédula de ciudadanía",
    "NIT",
    "Cédula de extranjería",
    "PPT",
    "Pasaporte",
    "Otro",
  ]).optional(),

  documentNumber: z.string().trim().optional(),

  address: z.string().trim().optional(),
  location: z.string().trim().optional(),
  city: z.string().trim().optional(),
  department: z.string().trim().optional(),

  dcPower: z.number().nonnegative().optional(),
  acPower: z.number().nonnegative().optional(),

  contactName: z.string().trim().optional(),
  contactPosition: z.string().trim().optional(),
  contactNumber: z.number().int().optional(),

  contactEmail: z
    .string()
    .trim()
    .email("Debe ser un correo electrónico válido")
    .optional(),

  numberPanels: z.number().int().optional(),
  panelPower: z.number().nonnegative().optional(),
  panelBrand: z.string().trim().optional(),
  panelReference: z.string().trim().optional(),

  numberInverter: z.number().int().optional(),
  inverterPower: z.number().nonnegative().optional(),
  inverterBrand: z.string().trim().optional(),
  inverterReference: z.string().trim().optional(),

  numberBattery: z.number().int().optional(),
  batteryAmperage: z.number().nonnegative().optional(),
  batteryVoltage: z.number().nonnegative().optional(),
  batteryBrand: z.string().trim().optional(),
  batteryReference: z.string().trim().optional(),
});
