import { NextRequest, NextResponse } from "next/server";

const applications = [
  {
    url: process.env.NEXT_DEMO_MIDDLEWARE_FILTER_DOMAIN,
    bypassSecret: process.env.NEXT_DEMO_MIDDLEWARE_FILTER_BYPASS_SECRET,
    appName: "middleware-filter",
  },
  {
    url: process.env.NEXT_DEMO_AUTH_DOMAIN,
    bypassSecret: process.env.NEXT_DEMO_AUTH_BYPASS_SECRET,
    appName: "auth",
  },
].map((app) => ({
  ...app,
  paths: [`/${app.appName}`, `/x-static-${app.appName}`],
}));

const checkForApplication = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const app = applications.find((app) =>
    app.paths.some((path) => pathname.startsWith(path))
  );
  if (app) {
    const urlHeader = request.headers.get(`x-app-${app.appName}`);
    const urlBase = urlHeader ? urlHeader : app.url;
    if (!urlBase) {
      return null;
    }
    const search = request.nextUrl.search;
    const newUrl = new URL(pathname, urlBase);
    if (search) {
      newUrl.search = search;
    }
    console.log(["[middleware] newUrl", newUrl.toString()]);
    const headers = new Headers(request.headers);
    headers.set("x-app", app.appName);
    if (app.bypassSecret) {
      headers.set("x-vercel-protection-bypass", app.bypassSecret);
    }
    console.log(
      "[middleware] headers",
      headers.get("x-vercel-protection-bypass")?.substring(0, 6)
    );
    return NextResponse.rewrite(newUrl, {
      headers,
    });
  }
};

export function middleware(request: NextRequest) {
  const appResponse = checkForApplication(request);
  if (appResponse) {
    return appResponse;
  }
  return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
