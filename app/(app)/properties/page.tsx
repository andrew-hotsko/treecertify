import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertiesList } from "@/components/properties-list";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { status?: string; permitStatus?: string; filter?: string };
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
        select: { id: true, status: true, permitStatus: true, submittedAt: true, approvedAt: true, permitExpiresAt: true, billingIncluded: true, billingAmount: true, billingPaidAt: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight font-display text-foreground">
          Properties
        </h1>
        <Link href="/properties/new" className="hidden sm:block">
          <Button className="bg-forest hover:bg-forest-light active:scale-[0.98] transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Property
          </Button>
        </Link>
      </div>

      <PropertiesList
        properties={serialized}
        initialFilter={searchParams.status}
        initialPermitFilter={searchParams.permitStatus}
        initialDashboardFilter={searchParams.filter}
      />
    </div>
  );
}
