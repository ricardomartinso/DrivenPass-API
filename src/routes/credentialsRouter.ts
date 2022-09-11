import { Router } from "express";
import {
  createCredential,
  deleteCredentialsById,
  getAllCredentials,
  getCredentialsById,
} from "../controllers/credentialsController";
import authenticateToken from "../middlewares/authenticateToken";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { credentialSchema } from "../schemas/credentialSchema";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials",
  authenticateToken,
  validateSchemaMiddleware(credentialSchema),
  createCredential
);

credentialsRouter.get("/credentials", authenticateToken, getAllCredentials);

credentialsRouter.get(
  "/credentials/:id",
  authenticateToken,
  getCredentialsById
);

credentialsRouter.delete(
  "/credentials/:id",
  authenticateToken,
  deleteCredentialsById
);

export default credentialsRouter;
