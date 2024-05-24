import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  getGroupPitchList,
  getPitchList,
  getUserList,
  setGroupPitchStatus,
} from "prisma/pitch";
import React, { useEffect, useRef } from "react";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineRoomService, MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import { getDistrictById, getWardById } from "~/helper";
import { register } from "swiper/element/bundle";
import { IoIosFootball, IoIosWifi } from "react-icons/io";
import { LuGlassWater } from "react-icons/lu";
import {
  IoCarOutline,
  IoFastFoodOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { LiaShoePrintsSolid } from "react-icons/lia";
register();
export let loader: LoaderFunction = async ({ request }) => {
  const userList = await getUserList(); // Lấy danh sách tất cả người dùng đã đăng ký
  const groupPitchList = await getGroupPitchList(); // Lấy danh sách các sân đã được duyệt
  const pitchList = await getPitchList();
  return { userList, groupPitchList, pitchList };
};

export async function action({ params, request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const grouppitchId = formData.get("grouppitchId");
  const action = formData.get("action");

  const a = await setGroupPitchStatus(parseInt(grouppitchId), parseInt(action));
  return null;
}
function AdminHome() {
  const data = useLoaderData<typeof loader>();
  const userList = data.userList;
  const groupPitchList = data.groupPitchList;
  const pitchList = data.pitchList;

  groupPitchList.map((pitch: any) => {
    let quantity = 0;
    let pitchtype = [];
    pitch.pitchTypes.map((type: any) => {
      quantity += type.pitch.length;
      if (!pitchtype.includes(type.type)) {
        pitchtype.push(type.type);
      }
    });
    pitch.quantity = quantity;
    pitch.type = pitchtype;
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
  }, [data]);
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* <Breadcrumb paths={paths} /> */}
      <div className="bg-green-500 w-full h-52 flex justify-center shadow-lg shadow-green-200">
        <span className="py-10 text-white font-semibold text-3xl">
          Danh sách sân
        </span>
      </div>
      <div className="mx-auto my-5 px-10 -translate-y-20">
        <div className="flex">
          <div className="w-3/4 mx-auto px-3 mb-6 bg-white rounded-md shadow-md">
            <div>
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
                <h5 className="mb-0 capitalize dark:text-white">
                  Danh sách sân
                </h5>
              </div>
              <div className="flex-auto p-6 pt-0">
                <ul className="flex flex-col pl-0 mb-0 rounded-none">
                  {groupPitchList.map((grouppitch: any, index: number) => (
                    <div
                      key={index}
                      className="rounded py-5 gap-5 transition sang-grouppitch flex border-b"
                    >
                      <div className="overflow-hidden inline-flex rounded shrink-0">
                        {grouppitch.images ? (
                          <>
                            <div className="w-[200px]">
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
                                {grouppitch.images
                                  .split(",")
                                  .map((img: string, index: number) => {
                                    return (
                                      <swiper-slide key={index}>
                                        <img
                                          src={img}
                                          className="rounded w-[200px] h-[200px] object-cover transition duration-300"
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
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <Link
                            to={"/group-pitch/" + grouppitch.id}
                            className="text-lg font-semibold mb-1 inline-block w-full hover:text-primary transition"
                          >
                            {grouppitch.name}
                          </Link>
                          <p className="text-sm text-gray-600 mb-1 flex gap-1">
                            <PiMapPinLight className="shrink-0 text-lg" />{" "}
                            {getWardById(grouppitch.id_ward).name},{" "}
                            {getDistrictById(grouppitch.id_district).name}
                          </p>
                          <p className="text-sm text-gray-600 mb-1 flex gap-1 items-center">
                            <MdOutlineStadium className="text-lg" /> Số sân:{" "}
                            {grouppitch.quantity}
                          </p>
                          <p className="text-sm mb-1 flex gap-1 items-center">
                            {grouppitch.type.map((item: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="text-xs px-4 w-fit flex gap-1 items-center py-1 border  rounded-full"
                                >
                                  {item}
                                </div>
                              );
                            })}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {grouppitch.servicesInGroupPitch?.map(
                            (item: any, index: number) => {
                              let service = item.service;
                              return (
                                <div className="text-xs px-4 w-fit flex gap-1 items-center py-1 border rounded-full">
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
                            }
                          )}
                        </div>
                        {/* <p className="text-sm mt-4 text-gray-600">
                      {pitch.description}
                    </p> */}
                      </div>
                      <div className="flex  flex-col items-end justify-between w-full">
                        <div>
                          {grouppitch.status == 1 ? (
                            <span className="text-sm px-5 w-fit mb-2 py-2 bg-orange-200 text-orange-800 rounded-full">
                              Chưa duyệt
                            </span>
                          ) : grouppitch.status == 2 ? (
                            <span className="text-sm px-5 w-fit mb-2 py-2 bg-green-200 text-green-800 rounded-full">
                              Đang hoạt động
                            </span>
                          ) : grouppitch.status == 3 ? (
                            <span className="text-sm px-5 w-fit mb-2 py-2 bg-orange-200 text-orange-800 rounded-full">
                              Chủ sân bị khóa
                            </span>
                          ) : (
                            <span className="text-sm px-5 w-fit mb-2 py-2 bg-red-200 text-red-800 rounded-full">
                              Khoá
                            </span>
                          )}
                        </div>
                        <Form
                          method="POST"
                          className="flex items-end justify-end w-full"
                        >
                          <input
                            type="hidden"
                            name="grouppitchId"
                            value={grouppitch.id}
                          />
                          {grouppitch.status == 1 ? (
                            <button
                              name="action"
                              value={1}
                              className="font-bold leading-normal text-center w-fit text-nowrap cursor-pointer select-none border border-solid border-blue-500 bg-blue-500 rounded-lg text-white transition-all ease-in tracking-tight-rem shadow-none px-8 py-3 text-xs hover:opacity-75 active:hover:opacity-75"
                            >
                              Duyệt
                            </button>
                          ) : grouppitch.status == 2 ? (
                            <button
                              name="action"
                              value={2}
                              className="font-bold leading-normal text-center w-fit text-nowrap cursor-pointer select-none border border-solid border-blue-500 bg-blue-500 rounded-lg text-white transition-all ease-in tracking-tight-rem shadow-none px-8 py-3 text-xs hover:opacity-75 active:hover:opacity-75"
                            >
                              Khóa
                            </button>
                          ) : grouppitch.status == 0 ? (
                            <button
                              name="action"
                              value={0}
                              className="font-bold leading-normal text-center w-fit text-nowrap cursor-pointer select-none border border-solid border-blue-500 bg-blue-500 rounded-lg text-white transition-all ease-in tracking-tight-rem shadow-none px-8 py-3 text-xs hover:opacity-75 active:hover:opacity-75"
                            >
                              Mở khóa
                            </button>
                          ) : (
                            ""
                          )}
                        </Form>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

function status(status: any) {
  switch (status) {
    case 1:
      return (
        <span className="py-1 px-2 text-[10px] rounded inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-orange-600 bg-orange-200">
          Chưa duyệt
        </span>
      );
      break;
    case 2:
      return (
        <span className="py-1 px-2 text-[10px] rounded inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-emerald-600 bg-emerald-200">
          Đã duyệt
        </span>
      );
      break;
    case 0:
      return (
        <span className="py-1 px-2 text-[10px] rounded inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-600 bg-red-200">
          Từ chối/Khóa
        </span>
      );
      break;
    default:
      return <div>Sang</div>;
  }
}
