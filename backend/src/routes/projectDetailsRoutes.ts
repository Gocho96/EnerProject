import { Router } from "express";
import * as projectDetailsController from "../controllers/projectDetailsController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createProjectDetailsSchema, contactPersonSchema, solarPanelSchema, inverterSchema, batterySchema } from "../schemas/projectDetailsSchemas";

const router = Router();

router.get("/project-details", projectDetailsController.getAllProjectDetails);
router.get("/project-details/:id", projectDetailsController.getProjectDetails);
router.get("/project-details/project/:projectId", projectDetailsController.getByProjectDetails);
router.post("/project-details", validateSchema(createProjectDetailsSchema), projectDetailsController.createProjectDetails);
router.post("/project-details/project/:projectId/contact-person", validateSchema(contactPersonSchema), projectDetailsController.addContactPerson);
router.post("/project-details/project/:projectId/solar-panels", validateSchema(solarPanelSchema), projectDetailsController.addSolarPanel);
router.post("/project-details/project/:projectId/inverters", validateSchema(inverterSchema), projectDetailsController.addInverter);
router.post("/project-details/project/:projectId/batteries", validateSchema(batterySchema), projectDetailsController.addBattery);
router.put("/project-details/project/:projectId", projectDetailsController.updateProjectDetails);
router.put("/project-details/project/:projectId/contact-person/:contactId", validateSchema(contactPersonSchema), projectDetailsController.updateContactPerson);
router.put("/project-details/project/:projectId/solar-panels/:panelId", validateSchema(solarPanelSchema), projectDetailsController.updateSolarPanel);
router.put("/project-details/project/:projectId/inverters/:inverterId", validateSchema(inverterSchema), projectDetailsController.updateInverter);
router.put("/project-details/project/:projectId/batteries/:batteryId", validateSchema(batterySchema), projectDetailsController.updateBattery);
router.delete("/project-details/project/:projectId", projectDetailsController.deleteProjectDetails);
router.delete("/project-details/project/:projectId/contact-person/:contactId", projectDetailsController.deleteContactPerson);
router.delete("/project-details/project/:projectId/solar-panels/:panelId", projectDetailsController.deleteSolarPanel);
router.delete("/project-details/project/:projectId/inverters/:inverterId", projectDetailsController.deleteInverter);
router.delete("/project-details/project/:projectId/batteries/:batteryId", projectDetailsController.deleteBattery);

export default router;
