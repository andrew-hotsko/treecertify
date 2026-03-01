"use client";

interface ConditionRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md";
}

const CONDITION_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export function ConditionRating({
  value,
  onChange,
  size = "md",
}: ConditionRatingProps) {
  const isSm = size === "sm";

  function getSelectedClasses(rating: number): string {
    if (rating <= 2) {
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    }
    if (rating === 3) {
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    }
    return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  }

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg border-2 transition-colors ${
            isSm ? "px-1.5 py-2 text-xs" : "px-2 py-3 text-sm"
          } ${
            value === rating
              ? getSelectedClasses(rating)
              : "border-muted hover:border-muted-foreground/40"
          }`}
        >
          <span className={`font-bold ${isSm ? "text-sm" : "text-lg"}`}>
            {rating}
          </span>
          <span
            className={`leading-tight font-medium ${
              isSm ? "text-[9px]" : "text-[10px]"
            }`}
          >
            {CONDITION_LABELS[rating]}
          </span>
        </button>
      ))}
    </div>
  );
}
