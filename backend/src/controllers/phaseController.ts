import { RequestHandler } from "express";
import { Phase } from "../models/phaseModel";
import { Project } from "../models/projectModel";

export const getPhasesByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const project = await Project.findOne({ code });

    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return;
    }

    const phases = await Phase.findOne({ projectId: project._id });

    if (!phases) {
      res
        .status(404)
        .json({ message: "Fases no encontradas para este proyecto" })
        return;
    }

    res.json(phases);
  } catch (error) {
    console.error("Error al obtener fases por código:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const updatePhasesByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const updates = req.body;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return;
    }

    const updatedPhase = await Phase.findOneAndUpdate(
      { projectId: project._id },
      { $set: updates },
      { new: true }
    );

    if (!updatedPhase) {
      res
        .status(404)
        .json({ message: "Fases no encontradas para actualizar" })
        return;
    }

    res.json(updatedPhase);
  } catch (error) {
    console.error("Error al actualizar fases por código:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
