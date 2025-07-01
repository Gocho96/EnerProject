import { RequestHandler } from "express";
import { Types } from "mongoose";
import { Installation } from "../models/installationModel";

export const getAllInstallations: RequestHandler = async (req, res) => {
  try {
    const installations = await Installation.find();
    res.json(installations);
  } catch (error) {
    console.error("Error al obtener insformacion de instalaciones", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getInstallation: RequestHandler = async (req, res) => {
  try {
    const installationFound = await Installation.findById(req.params.id);
    if (!installationFound) {
      res.status(404).json({ message: "Información de instalación no encontrada" });
      return;
    }
    res.json(installationFound);
  } catch (error) {
    console.log("Error al obtener información de instalacion", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getByProjectInstallations: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const installations = await Installation.find({ projectId });
    res.json(installations);
  } catch (error) {
    console.error("Error al obtener informacion de instalación por proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createDailyLogByProject: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const newLogs = req.body.dailyLog;

    const installation = await Installation.findOne({ projectId });

    if (!installation) {
      res.status(404).json({ message: "No se encontró instalación para el proyecto." });
      return;
    }

    if (!Array.isArray(newLogs)) {
      installation.dailyLog.push(newLogs);
    } else {
      installation.dailyLog.push(...newLogs);
    }

    const saved = await installation.save();

    res.status(201).json({ message: "Bitácora(s) agregada(s) correctamente", installation: saved });
  } catch (error) {
    console.error("Error al agregar bitácora:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createInstallation: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res
        .status(400)
        .json({
          message: "No hay proyecto asociado a la información de la instalación",
        });
      return;
    }

    const installationFound = await Installation.findOne({
      date: req.body.date,
    });
    if (installationFound) {
      res.status(409).json({ message: "La bitacora del: " + req.body.date + " ya existe" });
      return;
    }

    const installation = new Installation(req.body);
    const savedInstallation = await installation.save();
    res.status(201).json(savedInstallation);
  } catch (error) {
    console.log(error);
  }
};

export const updateInstallation: RequestHandler = async (req, res) => {
  try {
    const installationUpdate = await Installation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!installationUpdate) {
      res.status(404).json({ message: "Bitácora no encontrada" });
      return;
    }
    res.json(installationUpdate);
  } catch (error) {
    console.error("Error al actualizar la información de instalación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateDailyLogById: RequestHandler = async (req, res) => {
  try {
    const { installationId, logId } = req.params;
    const updatedData = req.body;

    if (!Types.ObjectId.isValid(installationId) || !Types.ObjectId.isValid(logId)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const installation = await Installation.findById(installationId);
    if (!installation) {
      res.status(404).json({ message: "Instalación no encontrada" });
      return;
    }

    const log = installation.dailyLog.id(logId);
    if (!log) {
      res.status(404).json({ message: "Bitácora no encontrada" });
      return;
    }

    Object.assign(log, updatedData);
    await installation.save();

    res.status(200).json({ message: "Bitácora actualizada correctamente", installation });
  } catch (error) {
    console.error("Error al actualizar bitácora:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteInstallation: RequestHandler = async (req, res) => {
  try {
    const instalacionDelete = await Installation.findByIdAndDelete(req.params.id);
    if (!instalacionDelete) {
      res.status(404).json({ message: "Información de instalación no encontrada" });
      return;
    }
    res.status(200).json({ message: "Bitacora eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDailyLogById: RequestHandler = async (req, res) => {
  try {
    const { installationId, logId } = req.params;

    if (!Types.ObjectId.isValid(installationId) || !Types.ObjectId.isValid(logId)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const installation = await Installation.findById(installationId);
    if (!installation) {
      res.status(404).json({ message: "Instalación no encontrada" });
      return;
    }

    const logToDelete = installation.dailyLog.id(logId);
    if (!logToDelete) {
      res.status(404).json({ message: "Bitácora no encontrada" });
      return;
    }

    logToDelete.deleteOne();
    await installation.save();

    res.status(200).json({ message: "Bitácora eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar bitácora:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};