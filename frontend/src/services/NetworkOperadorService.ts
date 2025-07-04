import axios from "axios";
import { NetworkOperator } from "../types/networkOperador";

const API = "http://localhost:3000/api";

export const getAllNetworkOperators = async () => {
  try {
    return await axios.get<NetworkOperator[]>(`${API}/network-operator`);
  } catch (error) {
    console.error(error);
  }
};

export const getNetworkOperatorById = async (id: string) => {
  try {
    return await axios.get<NetworkOperator>(`${API}/network-operator/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getNetworkOperatorByProject = async (projectId: string) => {
  try {
    return await axios.get<NetworkOperator[]>(
      `${API}/network-operator/project/${projectId}`
    );
  } catch (error) {
    console.error(error);
  }
};

export const createNetworkOperator = async (data: any) => {
  try {
    return await axios.post(`${API}/network-operator`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNetworkOperator = async (id: string, data: any) => {
  try {
    return await axios.put(`${API}/network-operator/${id}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteNetworkOperator = async (id: string) => {
  try {
    return await axios.delete(`${API}/network-operator/${id}`);
  } catch (error) {
    console.error(error);
  }
};
