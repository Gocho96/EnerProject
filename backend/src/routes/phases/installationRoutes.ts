import { Router } from "express";
import * as installationController from "../../controllers/phases/installationController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { dailyLogSchema } from "../../schemas/phases/installationSchemas";

const router = Router();

router.post("/project/:projectId/installation/dailyLog", installationController.addDailyLog);

router.get("/installations", installationController.getAllInstallations);
router.get("/project/:projectId/installation", installationController.getInstallation);
router.get("/project/:projectId/installation/dailyLog/:dailyLogId", installationController.getDailyLog);

router.patch("/project/:projectId/installation/dailyLog/:dailyLogId", installationController.updateDailyLog);

router.delete("/project/:projectId/installation/", installationController.deleteInstallationPhase);
router.delete("/project/:projectId/installation/dailyLog/:dailyLogId", installationController.deleteDailyLog);

export default router;
