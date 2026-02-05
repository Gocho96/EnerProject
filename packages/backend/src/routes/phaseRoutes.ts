import { Router } from "express";
import * as phaseController from "../controllers/phaseController";

const router = Router();

router.get("/project/phase/:code", phaseController.getProjectPhases);

router.patch("/project/phase/:code", phaseController.updateProjectPhases);

export default router;
