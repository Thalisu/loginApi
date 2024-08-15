import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { PrismaError } from "../errors/prismaError";

export class handleErrors {
  static execute(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: error.message });
    } else if (error instanceof ZodError) {
      return res.status(400).json({ message: error.issues });
    } else if (PrismaError.isKnownError(error)) {
      return res
        .status(PrismaError.statusCode)
        .json({ message: error.message });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
