import { Purchase } from "../../models/phases/purchasesModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createPurchasePhaseService = async (projectId: string) => {
  const phaseFound = await Purchase.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Purchase.create({ projectId });
};

export const addPurchaseService = async (projectId: string, data: any) => {
  const purchaseRecord = await Purchase.findOne({ projectId });
  if (!purchaseRecord) {
    throw new Error("PURCHASE_NOT_FOUND");
  }

  const purchaseFound = purchaseRecord.purchaseRecords.some(
    (record) => record.purchaseNumber === data.purchaseNumber,
  );

  if (purchaseFound) {
    throw new Error("PURCHASE_ALREADY_EXISTS");
  }

  purchaseRecord.purchaseRecords.push(data);
  return await purchaseRecord.save();
};

// ----- READ -----
export const getAllPurchasesService = async () => {
  return await Purchase.find().sort({ createdAt: -1 });
};

export const getPurchaseService = async (projectId: string) => {
    const purchaseFound = await Purchase.findOne({ projectId });
    if (!purchaseFound) {
      throw new Error("PURCHASE_NOT_FOUND");
    }   
  return purchaseFound;
};

export const getOnePurchaseService = async (projectId: string, purchaseId: string) => {
    const purchaseFound = await Purchase.findOne({ projectId });

    if (!purchaseFound) {
      throw new Error("PURCHASE_NOT_FOUND");
    }
    const purchaseRecord = purchaseFound.purchaseRecords.id(purchaseId);
    if (!purchaseRecord) {
      throw new Error("PURCHASE_NOT_FOUND");
    }
  return { projectId, purchaseRecord };
};

// ----- UPDATE -----
export const updatePurchaseService = async (projectId: string, purchaseId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const purchaseFound = await Purchase.findOne({ projectId });
  if (!purchaseFound) {
    throw new Error("PURCHASE_NOT_FOUND");
  }

  const purchaseRecord = purchaseFound.purchaseRecords.id(purchaseId);
  if (!purchaseRecord) {
    throw new Error("PURCHASE_RECORD_NOT_FOUND");
  }

  Object.assign(purchaseRecord, updateData);
  purchaseFound.markModified("purchaseRecords");
  await purchaseFound.save();
  return purchaseFound;
}

// ----- DELETE -----
export const deletePurchasePhaseService = async (projectId: string) => {
  const purchaseRecord = await Purchase.findOneAndDelete({ projectId });
  if (!purchaseRecord) {
    throw new Error("PURCHASE_NOT_FOUND");
  }
  return purchaseRecord;
}

export const deletePurchaseService = async (projectId: string, purchaseId: string) => {
  const purchaseFound = await Purchase.findOne({ projectId });
  if (!purchaseFound) {
    throw new Error("PURCHASE_NOT_FOUND");
  } 
  const purchaseRecord = purchaseFound.purchaseRecords.id(purchaseId);
  if (!purchaseRecord) {
    throw new Error("PURCHASE_RECORD_NOT_FOUND");
  }
  purchaseRecord.deleteOne();
  await purchaseFound.save();
  return purchaseFound;
}