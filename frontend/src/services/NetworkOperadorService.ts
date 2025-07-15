import axios from "axios";
import { API_URL } from "../config/api";
import { NetworkOperator } from "../types/networkOperador";

export const getAllNetworkOperators = async () => {
  try {
    return await axios.get<NetworkOperator[]>(`${API_URL}/network-operator`);
  } catch (error) {
    console.error("Error al obtener todos los operadores de red", error);
    throw error;
  }
};

export const getNetworkOperatorById = async (id: string) => {
  try {
    return await axios.get<NetworkOperator>(`${API_URL}/network-operator/${id}`);
  } catch (error) {
    console.error("Error al obtener operador de red por ID", error);
    throw error;
  }
};

export const getNetworkOperatorByProjectId = async (projectId: string) => {
  try {
    return await axios.get<NetworkOperator[]>(`${API_URL}/network-operator/project/${projectId}`);
  } catch (error) {
    console.error("Error al obtener operador de red por ID de proyecto", error);
    throw error;
  }
};

export const getNetworkOperatorByProjectCode = async (code: string) => {
  try {
    return await axios.get<NetworkOperator>(`${API_URL}/network-operator/project/code/${code}`);
  } catch (error) {
    console.error("Error al obtener operador de red por código de proyecto", error);
    throw error;
  }
};

export const createNetworkOperator = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/network-operator`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateNetworkOperator = async (
  id: string,
  data: Partial<NetworkOperator>
) => {
  try {
    return await axios.put(`${API_URL}/network-operator/${id}`, data);
  } catch (error) {
    console.error("Error al actualizar operador de red", error);
    throw error;
  }
};

export const deleteNetworkOperator = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/network-operator/${id}`);
  } catch (error) {
    console.error("Error al eliminar operador de red", error);
    throw error;
  }
};
