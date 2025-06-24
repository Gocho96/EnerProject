import { Router } from "express";
import * as billingController from "../controllers/billingController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import {createBillingSchema} from "../schemas/billingSchemas";

const router = Router();

router.get("/billing", billingController.getAllBillings);
router.get("/billing/:id", billingController.getBilling);
router.get("/billing/project/:projectId", billingController.getByProjectBillings);
router.post("/billing", validateSchema(createBillingSchema), billingController.createBilling);
router.put("/billing/:id", billingController.updateBilling);
router.delete("/billing/:id", billingController.deleteBilling);

export default router;
