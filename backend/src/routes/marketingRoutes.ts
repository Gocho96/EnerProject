import { Router } from "express";
import * as marketingController from "../controllers/marketingController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createMarketingSchema } from "../schemas/marketingSchemas";

const router = Router();

router.get("/marketing", marketingController.getAllMarketings);
router.get("/marketing/:id", marketingController.getMarketing);
router.get("/marketing/project/:projectId", marketingController.getByProjectMarketing);
router.post("/marketing", validateSchema(createMarketingSchema), marketingController.createMarketing);
router.put("/marketing/:id", marketingController.updateMarketing);
router.delete("/marketing/:id", marketingController.deleteMarketing);

export default router;
