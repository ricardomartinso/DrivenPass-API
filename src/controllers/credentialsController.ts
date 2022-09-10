import { Request, Response } from "express";

export async function createCredential(req: Request, res: Response) {
  const user = res.locals.user;

  res.sendStatus(201);
}
export async function getCredential(req: Request, res: Response) {}

export async function deleteCredential(req: Request, res: Response) {}
