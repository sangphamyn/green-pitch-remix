import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";
export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  if (Object.keys(session.data).length == 0) {
    return redirect("/login");
  }
  return { user: session.data };
};
function group_pitch() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default group_pitch;
