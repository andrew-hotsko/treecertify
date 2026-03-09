import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed demo arborist
  const arborist = await prisma.arborist.upsert({
    where: { email: "demo@treecertify.com" },
    update: {},
    create: {
      name: "Alex Rivera, ISA Certified Arborist",
      email: "demo@treecertify.com",
      isaCertificationNum: "WE-12345A",
      isaExpirationDate: new Date("2027-06-15"),
      companyName: "Peninsula Tree Consulting",
      phone: "(650) 555-0123",
      citiesServed: JSON.stringify([
        "Palo Alto",
        "Menlo Park",
        "Atherton",
        "Woodside",
        "Portola Valley",
      ]),
    },
  });

  // ---------------------------------------------------------------------------
  // Seed Municipal Ordinances
  //
  // Sources verified March 2026 via web search of municipal codes.
  // Fields marked NEEDS_VERIFICATION could not be confirmed from primary
  // code text and should be cross-checked against the cited ordinance URLs.
  // ---------------------------------------------------------------------------
  const ordinances = [
    // ----- PALO ALTO -----
    // Source: PAMC §8.10.020 (Ord. 5612, 2024)
    // https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-65934
    {
      cityName: "Palo Alto",
      protectedSpecies: JSON.stringify([
        // Six named native species protected at 11.5" DBH (36" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 11.5, category: "native" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 11.5, category: "native" },
        { species: "California Incense Cedar", scientific: "Calocedrus decurrens", dbhThreshold: 11.5, category: "native" },
        // Coast Redwood protected at 18" DBH (57" circumference)
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
      ]),
      // "Protected Mature Tree": all other non-invasive, non-high-water-use species at 15" DBH
      defaultDbhThresholdNative: 15,
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per Tree and Landscape Technical Manual (TLTM) Table 3-1",
        inLieuFee: "Fair market value per 24-inch box tree, paid to Forestry Fund per TLTM",
        notes: "Replacement ratios determined by Urban Forester per TLTM. Replacements must prioritize locally native species. Goal of net canopy increase within 15 years. In-lieu fee paid to Forestry Fund when on-site planting infeasible. Penalty for illegal removal: $10,000 per tree or 2x replacement value, whichever is higher.",
      }),
      heritageTreeRules: JSON.stringify({
        // Heritage trees in Palo Alto are designated by City Council resolution, not by DBH threshold
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "City Council designation required",
        notes: "Heritage trees are individually designated by City Council for historical value or as exemplary specimens. Currently 8 heritage trees in Palo Alto. No automatic DBH-based heritage status.",
      }),
      permitProcessNotes: "Submit Protected Tree Removal Permit to Urban Forestry Division. Arborist report required. Invasive species and high water users excluded from protection. TLTM governs replacement calculations. Permit fee ~$507.",
      ordinanceUrl: "https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-65934",
      codeReference: "PAMC §8.10.020 (protected tree definition), §8.10.050 (removal), §8.10.055 (replacement)",
    },

    // ----- MENLO PARK -----
    // Source: MPMC Chapter 13.24 — Heritage Trees
    // https://www.codepublishing.com/CA/MenloPark/html/MenloPark13/MenloPark1324.html
    // Note: Menlo Park uses the term "Heritage Tree" for ALL protected trees, not just large/historic ones
    {
      cityName: "Menlo Park",
      protectedSpecies: JSON.stringify([
        // California native oaks: 10" DBH (31.4" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 10, category: "native_oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 10, category: "native_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 10, category: "native_oak" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 10, category: "native_oak" },
        { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 10, category: "native_oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 10, category: "native_oak" },
        { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 10, category: "native_oak" },
      ]),
      // Non-oak trees (all species): 15" DBH (47.1" circumference at 54" above grade)
      defaultDbhThresholdNative: 15,
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist or city arborist review",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1 replacement tree or in-lieu fee",
        inLieuFee: "Based on trunk diameter: 10-15\" oak = $100, 15-20\" = $200, 20-30\" = $400 (NEEDS_VERIFICATION — fee schedule may have been updated)",
        notes: "Replacement tree from city arborist approved species list. Goal: replace removed canopy within 15-20 years. In-lieu fee deposited into Heritage Tree Fund. Penalty for violation: up to $5,000 per tree or appraised replacement value, whichever is higher.",
      }),
      heritageTreeRules: JSON.stringify({
        // In Menlo Park, all protected trees are called "heritage trees" — no separate heritage tier
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "City Council may designate trees of historical significance by resolution",
        notes: "Menlo Park uses 'heritage tree' as the general protected tree category, not a special tier. Council can also designate specific trees or groves regardless of size. Multi-trunk trees under 12 ft height are excluded.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit application to Public Works. City arborist reviews within 14 days. Major pruning (>25% of crown/roots) also requires permit. Appeal within 15 days to city manager. Work within Tree Protection Zone (10x trunk diameter) requires tree protection plan.",
      ordinanceUrl: "https://www.codepublishing.com/CA/MenloPark/html/MenloPark13/MenloPark1324.html",
      codeReference: "MPMC §13.24.020 (definitions), §13.24.040 (permit required), §13.24.050 (removal criteria)",
    },

    // ----- ATHERTON -----
    // Source: Atherton Municipal Code Chapter 8.10
    // https://atherton.municipal.codes/Code/8.10
    // Atherton only protects oaks and redwoods as "heritage trees" — other species are NOT protected
    {
      cityName: "Atherton",
      protectedSpecies: JSON.stringify([
        // Oaks: 15.2" DBH (48" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 15.2, category: "heritage_oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 15.2, category: "heritage_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 15.2, category: "heritage_oak" },
        // Coast Redwood: same threshold per some ordinance versions
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 15.2, category: "heritage" },
      ]),
      // Trees outside the Main Buildable Area: any species at 15.2" DBH is also heritage
      defaultDbhThresholdNative: 15.2,
      // Non-native trees in the buildable area are NOT protected unless designated
      defaultDbhThresholdNonnative: null,
      certifierRequirement: "ISA Certified Arborist (project arborist required for development)",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1 for heritage oaks (48-inch box oak). Non-oak heritage: 3x 15-gal, or 2x 24-inch box, or 1x 15-gal + 1x 36-inch box, at Planning Commission discretion",
        inLieuFee: "No standard in-lieu fee — penalty is based on appraised tree value",
        notes: "Heritage oak replacements must be oak species at 48-inch container size. Replacement trees shall not be disfavored species. Maintenance agreement required (1-3 years). Maintenance bond equal to appraised value of replacement trees. Penalty for damage: 1/2 appraised value. Penalty for illegal removal: 2x appraised value.",
      }),
      heritageTreeRules: JSON.stringify({
        // In Atherton, "heritage tree" IS the protected tree definition — not a separate tier
        dbhThreshold: 15.2,
        speciesRestricted: true,
        protectedSpecies: ["Quercus agrifolia", "Quercus lobata", "Quercus douglasii", "Sequoia sempervirens"],
        reviewProcess: "Planning Commission review; may require Town Council hearing",
        notes: "Heritage tree = oak (Quercus lobata, Q. agrifolia, Q. douglasii) or redwood (Sequoia sempervirens) with 48\" circumference (15.2\" DBH) at 54\" above grade. Trees outside the Main Buildable Area of any species at 15.2\" DBH are also heritage. CEQA review triggered if >2 heritage trees removed on parcels <1 acre.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit to Planning Department. Project arborist must provide Tree Protection and Preservation Plan. Quarterly inspections required during construction. Retroactive permit required for illegal removal with full penalties.",
      ordinanceUrl: "https://atherton.municipal.codes/Code/8.10",
      codeReference: "AMC §8.10.020 (definitions), §8.10.030 (prohibition), §8.10.040 (permit process), §8.10.070 (penalties)",
    },

    // ----- WOODSIDE -----
    // Source: Woodside Municipal Code §153.005 (Definitions) and §153.430-435 (Tree Protection)
    // https://library.municode.com/ca/woodside/codes/municipal_code
    // Woodside uses the term "Significant Tree" — measured by circumference at 48" above grade
    // NEEDS_VERIFICATION: exact per-species thresholds from §153.005 table (PDF not fully extractable)
    {
      cityName: "Woodside",
      protectedSpecies: JSON.stringify([
        // Standard native species: ~30" circumference = ~9.5" DBH (confirmed by Almanac reporting)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        // Slow-growing species: ~24" circumference = ~7.6" DBH
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Tan Oak", scientific: "Notholithocarpus densiflorus", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
      ]),
      // Default for unlisted species
      defaultDbhThresholdNative: 9.5,
      defaultDbhThresholdNonnative: 11.5,
      certifierRequirement: "ISA Certified Arborist (may be required by Planning Director)",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per Planning Commission conditions (NEEDS_VERIFICATION — no standard ratio found in code)",
        inLieuFee: "No standard in-lieu fee found in code",
        notes: "Permit conditions set by Planning Director or ASRB. Penalties for unpermitted removal: $5,000 first tree, $7,500 second, $10,000 each additional. Fees waived for Eucalyptus, Acacia, and Monterey Pine. Defensible Space/Home Hardening removals exempt from fees.",
        NEEDS_VERIFICATION: true,
      }),
      heritageTreeRules: JSON.stringify({
        // Woodside has a separate Heritage Tree Award program (not a permit/protection tier)
        dbhThreshold: null,
        designatedByCommittee: true,
        reviewProcess: "Heritage Tree Committee nomination and review",
        notes: "Heritage Tree Award is a recognition program for outstanding specimens of oak, redwood, or cedar. Judged by Heritage Tree Committee. Separate from the Significant Tree permit requirement. No automatic DBH threshold for heritage designation.",
        NEEDS_VERIFICATION: true,
      }),
      permitProcessNotes: "Submit Tree Destruction Permit to Planning Department. Site sketch with tree locations, proximity to structures, property lines, streams, and trails required. Photos with trees marked (orange ribbon). Planning Director may require arborist report. Permit valid 2 years. Eucalyptus, Acacia, and Monterey Pine exempt from fees.",
      ordinanceUrl: "https://library.municode.com/ca/woodside/codes/municipal_code?nodeId=CD_ORD_TITXVLAUS_CH153ZO_153.430TRPR",
      codeReference: "WMC §153.005 (definitions/significant tree table), §153.430-435 (tree protection/permits)",
    },

    // ----- PORTOLA VALLEY -----
    // Source: PVMC Chapter 15.12 — Site Development and Tree Protection
    // https://library.municode.com/ca/portola_valley/codes/code_of_ordinances
    // Confirmed species table from Town website:
    // https://www.portolavalley.net/departments/planning-building-department/resource-center/general-information-and-handouts/tree-removal
    {
      cityName: "Portola Valley",
      protectedSpecies: JSON.stringify([
        // Oaks and Bay Laurel: 36" circumference = 11.5" DBH at 54" above grade
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 11.5, category: "native" },
        // Redwood and Douglas Fir: 54" circumference = 17.2" DBH
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 17.2, category: "native" },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 17.2, category: "native" },
        // Blue Oak: 16" circumference = 5.0" DBH (lower threshold)
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 5.0, category: "native" },
        // Big Leaf Maple and Madrone: 24" circumference = 7.6" DBH
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native" },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native" },
      ]),
      // Non-listed species (Monterey Pine, Eucalyptus, Magnolia, etc.) are NOT protected
      defaultDbhThresholdNative: null,
      defaultDbhThresholdNonnative: null,
      certifierRequirement: "ISA Certified Arborist recommended; arborist letter may be included with application",
      mitigationRules: JSON.stringify({
        replantingRatio: "Replacement with native species from Town's Native Plant List (NEEDS_VERIFICATION — no specific ratio found in code)",
        inLieuFee: "No in-lieu fee provision found in code",
        notes: "Conservation Committee reviews removal applications and conducts site inspection. Dead trees (including from Sudden Oak Death) still require permit but fee is waived. Tree removal only Monday-Friday 8am-5:30pm per PVMC §9.10. Trimming/thinning does not require permit unless it substantially reduces tree size.",
        NEEDS_VERIFICATION: true,
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "Town Council designation",
        notes: "Heritage trees are those of historic significance designated by Town Council action. Separate from the Significant Tree species/size table. No automatic DBH-based heritage status.",
      }),
      permitProcessNotes: "Submit Application for Site Development Permit (Tree Removal) to Planning Department. Fee waived for dead trees (including SOD). Conservation Committee reviews and conducts site inspection. Appeal to Planning Commission if disagreeing with Conservation Committee findings.",
      ordinanceUrl: "https://library.municode.com/ca/portola_valley/codes/code_of_ordinances?nodeId=TIT15BUCO_CH15.12SIDETRPR",
      codeReference: "PVMC §15.12.060 (definitions), §15.12.070 (permit required), §15.12.275 (tree protection standards)",
    },

    // =====================================================================
    // PENINSULA EXPANSION — Added 2026-03-06
    // Thresholds are approximate / NEEDS_VERIFICATION before GA.
    // All should be confirmed against actual municipal code text.
    // =====================================================================

    // ----- REDWOOD CITY -----
    // Circumference-based: 48" circ ≈ 15.3" DBH (Significant), 72" circ ≈ 22.9" DBH (Heritage)
    // NOTE: Redwood City measures circumference at 24" above grade, not standard DBH at 4.5 ft
    {
      cityName: "Redwood City",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 15, // 48" circumference ÷ π ≈ 15.3", rounded down for safety
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Replacement planting may be required",
        inLieuFee: "Contact Community Development",
        notes: "Replacement planting species, size, and location specified by city. Circumference measured at 24\" above grade (non-standard).",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 23, // 72" circumference ÷ π ≈ 22.9", rounded up
        description: "Heritage Tree: 72\"+ circumference at 24\" above grade. May require Planning Commission hearing.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Community Development — Planning Division. Significant Trees (48\"+ circ) get administrative review. Heritage Trees (72\"+ circ) may require Planning Commission hearing.",
      ordinanceUrl: "https://www.redwoodcity.org/departments/community-development-department/planning-housing",
      codeReference: "Redwood City Municipal Code Chapter 35",
    },

    // ----- SAN MATEO -----
    // 16" DBH (50.25" circumference at 4.5 feet) — Heritage Tree threshold
    {
      cityName: "San Mateo",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 16,
      defaultDbhThresholdNonnative: 16,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Replacement planting typically required",
        inLieuFee: "Contact Parks and Recreation",
        notes: "Parks Department specifies replacement species, size, and maintenance requirements.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        description: "Designated Heritage Trees have special considerations — contact Parks Department.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Application to Parks and Recreation — Urban Forestry. Significant pruning (>1/3 canopy) also requires permit.",
      ordinanceUrl: "https://www.cityofsanmateo.org/3074/Tree-Removal",
      codeReference: "San Mateo Municipal Code Chapter 13.40",
    },

    // ----- LOS ALTOS -----
    // 12" DBH (all species), Heritage Oaks 24" DBH
    {
      cityName: "Los Altos",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Minimum 24-inch box replacement tree per removal",
        inLieuFee: "In-lieu fees may apply if on-site replanting not feasible",
        notes: "Multi-trunk trees measured as aggregate diameter (sum of all trunks).",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 24,
        species: ["oak"],
        description: "Heritage Oak: any oak 24\"+ DBH. Longer review, stricter mitigation.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Community Development. Heritage Oaks may require public hearing (30–60 days).",
      ordinanceUrl: "https://www.losaltosca.gov/communitydevelopment/page/tree-removal-permits",
      codeReference: "Los Altos Municipal Code Chapter 11.08",
    },

    // ----- LOS ALTOS HILLS -----
    // 12" DBH (native species only) — non-native not protected
    {
      cityName: "Los Altos Hills",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: null, // non-native trees are not protected
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "May be required",
        inLieuFee: "Contact Planning Department",
        notes: "Only native trees are protected. Non-native trees not regulated.",
      }),
      heritageTreeRules: JSON.stringify({}),
      permitProcessNotes: "Submit Tree Removal Application to Planning Department.",
      ordinanceUrl: null,
      codeReference: "Los Altos Hills Municipal Code",
    },

    // ----- MOUNTAIN VIEW -----
    // 48" circumference at 4.5 ft ≈ 15.3" DBH (Heritage Tree)
    {
      cityName: "Mountain View",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 15, // 48" circumference ÷ π ≈ 15.3"
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "May be required as condition of approval",
        inLieuFee: "Contact Parks Division",
        notes: "Permits go through Public Works (Parks Division), not Community Development.",
      }),
      heritageTreeRules: JSON.stringify({}),
      permitProcessNotes: "Submit Heritage Tree Removal Application to Public Works — Parks Division. Street trees handled separately by city arborist.",
      ordinanceUrl: "https://www.mountainview.gov/depts/pw/parks/trees/default.asp",
      codeReference: "Mountain View City Code Chapter 32",
    },

    // ----- HILLSBOROUGH -----
    // 10" DBH (all species), Heritage Oaks 18" DBH (native oaks)
    {
      cityName: "Hillsborough",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 10,
      defaultDbhThresholdNonnative: 10,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Ratio determined by size of removed tree",
        inLieuFee: "Contact Building and Planning",
        notes: "One of the lowest thresholds on the Peninsula — nearly every mature tree is protected.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 18,
        species: ["oak"],
        description: "Heritage Oak: native oak 18\"+ DBH. Strictest protection.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Building and Planning Department.",
      ordinanceUrl: null,
      codeReference: "Hillsborough Municipal Code Chapter 14.04",
    },

    // ----- SAN CARLOS -----
    // 48" circumference ≈ 15.3" DBH general, ALL oaks regardless of size
    {
      cityName: "San Carlos",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 1, category: "oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 1, category: "oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 1, category: "oak" },
        { species: "Oregon Oak", scientific: "Quercus garryana", dbhThreshold: 1, category: "oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 1, category: "oak" },
        { species: "Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 1, category: "oak" },
      ]),
      defaultDbhThresholdNative: 15, // 48" circumference ÷ π ≈ 15.3"
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "May be required",
        inLieuFee: "Contact Community Development",
        notes: "ALL oaks protected regardless of size. Non-oak species at 48\" circumference (≈15.3\" DBH). City on 4/10 schedule — closed Fridays.",
      }),
      heritageTreeRules: JSON.stringify({}),
      permitProcessNotes: "Submit Tree Removal Permit to Community Development — Planning Division. City on 4/10 schedule (closed Fridays).",
      ordinanceUrl: "https://www.cityofsancarlos.org/government/departments/community-development",
      codeReference: "San Carlos Municipal Code",
    },

    // ----- BURLINGAME -----
    // 12" DBH general, oaks 6" DBH
    {
      cityName: "Burlingame",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 6, category: "oak" },
        { species: "Oregon Oak", scientific: "Quercus garryana", dbhThreshold: 6, category: "oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 6, category: "oak" },
        { species: "Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 6, category: "oak" },
      ]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "May be required",
        inLieuFee: "Contact Parks and Recreation",
        notes: "Oaks protected at lower 6\" DBH threshold. City arborist personally reviews all applications.",
      }),
      heritageTreeRules: JSON.stringify({}),
      permitProcessNotes: "Submit Tree Removal Application to Parks and Recreation. City arborist reviews all applications and may schedule site visit.",
      ordinanceUrl: null,
      codeReference: "Burlingame Municipal Code",
    },

    // ----- SAN MATEO COUNTY (UNINCORPORATED) -----
    // 12" DBH (Significant Tree)
    {
      cityName: "San Mateo County",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "May be required",
        inLieuFee: "Contact Planning and Building",
        notes: "Coastal zone properties may require additional Coastal Development Permit review.",
      }),
      heritageTreeRules: JSON.stringify({
        description: "Designated Heritage Trees have special considerations.",
      }),
      permitProcessNotes: "Submit Tree Removal Application to County Planning and Building Department (455 County Center, Redwood City). Coastal zone properties require additional review.",
      ordinanceUrl: "https://www.smcgov.org/planning-building",
      codeReference: "San Mateo County Ordinance Code",
    },

    // =====================================================================
    // NORTH BAY + TAHOE/RENO EXPANSION — Added 2026-03-09
    // All entries NEEDS_VERIFICATION — phone confirmation required before GA.
    // Confidence levels noted per entry. Species scientific names inferred
    // from standard California flora references where ordinance text uses
    // common names only.
    // =====================================================================

    // ----- SONOMA COUNTY (UNINCORPORATED) -----
    // Source: Sonoma County Code §26-88-010(m) — 2024 update (effective May 30, 2024)
    // Confidence: HIGH for thresholds and species list (confirmed from Permit Sonoma PJR-151 form)
    // 31 protected native species at 6"+ DBH. Two-tier permit system:
    //   Zoning Permit (ministerial): 6"+ DBH for all 31 species
    //   Use Permit (discretionary): >36" DBH hardwoods, >48" DBH redwoods
    {
      cityName: "Sonoma County",
      protectedSpecies: JSON.stringify([
        // Oaks (7 species) — all at 6" DBH
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native_oak" },
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native_oak" },
        { species: "Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 6, category: "native_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 6, category: "native_oak" },
        { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 6, category: "native_oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 6, category: "native_oak" },
        { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 6, category: "native_oak" },
        // Broadleaf / Hardwood (14 species) — all at 6" DBH
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 6, category: "native" },
        { species: "Boxelder", scientific: "Acer negundo", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 6, category: "native" },
        { species: "California Black Walnut", scientific: "Juglans californica", dbhThreshold: 6, category: "native" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 6, category: "native" },
        { species: "Fremont Cottonwood", scientific: "Populus fremontii", dbhThreshold: 6, category: "native" },
        { species: "Black Cottonwood", scientific: "Populus trichocarpa", dbhThreshold: 6, category: "native" },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 6, category: "native" },
        { species: "Oregon Ash", scientific: "Fraxinus latifolia", dbhThreshold: 6, category: "native" },
        { species: "Red Alder", scientific: "Alnus rubra", dbhThreshold: 6, category: "native" },
        { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 6, category: "native" },
        { species: "Red Willow", scientific: "Salix laevigata", dbhThreshold: 6, category: "native" },
        { species: "Pacific Willow", scientific: "Salix lasiandra", dbhThreshold: 6, category: "native" },
        // Conifers (10 species) — all at 6" DBH
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 6, category: "native_conifer" },
        { species: "Western Hemlock", scientific: "Tsuga heterophylla", dbhThreshold: 6, category: "native_conifer" },
        { species: "Grand Fir", scientific: "Abies grandis", dbhThreshold: 6, category: "native_conifer" },
        { species: "Monterey Cypress", scientific: "Hesperocyparis macrocarpa", dbhThreshold: 6, category: "native_conifer" },
        { species: "Macnab Cypress", scientific: "Cupressus macnabiana", dbhThreshold: 6, category: "native_conifer" },
        { species: "Knobcone Pine", scientific: "Pinus attenuata", dbhThreshold: 6, category: "native_conifer" },
        { species: "Lodgepole Pine", scientific: "Pinus contorta", dbhThreshold: 6, category: "native_conifer" },
        { species: "Sugar Pine", scientific: "Pinus lambertiana", dbhThreshold: 6, category: "native_conifer" },
        { species: "Bishop Pine", scientific: "Pinus muricata", dbhThreshold: 6, category: "native_conifer" },
        { species: "Ponderosa Pine", scientific: "Pinus ponderosa", dbhThreshold: 6, category: "native_conifer" },
        { species: "Gray Pine", scientific: "Pinus sabiniana", dbhThreshold: 6, category: "native_conifer" },
      ]),
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: null, // non-native species not protected
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Arboreal Value Points system: 6-12\" = 1 pt, >12-18\" = 2 pts, >18-24\" = 3 pts, >24-30\" = 4 pts, >30-36\" = 5 pts, >36\" = 6+ pts. Per point: six 5-gallon trees OR two 15-gallon trees. 2 pts = one 24-inch box tree.",
        inLieuFee: "$510 per arboreal value point (e.g., 6\" tree = $510, 36\" tree = $2,550)",
        notes: "Same-species replacement required unless planning director approves alternative. 7-year annual monitoring report required — mortality must be replaced. Valley Oak Habitat (VOH) zone: 1.5x mitigation multiplier. Violation penalty: 5x normal mitigation rate. Eucalyptus explicitly excluded from protection.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 36, // >36" hardwoods require Use Permit (discretionary hearing)
        description: "Hardwood trees >36\" DBH and redwoods >48\" DBH require a Use Permit (discretionary, public hearing, 60-90 days). Separate Chapter 26D Heritage/Landmark Tree ordinance: ~50 individually designated trees.",
        reviewProcess: "Planning Commission hearing for Use Permit; Chapter 26D designation by planning director",
        notes: "Two-tier system: Zoning Permit (ministerial, 15-30 days) for standard protected trees 6\"+ DBH. Use Permit (discretionary, 60-90 days) for hardwoods >36\" DBH or redwoods >48\" DBH.",
      }),
      permitProcessNotes: "Submit Zoning Permit (PJR-151) or Use Permit (PJR-150) to Permit Sonoma — Planning Division. Zoning Permits are ministerial (15-30 days). Use Permits require public hearing (60-90 days). Defensible space removals exempt (no redwood removal under this exemption). Dead/dying/diseased trees exempt. Agricultural use exempt.",
      ordinanceUrl: "https://permitsonoma.org/regulationsandlongrangeplans/regulationsandinitiatives/treepermitrequirements",
      codeReference: "Sonoma County Code §26-88-010(m) (tree protection), Chapter 26D (heritage/landmark trees), §26-67 (oak woodland)",
    },

    // ----- SANTA ROSA -----
    // Source: Santa Rosa Municipal Code Chapter 17-24 (adopted October 2, 1990)
    // Confidence: HIGH for species/thresholds (confirmed from ecode360 §17-24.020)
    // Heritage trees: 15 native species with species-specific diameter thresholds
    // General trees: 4" DBH in most zones (exempt in developed R-1 lots)
    {
      cityName: "Santa Rosa",
      protectedSpecies: JSON.stringify([
        // 6" diameter / 19" circumference
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "heritage" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 6, category: "heritage" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 6, category: "heritage" },
        // 12" diameter / 38" circumference
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 12, category: "heritage" },
        // 18" diameter / 57" circumference
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 18, category: "heritage" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 18, category: "heritage" },
        { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 18, category: "heritage" },
        { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 18, category: "heritage" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 18, category: "heritage" },
        { species: "Red Alder", scientific: "Alnus rubra", dbhThreshold: 18, category: "heritage" },
        { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 18, category: "heritage" },
        // 24" diameter / 75" circumference
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 24, category: "heritage" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 24, category: "heritage" },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 24, category: "heritage" },
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 24, category: "heritage" },
      ]),
      // General "tree" threshold: 4" DBH (but exempt in developed R-1 zoning)
      defaultDbhThresholdNative: 4,
      defaultDbhThresholdNonnative: 4,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "2 trees per 6\" of trunk diameter (15-gallon minimum, same genus/species). Violation: 4 trees per 6\" of trunk diameter.",
        inLieuFee: "$100 per 15-gallon replacement tree (NEEDS_VERIFICATION — amount may be outdated from 1990 ordinance adoption)",
        notes: "24-inch box = 3x 15-gallon trees. 36-inch box = 5x 15-gallon. 48-inch box = 8x 15-gallon. Replacement ratios above are for Category II (development-related) removals per §17-24.050. Category I (non-development) replacement is at Director's discretion. Exempt species: Acacia, Silver Maple, Poplar, Ailanthus, Hawthorn, Fruitless Mulberry, Monterey Pine, Monterey Cypress, fruit/nut trees (except walnut). Scenic Road (-SR) district: all trees require permit regardless of species.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null, // heritage status is species-specific, not a universal DBH threshold
        designatedByCouncil: true,
        reviewProcess: "Planning Commission resolution for historic/cultural designation. Heritage trees require permit in ALL zoning districts (no exemptions).",
        notes: "Heritage tree = either (a) tree/grove designated by Planning Commission for historical/cultural significance, OR (b) any of 15 native Sonoma County species at species-specific diameter thresholds (6\"-24\" depending on species). See protectedSpecies list for per-species thresholds.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Planning and Economic Development Permit Center. Heritage trees (15 native species at threshold) require permit in all zones. Non-heritage trees 4\"+ DBH require permit in most zones except developed R-1 lots. Scenic Road (-SR) district: all trees require permit. Category I (non-development) vs Category II (development) permit paths.",
      ordinanceUrl: "https://www.srcity.org/583/Tree-Removal-Preservation",
      codeReference: "SRMC Chapter 17-24: §17-24.020 (definitions), §17-24.030 (permit required), §17-24.040 (Category I), §17-24.050 (Category II)",
    },

    // ----- CITY OF NAPA -----
    // Source: Napa Municipal Code Chapter 12.45 — Protected Native Trees on Private Property
    // Confidence: HIGH for key oak thresholds (confirmed from city website + arborist sources)
    // MEDIUM for full 14-species list (only ~7 species confirmed with specific thresholds)
    // Three separate programs: Street Tree, Protected Native Tree (Ch. 12.45), Significant Tree
    {
      cityName: "City Of Napa",
      protectedSpecies: JSON.stringify([
        // Confirmed thresholds from city website + arborist references
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 12, category: "native_oak" },
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 12, category: "native_oak" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 12, category: "native_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 6, category: "native_oak" },
        // These species are confirmed on the list but exact thresholds NEED_VERIFICATION
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 24, category: "native", NEEDS_VERIFICATION: true },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 18, category: "native", NEEDS_VERIFICATION: true },
        { species: "California Black Walnut", scientific: "Juglans californica", dbhThreshold: 12, category: "native", NEEDS_VERIFICATION: true },
      ]),
      // Applies to properties 1 acre+ (residential/agricultural) or commercial/industrial
      defaultDbhThresholdNative: 12, // most species at 12" DBH; Blue Oak lower at 6"
      defaultDbhThresholdNonnative: null, // only native species protected
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "2 trees per 6\" of trunk diameter (15-gallon minimum, same species or approved alternative)",
        inLieuFee: "CTLA Guide for Plant Appraisal methodology used for valuation — contact Parks and Recreation for fee schedule",
        notes: "14 species of Napa Valley native trees are protected. Only applies to private property 1 acre+ (residential/agricultural) or commercial/industrial zoned parcels. Pruning branches >4\" diameter or removing >10% live foliage in one year requires permit. Cutting roots >2\" within drip line prohibited without permit. $5,000 minimum penalty or appraised tree value for unauthorized removal.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "Significant Tree Committee review and Parks Commission hearing",
        notes: "Significant Tree Program is separate from Protected Native Tree program. Covers trees of historic significance, unique/rare specimens, trees with special habitat value, or outstanding Napa Valley natives. Pruning significant tree branches >4\" requires permit; topping prohibited.",
      }),
      permitProcessNotes: "Submit Significant Tree Pruning/Removal Application to Parks and Recreation Services Department. Commission meets monthly — confirm meeting schedule and application deadline. Three separate programs: Street Trees, Protected Native Trees (Ch. 12.45), and Significant Trees. Protected native tree provisions only apply to parcels 1 acre or larger.",
      ordinanceUrl: "https://www.cityofnapa.org/377/Trees-Urban-Forestry",
      codeReference: "Napa MC Chapter 12.45 (protected native trees), §12.45.090 (removal permits), §12.45.100 (penalties)",
    },

    // ----- WINDSOR -----
    // Source: Town of Windsor Zoning Ordinance Chapter 27.36 — Tree Preservation and Protection
    // Confidence: HIGH for species/thresholds (confirmed from multiple official sources)
    // Note: New Zoning Code (Ord. 2024-394, effective Dec 2024) may have renumbered sections
    {
      cityName: "Windsor",
      protectedSpecies: JSON.stringify([
        // Native oaks — all at 6" DBH (no residential exemption for these)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native_oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native_oak" },
        { species: "Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 6, category: "native_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 6, category: "native_oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 6, category: "native_oak" },
        { species: "Oregon Oak", scientific: "Quercus garryana", dbhThreshold: 6, category: "native_oak" },
        { species: "Oracle Oak", scientific: "Quercus x morehus", dbhThreshold: 6, category: "native_oak" },
        { species: "Chase Oak", scientific: "Quercus x chaseii", dbhThreshold: 6, category: "native_oak" },
        // Other protected native species
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 12, category: "native" },
      ]),
      // Non-protected trees on <1 acre residential lots are exempt (§27.36.030)
      // Protected species always require permit regardless of lot size
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: null, // non-native not protected (exempt on <1 acre lots)
      certifierRequirement: "ISA Certified Arborist (project arborist required per §27.36.051)",
      mitigationRules: JSON.stringify({
        replantingRatio: "Condition-based: Rating 1 (good/excellent) = 1:1 trunk diameter inch-for-inch. Rating 2 (fair/marginal) = 2:1 (half diameter required). Rating 3 (poor) = no replacement. Dead/dying = no replacement. 24-inch box tree = 2\" of replacement diameter.",
        inLieuFee: "In-lieu fees per ordinance when on-site replanting impractical — contact Planning for current fee schedule",
        notes: "Same-species replacement required unless Director approves alternative. In-lieu fees may fund acquisition of native tree preserves or public tree planting. 'No net loss' of protected tree canopy is the goal. Security deposits tiered by tree value, capped at $50,000. Residential exemption (§27.36.030) for <1 acre lots does NOT apply to protected species — native oaks and buckeye at 6\"+ and bay at 12\"+ always need a permit.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "Council resolution designation",
        notes: "Heritage/landmark trees identified by Council resolution per §27.36.040. Separate from species-based protection. The Esposti Park coast live oak (~325 years old) is a notable example.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit Application to Planning Department. Protected trees (native oaks 6\"+ DBH, buckeye 6\"+, bay 12\"+) always require permit. Non-protected trees on residential lots <1 acre are exempt. Mature trees on parcels 1 acre+ are also protected. New Zoning Code (Ord. 2024-394, effective Dec 2024) may have renumbered sections — confirm with Planning.",
      ordinanceUrl: "https://www.townofwindsor.ca.gov/388/Tree-Protection",
      codeReference: "Windsor Zoning Code Chapter 27.36: §27.36.030 (exceptions), §27.36.040 (protected trees), §27.36.061 (mitigation)",
    },

    // ----- HEALDSBURG -----
    // Source: Healdsburg Land Use Code Chapter 20.24, Article II — Heritage Tree Protection
    // Confidence: HIGH (confirmed from codepublishing.com and city FAQs)
    // Heritage trees ONLY — non-heritage trees are NOT protected
    // IMPORTANT: measures diameter at 2 feet above grade, NOT standard 4.5 ft DBH
    {
      cityName: "Healdsburg",
      protectedSpecies: JSON.stringify([]),
      // Heritage = 30" diameter at 2 ft above grade (non-standard measurement point!)
      // Converting to approximate DBH: a 30" trunk at 2 ft would typically be slightly
      // smaller at 4.5 ft, so effective DBH threshold is roughly 28-30" depending on taper.
      // We store 30 and note the non-standard measurement in permitProcessNotes.
      defaultDbhThresholdNative: 30, // technically measured at 2 ft above grade, not 4.5 ft
      defaultDbhThresholdNonnative: 30, // all species treated equally
      certifierRequirement: "ISA Certified Arborist (arborist report may be peer-reviewed; $1,050 peer review fee)",
      mitigationRules: JSON.stringify({
        replantingRatio: "3:1 — three new trees per heritage tree removed (per §20.24.075)",
        inLieuFee: "In-lieu fee available when on-site replanting infeasible — amount set by Council resolution (NEEDS_VERIFICATION — specific amount not found in code)",
        notes: "Conditions of approval may include: Tree Location and Preservation Plan by qualified arborist, 5-year minimum maintenance program secured by cash surety, temporary fencing around root zones during construction. Penalty for unpermitted removal: code violation + misdemeanor + fine equal to tree valuation. Application fee: $1,417.54 (FY 2025-26). Non-heritage trees do NOT require a permit.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 30,
        measurementHeight: "2 feet above level ground (non-standard — NOT 4.5 ft DBH)",
        designatedByCouncil: true,
        reviewProcess: "Planning Commission review at regularly scheduled meeting",
        notes: "Heritage tree = (a) any tree with diameter 30\"+ at 2 ft above grade (ALL species, not species-specific), OR (b) tree designated by Council resolution for historical significance. Non-heritage trees on private property do NOT require a removal permit. Street trees governed separately under Chapter 12.20.",
      }),
      permitProcessNotes: "Submit Tree Permit Application to Planning and Building Department. Only heritage trees (30\"+ at 2 ft above grade or Council-designated) require a permit. Planning Commission reviews at regular meeting. IMPORTANT: Healdsburg measures at 2 feet above grade, not standard DBH (4.5 feet) — verify measurement point with property owner. Properties in unincorporated Sonoma County (outside city limits) are subject to county ordinance instead (31 species at 6\"+ DBH).",
      ordinanceUrl: "https://www.codepublishing.com/CA/Healdsburg/html/Healdsburg20/Healdsburg2024.html",
      codeReference: "HMC Chapter 20.24, Article II: §20.24.045 (definitions), §20.24.050 (permit required), §20.24.075 (replacement)",
    },

    // ----- TAHOE BASIN (TRPA) -----
    // Source: TRPA Code of Ordinances Chapter 61 — Vegetation and Forest Health
    // Confidence: HIGH for thresholds (confirmed from TRPA official website and code)
    // TRPA is a REGIONAL authority that overrides all local jurisdictions in the basin.
    // Uses a land-capability-based approach, not a typical city ordinance structure.
    // Protection is size/location-based, NOT species-specific.
    {
      cityName: "Tahoe Basin",
      state: "CA", // bi-state (CA + NV) — TRPA jurisdiction spans both
      protectedSpecies: JSON.stringify([
        // TRPA does NOT use species-specific thresholds.
        // The "any tree" entry captures the general 14" threshold for standard residential.
        { species: "Any Tree", scientific: "", dbhThreshold: 14, category: "standard_residential" },
      ]),
      // Standard residential (non-lakefront): trees >14" DBH require TRPA permit
      // Lakefront (between house and lake): >6" DBH requires permit
      // SEZ (Stream Environment Zone): ANY tree requires permit regardless of size
      // Old-growth absolute protection: 30" westside / 24" eastside
      defaultDbhThresholdNative: 14,
      defaultDbhThresholdNonnative: 14,
      certifierRequirement: "TRPA forester conducts site assessment — arborist report supports but does not replace forester review",
      mitigationRules: JSON.stringify({
        replantingRatio: "No fixed codified ratio — determined per-permit by TRPA forester during site visit",
        inLieuFee: "No standard in-lieu fee — enforcement settlements have required 2:1 replacement with mature 15-20 ft native conifers",
        notes: "TRPA approach is forester-discretionary, not ratio-based. Revegetation must use TRPA-approved species from the 'TRPA Recommended Native and Adapted Plant List' (BMP Handbook). Enforcement is aggressive: unauthorized SEZ removal of 387 trees resulted in ~$800,000 remediation. Unauthorized removal of 2 trees resulted in $20,000 fine + 4 replacement trees. Trees <14\" DBH can typically be removed for defensible space without a permit, EXCEPT in SEZ, backshore, or when retained as condition of prior permit.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 30, // westside old-growth threshold (absolute protection)
        description: "Old-growth protection: 30\" DBH (westside forest types) and 24\" DBH (eastside/Jeffrey Pine forest). These trees 'shall not be felled, treated, or removed' in SEZ and conservation/recreation land — absolute prohibition. In non-SEZ urban areas, 30\"+ trees must be retained if healthy/structurally sound unless no reasonable alternative.",
        reviewProcess: "Individual TRPA approval required for each tree >30\" (westside) or >24\" (eastside) in forest management projects",
        notes: "Westside = west of Brockway Summit to CA-NV state line. Eastside = east of that line (Jeffrey Pine dominant). Species of limited occurrence requiring enhancement: Aspen, Black Cottonwood, Ponderosa Pine, Douglas Fir, Incense Cedar, Sugar Pine, Western White Pine, Mountain Hemlock, Whitebark Pine (ESA Threatened), Western Juniper.",
      }),
      permitProcessNotes: "Submit TRPA Tree Removal Permit Application. TRPA — not local cities or counties — is the sole permit authority for tree removal in the Tahoe Basin. This includes South Lake Tahoe (CA), Incline Village (NV), Tahoe City (CA), Kings Beach (CA), and surrounding communities. Forester site visit required. Standard residential: >14\" DBH requires permit. Lakefront (between house and lake): >6\" DBH. SEZ: ANY tree. Truckee is OUTSIDE the TRPA boundary — do NOT use this ordinance for Truckee properties.",
      ordinanceUrl: "https://www.trpa.gov/trees-and-defensible-space/",
      codeReference: "TRPA Code Chapter 61: §61.1 (tree removal), §61.1.6 (old-growth protection), §61.3 (vegetation protection/SEZ), §61.4 (revegetation)",
    },

    // ----- RENO -----
    // Source: Reno Administrative Code Chapter 8.32 (Trees and Shrubs)
    // Confidence: HIGH (confirmed from City of Reno official Tree FAQ page)
    // NO permit required for private property tree removal.
    // Only ROW/city property tree work requires a permit.
    {
      cityName: "Reno",
      state: "NV",
      protectedSpecies: JSON.stringify([]),
      defaultDbhThresholdNative: null, // no private property protection
      defaultDbhThresholdNonnative: null,
      certifierRequirement: null, // no city requirement for private property
      mitigationRules: JSON.stringify({
        replantingRatio: "N/A — no city-mandated replacement for private property tree removal",
        inLieuFee: "N/A",
        notes: "No permit required for private residential tree removal in the City of Reno. City Tree Ordinance (AC Ch. 8.32) governs public trees only. Tree Work Permit required only for ROW/city property (ISA certification required for ROW work). Development context: LDC Chapter 18.12, Article V has tree protection standards for new construction/grading permits only. Planting prohibitions: Ulmus (elm) banned citywide; Populus (poplar) and Salix (willow) banned on public property.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        description: "No heritage or significant tree designation exists for private property in Reno.",
        notes: "Washoe County (unincorporated areas) also has no standalone private-property tree removal ordinance. HOA/CC&Rs may have private restrictions — advise homeowners to check with their HOA.",
      }),
      permitProcessNotes: "No city permit required for removing trees on private residential property. This arborist report is for the property owner's records, insurance, real estate, or other private purposes. If the tree is within or overhanging the public right-of-way, contact Urban Forestry at (775) 321-8373 before any work.",
      ordinanceUrl: "https://www.reno.gov/government/departments/parks-recreation-community-services/urban-forestry",
      codeReference: "Reno AC Chapter 8.32 (public trees); LDC Chapter 18.12, Art. V (development-context tree protection)",
    },
  ];

  for (const ord of ordinances) {
    await prisma.municipalOrdinance.upsert({
      where: { cityName: ord.cityName },
      update: ord,
      create: ord,
    });
  }

  // Create a sample property with trees
  const property = await prisma.property.create({
    data: {
      arboristId: arborist.id,
      address: "123 University Ave",
      city: "Palo Alto",
      state: "CA",
      county: "Santa Clara",
      parcelNumber: "132-40-001",
      lat: 37.4439,
      lng: -122.1622,
      status: "active",
    },
  });

  // Seed sample tree records on the property
  await prisma.treeRecord.createMany({
    data: [
      {
        propertyId: property.id,
        treeNumber: 1,
        pinLat: 37.44395,
        pinLng: -122.16225,
        speciesCommon: "Coast Live Oak",
        speciesScientific: "Quercus agrifolia",
        dbhInches: 24,
        heightFt: 45,
        canopySpreadFt: 35,
        conditionRating: 4,
        healthNotes: "Good overall vigor. Minor deadwood in upper canopy.",
        structuralNotes: "Co-dominant stems with included bark at primary union. Recommend monitoring.",
        isProtected: true,
        protectionReason: 'Coast Live Oak with 24" DBH exceeds 11.5" threshold per PAMC §8.10.020',
        recommendedAction: "retain",
        mitigationRequired: "N/A - retention recommended. If removal required: replacement per TLTM Table 3-1, in-lieu fee to Forestry Fund.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 2,
        pinLat: 37.44388,
        pinLng: -122.16210,
        speciesCommon: "Valley Oak",
        speciesScientific: "Quercus lobata",
        dbhInches: 18,
        heightFt: 55,
        canopySpreadFt: 42,
        conditionRating: 3,
        healthNotes: "Moderate crown dieback. Some chlorosis in upper canopy.",
        structuralNotes: "Previous limb failure on south side. Wound compartmentalization progressing.",
        isProtected: true,
        protectionReason: 'Valley Oak with 18" DBH exceeds 11.5" threshold per PAMC §8.10.020',
        recommendedAction: "prune",
        mitigationRequired: "Replacement per TLTM Table 3-1 if removal required.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 3,
        pinLat: 37.44402,
        pinLng: -122.16235,
        speciesCommon: "Japanese Maple",
        speciesScientific: "Acer palmatum",
        dbhInches: 8,
        heightFt: 15,
        canopySpreadFt: 12,
        conditionRating: 5,
        healthNotes: "Excellent health. Vigorous spring growth.",
        structuralNotes: "Good form. No defects noted.",
        isProtected: false,
        protectionReason: null,
        recommendedAction: "retain",
        mitigationRequired: null,
        status: "assessed",
      },
    ],
  });

  console.log("Seed data created successfully.");
  console.log(`  - Arborist: ${arborist.name}`);
  console.log(`  - Property: ${property.address}, ${property.city}`);
  console.log(`  - Trees: 3 sample tree records`);
  console.log(`  - Ordinances: ${ordinances.length} cities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
