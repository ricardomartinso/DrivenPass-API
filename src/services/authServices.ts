import { AuthUser } from "../types/authTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  create as createUserDb,
  findByEmail,
} from "../repositories/authRepository";
dotenv.config();

export async function createUser(createUser: AuthUser) {
  await verifyEmailCreation(createUser.email);

  const encryptedPassword = bcrypt.hashSync(createUser.password, 10);

  const userCreation = {
    email: createUser.email,
    password: encryptedPassword,
  };

  await createUserDb(userCreation);

  return;
}

async function verifyEmailCreation(email: string) {
  const existEmail = await findByEmail(email);

  if (existEmail) throw { type: "Conflict", message: "Email already exist" };
}

export async function userLogin(loginInfo: AuthUser) {
  const userInfo = await findByEmail(loginInfo.email);

  if (!userInfo)
    throw { type: "Unauthorized", message: "Invalid email or password" };

  verifyValidPassword(loginInfo.password, userInfo.password as string);

  return jwt.sign(loginInfo, process.env.SECRET_KEY as string);
}

function verifyValidPassword(userPassword: string, encryptedPassword: string) {
  if (!bcrypt.compareSync(userPassword, encryptedPassword)) {
    throw { type: "Unauthorized", message: "Invalid email or password" };
  }
}
