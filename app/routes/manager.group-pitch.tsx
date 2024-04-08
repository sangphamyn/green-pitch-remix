import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

function group_pitch() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default group_pitch;
