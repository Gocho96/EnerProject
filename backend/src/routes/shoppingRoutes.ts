import { Router } from "express";
import * as shoppingController from "../controllers/shoppingController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { materialSchema } from "../schemas/shoppingSchemas";

const router = Router();

router.get("/shopping", shoppingController.getAllShoppings);
router.get("/shopping/:id", shoppingController.getShopping);
router.get("/shopping/project/code/:code", shoppingController.getShoppingByProjectCode);
router.post("/shopping", shoppingController.createShopping);
router.post("/shopping/project/:projectId/material", validateSchema(materialSchema), shoppingController.addMaterialToShopping);
router.put("/shopping/project/:projectId/material/:materialId", validateSchema(materialSchema), shoppingController.updateMaterial);
router.delete("/shopping/project/:projectId/material/:materialId", shoppingController.deleteMaterial);


export default router;
