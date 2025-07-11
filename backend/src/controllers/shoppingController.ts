import { RequestHandler } from "express";
import { Types } from "mongoose";
import { Shopping } from "../models/shoppingModel";
import { Project } from "../models/projectModel";

export const getAllShoppings: RequestHandler = async (req, res) => {
  try {
    const shoppings = await Shopping.find();
    res.json(shoppings);
  } catch (error) {
    console.error("Error al obtener compras", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getShopping: RequestHandler = async (req, res) => {
  try {
    const shopping = await Shopping.findById(req.params.id);
    if (!shopping) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.json(shopping);
  } catch (error) {
    console.error("Error al obtener compra", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getShoppingsByProject: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const shoppings = await Shopping.find({ projectId });
    res.json(shoppings);
  } catch (error) {
    console.error("Error al obtener compras del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getShoppingByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const project = await Project.findOne({ code });

    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" })
      return;
    }

    const shopping = await Shopping.find({ projectId: project._id });
    res.json(shopping);
  } catch (error) {
    console.error("Error al obtener compras por código del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getShoppingsByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    const shoppings = await Shopping.find({ projectId: project._id });
    res.json(shoppings);
  } catch (error) {
    console.error("Error al obtener compras por código:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createShopping: RequestHandler = async (req, res) => {
  try {
    const {
      projectId,
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      ...rest
    } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "ID del proyecto no válido o no proporcionado",
      });
      return;
    }

    const existingShopping = await Shopping.findOne({ projectId });
    if (existingShopping) {
      res.status(409).json({ message: "Ya existen compras para este proyecto" });
      return;
    }

    const materialTotal = (materialSubtotal || 0) + (materialIVA || 0);

    const newShopping = new Shopping({
      projectId,
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      materialTotal,
      ...rest,
    });

    const savedShopping = await newShopping.save();
    res.status(201).json(savedShopping);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createShoppingByProjectId: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const {
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      ...rest
    } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "ID de proyecto no válido o no proporcionado",
      });
      return;
    }

    const materialTotal = (materialSubtotal || 0) + (materialIVA || 0);

    const newShopping = new Shopping({
      projectId,
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      materialTotal,
      ...rest,
    });

    const savedShopping = await newShopping.save();
    res.status(201).json(savedShopping);
  } catch (error) {
    console.error("Error al crear compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateShopping: RequestHandler = async (req, res) => {
  try {
    const updatedShopping = await Shopping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedShopping) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.json(updatedShopping);
  } catch (error) {
    console.error("Error al actualizar compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteShopping: RequestHandler = async (req, res) => {
  try {
    const deletedShopping = await Shopping.findByIdAndDelete(req.params.id);
    if (!deletedShopping) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.status(200).json({ message: "Compra eliminada" });
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
