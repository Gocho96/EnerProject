import axios from "axios";
import { Engineering } from "../types/engineering";
import { API_URL } from "../config/api";

export const getAllEngineerings = async () => {
  try {
    return await axios.get<Engineering[]>(`${API_URL}/engineering`);
  } catch (error) {
    console.log(error);
  }
};

export const getEngineeringById = async (id: string) => {
  try {
    return await axios.get<Engineering>(`${API_URL}/engineering/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getEngineeringsByProject = async (projectId: string) => {
  try {
    return await axios.get<Engineering[]>(
      `${API_URL}/engineering/project/${projectId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const createEngineering = async (
  engineering: Omit<Engineering, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.post(`${API_URL}/engineering`, engineering);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEngineering = async (
  id: string,
  engineering: Partial<Engineering>
) => {
  try {
    return await axios.put(`${API_URL}/engineering/${id}`, engineering);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEngineering = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/engineering/${id}`);
  } catch (error) {
    console.log(error);
  }
};
