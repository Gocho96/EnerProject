import axios from "axios";
import { Retie } from "../types/phases/retie";
import { API_URL } from "../config/api";

export const getAllReties = async () => {
  try {
    return await axios.get<Retie[]>(`${API_URL}/retie`);
  } catch (error) {
    console.error("Error al obtener todos los RETIEs", error);
    throw error;
  }
};

export const getRetieById = async (id: string) => {
  try {
    return await axios.get<Retie>(`${API_URL}/retie/${id}`);
  } catch (error) {
    console.error("Error al obtener RETIE por ID", error);
    throw error;
  }
};

export const getRetieByProjectCode = async (code: string) => {
  try {
    return await axios.get<Retie>(`${API_URL}/retie/project/code/${code}`);
  } catch (error) {
    console.error("Error al obtener RETIE por código de proyecto", error);
    throw error;
  }
};

export const createRetie = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/retie`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRetie = async (
  id: string,
  retie: Partial<Retie>
) => {
  try {
    return await axios.put(`${API_URL}/retie/${id}`, retie);
  } catch (error) {
    console.error("Error al actualizar RETIE", error);
    throw error;
  }
};

export const deleteRetie = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/retie/${id}`);
  } catch (error) {
    console.error("Error al eliminar RETIE", error);
    throw error;
  }
};
