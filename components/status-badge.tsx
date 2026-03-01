import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 border-gray-200",
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
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  filed: {
    label: "Filed",
    className: "bg-teal-50 text-teal-700 border-teal-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-500 border-gray-200",
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
