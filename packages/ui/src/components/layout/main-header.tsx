"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginLogout } from "./login-logout";
import { PersonaSwitch } from "./persona-switch";
import { CountrySwitch } from "./country-switch";

export const MainHeader = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = GalleryVerticalEnd as any;
  return (
    <div className="flex gap-2 justify-between">
      <a href="/" className="flex items-center gap-2 font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Icon className="size-4" />
        </div>
        NEXT-DEMO
      </a>
      <div>
        <div className="flex items-center *:border-r *:px-4 *:last:border-none">
          <CountrySwitch />
          <PersonaSwitch />
          <LoginLogout />
        </div>
      </div>
    </div>
  );
};
