import { Installation } from "../../models/phases/installationModel";
import { filterUpdateData } from "../../utils/filterUpdateData";

// ----- CREATE -----
export const createInstallationPhaseService = async (projectId: string) => {
  const phaseFound = await Installation.findOne({ projectId });
  if (phaseFound) return phaseFound;

  return await Installation.create({ projectId });
};

export const addDailyLogService = async (projectId: string, data: any) => {
  const installation = await Installation.findOne({ projectId });
  if (!installation) {
    throw new Error("INSTALLATION_NOT_FOUND");
  }

  const incomingDate = new Date(data.date).toISOString();

  const dailyLogFound = installation.dailyLog.some(
    (log) => new Date(log.date).toISOString() === incomingDate
  );

  if (dailyLogFound) {
    throw new Error("DAILY_LOG_ALREADY_EXISTS");
  }

  installation.dailyLog.push(data);
  return await installation.save();
};

// ----- READ -----
export const getAllInstallationsService = async () => {
  return await Installation.find().sort({ createdAt: -1 });
};

export const getInstallationService = async (projectId: string) => {
    const installationFound = await Installation.findOne({ projectId });
    if (!installationFound) {
      throw new Error("INSTALLATION_NOT_FOUND");
    }   
  return installationFound;
};

export const getDailyLogService = async (projectId: string, dailyLogId: string) => {
    const installationFound = await Installation.findOne({ projectId });

    if (!installationFound) {
      throw new Error("INSTALLATION_NOT_FOUND");
    }
    const dailyLog = installationFound.dailyLog.id(dailyLogId);
    if (!dailyLog) {
      throw new Error("DAILY_LOG_NOT_FOUND");
    }
  return { projectId, dailyLog };
};

// ----- UPDATE -----
export const updateDailyLogService = async (projectId: string, dailyLogId: string, data: any) => {
  const updateData = filterUpdateData(data);

  const installationFound = await Installation.findOne({ projectId });
  if (!installationFound) {
    throw new Error("INSTALLATION_NOT_FOUND");
  }

  const dailyLog = installationFound.dailyLog.id(dailyLogId);
  if (!dailyLog) {
    throw new Error("DAILY_LOG_NOT_FOUND");
  }

  Object.assign(dailyLog, updateData);
  installationFound.markModified("dailyLog");
  await installationFound.save();
  return installationFound.dailyLog.id(dailyLogId);
}

// ----- DELETE -----
export const deleteInstallationPhaseService = async (projectId: string) => {
  const installation = await Installation.findOneAndDelete({ projectId });
  if (!installation) {
    throw new Error("INSTALLATION_NOT_FOUND");
  }
  return installation;
}

export const deleteDailyLogService = async (projectId: string, dailyLogId: string) => {
  const installationFound = await Installation.findOne({ projectId });
  if (!installationFound) {
    throw new Error("INSTALLATION_NOT_FOUND");
  } 
  const dailyLog = installationFound.dailyLog.id(dailyLogId);
  if (!dailyLog) {
    throw new Error("DAILY_LOG_NOT_FOUND");
  }
  dailyLog.deleteOne();
  await installationFound.save();
  return installationFound;
}
