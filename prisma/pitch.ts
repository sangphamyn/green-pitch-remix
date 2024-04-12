import { PrismaClient } from "@prisma/client";
import { GetAllServices } from "~/enum/pitch.enum";
import { CreateGroupPitch } from "~/enum/pitch.enum";
const db = new PrismaClient();

export const getAllService = async () => {
  try {
    return await db.service.findMany();
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const createPitch = async (grouppitch: CreateGroupPitch) => {
  try {
    return await db.groupPitch.create({ data: grouppitch });
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
