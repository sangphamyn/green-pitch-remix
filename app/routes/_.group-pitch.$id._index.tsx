import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import {
  booking,
  bookingabc,
  getBookingListByDateTimeSlotId,
  getGroupPitchById,
  getPitchListByPitchTypeId,
  getPitchTypeListByGroupPitchId,
} from "prisma/pitch";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaRegClock } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import {
  IoCarOutline,
  IoFastFoodOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { LuGlassWater } from "react-icons/lu";
import { PiMapPinLight, PiMoneyLight } from "react-icons/pi";
import { formatCurrency, getDistrictById, getWardById } from "~/helper";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();
import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { getSession } from "~/session.server";
import { PrismaClient } from "@prisma/client";
type ValuePiece = Date | null;

const db = new PrismaClient();
type Value = ValuePiece | [ValuePiece, ValuePiece];
export let loader: LoaderFunction = async ({ request, params }) => {
  const pitch = await getGroupPitchById(params.id);
  const pitchType = await getPitchTypeListByGroupPitchId(params.id);
  let session = await getSession(request.headers.get("cookie"));
  return { pitch, pitchType, user: session.data };
};
export async function action({ request, params }: ActionFunctionArgs) {
  let formData = await request.formData();
  const date = formData.get("date");
  const timeId = formData.get("id_timeSlot");
  const user = formData.get("user");
  const pitchTypeId = formData.get("pitchType_id");
  const pitchList = await getPitchListByPitchTypeId(pitchTypeId);
  const bookingList = await getBookingListByDateTimeSlotId(date, timeId);
  let pitchId;
  for (let i = 0; i < pitchList.length; i++) {
    let check = true;
    for (let j = 0; j < bookingList.length; j++) {
      if (pitchList[i].id == bookingList[j].id_pitch) {
        check = false;
        break;
      }
    }
    if (check) {
      pitchId = pitchList[i].id;
      break;
    }
  }
  let booking;
  let message = "";
  if (!pitchId) {
    message = "Đã hết sân, vui lòng chọn sân khác";
    return json({
      status: "error",
      message: message,
    });
  }
  if (pitchId) booking = await bookingabc(date, timeId, user, pitchId);
  if (booking) {
    message = "Đặt sân thành công";
    return json({
      status: "success",
      message: message,
    });
  }
}
function group_pitch_detail() {
  const data = useLoaderData<typeof loader>();
  let actionData = useActionData();
  const user = data.user;
  const pitch = data.pitch.groupPitch;
  const services = data.pitch.service;
  const pitchTypeList = data.pitchType;
  let numOfPitch = 0;
  let minTime = 1000;
  let maxTime = 0;
  let minPrice = 100000000;
  let maxPrice = 0;
  pitchTypeList.map((item) => {
    numOfPitch += item.pitch.length;
    item.timeSlot.map((time) => {
      if (timeToMinutes(time.startTime) < minTime)
        minTime = timeToMinutes(time.startTime);
      if (timeToMinutes(time.endTime) > maxTime)
        maxTime = timeToMinutes(time.endTime);

      let hour =
        (timeToMinutes(time.endTime) - timeToMinutes(time.startTime)) / 60;
      let priceOnHour = time.price / hour;
      if (priceOnHour < minPrice) minPrice = priceOnHour;
      if (priceOnHour > maxPrice) maxPrice = priceOnHour;
    });
  });
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("vi-VN", options);
  const dayOfWeek = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
  }).format(currentDate);
  const [value, onChange] = useState<Value>(new Date());
  const handleChange = (e) => {
    onChange(e);
  };
  const [time, setTime] = useState<string>();
  const [timeId, setTimeId] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [type, setType] = useState<string>();
  const [pitchTypeId, setPitchTypeId] = useState<string>();
  const handleBooking = (e) => {
    setTime(e.target.querySelector(".sang-time").textContent);
    setTimeId(e.target.getAttribute("timeSlot_id"));
    setPrice(e.target.querySelector(".sang-price").textContent);
    setType(e.target.querySelector(".sang-type").textContent);
    setPitchTypeId(e.target.getAttribute("pitchType_id"));
    document.getElementById("my_modal_2").showModal();
  };
  return (
    <div className="px-40">
      <h1 className="mb-12 mt-5 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {pitch.name}
      </h1>
      <p className="text-sm text-gray-600 mb-1 flex gap-1 justify-center">
        <PiMapPinLight className="shrink-0 text-lg" /> {pitch.address_detail},{" "}
        {getWardById(pitch.id_ward).name},{" "}
        {getDistrictById(pitch.id_district).name}
      </p>
      <div className="grid grid-cols-3 py-5 gap-6">
        {pitch.images ? (
          <>
            <div>
              <swiper-container
                // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                space-between="10"
                navigation="true"
              >
                {pitch.images.split(",").map((img: string, index: number) => {
                  return (
                    <swiper-slide key={index}>
                      <img
                        src={img}
                        className="h-[320px] w-full object-cover rounded-md"
                      />
                    </swiper-slide>
                  );
                })}
              </swiper-container>

              {/* <swiper-container
                class="mySwiper2"
                space-between="10"
                slides-per-view="4"
                free-mode="true"
                watch-slides-progress="true"
              >
                {pitch.images.split(",").map((img: string, index: number) => {
                  return (
                    <swiper-slide>
                      <img src={img} />
                    </swiper-slide>
                  );
                })}
              </swiper-container> */}
            </div>
          </>
        ) : (
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/images/san-co-nhan-tao-7-nguoi-dep.jpg"
              alt=""
            />
          </div>
        )}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="font-semibold text-xl mb-4">Thông tin sân</h3>
          <div className="flex justify-between mb-1">
            <p>Giờ mở cửa</p>
            <p className="font-semibold">
              {minutesToTime(minTime)} - {minutesToTime(maxTime)}
            </p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Số sân thi đấu: </p>
            <p className="font-semibold">{numOfPitch} Sân</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Giá sân trung bình: </p>
            <p className="font-semibold">
              {formatCurrency(Math.round(minPrice))} -{" "}
              {formatCurrency(Math.round(maxPrice))}/h
            </p>
          </div>
          <div className="bg-white p-4 rounded mt-4">
            <h3 className="font-semibold text-md mb-4">Dịch vụ</h3>
            <div className="grid grid-cols-2">
              {services.map((service) => {
                return (
                  <div className="flex gap-2 items-center text-sm mb-2">
                    {(() => {
                      switch (service.serviceId) {
                        case 1:
                          return <LuGlassWater />;
                        case 2:
                          return <IoIosWifi />;
                        case 3:
                          return <IoShirtOutline />;
                        case 4:
                          return <IoCarOutline />;
                        case 5:
                          return <IoFastFoodOutline />;
                      }
                    })()}{" "}
                    {service.service.name}
                    {service.price != null ? (
                      <div
                        className={`text-xs px-3 flex gap-1 items-center w-fit mb-2 py-[2px]  rounded-full ${
                          service.price == "0"
                            ? "text-green-800 bg-green-200"
                            : "text-orange-800 bg-orange-200"
                        }`}
                      >
                        {service.price == "0" ? "Free" : service.price + " đ"}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <iframe
          src={pitch.map}
          width="600"
          height="300"
          //   allowfullscreen=""
          loading="lazy"
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
      <div className="py-5">
        <div>
          <div>
            <div className="px-6 py-4 flex justify-between mb-3 border-[#E5E7EB] bg-[#F9FAFB] rounded-t-lg">
              <div>
                <time
                  dateTime="2022-01-22"
                  className="text-[#111827] font-semibold"
                >
                  {day} tháng {month}, {year}
                </time>
                <p className="text-sm text-[#6B7280] mt-1">{dayOfWeek}</p>
              </div>
              <div className="flex gap-4 items-center">
                <DatePicker onChange={handleChange} value={value} />
              </div>
            </div>
            {pitchTypeList.map((item) => {
              return (
                <div className="flex gap-4 mb-3">
                  <div className="w-1/5">
                    {item.name} - {item.type} - {item.description} (
                    {item.pitch.length} sân)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.timeSlot.map((time, index) => {
                      return (
                        <div
                          className="border border-[#93B4FD] bg-[#DBE6FE] rounded-md px-3 py-2 text-sm cursor-pointer hover:bg-white transition"
                          onClick={handleBooking}
                          timeSlot_id={time.id}
                          pitchType_id={item.id}
                        >
                          <div className="flex items-center justify-center gap-2 font-semibold pointer-events-none">
                            <FaRegClock />
                            <span className="sang-time">
                              {time.startTime} - {time.endTime}
                            </span>
                            <span className="sang-type hidden">
                              {item.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-2 pointer-events-none">
                            <PiMoneyLight />
                            <span className="sang-price">
                              {formatCurrency(time.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <dialog id="my_modal_2" className="modal">
              <Form method="POST" className="mx-auto modal-box">
                {/* <div className="modal-box"> */}
                <h3 className="font-bold text-2xl text-center mx-auto mb-4">
                  Đặt sân
                </h3>
                <div className="flex gap-3">
                  <img
                    src={
                      pitch.images
                        ? pitch.images.split(",")[0]
                        : "/images/san-co-nhan-tao-7-nguoi-dep.jpg"
                    }
                    alt={pitch.name}
                    className="mb-2 rounded w-1/3 h-[80px] object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{pitch.name}</h2>
                    <p className="text-sm text-gray-600 mb-1 flex gap-1 justify-center">
                      {pitch.address_detail}, {getWardById(pitch.id_ward).name},{" "}
                      {getDistrictById(pitch.id_district).name}
                    </p>
                  </div>
                </div>
                <p className="py-2">
                  <span className="font-semibold">Loại sân:</span> {type}
                  <input
                    type="hidden"
                    name="pitchType_id"
                    value={pitchTypeId}
                  />
                </p>
                <p className="py-2">
                  <span className="font-semibold">Ngày:</span>{" "}
                  {`${value.getDate().toString().padStart(2, "0")}/${(
                    value.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}/${value.getFullYear()}`}
                  <input
                    type="hidden"
                    name="date"
                    value={`${value.getDate().toString().padStart(2, "0")}/${(
                      value.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, "0")}/${value.getFullYear()}`}
                  />
                </p>
                <p className="py-2">
                  <span className="font-semibold">Thời gian:</span> {time}
                  <input type="hidden" name="id_timeSlot" value={timeId} />
                </p>
                <p className="py-2">
                  <span className="font-semibold">Họ và tên:</span> {user.name}
                  <input type="hidden" name="user" value={user.userId} />
                </p>
                <p className="py-2">
                  <span className="font-semibold">Số điện thoại:</span>{" "}
                  {user.phone}
                </p>
                <p className="py-2">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="py-2">
                  <span className="font-semibold">Giá tiền:</span> {price}
                </p>
                <button
                  className="btn btn-primary mx-auto mt-4 block"
                  onClick={() => {
                    document
                      .querySelector(".sang-status")
                      ?.classList.remove("hidden");
                  }}
                >
                  Đặt sân
                </button>
                <div
                  className={`t-4 sang-status ${
                    actionData?.status == "success"
                      ? "text-success"
                      : "text-error"
                  }`}
                >
                  {actionData?.message}
                </div>
                {/* </div> */}
              </Form>
              <form
                method="dialog"
                onClick={() => {
                  document
                    .querySelector(".sang-status")
                    ?.classList.add("hidden");
                }}
                className="modal-backdrop"
              >
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default group_pitch_detail;
