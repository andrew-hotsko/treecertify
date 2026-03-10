import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyMapLoading() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
