import { Session } from "@repo/ui/hooks/types";
import { precompute } from "flags/next";
import { NextRequest, NextResponse } from "next/server";
import { precomputedFlags } from "@repo/ui/lib/flags";
import { AppContext } from "@repo/ui/lib/types";

export async function middleware(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("next-demo.session");
    const session = (
      sessionCookie
        ? { isLoggedIn: true, session: { ...JSON.parse(sessionCookie.value) } }
        : { isLoggedIn: false }
    ) as Session;

    const flagCode = await precompute(precomputedFlags);

    const appContext: AppContext = {
      flagCode,
      session,
    };

    const appContextJson = JSON.stringify(appContext);
    const base64Json = Buffer.from(appContextJson).toString("base64");

    const pathname = request.nextUrl.pathname;
    const newPath = `/${base64Json}${pathname ? pathname : ""}?${request.nextUrl.search}`;
    const newUrl = new URL(newPath, request.url);
    return NextResponse.rewrite(newUrl);
  } catch (error) {
    return NextResponse.next();
  }
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
    "/((?!x-static-flags|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
