import { Retie } from "../../models/phases/retieModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createRetiePhaseService = async (projectId: string) => {
  const phaseFound = await Retie.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Retie.create({ projectId });
};

// ----- READ -----
export const getAllRetiesService = async () => {
  return await Retie.find().sort({ createdAt: -1 });
};

export const getRetieService = async (projectId: string) => {
    const retieFound = await Retie.findOne({ projectId });
    if (!retieFound) {
      throw new Error("RETIE_NOT_FOUND");
    }   
  return retieFound;  
};

// ----- UPDATE -----
export const updateRetieService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const retie = await Retie.findOneAndUpdate({ projectId }, updateData, {  new: true });
  if (!retie) {
    throw new Error("RETIE_NOT_FOUND");
  }
  
  Object.assign(retie, updateData);
  await retie.save();
  return retie;
};

// ----- DELETE -----
export const deleteRetiePhaseService = async (projectId: string) => {
  const retie = await Retie.findOneAndDelete({ projectId });
  if (!retie) {
    throw new Error("RETIE_NOT_FOUND");
  }
  return retie;
};