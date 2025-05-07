export const personas = ["premium", "basic"];
export type Persona = (typeof personas)[number];

export const countries = [
  { id: "no", name: "Norway", flag: "🇳🇴" },
  { id: "se", name: "Sweden", flag: "🇸🇪" },
  { id: "dk", name: "Denmark", flag: "🇩🇰" },
  { id: "fi", name: "Finland", flag: "🇫🇮" },
];

export type Country = (typeof countries)[number];
export type CountryId = (typeof countries)[number]["id"];

export type SessionData = {
  username: string;
  persona: Persona;
  country: CountryId;
};

export type Session =
  | {
      isLoggedIn: true;
      session: SessionData;
    }
  | {
      isLoggedIn: false;
    };
