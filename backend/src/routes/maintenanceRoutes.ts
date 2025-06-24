import { Router } from "express";
import * as maintenanceController from "../controllers/maintenanceController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import {createMaintenanceSchema} from "../schemas/maintenanceSchemas";

const router = Router();

router.get("/maintenance", maintenanceController.getAllMaintenances);
router.get("/maintenance/:id", maintenanceController.getMaintenance);
router.get("/maintenance/project/:projectId", maintenanceController.getByProjectMaintenances);
router.post("/maintenance", validateSchema(createMaintenanceSchema), maintenanceController.createMaintenance);
router.put("/maintenance/:id", maintenanceController.updateMaintenance);
router.delete("/maintenance/:id", maintenanceController.deleteMaintenance);

export default router;