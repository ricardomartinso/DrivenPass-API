import { findByEmail } from "../repositories/authRepository";

import { CreateWifi } from "../types/wifiTypes";
import { Users } from "@prisma/client";
import {
  create,
  deleteById,
  findById,
  findByTitleAndUserId,
  findMany,
} from "../repositories/wifisRepositort";
import Cryptr from "cryptr";
const privateKey = process.env.SECRET_KEY as string;
const cryptr = new Cryptr(privateKey);

export async function createWifi(userEmail: string, wifi: CreateWifi) {
  const user = (await findByEmail(userEmail)) as Users;

  await verifyRepeatedWifiTitleFromUserId(wifi.title, user.id as Users["id"]);

  const encryptedPassword = cryptr.encrypt(wifi.password);

  const wifiCreation: CreateWifi = {
    title: wifi.title,
    networkName: wifi.networkName,
    password: encryptedPassword,
    userId: user.id,
  };

  await create(wifiCreation);
}

export async function getAllWifis(email: string) {
  const user = (await findByEmail(email)) as Users;

  const wifis = await findMany(user.id);

  const wifisWithoutEncryption = wifis.map((wifi) => {
    wifi.password = cryptr.decrypt(wifi.password);
    return wifi;
  });

  const getWifis = {
    user: user.email,
    userId: user.id,
    wifis: wifisWithoutEncryption,
  };

  return getWifis;
}
export async function getWifiById(email: string, WifiId: number) {
  const user = (await findByEmail(email)) as Users;

  const wifi = await verifyWifiExist(WifiId);

  wifi.password = cryptr.decrypt(wifi.password);

  isWifiFromUserId(user.id, wifi.userId);

  return wifi;
}

export async function deleteWifiById(email: string, WifiId: number) {
  const user = (await findByEmail(email)) as Users;

  const wifi = await verifyWifiExist(WifiId);

  isWifiFromUserId(user.id, wifi.userId);

  await deleteById(wifi.id);
}

export async function verifyWifiExist(WifiId: number) {
  const Wifi = await findById(WifiId);

  if (!Wifi) throw { type: "NotFound", message: "Wi-fi not exist!" };

  return Wifi;
}

export default function isWifiFromUserId(userId: number, WifiUserId: number) {
  if (userId !== WifiUserId) {
    throw { type: "Unauthorized", message: "Not your wi-fi!" };
  }
}
async function verifyRepeatedWifiTitleFromUserId(
  title: string,
  userId: number
) {
  const existRepeatedTitle = await findByTitleAndUserId(title, userId);

  if (existRepeatedTitle)
    throw { type: "Conflict", message: "Title already created!" };
}
