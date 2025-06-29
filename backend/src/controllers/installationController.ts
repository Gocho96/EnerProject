import { RequestHandler } from "express";
import { Installation } from "../models/installationModel";

export const getAllInstallations: RequestHandler = async (req, res) => {
  try {
    const installations = await Installation.find();
    res.json(installations);
  } catch (error) {
    console.error("Error al obtener información de instalación", error);
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
    console.log(error);
  }
};

export const getByProjectInstallation: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const installations = await Installation.find({ projectId });
    res.json(installations);
  } catch (error) {
    console.error("Error al obtener la información de instalación", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createInstallation: RequestHandler = async (req, res) => {
  try {
    const installationFound = await Installation.findOne({
      projectId: req.body.projectId,
    });
    if (installationFound) {
      res.status(409).json({ message: "La información de instalación ya existe" });
      return;
    }
    const installation = new Installation(req.body);
    const savedInstallation = await installation.save();
    res.json(savedInstallation);
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
      res.status(404).json({ message: "Información de instalación no encontrada" });
      return;
    }
    res.json(installationUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteInstallation: RequestHandler = async (req, res) => {
  try {
    const installationDelete = await Installation.findByIdAndDelete(req.params.id);
    if (!installationDelete) {
      res.status(404).json({ message: "Información de instalación no encontrada" });
      return;
    }
    res.json(installationDelete);
  } catch (error) {
    console.log(error);
  }
};
