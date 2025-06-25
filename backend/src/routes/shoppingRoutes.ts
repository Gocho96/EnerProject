import { Router } from "express";
import * as shoppingController from "../controllers/shoppingController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createShoppingSchema } from "../schemas/shoppingSchemas";

const router = Router();

router.get("/shopping", shoppingController.getAllShoppings);
router.get("/shopping/:id", shoppingController.getShopping);
router.get("/shopping/project/:projectId", shoppingController.getByProjectShoppings);
router.post("/shopping", validateSchema(createShoppingSchema), shoppingController.createShopping);
router.put("/shopping/:id", shoppingController.updateShopping);
router.delete("/shopping/:id", shoppingController.deleteShopping);

export default router;
