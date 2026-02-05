import { Router } from "express";
import * as marketingController from "../../controllers/phases/marketingController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { createMarketingSchema } from "../../schemas/phases/marketingSchemas";

const router = Router();

router.post("/project/:projectId/marketing", marketingController.addPublication);

router.get("/marketings", marketingController.getAllMarketings);
router.get("/project/:projectId/marketing", marketingController.getMarketing);
router.get("/project/:projectId/marketing/publication/:publicationId", marketingController.getPublication);

router.patch("/project/:projectId/marketing", marketingController.updateMarketing);
router.patch("/project/:projectId/marketing/publication/:publicationId", marketingController.updatePublication);

router.delete("/project/:projectId/marketing/", marketingController.deleteMarketingPhase);
router.delete("/project/:projectId/marketing/publication/:publicationId", marketingController.deletePublication);

export default router;
