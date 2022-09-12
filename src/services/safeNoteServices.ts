import { findByEmail } from "../repositories/authRepository";
import {
  create,
  deleteById,
  findById,
  findByTitleAndUserId,
  findMany,
} from "../repositories/safeNotesRepository";
import { CreateSafeNotes } from "../types/safeNoteTypes";
import { Users } from "@prisma/client";

export async function createSafeNote(
  userEmail: string,
  safeNote: CreateSafeNotes
) {
  const user = (await findByEmail(userEmail)) as Users;

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

  await verifyRepeatedSafeNoteTitleFromUserId(
    safeNote.title,
    user.id as Users["id"]
  );

  const safeNoteCreation: CreateSafeNotes = {
    title: safeNote.title,
    noteTitle: safeNote.noteTitle,
    description: safeNote.description,
    userId: user.id,
  };

  await create(safeNoteCreation);
}

export async function getAllSafeNotesService(email: string) {
  const user = (await findByEmail(email)) as Users;

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const safeNotes = await findMany(user.id);

  const getSafeNotes = {
    user: user.email,
    userId: user.id,
    safeNotes,
  };

  return getSafeNotes;
}
export async function getSafeNoteById(email: string, safeNoteId: number) {
  const user = (await findByEmail(email)) as Users;
  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const safeNote = await verifySafeNoteExist(safeNoteId);

  isSafeNoteFromUserId(user.id, safeNote.userId);

  return safeNote;
}
export async function deleteSafeNoteById(email: string, safeNoteId: number) {
  const user = (await findByEmail(email)) as Users;
  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const safeNote = await verifySafeNoteExist(safeNoteId);

  isSafeNoteFromUserId(user.id, safeNote.userId);

  await deleteById(safeNote.id);
}

export async function verifySafeNoteExist(safeNoteId: number) {
  const safeNote = await findById(safeNoteId);

  if (!safeNote) throw { type: "NotFound", message: "Safe note not exist!" };

  return safeNote;
}

export default function isSafeNoteFromUserId(
  userId: number,
  safeNoteUserId: number
) {
  if (userId !== safeNoteUserId) {
    throw { type: "Unauthorized", message: "Not your safe note!" };
  }
}
async function verifyRepeatedSafeNoteTitleFromUserId(
  title: string,
  userId: number
) {
  const existRepeatedTitle = await findByTitleAndUserId(title, userId);

  if (existRepeatedTitle)
    throw { type: "Conflict", message: "Title already created!" };
}
