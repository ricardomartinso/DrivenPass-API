import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);

export default router;
