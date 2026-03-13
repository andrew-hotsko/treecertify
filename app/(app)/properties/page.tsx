import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
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
        select: {
          id: true,
          status: true,
          reportType: true,
          permitStatus: true,
          submittedAt: true,
          approvedAt: true,
          permitExpiresAt: true,
          billingIncluded: true,
          billingAmount: true,
          billingPaidAt: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div className="max-w-5xl pb-24 sm:pb-8">
      <PropertiesList
        properties={serialized}
        initialFilter={searchParams.status}
        initialPermitFilter={searchParams.permitStatus}
        initialDashboardFilter={searchParams.filter}
      />
    </div>
  );
}
