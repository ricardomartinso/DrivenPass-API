import { Request, Response } from "express";
import { createUser, userLogin } from "../services/authServices";
import { AuthUser } from "../types/authTypes";

export async function signUp(req: Request, res: Response) {
  const data: AuthUser = req.body;

  await createUser(data);

  res.sendStatus(201);
}

export async function logIn(req: Request, res: Response) {
  const data: AuthUser = req.body;

  const token = await userLogin(data);

  res.status(200).send(token);
}
