import { PrismaClient } from "@prisma/client";
import { IUser } from "../interfaces/user.interface";

const prisma = new PrismaClient();

let id = 0;

export const generateId = () => {
  id++;
  return id;
};

export const userDatabase: IUser[] = [];

export default prisma;

