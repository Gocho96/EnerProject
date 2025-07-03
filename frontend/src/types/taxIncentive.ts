export interface SecondaryBeneficiary {
  name?: string;
  numberDocument?: string;
}

export interface TaxIncentive {
  _id: string;
  projectId: string;

  filingNumberIt?: string;
  dateFilingIt?: string;

  investmentValueIt?: number;
  paymentValueIt?: number;
  paymentDateIt?: string;
  paymentNumberIt?: string;

  evaluationDateIt?: string;
  certificateNumberIt?: string;
  certificateDateIt?: string;

  secondaryBeneficiaries: SecondaryBeneficiary[];

  createdAt: string;
  updatedAt: string;
}
