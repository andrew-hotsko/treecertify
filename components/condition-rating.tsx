"use client";

interface ConditionRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md";
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

function getButtonClasses(rating: number, isSelected: boolean): string {
  if (!isSelected) return "border-muted hover:border-muted-foreground/40";

  switch (rating) {
    case 0:
      return "border-neutral-700 bg-neutral-100 text-neutral-800";
    case 1:
      return "border-red-500 bg-red-50 text-red-700";
    case 2:
      return "border-orange-500 bg-orange-50 text-orange-700";
    case 3:
      return "border-amber-500 bg-amber-50 text-amber-700";
    case 4:
      return "border-emerald-500 bg-emerald-50 text-emerald-700";
    case 5:
      return "border-green-600 bg-green-50 text-green-700";
    default:
      return "border-muted";
  }
}

export function ConditionRating({
  value,
  onChange,
  size = "md",
}: ConditionRatingProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="Condition rating">
      {[0, 1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          aria-label={`${CONDITION_LABELS[rating]} (${rating})`}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg border-2 transition-colors ${
            isSm ? "px-1 py-2 text-xs" : "px-1.5 py-3 text-sm"
          } ${getButtonClasses(rating, value === rating)}`}
          style={{ minHeight: 44 }}
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
