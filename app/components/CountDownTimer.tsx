import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate, endDate }) => {
  const calculateTimeLeft = (date) => {
    const now = new Date();
    const utcNow = now.getTime() - now.getTimezoneOffset() * 60000;
    const target = new Date(date).getTime();
    const distance = target - utcNow;

    if (distance < 0) {
      return null; // If the end time has passed
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [isCountDown, setisCountDown] = useState(true);

  useEffect(() => {
    console.log("endDate", endDate);
    const timer = setInterval(() => {
      const timeLeftToTarget = calculateTimeLeft(targetDate);
      if (timeLeftToTarget) {
        setTimeLeft(timeLeftToTarget);
      } else {
        const now = new Date();
        const utcNow = now.getTime() - now.getTimezoneOffset() * 60000;
        const target = new Date(endDate).getTime();
        if (utcNow >= target) {
          clearInterval(timer);
          setTimeLeft(null);
        } else {
          setisCountDown(false);
          const distance = utcNow - new Date(targetDate).getTime();
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <span className="rounded-full px-[10px] py-[4px] bg-green-100 text-green-600 font-medium text-sm">
        Đã xong
      </span>
    );
  }

  return (
    <>
      {isCountDown ? (
        <span className="rounded-full px-[10px] py-[4px] bg-yellow-100 text-yellow-600 font-medium text-sm">
          {timeLeft.days} ngày {timeLeft.hours} giờ {timeLeft.minutes} phút{" "}
          {timeLeft.seconds}s
        </span>
      ) : (
        <span className="rounded-full px-[10px] py-[4px] bg-blue-100 text-blue-600 font-medium text-sm">
          Đang sử dụng {timeLeft.days} ngày {timeLeft.hours} giờ{" "}
          {timeLeft.minutes} phút {timeLeft.seconds}s
        </span>
      )}
    </>
  );
};

export default CountdownTimer;
