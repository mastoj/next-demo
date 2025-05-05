"use client";
import type React from "react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const redirectUrl = returnUrl ? returnUrl : "/";

  const doLogin = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const persona = formData.get("persona") as string;
    const loginResult = await fetch("/auth/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        persona,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("[loginResult]", loginResult);
    if (loginResult.status !== 200) {
      alert("Login failed");
      return;
    }
    const loginResultData = await loginResult.json();
    if (loginResultData.status !== "success") {
      alert(loginResultData.message);
      return;
    }
    window.location.href = redirectUrl;
  };

  return (
    <form
      action={doLogin}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your username below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="persona">Select Persona</Label>
          <Select defaultValue="user" name="persona">
            <SelectTrigger id="persona">
              <SelectValue placeholder="Select a persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">Regular User</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose a persona for this demo
          </p>
        </div>{" "}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
