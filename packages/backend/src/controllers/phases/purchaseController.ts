import { RequestHandler } from "express";
import * as PurchaseService from "../../services/phases/purchaseServices";

// ----- CREATE -----
export const addPurchase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedPurchase = await PurchaseService.addPurchaseService(projectId, req.body);

    res.status(201).json({ message: "Factura de compra agregada correctamente.", document: savedPurchase });

  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Compras no encontradas." });
      return;
    }
    if (error.message === "PURCHASE_ALREADY_EXISTS") {
      res.status(409).json({ message: "La factura de compra ya existe." });
      return;
    }

    console.error("Error al crear factura de compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllPurchases: RequestHandler = async (req, res) => {
  try {
    const purchases = await PurchaseService.getAllPurchasesService();
    res.status(200).json(purchases);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getPurchase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const purchaseFound = await PurchaseService.getPurchaseService(projectId);

    res.status(200).json(purchaseFound);
    return;
  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Compras no encontradas." });
      return;
    }
    console.error("Información de compra no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getOnePurchase: RequestHandler = async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params as { projectId: string, purchaseId: string };

    const purchaseFound = await PurchaseService.getOnePurchaseService(projectId, purchaseId);

    res.status(200).json(purchaseFound);
    return;
  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Compras no encontradas." });
      return;
    }
    console.error("Información de compra no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updatePurchase: RequestHandler = async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params as { projectId: string, purchaseId: string };

    const purchaseUpdated = await PurchaseService.updatePurchaseService(projectId, purchaseId, req.body);

    res.status(200).json({ message: "Factura de compra actualizada correctamente.", document: purchaseUpdated });
  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de compras no encontradas." });
      return;
    }
    if (error.message === "PURCHASE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Factura de compra no encontrada." });
      return;
    }
    console.error("Error al actualizar factura de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deletePurchasePhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const purchaseDeleted = await PurchaseService.deletePurchasePhaseService(projectId); 

    res.status(200).json({ message: "Fase de facturas de compras eliminada correctamente.", document: purchaseDeleted });
  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de compras no encontradas." });
      return;
    }
    console.error("Error al eliminar la fase facturas de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deleteOnePurchase: RequestHandler = async (req, res) => {
  try {
    const { projectId, purchaseId } = req.params as { projectId: string, purchaseId: string };

    const purchaseDeleted = await PurchaseService.deletePurchaseService(projectId, purchaseId); 

    res.status(200).json({ message: "Factura de compra eliminada correctamente.", document: purchaseDeleted });
  } catch (error: any) {
    if (error.message === "PURCHASE_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de compras no encontradas." });
      return;
    }
    if (error.message === "PURCHASE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Factura de compra no encontrada." });
      return;
    }
    console.error("Error al eliminar factura de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};