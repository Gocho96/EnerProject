import axios from "axios";
import { Shopping } from "../types/shopping";
import { API_URL } from "../config/api";

export const getAllShoppings = async () => {
  try {
    const res = await axios.get<Shopping[]>(`${API_URL}/shopping`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener las compras");
  }
};

export const getShoppingById = async (id: string) => {
  try {
    const res = await axios.get<Shopping>(`${API_URL}/shopping/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener la compra por ID");
  }
};

export const getShoppingsByProject = async (projectId: string) => {
  try {
    const res = await axios.get<Shopping[]>(`${API_URL}/shopping/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener las compras del proyecto");
  }
};

export const createShopping = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/shopping`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear la compra");
  }
};

export const createShoppingByProjectId = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(`${API_URL}/shopping/project/${projectId}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear la compra para el proyecto");
  }
};

export const updateShopping = async (id: string, data: any) => {
  try {
    const res = await axios.put(`${API_URL}/shopping/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar la compra");
  }
};

export const deleteShopping = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/shopping/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar la compra");
  }
};
