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
export function Layout({ children }: { children: React.ReactNode }) {
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
          <div>{children}</div>
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
