import { RequestHandler } from "express";
import { Engineering } from "../models/engineeringModel";

export const getAllEngineerings: RequestHandler = async (req, res) => {
  try {
    const engineering = await Engineering.find();
    res.json(engineering);
  } catch (error) {
    console.error("Error al obtener información de ingeniería", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringFound = await Engineering.findById(req.params.id);
    if (!engineeringFound) {
      res.status(404).json({ message: "Información de ingeniería no encontrada" });
      return;
    }
    res.json(engineeringFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectEngineering: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const engineering = await Engineering.find({ projectId });
    res.json(engineering);
  } catch (error) {
    console.error("Error al obtener la información de ingeniería", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringFound = await Engineering.findOne({
      projectId: req.body.projectId,
    });
    if (engineeringFound) {
      res.status(301).json({ message: "La información de ingeniería ya existe" });
      return;
    }
    const engineering = new Engineering(req.body);
    const savedEngineering = await engineering.save();
    res.json(savedEngineering);
  } catch (error) {
    console.log(error);
  }
};

export const updateEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringUpdate = await Engineering.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!engineeringUpdate) {
      res.status(404).json({ message: "Información de ingeniería no encontrada" });
      return;
    }
    res.json(engineeringUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringDelete = await Engineering.findByIdAndDelete(req.params.id);
    if (!engineeringDelete) {
      res.status(404).json({ message: "Información de ingeniería no encontrada" });
      return;
    }
    res.json(engineeringDelete);
  } catch (error) {
    console.log(error);
  }
};
