import { RequestHandler } from "express";
import { Project } from "../models/projectModel";

export const getAllProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProject: RequestHandler = async (req, res) => {
    try {
      const projectFound = await Project.findById(req.params.id);
      if (!projectFound) {
        res.status(404).json({ message: "Proyecto no encontrado" });
        return;
      }
      res.json(projectFound);
    } catch (error) {
      console.log(error);
    }
  };

export const createProject: RequestHandler = async (req, res) => {
  try {
    const projectFound = await Project.findOne({ name: req.body.name });
    if (projectFound) {
      res.status(409).json({ message: "El proyecto ya existe" });
      return;
    }
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

export const updateProject: RequestHandler = async (req, res) => {
  try {
    const projectUpdate = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!projectUpdate) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.json(projectUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject: RequestHandler = async (req, res) => {
  try {
    const projectDelete = await Project.findByIdAndDelete(req.params.id);
    if (!projectDelete) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.json(projectDelete);
  } catch (error) {
    console.log(error);
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

    res.json(phases);
  } catch (error) {
    console.error("Error al obtener las fases del proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};