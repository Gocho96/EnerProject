import { z } from "zod";

export const contactPersonSchema = z.object({
  contactName: z.string().trim().optional(),
  contactPosition: z.string().trim().optional(),
  contactNumber: z.number().int().optional(),
  contactEmail: z
    .string()
    .trim()
    .email("Debe ser un correo electrónico válido")
    .optional(),
});

export const solarPanelSchema = z.object({
  numberPanels: z.number().int().optional(),
  panelPower: z.number().nonnegative().optional(),
  panelBrand: z.string().trim().optional(),
  panelReference: z.string().trim().optional(),
});

export const inverterSchema = z.object({
  numberInverter: z.number().int().optional(),
  inverterPower: z.number().nonnegative().optional(),
  inverterBrand: z.string().trim().optional(),
  inverterReference: z.string().trim().optional(),
});

export const batterySchema = z.object({
  numberBattery: z.number().int().optional(),
  batteryAmperage: z.number().nonnegative().optional(),
  batteryVoltage: z.number().nonnegative().optional(),
  batteryBrand: z.string().trim().optional(),
  batteryReference: z.string().trim().optional(),
});

export const createProjectDetailsSchema = z.object({
  projectId: z.string().min(1, "El ID del proyecto es obligatorio"),
  projectOwner: z.string().trim().optional(),
  typeDocument: z
    .enum([
      "Cédula de ciudadanía",
      "NIT",
      "Cédula de extranjería",
      "PPT",
      "Pasaporte",
      "Otro",
    ])
    .optional(),
  documentNumber: z.string().trim().optional(),
  address: z.string().trim().optional(),
  location: z.string().trim().optional(),
  city: z.string().trim().optional(),
  department: z.string().trim().optional(),
  dcPower: z.number().nonnegative().optional(),
  acPower: z.number().nonnegative().optional(),
  contactPerson: z.array(contactPersonSchema).optional(),
  solarPanels: z.array(solarPanelSchema).optional(),
  inverters: z.array(inverterSchema).optional(),
  batteries: z.array(batterySchema).optional(),
});

