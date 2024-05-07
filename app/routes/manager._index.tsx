import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosFootball } from "react-icons/io";

function index() {
  return (
    <div className="w-full px-24 bg-white">
      <div className="container flex flex-col mx-auto">
        <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5">
          <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
            <div className="flex items-center justify-center mb-4 lg:justify-normal">
              <IoIosFootball className="text-xl text-primary" />
              <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">
                Nâng cấp năng suất sân bóng của bạn
              </h4>
            </div>
            <h1 className="mb-8 font-extrabold leading-tight text-6xl text-dark-grey-900">
              Quản lý sân bóng với Green Pitch
            </h1>
            <p className="mb-6 text-base font-normal leading-7 lg:w-3/4 text-grey-900">
              Nâng tỉ lệ lấp đầy sân mùa nắng cũng như mùa mưa. Thoải mái quản
              lý sân từ bất kỳ nơi nào. Quản lý lịch đặt sân hiệu quả và chuyên
              nghiệp hơn. Ở đó chủ sân có thể biết được một ngày sân có bao
              nhiêu lịch, lịch đặt ở sân nào, giờ nào. Giờ nào còn sân trống một
              cách nhanh chóng, dễ dàng.
            </p>
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <a className="btn btn-primary">Bắt đầu ngay</a>
              <a className="btn btn-outline btn-primary">
                Tìm hiểu thêm
                <FaArrowRightLong />
              </a>
            </div>
          </div>
          <div className="items-center justify-end hidden col-span-1 md:flex">
            <img
              className="w-4/5 rounded-md"
              src="/images/header-1.png"
              alt="header image"
            />
          </div>
        </div>
      </div>
      <div id="learnmore" className="py-8 px-4 mx-auto container">
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Quản lý hiệu quả
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Giải pháp quản lý sân đơn giản, dễ dàng mọi lúc mọi nơi trên mọi
              thiết bị.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Tăng trưởng doanh thu
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Doanh thu tăng từ 10% trở lên! Cắt giảm chi phí, thời gian quản
              lý.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Quảng bá hiệu quả
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Trang thông tin sân bóng riêng biệt với hàng ngàn người truy cập
              hằng ngày!
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Dễ dàng sử dụng
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Giao diện thân thiện, dễ dàng làm quen sử dụng.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              An toàn tin cậy
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Đảm bảo hoạt động kinh doanh của bạn được thuận lợi là ưu tiên
              hàng đầu của chúng tôi
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-orange-400 lg:h-12 lg:w-12">
              <svg
                className="w-5 h-5 text-white lg:w-6 lg:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Hỗ trợ tận tình
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Luôn luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào ở đâu
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mx-3 mt-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            An toàn tin cậy, quảng bá hiệu quả và tăng trưởng doanh thu.
          </p>
        </div>
      </div>
    </div>
  );
}

export default index;
