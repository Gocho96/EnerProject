export interface NetworkOperator {
  _id: string;
  projectId: string;

  applicationDateOr?: string;
  applicationNumberOr?: string;
  nameOr?: string;
  meterDeliveryDateOr?: string;
  inspectionDateOr?: string;
  approvalDateOr?: string;

  createdAt: string;
  updatedAt: string;
}
