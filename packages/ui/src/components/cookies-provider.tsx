"use client";
import { PropsWithChildren } from "react";
import { CookiesProvider as ReactCookieCookiesProvider } from "react-cookie";

export const CookiesProvider = ({ children }: PropsWithChildren) => {
  return <ReactCookieCookiesProvider>{children}</ReactCookieCookiesProvider>;
};
