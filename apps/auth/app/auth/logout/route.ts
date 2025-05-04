import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const requestHeaders = req.headers;
  for (const [key, value] of requestHeaders.entries()) {
    console.log(`[auth] Header: ${key}: ${value}`);
  }

  console.log("[auth] Logout triggered", JSON.stringify(req.nextUrl, null, 2));
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const host = forwardedHost || req.headers.get("host");
  const proto = forwardedProto || req.headers.get("x-forwarded-proto");
  const url = forwardedHost ? `${proto}://${host}` : req.url;
  console.log("[auth] Logout URL", url.toString());
  const response = NextResponse.redirect(new URL("/auth/login", url));
  response.headers.set(
    "Set-Cookie",
    "next-demo.session=; Path=/; SameSite=Lax; Max-Age=0"
  );
  return response;
};
