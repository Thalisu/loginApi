import {
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library.js";
import { knownPrismaErrors } from "../lib/contants";

type TPrismaError =
  | PrismaClientRustPanicError
  | PrismaClientValidationError
  | PrismaClientKnownRequestError
  | PrismaClientInitializationError
  | PrismaClientUnknownRequestError
  | Error;

export class PrismaError {
  static statusCode: number;
  static isKnownError = (error: TPrismaError) => {
    let knownError = false;
    if ("code" in error) {
      const foundError = knownPrismaErrors.find(
        (e) => e.errorCode === error.code
      );
      if (foundError) {
        knownError = true;
        PrismaError.statusCode = foundError.statusCode;
      }
    }
    return knownError;
  };
}
