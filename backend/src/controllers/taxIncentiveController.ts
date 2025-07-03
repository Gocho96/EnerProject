import { RequestHandler } from "express";
import { TaxIncentive } from "../models/taxIncentiveModel";

export const getAllTaxIncentives: RequestHandler = async (req, res) => {
  try {
    const taxIncentives = await TaxIncentive.find();
    res.json(taxIncentives);
  } catch (error) {
    console.error("Error al obtener información de incentivos tributarios", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const taxIncentiveFound = await TaxIncentive.findById(req.params.id);
    if (!taxIncentiveFound) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }
    res.json(taxIncentiveFound);
  } catch (error) {
    console.log(error);
  }
};

export const getByProjectTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const taxIncentives = await TaxIncentive.find({ projectId });
    res.json(taxIncentives);
  } catch (error) {
    console.error("Error al obtener incentivos tributarios del proyecto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const taxIncentiveFound = await TaxIncentive.findOne({
      projectId: req.body.projectId,
    });
    if (taxIncentiveFound) {
      res.status(301).json({ message: "El incentivo tributario ya existe" });
      return;
    }
    const taxIncentive = new TaxIncentive(req.body);
    const savedTaxIncentive = await taxIncentive.save();
    res.json(savedTaxIncentive);
  } catch (error) {
    console.log(error);
  }
};

export const addSecondaryBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, numberDocument } = req.body;

    const taxIncentive = await TaxIncentive.findOne({ projectId });
    if (!taxIncentive) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }

    taxIncentive.secondaryBeneficiaries.push({ name, numberDocument });
    await taxIncentive.save();

    res.json(taxIncentive);
  } catch (error) {
    console.error("Error al agregar beneficiario secundario", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const taxIncentiveUpdate = await TaxIncentive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!taxIncentiveUpdate) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }
    res.json(taxIncentiveUpdate);
  } catch (error) {
    console.log(error);
  }
};

export const updateSecondaryBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId, beneficiaryId } = req.params;
    const { name, numberDocument } = req.body;

    const taxIncentive = await TaxIncentive.findOne({projectId});
    if (!taxIncentive) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }

    const beneficiary = taxIncentive.secondaryBeneficiaries.id(beneficiaryId);
    if (!beneficiary) {
      res.status(404).json({ message: "Beneficiario secundario no encontrado" });
      return;
    }

    if (name) beneficiary.name = name;
    if (numberDocument) beneficiary.numberDocument = numberDocument;

    await taxIncentive.save();

    res.json(taxIncentive);
  } catch (error) {
    console.error("Error al editar beneficiario secundario", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const taxIncentiveDelete = await TaxIncentive.findByIdAndDelete(req.params.id);
    if (!taxIncentiveDelete) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }
    res.json(taxIncentiveDelete);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSecondaryBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId, beneficiaryId } = req.params;

    const taxIncentive = await TaxIncentive.findOne({projectId});
    if (!taxIncentive) {
      res.status(404).json({ message: "Incentivo tributario no encontrado" });
      return;
    }

    const index = taxIncentive.secondaryBeneficiaries.findIndex(
      (b: any) => b._id.toString() === beneficiaryId
    );

    if (index === -1) {
      res.status(404).json({ message: "Beneficiario secundario no encontrado" });
      return;
    }

    taxIncentive.secondaryBeneficiaries.splice(index, 1);
    await taxIncentive.save();

    res.json(taxIncentive);
  } catch (error) {
    console.error("Error al eliminar beneficiario secundario", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

