"use client";
import { personas } from "@repo/ui/hooks/types";
import { useSession } from "@repo/ui/hooks/use-session";
import { useIsClient } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

export const PersonaSwitch = () => {
  const pathname = usePathname();
  const isClient = useIsClient();
  const session = useSession();
  if (!isClient) {
    return null;
  }
  if (!session.isLoggedIn) {
    return null;
  }
  const returnUrl = `${window.location.origin}${pathname}`;
  return (
    <div>
      <ul className="flex gap-2">
        {personas.map((persona) => {
          const isActive = session.session?.persona === persona;
          return (
            <li key={persona}>
              {isActive ? (
                <span className="text-red-500 underline capitalize underline-offset-4">
                  {persona}
                </span>
              ) : (
                <a
                  href={`/auth/toggle?persona=${persona}&returnUrl=${returnUrl}`}
                  className={"capitalize"}
                >
                  {persona}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
