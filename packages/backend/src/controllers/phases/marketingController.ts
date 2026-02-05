import { RequestHandler } from "express";
import * as MarketingService from "../../services/phases/marketingServices";

// ----- CREATE -----
export const addPublication: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const savedPublication = await MarketingService.addPublicationService(projectId, req.body);
    res.status(201).json({ message: "Publicación agregada correctamente.", document: savedPublication });

  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de marketing no encontrada." });
      return;
    }
    if (error.message === "PUBLICATION_ALREADY_EXISTS") {
      res.status(409).json({ message: "La publicación ya existe." });
      return;
    }
     console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllMarketings: RequestHandler = async (req, res) => {
  try {
    const marketings = await MarketingService.getAllMarketingsService();
    res.status(200).json(marketings);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de marketing:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getMarketing: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const marketingFound = await MarketingService.getMarketingService(projectId);

    res.status(200).json(marketingFound);
    return;
  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de marketing no encontrada." });
      return;
    }
    console.error("Información de marketing no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getPublication: RequestHandler = async (req, res) => {
  try {
    const { projectId, publicationId } = req.params;

    const publicationFound = await MarketingService.getPublicationService(projectId, publicationId);

    res.status(200).json(publicationFound);
    return;
  } catch (error: any) {
    if (error.message === "PUBLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Publicación no encontrada." });
      return;
    }
    console.error("Información de marketing no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateMarketing: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const marketingUpdate = await MarketingService.updateMarketingService(projectId, req.body);

    res.status(200).json({ message: "Información de marketing actualizada correctamente.", document: marketingUpdate });
  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mareketing no encontrada." });
      return;
    }
    console.error("Error al actualizar la fase de mareketing:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updatePublication: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const publicationFound = await MarketingService.updatePublicationService(projectId, req.params.publicationId, req.body);
    
    res.status(200).json({ message: "Publicación actualizada correctamente.", document: publicationFound });
  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de marketing no encontrada." });
      return;
    }
    if (error.message === "PUBLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Publicación no encontrada." });
      return;
    }
    console.error("Error al actualizar la información de publicación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deleteMarketingPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const marketingDelete = await MarketingService.deleteMarketingPhaseService(projectId); 

    res.status(200).json({ message: "Fase de marketing eliminada correctamente.", document: marketingDelete });
  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de marketing no encontrada." });
      return;
    }
    console.error("Error al eliminar la fase de marketing:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deletePublication: RequestHandler = async (req, res) => {
  try {
    const { projectId, publicationId } = req.params;

    const publicationDelete = await MarketingService.deletePublicationService(projectId, publicationId); 
    res.status(200).json({ message: "Publicación eliminada correctamente.", document: publicationDelete }); 
  } catch (error: any) {
    if (error.message === "MARKETING_NOT_FOUND") {
      res.status(404).json({ message: "Fase de marketing no encontrada." });
      return;
    }
    if (error.message === "PUBLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Publicación no encontrada." });
      return;
    }
    console.error("Error al eliminar la publicación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};
