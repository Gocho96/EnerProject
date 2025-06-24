import { RequestHandler } from "express";
import { Phase } from "../models/phaseModel";

export const getPhasesByProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const phases = await Phase.find({ projectId: id });
    res.json(phases);
  } catch (error) {
    console.error("Error al obtener fases:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPhase: RequestHandler = async (req, res) => {
    try {
      const phase = await Phase.findById(req.params.phaseId);
      if (!phase) {
        res.status(404).json({ message: "Fase no encontrada" });
        return;
      }
      res.json(phase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la fase" });
    }
  };

export const updatePhase: RequestHandler = async (req, res) => {
  try {
    const updatedPhase = await Phase.findByIdAndUpdate(
      req.params.phaseId,
      req.body,
      { new: true }
    );
    res.json(updatedPhase);
  } catch (error) {
    console.error("Error actualizando la fase:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
