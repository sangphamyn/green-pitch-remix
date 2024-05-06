import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (!session.data.userId) return redirect("/login");
  return null;
};

function schedule() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default schedule;
