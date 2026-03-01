import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function getCurrentArborist() {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
}

export async function requireArborist() {
  const arborist = await getCurrentArborist();
  if (!arborist) {
    throw new Error("No arborist profile found for authenticated user");
  }
  return arborist;
}
