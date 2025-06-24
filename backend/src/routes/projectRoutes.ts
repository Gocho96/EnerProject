import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createProjectSchema } from "../schemas/projectSchemas";

const router = Router();

router.get("/proyectos", projectController.getAllProjects);
router.get("/proyectos/:id", projectController.getProject);
router.post("/proyectos", validateSchema(createProjectSchema), projectController.createProject);
router.delete("/proyectos/:id", projectController.deleteProject);
router.put("/proyectos/:id", projectController.updateProject);

router.get("/proyectos/:id/fases", projectController.getProjectPhases);

export default router;
