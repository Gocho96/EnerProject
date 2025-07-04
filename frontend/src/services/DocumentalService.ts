import axios from "axios";
import { Documental, Contract, Policy } from "../types/documental";

const API = "http://localhost:3000/api";

export const getAllDocumentals = async () => {
  try {
    return await axios.get<Documental[]>(`${API}/documental`);
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentalById = async (id: string) => {
  try {
    return await axios.get<Documental>(`${API}/documental/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getDocumentalsByProject = async (projectId: string) => {
  try {
    return await axios.get<Documental[]>(
      `${API}/documental/project/${projectId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const createDocumental = async (
  documental: Omit<Documental, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.post(`${API}/documental`, documental);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDocumental = async (
  id: string,
  documental: Partial<Documental>
) => {
  try {
    return await axios.put(`${API}/documental/${id}`, documental);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocumental = async (id: string) => {
  try {
    return await axios.delete(`${API}/documental/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const addContract = async (documentalId: string, contract: Contract) => {
  try {
    return await axios.post(
      `${API}/documental/${documentalId}/contracts`,
      contract
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateContract = async (
  documentalId: string,
  contractId: string,
  contract: Partial<Contract>
) => {
  try {
    return await axios.put(
      `${API}/documental/${documentalId}/contract/${contractId}`,
      contract
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteContract = async (
  documentalId: string,
  contractId: string
) => {
  try {
    return await axios.delete(
      `${API}/documental/${documentalId}/contract/${contractId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const addPolicy = async (
  documentalId: string,
  contractId: string,
  policy: Policy
) => {
  try {
    return await axios.post(
      `${API}/documental/${documentalId}/contracts/${contractId}/policies`,
      policy
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePolicy = async (
  documentalId: string,
  contractId: string,
  policyId: string,
  policy: Partial<Policy>
) => {
  try {
    return await axios.put(
      `${API}/documental/${documentalId}/contract/${contractId}/policy/${policyId}`,
      policy
    );
  } catch (error) {
    console.log(error);
  }
};

export const deletePolicy = async (
  documentalId: string,
  contractId: string,
  policyId: string
) => {
  try {
    return await axios.delete(
      `${API}/documental/${documentalId}/contract/${contractId}/policy/${policyId}`
    );
  } catch (error) {
    console.log(error);
  }
};
