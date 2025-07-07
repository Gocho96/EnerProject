import { RequestHandler } from "express";
import { Project } from "../models/projectModel";

export const getAllProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
    return;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getProject: RequestHandler = async (req, res) => {
  try {
    const projectFound = await Project.findById(req.params.id);
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

export const createProject: RequestHandler = async (req, res) => {
  try {
    const existingProject = await Project.findOne({ code: req.body.code });
    if (existingProject) {
      res.status(409).json({ message: "El proyecto ya existe" });
      return;
    }

    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
    return;
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const { code, ...dataToUpdate } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    res.status(200).json(updatedProject);
    return;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.status(200).json(deletedProject);
    return;
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

export const getProjectPhases: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ error: "Proyecto no encontrado" });
      return;
    }

    const phases = [
      { name: "Alistamiento Documental", status: "Completado" },
      { name: "Ingeniería", status: "En Progreso" },
      { name: "Montaje", status: "Pendiente" },
      { name: "RETIE", status: "No Iniciado" },
      { name: "Operador de Red", status: "No Iniciado" },
    ];

    res.status(200).json(phases);
    return;
  } catch (error) {
    console.error("Error al obtener las fases del proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};
