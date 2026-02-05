import { Router } from "express";
import * as taxIncentiveController from "../../controllers/phases/taxIncentiveController";
import { validateSchema } from "../../middlewares/schemaMiddleware";


const router = Router();

router.post("/project/:projectId/tax-incentive",taxIncentiveController.addApplicationIt);
router.post("/project/:projectId/tax-incentive/application/:applicationItId/beneficiary", taxIncentiveController.addBeneficiary);
router.post("/project/:projectId/tax-incentive/application/:applicationItId/payment", taxIncentiveController.addPayment);

router.get("/tax-incentives", taxIncentiveController.getAllTaxIncentives);
router.get("/tax-incentives/applications", taxIncentiveController.getAllApplicationsIt);
router.get("/tax-incentives/applications/payments", taxIncentiveController.getAllPayments);
router.get("/project/:projectId/tax-incentive", taxIncentiveController.getTaxIncentive);
router.get("/project/:projectId/tax-incentive/application/:applicationItId", taxIncentiveController.getApplicationIt);
router.get("/project/:projectId/tax-incentive/application/:applicationItId/beneficiary/:beneficiaryId", taxIncentiveController.getBeneficiary);
router.get("/project/:projectId/tax-incentive/application/:applicationItId/payment/:paymentId", taxIncentiveController.getPayment);

router.patch("/project/:projectId/tax-incentive/application/:applicationItId", taxIncentiveController.updateApplicationIt);
router.patch("/project/:projectId/tax-incentive/application/:applicationItId/beneficiary/:beneficiaryId", taxIncentiveController.updateBeneficiary);
router.patch("/project/:projectId/tax-incentive/application/:applicationItId/payment/:paymentId", taxIncentiveController.updatePayment);

router.delete("/project/:projectId/tax-incentive", taxIncentiveController.deleteTaxIncentivePhase);
router.delete("/project/:projectId/tax-incentive/application/:applicationItId", taxIncentiveController.deleteApplicationIt);
router.delete("/project/:projectId/tax-incentive/application/:applicationItId/beneficiary/:beneficiaryId", taxIncentiveController.deleteBeneficiary);
router.delete("/project/:projectId/tax-incentive/application/:applicationItId/payment/:paymentId", taxIncentiveController.deletePayment);

export default router;
