import { prisma } from "../config/database";
import { CreateSafeNotes } from "../types/safeNoteTypes";

export async function create(data: CreateSafeNotes) {
  await prisma.safeNotes.create({
    data,
  });
}

export async function findById(safeNoteId: number) {
  const result = await prisma.safeNotes.findUnique({
    where: { id: safeNoteId },
  });

  return result;
}
export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await prisma.safeNotes.findUnique({
    where: { userId_title: { userId, title } },
  });

  return result;
}

export async function findMany(userId: number) {
  const result = await prisma.safeNotes.findMany({ where: { userId } });

  return result;
}

export async function deleteById(safeNoteId: number) {
  await prisma.safeNotes.delete({ where: { id: safeNoteId } });
}
