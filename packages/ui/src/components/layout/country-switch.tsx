"use client";
import { countries } from "@repo/ui/hooks/types";
import { useSession } from "@repo/ui/hooks/use-session";
import { useIsClient } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

export const CountrySwitch = () => {
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
        {countries.map((country) => {
          const isActive = session.session?.country === country.id;
          return (
            <li key={country.id}>
              {isActive ? (
                <span className="underline text-red-500 p-1 underline-offset-4">
                  {country.flag}
                </span>
              ) : (
                <a
                  href={`/auth/toggle?country=${country.id}&returnUrl=${returnUrl}`}
                  className={"p-1"}
                >
                  {country.flag}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
