import { prisma } from "../config/database";
import { CreateWifi } from "../types/wifiTypes";

export async function create(data: CreateWifi) {
  await prisma.wifis.create({
    data,
  });
}

export async function findById(wifiId: number) {
  const result = await prisma.wifis.findUnique({
    where: { id: wifiId },
  });

  return result;
}
export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await prisma.wifis.findUnique({
    where: { userId_title: { userId, title } },
  });

  return result;
}

export async function findMany(userId: number) {
  const result = await prisma.wifis.findMany({ where: { userId } });

  return result;
}

export async function deleteById(wifiId: number) {
  await prisma.wifis.delete({ where: { id: wifiId } });
}
