import { findByEmail } from "../repositories/authRepository";
import {
  create,
  deleteById,
  findById,
  findByTitleAndUserId,
  findMany,
} from "../repositories/cardsRepository";
import { CreateCards } from "../types/cardTypes";
import { Users } from "@prisma/client";
import Cryptr from "cryptr";
const privateKey = process.env.SECRET_KEY as string;
const cryptr = new Cryptr(privateKey);

export async function createCard(userEmail: string, card: CreateCards) {
  const user = (await findByEmail(userEmail)) as Users;

  const encryptedPassword = cryptr.encrypt(card.password);
  const encryptedCvc = cryptr.encrypt(card.cvc);

  await verifyRepeatedCardTitleFromUserId(card.title, user.id as Users["id"]);

  const cardCreation: CreateCards = {
    title: card.title,
    number: card.number,
    cardHolderName: card.cardHolderName,
    cvc: encryptedCvc,
    password: encryptedPassword,
    expirationDate: card.expirationDate,
    isVirtual: Boolean(card.isVirtual),
    type: card.type,
    userId: user.id,
  };

  await create(cardCreation);
}

export async function getAllCards(email: string) {
  const user = (await findByEmail(email)) as Users;

  const cards = await findMany(user.id);

  const cardsWithoutEncrypt = cards.map((cardInfo) => {
    cardInfo.cvc = cryptr.decrypt(cardInfo.cvc);
    cardInfo.password = cryptr.decrypt(cardInfo.password);

    return cardInfo;
  });

  const getcards = {
    user: user.email,
    userId: user.id,
    cards: cardsWithoutEncrypt,
  };

  return getcards;
}

export async function getCardById(email: string, cardId: number) {
  const user = (await findByEmail(email)) as Users;

  const card = await verifyCardExist(cardId);

  card.cvc = cryptr.decrypt(card.cvc);
  card.password = cryptr.decrypt(card.password);

  isCardFromUserId(user.id, card.userId);

  return card;
}

export async function deleteCardById(email: string, cardId: number) {
  const user = (await findByEmail(email)) as Users;

  const card = await verifyCardExist(cardId);

  isCardFromUserId(user.id, card.userId);

  await deleteById(card.id);
}

export async function verifyCardExist(cardId: number) {
  const card = await findById(cardId);

  if (!card) throw { type: "NotFound", message: "Card not exist!" };

  return card;
}

export default function isCardFromUserId(userId: number, cardUserId: number) {
  if (userId !== cardUserId) {
    throw { type: "Unauthorized", message: "Not your card!" };
  }
}
async function verifyRepeatedCardTitleFromUserId(
  title: string,
  userId: number
) {
  const existRepeatedTitle = await findByTitleAndUserId(title, userId);

  if (existRepeatedTitle)
    throw { type: "Conflict", message: "Title already created!" };
}
