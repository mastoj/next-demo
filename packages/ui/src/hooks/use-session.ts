import { useCookies } from "react-cookie";

export type SessionData = {
  username: string;
  persona: string;
};

export type Session =
  | {
      isLoggedIn: true;
      session: SessionData;
    }
  | {
      isLoggedIn: false;
    };

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
