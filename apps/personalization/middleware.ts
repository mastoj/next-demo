import { Session } from "@repo/ui/hooks/types";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("next-demo.session");
  const session = (
    sessionCookie
      ? { isLoggedIn: true, session: { ...JSON.parse(sessionCookie.value) } }
      : { isLoggedIn: false }
  ) as Session;

  const sessionJson = JSON.stringify(session);
  const base64Json = Buffer.from(sessionJson).toString("base64");

  const pathname = request.nextUrl.pathname;
  console.log("==> Middleware base64json", base64Json);
  const newPath = `/${base64Json}${pathname}?${request.nextUrl.search}`;
  const newUrl = new URL(newPath, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!x-static-personalization|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
