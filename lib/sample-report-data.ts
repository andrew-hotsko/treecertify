/**
 * Static sample report data for onboarding & showcase.
 *
 * Used to render an inline sample report during onboarding step 2 and
 * to generate a showcase PDF via /api/sample-report?showcase=true.
 *
 * Content is pre-written ISA-quality prose — NOT AI-generated at runtime.
 * 3-tree removal permit scenario in Palo Alto demonstrating protection
 * status, heritage tree designation, and mixed recommendations.
 */

export const SAMPLE_REPORT = {
  certifier: {
    name: "Jane Rodriguez",
    isaCertNum: "WE-12345A",
    traqQualified: true,
    company: "Peninsula Tree Consulting",
    companyAddress: "2580 El Camino Real, Suite 200, Palo Alto, CA 94306",
    companyPhone: "(650) 555-0147",
    companyEmail: "jane@peninsulatreeconsulting.com",
  },

  property: {
    address: "1247 University Avenue",
    city: "Palo Alto",
    state: "CA",
    zip: "94301",
    homeownerName: "Michael & Sarah Chen",
    reportType: "removal_permit" as const,
    scopeOfAssignment:
      "Evaluate three (3) trees on the subject property for a tree removal permit application per the City of Palo Alto Municipal Code Chapter 8.10. Provide species identification, condition assessment, protection status determination, and recommended action for each tree.",
    siteObservations:
      "The subject property is a single-family residential lot on a tree-lined street in the Professorville neighborhood. The landscape is mature with established canopy coverage. Soil conditions are typical Palo Alto clay-loam. No evidence of recent grade changes, construction activity, or drainage modifications was observed. Adjacent properties feature similar mature native and ornamental tree canopy.",
  },

  trees: [
    {
      treeNumber: 1,
      speciesCommon: "Coast Live Oak",
      speciesScientific: "Quercus agrifolia",
      dbhInches: 28,
      heightFt: 40,
      canopySpreadFt: 45,
      conditionRating: 4,
      isProtected: true,
      isHeritage: false,
      protectionReason:
        "Protected under Palo Alto Municipal Code §8.10.020 — native oak exceeding 11.5\" DBH threshold",
      recommendedAction: "retain",
      healthNotes:
        "Observed: Minor epicormic sprouting on lower trunk\n\nThe crown displays excellent overall density with full seasonal foliage and vigorous terminal growth. Minor epicormic sprouting is present on the lower trunk, a common adaptive response in Coast Live Oaks that does not indicate decline. No evidence of decay, pest infestation, or pathological conditions was observed during the visual assessment.",
      structuralNotes:
        "Observed: Codominant stems with included bark at primary union\n\nThe tree exhibits a codominant stem structure originating approximately 8 feet above grade with included bark visible at the union. While included bark can be a structural concern in some species, Coast Live Oaks commonly develop this architecture and compensate with strong lateral branch attachment. The current lean is minimal (approximately 3 degrees) and consistent with phototropic growth toward available light. Root flare is well-defined and symmetrical.",
    },
    {
      treeNumber: 2,
      speciesCommon: "Monterey Pine",
      speciesScientific: "Pinus radiata",
      dbhInches: 22,
      heightFt: 60,
      canopySpreadFt: 28,
      conditionRating: 2,
      isProtected: true,
      isHeritage: false,
      protectionReason:
        "Protected under Palo Alto Municipal Code §8.10.020 — exceeds 11.5\" DBH threshold",
      recommendedAction: "remove",
      healthNotes:
        "Observed: Crown dieback, poor vigor / sparse canopy, decay / fungal fruiting bodies, pest damage\n\nSignificant health decline is evident throughout the specimen. Crown dieback affects approximately 45% of the upper canopy, with sparse needle retention and chlorotic foliage in the remaining live crown. Pitch canker (Fusarium circinatum) lesions are present on multiple scaffold branches, identifiable by resinous cankers and associated needle loss. Fungal conks consistent with Phellinus pini were observed at two locations on the lower trunk, indicating advancing heartwood decay that likely extends into the structural root plate. Bark beetle galleries (Ips sp.) were noted on several mid-canopy branches.",
      structuralNotes:
        "Observed: Dead / hanging limbs, lean, cavities\n\nMultiple dead limbs ranging from 2 to 5 inches in diameter are partially detached in the upper crown, presenting an imminent falling hazard to the yard and adjacent walkway below. The tree exhibits a 14-degree lean toward the southwest, oriented directly toward the primary outdoor living space and children's play area. A basal cavity approximately 6 inches wide is visible on the south face at grade level. The combination of advancing decay, structural dead wood, and lean toward high-use target zones represents an elevated and unacceptable risk profile per ISA TRAQ methodology.",
    },
    {
      treeNumber: 3,
      speciesCommon: "Valley Oak",
      speciesScientific: "Quercus lobata",
      dbhInches: 36,
      heightFt: 55,
      canopySpreadFt: 65,
      conditionRating: 5,
      isProtected: true,
      isHeritage: true,
      protectionReason:
        "Protected under Palo Alto Municipal Code §8.10.020 — native oak exceeding 11.5\" DBH threshold. Heritage tree: 36\" DBH meets heritage threshold",
      recommendedAction: "retain",
      healthNotes:
        "Observed: No significant concerns\n\nThis specimen is in exceptional health. The crown is full, symmetrical, and exhibits vigorous terminal extension growth throughout. Foliage color and density are excellent for the species. No evidence of decay, pest activity, disease, nutrient deficiency, or abiotic stress was observed. The root zone appears undisturbed with no signs of soil compaction or grade change within the critical root zone.",
      structuralNotes:
        "Observed: No significant concerns\n\nThe tree displays excellent structural form with a well-defined central leader transitioning to a broad, open-grown spreading crown characteristic of mature Valley Oaks. Branch attachments are strong with no included bark at major unions. Scaffold limbs are well-spaced and proportional. No cavities, cracks, or structural defects were identified. The root flare is prominent and well-distributed. This is an outstanding specimen tree contributing significant ecological, aesthetic, and property value.",
    },
  ],

  reportContent: `## Scope of Assignment

This report was prepared at the request of the property owners to evaluate three (3) trees on the subject property for a tree removal permit application per the City of Palo Alto Municipal Code Chapter 8.10. The scope includes species identification, dimensional measurements, condition assessment using ISA standards, protection status determination under the municipal code, and recommended action for each tree. The assessment was conducted via Level 2 Basic visual assessment per ISA Best Management Practices.

## Site Observations

The subject property is a single-family residential lot located in the Professorville neighborhood of Palo Alto, featuring three mature trees in the rear and side yards. The site is generally level with gentle drainage toward the rear property line. The landscape is well-maintained with established ornamental plantings beneath the tree canopy. No recent construction activity, soil disturbance, or grade changes were noted within the critical root zones. Adjacent properties feature similar mature tree canopy typical of this established residential neighborhood.

## Tree Assessments

### Tree #1 — Coast Live Oak (*Quercus agrifolia*)

This mature Coast Live Oak is located in the northeast corner of the rear yard, approximately 15 feet from the east property line and 25 feet from the residence. The tree has a trunk diameter of 28 inches at breast height (DBH) with an estimated height of 40 feet and a broad, spreading crown approximately 45 feet in diameter, providing substantial canopy coverage over the rear yard.

The crown displays excellent overall density with full seasonal foliage and vigorous terminal growth. Minor epicormic sprouting is present on the lower trunk, which is a common adaptive response in Coast Live Oaks and does not indicate significant decline. No evidence of decay, pest infestation, or pathological conditions was observed during the visual assessment. Overall health rating: **Good (4/5)**.

The tree exhibits a codominant stem structure originating approximately 8 feet above grade with included bark visible at the union. While included bark can be a structural concern in some species, Coast Live Oaks commonly develop this architecture and compensate with strong lateral branch attachment. The current lean is minimal (approximately 3 degrees) and consistent with phototropic growth toward available light. Root flare is well-defined and symmetrical.

**Protection Status:** This tree is protected under Palo Alto Municipal Code §8.10.020 as a native oak with a trunk diameter exceeding the 11.5-inch DBH threshold. A tree removal permit would be required prior to removal.

**Recommended Action:** **Retain.** This tree is a healthy, mature specimen that contributes significant canopy coverage, ecological value, and aesthetic character to the property and neighborhood streetscape. Periodic monitoring of the codominant union is recommended on a 2–3 year cycle. Crown cleaning to remove minor deadwood is advisable within the next 12 months.

### Tree #2 — Monterey Pine (*Pinus radiata*)

This Monterey Pine is located in the southeast portion of the rear yard, approximately 18 feet from the residence and 12 feet from the east property line. The tree has a trunk diameter of 22 inches DBH with an estimated height of 60 feet and a relatively narrow, asymmetric crown approximately 28 feet in spread.

Significant health decline is evident throughout the specimen. Crown dieback affects approximately 45% of the upper canopy, with sparse needle retention and chlorotic foliage in the remaining live crown. Pitch canker (*Fusarium circinatum*) lesions are present on multiple scaffold branches, identifiable by resinous cankers and associated needle loss. Fungal conks consistent with *Phellinus pini* were observed at two locations on the lower trunk, indicating advancing heartwood decay that likely extends into the structural root plate. Bark beetle galleries (*Ips* sp.) were noted on several mid-canopy branches, consistent with secondary pest colonization of a stressed host. Overall health rating: **Poor (2/5)**.

Multiple dead limbs ranging from 2 to 5 inches in diameter are partially detached in the upper crown, presenting an imminent falling hazard to the yard and adjacent walkway. The tree exhibits a 14-degree lean toward the southwest, oriented directly toward the primary outdoor living space and children's play area. A basal cavity approximately 6 inches wide is visible on the south face at grade level. The combination of advancing decay, pitch canker infection, bark beetle activity, structural dead wood, and lean toward high-use target zones represents an elevated and unacceptable risk profile per ISA Tree Risk Assessment Qualification (TRAQ) methodology.

**Protection Status:** This tree is protected under Palo Alto Municipal Code §8.10.020 as it exceeds the 11.5-inch DBH threshold. Removal requires a tree removal permit and mitigation per §8.10.050.

**Recommended Action:** **Remove.** This tree presents an unacceptable level of risk due to the combination of advanced decay, active pitch canker infection, bark beetle infestation, structural dead wood, and significant lean toward occupied target zones. The decline pattern is progressive and irreversible — the tree will continue to deteriorate. Removal is recommended to mitigate the hazard. Per Palo Alto mitigation requirements, replacement planting at a 2:1 ratio with 15-gallon minimum specimens of an approved species is required.

### Tree #3 — Valley Oak (*Quercus lobata*)

This exceptional Valley Oak is the dominant specimen on the property, located in the center of the rear yard approximately 30 feet from the residence. The tree has a trunk diameter of 36 inches DBH with an estimated height of 55 feet and a magnificent, broad spreading crown approximately 65 feet in diameter — characteristic of the species in open-grown conditions.

This specimen is in exceptional health. The crown is full, symmetrical, and exhibits vigorous terminal extension growth throughout. Foliage color and density are excellent for the species. No evidence of decay, pest activity, disease, nutrient deficiency, or abiotic stress was observed. The root zone appears undisturbed with no signs of soil compaction or grade change within the critical root zone. Overall health rating: **Excellent (5/5)**.

The tree displays excellent structural form with a well-defined central leader transitioning to a broad, open-grown spreading crown characteristic of mature Valley Oaks. Branch attachments are strong with no included bark at major unions. Scaffold limbs are well-spaced and proportional. No cavities, cracks, or structural defects were identified. The root flare is prominent and well-distributed.

**Protection Status:** This tree is protected under Palo Alto Municipal Code §8.10.020 as a native oak exceeding the 11.5-inch DBH threshold. Additionally, this tree qualifies as a **heritage tree** under the City's heritage tree provisions, as its 36-inch DBH meets the heritage designation threshold. Heritage trees receive the highest level of protection and require review by the Urban Forestry division prior to any work within the dripline.

**Recommended Action:** **Retain with maintenance.** This is an outstanding heritage specimen contributing exceptional ecological, aesthetic, and property value. Crown cleaning to remove minor interior deadwood is recommended within the next 12 months per ANSI A300 pruning standards. No structural pruning is needed. Continued monitoring on a 2-year cycle is recommended to maintain this tree's exemplary condition.

## Limitations

This assessment is based on a Level 2 Basic visual examination conducted from ground level per ISA Best Management Practices. No invasive testing, root excavation, resistograph drilling, or aerial inspection was performed. Subsurface conditions, including root decay and soil stability, could not be fully evaluated without invasive methods. Trees are living organisms and their condition can change due to environmental factors, weather events, pest outbreaks, or biological processes that may not be predictable. This report represents conditions observed at the time of inspection and should not be relied upon as a guarantee of future tree performance or safety.`,
} as const;
