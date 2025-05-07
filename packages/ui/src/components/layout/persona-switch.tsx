import { personas } from "@repo/ui/hooks/types";
import { useSession } from "@repo/ui/hooks/use-session";
import { cn } from "@repo/ui/lib/utils";
import { useIsClient } from "@uidotdev/usehooks";

export const PersonaSwitch = () => {
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
        {personas.map((persona) => {
          const isActive = session.session?.persona === persona;
          return (
            <li key={persona}>
              {isActive ? (
                <span className="text-red-500 underline capitalize">
                  {persona}
                </span>
              ) : (
                <a
                  href={`/auth/toggle?persona=${persona}`}
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
