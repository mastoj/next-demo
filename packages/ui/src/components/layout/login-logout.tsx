"use client";

import { useSession } from "@repo/ui/hooks/use-session";
import { useIsClient } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

export const LoginLogout = () => {
  // get the next-demo.session cookie
  const pathname = usePathname();
  const isClient = useIsClient();
  const session = useSession();
  if (!isClient) {
    return null;
  }
  const isLoggedIn = session.isLoggedIn;
  const isLoggedOut = !session.isLoggedIn;
  const isLoginPage = window.location.pathname === "/auth/login";
  const isLogoutPage = window.location.pathname === "/auth/logout";
  const returnUrl = `${window.location.origin}${pathname}`;
  return (
    <div>
      {isLoggedIn && !isLoginPage && !isLogoutPage && (
        <span>
          {session.isLoggedIn ? "Hei " + session.session.username : ""}!{" "}
          <a href={`/auth/logout?returnUrl=${returnUrl}`}>Logout</a>
        </span>
      )}
      {isLoggedOut && !isLoginPage && !isLogoutPage && (
        <a href={`/auth/login?returnUrl=${returnUrl}`}>Login</a>
      )}
    </div>
  );
};
