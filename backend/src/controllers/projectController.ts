import { RequestHandler } from "express";
import { Project } from "../models/projectModel";
import { createDocumentPhaseService } from "../services/phases/documentServices";
import { createEngineeringPhaseService } from "../services/phases/engineeringServices";
import { createInstallationPhaseService } from "../services/phases/installationServices";
import { createMaintenancePhaseService } from "../services/phases/maintenanceServices";
import { createMarketingPhaseService } from "../services/phases/marketingServices";
import { createNetworkOperatorPhaseService } from "../services/phases/networkOperatorServices";
import { createPurchasePhaseService } from "../services/phases/purchaseServices";
import { createRetiePhaseService } from "../services/phases/retieServices";
import { createSalesPhaseService } from "../services/phases/salesServices";
import { createTaxIncentivePhaseService } from "../services/phases/taxIncentiveServices";
import { createProjectDetailsService } from "../services/projectDetailsServices";

// ---- CREATE -----
export const createProject: RequestHandler = async (req, res) => {
  try {
    const { code, ...projectData } = req.body;

    const projectFound = await Project.findOne({ code });
    if (projectFound) {
      res.status(409).json({ message: "El proyecto ya existe" });
      return;
    }

    const newProject = new Project({
      code,
      ...projectData,
    });
    const savedProject = await newProject.save();

    await createProjectDetailsService(savedProject._id.toString());

    await createDocumentPhaseService(savedProject._id.toString());
    await createEngineeringPhaseService(savedProject._id.toString());
    await createInstallationPhaseService(savedProject._id.toString());
    await createMaintenancePhaseService(savedProject._id.toString());
    await createMarketingPhaseService(savedProject._id.toString());
    await createNetworkOperatorPhaseService (savedProject._id.toString());
    await createPurchasePhaseService(savedProject._id.toString());
    await createRetiePhaseService(savedProject._id.toString());
    await createSalesPhaseService(savedProject._id.toString());
    await createTaxIncentivePhaseService(savedProject._id.toString());

    res.status(201).json(savedProject);
    return;
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ----- READ -----
export const getAllProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
    return;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const projectFound = await Project.findById(id);

    if (!projectFound) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    res.status(200).json(projectFound);
    return;
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ---- UPDATE -----
export const updateProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, ...updateData } = req.body;

    const updateProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateProject) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.status(200).json(updateProject);
    return;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

// ---- DELETE ----
export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    res.status(204).json(deletedProject);
    return;
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};
