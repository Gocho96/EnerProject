import { RequestHandler } from "express";
import * as InstallationService from "../../services/phases/installationServices";

// ----- CREATE -----
export const addDailyLog: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedDailyLog = await InstallationService.addDailyLogService(projectId, req.body);

    res.status(201).json({ message: "Registro agregado correctamente.", document: savedDailyLog });

  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    if (error.message === "DAILY_LOG_ALREADY_EXISTS") {
      res.status(409).json({ message: "El registro diario ya existe." });
      return;
    }
     console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllInstallations: RequestHandler = async (req, res) => {
  try {
    const installations = await InstallationService.getAllInstallationsService();
    res.status(200).json(installations);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de instalación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getInstallation: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const installationFound = await InstallationService.getInstallationService(projectId);

    res.status(200).json(installationFound);
    return;
  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    console.error("Información de instalación no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getDailyLog: RequestHandler = async (req, res) => {
  try {
    const { projectId, dailyLogId } = req.params as { projectId: string, dailyLogId: string };

    const dailyLogFound = await InstallationService.getDailyLogService(projectId, dailyLogId);

    res.status(200).json(dailyLogFound);
    return;
  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    console.error("Información de instalación no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateDailyLog: RequestHandler = async (req, res) => {
  try {
    const { projectId, dailyLogId } = req.params as { projectId: string, dailyLogId: string };

    const dailyLogUpdated = await InstallationService.updateDailyLogService(projectId, dailyLogId, req.body);

    res.status(200).json({ message: "Registro actualizado correctamente.", document: dailyLogUpdated });
  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    if (error.message === "DAILY_LOG_NOT_FOUND") {
      res.status(404).json({ message: "Registro de instalación no encontrado." });
      return;
    }
    console.error("Error al actualizar registro de instalación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deleteInstallationPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const installationDeleted = await InstallationService.deleteInstallationPhaseService(projectId); 

    res.status(200).json({ message: "Fase de instalación eliminada correctamente.", document: installationDeleted });
  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    console.error("Error al eliminar la fase instalación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deleteDailyLog: RequestHandler = async (req, res) => {
  try {
    const { projectId, dailyLogId } = req.params as { projectId: string, dailyLogId: string };

    const dailyLogDeleted = await InstallationService.deleteDailyLogService(projectId, dailyLogId); 

    res.status(200).json({ message: "Registro de instalación eliminado correctamente.", document: dailyLogDeleted }); 
  } catch (error: any) {
    if (error.message === "INSTALLATION_NOT_FOUND") {
      res.status(404).json({ message: "Instalación no encontrada." });
      return;
    }
    if (error.message === "DAILY_LOG_NOT_FOUND") {
      res.status(404).json({ message: "Registro de instalación no encontrado." });
      return;
    }
    console.error("Error al eliminar registro de instalación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};
