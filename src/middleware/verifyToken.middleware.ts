import { getSecret } from "../lib/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../lib/interfaces/user.interfaces";
import AppError from "../errors/appError";

export class verifyToken {
  static execute(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const secret = getSecret();

    if (!token) {
      throw new AppError("Token is required", 403);
    }

    jwt.verify(token, secret);

    res.locals.decode = jwt.decode(token);

    if (req.params.id) {
      const user: IUser = res.locals.decode as IUser;
      if (user.id !== req.params.id) {
        throw new AppError("Unauthorized access", 403);
      }
    }
    next();
  }
}
