import { IronSessionOptions } from "iron-session";

export const sessionOptions = {
  password: process.env.NEXT_PUBLIC_COOKIE_SECRET,
  cookieName: "access_token",
  secure: process.env.NODE_ENV === "production",
};
