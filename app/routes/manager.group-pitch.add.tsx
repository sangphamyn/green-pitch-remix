import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { getAllService } from "prisma/pitch";
import React, { ChangeEvent, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { FaRegClock, FaRightLong } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import InputComponent from "~/components/InputComponent";
import TimeComponent from "~/components/TimeComponent";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const services = await getAllService();
  return { services };
};
export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const intent = formData.get("intent");
  console.log(intent);
  if (intent != "submit") return null;

  // console.log(Object.fromEntries(formData.entries()));
  let session = await getSession(request.headers.get("cookie"));
  console.log("groupPitchName  ", formData.get("groupPitchName"));
  console.log("district        ", formData.get("district"));
  console.log("ward            ", formData.get("ward"));
  console.log("address_detail  ", formData.get("address_detail"));
  console.log("address_map     ", formData.get("address_map"));
  console.log("groupPitchDesc  ", formData.get("groupPitchDesc"));
  console.log("services        ", formData.getAll("groupPitchServices"));
  console.log("servicePrices   ", formData.getAll("servicePrices"));
  console.log("author          ", session.get("userId"));
  console.log("pitchName       ", formData.getAll("pitchName"));
  console.log("pitchType       ", formData.getAll("pitchType"));
  console.log("pitchQuantity   ", formData.getAll("pitchQuantity"));
  console.log("pitchDesc       ", formData.getAll("pitchDesc"));
  return null;
}
function groupPitchAdd() {
  const data = useLoaderData<typeof loader>();
  const districts = [
    {
      code: "164",
      name: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "171",
      name: "Huyện Đại Từ",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "167",
      name: "Huyện Định Hóa",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "169",
      name: "Huyện Đồng Hỷ",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "173",
      name: "Huyện Phú Bình",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "168",
      name: "Huyện Phú Lương",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "170",
      name: "Huyện Võ Nhai",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "172",
      name: "Thành phố Phổ Yên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "165",
      name: "Thành phố Sông Công",
      province: "Tỉnh Thái Nguyên",
    },
  ];

  const [wards, setWards] = useState([
    {
      code: "05467",
      name: "Phường Cam Giá",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05659",
      name: "Phường Chùa Hang",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05710",
      name: "Phường Đồng Bẩm",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05458",
      name: "Phường Đồng Quang",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05461",
      name: "Phường Gia Sàng",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05440",
      name: "Phường Hoàng Văn Thụ",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05473",
      name: "Phường Hương Sơn",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05449",
      name: "Phường Phan Đình Phùng",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05470",
      name: "Phường Phú Xá",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05431",
      name: "Phường Quán Triều",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05446",
      name: "Phường Quang Trung",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05434",
      name: "Phường Quang Vinh",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05464",
      name: "Phường Tân Lập",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05482",
      name: "Phường Tân Long",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05479",
      name: "Phường Tân Thành",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05452",
      name: "Phường Tân Thịnh",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05455",
      name: "Phường Thịnh Đán",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05500",
      name: "Phường Tích Lương",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05476",
      name: "Phường Trung Thành",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05443",
      name: "Phường Trưng Vương",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05437",
      name: "Phường Túc Duyên",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05695",
      name: "Xã Cao Ngạn",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05914",
      name: "Xã Đồng Liên",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05713",
      name: "Xã Huống Thượng",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05701",
      name: "Xã Linh Sơn",
      district: "Thành phố Thái Nguyên\t",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05485",
      name: "Xã Phúc Hà",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05494",
      name: "Xã Phúc Trìu",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05488",
      name: "Xã Phúc Xuân",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05491",
      name: "Xã Quyết Thắng",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05653",
      name: "Xã Sơn Cẩm",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05503",
      name: "Xã Tân Cương",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
    {
      code: "05497",
      name: "Xã Thịnh Đức",
      district: "Thành phố Thái Nguyên",
      province: "Tỉnh Thái Nguyên",
    },
  ]);
  const handleChangeDistric = async (e: ChangeEvent<HTMLSelectElement>) => {
    let res = await fetch(
      `https://api.mysupership.vn/v1/partner/areas/commune?district=${e.target.value}`
    );
    const resjson = await res.json();
    setWards(resjson.results);
  };

  const [activeTab1, setActiveTab1] = useState(false);
  const [activeTab2, setActiveTab2] = useState(true);
  const changeTab1 = () => {
    setActiveTab1(true);
    setActiveTab2(false);
  };
  const changeTab2 = () => {
    setActiveTab1(false);
    setActiveTab2(true);
  };
  const [selectedServices, setSelectedServices] = useState([]);
  const serviceList = data.services;
  const [fieldTypes, setFieldTypes] = useState([
    {
      pitchType: 11,
      pitchQuantity: 1,
      pitchDesc: "",
      timeSlots: [],
    },
  ]);
  const addFieldType = () => {
    setFieldTypes([
      ...fieldTypes,
      {
        pitchType: 7,
        pitchQuantity: 3,
        pitchDesc: "",
        timeSlots: [],
      },
    ]);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serviceId = e.target.id;
    const isChecked = e.target.checked;
    // const price =
    //   e.target?.parentElement?.querySelector("input[type=number]")?.value;
    // setSelectedServices((prevState) => ({
    //   ...prevState,
    //   [serviceId]: isChecked,
    // }));
    setSelectedServices((prevState) => ({
      ...prevState,
      [serviceId]: { status: isChecked },
    }));
    console.log(selectedServices);
  };
  return (
    <div className="container mx-auto my-12 max-w-[1000px]">
      <h1 className="text-2xl font-semibold mb-4 text-center">Tạo Sân Bóng</h1>
      <div className="flex items-center w-full sang-tab">
        <div
          onClick={changeTab1}
          className={`w-auto px-8 relative cursor-pointer flex justify-center items-center gap-3 py-3 text-xl font-semibold rounded-t-lg border-b-0 ${
            activeTab1
              ? "border after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-[-1px] bg-white"
              : ""
          }`}
        >
          <LiaEditSolid />
          Thông tin
        </div>
        <div
          onClick={changeTab2}
          className={`w-auto px-8 relative cursor-pointer flex justify-center py-3 text-xl items-center gap-3 font-semibold rounded-t-lg border-b-0 ${
            activeTab2
              ? "border after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-[-1px] bg-white"
              : ""
          }`}
        >
          <CiCircleList /> Danh sách sân và giá
        </div>
      </div>
      <Form method="POST">
        <div
          className={`sang-tab-content border bg-white rounded-b-lg px-14 py-6 transition top-0 left-0 right-0 ${
            activeTab1
              ? "visible opacity-100  duration-300"
              : "hidden opacity-0"
          }`}
        >
          <label className="form-control w-full mb-1">
            <div className="label pb-1">
              <span className="label-text font-semibold">Tên sân</span>
            </div>
            <input
              type="text"
              name="groupPitchName"
              placeholder="Nhập tên cụm sân"
              defaultValue="Sân thanh niên"
              className="input input-bordered input-primary w-full rounded"
            />
          </label>
          <div className="flex gap-4">
            <label className="form-control">
              <div className="label pb-1">
                <span className="label-text font-semibold">
                  Thành phố/huyện
                </span>
              </div>
              <select
                className="select select-bordered select-primary rounded"
                onChange={handleChangeDistric}
                name="district"
              >
                {districts.map(
                  (item: { name: string; code: string }, index: number) => {
                    return (
                      <option key={index} defaultValue={item?.code}>
                        {item?.name}
                      </option>
                    );
                  }
                )}
              </select>
            </label>
            <label className="form-control">
              <div className="label pb-1">
                <span className="label-text font-semibold">Phường/Xã</span>
              </div>
              <select
                className="select select-bordered select-primary rounded"
                name="ward"
              >
                {wards.map(
                  (item: { name: string; code: string }, index: number) => {
                    return (
                      <option key={index} defaultValue={item?.code}>
                        {item?.name}
                      </option>
                    );
                  }
                )}
              </select>
            </label>
            <label className="form-control w-full mb-1">
              <div className="label pb-1">
                <span className="label-text font-semibold">
                  Địa chỉ chi tiết
                </span>
              </div>
              <input
                type="text"
                placeholder="Nhập địa chỉ chi tiết, ngõ, đường, mô tả,..."
                className="input input-bordered input-primary w-full rounded"
                name="address_detail"
                defaultValue="Đê nông lâm đi vào 100m"
              />
            </label>
          </div>
          <label className="form-control w-full mb-1">
            <div className="label pb-1">
              <span className="label-text font-semibold">Link google map</span>
            </div>
            <input
              type="text"
              placeholder="Nhập link google map"
              className="input input-bordered input-primary w-full rounded"
              name="address_map"
              defaultValue="Map link"
            />
          </label>
          <label className="form-control">
            <div className="label pb-1">
              <span className="label-text font-semibold">Mô tả</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 textarea-primary rounded"
              placeholder="Các thông tin cơ bản"
              defaultValue="Sân đẹp mới xây dựng"
              name="groupPitchDesc"
            ></textarea>
          </label>
          <div className="label pb-1">
            <span className="label-text font-semibold">Dịch vụ</span>
          </div>
          <div className="grid grid-cols-2">
            {serviceList.map(
              (service: { id: number; name: string }, index: number) => (
                <div className="form-control" key={index}>
                  <label className="label cursor-pointer justify-start gap-4 items-center pr-10">
                    <input
                      type="checkbox"
                      name="groupPitchServices"
                      id={"service_" + service.id}
                      defaultValue={service.id}
                      onChange={handleCheckboxChange}
                      className="checkbox checkbox-primary rounded"
                    />
                    <span className="label-text w-28">{service.name}</span>
                    {selectedServices &&
                    selectedServices["service_" + service.id]?.status ? (
                      <div className="div">
                        <input
                          type="number"
                          id="priceService"
                          // value={priceService}
                          // onChange={handleServicePriceChange}
                          placeholder="Giá"
                          name="servicePrices"
                          className="input-xs input input-bordered rounded"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="flex items-center justify-center mt-8">
            <button
              className="btn btn-primary px-10 rounded-full w-full"
              // onClick={changeTab2}
            >
              Thêm danh sách sân và giá
            </button>
          </div>
        </div>
        <div
          className={`sang-tab-content bg-white border rounded px-14 py-6  transition top-0 left-0 right-0 ${
            activeTab2
              ? "visible opacity-100  duration-300"
              : "hidden opacity-0"
          }`}
        >
          <div className="mb-8">
            {fieldTypes.map((field, index) => (
              <div
                key={index}
                className="mb-2 border px-10 py-8 rounded relative"
              >
                <div className="flex justify-between gap-4 mb-2">
                  <label className="form-control mb-1 w-full">
                    <div className="label pb-1">
                      <span className="label-text font-semibold">Tên sân</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập tên sân"
                      name="pitchName"
                      id="pitchName"
                      className="input input-bordered input-primary w-full rounded"
                    />
                  </label>
                  <label className="form-control">
                    <div className="label pb-1">
                      <span className="label-text font-semibold">Loại sân</span>
                    </div>
                    <select
                      className="select select-bordered select-primary rounded"
                      name="pitchType"
                      defaultValue={field.pitchType}
                    >
                      <option defaultValue="5">Sân 5</option>
                      <option defaultValue="7">Sân 7</option>
                      <option defaultValue="11">Sân 11</option>
                    </select>
                  </label>
                  <label className="form-control mb-1">
                    <div className="label pb-1">
                      <span className="label-text font-semibold">Số lượng</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Số sân"
                      name="pitchQuantity"
                      className="input input-bordered input-primary w-full rounded"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label pb-1">
                      <span className="label-text font-semibold">Mô tả</span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered textarea-primary h-1 rounded"
                      placeholder="Các thông tin cơ bản"
                      name="pitchDesc"
                    ></textarea>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {/* <TimeComponent
                    hourStart={5}
                    minuteStart={0}
                    hourEnd={6}
                    minuteEnd={30}
                  />
                  <TimeComponent
                    hourStart={5}
                    minuteStart={0}
                    hourEnd={6}
                    minuteEnd={30}
                  />
                  <TimeComponent
                    hourStart={5}
                    minuteStart={0}
                    hourEnd={6}
                    minuteEnd={30}
                  /> */}
                </div>
              </div>
            ))}
            <button
              className="flex gap-3 items-center bg-green-500 px-5 py-2 rounded text-white"
              onClick={addFieldType}
              value="nothing"
              name="intent"
            >
              Thêm Loại Sân
              <GoPlusCircle />
            </button>
          </div>
          <div className="flex items-center justify-center mt-8">
            <button
              className="btn btn-primary px-10 rounded-full w-full"
              value="submit"
              name="intent"
            >
              Tạo
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default groupPitchAdd;
