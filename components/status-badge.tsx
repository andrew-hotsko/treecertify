import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-neutral-200 text-neutral-700 border-neutral-300",
  },
  ai_generated: {
    label: "AI Generated",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  arborist_reviewed: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  review: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  certified: {
    label: "Certified",
    className: "bg-forest/5 text-forest border-forest/20",
  },
  filed: {
    label: "Filed",
    className: "bg-teal-50 text-teal-700 border-teal-200",
  },
  amendment_in_progress: {
    label: "Amendment",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  active: {
    label: "Active",
    className: "bg-forest/5 text-forest border-forest/20",
  },
  archived: {
    label: "Archived",
    className: "bg-neutral-200 text-neutral-500 border-neutral-300",
  },
  assessed: {
    label: "Assessed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
