import axios from "axios";
import { API_URL } from "../config/api";
import { Maintenance } from "../types/phases/maintenance";

export const getAllMaintenances = async () => {
  try {
    const response = await axios.get<Maintenance[]>(`${API_URL}/maintenance`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los mantenimientos:", error);
    throw new Error("No se pudo obtener la lista de mantenimientos");
  }
};

export const getMaintenanceById = async (id: string) => {
  try {
    const response = await axios.get<Maintenance>(`${API_URL}/maintenance/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener mantenimiento con ID ${id}:`, error);
    throw new Error("No se pudo obtener el mantenimiento solicitado");
  }
};

export const getMaintenancesByProject = async (projectId: string) => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener mantenimientos del proyecto ${projectId}:`, error);
    throw new Error("No se pudo obtener los mantenimientos del proyecto");
  }
};

export const getMaintenancesByProjectCode = async (code: string) => {
  try {
    const response = await axios.get(`${API_URL}/maintenance/project/code/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener mantenimientos del proyecto con code ${code}:`, error);
    throw new Error("No se pudo obtener la información de mantenimientos");
  }
};

export const createMaintenanceDocument = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/maintenance`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addMaintenanceEntry = async (projectId: string, data: any) => {
  try {
     const response = await axios.post(`${API_URL}/maintenance/project/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al agregar mantenimiento:`, error);
    throw new Error("Error al agregar entrada de mantenimiento");
  }
};

export const updateMaintenance = async (
  projectId: string,
  maintenanceId: string,
  data: any
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/maintenance/project/${projectId}/${maintenanceId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar mantenimiento`, error);
    throw new Error("Error al actualizar la entrada de mantenimiento");
  }
};

export const updateMaintenanceFrequency = async (
  projectId: string,
  data: { maintenanceFrequency?: number; nextMaintenance?: string }
) => {
  try {
    const response = await axios.patch(`${API_URL}/maintenance/frequency/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar frecuencia para el proyecto ${projectId}:`, error);
    throw new Error("Error al actualizar la frecuencia de mantenimiento");
  }
};

export const deleteMaintenance = async (projectId: string, maintenanceId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/maintenance/project/${projectId}/${maintenanceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar mantenimiento ${maintenanceId}:`, error);
    throw new Error("Error al eliminar la entrada de mantenimiento");
  }
};
