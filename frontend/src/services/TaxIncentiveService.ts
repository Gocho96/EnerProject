import axios from "axios";
import { TaxIncentive } from "../types/taxIncentive";

const API = "http://localhost:3000/api";

export const getAllTaxIncentives = async () => {
  try {
    const res = await axios.get<TaxIncentive[]>(`${API}/taxincentive`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivos tributarios");
  }
};

export const getTaxIncentiveById = async (id: string) => {
  try {
    const res = await axios.get<TaxIncentive>(`${API}/taxincentive/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivo tributario por ID");
  }
};

export const getTaxIncentivesByProject = async (projectId: string) => {
  try {
    const res = await axios.get<TaxIncentive[]>(`${API}/taxincentive/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener incentivo tributario del proyecto");
  }
};

export const createTaxIncentive = async (data: any) => {
  try {
    const res = await axios.post(`${API}/taxincentive`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear incentivo tributario");
  }
};

export const addSecondaryBeneficiary = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(`${API}/taxincentive/project/${projectId}/secondary-beneficiaries`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al agregar beneficiario secundario");
  }
};

export const updateTaxIncentive = async (id: string, data: any) => {
  try {
    const res = await axios.patch(`${API}/taxincentive/${id}`, data);
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
      `${API}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar beneficiario secundario");
  }
};

export const deleteTaxIncentive = async (id: string) => {
  try {
    const res = await axios.delete(`${API}/taxincentive/${id}`);
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
      `${API}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar beneficiario secundario");
  }
};
