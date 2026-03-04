/**
 * Test script for ordinance check logic.
 * Simulates checkTreeProtection without requiring a database connection
 * by using the seed data directly.
 *
 * Run: npx tsx scripts/test-ordinances.ts
 */

import { getSpeciesByName } from "../lib/species";

// --- Types (mirroring lib/ordinances.ts) ---
interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}

interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}

interface HeritageTreeRules {
  dbhThreshold: number | null;
  reviewProcess: string;
  notes: string;
  designatedByCouncil?: boolean;
  designatedByCommittee?: boolean;
  speciesRestricted?: boolean;
  protectedSpecies?: string[];
}

interface OrdinanceData {
  cityName: string;
  protectedSpecies: ProtectedSpeciesRule[];
  defaultDbhThresholdNative: number | null;
  defaultDbhThresholdNonnative: number | null;
  mitigationRules: MitigationRules;
  heritageTreeRules: HeritageTreeRules;
  codeReference: string | null;
}

// --- Seed data (parsed from seed.ts) ---
const ordinances: OrdinanceData[] = [
  {
    cityName: "Palo Alto",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 11.5, category: "native" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 11.5, category: "native" },
      { species: "California Incense Cedar", scientific: "Calocedrus decurrens", dbhThreshold: 11.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
    ],
    defaultDbhThresholdNative: 15,
    defaultDbhThresholdNonnative: 15,
    mitigationRules: { replantingRatio: "Per TLTM Table 3-1", inLieuFee: "Fair market value per 24-inch box tree", notes: "Replacement per TLTM." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "City Council designation", notes: "Heritage by Council designation only." },
    codeReference: "PAMC §8.10.020, §8.10.050, §8.10.055",
  },
  {
    cityName: "Menlo Park",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 10, category: "native_oak" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 10, category: "native_oak" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 10, category: "native_oak" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 10, category: "native_oak" },
      { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 10, category: "native_oak" },
      { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 10, category: "native_oak" },
      { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 10, category: "native_oak" },
    ],
    defaultDbhThresholdNative: 15,
    defaultDbhThresholdNonnative: 15,
    mitigationRules: { replantingRatio: "1:1", inLieuFee: "Based on trunk diameter", notes: "Replacement from approved list." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "Council designation", notes: "Heritage by designation." },
    codeReference: "MPMC §13.24.020, §13.24.040, §13.24.050",
  },
  {
    cityName: "Atherton",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 15.2, category: "heritage" },
    ],
    defaultDbhThresholdNative: 15.2,
    defaultDbhThresholdNonnative: null,
    mitigationRules: { replantingRatio: "1:1 oak (48-inch box)", inLieuFee: "Based on appraised value", notes: "Oak replacements must be oak species." },
    heritageTreeRules: {
      dbhThreshold: 15.2,
      speciesRestricted: true,
      protectedSpecies: ["Quercus agrifolia", "Quercus lobata", "Quercus douglasii", "Sequoia sempervirens"],
      reviewProcess: "Planning Commission",
      notes: "Heritage = oak/redwood at 15.2\" DBH.",
    },
    codeReference: "AMC §8.10.020, §8.10.030, §8.10.040, §8.10.070",
  },
  {
    cityName: "Woodside",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 9.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 9.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 9.5, category: "native" },
      { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 9.5, category: "native" },
      { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 9.5, category: "native" },
      { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native_slow" },
      { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Tan Oak", scientific: "Notholithocarpus densiflorus", dbhThreshold: 7.6, category: "native_slow" },
    ],
    defaultDbhThresholdNative: 9.5,
    defaultDbhThresholdNonnative: 11.5,
    mitigationRules: { replantingRatio: "Per Planning Commission", inLieuFee: "None", notes: "Penalties: $5K first tree, $7.5K second, $10K each additional." },
    heritageTreeRules: { dbhThreshold: null, designatedByCommittee: true, reviewProcess: "Heritage Tree Committee", notes: "Heritage by nomination." },
    codeReference: "WMC §153.005, §153.430-435",
  },
  {
    cityName: "Portola Valley",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
      { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 11.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 17.2, category: "native" },
      { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 17.2, category: "native" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 5.0, category: "native" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native" },
      { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native" },
    ],
    defaultDbhThresholdNative: null,
    defaultDbhThresholdNonnative: null,
    mitigationRules: { replantingRatio: "Native species replacement", inLieuFee: "None", notes: "Conservation Committee review." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "Town Council", notes: "Heritage by Council designation." },
    codeReference: "PVMC §15.12.060, §15.12.070, §15.12.275",
  },
];

