import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getBookingList2,
  getGroupPitchList,
  getPitchList,
  getUserList,
} from "prisma/pitch";
import React from "react";
import { FaPerson } from "react-icons/fa6";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { getSession } from "~/session.server";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export let loader: LoaderFunction = async ({ request }) => {
  const userList = await getUserList(); // Lấy danh sách tất cả người dùng đã đăng ký
  const groupPitchList = await getGroupPitchList([2], [1]); // Lấy danh sách các sân đã được duyệt
  const pitchList = await getPitchList([2]);
  let session = await getSession(request.headers.get("cookie"));
  const bookingList = await getBookingList2(
    parseInt(session.data.userId ? session.data.userId : "0")
  );
  return { userList, groupPitchList, pitchList, bookingList };
};
function AdminHome() {
  const data = useLoaderData<typeof loader>();
  const userList = data.userList;
  const groupPitchList = data.groupPitchList;
  const pitchList = data.pitchList;
  const bookingList = data.bookingList;
  const getDayOfWeek = (dateString: any) => {
    const date = new Date(dateString);
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return daysOfWeek[date.getDay()];
  };
  const count = [0, 0, 0, 0, 0, 0, 0];

  bookingList.map((booking: any, index: number) => {
    const dayOfWeek = new Date(booking.date).getDay();
    count[(dayOfWeek - 1 + 7) % 7]++;
  });
  let datasets = [];
  datasets.push({
    label: "Số lượng đặt sân",
    data: count,
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 205, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(201, 203, 207, 0.2)",
    ],
    borderColor: [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
      "rgb(201, 203, 207)",
    ],
    borderWidth: 1,
  });
  const dataLine = {
    labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
    datasets: datasets,
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: false,
          text: "Month",
        },
        stacked: true,
      },
      y: {
        display: true,
        title: {
          display: false,
          text: "Value",
        },
        ticks: {
          stepSize: 1, // Điều chỉnh step của trục y
        },
        stacked: true,
      },
    },
  };
  return (
    <div className="mx-auto my-5 w-full px-10">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-row -mx-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                      Người dùng
                    </p>
                    <h5 className="mb-2 font-bold dark:text-white">
                      {userList.length}
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
                      Số lượng cụm sân
                    </p>
                    <h5 className="mb-2 font-bold dark:text-white">
                      {groupPitchList.length}
                    </h5>
                  </div>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-red-600 to-orange-600">
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
                      Số lượng sân
                    </p>
                    <h5 className="mb-2 font-bold dark:text-white">
                      {pitchList.length}
                    </h5>
                  </div>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400">
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
                      Sales
                    </p>
                    <h5 className="mb-2 font-bold dark:text-white">$103,430</h5>
                  </div>
                </div>
                <div className="px-3 text-right basis-1/3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tl from-orange-500 to-yellow-500">
                    <FaPerson className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="w-1/2">
          <h4>Tỉ lệ đặt theo ngày trong tụần</h4>
          <Bar data={dataLine} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
