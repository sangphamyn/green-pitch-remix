import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Ain't nothing here" }];
};

export default function NotFoundPage() {
  return (
    <div className="p-5 text-center">
      <div className="text-[100px]">404</div>
      <div className="text-2xl">Trang không tồn tại</div>
    </div>
  );
}
