import { prisma } from "../config/database";
import { CreateCredential } from "../types/credentialTypes";

export async function create(data: CreateCredential) {
  await prisma.credentials.create({
    data,
  });
}
