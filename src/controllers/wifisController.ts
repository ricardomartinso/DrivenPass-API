import { Request, Response } from "express";
import { CreateWifi } from "../types/wifiTypes";
import {
  createWifi as createWifiService,
  getAllWifis as getAllWifisService,
  getWifiById,
  deleteWifiById,
} from "../services/wifiServices";

export async function createWifi(req: Request, res: Response) {
  const user = res.locals.user;
  const wifi: CreateWifi = req.body;

  await createWifiService(user.email as string, wifi);

  res.sendStatus(201);
}

export async function getAllWifis(req: Request, res: Response) {
  const user = res.locals.user;

  const wifis = await getAllWifisService(user.email);

  res.status(200).send(wifis);
}

export async function getWifisById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  const wifi = await getWifiById(user.email, Number(id));

  res.status(200).send(wifi);
}

export async function deleteWifisById(req: Request, res: Response) {
  const user = res.locals.user;
  const { id } = req.params;

  await deleteWifiById(user.email, Number(id));

  res.status(200).send("OK");
}
