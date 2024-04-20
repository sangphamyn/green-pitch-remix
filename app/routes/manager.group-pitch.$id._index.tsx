import { LoaderFunction } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { getGroupPitchById } from "prisma/pitch";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import {
  IoCarOutline,
  IoFastFoodOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { LuGlassWater } from "react-icons/lu";
import { PiMapPinLight, PiMoneyLight } from "react-icons/pi";
import { getDistrictById, getWardById } from "~/helper";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();
export let loader: LoaderFunction = async ({ params }) => {
  const pitch = await getGroupPitchById(params.id);
  return pitch;
};
function group_pitch_detail() {
  const data = useLoaderData<typeof loader>();
  // console.log(data);
  const pitch = data.groupPitch;
  const services = data.service;
  return (
    <div>
      <div className="join join-vertical lg:join-horizontal">
        <Link
          to={`/manager/group-pitch/${pitch.id}/edit`}
          className="btn btn-primary"
        >
          <CiEdit />
          Sửa
        </Link>
      </div>
      <h1 className="mb-12 text-2xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        {pitch.name}
      </h1>
      <p className="text-sm text-gray-600 mb-1 flex gap-1 justify-center">
        <PiMapPinLight className="shrink-0 text-lg" /> {pitch.address_detail},{" "}
        {getWardById(pitch.id_ward).name},{" "}
        {getDistrictById(pitch.id_district).name}
      </p>
      <div className="grid grid-cols-3 px-20 py-5 gap-6">
        {pitch.images ? (
          <>
            <div>
              <swiper-container
                // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                space-between="10"
                navigation="true"
              >
                {pitch.images.split(",").map((img: string, index: number) => {
                  return (
                    <swiper-slide>
                      <img src={img} />
                    </swiper-slide>
                  );
                })}
              </swiper-container>

              <swiper-container
                class="mySwiper2"
                space-between="10"
                slides-per-view="4"
                free-mode="true"
                watch-slides-progress="true"
              >
                {pitch.images.split(",").map((img: string, index: number) => {
                  return (
                    <swiper-slide>
                      <img src={img} />
                    </swiper-slide>
                  );
                })}
              </swiper-container>
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
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="font-semibold text-xl mb-4">Thông tin sân</h3>
          <div className="flex justify-between mb-1">
            <p>Giờ mở cửa</p>
            <p className="font-semibold">6h-23h</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Số sân thi đấu: </p>
            <p className="font-semibold">4 Sân</p>
          </div>
          <div className="flex justify-between mb-1">
            <p>Giá sân: </p>
            <p className="font-semibold">400.000 đ</p>
          </div>
          <div className="bg-white p-4 rounded mt-4">
            <h3 className="font-semibold text-md mb-4">Dịch vụ</h3>
            <div className="grid grid-cols-2">
              {services.map((service) => {
                return (
                  <div className="flex gap-2 items-center text-sm mb-2">
                    {(() => {
                      switch (service.serviceId) {
                        case 1:
                          return <LuGlassWater />;
                        case 2:
                          return <IoIosWifi />;
                        case 3:
                          return <IoShirtOutline />;
                        case 4:
                          return <IoCarOutline />;
                        case 5:
                          return <IoFastFoodOutline />;
                      }
                    })()}{" "}
                    {service.service.name}
                    {service.price != null ? (
                      <div className="text-xs px-3 flex gap-1 items-center w-fit mb-2 py-[2px] bg-green-200 text-green-800 rounded-full">
                        {service.price == "0" ? "Free" : service.price + " đ"}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.833800499693!2d105.80688402598018!3d21.59240961817967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31352715963c0539%3A0x70920be053375217!2zU8OibiB0aOG7gyB0aGFvIGvDvSB0w7pjIHjDoSwgUXV54bq_dCBUaOG6r25nLCBUaMOgbmggcGjhu5EgVGjDoWkgTmd1ecOqbiwgVGjDoWkgTmd1ecOqbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1711425735941!5m2!1svi!2s"
          width="600"
          height="300"
          //   allowfullscreen=""
          loading="lazy"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="px-20 py-5">
        <h1>Lịch và giá</h1>
        {/* <div>
      <div>
        <div>Sân Loại A (4 sân)</div>
        <div>
          <div className="grid grid-cols-12">
            <div className="grid grid-cols-2">
              <div>0</div>
              <div>
                <span className="-translate-x-1/2">1</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>2</div>
              <div>3</div>
            </div>
            <div className="grid grid-cols-2">
              <div>4</div>
              <div>5</div>
            </div>
            <div className="grid grid-cols-2">
              <div>6</div>
              <div>7</div>
            </div>
            <div className="grid grid-cols-2">
              <div>8</div>
              <div>9</div>
            </div>
            <div className="grid grid-cols-2">
              <div>10</div>
              <div>11</div>
            </div>
            <div className="grid grid-cols-2">
              <div>12</div>
              <div>13</div>
            </div>
            <div className="grid grid-cols-2">
              <div>14</div>
              <div>15</div>
            </div>
            <div className="grid grid-cols-2">
              <div>16</div>
              <div>17</div>
            </div>
            <div className="grid grid-cols-2">
              <div>18</div>
              <div>19</div>
            </div>
            <div className="grid grid-cols-2">
              <div>20</div>
              <div>21</div>
            </div>
            <div className="grid grid-cols-2">
              <div>22</div>
              <div>23</div>
            </div>
          </div>
          <div className="w-full h-2 bg-black relative">
            <div className="w-[6.25%] h-2 bg-green-600 absolute left-[20.83%]"></div>
          </div>
        </div>
      </div>
    </div> */}
        <div>
          <div>
            <div className="flex gap-4">
              <div className="shrink-0">Sân Loại A (4 sân)</div>
              <div className="flex flex-wrap gap-2">
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
                <div className="border rounded-md px-3 py-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <FaRegClock />
                    05:00 - 06:30
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <PiMoneyLight />
                    480.000đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default group_pitch_detail;
