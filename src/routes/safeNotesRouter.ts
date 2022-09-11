import { Router } from "express";
import {
  createSafeNote,
  deleteSafeNotesById,
  getAllSafeNotes,
  getSafeNotesById,
} from "../controllers/safeNotesController";
import authenticateToken from "../middlewares/authenticateToken";
import { validateSchemaMiddleware } from "../middlewares/validateSchema";
import { safeNoteSchema } from "../schemas/safeNoteSchema";

const safeNotesRouter = Router();

safeNotesRouter.post(
  "/safe-notes",
  authenticateToken,
  validateSchemaMiddleware(safeNoteSchema),
  createSafeNote
);

safeNotesRouter.get("/safe-notes", authenticateToken, getAllSafeNotes);

safeNotesRouter.get("/safe-notes/:id", authenticateToken, getSafeNotesById);

safeNotesRouter.delete(
  "/safe-notes/:id",
  authenticateToken,
  deleteSafeNotesById
);

export default safeNotesRouter;
