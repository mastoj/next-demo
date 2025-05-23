import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith("/middleware-filter/report")) {
    console.log("[middleware] Middleware triggered for report page");
    const category = searchParams.get("category");
    const year = searchParams.get("year");
    const holder = searchParams.get("holder");

    const queryObject = {
      ...(category && { category }),
      ...(year && { year }),
      ...(holder && { holder }),
    };

    const encodedValue = encodeURIComponent(
      Buffer.from(JSON.stringify(queryObject)).toString("base64")
    );

    const newUrl = new URL(
      `/middleware-filter/report/${encodedValue}`,
      req.url
    );
    console.log("[middleware] Redirecting to", newUrl.toString());
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/middleware-filter/report/:path*",
};
