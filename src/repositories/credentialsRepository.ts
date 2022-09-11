import { prisma } from "../config/database";
import { CreateCredential } from "../types/credentialTypes";

export async function create(data: CreateCredential) {
  await prisma.credentials.create({
    data,
  });
}
export async function findById(credentialId: number) {
  const result = await prisma.credentials.findUnique({
    where: { id: credentialId },
  });

  return result;
}
export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await prisma.credentials.findUnique({
    where: { userId_title: { userId, title } },
  });

  return result;
}

export async function findMany(userId: number) {
  const result = await prisma.credentials.findMany({ where: { userId } });

  return result;
}

export async function deleteById(credentialId: number) {
  await prisma.credentials.delete({ where: { id: credentialId } });
}
