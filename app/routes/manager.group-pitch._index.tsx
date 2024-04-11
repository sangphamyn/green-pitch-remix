import { Link, Outlet } from "@remix-run/react";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
const pitches = [
  {
    name: "Sân CNTT",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/images/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 1,
    quantity: 4,
  },
  {
    name: "Sân Thanh Niên",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/images/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 0,
    quantity: 6,
  },
  {
    name: "Sân Công Nghiệp",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/images/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 3,
    quantity: 2,
  },
  // Thêm các sân bóng khác vào đây...
];
function group_pitch() {
  return (
    <div>
      <Outlet />
      <div className="join join-vertical lg:join-horizontal">
        <Link to="/manager/group-pitch/add" className="btn btn-primary">
          <FiPlusCircle />
          Thêm
        </Link>
      </div>
      <div className="w-full container mx-auto mt-5">
        <h1 className="mb-12 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Danh sách các cụm sân
        </h1>
        <div className="grid grid-cols-2 gap-10 mt-5">
          {pitches.map((pitch, index) => (
            <Link
              to={"/manager/group-pitch/" + index}
              key={index}
              className="border rounded p-4 flex gap-5 hover:shadow transition hover:text-primary cursor-pointer"
            >
              <img
                src={pitch.imageUrl}
                alt={pitch.name}
                className="mb-2 rounded w-1/2"
              />
              <div>
                <div
                  className={`text-sm px-4 w-fit mb-2 py-1 ${
                    pitch.status == 1
                      ? "bg-green-200 text-green-800"
                      : pitch.status == 0
                      ? "bg-red-200 text-red-800"
                      : "bg-orange-200 text-orange-800"
                  } rounded-full`}
                >
                  {pitch.status == 1
                    ? "Đã duyệt"
                    : pitch.status == 0
                    ? "Từ chối"
                    : "Chưa duyệt"}
                </div>
                <h2 className="text-lg font-semibold mb-1">{pitch.name}</h2>
                <p className="text-sm text-gray-600 mb-1 flex gap-1">
                  <PiMapPinLight className="shrink-0 text-lg" /> {pitch.address}
                </p>
                <p className="text-sm text-gray-600 mb-1 flex gap-1 items-center">
                  <MdOutlineStadium /> Số sân: {pitch.quantity}
                </p>
                <p className="text-sm mt-4 text-gray-600">
                  🌟 Chào mừng đến với Sân Bóng Nhân Tạo 7 Người của chúng tôi!
                  🌟 👟 Bạn đang tìm kiếm một nơi để thể hiện...
                </p>
              </div>{" "}
              {/* Thêm thông tin khác của sân bóng nếu cần */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default group_pitch;
