import { RequestHandler } from "express";
import * as RetieService from "../../services/phases/retieServices";

// ----- CREATE ----- 

// ----- READ -----
export const getAllReties: RequestHandler = async (req, res) => {
  try {
    const reties = await RetieService.getAllRetiesService();
    res.status(200).json(reties);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de RETIE:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getRetie: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const retieFound = await RetieService.getRetieService(projectId);

    res.status(200).json(retieFound);
    return;
  } catch (error: any) {
    if (error.message === "RETIE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de RETIE no encontrada." });
      return;
    }
    console.error("Error al obtener la fase de RETIE:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ----- UPDATE -----
export const updateRetie: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const updateRetie = await RetieService.updateRetieService(projectId, req.body); 

    res.status(200).json( { Message: "Información de RETIE actualizada correctamente.", document: updateRetie} );
    return;
  } catch (error: any) {
    if (error.message === "RETIE_NOT_FOUND") {
      res.status(404).json({ message: "Información de RETIE no encontrada." });
      return;
    }
    console.error("Error al actualizar la información de RETIE:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ----- DELETE -----
export const deleteRetiePhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const retieDeleted = await RetieService.deleteRetiePhaseService(projectId); 

    res.status(200).json( { Message: "Fase RETIE eliminada correctamente.", document: retieDeleted} );
    return;
  } catch (error: any) {
    if (error.message === "RETIE_NOT_FOUND") {
      res.status(404).json({ message: "Información de RETIE no encontrada." });
      return;
    }
    console.error("Error al eliminar la información de RETIE:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};