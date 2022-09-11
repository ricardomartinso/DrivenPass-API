import { Request, Response } from "express";
import {
  createSafeNote as createsafeNoteService,
  deleteSafeNoteById,
  getAllSafeNotesService,
  getSafeNoteById,
} from "../services/safeNoteServices";

import { CreateSafeNotes } from "../types/safeNoteTypes";

export async function createSafeNote(req: Request, res: Response) {
  const user = res.locals.user;
  const safeNote: CreateSafeNotes = req.body;

  await createsafeNoteService(user.email as string, safeNote);

  res.sendStatus(201);
}

export async function getAllSafeNotes(req: Request, res: Response) {
  const user = res.locals.user;

  const safeNotes = await getAllSafeNotesService(user.email);

  res.status(200).send(safeNotes);
}

export async function getSafeNotesById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  const safeNote = await getSafeNoteById(user.email, Number(id));

  res.status(200).send(safeNote);
}

export async function deleteSafeNotesById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  await deleteSafeNoteById(user.email, Number(id));

  res.status(200).send("OK");
}
