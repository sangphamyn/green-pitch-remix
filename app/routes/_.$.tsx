import { useLocation } from "@remix-run/react";

export async function loader() {
  throw new Response("Not found", { status: 404 });
}

export default function NotFound() {
  return <ErrorBoundary />;
}

export function ErrorBoundary() {
  const location = useLocation();
  return (
    <div className="p-5 text-center">
      <div className="text-[100px]">404</div>
      <div className="text-2xl">Trang không tồn tại</div>
    </div>
  );
}
