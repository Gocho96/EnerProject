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

export const getShoppingByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const project = await Project.findOne({ code });

    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }

    const shopping = await Shopping.findOne({ projectId: project._id });
    res.json(shopping);
  } catch (error) {
    console.error("Error al obtener compras por código del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
    } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "ID del proyecto no válido o no proporcionado",
      });
      return;
    }

    const materialTotal = (materialSubtotal || 0) + (materialIVA || 0);

    const material = {
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      materialTotal,
    };

    const shopping = new Shopping({
      projectId,
      materialItem: [material],
    });

    const saved = await shopping.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const addMaterialToShopping: RequestHandler = async (req, res) => {
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
    } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "ID del módulo de compras no válido o no proporcionado",
      });
      return;
    }

    const materialTotal = (materialSubtotal || 0) + (materialIVA || 0);

    const newMaterial = {
      materialDescription,
      materialQuantity,
      materialSupplier,
      materialInvoice,
      materialDate,
      materialSubtotal,
      materialIVA,
      materialTotal,
    };

    const updated = await Shopping.findOneAndUpdate(
      { projectId },
      { $push: { materialItem: newMaterial } },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Documento de compras no encontrado" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error al agregar material:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateMaterial: RequestHandler = async (req, res) => {
  try {
    const { projectId, materialId } = req.params;
    const updateData = req.body;

    if (!Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "ID de proyecto no válido" });
      return;
    }

    const shoppingDoc = await Shopping.findOne({ projectId });

    if (!shoppingDoc) {
      res.status(404).json({ message: "Documento de compras no encontrado" });
      return;
    }

    const material = shoppingDoc.materialItem.id(materialId);

    if (!material) {
      res.status(404).json({ message: "Material no encontrado" });
      return;
    }

    material.materialDescription =
      updateData.materialDescription ?? material.materialDescription;
    material.materialQuantity =
      updateData.materialQuantity ?? material.materialQuantity;
    material.materialSupplier =
      updateData.materialSupplier ?? material.materialSupplier;
    material.materialInvoice =
      updateData.materialInvoice ?? material.materialInvoice;
    material.materialDate = updateData.materialDate ?? material.materialDate;
    material.materialSubtotal =
      updateData.materialSubtotal ?? material.materialSubtotal;
    material.materialIVA = updateData.materialIVA ?? material.materialIVA;

    material.materialTotal =
      (material.materialSubtotal || 0) + (material.materialIVA || 0);

    await shoppingDoc.save();

    res.status(200).json(shoppingDoc);
  } catch (error) {
    console.error("Error al actualizar material:", error);
    res.status(500).json({ message: "Error al actualizar el material", error });
  }
};

export const deleteMaterial: RequestHandler = async (req, res) => {
  try {
    const { projectId, materialId } = req.params;

    const updatedShopping = await Shopping.findOneAndUpdate(
      { projectId },
      {
        $pull: { materialItem: { _id: materialId } },
      },
      { new: true }
    );

    if (!updatedShopping) {
      res.status(404).json({ message: "Material no encontrado" });
      return;
    }

    res.status(200).json(updatedShopping);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el material", error });
  }
};
