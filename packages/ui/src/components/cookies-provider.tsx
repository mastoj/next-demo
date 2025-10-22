"use client";
import { PropsWithChildren } from "react";
import { CookiesProvider as ReactCookieCookiesProvider } from "react-cookie";

export const CookiesProvider = ({ children }: PropsWithChildren) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Provider = ReactCookieCookiesProvider as any;
  return <Provider>{children}</Provider>;
};
