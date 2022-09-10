import { prisma } from "../config/database";
import { AuthUser } from "../types/authTypes";

export async function create(data: AuthUser) {
  await prisma.users.create({
    data,
  });
}
export async function findByEmail(email: string) {
  const userEmail = await prisma.users.findUnique({ where: { email } });

  return userEmail;
}
