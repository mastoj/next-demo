"use client";
import { useSession } from "@repo/ui/hooks/use-session";
import React, { useState } from "react";
import PlasmaControls, { PlasmaParams } from "./plasma-controls";
import RetroPlasma from "./retro-plasma";
import { useIsClient } from "@uidotdev/usehooks";

type Props = {};

export const Content = (props: Props) => {
  const session = useSession();
  const isClient = useIsClient();
  // const isClient = useIsClient();
  const [params, setParams] = useState<PlasmaParams>({
    speed: 0.03,
    scale: 16,
    turbulence: 1,
    colorTheme: "monochrome",
    wave1: 16,
    wave2: 8,
    wave3: 16,
    wave4: 8,
  });
  if (!isClient) {
    return null;
  }
  if (session.isLoggedIn && session.session.persona === "premium") {
    return (
      <div className="space-y-4">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <RetroPlasma params={params} />
        </div>

        <PlasmaControls onChange={setParams} defaultParams={params} />

        <p className="text-center text-sm text-muted-foreground">
          Adjust the controls to customize the plasma effect
        </p>
      </div>
    );
  }
  if (session.isLoggedIn) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {session.session.username}!
        </h1>
        <p className="text-gray-600">
          You are logged in as a {session.session.persona} user.
        </p>
      </div>
    );
  }
  return <div>Please log in</div>;
};
