import { Router } from "express";
import * as taxIncentiveController from "../controllers/taxIncentiveController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createTaxIncentiveSchema } from "../schemas/taxIncentiveSchemas";

const router = Router();

router.get("/taxincentive", taxIncentiveController.getAllTaxIncentives);
router.get("/taxincentive/:id", taxIncentiveController.getTaxIncentive);
router.get("/taxincentive/project/:projectId", taxIncentiveController.getByProjectTaxIncentive);
router.get("/taxincentive/project/code/:code", taxIncentiveController.getTaxIncentiveByProjectCode);
router.post("/taxincentive", validateSchema(createTaxIncentiveSchema), taxIncentiveController.createTaxIncentive);
router.post("/taxincentive/project/:projectId/secondary-beneficiaries", validateSchema(createTaxIncentiveSchema), taxIncentiveController.addSecondaryBeneficiary);
router.patch("/taxincentive/:id", taxIncentiveController.updateTaxIncentive);
router.patch("/taxincentive/project/:projectId/secondary-beneficiaries/:beneficiaryId", taxIncentiveController.updateSecondaryBeneficiary);
router.delete("/taxincentive/:id", taxIncentiveController.deleteTaxIncentive);
router.delete("/taxincentive/project/:projectId/secondary-beneficiaries/:beneficiaryId", taxIncentiveController.deleteSecondaryBeneficiary);

export default router;

