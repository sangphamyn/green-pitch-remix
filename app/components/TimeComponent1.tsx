import React, { useRef, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { LuClock } from "react-icons/lu";
import { SlClock } from "react-icons/sl";
interface Props {
  hourStart: number;
  minuteStart: number;
  hourEnd: number;
  minuteEnd: number;
  name: string;
  removeAction: () => void;
}
const TimeComponent: React.FC<Props> = ({
  hourStart,
  minuteStart,
  hourEnd,
  minuteEnd,
  name,
  removeAction,
}) => {
  const [spanText1, setSpanText1] = useState<string>("05");
  const [spanText2, setSpanText2] = useState<string>("00");
  const inputRefs1 = useRef<HTMLInputElement>(null);
  const inputRefs2 = useRef<HTMLInputElement>(null);
  const handleSelectTime1 = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (inputRefs1.current)
      inputRefs1.current.value = e.currentTarget.textContent || "";
    setSpanText1(e.currentTarget.textContent || "");
  };
  const handleSelectTime2 = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (inputRefs2.current)
      inputRefs2.current.value = e.currentTarget.textContent || "";
    setSpanText2(e.currentTarget.textContent || "");
  };
  return (
    <div className="flex">
      <div className="flex items-center flex-shrink-0 bg-slate-200 w-fit rounded px-3 mr-3">
        <div className="flex items-center relative">
          <LuClock className="flex-shrink-0" />
          <div className="relative">
            <div className="btn bg-transparent border-none hover:bg-transparent shadow-none px-3 hover:text-primary transition gap-1">
              <span ref={inputRefs1}>{spanText1}</span> :{" "}
              <span>{spanText2}</span>
            </div>
            <div className="flex absolute bg-white py-3 shadow-2xl border">
              <div className="max-h-[200px] overflow-y-auto overflow-x-hidden sang-scrollbar border-r">
                <input
                  type="number"
                  className="input input-bordered input-xs w-full"
                  name="sang"
                  ref={inputRefs1}
                />
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  00
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  01
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  02
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  03
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  04
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  05
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  06
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  07
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  08
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  09
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  10
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  11
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  12
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  13
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  14
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  15
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  16
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  17
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  18
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  19
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  20
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  21
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  22
                </div>
                <div
                  onClick={handleSelectTime1}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  23
                </div>
              </div>
              <div>
                <input
                  type="number"
                  className="input input-bordered input-xs w-full"
                  ref={inputRefs2}
                  name="sang"
                />
                <div
                  onClick={handleSelectTime2}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  00
                </div>
                <div
                  onClick={handleSelectTime2}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  15
                </div>
                <div
                  onClick={handleSelectTime2}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  30
                </div>
                <div
                  onClick={handleSelectTime2}
                  className="cursor-pointer px-5 hover:text-primary"
                >
                  45
                </div>
              </div>
            </div>
          </div>
        </div>
        <FaLongArrowAltRight />
        <div className="flex items-center">
          <div className="btn bg-transparent border-none hover:bg-transparent shadow-none px-3 hover:text-primary transition">
            05 : 00
          </div>
        </div>
      </div>
      <input
        type="number"
        placeholder="Giá"
        className="input input-bordered focus:border-primary focus-within:outline-none w-full"
      />
      <button
        className="p-3 hover:text-error transition"
        onClick={removeAction}
      >
        <GoTrash />
      </button>
    </div>
  );
};
export default TimeComponent;
