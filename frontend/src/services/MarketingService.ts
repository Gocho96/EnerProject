import axios from "axios";
import { Marketing } from "../types/marketing";

const API = "http://localhost:3000/api";

export const getAllMarketing = async () => {
  try {
    return await axios.get<Marketing[]>(`${API}/marketing`);
  } catch (error) {
    console.error(error);
  }
};

export const getMarketingById = async (id: string) => {
  try {
    return await axios.get<Marketing>(`${API}/marketing/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getMarketingByProject = async (projectId: string) => {
  try {
    return await axios.get(`${API}/marketing/project/${projectId}`);
  } catch (error) {
    console.error(error);
  }
};

export const createMarketing = async (data: any) => {
  try {
    return await axios.post(`${API}/marketing`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPublicationEntry = async (projectId: string, data: any) => {
  try {
    return await axios.post(`${API}/marketing/project/${projectId}`, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMarketing = async (id: string, data: any) => {
  try {
    return await axios.put(`${API}/marketing/${id}`, data);
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
      `${API}/marketing/project/${projectId}/${publicationId}`,
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
    return await axios.put(`${API}/marketing/survey/${projectId}`, data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteMarketing = async (id: string) => {
  try {
    return await axios.delete(`${API}/marketing/${id}`);
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
      `${API}/marketing/project/${projectId}/${publicationId}`
    );
  } catch (error) {
    console.error(error);
  }
};
