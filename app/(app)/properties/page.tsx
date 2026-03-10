import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertiesList } from "@/components/properties-list";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { status?: string; permitStatus?: string };
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
        select: { id: true, status: true, permitStatus: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Serialize for client component
  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-display text-foreground">
            Properties
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {properties.length} propert{properties.length !== 1 ? "ies" : "y"}{" "}
            in your portfolio
          </p>
        </div>
        <Button asChild className="bg-forest hover:bg-forest-light self-start hidden md:flex">
          <Link href="/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            New Property
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <PropertiesList
          properties={serialized}
          initialFilter={searchParams.status}
          initialPermitFilter={searchParams.permitStatus}
        />
      </div>
    </div>
  );
}
