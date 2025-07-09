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

  phaseDocumental: PhaseSection;
  phaseEngineering: PhaseSection;
  phaseShopping: PhaseSection;
  phaseInstallation: PhaseSection;
  phaseTaxIncentive: PhaseSection;
  phaseRetie: PhaseSection;
  phaseNetworkOperator: PhaseSection;
  phaseMarketing: PhaseSection;
  phaseMaintenance: PhaseSection;
  phaseBilling: PhaseSection;

  createdAt?: string;
  updatedAt?: string;
}
