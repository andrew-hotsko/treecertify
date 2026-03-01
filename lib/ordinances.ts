import { prisma } from "./db";
import { getSpeciesByName } from "./species";

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
  dbhThreshold: number;
  reviewProcess: string;
  notes: string;
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
  const ord = await prisma.municipalOrdinance.findUnique({
    where: { cityName },
  });
  if (!ord) return null;

  return {
    ...ord,
    protectedSpecies: JSON.parse(ord.protectedSpecies) as ProtectedSpeciesRule[],
    mitigationRules: JSON.parse(ord.mitigationRules) as MitigationRules,
    heritageTreeRules: JSON.parse(ord.heritageTreeRules) as HeritageTreeRules,
  };
}

export interface ProtectionCheckResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
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
    };
  }

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";

  // Check species-specific rules first
  const speciesRule = ordinance.protectedSpecies.find(
    (s) =>
      s.species.toLowerCase() === speciesCommon.toLowerCase() ||
      s.species.toLowerCase() === "any tree"
  );

  let isProtected = false;
  let reason = "";

  if (speciesRule) {
    if (dbhInches >= speciesRule.dbhThreshold) {
      isProtected = true;
      reason = `${speciesCommon} with ${dbhInches}" DBH exceeds ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} with ${dbhInches}" DBH does not meet ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    }
  } else {
    // Fall back to default thresholds
    const threshold = isNative
      ? ordinance.defaultDbhThresholdNative
      : ordinance.defaultDbhThresholdNonnative;

    if (threshold && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH exceeds ${threshold}" ${isNative ? "native" : "non-native"} threshold per ${ordinance.codeReference}`;
    } else if (threshold) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `No applicable DBH threshold found for this species in ${cityName}`;
    }
  }

  // Check heritage status
  let isHeritage = false;
  let heritageReason: string | null = null;
  if (ordinance.heritageTreeRules.dbhThreshold && dbhInches >= ordinance.heritageTreeRules.dbhThreshold) {
    isHeritage = true;
    heritageReason = `Tree qualifies as heritage (${dbhInches}" DBH >= ${ordinance.heritageTreeRules.dbhThreshold}" threshold). ${ordinance.heritageTreeRules.reviewProcess}. ${ordinance.heritageTreeRules.notes}`;
  }

  // Mitigation info
  let mitigationRequired: string | null = null;
  if (isProtected) {
    mitigationRequired = `Replanting ratio: ${ordinance.mitigationRules.replantingRatio}. ${ordinance.mitigationRules.notes}`;
  }

  return {
    isProtected,
    reason,
    isHeritage,
    heritageReason,
    mitigationRequired,
    codeReference: ordinance.codeReference,
  };
}
