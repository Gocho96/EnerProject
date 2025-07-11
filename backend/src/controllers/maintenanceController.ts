import { RequestHandler } from "express";
import { Maintenance } from "../models/maintenanceModel";
import { getNextProjectSequence } from "../utils/getNextProjectSequence";
import { Project } from "../models/projectModel";
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
      res.status(404).json({ message: "No se encontró el registro de mantenimientos para este proyecto." });
      return;
    }

    res.json(doc.maintenance);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mantenimientos" });
  }
};

export const getMaintenancesByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return;
    }

    const doc = await Maintenance.findOne({ projectId: project._id });
    if (!doc) {
      res.status(404).json({
        message: "No se encontró información de mantenimiento para este proyecto.",
      })
      return;
    }

    res.json(doc);
  } catch (error) {
    console.error("Error al obtener mantenimientos por code:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getByProjectCodeMaintenances: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const doc = await Maintenance.findOne({ projectId: project._id });

    if (!doc) {
      res.status(404).json({ message: "No se encontró el registro de mantenimientos para este proyecto." });
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
    const projectId = new mongoose.Types.ObjectId(req.body.projectId);

    const existing = await Maintenance.findOne({ projectId });

    if (existing) {
      res.status(400).json({
        message: "Ya existe la información de mantenimiento para este proyecto.",
      });
      return;
    }

    const nextNumber = await getNextProjectSequence(projectId, "maintenance");

    const maintenance = {
      maintenanceNumber: nextNumber,
      maintenanceDate: req.body.maintenanceDate,
      typeMaintenance: req.body.typeMaintenance,
      maintenanceReportDate: req.body.maintenanceReportDate,
      maintenanceInvoiceDate: req.body.maintenanceInvoiceDate,
      maintenanceNotes: req.body.maintenanceNotes,
    };

    const newDocument = new Maintenance({
      projectId,
      maintenanceFrequency: req.body.maintenanceFrequency,
      nextMaintenance: req.body.nextMaintenance,
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
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);
    const nextNumber = await getNextProjectSequence(projectId, "maintenance");

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

    const updatedDoc = await Maintenance.findOneAndUpdate(
      { projectId },
      {
        $push: { maintenance: newEntry },
      },
      { new: true }
    );

    if (!updatedDoc) {
      res.status(404).json({
        message:
          "El documento de mantenimiento para este proyecto aún no existe. Debe crearse primero con frecuencia y fecha inicial.",
      });
      return;
    }

    res.status(201).json({
      message: "Mantenimiento agregado correctamente",
      maintenance: newEntry,
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error al agregar mantenimiento:", error);
    res.status(500).json({ error: "Error interno al agregar mantenimiento" });
  }
};

export const updateMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId, maintenanceId } = req.params;
    const updateData = req.body;

    const updatedDoc = await Maintenance.findOneAndUpdate(
      {
        projectId,
        "maintenance._id": maintenanceId,
      },
      {
        $set: {
          "maintenance.$.maintenanceDate": updateData.maintenanceDate,
          "maintenance.$.typeMaintenance": updateData.typeMaintenance,
          "maintenance.$.maintenanceReportDate": updateData.maintenanceReportDate,
          "maintenance.$.maintenanceInvoiceDate": updateData.maintenanceInvoiceDate,
          "maintenance.$.maintenanceNotes": updateData.maintenanceNotes,
        },
      },
      { new: true }
    );

    if (!updatedDoc) {
      res.status(404).json({ message: "Mantenimiento no encontrado" });
      return;
    }

    res.json(updatedDoc);
  } catch (error) {
    console.error("Error al actualizar mantenimiento:", error);
    res.status(500).json({ error: "Error al actualizar mantenimiento" });
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
      res
        .status(404)
        .json({ message: "Documento de mantenimiento no encontrado para el proyecto." });
        return;
    }

    res.json({
      message: "Frecuencia y próxima fecha de mantenimiento actualizadas correctamente.",
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

    const updatedDoc = await Maintenance.findOneAndUpdate(
      { projectId },
      {
        $pull: {
          maintenance: { _id: maintenanceId },
        },
      },
      { new: true }
    );

    if (!updatedDoc) {
      res.status(404).json({ message: "No se encontró el mantenimiento para eliminar" });
      return;
    }

    res.json({ message: "Mantenimiento eliminado correctamente", updatedDoc });
  } catch (error) {
    console.error("Error al eliminar mantenimiento:", error);
    res.status(500).json({ error: "Error al eliminar mantenimiento" });
  }
};
