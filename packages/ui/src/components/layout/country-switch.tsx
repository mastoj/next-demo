import { countries, personas } from "@repo/ui/hooks/types";
import { useSession } from "@repo/ui/hooks/use-session";
import { cn } from "@repo/ui/lib/utils";
import { useIsClient } from "@uidotdev/usehooks";

export const CountrySwitch = () => {
  const isClient = useIsClient();
  const session = useSession();
  if (!isClient) {
    return null;
  }
  if (!session.isLoggedIn) {
    return null;
  }
  return (
    <div>
      <ul className="flex gap-2">
        {countries.map((country) => {
          const isActive = session.session?.country === country.id;
          return (
            <li key={country.id}>
              {isActive ? (
                <span className="capitalize border border-red-500 p-1">
                  {country.flag}
                </span>
              ) : (
                <a
                  href={`/auth/toggle?country=${country.id}`}
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
