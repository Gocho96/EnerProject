import { Router } from "express";
import * as documentalController from "../controllers/documentalController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createDocumentalSchema} from "../schemas/documentalSchemas";

const router = Router();

router.get("/documental", documentalController.getAllDocumentals);
router.get("/documental/:id", documentalController.getDocumental);
router.get("/documental/project/:projectId", documentalController.getByProjectDocumentals);
router.post("/documental", validateSchema(createDocumentalSchema), documentalController.createDocumental);
router.put("/documental/:id", documentalController.updateDocumental);
router.delete("/documental/:id", documentalController.deleteDocumental);

export default router;
