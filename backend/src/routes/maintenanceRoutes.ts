import { Router } from "express";
import * as maintenanceController from "../controllers/maintenanceController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { entryMaintenanceSchema, updateFrequencySchema } from "../schemas/maintenanceSchemas";

const router = Router();

router.get("/maintenance", maintenanceController.getAllMaintenances);
router.get("/maintenance/:id", maintenanceController.getMaintenance);
router.get("/maintenance/project/:projectId", maintenanceController.getByProjectMaintenances);
router.get("/maintenance/project/code/:code", maintenanceController.getByProjectCodeMaintenances);
router.post("/maintenance", maintenanceController.createMaintenance);
router.post("/maintenance/project/:projectId", maintenanceController.addMaintenanceEntry);
router.patch("/maintenance/project/:projectId/:maintenanceId", maintenanceController.updateMaintenance);
router.patch("/maintenance/frequency/:projectId", maintenanceController.updateMaintenanceFrequency);
router.delete("/maintenance/project/:projectId/:maintenanceId", maintenanceController.deleteMaintenance);

export default router;
