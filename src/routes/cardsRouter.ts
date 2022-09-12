import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { cardSchema } from "../schemas/cardSchema";
import authenticateToken from "../middlewares/authenticateToken";
import {
  createCard,
  deleteCardsById,
  getAllCards,
  getCardsById,
} from "../controllers/cardsController";

const cardsRouter = Router();

cardsRouter.post(
  "/cards",
  validateSchemaMiddleware(cardSchema),
  authenticateToken,
  createCard
);
cardsRouter.get("/cards", authenticateToken, getAllCards);
cardsRouter.get("/cards/:id", authenticateToken, getCardsById);
cardsRouter.delete("/cards/:id", authenticateToken, deleteCardsById);

export default cardsRouter;
