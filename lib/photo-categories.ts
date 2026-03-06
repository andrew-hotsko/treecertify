// ---------------------------------------------------------------------------
// Photo category definitions per report type
// ---------------------------------------------------------------------------

export interface PhotoCategory {
  value: string;
  label: string;
  required: boolean;
}

export const PHOTO_CATEGORIES: Record<string, PhotoCategory[]> = {
  removal_permit: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "defect_detail", label: "Defect/Concern Detail", required: true },
    { value: "root_collar", label: "Root Collar / Base", required: false },
    { value: "canopy_below", label: "Canopy from Below", required: false },
    { value: "site_context", label: "Site Context", required: false },
  ],
  health_assessment: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "crown_detail", label: "Crown Detail", required: false },
    { value: "trunk_bark", label: "Trunk / Bark Detail", required: false },
    { value: "root_zone", label: "Root Zone", required: false },
    { value: "defects_noted", label: "Any Defects Noted", required: false },
  ],
  construction_encroachment: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "tpz_area", label: "TPZ / Construction Proximity", required: false },
    { value: "root_zone_grade", label: "Root Zone / Grade at Base", required: false },
    { value: "protection_measures", label: "Existing Protection Measures", required: false },
  ],
  tree_valuation: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "trunk_dbh", label: "Trunk at DBH", required: true },
    { value: "crown_form", label: "Crown Form & Structure", required: false },
    { value: "root_flare", label: "Root Flare / Base", required: false },
    { value: "notable_defects", label: "Notable Defects", required: false },
    { value: "site_context", label: "Site Context", required: false },
  ],
  real_estate_package: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "canopy_coverage", label: "Canopy & Shade", required: false },
    { value: "landscape_context", label: "Tree in Landscape", required: false },
    { value: "notable_features", label: "Notable Features", required: false },
    { value: "trunk_dbh", label: "Trunk at DBH", required: false },
    { value: "concerns", label: "Condition Concerns", required: false },
  ],
};

/**
 * Get photo categories for a report type. Falls back to a basic set.
 */
export function getCategoriesForReportType(reportType: string): PhotoCategory[] {
  return PHOTO_CATEGORIES[reportType] || [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "detail", label: "Detail", required: false },
    { value: "site_context", label: "Site Context", required: false },
  ];
}

/**
 * Generate an auto-caption from category, tree number, and species.
 */
export function autoCaptionFromCategory(
  categoryValue: string,
  treeNumber: number,
  speciesCommon: string,
  reportType: string
): string {
  const categories = getCategoriesForReportType(reportType);
  const cat = categories.find((c) => c.value === categoryValue);
  const catLabel = cat?.label || categoryValue.replace(/_/g, " ");
  return `${catLabel} — Tree #${treeNumber} (${speciesCommon || "Unknown species"})`;
}
