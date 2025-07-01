import { Router } from "express";
import * as installationController from "../controllers/installationController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { dailyLogSchema } from "../schemas/installationSchemas";

const router = Router();

router.get("/installation", installationController.getAllInstallations);
router.get("/installation/:id", installationController.getInstallation);
router.get("/installation/project/:projectId", installationController.getByProjectInstallations);
router.post("/installation", validateSchema(dailyLogSchema), installationController.createInstallation);
router.post("/installation/dailylog/:projectId", installationController.createDailyLogByProject);
router.put("/installation/:id", installationController.updateInstallation);
router.put("/installation/:installationId/dailylog/:logId", installationController.updateDailyLogById);
router.delete("/installation/:id", installationController.deleteInstallation);
router.delete("/installation/:installationId/dailylog/:logId", installationController.deleteDailyLogById);

export default router;