import { Router } from "express";
import * as maintenanceController from "../../controllers/phases/maintenanceController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { entryMaintenanceSchema, updateFrequencySchema } from "../../schemas/phases/maintenanceSchemas";

const router = Router();

router.post("/project/:projectId/maintenance", maintenanceController.addMaintenanceRecord);

router.get("/maintenances", maintenanceController.getAllMaintenances);
router.get("/project/:projectId/maintenance", maintenanceController.getMaintenance);
router.get("/project/:projectId/maintenance/record/:maintenanceRecordId", maintenanceController.getMaintenanceRecord);

router.patch("/project/:projectId/maintenance", maintenanceController.updateMaintenance);
router.patch("/project/:projectId/maintenance/record/:maintenanceRecordId", maintenanceController.updateMaintenanceRecord);

router.delete("/project/:projectId/maintenance/", maintenanceController.deleteMaintenancePhase);
router.delete("/project/:projectId/maintenance/record/:maintenanceRecordId", maintenanceController.deleteMaintenanceRecord);

export default router;
