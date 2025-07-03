export type PolicyType =
  | "Cumplimiento"
  | "Estabilidad y calidad"
  | "Buen manejo del anticipo"
  | "Prestaciones sociales"
  | "Responsabilidad civil"
  | "Montaje";

export interface Policy {
  _id: string;
  policyType: PolicyType;
  policyNumber: string;
  policyValue: number;
  policyDate: string;
  policyExpiration: string;
  policyIssuer: string;
}

export interface Contract {
  _id: string;
  contractNumber: string;
  contractDate: string;
  contractValue: number;
  contractExpiration: string;
  policies: Policy[];
}

export interface Documental {
  _id: string;
  projectId: string;
  serviceOrderDate?: string;
  startDate?: string;
  endDate?: string;
  certificateDate?: string;
  contracts: Contract[];
  createdAt: string;
  updatedAt: string;
}
