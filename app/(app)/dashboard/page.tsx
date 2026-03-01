import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import {
  MapPin,
  TreePine,
  FileCheck,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { format } from "date-fns";

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    propertyCount,
    totalTrees,
    treesThisMonth,
    certifiedReports,
    recentProperties,
  ] = await Promise.all([
    prisma.property.count({
      where: { arboristId: arborist.id },
    }),
    prisma.treeRecord.count({
      where: { property: { arboristId: arborist.id } },
    }),
    prisma.treeRecord.count({
      where: {
        property: { arboristId: arborist.id },
        createdAt: { gte: startOfMonth },
      },
    }),
    prisma.report.count({
      where: {
        arboristId: arborist.id,
        status: "certified",
      },
    }),
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 8,
      include: {
        trees: { orderBy: { treeNumber: "asc" } },
        reports: { orderBy: { updatedAt: "desc" }, take: 1 },
      },
    }),
  ]);

  const stats = [
    {
      title: "Properties",
      value: propertyCount,
      icon: MapPin,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Trees Assessed",
      value: totalTrees,
      icon: TreePine,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Trees This Month",
      value: treesThisMonth,
      icon: Clock,
      accent: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Certified Reports",
      value: certifiedReports,
      icon: FileCheck,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

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
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto">
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            New Property
          </Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Recent Properties
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/properties"
              className="text-emerald-600 hover:text-emerald-700"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-50 p-3 mb-4">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                No properties yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Start by adding your first property and pinning trees on the map.
              </p>
              <Button
                asChild
                size="sm"
                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/properties/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Property
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentProperties.map((property) => {
                const treeCount = property.trees.length;
                const protectedCount = property.trees.filter(
                  (t) => t.isProtected
                ).length;
                const latestReport = property.reports[0];

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-between gap-4 py-3.5 px-1 rounded-lg transition-colors hover:bg-gray-50 -mx-1 first:pt-0"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {property.address}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {property.city}, {property.county} County
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <TreePine className="h-3.5 w-3.5" />
                        <span className="font-mono">{treeCount}</span>
                        {protectedCount > 0 && (
                          <span className="flex items-center gap-0.5 text-emerald-600">
                            <ShieldCheck className="h-3 w-3" />
                            {protectedCount}
                          </span>
                        )}
                      </div>
                      <span className="hidden md:inline-block text-xs text-gray-400">
                        {format(new Date(property.updatedAt), "MMM d, yyyy")}
                      </span>
                      {latestReport ? (
                        <StatusBadge status={latestReport.status} />
                      ) : (
                        <StatusBadge status={property.status} />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
