import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createProjectSchema } from "../schemas/projectSchemas";

const router = Router();

router.post("/project",validateSchema(createProjectSchema), projectController.createProject);

router.get("/project", projectController.getAllProjects);
router.get("/project/:id", projectController.getProject);

router.patch("/project/:id", projectController.updateProject);

router.delete("/project/:id", projectController.deleteProject);

export default router;
