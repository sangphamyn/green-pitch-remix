import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getGroupPitchList } from "prisma/pitch";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import { getDistrictById, getWardById } from "~/helper";

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
        <h1 className="mb-12 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Danh sách các sân
        </h1>
        {Object.keys(pitches).length == 0 ? (
          <div>Rong</div>
        ) : (
          <div className="grid grid-cols-2 gap-10 mt-5">
            {pitches.map((pitch, index) => (
              <Link
                to={"/group-pitch/" + pitch.id}
                key={index}
                className="border rounded p-4 flex gap-5 hover:shadow transition hover:text-primary cursor-pointer"
              >
                <img
                  src={
                    pitch.images
                      ? pitch.images.split(",")[0]
                      : "/images/san-co-nhan-tao-7-nguoi-dep.jpg"
                  }
                  alt={pitch.name}
                  className="mb-2 rounded w-1/2 h-[250px] object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold mb-1">{pitch.name}</h2>
                  <p className="text-sm text-gray-600 mb-1 flex gap-1">
                    <PiMapPinLight className="shrink-0 text-lg" />{" "}
                    {getWardById(pitch.id_ward).name},{" "}
                    {getDistrictById(pitch.id_district).name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1 flex gap-1 items-center">
                    <MdOutlineStadium /> Số sân: {pitch.quantity}
                  </p>
                  <p className="text-sm mt-4 text-gray-600">
                    {pitch.description}
                  </p>
                </div>{" "}
                {/* Thêm thông tin khác của sân bóng nếu cần */}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

