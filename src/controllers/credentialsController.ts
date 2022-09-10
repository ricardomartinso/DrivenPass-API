import { Request, Response } from "express";
import {
  createCredential as createCredentialService,
  getAllCredentialsService,
  getCredentialsById as getCredentialById,
} from "../services/credentialServices";
import { CreateCredential } from "../types/credentialTypes";

export async function createCredential(req: Request, res: Response) {
  const user = res.locals.user;
  const credential: CreateCredential = req.body;

  await createCredentialService(user.email as string, credential);

  res.sendStatus(201);
}

export async function getAllCredentials(req: Request, res: Response) {
  const user = res.locals.user;

  const credentials = await getAllCredentialsService(user.email);

  res.status(200).send(credentials);
}

export async function getCredentialsById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  const credential = await getCredentialById(user.email, Number(id));

  res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  res.status(200).send("credentials");
}
