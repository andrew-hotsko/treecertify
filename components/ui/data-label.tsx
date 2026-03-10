import { cn } from "@/lib/utils";

interface DataLabelProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  className?: string;
}

export function DataLabel({ label, value, mono, className }: DataLabelProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span
        className={cn(
          "text-sm text-foreground",
          mono && "font-mono"
        )}
      >
        {value}
      </span>
    </div>
  );
}
