import axios from "axios";
import { Marketing } from "../types/marketing";
import { API_URL } from "../config/api";

export const getAllMarketing = async () => {
  try {
    return await axios.get<Marketing[]>(`${API_URL}/marketing`);
  } catch (error) {
    console.error(error);
  }
};

export const getMarketingById = async (id: string) => {
  try {
    return await axios.get<Marketing>(`${API_URL}/marketing/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getMarketingByProject = async (projectId: string) => {
  try {
    return await axios.get(`${API_URL}/marketing/project/${projectId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createMarketing = async (data: any) => {
  try {
    return await axios.post(`${API_URL}/marketing`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPublicationEntry = async (projectId: string, data: any) => {
  try {
    return await axios.post(`${API_URL}/marketing/project/${projectId}`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMarketing = async (id: string, data: any) => {
  try {
    return await axios.put(`${API_URL}/marketing/${id}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const updatePublicationEntry = async (
  projectId: string,
  publicationId: string,
  data: any
) => {
  try {
    return await axios.put(
      `${API_URL}/marketing/project/${projectId}/${publicationId}`,
      data
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateSurveyInfo = async (
  projectId: string,
  data: { sendSurvey?: boolean; sendSurveyDate?: string }
) => {
  try {
    return await axios.put(`${API_URL}/marketing/survey/${projectId}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteMarketing = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/marketing/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const deletePublicationEntry = async (
  projectId: string,
  publicationId: string
) => {
  try {
    return await axios.delete(
      `${API_URL}/marketing/project/${projectId}/${publicationId}`
    );
  } catch (error) {
    console.error(error);
  }
};
