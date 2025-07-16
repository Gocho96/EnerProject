import axios from "axios";
import { Shopping } from "../types/shopping";
import { API_URL } from "../config/api";

export const getAllShoppings = async () => {
  try {
    return await axios.get<Shopping[]>(`${API_URL}/shopping`);
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingById = async (id: string) => {
  try {
    return await axios.get<Shopping>(`${API_URL}/shopping/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingsByProjectId = async (projectId: string) => {
  try {
    return await axios.get<Shopping[]>(`${API_URL}/shopping/project/${projectId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getShoppingsByProjectCode = async (code: string) => {
  try {
    return await axios.get<Shopping[]>(`${API_URL}/shopping/project/code/${code}`);
  } catch (error) {
    console.log(error);
  }
};

export const createShopping = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/shopping`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createShoppingByProjectId = async (
  projectId: string,
  shopping: Omit<Shopping, "_id" | "createdAt" | "updatedAt" | "materialTotal">
) => {
  try {
    return await axios.post(`${API_URL}/shopping/project/${projectId}`, shopping);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateShopping = async (
  id: string,
  shopping: Partial<Shopping>
) => {
  try {
    return await axios.patch(`${API_URL}/shopping/${id}`, shopping);
  } catch (error) {
    console.log(error);
  }
};

export const deleteShopping = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/shopping/${id}`);
  } catch (error) {
    console.log(error);
  }
};
