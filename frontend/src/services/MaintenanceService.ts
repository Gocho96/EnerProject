import axios from "axios";
import { Maintenance } from "../types/maintenance";

const API = "http://localhost:3000/api";

export const getAllMaintenances = async () => {
  try {
    return await axios.get<Maintenance[]>(`${API}/maintenance`);
  } catch (error) {
    console.log(error);
  }
};

export const getMaintenanceById = async (id: string) => {
  try {
    return await axios.get<Maintenance>(`${API}/maintenance/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getMaintenancesByProject = async (projectId: string) => {
  try {
    return await axios.get(`${API}/maintenance/project/${projectId}`);
  } catch (error) {
    console.log(error);
  }
};

export const createMaintenanceDocument = async (data: any) => {
  try {
    return await axios.post(`${API}/maintenance`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addMaintenanceEntry = async (projectId: string, data: any) => {
  try {
    return await axios.post(`${API}/maintenance/project/${projectId}`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMaintenanceEntry = async (
  projectId: string,
  maintenanceId: string,
  data: any
) => {
  try {
    return await axios.put(
      `${API}/maintenance/project/${projectId}/${maintenanceId}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateMaintenanceFrequency = async (
  projectId: string,
  data: { maintenanceFrequency?: string; nextMaintenance?: string }
) => {
  try {
    return await axios.put(`${API}/maintenance/frequency/${projectId}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMaintenanceEntry = async (
  projectId: string,
  maintenanceId: string
) => {
  try {
    return await axios.delete(
      `${API}/maintenance/project/${projectId}/${maintenanceId}`
    );
  } catch (error) {
    console.log(error);
  }
};
