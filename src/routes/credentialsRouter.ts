import { Router } from "express";
import { createCredential } from "../controllers/credentialsController";
import authenticateToken from "../middlewares/authenticateToken";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", authenticateToken, createCredential);

export default credentialsRouter;
