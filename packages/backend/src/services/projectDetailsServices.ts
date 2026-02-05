import { ProjectDetails } from "../models/projectDetailsModel";
import { filterUpdateData } from "../utils/filterUpdateData";
import { Types } from "mongoose";

// ----- CREATE -----
export const createProjectDetailsService = async (projectId: string) => {
  const detailsFound = await ProjectDetails.findOne({ projectId });
  if (detailsFound) return detailsFound;

  return await ProjectDetails.create({ projectId });
};

export const addContactPersonService = async (projectId: string, data: any) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  projectFound.contactPerson.push(data);

  return await projectFound.save();
};

export const addSolarPanelService = async (projectId: string, data: any) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  projectFound.solarPanels.push(data);

  return await projectFound.save();
};

export const addInverterService = async (projectId: string, data: any) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  projectFound.inverters.push(data);

  return await projectFound.save();
};

export const addBatteryService = async (projectId: string, data: any) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  projectFound.batteries.push(data);

  return await projectFound.save();
};

// ----- READ -----
export const getAllProjectDetailsService = async () => {
  return await ProjectDetails.find().sort({ createdAt: -1 });
};

export const getAllContactPersonsService = async () => {
  const projectFound = await ProjectDetails.find();
  const allContacts = projectFound.flatMap((project) =>
    project.contactPerson.map((property) => ({
      ...property.toObject(),
      projectId: project.projectId,
    })),
  );
  return allContacts;
};

export const getAllSolarPanelsService = async () => {
  const projectFound = await ProjectDetails.find();
  const allSolarPanels = projectFound.flatMap((project) =>
    project.solarPanels.map((property) => ({
      ...property.toObject(),
      projectId: project.projectId,
    })),
  );
  return allSolarPanels;
};

export const getAllInvertersService = async () => {
  const projectFound = await ProjectDetails.find();
  const allInverters = projectFound.flatMap((project) =>
    project.inverters.map((property) => ({
      ...property.toObject(),
      projectId: project.projectId,
    })),
  );
  return allInverters;
};

export const getAllBatteriesService = async () => {
  const projectFound = await ProjectDetails.find();
  const allBateries = projectFound.flatMap((project) =>
    project.batteries.map((property) => ({
      ...property.toObject(),
      projectId: project.projectId,
    })),
  );
  return allBateries;
};

export const getProjectDetailsService = async (projectId: string) => {
  const projectDetailsFound = await ProjectDetails.findOne({ projectId });
  if (!projectDetailsFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  return projectDetailsFound;
};

export const getContactPersonService = async (projectId: string, contactId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });

  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const contact = projectFound.contactPerson.id(contactId);
  if (!contact) {
    throw new Error("CONTACT_NOT_FOUND");
  }
  return contact;
};

export const getSolarPanelService = async (projectId: string, solarPanelId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });

  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const solarPanel = projectFound.solarPanels.id(solarPanelId);
  if (!solarPanel) {
    throw new Error("SOLAR_PANEL_NOT_FOUND");
  }
  return solarPanel;
};

export const getInverterService = async (projectId: string, inverterId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });

  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const inverter = projectFound.inverters.id(inverterId);
  if (!inverter) {
    throw new Error("INVERTER_NOT_FOUND");
  }
  return inverter;
};

export const getBatteryService = async (projectId: string, batteryId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });

  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const battery = projectFound.batteries.id(batteryId);
  if (!battery) {
    throw new Error("BATTERY_NOT_FOUND");
  }
  return battery;
};

// ----- UPDATE -----
export const updateProjectDetailsService = async (projectId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const projectDetailsUpdated = await ProjectDetails.findOneAndUpdate({ projectId }, updateData, {  new: true });
  if (!projectDetailsUpdated) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  return projectDetailsUpdated;
};

export const updateContactPersonService = async (projectId: string, contactId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const contactUpdated = projectFound.contactPerson.id(contactId);
  if (!contactUpdated) {
    throw new Error("CONTACT_NOT_FOUND");
  }

  Object.assign(contactUpdated, updateData);
  projectFound.markModified("contactPerson");
  await projectFound.save();
  return projectFound.contactPerson.id(contactId);
};

export const updateSolarPanelService = async (projectId: string, solarPanelId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const solarPanelUpdated = projectFound.solarPanels.id(solarPanelId);
  if (!solarPanelUpdated) {
    throw new Error("SOLAR_PANEL_NOT_FOUND");
  }

  Object.assign(solarPanelUpdated, updateData);
  projectFound.markModified("solarPanels");
  await projectFound.save();
  return projectFound.solarPanels.id(solarPanelId);
};

export const updateInverterService = async (projectId: string, inverterId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const inverterUpdated = projectFound.inverters.id(inverterId);
  if (!inverterUpdated) {
    throw new Error("INVERTER_NOT_FOUND");
  }

  Object.assign(inverterUpdated, updateData);
  projectFound.markModified("inverters");
  await projectFound.save();
  return projectFound.inverters.id(inverterId);
};

export const updateBatteryService = async (projectId: string, batteryId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }

  const batteryUpdated = projectFound.batteries.id(batteryId);
  if (!batteryUpdated) {
    throw new Error("BATTERY_NOT_FOUND");
  }

  Object.assign(batteryUpdated, updateData);
  projectFound.markModified("batteries");
  await projectFound.save();
  return projectFound.batteries.id(batteryId);
};

// ----- DELETE -----
export const deleteProjectDetailsService = async (projectId: string) => {
  const projectDelete = await ProjectDetails.findOneAndDelete({ projectId });
  if (!projectDelete) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  return projectDelete;
};

export const deleteContactPersonService = async (projectId: string, contactId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  const solarPanelDelete = projectFound.contactPerson.id(contactId);
  if (!solarPanelDelete) {
    throw new Error("CONTACT_NOT_FOUND");
  }
  solarPanelDelete.deleteOne();
  await projectFound.save();
  return projectFound;
};

export const deleteSolarPanelService = async (projectId: string, solarPanelId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  const solarPanelDelete = projectFound.solarPanels.id(solarPanelId);
  if (!solarPanelDelete) {
    throw new Error("SOLAR_PANEL_NOT_FOUND");
  }
  solarPanelDelete.deleteOne();
  await projectFound.save();
  return projectFound;
};

export const deleteInverterService = async (projectId: string, inverterId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  const inverterDelete = projectFound.inverters.id(inverterId);
  if (!inverterDelete) {
    throw new Error("INVERTER_NOT_FOUND");
  }
  inverterDelete.deleteOne();
  await projectFound.save();
  return projectFound;
};

export const deleteBatteryService = async (projectId: string, batteryId: string) => {
  const projectFound = await ProjectDetails.findOne({ projectId });
  if (!projectFound) {
    throw new Error("PROJECT_DETAILS_NOT_FOUND");
  }
  const batteryDelete = projectFound.batteries.id(batteryId);
  if (!batteryDelete) {
    throw new Error("BATTERY_NOT_FOUND");
  }
  batteryDelete.deleteOne();
  await projectFound.save();
  return projectFound;
};
