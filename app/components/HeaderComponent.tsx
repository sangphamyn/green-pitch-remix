import { Link, useLoaderData } from "@remix-run/react";
import logo from "/images/logo.svg";
import { loader } from "~/routes/_.$";

const HeaderComponent = () => {
  const data: { user: { [key: string]: string } } =
    useLoaderData<typeof loader>();
  let user = data.user;
  let isLogin = Object.keys(user).length > 0;
  return (
    <div className="bg-[#13357b] ">
      <div className="navbar container mx-auto text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link
            to="http://localhost:5173/"
            className="header-logo mr-20 flex items-center"
          >
            <img src={logo} />
            <span className="ml-4 font-bold text-md text-white">
              Green Pitch
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 w-40 text-black">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-4">
            <Link
              to="/manager"
              className="btn btn-sm h-10 border-white text-white btn-outline rounded"
            >
              Dành cho chủ sân
            </Link>
            {isLogin ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle flex w-auto px-2"
                >
                  <div className="w-10 rounded-full">
                    <img
                      className="rounded-full"
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                  <div className="text-start">
                    <div className="mb-1">{user?.name}</div>
                    <div className="font-normal">{user?.phone}</div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">Thông tin cá nhân</a>
                  </li>
                  <li>
                    <Link to="/logout">Đăng xuất</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn bg-white h-10 btn-sm rounded">
                Đăng ký/Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
