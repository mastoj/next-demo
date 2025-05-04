"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const persona = formData.get("persona") as string;

  console.log("[loginAction] username", username);
  console.log("[loginAction] password", password);
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (username === password) {
    console.log("[loginAction] login success");
    const sessionData = {
      username,
      persona,
    };
    // Set session data in cookie
    const cookieValue = JSON.stringify(sessionData);
    const cookieJar = await cookies();
    cookieJar.set("next-demo.session", cookieValue);
    return {
      status: "success",
      message: "Login successful",
    };
  }
  return {
    status: "error",
    message: "Invalid username or password",
  };
  // Return a success message
};
