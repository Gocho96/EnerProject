import { Router } from "express";
import * as networkOperatorController from "../controllers/networkOperatorController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createNetworkOperatorSchema } from "../schemas/networkOperatorSchemas";

const router = Router();

router.get("/network-operator", networkOperatorController.getAllNetworkOperators);
router.get("/network-operator/:id", networkOperatorController.getNetworkOperator);
router.get("/network-operator/project/:projectId", networkOperatorController.getByProjectNetworkOperator);
router.post("/network-operator", validateSchema(createNetworkOperatorSchema), networkOperatorController.createNetworkOperator);
router.put("/network-operator/:id", networkOperatorController.updateNetworkOperator);
router.delete("/network-operator/:id", networkOperatorController.deleteNetworkOperator);

export default router;
