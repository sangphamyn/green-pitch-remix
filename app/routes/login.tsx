import React from "react";

import RegisterGif from "/signup.gif";
import AvatarImage from "/avatar.svg";
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";

export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  return subdomain;
};
function login() {
  const data = useLoaderData<typeof loader>();
  const handleSubmit = () => {};
  const handleChange = () => {};
  if (data == "manager")
    return (
      <div className="w-[800px] h-[200px] mx-auto mt-10 flex justify-center items-center border-dashed border-red-700 border-2 text-2xl font-bold">
        CHỦ SÂN ĐĂNG NHẬP
      </div>
    );
  return (
    <div className="container mx-auto mt-16 max-w-[1000px] grid grid-cols-2 items-center">
      <img src={RegisterGif} />
      <form onSubmit={handleSubmit} className="mx-auto">
        <img src={AvatarImage} className="w-24 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-4 text-center">ĐĂNG NHẬP</h1>
        <p className="text-center mb-6">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="sang-underline relative cursor-pointer"
          >
            Đăng ký
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
            placeholder="Email hoặc số điện thoại"
            value=""
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered input-primary flex items-center gap-2">
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
            value=""
            placeholder="Mật khẩu"
            autoComplete="off"
            onChange={handleChange}
          />
        </label>
        <div className="flex items-center justify-center mt-8">
          <button className="btn btn-primary px-10 rounded-full w-full">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default login;
