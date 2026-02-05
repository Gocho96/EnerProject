import axios from "axios";
import { Project } from "../types/project";
import { API_URL } from "../config/api";

export const getProjects = async (
): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(
      `${API_URL}/project`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los proyectos", error);
    throw error;
  }
};

export const getProject = async (id: string) => {
  try {
    return await axios.get<Project>(`${API_URL}/project/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createProject = async (project: Project) => {
  try {
    const response = await axios.post(`${API_URL}/project`, project);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateProject = async (id: string, project: Project) => {
  try {
    return await axios.put<Project>(`${API_URL}/project/${id}`, project);
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    return await axios.delete<Project>(`${API_URL}/project/${id}`);
  } catch (error) {
    throw error;
  }
};
