import Link from "next/link";

export const dynamic = "force-static";

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
