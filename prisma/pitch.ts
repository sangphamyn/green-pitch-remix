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
export const getGroupPitchList1 = async (
  name: string | null,
  district: string | null,
  ward: string | null,
  pitchType: string | null
) => {
  try {
    const groupPitchList = await db.groupPitch.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        ...(district && { id_district: parseInt(district) }),
        ...(ward && { id_ward: parseInt(ward) }),
        ...(pitchType && {
          pitchTypes: {
            some: {
              type: pitchType,
            },
          },
        }),
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
      where:
        id && id != "&"
          ? {
              id: parseInt(id),
            }
          : {},
      include: {
        pitchTypes: {
          include: {
            pitch: true,
            timeSlot: true,
          },
        },
      },
    });
    const service = await db.grouppitch_service.findMany({
      where:
        id && id != "&"
          ? {
              groupPitchId: parseInt(id),
            }
          : {},
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
export const updateGroupPitch = async (
  id: string,
  grouppitch: CreateGroupPitch,
  serviceList: any,
  priceList: any
) => {
  try {
    await db.grouppitch_service.deleteMany({
      where: {
        groupPitchId: parseInt(id),
      },
    });
    const pitch = await db.groupPitch.update({
      where: {
        id: parseInt(id),
      },
      data: grouppitch,
    });
    let index = 0;
    for (const serviceId of serviceList) {
      await db.grouppitch_service.create({
        data: {
          groupPitchId: parseInt(id),
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
export const updatePitchType = async (
  id: string,
  pitchTypeData: CreatePitchType,
  quantity: string
) => {
  try {
    const name = pitchTypeData.name;
    const pitchType = await db.pitchtype.update({
      where: {
        id: parseInt(id),
      },
      data: pitchTypeData,
      include: {
        pitch: true,
      },
    });
    for (let i = pitchType.pitch.length + 1; i <= parseInt(quantity); i++) {
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
      where:
        id && id != "&"
          ? {
              id_groupPitch: parseInt(id),
            }
          : {},
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
        date: new Date(date),
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
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const booking = await db.booking.create({
      data: {
        date: new Date(date),
        id_timeSlot: parseInt(id_timeSlot),
        id_user: parseInt(id_user),
        id_pitch: parseInt(id_pitch),
        createdAt: now,
        updatedAt: now,
      },
    });
    return booking;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};

export const getBookingList = async (
  user: string | null,
  page: number,
  groupPitchId: string,
  orderBy: string
) => {
  try {
    const skip = page * 15;
    // page = 2;
    let where = {};
    if (groupPitchId) {
      where["booking_pitch"] = {
        pitch_pitchType: {
          id_groupPitch: parseInt(groupPitchId),
        },
      };
    }
    if (user) {
      where["id_user"] = parseInt(user);
    }
    let orderBy1 = [];
    if (orderBy) {
      let a = {};
      a[orderBy] = "desc";
      orderBy1.push({ updatedAt: "desc" });
      orderBy1.push(a);
    } else {
      orderBy1.push({
        date: "desc",
      });
      orderBy1.push({
        booking_timeSlot: {
          startTime: "desc",
        },
      });
    }
    const bookingList = await db.booking.findMany({
      where: where,
      orderBy: orderBy1,
      take: 15,
      skip: (Number(page) - 1) * 15,
      include: {
        booking_pitch: {
          include: {
            pitch_pitchType: {
              include: {
                groupPitch: true,
              },
            },
          },
        },
        booking_timeSlot: true,
        booking_user: true,
      },
    });
    return bookingList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getBookingList1 = async (page: number, groupPitchId: string) => {
  try {
    const skip = page * 15;
    // page = 2;
    let where = {};
    if (groupPitchId) {
      where["booking_pitch"] = {
        pitch_pitchType: {
          id_groupPitch: parseInt(groupPitchId),
        },
      };
    }

    const bookingList = await db.booking.findMany({
      where: where,
      orderBy: [
        {
          updatedAt: {
            // Sắp xếp theo updatedAt trước, nếu updatedAt không null
            sort: "desc",
            nulls: "last", // Đưa các giá trị null xuống cuối
          },
        },
        {
          createdAt: "desc", // Sau đó sắp xếp theo createdAt
        },
      ],
      take: 15,
      skip: (Number(page) - 1) * 15,
      include: {
        booking_pitch: {
          include: {
            pitch_pitchType: {
              include: {
                groupPitch: true,
              },
            },
          },
        },
        booking_timeSlot: true,
        booking_user: true,
      },
    });
    return bookingList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getAllBookingListByUser = async (user: string | null) => {
  try {
    const bookingList = await db.booking.findMany({
      where: {
        id_user: parseInt(user),
      },
      orderBy: [
        {
          date: "desc",
        },
        {
          booking_timeSlot: {
            startTime: "desc",
          },
        },
      ],
      include: {
        booking_pitch: {
          include: {
            pitch_pitchType: {
              include: {
                groupPitch: true,
              },
            },
          },
        },
        booking_timeSlot: true,
        booking_user: true,
      },
    });
    return bookingList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const cancelBooking = async (id: string) => {
  try {
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const booking = await db.booking.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: 2,
        updatedAt: now,
      },
    });
    return booking;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};

export const getUserList = async (roles?: number[]) => {
  try {
    const userList = await db.user.findMany({
      where: roles
        ? {
            role: {
              in: roles,
            },
          }
        : {},
    });
    return userList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getGroupPitchList = async (status?: number[]) => {
  try {
    const groupPitchList = await db.groupPitch.findMany({
      where: status
        ? {
            status: {
              in: status,
            },
          }
        : {},
    });
    return groupPitchList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
export const getPitchList = async (status?: number[]) => {
  try {
    const pitchList = await db.pitch.findMany({
      where: status
        ? {
            pitch_pitchType: {
              groupPitch: {
                status: {
                  in: status,
                },
              },
            },
          }
        : {},
    });
    return pitchList;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
