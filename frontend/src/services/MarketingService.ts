import axios from "axios";
import { API_URL } from "../config/api";

export const getMarketingByProjectCode = async (code: string) => {
  try {
    const response = await axios.get(`${API_URL}/marketing/project/code/${code}`);
    return response.data;
  } catch (error) {
    throw new Error("No se pudo obtener la información de marketing");
  }
};

export const createMarketing = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/marketing`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el registro de marketing");
  }
};

export const updateMarketing = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/marketing/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el registro de marketing");
  }
};

export const deleteMarketing = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/marketing/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el registro de marketing");
  }
};

export const addPublicationEntry = async (code: string, data: any) => {
  try {
    const response = await axios.post(`${API_URL}/marketing/project/${code}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al agregar publicación");
  }
};

export const updatePublicationEntry = async (code: string, publicationId: string, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/marketing/project/${code}/${publicationId}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la publicación");
  }
};

export const deletePublicationEntry = async (code: string, publicationId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/marketing/project/${code}/${publicationId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la publicación");
  }
};

export const updateSurveyInfo = async (code: string, data: any) => {
  try {
    const response = await axios.put(`${API_URL}/marketing/survey/${code}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar información de encuesta");
  }
};