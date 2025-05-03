import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableSkeleton() {
  return (
    <div className="bg-white rounded-[2px]">
      <div className="p-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-[120px]" />
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[150px]" />
            </div>
          </div>

          <div className="border-t border-b border-[color:var(--nordic-100)]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead>
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-10" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-5 w-16" />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Skeleton className="h-5 w-16" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-[color:var(--nordic-100)]">
                    <TableCell>
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Skeleton className="h-5 w-40" />
        </div>
      </div>
    </div>
  )
}
