"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PENINSULA_SPECIES, type TreeSpecies } from "@/lib/species";

// ---------------------------------------------------------------------------
// Common species shortcuts — one-tap selection for the 15 most frequent species
// ---------------------------------------------------------------------------

const COMMON_SPECIES = [
  { common: "Coast Live Oak", scientific: "Quercus agrifolia" },
  { common: "Valley Oak", scientific: "Quercus lobata" },
  { common: "Blue Oak", scientific: "Quercus douglasii" },
  { common: "California Black Oak", scientific: "Quercus kelloggii" },
  { common: "Coast Redwood", scientific: "Sequoia sempervirens" },
  { common: "Monterey Pine", scientific: "Pinus radiata" },
  { common: "Blue Gum Eucalyptus", scientific: "Eucalyptus globulus" },
  { common: "Red Ironbark", scientific: "Eucalyptus sideroxylon" },
  { common: "Japanese Maple", scientific: "Acer palmatum" },
  { common: "London Plane", scientific: "Platanus × acerifolia" },
  { common: "Western Sycamore", scientific: "Platanus racemosa" },
  { common: "Deodar Cedar", scientific: "Cedrus deodara" },
  { common: "Italian Stone Pine", scientific: "Pinus pinea" },
  { common: "Southern Magnolia", scientific: "Magnolia grandiflora" },
  { common: "Chinese Elm", scientific: "Ulmus parvifolia" },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeciesSearchProps {
  value: string;
  onChange: (common: string, scientific: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SpeciesSearch({ value, onChange, className }: SpeciesSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Reset search when popover closes
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Split species into native and non-native groups
  const natives = PENINSULA_SPECIES.filter((s) => s.category === "native");
  const nonnatives = PENINSULA_SPECIES.filter((s) => s.category === "nonnative");

  function handleSelect(species: TreeSpecies) {
    onChange(species.common, species.scientific);
    setOpen(false);
  }

  function handleCommonSelect(sp: { common: string; scientific: string }) {
    onChange(sp.common, sp.scientific);
    setOpen(false);
  }

  function handleCustomEntry() {
    if (search.trim()) {
      onChange(search.trim(), "");
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {value || "Search species..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command
          filter={(itemValue, searchQuery) => {
            // cmdk filter: match against both common + scientific names
            const q = searchQuery.toLowerCase();
            if (!q) return 1;
            const species = PENINSULA_SPECIES.find(
              (s) => s.common === itemValue
            );
            if (!species) return 0;
            const common = species.common.toLowerCase();
            const scientific = species.scientific.toLowerCase();
            if (common.includes(q) || scientific.includes(q)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder="Search by common or scientific name..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-2">
                <p className="text-muted-foreground text-xs">No species found</p>
                {search.trim() && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomEntry}
                    className="gap-1.5"
                  >
                    <TreePine className="h-3.5 w-3.5" />
                    Use &ldquo;{search.trim()}&rdquo; as custom species
                  </Button>
                )}
              </div>
            </CommandEmpty>

            {/* Common species shortcuts — shown when search is empty */}
            {!search && (
              <div className="p-2 border-b">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Common Species
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SPECIES.map((sp) => (
                    <button
                      key={sp.scientific}
                      onClick={() => handleCommonSelect(sp)}
                      className={cn(
                        "text-xs px-2.5 py-1.5 rounded-full transition-colors border",
                        value === sp.common
                          ? "bg-[#1D4E3E] text-white border-[#1D4E3E]"
                          : "bg-[#1D4E3E]/5 text-[#1D4E3E] hover:bg-[#1D4E3E]/10 border-[#1D4E3E]/20"
                      )}
                    >
                      {sp.common}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <CommandGroup heading="Native Species">
              {natives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="default"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Non-native Species">
              {nonnatives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    non-native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
