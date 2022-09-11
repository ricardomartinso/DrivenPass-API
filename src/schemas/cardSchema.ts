import Joi from "joi";
import { Cards } from "@prisma/client";

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  number: Joi.string().required().min(16).max(16),
  cardHolderName: Joi.string().required(),
  cvc: Joi.number().min(3).max(3).required(),
  password: Joi.string().required(),
  expirationDate: Joi.date().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("debit", "credit", "both"),
});
