import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import AdminSidebar from "~/components/AdminSidebar";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (session.get("role") != 2) return redirect("/");
  return null;
};

function manager() {
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default manager;
