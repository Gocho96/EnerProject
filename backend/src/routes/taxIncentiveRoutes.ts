import { Router } from "express";
import * as taxIncentiveController from "../controllers/taxIncentiveController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createTaxIncentiveSchema } from "../schemas/taxIncentiveSchemas";

const router = Router();

router.get("/taxincentive", taxIncentiveController.getAllTaxIncentives);
router.get("/taxincentive/:id", taxIncentiveController.getTaxIncentive);
router.get("/taxincentive/project/:projectId", taxIncentiveController.getByProjectTaxIncentive);
router.post("/taxincentive", validateSchema(createTaxIncentiveSchema), taxIncentiveController.createTaxIncentive);
router.put("/taxincentive/:id", taxIncentiveController.updateTaxIncentive);
router.delete("/taxincentive/:id", taxIncentiveController.deleteTaxIncentive);

export default router;

