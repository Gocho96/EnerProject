import axios from "axios";
import { Engineering } from "../types/engineering";
import { API_URL } from "../config/api";

export const getAllEngineerings = async () => {
  try {
    return await axios.get<Engineering[]>(`${API_URL}/engineering`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEngineeringById = async (id: string) => {
  try {
    return await axios.get<Engineering>(`${API_URL}/engineering/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEngineeringByProjectCode = async (code: string) => {
  try {
    return await axios.get<Engineering>(`${API_URL}/engineering/project/code/${code}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createEngineering = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/engineering`, data);
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
    return await axios.patch(`${API_URL}/engineering/${id}`, engineering);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEngineering = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/engineering/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
