"use client";

import { useState, useEffect, useRef } from "react";
import { Search, TreePine, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { PENINSULA_SPECIES, searchSpecies, type TreeSpecies } from "@/lib/species";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeciesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onChange: (common: string, scientific: string) => void;
  recentSpecies?: Array<{ common: string; scientific: string }>;
  arboristCommonSpecies?: string[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SpeciesSheet({
  open,
  onOpenChange,
  value,
  onChange,
  recentSpecies = [],
  arboristCommonSpecies = [],
}: SpeciesSheetProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset search and focus input when opening
  useEffect(() => {
    if (open) {
      setSearch("");
      // Delay to allow sheet animation
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Split species into native/non-native
  const natives = PENINSULA_SPECIES.filter((s) => s.category === "native");
  const nonnatives = PENINSULA_SPECIES.filter((s) => s.category === "nonnative");

  // Build "Your Species" from arborist presets
  const arboristSpecies: TreeSpecies[] = arboristCommonSpecies
    .map((name) => PENINSULA_SPECIES.find((s) => s.common.toLowerCase() === name.toLowerCase()))
    .filter((s): s is TreeSpecies => !!s);

  // Search results
  const filtered = search.trim() ? searchSpecies(search.trim()) : [];
  const isSearching = search.trim().length > 0;
  const noResults = isSearching && filtered.length === 0;

  function handleSelect(common: string, scientific: string) {
    onChange(common, scientific);
    onOpenChange(false);
  }

  function handleCustomEntry() {
    if (search.trim()) {
      onChange(search.trim(), "");
      onOpenChange(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[100dvh] p-0 flex flex-col"
        style={{ colorScheme: "light" }}
      >
        <SheetTitle className="sr-only">Select Species</SheetTitle>

        {/* Sticky search bar */}
        <div className="shrink-0 border-b bg-white px-4 pt-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              inputMode="search"
              placeholder="Search species..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-200 bg-neutral-50 text-base focus:outline-none focus:ring-2 focus:ring-[#1D4E3E]/30 focus:border-[#1D4E3E]"
            />
          </div>
        </div>

        {/* Scrollable species list */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* ---- Searching mode: flat filtered list ---- */}
          {isSearching && (
            <div className="py-2">
              {filtered.map((sp) => (
                <SpeciesRow
                  key={sp.scientific}
                  common={sp.common}
                  scientific={sp.scientific}
                  category={sp.category}
                  selected={value === sp.common}
                  onSelect={() => handleSelect(sp.common, sp.scientific)}
                />
              ))}

              {/* Custom entry when no match */}
              {noResults && (
                <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
                  <p className="text-sm text-neutral-500">No species found</p>
                  <button
                    type="button"
                    onClick={handleCustomEntry}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1D4E3E]/20 bg-[#1D4E3E]/5 text-sm font-medium text-[#1D4E3E] active:scale-[0.98] transition-transform"
                  >
                    <TreePine className="h-4 w-4" />
                    Use &ldquo;{search.trim()}&rdquo;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ---- Browse mode: sections ---- */}
          {!isSearching && (
            <>
              {/* Recent species */}
              {recentSpecies.length > 0 && (
                <div className="px-4 pt-4 pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Recent
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSpecies.map((sp) => (
                      <button
                        key={sp.common}
                        type="button"
                        onClick={() => handleSelect(sp.common, sp.scientific)}
                        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                          value === sp.common
                            ? "bg-[#1D4E3E] text-white"
                            : "bg-[#1D4E3E]/5 text-[#1D4E3E] border border-[#1D4E3E]/20"
                        }`}
                        style={{ minHeight: 44 }}
                      >
                        {sp.common}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Arborist's common species */}
              {arboristSpecies.length > 0 && (
                <div className="px-4 pt-3 pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Your Species
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {arboristSpecies.map((sp) => (
                      <button
                        key={sp.common}
                        type="button"
                        onClick={() => handleSelect(sp.common, sp.scientific)}
                        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                          value === sp.common
                            ? "bg-[#1D4E3E] text-white"
                            : "bg-neutral-100 text-neutral-700 border border-neutral-200"
                        }`}
                        style={{ minHeight: 44 }}
                      >
                        {sp.common}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Native species */}
              <div className="mt-2">
                <div className="px-4 py-2 bg-neutral-50 border-y border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-500">
                    Native Species
                  </p>
                </div>
                {natives.map((sp) => (
                  <SpeciesRow
                    key={sp.scientific}
                    common={sp.common}
                    scientific={sp.scientific}
                    category={sp.category}
                    selected={value === sp.common}
                    onSelect={() => handleSelect(sp.common, sp.scientific)}
                  />
                ))}
              </div>

              {/* Non-native species */}
              <div>
                <div className="px-4 py-2 bg-neutral-50 border-y border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-500">
                    Non-native Species
                  </p>
                </div>
                {nonnatives.map((sp) => (
                  <SpeciesRow
                    key={sp.scientific}
                    common={sp.common}
                    scientific={sp.scientific}
                    category={sp.category}
                    selected={value === sp.common}
                    onSelect={() => handleSelect(sp.common, sp.scientific)}
                  />
                ))}
              </div>

              {/* Bottom padding */}
              <div className="h-8" />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------
// Species Row
// ---------------------------------------------------------------------------

function SpeciesRow({
  common,
  scientific,
  selected,
  onSelect,
}: {
  common: string;
  scientific: string;
  category: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left active:bg-neutral-50 transition-colors ${
        selected ? "bg-[#1D4E3E]/5" : ""
      }`}
      style={{ minHeight: 48 }}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${selected ? "font-semibold text-[#1D4E3E]" : "font-medium text-neutral-900"}`}>
          {common}
        </p>
        <p className="text-xs text-neutral-400 italic truncate">{scientific}</p>
      </div>
      {selected && (
        <Check className="h-4 w-4 text-[#1D4E3E] shrink-0" />
      )}
    </button>
  );
}
