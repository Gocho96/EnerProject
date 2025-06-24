import { RequestHandler } from "express";
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
      console.log(error);
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
    const billingFound = await Billing.findOne({ billingNumber: req.body.billingNumber });
    if (billingFound) {
      res.status(301).json({ message: "La factura de venta ya existe" });
      return;
    }
    const billing = new Billing(req.body);
    const savedBilling = await billing.save();
    res.json(savedBilling);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const deleteBilling: RequestHandler = async (req, res) => {
  try {
    const billingDelete = await Billing.findByIdAndDelete(req.params.id);
    if (!billingDelete) {
      res.status(404).json({ message: "Factura de venta no encontrada" });
      return;
    }
    res.json(billingDelete);
  } catch (error) {
    console.log(error);
  }
};


