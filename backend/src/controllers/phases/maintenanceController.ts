import { RequestHandler } from "express";
import * as MaintenanceService from "../../services/phases/maintenanceServices";

// ----- CREATE -----
export const addMaintenanceRecord: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const savedMaintenanceRecord = await MaintenanceService.addMaintenanceRecordService(projectId, req.body);
    res.status(201).json({ message: "Registro agregado correctamente.", document: savedMaintenanceRecord });

  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    if (error.message === "MAINTENANCE_RECORD_ALREADY_EXISTS") {
      res.status(409).json({ message: "El registro de mantenimiento ya existe." });
      return;
    }
     console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllMaintenances: RequestHandler = async (req, res) => {
  try {
    const maintenances = await MaintenanceService.getAllMaintenancesService();
    res.status(200).json(maintenances);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de mantenimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const maintenanceFound = await MaintenanceService.getMaintenanceService(projectId);

    res.status(200).json(maintenanceFound);
    return;
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    console.error("Información de mantenimiento no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getMaintenanceRecord: RequestHandler = async (req, res) => {
  try {
    const { projectId, maintenanceRecordId } = req.params;

    const maintenanceRecordFound = await MaintenanceService.getMaintenanceRecordService(projectId, maintenanceRecordId);

    res.status(200).json(maintenanceRecordFound);
    return;
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    if (error.message === "MAINTENANCE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Registro de mantenimiento no encontrado." });
      return;
    }
    console.error("Información de mantenimiento no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateMaintenance: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const maintenanceUpdated = await MaintenanceService.updateMaintenanceService(projectId, req.body);

    res.status(200).json({ message: "Mantenimiento actualizado correctamente.", document: maintenanceUpdated });
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    console.error("Error al actualizar la fase de mantenimiento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateMaintenanceRecord: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const maintenanceRecordUpdated = await MaintenanceService.updateMaintenanceRecordService(projectId, req.params.maintenanceRecordId, req.body);
    
    res.status(200).json({ message: "Mantenimiento actualizado correctamente.", document: maintenanceRecordUpdated });
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    if (error.message === "MAINTENANCE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Registro de mantenimiento no encontrado." });
      return;
    }
    console.error("Error al actualizar registro de mantenimiento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deleteMaintenancePhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const maintenanceDeleted = await MaintenanceService.deleteMaintenancePhaseService(projectId); 

    res.status(200).json({ message: "Fase de mantenimiento eliminada correctamente.", document: maintenanceDeleted });
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    console.error("Error al eliminar la fase de mantenimiento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deleteMaintenanceRecord: RequestHandler = async (req, res) => {
  try {
    const { projectId, maintenanceRecordId } = req.params;

    const maintenanceRecordDeleted = await MaintenanceService.deleteMaintenanceRecordService(projectId, maintenanceRecordId); 
    res.status(200).json({ message: "Registro de mantenimiento eliminado correctamente.", document: maintenanceRecordDeleted }); 
  } catch (error: any) {
    if (error.message === "MAINTENANCE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de mantenimiento no encontrada." });
      return;
    }
    if (error.message === "MAINTENANCE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Registro de mantenimiento no encontrado." });
      return;
    }
    console.error("Error al eliminar registro de mantenimiento:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};
