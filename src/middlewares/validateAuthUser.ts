import { Request, Response, NextFunction } from "express";
import { authUserSchema } from "../schemas/authSchema";

export async function validateAuthUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.body;

  const validation = authUserSchema.validate(auth, { abortEarly: false });

  if (validation.error) {
    return res.status(422).send(
      validation.error.details.map((error) => {
        return error.message;
      })
    );
  }
  next();
}
