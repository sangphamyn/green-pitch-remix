import React, { ChangeEvent, useState } from "react";
import RegisterGif from "/images/signup.gif";
import { Form, Link, useActionData } from "@remix-run/react";
import { FaPhoneAlt } from "react-icons/fa";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getSession, commitSession } from "~/session.server";
import { CreateUser } from "~/enum/user.enum";
import { createUser } from "prisma/user";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("cookie"));
  return session;
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const name = formData.get("fullname");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const vietnamesePhoneNumberRegex =
    /^(?:0|\+84)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
  const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  let message: { [key: string]: string } = {};
  if (!name) message["name"] = "Cần điền tên";

  if (!phone) message["phone"] = "Cần điền phone";
  else if (!vietnamesePhoneNumberRegex.test(phone.toString()))
    message["phone"] = "Số điện thoại không hợp lệ";
  if (!email) message["email"] = "Cần điền email";
  else if (!mailRegex.test(email.toString()))
    message["email"] = "Email không hợp lệ";
  if (!password) message["password"] = "Cần điền mật khẩu";
  if (password && password.toString().length < 6)
    message["password"] = "Mật khẩu ít nhất 6 kí tự";
  if (!confirmPassword)
    message["confirmPassword"] = "Cần điền xác nhận mật khẩu";
  if (password && confirmPassword && password !== confirmPassword)
    message["confirmPassword"] = "Mật khẩu không khớp";
  if (Object.keys(message).length > 0) {
    return json({
      status: "error",
      message: message,
    });
  }
  let existUser = await db.user.findFirst({
    where: { email: email?.toString() },
  });
  if (existUser) message["email"] = "Email đã đăng ký";
  existUser = await db.user.findFirst({
    where: { phone: phone?.toString() },
  });
  if (existUser) message["phone"] = "Số điện thoại đã đăng ký";
  if (Object.keys(message).length > 0) {
    return json({
      status: "error",
      message: message,
    });
  }
  const data: CreateUser = {
    name: name as string,
    phone: phone as string,
    email: email as string,
    password: password as string,
    createdAt: new Date(),
  };
  const newUser = await createUser(data);
  let session = await getSession(request.headers.get("cookie"));
  session.set("userId", newUser.id.toString());
  session.set("name", newUser.name.toString());
  session.set("phone", newUser.phone.toString());
  session.set("email", newUser.email.toString());
  session.set("avatar", newUser.avatar);
  session.set("createdAt", newUser.createdAt?.toString());
  session.set("role", newUser.role);

  return redirect("/", {
    headers: { "set-cookie": await commitSession(session) },
  });
  return data;
}

function register() {
  const [formData, setFormData] = useState({
    // fullname: "Phạm Văn",
    // email: "sang@gmail.com",
    // phone: "0852256360",
    // password: "111111",
    // confirmPassword: "111111",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let actionData = useActionData<{ message: Record<string, any> }>();
  return (
    <div className="container mx-auto mt-16  max-w-[1000px] grid grid-cols-2 items-center">
      <img src={RegisterGif} alt="" />
      <Form className="mx-auto" method="POST">
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
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              actionData?.message?.name
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
              placeholder="Họ và tên *"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </label>
          {actionData?.message?.name ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {actionData.message.name}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              actionData?.message?.email
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
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {actionData?.message?.email ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {actionData.message.email}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              actionData?.message?.phone
                ? "input-error"
                : "focus-within:border-primary"
            }`}
          >
            <FaPhoneAlt className="w-4 h-4 opacity-70" />
            <input
              type="text"
              className="grow"
              placeholder="Số điện thoại *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          {actionData?.message?.phone ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {actionData.message.phone}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              actionData?.message?.password
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
              placeholder="Mật khẩu *"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {actionData?.message?.password ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {actionData.message.password}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="form-control w-full max-w-xs mb-4">
          <label
            className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
              actionData?.message?.confirmPassword
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
              placeholder="Xác nhận mật khẩu *"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>
          {actionData?.message?.confirmPassword ? (
            <div className="label pt-1 pb-0">
              <span className="label-text-alt text-error">
                {actionData.message.confirmPassword}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            className="btn btn-primary px-10 rounded-full w-full"
          >
            Đăng ký
          </button>
        </div>
      </Form>
    </div>
  );
}

export default register;
