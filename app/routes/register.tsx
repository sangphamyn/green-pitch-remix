import React from "react";
import RegisterGif from "/signup.gif";
import AvatarImage from "/avatar.svg";
import { Link } from "@remix-run/react";
import { FaPhoneAlt } from "react-icons/fa";
function register() {
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <div className="container mx-auto mt-16  max-w-[1000px] grid grid-cols-2 items-center">
      <img src={RegisterGif} alt="" />
      <form onSubmit={handleSubmit} className="mx-auto">
        {/* <img src={AvatarImage} className="w-24 mx-auto mb-4" /> */}
        <h1 className="text-2xl font-semibold mb-4 text-center">
          TẠO TÀI KHOẢN
        </h1>
        <p className="text-center mb-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="sang-underline relative cursor-pointer">
            Đăng nhập
          </Link>{" "}
          ngay
        </p>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Họ và tên"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
          <FaPhoneAlt className="w-4 h-4 opacity-70" />
          <input type="text" className="grow" placeholder="Số điện thoại" />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" className="grow" placeholder="Mật khẩu" />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Xác nhận mật khẩu"
          />
        </label>
        <div className="flex items-center justify-center mt-8">
          <button className="btn btn-primary px-10 rounded-full w-full">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}

export default register;
