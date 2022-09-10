import { Router } from "express";
import { logIn, signUp } from "../controllers/authController";
import { validateAuthUser } from "../middlewares/validateAuthUser";

const authRouter = Router();

authRouter.post("/sign-up", validateAuthUser, signUp);
authRouter.post("/log-in", validateAuthUser, logIn);

export default authRouter;
