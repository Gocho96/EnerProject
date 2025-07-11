export type PhaseStatus = "En progreso" | "Pausado" | "Completado" | "N/A";

export interface PhaseSection {
  status: PhaseStatus;
  workProgress: number;
  news?: string;
}

export interface Phase {
  _id?: string;
  code: string;
  projectId: string;

  Documental: PhaseSection;
  Engineering: PhaseSection;
  Shopping: PhaseSection;
  Installation: PhaseSection;
  TaxIncentive: PhaseSection;
  Retie: PhaseSection;
  NetworkOperator: PhaseSection;
  Marketing: PhaseSection;
  Maintenance: PhaseSection;
  Billing: PhaseSection;

  createdAt?: string;
  updatedAt?: string;
}
