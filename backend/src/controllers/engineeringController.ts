import { RequestHandler } from "express";
import { Engineering } from "../models/engineeringModel";
import { Project } from "../models/projectModel";

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
      res
        .status(404)
        .json({ message: "Información de ingeniería no encontrada" });
      return;
    }
    res.json(engineeringFound);
  } catch (error) {
    console.error("Error al obtener información de ingeniería:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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

export const getEngineeringByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const project = await Project.findOne({ code });

    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return;
    }

    const engineering = await Engineering.findOne({ projectId: project._id });

    if (!engineering) {
      res.status(404).json({ message: "Información de ingeniería no encontrada" })
      return;
    }

    res.json(engineering);
  } catch (error) {
    console.error("Error al obtener ingeniería por código:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringFound = await Engineering.findOne({
      projectId: req.body.projectId,
    });
    if (engineeringFound) {
      res
        .status(409)
        .json({ message: "La información de ingeniería ya existe" });
      return;
    }
    const engineering = new Engineering(req.body);
    const savedEngineering = await engineering.save();
    res.status(201).json(savedEngineering);
  } catch (error) {
    console.error("Error al crear información de ingeniería:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
      res
        .status(404)
        .json({ message: "Información de ingeniería no encontrada" });
      return;
    }
    res.json(engineeringUpdate);
  } catch (error) {
    console.error("Error al actualizar información de ingeniería:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteEngineering: RequestHandler = async (req, res) => {
  try {
    const engineeringDelete = await Engineering.findByIdAndDelete(
      req.params.id
    );
    if (!engineeringDelete) {
      res.status(200).json({ message: "Información de ingeniería eliminada" });
      return;
    }
    res.json(engineeringDelete);
  } catch (error) {
    console.error("Error al eliminar información de ingeniería:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
