import axios from "axios";
import { Project } from "../types/project";
import { API_URL } from "../config/api";

export const getProjects = async () => {
  try {
    return await axios.get<Project[]>(`${API_URL}/proyectos`);
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (id: string) => {
  try {
    return await axios.get<Project>(`${API_URL}/proyectos/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createProject = async (project: Project) => {
  try {
    return await axios.post(`${API_URL}/proyectos/`, project);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Project) => {
  try {
    return await axios.put<Project>(`${API_URL}/proyectos/${id}`, project);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (id: string) => {
  try {
    return await axios.delete<Project>(`${API_URL}/proyectos/${id}`);
  } catch (error) {
    console.log(error);
  }
};
