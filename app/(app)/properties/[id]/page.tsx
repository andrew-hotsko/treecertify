import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

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
      trees: { orderBy: { treeNumber: "asc" } },
      reports: { orderBy: { updatedAt: "desc" } },
      arborist: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="-mx-6 -my-8">
      <PropertyMapView property={JSON.parse(JSON.stringify(property))} />
    </div>
  );
}
