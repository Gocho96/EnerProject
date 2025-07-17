import { RequestHandler } from "express";
import { Maintenance } from "../models/maintenanceModel";
import { getNextProjectSequence } from "../utils/getNextProjectSequence";
import { Project } from "../models/projectModel";
import { Types } from "mongoose";
import mongoose from "mongoose";

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
    const doc = await Maintenance.findOne({ projectId });

    if (!doc) {
      res.status(404).json({
        message:
          "No se encontró el registro de mantenimientos para este proyecto.",
      });
      return;
    }

    res.json(doc.maintenance);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mantenimientos" });
  }
};

export const getMaintenancesByProjectCode: RequestHandler = async (
  req,
  res
) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const doc = await Maintenance.findOne({ projectId: project._id });
    if (!doc) {
      res.status(404).json({
        message:
          "No se encontró información de mantenimiento para este proyecto.",
      });
      return;
    }

    res.json(doc);
  } catch (error) {
    console.error("Error al obtener mantenimientos por code:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getByProjectCodeMaintenances: RequestHandler = async (
  req,
  res
) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const doc = await Maintenance.findOne({ projectId: project._id });

    if (!doc) {
      res.status(404).json({
        message:
          "No se encontró el registro de mantenimientos para este proyecto.",
      });
      return;
    }

    res.json(doc);
  } catch (error) {
    console.error("Error al obtener mantenimiento por código:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "No hay un projectId válido en la solicitud.",
      });
      return;
    }

    const existing = await Maintenance.findOne({ projectId });
    if (existing) {
      res.status(400).json({
        message:
          "Ya existe la información de mantenimiento para este proyecto.",
      });
      return;
    }

    const nextNumber = await getNextProjectSequence(projectId, "maintenance");

    const now = new Date();

    const maintenance = {
      maintenanceNumber: nextNumber,
      maintenanceDate: now,
      typeMaintenance: "Preventivo",
      maintenanceReportDate: now,
      maintenanceInvoiceDate: now,
      maintenanceNotes: "Registro automático inicial",
    };

    const newDocument = new Maintenance({
      projectId,
      maintenanceFrequency: 6,
      nextMaintenance: new Date(now.setMonth(now.getMonth() + 6)),
      maintenance: [maintenance],
    });

    const saved = await newDocument.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear documento de mantenimiento:", error);
    res.status(400).json({
      message: "Error al crear documento de mantenimiento",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const addMaintenanceEntry: RequestHandler = async (req, res) => {
  try {
    const { maintenanceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(maintenanceId)) {
      res.status(400).json({ message: "ID de mantenimiento inválido." });
      return;
    }

    const maintenanceDoc = await Maintenance.findById(maintenanceId);
    if (!maintenanceDoc) {
      res.status(404).json({
        message: "No se encontró el documento de mantenimiento.",
      });
      return;
    }

    const nextNumber = await getNextProjectSequence(
      new Types.ObjectId(maintenanceDoc.projectId.toString()),
      "maintenance"
    );

    const {
      maintenanceDate,
      typeMaintenance,
      maintenanceReportDate,
      maintenanceInvoiceDate,
      maintenanceNotes,
    } = req.body;

    const newEntry = {
      maintenanceNumber: nextNumber,
      maintenanceDate,
      typeMaintenance,
      maintenanceReportDate,
      maintenanceInvoiceDate,
      maintenanceNotes,
    };

    maintenanceDoc.maintenance.push(newEntry);
    const saved = await maintenanceDoc.save();

    res.status(201).json({
      message: "Mantenimiento agregado correctamente",
      maintenance: newEntry,
      data: saved,
    });
  } catch (error) {
    console.error("Error al agregar mantenimiento:", error);
    res.status(500).json({ error: "Error interno al agregar mantenimiento" });
  }
};

export const updateMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId, maintenanceId } = req.params;

    if (!Types.ObjectId.isValid(projectId) || !Types.ObjectId.isValid(maintenanceId)) {
      res.status(400).json({ message: "IDs inválidos" });
      return;
    }

    const doc = await Maintenance.findOne({ projectId });
    if (!doc) {
      res.status(404).json({ message: "Documento de mantenimiento no encontrado" });
      return;
    }

    const entry = doc.maintenance.id(maintenanceId);
    if (!entry) {
      res.status(404).json({ message: "Entrada de mantenimiento no encontrada" });
      return;
    }

    Object.assign(entry, req.body);

    const updated = await doc.save();

    res.json({ message: "Entrada de mantenimiento actualizada", data: updated });
  } catch (error) {
    console.error("Error al actualizar mantenimiento:", error);
    res.status(500).json({ message: "Error interno al actualizar mantenimiento" });
  }
};

export const updateMaintenanceFrequency: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { maintenanceFrequency, nextMaintenance } = req.body;

    const updated = await Maintenance.findOneAndUpdate(
      { projectId },
      {
        ...(maintenanceFrequency !== undefined && { maintenanceFrequency }),
        ...(nextMaintenance !== undefined && { nextMaintenance }),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({
        message: "Documento de mantenimiento no encontrado para el proyecto.",
      });
      return;
    }

    res.json({
      message:
        "Frecuencia y próxima fecha de mantenimiento actualizadas correctamente.",
      data: updated,
    });
  } catch (error) {
    console.error("Error al actualizar frecuencia de mantenimiento:", error);
    res.status(500).json({
      message: "Error al actualizar frecuencia o próxima fecha",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId, maintenanceId } = req.params;

    if (!Types.ObjectId.isValid(projectId) || !Types.ObjectId.isValid(maintenanceId)) {
      res.status(400).json({ message: "IDs inválidos" });
      return;
    }

    const doc = await Maintenance.findOne({ projectId });
    if (!doc) {
      res.status(404).json({ message: "Documento de mantenimiento no encontrado" });
      return;
    }

    const maintenanceEntry = doc.maintenance.id(maintenanceId);
    if (!maintenanceEntry) {
      res.status(404).json({ message: "Entrada de mantenimiento no encontrada" });
      return;
    }

    doc.maintenance.pull({ _id: maintenanceId });
    await doc.save();

    res.json({ message: "Entrada de mantenimiento eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar entrada de mantenimiento:", error);
    res.status(500).json({ message: "Error interno al eliminar mantenimiento" });
  }
};

