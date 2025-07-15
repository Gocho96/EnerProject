import { Request, Response, RequestHandler } from "express";
import { Documental } from "../models/documentalModel";
import { HydratedDocument } from "mongoose";
import { DocumentalType } from "../types/documentalTypes";
import { Project } from "../models/projectModel";

export const getAllDocumentals: RequestHandler = async (req, res) => {
  try {
    const documentals = await Documental.find();
    res.json(documentals);
  } catch (error) {
    console.error("Error al obtener información documental", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalFound = await Documental.findById(req.params.id);
    if (!documentalFound) {
      res.status(404).json({ message: "Información documental no encontrada" });
      return;
    }
    res.json(documentalFound);
  } catch (error) {
    console.error("Error al obtener información documental:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getByProjectDocumentals: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;
    const documentals = await Documental.find({ projectId });
    res.json(documentals);
  } catch (error) {
    console.error(
      "Error al obtener información documental del proyecto",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getDocumentalByProjectCode: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;

    const project = await Project.findOne({ code });
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }

    const documental = await Documental.findOne({ projectId: project._id });
    if (!documental) {
      res
        .status(404)
        .json({ message: "Información documental no encontrada." });
      return;
    }

    res.json(documental);
  } catch (error) {
    console.error("Error al buscar información documental por código:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const createDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalFound = await Documental.findOne({
      projectId: req.body.projectId,
    });
    if (documentalFound) {
      res.status(409).json({ message: "La información documental ya existe" });
      return;
    }
    const documental = new Documental(req.body);
    const savedDocumental = await documental.save();
    res.status(201).json(savedDocumental);
  } catch (error) {
    console.error("Error al crear información documental:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const addContractToDocumental = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const newContract = req.body;

    const documental = (await Documental.findById(
      id
    )) as HydratedDocument<DocumentalType>;

    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    documental.contracts.push(newContract);

    const saved = await documental.save();

    res
      .status(201)
      .json({ message: "Contrato agregado correctamente.", documental: saved });
  } catch (error) {
    console.error("Error al agregar contrato:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const addPolicyToContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documentalId, contractId } = req.params;
    const newPolicy = req.body;

    const documental = await Documental.findById(documentalId);
    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    if (!Array.isArray(documental.contracts)) {
      res.status(500).json({
        message: "El campo 'contracts' no está definido correctamente.",
      });
      return;
    }

    const contract = documental.contracts.id(contractId);
    if (!contract) {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    contract.policies.push(newPolicy);

    await documental.save();

    res
      .status(201)
      .json({ message: "Póliza agregada correctamente.", documental });
  } catch (error) {
    console.error("Error al agregar póliza:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalUpdate = await Documental.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!documentalUpdate) {
      res.status(404).json({ message: "Información documental no encontrada" });
      return;
    }
    res.json(documentalUpdate);
  } catch (error) {
    console.error("Error al actualizar información documental:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documentalId, contractId } = req.params;
    const updatedContractData = req.body;

    const documental = await Documental.findById(documentalId);
    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    const contract = documental.contracts.id(contractId);
    if (!contract) {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    Object.assign(contract, updatedContractData);

    await documental.save();
    res
      .status(200)
      .json({ message: "Contrato actualizado correctamente.", documental });
  } catch (error) {
    console.error("Error al actualizar contrato:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updatePolicy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documentalId, contractId, policyId } = req.params;
    const updatedPolicyData = req.body;

    const documental = await Documental.findById(documentalId);
    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    const contract = documental.contracts.id(contractId);
    if (!contract) {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    const policy = contract.policies.id(policyId);
    if (!policy) {
      res.status(404).json({ message: "Póliza no encontrada." });
      return;
    }

    Object.assign(policy, updatedPolicyData);

    await documental.save();
    res
      .status(200)
      .json({ message: "Póliza actualizada correctamente.", documental });
  } catch (error) {
    console.error("Error al actualizar póliza:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteDocumental: RequestHandler = async (req, res) => {
  try {
    const documentalDelete = await Documental.findByIdAndDelete(req.params.id);
    if (!documentalDelete) {
      res.status(404).json({ message: "Información documental no encontrada" });
      return;
    }
    res.status(200).json({ message: "Información documental eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContractFromDocumental = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documentalId, contractId } = req.params;

    const documental = await Documental.findById(documentalId);
    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    const contract = documental.contracts.id(contractId);
    if (!contract) {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    contract.deleteOne();
    await documental.save();

    res.status(200).json({ message: "Contrato eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar contrato:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deletePolicyFromContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documentalId, contractId, policyId } = req.params;

    const documental = await Documental.findById(documentalId);
    if (!documental) {
      res.status(404).json({ message: "Documental no encontrado." });
      return;
    }

    const contract = documental.contracts.id(contractId);
    if (!contract) {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    const policy = contract.policies.id(policyId);
    if (!policy) {
      res.status(404).json({ message: "Póliza no encontrada." });
      return;
    }

    policy.deleteOne();
    await documental.save();

    res.status(200).json({ message: "Póliza eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar póliza:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
