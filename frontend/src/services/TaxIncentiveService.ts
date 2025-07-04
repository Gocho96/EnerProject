import axios from "axios";
import { TaxIncentive } from "../types/taxIncentive";
import { API_URL } from "../config/api";

export const getAllTaxIncentives = async () => {
  try {
    const res = await axios.get<TaxIncentive[]>(`${API_URL}/taxincentive`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivos tributarios");
  }
};

export const getTaxIncentiveById = async (id: string) => {
  try {
    const res = await axios.get<TaxIncentive>(`${API_URL}/taxincentive/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivo tributario por ID");
  }
};

export const getTaxIncentivesByProject = async (projectId: string) => {
  try {
    const res = await axios.get<TaxIncentive[]>(`${API_URL}/taxincentive/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivo tributario del proyecto");
  }
};

export const createTaxIncentive = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/taxincentive`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear incentivo tributario");
  }
};

export const addSecondaryBeneficiary = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(`${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar beneficiario secundario");
  }
};

export const updateTaxIncentive = async (id: string, data: any) => {
  try {
    const res = await axios.patch(`${API_URL}/taxincentive/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar incentivo tributario");
  }
};

export const updateSecondaryBeneficiary = async (
  projectId: string,
  beneficiaryId: string,
  data: any
) => {
  try {
    const res = await axios.patch(
      `${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar beneficiario secundario");
  }
};

export const deleteTaxIncentive = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/taxincentive/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar incentivo tributario");
  }
};

export const deleteSecondaryBeneficiary = async (
  projectId: string,
  beneficiaryId: string
) => {
  try {
    const res = await axios.delete(
      `${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar beneficiario secundario");
  }
};
