import { Router } from "express";
import authRouter from "./authRouter";
import cardsRouter from "./cardsRouter";
import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
import wifisRouter from "./wifisRouter";
const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(cardsRouter);
router.use(wifisRouter);

export default router;
