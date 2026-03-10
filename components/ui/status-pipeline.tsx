import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StatusPipelineStep {
  label: string;
  status: "completed" | "active" | "pending";
}

interface StatusPipelineProps {
  steps: StatusPipelineStep[];
  className?: string;
}

export function StatusPipeline({ steps, className }: StatusPipelineProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1">
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium shrink-0",
                step.status === "completed" &&
                  "bg-primary text-primary-foreground",
                step.status === "active" &&
                  "border-2 border-primary text-primary bg-background",
                step.status === "pending" &&
                  "border border-border text-muted-foreground bg-background"
              )}
            >
              {step.status === "completed" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium whitespace-nowrap hidden sm:inline",
                step.status === "completed" && "text-foreground",
                step.status === "active" && "text-primary",
                step.status === "pending" && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-4 sm:w-8",
                step.status === "completed" ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
