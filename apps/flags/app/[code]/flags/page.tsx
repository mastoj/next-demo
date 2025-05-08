import Link from "next/link";

export const dynamic = "force-static";

export default async function Home() {
  return (
    <>
      <Link href="/flags/hello" className="text-3xl">
        Go to hello
      </Link>
    </>
  );
}
