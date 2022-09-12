import Joi from "joi";

const numberPattern: any = /^[1-9]{16}$/;
const cvcPattern: any = /^[1-9]{3}$/;

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  number: Joi.string().regex(numberPattern).required(),
  cardHolderName: Joi.string().required(),
  cvc: Joi.string().regex(cvcPattern).required(),
  password: Joi.string().required(),
  expirationDate: Joi.date().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("debit", "credit", "both"),
});
