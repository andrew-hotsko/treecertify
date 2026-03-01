"use client";

interface ButtonOption {
  value: string;
  label: string;
  color?: string; // Tailwind color prefix e.g. "red", "amber", "green"
}

interface ButtonSelectorProps {
  options: ButtonOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

function getSelectedClasses(color?: string): string {
  switch (color) {
    case "red":
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case "orange":
      return "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case "amber":
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    case "green":
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case "blue":
      return "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    case "gray":
      return "border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  }
}

export function ButtonSelector({
  options,
  value,
  onChange,
  size = "md",
}: ButtonSelectorProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border-2 font-medium transition-colors ${
              isSm ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
            } ${
              isSelected
                ? getSelectedClasses(opt.color)
                : "border-muted hover:border-muted-foreground/40"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
