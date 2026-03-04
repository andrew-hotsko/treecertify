"use client";

interface MultiCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2;
  exclusiveOption?: string;
}

export function MultiCheckbox({
  options,
  selected,
  onChange,
  columns = 2,
  exclusiveOption,
}: MultiCheckboxProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      // Unchecking
      onChange(selected.filter((s) => s !== option));
    } else {
      // Checking
      if (exclusiveOption && option === exclusiveOption) {
        // Exclusive option selected — uncheck all others
        onChange([exclusiveOption]);
      } else if (exclusiveOption && selected.includes(exclusiveOption)) {
        // Non-exclusive selected while exclusive is checked — remove exclusive
        onChange(
          selected.filter((s) => s !== exclusiveOption).concat(option)
        );
      } else {
        onChange([...selected, option]);
      }
    }
  }

  return (
    <div
      className={`grid gap-x-3 gap-y-1.5 ${
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-xs cursor-pointer min-h-[40px] md:min-h-0"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded border-input h-3.5 w-3.5 shrink-0"
          />
          <span className="leading-tight">{option}</span>
        </label>
      ))}
    </div>
  );
}
