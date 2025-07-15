import axios from "axios";
import { TaxIncentive, SecondaryBeneficiary } from "../types/taxIncentive";
import { API_URL } from "../config/api";

export const getAllTaxIncentives = async () => {
  try {
    return await axios.get<TaxIncentive[]>(`${API_URL}/taxincentive`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaxIncentiveById = async (id: string) => {
  try {
    return await axios.get<TaxIncentive>(`${API_URL}/taxincentive/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaxIncentiveByProjectCode = async (code: string) => {
  try {
    return await axios.get<TaxIncentive>(`${API_URL}/taxincentive/project/code/${code}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTaxIncentive = async (data: { projectId: string }) => {
  try {
    return await axios.post(`${API_URL}/taxincentive`, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTaxIncentive = async (
  id: string,
  data: Partial<TaxIncentive>
) => {
  try {
    return await axios.patch(`${API_URL}/taxincentive/${id}`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTaxIncentive = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/taxincentive/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addSecondaryBeneficiary = async (
  projectId: string,
  data: SecondaryBeneficiary
) => {
  try {
    return await axios.post(
      `${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries`,
      data
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSecondaryBeneficiary = async (
  projectId: string,
  beneficiaryId: string,
  data: Partial<SecondaryBeneficiary>
) => {
  try {
    return await axios.patch(
      `${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`,
      data
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSecondaryBeneficiary = async (
  projectId: string,
  beneficiaryId: string
) => {
  try {
    return await axios.delete(
      `${API_URL}/taxincentive/project/${projectId}/secondary-beneficiaries/${beneficiaryId}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
