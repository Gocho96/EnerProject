import axios from "axios";
import { Retie } from "../types/retie";
import { API_URL } from "../config/api";

export const getAllReties = async () => {
  try {
    const res = await axios.get<Retie[]>(`${API_URL}/retie`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener la información RETIE");
  }
};

export const getRetieById = async (id: string) => {
  try {
    const res = await axios.get<Retie>(`${API_URL}/retie/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener información RETIE por ID");
  }
};

export const getRetieByProject = async (projectId: string) => {
  try {
    const res = await axios.get<Retie[]>(`${API_URL}/retie/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener información RETIE por proyecto");
  }
};

export const createRetie = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/retie`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear información RETIE");
  }
};

export const updateRetie = async (id: string, data: any) => {
  try {
    const res = await axios.put(`${API_URL}/retie/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar información RETIE");
  }
};

export const deleteRetie = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/retie/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar información RETIE");
  }
};
