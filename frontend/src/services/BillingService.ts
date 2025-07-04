import axios from "axios";
import { Billing } from "../types/billing";
import { API_URL } from "../config/api";

export const getAllBillings = async () => {
  try {
    return await axios.get<Billing[]>(`${API_URL}/billing`);
  } catch (error) {
    console.log(error);
  }
};

export const getBillingById = async (id: string) => {
  try {
    return await axios.get<Billing>(`${API_URL}/billing/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getBillingsByProject = async (projectId: string) => {
  try {
    return await axios.get<Billing[]>(`${API_URL}/billing/project/${projectId}`);
  } catch (error) {
    console.log(error);
  }
};

export const createBilling = async (
  billing: Omit<Billing, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.post<Billing>(`${API_URL}/billing`, billing);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createBillingByProject = async (
  projectId: string,
  billing: Omit<Billing, "_id" | "projectId" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.post<Billing>(
      `${API_URL}/billing/project/${projectId}`,
      billing
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBilling = async (
  id: string,
  billing: Omit<Billing, "_id" | "createdAt" | "updatedAt">
) => {
  try {
    return await axios.put<Billing>(`${API_URL}/billing/${id}`, billing);
  } catch (error) {
    console.log(error);
  }
};

export const deleteBilling = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/billing/${id}`);
  } catch (error) {
    console.log(error);
  }
};
