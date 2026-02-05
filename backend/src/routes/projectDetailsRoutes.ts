import { Router } from "express";
import * as projectDetailsController from "../controllers/projectDetailsController";
// import { validateSchema } from "../../middlewares/schemaMiddleware";
// import { contractSchema, policySchema} from "../../schemas/phases/documentSchemas";

const router = Router();

router.post("/project/:projectId/project-details/contact",projectDetailsController.addContactPerson);
router.post("/project/:projectId/project-details/solar-panel",projectDetailsController.addSolarPanel);
router.post("/project/:projectId/project-details/inverter",projectDetailsController.addInverter);
router.post("/project/:projectId/project-details/battery",projectDetailsController.addBattery);

router.get("/projects-details", projectDetailsController.getAllProjectDetails);
router.get("/projects-details/contacts", projectDetailsController.getAllContactPersons);
router.get("/projects-details/solar-panels", projectDetailsController.getAllSolarPanels);
router.get("/projects-details/inverters", projectDetailsController.getAllInverters);
router.get("/projects-details/batteries", projectDetailsController.getAllBatteries);
router.get("/project/:projectId/project-details", projectDetailsController.getProjectDetails);
router.get("/project/:projectId/project-details/contact/:contactId", projectDetailsController.getContactPerson);
router.get("/project/:projectId/project-details/solar-panel/:solarPanelId", projectDetailsController.getSolarPanel);
router.get("/project/:projectId/project-details/inverter/:inverterId", projectDetailsController.getInverter);
router.get("/project/:projectId/project-details/battery/:batteryId", projectDetailsController.getBattery);

router.patch("/project/:projectId/project-details", projectDetailsController.updateProjectDetails);
router.patch("/project/:projectId/project-details/contact/:contactId", projectDetailsController.updateContactPerson);
router.patch("/project/:projectId/project-details/solar-panel/:solarPanelId", projectDetailsController.updateSolarPanel);
router.patch("/project/:projectId/project-details/inverter/:inverterId", projectDetailsController.updateInverter);
router.patch("/project/:projectId/project-details/battery/:batteryId", projectDetailsController.updateBattery);

router.delete("/project/:projectId/project-details", projectDetailsController.deleteProjectDetails);
router.delete("/project/:projectId/project-details/contact/:contactId", projectDetailsController.deleteContactPerson);
router.delete("/project/:projectId/project-details/solar-panel/:solarPanelId", projectDetailsController.deleteSolarPanel);
router.delete("/project/:projectId/project-details/inverter/:inverterId", projectDetailsController.deleteInverter);
router.delete("/project/:projectId/project-details/battery/:batteryId", projectDetailsController.deleteBattery);

export default router;
