import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getGroupPitchByOwnerId } from "prisma/pitch";
import React, { useEffect, useRef } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineRoomService, MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import { getDistrictById, getWardById } from "~/helper";
import { getSession } from "~/session.server";
import { TbFileSad } from "react-icons/tb";
import { IoIosFootball, IoIosWifi } from "react-icons/io";
import { LuGlassWater } from "react-icons/lu";
import {
  IoAddCircleOutline,
  IoCarOutline,
  IoFastFoodOutline,
  IoShirtOutline,
} from "react-icons/io5"; // import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import { LiaShoePrintsSolid } from "react-icons/lia";
import Breadcrumb from "~/components/Breadcrumb";
// register Swiper custom elements

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (Object.keys(session.data).length == 0) {
    return redirect("/login");
  }
  const userId = session.data.userId || "";
  const groupPitchList = await getGroupPitchByOwnerId(userId);
  return groupPitchList;
};
register();
function group_pitch() {
  const data = useLoaderData<typeof loader>();
  const pitches = data;
  pitches.map((pitch: any) => {
    let quantity = 0;
    pitch.pitchTypes.map((type: any) => {
      quantity += type.pitch.length;
    });
    pitch.quantity = quantity;
  });

  const itemRefs = useRef([]);
  const swiperElRef = useRef(null);
  useEffect(() => {
    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const params = {
          injectStyles: [
            `
            .swiper-pagination {
              bottom: 0 !important;
            }
            .swiper-pagination-bullet {
              background-color: hsla(0, 0%, 100%, 0.7);
              transform: scale(0.75);
              opacity: 0.5;
              transition: 0.2s;
            }
            .swiper:hover .swiper-pagination-bullet {
              opacity: 1;
            }
            .swiper-pagination-bullet-active {
              transform: scale(1);
              background-color: #fff;
              opacity: 1;
            }
            .swiper-button-prev, .swiper-button-next {
              width: 30px;
              height: 30px;
              background: #fff;
              border-radius: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: 0.2s;
              opacity: 0;
            }
            .swiper-button-prev svg, .swiper-button-next svg {
              width: 10px;
              height: 10px;
            }
            .swiper-button-disabled {
              opacity: 0 !important;
            }
            .swiper:hover .swiper-button-prev, .swiper:hover .swiper-button-next {
              opacity: 1;
            }
            .swiper:hover .swiper-button-disabled {
              opacity: 0.35 !important;
            }
          `,
          ],
        };

        Object.assign(ref, params);
        ref.initialize();
      }
    });
  }, []);
  const paths = [
    { title: "Trang chủ", url: "/manager" },
    { title: "Danh sách các cụm sân", url: "/manager/group-pitch" },
  ];
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Breadcrumb paths={paths} /> */}
      <div className="bg-blue-500 w-full h-52 flex justify-center shadow-lg shadow-blue-200">
        <span className="py-10 text-white font-semibold text-3xl">
          Danh sách các cụm sân
        </span>
      </div>
      <div className="container mx-auto mt-3 -translate-y-28">
        <div className="w-full container mx-auto mt-5">
          <h1 className="mb-12 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"></h1>
          {Object.keys(pitches).length == 0 ? (
            <div className="text-center flex justify-center items-center flex-col h-96 bg-white">
              <TbFileSad className="w-20 h-20 mb-4" />
              <p className="text-2xl">Hiện chưa có sân nào</p>
              <Link
                to="/manager/group-pitch/add"
                className="shadow flex justify-center items-center gap-2 hover:bg-green-100 transition bg-white py-10 px-12 mt-4"
              >
                <IoAddCircleOutline className="text-2xl" />
                Thêm sân mới
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-10 mt-5">
              {pitches.map((pitch: any, index: number) => (
                <div
                  key={index}
                  className=" rounded p-4 flex gap-5 shadow transition bg-white"
                >
                  {/* <img
                  src={
                    pitch.images
                      ? pitch.images.split(",")[0]
                      : "/images/san-co-nhan-tao-7-nguoi-dep.jpg"
                  }
                  alt={pitch.name}
                  className="rounded w-[180px] h-[140px] object-cover"
                /> */}
                  {pitch.images ? (
                    <>
                      <div className="w-[180px]">
                        <swiper-container
                          init="false"
                          ref={(el) => (itemRefs.current[index] = el)}
                          // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                          class="mySwiper"
                          thumbs-swiper=".mySwiper2"
                          space-between="10"
                          pagination="true"
                          navigation="true"
                        >
                          {pitch.images
                            .split(",")
                            .map((img: string, index: number) => {
                              return (
                                <swiper-slide key={index}>
                                  <img
                                    src={img}
                                    className="rounded w-[200px] h-[160px] object-cover"
                                  />
                                </swiper-slide>
                              );
                            })}
                        </swiper-container>

                        {/* <swiper-container
                        class="mySwiper2"
                        slides-per-view="3"
                        free-mode="true"
                        watch-slides-progress="true"
                      >
                        {pitch.images.split(",").map((img: string, index: number) => {
                          return (
                            <swiper-slide>
                              <img src={img} className="h-[100px] w-full" />
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
                  <div>
                    <div
                      className={`text-sm px-4 w-fit mb-2 py-1 ${
                        pitch.status == 2
                          ? "bg-green-200 text-green-800"
                          : pitch.status == 0
                          ? "bg-red-200 text-red-800"
                          : "bg-orange-200 text-orange-800"
                      } rounded-full`}
                    >
                      {pitch.status == 2
                        ? "Đã duyệt"
                        : pitch.status == 0 || pitch.status == 3
                        ? "Khóa"
                        : "Chưa duyệt"}
                    </div>
                    <Link
                      to={"/manager/group-pitch/" + pitch.id}
                      className="text-lg font-medium mb-3 hover:text-primary transition inline-block w-full"
                    >
                      {pitch.name}
                    </Link>
                    <p className="text-sm text-gray-600 mb-1 flex gap-1">
                      <PiMapPinLight className="shrink-0 text-lg" />{" "}
                      {getWardById(pitch.id_ward)?.name},{" "}
                      {getDistrictById(pitch.id_district)?.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-1 flex gap-1 items-center">
                      <MdOutlineStadium /> Số sân: {pitch.quantity}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {pitch.services?.map((service: any, index: number) => {
                        return (
                          <div className="text-xs px-4 w-fit flex gap-1 items-center py-1 border text-gray-700 rounded-full">
                            {(() => {
                              switch (service.id) {
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
                            {service.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>{" "}
                  {/* Thêm thông tin khác của sân bóng nếu cần */}
                </div>
              ))}
              <Link
                to="/manager/group-pitch/add"
                className="shadow flex justify-center items-center gap-2 hover:bg-green-100 transition bg-white py-16"
              >
                <IoAddCircleOutline className="text-2xl" />
                Thêm sân mới
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default group_pitch;
