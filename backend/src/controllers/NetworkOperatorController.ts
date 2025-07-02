import { RequestHandler } from "express";
import { NetworkOperator } from "../models/networkOperatorModel";

export const getAllNetworkOperators: RequestHandler = async (req, res) => {
  try {
    const networkOperators = await NetworkOperator.find();
    res.json(networkOperators);
  } catch (error) {
    console.error("Error al obtener información de operador de red", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: error });
  }
};

export const getNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const networkOperatorFound = await NetworkOperator.findById(req.params.id);
    if (!networkOperatorFound) {
      res
        .status(404)
        .json({ message: "Información del operador de red no encontrada" });
      return;
    }
    res.json(networkOperatorFound);
  } catch (error) {
    console.error("Error al obtener operador de red por ID", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getByProjectNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const networkOperators = await NetworkOperator.find({ projectId });
    res.json(networkOperators);
  } catch (error) {
    console.error("Error al obtener información del operador de red", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const networkOperatorFound = await NetworkOperator.findOne({
      projectId: req.body.projectId,
    });
    if (networkOperatorFound) {
      res
        .status(409)
        .json({ message: "La información del operador de red ya existe" });
      return;
    }
    const networkOperator = new NetworkOperator(req.body);
    const savedNetworkOperator = await networkOperator.save();
    res.json(savedNetworkOperator);
  } catch (error) {
    console.error("Error al crear operador de red", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const networkOperatorUpdate = await NetworkOperator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!networkOperatorUpdate) {
      res
        .status(404)
        .json({ message: "Información del operador de red no encontrada" });
      return;
    }
    res.json(networkOperatorUpdate);
  } catch (error) {
    console.error("Error al actualizar operador de red", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const networkOperatorDelete = await NetworkOperator.findByIdAndDelete(
      req.params.id
    );
    if (!networkOperatorDelete) {
      res
        .status(404)
        .json({ message: "Información del operador de red no encontrada" });
      return;
    }
    res.json(networkOperatorDelete);
  } catch (error) {
    console.error("Error al eliminar operador de red", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
