import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  if (subdomain != "manager") {
    throw redirect("/404", 302);
  }
  return null;
};

function group_pitch() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default group_pitch;
