import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  getBookingList,
  getGroupPitchById,
  getGroupPitchByOwnerId,
  getPitchTypeListByGroupPitchId,
} from "prisma/pitch";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { getSession } from "~/session.server";
import { SlCalender } from "react-icons/sl";
import CountdownTimer from "~/components/CountDownTimer";
export let loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  let { searchParams } = new URL(request.url);
  const paramsId = params.id;
  const pitchType = await getPitchTypeListByGroupPitchId(paramsId ?? "0");
  let groupPitchs;
  let idFirst;
  let session = await getSession(request.headers.get("cookie"));
  if (session.data.userId) {
    groupPitchs = await getGroupPitchByOwnerId(session.data.userId);
    groupPitchs?.map((item) => {
      if (item.status == 2)
        // Da duyet
        idFirst = item.id;
    });
  }
  const bookingList = await getBookingList(
    "",
    parseInt(searchParams.get("page")) || 1,
    paramsId ?? "0",
    "updatedAt"
  );
  return {
    pitchType,
    groupPitchs,
    idFirst,
    paramsId,
    bookingList,
    page: searchParams.get("page") || 1,
  };
};

function schedule() {
  const data = useLoaderData<typeof loader>();
  const page = data.page;
  const pitchType = data.pitchType;
  const bookingList = data.bookingList;
  let numOfPitch = 0;
  let minTime = 1000;
  let maxTime = 0;
  pitchType?.map((item) => {
    numOfPitch += item.pitch.length;
    item.timeSlot?.map((time) => {
      if (timeToMinutes(time?.startTime) < minTime)
        minTime = timeToMinutes(time?.startTime);
      if (timeToMinutes(time.endTime) > maxTime)
        maxTime = timeToMinutes(time.endTime);
    });
  });
  // console.log(minTime / 60, maxTime / 60);
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr?.split(":")?.map(Number);
    return hours * 60 + minutes;
  }
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
  const hours = Array.from(Array(24).keys());
  useEffect(() => {
    let container = document.querySelector(".sang-drag-container");

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      startY = e.pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseLeave = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = (x - startX) * 1; // Tăng độ nhạy cảm cho di chuyển ngang
      const walkY = (y - startY) * 1; // Tăng độ nhạy cảm cho di chuyển dọc
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
    };
    if (!container) return;
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up event listeners
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [value, onChange] = useState<Value>(new Date());
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
  const handleChange = (e) => {
    if (e == null) onChange(new Date());
    else onChange(e);
  };
  let paramsId = data.paramsId;
  let name = "";
  let groupPitch = data.groupPitchs;
  groupPitch?.map((item: any) => {
    if (item.id == paramsId) {
      name = item.name;
    }
  });
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-400 w-full h-52 flex justify-center">
        <span className="py-10 text-white font-semibold text-3xl">
          Lịch sân
        </span>
      </div>
      <div className="w-full mt-5 px-20 -translate-y-28">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-primary m-1">
            {name}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {groupPitch?.map((item, index: number) => {
              return (
                <li key={index}>
                  <Link to={`/manager/schedule/${item.id}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="rounded-lg border bg-white border-[#E5E7EB] mb-6"
          style={{ height: "calc(100vh - 116px)" }}
        >
          <div className="px-6 py-4 flex border-[#E5E7EB] bg-[#F9FAFB] rounded-t-lg">
            <div>
              <Form method="POST" className="flex gap-4 items-center">
                <DatePicker
                  onChange={handleChange}
                  value={value}
                  name="dateSearch"
                  clearIcon={false}
                />
              </Form>
              <div
                onClick={() => {
                  document
                    .querySelector(".react-date-picker__calendar-button")
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
          <div className="flex" style={{ height: "calc(100% - 83px)" }}>
            <div className="w-3/4 flex overflow-auto">
              <div className="w-28 shrink-0 pr-2 border-r border-[#E5E7EB] h-fit">
                <div className="px-4 h-12 font-semibold"></div>

                {hours?.map((hour) => {
                  if (hour + 1 > minTime / 60 && hour < minTime / 60)
                    return (
                      <div
                        key={hour}
                        style={{ height: `${(minTime / 60 - hour) * 64}px` }}
                        className="flex items-center justify-end -translate-y-1/2"
                      >
                        {hour % 12 === 0 ? 12 : hour % 12}:
                        {(minTime / 60 - hour) * 60}
                        {hour >= 12 ? " PM" : " AM"}
                      </div>
                    );
                  return hour >= minTime / 60 && hour <= maxTime / 60 ? (
                    <div
                      key={hour}
                      className="h-16 flex items-center justify-end -translate-y-1/2 relative after:absolute after:w-1 after:h-[2px] after:bg-[#b7babe] after:top-full after:left-full after:-translate-x-1/2 after:-translate-y-1/2"
                    >
                      {hour % 12 === 0 ? 12 : hour % 12}
                      {hour >= 12 ? "PM" : "AM"}
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
              <div className="w-full">
                <div className=" overflow-auto flex h-fit min-w-full sang-drag-container">
                  {pitchType?.map((item, index) => {
                    return (
                      <ChildComponent
                        subData={item.pitch}
                        timeSlot={item.timeSlot}
                        minTime={minTime}
                        maxTime={maxTime}
                        value={value}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="overflow-y-auto h-full border-t border-r border-l shadow-xl rounded-md p-4">
                <table className="table">
                  <tbody>
                    {/* row 1 */}
                    {bookingList.map((booking, index: number) => {
                      let now = new Date();
                      now.setHours(now.getHours());
                      let date = new Date(booking?.date);
                      const hoursToAdd = parseInt(
                        booking?.booking_timeSlot.startTime.split(":")[0]
                      );
                      const minutesToAdd = parseInt(
                        booking?.booking_timeSlot.startTime.split(":")[1]
                      );
                      date.setHours(hoursToAdd);
                      date.setMinutes(minutesToAdd);

                      let endDate = new Date(booking?.date);
                      const hoursToAdd1 = parseInt(
                        booking?.booking_timeSlot.endTime.split(":")[0]
                      );
                      const minutesToAdd1 = parseInt(
                        booking?.booking_timeSlot.endTime.split(":")[1]
                      );
                      endDate.setHours(hoursToAdd1);
                      endDate.setMinutes(minutesToAdd1);
                      return (
                        <div
                          key={index}
                          className="border-black/12.5 rounded-t-inherit relative block border-b border-solid py-2 px-0 text-inherit"
                        >
                          <div className="flex items-center justify-between -mx-3">
                            <div className="flex items-center w-auto max-w-full flex-0">
                              <a
                                href="javascript:;"
                                className="inline-flex items-center justify-center w-8 h-8 text-base text-white transition-all duration-200 ease-in-out leading-inherit rounded-xl"
                              >
                                <img
                                  className="w-full h-full object-cover rounded-lg"
                                  src={
                                    booking.booking_user?.avatar
                                      ? booking.booking_user.avatar
                                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                  }
                                  alt="Image placeholder"
                                />
                              </a>
                              <div className="max-w-full px-3 flex-1-0">
                                <h6 className="mb-0">
                                  <div className="font-medium">
                                    {booking.booking_user.name}
                                  </div>
                                </h6>
                                {booking.status == 1 ? (
                                  <span className="py-1 px-2 text-[10px] rounded inline-flex items-center whitespace-nowrap text-center font-bold uppercase leading-none text-emerald-600 bg-emerald-200">
                                    Đặt sân
                                  </span>
                                ) : (
                                  <span className="py-1 px-2 text-[10px] rounded inline-flex items-center whitespace-nowrap text-center font-bold uppercase leading-none text-red-600 bg-red-200">
                                    Huỷ sân
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="w-auto max-w-full px-3 flex-0 text-xs">
                              {booking.status == 1
                                ? timeDifference(booking.createdAt)
                                : timeDifference(booking.updatedAt)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </tbody>
                </table>
                {page == 1 && bookingList.length < 10 ? (
                  ""
                ) : (
                  <div className="w-full text-center">
                    <div className="join mx-auto">
                      <Link
                        to={`?page=${page - 1}`}
                        className="join-item btn"
                        disabled={page == 1 ? true : false}
                      >
                        «
                      </Link>
                      <button className="join-item btn">{page}</button>
                      <Link
                        to={`?page=${parseInt(page) + 1}`}
                        className="join-item btn"
                        disabled={bookingList.length < 10 ? true : false}
                      >
                        »
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function convertTimeToDecimal(timeString) {
  const [hours, minutes] = timeString?.split(":")?.map(Number);
  const decimalTime = hours + minutes / 60;
  return decimalTime;
}
function ChildComponent({ subData, timeSlot, minTime, maxTime, value }) {
  const timeFirst = convertTimeToDecimal(timeSlot[0]?.startTime) - minTime / 60;
  // console.log(timeFirst);
  function dateFormat(date) {
    const dateObject = new Date(date);

    // Trích xuất các thành phần của ngày
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Lấy tháng và thêm "0" nếu tháng < 10
    const day = ("0" + dateObject.getDate()).slice(-2); // Lấy ngày và thêm "0" nếu ngày < 10
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }
  return (
    <>
      {subData?.map((pitch, subIndex) => {
        let bookings = pitch?.booking;
        return (
          <div key={subIndex} className="border-r min-w-40 w-full h-fit">
            <div className="px-4 h-12 flex items-center justify-center font-semibold sticky top-0  bg-white shadow">
              {pitch.name}
            </div>
            <div
              className={`border-t cursor-pointer hover:bg-[#F9FAFB] transition`}
              style={{
                background:
                  "repeating-linear-gradient(-45deg, #fff, #fff 6px, #dbdbdb 0, #dbdbdb 12px)",
                height: `${timeFirst * 64}px`,
              }}
            ></div>
            {timeSlot?.map((item, index, array) => {
              // console.log("first", dateFormat(value));
              let booking = bookings.filter(
                (a) => a.id_timeSlot == item.id && a.date == dateFormat(value)
              );
              const nextItem =
                index < array.length - 1 ? array[index + 1] : null;
              let timeEmpty = 0;
              if (index < array.length - 1)
                timeEmpty =
                  convertTimeToDecimal(nextItem?.startTime) -
                  convertTimeToDecimal(item.endTime);
              else
                timeEmpty = maxTime / 60 - convertTimeToDecimal(item.endTime);
              let time =
                convertTimeToDecimal(item.endTime) -
                convertTimeToDecimal(item?.startTime);
              return (
                <>
                  <div
                    key={index}
                    className={`border-t cursor-pointer flex flex-col items-center justify-center transition ${
                      booking.length > 0 && booking[0]?.status == 1
                        ? "bg-green-100 hover:bg-green-200"
                        : "hover:bg-[#F9FAFB]"
                    }`}
                    style={{
                      height: `${time * 64}px`,
                    }}
                  >
                    {booking.length > 0 && booking[0]?.status == 1 ? (
                      <>
                        <span>{booking[0]?.booking_user?.name}</span>
                        <span>{booking[0]?.booking_user?.phone}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="cursor-pointer hover:bg-[#F9FAFB] transition"
                    style={{
                      background:
                        "repeating-linear-gradient(-45deg, #fff, #fff 6px, #dbdbdb 0, #dbdbdb 12px)",
                      height: `${timeEmpty * 64}px`,
                    }}
                  ></div>
                </>
              );
            })}
            {/* <div className="h-16 border-t cursor-pointer hover:bg-[#F9FAFB] transition"></div> */}
          </div>
        );
      })}
    </>
  );
}
function formatDate(dateString: String) {
  if (!dateString) return `1 tháng 4, 2024`;
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return `${day} ${monthNames[monthIndex]}, ${year}`;
}
function countdown(targetDateStr) {
  const targetDate = new Date(targetDateStr).getTime();

  const countdownElement = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "EXPIRED";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  }

  // Cập nhật đếm ngược mỗi giây
  const interval = setInterval(updateCountdown, 1000);

  // Cập nhật ngay lập tức (tránh phải chờ 1 giây đầu tiên)
  updateCountdown();
}

// Gọi hàm đếm ngược với datetime mục tiêu

function formatDate1(dateString: String) {
  const date = new Date(dateString);

  // Lấy các thành phần ngày giờ
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  // Định dạng các thành phần thành chuỗi mong muốn
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
function timeDifference(previous1) {
  const previous = new Date(previous1);
  previous.setHours(previous.getHours() - 7);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const now = new Date();
  const elapsed = now - previous;

  const days = Math.floor(elapsed / msPerDay);
  const hours = Math.floor((elapsed % msPerDay) / msPerHour);
  const minutes = Math.floor((elapsed % msPerHour) / msPerMinute);

  return `${days ? days + " ngày" : ""} ${
    hours && days == 0 ? hours + " giờ" : ""
  } ${days > 0 || hours > 0 ? "" : minutes + " phút"} trước`;
}
export default schedule;
