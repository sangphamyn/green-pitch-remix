import { PrismaClient } from "@prisma/client";
import { CreateUser } from "~/enum/user.enum";
const db = new PrismaClient();

export const createUser = async (user: CreateUser) => {
  try {
    return await db.user.create({ data: user });
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    throw error;
  }
};
