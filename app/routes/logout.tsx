import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import React from "react";
import { destroySession, getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("cookie"));
  return redirect("/", {
    headers: { "set-cookie": await destroySession(session) },
  });
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("sang action logout");
  return "sab";
}
