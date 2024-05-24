import { NavLink } from "@remix-run/react";
import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosLogOut, IoMdFootball } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { LuUserSquare } from "react-icons/lu";

function AdminSidebar() {
  return (
    <div>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-full min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-green-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Admin
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <NavLink
            to="/admin/dashboard"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-200 focus:bg-green-200 focus:bg-opacity-80 active:bg-opacity-80 hover:text-green-900 focus:text-green-900 outline-none " +
              (isActive ? "bg-green-200 text-green-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <AiOutlineDashboard />
            </div>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/user"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-200 focus:bg-green-200 focus:bg-opacity-80 active:bg-opacity-80 hover:text-green-900 focus:text-green-900 outline-none " +
              (isActive ? "bg-green-200 text-green-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <BsPeople />
            </div>
            Khách hàng
          </NavLink>
          <NavLink
            to="/admin/owner"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-200 focus:bg-green-200 focus:bg-opacity-80 active:bg-opacity-80 hover:text-green-900 focus:text-green-900 outline-none " +
              (isActive ? "bg-green-200 text-green-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <LuUserSquare />
            </div>
            Chủ sân
          </NavLink>
          <NavLink
            to="/admin/grouppitch"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-200 focus:bg-green-200 focus:bg-opacity-80 active:bg-opacity-80 hover:text-green-900 focus:text-green-900 outline-none " +
              (isActive ? "bg-green-200 text-green-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <IoMdFootball />
            </div>
            Sân
          </NavLink>
          <NavLink
            to="/logout"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-green-200 focus:bg-green-200 focus:bg-opacity-80 active:bg-opacity-80 hover:text-green-900 focus:text-green-900 outline-none " +
              (isActive ? "bg-green-200 text-green-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <IoIosLogOut />
            </div>
            Đăng xuất
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
