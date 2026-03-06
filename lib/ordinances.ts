import { prisma } from "./db";
import { getSpeciesByName } from "./species";
import { toTitleCase } from "./utils";

export interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}

export interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}

export interface HeritageTreeRules {
  dbhThreshold: number | null;
  reviewProcess: string;
  notes: string;
  designatedByCouncil?: boolean;
  designatedByCommittee?: boolean;
  speciesRestricted?: boolean;
  protectedSpecies?: string[];
}

export interface OrdinanceData {
  cityName: string;
  state: string;
  protectedSpecies: ProtectedSpeciesRule[];
  defaultDbhThresholdNative: number | null;
  defaultDbhThresholdNonnative: number | null;
  certifierRequirement: string | null;
  mitigationRules: MitigationRules;
  heritageTreeRules: HeritageTreeRules;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  codeReference: string | null;
}

export async function getOrdinanceByCity(
  cityName: string
): Promise<OrdinanceData | null> {
  // Normalize input: trim + title case, and use case-insensitive match
  const normalized = toTitleCase(cityName);

  const ord = await prisma.municipalOrdinance.findFirst({
    where: {
      cityName: {
        equals: normalized,
        mode: "insensitive",
      },
    },
  });
  if (!ord) return null;

  return {
    ...ord,
    protectedSpecies: JSON.parse(ord.protectedSpecies) as ProtectedSpeciesRule[],
    mitigationRules: JSON.parse(ord.mitigationRules) as MitigationRules,
    heritageTreeRules: JSON.parse(ord.heritageTreeRules) as HeritageTreeRules,
  };
}

export interface OrdinanceContext {
  nativeThreshold: number | null;
  nonnativeThreshold: number | null;
  heritageThreshold: number | null;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  replantingRatio: string | null;
  inLieuFee: string | null;
  certifierRequirement: string | null;
}

export interface ProtectionCheckResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
  ordinanceContext: OrdinanceContext | null;
}

export async function checkTreeProtection(
  cityName: string,
  speciesCommon: string,
  dbhInches: number
): Promise<ProtectionCheckResult> {
  const ordinance = await getOrdinanceByCity(cityName);

  if (!ordinance) {
    return {
      isProtected: false,
      reason: `No ordinance data available for ${cityName}`,
      isHeritage: false,
      heritageReason: null,
      mitigationRequired: null,
      codeReference: null,
      ordinanceContext: null,
    };
  }

  const ordinanceContext: OrdinanceContext = {
    nativeThreshold: ordinance.defaultDbhThresholdNative,
    nonnativeThreshold: ordinance.defaultDbhThresholdNonnative,
    heritageThreshold: ordinance.heritageTreeRules.dbhThreshold ?? null,
    permitProcessNotes: ordinance.permitProcessNotes,
    ordinanceUrl: ordinance.ordinanceUrl,
    replantingRatio: ordinance.mitigationRules.replantingRatio || null,
    inLieuFee: ordinance.mitigationRules.inLieuFee || null,
    certifierRequirement: ordinance.certifierRequirement,
  };

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";
  const scientificName = species?.scientific?.toLowerCase();

  // Check species-specific rules first — match by common name OR scientific name
  const speciesRule = ordinance.protectedSpecies.find(
    (s) =>
      s.species.toLowerCase() === speciesCommon.toLowerCase() ||
      (scientificName && s.scientific.toLowerCase() === scientificName) ||
      s.species.toLowerCase() === "any tree"
  );

  let isProtected = false;
  let reason = "";

  if (speciesRule) {
    if (dbhInches >= speciesRule.dbhThreshold) {
      isProtected = true;
      reason = `${speciesCommon} with ${dbhInches}" DBH meets or exceeds ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} with ${dbhInches}" DBH does not meet ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    }
  } else {
    // Fall back to default thresholds based on native/non-native status
    const threshold = isNative
      ? ordinance.defaultDbhThresholdNative
      : ordinance.defaultDbhThresholdNonnative;

    if (threshold != null && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH meets or exceeds ${threshold}" ${isNative ? "native" : "non-native"} threshold per ${ordinance.codeReference}`;
    } else if (threshold != null) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} is not a regulated species under ${cityName}'s tree ordinance (${ordinance.codeReference})`;
    }
  }

  // Check heritage status — only if the ordinance uses a DBH-based heritage threshold
  let isHeritage = false;
  let heritageReason: string | null = null;
  const heritageRules = ordinance.heritageTreeRules;

  if (heritageRules.dbhThreshold != null && dbhInches >= heritageRules.dbhThreshold) {
    // Some cities restrict heritage status to certain species (e.g., Atherton: oaks + redwoods only)
    const speciesQualifies = !heritageRules.speciesRestricted ||
      (heritageRules.protectedSpecies && scientificName &&
        heritageRules.protectedSpecies.some(
          (s) => s.toLowerCase() === scientificName
        ));

    if (speciesQualifies) {
      isHeritage = true;
      isProtected = true; // Heritage always implies protected
      heritageReason = `Tree qualifies as heritage (${dbhInches}" DBH >= ${heritageRules.dbhThreshold}" threshold). ${heritageRules.reviewProcess}. ${heritageRules.notes}`;
      // Update reason to reflect heritage status if it wasn't already protected
      if (!reason.includes("meets or exceeds")) {
        reason = `${speciesCommon} with ${dbhInches}" DBH qualifies as heritage tree per ${ordinance.codeReference}`;
      }
    }
  } else if (heritageRules.designatedByCouncil || heritageRules.designatedByCommittee) {
    // Heritage is by designation only — we can't auto-determine, just note it
    heritageReason = `Heritage status in ${cityName} is by ${heritageRules.designatedByCouncil ? "City Council" : "committee"} designation only. ${heritageRules.notes}`;
  }

  // Mitigation info — only if protected
  let mitigationRequired: string | null = null;
  if (isProtected) {
    mitigationRequired = `${ordinance.mitigationRules.replantingRatio}. ${ordinance.mitigationRules.notes}`;
  }

  return {
    isProtected,
    reason,
    isHeritage,
    heritageReason,
    mitigationRequired,
    codeReference: ordinance.codeReference,
    ordinanceContext,
  };
}
