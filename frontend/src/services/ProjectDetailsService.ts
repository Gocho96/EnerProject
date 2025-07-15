import axios from "axios";
import { ProjectDetails } from "../types/projectDetails";
import { API_URL } from "../config/api";

export const getAllProjectDetails = async () => {
  try {
    const res = await axios.get<ProjectDetails[]>(`${API_URL}/project-details`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener todos los detalles del proyecto");
  }
};

export const getProjectDetailsById = async (id: string) => {
  try {
    const res = await axios.get<ProjectDetails>(
      `${API_URL}/project-details/${id}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener detalles del proyecto por ID");
  }
};

export const getProjectDetailsByProject = async (projectId: string) => {
  try {
    const res = await axios.get<ProjectDetails[]>(
      `${API_URL}/project-details/project/${projectId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener detalles del proyecto por projectId");
  }
};

export const getProjectDetailsByProjectCode = async (code: string) => {
  try {
    const res = await axios.get<ProjectDetails>(
      `${API_URL}/project-details/code/${code}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener detalles del proyecto por código");
  }
};

interface CreateProjectDetailsInput {
  projectId: string;
  projectOwner?: string;
  typeDocument?: string;
  documentNumber?: string;
  address?: string;
  location?: string;
  city?: string;
  department?: string;
  contactPerson?: any[];
  solarPanels?: any[];
  inverters?: any[];
  batteries?: any[];
}

export const createProjectDetails = async ({
  projectId,
}: CreateProjectDetailsInput) => {
  try {
    const res = await axios.post(`${API_URL}/project-details`, {
      projectId,
      projectOwner: "",
      typeDocument: undefined,
      documentNumber: "",
      address: "",
      location: "",
      city: "",
      department: "",
      contactPerson: [],
      solarPanels: [],
      inverters: [],
      batteries: [],
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear detalles del proyecto:", error);
    throw new Error("Error al crear detalles del proyecto");
  }
};

export const updateProjectDetails = async (projectId: string, data: any) => {
  try {
    const res = await axios.put(
      `${API_URL}/project-details/project/${projectId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar detalles del proyecto");
  }
};

export const deleteProjectDetails = async (projectId: string) => {
  try {
    const res = await axios.delete(
      `${API_URL}/project-details/project/${projectId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar detalles del proyecto");
  }
};

export const addContactPerson = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(
      `${API_URL}/project-details/project/${projectId}/contact-person`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar contacto");
  }
};

export const updateContactPerson = async (
  projectId: string,
  contactId: string,
  data: any
) => {
  try {
    const res = await axios.put(
      `${API_URL}/project-details/project/${projectId}/contact-person/${contactId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar contacto");
  }
};

export const deleteContactPerson = async (
  projectId: string,
  contactId: string
) => {
  try {
    const res = await axios.delete(
      `${API_URL}/project-details/project/${projectId}/contact-person/${contactId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar contacto");
  }
};

export const addSolarPanel = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(
      `${API_URL}/project-details/project/${projectId}/solar-panels`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar panel solar");
  }
};

export const updateSolarPanel = async (
  projectId: string,
  panelId: string,
  data: any
) => {
  try {
    const res = await axios.put(
      `${API_URL}/project-details/project/${projectId}/solar-panels/${panelId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar panel solar");
  }
};

export const deleteSolarPanel = async (projectId: string, panelId: string) => {
  try {
    const res = await axios.delete(
      `${API_URL}/project-details/project/${projectId}/solar-panels/${panelId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar panel solar");
  }
};

export const addInverter = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(
      `${API_URL}/project-details/project/${projectId}/inverters`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar inversor");
  }
};

export const updateInverter = async (
  projectId: string,
  inverterId: string,
  data: any
) => {
  try {
    const res = await axios.put(
      `${API_URL}/project-details/project/${projectId}/inverters/${inverterId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar inversor");
  }
};

export const deleteInverter = async (projectId: string, inverterId: string) => {
  try {
    const res = await axios.delete(
      `${API_URL}/project-details/project/${projectId}/inverters/${inverterId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar inversor");
  }
};

export const addBattery = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(
      `${API_URL}/project-details/project/${projectId}/batteries`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar batería");
  }
};

export const updateBattery = async (
  projectId: string,
  batteryId: string,
  data: any
) => {
  try {
    const res = await axios.put(
      `${API_URL}/project-details/project/${projectId}/batteries/${batteryId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar batería");
  }
};

export const deleteBattery = async (projectId: string, batteryId: string) => {
  try {
    const res = await axios.delete(
      `${API_URL}/project-details/project/${projectId}/batteries/${batteryId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar batería");
  }
};
