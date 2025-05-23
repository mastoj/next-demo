import { Suspense } from "react";
import { RecordsTable } from "@/components/records-table";
import { TableSkeleton } from "@/components/table-skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string | string[];
    year?: string | string[];
    holder?: string | string[];
  }>;
}) {
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
            searchParams={await searchParams}
            basePath="/middleware-filter"
          />
        </Suspense>
      </div>
    </main>
  );
}
