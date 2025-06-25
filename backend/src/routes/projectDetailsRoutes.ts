import { Router } from "express";
import * as projectDetailsController from "../controllers/projectDetailsController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createProjectDetailsSchema } from "../schemas/projectDetailsSchemas";

const router = Router();

router.get("/project-details", projectDetailsController.getAllProjectDetails);
router.get("/project-details/:id", projectDetailsController.getProjectDetails);
router.get("/project-details/project/:projectId", projectDetailsController.getByProjectDetails);
router.post("/project-details", validateSchema(createProjectDetailsSchema), projectDetailsController.createProjectDetails);
router.put("/project-details/:id", projectDetailsController.updateProjectDetails);
router.delete("/project-details/:id", projectDetailsController.deleteProjectDetails);

export default router;
