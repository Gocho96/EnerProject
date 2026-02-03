import { NetworkOperator } from "../../models/phases/networkOperatorModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createNetworkOperatorPhaseService = async (projectId: string) => {
    const phaseFound = await NetworkOperator.findOne({ projectId });
    if (phaseFound) return phaseFound;

    return await NetworkOperator.create({ projectId });
};

export const addApplicationOrService = async (projectId: string, data: any) => {
    const networkOperator = await NetworkOperator.findOne({ projectId });
    if (!networkOperator) {
      throw new Error("NETWORK_OPERATOR_NOT_FOUND");
    }

    const applicationOrFound = networkOperator.applicationsOr.some(
        (app) => app.applicationNumberOr === data.applicationNumberOr   
    );

    if (applicationOrFound) {
        throw new Error("APPLICATION_OR_ALREADY_EXISTS");
    }
  
    networkOperator.applicationsOr.push(data);
    return await networkOperator.save();
};

// ----- READ -----
export const getAllNetworkOperatorsService = async () => {
  return await NetworkOperator.find().sort({ createdAt: -1 });
};

export const getNetworkOperatorService = async (projectId: string) => {
  const networkOperatorFound = await NetworkOperator.findOne({ projectId });
  if (!networkOperatorFound) {
    throw new Error("NETWORK_OPERATOR_NOT_FOUND");
  }
  return networkOperatorFound;
};

export const getApplicationOrService = async (projectId: string, applicationOrId: string) => {
  const networkOperatorFound = await NetworkOperator.findOne({ projectId });

  if (!networkOperatorFound) {
    throw new Error("NETWORK_OPERATOR_NOT_FOUND");
  }
  const applicationOr = networkOperatorFound.applicationsOr.id(applicationOrId);
  if (!applicationOr) {
    throw new Error("APPLICATION_OR_NOT_FOUND");
  }
  return { projectId, applicationOr };
};

// ----- UPDATE -----
export const updateNetworkOperatorService = async (projectId: string, data: any) => {
    const updateData = filterUpdateData(data);

    const networkOperator = await NetworkOperator.findOneAndUpdate({ projectId }, updateData, { new: true });
    if (!networkOperator) {
      throw new Error("NETWORK_OPERATOR_NOT_FOUND");
    }
    return networkOperator;
};

export const updateApplicationOrService = async (projectId: string, applicationOrId: string, data: any) => {
    const updateData = filterUpdateData(data);

    const networkOperatorFound = await NetworkOperator.findOne({ projectId });
    if (!networkOperatorFound) {
      throw new Error("NETWORK_OPERATOR_NOT_FOUND");
    }

    const applicationOr = networkOperatorFound.applicationsOr.id(applicationOrId);
    if (!applicationOr) {
      throw new Error("APPLICATION_OR_NOT_FOUND");
    }

    Object.assign(applicationOr, updateData);
    networkOperatorFound.markModified("applicationsOr");
    await networkOperatorFound.save();
    return networkOperatorFound.applicationsOr.id(applicationOrId);
};

// ----- DELETE -----
export const deleteNetworkOperatorPhaseService = async (projectId: string) => {
  const networkOperator = await NetworkOperator.findOneAndDelete({ projectId });
  if (!networkOperator) {
    throw new Error("NETWORK_OPERATOR_NOT_FOUND");
  }
  return networkOperator;
};

export const deleteApplicationOrService = async (projectId: string, applicationOrId: string) => {
  const networkOperatorFound = await NetworkOperator.findOne({ projectId });
  if (!networkOperatorFound) {
    throw new Error("NETWORK_OPERATOR_NOT_FOUND");
  }
  const applicationOr = networkOperatorFound.applicationsOr.id(applicationOrId);
  if (!applicationOr) {
    throw new Error("APPLICATION_OR_NOT_FOUND");
  }
  applicationOr.deleteOne();
  await networkOperatorFound.save();
  return networkOperatorFound;
};
