import axios from "axios";
import { Installation } from "../types/installation";
import { API_URL } from "../config/api";


export const getAllInstallations = async () => {
  try {
    return await axios.get<Installation[]>(`${API_URL}/installation`);
  } catch (error) {
    console.log(error);
  }
};

export const getInstallationById = async (id: string) => {
  try {
    return await axios.get<Installation>(`${API_URL}/installation/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getInstallationsByProject = async (projectId: string) => {
  try {
    return await axios.get<Installation[]>(
      `${API_URL}/installation/project/${projectId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const createInstallation = async (
  installation: Omit<Installation, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.post(`${API_URL}/installation`, installation);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addDailyLogToInstallation = async (
  projectId: string,
  dailyLog: any | any[]
) => {
  try {
    return await axios.post(`${API_URL}/installation/dailylog/${projectId}`, {
      dailyLog,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateInstallation = async (
  id: string,
  data: Partial<Installation>
) => {
  try {
    return await axios.put(`${API_URL}/installation/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const updateDailyLogById = async (
  installationId: string,
  logId: string,
  data: any
) => {
  try {
    return await axios.put(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteInstallation = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/installation/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDailyLogById = async (
  installationId: string,
  logId: string
) => {
  try {
    return await axios.delete(
      `${API_URL}/installation/${installationId}/dailylog/${logId}`
    );
  } catch (error) {
    console.log(error);
  }
};
