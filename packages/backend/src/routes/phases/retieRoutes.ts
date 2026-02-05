import { Router } from "express";
import * as retieController from "../../controllers/phases/retieController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { createRetieSchema } from "../../schemas/phases/retieSchemas";

const router = Router();

router.get("/reties", retieController.getAllReties);
router.get("/project/:projectId/retie", retieController.getRetie);

router.patch("/project/:projectId/retie", retieController.updateRetie);

router.delete("/project/:projectId/retie", retieController.deleteRetiePhase);

export default router;
