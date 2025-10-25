import { precomputedFlags } from "@repo/ui/lib/flags";
import { generatePermutations } from "flags/next";
import Link from "next/link";

export const generateStaticParams = async () => {
  const permutations = await generatePermutations(precomputedFlags);
  return permutations.map((code) => {
    return { code };
  });
};

export default async function Home() {
  console.log("flags page");
  return (
    <>
      <Link href="/flags/hello" className="text-3xl">
        Go to hello
      </Link>
    </>
  );
}
