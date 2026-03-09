/**
 * Static sample report data for onboarding.
 *
 * Used to generate a sample PDF with the arborist's branding so they can
 * see what their reports will look like BEFORE creating a real property.
 *
 * Content is pre-written ISA-quality prose — NOT AI-generated at runtime.
 */

export const SAMPLE_REPORT = {
  property: {
    address: "742 Evergreen Terrace",
    city: "Palo Alto",
    state: "CA",
    zip: "94301",
    homeownerName: "Sample Homeowner",
    reportType: "removal_permit" as const,
    scopeOfAssignment:
      "Evaluate two (2) trees on the subject property for a tree removal permit application per the City of Palo Alto Municipal Code Section 8.10. Provide species identification, condition assessment, protection status determination, and recommended action for each tree.",
    siteObservations:
      "The subject property is a single-family residential lot with a well-maintained landscape. Soil conditions appear typical for the area with clay-loam composition. No evidence of recent grade changes or construction activity was observed.",
  },

  trees: [
    {
      treeNumber: 1,
      speciesCommon: "Coast Live Oak",
      speciesScientific: "Quercus agrifolia",
      dbhInches: 24,
      heightFt: 35,
      canopySpreadFt: 40,
      conditionRating: 4,
      isProtected: true,
      protectionReason:
        "Protected under Palo Alto Municipal Code Section 8.10 — native oak exceeding 11.5\" DBH threshold",
      recommendedAction: "retain",
      healthNotes:
        "Observed: Minor epicormic sprouting on lower trunk\n\nThe crown displays good overall density with full seasonal foliage. Minor epicormic sprouting is present on the lower trunk, which is a common adaptive response in Coast Live Oaks and does not indicate significant decline. No evidence of decay, pest infestation, or pathological conditions was observed.",
      structuralNotes:
        "Observed: Codominant stems with included bark at primary union\n\nThe tree exhibits a codominant stem structure originating approximately 8 feet above grade with included bark visible at the union. While included bark can be a structural concern in some species, Coast Live Oaks commonly develop this architecture and compensate with strong lateral branch attachment. The current lean is minimal and consistent with phototropic growth.",
      tagNumber: null,
      typeSpecificData: null,
    },
    {
      treeNumber: 2,
      speciesCommon: "Monterey Pine",
      speciesScientific: "Pinus radiata",
      dbhInches: 18,
      heightFt: 55,
      canopySpreadFt: 25,
      conditionRating: 2,
      isProtected: true,
      protectionReason:
        "Protected under Palo Alto Municipal Code Section 8.10 — exceeds 11.5\" DBH threshold",
      recommendedAction: "remove",
      healthNotes:
        "Observed: Crown dieback, poor vigor / sparse canopy, decay / fungal fruiting bodies\n\nSignificant health decline is evident. Crown dieback affects approximately 40% of the upper canopy, with sparse needle retention throughout. Pitch canker (Fusarium circinatum) lesions are present on multiple scaffold branches. Fungal conks consistent with Phellinus pini were observed at the base, indicating advancing heartwood decay.",
      structuralNotes:
        "Observed: Dead / hanging limbs, lean\n\nMultiple dead limbs ranging from 2 to 4 inches in diameter are partially detached in the upper crown, presenting a falling hazard. The tree exhibits a 12-degree lean toward the southwest, oriented toward the primary outdoor living space. The combination of advancing decay and structural deficiency represents an elevated risk profile.",
      tagNumber: null,
      typeSpecificData: null,
    },
  ],

  reportContent: `## Scope of Assignment

This report was prepared at the request of the property owner to evaluate two (2) trees on the subject property for a tree removal permit application per the City of Palo Alto Municipal Code Section 8.10. The scope includes species identification, condition assessment, protection status determination, and recommended action for each tree.

## Site Observations

The subject property is a residential lot in Palo Alto featuring two mature trees in the rear yard. The site is level with no observable drainage issues. Adjacent properties feature similar mature tree canopy. No recent construction activity or soil disturbance was noted.

## Tree Assessments

### Tree #1 — Coast Live Oak (*Quercus agrifolia*)

This mature Coast Live Oak is located in the northeast corner of the rear yard, approximately 15 feet from the property line. The tree has a trunk diameter of 24 inches at breast height (DBH) with an estimated height of 35 feet and a broad, spreading crown approximately 40 feet in diameter.

The crown displays good overall density with full seasonal foliage. Minor epicormic sprouting is present on the lower trunk, which is a common adaptive response in Coast Live Oaks and does not indicate significant decline. No evidence of decay, pest infestation, or pathological conditions was observed during the visual assessment.

The tree exhibits a codominant stem structure originating approximately 8 feet above grade with included bark visible at the union. While included bark can be a structural concern in some species, Coast Live Oaks commonly develop this architecture and compensate with strong lateral branch attachment. The current lean is minimal and consistent with phototropic growth toward available light.

**Protection Status:** This tree is protected under Palo Alto Municipal Code Section 8.10 as a native oak exceeding the 11.5-inch DBH threshold.

**Recommended Action:** Retain. This tree is a healthy, mature specimen that contributes significant canopy coverage, ecological value, and aesthetic character to the property. Periodic monitoring of the codominant union is recommended on a 2–3 year cycle.

### Tree #2 — Monterey Pine (*Pinus radiata*)

This Monterey Pine is located in the southeast portion of the rear yard, approximately 20 feet from the residence. The tree has a trunk diameter of 18 inches DBH with an estimated height of 55 feet and a relatively narrow crown approximately 25 feet in spread.

Significant health decline is evident. Crown dieback affects approximately 40% of the upper canopy, with sparse needle retention throughout. Pitch canker (*Fusarium circinatum*) lesions are present on multiple scaffold branches, identifiable by resinous cankers and associated needle loss. Fungal conks consistent with *Phellinus pini* were observed at the base, indicating advancing heartwood decay that may extend into the structural root plate.

Multiple dead limbs ranging from 2 to 4 inches in diameter are partially detached in the upper crown, presenting a falling hazard to the area below. The tree exhibits a 12-degree lean toward the southwest, oriented toward the primary outdoor living space. The combination of advancing decay, pitch canker infection, and structural deficiency represents an elevated risk profile.

**Protection Status:** This tree meets the Palo Alto protected tree threshold (18-inch DBH exceeds the 11.5-inch threshold).

**Recommended Action:** Remove. This tree presents an unacceptable level of risk due to the combination of advanced decay, active pitch canker infection, structural dead wood, and lean toward an occupied target zone. The decline pattern indicates the tree will continue to deteriorate. Removal is recommended to mitigate the hazard, with replacement planting of an appropriate species as required by the City's mitigation requirements.

## Limitations

This assessment is based on a visual examination conducted from ground level. No invasive testing, root excavation, or aerial inspection was performed. Subsurface conditions, including root decay and soil stability, could not be fully evaluated. Trees are living organisms and their condition can change due to environmental factors, weather events, or biological processes. This report represents conditions observed at the time of inspection.`,
} as const;
