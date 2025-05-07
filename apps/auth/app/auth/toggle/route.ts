// Reads the username, password, and persona from the request body

import { NextRequest, NextResponse } from "next/server";

// and simulates a login action
export const GET = async (req: NextRequest) => {
  console.log("==> [toggle] GET", req);
  return NextResponse.redirect(req.headers.get("referer")!);
  // // Simulate a delay
  // const result = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     if (username === password) {
  //       console.log("[loginAction] login success");
  //       resolve({
  //         status: "success",
  //         message: "Login successful",
  //       });
  //     } else {
  //       resolve({
  //         status: "error",
  //         message: "Invalid username or password",
  //       });
  //     }
  //   }, 1000);
  // });
  // const response = NextResponse.json(result);
  // const cookieValue = JSON.stringify({
  //   username,
  //   persona,
  //   country,
  // });
  // response.cookies.set("next-demo.session", cookieValue);
  // return response;
};
