import { countries, Session } from "@repo/ui/hooks/types";

export const dynamic = "force-static";

const getSession = (code: string) => {
  const urlDecoded = decodeURIComponent(code);
  const sessionJson = Buffer.from(urlDecoded, "base64").toString("utf-8");
  const session = JSON.parse(sessionJson);
  return session as Session;
};

const getFlag = (countryCode: string) => {
  const country = countries.find((c) => c.id === countryCode);
  if (country) {
    return country.flag;
  }
  return "🏳️";
};

type PersonalizationPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function PersonalizationPage({
  params,
}: PersonalizationPageProps) {
  const { code } = await params;
  const session = getSession(code);

  if (!session.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-9xl">❓</div>
      </div>
    );
  }

  const flag = getFlag(session.session.country);
  const isPremium = session.session.persona === "premium";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`text-9xl ${isPremium ? "animate-spin" : ""}`}>
        {flag}
      </div>
    </div>
  );
}
