"use client";

import { useIsClient } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

export const LoginLogout = () => {
  // get the next-demo.session cookie
  const pathname = usePathname();
  const isClient = useIsClient();
  const [cookies] = useCookies(["next-demo.session"]);
  if (!isClient) {
    return null;
  }
  const session = cookies["next-demo.session"];
  const isLoggedIn = !!session;
  const isLoggedOut = !session;
  const isLoginPage = window.location.pathname === "/auth/login";
  const isLogoutPage = window.location.pathname === "/auth/logout";
  const returnUrl = `${window.location.origin}${pathname}`;
  return (
    <div>
      {isLoggedIn && !isLoginPage && !isLogoutPage && (
        <a href={`/auth/logout?returnUrl=${returnUrl}`}>Logout</a>
      )}
      {isLoggedOut && !isLoginPage && !isLogoutPage && (
        <a href={`/auth/login?returnUrl=${returnUrl}`}>Login</a>
      )}
    </div>
  );
};
