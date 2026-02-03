import { Router } from "express";
import * as documentController from "../../controllers/phases/documentController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { contractSchema, policySchema} from "../../schemas/phases/documentSchemas";

const router = Router();

router.post("/project/:projectId/document",documentController.addContract);
router.post("/project/:projectId/document/contract/:contractId/policy", documentController.addPolicy);

router.get("/documents", documentController.getAllDocuments);
router.get("/documents/contracts", documentController.getAllContracts);
router.get("/documents/contracts/policies", documentController.getAllPolicies);
router.get("/project/:projectId/document", documentController.getDocument);
router.get("/project/:projectId/document/contract/:contractId", documentController.getContract);
router.get("/project/:projectId/document/contract/:contractId/policy/:policyId", documentController.getPolicy);

router.patch("/project/:projectId/document", documentController.updateDocument);
router.patch("/project/:projectId/document/contract/:contractId", documentController.updateContract);
router.patch("/project/:projectId/document/contract/:contractId/policy/:policyId", documentController.updatePolicy);

router.delete("/project/:projectId/document", documentController.deleteDocumentPhase);
router.delete("/project/:projectId/document/contract/:contractId", documentController.deleteContract);
router.delete("/project/:projectId/document/contract/:contractId/policy/:policyId", documentController.deletePolicy);

export default router;
