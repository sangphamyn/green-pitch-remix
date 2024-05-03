import { PrismaClient } from "@prisma/client";
import { CreatePitchType, GetAllServices } from "~/enum/pitch.enum";
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
interface GroupPitch {
  id: number;
  name: string;
  id_district: number | null;
  id_ward: number | null;
  address_detail: string | null;
  map: string | null;
  description: string | null;
  ownerId: number | null;
  status: number | null;
  images: string | null;
  services?: any; // Định nghĩa thuộc tính services với kiểu là một mảng chuỗi (hoặc kiểu bạn muốn)
}
export const getGroupPitchByOwnerId = async (ownerId: string) => {
  try {
    const groupPitchs: GroupPitch[] = await db.groupPitch.findMany({
      where: {
        owner: { id: parseInt(ownerId) },
      },
      include: {
        pitchTypes: {
          include: {
            pitch: true,
          },
        },
      },
    });
    for (const groupPitch of groupPitchs) {
      const services = await db.grouppitch_service.findMany({
        where: {
          groupPitchId: groupPitch.id,
        },
        include: {
          service: true,
        },
      });
      groupPitch.services = services.map((groupPitch) => groupPitch.service);
    }
    return groupPitchs;
    return await db.groupPitch.findMany({
      where: {
        owner: { id: parseInt(ownerId) },
      },
      include: {
        services: true,
      },
    });
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getGroupPitchList = async () => {
  try {
    const groupPitchList = await db.groupPitch.findMany({
      where: {
        status: 2,
      },
      include: {
        pitchTypes: {
          include: {
            pitch: true,
          },
        },
      },
    });
    return groupPitchList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getGroupPitchById = async (id: string) => {
  try {
    const groupPitch = await db.groupPitch.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    const service = await db.grouppitch_service.findMany({
      where: {
        groupPitchId: parseInt(id),
      },
      include: {
        service: true,
      },
    });
    return { groupPitch, service };
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const createGroupPitch = async (
  grouppitch: CreateGroupPitch,
  serviceList: any,
  priceList: any
) => {
  try {
    const pitch = await db.groupPitch.create({ data: grouppitch });
    const pitchId = pitch.id;
    let index = 0;
    for (const serviceId of serviceList) {
      await db.grouppitch_service.create({
        data: {
          groupPitchId: pitchId,
          serviceId: parseInt(serviceId),
          price: priceList[index] != "" ? parseFloat(priceList[index]) : null,
        },
      });
      index++;
    }
    return pitch;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const createPitchType = async (
  pitchTypeData: CreatePitchType,
  quantity: number
) => {
  try {
    const name = pitchTypeData.name;
    const pitchType = await db.pitchtype.create({ data: pitchTypeData });
    for (let i = 1; i <= quantity; i++) {
      let pitch = await db.pitch.create({
        data: { id_pitchType: pitchType.id, name: name + " " + i },
      });
    }
    return pitchType;
  } catch (error) {
    console.error("Lỗi db:", error);
    throw error;
  }
};
export const createTimeSlot = async (
  id_pitchType: number,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  price: number
) => {
  try {
    const timeSlot = await db.timeSlot.create({
      data: {
        id_pitchType: id_pitchType,
        startTime: startHour + ":" + startMinute,
        endTime: endHour + ":" + endMinute,
        price: price,
      },
    });
    return timeSlot;
  } catch (error) {
    console.error("Lỗi db:", error);
    throw error;
  }
};
export const getPitchTypeListByGroupPitchId = async (id: string) => {
  try {
    const pitchTypeList = await db.pitchtype.findMany({
      where: {
        id_groupPitch: parseInt(id),
      },
      include: {
        timeSlot: {
          include: {
            booking: true,
          },
        },
        pitch: {
          include: {
            booking: {
              include: {
                booking_user: true,
              },
            },
          },
        },
      },
    });
    return pitchTypeList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getPitchListByPitchTypeId = async (id: string) => {
  try {
    const pitchList = await db.pitch.findMany({
      where: {
        id_pitchType: parseInt(id),
      },
    });
    return pitchList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getBookingListByDateTimeSlotId = async (
  date: string,
  id: string
) => {
  try {
    const bookingList = await db.booking.findMany({
      where: {
        date: date,
        id_timeSlot: parseInt(id),
      },
    });
    return bookingList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const bookingabc = async (
  date: string,
  id_timeSlot: string,
  id_user: string,
  id_pitch: string
) => {
  try {
    const booking = await db.booking.create({
      data: {
        date: date,
        id_timeSlot: parseInt(id_timeSlot),
        id_user: parseInt(id_user),
        id_pitch: parseInt(id_pitch),
      },
    });
    return booking;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
