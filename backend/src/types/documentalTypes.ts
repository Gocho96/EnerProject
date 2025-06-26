import { Types } from "mongoose";

export interface Policy {
  policyType: "Cumplimiento" | "Estabilidad y calidad" | "Buen manejo del anticipo" | "Prestaciones sociales" | "Responsabilidad civil" | "Montaje";
  policyNumber: string;
  policyValue: number;
  policyDate: Date;
  policyExpiration: Date;
  policyIssuer: string;
}

export interface Contract {
  contractNumber: string;
  contractDate: Date;
  contractValue: number;
  contractExpiration: Date;
  policies: Policy[];
}

export interface DocumentalType {
  projectId: Types.ObjectId;
  serviceOrderDate?: Date;
  startDate?: Date;
  endDate?: Date;
  certificateDate?: Date;
  contracts: Contract[];
}
