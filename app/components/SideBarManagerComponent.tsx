import React from "react";
import logo from "/images/logo.svg";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { AiOutlineHome } from "react-icons/ai";
import { IoAnalytics, IoCalendarOutline } from "react-icons/io5";
import { MdOutlineStadium } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";
import { loader } from "~/routes/_.$";

function SideBarManagerComponent() {
  const data: { user: { [key: string]: string } } =
    useLoaderData<typeof loader>();
  const idFirst = data.idFirst;
  const handleNavigate = () => {};
  return (
    <div>
      <div
        className="w-64 bg-gray-200 border-r border-gray-200 h-full"
        style={{ minHeight: "calc(100vh - 57px)" }}
      >
        <div className="py-4 px-6 mb-2">
          <Link to="/manager" className="header-logo flex items-center">
            <img src={logo} />
            <span className="ml-4 font-bold text-xl">Green Pitch</span>
          </Link>
        </div>

        <div className="mb-10">
          <h3 className="mx-6 mb-2 text-xs text-gray-600 uppercase tracking-widest">
            Quản lý
          </h3>

          <NavLink
            to="/manager"
            end
            onClick={() => handleNavigate()}
            className={({ isActive }) =>
              "flex gap-3 items-center px-6 py-2.5 text-gray-600 hover:bg-orange-100 hover:text-orange-600 group transition " +
              (isActive
                ? "bg-orange-500 hover:bg-orange-500 text-white hover:text-white"
                : "")
            }
          >
            <AiOutlineHome />
            Trang chủ
          </NavLink>

          <NavLink
            to={`/manager/schedule/` + idFirst}
            onClick={() => handleNavigate()}
            className={({ isActive }) =>
              "flex gap-3 items-center px-6 py-2.5 text-gray-600 hover:bg-orange-100 hover:text-orange-600 group transition " +
              (isActive
                ? "bg-orange-500 hover:bg-orange-500 text-white hover:text-white"
                : "")
            }
          >
            <IoCalendarOutline />
            Lịch sân
          </NavLink>

          <NavLink
            to="/manager/statistic"
            onClick={() => handleNavigate()}
            className={({ isActive }) =>
              "flex gap-3 items-center px-6 py-2.5 text-gray-600 hover:bg-orange-100 hover:text-orange-600 group transition " +
              (isActive
                ? "bg-orange-500 hover:bg-orange-500 text-white hover:text-white"
                : "")
            }
          >
            <IoAnalytics />
            Thống kê
          </NavLink>
        </div>

        <div className="mb-10">
          <h3 className="mx-6 mb-2 text-xs text-gray-600 uppercase tracking-widest">
            Chỉnh sửa
          </h3>

          <NavLink
            to="/manager/group-pitch"
            onClick={() => handleNavigate()}
            className={({ isActive }) =>
              "flex gap-3 items-center px-6 py-2.5 text-gray-600 hover:bg-orange-100 hover:text-orange-600 group transition " +
              (isActive
                ? "bg-orange-500 hover:bg-orange-500 text-white hover:text-white"
                : "")
            }
          >
            <MdOutlineStadium />
            Cụm sân
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBarManagerComponent;
