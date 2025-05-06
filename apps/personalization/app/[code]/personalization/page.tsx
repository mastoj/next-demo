export const dynamic = "force-static";

type PersonalizationPageProps = {
  params: Promise<{
    code: string;
  }>;
};
export default async function PersonalizationPage({
  params,
}: PersonalizationPageProps) {
  const { code } = await params;
  const urlDecoded = decodeURIComponent(code);
  const sessionJson = Buffer.from(urlDecoded, "base64").toString("utf-8");
  console.log("==> Session JSON: ", sessionJson, code);
  const session = JSON.parse(sessionJson);
  return (
    <div>
      <h1>Personalization Page</h1>
      <p>This is the personalization page. {JSON.stringify(session)}</p>
    </div>
  );
}
