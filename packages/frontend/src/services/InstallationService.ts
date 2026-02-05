import axios from "axios";
import { Installation, DailyLogEntry } from "../types/phases/installation";
import { API_URL } from "../config/api";

// CRUD FOR INSTALLATIONS
export const createInstallation = async (
  data: { projectId: string }
): Promise<Installation> => {
  try {
    const response = await axios.post<Installation>(
      `${API_URL}/installation`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la instalación", error);
    throw error;
  }
};

export const getInstallationByProjectCode = async (
  code: string
): Promise<Installation> => {
  try {
  const response = await axios.get<Installation>(
      `${API_URL}/installation/project/code/${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la instalación", error);
    throw error;
  }
};

// CRUD FOR DAILYS LOGS
export const createDailyLog = async (
  installationId: string,
  log: DailyLogEntry | DailyLogEntry[]
) : Promise<DailyLogEntry> => {
  try {
    const response = await axios.post<DailyLogEntry>(
      `${API_URL}/installation/${installationId}/dailylog`,
      { dailyLog: log }
    );
    return response.data;
  } catch (error) {
    console.log("Error al crear la bitácora", error);
    throw error;
  }
};

export const updateDailyLogById = async (
  installationId: string,
  logId: string,
  log: DailyLogEntry
) => {
  try {
    return await axios.patch(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`,
      { dailyLog: log }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDailyLog = async (installationId: string, logId: string) => {
  try {
    return await axios.delete(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
