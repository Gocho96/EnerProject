import { Router } from "express";
import * as marketingController from "../controllers/marketingController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createMarketingSchema, publicationSchema, updateSurveySchema } from "../schemas/marketingSchemas";

const router = Router();

router.get("/marketing", marketingController.getAllMarketings);
router.get("/marketing/:id", marketingController.getMarketing);
router.get("/marketing/project/:projectId", marketingController.getByProjectMarketing);
router.post("/marketing", validateSchema(createMarketingSchema), marketingController.createMarketing);
router.post("/marketing/project/:projectId", validateSchema(publicationSchema), marketingController.addPublicationEntry);
router.put("/marketing/:id", marketingController.updateMarketing);
router.put("/marketing/project/:projectId/:publicationId", marketingController.updatePublicationEntry);
router.put("/marketing/survey/:projectId", validateSchema(updateSurveySchema),marketingController.updateSurveyInfo);
router.delete("/marketing/:id", marketingController.deleteMarketing);
router.delete("/marketing/project/:projectId/:publicationId", marketingController.deletePublicationEntry);

export default router;
