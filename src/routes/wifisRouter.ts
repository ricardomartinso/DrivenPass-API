import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { wifiSchema } from "../schemas/wifiSchema";
import authenticateToken from "../middlewares/authenticateToken";

const wifisRouter = Router();

wifisRouter.post(
  "/wi-fis",
  validateSchemaMiddleware(wifiSchema),
  authenticateToken
);

wifisRouter.get("/wi-fis", authenticateToken);
wifisRouter.get("/wi-fis/:id", authenticateToken);
wifisRouter.delete("/wi-fis/:id", authenticateToken);

export default wifisRouter;
