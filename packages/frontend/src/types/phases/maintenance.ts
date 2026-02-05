export type TypeMaintenance = "Preventivo" | "Correctivo";

export interface MaintenanceRecord {
  _id: string;
  maintenanceNumber: number;
  maintenanceDate?: string;
  typeMaintenance?: TypeMaintenance;
  maintenanceReportDate?: string;
  maintenanceInvoiceDate?: string;
  maintenanceNotes?: string;
}

export interface Maintenance {
  _id: string;
  projectId: string;
  maintenanceFrequency: number;
  nextMaintenance?: string;
  maintenance: MaintenanceRecord[];
  createdAt: string;
  updatedAt: string;
}
