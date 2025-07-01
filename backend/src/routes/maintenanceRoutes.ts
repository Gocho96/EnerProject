import { Router } from "express";
import * as maintenanceController from "../controllers/maintenanceController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createMaintenanceSchema, entryMaintenanceSchema, updateFrequencySchema } from "../schemas/maintenanceSchemas";

const router = Router();

router.get("/maintenance", maintenanceController.getAllMaintenances);
router.get("/maintenance/:id", maintenanceController.getMaintenance);
router.get("/maintenance/project/:projectId", maintenanceController.getByProjectMaintenances);
router.post("/maintenance", validateSchema(createMaintenanceSchema), maintenanceController.createMaintenance);
router.post("/maintenance/project/:projectId", validateSchema(entryMaintenanceSchema), maintenanceController.addMaintenanceEntry);
router.put("/maintenance/project/:projectId/:maintenanceId", validateSchema(entryMaintenanceSchema),maintenanceController.updateMaintenance);
router.put("/maintenance/frequency/:projectId", (validateSchema(updateFrequencySchema)),maintenanceController.updateMaintenanceFrequency);
router.delete("/maintenance/project/:projectId/:maintenanceId",maintenanceController.deleteMaintenance);


export default router;
