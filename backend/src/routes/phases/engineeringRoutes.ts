import { Router } from "express";
import * as engineeringController from "../../controllers/phases/engineeringController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import {engineeringSchema} from "../../schemas/phases/engineeringSchemas";

const router = Router();

router.get("/engineerings", engineeringController.getAllEngineerings);
router.get("/project/:projectId/engineering", engineeringController.getEngineering);

router.patch("/project/:projectId/engineering", engineeringController.updateEngineering);

router.delete("/project/:projectId/engineering", engineeringController.deleteEngineeringPhase);

export default router;
