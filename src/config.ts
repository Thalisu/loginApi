import "dotenv/config";
import { AppError } from "./errors/appError";
export const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET environment variable is not set", 500);
  }
  return secret;
};
