import { RequestHandler } from "express";
import * as TaxIncentiveService from "../../services/phases/taxIncentiveServices";

// ----- CREATE -----
export const addApplicationIt: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const ApplicationItSaved = await TaxIncentiveService.addApplicationItService(projectId, req.body);

    res.status(201).json({ message: "Solicitud de Incentivos Tributarios agregado correctamente.", document: ApplicationItSaved });

  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_ALREADY_EXISTS") {
      res.status(409).json({ message: "La solicitud ya existe." });
      return;
    }

    console.error("Error al agregar solicitud de incentivo tributario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId } = req.params;

    const beneficiarySaved = await TaxIncentiveService.addBeneficiaryService(projectId, applicationItId, req.body);

    res.status(201).json({ message: "Beneficiario agregado correctamente.", document: beneficiarySaved });

  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

  if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(409).json({ message: "Solicitud no encontrada." });
      return;
    }

    console.error("Error al agregar beneficiario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const addPayment: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId } = req.params;

    const paymentSaved = await TaxIncentiveService.addPaymentService(projectId, applicationItId, req.body);

    res.status(201).json({ message: "Pago agregado correctamente.", document: paymentSaved });

  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

  if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(409).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "PAYMENT_ALREADY_EXISTS") {
      res.status(409).json({ message: "El pago ya existe." });
      return;
    }

    console.error("Error al agregar el pago:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// ----- READ -----
export const getAllTaxIncentives: RequestHandler = async (req, res) => {
  try {
    const taxIncentivesFound = await TaxIncentiveService.getAllTaxIncentivesService();
    res.status(200).json(taxIncentivesFound);
    return;
  } catch (error) {
    console.error("Error al obtener todas las fases de incentivos tributarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
    return;
  }
};

export const getAllApplicationsIt: RequestHandler = async (req, res) => {
  try {
    const applicationsFound = await TaxIncentiveService.getAllApplicationsItService();
    res.status(200).json(applicationsFound);
  } catch (error) {
    console.error("Error al obtener todos los incentivos tributarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getAllPayments: RequestHandler = async (req, res) => {
  try {
    const paymentsFound = await TaxIncentiveService.getAllPaymentsService();
    res.status(200).json(paymentsFound);
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTaxIncentive: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const taxIncentiveFound = await TaxIncentiveService.getTaxIncentiveService(projectId);

    res.status(200).json(taxIncentiveFound);
    return;
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }
    console.error("Información de incentivos tributarios no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getApplicationIt: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId } = req.params;

    const applicationFound = await TaxIncentiveService.getApplicationItService(projectId, applicationItId);

    res.status(200).json(applicationFound);
    return;
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    console.error("Solicitud no encontrada:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId, beneficiaryId } = req.params;

    const beneficiaryFound = await TaxIncentiveService.getBeneficiaryService(projectId, applicationItId, beneficiaryId);

    res.status(200).json(beneficiaryFound);
    return;
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "BENEFICIARY_NOT_FOUND") {
      res.status(404).json({ message: "Beneficiario no encontrado." });
      return;
    }

    console.error("Beneficiario no encontrado:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getPayment: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId, paymentId } = req.params;

    const paymentFound = await TaxIncentiveService.getPaymentService(projectId, applicationItId, paymentId);

    res.status(200).json(paymentFound);
    return;
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "PAYMENT_NOT_FOUND") {
      res.status(404).json({ message: "Pago no encontrado." });
      return;
    }

    console.error("Pago no encontrado:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----- UPDATE -----
export const updateApplicationIt: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const applicationItUpdated = await TaxIncentiveService.updateApplicationItService(projectId, req.params.applicationItId, req.body);

    res.status(200).json({ message: "Información de solicitud actualizada correctamente.", document: applicationItUpdated });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    } else {
      console.error("Error al actualizar la información de solicitud:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updateBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const beneficiaryUpdated = await TaxIncentiveService.updateBeneficiaryService(projectId, req.params.applicationItId, req.params.beneficiaryId, req.body);

    res.status(200).json({ message: "Información del beneficiario actualizada correctamente.", document: beneficiaryUpdated });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "BENEFICIARY_NOT_FOUND") {
      res.status(404).json({ message: "Beneficiario no encontrado." });
      return;

    } else {
      console.error("Error al actualizar la información del beneficiario:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

export const updatePayment: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const paymentUpdated = await TaxIncentiveService.updatePaymentService(projectId, req.params.applicationItId, req.params.paymentId, req.body);

    res.status(200).json({ message: "Información del pago actualizada correctamente.", document: paymentUpdated });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "PAYMENT_NOT_FOUND") {
      res.status(404).json({ message: "pago no encontrado." });
      return;

    } else {
      console.error("Error al actualizar la información del pago:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
};

// ----- DELETE -----
export const deleteTaxIncentivePhase: RequestHandler = async (req, res) => {
  try {
    const { projectId } = req.params;

    const taxIncentiveDelete = await TaxIncentiveService.deleteTaxIncentivePhaseService(projectId);

    res.status(200).json({ message: "Fase de incentivos tributarios eliminada correctamente.", document: taxIncentiveDelete });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }
    console.error("Error al eliminar la fase de incentivos tributarios:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteApplicationIt: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId } = req.params;

    const applicationDelete = await TaxIncentiveService.deleteApplicationItService(projectId, applicationItId);

    res.status(200).json({ message: "Solicitud eliminada correctamente.", document: applicationDelete });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }
    console.error("Error al eliminar la solicitud:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteBeneficiary: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId, beneficiaryId } = req.params;

    const beneficiaryDelete = await TaxIncentiveService.deleteBeneficiaryService(projectId, applicationItId, beneficiaryId);

    res.status(200).json({ message: "Beneficiario eliminado correctamente.", document: beneficiaryDelete });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "BENEFICIARY_NOT_FOUND") {
      res.status(404).json({ message: "Beneficiario no encontrado." });
      return;
    }
    console.error("Error al eliminar el beneficiario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deletePayment: RequestHandler = async (req, res) => {
  try {
    const { projectId, applicationItId, paymentId } = req.params;

    const paymentDelete = await TaxIncentiveService.deletePaymentService(projectId, applicationItId, paymentId);

    res.status(200).json({ message: "Pago eliminado correctamente.", document: paymentDelete });
  } catch (error: any) {
    if (error.message === "TAX_INCENTIVE_NOT_FOUND") {
      res.status(404).json({ message: "Fase de incentivos tributarios no encontrada." });
      return;
    }

    if (error.message === "APPLICATION_NOT_FOUND") {
      res.status(404).json({ message: "Solicitud no encontrada." });
      return;
    }

    if (error.message === "PAYMENT_NOT_FOUND") {
      res.status(404).json({ message: "Pago no encontrado." });
      return;
    }
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}; 
