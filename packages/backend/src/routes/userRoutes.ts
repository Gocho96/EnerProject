import { Router } from "express";
import * as userController from "../controllers/userController";
import { authRequired } from "../middlewares/jwtAuthMiddleware";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { registerSchema, loginSchema } from "../schemas/userSchemas";

const router = Router();

//router.post("/register", validateSchema(registerSchema), userController.register);
router.post("/login", validateSchema(loginSchema), userController.login);
router.post("/logout", userController.logout);

router.get("/profile", authRequired, userController.profile);

router.get("/verify", userController.verifyToken);

export default router;
