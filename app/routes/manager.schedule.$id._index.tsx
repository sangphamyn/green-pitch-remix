import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getGroupPitchById,
  getPitchTypeListByGroupPitchId,
} from "prisma/pitch";
import React, { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export let loader: LoaderFunction = async ({ params }) => {
  const pitch = await getGroupPitchById(params.id);
  const pitchType = await getPitchTypeListByGroupPitchId(params.id);
  return { pitch, pitchType };
};

function schedule() {
  const data = useLoaderData<typeof loader>();
  const pitchType = data.pitchType;
  // console.log(pitchType);

  let numOfPitch = 0;
  let minTime = 1000;
  let maxTime = 0;
  pitchType.map((item) => {
    numOfPitch += item.pitch.length;
    item.timeSlot.map((time) => {
      if (timeToMinutes(time.startTime) < minTime)
        minTime = timeToMinutes(time.startTime);
      if (timeToMinutes(time.endTime) > maxTime)
        maxTime = timeToMinutes(time.endTime);
    });
  });
  // console.log(minTime / 60, maxTime / 60);
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
  return (
    <div className="w-full mt-5 px-20">
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
              27 tháng 3, 2024
            </time>
            <p className="text-sm text-[#6B7280] mt-1">Thứ tư</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex border rounded-lg shrink-0 border-[#E5E7EB]">
              <button className="btn btn-outline no-animation border-none rounded-none rounded-tl-lg rounded-bl-lg">
                <FaAngleLeft />
              </button>
              <button className="btn btn-outline no-animation border-none rounded-none">
                Hôm nay
              </button>
              <button className="btn btn-outline no-animation border-none rounded-none rounded-tr-lg rounded-br-lg">
                <FaAngleRight />
              </button>
            </div>
            <select className="select select-bordered w-full max-w-xs bg-transparent border-[#E5E7EB]">
              <option>Lịch ngày</option>
              <option>Lịch tuần</option>
              <option>Lịch tháng</option>
            </select>
            <div className="h-3/5 w-1 bg-[#D1D5DB] mx-3"></div>
            <button className="btn btn-primary">Thêm lịch đặt</button>
          </div>
        </div>
        <div className="flex" style={{ height: "calc(100% - 83px)" }}>
          <div className="w-3/4 flex overflow-auto">
            <div className="w-28 shrink-0 pr-2 border-r border-[#E5E7EB] h-fit">
              <div className="px-4 h-12 font-semibold"></div>

              {hours.map((hour) => {
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
              {pitchType.map((item, index) => {
                return (
                  <ChildComponent
                    subData={item.pitch}
                    timeSlot={item.timeSlot}
                    minTime={minTime}
                    maxTime={maxTime}
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
  const [hours, minutes] = timeString.split(":").map(Number);
  const decimalTime = hours + minutes / 60;
  return decimalTime;
}
function ChildComponent({ subData, timeSlot, minTime, maxTime }) {
  const timeFirst = convertTimeToDecimal(timeSlot[0].startTime) - minTime / 60;
  // console.log(timeFirst);
  return (
    <>
      {subData.map((pitch, subIndex) => {
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
            {timeSlot.map((item, index, array) => {
              const nextItem =
                index < array.length - 1 ? array[index + 1] : null;
              let timeEmpty = 0;
              if (index < array.length - 1)
                timeEmpty =
                  convertTimeToDecimal(nextItem.startTime) -
                  convertTimeToDecimal(item.endTime);
              else
                timeEmpty = maxTime / 60 - convertTimeToDecimal(item.endTime);
              let time =
                convertTimeToDecimal(item.endTime) -
                convertTimeToDecimal(item.startTime);
              return (
                <>
                  <div
                    className="border-t cursor-pointer hover:bg-[#F9FAFB] transition"
                    style={{
                      height: `${time * 64}px`,
                    }}
                  ></div>
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
