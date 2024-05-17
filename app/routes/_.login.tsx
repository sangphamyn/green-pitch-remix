import React, { ChangeEvent, useEffect, useState } from "react";

import RegisterGif from "/images/signup.gif";
import AvatarImage from "/images/avatar.svg";
import { Form, Link, useActionData, useLocation } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";

import { PrismaClient } from "@prisma/client";
import { commitSession, getSession } from "~/session.server";
const db = new PrismaClient();

export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  return subdomain;
};
export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const vietnamesePhoneNumberRegex =
    /^(?:0|\+84)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  let message: { [key: string]: string } = {};

  if (!username) message["username"] = "Cần điền email hoặc số điện thoại";
  else if (
    !mailRegex.test(username.toString()) &&
    !vietnamesePhoneNumberRegex.test(username.toString())
  )
    message["username"] = "Email hoặc số điện thoại không hợp lệ";
  if (!password) message["password"] = "Cần điền mật khẩu";
  if (Object.keys(message).length > 0) {
    return json({
      status: "error",
      message: message,
    });
  }
  let existUser = await db.user.findFirst({
    where: {
      OR: [{ email: username?.toString() }, { phone: username?.toString() }],
    },
  });
  if (!existUser) {
    message["username"] = "Email hoặc số điện thoại chưa đăng ký";
    return json({
      status: "error",
      message: message,
    });
  }
  if (password != existUser?.password) {
    message["password"] = "Sai mật khẩu";
    return json({
      status: "error",
      message: message,
    });
  }
  let session = await getSession(request.headers.get("cookie"));
  session.set("userId", existUser.id.toString());
  session.set("name", existUser.name.toString());
  session.set("phone", existUser.phone.toString());
  session.set("email", existUser.email.toString());
  session.set(
    "avatar",
    existUser.avatar ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  session.set("createdAt", existUser.createdAt?.toString());
  session.set("role", existUser.role);

  let url = "/";
  if (existUser.role == 2) url = "/admin/dashboard";
  return redirect(url, {
    headers: { "set-cookie": await commitSession(session) },
  });
}
function login() {
  let actionData = useActionData<{ message: Record<string, any> }>();
  useEffect(() => {
    setData(actionData);
  }, [actionData]);
  const [data, setData] = useState(actionData);
  const [formData, setFormData] = useState({
    username: "sang@gmail.com",
    password: "111111",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ message: [] });
    const { name, value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="container mx-auto mt-16 max-w-[1000px] grid grid-cols-2 items-center">
      <img src={RegisterGif} />
      <Form method="POST" className="mx-auto">
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
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              data?.message?.username
                ? "input-error"
                : "focus-within:border-primary"
            }`}
          >
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
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </label>
          {data?.message?.username ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {data.message.username}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              data?.message?.password
                ? "input-error"
                : "focus-within:border-primary"
            }`}
          >
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
              placeholder="Mật khẩu"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </label>
          {data?.message?.password ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {data.message.password}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-center mt-8">
          <button className="btn btn-primary px-10 rounded-full w-full">
            Đăng nhập
          </button>
        </div>
      </Form>
    </div>
  );
}

export default login;
