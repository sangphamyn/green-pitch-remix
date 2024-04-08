import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  redirectDocument,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import SideBarManagerComponent from "./components/SideBarManagerComponent";
import HeaderManagerComponent from "./components/HeaderManagerComponent";
import { destroySession, getSession } from "./session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  let session = await getSession(request.headers.get("cookie"));
  return { subdomain, user: session.data };
};
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          {data.subdomain != "manager" ? <HeaderComponent /> : <></>}
          <div className="flex">
            {data.subdomain == "manager" ? <SideBarManagerComponent /> : <></>}
            <div className="w-full">
              {data.subdomain == "manager" ? <HeaderManagerComponent /> : <></>}
              <div>{children}</div>
            </div>
          </div>
          <ScrollRestoration />
          <FooterComponent />
          <Scripts />
        </div>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
