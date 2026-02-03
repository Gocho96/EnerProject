import { RequestHandler } from "express";
import * as NetworkOperatorService from "../../services/phases/networkOperatorServices";

// ----- CREATE -----
export const addApplicationOr: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const savedApplicationOr = await NetworkOperatorService.addApplicationOrService(projectId, req.body);
    res.status(201).json({ message: "Registro agregado correctamente.", document: savedApplicationOr });

  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de Operador de red no encontrada." });
      return;
    }
    if (error.message === "APPLICATION_OR_ALREADY_EXISTS") {
      res.status(409).json({ message: "La solicitud ya existe." });
      return;
    }
     console.error("Error al crear la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllNetworkOperators: RequestHandler = async (req, res) => {
  try {
    const networkOperators = await NetworkOperatorService.getAllNetworkOperatorsService();
    res.status(200).json(networkOperators);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de operador de red:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const networkOperatorFound = await NetworkOperatorService.getNetworkOperatorService(projectId);

    res.status(200).json(networkOperatorFound);
    return;
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    console.error("Información de operador de red no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getApplicationOr: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationOrId } = req.params;

    const networkOperatorFound = await NetworkOperatorService.getApplicationOrService(projectId, applicationOrId);

    res.status(200).json(networkOperatorFound);
    return;
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    if (error.message === "APPLICATION_OR_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }
    console.error("Información de solicitud no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateNetworkOperator: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const networkOperatorUpdate = await NetworkOperatorService.updateNetworkOperatorService(projectId, req.body);

    res.status(200).json({ message: "fase de operador de red actualizada correctamente.", document: networkOperatorUpdate });
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    console.error("Error al actualizar la fase de operador de red:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateApplicationOr: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const applicationOrUpdate = await NetworkOperatorService.updateApplicationOrService(projectId, req.params.applicationOrId, req.body);
    
    res.status(200).json({ message: "Solicitud ante el OR actualizada correctamente.", document: applicationOrUpdate });
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    if (error.message === "APPLICATION_OR_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud ante el OR no encontrada." });
      return;
    }
    console.error("Error al actualizar registro de solicitud ante el OR:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deleteNetworkOperatorPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const networkOperatorDelete = await NetworkOperatorService.deleteNetworkOperatorPhaseService(projectId); 

    res.status(200).json({ message: "Fase de operador de red eliminada correctamente.", document: networkOperatorDelete });
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    console.error("Error al eliminar la fase de operador de red:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deleteApplicationOr: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationOrId } = req.params;

    const applicationOrDeleted = await NetworkOperatorService.deleteApplicationOrService(projectId, applicationOrId); 
    res.status(200).json({ message: "Solicitud eliminada correctamente.", document: applicationOrDeleted }); 
  } catch (error: any) {
    if (error.message === "NETWORK_OPERATOR_NOT_FOUND") {
      res.status(404).json({ message: "Fase de operador de red no encontrada." });
      return;
    }
    if (error.message === "APPLICATION_OR_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud ante el OR no encontrada." });
      return;
    }
    console.error("Error al eliminar la solicitud ante el OR:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};
