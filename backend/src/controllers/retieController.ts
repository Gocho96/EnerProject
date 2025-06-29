import { RequestHandler } from "express";
import { Retie } from "../models/retieModel";

export const getAllReties: RequestHandler = async (req, res) => {
  try {
    const reties = await Retie.find();
    res.json(reties);
  } catch (error) {
    console.error("Error al obtener información RETIE", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getRetie: RequestHandler = async (req, res) => {
  try {
    const retieFound = await Retie.findById(req.params.id);
    if (!retieFound) {
      res.status(404).json({ message: "Información RETIE no encontrada" });
      return;
    }
    res.json(retieFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectRetie: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const retieInfo = await Retie.find({ projectId });
    res.json(retieInfo);
  } catch (error) {
    console.error("Error al obtener información RETIE por proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createRetie: RequestHandler = async (req, res) => {
  try {
    const retieFound = await Retie.findOne({
      projectId: req.body.projectId,
    });
    if (retieFound) {
      res
        .status(409)
        .json({ message: "La información RETIE ya existe para este proyecto" });
      return;
    }
    const retie = new Retie(req.body);
    const savedRetie = await retie.save();
    res.json(savedRetie);
  } catch (error) {
    console.log(error);
  }
};

export const updateRetie: RequestHandler = async (req, res) => {
  try {
    const retieUpdate = await Retie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!retieUpdate) {
      res.status(404).json({ message: "Información RETIE no encontrada" });
      return;
    }
    res.json(retieUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRetie: RequestHandler = async (req, res) => {
  try {
    const retieDelete = await Retie.findByIdAndDelete(req.params.id);
    if (!retieDelete) {
      res.status(404).json({ message: "Información RETIE no encontrada" });
      return;
    }
    res.json(retieDelete);
  } catch (error) {
    console.log(error);
  }
};
