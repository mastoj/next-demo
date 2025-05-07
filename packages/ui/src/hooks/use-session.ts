import { useCookies } from "react-cookie";
import { Session, SessionData } from "./types";

export const useSession = (): Session => {
  const [cookies] = useCookies(["next-demo.session"]);
  const sessionCookie = cookies["next-demo.session"];
  if (sessionCookie) {
    const session = sessionCookie as SessionData;
    return {
      isLoggedIn: true,
      session,
    };
  }
  return {
    isLoggedIn: false,
  };
};