// --- Check logic (mirroring lib/ordinances.ts checkTreeProtection) ---
function checkTreeProtection(cityName: string, speciesCommon: string, dbhInches: number) {
  const ordinance = ordinances.find((o) => o.cityName === cityName);
  if (!ordinance) return { isProtected: false, reason: `No data for ${cityName}`, isHeritage: false, heritageReason: null, codeReference: null };

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";
  const scientificName = species?.scientific?.toLowerCase();

  // Species-specific check first
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
    const threshold = isNative ? ordinance.defaultDbhThresholdNative : ordinance.defaultDbhThresholdNonnative;
    if (threshold != null && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH meets or exceeds ${threshold}" threshold per ${ordinance.codeReference}`;
    } else if (threshold != null) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} is not a regulated species under ${cityName}'s tree ordinance (${ordinance.codeReference})`;
    }
  }

  // Heritage check
  let isHeritage = false;
  let heritageReason: string | null = null;
  const hr = ordinance.heritageTreeRules;

  if (hr.dbhThreshold != null && dbhInches >= hr.dbhThreshold) {
    const speciesQualifies = !hr.speciesRestricted ||
      (hr.protectedSpecies && scientificName && hr.protectedSpecies.some((s) => s.toLowerCase() === scientificName));
    if (speciesQualifies) {
      isHeritage = true;
      isProtected = true;
      heritageReason = `Heritage tree (${dbhInches}" DBH >= ${hr.dbhThreshold}" threshold). ${hr.reviewProcess}. ${hr.notes}`;
    }
  } else if (hr.designatedByCouncil || hr.designatedByCommittee) {
    heritageReason = `Heritage status in ${cityName} is by ${hr.designatedByCouncil ? "Council" : "committee"} designation only.`;
  }

  return { isProtected, reason, isHeritage, heritageReason, codeReference: ordinance.codeReference };
}

// --- Test Cases ---
console.log("=".repeat(80));
console.log("ORDINANCE CHECK TEST RESULTS");
console.log("=".repeat(80));

const tests = [
  { city: "Palo Alto", species: "Coast Live Oak", dbh: 24, expectProtected: true, expectHeritage: false, label: "Test 1" },
  { city: "Palo Alto", species: "Flowering Pear", dbh: 6, expectProtected: false, expectHeritage: false, label: "Test 2" },
  { city: "Atherton", species: "Valley Oak", dbh: 36, expectProtected: true, expectHeritage: true, label: "Test 3" },
  { city: "Menlo Park", species: "Coast Redwood", dbh: 14, expectProtected: false, expectHeritage: false, label: "Test 4" },
  { city: "Woodside", species: "Coast Live Oak", dbh: 30, expectProtected: true, expectHeritage: false, label: "Test 5" },
];

let pass = 0;
let fail = 0;

for (const t of tests) {
  const result = checkTreeProtection(t.city, t.species, t.dbh);
  const protectedOk = result.isProtected === t.expectProtected;
  const heritageOk = result.isHeritage === t.expectHeritage;
  const ok = protectedOk && heritageOk;

  if (ok) pass++;
  else fail++;

  console.log(`\n${t.label}: ${t.species}, ${t.dbh}" DBH, ${t.city}`);
  console.log(`  Protected: ${result.isProtected} ${protectedOk ? "OK" : `FAIL (expected ${t.expectProtected})`}`);
  console.log(`  Heritage:  ${result.isHeritage} ${heritageOk ? "OK" : `FAIL (expected ${t.expectHeritage})`}`);
  console.log(`  Reason:    ${result.reason}`);
  if (result.heritageReason) console.log(`  Heritage:  ${result.heritageReason}`);
  console.log(`  Code ref:  ${result.codeReference}`);
  console.log(`  Result:    ${ok ? "PASS" : "FAIL"}`);
}

console.log(`\n${"=".repeat(80)}`);
console.log(`Results: ${pass}/${tests.length} passed, ${fail} failed`);
console.log("=".repeat(80));

process.exit(fail > 0 ? 1 : 0);
