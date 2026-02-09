import { RequestHandler } from "express";
import * as SalesService from "../../services/phases/salesServices";

// ----- CREATE -----
export const addSale: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const savedSale = await SalesService.addSaleService(projectId, req.body);

    res.status(201).json({ message: "Factura de venta agregada correctamente.", document: savedSale });

  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Compras no encontradas." });
      return;
    }
    if (error.message === "SALE_ALREADY_EXISTS") {
      res.status(409).json({ message: "La factura de venta ya existe." });
      return;
    }

    console.error("Error al crear factura de venta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ----- READ -----
export const getAllSales: RequestHandler = async (req, res) => {
  try {
    const sales = await SalesService.getAllSalesService();
    res.status(200).json(sales);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getSale: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const saleFound = await SalesService.getSaleService(projectId);

    res.status(200).json(saleFound);
    return;
  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Ventas no encontradas." });
      return;
    }
    console.error("Información de ventas no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getOneSale: RequestHandler = async (req, res) => {
  try {
    const { projectId, saleId } = req.params as { projectId: string, saleId: string };

    const saleFound = await SalesService.getOneSaleService(projectId, saleId);

    res.status(200).json(saleFound);
    return;
  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Ventas no encontradas." });
      return;
    }
    console.error("Información de ventas no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateSale: RequestHandler = async (req, res) => {
  try {
    const { projectId, saleId } = req.params as { projectId: string, saleId: string };

    const saleUpdated = await SalesService.updateSaleService(projectId, saleId, req.body);

    res.status(200).json({ message: "Factura de venta actualizada correctamente.", document: saleUpdated });
  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de venta no encontradas." });
      return;
    }
    if (error.message === "SALE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Factura de venta no encontrada." });
      return;
    }
    console.error("Error al actualizar factura de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- DELETE -----
export const deleteSalesPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params as { projectId: string };

    const salesDeleted = await SalesService.deleteSalesPhaseService(projectId); 

    res.status(200).json({ message: "Fase de facturas de venta eliminada correctamente.", document: salesDeleted });
  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de venta no encontradas." });
      return;
    }
    console.error("Error al eliminar la fase facturas de venta:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};

export const deleteOneSale: RequestHandler = async (req, res) => {
  try {
    const { projectId, saleId } = req.params as { projectId: string, saleId: string };

    const saleDelete = await SalesService.deleteSaleService(projectId, saleId); 

    res.status(200).json({ message: "Factura de venta eliminada correctamente.", document: saleDelete });
  } catch (error: any) {
    if (error.message === "SALES_NOT_FOUND") {
      res.status(404).json({ message: "Facturas de compras no encontradas." });
      return;
    }
    if (error.message === "SALE_RECORD_NOT_FOUND") {
      res.status(404).json({ message: "Factura de compra no encontrada." });
      return;
    }
    console.error("Error al eliminar factura de compra:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  } 
};