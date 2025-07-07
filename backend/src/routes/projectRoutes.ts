import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createProjectSchema } from "../schemas/projectSchemas";

const router = Router();

router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProject);
router.post("/projects", validateSchema(createProjectSchema), projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.patch("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

router.get("/projects/:id/fases", projectController.getProjectPhases);

export default router;
