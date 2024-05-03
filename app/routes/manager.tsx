import { Outlet, useLoaderData } from "@remix-run/react";
import { getGroupPitchByOwnerId } from "prisma/pitch";
import React from "react";
import { LoaderFunction } from "react-router";
import HeaderManagerComponent from "~/components/HeaderManagerComponent";
import SideBarManagerComponent from "~/components/SideBarManagerComponent";
import { getSession } from "~/session.server";
export let loader: LoaderFunction = async ({ request, params }) => {
  const paramsId = params.id;
  let session = await getSession(request.headers.get("cookie"));
  let groupPitchs;
  let idFirst;
  if (session.data.userId) {
    groupPitchs = await getGroupPitchByOwnerId(session.data.userId);
    groupPitchs.map((item) => {
      if (item.status == 2)
        // Da duyet
        idFirst = item.id;
    });
  }
  return { user: session.data, idFirst };
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
