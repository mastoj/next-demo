import { fixedFlag, precomputedFlags, randomFlag } from "@/lib/flags";
import { AppContext } from "@/lib/types";
import { Suspense } from "react";

export type HomeProps = {
  params: Promise<{ code: string; stuff: string }>;
};

const RandomComponent = async () => {
  // Sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const randomValue = await randomFlag();
  return (
    <div className="text-9xl">
      Random Component Loaded: {randomValue.toString()}{" "}
    </div>
  );
};

export default async function Home({ params }: HomeProps) {
  const { code, stuff } = await params;
  const urlDecoded = decodeURIComponent(code);
  const appContextJson = Buffer.from(urlDecoded, "base64").toString("utf-8");
  const appContext = JSON.parse(appContextJson) as AppContext;
  const fixedValue = await fixedFlag(appContext.flagCode, precomputedFlags);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {stuff}
        <div className="text-9xl">{fixedValue.toString()}</div>
        <Suspense fallback={<div className="text-9xl">Loading...</div>}>
          <RandomComponent />
        </Suspense>
      </main>
    </div>
  );
}
