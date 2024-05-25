import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

function randomPhoneNumber() {
  const prefixes = ["03", "05", "07", "08", "09"]; // Các mã mạng điện thoại di động ở Việt Nam
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, "0"); // Số điện thoại có 9 chữ số

  return `${randomPrefix}${randomNumber}`;
}

async function main() {
  const deleteBooking = await db.booking.deleteMany({});
  const deleteGroupPitch_Service = await db.grouppitch_service.deleteMany({});
  const c = await db.service.deleteMany({});
  const d = await db.timeSlot.deleteMany({});
  const a = await db.pitch.deleteMany({});
  const b = await db.pitchtype.deleteMany({});
  const deleteGroupPitch = await db.groupPitch.deleteMany({});
  const e = await db.user.deleteMany({});
  await db.$executeRaw`ALTER TABLE booking AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE grouppitch_service AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE services AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE timeSlot AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE pitch AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE pitchtype AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE grouppitch AUTO_INCREMENT = 1`;
  await db.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
  const serviceList = await db.service.createMany({
    data: [
      {
        name: "Wifi",
      },
      {
        name: "Nước đá",
      },
      {
        name: "Áo pitch",
      },
      {
        name: "Chỗ để ô tô",
      },
      {
        name: "Căng tin",
      },
      {
        name: "Thuê giày",
      },
      {
        name: "Bóng tập",
      },
    ],
  });
  const userList = await db.user.createMany({
    data: [
      {
        name: "Phạm Văn Sang",
        email: "sang@gmail.com",
        phone: randomPhoneNumber(),
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        password: "111111",
      },
      {
        name: "Trần Văn Sơn",
        email: "son@gmail.com",
        phone: randomPhoneNumber(),
        avatar:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        password: "111111",
        role: 2,
      },
      {
        name: "Dương Hà Tôn",
        email: "ton@gmail.com",
        phone: randomPhoneNumber(),
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        password: "111111",
      },
      {
        name: "Ngô Quốc Tiến",
        email: "tien@gmail.com",
        phone: randomPhoneNumber(),
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        password: "111111",
      },
      {
        name: "Vi Đức Nghĩa",
        email: "nghia@gmail.com",
        phone: randomPhoneNumber(),
        avatar:
          "https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        password: "111111",
      },
    ],
  });
  const groupPitchList = await db.groupPitch.createMany({
    data: [
      {
        name: "Sân bóng trường CNTT",
        id_district: 164,
        id_ward: 5491,
        address_detail: "Ngõ 180 Z155, trong khuôn viên trường",
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.5654604582539!2d105.80680564465527!3d21.587250366167396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135273f7cef6ec3%3A0xe22acc53451f683d!2zVHJ1bmcgdMOibSBk4buLY2ggduG7pSBiw7NuZyDEkcOhIMSQSCBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5n!5e0!3m2!1svi!2s!4v1714707431256!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        description: `Sân nhân tạo chất lượng cao với cỏ nhân tạo nhập khẩu từ các nhà sản xuất hàng đầu thế giới.
        Hệ thống ánh sáng LED tiên tiến, cho phép sử dụng vào cả ban ngày và ban đêm.
        Khu vực khán giả rộng rãi và thoải mái.
        Phòng thay đồ và vệ sinh sạch sẽ, có dịch vụ hỗ trợ như nước uống, thức ăn nhẹ và các vật dụng thể thao.`,
        ownerId: 1,
        status: 2,
        images:
          "https://res.cloudinary.com/db0shgxfi/image/upload/v1714706546/remixImages/j1mvw1ptvmfvg1xyq17z.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706549/remixImages/mmv7sboht5anshlww0jv.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706552/remixImages/mkv7kuhidzeebtybpkn3.jpg",
      },
      {
        name: "Sân giao thông vận tải",
        id_district: 164,
        id_ward: 5440,
        address_detail: "Ngõ 107 đường Phú Thái",
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.257845754099!2d105.81907567607932!3d21.575856080213963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313527167700fc71%3A0x7b7220f4a6276d3f!2zU8OibiBCw7NuZyBHaWFvIHRow7RuZyB24bqtbiB04bqjaSBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1714706875425!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        description: `The Arena chào đón tất cả các đối tượng khách hàng từ các cá nhân yêu thích thể thao, các đội bóng nhỏ, đến các doanh nghiệp tổ chức sự kiện, các trường học và các tổ chức thể thao cộng đồng.`,
        ownerId: 1,
        status: 2,
        images:
          "https://res.cloudinary.com/db0shgxfi/image/upload/v1714706554/remixImages/hai0jmy8kjygzbyyuomi.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706557/remixImages/yirrqpwa1wmh5yy8cdpz.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706559/remixImages/owqspgnqj6wgcatxdkd3.jpg",
      },
      {
        name: "Sân X10",
        id_district: 164,
        id_ward: 5461,
        address_detail: "Ngõ 107 đường Phú Thái",
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.257845754099!2d105.81907567607932!3d21.575856080213963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313527167700fc71%3A0x7b7220f4a6276d3f!2zU8OibiBCw7NuZyBHaWFvIHRow7RuZyB24bqtbiB04bqjaSBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1714706875425!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        description: `The Arena chào đón tất cả các đối tượng khách hàng từ các cá nhân yêu thích thể thao, các đội bóng nhỏ, đến các doanh nghiệp tổ chức sự kiện, các trường học và các tổ chức thể thao cộng đồng.`,
        ownerId: 3,
        status: 2,
        images:
          "https://res.cloudinary.com/db0shgxfi/image/upload/v1714706557/remixImages/yirrqpwa1wmh5yy8cdpz.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706554/remixImages/hai0jmy8kjygzbyyuomi.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706559/remixImages/owqspgnqj6wgcatxdkd3.jpg",
      },
      {
        name: "Sân thanh niên",
        id_district: 164,
        id_ward: 5461,
        address_detail: "Ngõ 107 đường Phú Thái",
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.257845754099!2d105.81907567607932!3d21.575856080213963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313527167700fc71%3A0x7b7220f4a6276d3f!2zU8OibiBCw7NuZyBHaWFvIHRow7RuZyB24bqtbiB04bqjaSBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1714706875425!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        description: `The Arena chào đón tất cả các đối tượng khách hàng từ các cá nhân yêu thích thể thao, các đội bóng nhỏ, đến các doanh nghiệp tổ chức sự kiện, các trường học và các tổ chức thể thao cộng đồng.`,
        ownerId: 3,
        status: 2,
        images:
          "https://res.cloudinary.com/db0shgxfi/image/upload/v1714706559/remixImages/owqspgnqj6wgcatxdkd3.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706554/remixImages/hai0jmy8kjygzbyyuomi.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706557/remixImages/yirrqpwa1wmh5yy8cdpz.jpg",
      },
      {
        name: "Sân kinh tế",
        id_district: 171,
        id_ward: 5761,
        address_detail: "Ngõ 107 đường Phú Thái",
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.257845754099!2d105.81907567607932!3d21.575856080213963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313527167700fc71%3A0x7b7220f4a6276d3f!2zU8OibiBCw7NuZyBHaWFvIHRow7RuZyB24bqtbiB04bqjaSBUaMOhaSBOZ3V5w6pu!5e0!3m2!1svi!2s!4v1714706875425!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        description: `The Arena chào đón tất cả các đối tượng khách hàng từ các cá nhân yêu thích thể thao, các đội bóng nhỏ, đến các doanh nghiệp tổ chức sự kiện, các trường học và các tổ chức thể thao cộng đồng.`,
        ownerId: 3,
        status: 2,
        images:
          "https://res.cloudinary.com/db0shgxfi/image/upload/v1714706549/remixImages/mmv7sboht5anshlww0jv.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706554/remixImages/hai0jmy8kjygzbyyuomi.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706557/remixImages/yirrqpwa1wmh5yy8cdpz.jpg,https://res.cloudinary.com/db0shgxfi/image/upload/v1714706559/remixImages/owqspgnqj6wgcatxdkd3.jpg",
      },
    ],
  });
  const groupPitch_service = await db.grouppitch_service.createMany({
    data: [
      {
        groupPitchId: 1,
        serviceId: 1,
        price: 0,
      },
      {
        groupPitchId: 1,
        serviceId: 2,
        price: 0,
      },
      {
        groupPitchId: 1,
        serviceId: 3,
        price: 30000,
      },
      {
        groupPitchId: 1,
        serviceId: 4,
        price: 0,
      },
      {
        groupPitchId: 1,
        serviceId: 5,
      },
      {
        groupPitchId: 2,
        serviceId: 1,
        price: 0,
      },
      {
        groupPitchId: 2,
        serviceId: 2,
        price: 0,
      },
      {
        groupPitchId: 2,
        serviceId: 3,
        price: 40000,
      },
      {
        groupPitchId: 2,
        serviceId: 6,
      },
      {
        groupPitchId: 2,
        serviceId: 7,
      },
      {
        groupPitchId: 3,
        serviceId: 2,
        price: 0,
      },
      {
        groupPitchId: 3,
        serviceId: 3,
        price: 40000,
      },
      {
        groupPitchId: 4,
        serviceId: 1,
        price: 0,
      },
      {
        groupPitchId: 4,
        serviceId: 2,
        price: 0,
      },
      {
        groupPitchId: 4,
        serviceId: 3,
        price: 40000,
      },
      {
        groupPitchId: 4,
        serviceId: 7,
      },
      {
        groupPitchId: 5,
        serviceId: 1,
        price: 0,
      },
      {
        groupPitchId: 5,
        serviceId: 2,
        price: 0,
      },
      {
        groupPitchId: 5,
        serviceId: 3,
        price: 40000,
      },
      {
        groupPitchId: 5,
        serviceId: 7,
      },
    ],
  });
  const pitchType = await db.pitchtype.createMany({
    data: [
      {
        name: "Sân hoàng kim",
        type: "Sân 7",
        description: "Sân đẳng cấp",
        id_groupPitch: 1,
      },
      {
        name: "Sân tư bản",
        type: "Sân 5",
        description: "Sân phải hoạt động nhiều",
        id_groupPitch: 1,
      },
      {
        name: "Sân mới",
        type: "Sân 7",
        description: "Sân mới xây dựng",
        id_groupPitch: 2,
      },
      {
        name: "Sân cũ",
        type: "Sân 11",
        description: "Sân xây lâu rồi",
        id_groupPitch: 2,
      },
      {
        name: "Sân bình thường",
        type: "Sân 7",
        description: "Sân chẳng có gì đặc biệt",
        id_groupPitch: 2,
      },
      {
        name: "Sân X10",
        type: "Sân 5",
        description: "",
        id_groupPitch: 3,
      },
      {
        name: "Sân Thanh Niên",
        type: "Sân 7",
        description: "",
        id_groupPitch: 4,
      },
      {
        name: "Sân Kinh Tế",
        type: "Sân 11",
        description: "",
        id_groupPitch: 5,
      },
    ],
  });
  const timeSlot = await db.timeSlot.createMany({
    data: [
      {
        startTime: "05:00",
        endTime: "07:00",
        price: 450000,
        id_pitchType: 1,
      },
      {
        startTime: "07:00",
        endTime: "09:00",
        price: 450000,
        id_pitchType: 1,
      },
      {
        startTime: "09:00",
        endTime: "11:00",
        price: 450000,
        id_pitchType: 1,
      },
      {
        startTime: "14:00",
        endTime: "15:30",
        price: 450000,
        id_pitchType: 1,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 1,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 1,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 1,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 1,
      },
      {
        startTime: "21:30",
        endTime: "23:00",
        price: 470000,
        id_pitchType: 1,
      },
      {
        startTime: "05:00",
        endTime: "07:00",
        price: 460000,
        id_pitchType: 2,
      },
      {
        startTime: "07:00",
        endTime: "09:00",
        price: 460000,
        id_pitchType: 2,
      },
      {
        startTime: "09:00",
        endTime: "11:00",
        price: 450000,
        id_pitchType: 2,
      },
      {
        startTime: "14:00",
        endTime: "15:30",
        price: 450000,
        id_pitchType: 2,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 2,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 2,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 2,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 2,
      },
      {
        startTime: "21:30",
        endTime: "23:00",
        price: 470000,
        id_pitchType: 2,
      },
      {
        startTime: "05:00",
        endTime: "07:00",
        price: 450000,
        id_pitchType: 3,
      },
      {
        startTime: "07:00",
        endTime: "09:00",
        price: 450000,
        id_pitchType: 3,
      },
      {
        startTime: "09:00",
        endTime: "11:00",
        price: 450000,
        id_pitchType: 3,
      },
      {
        startTime: "14:00",
        endTime: "15:30",
        price: 450000,
        id_pitchType: 3,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 3,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 3,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 3,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 3,
      },
      {
        startTime: "21:30",
        endTime: "23:00",
        price: 470000,
        id_pitchType: 3,
      },
      {
        startTime: "05:00",
        endTime: "07:00",
        price: 450000,
        id_pitchType: 4,
      },
      {
        startTime: "07:00",
        endTime: "09:00",
        price: 450000,
        id_pitchType: 4,
      },
      {
        startTime: "09:00",
        endTime: "11:00",
        price: 450000,
        id_pitchType: 4,
      },
      {
        startTime: "14:00",
        endTime: "15:30",
        price: 450000,
        id_pitchType: 4,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 4,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 4,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 4,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 4,
      },
      {
        startTime: "21:30",
        endTime: "23:00",
        price: 470000,
        id_pitchType: 4,
      },
      {
        startTime: "05:00",
        endTime: "07:00",
        price: 450000,
        id_pitchType: 5,
      },
      {
        startTime: "07:00",
        endTime: "09:00",
        price: 450000,
        id_pitchType: 5,
      },
      {
        startTime: "09:00",
        endTime: "11:00",
        price: 450000,
        id_pitchType: 5,
      },
      {
        startTime: "14:00",
        endTime: "15:30",
        price: 450000,
        id_pitchType: 5,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 5,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 5,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 5,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 5,
      },
      {
        startTime: "21:30",
        endTime: "23:00",
        price: 470000,
        id_pitchType: 5,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 6,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 6,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 6,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 6,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 7,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 7,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 7,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 7,
      },
      {
        startTime: "15:30",
        endTime: "17:00",
        price: 450000,
        id_pitchType: 8,
      },
      {
        startTime: "17:00",
        endTime: "18:30",
        price: 500000,
        id_pitchType: 8,
      },
      {
        startTime: "18:30",
        endTime: "20:00",
        price: 500000,
        id_pitchType: 8,
      },
      {
        startTime: "20:00",
        endTime: "21:30",
        price: 470000,
        id_pitchType: 8,
      },
    ],
  });
  const pitch = await db.pitch.createMany({
    data: [
      {
        id_pitchType: 1,
        name: "Sân hoàng kim 1",
      },
      {
        id_pitchType: 1,
        name: "Sân hoàng kim 2",
      },
      {
        id_pitchType: 2,
        name: "Sân tư bản 1",
      },
      {
        id_pitchType: 2,
        name: "Sân tư bản 2",
      },
      {
        id_pitchType: 3,
        name: "Sân mới 1",
      },
      {
        id_pitchType: 3,
        name: "Sân mới 2",
      },
      {
        id_pitchType: 4,
        name: "Sân cũ 1",
      },
      {
        id_pitchType: 5,
        name: "Sân bình thường 1",
      },
      {
        id_pitchType: 5,
        name: "Sân bình thường 2",
      },
      {
        id_pitchType: 6,
        name: "1",
      },
      {
        id_pitchType: 7,
        name: "1",
      },
      {
        id_pitchType: 8,
        name: "1",
      },
    ],
  });
  const now = new Date();
  now.setHours(now.getHours() + 7);
  let date = new Date();
  date.setHours(7);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  let date1 = new Date();
  date1.setHours(date1.getHours() + 7);
  date1.setMinutes(date1.getMinutes() - 15);

  async function randomDate(start, end) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    date.setHours(7, 0, 0, 0); // Đặt giờ phút giây về 0
    return date;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function fetchData() {
    const timeSlots = await db.timeSlot.findMany();
    const pitches = await db.pitch.findMany();

    return { timeSlots, pitches };
  }

  async function generateRandomObjects(num) {
    const objects = [];
    const startDate = new Date("2024-05-01");
    const endDate = new Date("2024-06-30");
    const now = new Date();
    const { timeSlots, pitches } = await fetchData();

    const usedCombinations = new Set();

    for (let i = 0; i < num; i++) {
      let date, id_timeSlot, id_pitch;

      do {
        date = await randomDate(startDate, endDate);
        const timeSlot = timeSlots[randomInt(0, timeSlots.length - 1)];
        const availablePitches = pitches.filter(
          (pitch) => pitch.id_pitchType === timeSlot.id_pitchType
        );
        const pitch =
          availablePitches[randomInt(0, availablePitches.length - 1)];

        id_timeSlot = timeSlot.id;
        id_pitch = pitch.id;
      } while (
        usedCombinations.has(`${date.toISOString()}_${id_timeSlot}_${id_pitch}`)
      );

      usedCombinations.add(`${date.toISOString()}_${id_timeSlot}_${id_pitch}`);

      const createdAtOffset = randomInt(1, 48) * 60 * 60 * 1000; // từ 1 giờ đến 2 ngày
      let createdAt = new Date(date.getTime() - createdAtOffset);

      if (createdAt > now) {
        // date = new Date(now.getTime() + createdAtOffset);
        createdAt.setTime(now.getTime() - randomInt(1, 48) * 60 * 60 * 1000);
      }

      const updatedAt = new Date(createdAt);
      if (i % 7 == 0) {
        objects.push({
          date: date,
          id_user: randomInt(1, 5),
          createdAt: createdAt,
          updatedAt: updatedAt,
          id_timeSlot: id_timeSlot,
          id_pitch: id_pitch,
          status: 2,
        });
      } else {
        objects.push({
          date: date,
          id_user: randomInt(1, 5),
          createdAt: createdAt,
          updatedAt: updatedAt,
          id_timeSlot: id_timeSlot,
          id_pitch: id_pitch,
        });
      }
    }

    return objects;
  }
  let data = [];
  await generateRandomObjects(1000)
    .then((objects) => {
      data.push(objects);
      db.$disconnect();
    })
    .catch((e) => {
      console.error(e);
      db.$disconnect();
    });
  const bookingList = await db.booking.createMany({
    data: data[0],
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
