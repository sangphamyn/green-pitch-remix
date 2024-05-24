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
  getGroupPitchById,
  updateGroupPitch,
  updatePitchType,
} from "prisma/pitch";
import React, { ChangeEvent, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import { GoPlusCircle, GoTrash } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import TimeComponent from "~/components/TimeComponent1";
import { CreateGroupPitch } from "~/enum/pitch.enum";
import { districts, getDistrictById, wards } from "~/helper";
import { getSession } from "~/session.server";
import { uploadImage } from "~/utils/utils.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  const pitch = await getGroupPitchById(params.id ?? "0");
  const services = await getAllService();
  return { services, pitch };
};
export async function action({ request, params }: ActionFunctionArgs) {
  const copy = request.clone().formData();
  const img = (await copy).get("pitchImages");
  let message: { [key: string]: string } = {};
  const groupPitchName = (await copy).get("groupPitchName");
  if (!groupPitchName) message["groupPitchName"] = "Cần điền tên cụm sân";
  // if (img.size == 0) message["pitchImages"] = "Cần ảnh sân";

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
  let formData;
  if (img.size != 0) {
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

    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } else formData = await request.formData();
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
  const pitchType_id = formData.getAll("pitchType_id");
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
    };
  }
  if (data !== undefined) {
    const newGroupPitch = await updateGroupPitch(
      params.id,
      data,
      services,
      servicePrices
    );
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
        let newPitchType = await updatePitchType(
          pitchType_id[i],
          dataPitchType,
          pitchQuantity[i]
        );
        // for (let j = 0; j < parseInt(numTimeSlot[i].toString()); j++) {
        //   await createTimeSlot(
        //     newPitchType.id,
        //     timeSlot[(num + j) * 4 + 0],
        //     timeSlot[(num + j) * 4 + 1],
        //     timeSlot[(num + j) * 4 + 2],
        //     timeSlot[(num + j) * 4 + 3],
        //     parseFloat(timePrice[num + j].toString())
        //   );
        // }
        num += parseInt(numTimeSlot[i].toString());
      }
      return redirect("/manager/group-pitch");
    }
  }
  return "success";
}
function groupPitchAdd() {
  const data = useLoaderData<typeof loader>();
  const groupPitch = data.pitch.groupPitch;
  const services = data.pitch.service;
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
  const dt = getDistrictById(groupPitch.id_district);
  const [wardsList, setWardsList] = useState(
    wards.filter((item) => item.district == dt.name)
  );
  const handleChangeDistric = async (e: ChangeEvent<HTMLSelectElement>) => {
    const dt = getDistrictById(e.target.value);
    setWardsList(wards.filter((item) => item.district == dt.name));
  };

  const [selectedServices, setSelectedServices] = useState<{
    [key: number]: { status: boolean };
  }>(
    services.reduce((acc, service) => {
      acc[service.serviceId] = { status: true };
      return acc;
    }, {})
  );
  const serviceList = data.services;
  const [fieldTypes, setFieldTypes] = useState<
    {
      pitchName: string;
      pitchType: string;
      pitchQuantity: number;
      pitchDesc: string;
      id: string;
      timeSlots: any;
    }[]
  >(
    groupPitch.pitchTypes.map((acc, pitchType) => {
      acc["pitchName"] = acc.name;
      acc["pitchType"] = acc.type;
      acc["pitchQuantity"] = acc.pitch.length;
      acc["pitchDesc"] = acc.description;
      acc["timeSlots"] = acc.timeSlot;
      acc["id"] = acc.id;
      return acc;
    })
  );
  const addFieldType = () => {
    setFieldTypes([
      ...fieldTypes,
      {
        pitchName: "Sơnn",
        pitchType: "Sân 7",
        pitchQuantity: 3,
        pitchDesc: "Sơn tả",
        id: "0",
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
    var a = "05:00";
    if (newFieldTypes[index].timeSlots.length) {
      a =
        newFieldTypes[index].timeSlots[
          newFieldTypes[index].timeSlots.length - 1
        ].endTime;
    }
    newFieldTypes[index].timeSlots.push({
      id: 0,
      startTime: a,
      endTime: ((parseInt(a.split(":")[0]) + 2) % 24) + ":" + a.split(":")[1],
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
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Breadcrumb paths={paths} /> */}
      <div className="bg-blue-400 w-full h-52 flex justify-center">
        <span className="py-10 text-white font-semibold text-3xl">
          Sửa Sân Bóng
        </span>
      </div>
      <div className="container mx-auto my-12 max-w-[1000px] -translate-y-28">
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
        <Form method="POST" encType="multipart/form-data">
          <div
            className={`sang-tab-content border bg-white rounded-b-lg px-14 py-6 transition top-0 left-0 right-0 rounded-tr-lg ${
              activeTab1
                ? "visible opacity-100  duration-300"
                : "hidden opacity-0"
            }`}
          >
            <div className="label pb-1">
              <span className="label-text font-semibold">Ảnh</span>
            </div>
            <div id="previewContainer" className="flex gap-3 mb-3">
              {previewImages.map((image, index) => (
                <div className="avatar border relative" key={index}>
                  <div className="w-24 rounded">
                    <img src={image} />
                  </div>
                  <div
                    className="p-2 hover:text-error transition absolute top-1 right-1 bg-white shadow-lg rounded-full"
                    // onClick={removeAction}
                  >
                    <GoTrash className="text-sm" />
                  </div>
                </div>
              ))}
              <div
                className={`rounded-md border border-grey-500 bg-gray-50 shadow-md w-28 ${
                  actionData?.message?.pitchImages ? "border-error" : ""
                }`}
              >
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer p-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white stroke-grey-500"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600 font-medium">Tải ảnh</span>
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
                defaultValue={groupPitch.name}
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
                  defaultValue={groupPitch.id_district}
                >
                  {districts.map(
                    (item: { name: string; code: string }, index: number) => {
                      return (
                        <option key={index} defaultValue={parseInt(item?.code)}>
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
                  defaultValue={groupPitch.id_ward}
                >
                  {wardsList.map(
                    (item: { name: string; code: string }, index: number) => {
                      return (
                        <option key={index} value={parseInt(item?.code)}>
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
                  defaultValue={groupPitch.address_detail}
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
                defaultValue={groupPitch.map}
              />
            </label>
            <label className="form-control">
              <div className="label pb-1">
                <span className="label-text font-semibold">Mô tả</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 focus:border-primary focus-within:outline-none rounded"
                placeholder="Các thông tin cơ bản"
                defaultValue={groupPitch.description}
                name="groupPitchDesc"
              ></textarea>
            </label>
            <div className="label pb-1">
              <span className="label-text font-semibold">Dịch vụ</span>
            </div>
            <div className="grid grid-cols-2">
              {serviceList.map(
                (service: { id: number; name: string }, index: number) => {
                  const use = services.find(
                    (item) => item.serviceId == service.id
                  );
                  return (
                    <div className="form-control" key={index}>
                      <label className="label cursor-pointer justify-start gap-4 items-center pr-10">
                        <input
                          type="checkbox"
                          name="groupPitchServices"
                          id={"service_" + service.id}
                          defaultValue={service.id}
                          onChange={handleCheckboxChange}
                          className="checkbox rounded"
                          defaultChecked={!!use}
                        />
                        <span className="label-text w-28">{service.name}</span>
                        {selectedServices &&
                        selectedServices[service.id]?.status ? (
                          <div className="div">
                            <input
                              type="number"
                              id="priceService"
                              defaultValue={use?.price}
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
                  );
                }
              )}
            </div>
            <div className="flex items-center justify-center mt-8">
              <div
                className="btn btn-primary px-10 rounded-full w-full"
                onClick={changeTab2}
              >
                Thêm danh sách sân và giá
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
                    type="hidden"
                    name="pitchType_id"
                    defaultValue={field.id}
                  />
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
                    {field.timeSlots.map((slot, slotIndex: number) => (
                      <div key={index}>
                        <input
                          type="hidden"
                          name="timeSlot_id"
                          defaultValue={slot.id}
                        />
                        <TimeComponent
                          hourStart={parseInt(slot.startTime.split(":")[0])}
                          minuteStart={parseInt(slot.startTime.split(":")[1])}
                          hourEnd={parseInt(slot.endTime.split(":")[0])}
                          minuteEnd={parseInt(slot.endTime.split(":")[1])}
                          name="time"
                          price={slot.price}
                          removeAction={() => removeTimeSlot(index, slotIndex)}
                        />
                      </div>
                    ))}
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
                className="btn btn-primary px-10 rounded-full w-full"
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
