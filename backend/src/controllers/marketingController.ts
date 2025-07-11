import { RequestHandler } from "express";
import { Marketing } from "../models/marketingModel";
import { Project } from "../models/projectModel";

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

export const getMarketingByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return  ;
    }

    const marketing = await Marketing.findOne({ projectId: project._id });
    if (!marketing) {
      res.status(404).json({ message: "Información de marketing no encontrada" })
      return;
    }

    res.json(marketing);
  } catch (error) {
    console.error("Error al obtener marketing por código de proyecto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createMarketing: RequestHandler = async (req, res) => {
  try {
    const { projectId, sendSurvey, sendSurveyDate, publications } = req.body;

    const exists = await Marketing.findOne({ projectId });
    if (exists) {
      res.status(400).json({ message: "Ya existe un registro de marketing para este proyecto." });
      return;
    }

    const doc = new Marketing({
      projectId,
      sendSurvey,
      sendSurveyDate,
      publications: publications ? [publications] : [],
    });

    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear documento de marketing:", error);
    res.status(400).json({ error: "Error al crear documento de marketing" });
  }
};

export const addPublicationEntry: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const entry = req.body;

    const updated = await Marketing.findOneAndUpdate(
      { projectId },
      { $push: { publications: entry } },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    res.status(201).json({ message: "Publicación agregada", data: updated });
  } catch (error) {
    console.error("Error al agregar publicación:", error);
    res.status(500).json({ error: "Error interno" });
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

export const updatePublicationEntry: RequestHandler = async (req, res) => {
  try {
    const { projectId, publicationId } = req.params;
    const update = req.body;

    const updated = await Marketing.findOneAndUpdate(
      { projectId, "publications._id": publicationId },
      {
        $set: {
          "publications.$.platform": update.platform,
          "publications.$.publicationDate": update.publicationDate,
          "publications.$.publicationUrl": update.publicationUrl,
        },
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Publicación no encontrada" });
      return;
    }

    res.json({ message: "Publicación actualizada", data: updated });
  } catch (error) {
    console.error("Error al actualizar publicación:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

export const updateSurveyInfo: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { sendSurvey, sendSurveyDate } = req.body;

    const updated = await Marketing.findOneAndUpdate(
      { projectId },
      {
        ...(sendSurvey !== undefined && { sendSurvey }),
        ...(sendSurveyDate !== undefined && { sendSurveyDate }),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Documento de marketing no encontrado" });
      return;
    }

    res.json({ message: "Información de encuesta actualizada", data: updated });
  } catch (error) {
    console.error("Error al actualizar encuesta:", error);
    res.status(500).json({ error: "Error interno" });
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

export const deletePublicationEntry: RequestHandler = async (req, res) => {
  try {
    const { projectId, publicationId } = req.params;

    const updated = await Marketing.findOneAndUpdate(
      { projectId },
      { $pull: { publications: { _id: publicationId } } },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Publicación no encontrada" });
      return;
    }

    res.json({ message: "Publicación eliminada", data: updated });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

