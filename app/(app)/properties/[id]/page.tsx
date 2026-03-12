import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/error-boundary";

const PropertyMapView = dynamic(
  () => import("@/components/property-map-view").then((mod) => mod.PropertyMapView),
  { ssr: false }
);

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      trees: {
        orderBy: { treeNumber: "asc" },
        include: { treePhotos: { select: { id: true, url: true, caption: true, category: true, sortOrder: true }, orderBy: { sortOrder: "asc" } } },
      },
      reports: {
        orderBy: { updatedAt: "desc" },
        select: { id: true, status: true, reportType: true, permitStatus: true, submittedAt: true, submittedTo: true, reviewerNotes: true, conditionsOfApproval: true, denialReason: true, approvedAt: true, permitExpiresAt: true, certifiedAt: true, updatedAt: true, billingAmount: true, billingIncluded: true, billingPaidAt: true, clientNote: true, submissionChecklist: true, amendmentNumber: true, reportOptions: true },
      },
      // arborist data fetched client-side via /api/arborist/profile — no need to include here
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="-mx-6 -my-8">
      <ErrorBoundary sectionName="Map View">
        <PropertyMapView property={JSON.parse(JSON.stringify(property))} />
      </ErrorBoundary>
    </div>
  );
}
