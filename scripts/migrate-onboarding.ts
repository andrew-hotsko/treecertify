/**
 * Migration script: Set hasCompletedOnboarding = true for existing arborists.
 *
 * Run with: npx tsx scripts/migrate-onboarding.ts
 *
 * Two passes:
 * 1. Arborists with onboardingStep >= 3 (completed the flow normally)
 * 2. Arborists who have properties but incomplete onboardingStep (early beta users)
 */

import { prisma } from "../lib/db";

async function main() {
  console.log("Starting onboarding migration...\n");

  // Pass 1: Arborists who completed the onboarding flow
  const result1 = await prisma.arborist.updateMany({
    where: {
      onboardingStep: { gte: 3 },
      hasCompletedOnboarding: false,
    },
    data: { hasCompletedOnboarding: true },
  });
  console.log(`Pass 1: Migrated ${result1.count} arborists with onboardingStep >= 3`);

  // Pass 2: Arborists who have properties but didn't complete the flow
  // (edge case: early beta users who bypassed onboarding)
  const withProperties = await prisma.arborist.findMany({
    where: {
      hasCompletedOnboarding: false,
      properties: { some: {} },
    },
    select: { id: true },
  });

  if (withProperties.length > 0) {
    const result2 = await prisma.arborist.updateMany({
      where: { id: { in: withProperties.map((a) => a.id) } },
      data: { hasCompletedOnboarding: true, onboardingStep: 3 },
    });
    console.log(`Pass 2: Migrated ${result2.count} arborists with existing properties`);
  } else {
    console.log("Pass 2: No additional arborists with existing properties found");
  }

  console.log("\nMigration complete.");
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
