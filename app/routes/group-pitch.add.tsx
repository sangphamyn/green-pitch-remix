import React, { useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { FaRegClock, FaRightLong } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import InputComponent from "~/components/InputComponent";

function group_pitch_add() {
  const [activeTab1, setActiveTab1] = useState(true);
  const changeTab1 = () => {
    setActiveTab1(true);
    setActiveTab2(false);
  };
  const [activeTab2, setActiveTab2] = useState(false);
  const changeTab2 = () => {
    setActiveTab1(false);
    setActiveTab2(true);
  };
  return (
    <div className="container mx-auto mt-16 max-w-[1000px]">
      <h1 className="text-2xl font-semibold mb-4 text-center">Tạo Sân Bóng</h1>
      <div className="flex items-center w-full sang-tab">
        <div
          onClick={changeTab1}
          className={`w-1/2 relative cursor-pointer flex justify-center items-center gap-3 py-3 text-xl font-semibold after:duration-200 after:h-[3px] after:top-full after:right-0 after:bg-black after:absolute ${
            activeTab1 ? "" : ""
          }`}
        >
          <LiaEditSolid />
          Thông tin
        </div>
        <div
          onClick={changeTab2}
          className={`w-1/2 relative cursor-pointer flex justify-center py-3 text-xl items-center gap-3 font-semibold  after:duration-200 after:h-[3px] after:top-full after:left-0 after:bg-black after:absolute after:transition-width ${
            activeTab2 ? "after:w-full" : "after:w-0"
          }`}
        >
          <CiCircleList /> Danh sách sân và giá
        </div>
      </div>
    </div>
  );
}

export default group_pitch_add;
