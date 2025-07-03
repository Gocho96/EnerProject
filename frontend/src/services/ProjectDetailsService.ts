export type DocumentType =
  | "Cédula de ciudadanía"
  | "NIT"
  | "Cédula de extranjería"
  | "PPT"
  | "Pasaporte"
  | "Otro";

export interface ContactPerson {
  contactName?: string;
  contactPosition?: string;
  contactNumber?: number;
  contactEmail?: string;
}

export interface SolarPanel {
  numberPanels?: number;
  panelPower?: number;
  panelBrand?: string;
  panelReference?: string;
}

export interface Inverter {
  numberInverter?: number;
  inverterPower?: number;
  inverterBrand?: string;
  inverterReference?: string;
}

export interface Battery {
  numberBattery?: number;
  batteryAmperage?: number;
  batteryVoltage?: number;
  batteryBrand?: string;
  batteryReference?: string;
}

export interface ProjectDetails {
  _id: string;
  projectId: string;

  projectOwner?: string;
  typeDocument?: DocumentType;
  documentNumber?: string;
  address?: string;
  location?: string;
  city?: string;
  department?: string;

  dcPower?: number;
  acPower?: number;

  contactPerson: ContactPerson[];
  solarPanels: SolarPanel[];
  inverters: Inverter[];
  batteries: Battery[];

  createdAt: string;
  updatedAt: string;
}
