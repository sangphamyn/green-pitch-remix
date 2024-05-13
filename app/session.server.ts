import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: number;
  createdAt: string | null;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "green_pitch_session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    secrets: [process.env.SESSION_SECRET ?? "s3cr3t"],
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
