import Joi from "joi";

export const safeNoteSchema = Joi.object({
  title: Joi.string().required(),
  noteTitle: Joi.string().required().max(40),
  description: Joi.string().required().max(1000),
});
