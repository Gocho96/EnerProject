export interface Shopping {
  _id: string;
  projectId: string;
  materialItem: MaterialItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MaterialItem {
  _id?: string;
  materialDescription: string;
  materialQuantity: number | undefined;
  materialSupplier: string;
  materialInvoice: string;
  materialDate: string;
  materialSubtotal: number | undefined;
  materialIVA: number | undefined;
  materialTotal: number | undefined;
}
