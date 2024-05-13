import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  NavLink,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import {
  bookingabc,
  getBookingListByDateTimeSlotId,
  getGroupPitchById,
  getPitchListByPitchTypeId,
  getPitchTypeListByGroupPitchId,
} from "prisma/pitch";
import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaRegClock } from "react-icons/fa6";
import { IoIosFootball, IoIosWifi } from "react-icons/io";
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
import { LiaShoePrintsSolid } from "react-icons/lia";
import { MdOutlineRoomService } from "react-icons/md";
import Breadcrumb from "~/components/Breadcrumb";
import { SlCalender } from "react-icons/sl";
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
  let pitchTypeList;
  if (actionData?.pitchType) {
    pitchTypeList = actionData.pitchType;
  } else {
    pitchTypeList = data.pitchType;
  }
  console.log(pitchTypeList);
  // let pitchTypeList1 = actionData?.pitchType;
  // pitchTypeList = data.pitchType;
  const user = data.user;
  const pitch = data.pitch.groupPitch;
  const services = data.pitch.service;
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

  const [value, onChange] = useState<Value>(new Date());
  const handleChange = (e) => {
    if (e == null) onChange(new Date());
    else onChange(e);
  };
  const currentDate = new Date();
  const day = value.getDate();
  const month = value.getMonth() + 1;
  const year = value.getFullYear();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = value.toLocaleDateString("vi-VN", options);
  const dayOfWeek = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
  }).format(value);
  function dateFormat(date) {
    const dateObject = new Date(date);

    // Trích xuất các thành phần của ngày
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Lấy tháng và thêm "0" nếu tháng < 10
    const day = ("0" + dateObject.getDate()).slice(-2); // Lấy ngày và thêm "0" nếu ngày < 10
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
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
    if (Object.keys(user).length > 0)
      document.getElementById("my_modal_2").showModal();
    else document.getElementById("my_modal_3").showModal();
    document.querySelector(".sang-status")?.classList.add("hidden");
  };
  const [srcValue, setSrcValue] = useState("");
  useEffect(() => {
    const div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = pitch.map;

    // Lấy thẻ iframe từ thẻ div
    const iframeElement = div.querySelector("iframe");

    // Lấy giá trị của thuộc tính src từ thẻ iframe
    const srcValue = iframeElement.getAttribute("src");
    setSrcValue(srcValue);
  });
  const paths = [
    { title: "Trang chủ", url: "/" },
    { title: "Danh sách các sân", url: "/group-pitch" },
  ];
  paths.push({
    title: pitch.name,
    url: "/group-pitch/" + pitch.id,
  });
  return (
    <>
      <Breadcrumb paths={paths} />
      <div className="container mx-auto">
        <h1 className="mb-4 mt-7 text-[30px] font-semibold leading-none tracking-tight text-gray-900 dark:text-white">
          {pitch.name}
        </h1>
        <p className="text-sm text-gray-600 mb-4 flex gap-1">
          <PiMapPinLight className="shrink-0 text-lg" /> {pitch.address_detail},{" "}
          {getWardById(pitch.id_ward).name},{" "}
          {getDistrictById(pitch.id_district).name}
        </p>
        <div className="flex justify-between">
          <div className="w-[70%]">
            <div className="gap-6">
              {pitch.images ? (
                <>
                  <div className=" w-full">
                    <swiper-container
                      // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                      class="mySwiper"
                      thumbs-swiper=".mySwiper2"
                      space-between="10"
                      navigation="true"
                      pagination="true"
                    >
                      {pitch.images
                        .split(",")
                        .map((img: string, index: number) => {
                          return (
                            <swiper-slide key={index}>
                              <img
                                src={img}
                                className="h-[520px] w-full object-cover rounded-md"
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
            </div>
            <div className="py-5">
              <div>
                <div>
                  <div className="px-6 py-4 flex mb-3 border-[#E5E7EB] bg-[#F9FAFB] rounded-t-lg">
                    <div>
                      <Form method="POST" className="flex gap-4 items-center">
                        <DatePicker
                          onChange={handleChange}
                          value={value}
                          name="dateSearch"
                          clearIcon={false}
                          minDate={new Date()}
                        />
                      </Form>
                      <div
                        onClick={() => {
                          document
                            .querySelector(
                              ".react-date-picker__calendar-button"
                            )
                            .click();
                        }}
                        className="cursor-pointer hover:text-primary transition"
                      >
                        <time
                          dateTime="2022-01-22"
                          className="font-semibold flex items-center gap-2"
                        >
                          <SlCalender className="mb-[2px]" />
                          {day} tháng {month}, {year}
                        </time>
                        <p className="text-sm mt-1">{dayOfWeek}</p>
                      </div>
                    </div>
                  </div>
                  {pitchTypeList?.map((item) => {
                    return (
                      <div className="flex mb-3">
                        <div className="w-1/5 flex-shrink-0">
                          {item.name} - {item.type} - {item.description} (
                          {item.pitch.length} sân)
                        </div>
                        <div className="w-4/5 pl-4">
                          <swiper-container
                            // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                            class="mySwiper"
                            space-between="10"
                            slides-per-view="5"
                            navigation={true}
                          >
                            {item.timeSlot.map((time, index) => {
                              const bookings = time.booking?.filter(
                                (booking) => {
                                  return booking.date == dateFormat(value);
                                }
                              );
                              return (
                                <swiper-slide key={index}>
                                  <div
                                    className={`border rounded-md px-3 py-2 text-sm cursor-pointer transition ${
                                      bookings?.length == item.pitch?.length
                                        ? "border-[#fd9393] bg-[#fedbdb] cursor-not-allowed pointer-events-none"
                                        : "border-[#93B4FD] bg-[#DBE6FE] hover:bg-white"
                                    }`}
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
                                    <div className="flex items-center justify-center gap-2 pointer-events-none">
                                      {bookings?.length} / {item.pitch?.length}
                                    </div>
                                  </div>
                                </swiper-slide>
                              );
                            })}
                          </swiper-container>
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
                          <h2 className="text-lg font-semibold mb-1">
                            {pitch.name}
                          </h2>
                          <p className="text-sm text-gray-600 mb-1 flex gap-1 justify-center">
                            {pitch.address_detail},{" "}
                            {getWardById(pitch.id_ward).name},{" "}
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
                          value={`${value.getFullYear()}-${(
                            value.getMonth() + 1
                          )
                            .toString()
                            .padStart(2, "0")}-${value
                            .getDate()
                            .toString()
                            .padStart(2, "0")}`}
                          // value={`${value
                          //   .getDate()
                          //   .toString()
                          //   .padStart(2, "0")}/${(value.getMonth() + 1)
                          //   .toString()
                          //   .padStart(2, "0")}/${value.getFullYear()}`}
                        />
                      </p>
                      <p className="py-2">
                        <span className="font-semibold">Thời gian:</span> {time}
                        <input
                          type="hidden"
                          name="id_timeSlot"
                          value={timeId}
                        />
                      </p>
                      <p className="py-2">
                        <span className="font-semibold">Họ và tên:</span>{" "}
                        {user.name}
                        <input type="hidden" name="user" value={user.userId} />
                      </p>
                      <p className="py-2">
                        <span className="font-semibold">Số điện thoại:</span>{" "}
                        {user.phone}
                      </p>
                      <p className="py-2">
                        <span className="font-semibold">Email:</span>{" "}
                        {user.email}
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
                        role="alert"
                        className={`mt-4 alert sang-status ${
                          actionData ? "" : "hidden"
                        } ${
                          actionData?.status == "success"
                            ? "alert-success"
                            : "alert-error"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{actionData?.message}</span>
                      </div>
                      {/* </div> */}
                    </Form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                  <dialog id="my_modal_3" className="modal">
                    <Form method="POST" className="mx-auto modal-box">
                      Cần đăng nhập để đặt sân
                      <NavLink
                        to="/login"
                        className="ml-4 btn btn-sm btn-primary"
                      >
                        Đăng nhập ngay
                      </NavLink>
                    </Form>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[420px]">
            <div className="bg-gray-200 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-xl mb-4">Thông tin sân</h3>
              <div className="flex justify-between mb-1">
                <p>Giờ mở cửa:</p>
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
                              return <IoIosWifi />;
                            case 2:
                              return <LuGlassWater />;
                            case 3:
                              return <IoShirtOutline />;
                            case 4:
                              return <IoCarOutline />;
                            case 5:
                              return <IoFastFoodOutline />;
                            case 6:
                              return <LiaShoePrintsSolid />;
                            case 7:
                              return <IoIosFootball />;
                            default:
                              return <MdOutlineRoomService />;
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
                            {service.price == "0"
                              ? "Free"
                              : formatCurrency(service.price)}
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
              src={srcValue}
              width="600"
              height="300"
              //   allowfullscreen=""
              loading="lazy"
              className="rounded-lg w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default group_pitch_detail;
