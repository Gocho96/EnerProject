import { Router } from "express";
import * as phaseController from "../controllers/phaseController";

const router = Router();

router.get("/phases/code/:code", phaseController.getPhasesByProjectCode);
router.patch("/phases/code/:code", phaseController.updatePhasesByProjectCode);

export default router;
