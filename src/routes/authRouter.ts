import { Router } from "express";
import { logIn, signUp } from "../controllers/authController";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { authUserSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(authUserSchema), signUp);
authRouter.post("/log-in", validateSchemaMiddleware(authUserSchema), logIn);

export default authRouter;
