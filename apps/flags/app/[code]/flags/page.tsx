import { fixedFlag, precomputedFlags } from "@/lib/flags";
import { AppContext } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-static";

export type HomeProps = {
  params: Promise<{ code: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { code } = await params;
  const urlDecoded = decodeURIComponent(code);
  const appContextJson = Buffer.from(urlDecoded, "base64").toString("utf-8");
  const appContext = JSON.parse(appContextJson) as AppContext;
  const fixedValue = (
    await fixedFlag(appContext.flagCode, precomputedFlags)
  ).toString();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-9xl">{fixedValue}</div>
        <Link href="/flags/hello" className="text-9xl">
          hello
        </Link>
      </main>
    </div>
  );
}
