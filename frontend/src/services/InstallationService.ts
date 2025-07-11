import axios from "axios";
import { API_URL } from "../config/api";
import { Installation, DailyLogEntry } from "../types/installation";

export const getInstallationByProjectCode = async (code: string): Promise<Installation> => {
  const response = await axios.get<Installation>(
    `${API_URL}/installation/project/code/${code}`
  );
  return response.data;
};

export const createDailyLog = async (
  projectId: string,
  log: DailyLogEntry
): Promise<Installation> => {
  const response = await axios.post(`${API_URL}/installation/dailylog/${projectId}`, {
    dailyLog: log,
  });
  return response.data;
};

export const updateDailyLog = async (
  installationId: string,
  logId: string,
  log: DailyLogEntry
): Promise<Installation> => {
  const response = await axios.put(
    `${API_URL}/installation/${installationId}/dailylog/${logId}`,
    { dailyLog: log }
  );
  return response.data;
};

export const deleteDailyLog = async (
  installationId: string,
  logId: string
): Promise<{ message: string }> => {
  const response = await axios.delete(
    `${API_URL}/installation/${installationId}/dailylog/${logId}`
  );
  return response.data;
};
