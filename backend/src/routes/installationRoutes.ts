import { Router } from "express";
import * as installationController from "../controllers/installationController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createInstallationSchema } from "../schemas/installationSchemas";

const router = Router();

router.get("/installation", installationController.getAllInstallations);
router.get("/installation/:id", installationController.getInstallation);
router.get("/installation/project/:projectId", installationController.getByProjectInstallation);
router.post("/installation", validateSchema(createInstallationSchema), installationController.createInstallation);
router.put("/installation/:id", installationController.updateInstallation);
router.delete("/installation/:id", installationController.deleteInstallation);

export default router;
