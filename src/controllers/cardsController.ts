import { Request, Response } from "express";
import { CreateCards } from "../types/cardTypes";
import {
  createCard as createCardService,
  deleteCardById,
  getCardById,
} from "../services/cardServices";
import { getAllCards as getAllCardsService } from "../services/cardServices";

export async function createCard(req: Request, res: Response) {
  const user = res.locals.user;
  const card: CreateCards = req.body;

  await createCardService(user.email as string, card);

  res.sendStatus(201);
}
export async function getAllCards(req: Request, res: Response) {
  const user = res.locals.user;

  const credentials = await getAllCardsService(user.email);

  res.status(200).send(credentials);
}

export async function getCardsById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  const credential = await getCardById(user.email, Number(id));

  res.status(200).send(credential);
}

export async function deleteCardsById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  await deleteCardById(user.email, Number(id));

  res.status(200).send("OK");
}
