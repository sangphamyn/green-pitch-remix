import React from "react";
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
  removeAction: ()=>void;
}
const TimeComponent: React.FC<Props> = ({
  hourStart,
  minuteStart,
  hourEnd,
  minuteEnd,
  name,
  removeAction
}) => {
  return (
    <div className="flex">
      <div className="flex items-center bg-slate-200 w-fit rounded px-3 mr-3">
        <div className="flex items-center">
          <LuClock />
          <select
            className="pl-2 pr-1 py-2 outline-none appearance-none bg-transparent cursor-pointer hover:text-green-700 transition"
            value={hourStart}
            name={name}
          >
            <option value="0">00</option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>
          <span className="pb-[1px]">:</span>
          <select
            className="pl-1 pr-2 py-2 outline-none appearance-none bg-transparent cursor-pointer hover:text-green-700 transition"
            value={minuteStart}
            name={name}
          >
            <option value="0">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
        <FaLongArrowAltRight />
        <div className="flex items-center">
          <select
            className="pl-2 pr-1 py-2 outline-none appearance-none bg-transparent cursor-pointer hover:text-green-700 transition"
            value={hourEnd}
            name={name}
          >
            <option value="0">00</option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
          </select>
          <span className="pb-[1px]">:</span>
          <select
            className="pl-1 pr-2 py-2 outline-none appearance-none bg-transparent cursor-pointer hover:text-green-700 transition"
            value={minuteEnd}
            name={name}
          >
            <option value="0">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
      </div>
      <input
        type="number"
        placeholder="Giá"
        className="input input-bordered input-primary w-full"
      />
      <button className="p-3 hover:text-error transition" onClick={removeAction}>
        <GoTrash />
      </button>
    </div>
  );
};
export default TimeComponent;
