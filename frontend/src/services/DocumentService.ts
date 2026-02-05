import axios from "axios";
import { Document, Contract, Policy } from "../types/phases/document";
import { API_URL } from "../config/api";

// ----- CREATE -----
export const createDocumentPhase = async (data: {
  projectId: string;
}): Promise<Document> => {
  try {
    const response = await axios.post<Document>(`${API_URL}/document`, data);
    return response.data;
  } catch (error) {
    console.log("Error al crear la documentación", error);
    throw error;
  }
};

export const addContract = async (
  code: string,
  contract: Contract
): Promise<Contract> => {
  try {
    const response = await axios.post<Contract>(
      `${API_URL}/project/document/${code}/contracts`,
      contract
    );
    return response.data;
  } catch (error) {
    console.log("Error al crear el contrato", error);
    throw error;
  }
};

export const addPolicy = async (
  code: string,
  contractId: string,
  policy: Policy
): Promise<Policy> => {
  try {
    const response = await axios.post(
      `${API_URL}/project/document/${code}/contract/${contractId}/policy`,
      policy
    );
    return response.data;
  } catch (error) {
    console.log("Error al crear la póliza", error);
    throw error;
  }
};

// ----- READ -----
export const getAllDocuments = async (): Promise<Document[]> => {
  try {
    const response = await axios.get<Document[]>(`${API_URL}/document`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener la documentación", error);
    throw error;
  }
};

export const getDocumentByProjectCode = async (
  code: string
): Promise<Document> => {
  try {
    const response = await axios.get<Document>(`${API_URL}/project/${code}/document`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener la documentación", error);
    throw error;
  }
};

// ----- UPDATE -----
export const updateDocument = async (
  code: string,
  document: Partial<Document>
): Promise<Document> => {
  try {
    const response = await axios.patch<Document>(
      `${API_URL}/project/document/${code}`,
      document
    );
    return response.data;
  } catch (error) {
    console.log("Error al actualizar la documentación", error);
    throw error;
  }
};

export const updateContract = async (
  code: string,
  contractId: string,
  contract: Partial<Contract>
): Promise<Contract> => {
  try {
    const response = await axios.put(
      `${API_URL}/project/document/${code}/contract/${contractId}`,
      contract
    );
    return response.data;
  } catch (error) {
    console.log("Error al actualizar el contrato", error);
    throw error;
  }
};

export const updatePolicy = async (
  code: string,
  contractId: string,
  policyId: string,
  policy: Partial<Policy>
): Promise<Policy> => {
  try {
    const response = await axios.put(
      `${API_URL}/project/document/${code}/contract/${contractId}/policy/${policyId}`,
      policy
    );
    return response.data;
  } catch (error) {
    console.log("Error al actualizar la póliza", error);
    throw error;
  }
};

// ----- DELETE -----
export const deleteContract = async (
  code: string,
  contractId: string
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/project/document/${code}/contract/${contractId}`);
  } catch (error) {
    console.log("Error al eliminar el contrato", error);
    throw error;
  }
};

export const deletePolicy = async (
  code: string,
  contractId: string,
  policyId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/project/document/${code}/contract/${contractId}/policy/${policyId}`
    );
  } catch (error) {
    console.log("Error al eliminar la póliza", error);
    throw error;
  }
};
