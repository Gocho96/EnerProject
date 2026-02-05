import { RequestHandler } from "express";
import { Phase } from "../models/phaseModel";
import { Project } from "../models/projectModel";

// ----- READ -----
export const getProjectPhases: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const projectFound = await Project.findOne({ code });

    if (!projectFound) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const phases = await Phase.findOne({ projectId: projectFound.id });

    if (!phases) {
      res.status(404).json({ message: "Fases no encontradas" });
      return;
    }

    res.json(phases);
    return;
  } catch (error) {
    console.error("Error al obtener fases:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// ----- UPDATE -----
export const updateProjectPhases: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const { ...updateData } = req.body;

    const updatePhase = await Phase.findOneAndUpdate({ code }, updateData, {
      new: true,
    });

    if (!updatePhase) {
      res.status(404).json({ message: "Fases no encontradas" });
      return;
    }

    res.status(200).json(updatePhase);
    return;
  } catch (error) {
    console.error("Error al actualizar las fases:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
