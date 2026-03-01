import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardContent } from "@/components/dashboard-content";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const [allProperties, totalTrees] = await Promise.all([
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: {
        trees: {
          select: { id: true, isProtected: true },
          orderBy: { treeNumber: "asc" },
        },
        reports: {
          select: { id: true, status: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.treeRecord.count({
      where: { property: { arboristId: arborist.id } },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Welcome back, {arborist.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">
            ISA #{arborist.isaCertificationNum} &middot;{" "}
            {arborist.companyName ?? "Independent Arborist"}
          </p>
        </div>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto"
        >
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            New Property
          </Link>
        </Button>
      </div>

      <DashboardContent
        properties={JSON.parse(JSON.stringify(allProperties))}
        totalTrees={totalTrees}
      />
    </div>
  );
}
