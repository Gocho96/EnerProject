import { RequestHandler } from "express";
import { Types } from "mongoose";
import { Billing } from "../models/billingModel";

export const getAllBillings: RequestHandler = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.json(billings);
  } catch (error) {
    console.error("Error al obtener facturas de venta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getBilling: RequestHandler = async (req, res) => {
  try {
    const billingFound = await Billing.findById(req.params.id);
    if (!billingFound) {
      res.status(404).json({ message: "Factura de venta no encontrada" });
      return;
    }
    res.json(billingFound);
  } catch (error) {
    console.log("Error al obtener factura", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getByProjectBillings: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const billings = await Billing.find({ projectId });
    res.json(billings);
  } catch (error) {
    console.error("Error al obtener facturas de venta del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createBilling: RequestHandler = async (req, res) => {
  try {
    const { projectId, billingSubtotal, billingIva } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res
        .status(400)
        .json({
          message: "No hay proyecto asociado a la factura de venta",
        });
      return;
    }

    req.body.billingTotal = (billingSubtotal || 0) + (billingIva || 0);

    const billingFound = await Billing.findOne({
      billingNumber: req.body.billingNumber,
    });
    if (billingFound) {
      res.status(409).json({ message: "La factura de venta ya existe" });
      return;
    }
    const billing = new Billing(req.body);
    const savedBilling = await billing.save();
    res.status(201).json(savedBilling);
  } catch (error) {
    console.error("Error al crear factura de venta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createBillingByProject: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { billingNumber, billingSubtotal, billingIva, ...rest } = req.body;

    if (!projectId || !Types.ObjectId.isValid(projectId)) {
      res.status(400).json({
        message: "ID de proyecto no válido o no proporcionado",
      });
      return;
    }

    const existingBilling = await Billing.findOne({ billingNumber });
    if (existingBilling) {
      res.status(409).json({ message: "La factura de venta ya existe" });
      return;
    }

    const billingTotal = (billingSubtotal || 0) + (billingIva || 0);

    const newBilling = new Billing({
      projectId,
      billingNumber,
      billingSubtotal,
      billingIva,
      billingTotal,
      ...rest,
    });

    const savedBilling = await newBilling.save();

    res.status(201).json(savedBilling);
  } catch (error) {
    console.error("Error al crear factura por ID de proyecto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateBilling: RequestHandler = async (req, res) => {
  try {
    const billingUpdate = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!billingUpdate) {
      res.status(404).json({ message: "Factura de venta no encontrada" });
      return;
    }
    res.json(billingUpdate);
  } catch (error) {
    console.error("Error al actualizar factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteBilling: RequestHandler = async (req, res) => {
  try {
    const billingDelete = await Billing.findByIdAndDelete(req.params.id);
    if (!billingDelete) {
      res.status(404).json({ message: "Factura de venta no encontrada" });
      return;
    }
    res.status(200).json({ message: "Factura de venta eliminada" });
  } catch (error) {
    console.error("Error al eliminar factura de venta", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
