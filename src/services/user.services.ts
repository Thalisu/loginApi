import { getSecret } from "../lib/config";
import jwt from "jsonwebtoken";
import { TUserLoginBody, TNewUser } from "../lib/interfaces/user.interfaces";
import prisma from "../database/prisma";
import bcrypt from "bcrypt";
import AppError from "../errors/appError";
import { injectable } from "tsyringe";
import { LoginSchema, SignUpSchema } from "../schema/user.schema";

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

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });

    const compare = await bcrypt.compare(requestUser.password, user?.password);

    if (!compare) {
      throw new AppError("Incorrect password", 403);
    }

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

  async deleteOne(id: string) {
    await prisma.user.delete({ where: { id } });
    return true;
  }

  async getUser() {
    const users = await prisma.user.findMany();
    return users;
  }
}
