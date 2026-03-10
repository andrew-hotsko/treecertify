import { Skeleton } from "@/components/ui/skeleton";

export default function ReportLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-card">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      {/* Editor area skeleton */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 p-8 max-w-3xl mx-auto space-y-6">
          {/* Report title */}
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-px w-full" />

          {/* Sections */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}

          {/* Table skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <div className="border rounded overflow-hidden">
              <Skeleton className="h-8 w-full bg-muted/50" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex gap-2 p-2 border-t">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
