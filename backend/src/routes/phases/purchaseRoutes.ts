import { Router } from "express";
import * as purchaseController from "../../controllers/phases/purchaseController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import {createBillingSchema} from "../../schemas/phases/purchaseSchemas";

const router = Router();

router.post("/project/:projectId/purchase", purchaseController.addPurchase);

router.get("/purchases", purchaseController.getAllPurchases);
router.get("/project/:projectId/purchase", purchaseController.getPurchase);
router.get("/project/:projectId/purchase/:purchaseId", purchaseController.getOnePurchase);

router.patch("/project/:projectId/purchase/:purchaseId", purchaseController.updatePurchase);

router.delete("/project/:projectId/purchase/", purchaseController.deletePurchasePhase);
router.delete("/project/:projectId/purchase/:purchaseId", purchaseController.deleteOnePurchase);

export default router;
