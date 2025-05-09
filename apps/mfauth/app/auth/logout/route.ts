import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  const returnUrl = req.nextUrl.searchParams.get("returnUrl")!;
  const response = NextResponse.redirect(new URL(returnUrl));
  response.headers.set(
    "Set-Cookie",
    "next-demo.session=; Path=/; SameSite=Lax; Max-Age=0"
  );
  return response;
};
