import axios from "axios";
import { Project } from "../types/project";

const API = "http://localhost:3000/api";

export const getProjects = async () => {
  try {
    return await axios.get<Project[]>(`${API}/proyectos`);
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (id: string) => {
  try {
    return await axios.get<Project>(`${API}/proyectos/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createProject = async (project: Project) => {
  try {
    return await axios.post(`${API}/proyectos/`, project);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Project) => {
  try {
    return await axios.put<Project>(`${API}/proyectos/${id}`, project);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (id: string) => {
  try {
    return await axios.delete<Project>(`${API}/proyectos/${id}`);
  } catch (error) {
    console.log(error);
  }
};
