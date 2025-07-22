import { Router } from "express";
import * as documentalController from "../controllers/documentalController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { contractSchema, policySchema} from "../schemas/documentalSchemas";

const router = Router();

router.get("/documental", documentalController.getAllDocumentals);
router.get("/documental/project/:projectId", documentalController.getByProjectDocumentals);
router.get("/documental/code/:code", documentalController.getDocumentalByProjectCode);
router.post("/documental", documentalController.createDocumental);
router.post("/documental/:id/contracts", validateSchema(contractSchema), documentalController.addContractToDocumental);
router.post("/documental/:documentalId/contract/:contractId/policy",validateSchema(policySchema), documentalController.addPolicyToContract);
router.patch("/documental/:id", documentalController.updateDocumental);
router.put("/documental/:documentalId/contract/:contractId", validateSchema(contractSchema), documentalController.updateContract);
router.put("/documental/:documentalId/contract/:contractId/policy/:policyId", validateSchema(policySchema), documentalController.updatePolicy);
router.delete("/documental/:id", documentalController.deleteDocumental);
router.delete("/documental/:documentalId/contract/:contractId", documentalController.deleteContractFromDocumental);
router.delete("/documental/:documentalId/contract/:contractId/policy/:policyId", documentalController.deletePolicyFromContract);

export default router;
