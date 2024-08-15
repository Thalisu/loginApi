import { getSecret } from "../lib/config";
import jwt from "jsonwebtoken";
import {
  TUserLoginBody,
  TNewUser,
  TUpdateUser,
} from "../lib/interfaces/user.interfaces";
import prisma from "../database/prisma";
import bcrypt from "bcrypt";
import AppError from "../errors/appError";
import { injectable } from "tsyringe";
import {
  LoginSchema,
  SignUpSchema,
  UpdatePasswordSchema,
  UpdateUserSchema,
} from "../schema/user.schema";

@injectable()
export class UserServices {
  async login(body: TUserLoginBody) {
    const secret = getSecret();
    const requestUser = LoginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: { email: requestUser.email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const compare = await bcrypt.compare(requestUser.password, user?.password);

    if (!compare) {
      throw new AppError("Incorrect password", 401);
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });

    return { accessToken: token, user: { name: user.name } };
  }

  async register(body: TNewUser) {
    const { confirmPassword, ...parsedBody } = SignUpSchema.parse(body);

    const hashPassword = await bcrypt.hash(parsedBody.password, 10);

    const newUser = {
      ...parsedBody,
      password: hashPassword,
    };

    const { name, email, id } = await prisma.user.create({ data: newUser });

    return { name, email, id };
  }
  async getUser() {
    const users = await prisma.user.findMany();
    return users;
  }

  async updateUser(id: string, body: TUpdateUser) {
    const toUpdate = UpdateUserSchema.parse(body);

    if (!toUpdate.name && !toUpdate.email) {
      throw new AppError("Nothing to patch", 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: toUpdate,
    });
    return { name: updatedUser.name, email: updatedUser.email };
  }

  async updatePassword(id: string, body: TUpdateUser) {
    const data = UpdatePasswordSchema.parse(body);

    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const compare = await bcrypt.compare(data.oldPassword, user.password);

    if (!compare) {
      throw new AppError("old password is incorrect", 401);
    }

    const isTheSame = await bcrypt.compare(data.newPassword, user.password);

    if (isTheSame) {
      throw new AppError("new password is the same of previous password", 400);
    }

    const hashPassword = await bcrypt.hash(data.newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashPassword },
    });

    return {
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    };
  }

  async deleteOne(id: string) {
    await prisma.user.delete({ where: { id } });
    return true;
  }
}
