import axios from "axios";
import { API_URL } from "../config/api";
import { Installation, DailyLogEntry } from "../types/installation";

export const getInstallationByProjectCode = async (code: string): Promise<Installation> => {
  const response = await axios.get<Installation>(
    `${API_URL}/installation/project/code/${code}`
  );
  return response.data;
};

export const createInstallation = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/installation`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createDailyLog = async (
  projectId: string,
  log: DailyLogEntry | DailyLogEntry[]
) => {
  try {
    return await axios.post(`${API_URL}/installation/dailylog/${projectId}`, {
      dailyLog: log,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDailyLog = async (
  installationId: string,
  logId: string,
  log: DailyLogEntry
) => {
  try {
    return await axios.put(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`,
      { dailyLog: log }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDailyLog = async (
  installationId: string,
  logId: string
) => {
  try {
    return await axios.delete(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
