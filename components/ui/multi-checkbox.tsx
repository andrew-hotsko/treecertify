"use client";

interface MultiCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2;
}

export function MultiCheckbox({
  options,
  selected,
  onChange,
  columns = 2,
}: MultiCheckboxProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div
      className={`grid gap-x-3 gap-y-1.5 ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-xs cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded border-input h-3.5 w-3.5"
          />
          <span className="leading-tight">{option}</span>
        </label>
      ))}
    </div>
  );
}
