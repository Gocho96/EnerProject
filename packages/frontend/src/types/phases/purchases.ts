export interface Billing {
  _id: string;
  projectId: string;
  billingNumber: string;
  billingDate: string;
  billingConcept: string;
  billingSubtotal: number;
  billingIva: number;
  billingTotal: number;
  createdAt: string;
  updatedAt: string;
}
