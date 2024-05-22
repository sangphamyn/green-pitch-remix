import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  cancelBooking,
  getAllBookingListByUser,
  getBookingList,
} from "prisma/pitch";
import { CiCalendar } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import CountdownTimer from "~/components/CountDownTimer";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  let { pageNumber = 0 } = params;
  let { searchParams } = new URL(request.url);
  let session = await getSession(request.headers.get("cookie"));
  if (Object.keys(session.data).length > 0) {
    const bookingList = await getBookingList(
      session.data.userId,
      parseInt(searchParams.get("page")) || 1
    );
    const allBooking = await getAllBookingListByUser(
      session.data.userId ?? "0"
    );
    return {
      user: session.data,
      bookingList,
      page: searchParams.get("page") || 1,
      allBooking,
    };
  }
  return redirect("/login");
};
export async function action({ request, params }: ActionFunctionArgs) {
  let formData = await request.formData();
  const booking_id = formData.get("booking_id");
  const booking = await cancelBooking(booking_id);
  return null;
}
export default function profile() {
  const data = useLoaderData<typeof loader>();
  const user = data.user;
  const bookingList = data.bookingList;
  const allBooking = data.allBooking;
  const page = data.page;
  return (
    <div className="container mx-auto mt-5">
      <div className="flex gap-8">
        <div className="w-1/5 h-fit shadow-xl rounded-md p-4">
          <div className="avatar flex justify-center mb-4">
            <div className="w-24 rounded-full ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} />
            </div>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
          </div>
          <div className="w-fit">
            <div className="flex gap-2 items-center mb-2">
              <FiPhone />
              <span>{user.phone}</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <MdOutlineEmail />
              <span className="text-neutral-6000 dark:text-neutral-300">
                {user.email}
              </span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <CiCalendar className="stroke-[0.5px]" />
              <span className="text-neutral-6000 dark:text-neutral-300">
                Tham gia vào {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-4/5  ">
          <div className="mx-auto my-5 w-full">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                            Tổng
                          </p>
                          <h5 className="mb-2 font-bold dark:text-white">
                            {allBooking.length}
                          </h5>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-1/3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-blue-500 to-violet-500">
                          <FaPerson className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                            Thành công
                          </p>
                          <h5 className="mb-2 font-bold dark:text-white">
                            {
                              allBooking.filter((booking) => {
                                let date = new Date(booking?.date);
                                let endDate = new Date(booking?.date);
                                const hoursToAdd1 = parseInt(
                                  booking?.booking_timeSlot.endTime.split(
                                    ":"
                                  )[0]
                                );
                                const minutesToAdd1 = parseInt(
                                  booking?.booking_timeSlot.endTime.split(
                                    ":"
                                  )[1]
                                );
                                endDate.setHours(
                                  date.getHours() + hoursToAdd1 - 7
                                );
                                endDate.setMinutes(
                                  date.getMinutes() + minutesToAdd1
                                );
                                return (
                                  new Date() > endDate && booking.status == 1
                                );
                              }).length
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-1/3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-green-500 to-green-300">
                          <FaPerson className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                            Sắp đá
                          </p>
                          <h5 className="mb-2 font-bold dark:text-white">
                            {
                              allBooking.filter((booking) => {
                                let date = new Date(booking?.date);
                                const hoursToAdd = parseInt(
                                  booking?.booking_timeSlot.startTime.split(
                                    ":"
                                  )[0]
                                );
                                const minutesToAdd = parseInt(
                                  booking?.booking_timeSlot.startTime.split(
                                    ":"
                                  )[1]
                                );
                                date.setHours(date.getHours() + hoursToAdd - 7);
                                date.setMinutes(
                                  date.getMinutes() + minutesToAdd
                                );
                                return date > new Date() && booking.status == 1;
                              }).length
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-1/3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-orange-500 to-orange-500">
                          <FaPerson className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
                <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                            Đã hủy
                          </p>
                          <h5 className="mb-2 font-bold dark:text-white">
                            {
                              allBooking.filter(
                                (booking: { status: number }) =>
                                  booking.status == 2
                              ).length
                            }
                          </h5>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-1/3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-red-600 to-red-500">
                          <FaPerson className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto border-t border-r border-l shadow-xl rounded-md p-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Sân</th>
                  <th>Thời gian đặt</th>
                  <th>Thời gian đá</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bookingList.map((booking, index: number) => {
                  let now = new Date();
                  now.setHours(now.getHours());
                  let date = new Date(booking?.date);
                  const hoursToAdd = parseInt(
                    booking?.booking_timeSlot.startTime.split(":")[0]
                  );
                  const minutesToAdd = parseInt(
                    booking?.booking_timeSlot.startTime.split(":")[1]
                  );
                  date.setHours(hoursToAdd);
                  date.setMinutes(minutesToAdd);

                  let endDate = new Date(booking?.date);
                  const hoursToAdd1 = parseInt(
                    booking?.booking_timeSlot.endTime.split(":")[0]
                  );
                  const minutesToAdd1 = parseInt(
                    booking?.booking_timeSlot.endTime.split(":")[1]
                  );
                  endDate.setHours(hoursToAdd1);
                  endDate.setMinutes(minutesToAdd1);
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask w-12 h-12">
                              <img
                                src={
                                  booking.booking_pitch.pitch_pitchType
                                    .groupPitch.images
                                    ? booking.booking_pitch.pitch_pitchType.groupPitch.images.split(
                                        ","
                                      )[0]
                                    : "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                }
                                className="rounded-md"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {
                                booking?.booking_pitch?.pitch_pitchType
                                  ?.groupPitch.name
                              }
                            </div>
                            <div className="text-sm opacity-50">
                              {booking?.booking_pitch?.pitch_pitchType?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate1(booking?.createdAt)}</td>
                      <td>
                        {formatDate(booking?.date)}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {booking?.booking_timeSlot.startTime} -{" "}
                          {booking?.booking_timeSlot.endTime}
                        </span>
                      </td>
                      <td>
                        {booking?.status == 1 ? (
                          endDate > now ? (
                            <CountdownTimer
                              targetDate={date}
                              endDate={endDate}
                            />
                          ) : (
                            <span className="rounded-full px-[16px] py-[4px] bg-green-100 text-green-600 font-medium text-sm">
                              Đã xong
                            </span>
                          )
                        ) : (
                          <span className="rounded-full px-[16px] py-[4px] bg-red-100 text-red-600 font-medium text-sm">
                            Đã hủy
                          </span>
                        )}
                      </td>
                      {now < date && booking?.status == 1 ? (
                        <th>
                          <Form method="POST">
                            <input
                              type="hidden"
                              name="booking_id"
                              value={booking.id}
                            />
                            <button className="btn-sm btn btn-outline btn-error">
                              Hủy
                            </button>
                          </Form>
                        </th>
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="w-full text-center">
              <div className="join mx-auto">
                <Link
                  to={`?page=${page - 1}`}
                  className="join-item btn"
                  disabled={page == 1 ? true : false}
                >
                  «
                </Link>
                <button className="join-item btn">{page}</button>
                <Link
                  to={`?page=${parseInt(page) + 1}`}
                  className="join-item btn"
                  disabled={bookingList.length < 10 ? true : false}
                >
                  »
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: String) {
  if (!dateString) return `1 tháng 4, 2024`;
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return `${day} ${monthNames[monthIndex]}, ${year}`;
}
function countdown(targetDateStr) {
  const targetDate = new Date(targetDateStr).getTime();

  const countdownElement = document.getElementById("countdown");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "EXPIRED";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  }

  // Cập nhật đếm ngược mỗi giây
  const interval = setInterval(updateCountdown, 1000);

  // Cập nhật ngay lập tức (tránh phải chờ 1 giây đầu tiên)
  updateCountdown();
}

// Gọi hàm đếm ngược với datetime mục tiêu

function formatDate1(dateString: String) {
  const date = new Date(dateString);

  // Lấy các thành phần ngày giờ
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  // Định dạng các thành phần thành chuỗi mong muốn
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
