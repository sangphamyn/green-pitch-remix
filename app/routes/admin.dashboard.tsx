import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getBookingList3,
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
  const groupPitchList = await getGroupPitchList([2]); // Lấy danh sách các sân đã được duyệt
  const pitchList = await getPitchList([2]);
  let session = await getSession(request.headers.get("cookie"));
  const bookingList = await getBookingList3();
  return { userList, groupPitchList, pitchList, bookingList };
};
function AdminHome() {
  const data = useLoaderData<typeof loader>();
  const userList = data.userList;
  const groupPitchList = data.groupPitchList;
  const pitchList = data.pitchList;
  const bookingList = data.bookingList;

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
    barThickness: 40,
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
  const timeSlots = new Array(12).fill(0);

  bookingList.forEach((booking: any) => {
    const startTime = booking.booking_timeSlot.startTime;
    const hours = parseInt(startTime.split(":")[0], 10);

    // Tính toán index của khoảng thời gian
    const index = Math.floor(hours / 2);
    timeSlots[index]++;
  });
  const data1 = {
    labels: [
      "0-2h",
      "2-4h",
      "4-6h",
      "6-8h",
      "8-10h",
      "10-12h",
      "12-14h",
      "14-16h",
      "16-18h",
      "18-20h",
      "20-22h",
      "22-24h",
    ],
    datasets: [
      {
        label: "Số lượng đặt sân",
        data: timeSlots,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        barThickness: 30,
      },
    ],
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượng đặt sân theo các khung giờ trong ngày",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Khung giờ",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng đặt sân",
        },
      },
    },
  };
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* <Breadcrumb paths={paths} /> */}
      <div className="bg-green-500 w-full h-52 flex justify-center shadow-lg shadow-green-200">
        <span className="py-10 text-white font-semibold text-3xl">
          Dashboard
        </span>
      </div>
      <div className="mx-auto my-5 w-full px-10 -translate-y-20">
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
                      <h5 className="mb-2 font-bold dark:text-white">
                        $103,430
                      </h5>
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
        <div className="my-5 grid grid-cols-2 gap-6 mt-10">
          <div className=" bg-white shadow-md px-6 py-6 rounded-md">
            <h4>Tỉ lệ đặt theo ngày trong tuần</h4>
            <Bar data={dataLine} options={options} />
          </div>
          <div className=" bg-white shadow-md px-6 py-6 rounded-md">
            <h4>Tỉ lệ đặt theo giờ trong ngày</h4>
            <Bar data={data1} options={options1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
