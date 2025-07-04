import axios from "axios";
import { Shopping } from "../types/shopping";

const API = "http://localhost:3000/api";

export const getAllShoppings = async () => {
  try {
    const res = await axios.get<Shopping[]>(`${API}/shopping`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener las compras");
  }
};

export const getShoppingById = async (id: string) => {
  try {
    const res = await axios.get<Shopping>(`${API}/shopping/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener la compra por ID");
  }
};

export const getShoppingsByProject = async (projectId: string) => {
  try {
    const res = await axios.get<Shopping[]>(`${API}/shopping/project/${projectId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener las compras del proyecto");
  }
};

export const createShopping = async (data: any) => {
  try {
    const res = await axios.post(`${API}/shopping`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear la compra");
  }
};

export const createShoppingByProjectId = async (projectId: string, data: any) => {
  try {
    const res = await axios.post(`${API}/shopping/project/${projectId}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al crear la compra para el proyecto");
  }
};

export const updateShopping = async (id: string, data: any) => {
  try {
    const res = await axios.put(`${API}/shopping/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error("Error al actualizar la compra");
  }
};

export const deleteShopping = async (id: string) => {
  try {
    const res = await axios.delete(`${API}/shopping/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Error al eliminar la compra");
  }
};
