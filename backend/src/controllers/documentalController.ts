import { RequestHandler } from "express";
import { Documental } from "../models/documentalModel";

export const getAllDocumentals: RequestHandler = async (req, res) => {
  try {
    const documentals = await Documental.find();
    res.json(documentals);
  } catch (error) {
    console.error("Error al obtener información documental", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalFound = await Documental.findById(req.params.id);
    if (!documentalFound) {
      res.status(404).json({ message: "Información documental no encontrada" });
      return;
    }
    res.json(documentalFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectDocumentals: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const documentals = await Documental.find({ projectId });
    res.json(documentals);
  } catch (error) {
    console.error(
      "Error al obtener información documental del proyecto",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalFound = await Documental.findOne({
      projectId: req.body.projectId,
    });
    if (documentalFound) {
      res.status(301).json({ message: "La información documental ya existe" });
      return;
    }
    const documental = new Documental(req.body);
    const savedDocumental = await documental.save();
    res.json(savedDocumental);
  } catch (error) {
    console.log(error);
  }
};

export const updateDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalUpdate = await Documental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!documentalUpdate) {
      res.status(404).json({ message: "Información documental no encontrada" });
      return;
    }
    res.json(documentalUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalDelete = await Documental.findByIdAndDelete(req.params.id);
    if (!documentalDelete) {
      res.status(404).json({ message: "Infoamación documental no encontrada" });
      return;
    }
    res.json(documentalDelete);
  } catch (error) {
    console.log(error);
  }
};
