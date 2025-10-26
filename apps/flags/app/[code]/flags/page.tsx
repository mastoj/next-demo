import Link from "next/link";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return [{ code: "__PLACEHOLDER__" }];
};

export default async function Home(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;
  if (code === "__PLACEHOLDER__") {
    notFound();
  }
  return (
    <>
      <Link href="/flags/hello" className="text-3xl">
        Go to hello
      </Link>
    </>
  );
}
