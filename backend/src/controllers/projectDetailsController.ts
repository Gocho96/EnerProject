import { RequestHandler } from "express";
import { ProjectDetails } from "../models/projectDetailsModel";

export const getAllProjectDetails: RequestHandler = async (req, res) => {
  try {
    const projectDetails = await ProjectDetails.find();
    res.json(projectDetails);
  } catch (error) {
    console.error("Error al obtener detalles del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProjectDetails: RequestHandler = async (req, res) => {
  try {
    const projectDetailsFound = await ProjectDetails.findById(req.params.id);
    if (!projectDetailsFound) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }
    res.json(projectDetailsFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectDetails: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const details = await ProjectDetails.find({ projectId });
    res.json(details);
  } catch (error) {
    console.error("Error al obtener los detalles del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProjectDetails: RequestHandler = async (req, res) => {
  try {
    const projectDetailsFound = await ProjectDetails.findOne({
      projectId: req.body.projectId,
    });
    if (projectDetailsFound) {
      res.status(301).json({ message: "Los detalles del proyecto ya existes" });
      return;
    }
    const projectDetails = new ProjectDetails(req.body);
    const savedProjectDetails = await projectDetails.save();
    res.json(savedProjectDetails);
  } catch (error) {
    console.log(error);
  }
};

export const updateProjectDetails: RequestHandler = async (req, res) => {
  try {
    const detailsUpdate = await ProjectDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!detailsUpdate) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }
    res.json(detailsUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProjectDetails: RequestHandler = async (req, res) => {
  try {
    const detailsDelete = await ProjectDetails.findByIdAndDelete(req.params.id);
    if (!detailsDelete) {
      res.status(404).json({ message: "Detalles del proyecto no encontrados" });
      return;
    }
    res.json(detailsDelete);
  } catch (error) {
    console.log(error);
  }
};
