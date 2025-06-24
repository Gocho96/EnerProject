import { Router } from "express";
import * as phaseController from "../controllers/phaseController";

const router = Router();

router.get("/fases/:phaseId", phaseController.getPhase);
router.put("/fases/:phaseId", phaseController.updatePhase);

export default router;
