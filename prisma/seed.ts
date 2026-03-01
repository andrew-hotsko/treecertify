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

  // Seed Municipal Ordinances
  const ordinances = [
    {
      cityName: "Palo Alto",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 12, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 12, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 12, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 12, category: "native" },
      ]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: 18,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "3:1",
        inLieuFee: "Per city schedule",
        notes: "Three replacement trees or in-lieu fee per tree removed. Replacement trees must be minimum 24-inch box size.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 48,
        reviewProcess: "Public hearing required",
        notes: "Any tree with DBH 48 inches or greater requires public hearing before Planning Commission.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit Application to Urban Forestry Division. 30-day public notice required for protected trees. Heritage trees require Planning Commission hearing.",
      ordinanceUrl: "https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-63702",
      codeReference: "Palo Alto Municipal Code Title 8, Chapter 8.10",
    },
    {
      cityName: "Menlo Park",
      protectedSpecies: JSON.stringify([
        { species: "Any tree", scientific: "All species", dbhThreshold: 10, category: "all" },
      ]),
      defaultDbhThresholdNative: 10,
      defaultDbhThresholdNonnative: 10,
      certifierRequirement: "ISA Certified or Licensed Contractor",
      mitigationRules: JSON.stringify({
        replantingRatio: "2:1",
        inLieuFee: "Per city schedule",
        notes: "Two replacement trees per tree removed. Replacement trees must be minimum 15-gallon size.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 36,
        reviewProcess: "Staff review only",
        notes: "Heritage trees reviewed by city arborist. No public hearing required.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit to Community Development. Staff review within 14 days.",
      ordinanceUrl: "https://www.menlopark.gov/",
      codeReference: "Menlo Park Municipal Code Chapter 13.24",
    },
    {
      cityName: "Atherton",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 8, category: "heritage" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 8, category: "heritage" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 8, category: "heritage" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 14, category: "native" },
        { species: "Heritage Elm", scientific: "Ulmus spp.", dbhThreshold: 8, category: "heritage" },
      ]),
      defaultDbhThresholdNative: 14,
      defaultDbhThresholdNonnative: 14,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per council determination",
        inLieuFee: "$500-$2,500",
        notes: "In-lieu fee ranges from $500 to $2,500 depending on tree size and species. Council may require replanting instead.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 8,
        reviewProcess: "Council vote for oaks",
        notes: "All oaks 8 inches DBH or greater require Town Council approval for removal.",
      }),
      permitProcessNotes: "Submit Tree Removal Application to Planning Department. Heritage oaks require Town Council hearing. 45-day review period.",
      ordinanceUrl: "https://www.ci.atherton.ca.us/",
      codeReference: "Atherton Municipal Code Chapter 8.10",
    },
    {
      cityName: "Woodside",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 6, category: "native" },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 6, category: "native" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 6, category: "native" },
      ]),
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1",
        inLieuFee: "Not available",
        notes: "One-to-one replanting required for any protected tree removed. No in-lieu fee option.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 24,
        reviewProcess: "Automatic heritage designation",
        notes: "Any tree 24 inches DBH or greater is automatically designated as heritage. Requires Planning Commission review.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Planning and Building. Heritage trees require Planning Commission hearing.",
      ordinanceUrl: "https://www.woodsidetown.org/",
      codeReference: "Woodside Municipal Code",
    },
    {
      cityName: "Portola Valley",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 6, category: "native" },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 6, category: "native" },
      ]),
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "2:1",
        inLieuFee: "Per town schedule",
        notes: "Two-to-one replanting ratio. Native species required for replacements.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 30,
        reviewProcess: "Planning Commission review",
        notes: "Trees 30 inches DBH or greater designated heritage. Requires Planning Commission hearing.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Planning Department. Conservation Committee review may be required.",
      ordinanceUrl: "https://www.portolavalley.net/",
      codeReference: "Portola Valley Municipal Code Chapter 15.12",
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
        protectionReason: 'Native oak with 24" DBH exceeds 12" threshold per Palo Alto Municipal Code 8.10',
        recommendedAction: "retain",
        mitigationRequired: "N/A - retention recommended. If removal is required: 3:1 replanting ratio.",
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
        protectionReason: 'Native oak with 18" DBH exceeds 12" threshold per Palo Alto Municipal Code 8.10',
        recommendedAction: "prune",
        mitigationRequired: "3:1 replanting ratio if removal required.",
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
