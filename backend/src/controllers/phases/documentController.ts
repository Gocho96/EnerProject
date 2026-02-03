import { RequestHandler } from "express";
import * as DocumentService from "../../services/phases/documentServices";

// ----- CREATE -----
export const addContract: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const savedContract = await DocumentService.addContractService(projectId, req.body);

    res.status(201).json({ message: "Contrato agregado correctamente.", document: savedContract });

  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_ALREADY_EXISTS") {
      res.status(409).json({ message: "El contrato ya existe." });
      return;
    }

    console.error("Error al agregar contrato:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addPolicy: RequestHandler = async (req, res) => {
  try {
    const { projectId, contractId } = req.params;

    const savedPolicy = await DocumentService.addPolicyService(projectId, contractId, req.body);

    res.status(201).json({ message: "Póliza agregada correctamente.", document: savedPolicy });

  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

  if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(409).json({ message: "Contrato no encontrado." });
      return;
    }

    if (error.message === "POLICY_ALREADY_EXISTS") {
      res.status(409).json({ message: "La póliza ya existe." });
      return;
    }

    console.error("Error al agregar contrato:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ----- READ -----
export const getAllDocuments: RequestHandler = async (req, res) => {
  try {
    const documents = await DocumentService.getAllDocumentsService();
    res.status(200).json(documents);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de documentación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getAllContracts: RequestHandler = async (req, res) => {
  try {
    const contracts = await DocumentService.getAllContractsService();
    res.status(200).json(contracts);
  } catch (error) {
    console.error("Error al obtener todos los contratos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllPolicies: RequestHandler = async (req, res) => {
  try {
    const policies = await DocumentService.getAllPoliciesService();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Error al obtener todas las pólizas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getDocument: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const documentFound = await DocumentService.getDocumentService(projectId);

    res.status(200).json(documentFound);
    return;
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }
    console.error("Información de documentación no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getContract: RequestHandler = async (req, res) => {
  try {
    const { projectId, contractId } = req.params;

    const contractFound = await DocumentService.getContractService(projectId, contractId);

    res.status(200).json(contractFound);
    return;
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    console.error("Contrato no encontrado:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getPolicy: RequestHandler = async (req, res) => {
  try {
    const { projectId, contractId, policyId } = req.params;

    const policyFound = await DocumentService.getPolicyService(projectId, contractId, policyId);

    res.status(200).json(policyFound);
    return;
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    if (error.message === "POLICY_NOT_FOUND") {
      res.status(404).json({ message: "Póliza no encontrada." });
      return;
    }

    console.error("Póliza no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateDocument: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const documentUpdate = await DocumentService.updateDocumentService(projectId, req.body);

    res.status(200).json({ message: "Documentación actualizada correctamente.", document: documentUpdate });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }
    console.error("Error al actualizar la documentación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const updateContract: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const contactUpdate = await DocumentService.updateContractService(projectId, req.params.contractId, req.body);

    res.status(200).json({ message: "Contrato actualizado correctamente.", document: contactUpdate });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    } else {
      console.error("Error al actualizar contrato:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updatePolicy: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const PolicyUpdate = await DocumentService.updatePolicyService(projectId, req.params.contractId, req.params.policyId, req.body);

    res.status(200).json({ message: "Póliza actualizada correctamente.", document: PolicyUpdate });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    if (error.message === "POLICY_NOT_FOUND") {
      res.status(404).json({ message: "Póliza no encontrada." });
      return;

    } else {
      console.error("Error al actualizar contrato:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

// ----- DELETE -----
export const deleteDocumentPhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const deleteDocument = await DocumentService.deleteDocumentPhaseService(projectId);

    res.status(200).json({ message: "Fase de documentación eliminada correctamente.", document: deleteDocument });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }
    console.error("Error al eliminar documentación:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteContract: RequestHandler = async (req, res) => {
  try {
    const { projectId, contractId } = req.params;

    const contractDelete = await DocumentService.deleteContractService(projectId, contractId);

    res.status(200).json({ message: "Contrato eliminado correctamente.", document: contractDelete });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }
    console.error("Error al eliminar contrato:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deletePolicy: RequestHandler = async (req, res) => {
  try {
    const { projectId, contractId, policyId } = req.params;

    const deletePolicy = await DocumentService.deletePolicyService(projectId, contractId, policyId);

    res.status(200).json({ message: "Póliza eliminada correctamente.", document: deletePolicy });
  } catch (error: any) {
    if (error.message === "DOCUMENT_NOT_FOUND") {
      res.status(404).json({ message: "Documentación no encontrada." });
      return;
    }

    if (error.message === "CONTRACT_NOT_FOUND") {
      res.status(404).json({ message: "Contrato no encontrado." });
      return;
    }

    if (error.message === "POLICY_NOT_FOUND") {
      res.status(404).json({ message: "Póliza no encontrada." });
      return;
    }
    console.error("Error al eliminar póliza:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};  