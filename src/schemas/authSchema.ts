import Joi from "joi";

export const authUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(10),
});
