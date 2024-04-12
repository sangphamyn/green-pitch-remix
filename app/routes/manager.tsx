import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { LoaderFunction } from "react-router";
import HeaderManagerComponent from "~/components/HeaderManagerComponent";
import SideBarManagerComponent from "~/components/SideBarManagerComponent";
import { getSession } from "~/session.server";
export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  return { user: session.data };
};
function manager() {
  return (
    <div className="flex">
      <SideBarManagerComponent />
      <div className="w-full bg-slate-100">
        <HeaderManagerComponent />
        <Outlet />
      </div>
    </div>
  );
}

export default manager;
