import { Router } from "express";
import * as networkOperatorController from "../../controllers/phases/networkOperatorController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { entryMaintenanceSchema, updateFrequencySchema } from "../../schemas/phases/maintenanceSchemas";

const router = Router();

router.post("/project/:projectId/network-operator", networkOperatorController.addApplicationOr);

router.get("/network-operators", networkOperatorController.getAllNetworkOperators);
router.get("/project/:projectId/network-operator", networkOperatorController.getNetworkOperator);
router.get("/project/:projectId/network-operator/application/:applicationOrId", networkOperatorController.getApplicationOr);

router.patch("/project/:projectId/network-operator", networkOperatorController.updateNetworkOperator);
router.patch("/project/:projectId/network-operator/application/:applicationOrId", networkOperatorController.updateApplicationOr);

router.delete("/project/:projectId/network-operator", networkOperatorController.deleteNetworkOperatorPhase);
router.delete("/project/:projectId/network-operator/application/:applicationOrId", networkOperatorController.deleteApplicationOr);

export default router;
