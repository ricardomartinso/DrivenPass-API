import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { wifiSchema } from "../schemas/wifiSchema";
import authenticateToken from "../middlewares/authenticateToken";
import {
  createWifi,
  deleteWifisById,
  getAllWifis,
  getWifisById,
} from "../controllers/wifisController";

const wifisRouter = Router();

wifisRouter.post(
  "/wi-fis",
  validateSchemaMiddleware(wifiSchema),
  authenticateToken,
  createWifi
);

wifisRouter.get("/wi-fis", authenticateToken, getAllWifis);
wifisRouter.get("/wi-fis/:id", authenticateToken, getWifisById);
wifisRouter.delete("/wi-fis/:id", authenticateToken, deleteWifisById);

export default wifisRouter;
