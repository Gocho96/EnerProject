import { Sales } from "../../models/phases/salesModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createSalesPhaseService = async (projectId: string) => {
  const phaseFound = await Sales.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Sales.create({ projectId });
};

export const addSaleService = async (projectId: string, data: any) => {
  const saleRecord = await Sales.findOne({ projectId });
  if (!saleRecord) {
    throw new Error("SALES_NOT_FOUND");
  }

  const saleFound = saleRecord.salesRecords.some(
    (record) => record.saleNumber === data.saleNumber,
  );

  if (saleFound) {
    throw new Error("SALE_ALREADY_EXISTS");
  }

  saleRecord.salesRecords.push(data);
  return await saleRecord.save();
};

// ----- READ -----
export const getAllSalesService = async () => {
  return await Sales.find().sort({ createdAt: -1 });
};

export const getSaleService = async (projectId: string) => {
    const salesFound = await Sales.findOne({ projectId });
    if (!salesFound) {
      throw new Error("SALES_NOT_FOUND");
    }   
  return salesFound;
};

export const getOneSaleService = async (projectId: string, saleId: string) => {
    const saleFound = await Sales.findOne({ projectId });

    if (!saleFound) {
      throw new Error("SALES_NOT_FOUND");
    }
    const saleRecord = saleFound.salesRecords.id(saleId);
    if (!saleRecord) {
      throw new Error("SALE_NOT_FOUND");
    }
  return { projectId, saleRecord };
};

// ----- UPDATE -----
export const updateSaleService = async (projectId: string, saleId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const saleFound = await Sales.findOne({ projectId });
  if (!saleFound) {
    throw new Error("SALES_NOT_FOUND");
  }

  const saleRecord = saleFound.salesRecords.id(saleId);
  if (!saleRecord) {
    throw new Error("SALE_RECORD_NOT_FOUND");
  }

  Object.assign(saleRecord, updateData);
  saleFound.markModified("salesRecords");
  await saleFound.save();
  return saleFound;
}

// ----- DELETE -----
export const deleteSalesPhaseService = async (projectId: string) => {
  const saleDelete = await Sales.findOneAndDelete({ projectId });
  if (!saleDelete) {
    throw new Error("SALES_NOT_FOUND");
  }
  return saleDelete;
}

export const deleteSaleService = async (projectId: string, saleId: string) => {
  const saleFound = await Sales.findOne({ projectId });
  if (!saleFound) {
    throw new Error("SALES_NOT_FOUND");
  } 
  const saleRecord = saleFound.salesRecords.id(saleId);
  if (!saleRecord) {
    throw new Error("SALE_RECORD_NOT_FOUND");
  }
  saleRecord.deleteOne();
  await saleFound.save();
  return saleFound;
}
