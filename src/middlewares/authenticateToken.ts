import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const user: any = jwt.verify(token, process.env.SECRET_KEY as string);
    res.locals.user = user;
  } catch {
    return res.sendStatus(401);
  }

  next();
}
