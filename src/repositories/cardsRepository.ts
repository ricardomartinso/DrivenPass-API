import { prisma } from "../config/database";
import { CreateCards } from "../types/cardTypes";

export async function create(data: CreateCards) {
  await prisma.cards.create({
    data,
  });
}

export async function findById(cardId: number) {
  const result = await prisma.cards.findUnique({
    where: { id: cardId },
  });

  return result;
}
export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await prisma.cards.findUnique({
    where: { userId_title: { userId, title } },
  });

  return result;
}

export async function findMany(userId: number) {
  const result = await prisma.cards.findMany({ where: { userId } });

  return result;
}

export async function deleteById(cardId: number) {
  await prisma.cards.delete({ where: { id: cardId } });
}
