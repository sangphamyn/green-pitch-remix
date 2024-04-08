export default function now() {
  // Lấy ngày tháng hiện tại
  const currentDate = new Date();

  // Lấy thông tin ngày, tháng, năm
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, sử dụng padStart để thêm số 0 phía trước nếu cần
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Lấy thông tin giờ, phút, giây
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Định dạng theo định dạng DATETIME của SQL
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}
