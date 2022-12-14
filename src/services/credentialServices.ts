import { CreateCredential } from "../types/credentialTypes";
import { findByEmail } from "../repositories/authRepository";
import {
  deleteById,
  findById,
  findByTitleAndUserId,
  findMany,
} from "../repositories/credentialsRepository";
import { Users } from "@prisma/client";
import { create } from "../repositories/credentialsRepository";
import Cryptr from "cryptr";
const privateKey = process.env.SECRET_KEY as string;
const cryptr = new Cryptr(privateKey);

export async function createCredential(
  userEmail: string,
  credential: CreateCredential
) {
  const user = (await findByEmail(userEmail)) as Users;

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

  const encryptedPassword = cryptr.encrypt(credential.password);

  await verifyRepeatedCredentialTitleFromUserId(
    credential.title,
    user.id as Users["id"]
  );

  const credentialCreation: CreateCredential = {
    title: credential.title,
    url: credential.url,
    username: credential.username,
    password: encryptedPassword,
    userId: user.id,
  };

  await create(credentialCreation);
}
export async function getAllCredentialsService(email: string) {
  const user = (await findByEmail(email)) as Users;
  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const credentials = await findMany(user.id);

  const credentialsWithPassword = credentials.map((credential) => {
    credential.password = cryptr.decrypt(credential.password);

    return credential;
  });

  const getCredential = {
    user: user.email,
    userId: user.id,
    credentials: credentialsWithPassword,
  };

  return getCredential;
}
export async function getCredentialsById(email: string, credentialId: number) {
  const user = (await findByEmail(email)) as Users;
  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const credential = await verifyCredentialExist(credentialId);

  isCredentialFromUserId(user.id, credential.userId);

  credential.password = cryptr.decrypt(credential.password);

  return credential;
}

export async function deleteCredentialById(
  email: string,
  credentialId: number
) {
  const user = (await findByEmail(email)) as Users;
  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };
  const credential = await verifyCredentialExist(credentialId);

  isCredentialFromUserId(user.id, credential.userId);

  await deleteById(credential.id);
}

export async function verifyCredentialExist(credentialId: number) {
  const credential = await findById(credentialId);

  if (!credential) throw { type: "NotFound", message: "Credential not exist!" };

  return credential;
}
export async function verifyRepeatedCredentialTitleFromUserId(
  title: string,
  userId: number
) {
  const existRepeatedTitle = await findByTitleAndUserId(title, userId);

  if (existRepeatedTitle)
    throw { type: "Conflict", message: "Title already created!" };
}
export default function isCredentialFromUserId(
  userId: number,
  credentialUserId: number
) {
  if (userId !== credentialUserId) {
    throw { type: "Unauthorized", message: "Not your credentials!" };
  }
}
