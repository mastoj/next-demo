import { randomFlag } from "@repo/ui/lib/flags";
import { Suspense } from "react";
import { FlagValue } from "@repo/ui/components/flag-value";
import { connection } from "next/server";

export const generateStaticParams = async () => {
  return [{ code: "__PLACEHOLDER__", stuff: "hello" }];
};

export type HomeProps = {
  params: Promise<{ code: string; stuff: string }>;
};

const RandomComponent = async () => {
  // Sleep for 2 seconds
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const randomValue = await randomFlag();
  return <FlagValue flag="randomFlag" value={randomValue} />;
};

export default async function Home({ params }: HomeProps) {
  const { stuff } = await params;
  return (
    <>
      <div className="text-4xl">{stuff}</div>
      <Suspense fallback={<div className="">Loading...</div>}>
        <RandomComponent />
      </Suspense>
    </>
  );
}
