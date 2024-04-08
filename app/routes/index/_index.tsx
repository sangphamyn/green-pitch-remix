import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdFootball } from "react-icons/io";
import { getSession } from "~/session.server";

export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  return { subdomain };
};
export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="w-[800px] h-[200px] mx-auto mt-10 flex justify-center items-center border-dashed border-red-700 border-2 text-2xl font-bold">
      HOME PAGE
    </div>
  );
}
