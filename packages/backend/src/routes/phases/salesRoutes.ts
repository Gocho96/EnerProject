import { Router } from "express";
import * as salesController from "../../controllers/phases/salesController";
import { validateSchema } from "../../middlewares/schemaMiddleware";
import { materialSchema } from "../../schemas/phases/shoppingSchemas";

const router = Router();

router.post("/project/:projectId/sales", salesController.addSale);

router.get("/sales", salesController.getAllSales);
router.get("/project/:projectId/sales", salesController.getSale);
router.get("/project/:projectId/sales/:saleId", salesController.getOneSale);

router.patch("/project/:projectId/sales/:saleId", salesController.updateSale);

router.delete("/project/:projectId/sales/", salesController.deleteSalesPhase);
router.delete("/project/:projectId/sales/:saleId", salesController.deleteOneSale);

export default router;

