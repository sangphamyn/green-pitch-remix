import {
  ActionFunctionArgs,
  LoaderFunction,
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  UploadHandler,
  UploadHandlerPart,
  MemoryUploadHandlerFilterArgs,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  createGroupPitch,
  createPitch,
  createPitchType,
  createTimeSlot,
  getAllService,
} from "prisma/pitch";
import React, { ChangeEvent, useState } from "react";
import { CiCircleList, CiImageOn } from "react-icons/ci";
import { GoPlusCircle, GoTrash } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { LuImagePlus } from "react-icons/lu";
import Breadcrumb from "~/components/Breadcrumb";
import TimeComponent from "~/components/TimeComponent1";
import { CreateGroupPitch } from "~/enum/pitch.enum";
import { districts, getDistrictById, wards } from "~/helper";
import { getSession } from "~/session.server";
import { uploadImage } from "~/utils/utils.server";

export let loader: LoaderFunction = async ({ request }) => {
  const services = await getAllService();
  return { services };
};
export async function action({ request }: ActionFunctionArgs) {
  const copy = request.clone().formData();
  const img = (await copy).get("pitchImages");
  let message: { [key: string]: string } = {};
  const groupPitchName = (await copy).get("groupPitchName");
  if (!groupPitchName) message["groupPitchName"] = "Cần điền tên cụm sân";
  if (img.size == 0) message["pitchImages"] = "Cần ảnh sân";

  const pitchName = (await copy).getAll("pitchName");
  if (pitchName.includes("")) message["pitchName"] = "Thiếu tên sân";
  const pitchType = (await copy).getAll("pitchType");
  const pitchQuantity = (await copy).getAll("pitchQuantity");
  if (pitchQuantity.includes(""))
    message["pitchQuantity"] = "Thiếu số lượng sân";
  const pitchDesc = (await copy).getAll("pitchDesc");
  const timeSlot = (await copy).getAll("timeSlot");
  const numTimeSlot = (await copy).getAll("numTimeSlot");
  if (timeSlot.includes("")) message["timeSlot"] = "Thiếu thời gian";
  const timePrice = (await copy).getAll("timePrice");
  if (timePrice.includes("")) message["timePrice"] = "Thiếu giá sân";
  if (Object.keys(message).length > 0) {
    return json({
      status: "error",
      message: message,
    });
  }
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "pitchImages") {
        return undefined;
      }
      const uploadedImage = await uploadImage(data);
      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const images = formData.getAll("pitchImages");
  let session = await getSession(request.headers.get("cookie"));
  const district = formData.get("district");
  const ward = formData.get("ward");
  const address_detail = formData.get("address_detail");
  const address_map = formData.get("address_map") || "";
  const groupPitchDesc = formData.get("groupPitchDesc");
  const services = formData.getAll("groupPitchServices");
  const servicePrices = formData.getAll("servicePrices");
  const owner = session.get("userId");
  const pitchImages = formData.getAll("pitchImages");

  // let check = true;
  // console.log("pitchName", pitchName);
  // if (pitchName.includes("")) check = false;
  // console.log("pitchType", pitchType);
  // if (pitchType.includes("")) check = false;
  // console.log("pitchQuantity", pitchQuantity);
  // if (pitchQuantity.includes("")) check = false;
  // console.log("pitchDesc", pitchDesc);
  // console.log("timeSlot", timeSlot);
  // if (timeSlot.includes("")) check = false;
  // console.log("timePrice", timePrice);
  // if (timePrice.includes("")) check = false;

  // if (!check) {
  //   message["pitch"] = "Thiếu thông tin sân";
  //   return json({
  //     status: "error",
  //     message: message,
  //   });
  // }
  let data: CreateGroupPitch | undefined;
  if (district !== null && ward !== null && owner !== undefined) {
    data = {
      name: groupPitchName as string,
      id_district: parseInt(district.toString()),
      id_ward: parseInt(ward.toString()),
      address_detail: address_detail as string,
      map: address_map as string,
      description: groupPitchDesc as string,
      ownerId: parseInt(owner.toString()),
      images: images.toString(),
    };
  }
  if (data !== undefined) {
    const newGroupPitch = await createGroupPitch(data, services, servicePrices);
    if (newGroupPitch.id) {
      const numOfPitchType = pitchName.length;
      let num = 0;
      for (let i = 0; i < numOfPitchType; i++) {
        let dataPitchType = {
          name: pitchName[i].toString(),
          type: pitchType[i].toString(),
          id_groupPitch: newGroupPitch.id,
          description: pitchDesc[i].toString(),
        };
        let newPitchType = await createPitchType(
          dataPitchType,
          parseInt(pitchQuantity[i].toString())
        );
        for (let j = 0; j < parseInt(numTimeSlot[i].toString()); j++) {
          await createTimeSlot(
            newPitchType.id,
            timeSlot[(num + j) * 4 + 0],
            timeSlot[(num + j) * 4 + 1],
            timeSlot[(num + j) * 4 + 2],
            timeSlot[(num + j) * 4 + 3],
            parseFloat(timePrice[num + j].toString())
          );
        }
        num += parseInt(numTimeSlot[i].toString());
      }
      return redirect("/manager/group-pitch");
    }
  }
  return "success";
}
function groupPitchAdd() {
  const data = useLoaderData<typeof loader>();
  let actionData = useActionData<{ message: Record<string, any> }>();
  const [activeTab1, setActiveTab1] = useState(1);
  const [activeTab2, setActiveTab2] = useState(0);
  const changeTab1 = () => {
    setActiveTab1(1);
    setActiveTab2(0);
  };
  const changeTab2 = () => {
    setActiveTab1(0);
    setActiveTab2(1);
  };

  const [wardsList, setWardsList] = useState(
    wards.filter((item) => item.district == "Thành phố Thái Nguyên")
  );
  const handleChangeDistric = async (e: ChangeEvent<HTMLSelectElement>) => {
    const dt = getDistrictById(e.target.value);
    setWardsList(wards.filter((item) => item.district == dt.name));
  };

  const [selectedServices, setSelectedServices] = useState<{
    [key: number]: { status: boolean };
  }>();
  const serviceList = data.services;
  const [fieldTypes, setFieldTypes] = useState<
    {
      pitchName: string;
      pitchType: string;
      pitchQuantity: number;
      pitchDesc: string;
      timeSlots: Array<number>;
    }[]
  >([
    {
      pitchName: "Sangg",
      pitchType: "Sân 5",
      pitchQuantity: 1,
      pitchDesc: "Sanggg tả",
      timeSlots: [],
    },
  ]);
  const addFieldType = () => {
    setFieldTypes([
      ...fieldTypes,
      {
        pitchName: "Sơnn",
        pitchType: "Sân 7",
        pitchQuantity: 3,
        pitchDesc: "Sơn tả",
        timeSlots: [],
      },
    ]);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const serviceId = e.target.id.toString().replace("service_", "");
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
  };
  const addTimeSlot = (index: number) => {
    const newFieldTypes = [...fieldTypes];
    var a = 5;
    if (newFieldTypes[index].timeSlots.length) {
      a = parseInt(
        newFieldTypes[index].timeSlots[
          newFieldTypes[index].timeSlots.length - 1
        ].hourEnd
      );
    }
    var b = 0;
    if (newFieldTypes[index].timeSlots.length)
      b = parseInt(
        newFieldTypes[index].timeSlots[
          newFieldTypes[index].timeSlots.length - 1
        ].minuteEnd
      );
    newFieldTypes[index].timeSlots.push({
      hourStart: a,
      minuteStart: b,
      hourEnd: (a + 2) % 24,
      minuteEnd: b,
      price: "",
    });
    setFieldTypes(newFieldTypes);
  };
  const removeTimeSlot = (fieldIndex: number, slotIndex: number) => {
    const newFieldTypes = [...fieldTypes];
    newFieldTypes[fieldIndex].timeSlots.splice(slotIndex, 1);
    setFieldTypes(newFieldTypes);
  };
  const removeFieldType = (fieldIndex: number) => {
    const newFieldTypes = [...fieldTypes];
    newFieldTypes.splice(fieldIndex, 1);
    setFieldTypes(newFieldTypes);
  };
  const [previewImages, setPreviewImages] = useState([]);
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
    // console.log(files);
    const images: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target == null) return;
          const result = e.target.result;
          if (typeof result === "string") {
            // Khi kết quả là một chuỗi, chúng ta thêm nó vào mảng images
            images.push(result);
            // Sau đó, cập nhật state previewImages
            setPreviewImages((prevImages) => [...prevImages, result]);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const paths = [
    { title: "Trang chủ", url: "/manager" },
    { title: "Danh sách các cụm sân", url: "/manager/group-pitch" },
    { title: "Thêm sân", url: "/manager/group-pitch/add" },
  ];
  return (
    <div className="container mt-3">
      <div className=" max-w-[1000px] mx-auto">
        <Breadcrumb paths={paths} />
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 uppercase text-center">
          Tạo Sân Bóng
        </h1>
        <div className="flex items-center w-full sang-tab">
          <div
            onClick={changeTab1}
            className={`w-auto px-8 relative cursor-pointer flex justify-center items-center gap-3 py-3 text-xl font-medium rounded-t-lg border-b-0 ${
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
            className={`w-auto px-8 relative cursor-pointer flex justify-center py-3 text-xl items-center gap-3 font-medium rounded-t-lg border-b-0 ${
              activeTab2
                ? "border after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-[-1px] bg-white"
                : ""
            }`}
          >
            <CiCircleList /> Danh sách sân và giá
          </div>
        </div>
        <Form method="POST" encType="multipart/form-data">
          <div
            className={`sang-tab-content border bg-white rounded-b-lg px-14 py-6 transition top-0 left-0 right-0 ${
              activeTab1
                ? "visible opacity-100  duration-300"
                : "hidden opacity-0"
            }`}
          >
            <div className="label pb-1">
              <span className="label-text font-semibold">Ảnh</span>
            </div>
            <div id="previewContainer" className="flex gap-3 mb-3 flex-wrap">
              {previewImages.map((image, index) => (
                <div className="avatar relative group" key={index}>
                  <a
                    href={image}
                    target="_blank"
                    className="w-28 rounded shadow"
                  >
                    <img src={image} />
                  </a>
                  <div
                    className="group-hover:opacity-100 p-2 hover:text-error transition absolute top-1 right-1 bg-white shadow-lg rounded-full cursor-pointer opacity-0"
                    // onClick={removeAction}
                  >
                    <GoTrash className="text-sm" />
                  </div>
                </div>
              ))}
              <div
                className={`rounded-md border border-grey-500 bg-gray-50 shadow-md ${
                  actionData?.message?.pitchImages ? "border-error" : ""
                }`}
              >
                <label
                  htmlFor="upload"
                  className="flex justify-center flex-col w-28 h-28 items-center gap-2 cursor-pointer p-4 hover:text-primary transition"
                >
                  <LuImagePlus className="text-2xl" />
                </label>
                <input
                  id="upload"
                  type="file"
                  className="hidden"
                  onChange={handleUploadImage}
                  name="pitchImages"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
            {actionData?.message?.pitchImages ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.pitchImages}
                </span>
              </div>
            ) : (
              <></>
            )}

            <label className="form-control w-full mb-1">
              <div className="label pb-1">
                <span className="label-text font-semibold">Tên sân</span>
              </div>
              <input
                type="text"
                name="groupPitchName"
                placeholder="Nhập tên cụm sân"
                defaultValue="Sân thanh niên"
                className={`input input-bordered flex items-center gap-2 focus-within:outline-none ${
                  actionData?.message?.groupPitchName
                    ? "input-error"
                    : "focus-within:border-primary"
                }`}
              />
            </label>
            {actionData?.message?.groupPitchName ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.groupPitchName}
                </span>
              </div>
            ) : (
              <></>
            )}
            <div className="flex gap-4">
              <label className="form-control">
                <div className="label pb-1">
                  <span className="label-text font-semibold">
                    Thành phố/huyện
                  </span>
                </div>
                <select
                  className="select select-bordered focus:border-primary focus-within:outline-none rounded"
                  onChange={handleChangeDistric}
                  name="district"
                >
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
              </label>
              <label className="form-control">
                <div className="label pb-1">
                  <span className="label-text font-semibold">Phường/Xã</span>
                </div>
                <select
                  className="select select-bordered focus:border-primary focus-within:outline-none rounded"
                  name="ward"
                >
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
                  className="input input-bordered focus:border-primary focus-within:outline-none w-full rounded"
                  name="address_detail"
                  defaultValue="Đê nông lâm đi vào 100m"
                />
              </label>
            </div>
            <label className="form-control w-full mb-1">
              <div className="label pb-1">
                <span className="label-text font-semibold">
                  Link google map
                </span>
              </div>
              <input
                type="text"
                placeholder="Nhập link google map"
                className="input input-bordered focus:border-primary focus-within:outline-none w-full rounded"
                name="address_map"
                defaultValue={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013.8447124367042!2d105.80668550550209!3d21.587581516477904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135273f6e374001%3A0xef97508b50a1bb96!2zU8OibiBiw7NuZyBDw7RuZyBuZ2jhu4cgdGjDtG5nIHRpbiwgTmfDtSAxODAgWjExNSwgUXV54bq_dCBUaOG6r25nLCBUaMOgbmggcGjhu5EgVGjDoWkgTmd1ecOqbiwgVGjDoWkgTmd1ecOqbiwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1713778930015!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}
              />
            </label>
            <label className="form-control">
              <div className="label pb-1">
                <span className="label-text font-semibold">Mô tả</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 focus:border-primary focus-within:outline-none rounded"
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
                        className="checkbox rounded"
                      />
                      <span className="label-text w-28">{service.name}</span>
                      {selectedServices &&
                      selectedServices[service.id]?.status ? (
                        <div className="div">
                          <input
                            type="number"
                            id="priceService"
                            // value={priceService}
                            // onChange={handleServicePriceChange}
                            placeholder="Giá"
                            name="servicePrices"
                            className="input-xs input input-bordered rounded focus:border-primary focus-within:outline-none"
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
              <div
                className="btn btn-primary px-10 rounded-full"
                onClick={changeTab2}
              >
                Tiếp theo
              </div>
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
                  <input
                    name="numTimeSlot"
                    id="numTimeSlot"
                    defaultValue={field.timeSlots.length}
                    className="hidden"
                  />
                  <div className="flex justify-between gap-4 mb-2">
                    <label className="form-control mb-1 w-full">
                      <div className="label pb-1">
                        <span className="label-text font-semibold">
                          Tên sân
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tên sân"
                        name="pitchName"
                        id="pitchName"
                        defaultValue={field.pitchName}
                        className="input input-bordered focus:border-primary focus-within:outline-none w-full rounded"
                      />
                    </label>
                    <label className="form-control">
                      <div className="label pb-1">
                        <span className="label-text font-semibold">
                          Loại sân
                        </span>
                      </div>
                      <select
                        className="select select-bordered focus:border-primary focus-within:outline-none rounded"
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
                        <span className="label-text font-semibold">
                          Số lượng
                        </span>
                      </div>
                      <input
                        type="number"
                        placeholder="Số sân"
                        name="pitchQuantity"
                        defaultValue={field.pitchQuantity}
                        className="input input-bordered focus:border-primary focus-within:outline-none w-full rounded"
                      />
                    </label>
                    <label className="form-control w-full">
                      <div className="label pb-1">
                        <span className="label-text font-semibold">Mô tả</span>
                      </div>
                      <textarea
                        className="textarea textarea-bordered focus:border-primary focus-within:outline-none h-1 rounded"
                        placeholder="Các thông tin cơ bản"
                        name="pitchDesc"
                        defaultValue={field.pitchDesc}
                      ></textarea>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
                    {field.timeSlots.map(
                      (
                        slot: {
                          hourStart: number;
                          minuteStart: number;
                          hourEnd: number;
                          minuteEnd: number;
                        },
                        slotIndex: number
                      ) => (
                        <TimeComponent
                          hourStart={slot.hourStart}
                          minuteStart={slot.minuteStart}
                          hourEnd={slot.hourEnd}
                          minuteEnd={slot.minuteEnd}
                          name="time"
                          key={index}
                          removeAction={() => removeTimeSlot(index, slotIndex)}
                        />
                      )
                    )}
                  </div>
                  <div
                    className="btn inline-flex gap-3 items-center bg-green-500 hover:bg-green-600 px-5 py-2 rounded text-white"
                    onClick={() => addTimeSlot(index)}
                  >
                    Thêm khoảng thời gian
                    <GoPlusCircle />
                  </div>
                  <div
                    className="p-3 hover:text-error transition absolute top-1 right-1 cursor-pointer"
                    onClick={() => removeFieldType(index)}
                  >
                    <IoMdClose />
                  </div>
                </div>
              ))}
              <div
                className="btn inline-flex gap-3 items-center bg-green-500 hover:bg-green-600 px-5 py-2 rounded text-white"
                onClick={addFieldType}
              >
                Thêm Loại Sân
                <GoPlusCircle />
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                className="btn btn-primary px-10 rounded-full"
                defaultValue="submit"
              >
                Tạo
              </button>
            </div>
            {actionData?.message?.pitchImages ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.pitchImages}
                </span>
              </div>
            ) : (
              <></>
            )}
            {actionData?.message?.groupPitchName ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.groupPitchName}
                </span>
              </div>
            ) : (
              <></>
            )}
            {actionData?.message?.pitchName ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.pitchName}
                </span>
              </div>
            ) : (
              <></>
            )}
            {actionData?.message?.pitchQuantity ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.pitchQuantity}
                </span>
              </div>
            ) : (
              <></>
            )}
            {actionData?.message?.timeSlot ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.timeSlot}
                </span>
              </div>
            ) : (
              <></>
            )}
            {actionData?.message?.timePrice ? (
              <div className="label pt-1 pb-0">
                <span className="label-text-alt text-error">
                  {actionData.message.timePrice}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default groupPitchAdd;
