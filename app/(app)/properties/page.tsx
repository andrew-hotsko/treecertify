import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertiesList } from "@/components/properties-list";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const arborist = await requireArborist();
  const properties = await prisma.property.findMany({
    where: { arboristId: arborist.id },
    include: {
      trees: {
        select: { id: true, isProtected: true, status: true },
        orderBy: { treeNumber: "asc" },
      },
      reports: {
        select: { id: true, status: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Serialize for client component
  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Properties
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {properties.length} propert{properties.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link href="/properties/new" className="self-start sm:self-auto">
          <Button className="bg-emerald-700 hover:bg-emerald-600">
            <Plus className="h-4 w-4 mr-2" />
            New Property
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <PropertiesList properties={serialized} initialFilter={searchParams.status} />
      </div>
    </div>
  );
}
