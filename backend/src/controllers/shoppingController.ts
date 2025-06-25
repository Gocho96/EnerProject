import { RequestHandler } from "express";
import { Shopping } from "../models/shoppingModel";

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
    const shoppingFound = await Shopping.findById(req.params.id);
    if (!shoppingFound) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.json(shoppingFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectShoppings: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const shoppings = await Shopping.find({ projectId });
    res.json(shoppings);
  } catch (error) {
    console.error("Error al obtener compras del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createShopping: RequestHandler = async (req, res) => {
  try {
    const { materialSubtotal, materialIVA } = req.body;

    req.body.materialTotal = (materialSubtotal || 0) + (materialIVA || 0);

    const shopping = new Shopping(req.body);
    const savedShopping = await shopping.save();
    res.json(savedShopping);
  } catch (error) {
    console.error("Error al crear compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateShopping: RequestHandler = async (req, res) => {
  try {
    const shoppingUpdate = await Shopping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!shoppingUpdate) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.json(shoppingUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const deleteShopping: RequestHandler = async (req, res) => {
  try {
    const shoppingDelete = await Shopping.findByIdAndDelete(req.params.id);
    if (!shoppingDelete) {
      res.status(404).json({ message: "Compra no encontrada" });
      return;
    }
    res.json(shoppingDelete);
  } catch (error) {
    console.log(error);
  }
};
