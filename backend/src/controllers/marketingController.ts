import { RequestHandler } from "express";
import { Marketing } from "../models/marketingModel";

export const getAllMarketings: RequestHandler = async (req, res) => {
  try {
    const marketings = await Marketing.find();
    res.json(marketings);
  } catch (error) {
    console.error("Error al obtener información de marketing", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getMarketing: RequestHandler = async (req, res) => {
  try {
    const marketingFound = await Marketing.findById(req.params.id);
    if (!marketingFound) {
      res
        .status(404)
        .json({ message: "Información de marketing no encontrada" });
      return;
    }
    res.json(marketingFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectMarketing: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const marketings = await Marketing.find({ projectId });
    res.json(marketings);
  } catch (error) {
    console.error("Error al obtener la información de marketing", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createMarketing: RequestHandler = async (req, res) => {
  try {
    const marketingFound = await Marketing.findOne({
      projectId: req.body.projectId,
    });
    if (marketingFound) {
      res
        .status(301)
        .json({ message: "La información de marketing ya existe" });
      return;
    }
    const marketing = new Marketing(req.body);
    const savedMarketing = await marketing.save();
    res.json(savedMarketing);
  } catch (error) {
    console.log(error);
  }
};

export const updateMarketing: RequestHandler = async (req, res) => {
  try {
    const marketingUpdate = await Marketing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!marketingUpdate) {
      res
        .status(404)
        .json({ message: "Información de marketing no encontrada" });
      return;
    }
    res.json(marketingUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMarketing: RequestHandler = async (req, res) => {
  try {
    const marketingDelete = await Marketing.findByIdAndDelete(req.params.id);
    if (!marketingDelete) {
      res
        .status(404)
        .json({ message: "Información de marketing no encontrada" });
      return;
    }
    res.json(marketingDelete);
  } catch (error) {
    console.log(error);
  }
};
