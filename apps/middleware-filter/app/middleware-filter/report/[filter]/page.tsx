import { Suspense } from "react";
import { RecordsTable } from "@/components/records-table";
import { TableSkeleton } from "@/components/table-skeleton";

export const dynamic = "force-static"; // Force dynamic rendering
export const revalidate = 20; // Disable revalidation

export default async function Home({
  params,
}: {
  params: Promise<{ filter: string }>;
}) {
  console.log("[report/page.tsx] params", params);
  const { filter } = await params;
  // base64 decode the filter
  const decodedFilter = decodeURIComponent(filter);
  const searchParams = JSON.parse(
    Buffer.from(decodedFilter, "base64").toString("utf-8")
  ) as {
    category?: string | string[];
    year?: string | string[];
    holder?: string | string[];
  };
  return (
    <main className="container py-16 mx-auto max-w-6xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl font-light tracking-tight text-[color:var(--nordic-800)]">
            Obscure World Records
          </h1>
          <p className="text-[color:var(--nordic-500)] leading-relaxed">
            A collection of unusual and lesser-known world records that have
            been officially recognized. This page demonstrates server-side
            rendering with query parameter filtering.
          </p>
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <RecordsTable
            searchParams={searchParams}
            basePath="/middleware-filter/report"
          />
        </Suspense>
      </div>
    </main>
  );
}
