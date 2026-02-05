import { Engineering } from "../../models/phases/engineeringModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createEngineeringPhaseService = async (projectId: string) => {
  const phaseFound = await Engineering.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Engineering.create({ projectId });
};

// ----- READ -----
export const getAllEngineeringsService = async () => {
  return await Engineering.find().sort({ createdAt: -1 });
};

export const getEngeneeringService = async (projectId: string) => {
    const engineeringFound = await Engineering.findOne({ projectId });
    if (!engineeringFound) {
      throw new Error("ENGINEERING_NOT_FOUND");
    }   
  return engineeringFound;  
};

// ----- UPDATE -----
export const updateEngineeringService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const engineering = await Engineering.findOneAndUpdate({ projectId }, updateData, {  new: true });
  if (!engineering) {
    throw new Error("ENGINEERING_NOT_FOUND");
  }
  
  Object.assign(engineering, updateData);
  await engineering.save();
  return engineering;
};

// ----- DELETE -----
export const deleteEngineeringPhaseService = async (projectId: string) => {
  const engineering = await Engineering.findOneAndDelete({ projectId });
  if (!engineering) {
    throw new Error("ENGINEERING_NOT_FOUND");
  }
  return engineering;
};