import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { cancelBooking, getBookingList } from "prisma/pitch";
import { CiCalendar } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import CountdownTimer from "~/components/CountDownTimer";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (Object.keys(session.data).length > 0) {
    const bookingList = await getBookingList(session.data.userId || "");
    return { user: session.data, bookingList };
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
  return (
    <div className="container mx-auto mt-5">
      <div className="flex gap-4">
        <div className="w-1/3 border p-4">
          <div className="avatar flex justify-center mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-3xl font-semibold">{user.name}</h2>
          </div>
          <div className="mx-auto w-fit">
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
                Đã tham gia vào {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-2/3 border p-4">
          <div className="overflow-x-auto">
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
                {bookingList.map((booking) => {
                  let now = new Date();
                  now.setHours(now.getHours() + 7);
                  let date = new Date(booking?.date);
                  const hoursToAdd = parseInt(
                    booking?.booking_timeSlot.startTime.split(":")[0]
                  );
                  const minutesToAdd = parseInt(
                    booking?.booking_timeSlot.startTime.split(":")[1]
                  );
                  date.setHours(date.getHours() + hoursToAdd);
                  date.setMinutes(date.getMinutes() + minutesToAdd);

                  let endDate = new Date(booking?.date);
                  const hoursToAdd1 = parseInt(
                    booking?.booking_timeSlot.endTime.split(":")[0]
                  );
                  const minutesToAdd1 = parseInt(
                    booking?.booking_timeSlot.endTime.split(":")[1]
                  );
                  endDate.setHours(date.getHours() + hoursToAdd1);
                  endDate.setMinutes(date.getMinutes() + minutesToAdd1);
                  return (
                    <tr>
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
                            <span className="rounded-full px-[10px] py-[4px] bg-green-100 text-green-600 font-medium text-sm">
                              Đã xong
                            </span>
                          )
                        ) : (
                          <span className="rounded-full px-[10px] py-[4px] bg-red-100 text-red-600 font-medium text-sm">
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
                            <button className="btn btn-ghost btn-xs">
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
