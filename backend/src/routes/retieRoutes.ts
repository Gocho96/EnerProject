import { Router } from "express";
import * as retieController from "../controllers/retieController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createRetieSchema } from "../schemas/retieSchemas";

const router = Router();

router.get("/retie", retieController.getAllReties);
router.get("/retie/:id", retieController.getRetie);
router.get("/retie/project/:projectId", retieController.getByProjectRetie);
router.post("/retie", validateSchema(createRetieSchema), retieController.createRetie);
router.put("/retie/:id", retieController.updateRetie);
router.delete("/retie/:id", retieController.deleteRetie);

export default router;
