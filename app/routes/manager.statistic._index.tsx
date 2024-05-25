import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getBookingList2,
  getBookingList4,
  getGroupPitchList,
  getPitchList,
  getPitchList1,
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
import { formatCurrency } from "~/helper";
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
import {
  subDays,
  addDays,
  eachDayOfInterval,
  format,
  parseISO,
} from "date-fns";
export let loader: LoaderFunction = async ({ request }) => {
  const userList = await getUserList(); // Lấy danh sách tất cả người dùng đã đăng ký
  let session = await getSession(request.headers.get("cookie"));
  const groupPitchList = await getGroupPitchList(
    [2],
    [session.data.userId ? parseInt(session.data.userId) : 0]
  ); // Lấy danh sách các sân đã được duyệt
  const pitchList = await getPitchList1(
    session.data.userId ? parseInt(session.data.userId) : 0,
    [2]
  );
  const bookingList = await getBookingList2(
    parseInt(session.data.userId ? session.data.userId : "0")
  );
  const bookingPrice = await getBookingList4(
    parseInt(session.data.userId ? session.data.userId : "0")
  );
  return { userList, groupPitchList, pitchList, bookingList, bookingPrice };
};
function AdminHome() {
  const data = useLoaderData<typeof loader>();
  const userList = data.userList;
  const groupPitchList = data.groupPitchList;
  const pitchList = data.pitchList;
  const bookingList = data.bookingList;
  const bookingPrice = data.bookingPrice;
  let total = 0;
  bookingPrice.map((item: any) => {
    total += item.booking_timeSlot.price;
  });
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
        ticks: {
          stepSize: 1, // Điều chỉnh step của trục y
        },
      },
    },
  };
  // console.log(bookingList);
  const formatBookingDate = (isoDateString) => {
    return format(parseISO(isoDateString), "yyyy-MM-dd");
  };
  const generateLabels = () => {
    const startDate = subDays(new Date(), 14);
    const endDate = addDays(new Date(), 14);
    return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
      format(date, "yyyy-MM-dd")
    );
  };
  const allBookings = [
    { date: "2024-05-11", bookings: 5 },
    { date: "2024-05-12", bookings: 8 },
    { date: "2024-05-25", bookings: 10 },
    { date: "2024-05-26", bookings: 7 },
    { date: "2024-06-01", bookings: 3 },
    { date: "2024-06-08", bookings: 7 },
    { date: "2024-06-09", bookings: 10 },
    // thêm các booking khác
  ];

  const labels = generateLabels();
  labels[14] = "Hôm nay";
  const bookingsData = labels.map((label) => {
    const booking = bookingList.filter(
      (b) => formatBookingDate(b.date) === label
    );
    return booking ? booking.length : 0;
  });
  console.log(bookingsData);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Số lượng đặt sân",
        data: bookingsData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượng đặt sân theo từng ngày",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Số lượng đặt sân",
        },
        ticks: {
          stepSize: 1, // Điều chỉnh step của trục y
        },
      },
    },
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-500 w-full h-52 flex justify-center shadow-lg shadow-blue-200">
        <span className="py-10 text-white font-semibold text-3xl">
          Thống kê
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
                        Số lần đặt sân
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {bookingList.length}
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
                        Doanh thu (ước tính)
                      </p>
                      <h5 className="mb-2 font-bold dark:text-white">
                        {formatCurrency(total)}
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
          <div className=" bg-white px-6 py-6 rounded-md">
            <h4>Tỉ lệ đặt theo ngày trong tuần</h4>
            <Bar data={dataLine} options={options} />
          </div>
          <div className=" bg-white px-6 py-6 rounded-md">
            <h4>Tỉ lệ đặt theo giờ trong ngày</h4>
            <Bar data={data1} options={options1} />
          </div>
          <div className=" bg-white px-6 py-6 rounded-md">
            <h4>Số lượng đặt sân từ 2 tuần trước tới 2 tuần tới</h4>
            <Line data={chartData} options={options2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
