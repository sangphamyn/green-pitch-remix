import React from "react";
import logo from "/images/logo.svg";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { AiOutlineHome } from "react-icons/ai";
import { IoAnalytics, IoCalendarOutline } from "react-icons/io5";
import { MdOutlineStadium } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";
import { loader } from "~/routes/_.$";
import { FcStatistics } from "react-icons/fc";
import { IoIosCalendar, IoIosLogOut } from "react-icons/io";

function SideBarManagerComponent() {
  const data: {
    idFirst: any;
    user: { [key: string]: string };
  } = useLoaderData<typeof loader>();
  const idFirst = data.idFirst;
  const handleNavigate = () => {};
  return (
    <div>
      <div className="relative h-full flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="py-4 px-6 mb-2 rounded-2xl">
          <Link to="/manager" className="header-logo flex items-center">
            <img src={logo} />
            <span className="ml-4 font-bold text-xl">Green Pitch</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <NavLink
            to="/manager"
            end
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-200 hover:bg-opacity-80 focus:bg-blue-200 hover:text-blue-900 focus:text-blue-900 outline-none " +
              (isActive ? "bg-blue-200 text-blue-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <AiOutlineHome />
            </div>
            Trang chủ
          </NavLink>
          <NavLink
            to="/manager/statistic"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-200 hover:bg-opacity-80 focus:bg-blue-200 hover:text-blue-900 focus:text-blue-900 outline-none " +
              (isActive ? "bg-blue-200 text-blue-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <FcStatistics />
            </div>
            Thống kê
          </NavLink>
          <NavLink
            to={`/manager/schedule/` + idFirst}
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-200 hover:bg-opacity-80 focus:bg-blue-200 hover:text-blue-900 focus:text-blue-900 outline-none " +
              (isActive ? "bg-blue-200 text-blue-900" : "") +
              (idFirst ? "" : "pointer-events-none")
            }
          >
            <div className="grid place-items-center mr-4">
              <IoIosCalendar />
            </div>
            Lịch sân
          </NavLink>
          <NavLink
            to="/manager/group-pitch"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-200 hover:bg-opacity-80 focus:bg-blue-200 hover:text-blue-900 focus:text-blue-900 outline-none " +
              (isActive ? "bg-blue-200 text-blue-900" : "")
            }
          >
            <div className="grid place-items-center mr-4">
              <svg
                fill="currentColor"
                height="17px"
                width="17px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 511 511"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M487.5,80h-464C10.542,80,0,90.542,0,103.5v304C0,420.458,10.542,431,23.5,431h464c12.958,0,23.5-10.542,23.5-23.5v-304 C511,90.542,500.458,80,487.5,80z M455.5,192c-8.547,0-15.5,6.953-15.5,15.5v96c0,8.547,6.953,15.5,15.5,15.5H496v25h-64.5 c-9.098,0-16.5-7.402-16.5-16.5v-144c0-9.098,7.402-16.5,16.5-16.5H496v25H455.5z M496,207v97h-40.5c-0.257,0-0.5-0.243-0.5-0.5v-96 c0-0.257,0.243-0.5,0.5-0.5H496z M248,311.487c-27.619-3.682-49-27.377-49-55.987s21.381-52.305,49-55.987V311.487z M263,199.513 c27.619,3.682,49,27.377,49,55.987s-21.381,52.305-49,55.987V199.513z M15,207h40.5c0.257,0,0.5,0.243,0.5,0.5v96 c0,0.257-0.243,0.5-0.5,0.5H15V207z M15,319h40.5c8.547,0,15.5-6.953,15.5-15.5v-96c0-8.547-6.953-15.5-15.5-15.5H15v-25h64.5 c9.098,0,16.5,7.402,16.5,16.5v144c0,9.098-7.402,16.5-16.5,16.5H15V319z M15,407.5V359h64.5c17.369,0,31.5-14.131,31.5-31.5v-144 c0-17.369-14.131-31.5-31.5-31.5H15v-48.5c0-4.687,3.813-8.5,8.5-8.5H248v89.395c-35.913,3.761-64,34.212-64,71.105 s28.087,67.344,64,71.105V416H23.5C18.813,416,15,412.187,15,407.5z M487.5,416H263v-89.395c35.913-3.761,64-34.212,64-71.105 s-28.087-67.344-64-71.105V95h224.5c4.687,0,8.5,3.813,8.5,8.5V152h-64.5c-17.369,0-31.5,14.131-31.5,31.5v144 c0,17.369,14.131,31.5,31.5,31.5H496v48.5C496,412.187,492.187,416,487.5,416z"></path>{" "}
                </g>
              </svg>
            </div>
            Sân
          </NavLink>
          <NavLink
            to="/logout"
            role="button"
            tabIndex={0}
            className={({ isActive }) =>
              "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-200 hover:text-blue-900 focus:text-blue-900 outline-none " +
              (isActive ? "bg-blue-200 text-blue-900" : "")
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

export default SideBarManagerComponent;
