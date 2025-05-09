import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const returnUrl = searchParams.get("returnUrl")!;
  const persona = searchParams.get("persona")!;
  const country = searchParams.get("country")!;

  const sessionCookie = req.cookies.get("next-demo.session");
  if (!sessionCookie) {
    return NextResponse.redirect(returnUrl);
  }
  const session = JSON.parse(sessionCookie.value);
  const newSession = {
    ...session,
    persona: persona ? persona : session.persona,
    country: country ? country : session.country,
  };
  const newSessionJson = JSON.stringify(newSession);

  // write new session cookie
  const response = NextResponse.redirect(new URL(returnUrl));
  response.cookies.set("next-demo.session", newSessionJson);

  return response;
};
