export interface Shopping {
  _id: string;
  projectId: string;
  materialDescription?: string;
  materialQuantity?: number;
  materialSupplier?: string;
  materialInvoice?: string;
  materialDate?: string;
  materialSubtotal?: number;
  materialIVA?: number;
  materialTotal?: number;
  createdAt: string;
  updatedAt: string;
}
