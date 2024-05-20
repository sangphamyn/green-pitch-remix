import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
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
export let loader: LoaderFunction = async ({ params, request }) => {
  const pitchType = await getPitchTypeListByGroupPitchId(params.id ?? 0);
  let groupPitchs;
  let idFirst;
  const paramsId = params.id;
  let session = await getSession(request.headers.get("cookie"));
  if (session.data.userId) {
    groupPitchs = await getGroupPitchByOwnerId(session.data.userId);
    groupPitchs?.map((item) => {
      if (item.status == 2)
        // Da duyet
        idFirst = item.id;
    });
  }
  return { pitchType, groupPitchs, idFirst, paramsId };
};

function schedule() {
  const data = useLoaderData<typeof loader>();
  const pitchType = data.pitchType;

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
    <div className="w-full mt-5 px-20">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-primary m-1">
          {name}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {groupPitch?.map((item) => {
            return (
              <li>
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
        <div className="px-6 py-4 flex justify-between border-b border-[#E5E7EB] bg-[#F9FAFB] rounded-t-lg">
          <div>
            <time
              dateTime="2022-01-22"
              className="text-[#111827] font-semibold"
            >
              {day} tháng {month}, {year}
            </time>
            <p className="text-sm text-[#6B7280] mt-1">{dayOfWeek}</p>
          </div>
          <Form method="POST" className="flex gap-4 items-center">
            <DatePicker
              onChange={handleChange}
              value={value}
              name="dateSearch"
              clearIcon={false}
            />
          </Form>
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
            <div className=" overflow-auto flex h-fit  sang-drag-container">
              {pitchType?.map((item, index) => {
                return (
                  <ChildComponent
                    subData={item.pitch}
                    timeSlot={item.timeSlot}
                    minTime={minTime}
                    maxTime={maxTime}
                    value={value}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-1/4"></div>
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
        console.log(bookings);
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
                    className="border-t cursor-pointer hover:bg-[#F9FAFB] transition"
                    style={{
                      height: `${time * 64}px`,
                    }}
                  >
                    {booking.length > 0
                      ? booking[0]?.booking_user?.name +
                        " - " +
                        booking[0]?.booking_user?.phone
                      : ""}
                  </div>
                  <div
                    className="border-t cursor-pointer hover:bg-[#F9FAFB] transition"
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
export default schedule;
