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

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

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

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

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

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

  const wifi = await verifyWifiExist(WifiId);

  wifi.password = cryptr.decrypt(wifi.password);

  isWifiFromUserId(user.id, wifi.userId);

  return wifi;
}

export async function deleteWifiById(email: string, WifiId: number) {
  const user = (await findByEmail(email)) as Users;

  if (!user) throw { type: "NotFound", message: "User doesn't exist!" };

  const wifi = await verifyWifiExist(WifiId);

  isWifiFromUserId(user.id, wifi.userId);

  await deleteById(wifi.id);
}

export async function verifyWifiExist(WifiId: number) {
  const wifi = await findById(WifiId);

  if (!wifi) throw { type: "NotFound", message: "Wi-fi not exist!" };

  return wifi;
}

export default function isWifiFromUserId(userId: number, wifiUserId: number) {
  if (userId !== wifiUserId) {
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
