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
              treePhotos: { select: { id: true } },
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

  if (reportType === "tree_valuation") {
    const incompleteValuation = trees.filter((t) => {
      if (!t.typeSpecificData) return true;
      try {
        const data = JSON.parse(t.typeSpecificData);
        return !data.speciesRating || !data.conditionRating;
      } catch {
        return true;
      }
    });
    if (incompleteValuation.length > 0) {
      const nums = incompleteValuation.map((t) => `#${t.treeNumber}`).join(", ");
      checks.push({
        id: "valuation_data",
        label: "Valuation data",
        status: "warning",
        message: `${incompleteValuation.length} tree${incompleteValuation.length === 1 ? " is" : "s are"} missing species rating or condition percentage (${nums})`,
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({
        id: "valuation_data",
        label: "Valuation data",
        status: "pass",
        message: "All trees have valuation data",
      });
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
