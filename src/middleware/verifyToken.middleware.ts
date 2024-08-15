import { getSecret } from "../lib/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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

    next();
  }
}
