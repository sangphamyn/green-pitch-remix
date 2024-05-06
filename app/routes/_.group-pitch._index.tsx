import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getGroupPitchList } from "prisma/pitch";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import { getDistrictById, getWardById } from "~/helper";
import { TbFileSad } from "react-icons/tb";
export let loader: LoaderFunction = async ({ request }) => {
  const groupPitchList = await getGroupPitchList();
  return groupPitchList;
};
export default function Index() {
  const data = useLoaderData<typeof loader>();
  const pitches = data;
  pitches.map((pitch) => {
    let quantity = 0;
    pitch.pitchTypes.map((type) => {
      quantity += type.pitch.length;
    });
    pitch.quantity = quantity;
  });
  return (
    <div>
      <Outlet />
      <div className="w-full container mx-auto mt-5">
        <div className="flex">
          <div className="w-1/5">Filter</div>
          {Object.keys(pitches).length == 0 ? (
            <div className="text-center flex justify-center items-center flex-col h-96">
              <TbFileSad className="w-20 h-20 mb-4" />
              <p className="text-2xl">Hiện chưa có sân nào</p>
            </div>
          ) : (
            <div className=" w-4/5">
              <div className=" p-4">
                <span className="font-semibold">3,269 sân</span> đang hoạt động
                tại
                <span className="font-semibold"> Thái Nguyên</span>
              </div>
              <div className="grid grid-cols-3">
                {pitches.map((pitch, index) => (
                  <Link
                    to={"/group-pitch/" + pitch.id}
                    key={index}
                    className="rounded p-4 gap-5 transition hover:text-primary cursor-pointer sang-grouppitch"
                  >
                    <div className="overflow-hidden inline-flex rounded ">
                      <img
                        src={
                          pitch.images
                            ? pitch.images.split(",")[0]
                            : "/images/san-co-nhan-tao-7-nguoi-dep.jpg"
                        }
                        alt={pitch.name}
                        className="h-[300px] w-full object-cover transition duration-700"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold mb-1">
                        {pitch.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-1 flex gap-1">
                        <PiMapPinLight className="shrink-0 text-lg" />{" "}
                        {getWardById(pitch.id_ward).name},{" "}
                        {getDistrictById(pitch.id_district).name}
                      </p>
                      <p className="text-sm text-gray-600 mb-1 flex gap-1 items-center">
                        <MdOutlineStadium className="text-lg" /> Số sân:{" "}
                        {pitch.quantity}
                      </p>
                      {/* <p className="text-sm mt-4 text-gray-600">
                        {pitch.description}
                      </p> */}
                    </div>{" "}
                    {/* Thêm thông tin khác của sân bóng nếu cần */}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
