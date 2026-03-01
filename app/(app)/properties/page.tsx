import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { format } from "date-fns";
import {
  MapPin,
  Plus,
  TreePine,
  ShieldCheck,
  ArrowRight,
  FileText,
} from "lucide-react";

export default async function PropertiesPage() {
  const arborist = await requireArborist();
  const properties = await prisma.property.findMany({
    where: { arboristId: arborist.id },
    include: {
      trees: { orderBy: { treeNumber: "asc" } },
      reports: { orderBy: { updatedAt: "desc" }, take: 1 },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Properties</h1>
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

      {properties.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-emerald-50 p-4 mb-4">
              <MapPin className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Add your first property to start pinning trees on the satellite
              map and generating AI-assisted reports.
            </p>
            <Link href="/properties/new">
              <Button className="bg-emerald-700 hover:bg-emerald-600">
                <Plus className="h-4 w-4 mr-2" />
                New Property
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => {
            const treeCount = property.trees.length;
            const protectedCount = property.trees.filter(
              (t) => t.isProtected
            ).length;
            const assessedCount = property.trees.filter(
              (t) => t.status !== "draft"
            ).length;
            const latestReport = property.reports[0];

            return (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="block"
              >
                <Card className="hover:border-emerald-300 transition-colors cursor-pointer">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 hidden sm:block">
                          <div className="rounded-full bg-emerald-50 p-2">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                              {property.address}
                            </h3>
                            {property.address === "123 Sample Street" && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted-foreground/30 shrink-0">
                                Sample
                              </Badge>
                            )}
                            {latestReport ? (
                              <StatusBadge status={latestReport.status} />
                            ) : (
                              <StatusBadge status={property.status} />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="truncate">
                              {property.city}, {property.county} County
                            </span>
                            <span className="flex items-center gap-1 sm:hidden text-xs shrink-0">
                              <TreePine className="h-3.5 w-3.5 text-emerald-600" />
                              <span className="font-mono">{treeCount}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <TreePine className="h-4 w-4 text-emerald-600" />
                            <span className="font-mono font-medium">
                              {treeCount} tree{treeCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {protectedCount > 0 && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600">
                                <ShieldCheck className="h-3 w-3" />
                                {protectedCount} protected
                              </span>
                            )}
                            {assessedCount > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {assessedCount}/{treeCount} assessed
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="hidden md:block text-right text-sm text-muted-foreground">
                          {format(new Date(property.updatedAt), "MMM d, yyyy")}
                        </div>

                        {latestReport && (
                          <a
                            href={`/properties/${property.id}/report`}
                            className="hidden sm:block text-emerald-600 hover:text-emerald-500 relative z-10"
                          >
                            <FileText className="h-5 w-5" />
                          </a>
                        )}

                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
