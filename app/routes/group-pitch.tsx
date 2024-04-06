import { Outlet } from "@remix-run/react";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
const pitches = [
  {
    name: "Sân CNTT",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 1,
    quantity: 4,
  },
  {
    name: "Sân Thanh Niên",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 0,
    quantity: 6,
  },
  {
    name: "Sân Công Nghiệp",
    address: "Đường Bắc Sơn, Hoàng Văn Thụ, Thành phố Thái Nguyên, Thái Nguyên",
    imageUrl: "/san-co-nhan-tao-7-nguoi-dep.jpg",
    status: 3,
    quantity: 2,
  },
  // Thêm các sân bóng khác vào đây...
];
function group_pitch() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default group_pitch;
