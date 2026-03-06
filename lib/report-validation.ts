import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValidationCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  message: string;
  fixPath?: string;
}

export interface ValidationResult {
  checks: ValidationCheck[];
  hasFailures: boolean;
  hasWarnings: boolean;
  allPassed: boolean;
}

// ---------------------------------------------------------------------------
// Main validation function
// ---------------------------------------------------------------------------

export async function validateReportForCertification(
  reportId: string
): Promise<ValidationResult> {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    include: {
      arborist: true,
      property: {
        include: {
          trees: {
            include: {
              treePhotos: { select: { id: true, category: true } },
            },
          },
        },
      },
    },
  });

  if (!report) {
    return {
      checks: [
        {
          id: "report_exists",
          label: "Report exists",
          status: "fail",
          message: "Report not found",
        },
      ],
      hasFailures: true,
      hasWarnings: false,
      allPassed: false,
    };
  }

  const checks: ValidationCheck[] = [];
  const { arborist, property } = report;
  const trees = property.trees;
  const reportType = report.reportType;

  // ---- Blocking checks (fail) ----

  // 1. Arborist has ISA certification number
  if (!arborist.isaCertificationNum || arborist.isaCertificationNum.trim() === "") {
    checks.push({
      id: "isa_cert",
      label: "ISA certification number",
      status: "fail",
      message: "Your profile is missing an ISA certification number",
      fixPath: "/settings",
    });
  } else {
    checks.push({
      id: "isa_cert",
      label: "ISA certification number",
      status: "pass",
      message: `ISA #${arborist.isaCertificationNum}`,
    });
  }

  // 2. At least one tree exists
  if (trees.length === 0) {
    checks.push({
      id: "trees_exist",
      label: "Trees assessed",
      status: "fail",
      message: "No trees have been added to this property",
      fixPath: `/properties/${property.id}`,
    });
  } else {
    checks.push({
      id: "trees_exist",
      label: "Trees assessed",
      status: "pass",
      message: `${trees.length} tree${trees.length === 1 ? "" : "s"} on this property`,
    });
  }

  // 3. Report has content
  const reportContent = report.finalContent || report.aiDraftContent || "";
  if (!reportContent.trim()) {
    checks.push({
      id: "report_content",
      label: "Report content",
      status: "fail",
      message: "The report has no content — generate or write the report first",
    });
  } else {
    checks.push({
      id: "report_content",
      label: "Report content",
      status: "pass",
      message: `${reportContent.split(/\s+/).length} words`,
    });
  }

  // ---- Warning checks ----

  // 4. Trees with incomplete core data
  const incompleteCoreTrees = trees.filter(
    (t) =>
      !t.speciesCommon || t.speciesCommon.trim() === "" ||
      !t.dbhInches || t.dbhInches === 0 ||
      !t.conditionRating || t.conditionRating === 0
  );
  if (incompleteCoreTrees.length > 0) {
    const nums = incompleteCoreTrees.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "tree_data",
      label: "Tree data completeness",
      status: "warning",
      message: `${incompleteCoreTrees.length} tree${incompleteCoreTrees.length === 1 ? " is" : "s are"} missing species, DBH, or condition rating (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0) {
    checks.push({
      id: "tree_data",
      label: "Tree data completeness",
      status: "pass",
      message: "All trees have species, DBH, and condition rating",
    });
  }

  // 5. Trees with no photos
  const treesWithoutPhotos = trees.filter((t) => t.treePhotos.length === 0);
  if (treesWithoutPhotos.length > 0) {
    const nums = treesWithoutPhotos.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "tree_photos",
      label: "Tree photos",
      status: "warning",
      message: `${treesWithoutPhotos.length} tree${treesWithoutPhotos.length === 1 ? " has" : "s have"} no photos (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0) {
    checks.push({
      id: "tree_photos",
      label: "Tree photos",
      status: "pass",
      message: "All trees have at least one photo",
    });
  }

  // 5b. Trees missing a "full tree" photo (categorized)
  const treesWithPhotosButNoFullTree = trees.filter(
    (t) =>
      t.treePhotos.length > 0 &&
      !t.treePhotos.some((p) => p.category === "full_tree")
  );
  if (treesWithPhotosButNoFullTree.length > 0) {
    const nums = treesWithPhotosButNoFullTree.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "full_tree_photo",
      label: "Full tree photo",
      status: "warning",
      message: `${treesWithPhotosButNoFullTree.length} tree${treesWithPhotosButNoFullTree.length === 1 ? " is" : "s are"} missing a photo categorized as "Full tree" (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0 && treesWithoutPhotos.length === 0) {
    checks.push({
      id: "full_tree_photo",
      label: "Full tree photo",
      status: "pass",
      message: "All trees have a full tree photo",
    });
  }

  // 6. Type-specific checks
  if (reportType === "removal_permit") {
    const removeTrees = trees.filter((t) => t.recommendedAction === "remove");
    const uncheckedRemoveTrees = removeTrees.filter(
      (t) => !t.isProtected && !t.protectionReason
    );
    if (uncheckedRemoveTrees.length > 0) {
      const nums = uncheckedRemoveTrees.map((t) => `#${t.treeNumber}`).join(", ");
      checks.push({
        id: "ordinance_check",
        label: "Ordinance check",
        status: "warning",
        message: `${uncheckedRemoveTrees.length} tree${uncheckedRemoveTrees.length === 1 ? "" : "s"} marked for removal without an ordinance check (${nums})`,
        fixPath: `/properties/${property.id}`,
      });
    } else if (removeTrees.length > 0) {
      checks.push({
        id: "ordinance_check",
        label: "Ordinance check",
        status: "pass",
        message: "All removal trees have been checked against ordinances",
      });
    }
  }

  if (reportType === "health_assessment") {
    // Check for TRAQ completeness if TRAQ is enabled
    let traqEnabled = false;
    try {
      const opts = JSON.parse(report.reportOptions || "{}");
      traqEnabled = !!opts.includeTraq;
    } catch { /* ignore */ }

    if (traqEnabled) {
      const incompleteTRAQ = trees.filter((t) => {
        if (!t.typeSpecificData) return true;
        try {
          const data = JSON.parse(t.typeSpecificData);
          return !data.likelihoodOfFailure || !data.likelihoodOfImpact || !data.consequences;
        } catch {
          return true;
        }
      });
      if (incompleteTRAQ.length > 0) {
        const nums = incompleteTRAQ.map((t) => `#${t.treeNumber}`).join(", ");
        checks.push({
          id: "traq_data",
          label: "TRAQ risk assessment",
          status: "warning",
          message: `${incompleteTRAQ.length} tree${incompleteTRAQ.length === 1 ? " is" : "s are"} missing TRAQ fields (${nums})`,
          fixPath: `/properties/${property.id}`,
        });
      } else {
        checks.push({
          id: "traq_data",
          label: "TRAQ risk assessment",
          status: "pass",
          message: "All trees have complete TRAQ data",
        });
      }
    }
  }

  // --- Valuation-specific checks (tree_valuation and real_estate_package) ---
  if (reportType === "tree_valuation" || reportType === "real_estate_package") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ta = trees as any[];

    // BLOCKING: Every tree must have an appraised value > $0
    const treesNoValue = ta.filter((t) => !t.valuationAppraisedValue || t.valuationAppraisedValue <= 0);
    if (treesNoValue.length > 0) {
      checks.push({
        id: "valuation_appraised",
        label: "Tree appraised values",
        status: "fail",
        message: `All trees must have an appraised value greater than $0. Check that unit price and condition ratings are set for every tree. (${treesNoValue.map((t: { treeNumber: number }) => `#${t.treeNumber}`).join(", ")})`,
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({ id: "valuation_appraised", label: "Tree appraised values", status: "pass", message: "All trees have appraised values" });
    }

    // BLOCKING: Every tree must have unit price
    const treesNoPrice = ta.filter((t) => !t.valuationUnitPrice || t.valuationUnitPrice <= 0);
    if (treesNoPrice.length > 0) {
      checks.push({
        id: "valuation_unit_price",
        label: "Unit price",
        status: "fail",
        message: `Unit price must be set for all trees. (${treesNoPrice.map((t: { treeNumber: number }) => `#${t.treeNumber}`).join(", ")})`,
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({ id: "valuation_unit_price", label: "Unit price", status: "pass", message: "All trees have unit price set" });
    }

    // BLOCKING: All three condition components > 0
    const treesNoCondition = ta.filter((t) =>
      !t.valuationHealthRating || !t.valuationStructureRating || !t.valuationFormRating
    );
    if (treesNoCondition.length > 0) {
      checks.push({
        id: "valuation_condition_components",
        label: "Condition ratings",
        status: "fail",
        message: `Health, Structure, and Form condition ratings must all be set for every tree. (${treesNoCondition.map((t: { treeNumber: number }) => `#${t.treeNumber}`).join(", ")})`,
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({ id: "valuation_condition_components", label: "Condition ratings", status: "pass", message: "All trees have condition component ratings" });
    }

    // BLOCKING: Report must have valuation purpose
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(report as any).valuationPurpose) {
      checks.push({
        id: "valuation_purpose",
        label: "Purpose of appraisal",
        status: "fail",
        message: "Purpose of Appraisal must be set before certifying.",
        fixPath: `/properties/${property.id}`,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      checks.push({ id: "valuation_purpose", label: "Purpose of appraisal", status: "pass", message: `Purpose: ${(report as any).valuationPurpose}` });
    }

    // BLOCKING: Report must have basis statement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const basis = (report as any).valuationBasisStatement;
    if (!basis || (typeof basis === "string" && basis.trim().length === 0)) {
      checks.push({
        id: "valuation_basis",
        label: "Valuation basis statement",
        status: "fail",
        message: "Valuation Basis Statement must be set before certifying.",
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({ id: "valuation_basis", label: "Valuation basis statement", status: "pass", message: "Basis statement set" });
    }

    // ADVISORY: Very low condition rating
    const lowConditionTrees = ta.filter((t) =>
      t.valuationConditionRating != null && t.valuationConditionRating < 25
    );
    if (lowConditionTrees.length > 0) {
      checks.push({
        id: "valuation_low_condition",
        label: "Low condition rating",
        status: "warning",
        message: `${lowConditionTrees.length} tree(s) have condition ratings below 25%. This is very low — confirm this is intentional before certifying.`,
      });
    }

    // ADVISORY: Very low total valuation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalVal = (report as any).valuationTotalValue;
    if (totalVal != null && totalVal < 500) {
      checks.push({
        id: "valuation_low_total",
        label: "Low total valuation",
        status: "warning",
        message: "Total appraised value is below $500. This is unusually low — confirm before certifying.",
      });
    }

    // ADVISORY: real_estate_package — missing realtor info
    if (reportType === "real_estate_package") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(report as any).reRealtorName) {
        checks.push({
          id: "re_realtor_info",
          label: "Realtor information",
          status: "warning",
          message: "No realtor information entered. The share page and PDF will not include realtor contact details.",
        });
      }
    }
  }

  // 7. Report sections shorter than 50 characters (placeholder content)
  if (reportContent.trim()) {
    const sectionPattern = /^#{1,3}\s+.+$/gm;
    const sectionHeaders = reportContent.match(sectionPattern) || [];
    const sections = reportContent.split(/^#{1,3}\s+.+$/m).slice(1); // content after each header
    const shortSections: string[] = [];

    for (let i = 0; i < sections.length; i++) {
      const sectionContent = sections[i].trim();
      if (sectionContent.length > 0 && sectionContent.length < 50) {
        const header = sectionHeaders[i]?.replace(/^#+\s+/, "") || `Section ${i + 1}`;
        shortSections.push(header);
      }
    }

    if (shortSections.length > 0) {
      checks.push({
        id: "section_length",
        label: "Report section depth",
        status: "warning",
        message: `${shortSections.length} section${shortSections.length === 1 ? " appears" : "s appear"} to have placeholder content`,
      });
    } else if (sectionHeaders.length > 0) {
      checks.push({
        id: "section_length",
        label: "Report section depth",
        status: "pass",
        message: `${sectionHeaders.length} sections with substantive content`,
      });
    }
  }

  // ---- Compute summary ----

  const hasFailures = checks.some((c) => c.status === "fail");
  const hasWarnings = checks.some((c) => c.status === "warning");
  const allPassed = !hasFailures && !hasWarnings;

  return { checks, hasFailures, hasWarnings, allPassed };
}
