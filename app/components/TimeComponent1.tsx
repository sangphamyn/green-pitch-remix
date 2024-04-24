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
  const [spanText1, setSpanText1] = useState<number>(hourStart);
  const [spanText2, setSpanText2] = useState<number>(minuteStart);
  const inputRefs1 = useRef<HTMLInputElement>(null);
  const inputRefs2 = useRef<HTMLInputElement>(null);
  const [spanText3, setSpanText3] = useState<number>(hourEnd);
  const [spanText4, setSpanText4] = useState<number>(minuteEnd);
  const inputRefs3 = useRef<HTMLInputElement>(null);
  const inputRefs4 = useRef<HTMLInputElement>(null);
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
  const handleSelectTime3 = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (inputRefs3.current)
      inputRefs3.current.value = e.currentTarget.textContent || "";
    setSpanText3(e.currentTarget.textContent || "");
  };
  const handleSelectTime4 = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (inputRefs4.current)
      inputRefs4.current.value = e.currentTarget.textContent || "";
    setSpanText4(e.currentTarget.textContent || "");
  };

  return (
    <div className="flex">
      <div className="flex items-center flex-shrink-0 bg-slate-200 w-fit rounded px-3 mr-3">
        <div className="flex items-center relative">
          <LuClock className="flex-shrink-0" />
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-transparent border-none hover:bg-transparent shadow-none px-3 hover:text-primary transition gap-1"
            >
              <span ref={inputRefs1}>
                {spanText1 < 10 ? "0" + spanText1 : spanText1}
              </span>{" "}
              :{" "}
              <span ref={inputRefs2}>
                {spanText2 < 10 ? "0" + spanText2 : spanText2}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu flex-row flex-nowrap p-2 shadow-xl bg-base-100 max-h-[200px] rounded"
            >
              <div className="overflow-y-auto overflow-x-hidden sang-scrollbar border-r">
                <input
                  type="number"
                  className="input input-bordered input-xs w-full hidden"
                  name="timeSlot"
                  defaultValue={hourStart}
                  ref={inputRefs1}
                />
                <div className="text-center font-semibold">Giờ</div>
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
                  className="input input-bordered input-xs w-full hidden"
                  ref={inputRefs2}
                  defaultValue={minuteStart}
                  name="timeSlot"
                />
                <div className="text-center font-semibold">Phút</div>
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
            </ul>
          </div>
        </div>
        <FaLongArrowAltRight />
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-transparent border-none hover:bg-transparent shadow-none px-3 hover:text-primary transition gap-1"
          >
            <span ref={inputRefs3}>
              {spanText3 < 10 ? "0" + spanText3 : spanText3}
            </span>{" "}
            :{" "}
            <span ref={inputRefs4}>
              {spanText4 < 10 ? "0" + spanText4 : spanText4}
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu flex-row flex-nowrap p-2 shadow-xl bg-base-100 max-h-[200px] rounded"
          >
            <div className="overflow-y-auto overflow-x-hidden sang-scrollbar border-r">
              <input
                type="number"
                className="input input-bordered input-xs w-full hidden"
                name="timeSlot"
                defaultValue={hourEnd}
                ref={inputRefs3}
              />
              <div className="text-center font-semibold">Giờ</div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                00
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                01
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                02
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                03
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                04
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                05
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                06
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                07
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                08
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                09
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                10
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                11
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                12
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                13
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                14
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                15
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                16
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                17
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                18
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                19
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                20
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                21
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                22
              </div>
              <div
                onClick={handleSelectTime3}
                className="cursor-pointer px-5 hover:text-primary"
              >
                23
              </div>
            </div>
            <div>
              <input
                type="number"
                className="input input-bordered input-xs w-full hidden"
                ref={inputRefs4}
                defaultValue={minuteEnd}
                name="timeSlot"
              />
              <div className="text-center font-semibold">Phút</div>
              <div
                onClick={handleSelectTime4}
                className="cursor-pointer px-5 hover:text-primary"
              >
                00
              </div>
              <div
                onClick={handleSelectTime4}
                className="cursor-pointer px-5 hover:text-primary"
              >
                15
              </div>
              <div
                onClick={handleSelectTime4}
                className="cursor-pointer px-5 hover:text-primary"
              >
                30
              </div>
              <div
                onClick={handleSelectTime4}
                className="cursor-pointer px-5 hover:text-primary"
              >
                45
              </div>
            </div>
          </ul>
        </div>
      </div>
      <input
        type="number"
        placeholder="Giá"
        name="timePrice"
        className="input input-bordered focus:border-primary focus-within:outline-none w-full"
      />
      <div
        className="p-3 hover:text-error transition cursor-pointer"
        onClick={removeAction}
      >
        <GoTrash />
      </div>
    </div>
  );
};
export default TimeComponent;
