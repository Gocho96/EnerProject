import { Router } from "express";
import * as NetworkOperatorController from "../controllers/NetworkOperatorController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createNetworkOperatorSchema } from "../schemas/networkOperatorSchemas";

const router = Router();

router.get("/network-operator", NetworkOperatorController.getAllNetworkOperators);
router.get("/network-operator/:id", NetworkOperatorController.getNetworkOperator);
router.get("/network-operator/project/:projectId", NetworkOperatorController.getByProjectNetworkOperator);
router.post("/network-operator", validateSchema(createNetworkOperatorSchema), NetworkOperatorController.createNetworkOperator);
router.put("/network-operator/:id", NetworkOperatorController.updateNetworkOperator);
router.delete("/network-operator/:id", NetworkOperatorController.deleteNetworkOperator);

export default router;
