import axios from "axios";
import { API_URL } from "../config/api";
import { Shopping, MaterialItem } from "../types/shopping";

export const getAllShoppings = async () => {
  try {
    return await axios.get<Shopping[]>(`${API_URL}/shopping`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getShoppingById = async (id: string) => {
  try {
    return await axios.get<Shopping>(`${API_URL}/shopping/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getShoppingByProjectCode = async (code: string) => {
  try {
    return await axios.get<Shopping>(
      `${API_URL}/shopping/project/code/${code}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createShopping = async (data: { projectId: string } ) => {
  try {
    return await axios.post(`${API_URL}/shopping`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addMaterialToShopping = async (
  projectId: string,
  material: Omit<MaterialItem, "_id" | "materialTotal">
) => {
  try {
    return await axios.post(
      `${API_URL}/shopping/project/${projectId}/material`,
      material
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMaterial = async (
  projectId: string,
  materialId: string,
  material: Omit<MaterialItem, "_id" | "materialTotal">
) => {
  return await axios.put(
    `${API_URL}/shopping/project/${projectId}/material/${materialId}`,
    material
  );
};

export const deleteMaterial = async (projectId: string, materialId: string) => {
  try {
    return await axios.delete(
      `${API_URL}/shopping/project/${projectId}/material/${materialId}`
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
