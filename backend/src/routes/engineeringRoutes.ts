import { Router } from "express";
import * as EngineeringController from "../controllers/engineeringController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import {engineeringSchema} from "../schemas/engineeringSchemas";

const router = Router();

router.get("/engineering", EngineeringController.getAllEngineerings);
router.get("/engineering/:id", EngineeringController.getEngineering);
router.get("/engineering/project/:projectId", EngineeringController.getByProjectEngineering);
router.post("/engineering", validateSchema(engineeringSchema), EngineeringController.createEngineering);
router.put("/engineering/:id", validateSchema(engineeringSchema), EngineeringController.updateEngineering);
router.delete("/engineering/:id", EngineeringController.deleteEngineering);

export default router;
