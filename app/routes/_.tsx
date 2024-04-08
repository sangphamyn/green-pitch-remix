import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { LoaderFunction } from "react-router";
import HeaderComponent from "~/components/HeaderComponent";
import { getSession } from "~/session.server";
export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  let session = await getSession(request.headers.get("cookie"));
  return { subdomain, user: session.data };
};
function _() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

export default _;
