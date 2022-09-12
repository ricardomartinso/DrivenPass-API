import Joi from "joi";
import { Wifis } from "@prisma/client";

export const wifiSchema = Joi.object({
  title: Joi.string().required(),
  networkName: Joi.string().required(),
  password: Joi.string().required(),
});
