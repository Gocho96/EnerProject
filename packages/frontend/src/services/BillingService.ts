import axios from "axios";
import { API_URL } from "../config/api";
import { Billing } from "../types/phases/purchases";

// ----- CREATE -----
export const createBilling = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/billing`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createBillingByProject = async (projectId: string, data: any) => {
  try {
    const response = await axios.post(`${API_URL}/billing/project/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la factura por proyecto");
  }
};

// ----- READ -----
export const getAllBillings = async () => {
  try {
    const response = await axios.get<Billing[]>(`${API_URL}/billing`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la lista de facturas");
  }
};

export const getBillingById = async (id: string) => {
  try {
    const response = await axios.get<Billing>(`${API_URL}/billing/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la factura");
  }
};

export const getBillingsByProject = async (projectId: string) => {
  try {
    const response = await axios.get<Billing[]>(`${API_URL}/billing/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la facturación por proyecto");
  }
};

export const getByProjectCodeBilling = async (code: string) => {
  try {
    const response = await axios.get<Billing[]>(`${API_URL}/billing/project/code/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo obtener la facturación por código de proyecto");
  }
};

// ----- UPDATE -----
export const updateBilling = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/billing/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar la factura");
  }
};

// ----- DELETE -----
export const deleteBilling = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/billing/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la factura");
  }
};
