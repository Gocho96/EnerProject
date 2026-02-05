import { Maintenance } from "../../models/phases/maintenanceModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createMaintenancePhaseService = async (projectId: string) => {
  const phaseFound = await Maintenance.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Maintenance.create({ projectId });
};

export const addMaintenanceRecordService = async (projectId: string, data: any) => {
  const maintenance = await Maintenance.findOne({ projectId });
  if (!maintenance) {
    throw new Error("MAINTENANCE_NOT_FOUND");
  }

  const maintenanceRecordFound = maintenance.maintenanceRecord.some(
    (record) => record.maintenanceNumber === data.maintenanceNumber
  );

  if (maintenanceRecordFound) {
    throw new Error("MAINTENANCE_RECORD_ALREADY_EXISTS");
  }

  maintenance.maintenanceRecord.push(data);
  return await maintenance.save();
};

// ----- READ -----
export const getAllMaintenancesService = async () => {
  return await Maintenance.find().sort({ createdAt: -1 });
};

export const getMaintenanceService = async (projectId: string) => {
    const maintenanceFound = await Maintenance.findOne({ projectId });
    if (!maintenanceFound) {
      throw new Error("MAINTENANCE_NOT_FOUND");
    }   
  return maintenanceFound;
};

export const getMaintenanceRecordService = async (projectId: string, maintenanceRecordId: string) => {
    const maintenanceFound = await Maintenance.findOne({ projectId });

    if (!maintenanceFound) {
      throw new Error("MAINTENANCE_NOT_FOUND");
    }
    const maintenanceRecord = maintenanceFound.maintenanceRecord.id(maintenanceRecordId);
    if (!maintenanceRecord) {
      throw new Error("MAINTENANCE_RECORD_NOT_FOUND");
    }
  return { projectId, maintenanceRecord };
};

// ----- UPDATE -----
export const updateMaintenanceService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const maintenance = await Maintenance.findOneAndUpdate({ projectId }, updateData, { new: true });
  if (!maintenance) {
    throw new Error("MAINTENANCE_NOT_FOUND");
  }
  return maintenance;
};

export const updateMaintenanceRecordService = async (projectId: string, maintenanceRecordId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const maintenanceFound = await Maintenance.findOne({ projectId });
  if (!maintenanceFound) {
    throw new Error("MAINTENANCE_NOT_FOUND");
  }

  const maintenanceRecord = maintenanceFound.maintenanceRecord.id(maintenanceRecordId);
  if (!maintenanceRecord) {
    throw new Error("MAINTENANCE_RECORD_NOT_FOUND");
  }

  Object.assign(maintenanceRecord, updateData);
  maintenanceFound.markModified("maintenanceRecord");
  await maintenanceFound.save();
  return maintenanceFound.maintenanceRecord.id(maintenanceRecordId);
}

// ----- DELETE -----
export const deleteMaintenancePhaseService = async (projectId: string) => {
  const maintenance = await Maintenance.findOneAndDelete({ projectId });
  if (!maintenance) {
    throw new Error("MAINTENANCE_NOT_FOUND");
  }
  return maintenance;
}

export const deleteMaintenanceRecordService = async (projectId: string, maintenanceRecordId: string) => {
  const maintenanceFound = await Maintenance.findOne({ projectId });
  if (!maintenanceFound) {
    throw new Error("MAINTENANCE_NOT_FOUND");
  } 
  const maintenanceRecord = maintenanceFound.maintenanceRecord.id(maintenanceRecordId);
  if (!maintenanceRecord) {
    throw new Error("MAINTENANCE_RECORD_NOT_FOUND");
  }
  maintenanceRecord.deleteOne();
  await maintenanceFound.save();
  return maintenanceFound;
};
