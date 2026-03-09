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
