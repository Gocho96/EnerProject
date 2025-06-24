// controllers/maintenanceController.ts
import { RequestHandler } from "express";
import { Maintenance } from "../models/maintenanceModel";

export const getAllMaintenances: RequestHandler = async (req, res) => {
  try {
    const maintenances = await Maintenance.find();
    res.json(maintenances);
  } catch (error) {
    console.error("Error al obtener mantenimientos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getMaintenance: RequestHandler = async (req, res) => {
  try {
    const maintenanceFound = await Maintenance.findById(req.params.id);
    if (!maintenanceFound) {
      res.status(404).json({ message: "Mantenimiento no encontrado" });
      return;
    }
    res.json(maintenanceFound);
  } catch (error) {
    console.error(error);
  }
};

export const getByProjectMaintenances: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const maintenances = await Maintenance.find({ projectId });
    res.json(maintenances);
  } catch (error) {
    console.error("Error al obtener la información de mantenimientos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createMaintenance: RequestHandler = async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    const saved = await maintenance.save();
    res.json(saved);
  } catch (error) {
    console.error(error);
  }
};

export const updateMaintenance: RequestHandler = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Mantenimiento no encontrado" });
      return;
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
  }
};

export const deleteMaintenance: RequestHandler = async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Mantenimiento no encontrado" });
      return;
    }
    res.json(deleted);
  } catch (error) {
    console.error(error);
  }
};
