import { Skeleton } from "@/components/ui/skeleton";

export default function OrdinancesLoading() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 mt-2" />
      </div>

      {/* Ordinance cards */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-3 w-48 mt-1" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Species table skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="border rounded overflow-hidden">
                  <div className="bg-muted/50 p-2">
                    <Skeleton className="h-3 w-full" />
                  </div>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="p-2 flex gap-4 border-t">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/6" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitigation / heritage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
