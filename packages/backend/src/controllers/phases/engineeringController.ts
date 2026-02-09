import { RequestHandler } from "express";
import * as EngineeringService from "../../services/phases/engineeringServices";

// ----- CREATE ----- 

// ----- READ -----
export const getAllEngineerings: RequestHandler = async (req, res) => {
  try {
    const engineerings = await EngineeringService.getAllEngineeringsService();
    res.status(200).json(engineerings);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de ingeniería:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getEngineering: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const engineeringFound = await EngineeringService.getEngeneeringService(projectId);

    res.status(200).json(engineeringFound);
    return;
  } catch (error: any) {
    if (error.message === "ENGINEERING_NOT_FOUND") {
      res.status(404).json({ message: "Ingeniería no encontrada." });
      return;
    }
    console.error("Error al obtener la fase de ingeniería:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ----- UPDATE -----
export const updateEngineering: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const updateEngineering = await EngineeringService.updateEngineeringService(projectId, req.body); 

    res.status(200).json( { Message: "Información de ingeniería actualizada correctamente.", document: updateEngineering} );
    return;
  } catch (error: any) {
    if (error.message === "ENGINEERING_NOT_FOUND") {
      res.status(404).json({ message: "Información de ingeniería no encontrada." });
      return;
    }
    console.error("Error al actualizar la información de ingeniería:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ----- DELETE -----
export const deleteEngineeringPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const engineeringDeleted = await EngineeringService.deleteEngineeringPhaseService(projectId); 

    res.status(200).json( { Message: "Fase de ingeniería eliminada correctamente.", document: engineeringDeleted} );
    return;
  } catch (error: any) {
    if (error.message === "ENGINEERING_NOT_FOUND") {
      res.status(404).json({ message: "Información de ingeniería no encontrada." });
      return;
    }
    console.error("Error al eliminar la información de ingeniería:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};