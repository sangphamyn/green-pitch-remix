import { LoaderFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { getGroupPitchList1 } from "prisma/pitch";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineStadium } from "react-icons/md";
import { PiMapPinLight } from "react-icons/pi";
import { districts, getDistrictById, getWardById, wards } from "~/helper";
import { TbFileSad } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "~/components/Breadcrumb";
import { CiSearch } from "react-icons/ci";
export let loader: LoaderFunction = async ({ request, params }) => {
  let { searchParams } = new URL(request.url);
  let name = searchParams.get("name");
  let district = searchParams.get("district");
  let ward = searchParams.get("ward");
  let pitchType = searchParams.get("pitchType");
  const groupPitchList = await getGroupPitchList1(
    name,
    district,
    ward,
    pitchType
  );
  return { groupPitchList };
};
import { register } from "swiper/element/bundle";
register();
export default function Index() {
  const data = useLoaderData<typeof loader>();
  const pitches = data.groupPitchList;
  const [districtFilter, setDistrict] = useState([]);
  pitches.map((pitch) => {
    let quantity = 0;
    pitch.pitchTypes.map((type) => {
      quantity += type.pitch.length;
    });
    pitch.quantity = quantity;
  });
  function countObjectsWithValueThree(array: Array<Object>, id: number) {
    let count = 0;
    for (const obj of array) {
      if (obj.id_district === id) {
        count++;
      }
    }
    return count;
  }
  const handleChange = (e) => {
    if (e.target.checked)
      setDistrict((prevState) => [...prevState, parseInt(e.target.value)]);
    else
      setDistrict((prevState) =>
        prevState.filter((value) => value !== parseInt(e.target.value))
      );
  };
  const paths = [
    { title: "Trang chủ", url: "/" },
    { title: "Danh sách các sân", url: "/group-pitch" },
  ];
  const [wardsList, setWardsList] = useState(
    wards.filter((item) => item.district == "Thành phố Thái Nguyên")
  );
  const handleChangeDistric = async (e: ChangeEvent<HTMLSelectElement>) => {
    const dt = getDistrictById(e.target.value);
    setWardsList(wards.filter((item) => item.district == dt.name));
  };
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
  }, [districtFilter]);
  return (
    <div>
      <Outlet />
      <Breadcrumb paths={paths} />
      <div className="py-[40px] bg-[#f5f5f5]">
        <div className="container mx-auto">
          <h1 className="text-center text-[30px] mb-4 font-semibold">
            Tìm Kiếm Sân Bóng Phù Hợp
          </h1>
          <div className="px-[180px]">
            <Form
              method="GET"
              className="p-4 bg-white shadow-lg flex justify-between items-center"
            >
              <div className="px-6 w-full">
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Nhập tên sân"
                    className="input input-bordered w-full focus:border-primary focus-within:outline-none rounded"
                    name="name"
                  />
                  <select
                    className="select select-bordered focus:border-primary focus-within:outline-none rounded"
                    onChange={handleChangeDistric}
                    name="district"
                  >
                    <option value="">Huyện/Thành phố</option>
                    {districts.map(
                      (item: { name: string; code: string }, index: number) => {
                        return (
                          <option key={index} value={item?.code}>
                            {item?.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                  <select
                    className="select select-bordered focus:border-primary focus-within:outline-none rounded"
                    name="ward"
                  >
                    <option value="">Phường/Xã</option>
                    {wardsList.map(
                      (item: { name: string; code: string }, index: number) => {
                        return (
                          <option key={index} value={item?.code}>
                            {item?.name}
                          </option>
                        );
                      }
                    )}
                  </select>
                  <select
                    className="select select-bordered focus:border-primary focus-within:outline-none rounded"
                    name="pitchType"
                  >
                    <option value="">Loại sân</option>
                    <option value="Sân 5">Sân 5</option>
                    <option value="Sân 7">Sân 7</option>
                    <option value="Sân 11">Sân 11</option>
                  </select>
                </div>
              </div>
              <button className="btn px-[35px] rounded-sm font-semibold border-transparent hover:text-white transition bg-[#f8d448] hover:bg-[#051036] py-[12px] h-fit">
                <CiSearch className="stroke-[1px] w-[24px] h-[24px]" />
                Tìm kiếm
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-full container mx-auto mt-5">
        <div className="flex">
          <div className="w-1/5 p-4">
            <div>
              <h5 className="font-semibold text-lg">Khu vực</h5>
              <div>
                <div>
                  {districts.map((item, index) => {
                    return (
                      <label
                        key={index}
                        className="label cursor-pointer justify-between"
                      >
                        <div className="flex items-center gap-[10px]">
                          <input
                            type="checkbox"
                            className="checkbox rounded checkbox-xs"
                            onChange={handleChange}
                            value={item.code}
                          />
                          <span className="label-text">{item.name}</span>
                        </div>
                        <div>
                          {countObjectsWithValueThree(
                            pitches,
                            parseInt(item.code)
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {Object.keys(pitches).length == 0 ? (
            <div className="text-center flex justify-center items-center flex-col h-96 w-4/5">
              <TbFileSad className="w-20 h-20 mb-4" />
              <p className="text-2xl">Hiện chưa có sân nào</p>
            </div>
          ) : (
            <div className=" w-4/5">
              <div className=" p-4">
                <span className="font-semibold">
                  {Object.keys(pitches).length} sân
                </span>{" "}
                đang hoạt động tại
                <span className="font-semibold"> Thái Nguyên</span>
              </div>
              <div className="grid grid-cols-3">
                {pitches.map((pitch, index) => {
                  if (
                    districtFilter.length > 0 &&
                    !districtFilter.includes(pitch.id_district)
                  )
                    return;
                  return (
                    <div
                      key={index}
                      className="rounded p-4 gap-5 transition sang-grouppitch"
                    >
                      <div className="overflow-hidden inline-flex rounded w-full">
                        {pitch.images ? (
                          <>
                            <div className="w-full">
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
                                          className="rounded w-full h-[300px] object-cover transition duration-300"
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
                      <div>
                        <Link
                          to={"/group-pitch/" + pitch.id}
                          className="text-lg font-semibold mb-1 inline-block w-full hover:text-primary transition"
                        >
                          {pitch.name}
                        </Link>
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
