# Codebase Snapshot

## Directory Tree
```
.
./.claude
./.env
./.eslintrc.json
./.git
./.gitignore
./.next
./CLAUDE.md
./README.md
./app
./app/(app)
./app/(app)/dashboard
./app/(app)/dashboard/page.tsx
./app/(app)/layout.tsx
./app/(app)/ordinances
./app/(app)/ordinances/page.tsx
./app/(app)/properties
./app/(app)/properties/[id]
./app/(app)/properties/[id]/page.tsx
./app/(app)/properties/[id]/report
./app/(app)/properties/[id]/report/page.tsx
./app/(app)/properties/new
./app/(app)/properties/new/page.tsx
./app/(app)/properties/page.tsx
./app/(app)/settings
./app/(app)/settings/page.tsx
./app/api
./app/api/ai
./app/api/ai/generate-report
./app/api/ai/generate-report/route.ts
./app/api/arborist
./app/api/arborist/logo
./app/api/arborist/logo/route.ts
./app/api/arborist/onboard
./app/api/arborist/onboard/route.ts
./app/api/arborist/profile
./app/api/arborist/profile/route.ts
./app/api/geocode
./app/api/geocode/route.ts
./app/api/ordinances
./app/api/ordinances/check
./app/api/ordinances/check/route.ts
./app/api/ordinances/route.ts
./app/api/properties
./app/api/properties/[id]
./app/api/properties/[id]/audio
./app/api/properties/[id]/audio/[audioId]
./app/api/properties/[id]/audio/[audioId]/route.ts
./app/api/properties/[id]/audio/[audioId]/transcribe
./app/api/properties/[id]/audio/[audioId]/transcribe/route.ts
./app/api/properties/[id]/audio/route.ts
./app/api/properties/[id]/route.ts
./app/api/properties/[id]/trees
./app/api/properties/[id]/trees/[treeId]
./app/api/properties/[id]/trees/[treeId]/audio
./app/api/properties/[id]/trees/[treeId]/audio/[audioId]
./app/api/properties/[id]/trees/[treeId]/audio/[audioId]/route.ts
./app/api/properties/[id]/trees/[treeId]/audio/[audioId]/transcribe
./app/api/properties/[id]/trees/[treeId]/audio/[audioId]/transcribe/route.ts
./app/api/properties/[id]/trees/[treeId]/audio/route.ts
./app/api/properties/[id]/trees/[treeId]/photos
./app/api/properties/[id]/trees/[treeId]/photos/[photoId]
./app/api/properties/[id]/trees/[treeId]/photos/[photoId]/annotate
./app/api/properties/[id]/trees/[treeId]/photos/[photoId]/annotate/route.ts
./app/api/properties/[id]/trees/[treeId]/photos/[photoId]/route.ts
./app/api/properties/[id]/trees/[treeId]/photos/reorder
./app/api/properties/[id]/trees/[treeId]/photos/reorder/route.ts
./app/api/properties/[id]/trees/[treeId]/photos/route.ts
./app/api/properties/[id]/trees/[treeId]/route.ts
./app/api/properties/[id]/trees/route.ts
./app/api/properties/route.ts
./app/api/reports
./app/api/reports/[id]
./app/api/reports/[id]/certify
./app/api/reports/[id]/certify/route.ts
./app/api/reports/[id]/pdf
./app/api/reports/[id]/pdf/route.ts
./app/api/reports/[id]/route.ts
./app/api/reports/[id]/word
./app/api/reports/[id]/word/route.ts
./app/api/reports/route.ts
./app/api/uploads
./app/api/uploads/[...path]
./app/api/uploads/[...path]/route.ts
./app/fonts
./app/fonts/GeistMonoVF.woff
./app/fonts/GeistVF.woff
./app/globals.css
./app/layout.tsx
./app/onboarding
./app/onboarding/page.tsx
./app/page.tsx
./components
./components.json
./components/condition-rating.tsx
./components/photo-markup-editor.tsx
./components/property-audio-notes.tsx
./components/property-map-view.tsx
./components/property-map.tsx
./components/report-preview.tsx
./components/sidebar.tsx
./components/species-search.tsx
./components/status-badge.tsx
./components/tree-audio-notes.tsx
./components/tree-photos.tsx
./components/tree-side-panel.tsx
./components/tree-summary-panel.tsx
./components/type-fields
./components/type-fields/construction-encroachment-fields.tsx
./components/type-fields/health-assessment-fields.tsx
./components/type-fields/removal-permit-fields.tsx
./components/type-fields/tree-valuation-fields.tsx
./components/ui
./components/ui/avatar.tsx
./components/ui/badge.tsx
./components/ui/button-selector.tsx
./components/ui/button.tsx
./components/ui/card.tsx
./components/ui/command.tsx
./components/ui/dialog.tsx
./components/ui/dropdown-menu.tsx
./components/ui/form.tsx
./components/ui/input.tsx
./components/ui/label.tsx
./components/ui/multi-checkbox.tsx
./components/ui/popover.tsx
./components/ui/progress.tsx
./components/ui/scroll-area.tsx
./components/ui/select.tsx
./components/ui/separator.tsx
./components/ui/sheet.tsx
./components/ui/table.tsx
./components/ui/tabs.tsx
./components/ui/textarea.tsx
./components/ui/tooltip.tsx
./hooks
./hooks/use-audio-recorder.ts
./lib
./lib/auth.ts
./lib/db.ts
./lib/generated
./lib/generated/prisma
./lib/generated/prisma/browser.ts
./lib/generated/prisma/client.ts
./lib/generated/prisma/commonInputTypes.ts
./lib/generated/prisma/enums.ts
./lib/generated/prisma/internal
./lib/generated/prisma/internal/class.ts
./lib/generated/prisma/internal/prismaNamespace.ts
./lib/generated/prisma/internal/prismaNamespaceBrowser.ts
./lib/generated/prisma/models
./lib/generated/prisma/models.ts
./lib/generated/prisma/models/Arborist.ts
./lib/generated/prisma/models/MunicipalOrdinance.ts
./lib/generated/prisma/models/Report.ts
./lib/generated/prisma/models/TreeAssessment.ts
./lib/markdown-to-docx.ts
./lib/markdown.ts
./lib/ordinances.ts
./lib/report-templates.ts
./lib/report-types.ts
./lib/species.ts
./lib/uploads.ts
./lib/utils.ts
./middleware.ts
./next-env.d.ts
./next.config.mjs
./node_modules
./package.json
./postcss.config.mjs
./prisma
./prisma/migrations
./prisma/migrations/20260228194318_init_property_tree_model
./prisma/migrations/20260228194318_init_property_tree_model/migration.sql
./prisma/migrations/20260228212520_add_tree_photos_and_audio
./prisma/migrations/20260228212520_add_tree_photos_and_audio/migration.sql
./prisma/migrations/migration_lock.toml
./prisma/schema.prisma
./prisma/seed.ts
./tailwind.config.ts
./tsconfig.json
./types
./types/mapbox.d.ts
./uploads
```

## File Contents

### .env
```env
# (secrets redacted — see .env.example for variable names)
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>
OPENAI_API_KEY=<your-openai-key>
ANTHROPIC_API_KEY=<your-anthropic-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

### .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}

```

### .gitignore
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/lib/generated/prisma

# uploaded files (photos, audio)
/uploads

# database
*.db
*.db-journal

# env
.env

# OS
Thumbs.db
nul

```

### CLAUDE.md
```md
# CLAUDE.md — Project Rules

## Verification
- Do NOT use the preview/screenshot tool to verify changes. Clerk auth redirects block the preview. Verify through build checks and server logs only.

## Workflow
- Always commit and push when you finish a task.

## Tech Stack
- This is a Next.js App Router project with Prisma (SQLite for now), Clerk auth, Tailwind CSS, and shadcn/ui components.

## Auth
- Do not break existing authentication — all routes under /(app)/ are protected by Clerk middleware.

```

### README.md
```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

### app/(app)/dashboard/page.tsx
```tsx
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back, {arborist.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            ISA #{arborist.isaCertificationNum} &middot;{" "}
            {arborist.companyName ?? "Independent Arborist"}
          </p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
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

```

### app/(app)/layout.tsx
```tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });

  // Onboarding page gets rendered without sidebar
  if (!arborist) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

```

### app/(app)/ordinances/page.tsx
```tsx
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Shield, Scale, ExternalLink } from "lucide-react";

interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}
interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}
interface HeritageTreeRules {
  dbhThreshold: number;
  reviewProcess: string;
  notes: string;
}

export default async function OrdinancesPage() {
  const ordinances = await prisma.municipalOrdinance.findMany({
    orderBy: { cityName: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Municipal Ordinance Database
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Protected tree ordinances for SF Peninsula cities
        </p>
      </div>

      <div className="space-y-6">
        {ordinances.map((ord) => {
          const species = JSON.parse(
            ord.protectedSpecies
          ) as ProtectedSpeciesRule[];
          const mitigation = JSON.parse(
            ord.mitigationRules
          ) as MitigationRules;
          const heritage = JSON.parse(
            ord.heritageTreeRules
          ) as HeritageTreeRules;

          return (
            <Card key={ord.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-emerald-600" />
                      {ord.cityName}
                    </CardTitle>
                    {ord.codeReference && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {ord.codeReference}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {ord.certifierRequirement && (
                      <Badge
                        variant="outline"
                        className="border-emerald-200 text-emerald-700 bg-emerald-50"
                      >
                        {ord.certifierRequirement}
                      </Badge>
                    )}
                    {ord.ordinanceUrl && (
                      <a
                        href={ord.ordinanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-500"
                      >
                        View Code
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default thresholds */}
                <div className="flex gap-6">
                  {ord.defaultDbhThresholdNative && (
                    <div className="bg-emerald-50 rounded-lg px-4 py-3">
                      <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
                        Native Threshold
                      </p>
                      <p className="text-2xl font-mono font-bold text-emerald-800">
                        {ord.defaultDbhThresholdNative}&quot;
                      </p>
                      <p className="text-xs text-emerald-600">DBH</p>
                    </div>
                  )}
                  {ord.defaultDbhThresholdNonnative && (
                    <div className="bg-amber-50 rounded-lg px-4 py-3">
                      <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                        Non-native Threshold
                      </p>
                      <p className="text-2xl font-mono font-bold text-amber-800">
                        {ord.defaultDbhThresholdNonnative}&quot;
                      </p>
                      <p className="text-xs text-amber-600">DBH</p>
                    </div>
                  )}
                </div>

                {/* Protected Species Table */}
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    Protected Species
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Common Name</TableHead>
                        <TableHead>Scientific Name</TableHead>
                        <TableHead className="text-right">
                          DBH Threshold
                        </TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {species.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {s.species}
                          </TableCell>
                          <TableCell className="italic text-muted-foreground">
                            {s.scientific}
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold">
                            {s.dbhThreshold}&quot;
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {s.category}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Mitigation & Heritage */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Scale className="h-4 w-4 text-emerald-600" />
                      Mitigation Requirements
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">
                          Replanting Ratio
                        </dt>
                        <dd className="font-medium">
                          {mitigation.replantingRatio}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">In-Lieu Fee</dt>
                        <dd className="font-medium">{mitigation.inLieuFee}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Notes</dt>
                        <dd className="text-muted-foreground">
                          {mitigation.notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-amber-600" />
                      Heritage Tree Rules
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">
                          Heritage Threshold
                        </dt>
                        <dd className="font-mono font-bold">
                          {heritage.dbhThreshold}&quot; DBH
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">
                          Review Process
                        </dt>
                        <dd className="font-medium">
                          {heritage.reviewProcess}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Notes</dt>
                        <dd className="text-muted-foreground">
                          {heritage.notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {ord.permitProcessNotes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Permit Process
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {ord.permitProcessNotes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

```

### app/(app)/properties/[id]/page.tsx
```tsx
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

```

### app/(app)/properties/[id]/report/page.tsx
```tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportPreview } from "@/components/report-preview";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { getReportTypeConfig } from "@/lib/report-types";
import {
  ArrowLeft,
  Sparkles,
  Save,
  CheckCircle2,
  Loader2,
  Download,
  FileDown,
  Eye,
  Pencil,
  Lock,
  Unlock,
  RefreshCw,
  List,
  Clock,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  isProtected: boolean;
  recommendedAction: string;
  status: string;
}

interface Property {
  id: string;
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
  reportType?: string;
  trees: TreeRecord[];
  reports: Report[];
}

interface Report {
  id: string;
  propertyId: string;
  reportType: string;
  aiDraftContent: string | null;
  finalContent: string | null;
  eSignatureText: string | null;
  certifiedAt: string | null;
  status: string;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  signatureName?: string | null;
}

interface Section {
  id: string;
  title: string;
  level: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractSections(markdown: string): Section[] {
  const sections: Section[] = [];
  for (const line of markdown.split("\n")) {
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      sections.push({ id: slugify(title), title, level: 3 });
    } else if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      sections.push({ id: slugify(title), title, level: 2 });
    } else if (line.startsWith("# ")) {
      const title = line.slice(2).trim();
      sections.push({ id: slugify(title), title, level: 1 });
    }
  }
  return sections;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PropertyReportPage() {
  const params = useParams();
  const propertyId = params.id as string;

  // Data state
  const [property, setProperty] = useState<Property | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [arborist, setArborist] = useState<ArboristInfo | null>(null);
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  // Certification state
  const [signatureText, setSignatureText] = useState("");
  const [certifyAgreed, setCertifyAgreed] = useState(false);
  const [showCertifyPanel, setShowCertifyPanel] = useState(false);

  // UI state
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certifying, setCertifying] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");

  // Refs
  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedContentRef = useRef("");
  const lastSavedRef = useRef<Date | null>(null);

  // Derived state
  const isCertified = report?.status === "certified";
  const sections = useMemo(() => extractSections(content), [content]);

  // -------------------------------------------------------------------------
  // Load data
  // -------------------------------------------------------------------------

  useEffect(() => {
    async function loadData() {
      try {
        const [propRes, arbRes] = await Promise.all([
          fetch(`/api/properties/${propertyId}`),
          fetch("/api/arborist/profile"),
        ]);

        if (!propRes.ok) throw new Error("Failed to load property");
        const data = await propRes.json();
        setProperty(data);
        setReportType(data.reportType || "health_assessment");

        if (arbRes.ok) {
          const arbData = await arbRes.json();
          setArborist(arbData);
        }

        if (data.reports && data.reports.length > 0) {
          const r = data.reports[0];
          setReport(r);
          const c = r.finalContent || r.aiDraftContent || "";
          setContent(c);
          savedContentRef.current = c;
          setPreviewHtml(renderMarkdownToHtml(c));
          setReportType(r.reportType);
          setViewMode(r.status === "certified" ? "preview" : "editor");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  // -------------------------------------------------------------------------
  // Debounced preview (500ms)
  // -------------------------------------------------------------------------

  const updatePreview = useCallback((md: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(renderMarkdownToHtml(md));
    }, 500);
  }, []);

  // -------------------------------------------------------------------------
  // Content change handler
  // -------------------------------------------------------------------------

  const handleContentChange = useCallback(
    (value: string) => {
      setContent(value);
      setHasUnsavedChanges(value !== savedContentRef.current);
      updatePreview(value);
    },
    [updatePreview]
  );

  // -------------------------------------------------------------------------
  // Save report
  // -------------------------------------------------------------------------

  const saveReport = useCallback(
    async (silent = false) => {
      if (!report || isCertified) return;
      if (!silent) setSaving(true);
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalContent: content,
            status: report.status === "draft" ? "review" : report.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to save");
        const updated = await res.json();
        setReport(updated);
        savedContentRef.current = content;
        setHasUnsavedChanges(false);
        const now = new Date();
        setLastSaved(now);
        lastSavedRef.current = now;
      } catch (err) {
        if (!silent) {
          setError(err instanceof Error ? err.message : "Save failed");
        }
      } finally {
        if (!silent) setSaving(false);
      }
    },
    [report, isCertified, content]
  );

  // -------------------------------------------------------------------------
  // Auto-save every 30s
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!report || isCertified) return;

    autoSaveRef.current = setInterval(() => {
      if (savedContentRef.current !== content) {
        saveReport(true);
      }
    }, 30000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [report, isCertified, content, saveReport]);

  // Refresh "saved X ago" text
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // -------------------------------------------------------------------------
  // Generate report
  // -------------------------------------------------------------------------

  const generateReport = async () => {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, reportType }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate report");
      }
      const newReport = await res.json();
      setReport(newReport);
      const c = newReport.aiDraftContent || "";
      setContent(c);
      savedContentRef.current = c;
      setPreviewHtml(renderMarkdownToHtml(c));
      setViewMode("editor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const regenerateReport = () => {
    if (
      !window.confirm(
        "Regenerating will replace the current AI draft. Your edits will be lost. Continue?"
      )
    )
      return;
    generateReport();
  };

  // -------------------------------------------------------------------------
  // Certify report
  // -------------------------------------------------------------------------

  const certifyReport = async () => {
    if (!report || !signatureText.trim() || !certifyAgreed) return;
    setCertifying(true);
    try {
      // Save content first
      await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalContent: content, status: "review" }),
      });

      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eSignatureText: signatureText.trim() }),
      });
      if (!res.ok) throw new Error("Failed to certify");
      const updated = await res.json();
      setReport(updated);
      setShowCertifyPanel(false);
      setViewMode("preview");
      savedContentRef.current = content;
      setHasUnsavedChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Certification failed");
    } finally {
      setCertifying(false);
    }
  };

  // -------------------------------------------------------------------------
  // Unlock (uncertify) report
  // -------------------------------------------------------------------------

  const unlockReport = async () => {
    if (
      !window.confirm(
        "Unlocking will revert the report to review status. The certification will be removed. Continue?"
      )
    )
      return;

    if (!report) return;
    setUnlocking(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to unlock");
      const updated = await res.json();
      setReport(updated);
      setViewMode("editor");
      setSignatureText("");
      setCertifyAgreed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unlock failed");
    } finally {
      setUnlocking(false);
    }
  };

  // -------------------------------------------------------------------------
  // Section nav click — scroll preview to heading
  // -------------------------------------------------------------------------

  const scrollToSection = (sectionId: string) => {
    if (previewRef.current) {
      const heading = previewRef.current.querySelector(
        `[data-section-id="${sectionId}"]`
      );
      if (heading) {
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // -------------------------------------------------------------------------
  // Render: Loading
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        Property not found
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: No report yet — generate UI
  // -------------------------------------------------------------------------

  if (!report) {
    return (
      <div>
        <Link
          href={`/properties/${propertyId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Property
        </Link>

        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold">Generate AI Report</h2>
                <p className="text-muted-foreground mt-1">
                  {property.address}, {property.city}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Report Type:</span>
                <Badge variant="outline">
                  {getReportTypeConfig(reportType)?.label ||
                    reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800">
                <p className="font-medium mb-2">
                  The AI will generate a comprehensive report including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Scope of Assignment &amp; Site Observations</li>
                  <li>
                    Tree Inventory table ({property.trees.length} trees)
                  </li>
                  <li>Individual Tree Assessments</li>
                  <li>Recommendations &amp; Mitigation</li>
                  <li>Arborist Certification Statement</li>
                </ul>
              </div>

              <Button
                onClick={generateReport}
                disabled={generating || property.trees.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Draft
                  </>
                )}
              </Button>

              {property.trees.length === 0 && (
                <p className="text-sm text-amber-600 text-center">
                  Add at least one tree before generating a report.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: Report exists — editor / preview
  // -------------------------------------------------------------------------

  const signatureNameMatch =
    arborist?.signatureName &&
    signatureText.trim().toLowerCase() ===
      arborist.signatureName.trim().toLowerCase();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* ---- Header Bar ---- */}
      <div className="flex-none border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/properties/${propertyId}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Report Editor</h1>
                <StatusBadge status={report.status} />
                <Badge variant="outline" className="text-xs">
                  {getReportTypeConfig(report.reportType)?.label ||
                    report.reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span>
                  {property.address}, {property.city}
                </span>
                {lastSaved && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Saved {timeAgo(lastSaved)}
                  </span>
                )}
                {hasUnsavedChanges && (
                  <span className="text-amber-600 font-medium">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            {!isCertified && (
              <div className="flex rounded-lg border bg-muted p-0.5">
                <button
                  onClick={() => setViewMode("editor")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "editor"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Pencil className="h-3 w-3" />
                  Editor
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "preview"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </button>
              </div>
            )}

            {/* Regenerate */}
            {!isCertified && (
              <Button
                variant="outline"
                size="sm"
                onClick={regenerateReport}
                disabled={generating}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 mr-1.5 ${generating ? "animate-spin" : ""}`}
                />
                Regenerate
              </Button>
            )}

            {/* Save */}
            {!isCertified && viewMode === "editor" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveReport(false)}
                disabled={saving || !hasUnsavedChanges}
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                {saving ? "Saving..." : "Save"}
              </Button>
            )}

            {/* Certify */}
            {!isCertified && (
              <Button
                size="sm"
                className="bg-emerald-700 hover:bg-emerald-600"
                onClick={() => setShowCertifyPanel(true)}
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Certify
              </Button>
            )}

            {/* Unlock */}
            {isCertified && (
              <Button
                variant="outline"
                size="sm"
                onClick={unlockReport}
                disabled={unlocking}
              >
                <Unlock className="h-3.5 w-3.5 mr-1.5" />
                {unlocking ? "Unlocking..." : "Unlock & Revise"}
              </Button>
            )}

            {/* Export buttons */}
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`/api/reports/${report.id}/pdf`, "_blank")
              }
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(`/api/reports/${report.id}/word`, "_blank")
              }
            >
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
              Word
            </Button>
          </div>
        </div>
      </div>

      {/* ---- Error Bar ---- */}
      {error && (
        <div className="flex-none border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Section Navigation Sidebar */}
        {sections.length > 0 && showSectionNav && viewMode === "editor" && (
          <div className="flex-none w-48 border-r bg-muted/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sections
              </span>
              <button
                onClick={() => setShowSectionNav(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-0.5">
                {sections.map((section, idx) => (
                  <button
                    key={`${section.id}-${idx}`}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded hover:bg-accent transition-colors truncate ${
                      section.level === 1
                        ? "font-semibold"
                        : section.level === 2
                          ? "pl-4 text-muted-foreground"
                          : "pl-6 text-muted-foreground/70"
                    }`}
                    title={section.title}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Toggle section nav when hidden */}
        {!showSectionNav && viewMode === "editor" && sections.length > 0 && (
          <button
            onClick={() => setShowSectionNav(true)}
            className="flex-none w-8 border-r bg-muted/30 flex items-center justify-center hover:bg-muted transition-colors"
            title="Show section navigation"
          >
            <List className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* Editor + Preview (split pane) or Full Preview */}
        {viewMode === "editor" && !isCertified ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Markdown Editor */}
            <div className="flex-1 flex flex-col border-r">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Pencil className="h-3 w-3" />
                Markdown Editor
                <span className="ml-auto">
                  Use # headings, **bold**, *italic*, - lists, | tables |
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="flex-1 resize-none border-0 bg-background p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0"
                spellCheck={false}
              />
            </div>

            {/* Live Preview */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="h-3 w-3" />
                Live Preview
              </div>
              <ScrollArea className="flex-1">
                <div
                  ref={previewRef}
                  className="p-6 prose prose-sm max-w-none dark:prose-invert report-live-preview"
                >
                  <style>{`
                    .report-live-preview h1,
                    .report-live-preview h2,
                    .report-live-preview h3 {
                      color: #2d5016;
                      scroll-margin-top: 16px;
                    }
                    .dark .report-live-preview h1,
                    .dark .report-live-preview h2,
                    .dark .report-live-preview h3 {
                      color: #6fcf3b;
                    }
                    .report-live-preview table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 0.8rem;
                    }
                    .report-live-preview table th {
                      background: #2d5016;
                      color: white;
                      padding: 4px 8px;
                      text-align: left;
                    }
                    .dark .report-live-preview table th {
                      background: #1a3a0a;
                    }
                    .report-live-preview table td {
                      padding: 4px 8px;
                      border: 1px solid #ddd;
                    }
                    .dark .report-live-preview table td {
                      border-color: #3f3f46;
                    }
                    .report-live-preview table tr:nth-child(even) {
                      background: #f9f9f6;
                    }
                    .dark .report-live-preview table tr:nth-child(even) {
                      background: #18181b;
                    }
                    .report-live-preview hr {
                      border: none;
                      border-top: 1px solid #ddd;
                      margin: 16px 0;
                    }
                  `}</style>
                  <div
                    dangerouslySetInnerHTML={{ __html: addSectionIds(previewHtml) }}
                  />
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          /* Full Preview Mode (or certified read-only) */
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-4xl mx-auto py-6 px-4">
                {isCertified && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 mb-4">
                    <Lock className="h-4 w-4 shrink-0" />
                    This report has been certified and is locked. Use
                    &ldquo;Unlock &amp; Revise&rdquo; to make changes.
                  </div>
                )}
                <ReportPreview
                  content={content}
                  property={property}
                  trees={property.trees}
                  arborist={arborist}
                  reportType={report.reportType}
                  certifiedAt={report.certifiedAt}
                  eSignatureText={report.eSignatureText}
                />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* ---- Certification Panel ---- */}
      {showCertifyPanel && !isCertified && (
        <div className="flex-none border-t bg-emerald-50/50 dark:bg-emerald-950/10 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h3 className="font-semibold text-lg">Certify This Report</h3>
              <button
                onClick={() => {
                  setShowCertifyPanel(false);
                  setCertifyAgreed(false);
                  setSignatureText("");
                }}
                className="ml-auto text-sm text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </div>

            {/* Arborist info */}
            {arborist && (
              <div className="flex items-center gap-4 text-sm mb-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border">
                <div>
                  <span className="font-medium">{arborist.name}</span>
                  <span className="text-muted-foreground ml-2">
                    ISA #{arborist.isaCertificationNum}
                  </span>
                </div>
                {arborist.companyName && (
                  <span className="text-muted-foreground">
                    {arborist.companyName}
                  </span>
                )}
              </div>
            )}

            {/* Certification statement */}
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border text-sm mb-3">
              <p>
                I certify that I have personally inspected the tree(s)
                described in this report and that the information contained
                herein is accurate to the best of my professional knowledge
                and belief. I am an ISA Certified Arborist and the opinions
                expressed are based on my professional training, experience,
                and education.
              </p>
            </div>

            {/* Agreement checkbox */}
            <label className="flex items-start gap-2 text-sm mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={certifyAgreed}
                onChange={(e) => setCertifyAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                I agree to the certification statement above and confirm all
                information is accurate.
              </span>
            </label>

            {/* Signature input */}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Type your full name as electronic signature
                  {arborist?.signatureName && (
                    <span className="text-muted-foreground/60 ml-1">
                      (must match: {arborist.signatureName})
                    </span>
                  )}
                </label>
                <Input
                  placeholder="e.g., Alex Rivera"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  className={
                    signatureText.trim() &&
                    arborist?.signatureName &&
                    !signatureNameMatch
                      ? "border-amber-300 focus-visible:ring-amber-400"
                      : ""
                  }
                />
                {signatureText.trim() &&
                  arborist?.signatureName &&
                  !signatureNameMatch && (
                    <p className="text-xs text-amber-600 mt-1">
                      Signature must match your profile name:{" "}
                      {arborist.signatureName}
                    </p>
                  )}
              </div>
              <Button
                onClick={certifyReport}
                disabled={
                  !signatureText.trim() ||
                  !certifyAgreed ||
                  certifying ||
                  (arborist?.signatureName ? !signatureNameMatch : false)
                }
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                {certifying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Certifying...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Certify &amp; Lock Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Certified details bar ---- */}
      {isCertified && report && (
        <div className="flex-none border-t bg-emerald-50/50 dark:bg-emerald-950/10 px-6 py-3">
          <div className="flex items-center gap-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <span className="font-medium text-emerald-800">
              Certified
            </span>
            <span className="text-muted-foreground">
              Signed by {report.eSignatureText}
            </span>
            {report.certifiedAt && (
              <span className="text-muted-foreground">
                on{" "}
                {new Date(report.certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Adds data-section-id attributes to headings in HTML for section nav scrolling
// ---------------------------------------------------------------------------

function addSectionIds(html: string): string {
  return html.replace(
    /<(h[1-3])>(.*?)<\/h[1-3]>/g,
    (match, tag, content) => {
      const text = content.replace(/<[^>]+>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<${tag} data-section-id="${id}">${content}</${tag}>`;
    }
  );
}

```

### app/(app)/properties/new/page.tsx
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  ArrowLeft,
  Loader2,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Check,
} from "lucide-react";
import Link from "next/link";
import { REPORT_TYPES } from "@/lib/report-types";
import { cn } from "@/lib/utils";

const CITIES = [
  "Palo Alto",
  "Menlo Park",
  "Atherton",
  "Woodside",
  "Portola Valley",
];

const COUNTY_MAP: Record<string, string> = {
  "Palo Alto": "Santa Clara",
  "Menlo Park": "San Mateo",
  Atherton: "San Mateo",
  Woodside: "San Mateo",
  "Portola Valley": "San Mateo",
};

const ICON_MAP = {
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
} as const;

const COLOR_MAP: Record<string, { border: string; bg: string; ring: string; icon: string; check: string }> = {
  green: {
    border: "border-l-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-600",
    icon: "text-emerald-700",
    check: "bg-emerald-600",
  },
  red: {
    border: "border-l-red-600",
    bg: "bg-red-50",
    ring: "ring-red-600",
    icon: "text-red-700",
    check: "bg-red-600",
  },
  amber: {
    border: "border-l-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-600",
    icon: "text-amber-700",
    check: "bg-amber-600",
  },
  blue: {
    border: "border-l-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-600",
    icon: "text-blue-700",
    check: "bg-blue-600",
  },
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Report type
  const [reportType, setReportType] = useState<string | null>(null);

  // Step 2: Property details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [parcelNumber, setParcelNumber] = useState("");
  const [homeownerName, setHomeownerName] = useState("");
  const [homeownerEmail, setHomeownerEmail] = useState("");
  const [homeownerPhone, setHomeownerPhone] = useState("");

  // Construction encroachment project fields
  const [projectDescription, setProjectDescription] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [architectName, setArchitectName] = useState("");

  const handleCityChange = (value: string) => {
    setCity(value);
    setCounty(COUNTY_MAP[value] || "San Mateo");
  };

  const handleSubmit = async () => {
    if (!address.trim() || !city || !reportType) {
      setError("Report type, address, and city are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Geocode the address
      let lat: number | undefined;
      let lng: number | undefined;

      try {
        const geoRes = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: address.trim(), city, state: "CA" }),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          lat = geoData.lat;
          lng = geoData.lng;
        }
      } catch {
        // Geocoding failure is non-fatal
        console.warn("Geocoding failed, proceeding without coordinates");
      }

      // 2. Create the property
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          city,
          county,
          zip: zip.trim() || undefined,
          parcelNumber: parcelNumber.trim() || undefined,
          lat,
          lng,
          reportType,
          ...(homeownerName.trim() && { homeownerName: homeownerName.trim() }),
          ...(homeownerEmail.trim() && { homeownerEmail: homeownerEmail.trim() }),
          ...(homeownerPhone.trim() && { homeownerPhone: homeownerPhone.trim() }),
          // Construction encroachment project fields
          ...(reportType === "construction_encroachment" && {
            ...(projectDescription.trim() && { projectDescription: projectDescription.trim() }),
            ...(permitNumber.trim() && { permitNumber: permitNumber.trim() }),
            ...(developerName.trim() && { developerName: developerName.trim() }),
            ...(architectName.trim() && { architectName: architectName.trim() }),
          }),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create property");
      }

      const property = await res.json();
      router.push(`/properties/${property.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const isValid = address.trim() && city && reportType;

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">New Property</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 1
            ? "Select the type of report you'll be creating for this property."
            : "Enter the property address to get started with the satellite map view."}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
            step === 1
              ? "bg-emerald-700 text-white"
              : "bg-emerald-100 text-emerald-700"
          )}
        >
          {step > 1 ? <Check className="h-4 w-4" /> : "1"}
        </div>
        <span className={cn("text-sm font-medium", step === 1 ? "text-foreground" : "text-muted-foreground")}>
          Report Type
        </span>
        <div className="w-8 h-px bg-border" />
        <div
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
            step === 2
              ? "bg-emerald-700 text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          2
        </div>
        <span className={cn("text-sm font-medium", step === 2 ? "text-foreground" : "text-muted-foreground")}>
          Property Details
        </span>
      </div>

      {/* ============ STEP 1: Report Type Selection ============ */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPORT_TYPES.map((rt) => {
              const Icon = ICON_MAP[rt.icon];
              const colors = COLOR_MAP[rt.color] || COLOR_MAP.green;
              const selected = reportType === rt.id;

              return (
                <button
                  key={rt.id}
                  onClick={() => setReportType(rt.id)}
                  className={cn(
                    "relative text-left p-5 rounded-lg border-2 border-l-4 transition-all",
                    colors.border,
                    selected
                      ? `${colors.bg} ring-2 ${colors.ring} border-transparent`
                      : "bg-white hover:bg-gray-50 border-border"
                  )}
                >
                  {selected && (
                    <div
                      className={cn(
                        "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",
                        colors.check
                      )}
                    >
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <Icon className={cn("h-7 w-7 mb-3", colors.icon)} />
                  <h3 className="font-semibold text-sm text-foreground">
                    {rt.label}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rt.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" asChild>
              <Link href="/properties">Cancel</Link>
            </Button>
            <Button
              onClick={() => setStep(2)}
              disabled={!reportType}
              className="bg-emerald-700 hover:bg-emerald-600"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ============ STEP 2: Property Details ============ */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Property Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Property Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City *</Label>
                  <Select value={city} onValueChange={handleCityChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>County</Label>
                  <Input
                    value={county}
                    readOnly
                    className="mt-1 bg-muted"
                    placeholder="Auto-filled"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="94301"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="apn">APN / Parcel Number</Label>
                  <Input
                    id="apn"
                    placeholder="132-40-001"
                    value={parcelNumber}
                    onChange={(e) => setParcelNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Construction encroachment project info */}
          {reportType === "construction_encroachment" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <HardHat className="h-4 w-4 text-blue-600" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="projectDescription">Project Description</Label>
                  <Input
                    id="projectDescription"
                    placeholder="New addition, foundation work, etc."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="permitNumber">Permit Number</Label>
                    <Input
                      id="permitNumber"
                      placeholder="BP-2024-001234"
                      value={permitNumber}
                      onChange={(e) => setPermitNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developerName">Developer / Contractor</Label>
                    <Input
                      id="developerName"
                      placeholder="ABC Construction"
                      value={developerName}
                      onChange={(e) => setDeveloperName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="architectName">Architect</Label>
                  <Input
                    id="architectName"
                    placeholder="Jane Smith, AIA"
                    value={architectName}
                    onChange={(e) => setArchitectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Homeowner Info (optional) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Homeowner Information{" "}
                <span className="text-muted-foreground font-normal text-sm">
                  (Optional)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="homeownerName">Name</Label>
                <Input
                  id="homeownerName"
                  placeholder="John Smith"
                  value={homeownerName}
                  onChange={(e) => setHomeownerName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="homeownerEmail">Email</Label>
                  <Input
                    id="homeownerEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={homeownerEmail}
                    onChange={(e) => setHomeownerEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="homeownerPhone">Phone</Label>
                  <Input
                    id="homeownerPhone"
                    placeholder="(650) 555-0100"
                    value={homeownerPhone}
                    onChange={(e) => setHomeownerPhone(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error display */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/properties">Cancel</Link>
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isValid || submitting}
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 mr-2" />
                    Create &amp; Open Map
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

### app/(app)/properties/page.tsx
```tsx
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Properties</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {properties.length} propert{properties.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link href="/properties/new">
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
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="rounded-full bg-emerald-50 p-2">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {property.address}
                            </h3>
                            {latestReport ? (
                              <StatusBadge status={latestReport.status} />
                            ) : (
                              <StatusBadge status={property.status} />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {property.city}, {property.county} County
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                        <div className="text-right">
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

                        <div className="text-right text-sm text-muted-foreground">
                          {format(new Date(property.updatedAt), "MMM d, yyyy")}
                        </div>

                        {latestReport && (
                          <a
                            href={`/properties/${property.id}/report`}
                            className="text-emerald-600 hover:text-emerald-500 relative z-10"
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

```

### app/(app)/settings/page.tsx
```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Save,
  Upload,
  Trash2,
  Building2,
  User,
  Globe,
  ImageIcon,
} from "lucide-react";

interface ArboristProfile {
  id: string;
  name: string;
  email: string;
  isaCertificationNum: string;
  companyName: string | null;
  phone: string | null;
  companyLogoUrl: string | null;
  companyAddress: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  companyWebsite: string | null;
  licenseNumbers: string | null;
  signatureName: string | null;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ArboristProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    isaCertificationNum: "",
    companyName: "",
    phone: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    licenseNumbers: "",
    signatureName: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data: ArboristProfile = await res.json();
        setProfile(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          isaCertificationNum: data.isaCertificationNum || "",
          companyName: data.companyName || "",
          phone: data.phone || "",
          companyAddress: data.companyAddress || "",
          companyPhone: data.companyPhone || "",
          companyEmail: data.companyEmail || "",
          companyWebsite: data.companyWebsite || "",
          licenseNumbers: data.licenseNumbers || "",
          signatureName: data.signatureName || "",
        });
      } catch (err) {
        setMessage({
          type: "error",
          text: err instanceof Error ? err.message : "Failed to load",
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setProfile(updated);
      setMessage({ type: "success", text: "Profile saved successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/arborist/logo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: data.companyLogoUrl } : prev
      );
      setMessage({ type: "success", text: "Logo uploaded successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteLogo = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/logo", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: null } : prev
      );
      setMessage({ type: "success", text: "Logo removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your arborist profile and company branding
      </p>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm mb-6 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Company Logo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-5 w-5 text-emerald-600" />
            Company Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shrink-0">
              {profile?.companyLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.companyLogoUrl}
                  alt="Company logo"
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <Building2 className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadLogo(file);
                  e.target.value = "";
                }}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-1.5" />
                  )}
                  {uploading ? "Uploading..." : "Upload Logo"}
                </Button>
                {profile?.companyLogoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteLogo}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP, or SVG &bull; Max 10 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arborist Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5 text-emerald-600" />
            Arborist Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ISA Certification #</Label>
              <Input
                value={form.isaCertificationNum}
                onChange={(e) =>
                  updateField("isaCertificationNum", e.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>License Numbers</Label>
              <Input
                placeholder="e.g., CA-QCLP #1234"
                value={form.licenseNumbers}
                onChange={(e) => updateField("licenseNumbers", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Signature Name (for certifications)</Label>
            <Input
              placeholder="e.g., Alex Rivera, ISA Board Certified Master Arborist"
              value={form.signatureName}
              onChange={(e) => updateField("signatureName", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-5 w-5 text-emerald-600" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
              placeholder="123 Main St, City, CA 94000"
              value={form.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.companyEmail}
                onChange={(e) => updateField("companyEmail", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="https://example.com"
                value={form.companyWebsite}
                onChange={(e) => updateField("companyWebsite", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-emerald-700 hover:bg-emerald-600"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}

```

### app/api/ai/generate-report/route.ts
```ts
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate } from "@/lib/report-templates";
import Anthropic from "@anthropic-ai/sdk";

interface TreeRecordData {
  treeNumber: number;
  tagNumber?: string | null;
  speciesCommon: string;
  speciesScientific: string | null;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string | null;
  structuralNotes: string | null;
  isProtected: boolean;
  protectionReason: string | null;
  recommendedAction: string;
  mitigationRequired: string | null;
  typeSpecificData?: string | null;
}

interface PropertyData {
  address: string;
  city: string;
  state: string | null;
  zip: string | null;
  county: string | null;
  parcelNumber: string | null;
  scopeOfAssignment?: string | null;
  siteObservations?: string | null;
}

/**
 * Format type-specific tree assessment data for inclusion in AI prompts.
 */
function formatTypeSpecificBlock(
  reportType: string,
  raw: string | null | undefined
): string {
  if (!raw) return "";
  try {
    const d = JSON.parse(raw);
    switch (reportType) {
      case "health_assessment":
        return [
          d.likelihoodOfFailure
            ? `    - TRAQ Likelihood of Failure: ${d.likelihoodOfFailure}`
            : "",
          d.likelihoodOfImpact
            ? `    - TRAQ Likelihood of Impact: ${d.likelihoodOfImpact}`
            : "",
          d.consequences
            ? `    - TRAQ Consequences: ${d.consequences}`
            : "",
          d.overallRiskRating
            ? `    - TRAQ Overall Risk Rating: ${d.overallRiskRating}`
            : "",
          d.targetDescription
            ? `    - Target Description: ${d.targetDescription}`
            : "",
          d.maintenanceItems?.length
            ? `    - Maintenance Items: ${d.maintenanceItems.join(", ")}`
            : "",
          d.maintenanceRecommendations
            ? `    - Maintenance Recommendations: ${d.maintenanceRecommendations}`
            : "",
          d.maintenancePriority
            ? `    - Maintenance Priority: ${d.maintenancePriority}`
            : "",
          d.maintenanceTimeline
            ? `    - Maintenance Timeline: ${d.maintenanceTimeline}`
            : "",
          d.estimatedMaintenanceCost != null
            ? `    - Estimated Maintenance Cost: $${d.estimatedMaintenanceCost}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "removal_permit":
        return [
          d.riskRating ? `    - Risk Rating: ${d.riskRating}` : "",
          d.riskFactors?.length
            ? `    - Risk Factors: ${d.riskFactors.join(", ")}`
            : "",
          d.removalReason ? `    - Removal Reason: ${d.removalReason}` : "",
          d.retentionFeasibility
            ? `    - Retention Feasibility: ${d.retentionFeasibility.replace(/_/g, " ")}`
            : "",
          d.retentionNotes
            ? `    - Retention Notes: ${d.retentionNotes}`
            : "",
          d.estimatedRemainingLifespan
            ? `    - Estimated Remaining Lifespan: ${d.estimatedRemainingLifespan}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "tree_valuation":
        return [
          d.valuationMethod
            ? `    - Valuation Method: ${d.valuationMethod}`
            : "",
          d.speciesRating != null
            ? `    - Species Rating: ${d.speciesRating}%`
            : "",
          d.conditionRating != null
            ? `    - Condition Rating (Valuation): ${d.conditionRating}%`
            : "",
          d.locationRating != null
            ? `    - Location Rating: ${d.locationRating}%`
            : "",
          d.costPerSquareInch != null
            ? `    - Cost per Sq Inch: $${d.costPerSquareInch}`
            : "",
          d.trunkArea != null
            ? `    - Trunk Area: ${d.trunkArea.toFixed(1)} sq in`
            : "",
          d.appraisedValue != null
            ? `    - Appraised Value: $${Number(d.appraisedValue).toLocaleString()}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "construction_encroachment":
        return [
          d.tpzRadius != null ? `    - TPZ Radius (auto): ${d.tpzRadius} ft` : "",
          d.tpzOverride && d.tpzManual != null
            ? `    - TPZ Radius (manual override): ${d.tpzManual} ft`
            : "",
          d.srzRadius != null
            ? `    - SRZ Radius (auto): ${d.srzRadius.toFixed(1)} ft`
            : "",
          d.tpzOverride && d.srzManual != null
            ? `    - SRZ Radius (manual override): ${d.srzManual} ft`
            : "",
          d.encroachmentDescription
            ? `    - Encroachment Description: ${d.encroachmentDescription}`
            : "",
          d.encroachmentPercent != null
            ? `    - Encroachment: ${d.encroachmentPercent}%`
            : "",
          d.impactAssessment
            ? `    - Impact Assessment: ${d.impactAssessment}`
            : "",
          d.protectionMeasuresList?.length
            ? `    - Protection Measures: ${d.protectionMeasuresList.join(", ")}`
            : d.protectionMeasures
            ? `    - Protection Measures: ${d.protectionMeasures}`
            : "",
          d.monitoringFrequency
            ? `    - Monitoring Frequency: ${d.monitoringFrequency}`
            : d.monitoringSchedule
            ? `    - Monitoring Schedule: ${d.monitoringSchedule}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      default:
        return "";
    }
  } catch {
    return "";
  }
}

function generateMockReport(
  property: PropertyData,
  trees: TreeRecordData[],
  reportType: string
): string {
  const reportTypeLabel = reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const state = property.state || "CA";
  const treeCount = trees.length;
  const protectedCount = trees.filter((t) => t.isProtected).length;

  // Build tree inventory table
  const treeTableHeader = `| Tree # | Common Name | Scientific Name | DBH (in) | Height (ft) | Canopy (ft) | Condition | Protected | Action |`;
  const treeTableDivider = `|--------|-------------|-----------------|----------|-------------|-------------|-----------|-----------|--------|`;
  const treeTableRows = trees
    .map(
      (t) =>
        `| ${t.treeNumber} | ${t.speciesCommon} | ${t.speciesScientific ? `*${t.speciesScientific}*` : "N/A"} | ${t.dbhInches} | ${t.heightFt ?? "N/M"} | ${t.canopySpreadFt ?? "N/M"} | ${t.conditionRating}/5 | ${t.isProtected ? "Yes" : "No"} | ${t.recommendedAction} |`
    )
    .join("\n");

  // Build individual tree assessment sections
  const individualAssessments = trees
    .map((t) => {
      const conditionDesc =
        t.conditionRating >= 4
          ? "good to excellent"
          : t.conditionRating >= 3
          ? "fair"
          : "poor to declining";

      return `### Tree #${t.treeNumber} - ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

**Condition Rating: ${t.conditionRating}/5 (${conditionDesc})**

**Health Notes:** ${t.healthNotes || "The tree exhibits typical characteristics for its species and age class. No significant health defects were noted during the visual assessment. Crown density, leaf color, and twig growth appear within normal ranges."}

**Structural Notes:** ${t.structuralNotes || "The tree's structural integrity was evaluated for defects including cavities, included bark, codominant stems, decay, cracks, and root plate stability. No significant structural defects were identified that would warrant immediate concern."}

${t.conditionRating >= 4 ? "The tree is in good to excellent condition and is expected to provide continued benefits to the property and community." : t.conditionRating >= 3 ? "The tree is in fair condition. Continued monitoring is recommended to track any changes in health or structural stability." : "The tree is in poor condition. Remedial action may be necessary to address the identified health and/or structural concerns."}`;
    })
    .join("\n\n");

  // Build per-tree recommendation summaries
  const recommendationSummaries = trees
    .map((t) => {
      const actionDesc =
        t.recommendedAction === "retain"
          ? `Retain and preserve. The tree is in ${t.conditionRating >= 4 ? "good" : t.conditionRating >= 3 ? "fair" : "declining"} condition and continues to provide aesthetic, environmental, and ecological benefits. A routine maintenance pruning program should be implemented.`
          : t.recommendedAction === "remove"
          ? `Removal is recommended. ${t.conditionRating <= 2 ? "The tree's declining health and/or structural deficiencies present an unacceptable level of risk." : "The proposed removal should be evaluated against applicable municipal ordinance requirements."}${t.isProtected ? ` As a protected tree, a removal permit must be obtained from the City of ${property.city} prior to any removal work.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning is recommended to address identified structural concerns and/or improve clearance. All pruning should be performed in accordance with ANSI A300 pruning standards and ISA Best Management Practices.`
          : `Continued monitoring at 6-12 month intervals is recommended. Any significant changes in condition should be evaluated by a certified arborist.`;

      return `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${actionDesc}`;
    })
    .join("\n");

  // Build protected status details
  const protectedTrees = trees.filter((t) => t.isProtected);
  const protectedDetails = protectedTrees.length
    ? protectedTrees
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${t.protectionReason || "Meets protection criteria under the municipal ordinance."}`
        )
        .join("\n")
    : "No trees on this property meet the criteria for protected status under the applicable municipal ordinance.";

  // Build mitigation section
  const treesNeedingMitigation = trees.filter(
    (t) => t.isProtected && t.recommendedAction === "remove"
  );
  const mitigationContent = treesNeedingMitigation.length
    ? treesNeedingMitigation
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${t.mitigationRequired || `As a protected tree, removal will require mitigation in accordance with the ${property.city} municipal ordinance. Typical mitigation may include replanting replacement trees at the required ratio and/or payment of in-lieu fees.`}`
        )
        .join("\n")
    : "No mitigation is required at this time based on the current assessment and recommended actions.";

  return `# Arborist ${reportTypeLabel} Report

**Date:** ${date}
**Property Address:** ${property.address}
**City:** ${property.city}, ${state}
**County:** ${property.county || "N/A"}
**Parcel Number:** ${property.parcelNumber || "N/A"}
**Total Trees Assessed:** ${treeCount}

---

## 1. Assignment and Purpose

This report has been prepared to provide a professional arborist assessment of ${treeCount} tree${treeCount !== 1 ? "s" : ""} located at ${property.address}, ${property.city}, ${state}. The purpose of this ${reportTypeLabel.toLowerCase()} is to evaluate each tree's health, structural condition, and protected status in accordance with applicable municipal ordinances and ISA (International Society of Arboriculture) standards.

---

## 2. Tree Inventory

${treeTableHeader}
${treeTableDivider}
${treeTableRows}

---

## 3. Site Observations

The subject trees are located on the property at ${property.address}. The surrounding site conditions were evaluated for factors that may impact tree health and stability, including soil compaction, grade changes, construction activity, and proximity to structures. All trees were visually assessed from ground level in accordance with ISA Tree Risk Assessment standards (TRAQ methodology).

---

## 4. Individual Tree Assessments

${individualAssessments}

---

## 5. Protected Status Summary

**Protected Trees:** ${protectedCount} of ${treeCount} total

${protectedDetails}

---

## 6. Recommendations

${recommendationSummaries}

---

## 7. Mitigation Requirements

${mitigationContent}

---

## 8. Arborist Certification Statement

I, the undersigned, certify that this report represents my professional opinion based on my education, training, and experience as an ISA Certified Arborist. The observations and recommendations contained herein are based on a visual assessment of the subject trees conducted from ground level. No warranty is made, expressed, or implied, regarding the future health, structural stability, or safety of the subject trees.

This report has been prepared in accordance with the standards and guidelines of the International Society of Arboriculture (ISA) and applicable ANSI A300 standards.

---

*This report was generated as a draft and requires review and certification by the assigned arborist.*
`;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const arboristId = arborist.id;
    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
          include: {
            treePhotos: { orderBy: { sortOrder: "asc" } },
            treeAudioNotes: {
              where: { status: "ready" },
              orderBy: { createdAt: "asc" },
            },
          },
        },
        propertyAudioNotes: {
          where: { status: "ready" },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.trees.length === 0) {
      return NextResponse.json(
        { error: "Property has no tree records. Add trees before generating a report." },
        { status: 400 }
      );
    }

    const ordinance = await getOrdinanceByCity(property.city);

    let aiDraftContent: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const reportTypeLabel = body.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

      const treeCount = property.trees.length;

      const treeDataBlock = property.trees
        .map(
          (t) => {
            const photoLines = t.treePhotos.length > 0
              ? t.treePhotos
                  .map((p, i) => `      Photo ${i + 1}: ${p.caption || "No caption"}`)
                  .join("\n")
              : "      None";

            const audioLines = t.treeAudioNotes.length > 0
              ? t.treeAudioNotes
                  .map((a, i) => `      Audio Note ${i + 1}: ${a.cleanedTranscription || ""}`)
                  .join("\n")
              : "      None recorded";

            const typeBlock = formatTypeSpecificBlock(body.reportType, t.typeSpecificData);

            return `  Tree #${t.treeNumber}:
    - Tag Number: ${t.tagNumber || "N/A"}
    - Species: ${t.speciesCommon}${t.speciesScientific ? ` (${t.speciesScientific})` : ""}
    - DBH: ${t.dbhInches} inches
    - Height: ${t.heightFt ? `${t.heightFt} feet` : "Not measured"}
    - Canopy Spread: ${t.canopySpreadFt ? `${t.canopySpreadFt} feet` : "Not measured"}
    - Condition Rating: ${t.conditionRating}/5
    - Health Notes: ${t.healthNotes || "None provided"}
    - Structural Notes: ${t.structuralNotes || "None provided"}
    - Protected Status: ${t.isProtected ? "Yes" : "No"}
    - Protection Reason: ${t.protectionReason || "N/A"}
    - Recommended Action: ${t.recommendedAction}
    - Mitigation Required: ${t.mitigationRequired || "None"}
    - Photos on File: ${t.treePhotos.length > 0 ? `${t.treePhotos.length} photo(s)` : "None"}
${t.treePhotos.length > 0 ? photoLines : ""}
    - Field Audio Notes:
${audioLines}${typeBlock ? `\n    - Type-Specific Assessment:\n${typeBlock}` : ""}`;
          }
        )
        .join("\n\n");

      // Property-level site audio notes
      const propertyAudioBlock =
        property.propertyAudioNotes && property.propertyAudioNotes.length > 0
          ? `\nPROPERTY-LEVEL FIELD NOTES (recorded by the arborist during site visit):
${property.propertyAudioNotes
  .map(
    (a: { cleanedTranscription: string | null }, i: number) =>
      `  Site Note ${i + 1}: ${a.cleanedTranscription || ""}`
  )
  .join("\n")}`
          : "";

      // Look up template for this report type
      const template = getReportTemplate(body.reportType);

      const boilerplateBlock = template
        ? `\nREPORT TEMPLATE CONTEXT:
Report Type: ${template.displayName}
Boilerplate Introduction (use this as the opening for the Assignment and Purpose section):
"${template.boilerplateIntro}"

${template.aiPromptAdditions}`
        : "";

      const sectionsList = template
        ? template.requiredSections
            .map((s, i) => `${i + 1}. **${s}**`)
            .join("\n")
        : `1. **Assignment and Purpose** - State the purpose and scope covering all ${treeCount} trees
2. **Tree Inventory** - Markdown table with all trees: Tree #, Common Name, Scientific Name, DBH, Height, Canopy Spread, Condition, Protected, Recommended Action
3. **Site Observations** - Describe the site context and assessment methodology
4. **Individual Tree Assessments** - A subsection per tree with condition rating, health notes, and structural notes
5. **Protected Status Summary** - How many of the ${treeCount} trees are protected, with code references for each
6. **Recommendations** - Per-tree recommended action summary
7. **Mitigation Requirements** - Required mitigation per the city ordinance for any protected trees being removed
8. **Arborist Certification Statement** - Standard ISA certification language`;

      const systemPrompt = `You are an expert ISA Certified Arborist preparing a professional ${reportTypeLabel} report for a property with ${treeCount} tree${treeCount !== 1 ? "s" : ""}. Follow ISA report formatting standards and best practices for arborist reports filed with California municipalities.
${boilerplateBlock}

MUNICIPAL ORDINANCE CONTEXT:
${
  ordinance
    ? `City: ${ordinance.cityName}, ${ordinance.state}
Code Reference: ${ordinance.codeReference || "N/A"}
Protected Species Rules: ${JSON.stringify(ordinance.protectedSpecies)}
Default Native DBH Threshold: ${ordinance.defaultDbhThresholdNative || "N/A"} inches
Default Non-Native DBH Threshold: ${ordinance.defaultDbhThresholdNonnative || "N/A"} inches
Mitigation Rules: ${JSON.stringify(ordinance.mitigationRules)}
Heritage Tree Rules: ${JSON.stringify(ordinance.heritageTreeRules)}
Certifier Requirement: ${ordinance.certifierRequirement || "N/A"}
Permit Process Notes: ${ordinance.permitProcessNotes || "N/A"}`
    : `No specific ordinance data available for ${property.city}. Use general California arborist reporting standards.`
}

PROPERTY DATA:
- Address: ${property.address}
- City: ${property.city}, ${property.state || "CA"}
- County: ${property.county || "N/A"}
- Parcel Number: ${property.parcelNumber || "N/A"}
- Report Type: ${reportTypeLabel}
- Total Trees: ${treeCount}
- Scope of Assignment: ${property.scopeOfAssignment || "N/A"}
- Site Observations: ${property.siteObservations || "N/A"}${
  body.reportType === "construction_encroachment"
    ? `\n- Project Description: ${property.projectDescription || "N/A"}\n- Permit Number: ${property.permitNumber || "N/A"}\n- Developer/Contractor: ${property.developerName || "N/A"}\n- Architect: ${property.architectName || "N/A"}`
    : ""
}

TREE ASSESSMENT DATA:
${treeDataBlock}
${propertyAudioBlock}

Generate a comprehensive, professional arborist report in markdown format with the following sections:

${sectionsList}

When trees have field audio notes (transcribed arborist voice recordings), incorporate these observations naturally into the Individual Tree Assessments section. Reference them as "Per field observations..." or "The arborist noted during field inspection that..." Do not mention that they came from audio recordings.

When property-level field notes are provided, weave them into the Site Observations and/or Executive Summary sections. Reference them as "Site conditions noted during the field inspection include..." Do not mention they came from audio recordings.

When trees have photos on file, reference them in the individual assessments as "See Photo 1", "See Photo 2", etc. to support observations.

When a Scope of Assignment is provided, use it to write the "Scope of Assignment" section describing the purpose, limitations, and scope of the assessment. When Site Observations are provided, weave them into the Site Observations section along with any additional observations from the tree data.

Use professional arborist terminology. Reference specific municipal code sections where applicable. The report should be thorough and suitable for submission to the City of ${property.city}.`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: `Please generate the complete ${reportTypeLabel} report for the ${treeCount}-tree property based on the assessment data and ordinance context provided in your instructions.`,
          },
        ],
        system: systemPrompt,
      });

      const textBlock = message.content.find((block) => block.type === "text");
      aiDraftContent = textBlock?.text || "Error: No text content generated.";
    } else {
      aiDraftContent = generateMockReport(property, property.trees, body.reportType);
    }

    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId,
        reportType: body.reportType,
        aiDraftContent,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}

```

### app/api/arborist/logo/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  getArboristUploadDir,
  getArboristServingUrl,
  generateFilename,
} from "@/lib/uploads";

// POST /api/arborist/logo — upload a company logo
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("logo") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No logo file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: JPG, PNG, WebP, SVG`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10 MB)" },
        { status: 400 }
      );
    }

    // Delete existing logo file if present
    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    // Save new logo
    const filename = generateFilename(file.name);
    const uploadDir = getArboristUploadDir(arborist.id);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoUrl = getArboristServingUrl(arborist.id, filename);

    // Update arborist record
    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: logoUrl },
    });

    return NextResponse.json({
      companyLogoUrl: updated.companyLogoUrl,
    });
  } catch (error) {
    console.error("Error uploading logo:", error);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }
}

// DELETE /api/arborist/logo — remove the company logo
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting logo:", error);
    return NextResponse.json(
      { error: "Failed to delete logo" },
      { status: 500 }
    );
  }
}

```

### app/api/arborist/onboard/route.ts
```ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Profile already exists" },
      { status: 409 }
    );
  }

  const body = await request.json();

  if (!body.name || !body.isaCertificationNum || !body.isaExpirationDate) {
    return NextResponse.json(
      { error: "Missing required fields: name, isaCertificationNum, isaExpirationDate" },
      { status: 400 }
    );
  }

  const arborist = await prisma.arborist.create({
    data: {
      clerkUserId: userId,
      name: body.name,
      email: body.email || "",
      isaCertificationNum: body.isaCertificationNum,
      isaExpirationDate: new Date(body.isaExpirationDate),
      companyName: body.companyName || null,
      phone: body.phone || null,
    },
  });

  return NextResponse.json(arborist, { status: 201 });
}

```

### app/api/arborist/profile/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// GET /api/arborist/profile — fetch the current arborist profile
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }
    return NextResponse.json(arborist);
  } catch (error) {
    console.error("Error fetching arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

// PUT /api/arborist/profile — update arborist profile fields
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Whitelist of updatable fields
    const allowedFields = [
      "name",
      "email",
      "isaCertificationNum",
      "companyName",
      "phone",
      "companyAddress",
      "companyPhone",
      "companyEmail",
      "companyWebsite",
      "licenseNumbers",
      "signatureName",
    ];

    const updateData: Record<string, string | null> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field] ?? null;
      }
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

```

### app/api/geocode/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";

interface MapboxFeature {
  place_name: string;
  center: [number, number]; // [lng, lat]
}

interface MapboxResponse {
  features: MapboxFeature[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.address) {
      return NextResponse.json(
        { error: "Missing required field: address" },
        { status: 400 }
      );
    }

    // Construct full address string
    const parts = [body.address];
    if (body.city) parts.push(body.city);
    if (body.state) parts.push(body.state);
    const fullAddress = parts.join(", ");

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      return NextResponse.json(
        { error: "Mapbox token not configured" },
        { status: 500 }
      );
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${mapboxToken}&limit=1`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Mapbox API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Geocoding service error" },
        { status: 502 }
      );
    }

    const data: MapboxResponse = await response.json();

    if (!data.features || data.features.length === 0) {
      return NextResponse.json(
        { error: "No results found for the given address" },
        { status: 404 }
      );
    }

    const feature = data.features[0];
    // Mapbox returns center as [lng, lat]
    const [lng, lat] = feature.center;

    return NextResponse.json({
      lat,
      lng,
      formattedAddress: feature.place_name,
    });
  } catch (error) {
    console.error("Error geocoding address:", error);
    return NextResponse.json(
      { error: "Failed to geocode address" },
      { status: 500 }
    );
  }
}

```

### app/api/ordinances/check/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import { checkTreeProtection } from "@/lib/ordinances";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const species = searchParams.get("species");
    const dbh = searchParams.get("dbh");

    if (!city || !species || !dbh) {
      return NextResponse.json(
        { error: "Missing required query parameters: city, species, dbh" },
        { status: 400 }
      );
    }

    const dbhNum = parseFloat(dbh);
    if (isNaN(dbhNum)) {
      return NextResponse.json(
        { error: "dbh must be a valid number" },
        { status: 400 }
      );
    }

    const result = await checkTreeProtection(city, species, dbhNum);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking tree protection:", error);
    return NextResponse.json(
      { error: "Failed to check tree protection" },
      { status: 500 }
    );
  }
}

```

### app/api/ordinances/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ordinances = await prisma.municipalOrdinance.findMany({
      orderBy: { cityName: "asc" },
    });

    const parsed = ordinances.map((ord) => ({
      ...ord,
      protectedSpecies: JSON.parse(ord.protectedSpecies),
      mitigationRules: JSON.parse(ord.mitigationRules),
      heritageTreeRules: JSON.parse(ord.heritageTreeRules),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching ordinances:", error);
    return NextResponse.json(
      { error: "Failed to fetch ordinances" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/audio/[audioId]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getPropertyUploadDir } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error fetching property audio note:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    const audioNote = await prisma.propertyAudioNote.update({
      where: { id: params.audioId },
      data: {
        ...(body.cleanedTranscription !== undefined && {
          cleanedTranscription: body.cleanedTranscription,
        }),
      },
    });

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error updating property audio note:", error);
    return NextResponse.json(
      { error: "Failed to update audio note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const { id: propertyId, audioId } = params;

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Delete file from disk
    const filePath = path.join(
      getPropertyUploadDir(propertyId, "audio"),
      existing.filename
    );
    try {
      fs.unlinkSync(filePath);
    } catch {
      // ignore
    }

    // Delete database record
    await prisma.propertyAudioNote.delete({ where: { id: audioId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property audio note:", error);
    return NextResponse.json(
      { error: "Failed to delete audio note" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/audio/[audioId]/transcribe/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  const { id: propertyId, audioId } = params;

  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Resolve audio file path
    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const audioFilePath = path.join(
      uploadsRoot,
      "properties",
      propertyId,
      "audio",
      audioNote.filename
    );

    if (!fs.existsSync(audioFilePath)) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage: "Audio file not found on disk",
        },
      });
      return NextResponse.json(
        { error: "Audio file not found on disk" },
        { status: 404 }
      );
    }

    // ---- Step 1: Whisper transcription ----
    let rawTranscription: string;

    if (process.env.OPENAI_API_KEY) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: { status: "transcribing" },
      });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const fileStream = fs.createReadStream(audioFilePath);
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "en",
        response_format: "text",
      });

      rawTranscription =
        typeof transcription === "string"
          ? transcription
          : String(transcription);
    } else {
      // No OpenAI key — mark as ready with placeholder
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "ready",
          rawTranscription: "(No OPENAI_API_KEY configured)",
          cleanedTranscription:
            "(Transcription unavailable — set OPENAI_API_KEY in .env to enable Whisper transcription)",
        },
      });
      return NextResponse.json({ status: "ready", message: "No API key" });
    }

    // Save raw transcription
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        rawTranscription,
        status: "cleaning",
      },
    });

    // ---- Step 2: Claude cleanup ----
    let cleanedTranscription: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `You are cleaning up a voice note from an ISA-certified arborist recording site-level observations at a property. The raw transcription may contain filler words, false starts, repetition, and casual speech.

Clean it up into clear, professional site observation notes that could be included in the executive summary or site observations section of a certified arborist report. Preserve all technical details about the site, soil conditions, access, structures, utilities, slopes, drainage, neighboring properties, and general landscape context. Organize into logical paragraphs if the note covers multiple topics. Do not add information that wasn't in the original. Just clean and structure what's there.

Return ONLY the cleaned text with no preamble or explanation.`,
        messages: [
          {
            role: "user",
            content: `Raw transcription:\n\n${rawTranscription}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      cleanedTranscription = textBlock?.text || rawTranscription;
    } else {
      cleanedTranscription = rawTranscription;
    }

    // Save cleaned transcription and mark as ready
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        cleanedTranscription,
        status: "ready",
      },
    });

    return NextResponse.json({ status: "ready" });
  } catch (error) {
    console.error("Property transcription pipeline error:", error);

    try {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage:
            error instanceof Error
              ? error.message
              : "Unknown transcription error",
        },
      });
    } catch {
      // Ignore
    }

    return NextResponse.json(
      { error: "Transcription pipeline failed" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/audio/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getPropertyUploadDir,
  generateFilename,
  getPropertyServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const audioNotes = await prisma.propertyAudioNote.findMany({
      where: { propertyId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching property audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const durationStr = formData.get("durationSeconds") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate type
    const baseType = file.type.split(";")[0].trim();
    if (
      !ALLOWED_AUDIO_TYPES.has(baseType) &&
      !ALLOWED_AUDIO_TYPES.has(file.type)
    ) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    const extMap: Record<string, string> = {
      "audio/webm": ".webm",
      "audio/mp4": ".m4a",
      "audio/wav": ".wav",
      "audio/ogg": ".ogg",
      "audio/mpeg": ".mp3",
    };
    const ext = extMap[baseType] || ".webm";
    const originalName = file.name || `recording${ext}`;

    const filename = generateFilename(originalName);
    const uploadDir = getPropertyUploadDir(propertyId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getPropertyServingUrl(propertyId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.propertyAudioNote.create({
      data: {
        propertyId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading property audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
        },
        reports: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...(body.address !== undefined && { address: body.address }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.zip !== undefined && { zip: body.zip }),
        ...(body.county !== undefined && { county: body.county }),
        ...(body.parcelNumber !== undefined && { parcelNumber: body.parcelNumber }),
        ...(body.lat !== undefined && { lat: body.lat }),
        ...(body.lng !== undefined && { lng: body.lng }),
        ...(body.lotSizeSqft !== undefined && { lotSizeSqft: body.lotSizeSqft }),
        ...(body.homeownerName !== undefined && { homeownerName: body.homeownerName }),
        ...(body.homeownerEmail !== undefined && { homeownerEmail: body.homeownerEmail }),
        ...(body.homeownerPhone !== undefined && { homeownerPhone: body.homeownerPhone }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.reportType !== undefined && { reportType: body.reportType }),
        ...(body.projectDescription !== undefined && { projectDescription: body.projectDescription }),
        ...(body.permitNumber !== undefined && { permitNumber: body.permitNumber }),
        ...(body.developerName !== undefined && { developerName: body.developerName }),
        ...(body.architectName !== undefined && { architectName: body.architectName }),
        ...(body.siteObservations !== undefined && { siteObservations: body.siteObservations }),
        ...(body.scopeOfAssignment !== undefined && { scopeOfAssignment: body.scopeOfAssignment }),
      },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
        },
        reports: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/audio/[audioId]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const audioNote = await prisma.treeAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error fetching audio note:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.treeAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    const audioNote = await prisma.treeAudioNote.update({
      where: { id: params.audioId },
      data: {
        ...(body.cleanedTranscription !== undefined && {
          cleanedTranscription: body.cleanedTranscription,
        }),
      },
    });

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error updating audio note:", error);
    return NextResponse.json(
      { error: "Failed to update audio note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const { treeId, audioId } = params;

    const existing = await prisma.treeAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Delete file from disk
    deleteFile(treeId, "audio", existing.filename);

    // Delete database record
    await prisma.treeAudioNote.delete({ where: { id: audioId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting audio note:", error);
    return NextResponse.json(
      { error: "Failed to delete audio note" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/audio/[audioId]/transcribe/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  const { audioId } = params;

  try {
    const audioNote = await prisma.treeAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Resolve audio file path
    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const audioFilePath = path.join(
      uploadsRoot,
      "trees",
      params.treeId,
      "audio",
      audioNote.filename
    );

    if (!fs.existsSync(audioFilePath)) {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: { status: "error", errorMessage: "Audio file not found on disk" },
      });
      return NextResponse.json(
        { error: "Audio file not found on disk" },
        { status: 404 }
      );
    }

    // ---- Step 1: Whisper transcription ----
    let rawTranscription: string;

    if (process.env.OPENAI_API_KEY) {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: { status: "transcribing" },
      });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const fileStream = fs.createReadStream(audioFilePath);
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "en",
        response_format: "text",
      });

      rawTranscription = typeof transcription === "string"
        ? transcription
        : String(transcription);
    } else {
      // No OpenAI key — mark as ready with placeholder
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: {
          status: "ready",
          rawTranscription: "(No OPENAI_API_KEY configured)",
          cleanedTranscription:
            "(Transcription unavailable — set OPENAI_API_KEY in .env to enable Whisper transcription)",
        },
      });
      return NextResponse.json({ status: "ready", message: "No API key" });
    }

    // Save raw transcription
    await prisma.treeAudioNote.update({
      where: { id: audioId },
      data: {
        rawTranscription,
        status: "cleaning",
      },
    });

    // ---- Step 2: Claude cleanup ----
    let cleanedTranscription: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `You are cleaning up a voice note from an ISA-certified arborist inspecting a tree. The raw transcription may contain filler words, false starts, repetition, and casual speech.

Clean it up into clear, professional field notes that could be included in a certified arborist report. Preserve all technical details (species, measurements, conditions, recommendations). Organize into logical paragraphs if the note covers multiple topics. Do not add information that wasn't in the original. Just clean and structure what's there.

Return ONLY the cleaned text with no preamble or explanation.`,
        messages: [
          {
            role: "user",
            content: `Raw transcription:\n\n${rawTranscription}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      cleanedTranscription = textBlock?.text || rawTranscription;
    } else {
      // No Anthropic key — use raw transcription as cleaned
      cleanedTranscription = rawTranscription;
    }

    // Save cleaned transcription and mark as ready
    await prisma.treeAudioNote.update({
      where: { id: audioId },
      data: {
        cleanedTranscription,
        status: "ready",
      },
    });

    return NextResponse.json({ status: "ready" });
  } catch (error) {
    console.error("Transcription pipeline error:", error);

    // Mark as error
    try {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage:
            error instanceof Error ? error.message : "Unknown transcription error",
        },
      });
    } catch {
      // Ignore if the update fails too
    }

    return NextResponse.json(
      { error: "Transcription pipeline failed" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/audio/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const audioNotes = await prisma.treeAudioNote.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id: propertyId, treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const durationStr = formData.get("durationSeconds") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate type — check base type (ignore codec params)
    const baseType = file.type.split(";")[0].trim();
    if (!ALLOWED_AUDIO_TYPES.has(baseType) && !ALLOWED_AUDIO_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    // Determine file extension from type
    const extMap: Record<string, string> = {
      "audio/webm": ".webm",
      "audio/mp4": ".m4a",
      "audio/wav": ".wav",
      "audio/ogg": ".ogg",
      "audio/mpeg": ".mp3",
    };
    const ext = extMap[baseType] || ".webm";
    const originalName = file.name || `recording${ext}`;

    const filename = generateFilename(originalName);
    const uploadDir = getUploadDir(treeId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getServingUrl(treeId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.treeAudioNote.create({
      data: {
        treeRecordId: treeId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/trees/${treeId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/photos/[photoId]/annotate/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUploadDir, getServingUrl, generateFilename, deleteFile } from "@/lib/uploads";
import fs from "fs";
import path from "path";

/**
 * POST — Save an annotated version of a photo.
 * Stores the annotated image alongside the original, updates the TreePhoto
 * record so the annotated version becomes the primary (url/filename) and
 * the original is preserved in originalUrl/originalFilename.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // Generate filename for annotated version
    const annotatedFilename = generateFilename(`annotated_${photo.filename.replace(/\.[^.]+$/, "")}.png`);
    const uploadDir = getUploadDir(treeId, "photos");
    const filePath = path.join(uploadDir, annotatedFilename);

    // Write annotated image to disk
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const annotatedUrl = getServingUrl(treeId, "photos", annotatedFilename);

    // If already annotated, delete the previous annotated file (but keep original)
    if (photo.isAnnotated && photo.filename) {
      try {
        deleteFile(treeId, "photos", photo.filename);
      } catch {
        // Ignore — file may not exist
      }
    }

    // Store original info (only on first annotation)
    const originalFilename = photo.isAnnotated
      ? photo.originalFilename
      : photo.filename;
    const originalUrl = photo.isAnnotated ? photo.originalUrl : photo.url;

    // Update database record
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: annotatedFilename,
        url: annotatedUrl,
        originalFilename: originalFilename,
        originalUrl: originalUrl,
        isAnnotated: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error saving annotation:", error);
    return NextResponse.json(
      { error: "Failed to save annotation" },
      { status: 500 }
    );
  }
}

/**
 * DELETE — Revert to the original photo (remove annotation).
 * Deletes the annotated file and restores the original url/filename.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (!photo.isAnnotated || !photo.originalFilename || !photo.originalUrl) {
      return NextResponse.json(
        { error: "Photo is not annotated" },
        { status: 400 }
      );
    }

    // Delete annotated file from disk
    try {
      deleteFile(treeId, "photos", photo.filename);
    } catch {
      // Ignore
    }

    // Restore original
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: photo.originalFilename,
        url: photo.originalUrl,
        originalFilename: null,
        originalUrl: null,
        isAnnotated: false,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error reverting annotation:", error);
    return NextResponse.json(
      { error: "Failed to revert annotation" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/photos/[photoId]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/uploads";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { photoId } = params;
    const body = await request.json();

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photo = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        ...(body.caption !== undefined && { caption: body.caption }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete file from disk
    deleteFile(treeId, "photos", existing.filename);

    // Delete database record
    await prisma.treePhoto.delete({ where: { id: photoId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/photos/reorder/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Batch-update sort orders in a transaction
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.treePhoto.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error reordering photos:", error);
    return NextResponse.json(
      { error: "Failed to reorder photos" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/photos/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const captionsRaw = formData.get("captions") as string | null;
    const captions: string[] = captionsRaw ? JSON.parse(captionsRaw) : [];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Get current max sort order
    const maxSort = await prisma.treePhoto.aggregate({
      where: { treeRecordId: treeId },
      _max: { sortOrder: true },
    });
    let nextSortOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const uploadDir = getUploadDir(treeId, "photos");
    const created = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate type
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        continue; // skip unsupported files
      }

      // Validate size
      if (file.size > MAX_IMAGE_SIZE) {
        continue; // skip oversized files
      }

      const filename = generateFilename(file.name);
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      const url = getServingUrl(treeId, "photos", filename);
      const caption = captions[i] || null;

      const photo = await prisma.treePhoto.create({
        data: {
          treeRecordId: treeId,
          filename,
          url,
          caption,
          sortOrder: nextSortOrder++,
        },
      });

      created.push(photo);
    }

    // Return all photos for the tree
    const allPhotos = await prisma.treePhoto.findMany({
      where: { treeRecordId: treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(allPhotos, { status: 201 });
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json(
      { error: "Failed to upload photos" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/[treeId]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const tree = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!tree) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching tree:", error);
    return NextResponse.json(
      { error: "Failed to fetch tree" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;
    const body = await request.json();

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    const tree = await prisma.treeRecord.update({
      where: { id: treeId },
      data: {
        ...(body.pinLat !== undefined && { pinLat: body.pinLat }),
        ...(body.pinLng !== undefined && { pinLng: body.pinLng }),
        ...(body.speciesCommon !== undefined && { speciesCommon: body.speciesCommon }),
        ...(body.speciesScientific !== undefined && { speciesScientific: body.speciesScientific }),
        ...(body.dbhInches !== undefined && { dbhInches: body.dbhInches }),
        ...(body.heightFt !== undefined && { heightFt: body.heightFt }),
        ...(body.canopySpreadFt !== undefined && { canopySpreadFt: body.canopySpreadFt }),
        ...(body.conditionRating !== undefined && { conditionRating: body.conditionRating }),
        ...(body.healthNotes !== undefined && { healthNotes: body.healthNotes }),
        ...(body.structuralNotes !== undefined && { structuralNotes: body.structuralNotes }),
        ...(body.isProtected !== undefined && { isProtected: body.isProtected }),
        ...(body.protectionReason !== undefined && { protectionReason: body.protectionReason }),
        ...(body.recommendedAction !== undefined && { recommendedAction: body.recommendedAction }),
        ...(body.mitigationRequired !== undefined && { mitigationRequired: body.mitigationRequired }),
        ...(body.photos !== undefined && { photos: body.photos }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.tagNumber !== undefined && { tagNumber: body.tagNumber }),
        ...(body.typeSpecificData !== undefined && { typeSpecificData: body.typeSpecificData }),
      },
    });

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error updating tree:", error);
    return NextResponse.json(
      { error: "Failed to update tree" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    await prisma.treeRecord.delete({
      where: { id: treeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tree:", error);
    return NextResponse.json(
      { error: "Failed to delete tree" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/[id]/trees/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const trees = await prisma.treeRecord.findMany({
      where: { propertyId: id },
      orderBy: { treeNumber: "asc" },
    });

    return NextResponse.json(trees);
  } catch (error) {
    console.error("Error fetching trees:", error);
    return NextResponse.json(
      { error: "Failed to fetch trees" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Auto-calculate treeNumber: max existing + 1, or 1 if none exist
    const maxTree = await prisma.treeRecord.findFirst({
      where: { propertyId: id },
      orderBy: { treeNumber: "desc" },
      select: { treeNumber: true },
    });

    const nextTreeNumber = maxTree ? maxTree.treeNumber + 1 : 1;

    const tree = await prisma.treeRecord.create({
      data: {
        propertyId: id,
        treeNumber: nextTreeNumber,
        pinLat: body.pinLat ?? null,
        pinLng: body.pinLng ?? null,
        speciesCommon: body.speciesCommon ?? "",
        speciesScientific: body.speciesScientific ?? "",
        dbhInches: body.dbhInches ?? 0,
        heightFt: body.heightFt ?? null,
        canopySpreadFt: body.canopySpreadFt ?? null,
        conditionRating: body.conditionRating ?? 0,
        healthNotes: body.healthNotes ?? null,
        structuralNotes: body.structuralNotes ?? null,
        isProtected: body.isProtected ?? false,
        protectionReason: body.protectionReason ?? null,
        recommendedAction: body.recommendedAction ?? "retain",
        mitigationRequired: body.mitigationRequired ?? null,
        tagNumber: body.tagNumber ?? null,
        typeSpecificData: body.typeSpecificData ?? null,
      },
    });

    return NextResponse.json(tree, { status: 201 });
  } catch (error) {
    console.error("Error creating tree:", error);
    return NextResponse.json(
      { error: "Failed to create tree" },
      { status: 500 }
    );
  }
}

```

### app/api/properties/route.ts
```ts
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const properties = await prisma.property.findMany({
      where: { arboristId: arborist.id },
      include: {
        trees: true,
        reports: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    // Add tree count to each property
    const propertiesWithCount = properties.map((property) => ({
      ...property,
      _count: { trees: property.trees.length },
    }));

    return NextResponse.json(propertiesWithCount);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.address || !body.city) {
      return NextResponse.json(
        { error: "Missing required fields: address, city" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        arboristId: arborist.id,
        address: body.address,
        city: body.city,
        county: body.county ?? "San Mateo",
        state: body.state ?? "CA",
        zip: body.zip ?? null,
        parcelNumber: body.parcelNumber ?? null,
        lat: body.lat ?? null,
        lng: body.lng ?? null,
        lotSizeSqft: body.lotSizeSqft ?? null,
        homeownerName: body.homeownerName ?? null,
        homeownerEmail: body.homeownerEmail ?? null,
        homeownerPhone: body.homeownerPhone ?? null,
        reportType: body.reportType ?? "health_assessment",
        projectDescription: body.projectDescription ?? null,
        permitNumber: body.permitNumber ?? null,
        developerName: body.developerName ?? null,
        architectName: body.architectName ?? null,
      },
      include: {
        trees: true,
        reports: true,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

```

### app/api/reports/[id]/certify/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body.eSignatureText) {
      return NextResponse.json(
        { error: "Missing required field: eSignatureText" },
        { status: 400 }
      );
    }

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    const now = new Date();

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: body.eSignatureText,
        certifiedAt: now,
        status: "certified",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "certified" },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error certifying report:", error);
    return NextResponse.json(
      { error: "Failed to certify report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (existing.status !== "certified") {
      return NextResponse.json(
        { error: "Report is not certified" },
        { status: 400 }
      );
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: null,
        certifiedAt: null,
        status: "review",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "assessed" },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error uncertifying report:", error);
    return NextResponse.json(
      { error: "Failed to uncertify report" },
      { status: 500 }
    );
  }
}

```

### app/api/reports/[id]/pdf/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { renderMarkdownToHtml } from "@/lib/markdown";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
              include: {
                treePhotos: { orderBy: { sortOrder: "asc" } },
              },
            },
          },
        },
        arborist: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const content = report.finalContent || report.aiDraftContent || "";
    const property = report.property;
    const trees = property.trees;
    const arborist = report.arborist;
    const isCertified = report.status === "certified";

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    // Render markdown to HTML
    const bodyHtml = renderMarkdownToHtml(content);

    // Build condition labels
    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // Tree inventory rows
    const treeRows = trees
      .map(
        (tree, idx) => `
      <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
        <td class="center">${tree.treeNumber}</td>
        <td>${esc(tree.tagNumber || "\u2014")}</td>
        <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
        <td class="center">${tree.dbhInches}"</td>
        <td class="center">${tree.heightFt ? `${tree.heightFt}'` : "N/A"}</td>
        <td class="center">${tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "N/A"}</td>
        <td class="center">${conditionLabels[tree.conditionRating] ?? tree.conditionRating}</td>
        <td class="center">${tree.isProtected ? "Yes" : "No"}</td>
        <td>${esc(tree.recommendedAction?.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A")}</td>
      </tr>`
      )
      .join("\n");

    // Photo documentation
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    const photoPages = treesWithPhotos
      .map(
        (tree) => `
      <div class="photo-group">
        <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}</h3>
        <div class="photo-grid">
          ${(tree.treePhotos || [])
            .map(
              (photo, i) => `
            <div class="photo-item">
              <img src="${photo.url}" alt="Tree #${tree.treeNumber} photo ${i + 1}" />
              <p class="photo-caption">Photo ${i + 1}${photo.caption ? `: ${esc(photo.caption)}` : ""}</p>
            </div>`
            )
            .join("")}
        </div>
      </div>`
      )
      .join("\n");

    // TRAQ appendix (health assessment only)
    let traqAppendix = "";
    if (report.reportType === "health_assessment") {
      const traqRows = trees
        .map((tree) => {
          let data: Record<string, unknown> = {};
          if (tree.typeSpecificData) {
            try {
              data = JSON.parse(tree.typeSpecificData);
            } catch {
              // skip
            }
          }

          const likelihoodOfFailure = fmtEnum(data.likelihoodOfFailure as string);
          const likelihoodOfImpact = fmtEnum(data.likelihoodOfImpact as string);
          const consequences = fmtEnum(data.consequences as string);
          const overallRisk = fmtEnum(data.overallRiskRating as string);
          const target = (data.targetDescription as string) || "N/A";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          return `
        <div class="traq-tree avoid-break">
          <h3>Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}</h3>
          <table class="traq-table">
            <tr>
              <td class="label-cell">Species</td>
              <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` (${esc(tree.speciesScientific)})` : ""}</td>
              <td class="label-cell">DBH</td>
              <td>${tree.dbhInches}"</td>
            </tr>
            <tr>
              <td class="label-cell">Height</td>
              <td>${tree.heightFt ? `${tree.heightFt}'` : "N/A"}</td>
              <td class="label-cell">Condition Rating</td>
              <td>${conditionLabels[tree.conditionRating] ?? tree.conditionRating} (${tree.conditionRating}/5)</td>
            </tr>
            <tr>
              <td class="label-cell">Target Description</td>
              <td colspan="3">${esc(target)}</td>
            </tr>
          </table>
          <table class="traq-matrix">
            <thead>
              <tr>
                <th>Assessment Factor</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Likelihood of Failure</td>
                <td class="center">${likelihoodOfFailure}</td>
              </tr>
              <tr>
                <td>Likelihood of Impact</td>
                <td class="center">${likelihoodOfImpact}</td>
              </tr>
              <tr>
                <td>Consequences of Failure</td>
                <td class="center">${consequences}</td>
              </tr>
              <tr class="risk-row">
                <td><strong>Overall Risk Rating</strong></td>
                <td class="center"><strong>${overallRisk}</strong></td>
              </tr>
            </tbody>
          </table>
          <p class="maintenance-line"><strong>Recommended Maintenance:</strong> ${esc(maintenance)}</p>
        </div>`;
        })
        .join("\n");

      traqAppendix = `
      <div class="page-break"></div>
      <h2 class="section-title">Appendix: TRAQ Risk Assessment Forms</h2>
      <p class="appendix-subtitle">ISA Tree Risk Assessment Qualification (TRAQ) \u2014 Level 2 Basic Assessment</p>
      ${traqRows}`;
    }

    // Build the full HTML document
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Arborist Report \u2014 ${esc(property.address)}, ${esc(property.city)}</title>
  <style>
    /* ---- Base ---- */
    @page {
      size: letter;
      margin: 0.75in 1in;
    }
    @media print {
      body { margin: 0; padding: 0; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    @media screen {
      body { max-width: 8.5in; margin: 0 auto; padding: 0.5in 1in; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #1a1a1a;
      font-size: 10.5pt;
      line-height: 1.55;
    }

    /* ---- Draft watermark ---- */
    ${
      !isCertified
        ? `
    body::after {
      content: "DRAFT";
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 120pt;
      font-weight: bold;
      color: rgba(200, 200, 200, 0.15);
      letter-spacing: 20px;
      pointer-events: none;
      z-index: 0;
    }`
        : ""
    }

    /* ---- Toolbar ---- */
    .no-print {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 10px 16px;
      background: #1a1a1a;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      font-size: 13px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .no-print button, .no-print a {
      background: white;
      color: #1a1a1a;
      border: none;
      padding: 6px 20px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
      font-weight: 600;
      text-decoration: none;
      font-family: system-ui, sans-serif;
    }
    .no-print button:hover, .no-print a:hover { background: #e5e5e5; }

    /* ==== COVER PAGE ==== */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 9in;
      text-align: center;
    }
    .cover-logo { max-height: 80px; width: auto; margin-bottom: 24px; }
    .cover-company {
      font-size: 14pt;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
    }
    .cover-contact { font-size: 9pt; color: #666; margin-bottom: 40px; }
    .cover-rule {
      width: 200px;
      border: none;
      border-top: 2px solid #333;
      margin: 0 auto 40px auto;
    }
    .cover-title {
      font-size: 28pt;
      font-weight: bold;
      color: #1a1a1a;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin: 0 0 8px 0;
    }
    .cover-subtitle {
      font-size: 14pt;
      color: #333;
      font-weight: normal;
      margin: 0 0 8px 0;
    }
    .cover-type {
      font-size: 11pt;
      color: #555;
      border: 1px solid #999;
      display: inline-block;
      padding: 4px 16px;
      margin: 16px 0 40px 0;
    }
    .cover-meta {
      font-size: 10pt;
      color: #555;
      line-height: 1.8;
    }
    .cover-meta strong { color: #333; }
    ${!isCertified ? '.cover-draft { font-size: 16pt; color: #999; letter-spacing: 4px; margin-top: 20px; border: 2px solid #ccc; padding: 6px 30px; display: inline-block; }' : ''}

    /* ==== REPORT BODY ==== */
    .section-title {
      font-size: 14pt;
      color: #1a1a1a;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 24px 0 8px 0;
      border-bottom: 1px solid #333;
      padding-bottom: 3px;
    }
    .report-body h1 {
      font-size: 14pt;
      color: #1a1a1a;
      border-bottom: 1px solid #999;
      padding-bottom: 3px;
      margin: 24px 0 10px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .report-body h2 {
      font-size: 12pt;
      color: #1a1a1a;
      margin: 18px 0 8px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .report-body h3 {
      font-size: 10.5pt;
      color: #333;
      margin: 14px 0 6px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .report-body p { margin: 6px 0; }
    .report-body ul, .report-body ol { margin: 6px 0; padding-left: 24px; }
    .report-body li { margin: 3px 0; }
    .report-body hr { border: none; border-top: 1px solid #ccc; margin: 16px 0; }
    .report-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9pt;
    }
    .report-body table th {
      background: #333;
      color: white;
      padding: 4px 8px;
      text-align: left;
      font-weight: bold;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8.5pt;
    }
    .report-body table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .report-body table tr:nth-child(even) { background: #f7f7f7; }

    /* ---- Tree Inventory Table ---- */
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    .inventory-table th {
      background: #333;
      color: white;
      padding: 5px 6px;
      text-align: left;
      font-weight: bold;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 8pt;
    }
    .inventory-table td {
      padding: 4px 6px;
      border: 1px solid #ddd;
    }
    .inventory-table tr.alt { background: #f7f7f7; }
    .inventory-table td.center,
    .inventory-table th.center { text-align: center; }

    /* ---- Meta table ---- */
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9.5pt;
    }
    .meta-table td {
      padding: 5px 10px;
      border: 1px solid #ddd;
    }
    .meta-table .label-cell {
      background: #f0f0f0;
      font-weight: bold;
      width: 22%;
      color: #333;
    }

    /* ---- Photo Documentation ---- */
    .photo-group { margin-bottom: 20px; page-break-inside: avoid; }
    .photo-group h3 {
      font-size: 11pt;
      color: #333;
      margin: 0 0 8px 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .photo-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .photo-item { text-align: center; }
    .photo-item img {
      max-width: 220px;
      max-height: 180px;
      border: 1px solid #ddd;
    }
    .photo-caption {
      font-size: 8pt;
      color: #666;
      margin-top: 3px;
    }

    /* ---- TRAQ Appendix ---- */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 20px 0;
    }
    .traq-tree {
      margin-bottom: 24px;
      border: 1px solid #ccc;
      padding: 12px;
    }
    .traq-tree h3 {
      margin: 0 0 8px 0;
      font-size: 11pt;
      color: #1a1a1a;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .traq-table {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 8px 0;
      font-size: 9pt;
    }
    .traq-table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .traq-table .label-cell {
      background: #f0f0f0;
      font-weight: bold;
      width: 20%;
    }
    .traq-matrix {
      width: 100%;
      border-collapse: collapse;
      margin: 0 0 8px 0;
      font-size: 9pt;
    }
    .traq-matrix th {
      background: #555;
      color: white;
      padding: 4px 8px;
      text-align: left;
      font-weight: bold;
      font-size: 8.5pt;
    }
    .traq-matrix td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .traq-matrix .risk-row { background: #f0f0f0; }
    .traq-matrix td.center { text-align: center; }
    .maintenance-line {
      font-size: 9pt;
      margin: 4px 0 0 0;
    }
    .avoid-break { page-break-inside: avoid; }

    /* ---- Certification Page ---- */
    .cert-page {
      page-break-before: always;
      padding-top: 40px;
    }
    .cert-box {
      border: 2px solid #333;
      padding: 24px;
      margin: 20px 0;
    }
    .cert-box h2 {
      margin: 0 0 16px 0;
      font-size: 14pt;
      color: #1a1a1a;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .cert-box p { margin: 4px 0; font-size: 10pt; }
    .cert-signature {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #ccc;
    }
    .cert-signature p { margin: 3px 0; font-size: 10pt; }
    .signature-line {
      border-bottom: 1px solid #333;
      display: inline-block;
      min-width: 280px;
      padding-bottom: 2px;
      font-style: italic;
    }

    /* ---- Footer ---- */
    .page-footer {
      text-align: center;
      font-size: 8pt;
      color: #999;
      margin-top: 40px;
      padding-top: 8px;
      border-top: 1px solid #eee;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  </style>
</head>
<body>
  <!-- Toolbar -->
  <div class="no-print">
    <span>Arborist Report${!isCertified ? " (DRAFT)" : ""}</span>
    <button onclick="window.print()">Print / Save as PDF</button>
    <a href="/properties/${property.id}/report">&larr; Back to Report</a>
  </div>

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    ${
      arborist.companyLogoUrl
        ? `<img src="${arborist.companyLogoUrl}" alt="Company Logo" class="cover-logo" />`
        : ""
    }
    ${arborist.companyName ? `<div class="cover-company">${esc(arborist.companyName)}</div>` : ""}
    <div class="cover-contact">
      ${[arborist.companyAddress, arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).map((s) => esc(s!)).join(" &bull; ")}
    </div>

    <hr class="cover-rule" />

    <div class="cover-title">Arborist Report</div>
    <div class="cover-subtitle">${esc(property.address)}</div>
    <div class="cover-subtitle" style="font-size: 11pt; color: #666;">
      ${esc(property.city)}, ${esc(property.state || "CA")}${property.county ? ` \u2014 ${esc(property.county)} County` : ""}
    </div>

    <div class="cover-type">${esc(reportTypeLabel)}</div>

    <div class="cover-meta">
      <strong>Prepared by:</strong> ${esc(arborist.name)}, ISA #${esc(arborist.isaCertificationNum)}<br />
      <strong>Date:</strong> ${dateStr}<br />
      <strong>Property APN:</strong> ${esc(property.parcelNumber || "N/A")}<br />
      <strong>Trees Assessed:</strong> ${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}
    </div>

    ${!isCertified ? '<div class="cover-draft">DRAFT</div>' : ""}
  </div>

  <!-- ========== TREE INVENTORY TABLE ========== -->
  <div class="page-break"></div>
  <h2 class="section-title">Tree Inventory</h2>
  <table class="inventory-table">
    <thead>
      <tr>
        <th class="center" style="width:5%">Tree&nbsp;#</th>
        <th style="width:5%">Tag</th>
        <th>Species</th>
        <th class="center" style="width:6%">DBH</th>
        <th class="center" style="width:6%">Height</th>
        <th class="center" style="width:7%">Canopy</th>
        <th class="center" style="width:9%">Condition</th>
        <th class="center" style="width:8%">Protected</th>
        <th style="width:9%">Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
    </tbody>
  </table>
  <p style="font-size:8pt; color:#999; margin-top:4px;">
    Condition Scale: 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent
  </p>

  <!-- ========== REPORT BODY ========== -->
  <div class="page-break"></div>
  <div class="report-body">
    ${bodyHtml}
  </div>

  <!-- ========== PHOTO DOCUMENTATION ========== -->
  ${
    treesWithPhotos.length > 0
      ? `
  <div class="page-break"></div>
  <h2 class="section-title">Photo Documentation</h2>
  ${photoPages}`
      : ""
  }

  <!-- ========== TRAQ APPENDIX ========== -->
  ${traqAppendix}

  <!-- ========== CERTIFICATION PAGE ========== -->
  <div class="cert-page">
    <h2 class="section-title">Arborist Certification</h2>
    <div class="cert-box">
      <h2>Certification Statement</h2>
      <p>
        I, the undersigned, certify that I have personally inspected the tree(s) described in this
        report and that the information contained herein is accurate to the best of my professional
        knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based
        on my professional training, experience, and education.
      </p>
      <p>
        I have no personal interest or bias with respect to the parties involved. The analysis,
        opinions, and conclusions stated herein are my own, and are based on current scientific
        procedures and facts.
      </p>

      <div class="cert-signature">
        ${
          isCertified
            ? `
        <p><strong>Electronically Signed:</strong> <span class="signature-line">${esc(report.eSignatureText || "")}</span></p>
        <p><strong>Name:</strong> ${esc(arborist.name)}</p>
        <p><strong>ISA Certification #:</strong> ${esc(arborist.isaCertificationNum)}</p>
        ${arborist.companyName ? `<p><strong>Company:</strong> ${esc(arborist.companyName)}</p>` : ""}
        <p><strong>Date Certified:</strong> ${
          report.certifiedAt
            ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : dateStr
        }</p>`
            : `
        <p style="color: #999; font-style: italic;">
          This report has not yet been certified. The certification signature will appear here once the arborist certifies the report.
        </p>
        <p style="margin-top: 20px;"><strong>Arborist:</strong> ${esc(arborist.name)}</p>
        <p><strong>ISA Certification #:</strong> ${esc(arborist.isaCertificationNum)}</p>
        ${arborist.companyName ? `<p><strong>Company:</strong> ${esc(arborist.companyName)}</p>` : ""}`
        }
      </div>
    </div>
  </div>

  <div class="page-footer">
    ${esc(arborist.companyName || arborist.name)} &bull; ${esc(property.address)}, ${esc(property.city)} &bull; ${dateStr}
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fmtEnum(value: string | undefined | null): string {
  if (!value) return "N/A";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

```

### app/api/reports/[id]/route.ts
```ts
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        ...(body.finalContent !== undefined && { finalContent: body.finalContent }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.eSignatureText !== undefined && { eSignatureText: body.eSignatureText }),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

```

### app/api/reports/[id]/word/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { markdownToDocxElements } from "@/lib/markdown-to-docx";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  ShadingType,
  BorderStyle,
  ImageRun,
  PageBreak,
} from "docx";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
              include: {
                treePhotos: { orderBy: { sortOrder: "asc" } },
              },
            },
          },
        },
        arborist: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const content = report.finalContent || report.aiDraftContent || "";
    const property = report.property;
    const trees = property.trees;
    const arborist = report.arborist;
    const isCertified = report.status === "certified";

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // ------------------------------------------------------------------
    // COVER PAGE section
    // ------------------------------------------------------------------

    const coverChildren: (Paragraph | Table)[] = [];

    // Logo
    if (arborist.companyLogoUrl) {
      try {
        const urlParts = arborist.companyLogoUrl.replace(/^\/api\/uploads\//, "");
        const logoPath = path.join(process.cwd(), "uploads", urlParts);

        if (fs.existsSync(logoPath)) {
          const logoData = fs.readFileSync(logoPath);
          const ext = path.extname(logoPath).toLowerCase();

          if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            coverChildren.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: logoData,
                    transformation: { width: 160, height: 80 },
                    type: ext === ".png" ? "png" : "jpg",
                  }),
                ],
                spacing: { after: 200 },
              })
            );
          }
        }
      } catch {
        // Skip logo on error
      }
    }

    // Company name
    if (arborist.companyName) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: arborist.companyName,
              bold: true,
              size: 28,
              color: "333333",
            }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    // Contact info
    const contactParts = [
      arborist.companyAddress,
      arborist.companyPhone,
      arborist.companyEmail,
      arborist.companyWebsite,
    ].filter(Boolean);
    if (contactParts.length > 0) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: contactParts.join(" \u2022 "),
              size: 18,
              color: "666666",
            }),
          ],
          spacing: { after: 600 },
        })
      );
    }

    // Separator
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
        },
        spacing: { after: 600 },
        children: [],
      })
    );

    // Title
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "ARBORIST REPORT",
            bold: true,
            size: 56,
            color: "1a1a1a",
          }),
        ],
        spacing: { after: 120 },
      })
    );

    // Address
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: property.address, size: 28, bold: true }),
        ],
        spacing: { after: 60 },
      })
    );

    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${property.city}, ${property.state || "CA"}${property.county ? ` \u2014 ${property.county} County` : ""}`,
            size: 22,
            color: "666666",
          }),
        ],
        spacing: { after: 200 },
      })
    );

    // Report type
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: reportTypeLabel,
            size: 22,
            color: "555555",
          }),
        ],
        spacing: { after: 600 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
        },
      })
    );

    // Meta info
    const metaLines = [
      `Prepared by: ${arborist.name}, ISA #${arborist.isaCertificationNum}`,
      `Date: ${dateStr}`,
      `Property APN: ${property.parcelNumber || "N/A"}`,
      `Trees Assessed: ${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}`,
    ];

    for (const line of metaLines) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: line, size: 20, color: "555555" })],
          spacing: { after: 40 },
        })
      );
    }

    // Draft label
    if (!isCertified) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "DRAFT",
              bold: true,
              size: 32,
              color: "999999",
            }),
          ],
          spacing: { before: 400 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
          },
        })
      );
    }

    // ------------------------------------------------------------------
    // BODY section children
    // ------------------------------------------------------------------

    const bodyChildren: (Paragraph | Table)[] = [];

    // ---- Tree Inventory Table ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Tree Inventory",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 100, after: 120 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    const inventoryHeaders = [
      "Tree #",
      "Tag",
      "Species",
      "DBH",
      "Height",
      "Canopy",
      "Condition",
      "Protected",
      "Action",
    ];

    const treeHeader = new TableRow({
      tableHeader: true,
      children: inventoryHeaders.map(
        (h) =>
          new TableCell({
            shading: {
              type: ShadingType.SOLID,
              color: "333333",
              fill: "333333",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: h,
                    bold: true,
                    color: "ffffff",
                    size: 16,
                    font: "Helvetica",
                  }),
                ],
              }),
            ],
          })
      ),
    });

    const treeDataRows = trees.map(
      (tree, idx) =>
        new TableRow({
          children: [
            cellParagraph(String(tree.treeNumber), AlignmentType.CENTER),
            cellParagraph(tree.tagNumber || "\u2014"),
            cellParagraph(
              `${tree.speciesCommon}${tree.speciesScientific ? ` (${tree.speciesScientific})` : ""}`
            ),
            cellParagraph(`${tree.dbhInches}"`, AlignmentType.CENTER),
            cellParagraph(
              tree.heightFt ? `${tree.heightFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              conditionLabels[tree.conditionRating] ??
                String(tree.conditionRating),
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.isProtected ? "Yes" : "No",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.recommendedAction
                ?.replace(/_/g, " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A"
            ),
          ].map(
            (para) =>
              new TableCell({
                shading:
                  idx % 2 === 1
                    ? {
                        type: ShadingType.SOLID,
                        color: "f7f7f7",
                        fill: "f7f7f7",
                      }
                    : undefined,
                children: [para],
              })
          ),
        })
    );

    bodyChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [treeHeader, ...treeDataRows],
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Condition Scale: 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent",
            size: 16,
            color: "999999",
            italics: true,
          }),
        ],
        spacing: { before: 40, after: 200 },
      })
    );

    // Page break before report body
    bodyChildren.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    // ---- Report Content (markdown → docx) ----
    const contentElements = markdownToDocxElements(content);
    bodyChildren.push(...contentElements);

    // ---- Photo Documentation ----
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    if (treesWithPhotos.length > 0) {
      bodyChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "Photo Documentation",
              bold: true,
              size: 28,
              color: "1a1a1a",
              font: "Helvetica",
            }),
          ],
          spacing: { before: 400, after: 120 },
          pageBreakBefore: true,
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
          },
        })
      );

      for (const tree of treesWithPhotos) {
        bodyChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: `Tree #${tree.treeNumber} \u2014 ${tree.speciesCommon}`,
                bold: true,
                size: 24,
                color: "333333",
                font: "Helvetica",
              }),
            ],
            spacing: { before: 200, after: 80 },
          })
        );

        for (const photo of tree.treePhotos) {
          try {
            const urlPath = photo.url.replace(/^\/api\/uploads\//, "");
            const photoPath = path.join(process.cwd(), "uploads", urlPath);

            if (fs.existsSync(photoPath)) {
              const photoData = fs.readFileSync(photoPath);
              const ext = path.extname(photoPath).toLowerCase();

              if (
                ext === ".png" ||
                ext === ".jpg" ||
                ext === ".jpeg" ||
                ext === ".webp"
              ) {
                bodyChildren.push(
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: photoData,
                        transformation: { width: 300, height: 200 },
                        type: ext === ".png" ? "png" : "jpg",
                      }),
                    ],
                    spacing: { after: 40 },
                  })
                );

                if (photo.caption) {
                  bodyChildren.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: photo.caption,
                          italics: true,
                          size: 18,
                          color: "666666",
                        }),
                      ],
                      spacing: { after: 120 },
                    })
                  );
                }
              }
            }
          } catch {
            // Skip photo on error
          }
        }
      }
    }

    // ---- Certification Section ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Arborist Certification",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 400, after: 120 },
        pageBreakBefore: true,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I, the undersigned, certify that I have personally inspected the tree(s) described in this report and that the information contained herein is accurate to the best of my professional knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based on my professional training, experience, and education.",
            size: 20,
          }),
        ],
        spacing: { after: 80 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I have no personal interest or bias with respect to the parties involved. The analysis, opinions, and conclusions stated herein are my own, and are based on current scientific procedures and facts.",
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );

    if (isCertified) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Electronically Signed: ",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: report.eSignatureText || "",
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 60 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "cccccc" },
          },
        })
      );
    }

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Name: ", bold: true, size: 20 }),
          new TextRun({ text: arborist.name, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "ISA Certification #: ",
            bold: true,
            size: 20,
          }),
          new TextRun({ text: arborist.isaCertificationNum, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    if (arborist.companyName) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Company: ", bold: true, size: 20 }),
            new TextRun({ text: arborist.companyName, size: 20 }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    if (isCertified && report.certifiedAt) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Date Certified: ", bold: true, size: 20 }),
            new TextRun({
              text: new Date(report.certifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              size: 20,
            }),
          ],
        })
      );
    } else {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "This report has not yet been certified.",
              size: 20,
              color: "999999",
              italics: true,
            }),
          ],
          spacing: { before: 80 },
        })
      );
    }

    // ------------------------------------------------------------------
    // Build the Document with two sections: cover page + body
    // ------------------------------------------------------------------

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "ordered-list",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
              },
            ],
          },
        ],
      },
      styles: {
        default: {
          document: {
            run: {
              font: "Georgia",
              size: 22,
            },
          },
          heading1: {
            run: {
              font: "Helvetica",
              size: 28,
              bold: true,
              color: "1a1a1a",
            },
            paragraph: {
              spacing: { before: 360, after: 120 },
            },
          },
          heading2: {
            run: {
              font: "Helvetica",
              size: 24,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 240, after: 80 },
            },
          },
          heading3: {
            run: {
              font: "Helvetica",
              size: 22,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 200, after: 60 },
            },
          },
        },
      },
      sections: [
        // Cover page section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: coverChildren,
        },
        // Body section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: bodyChildren,
        },
      ],
    });

    // ------------------------------------------------------------------
    // Generate the buffer and return
    // ------------------------------------------------------------------

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    const filename = `Arborist_Report_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;

    return new NextResponse(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Word generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Word document" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helper: create a simple cell paragraph
// ---------------------------------------------------------------------------

function cellParagraph(
  text: string,
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.START
): Paragraph {
  return new Paragraph({
    alignment,
    children: [new TextRun({ text, size: 16 })],
  });
}

```

### app/api/reports/route.ts
```ts
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId: arborist.id,
        reportType: body.reportType,
        aiDraftContent: body.aiDraftContent ?? null,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}

```

### app/api/uploads/[...path]/route.ts
```ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { resolveUploadPath, getMimeType } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path: segments } = params;

    if (!segments || segments.length === 0) {
      return NextResponse.json({ error: "No path specified" }, { status: 400 });
    }

    const relativePath = segments.join("/");
    const absolutePath = resolveUploadPath(relativePath);

    if (!absolutePath) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) {
      return NextResponse.json(
        { error: "Not a file" },
        { status: 400 }
      );
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const mimeType = getMimeType(relativePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving upload:", error);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}

```

### app/globals.css
```css
@import "mapbox-gl/dist/mapbox-gl.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    --background: 40 20% 98%;
    --foreground: 150 10% 15%;
    --card: 0 0% 100%;
    --card-foreground: 150 10% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 150 10% 15%;
    --primary: 152 45% 28%;
    --primary-foreground: 0 0% 98%;
    --secondary: 40 20% 94%;
    --secondary-foreground: 150 10% 15%;
    --muted: 40 15% 95%;
    --muted-foreground: 150 5% 45%;
    --accent: 30 40% 50%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 40 15% 88%;
    --input: 40 15% 88%;
    --ring: 152 45% 28%;
    --chart-1: 152 45% 28%;
    --chart-2: 30 40% 50%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar: 150 20% 18%;
    --sidebar-foreground: 40 20% 92%;
    --sidebar-muted: 150 15% 25%;
    --sidebar-accent: 152 45% 35%;
  }
}

```

### app/layout.tsx
```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TreeCertify — Arborist OS",
  description:
    "AI-assisted report generation for ISA-certified arborists on the SF Peninsula",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

```

### app/onboarding/page.tsx
```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreePine, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    isaCertificationNum: "",
    isaExpirationDate: "",
    companyName: "",
    phone: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.isaCertificationNum || !form.isaExpirationDate) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          isaCertificationNum: form.isaCertificationNum,
          isaExpirationDate: form.isaExpirationDate,
          companyName: form.companyName || null,
          phone: form.phone || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create profile");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 rounded-full bg-emerald-100 p-3 w-fit">
            <TreePine className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to TreeCertify
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Set up your arborist profile to get started
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isaCertificationNum">
                ISA Certification Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="isaCertificationNum"
                value={form.isaCertificationNum}
                onChange={(e) =>
                  setForm({ ...form, isaCertificationNum: e.target.value })
                }
                placeholder="WE-12345A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isaExpirationDate">
                ISA Expiration Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="isaExpirationDate"
                type="date"
                value={form.isaExpirationDate}
                onChange={(e) =>
                  setForm({ ...form, isaExpirationDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                placeholder="Peninsula Tree Care (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(650) 555-1234 (optional)"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                "Create Profile & Continue"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

```

### app/page.tsx
```tsx
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TreePine } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-600 p-3">
            <TreePine className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TreeCertify</h1>
            <p className="text-sm text-gray-500">Arborist OS</p>
          </div>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary:
                "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600",
            },
          }}
        />
      </div>
    </div>
  );
}

```

### components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

### components/condition-rating.tsx
```tsx
"use client";

interface ConditionRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md";
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

function getButtonClasses(rating: number, isSelected: boolean): string {
  if (!isSelected) return "border-muted hover:border-muted-foreground/40";

  switch (rating) {
    case 0:
      return "border-gray-700 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    case 1:
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case 2:
      return "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case 3:
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    case 4:
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case 5:
      return "border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
    default:
      return "border-muted";
  }
}

export function ConditionRating({
  value,
  onChange,
  size = "md",
}: ConditionRatingProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5">
      {[0, 1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg border-2 transition-colors ${
            isSm ? "px-1 py-2 text-xs" : "px-1.5 py-3 text-sm"
          } ${getButtonClasses(rating, value === rating)}`}
          style={{ minHeight: 44 }}
        >
          <span className={`font-bold ${isSm ? "text-sm" : "text-lg"}`}>
            {rating}
          </span>
          <span
            className={`leading-tight font-medium ${
              isSm ? "text-[8px]" : "text-[9px]"
            }`}
          >
            {CONDITION_LABELS[rating]}
          </span>
        </button>
      ))}
    </div>
  );
}

```

### components/photo-markup-editor.tsx
```tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  Circle,
  Type,
  Undo2,
  Redo2,
  Trash2,
  Save,
  X,
  MousePointer2,
  MoveRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToolMode = "select" | "draw" | "arrow" | "circle" | "text";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FabricModule = any;
type FabricCanvas = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface PhotoMarkupEditorProps {
  photoUrl: string;
  photoId: string;
  propertyId: string;
  treeId: string;
  onSave: (annotatedUrl: string) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

const COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#eab308" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
];

const LINE_WIDTHS = [2, 4, 6];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PhotoMarkupEditor({
  photoUrl,
  photoId,
  propertyId,
  treeId,
  onSave,
  onClose,
}: PhotoMarkupEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  // Store the dynamically-imported fabric module so mouse handlers can use it
  const fabricRef = useRef<FabricModule | null>(null);

  const [tool, setTool] = useState<ToolMode>("draw");
  const [color, setColor] = useState("#ef4444");
  const [lineWidth, setLineWidth] = useState(4);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Undo / redo stacks (JSON snapshots)
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Arrow drawing state
  const isDrawingArrow = useRef(false);
  const arrowStart = useRef<{ x: number; y: number } | null>(null);
  const tempArrowLine = useRef<FabricCanvas | null>(null);

  // Circle drawing state
  const isDrawingCircle = useRef(false);
  const circleStart = useRef<{ x: number; y: number } | null>(null);
  const tempCircle = useRef<FabricCanvas | null>(null);

  // Keep current tool/color/lineWidth in refs so event handlers stay up to date
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const lineWidthRef = useRef(lineWidth);
  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { lineWidthRef.current = lineWidth; }, [lineWidth]);

  // ------------------------------------------------------------------
  // Save canvas state snapshot for undo
  // ------------------------------------------------------------------
  const pushUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    undoStack.current.push(JSON.stringify(canvas.toJSON()));
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  // ------------------------------------------------------------------
  // Initialize Fabric canvas + attach mouse handlers (once)
  // ------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const fabricModule = await import("fabric");
      if (cancelled || !canvasRef.current) return;

      fabricRef.current = fabricModule;

      const canvas = new fabricModule.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 900,
        height: 600,
        selection: true,
      });

      fabricCanvasRef.current = canvas;

      // Load background image
      const img = await fabricModule.FabricImage.fromURL(photoUrl, {
        crossOrigin: "anonymous",
      });

      if (cancelled) return;

      // Scale image to fit canvas
      const scaleX = canvas.width! / (img.width || 1);
      const scaleY = canvas.height! / (img.height || 1);
      const scale = Math.min(scaleX, scaleY);

      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: "left",
        originY: "top",
        left: (canvas.width! - (img.width || 1) * scale) / 2,
        top: (canvas.height! - (img.height || 1) * scale) / 2,
      });

      canvas.backgroundImage = img;
      canvas.renderAll();

      // Set up free drawing brush
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = "#ef4444";
        canvas.freeDrawingBrush.width = 4;
      }

      // Save initial state
      undoStack.current = [JSON.stringify(canvas.toJSON())];
      redoStack.current = [];
      setLoaded(true);

      // Listen for freehand path creation
      canvas.on("path:created", () => {
        pushUndo();
      });

      // ---- Mouse handlers for arrow / circle / text tools ----
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:down", (opt: any) => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);
        const t = toolRef.current;
        const c = colorRef.current;
        const lw = lineWidthRef.current;

        if (t === "arrow") {
          isDrawingArrow.current = true;
          arrowStart.current = { x: pointer.x, y: pointer.y };
          const line = new fb.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            { stroke: c, strokeWidth: lw, selectable: false, evented: false }
          );
          canvas.add(line);
          tempArrowLine.current = line;
        }

        if (t === "circle") {
          isDrawingCircle.current = true;
          circleStart.current = { x: pointer.x, y: pointer.y };
          const ellipse = new fb.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: "transparent",
            stroke: c,
            strokeWidth: lw,
            selectable: false,
            evented: false,
          });
          canvas.add(ellipse);
          tempCircle.current = ellipse;
        }

        if (t === "text") {
          const text = new fb.IText("Label", {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: c,
            fontFamily: "Arial",
            fontWeight: "bold",
            editable: true,
            selectable: true,
            evented: true,
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          pushUndo();
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:move", (opt: any) => {
        if (!canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          tempArrowLine.current.set({ x2: pointer.x, y2: pointer.y });
          canvas.renderAll();
        }

        if (isDrawingCircle.current && tempCircle.current && circleStart.current) {
          const rx = Math.abs(pointer.x - circleStart.current.x) / 2;
          const ry = Math.abs(pointer.y - circleStart.current.y) / 2;
          const left = Math.min(pointer.x, circleStart.current.x);
          const top = Math.min(pointer.y, circleStart.current.y);
          tempCircle.current.set({ rx, ry, left, top });
          canvas.renderAll();
        }
      });

      canvas.on("mouse:up", () => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const c = colorRef.current;

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          const line = tempArrowLine.current;
          const x1 = line.x1!;
          const y1 = line.y1!;
          const x2 = line.x2!;
          const y2 = line.y2!;

          const angle = Math.atan2(y2 - y1, x2 - x1);
          const headLen = 15;

          const head = new fb.Polygon(
            [
              { x: x2, y: y2 },
              {
                x: x2 - headLen * Math.cos(angle - Math.PI / 6),
                y: y2 - headLen * Math.sin(angle - Math.PI / 6),
              },
              {
                x: x2 - headLen * Math.cos(angle + Math.PI / 6),
                y: y2 - headLen * Math.sin(angle + Math.PI / 6),
              },
            ],
            { fill: c, stroke: c, strokeWidth: 1, selectable: false, evented: false }
          );

          canvas.add(head);
          pushUndo();

          isDrawingArrow.current = false;
          arrowStart.current = null;
          tempArrowLine.current = null;
        }

        if (isDrawingCircle.current && tempCircle.current) {
          pushUndo();
          isDrawingCircle.current = false;
          circleStart.current = null;
          tempCircle.current = null;
        }
      });
    }

    init();

    return () => {
      cancelled = true;
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUrl]);

  // ------------------------------------------------------------------
  // Update brush when tool/color/lineWidth changes
  // ------------------------------------------------------------------
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (tool === "draw") {
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = lineWidth;
      }
    } else {
      canvas.isDrawingMode = false;
    }

    if (tool === "select") {
      canvas.selection = true;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = true;
        obj.evented = true;
      });
    } else {
      canvas.selection = false;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = false;
        obj.evented = false;
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [tool, color, lineWidth]);

  // ------------------------------------------------------------------
  // Undo / Redo
  // ------------------------------------------------------------------
  const handleUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || undoStack.current.length <= 1) return;

    const current = undoStack.current.pop()!;
    redoStack.current.push(current);

    const prev = undoStack.current[undoStack.current.length - 1];
    canvas.loadFromJSON(prev).then(() => {
      canvas.renderAll();
      setCanUndo(undoStack.current.length > 1);
      setCanRedo(true);
    });
  }, []);

  const handleRedo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const next = redoStack.current.pop()!;
    undoStack.current.push(next);

    canvas.loadFromJSON(next).then(() => {
      canvas.renderAll();
      setCanUndo(true);
      setCanRedo(redoStack.current.length > 0);
    });
  }, []);

  // ------------------------------------------------------------------
  // Clear all annotations
  // ------------------------------------------------------------------
  const handleClearAll = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj: FabricCanvas) => canvas.remove(obj));
    canvas.renderAll();
    pushUndo();
  }, [pushUndo]);

  // ------------------------------------------------------------------
  // Save annotated image
  // ------------------------------------------------------------------
  const handleSave = useCallback(async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setSaving(true);
    try {
      canvas.discardActiveObject();
      canvas.renderAll();

      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });

      // Convert data URL to blob
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();

      const formData = new FormData();
      formData.append("image", blob, "annotated.png");

      const res = await fetch(
        `/api/properties/${propertyId}/trees/${treeId}/photos/${photoId}/annotate`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to save annotation");

      const data = await res.json();
      onSave(data.url);
    } catch (err) {
      console.error("Save annotation failed:", err);
    } finally {
      setSaving(false);
    }
  }, [photoId, propertyId, treeId, onSave]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[960px] max-h-[95vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Photo Markup Editor</DialogTitle>

        <div className="flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 p-2 border-b bg-zinc-50 dark:bg-zinc-900 flex-wrap">
            {/* Tool buttons */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<MousePointer2 className="h-4 w-4" />}
                label="Select"
                active={tool === "select"}
                onClick={() => setTool("select")}
              />
              <ToolButton
                icon={<Pencil className="h-4 w-4" />}
                label="Draw"
                active={tool === "draw"}
                onClick={() => setTool("draw")}
              />
              <ToolButton
                icon={<MoveRight className="h-4 w-4" />}
                label="Arrow"
                active={tool === "arrow"}
                onClick={() => setTool("arrow")}
              />
              <ToolButton
                icon={<Circle className="h-4 w-4" />}
                label="Circle"
                active={tool === "circle"}
                onClick={() => setTool("circle")}
              />
              <ToolButton
                icon={<Type className="h-4 w-4" />}
                label="Text"
                active={tool === "text"}
                onClick={() => setTool("text")}
              />
            </div>

            {/* Color picker */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  className={`h-6 w-6 rounded-full border-2 transition-all ${
                    color === c.value
                      ? "border-blue-500 scale-110"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>

            {/* Line width */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {LINE_WIDTHS.map((w) => (
                <button
                  key={w}
                  className={`flex items-center justify-center h-7 w-7 rounded transition-colors ${
                    lineWidth === w
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setLineWidth(w)}
                  title={`${w}px`}
                >
                  <div
                    className="rounded-full bg-current"
                    style={{ width: w + 2, height: w + 2 }}
                  />
                </button>
              ))}
            </div>

            {/* Undo / Redo / Clear */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<Undo2 className="h-4 w-4" />}
                label="Undo"
                active={false}
                onClick={handleUndo}
                disabled={!canUndo}
              />
              <ToolButton
                icon={<Redo2 className="h-4 w-4" />}
                label="Redo"
                active={false}
                onClick={handleRedo}
                disabled={!canRedo}
              />
              <ToolButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Clear All"
                active={false}
                onClick={handleClearAll}
              />
            </div>

            {/* Save / Cancel */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save Markup"}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex items-center justify-center bg-zinc-800 p-2 overflow-auto">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 z-10">
                <div className="text-white text-sm">Loading editor...</div>
              </div>
            )}
            <canvas ref={canvasRef} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Toolbar button helper
// ---------------------------------------------------------------------------

function ToolButton({
  icon,
  label,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center h-8 w-8 rounded transition-colors ${
        active
          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {icon}
    </button>
  );
}

```

### components/property-audio-notes.tsx
```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Loader2,
  Trash2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AudioNote {
  id: string;
  propertyId: string;
  filename: string;
  audioUrl: string;
  rawTranscription: string | null;
  cleanedTranscription: string | null;
  durationSeconds: number | null;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface PropertyAudioNotesProps {
  propertyId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ready":
      return "default";
    case "error":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "transcribing":
      return "Transcribing";
    case "cleaning":
      return "Cleaning up";
    case "ready":
      return "Ready";
    case "error":
      return "Error";
    default:
      return status;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyAudioNotes({ propertyId }: PropertyAudioNotesProps) {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isRecording,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useAudioRecorder();

  const basePath = `/api/properties/${propertyId}/audio`;

  // ---- Fetch audio notes ----
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setAudioNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch property audio notes:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---- Poll for pending transcriptions ----
  useEffect(() => {
    const pendingIds = audioNotes
      .filter((n) => n.status !== "ready" && n.status !== "error")
      .map((n) => n.id);

    if (pendingIds.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      for (const noteId of pendingIds) {
        try {
          const res = await fetch(`${basePath}/${noteId}`);
          if (res.ok) {
            const updated: AudioNote = await res.json();
            if (
              updated.status === "ready" ||
              updated.status === "error" ||
              updated.status !== audioNotes.find((n) => n.id === noteId)?.status
            ) {
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
            }
          }
        } catch {
          // ignore polling errors
        }
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [audioNotes, basePath]);

  // ---- Recording flow ----
  async function handleStopRecording() {
    try {
      const blob = await stopRecording();
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }

  function handleDiscardPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewBlob(null);
    setPreviewUrl(null);
  }

  async function handleUploadRecording() {
    if (!previewBlob) return;
    setUploading(true);

    try {
      const formData = new FormData();
      const ext = previewBlob.type.includes("mp4") ? ".m4a" : ".webm";
      formData.append("file", previewBlob, `site-note${ext}`);
      formData.append("durationSeconds", String(recordingDuration));

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setAudioNotes((prev) => [newNote, ...prev]);
        handleDiscardPreview();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  // ---- Delete ----
  async function handleDelete(noteId: string) {
    try {
      const res = await fetch(`${basePath}/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Retry transcription ----
  async function handleRetry(noteId: string) {
    setAudioNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, status: "transcribing", errorMessage: null }
          : n
      )
    );
    try {
      await fetch(`${basePath}/${noteId}/transcribe`, { method: "POST" });
    } catch (err) {
      console.error("Retry failed:", err);
    }
  }

  // ---- Update transcription ----
  async function handleTranscriptionEdit(noteId: string, text: string) {
    try {
      await fetch(`${basePath}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanedTranscription: text }),
      });
      setAudioNotes((prev) =>
        prev.map((n) =>
          n.id === noteId ? { ...n, cleanedTranscription: text } : n
        )
      );
    } catch (err) {
      console.error("Transcription edit failed:", err);
    }
  }

  // ---- Playback ----
  function togglePlay(noteId: string) {
    const audio = audioPlayerRefs.current.get(noteId);
    if (!audio) return;

    if (playingId === noteId) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        audioPlayerRefs.current.get(playingId)?.pause();
      }
      audio.play();
      setPlayingId(noteId);
    }
  }

  // ---- Render ----
  return (
    <div className="space-y-4">
      {/* Record Section */}
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
        {!isRecording && !previewUrl && !recorderError && (
          <>
            <button
              onClick={startRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition-all"
              title="Record site observation"
            >
              <Mic className="h-6 w-6" />
            </button>
            <p className="text-xs text-muted-foreground">
              Record site observations
            </p>
          </>
        )}

        {isRecording && (
          <>
            <button
              onClick={handleStopRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
              title="Stop recording"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
            <p className="text-sm font-mono font-semibold text-red-600">
              {formatDuration(recordingDuration)}
            </p>
            <p className="text-xs text-muted-foreground">Recording...</p>
          </>
        )}

        {previewUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <audio src={previewUrl} controls className="w-full h-10" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUploadRecording}
                disabled={uploading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload & Transcribe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardPreview}
                disabled={uploading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {recorderError && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-3 space-y-2">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {recorderError.toLowerCase().includes("permission")
                ? "Microphone access denied"
                : recorderError}
            </p>
            <p className="text-[11px] text-red-500/80 dark:text-red-400/70">
              {recorderError.toLowerCase().includes("permission")
                ? "Your browser blocked microphone access. Click the lock/site-settings icon in your address bar, allow microphone access, then try again."
                : "Make sure your device has a microphone connected and try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              onClick={startRecording}
            >
              <RotateCcw className="h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Audio Notes List */}
      {audioNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {audioNotes.length} site note{audioNotes.length !== 1 ? "s" : ""}
          </p>

          {audioNotes.map((note) => (
            <div key={note.id} className="rounded-lg border p-3 space-y-2">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(note.status)}>
                    {(note.status === "transcribing" ||
                      note.status === "cleaning" ||
                      note.status === "uploading") && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {statusLabel(note.status)}
                  </Badge>
                  {note.durationSeconds != null && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDuration(Math.round(note.durationSeconds))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {note.status === "error" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRetry(note.id)}
                      title="Retry transcription"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-700"
                    onClick={() => setDeleteConfirmId(note.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePlay(note.id)}
                >
                  {playingId === note.id ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <audio
                  ref={(el) => {
                    if (el) audioPlayerRefs.current.set(note.id, el);
                    else audioPlayerRefs.current.delete(note.id);
                  }}
                  src={note.audioUrl}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      playingId === note.id
                        ? "bg-emerald-500 animate-pulse w-1/2"
                        : "bg-muted-foreground/30 w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Transcription */}
              {note.status === "ready" && note.cleanedTranscription && (
                <Textarea
                  value={note.cleanedTranscription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAudioNotes((prev) =>
                      prev.map((n) =>
                        n.id === note.id
                          ? { ...n, cleanedTranscription: value }
                          : n
                      )
                    );
                  }}
                  onBlur={() =>
                    handleTranscriptionEdit(
                      note.id,
                      note.cleanedTranscription || ""
                    )
                  }
                  rows={3}
                  className="text-xs resize-none"
                />
              )}

              {(note.status === "transcribing" ||
                note.status === "cleaning") && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {note.status === "transcribing"
                      ? "Transcribing audio with Whisper..."
                      : "Cleaning up transcription with Claude..."}
                  </span>
                </div>
              )}

              {note.status === "error" && (
                <p className="text-xs text-red-500 p-2 rounded bg-red-50 dark:bg-red-950/30">
                  {note.errorMessage || "Transcription failed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Site Audio Note</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this site audio note and its
            transcription? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

```

### components/property-map-view.tsx
```tsx
"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { TreeSummaryPanel } from "@/components/tree-summary-panel";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyAudioNotes } from "@/components/property-audio-notes";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import {
  ChevronLeft,
  FileText,
  TreePine,
  Mic,
  ChevronDown,
  HardHat,
  Loader2,
  ClipboardList,
  Download,
  FileDown,
} from "lucide-react";

// Dynamically import PropertyMap with SSR disabled (Mapbox GL needs window/DOM)
const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeData {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  pinLat: number;
  pinLng: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface PropertyData {
  id: string;
  address: string;
  city: string;
  lat: number | null;
  lng: number | null;
  reportType?: string;
  projectDescription?: string | null;
  permitNumber?: string | null;
  developerName?: string | null;
  architectName?: string | null;
  siteObservations?: string | null;
  scopeOfAssignment?: string | null;
  trees: TreeData[];
  reports: { id: string; status: string; reportType: string; certifiedAt?: string | null }[];
}

interface PropertyMapViewProps {
  property: PropertyData;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMapView({ property }: PropertyMapViewProps) {
  const [trees, setTrees] = useState<TreeData[]>(property.trees ?? []);
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const [pendingPin, setPendingPin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flyToId, setFlyToId] = useState<string | null>(null);
  const [audioOpen, setAudioOpen] = useState(false);

  // Construction encroachment project fields
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectDescription, setProjectDescription] = useState(
    property.projectDescription ?? ""
  );
  const [permitNumber, setPermitNumber] = useState(
    property.permitNumber ?? ""
  );
  const [developerName, setDeveloperName] = useState(
    property.developerName ?? ""
  );
  const [architectName, setArchitectName] = useState(
    property.architectName ?? ""
  );
  const [savingProject, setSavingProject] = useState(false);

  // Site information fields
  const [siteInfoOpen, setSiteInfoOpen] = useState(false);
  const [scopeOfAssignment, setScopeOfAssignment] = useState(
    property.scopeOfAssignment ?? ""
  );
  const [siteObservations, setSiteObservations] = useState(
    property.siteObservations ?? ""
  );
  const [savingSiteInfo, setSavingSiteInfo] = useState(false);

  const reportType = property.reportType ?? "health_assessment";
  const reportTypeConfig = getReportTypeConfig(reportType);

  // ---- Derived ----
  const selectedTree = trees.find((t) => t.id === selectedTreeId) ?? null;

  const center = {
    lat: property.lat ?? 37.4419,
    lng: property.lng ?? -122.143,
  };

  // Convert trees to pins
  const pins: TreePin[] = trees.map((t) => ({
    id: t.id,
    treeNumber: t.treeNumber,
    lat: t.pinLat,
    lng: t.pinLng,
    status: (t.status ?? "draft") as TreePin["status"],
    speciesCommon: t.speciesCommon,
    dbhInches: t.dbhInches,
    conditionRating: t.conditionRating,
    recommendedAction: t.recommendedAction,
    isProtected: t.isProtected,
  }));

  // Add pending pin if exists
  if (pendingPin) {
    pins.push({
      id: "pending",
      treeNumber: trees.length + 1,
      lat: pendingPin.lat,
      lng: pendingPin.lng,
      status: "draft",
    });
  }

  // ---- Handlers ----
  const handlePinAdd = useCallback(
    (lat: number, lng: number) => {
      setPendingPin({ lat, lng });
      setSelectedTreeId(null);
      setShowSidePanel(true);
    },
    []
  );

  const handlePinClick = useCallback(
    (id: string) => {
      if (id === "pending") return;
      setPendingPin(null);
      setSelectedTreeId(id);
      setShowSidePanel(true);
    },
    []
  );

  const handlePinMove = useCallback(
    async (id: string, lat: number, lng: number) => {
      if (id === "pending") {
        setPendingPin({ lat, lng });
        return;
      }

      // Optimistic update
      setTrees((prev) =>
        prev.map((t) => (t.id === id ? { ...t, pinLat: lat, pinLng: lng } : t))
      );

      try {
        await fetch(`/api/trees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinLat: lat, pinLng: lng }),
        });
      } catch {
        // Revert on failure - refetch would be ideal but keep it simple
      }
    },
    []
  );

  const handleSave = useCallback(
    async (data: TreeFormData) => {
      setSaving(true);
      try {
        if (pendingPin) {
          // Create new tree
          const res = await fetch(`/api/properties/${property.id}/trees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              pinLat: pendingPin.lat,
              pinLng: pendingPin.lng,
              treeNumber: trees.length + 1,
            }),
          });

          if (!res.ok) throw new Error("Failed to create tree");
          const newTree = await res.json();

          setTrees((prev) => [...prev, newTree]);
          setPendingPin(null);
          setSelectedTreeId(newTree.id);
        } else if (selectedTreeId) {
          // Update existing tree
          const res = await fetch(`/api/trees/${selectedTreeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) throw new Error("Failed to update tree");
          const updatedTree = await res.json();

          setTrees((prev) =>
            prev.map((t) => (t.id === selectedTreeId ? updatedTree : t))
          );
        }
      } catch (err) {
        console.error("Save failed:", err);
      } finally {
        setSaving(false);
      }
    },
    [pendingPin, selectedTreeId, property.id, trees.length]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedTreeId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trees/${selectedTreeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete tree");

      setTrees((prev) => prev.filter((t) => t.id !== selectedTreeId));
      setSelectedTreeId(null);
      setShowSidePanel(false);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSaving(false);
    }
  }, [selectedTreeId]);

  const handleClosePanel = useCallback(() => {
    setShowSidePanel(false);
    setSelectedTreeId(null);
    setPendingPin(null);
  }, []);

  const handleSelectTreeFromSummary = useCallback((id: string) => {
    setPendingPin(null);
    setSelectedTreeId(id);
    setShowSidePanel(true);
    setFlyToId(id);
  }, []);

  const handleSaveProject = useCallback(async () => {
    setSavingProject(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectDescription.trim() || null,
          permitNumber: permitNumber.trim() || null,
          developerName: developerName.trim() || null,
          architectName: architectName.trim() || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save project info:", err);
    } finally {
      setSavingProject(false);
    }
  }, [property.id, projectDescription, permitNumber, developerName, architectName]);

  const handleSaveSiteInfo = useCallback(async () => {
    setSavingSiteInfo(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scopeOfAssignment: scopeOfAssignment.trim() || null,
          siteObservations: siteObservations.trim() || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save site info:", err);
    } finally {
      setSavingSiteInfo(false);
    }
  }, [property.id, scopeOfAssignment, siteObservations]);

  // ---- Current side panel data ----
  const sidePanelTree = pendingPin
    ? { pinLat: pendingPin.lat, pinLng: pendingPin.lng }
    : selectedTree;
  const sidePanelTreeNumber = pendingPin
    ? trees.length + 1
    : selectedTree?.treeNumber ?? 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/properties">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Properties
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">
                {property.address}
              </h1>
              {reportTypeConfig && (
                <Badge variant="outline" className="text-xs">
                  {reportTypeConfig.label}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{property.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <TreePine className="h-3 w-3" />
            {trees.length} tree{trees.length !== 1 ? "s" : ""}
          </Badge>
          {property.reports && property.reports.length > 0 ? (
            <div className="flex items-center gap-2">
              <StatusBadge status={property.reports[0].status} />
              <Link href={`/properties/${property.id}/report`}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  {property.reports[0].status === "certified"
                    ? "View Report"
                    : "Edit Report"}
                </Button>
              </Link>
              {property.reports[0].status === "certified" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `/api/reports/${property.reports[0].id}/pdf`,
                        "_blank"
                      )
                    }
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `/api/reports/${property.reports[0].id}/word`,
                        "_blank"
                      )
                    }
                  >
                    <FileDown className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Link href={`/properties/${property.id}/report`}>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Generate Report
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Construction Encroachment: Project Info Card */}
      {reportType === "construction_encroachment" && (
        <Card>
          <CardHeader
            className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setProjectOpen((v) => !v)}
          >
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <HardHat className="h-4 w-4 text-blue-600" />
              Project Information
              <ChevronDown
                className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                  projectOpen ? "rotate-180" : ""
                }`}
              />
            </CardTitle>
          </CardHeader>
          {projectOpen && (
            <CardContent className="pt-0 space-y-3">
              <div>
                <Label htmlFor="mv-proj-desc" className="text-xs">
                  Project Description
                </Label>
                <Input
                  id="mv-proj-desc"
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="mv-permit" className="text-xs">
                    Permit Number
                  </Label>
                  <Input
                    id="mv-permit"
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mv-developer" className="text-xs">
                    Developer / Contractor
                  </Label>
                  <Input
                    id="mv-developer"
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label htmlFor="mv-architect" className="text-xs">
                    Architect
                  </Label>
                  <Input
                    id="mv-architect"
                    placeholder="Jane Smith, AIA"
                    value={architectName}
                    onChange={(e) => setArchitectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleSaveProject}
                  disabled={savingProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {savingProject ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Site Information */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setSiteInfoOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-violet-600" />
            Site Information
            <ChevronDown
              className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                siteInfoOpen ? "rotate-180" : ""
              }`}
            />
          </CardTitle>
        </CardHeader>
        {siteInfoOpen && (
          <CardContent className="pt-0 space-y-3">
            <div>
              <Label htmlFor="mv-scope" className="text-xs">
                Scope of Assignment
              </Label>
              <Textarea
                id="mv-scope"
                placeholder="Describe the scope and purpose of this assessment..."
                value={scopeOfAssignment}
                onChange={(e) => setScopeOfAssignment(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mv-site-obs" className="text-xs">
                Site Observations
              </Label>
              <Textarea
                id="mv-site-obs"
                placeholder="Describe site conditions, terrain, surrounding land use..."
                value={siteObservations}
                onChange={(e) => setSiteObservations(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSaveSiteInfo}
                disabled={savingSiteInfo}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {savingSiteInfo ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Site Audio Notes */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setAudioOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Mic className="h-4 w-4 text-emerald-600" />
            Site Audio Notes
            <ChevronDown
              className={`h-4 w-4 ml-auto text-muted-foreground transition-transform ${
                audioOpen ? "rotate-180" : ""
              }`}
            />
          </CardTitle>
        </CardHeader>
        {audioOpen && (
          <CardContent className="pt-0">
            <PropertyAudioNotes propertyId={property.id} />
          </CardContent>
        )}
      </Card>

      {/* Main Area: Map + Side Panel */}
      <div className="flex gap-0 rounded-xl border overflow-hidden">
        {/* Map */}
        <div className="flex-1" style={{ minHeight: 500 }}>
          <PropertyMap
            center={center}
            pins={pins}
            circles={
              reportType === "construction_encroachment"
                ? trees
                    .filter((t) => t.pinLat && t.pinLng && t.dbhInches > 0)
                    .map(
                      (t): CircleOverlay => ({
                        id: t.id,
                        lat: t.pinLat,
                        lng: t.pinLng,
                        tpzRadiusFt: calcTpzRadius(t.dbhInches),
                        srzRadiusFt: calcSrzRadius(t.dbhInches),
                      })
                    )
                : undefined
            }
            onPinAdd={handlePinAdd}
            onPinClick={handlePinClick}
            onPinMove={handlePinMove}
            selectedPinId={pendingPin ? "pending" : selectedTreeId}
            flyToId={flyToId}
            interactive
            className="h-full w-full"
          />
        </div>

        {/* Side Panel */}
        {showSidePanel && (
          <TreeSidePanel
            tree={sidePanelTree}
            treeNumber={sidePanelTreeNumber}
            propertyId={property.id}
            propertyCity={property.city}
            reportType={reportType}
            onSave={handleSave}
            onDelete={
              selectedTree ? handleDelete : undefined
            }
            onClose={handleClosePanel}
            saving={saving}
          />
        )}
      </div>

      {/* Summary Panel */}
      <TreeSummaryPanel
        trees={trees}
        selectedTreeId={selectedTreeId}
        onSelectTree={handleSelectTreeFromSummary}
        reportType={reportType}
      />
    </div>
  );
}

```

### components/property-map.tsx
```tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreePin {
  id: string;
  treeNumber: number;
  lat: number;
  lng: number;
  status: "draft" | "assessed" | "certified";
  speciesCommon?: string;
  dbhInches?: number;
  conditionRating?: number;
  recommendedAction?: string;
  isProtected?: boolean;
  isHeritage?: boolean;
}

export interface CircleOverlay {
  id: string;
  lat: number;
  lng: number;
  tpzRadiusFt: number;
  srzRadiusFt: number;
}

interface PropertyMapProps {
  center: { lat: number; lng: number };
  pins: TreePin[];
  circles?: CircleOverlay[];
  onPinAdd?: (lat: number, lng: number) => void;
  onPinMove?: (id: string, lat: number, lng: number) => void;
  onPinClick?: (id: string) => void;
  selectedPinId?: string | null;
  flyToId?: string | null;
  interactive?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pinColor(pin: TreePin): string {
  if (pin.recommendedAction === "remove") return "#ef4444"; // red
  if (pin.conditionRating != null) {
    if (pin.conditionRating <= 1) return "#ef4444"; // red (Dead/Critical)
    if (pin.conditionRating === 2) return "#f97316"; // orange (Poor)
    if (pin.conditionRating === 3) return "#eab308"; // yellow (Fair)
    if (pin.conditionRating === 4) return "#84cc16"; // lime (Good)
    if (pin.conditionRating >= 5) return "#22c55e"; // green (Excellent)
  }
  return "#9ca3af"; // gray (unassessed)
}

function createMarkerElement(
  pin: TreePin,
  isSelected: boolean
): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.width = "30px";
  wrapper.style.height = "30px";

  const el = document.createElement("div");
  el.style.width = "30px";
  el.style.height = "30px";
  el.style.lineHeight = "30px";
  el.style.textAlign = "center";
  el.style.borderRadius = "50%";
  el.style.color = "white";
  el.style.fontWeight = "700";
  el.style.fontSize = "12px";
  el.style.cursor = "pointer";
  el.style.userSelect = "none";
  el.style.backgroundColor = pinColor(pin);
  el.style.border = "2px solid white";
  el.style.transition = "transform 0.15s, box-shadow 0.15s";

  if (isSelected) {
    el.style.transform = "scale(1.2)";
    el.style.boxShadow = "0 0 0 3px white, 0 0 8px rgba(0,0,0,0.4)";
  } else {
    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.35)";
  }

  el.textContent = String(pin.treeNumber);
  wrapper.appendChild(el);

  // Protection badge (green shield)
  if (pin.isProtected && !pin.isHeritage) {
    const badge = document.createElement("div");
    badge.style.position = "absolute";
    badge.style.top = "-4px";
    badge.style.right = "-4px";
    badge.style.width = "14px";
    badge.style.height = "14px";
    badge.style.borderRadius = "50%";
    badge.style.backgroundColor = "#22c55e";
    badge.style.border = "1.5px solid white";
    badge.style.display = "flex";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    badge.style.fontSize = "8px";
    badge.style.color = "white";
    badge.textContent = "🛡";
    wrapper.appendChild(badge);
  }

  // Heritage badge (gold star)
  if (pin.isHeritage) {
    const badge = document.createElement("div");
    badge.style.position = "absolute";
    badge.style.top = "-4px";
    badge.style.right = "-4px";
    badge.style.width = "14px";
    badge.style.height = "14px";
    badge.style.borderRadius = "50%";
    badge.style.backgroundColor = "#eab308";
    badge.style.border = "1.5px solid white";
    badge.style.display = "flex";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";
    badge.style.fontSize = "8px";
    badge.style.color = "white";
    badge.textContent = "★";
    wrapper.appendChild(badge);
  }

  // Hover effect
  wrapper.addEventListener("mouseenter", () => {
    if (!isSelected) {
      el.style.transform = "scale(1.15)";
    }
  });
  wrapper.addEventListener("mouseleave", () => {
    if (!isSelected) {
      el.style.transform = "scale(1)";
    }
  });

  return wrapper;
}

/** Generate a GeoJSON circle polygon (no turf dependency). */
function createCirclePolygon(
  center: [number, number], // [lng, lat]
  radiusFeet: number,
  points = 64
): GeoJSON.Polygon {
  const radiusMeters = radiusFeet * 0.3048;
  const coords: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const lat = center[1] + dy / 111320;
    const lng =
      center[0] + dx / (111320 * Math.cos((center[1] * Math.PI) / 180));
    coords.push([lng, lat]);
  }
  return { type: "Polygon", coordinates: [coords] };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMap({
  center,
  pins,
  circles,
  onPinAdd,
  onPinMove,
  onPinClick,
  selectedPinId,
  flyToId,
  interactive = true,
  className,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const markerClickedRef = useRef(false);
  const circleSourceIdsRef = useRef<string[]>([]);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // ---- Cleanup helper ----
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }, []);

  // ---- Initialize map ----
  useEffect(() => {
    if (!token || !mapContainerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [center.lng, center.lat],
      zoom: 19,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current = map;

    return () => {
      clearMarkers();
      map.remove();
      mapRef.current = null;
    };
    // Only re-init if center changes substantially or token changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ---- Map click -> add pin ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !interactive || !onPinAdd) return;

    function handleMapClick(e: mapboxgl.MapMouseEvent) {
      // Skip if a marker was just clicked
      if (markerClickedRef.current) {
        markerClickedRef.current = false;
        return;
      }
      onPinAdd!(e.lngLat.lat, e.lngLat.lng);
    }

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [interactive, onPinAdd]);

  // ---- Sync markers with pins ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    clearMarkers();

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId;
      const el = createMarkerElement(pin, isSelected);

      // Prevent map click when clicking marker
      el.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
      });

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
        onPinClick?.(pin.id);
      });

      const marker = new mapboxgl.Marker({
        element: el,
        draggable: interactive,
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      if (interactive && onPinMove) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          onPinMove(pin.id, lngLat.lat, lngLat.lng);
        });
      }

      markersRef.current.push(marker);
    });
  }, [pins, selectedPinId, interactive, onPinClick, onPinMove, clearMarkers]);

  // ---- flyTo support ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToId) return;

    const pin = pins.find((p) => p.id === flyToId);
    if (pin) {
      map.flyTo({ center: [pin.lng, pin.lat], zoom: 20, duration: 800 });
    }
  }, [flyToId, pins]);

  // ---- Sync circle overlays (TPZ/SRZ) ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function syncCircles() {
      // Remove old circle layers/sources
      for (const sourceId of circleSourceIdsRef.current) {
        if (map!.getLayer(`${sourceId}-tpz-fill`))
          map!.removeLayer(`${sourceId}-tpz-fill`);
        if (map!.getLayer(`${sourceId}-tpz-line`))
          map!.removeLayer(`${sourceId}-tpz-line`);
        if (map!.getLayer(`${sourceId}-srz-fill`))
          map!.removeLayer(`${sourceId}-srz-fill`);
        if (map!.getLayer(`${sourceId}-srz-line`))
          map!.removeLayer(`${sourceId}-srz-line`);
        if (map!.getSource(sourceId)) map!.removeSource(sourceId);
      }
      circleSourceIdsRef.current = [];

      if (!circles || circles.length === 0) return;

      // Build a combined FeatureCollection for TPZ and SRZ
      const tpzFeatures: GeoJSON.Feature[] = [];
      const srzFeatures: GeoJSON.Feature[] = [];

      for (const c of circles) {
        if (c.tpzRadiusFt > 0) {
          tpzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "TPZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.tpzRadiusFt),
          });
        }
        if (c.srzRadiusFt > 0) {
          srzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "SRZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.srzRadiusFt),
          });
        }
      }

      // TPZ source + layers
      if (tpzFeatures.length > 0) {
        const tpzSourceId = "tpz-circles";
        map!.addSource(tpzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: tpzFeatures },
        });
        map!.addLayer({
          id: `${tpzSourceId}-fill`,
          type: "fill",
          source: tpzSourceId,
          paint: {
            "fill-color": "#f97316", // orange
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${tpzSourceId}-line`,
          type: "line",
          source: tpzSourceId,
          paint: {
            "line-color": "#f97316",
            "line-width": 2,
            "line-dasharray": [4, 2],
          },
        });
        circleSourceIdsRef.current.push(tpzSourceId);
      }

      // SRZ source + layers
      if (srzFeatures.length > 0) {
        const srzSourceId = "srz-circles";
        map!.addSource(srzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: srzFeatures },
        });
        map!.addLayer({
          id: `${srzSourceId}-fill`,
          type: "fill",
          source: srzSourceId,
          paint: {
            "fill-color": "#ef4444", // red
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${srzSourceId}-line`,
          type: "line",
          source: srzSourceId,
          paint: {
            "line-color": "#ef4444",
            "line-width": 2,
          },
        });
        circleSourceIdsRef.current.push(srzSourceId);
      }
    }

    // If style is already loaded, sync immediately; otherwise wait
    if (map.isStyleLoaded()) {
      syncCircles();
    } else {
      map.on("style.load", syncCircles);
      return () => {
        map.off("style.load", syncCircles);
      };
    }
  }, [circles]);

  // ---- No token placeholder ----
  if (!token) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center text-sm text-muted-foreground ${className ?? ""}`}
      >
        <p>
          Set <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> in{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">.env</code> to enable the satellite map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className={`rounded-xl overflow-hidden ${className ?? ""}`}
        style={{ minHeight: 400 }}
      />
      {/* Legend for circle overlays */}
      {circles && circles.length > 0 && (
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-orange-500" />
            <span className="text-gray-700">TPZ (Tree Protection Zone)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-red-500" />
            <span className="text-gray-700">SRZ (Structural Root Zone)</span>
          </div>
        </div>
      )}
    </div>
  );
}

```

### components/report-preview.tsx
```tsx
"use client";

import { renderMarkdownToHtml } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  isProtected: boolean;
  recommendedAction: string;
}

interface PropertyInfo {
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
}

interface ReportPreviewProps {
  content: string;
  property: PropertyInfo;
  trees: TreeRecord[];
  arborist?: ArboristInfo | null;
  reportType: string;
  certifiedAt?: string | null;
  eSignatureText?: string | null;
}

// ---------------------------------------------------------------------------
// Report type display names
// ---------------------------------------------------------------------------

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Application",
  construction_encroachment: "Construction Impact Report",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Tree Valuation Report",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReportPreview({
  content,
  property,
  trees,
  arborist,
  reportType,
  certifiedAt,
  eSignatureText,
}: ReportPreviewProps) {
  const reportHtml = renderMarkdownToHtml(content);
  const reportLabel =
    REPORT_TYPE_LABELS[reportType] ||
    reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const protectedCount = trees.filter((t) => t.isProtected).length;

  return (
    <div className="report-preview-container bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* ---- Styles scoped to .report-preview ---- */}
      <style>{`
        .report-preview {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          font-size: 11pt;
          line-height: 1.6;
          padding: 48px 56px;
          max-width: 8.5in;
          margin: 0 auto;
        }
        .dark .report-preview {
          color: #e4e4e7;
        }
        .report-preview h1,
        .report-preview h2,
        .report-preview h3 {
          color: #2d5016;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .dark .report-preview h1,
        .dark .report-preview h2,
        .dark .report-preview h3 {
          color: #6fcf3b;
        }
        .report-preview h1 { font-size: 18pt; }
        .report-preview h2 { font-size: 14pt; }
        .report-preview h3 { font-size: 12pt; }
        .report-preview p {
          margin: 8px 0;
        }
        .report-preview ul, .report-preview ol {
          margin: 8px 0;
          padding-left: 24px;
        }
        .report-preview li {
          margin: 4px 0;
        }
        .report-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 9pt;
        }
        .report-preview table th {
          background: #2d5016;
          color: white;
          padding: 6px 8px;
          text-align: left;
          font-weight: bold;
        }
        .dark .report-preview table th {
          background: #1a3a0a;
        }
        .report-preview table td {
          padding: 5px 8px;
          border: 1px solid #ddd;
        }
        .dark .report-preview table td {
          border-color: #3f3f46;
        }
        .report-preview table tr:nth-child(even) {
          background: #f9f9f6;
        }
        .dark .report-preview table tr:nth-child(even) {
          background: #18181b;
        }
        .report-preview hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 24px 0;
        }
        .dark .report-preview hr {
          border-color: #3f3f46;
        }
        .report-preview strong {
          font-weight: 700;
        }
        .report-preview em {
          font-style: italic;
        }
      `}</style>

      <div className="report-preview">
        {/* ---- Company Branding Header ---- */}
        {arborist?.companyLogoUrl && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arborist.companyLogoUrl}
                alt="Company logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                {arborist.companyName && (
                  <p className="font-bold text-[12pt]">
                    {arborist.companyName}
                  </p>
                )}
                {arborist.companyAddress && (
                  <p className="text-[9pt] text-zinc-500 dark:text-zinc-400">
                    {arborist.companyAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right text-[9pt] text-zinc-500 dark:text-zinc-400">
              {arborist.companyPhone && <p>{arborist.companyPhone}</p>}
              {arborist.companyEmail && <p>{arborist.companyEmail}</p>}
              {arborist.companyWebsite && <p>{arborist.companyWebsite}</p>}
            </div>
          </div>
        )}

        {/* ---- Header ---- */}
        <div className="text-center border-b-[3px] border-double border-[#2d5016] dark:border-[#6fcf3b] pb-5 mb-8">
          <h1 className="text-[18pt] tracking-[2px] uppercase !mt-0 !mb-1">
            Arborist Report
          </h1>
          <h2 className="!text-zinc-700 dark:!text-zinc-300 font-normal !mt-0 !mb-2">
            {property.address}
          </h2>
          <p className="text-[10pt] text-zinc-500 dark:text-zinc-400">
            {property.city}
            {property.state ? `, ${property.state}` : ", CA"}
            {property.county ? ` \u2014 ${property.county} County` : ""}
          </p>
        </div>

        {/* ---- Report Type Badge ---- */}
        <div className="text-center mb-6">
          <Badge
            variant="outline"
            className="text-[10pt] px-4 py-1.5 border-[#2d5016] text-[#2d5016] dark:border-[#6fcf3b] dark:text-[#6fcf3b]"
          >
            {reportLabel}
          </Badge>
        </div>

        {/* ---- Meta Table ---- */}
        <table className="!text-[10pt]" style={{ marginBottom: 24 }}>
          <tbody>
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold w-[28%]">
                Report Type
              </td>
              <td>{reportLabel}</td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold w-[18%]">
                Date
              </td>
              <td>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            {arborist && (
              <tr>
                <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                  Arborist
                </td>
                <td>{arborist.name}</td>
                <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                  ISA #
                </td>
                <td>{arborist.isaCertificationNum}</td>
              </tr>
            )}
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                Property
              </td>
              <td>{property.address}</td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                APN
              </td>
              <td>{property.parcelNumber || "N/A"}</td>
            </tr>
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                City
              </td>
              <td>
                {property.city}
                {property.state ? `, ${property.state}` : ", CA"}
                {property.zip ? ` ${property.zip}` : ""}
              </td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                Trees
              </td>
              <td>
                {trees.length} assessed &middot; {protectedCount} protected
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---- Tree Inventory Table ---- */}
        {trees.length > 0 && (
          <>
            <h2 className="!text-[13pt]">Tree Inventory</h2>
            <table>
              <thead>
                <tr>
                  <th className="text-center">Tree&nbsp;#</th>
                  <th>Species</th>
                  <th className="text-center">DBH</th>
                  <th className="text-center">Height</th>
                  <th className="text-center">Condition</th>
                  <th className="text-center">Protected</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree) => (
                  <tr key={tree.id}>
                    <td className="text-center font-bold">{tree.treeNumber}</td>
                    <td>
                      {tree.speciesCommon || "Unidentified"}
                      {tree.speciesScientific && (
                        <em className="text-zinc-500 dark:text-zinc-400 ml-1">
                          ({tree.speciesScientific})
                        </em>
                      )}
                    </td>
                    <td className="text-center">{tree.dbhInches}&Prime;</td>
                    <td className="text-center">
                      {tree.heightFt ? `${tree.heightFt}'` : "N/A"}
                    </td>
                    <td className="text-center">{tree.conditionRating}/5</td>
                    <td className="text-center">
                      {tree.isProtected ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Yes
                        </span>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td>{tree.recommendedAction || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ---- Report Content (rendered markdown) ---- */}
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        {/* ---- Certification Box ---- */}
        {certifiedAt && eSignatureText && (
          <div className="mt-10 border-2 border-[#2d5016] dark:border-[#6fcf3b] rounded-lg p-5 bg-[#f8faf5] dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-[#2d5016] dark:text-[#6fcf3b] mb-3">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="!mt-0 !mb-0 text-[12pt]">
                Arborist Certification
              </h3>
            </div>
            <p className="text-[10pt]">
              I, the undersigned, certify that I have personally inspected the
              tree(s) described in this report and that the information contained
              herein is accurate to the best of my professional knowledge and
              belief.
            </p>
            <div className="mt-4 space-y-1 text-[10pt]">
              <p>
                <strong>Electronically signed:</strong> {eSignatureText}
              </p>
              {arborist && (
                <p>
                  <strong>ISA Certification #:</strong>{" "}
                  {arborist.isaCertificationNum}
                </p>
              )}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

```

### components/sidebar.tsx
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TreePine,
  LayoutDashboard,
  MapPin,
  BookOpen,
  Plus,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/properties",
    icon: MapPin,
  },
  {
    label: "Ordinances",
    href: "/ordinances",
    icon: BookOpen,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[hsl(var(--sidebar-muted))] px-6">
        <TreePine className="h-7 w-7 text-emerald-400" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">TreeCertify</h1>
          <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))]/60">
            Arborist OS
          </p>
        </div>
      </div>

      {/* Quick action */}
      <div className="px-4 py-4">
        <Link
          href="/properties/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" />
          New Property
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-white"
                  : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-muted))] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-[hsl(var(--sidebar-muted))] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sidebar-muted))]">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Rivera</p>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50 truncate">
              ISA WE-12345A
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

```

### components/species-search.tsx
```tsx
"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PENINSULA_SPECIES, type TreeSpecies } from "@/lib/species";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeciesSearchProps {
  value: string;
  onChange: (common: string, scientific: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SpeciesSearch({ value, onChange, className }: SpeciesSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Reset search when popover closes
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Split species into native and non-native groups
  const natives = PENINSULA_SPECIES.filter((s) => s.category === "native");
  const nonnatives = PENINSULA_SPECIES.filter((s) => s.category === "nonnative");

  function handleSelect(species: TreeSpecies) {
    onChange(species.common, species.scientific);
    setOpen(false);
  }

  function handleCustomEntry() {
    if (search.trim()) {
      onChange(search.trim(), "");
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {value || "Search species..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command
          filter={(itemValue, searchQuery) => {
            // cmdk filter: match against both common + scientific names
            const q = searchQuery.toLowerCase();
            if (!q) return 1;
            const species = PENINSULA_SPECIES.find(
              (s) => s.common === itemValue
            );
            if (!species) return 0;
            const common = species.common.toLowerCase();
            const scientific = species.scientific.toLowerCase();
            if (common.includes(q) || scientific.includes(q)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder="Search by common or scientific name..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-2">
                <p className="text-muted-foreground text-xs">No species found</p>
                {search.trim() && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomEntry}
                    className="gap-1.5"
                  >
                    <TreePine className="h-3.5 w-3.5" />
                    Use &ldquo;{search.trim()}&rdquo; as custom species
                  </Button>
                )}
              </div>
            </CommandEmpty>

            <CommandGroup heading="Native Species">
              {natives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="default"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Non-native Species">
              {nonnatives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    non-native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

```

### components/status-badge.tsx
```tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  ai_generated: {
    label: "AI Generated",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  arborist_reviewed: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  review: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  certified: {
    label: "Certified",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  filed: {
    label: "Filed",
    className: "bg-teal-50 text-teal-700 border-teal-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-500 border-gray-200",
  },
  assessed: {
    label: "Assessed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}

```

### components/tree-audio-notes.tsx
```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Loader2,
  Trash2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AudioNote {
  id: string;
  treeRecordId: string;
  filename: string;
  audioUrl: string;
  rawTranscription: string | null;
  cleanedTranscription: string | null;
  durationSeconds: number | null;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface TreeAudioNotesProps {
  propertyId: string;
  treeId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ready":
      return "default";
    case "error":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "transcribing":
      return "Transcribing";
    case "cleaning":
      return "Cleaning up";
    case "ready":
      return "Ready";
    case "error":
      return "Error";
    default:
      return status;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeAudioNotes({ propertyId, treeId }: TreeAudioNotesProps) {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isRecording,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useAudioRecorder();

  const basePath = `/api/properties/${propertyId}/trees/${treeId}/audio`;

  // ---- Fetch audio notes ----
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setAudioNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch audio notes:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---- Poll for pending transcriptions ----
  useEffect(() => {
    const pendingIds = audioNotes
      .filter((n) => n.status !== "ready" && n.status !== "error")
      .map((n) => n.id);

    if (pendingIds.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (pollingRef.current) return; // already polling

    pollingRef.current = setInterval(async () => {
      let changed = false;
      for (const noteId of pendingIds) {
        try {
          const res = await fetch(`${basePath}/${noteId}`);
          if (res.ok) {
            const updated: AudioNote = await res.json();
            if (updated.status === "ready" || updated.status === "error") {
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
              changed = true;
            } else if (updated.status !== audioNotes.find(n => n.id === noteId)?.status) {
              // Status changed but not final — still update
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
            }
          }
        } catch {
          // ignore polling errors
        }
      }
      if (changed) {
        // Re-check if we still need to poll
        // The effect will re-run and clear the interval if no more pending
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [audioNotes, basePath]);

  // ---- Recording flow ----
  async function handleStopRecording() {
    try {
      const blob = await stopRecording();
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }

  function handleDiscardPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewBlob(null);
    setPreviewUrl(null);
  }

  async function handleUploadRecording() {
    if (!previewBlob) return;
    setUploading(true);

    try {
      const formData = new FormData();
      // Determine extension from blob type
      const ext = previewBlob.type.includes("mp4") ? ".m4a" : ".webm";
      formData.append("file", previewBlob, `recording${ext}`);
      formData.append("durationSeconds", String(recordingDuration));

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setAudioNotes((prev) => [newNote, ...prev]);
        handleDiscardPreview();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  // ---- Delete ----
  async function handleDelete(noteId: string) {
    try {
      const res = await fetch(`${basePath}/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Retry transcription ----
  async function handleRetry(noteId: string) {
    setAudioNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, status: "transcribing", errorMessage: null } : n
      )
    );
    try {
      await fetch(`${basePath}/${noteId}/transcribe`, { method: "POST" });
    } catch (err) {
      console.error("Retry failed:", err);
    }
  }

  // ---- Update transcription ----
  async function handleTranscriptionEdit(noteId: string, text: string) {
    try {
      await fetch(`${basePath}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanedTranscription: text }),
      });
      setAudioNotes((prev) =>
        prev.map((n) =>
          n.id === noteId ? { ...n, cleanedTranscription: text } : n
        )
      );
    } catch (err) {
      console.error("Transcription edit failed:", err);
    }
  }

  // ---- Playback ----
  function togglePlay(noteId: string) {
    const audio = audioPlayerRefs.current.get(noteId);
    if (!audio) return;

    if (playingId === noteId) {
      audio.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing
      if (playingId) {
        audioPlayerRefs.current.get(playingId)?.pause();
      }
      audio.play();
      setPlayingId(noteId);
    }
  }

  // ---- Render ----
  return (
    <div className="space-y-4">
      {/* Record Section */}
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
        {!isRecording && !previewUrl && !recorderError && (
          <>
            <button
              onClick={startRecording}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition-all"
              title="Start recording"
            >
              <Mic className="h-7 w-7" />
            </button>
            <p className="text-xs text-muted-foreground">
              Tap to record a voice note
            </p>
          </>
        )}

        {isRecording && (
          <>
            <button
              onClick={handleStopRecording}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
              title="Stop recording"
            >
              <Square className="h-6 w-6 fill-current" />
            </button>
            <p className="text-sm font-mono font-semibold text-red-600">
              {formatDuration(recordingDuration)}
            </p>
            <p className="text-xs text-muted-foreground">Recording...</p>
          </>
        )}

        {previewUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <audio src={previewUrl} controls className="w-full h-10" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUploadRecording}
                disabled={uploading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload & Transcribe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardPreview}
                disabled={uploading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {recorderError && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-3 space-y-2">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {recorderError.toLowerCase().includes("permission")
                ? "Microphone access denied"
                : recorderError}
            </p>
            <p className="text-[11px] text-red-500/80 dark:text-red-400/70">
              {recorderError.toLowerCase().includes("permission")
                ? "Your browser blocked microphone access. Click the lock/site-settings icon in your address bar, allow microphone access, then try again."
                : "Make sure your device has a microphone connected and try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              onClick={startRecording}
            >
              <RotateCcw className="h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Audio Notes List */}
      {audioNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {audioNotes.length} recording{audioNotes.length !== 1 ? "s" : ""}
          </p>

          {audioNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border p-3 space-y-2"
            >
              {/* Header row: status + duration + actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(note.status)}>
                    {(note.status === "transcribing" ||
                      note.status === "cleaning" ||
                      note.status === "uploading") && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {statusLabel(note.status)}
                  </Badge>
                  {note.durationSeconds != null && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDuration(Math.round(note.durationSeconds))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {note.status === "error" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRetry(note.id)}
                      title="Retry transcription"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-700"
                    onClick={() => setDeleteConfirmId(note.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePlay(note.id)}
                >
                  {playingId === note.id ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <audio
                  ref={(el) => {
                    if (el) audioPlayerRefs.current.set(note.id, el);
                    else audioPlayerRefs.current.delete(note.id);
                  }}
                  src={note.audioUrl}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      playingId === note.id
                        ? "bg-emerald-500 animate-pulse w-1/2"
                        : "bg-muted-foreground/30 w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Transcription */}
              {note.status === "ready" && note.cleanedTranscription && (
                <Textarea
                  value={note.cleanedTranscription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAudioNotes((prev) =>
                      prev.map((n) =>
                        n.id === note.id
                          ? { ...n, cleanedTranscription: value }
                          : n
                      )
                    );
                  }}
                  onBlur={() =>
                    handleTranscriptionEdit(
                      note.id,
                      note.cleanedTranscription || ""
                    )
                  }
                  rows={3}
                  className="text-xs resize-none"
                />
              )}

              {(note.status === "transcribing" ||
                note.status === "cleaning") && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {note.status === "transcribing"
                      ? "Transcribing audio with Whisper..."
                      : "Cleaning up transcription with Claude..."}
                  </span>
                </div>
              )}

              {note.status === "error" && (
                <p className="text-xs text-red-500 p-2 rounded bg-red-50 dark:bg-red-950/30">
                  {note.errorMessage || "Transcription failed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Audio Note</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this audio note and its
            transcription? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

```

### components/tree-photos.tsx
```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ImageIcon,
  Trash2,
  Pencil,
  RotateCcw,
} from "lucide-react";

// Dynamically import markup editor (Fabric.js needs window/DOM)
const PhotoMarkupEditor = dynamic(
  () =>
    import("@/components/photo-markup-editor").then(
      (mod) => mod.PhotoMarkupEditor
    ),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreePhoto {
  id: string;
  treeRecordId: string;
  filename: string;
  url: string;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
  isAnnotated?: boolean;
  originalUrl?: string | null;
}

interface TreePhotosProps {
  propertyId: string;
  treeId: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreePhotos({ propertyId, treeId }: TreePhotosProps) {
  const [photos, setPhotos] = useState<TreePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [markupPhotoId, setMarkupPhotoId] = useState<string | null>(null);
  const [lightboxViewOriginal, setLightboxViewOriginal] = useState(false);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const basePath = `/api/properties/${propertyId}/trees/${treeId}/photos`;

  // ---- Fetch photos ----
  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Failed to fetch photos:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // ---- Upload ----
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      // Reset input so the same file(s) can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // ---- Delete ----
  async function handleDelete(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        setDeleteConfirmId(null);
        // Close lightbox if the deleted photo was open
        if (lightboxIndex !== null) {
          const deletedIdx = photos.findIndex((p) => p.id === photoId);
          if (deletedIdx === lightboxIndex) setLightboxIndex(null);
          else if (deletedIdx < lightboxIndex) setLightboxIndex(lightboxIndex - 1);
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Caption update ----
  async function saveCaption(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: captionDraft || null }),
      });
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === photoId ? { ...p, caption: captionDraft || null } : p
          )
        );
      }
    } catch (err) {
      console.error("Caption update failed:", err);
    }
    setEditingCaptionId(null);
  }

  // ---- Markup save callback ----
  const handleMarkupSave = useCallback(
    (annotatedUrl: string) => {
      // Update photo in local state
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === markupPhotoId
            ? { ...p, url: annotatedUrl, isAnnotated: true }
            : p
        )
      );
      setMarkupPhotoId(null);
      // Re-fetch to get all updated fields
      fetchPhotos();
    },
    [markupPhotoId, fetchPhotos]
  );

  // ---- Revert annotation ----
  async function handleRevertAnnotation(photoId: string) {
    setRevertingId(photoId);
    try {
      const res = await fetch(
        `${basePath}/${photoId}/annotate`,
        { method: "DELETE" }
      );
      if (res.ok) {
        await fetchPhotos();
      }
    } catch (err) {
      console.error("Revert failed:", err);
    } finally {
      setRevertingId(null);
    }
  }

  // ---- Lightbox navigation ----
  const lightboxPhoto =
    lightboxIndex !== null ? photos[lightboxIndex] : null;

  function navigateLightbox(delta: number) {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + delta;
    if (next >= 0 && next < photos.length) {
      setLightboxIndex(next);
      setLightboxViewOriginal(false);
    }
  }

  // Which URL to show in lightbox (original or annotated)
  const lightboxUrl =
    lightboxPhoto && lightboxViewOriginal && lightboxPhoto.originalUrl
      ? lightboxPhoto.originalUrl
      : lightboxPhoto?.url;

  // The photo being marked up
  const markupPhoto = photos.find((p) => p.id === markupPhotoId);

  // ---- Render ----
  return (
    <div className="space-y-3">
      {/* Header + Upload Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="h-3.5 w-3.5" />
              Add Photos
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Thumbnail Grid */}
      {photos.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-muted-foreground hover:border-muted-foreground/40 hover:text-muted-foreground/80 transition-colors w-full"
        >
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm">Tap to add photos</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="group relative">
              {/* Thumbnail */}
              <button
                className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxViewOriginal(false);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Annotated badge */}
                {photo.isAnnotated && (
                  <Badge
                    variant="secondary"
                    className="absolute bottom-1 left-1 text-[9px] px-1 py-0 bg-blue-600 text-white hover:bg-blue-600"
                  >
                    Annotated
                  </Badge>
                )}
              </button>

              {/* Hover overlay with markup button */}
              <div className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none" />
              <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMarkupPhotoId(photo.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmId(photo.id);
                  }}
                  title="Delete photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Caption */}
              {editingCaptionId === photo.id ? (
                <Input
                  value={captionDraft}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(photo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(photo.id);
                    if (e.key === "Escape") setEditingCaptionId(null);
                  }}
                  className="mt-1 h-6 text-[10px] px-1"
                  autoFocus
                  placeholder="Add caption..."
                />
              ) : (
                <button
                  className="mt-1 w-full text-left"
                  onClick={() => {
                    setEditingCaptionId(photo.id);
                    setCaptionDraft(photo.caption || "");
                  }}
                >
                  <p className="text-[10px] text-muted-foreground truncate hover:text-foreground transition-colors">
                    {photo.caption || "Add caption..."}
                  </p>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Photo</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this photo? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setLightboxIndex(null);
            setLightboxViewOriginal(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {lightboxPhoto && (
            <div className="flex flex-col">
              {/* Image */}
              <div className="relative bg-black flex items-center justify-center min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxUrl}
                  alt={lightboxPhoto.caption || "Photo"}
                  className="max-h-[70vh] max-w-full object-contain"
                />

                {/* Nav arrows */}
                {lightboxIndex! > 0 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {lightboxIndex! < photos.length - 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Counter + Annotated badge */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {lightboxPhoto.isAnnotated && (
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs">
                      Annotated
                    </Badge>
                  )}
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {lightboxIndex! + 1} of {photos.length}
                  </span>
                </div>

                {/* View original / annotated toggle */}
                {lightboxPhoto.isAnnotated && lightboxPhoto.originalUrl && (
                  <button
                    className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/80 transition-colors"
                    onClick={() =>
                      setLightboxViewOriginal(!lightboxViewOriginal)
                    }
                  >
                    {lightboxViewOriginal ? "View Annotated" : "View Original"}
                  </button>
                )}
              </div>

              {/* Caption + Actions bar */}
              <div className="flex items-center gap-2 p-3 border-t">
                <Input
                  value={
                    editingCaptionId === lightboxPhoto.id
                      ? captionDraft
                      : lightboxPhoto.caption || ""
                  }
                  placeholder="Add a caption..."
                  className="flex-1 text-sm"
                  onFocus={() => {
                    setEditingCaptionId(lightboxPhoto.id);
                    setCaptionDraft(lightboxPhoto.caption || "");
                  }}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(lightboxPhoto.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(lightboxPhoto.id);
                  }}
                />

                {/* Mark up button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setLightboxIndex(null);
                    setMarkupPhotoId(lightboxPhoto.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* Revert annotation button */}
                {lightboxPhoto.isAnnotated && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    onClick={() =>
                      handleRevertAnnotation(lightboxPhoto.id)
                    }
                    disabled={revertingId === lightboxPhoto.id}
                    title="Revert to original"
                  >
                    {revertingId === lightboxPhoto.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeleteConfirmId(lightboxPhoto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Photo Markup Editor Dialog */}
      {markupPhoto && (
        <PhotoMarkupEditor
          photoUrl={
            markupPhoto.isAnnotated && markupPhoto.originalUrl
              ? markupPhoto.originalUrl
              : markupPhoto.url
          }
          photoId={markupPhoto.id}
          propertyId={propertyId}
          treeId={treeId}
          onSave={handleMarkupSave}
          onClose={() => setMarkupPhotoId(null)}
        />
      )}
    </div>
  );
}

```

### components/tree-side-panel.tsx
```tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { SpeciesSearch } from "@/components/species-search";
import { ConditionRating } from "@/components/condition-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreePhotos } from "@/components/tree-photos";
import { TreeAudioNotes } from "@/components/tree-audio-notes";
import { HealthAssessmentFields } from "@/components/type-fields/health-assessment-fields";
import { RemovalPermitFields } from "@/components/type-fields/removal-permit-fields";
import { TreeValuationFields } from "@/components/type-fields/tree-valuation-fields";
import { ConstructionEncroachmentFields } from "@/components/type-fields/construction-encroachment-fields";
import {
  getReportTypeConfig,
  type HealthAssessmentData,
  type RemovalPermitData,
  type TreeValuationData,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";
import {
  X,
  Save,
  Trash2,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Loader2,
  Camera,
  Mic,
  PenLine,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreeFormData {
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  tagNumber: string;
  typeSpecificData?: string; // JSON string
}

interface ProtectionResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
}

interface TreeRecord {
  id?: string;
  pinLat?: number;
  pinLng?: number;
  tagNumber?: string | null;
  speciesCommon?: string;
  speciesScientific?: string;
  dbhInches?: number;
  heightFt?: number | null;
  canopySpreadFt?: number | null;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  isProtected?: boolean;
  protectionReason?: string | null;
  isHeritage?: boolean;
  heritageReason?: string | null;
  mitigationRequired?: string | null;
  status?: string;
  typeSpecificData?: string | null;
}

interface TreeSidePanelProps {
  tree: TreeRecord | null;
  treeNumber: number;
  propertyId: string;
  propertyCity: string;
  reportType?: string;
  onSave: (data: TreeFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
}

const ACTION_OPTIONS = [
  { value: "retain", label: "Retain", color: "green" },
  { value: "remove", label: "Remove", color: "red" },
  { value: "prune", label: "Prune", color: "amber" },
  { value: "monitor", label: "Monitor", color: "blue" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSidePanel({
  tree,
  treeNumber,
  propertyId,
  propertyCity,
  reportType,
  onSave,
  onDelete,
  onClose,
  saving = false,
}: TreeSidePanelProps) {
  // ---- Form state ----
  const [tagNumber, setTagNumber] = useState(tree?.tagNumber ?? "");
  const [speciesCommon, setSpeciesCommon] = useState(tree?.speciesCommon ?? "");
  const [speciesScientific, setSpeciesScientific] = useState(
    tree?.speciesScientific ?? ""
  );
  const [dbhInches, setDbhInches] = useState<string>(
    tree?.dbhInches != null ? String(tree.dbhInches) : ""
  );
  const [heightFt, setHeightFt] = useState<string>(
    tree?.heightFt != null ? String(tree.heightFt) : ""
  );
  const [canopySpreadFt, setCanopySpreadFt] = useState<string>(
    tree?.canopySpreadFt != null ? String(tree.canopySpreadFt) : ""
  );
  const [conditionRating, setConditionRating] = useState<number>(
    tree?.conditionRating ?? 0
  );
  const [healthNotes, setHealthNotes] = useState(tree?.healthNotes ?? "");
  const [structuralNotes, setStructuralNotes] = useState(
    tree?.structuralNotes ?? ""
  );
  const [recommendedAction, setRecommendedAction] = useState(
    tree?.recommendedAction ?? ""
  );

  // ---- Type-specific data state ----
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [typeData, setTypeData] = useState<any>(() => {
    if (tree?.typeSpecificData) {
      try {
        return JSON.parse(tree.typeSpecificData);
      } catch {
        return {};
      }
    }
    return {};
  });

  // ---- Protection check state ----
  const [protectionResult, setProtectionResult] =
    useState<ProtectionResult | null>(
      tree?.isProtected != null
        ? {
            isProtected: tree.isProtected,
            reason: tree.protectionReason ?? "",
            isHeritage: tree.isHeritage ?? false,
            heritageReason: tree.heritageReason ?? null,
            mitigationRequired: tree.mitigationRequired ?? null,
            codeReference: null,
          }
        : null
    );
  const [checkingProtection, setCheckingProtection] = useState(false);
  const [overrideProtection, setOverrideProtection] = useState(false);
  const [overrideIsProtected, setOverrideIsProtected] = useState(
    tree?.isProtected ?? false
  );
  const [overrideReason, setOverrideReason] = useState(
    tree?.protectionReason ?? ""
  );

  // ---- Auto-check ordinance debounce ----
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkProtection = useCallback(async () => {
    if (!speciesCommon || !dbhInches || !propertyCity) return;
    setCheckingProtection(true);
    try {
      const params = new URLSearchParams({
        city: propertyCity,
        species: speciesCommon,
        dbh: dbhInches,
      });
      const res = await fetch(`/api/ordinances/check?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to check protection");
      const data: ProtectionResult = await res.json();
      setProtectionResult(data);
    } catch {
      setProtectionResult(null);
    } finally {
      setCheckingProtection(false);
    }
  }, [speciesCommon, dbhInches, propertyCity]);

  // Auto-trigger ordinance check when species + DBH both have values
  useEffect(() => {
    if (!speciesCommon || !dbhInches) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      checkProtection();
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [speciesCommon, dbhInches, checkProtection]);

  // ---- Derived ----
  const isExisting = tree != null && tree.id != null;
  const statusDot =
    tree?.status === "certified"
      ? "bg-emerald-500"
      : tree?.status === "assessed"
        ? "bg-blue-500"
        : "bg-gray-400";

  const reportTypeConfig = reportType
    ? getReportTypeConfig(reportType)
    : undefined;

  // ---- Handlers ----
  function handleSpeciesChange(common: string, scientific: string) {
    setSpeciesCommon(common);
    setSpeciesScientific(scientific);
    setProtectionResult(null);
  }

  function handleSave() {
    const useOverride = overrideProtection;
    onSave({
      speciesCommon,
      speciesScientific,
      dbhInches: Number(dbhInches) || 0,
      heightFt: heightFt ? Number(heightFt) : null,
      canopySpreadFt: canopySpreadFt ? Number(canopySpreadFt) : null,
      conditionRating,
      healthNotes,
      structuralNotes,
      recommendedAction,
      isProtected: useOverride
        ? overrideIsProtected
        : (protectionResult?.isProtected ?? false),
      protectionReason: useOverride
        ? overrideReason || null
        : (protectionResult?.reason ?? null),
      mitigationRequired: useOverride
        ? null
        : (protectionResult?.mitigationRequired ?? null),
      tagNumber,
      typeSpecificData:
        reportType && Object.keys(typeData).length > 0
          ? JSON.stringify(typeData)
          : undefined,
    });
  }

  // ---- Render ----
  return (
    <div className="flex h-full w-96 flex-col border-l bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
          <h2 className="text-lg font-semibold">Tree #{treeNumber}</h2>
          <Input
            placeholder="Tag #"
            value={tagNumber}
            onChange={(e) => setTagNumber(e.target.value)}
            className="h-7 w-20 text-xs font-mono"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Coordinates */}
      {tree?.pinLat != null && tree?.pinLng != null && (
        <div className="border-b px-4 py-2">
          <p className="text-xs text-muted-foreground font-mono">
            {tree.pinLat.toFixed(6)}, {tree.pinLng.toFixed(6)}
          </p>
        </div>
      )}

      {/* Tabbed content */}
      <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="photos" className="text-xs gap-1">
            <Camera className="h-3 w-3" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="audio" className="text-xs gap-1">
            <Mic className="h-3 w-3" />
            Audio
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="flex-1 overflow-y-auto px-4 py-4 space-y-5 mt-0">
        {/* Species */}
        <div className="space-y-2">
          <Label>Species</Label>
          <SpeciesSearch
            value={speciesCommon}
            onChange={handleSpeciesChange}
          />
          {speciesScientific && (
            <p className="text-xs text-muted-foreground italic">
              {speciesScientific}
            </p>
          )}
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="sp-dbh" className="text-xs">
              DBH (in)
            </Label>
            <Input
              id="sp-dbh"
              type="number"
              min="0"
              step="0.5"
              placeholder="0"
              value={dbhInches}
              onChange={(e) => {
                setDbhInches(e.target.value);
                setProtectionResult(null);
              }}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-height" className="text-xs">
              Height (ft)
            </Label>
            <Input
              id="sp-height"
              type="number"
              min="0"
              placeholder="0"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-canopy" className="text-xs">
              Canopy (ft)
            </Label>
            <Input
              id="sp-canopy"
              type="number"
              min="0"
              placeholder="0"
              value={canopySpreadFt}
              onChange={(e) => setCanopySpreadFt(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        {/* Condition Rating */}
        <div className="space-y-2">
          <Label>Condition Rating</Label>
          <ConditionRating
            value={conditionRating}
            onChange={setConditionRating}
            size="sm"
          />
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="sp-health" className="text-xs">
              Health Notes
            </Label>
            <Textarea
              id="sp-health"
              placeholder="Describe observed health conditions..."
              value={healthNotes}
              onChange={(e) => setHealthNotes(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-structural" className="text-xs">
              Structural Notes
            </Label>
            <Textarea
              id="sp-structural"
              placeholder="Describe structural defects or concerns..."
              value={structuralNotes}
              onChange={(e) => setStructuralNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Recommended Action — Pill Buttons */}
        <div className="space-y-1.5">
          <Label className="text-xs">Recommended Action</Label>
          <ButtonSelector
            options={ACTION_OPTIONS}
            value={recommendedAction}
            onChange={setRecommendedAction}
            size="sm"
          />
        </div>

        {/* Protection Status — Auto-check */}
        <div className="space-y-2">
          <Label className="text-xs">Protection Status</Label>

          {/* Loading state */}
          {checkingProtection && (
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking ordinance...</span>
            </div>
          )}

          {/* No data yet — prompt */}
          {!checkingProtection && !protectionResult && (!speciesCommon || !dbhInches) && (
            <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              Enter species and DBH to auto-check protection status.
            </div>
          )}

          {/* Result card */}
          {!checkingProtection && protectionResult && (
            <div
              className={`rounded-lg border-2 p-3 text-sm ${
                protectionResult.isProtected
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-gray-300 bg-gray-50 dark:bg-gray-900/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {protectionResult.isProtected ? (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <ShieldX className="h-5 w-5 shrink-0 text-gray-400" />
                )}
                <span
                  className={`font-semibold ${
                    protectionResult.isProtected
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {protectionResult.isProtected ? "Protected" : "Not Protected"}
                </span>
                {protectionResult.isHeritage && (
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                    Heritage
                  </Badge>
                )}
              </div>
              <p
                className={`mt-1.5 text-xs ${
                  protectionResult.isProtected
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {protectionResult.reason ||
                  `No specific protection under ${propertyCity} ordinance`}
              </p>
              {protectionResult.mitigationRequired && (
                <div className="mt-2 rounded border bg-muted/50 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Mitigation Required
                  </p>
                  <p className="mt-0.5 text-xs">
                    {protectionResult.mitigationRequired}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Arborist Override */}
          <button
            type="button"
            onClick={() => setOverrideProtection((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3 w-3" />
            {overrideProtection ? "Cancel override" : "Override protection status"}
          </button>

          {overrideProtection && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Manual Override
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={overrideIsProtected}
                  onChange={(e) => setOverrideIsProtected(e.target.checked)}
                  className="rounded border-input h-3.5 w-3.5"
                />
                Tree is protected
              </label>
              <Textarea
                placeholder="Reason for protection status..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                rows={2}
                className="text-xs"
              />
            </div>
          )}
        </div>

        {/* ============ Type-Specific Fields ============ */}
        {reportType && reportTypeConfig && (
          <div className="border-t pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {reportTypeConfig.label}
            </p>

            {reportType === "health_assessment" && (
              <HealthAssessmentFields
                data={typeData as HealthAssessmentData}
                onChange={setTypeData}
              />
            )}

            {reportType === "removal_permit" && (
              <RemovalPermitFields
                data={typeData as RemovalPermitData}
                onChange={setTypeData}
              />
            )}

            {reportType === "tree_valuation" && (
              <TreeValuationFields
                data={typeData as TreeValuationData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
                conditionRating={conditionRating}
                speciesCommon={speciesCommon}
              />
            )}

            {reportType === "construction_encroachment" && (
              <ConstructionEncroachmentFields
                data={typeData as ConstructionEncroachmentData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
              />
            )}
          </div>
        )}
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreePhotos propertyId={propertyId} treeId={tree.id} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Camera className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add photos.</p>
            </div>
          )}
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreeAudioNotes propertyId={propertyId} treeId={tree.id} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Mic className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add audio notes.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="flex items-center gap-2 border-t px-4 py-3">
        <Button
          onClick={handleSave}
          disabled={saving || !speciesCommon || !dbhInches}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          )}
        </Button>

        {isExisting && onDelete && (
          <Button
            variant="outline"
            onClick={onDelete}
            disabled={saving}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <Button variant="outline" onClick={onClose} disabled={saving}>
          Close
        </Button>
      </div>
    </div>
  );
}

```

### components/tree-summary-panel.tsx
```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, TreePine, MapPin, ArrowUpDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeSummaryItem {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  speciesCommon: string;
  dbhInches: number | null;
  conditionRating: number | null;
  isProtected: boolean;
  recommendedAction?: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface TreeSummaryPanelProps {
  trees: TreeSummaryItem[];
  selectedTreeId?: string | null;
  onSelectTree: (id: string) => void;
  reportType?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type SortKey = "treeNumber" | "species" | "dbh" | "condition" | "action";
type SortDir = "asc" | "desc";

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_DOT_COLOR: Record<number, string> = {
  0: "bg-gray-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-500",
};

const ACTION_LABELS: Record<string, { label: string; className: string }> = {
  retain: { label: "Retain", className: "bg-green-100 text-green-800" },
  remove: { label: "Remove", className: "bg-red-100 text-red-800" },
  prune: { label: "Prune", className: "bg-amber-100 text-amber-800" },
  monitor: { label: "Monitor", className: "bg-blue-100 text-blue-800" },
};

function getAppraisedValue(typeSpecificData?: string | null): number | null {
  if (!typeSpecificData) return null;
  try {
    const parsed = JSON.parse(typeSpecificData);
    return typeof parsed.appraisedValue === "number"
      ? parsed.appraisedValue
      : null;
  } catch {
    return null;
  }
}

function sortTrees(
  trees: TreeSummaryItem[],
  key: SortKey,
  dir: SortDir
): TreeSummaryItem[] {
  const sorted = [...trees].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "treeNumber":
        cmp = a.treeNumber - b.treeNumber;
        break;
      case "species":
        cmp = (a.speciesCommon || "").localeCompare(b.speciesCommon || "");
        break;
      case "dbh":
        cmp = (a.dbhInches ?? 0) - (b.dbhInches ?? 0);
        break;
      case "condition":
        cmp = (a.conditionRating ?? -1) - (b.conditionRating ?? -1);
        break;
      case "action":
        cmp = (a.recommendedAction || "").localeCompare(
          b.recommendedAction || ""
        );
        break;
    }
    return dir === "asc" ? cmp : -cmp;
  });
  return sorted;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSummaryPanel({
  trees,
  selectedTreeId,
  onSelectTree,
  reportType,
}: TreeSummaryPanelProps) {
  const [sortKey, setSortKey] = useState<SortKey>("treeNumber");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const protectedCount = trees.filter((t) => t.isProtected).length;
  const showValue = reportType === "tree_valuation";
  const sortedTrees = sortTrees(trees, sortKey, sortDir);

  // Scroll selected row into view when selectedTreeId changes
  useEffect(() => {
    if (selectedTreeId && rowRefs.current[selectedTreeId]) {
      rowRefs.current[selectedTreeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedTreeId]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortHeader({
    label,
    sortKeyVal,
    className,
  }: {
    label: string;
    sortKeyVal: SortKey;
    className?: string;
  }) {
    const active = sortKey === sortKeyVal;
    return (
      <th
        className={`px-3 py-2 text-left text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors ${className ?? ""}`}
        onClick={() => handleSort(sortKeyVal)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ArrowUpDown
            className={`h-3 w-3 ${active ? "text-foreground" : "text-muted-foreground/40"}`}
          />
        </span>
      </th>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-emerald-600" />
            Site Overview
          </span>
          <div className="flex items-center gap-2">
            {protectedCount > 0 && (
              <Badge variant="outline" className="text-xs gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                {protectedCount} protected
              </Badge>
            )}
            <Badge variant="secondary">{trees.length} trees</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {trees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2 text-muted-foreground/40" />
            <p>Click the map to add your first tree.</p>
          </div>
        ) : (
          <div className="max-h-72 overflow-y-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <SortHeader label="#" sortKeyVal="treeNumber" className="w-12" />
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-16">
                    Tag
                  </th>
                  <SortHeader label="Species" sortKeyVal="species" />
                  <SortHeader label="DBH" sortKeyVal="dbh" className="w-16" />
                  <SortHeader label="Condition" sortKeyVal="condition" className="w-24" />
                  <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground w-8">
                    <ShieldCheck className="h-3.5 w-3.5 mx-auto" />
                  </th>
                  <SortHeader label="Action" sortKeyVal="action" className="w-20" />
                  {showValue && (
                    <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground w-24">
                      Value
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedTrees.map((tree) => {
                  const isSelected = tree.id === selectedTreeId;
                  const action = tree.recommendedAction
                    ? ACTION_LABELS[tree.recommendedAction]
                    : null;
                  const value = showValue
                    ? getAppraisedValue(tree.typeSpecificData)
                    : null;

                  return (
                    <tr
                      key={tree.id}
                      ref={(el) => {
                        rowRefs.current[tree.id] = el;
                      }}
                      onClick={() => onSelectTree(tree.id)}
                      className={`cursor-pointer transition-colors hover:bg-accent ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/20"
                          : ""
                      }`}
                    >
                      <td className="px-3 py-2 font-mono font-semibold text-xs">
                        {tree.treeNumber}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                        {tree.tagNumber || "—"}
                      </td>
                      <td className="px-3 py-2 truncate max-w-[200px]">
                        {tree.speciesCommon || (
                          <span className="text-muted-foreground italic">
                            Unknown
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">
                        {tree.dbhInches != null ? `${tree.dbhInches}"` : "—"}
                      </td>
                      <td className="px-3 py-2">
                        {tree.conditionRating != null && tree.conditionRating >= 0 ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                CONDITION_DOT_COLOR[tree.conditionRating] ?? "bg-gray-400"
                              }`}
                            />
                            <span className="text-xs">
                              {CONDITION_LABELS[tree.conditionRating] ?? tree.conditionRating}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {tree.isProtected ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-600 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {action ? (
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${action.className}`}
                          >
                            {action.label}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      {showValue && (
                        <td className="px-3 py-2 text-right font-mono text-xs">
                          {value != null ? formatter.format(value) : "—"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

```

### components/type-fields/construction-encroachment-fields.tsx
```tsx
"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTpzRadius,
  calcSrzRadius,
  PROTECTION_MEASURES,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";

interface ConstructionEncroachmentFieldsProps {
  data: ConstructionEncroachmentData;
  onChange: (data: ConstructionEncroachmentData) => void;
  dbhInches: number;
}

const IMPACT_OPTIONS = [
  { value: "none", label: "None", color: "gray" },
  { value: "minor", label: "Minor", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

const MONITORING_OPTIONS = [
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Bi-annually",
];

export function ConstructionEncroachmentFields({
  data,
  onChange,
  dbhInches,
}: ConstructionEncroachmentFieldsProps) {
  const [overrideEnabled, setOverrideEnabled] = useState(
    data.tpzOverride ?? false
  );

  // Auto-calculate TPZ/SRZ when DBH changes
  useEffect(() => {
    if (dbhInches <= 0) return;
    const tpzRadius = calcTpzRadius(dbhInches);
    const srzRadius = calcSrzRadius(dbhInches);

    if (
      Math.abs((data.tpzRadius ?? 0) - tpzRadius) > 0.01 ||
      Math.abs((data.srzRadius ?? 0) - srzRadius) > 0.01
    ) {
      onChange({ ...data, tpzRadius, srzRadius });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbhInches]);

  function update(partial: Partial<ConstructionEncroachmentData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* TPZ/SRZ Display */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            Protection Zones
          </p>
          <button
            type="button"
            onClick={() => {
              setOverrideEnabled(!overrideEnabled);
              update({ tpzOverride: !overrideEnabled });
            }}
            className="text-[10px] text-blue-600 hover:text-blue-800 underline"
          >
            {overrideEnabled ? "Use auto-calc" : "Manual override"}
          </button>
        </div>

        {!overrideEnabled ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">TPZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.tpzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">SRZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.srzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">TPZ</span>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={data.tpzManual ?? data.tpzRadius ?? ""}
                onChange={(e) =>
                  update({
                    tpzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.tpzRadius ?? 0).toFixed(1)})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">SRZ</span>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={data.srzManual ?? data.srzRadius ?? ""}
                onChange={(e) =>
                  update({
                    srzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.srzRadius ?? 0).toFixed(1)})
              </span>
            </div>
          </div>
        )}

        {dbhInches <= 0 && (
          <p className="text-[10px] italic text-blue-600">
            Enter DBH above to calculate zones
          </p>
        )}
      </div>

      {/* Encroachment details */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-encroach-desc" className="text-xs">
          Encroachment Description
        </Label>
        <Textarea
          id="tsd-encroach-desc"
          placeholder="Describe the construction activity within the TPZ..."
          value={data.encroachmentDescription ?? ""}
          onChange={(e) =>
            update({ encroachmentDescription: e.target.value })
          }
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-encroach-pct" className="text-xs">
            Encroachment %
          </Label>
          <Input
            id="tsd-encroach-pct"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="0"
            value={data.encroachmentPercent ?? ""}
            onChange={(e) =>
              update({
                encroachmentPercent: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
        <div /> {/* spacer */}
      </div>

      {/* Impact Assessment */}
      <div className="space-y-1.5">
        <Label className="text-xs">Impact Assessment</Label>
        <ButtonSelector
          options={IMPACT_OPTIONS}
          value={data.impactAssessment ?? ""}
          onChange={(v) =>
            update({
              impactAssessment: v as ConstructionEncroachmentData["impactAssessment"],
            })
          }
          size="sm"
        />
      </div>

      {/* Protection Measures */}
      <div className="space-y-1.5">
        <Label className="text-xs">Protection Measures</Label>
        <MultiCheckbox
          options={[...PROTECTION_MEASURES]}
          selected={data.protectionMeasuresList ?? []}
          onChange={(items) => update({ protectionMeasuresList: items })}
        />
      </div>

      {/* Monitoring Frequency */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-monitoring" className="text-xs">
          Monitoring Frequency
        </Label>
        <select
          id="tsd-monitoring"
          value={data.monitoringFrequency ?? ""}
          onChange={(e) =>
            update({ monitoringFrequency: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {MONITORING_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

```

### components/type-fields/health-assessment-fields.tsx
```tsx
"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTRAQRisk,
  MAINTENANCE_ITEMS,
  type HealthAssessmentData,
} from "@/lib/report-types";

interface HealthAssessmentFieldsProps {
  data: HealthAssessmentData;
  onChange: (data: HealthAssessmentData) => void;
}

const LOF_OPTIONS = [
  { value: "improbable", label: "Improbable", color: "green" },
  { value: "possible", label: "Possible", color: "amber" },
  { value: "probable", label: "Probable", color: "orange" },
  { value: "imminent", label: "Imminent", color: "red" },
];

const LOI_OPTIONS = [
  { value: "very_low", label: "Very Low", color: "green" },
  { value: "low", label: "Low", color: "amber" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "red" },
];

const CONSEQUENCES_OPTIONS = [
  { value: "negligible", label: "Negligible", color: "green" },
  { value: "minor", label: "Minor", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

function riskBadgeColor(risk: string): string {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    case "moderate":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "extreme":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
}

export function HealthAssessmentFields({
  data,
  onChange,
}: HealthAssessmentFieldsProps) {
  function update(partial: Partial<HealthAssessmentData>) {
    onChange({ ...data, ...partial });
  }

  // Auto-calculate risk rating
  useEffect(() => {
    const risk = calcTRAQRisk(
      data.likelihoodOfFailure,
      data.likelihoodOfImpact,
      data.consequences
    );
    if (risk && risk !== data.overallRiskRating) {
      onChange({ ...data, overallRiskRating: risk });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.likelihoodOfFailure, data.likelihoodOfImpact, data.consequences]);

  return (
    <div className="space-y-4">
      {/* TRAQ Risk Assessment */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          TRAQ Risk Assessment
        </p>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Failure</Label>
          <ButtonSelector
            options={LOF_OPTIONS}
            value={data.likelihoodOfFailure ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfFailure: v as HealthAssessmentData["likelihoodOfFailure"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Impact</Label>
          <ButtonSelector
            options={LOI_OPTIONS}
            value={data.likelihoodOfImpact ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfImpact: v as HealthAssessmentData["likelihoodOfImpact"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Consequences</Label>
          <ButtonSelector
            options={CONSEQUENCES_OPTIONS}
            value={data.consequences ?? ""}
            onChange={(v) =>
              update({
                consequences: v as HealthAssessmentData["consequences"],
              })
            }
            size="sm"
          />
        </div>

        {/* Auto-calculated risk rating */}
        {data.overallRiskRating && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Overall Risk:</span>
            <Badge
              className={`border ${riskBadgeColor(data.overallRiskRating)}`}
              variant="outline"
            >
              {data.overallRiskRating.charAt(0).toUpperCase() +
                data.overallRiskRating.slice(1)}
            </Badge>
          </div>
        )}
      </div>

      {/* Target Description */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-target" className="text-xs">
          Target Description
        </Label>
        <Textarea
          id="tsd-target"
          placeholder="Describe the target (people, property, infrastructure)..."
          value={data.targetDescription ?? ""}
          onChange={(e) => update({ targetDescription: e.target.value })}
          rows={2}
        />
      </div>

      {/* Maintenance Items */}
      <div className="space-y-1.5">
        <Label className="text-xs">Maintenance Recommendations</Label>
        <MultiCheckbox
          options={[...MAINTENANCE_ITEMS]}
          selected={data.maintenanceItems ?? []}
          onChange={(items) => update({ maintenanceItems: items })}
        />
      </div>

      {/* Priority & Timeline */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-priority" className="text-xs">
            Priority
          </Label>
          <select
            id="tsd-priority"
            value={data.maintenancePriority ?? ""}
            onChange={(e) =>
              update({
                maintenancePriority: (e.target.value || undefined) as
                  | HealthAssessmentData["maintenancePriority"]
                  | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-timeline" className="text-xs">
            Timeline
          </Label>
          <Input
            id="tsd-timeline"
            placeholder="Within 6 months"
            value={data.maintenanceTimeline ?? ""}
            onChange={(e) => update({ maintenanceTimeline: e.target.value })}
          />
        </div>
      </div>

      {/* Estimated Cost */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost" className="text-xs">
          Estimated Maintenance Cost
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost"
            type="number"
            min="0"
            step="50"
            placeholder="0"
            value={data.estimatedMaintenanceCost ?? ""}
            onChange={(e) =>
              update({
                estimatedMaintenanceCost: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>
    </div>
  );
}

```

### components/type-fields/removal-permit-fields.tsx
```tsx
"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { RISK_FACTORS, type RemovalPermitData } from "@/lib/report-types";

interface RemovalPermitFieldsProps {
  data: RemovalPermitData;
  onChange: (data: RemovalPermitData) => void;
}

const RISK_RATING_OPTIONS = [
  { value: "low", label: "Low", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "high", label: "High", color: "orange" },
  { value: "extreme", label: "Extreme", color: "red" },
];

const RETENTION_OPTIONS = [
  { value: "feasible", label: "Feasible", color: "green" },
  { value: "not_feasible", label: "Not Feasible", color: "red" },
  { value: "feasible_with_conditions", label: "With Conditions", color: "amber" },
];

const LIFESPAN_OPTIONS = [
  "< 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const REMOVAL_REASONS = [
  "Dead/Dying",
  "Hazardous",
  "Disease/Pest",
  "Infrastructure Conflict",
  "Development",
  "Declining Beyond Remediation",
  "Other",
];

export function RemovalPermitFields({
  data,
  onChange,
}: RemovalPermitFieldsProps) {
  function update(partial: Partial<RemovalPermitData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* Risk Rating */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Rating</Label>
        <ButtonSelector
          options={RISK_RATING_OPTIONS}
          value={data.riskRating ?? ""}
          onChange={(v) =>
            update({
              riskRating: v as RemovalPermitData["riskRating"],
            })
          }
          size="sm"
        />
      </div>

      {/* Risk Factors */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Factors</Label>
        <MultiCheckbox
          options={[...RISK_FACTORS]}
          selected={data.riskFactors ?? []}
          onChange={(factors) => update({ riskFactors: factors })}
        />
      </div>

      {/* Primary Removal Reason */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-removal-reason" className="text-xs">
          Primary Removal Reason
        </Label>
        <select
          id="tsd-removal-reason"
          value={data.removalReason ?? ""}
          onChange={(e) => update({ removalReason: e.target.value || undefined })}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select reason...</option>
          {REMOVAL_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Retention Feasibility */}
      <div className="space-y-1.5">
        <Label className="text-xs">Retention Feasibility</Label>
        <ButtonSelector
          options={RETENTION_OPTIONS}
          value={data.retentionFeasibility ?? ""}
          onChange={(v) =>
            update({
              retentionFeasibility: v as RemovalPermitData["retentionFeasibility"],
            })
          }
          size="sm"
        />
        {data.retentionFeasibility === "feasible_with_conditions" && (
          <Textarea
            placeholder="Describe conditions required for retention..."
            value={data.retentionNotes ?? ""}
            onChange={(e) => update({ retentionNotes: e.target.value })}
            rows={2}
            className="mt-2"
          />
        )}
      </div>

      {/* Estimated Remaining Lifespan */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-lifespan" className="text-xs">
          Estimated Remaining Lifespan
        </Label>
        <select
          id="tsd-lifespan"
          value={data.estimatedRemainingLifespan ?? ""}
          onChange={(e) =>
            update({ estimatedRemainingLifespan: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {LIFESPAN_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

```

### components/type-fields/tree-valuation-fields.tsx
```tsx
"use client";

import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  calcTrunkArea,
  calcAppraisedValue,
  conditionToPercent,
  getSpeciesRating,
  type TreeValuationData,
} from "@/lib/report-types";

interface TreeValuationFieldsProps {
  data: TreeValuationData;
  onChange: (data: TreeValuationData) => void;
  dbhInches: number;
  conditionRating: number;
  speciesCommon: string;
}

export function TreeValuationFields({
  data,
  onChange,
  dbhInches,
  conditionRating,
  speciesCommon,
}: TreeValuationFieldsProps) {
  const initializedRef = useRef(false);

  // Auto-populate species rating and condition % on mount (once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const updates: Partial<TreeValuationData> = {};
    if (speciesCommon && data.speciesRating == null) {
      updates.speciesRating = getSpeciesRating(speciesCommon);
    }
    if (conditionRating > 0 && data.conditionRating == null) {
      updates.conditionRating = conditionToPercent(conditionRating);
    }
    if (Object.keys(updates).length > 0) {
      onChange({ ...data, ...updates });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-calculate on DBH or rating changes
  useEffect(() => {
    const trunkArea = dbhInches > 0 ? calcTrunkArea(dbhInches) : 0;
    const costPerSqInch = data.costPerSquareInch ?? 75;
    const speciesRatingVal = data.speciesRating ?? 70;
    const conditionRatingVal = data.conditionRating ?? 70;
    const locationRating = data.locationRating ?? 70;
    const appraisedValue =
      trunkArea > 0
        ? calcAppraisedValue(
            trunkArea,
            costPerSqInch,
            speciesRatingVal,
            conditionRatingVal,
            locationRating
          )
        : 0;

    if (
      Math.abs((data.trunkArea ?? 0) - trunkArea) > 0.01 ||
      Math.abs((data.appraisedValue ?? 0) - appraisedValue) > 0.01
    ) {
      onChange({ ...data, trunkArea, appraisedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dbhInches,
    data.costPerSquareInch,
    data.speciesRating,
    data.conditionRating,
    data.locationRating,
  ]);

  function update(partial: Partial<TreeValuationData>) {
    onChange({ ...data, ...partial });
  }

  const suggestedSpecies = speciesCommon
    ? getSpeciesRating(speciesCommon)
    : null;
  const suggestedCondition =
    conditionRating > 0 ? conditionToPercent(conditionRating) : null;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-4">
      {/* Valuation Method (read-only) */}
      <div className="space-y-1.5">
        <Label className="text-xs">Valuation Method</Label>
        <div className="flex h-9 w-full items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
          CTLA Trunk Formula
        </div>
      </div>

      {/* Rating inputs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-species-rating" className="text-xs">
            Species %
          </Label>
          <Input
            id="tsd-species-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.speciesRating ?? ""}
            onChange={(e) =>
              update({
                speciesRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
          {suggestedSpecies != null && (
            <p className="text-[10px] text-muted-foreground">
              Suggested: {suggestedSpecies}%
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-condition-rating" className="text-xs">
            Condition %
          </Label>
          <Input
            id="tsd-condition-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.conditionRating ?? ""}
            onChange={(e) =>
              update({
                conditionRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
          {suggestedCondition != null && (
            <p className="text-[10px] text-muted-foreground">
              From rating: {suggestedCondition}%
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-location-rating" className="text-xs">
            Location %
          </Label>
          <Input
            id="tsd-location-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.locationRating ?? ""}
            onChange={(e) =>
              update({
                locationRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
      </div>

      {/* Cost per sq inch */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost-sq-in" className="text-xs">
          Cost per Sq Inch (Regional Rate)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost-sq-in"
            type="number"
            min="0"
            step="5"
            placeholder="75"
            value={data.costPerSquareInch ?? ""}
            onChange={(e) =>
              update({
                costPerSquareInch: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>

      {/* Auto-calculated values */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
          Auto-Calculated
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Trunk Area</span>
          <span className="font-mono text-sm font-semibold text-emerald-800">
            {(data.trunkArea ?? 0).toFixed(1)} sq in
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Appraised Value</span>
          <span className="font-mono text-lg font-bold text-emerald-800">
            {formatter.format(data.appraisedValue ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

```

### components/ui/avatar.tsx
```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

### components/ui/badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

### components/ui/button-selector.tsx
```tsx
"use client";

interface ButtonOption {
  value: string;
  label: string;
  color?: string; // Tailwind color prefix e.g. "red", "amber", "green"
}

interface ButtonSelectorProps {
  options: ButtonOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

function getSelectedClasses(color?: string): string {
  switch (color) {
    case "red":
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case "orange":
      return "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case "amber":
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    case "green":
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case "blue":
      return "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    case "gray":
      return "border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  }
}

export function ButtonSelector({
  options,
  value,
  onChange,
  size = "md",
}: ButtonSelectorProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border-2 font-medium transition-colors ${
              isSm ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
            } ${
              isSelected
                ? getSelectedClasses(opt.color)
                : "border-muted hover:border-muted-foreground/40"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

```

### components/ui/button.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

### components/ui/card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

### components/ui/command.tsx
```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

### components/ui/dialog.tsx
```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

### components/ui/dropdown-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

### components/ui/form.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

### components/ui/input.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

### components/ui/label.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

### components/ui/multi-checkbox.tsx
```tsx
"use client";

interface MultiCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2;
}

export function MultiCheckbox({
  options,
  selected,
  onChange,
  columns = 2,
}: MultiCheckboxProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div
      className={`grid gap-x-3 gap-y-1.5 ${
        columns === 2 ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-xs cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded border-input h-3.5 w-3.5"
          />
          <span className="leading-tight">{option}</span>
        </label>
      ))}
    </div>
  );
}

```

### components/ui/popover.tsx
```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

### components/ui/progress.tsx
```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

### components/ui/scroll-area.tsx
```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

### components/ui/select.tsx
```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

### components/ui/separator.tsx
```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

### components/ui/sheet.tsx
```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

### components/ui/table.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

### components/ui/tabs.tsx
```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

### components/ui/textarea.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

### components/ui/tooltip.tsx
```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

### hooks/use-audio-recorder.ts
```ts
"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  duration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob>;
  error: string | null;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveStopRef = useRef<((blob: Blob) => void) | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setDuration(0);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine best supported MIME type
      let mimeType = "audio/webm;codecs=opus";
      if (typeof MediaRecorder !== "undefined") {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          if (MediaRecorder.isTypeSupported("audio/webm")) {
            mimeType = "audio/webm";
          } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
            mimeType = "audio/mp4";
          } else {
            mimeType = ""; // let the browser choose
          }
        }
      }

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        // Stop all tracks
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;

        // Clear interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        setIsRecording(false);

        // Resolve the stop promise
        if (resolveStopRef.current) {
          resolveStopRef.current(blob);
          resolveStopRef.current = null;
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250); // collect chunks every 250ms
      setIsRecording(true);

      // Duration timer
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to start recording";
      setError(msg);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        reject(new Error("No active recording"));
        return;
      }

      resolveStopRef.current = resolve;
      recorder.stop();
    });
  }, []);

  return {
    isRecording,
    duration,
    startRecording,
    stopRecording,
    error,
  };
}

```

### lib/auth.ts
```ts
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

```

### lib/db.ts
```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```

### lib/generated/prisma/browser.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma-related types and utilities in a browser. 
 * Use it to get access to models, enums, and input types.
 * 
 * This file does not contain a `PrismaClient` class, nor several other helpers that are intended as server-side only.
 * See `client.ts` for the standard, server-side entry point.
 *
 * 🟢 You can import this file directly.
 */

import * as Prisma from './internal/prismaNamespaceBrowser'
export { Prisma }
export * as $Enums from './enums'
export * from './enums';
/**
 * Model Arborist
 * 
 */
export type Arborist = Prisma.ArboristModel
/**
 * Model TreeAssessment
 * 
 */
export type TreeAssessment = Prisma.TreeAssessmentModel
/**
 * Model MunicipalOrdinance
 * 
 */
export type MunicipalOrdinance = Prisma.MunicipalOrdinanceModel
/**
 * Model Report
 * 
 */
export type Report = Prisma.ReportModel

```

### lib/generated/prisma/client.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */

import * as process from 'node:process'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))

import * as runtime from "@prisma/client/runtime/client"
import * as $Enums from "./enums"
import * as $Class from "./internal/class"
import * as Prisma from "./internal/prismaNamespace"

export * as $Enums from './enums'
export * from "./enums"
/**
 * ## Prisma Client
 * 
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Arborists
 * const arborists = await prisma.arborist.findMany()
 * ```
 * 
 * Read more in our [docs](https://pris.ly/d/client).
 */
export const PrismaClient = $Class.getPrismaClientClass()
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>
export { Prisma }

/**
 * Model Arborist
 * 
 */
export type Arborist = Prisma.ArboristModel
/**
 * Model TreeAssessment
 * 
 */
export type TreeAssessment = Prisma.TreeAssessmentModel
/**
 * Model MunicipalOrdinance
 * 
 */
export type MunicipalOrdinance = Prisma.MunicipalOrdinanceModel
/**
 * Model Report
 * 
 */
export type Report = Prisma.ReportModel

```

### lib/generated/prisma/commonInputTypes.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file exports various common sort, input & filter types that are not directly linked to a particular model.
 *
 * 🟢 You can import this file directly.
 */

import type * as runtime from "@prisma/client/runtime/client"
import * as $Enums from "./enums"
import type * as Prisma from "./internal/prismaNamespace"


export type StringFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel>
  in?: string[]
  notIn?: string[]
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringFilter<$PrismaModel> | string
}

export type DateTimeFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  in?: Date[] | string[]
  notIn?: Date[] | string[]
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string
}

export type StringNullableFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null
}

export type SortOrderInput = {
  sort: Prisma.SortOrder
  nulls?: Prisma.NullsOrder
}

export type StringWithAggregatesFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel>
  in?: string[]
  notIn?: string[]
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedStringFilter<$PrismaModel>
  _max?: Prisma.NestedStringFilter<$PrismaModel>
}

export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  in?: Date[] | string[]
  notIn?: Date[] | string[]
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedDateTimeFilter<$PrismaModel>
  _max?: Prisma.NestedDateTimeFilter<$PrismaModel>
}

export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _min?: Prisma.NestedStringNullableFilter<$PrismaModel>
  _max?: Prisma.NestedStringNullableFilter<$PrismaModel>
}

export type FloatFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatFilter<$PrismaModel> | number
}

export type FloatNullableFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null
}

export type IntFilter<$PrismaModel = never> = {
  equals?: number | Prisma.IntFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  lte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  not?: Prisma.NestedIntFilter<$PrismaModel> | number
}

export type BoolFilter<$PrismaModel = never> = {
  equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>
  not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean
}

export type DateTimeNullableFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null
  in?: Date[] | string[] | null
  notIn?: Date[] | string[] | null
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
}

export type FloatWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatFilter<$PrismaModel>
  _sum?: Prisma.NestedFloatFilter<$PrismaModel>
  _min?: Prisma.NestedFloatFilter<$PrismaModel>
  _max?: Prisma.NestedFloatFilter<$PrismaModel>
}

export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>
}

export type IntWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.IntFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  lte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatFilter<$PrismaModel>
  _sum?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedIntFilter<$PrismaModel>
  _max?: Prisma.NestedIntFilter<$PrismaModel>
}

export type BoolWithAggregatesFilter<$PrismaModel = never> = {
  equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>
  not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedBoolFilter<$PrismaModel>
  _max?: Prisma.NestedBoolFilter<$PrismaModel>
}

export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null
  in?: Date[] | string[] | null
  notIn?: Date[] | string[] | null
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>
  _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>
}

export type NestedStringFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel>
  in?: string[]
  notIn?: string[]
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringFilter<$PrismaModel> | string
}

export type NestedDateTimeFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  in?: Date[] | string[]
  notIn?: Date[] | string[]
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string
}

export type NestedStringNullableFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null
}

export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel>
  in?: string[]
  notIn?: string[]
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedStringFilter<$PrismaModel>
  _max?: Prisma.NestedStringFilter<$PrismaModel>
}

export type NestedIntFilter<$PrismaModel = never> = {
  equals?: number | Prisma.IntFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  lte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  not?: Prisma.NestedIntFilter<$PrismaModel> | number
}

export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  in?: Date[] | string[]
  notIn?: Date[] | string[]
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedDateTimeFilter<$PrismaModel>
  _max?: Prisma.NestedDateTimeFilter<$PrismaModel>
}

export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  lte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gt?: string | Prisma.StringFieldRefInput<$PrismaModel>
  gte?: string | Prisma.StringFieldRefInput<$PrismaModel>
  contains?: string | Prisma.StringFieldRefInput<$PrismaModel>
  startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>
  not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _min?: Prisma.NestedStringNullableFilter<$PrismaModel>
  _max?: Prisma.NestedStringNullableFilter<$PrismaModel>
}

export type NestedIntNullableFilter<$PrismaModel = never> = {
  equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  lte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null
}

export type NestedFloatFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatFilter<$PrismaModel> | number
}

export type NestedFloatNullableFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null
}

export type NestedBoolFilter<$PrismaModel = never> = {
  equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>
  not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean
}

export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null
  in?: Date[] | string[] | null
  notIn?: Date[] | string[] | null
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
}

export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatFilter<$PrismaModel>
  _sum?: Prisma.NestedFloatFilter<$PrismaModel>
  _min?: Prisma.NestedFloatFilter<$PrismaModel>
  _max?: Prisma.NestedFloatFilter<$PrismaModel>
}

export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>
  not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>
  _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>
}

export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
  equals?: number | Prisma.IntFieldRefInput<$PrismaModel>
  in?: number[]
  notIn?: number[]
  lt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  lte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gt?: number | Prisma.IntFieldRefInput<$PrismaModel>
  gte?: number | Prisma.IntFieldRefInput<$PrismaModel>
  not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _avg?: Prisma.NestedFloatFilter<$PrismaModel>
  _sum?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedIntFilter<$PrismaModel>
  _max?: Prisma.NestedIntFilter<$PrismaModel>
}

export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
  equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>
  not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
  _count?: Prisma.NestedIntFilter<$PrismaModel>
  _min?: Prisma.NestedBoolFilter<$PrismaModel>
  _max?: Prisma.NestedBoolFilter<$PrismaModel>
}

export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
  equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null
  in?: Date[] | string[] | null
  notIn?: Date[] | string[] | null
  lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>
  not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
  _count?: Prisma.NestedIntNullableFilter<$PrismaModel>
  _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>
  _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>
}



```

### lib/generated/prisma/enums.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/



// This file is empty because there are no enums in the schema.
export {}

```

### lib/generated/prisma/internal/class.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */

import * as runtime from "@prisma/client/runtime/client"
import type * as Prisma from "./prismaNamespace"


const config: runtime.GetPrismaClientConfig = {
  "previewFeatures": [],
  "clientVersion": "7.4.2",
  "engineVersion": "94a226be1cf2967af2541cca5529f0f7ba866919",
  "activeProvider": "sqlite",
  "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../lib/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"sqlite\"\n}\n\nmodel Arborist {\n  id                  String   @id @default(cuid())\n  name                String\n  email               String   @unique\n  isaCertificationNum String\n  isaExpirationDate   DateTime\n  companyName         String?\n  phone               String?\n  citiesServed        String   @default(\"[]\") // JSON array stored as string for SQLite\n  createdAt           DateTime @default(now())\n\n  assessments TreeAssessment[]\n  reports     Report[]\n}\n\nmodel TreeAssessment {\n  id              String  @id @default(cuid())\n  arboristId      String\n  propertyAddress String\n  city            String\n  county          String  @default(\"San Mateo\")\n  parcelNumber    String?\n\n  treeSpeciesCommon     String\n  treeSpeciesScientific String\n  dbhInches             Float\n  heightFt              Float?\n  canopySpreadFt        Float?\n  conditionRating       Int // 1-5 scale\n  healthNotes           String?\n  structuralNotes       String?\n\n  isProtected        Boolean @default(false)\n  protectionReason   String?\n  recommendedAction  String  @default(\"retain\") // retain, remove, prune, monitor\n  mitigationRequired String?\n\n  photos      String @default(\"[]\") // JSON array of URLs\n  locationLat Float?\n  locationLng Float?\n\n  status      String    @default(\"draft\") // draft, ai_generated, arborist_reviewed, certified, filed\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n  certifiedAt DateTime?\n\n  arborist Arborist @relation(fields: [arboristId], references: [id])\n  report   Report?\n}\n\nmodel MunicipalOrdinance {\n  id       String @id @default(cuid())\n  cityName String @unique\n  state    String @default(\"CA\")\n\n  protectedSpecies             String   @default(\"[]\") // JSON array with per-species DBH thresholds\n  defaultDbhThresholdNative    Float?\n  defaultDbhThresholdNonnative Float?\n  certifierRequirement         String? // e.g. \"ISA Certified Only\"\n  mitigationRules              String   @default(\"{}\") // JSON\n  heritageTreeRules            String   @default(\"{}\") // JSON\n  permitProcessNotes           String?\n  ordinanceUrl                 String?\n  codeReference                String?\n  lastUpdated                  DateTime @default(now())\n}\n\nmodel Report {\n  id           String @id @default(cuid())\n  assessmentId String @unique\n  arboristId   String\n\n  reportType     String // removal_permit, construction_encroachment, health_assessment, pre_listing\n  aiDraftContent String? // markdown\n  finalContent   String? // markdown after edits\n  citySections   String    @default(\"{}\") // JSON\n  eSignatureText String?\n  certifiedAt    DateTime?\n  pdfUrl         String?\n\n  status String @default(\"draft\") // draft, review, certified, filed\n\n  assessment TreeAssessment @relation(fields: [assessmentId], references: [id])\n  arborist   Arborist       @relation(fields: [arboristId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Arborist\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isaCertificationNum\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isaExpirationDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"companyName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"citiesServed\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"assessments\",\"kind\":\"object\",\"type\":\"TreeAssessment\",\"relationName\":\"ArboristToTreeAssessment\"},{\"name\":\"reports\",\"kind\":\"object\",\"type\":\"Report\",\"relationName\":\"ArboristToReport\"}],\"dbName\":null},\"TreeAssessment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"arboristId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"city\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"county\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parcelNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"treeSpeciesCommon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"treeSpeciesScientific\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dbhInches\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"heightFt\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"canopySpreadFt\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"conditionRating\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"healthNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"structuralNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isProtected\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"protectionReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recommendedAction\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mitigationRequired\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationLat\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"locationLng\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"certifiedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"arborist\",\"kind\":\"object\",\"type\":\"Arborist\",\"relationName\":\"ArboristToTreeAssessment\"},{\"name\":\"report\",\"kind\":\"object\",\"type\":\"Report\",\"relationName\":\"ReportToTreeAssessment\"}],\"dbName\":null},\"MunicipalOrdinance\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cityName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"protectedSpecies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"defaultDbhThresholdNative\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"defaultDbhThresholdNonnative\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"certifierRequirement\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mitigationRules\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"heritageTreeRules\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"permitProcessNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ordinanceUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"codeReference\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastUpdated\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Report\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assessmentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"arboristId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reportType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"aiDraftContent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"finalContent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"citySections\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eSignatureText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"certifiedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"pdfUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assessment\",\"kind\":\"object\",\"type\":\"TreeAssessment\",\"relationName\":\"ReportToTreeAssessment\"},{\"name\":\"arborist\",\"kind\":\"object\",\"type\":\"Arborist\",\"relationName\":\"ArboristToReport\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
config.parameterizationSchema = {
  strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"arborist\",\"assessment\",\"report\",\"assessments\",\"reports\",\"_count\",\"Arborist.findUnique\",\"Arborist.findUniqueOrThrow\",\"Arborist.findFirst\",\"Arborist.findFirstOrThrow\",\"Arborist.findMany\",\"data\",\"Arborist.createOne\",\"Arborist.createMany\",\"Arborist.createManyAndReturn\",\"Arborist.updateOne\",\"Arborist.updateMany\",\"Arborist.updateManyAndReturn\",\"create\",\"update\",\"Arborist.upsertOne\",\"Arborist.deleteOne\",\"Arborist.deleteMany\",\"having\",\"_min\",\"_max\",\"Arborist.groupBy\",\"Arborist.aggregate\",\"TreeAssessment.findUnique\",\"TreeAssessment.findUniqueOrThrow\",\"TreeAssessment.findFirst\",\"TreeAssessment.findFirstOrThrow\",\"TreeAssessment.findMany\",\"TreeAssessment.createOne\",\"TreeAssessment.createMany\",\"TreeAssessment.createManyAndReturn\",\"TreeAssessment.updateOne\",\"TreeAssessment.updateMany\",\"TreeAssessment.updateManyAndReturn\",\"TreeAssessment.upsertOne\",\"TreeAssessment.deleteOne\",\"TreeAssessment.deleteMany\",\"_avg\",\"_sum\",\"TreeAssessment.groupBy\",\"TreeAssessment.aggregate\",\"MunicipalOrdinance.findUnique\",\"MunicipalOrdinance.findUniqueOrThrow\",\"MunicipalOrdinance.findFirst\",\"MunicipalOrdinance.findFirstOrThrow\",\"MunicipalOrdinance.findMany\",\"MunicipalOrdinance.createOne\",\"MunicipalOrdinance.createMany\",\"MunicipalOrdinance.createManyAndReturn\",\"MunicipalOrdinance.updateOne\",\"MunicipalOrdinance.updateMany\",\"MunicipalOrdinance.updateManyAndReturn\",\"MunicipalOrdinance.upsertOne\",\"MunicipalOrdinance.deleteOne\",\"MunicipalOrdinance.deleteMany\",\"MunicipalOrdinance.groupBy\",\"MunicipalOrdinance.aggregate\",\"Report.findUnique\",\"Report.findUniqueOrThrow\",\"Report.findFirst\",\"Report.findFirstOrThrow\",\"Report.findMany\",\"Report.createOne\",\"Report.createMany\",\"Report.createManyAndReturn\",\"Report.updateOne\",\"Report.updateMany\",\"Report.updateManyAndReturn\",\"Report.upsertOne\",\"Report.deleteOne\",\"Report.deleteMany\",\"Report.groupBy\",\"Report.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"assessmentId\",\"arboristId\",\"reportType\",\"aiDraftContent\",\"finalContent\",\"citySections\",\"eSignatureText\",\"certifiedAt\",\"pdfUrl\",\"status\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"cityName\",\"state\",\"protectedSpecies\",\"defaultDbhThresholdNative\",\"defaultDbhThresholdNonnative\",\"certifierRequirement\",\"mitigationRules\",\"heritageTreeRules\",\"permitProcessNotes\",\"ordinanceUrl\",\"codeReference\",\"lastUpdated\",\"propertyAddress\",\"city\",\"county\",\"parcelNumber\",\"treeSpeciesCommon\",\"treeSpeciesScientific\",\"dbhInches\",\"heightFt\",\"canopySpreadFt\",\"conditionRating\",\"healthNotes\",\"structuralNotes\",\"isProtected\",\"protectionReason\",\"recommendedAction\",\"mitigationRequired\",\"photos\",\"locationLat\",\"locationLng\",\"name\",\"email\",\"isaCertificationNum\",\"isaExpirationDate\",\"companyName\",\"phone\",\"citiesServed\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"disconnect\",\"delete\",\"connect\",\"createMany\",\"set\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
  graph: "7wEmQA4GAACNAQAgBwAAjgEAIFEAAIwBADBSAAAPABBTAACMAQAwVAEAAAABX0AAgQEAIYsBAQB-ACGMAQEAAAABjQEBAH4AIY4BQACBAQAhjwEBAIABACGQAQEAgAEAIZEBAQB-ACEBAAAAAQAgHgMAAJIBACAFAACXAQAgUQAAkwEAMFIAAAMAEFMAAJMBADBUAQB-ACFWAQB-ACFcQACQAQAhXgEAfgAhX0AAgQEAIWBAAIEBACF4AQB-ACF5AQB-ACF6AQB-ACF7AQCAAQAhfAEAfgAhfQEAfgAhfggAlAEAIX8IAH8AIYABCAB_ACGBAQIAlQEAIYIBAQCAAQAhgwEBAIABACGEASAAlgEAIYUBAQCAAQAhhgEBAH4AIYcBAQCAAQAhiAEBAH4AIYkBCAB_ACGKAQgAfwAhDAMAAN0BACAFAADeAQAgXAAAmAEAIHsAAJgBACB_AACYAQAggAEAAJgBACCCAQAAmAEAIIMBAACYAQAghQEAAJgBACCHAQAAmAEAIIkBAACYAQAgigEAAJgBACAeAwAAkgEAIAUAAJcBACBRAACTAQAwUgAAAwAQUwAAkwEAMFQBAAAAAVYBAH4AIVxAAJABACFeAQB-ACFfQACBAQAhYEAAgQEAIXgBAH4AIXkBAH4AIXoBAH4AIXsBAIABACF8AQB-ACF9AQB-ACF-CACUAQAhfwgAfwAhgAEIAH8AIYEBAgCVAQAhggEBAIABACGDAQEAgAEAIYQBIACWAQAhhQEBAIABACGGAQEAfgAhhwEBAIABACGIAQEAfgAhiQEIAH8AIYoBCAB_ACEDAAAAAwAgAQAABAAwAgAABQAgEgMAAJIBACAEAACRAQAgUQAAjwEAMFIAAAcAEFMAAI8BADBUAQB-ACFVAQB-ACFWAQB-ACFXAQB-ACFYAQCAAQAhWQEAgAEAIVoBAH4AIVsBAIABACFcQACQAQAhXQEAgAEAIV4BAH4AIV9AAIEBACFgQACBAQAhAQAAAAcAIAcDAADdAQAgBAAA3AEAIFgAAJgBACBZAACYAQAgWwAAmAEAIFwAAJgBACBdAACYAQAgEgMAAJIBACAEAACRAQAgUQAAjwEAMFIAAAcAEFMAAI8BADBUAQAAAAFVAQAAAAFWAQB-ACFXAQB-ACFYAQCAAQAhWQEAgAEAIVoBAH4AIVsBAIABACFcQACQAQAhXQEAgAEAIV4BAH4AIV9AAIEBACFgQACBAQAhAwAAAAcAIAEAAAkAMAIAAAoAIAEAAAADACABAAAABwAgAQAAAAEAIA4GAACNAQAgBwAAjgEAIFEAAIwBADBSAAAPABBTAACMAQAwVAEAfgAhX0AAgQEAIYsBAQB-ACGMAQEAfgAhjQEBAH4AIY4BQACBAQAhjwEBAIABACGQAQEAgAEAIZEBAQB-ACEEBgAA2gEAIAcAANsBACCPAQAAmAEAIJABAACYAQAgAwAAAA8AIAEAABAAMAIAAAEAIAMAAAAPACABAAAQADACAAABACADAAAADwAgAQAAEAAwAgAAAQAgCwYAANgBACAHAADZAQAgVAEAAAABX0AAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgFAAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQEOAAAUACAJVAEAAAABX0AAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgFAAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQEOAAAWADABDgAAFgAwCwYAAL4BACAHAAC_AQAgVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQIAAAABACAOAAAZACAJVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQIAAAAPACAOAAAbACACAAAADwAgDgAAGwAgAwAAAAEAIBUAABQAIBYAABkAIAEAAAABACABAAAADwAgBQgAALsBACAbAAC9AQAgHAAAvAEAII8BAACYAQAgkAEAAJgBACAMUQAAiwEAMFIAACIAEFMAAIsBADBUAQBrACFfQABuACGLAQEAawAhjAEBAGsAIY0BAQBrACGOAUAAbgAhjwEBAGwAIZABAQBsACGRAQEAawAhAwAAAA8AIAEAACEAMBoAACIAIAMAAAAPACABAAAQADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIBsDAAC5AQAgBQAAugEAIFQBAAAAAVYBAAAAAVxAAAAAAV4BAAAAAV9AAAAAAWBAAAAAAXgBAAAAAXkBAAAAAXoBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAX4IAAAAAX8IAAAAAYABCAAAAAGBAQIAAAABggEBAAAAAYMBAQAAAAGEASAAAAABhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBCAAAAAGKAQgAAAABAQ4AACoAIBlUAQAAAAFWAQAAAAFcQAAAAAFeAQAAAAFfQAAAAAFgQAAAAAF4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQgAAAABgQECAAAAAYIBAQAAAAGDAQEAAAABhAEgAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQgAAAABigEIAAAAAQEOAAAsADABDgAALAAwGwMAALIBACAFAACzAQAgVAEAnAEAIVYBAJwBACFcQACeAQAhXgEAnAEAIV9AAJ8BACFgQACfAQAheAEAnAEAIXkBAJwBACF6AQCcAQAhewEAnQEAIXwBAJwBACF9AQCcAQAhfggArwEAIX8IAKkBACGAAQgAqQEAIYEBAgCwAQAhggEBAJ0BACGDAQEAnQEAIYQBIACxAQAhhQEBAJ0BACGGAQEAnAEAIYcBAQCdAQAhiAEBAJwBACGJAQgAqQEAIYoBCACpAQAhAgAAAAUAIA4AAC8AIBlUAQCcAQAhVgEAnAEAIVxAAJ4BACFeAQCcAQAhX0AAnwEAIWBAAJ8BACF4AQCcAQAheQEAnAEAIXoBAJwBACF7AQCdAQAhfAEAnAEAIX0BAJwBACF-CACvAQAhfwgAqQEAIYABCACpAQAhgQECALABACGCAQEAnQEAIYMBAQCdAQAhhAEgALEBACGFAQEAnQEAIYYBAQCcAQAhhwEBAJ0BACGIAQEAnAEAIYkBCACpAQAhigEIAKkBACECAAAAAwAgDgAAMQAgAgAAAAMAIA4AADEAIAMAAAAFACAVAAAqACAWAAAvACABAAAABQAgAQAAAAMAIA8IAACqAQAgGwAArQEAIBwAAKwBACAtAACrAQAgLgAArgEAIFwAAJgBACB7AACYAQAgfwAAmAEAIIABAACYAQAgggEAAJgBACCDAQAAmAEAIIUBAACYAQAghwEAAJgBACCJAQAAmAEAIIoBAACYAQAgHFEAAIIBADBSAAA4ABBTAACCAQAwVAEAawAhVgEAawAhXEAAbQAhXgEAawAhX0AAbgAhYEAAbgAheAEAawAheQEAawAhegEAawAhewEAbAAhfAEAawAhfQEAawAhfggAgwEAIX8IAHoAIYABCAB6ACGBAQIAhAEAIYIBAQBsACGDAQEAbAAhhAEgAIUBACGFAQEAbAAhhgEBAGsAIYcBAQBsACGIAQEAawAhiQEIAHoAIYoBCAB6ACEDAAAAAwAgAQAANwAwGgAAOAAgAwAAAAMAIAEAAAQAMAIAAAUAIBBRAAB9ADBSAAA-ABBTAAB9ADBUAQAAAAFsAQAAAAFtAQB-ACFuAQB-ACFvCAB_ACFwCAB_ACFxAQCAAQAhcgEAfgAhcwEAfgAhdAEAgAEAIXUBAIABACF2AQCAAQAhd0AAgQEAIQEAAAA7ACABAAAAOwAgEFEAAH0AMFIAAD4AEFMAAH0AMFQBAH4AIWwBAH4AIW0BAH4AIW4BAH4AIW8IAH8AIXAIAH8AIXEBAIABACFyAQB-ACFzAQB-ACF0AQCAAQAhdQEAgAEAIXYBAIABACF3QACBAQAhBm8AAJgBACBwAACYAQAgcQAAmAEAIHQAAJgBACB1AACYAQAgdgAAmAEAIAMAAAA-ACABAAA_ADACAAA7ACADAAAAPgAgAQAAPwAwAgAAOwAgAwAAAD4AIAEAAD8AMAIAADsAIA1UAQAAAAFsAQAAAAFtAQAAAAFuAQAAAAFvCAAAAAFwCAAAAAFxAQAAAAFyAQAAAAFzAQAAAAF0AQAAAAF1AQAAAAF2AQAAAAF3QAAAAAEBDgAAQwAgDVQBAAAAAWwBAAAAAW0BAAAAAW4BAAAAAW8IAAAAAXAIAAAAAXEBAAAAAXIBAAAAAXMBAAAAAXQBAAAAAXUBAAAAAXYBAAAAAXdAAAAAAQEOAABFADABDgAARQAwDVQBAJwBACFsAQCcAQAhbQEAnAEAIW4BAJwBACFvCACpAQAhcAgAqQEAIXEBAJ0BACFyAQCcAQAhcwEAnAEAIXQBAJ0BACF1AQCdAQAhdgEAnQEAIXdAAJ8BACECAAAAOwAgDgAASAAgDVQBAJwBACFsAQCcAQAhbQEAnAEAIW4BAJwBACFvCACpAQAhcAgAqQEAIXEBAJ0BACFyAQCcAQAhcwEAnAEAIXQBAJ0BACF1AQCdAQAhdgEAnQEAIXdAAJ8BACECAAAAPgAgDgAASgAgAgAAAD4AIA4AAEoAIAMAAAA7ACAVAABDACAWAABIACABAAAAOwAgAQAAAD4AIAsIAACkAQAgGwAApwEAIBwAAKYBACAtAAClAQAgLgAAqAEAIG8AAJgBACBwAACYAQAgcQAAmAEAIHQAAJgBACB1AACYAQAgdgAAmAEAIBBRAAB5ADBSAABRABBTAAB5ADBUAQBrACFsAQBrACFtAQBrACFuAQBrACFvCAB6ACFwCAB6ACFxAQBsACFyAQBrACFzAQBrACF0AQBsACF1AQBsACF2AQBsACF3QABuACEDAAAAPgAgAQAAUAAwGgAAUQAgAwAAAD4AIAEAAD8AMAIAADsAIAEAAAAKACABAAAACgAgAwAAAAcAIAEAAAkAMAIAAAoAIAMAAAAHACABAAAJADACAAAKACADAAAABwAgAQAACQAwAgAACgAgDwMAAKMBACAEAACiAQAgVAEAAAABVQEAAAABVgEAAAABVwEAAAABWAEAAAABWQEAAAABWgEAAAABWwEAAAABXEAAAAABXQEAAAABXgEAAAABX0AAAAABYEAAAAABAQ4AAFkAIA1UAQAAAAFVAQAAAAFWAQAAAAFXAQAAAAFYAQAAAAFZAQAAAAFaAQAAAAFbAQAAAAFcQAAAAAFdAQAAAAFeAQAAAAFfQAAAAAFgQAAAAAEBDgAAWwAwAQ4AAFsAMA8DAAChAQAgBAAAoAEAIFQBAJwBACFVAQCcAQAhVgEAnAEAIVcBAJwBACFYAQCdAQAhWQEAnQEAIVoBAJwBACFbAQCdAQAhXEAAngEAIV0BAJ0BACFeAQCcAQAhX0AAnwEAIWBAAJ8BACECAAAACgAgDgAAXgAgDVQBAJwBACFVAQCcAQAhVgEAnAEAIVcBAJwBACFYAQCdAQAhWQEAnQEAIVoBAJwBACFbAQCdAQAhXEAAngEAIV0BAJ0BACFeAQCcAQAhX0AAnwEAIWBAAJ8BACECAAAABwAgDgAAYAAgAgAAAAcAIA4AAGAAIAMAAAAKACAVAABZACAWAABeACABAAAACgAgAQAAAAcAIAgIAACZAQAgGwAAmwEAIBwAAJoBACBYAACYAQAgWQAAmAEAIFsAAJgBACBcAACYAQAgXQAAmAEAIBBRAABqADBSAABnABBTAABqADBUAQBrACFVAQBrACFWAQBrACFXAQBrACFYAQBsACFZAQBsACFaAQBrACFbAQBsACFcQABtACFdAQBsACFeAQBrACFfQABuACFgQABuACEDAAAABwAgAQAAZgAwGgAAZwAgAwAAAAcAIAEAAAkAMAIAAAoAIBBRAABqADBSAABnABBTAABqADBUAQBrACFVAQBrACFWAQBrACFXAQBrACFYAQBsACFZAQBsACFaAQBrACFbAQBsACFcQABtACFdAQBsACFeAQBrACFfQABuACFgQABuACEOCAAAcAAgGwAAeAAgHAAAeAAgYQEAAAABYgEAAAAEYwEAAAAEZAEAAAABZQEAAAABZgEAAAABZwEAAAABaAEAdwAhaQEAAAABagEAAAABawEAAAABDggAAHMAIBsAAHYAIBwAAHYAIGEBAAAAAWIBAAAABWMBAAAABWQBAAAAAWUBAAAAAWYBAAAAAWcBAAAAAWgBAHUAIWkBAAAAAWoBAAAAAWsBAAAAAQsIAABzACAbAAB0ACAcAAB0ACBhQAAAAAFiQAAAAAVjQAAAAAVkQAAAAAFlQAAAAAFmQAAAAAFnQAAAAAFoQAByACELCAAAcAAgGwAAcQAgHAAAcQAgYUAAAAABYkAAAAAEY0AAAAAEZEAAAAABZUAAAAABZkAAAAABZ0AAAAABaEAAbwAhCwgAAHAAIBsAAHEAIBwAAHEAIGFAAAAAAWJAAAAABGNAAAAABGRAAAAAAWVAAAAAAWZAAAAAAWdAAAAAAWhAAG8AIQhhAgAAAAFiAgAAAARjAgAAAARkAgAAAAFlAgAAAAFmAgAAAAFnAgAAAAFoAgBwACEIYUAAAAABYkAAAAAEY0AAAAAEZEAAAAABZUAAAAABZkAAAAABZ0AAAAABaEAAcQAhCwgAAHMAIBsAAHQAIBwAAHQAIGFAAAAAAWJAAAAABWNAAAAABWRAAAAAAWVAAAAAAWZAAAAAAWdAAAAAAWhAAHIAIQhhAgAAAAFiAgAAAAVjAgAAAAVkAgAAAAFlAgAAAAFmAgAAAAFnAgAAAAFoAgBzACEIYUAAAAABYkAAAAAFY0AAAAAFZEAAAAABZUAAAAABZkAAAAABZ0AAAAABaEAAdAAhDggAAHMAIBsAAHYAIBwAAHYAIGEBAAAAAWIBAAAABWMBAAAABWQBAAAAAWUBAAAAAWYBAAAAAWcBAAAAAWgBAHUAIWkBAAAAAWoBAAAAAWsBAAAAAQthAQAAAAFiAQAAAAVjAQAAAAVkAQAAAAFlAQAAAAFmAQAAAAFnAQAAAAFoAQB2ACFpAQAAAAFqAQAAAAFrAQAAAAEOCAAAcAAgGwAAeAAgHAAAeAAgYQEAAAABYgEAAAAEYwEAAAAEZAEAAAABZQEAAAABZgEAAAABZwEAAAABaAEAdwAhaQEAAAABagEAAAABawEAAAABC2EBAAAAAWIBAAAABGMBAAAABGQBAAAAAWUBAAAAAWYBAAAAAWcBAAAAAWgBAHgAIWkBAAAAAWoBAAAAAWsBAAAAARBRAAB5ADBSAABRABBTAAB5ADBUAQBrACFsAQBrACFtAQBrACFuAQBrACFvCAB6ACFwCAB6ACFxAQBsACFyAQBrACFzAQBrACF0AQBsACF1AQBsACF2AQBsACF3QABuACENCAAAcwAgGwAAfAAgHAAAfAAgLQAAfAAgLgAAfAAgYQgAAAABYggAAAAFYwgAAAAFZAgAAAABZQgAAAABZggAAAABZwgAAAABaAgAewAhDQgAAHMAIBsAAHwAIBwAAHwAIC0AAHwAIC4AAHwAIGEIAAAAAWIIAAAABWMIAAAABWQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAHsAIQhhCAAAAAFiCAAAAAVjCAAAAAVkCAAAAAFlCAAAAAFmCAAAAAFnCAAAAAFoCAB8ACEQUQAAfQAwUgAAPgAQUwAAfQAwVAEAfgAhbAEAfgAhbQEAfgAhbgEAfgAhbwgAfwAhcAgAfwAhcQEAgAEAIXIBAH4AIXMBAH4AIXQBAIABACF1AQCAAQAhdgEAgAEAIXdAAIEBACELYQEAAAABYgEAAAAEYwEAAAAEZAEAAAABZQEAAAABZgEAAAABZwEAAAABaAEAeAAhaQEAAAABagEAAAABawEAAAABCGEIAAAAAWIIAAAABWMIAAAABWQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAHwAIQthAQAAAAFiAQAAAAVjAQAAAAVkAQAAAAFlAQAAAAFmAQAAAAFnAQAAAAFoAQB2ACFpAQAAAAFqAQAAAAFrAQAAAAEIYUAAAAABYkAAAAAEY0AAAAAEZEAAAAABZUAAAAABZkAAAAABZ0AAAAABaEAAcQAhHFEAAIIBADBSAAA4ABBTAACCAQAwVAEAawAhVgEAawAhXEAAbQAhXgEAawAhX0AAbgAhYEAAbgAheAEAawAheQEAawAhegEAawAhewEAbAAhfAEAawAhfQEAawAhfggAgwEAIX8IAHoAIYABCAB6ACGBAQIAhAEAIYIBAQBsACGDAQEAbAAhhAEgAIUBACGFAQEAbAAhhgEBAGsAIYcBAQBsACGIAQEAawAhiQEIAHoAIYoBCAB6ACENCAAAcAAgGwAAiQEAIBwAAIkBACAtAACJAQAgLgAAiQEAIGEIAAAAAWIIAAAABGMIAAAABGQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAIoBACENCAAAcAAgGwAAcAAgHAAAcAAgLQAAiQEAIC4AAHAAIGECAAAAAWICAAAABGMCAAAABGQCAAAAAWUCAAAAAWYCAAAAAWcCAAAAAWgCAIgBACEFCAAAcAAgGwAAhwEAIBwAAIcBACBhIAAAAAFoIACGAQAhBQgAAHAAIBsAAIcBACAcAACHAQAgYSAAAAABaCAAhgEAIQJhIAAAAAFoIACHAQAhDQgAAHAAIBsAAHAAIBwAAHAAIC0AAIkBACAuAABwACBhAgAAAAFiAgAAAARjAgAAAARkAgAAAAFlAgAAAAFmAgAAAAFnAgAAAAFoAgCIAQAhCGEIAAAAAWIIAAAABGMIAAAABGQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAIkBACENCAAAcAAgGwAAiQEAIBwAAIkBACAtAACJAQAgLgAAiQEAIGEIAAAAAWIIAAAABGMIAAAABGQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAIoBACEMUQAAiwEAMFIAACIAEFMAAIsBADBUAQBrACFfQABuACGLAQEAawAhjAEBAGsAIY0BAQBrACGOAUAAbgAhjwEBAGwAIZABAQBsACGRAQEAawAhDgYAAI0BACAHAACOAQAgUQAAjAEAMFIAAA8AEFMAAIwBADBUAQB-ACFfQACBAQAhiwEBAH4AIYwBAQB-ACGNAQEAfgAhjgFAAIEBACGPAQEAgAEAIZABAQCAAQAhkQEBAH4AIQOSAQAAAwAgkwEAAAMAIJQBAAADACADkgEAAAcAIJMBAAAHACCUAQAABwAgEgMAAJIBACAEAACRAQAgUQAAjwEAMFIAAAcAEFMAAI8BADBUAQB-ACFVAQB-ACFWAQB-ACFXAQB-ACFYAQCAAQAhWQEAgAEAIVoBAH4AIVsBAIABACFcQACQAQAhXQEAgAEAIV4BAH4AIV9AAIEBACFgQACBAQAhCGFAAAAAAWJAAAAABWNAAAAABWRAAAAAAWVAAAAAAWZAAAAAAWdAAAAAAWhAAHQAISADAACSAQAgBQAAlwEAIFEAAJMBADBSAAADABBTAACTAQAwVAEAfgAhVgEAfgAhXEAAkAEAIV4BAH4AIV9AAIEBACFgQACBAQAheAEAfgAheQEAfgAhegEAfgAhewEAgAEAIXwBAH4AIX0BAH4AIX4IAJQBACF_CAB_ACGAAQgAfwAhgQECAJUBACGCAQEAgAEAIYMBAQCAAQAhhAEgAJYBACGFAQEAgAEAIYYBAQB-ACGHAQEAgAEAIYgBAQB-ACGJAQgAfwAhigEIAH8AIZUBAAADACCWAQAAAwAgEAYAAI0BACAHAACOAQAgUQAAjAEAMFIAAA8AEFMAAIwBADBUAQB-ACFfQACBAQAhiwEBAH4AIYwBAQB-ACGNAQEAfgAhjgFAAIEBACGPAQEAgAEAIZABAQCAAQAhkQEBAH4AIZUBAAAPACCWAQAADwAgHgMAAJIBACAFAACXAQAgUQAAkwEAMFIAAAMAEFMAAJMBADBUAQB-ACFWAQB-ACFcQACQAQAhXgEAfgAhX0AAgQEAIWBAAIEBACF4AQB-ACF5AQB-ACF6AQB-ACF7AQCAAQAhfAEAfgAhfQEAfgAhfggAlAEAIX8IAH8AIYABCAB_ACGBAQIAlQEAIYIBAQCAAQAhgwEBAIABACGEASAAlgEAIYUBAQCAAQAhhgEBAH4AIYcBAQCAAQAhiAEBAH4AIYkBCAB_ACGKAQgAfwAhCGEIAAAAAWIIAAAABGMIAAAABGQIAAAAAWUIAAAAAWYIAAAAAWcIAAAAAWgIAIkBACEIYQIAAAABYgIAAAAEYwIAAAAEZAIAAAABZQIAAAABZgIAAAABZwIAAAABaAIAcAAhAmEgAAAAAWggAIcBACEUAwAAkgEAIAQAAJEBACBRAACPAQAwUgAABwAQUwAAjwEAMFQBAH4AIVUBAH4AIVYBAH4AIVcBAH4AIVgBAIABACFZAQCAAQAhWgEAfgAhWwEAgAEAIVxAAJABACFdAQCAAQAhXgEAfgAhX0AAgQEAIWBAAIEBACGVAQAABwAglgEAAAcAIAAAAAABnQEBAAAAAQGdAQEAAAABAZ0BQAAAAAEBnQFAAAAAAQUVAADoAQAgFgAA7gEAIJcBAADpAQAgmAEAAO0BACCbAQAABQAgBRUAAOYBACAWAADrAQAglwEAAOcBACCYAQAA6gEAIJsBAAABACADFQAA6AEAIJcBAADpAQAgmwEAAAUAIAMVAADmAQAglwEAAOcBACCbAQAAAQAgAAAAAAAFnQEIAAAAAaABCAAAAAGhAQgAAAABogEIAAAAAaMBCAAAAAEAAAAAAAWdAQgAAAABoAEIAAAAAaEBCAAAAAGiAQgAAAABowEIAAAAAQWdAQIAAAABoAECAAAAAaEBAgAAAAGiAQIAAAABowECAAAAAQGdASAAAAABBRUAAOEBACAWAADkAQAglwEAAOIBACCYAQAA4wEAIJsBAAABACAHFQAAtAEAIBYAALcBACCXAQAAtQEAIJgBAAC2AQAgmQEAAAcAIJoBAAAHACCbAQAACgAgDQMAAKMBACBUAQAAAAFWAQAAAAFXAQAAAAFYAQAAAAFZAQAAAAFaAQAAAAFbAQAAAAFcQAAAAAFdAQAAAAFeAQAAAAFfQAAAAAFgQAAAAAECAAAACgAgFQAAtAEAIAMAAAAHACAVAAC0AQAgFgAAuAEAIA8AAAAHACADAAChAQAgDgAAuAEAIFQBAJwBACFWAQCcAQAhVwEAnAEAIVgBAJ0BACFZAQCdAQAhWgEAnAEAIVsBAJ0BACFcQACeAQAhXQEAnQEAIV4BAJwBACFfQACfAQAhYEAAnwEAIQ0DAAChAQAgVAEAnAEAIVYBAJwBACFXAQCcAQAhWAEAnQEAIVkBAJ0BACFaAQCcAQAhWwEAnQEAIVxAAJ4BACFdAQCdAQAhXgEAnAEAIV9AAJ8BACFgQACfAQAhAxUAAOEBACCXAQAA4gEAIJsBAAABACADFQAAtAEAIJcBAAC1AQAgmwEAAAoAIAAAAAsVAADMAQAwFgAA0QEAMJcBAADNAQAwmAEAAM4BADCZAQAA0AEAMJoBAADQAQAwmwEAANABADCcAQAAzwEAIJ0BAADQAQAwngEAANIBADCfAQAA0wEAMAsVAADAAQAwFgAAxQEAMJcBAADBAQAwmAEAAMIBADCZAQAAxAEAMJoBAADEAQAwmwEAAMQBADCcAQAAwwEAIJ0BAADEAQAwngEAAMYBADCfAQAAxwEAMA0EAACiAQAgVAEAAAABVQEAAAABVwEAAAABWAEAAAABWQEAAAABWgEAAAABWwEAAAABXEAAAAABXQEAAAABXgEAAAABX0AAAAABYEAAAAABAgAAAAoAIBUAAMsBACADAAAACgAgFQAAywEAIBYAAMoBACABDgAA4AEAMBIDAACSAQAgBAAAkQEAIFEAAI8BADBSAAAHABBTAACPAQAwVAEAAAABVQEAAAABVgEAfgAhVwEAfgAhWAEAgAEAIVkBAIABACFaAQB-ACFbAQCAAQAhXEAAkAEAIV0BAIABACFeAQB-ACFfQACBAQAhYEAAgQEAIQIAAAAKACAOAADKAQAgAgAAAMgBACAOAADJAQAgEFEAAMcBADBSAADIAQAQUwAAxwEAMFQBAH4AIVUBAH4AIVYBAH4AIVcBAH4AIVgBAIABACFZAQCAAQAhWgEAfgAhWwEAgAEAIVxAAJABACFdAQCAAQAhXgEAfgAhX0AAgQEAIWBAAIEBACEQUQAAxwEAMFIAAMgBABBTAADHAQAwVAEAfgAhVQEAfgAhVgEAfgAhVwEAfgAhWAEAgAEAIVkBAIABACFaAQB-ACFbAQCAAQAhXEAAkAEAIV0BAIABACFeAQB-ACFfQACBAQAhYEAAgQEAIQxUAQCcAQAhVQEAnAEAIVcBAJwBACFYAQCdAQAhWQEAnQEAIVoBAJwBACFbAQCdAQAhXEAAngEAIV0BAJ0BACFeAQCcAQAhX0AAnwEAIWBAAJ8BACENBAAAoAEAIFQBAJwBACFVAQCcAQAhVwEAnAEAIVgBAJ0BACFZAQCdAQAhWgEAnAEAIVsBAJ0BACFcQACeAQAhXQEAnQEAIV4BAJwBACFfQACfAQAhYEAAnwEAIQ0EAACiAQAgVAEAAAABVQEAAAABVwEAAAABWAEAAAABWQEAAAABWgEAAAABWwEAAAABXEAAAAABXQEAAAABXgEAAAABX0AAAAABYEAAAAABGQUAALoBACBUAQAAAAFcQAAAAAFeAQAAAAFfQAAAAAFgQAAAAAF4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQgAAAABgQECAAAAAYIBAQAAAAGDAQEAAAABhAEgAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQgAAAABigEIAAAAAQIAAAAFACAVAADXAQAgAwAAAAUAIBUAANcBACAWAADWAQAgAQ4AAN8BADAeAwAAkgEAIAUAAJcBACBRAACTAQAwUgAAAwAQUwAAkwEAMFQBAAAAAVYBAH4AIVxAAJABACFeAQB-ACFfQACBAQAhYEAAgQEAIXgBAH4AIXkBAH4AIXoBAH4AIXsBAIABACF8AQB-ACF9AQB-ACF-CACUAQAhfwgAfwAhgAEIAH8AIYEBAgCVAQAhggEBAIABACGDAQEAgAEAIYQBIACWAQAhhQEBAIABACGGAQEAfgAhhwEBAIABACGIAQEAfgAhiQEIAH8AIYoBCAB_ACECAAAABQAgDgAA1gEAIAIAAADUAQAgDgAA1QEAIBxRAADTAQAwUgAA1AEAEFMAANMBADBUAQB-ACFWAQB-ACFcQACQAQAhXgEAfgAhX0AAgQEAIWBAAIEBACF4AQB-ACF5AQB-ACF6AQB-ACF7AQCAAQAhfAEAfgAhfQEAfgAhfggAlAEAIX8IAH8AIYABCAB_ACGBAQIAlQEAIYIBAQCAAQAhgwEBAIABACGEASAAlgEAIYUBAQCAAQAhhgEBAH4AIYcBAQCAAQAhiAEBAH4AIYkBCAB_ACGKAQgAfwAhHFEAANMBADBSAADUAQAQUwAA0wEAMFQBAH4AIVYBAH4AIVxAAJABACFeAQB-ACFfQACBAQAhYEAAgQEAIXgBAH4AIXkBAH4AIXoBAH4AIXsBAIABACF8AQB-ACF9AQB-ACF-CACUAQAhfwgAfwAhgAEIAH8AIYEBAgCVAQAhggEBAIABACGDAQEAgAEAIYQBIACWAQAhhQEBAIABACGGAQEAfgAhhwEBAIABACGIAQEAfgAhiQEIAH8AIYoBCAB_ACEYVAEAnAEAIVxAAJ4BACFeAQCcAQAhX0AAnwEAIWBAAJ8BACF4AQCcAQAheQEAnAEAIXoBAJwBACF7AQCdAQAhfAEAnAEAIX0BAJwBACF-CACvAQAhfwgAqQEAIYABCACpAQAhgQECALABACGCAQEAnQEAIYMBAQCdAQAhhAEgALEBACGFAQEAnQEAIYYBAQCcAQAhhwEBAJ0BACGIAQEAnAEAIYkBCACpAQAhigEIAKkBACEZBQAAswEAIFQBAJwBACFcQACeAQAhXgEAnAEAIV9AAJ8BACFgQACfAQAheAEAnAEAIXkBAJwBACF6AQCcAQAhewEAnQEAIXwBAJwBACF9AQCcAQAhfggArwEAIX8IAKkBACGAAQgAqQEAIYEBAgCwAQAhggEBAJ0BACGDAQEAnQEAIYQBIACxAQAhhQEBAJ0BACGGAQEAnAEAIYcBAQCdAQAhiAEBAJwBACGJAQgAqQEAIYoBCACpAQAhGQUAALoBACBUAQAAAAFcQAAAAAFeAQAAAAFfQAAAAAFgQAAAAAF4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQgAAAABgQECAAAAAYIBAQAAAAGDAQEAAAABhAEgAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQgAAAABigEIAAAAAQQVAADMAQAwlwEAAM0BADCbAQAA0AEAMJwBAADPAQAgBBUAAMABADCXAQAAwQEAMJsBAADEAQAwnAEAAMMBACAAAAwDAADdAQAgBQAA3gEAIFwAAJgBACB7AACYAQAgfwAAmAEAIIABAACYAQAgggEAAJgBACCDAQAAmAEAIIUBAACYAQAghwEAAJgBACCJAQAAmAEAIIoBAACYAQAgBAYAANoBACAHAADbAQAgjwEAAJgBACCQAQAAmAEAIAcDAADdAQAgBAAA3AEAIFgAAJgBACBZAACYAQAgWwAAmAEAIFwAAJgBACBdAACYAQAgGFQBAAAAAVxAAAAAAV4BAAAAAV9AAAAAAWBAAAAAAXgBAAAAAXkBAAAAAXoBAAAAAXsBAAAAAXwBAAAAAX0BAAAAAX4IAAAAAX8IAAAAAYABCAAAAAGBAQIAAAABggEBAAAAAYMBAQAAAAGEASAAAAABhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEBAAAAAYkBCAAAAAGKAQgAAAABDFQBAAAAAVUBAAAAAVcBAAAAAVgBAAAAAVkBAAAAAVoBAAAAAVsBAAAAAVxAAAAAAV0BAAAAAV4BAAAAAV9AAAAAAWBAAAAAAQoHAADZAQAgVAEAAAABX0AAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgFAAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQIAAAABACAVAADhAQAgAwAAAA8AIBUAAOEBACAWAADlAQAgDAAAAA8AIAcAAL8BACAOAADlAQAgVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQoHAAC_AQAgVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQoGAADYAQAgVAEAAAABX0AAAAABiwEBAAAAAYwBAQAAAAGNAQEAAAABjgFAAAAAAY8BAQAAAAGQAQEAAAABkQEBAAAAAQIAAAABACAVAADmAQAgGgMAALkBACBUAQAAAAFWAQAAAAFcQAAAAAFeAQAAAAFfQAAAAAFgQAAAAAF4AQAAAAF5AQAAAAF6AQAAAAF7AQAAAAF8AQAAAAF9AQAAAAF-CAAAAAF_CAAAAAGAAQgAAAABgQECAAAAAYIBAQAAAAGDAQEAAAABhAEgAAAAAYUBAQAAAAGGAQEAAAABhwEBAAAAAYgBAQAAAAGJAQgAAAABigEIAAAAAQIAAAAFACAVAADoAQAgAwAAAA8AIBUAAOYBACAWAADsAQAgDAAAAA8AIAYAAL4BACAOAADsAQAgVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQoGAAC-AQAgVAEAnAEAIV9AAJ8BACGLAQEAnAEAIYwBAQCcAQAhjQEBAJwBACGOAUAAnwEAIY8BAQCdAQAhkAEBAJ0BACGRAQEAnAEAIQMAAAADACAVAADoAQAgFgAA7wEAIBwAAAADACADAACyAQAgDgAA7wEAIFQBAJwBACFWAQCcAQAhXEAAngEAIV4BAJwBACFfQACfAQAhYEAAnwEAIXgBAJwBACF5AQCcAQAhegEAnAEAIXsBAJ0BACF8AQCcAQAhfQEAnAEAIX4IAK8BACF_CACpAQAhgAEIAKkBACGBAQIAsAEAIYIBAQCdAQAhgwEBAJ0BACGEASAAsQEAIYUBAQCdAQAhhgEBAJwBACGHAQEAnQEAIYgBAQCcAQAhiQEIAKkBACGKAQgAqQEAIRoDAACyAQAgVAEAnAEAIVYBAJwBACFcQACeAQAhXgEAnAEAIV9AAJ8BACFgQACfAQAheAEAnAEAIXkBAJwBACF6AQCcAQAhewEAnQEAIXwBAJwBACF9AQCcAQAhfggArwEAIX8IAKkBACGAAQgAqQEAIYEBAgCwAQAhggEBAJ0BACGDAQEAnQEAIYQBIACxAQAhhQEBAJ0BACGGAQEAnAEAIYcBAQCdAQAhiAEBAJwBACGJAQgAqQEAIYoBCACpAQAhAwYGAgcLAwgABAIDAAEFCAMCAwABBAACAgYMAAcNAAAAAAMIAAkbAAocAAsAAAADCAAJGwAKHAALAQMAAQEDAAEFCAAQGwATHAAULQARLgASAAAAAAAFCAAQGwATHAAULQARLgASAAAABQgAGhsAHRwAHi0AGy4AHAAAAAAABQgAGhsAHRwAHi0AGy4AHAIDAAEEAAICAwABBAACAwgAIxsAJBwAJQAAAAMIACMbACQcACUJAgEKDgELEQEMEgENEwEPFQEQFwURGAYSGgETHAUUHQcXHgEYHwEZIAUdIwgeJAwfJQIgJgIhJwIiKAIjKQIkKwIlLQUmLg0nMAIoMgUpMw4qNAIrNQIsNgUvOQ8wOhUxPBYyPRYzQBY0QRY1QhY2RBY3RgU4Rxc5SRY6SwU7TBg8TRY9ThY-TwU_UhlAUx9BVANCVQNDVgNEVwNFWANGWgNHXAVIXSBJXwNKYQVLYiFMYwNNZANOZQVPaCJQaSY"
}

async function decodeBase64AsWasm(wasmBase64: string): Promise<WebAssembly.Module> {
  const { Buffer } = await import('node:buffer')
  const wasmArray = Buffer.from(wasmBase64, 'base64')
  return new WebAssembly.Module(wasmArray)
}

config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.mjs"),

  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.sqlite.wasm-base64.mjs")
    return await decodeBase64AsWasm(wasm)
  },

  importName: "./query_compiler_fast_bg.js"
}



export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> =
  'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never

export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   * 
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Arborists
   * const arborists = await prisma.arborist.findMany()
   * ```
   * 
   * Read more in our [docs](https://pris.ly/d/client).
   */

  new <
    Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    LogOpts extends LogOptions<Options> = LogOptions<Options>,
    OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends { omit: infer U } ? U : Prisma.PrismaClientOptions['omit'],
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options: Prisma.Subset<Options, Prisma.PrismaClientOptions> ): PrismaClient<LogOpts, OmitOpts, ExtArgs>
}

/**
 * ## Prisma Client
 * 
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Arborists
 * const arborists = await prisma.arborist.findMany()
 * ```
 * 
 * Read more in our [docs](https://pris.ly/d/client).
 */

export interface PrismaClient<
  in LogOpts extends Prisma.LogLevel = never,
  in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined,
  in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>

  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.arborist`: Exposes CRUD operations for the **Arborist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Arborists
    * const arborists = await prisma.arborist.findMany()
    * ```
    */
  get arborist(): Prisma.ArboristDelegate<ExtArgs, { omit: OmitOpts }>;

  /**
   * `prisma.treeAssessment`: Exposes CRUD operations for the **TreeAssessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreeAssessments
    * const treeAssessments = await prisma.treeAssessment.findMany()
    * ```
    */
  get treeAssessment(): Prisma.TreeAssessmentDelegate<ExtArgs, { omit: OmitOpts }>;

  /**
   * `prisma.municipalOrdinance`: Exposes CRUD operations for the **MunicipalOrdinance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MunicipalOrdinances
    * const municipalOrdinances = await prisma.municipalOrdinance.findMany()
    * ```
    */
  get municipalOrdinance(): Prisma.MunicipalOrdinanceDelegate<ExtArgs, { omit: OmitOpts }>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, { omit: OmitOpts }>;
}

export function getPrismaClientClass(): PrismaClientConstructor {
  return runtime.getPrismaClient(config) as unknown as PrismaClientConstructor
}

```

### lib/generated/prisma/internal/prismaNamespace.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */

import * as runtime from "@prisma/client/runtime/client"
import type * as Prisma from "../models"
import { type PrismaClient } from "./class"

export type * from '../models'

export type DMMF = typeof runtime.DMMF

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

/**
 * Prisma Errors
 */

export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

export const PrismaClientValidationError = runtime.PrismaClientValidationError
export type PrismaClientValidationError = runtime.PrismaClientValidationError

/**
 * Re-export of sql-template-tag
 */
export const sql = runtime.sqltag
export const empty = runtime.empty
export const join = runtime.join
export const raw = runtime.raw
export const Sql = runtime.Sql
export type Sql = runtime.Sql



/**
 * Decimal.js
 */
export const Decimal = runtime.Decimal
export type Decimal = runtime.Decimal

export type DecimalJsLike = runtime.DecimalJsLike

/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs
export const getExtensionContext = runtime.Extensions.getExtensionContext
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

export type PrismaVersion = {
  client: string
  engine: string
}

/**
 * Prisma Client JS version: 7.4.2
 * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
 */
export const prismaVersion: PrismaVersion = {
  client: "7.4.2",
  engine: "94a226be1cf2967af2541cca5529f0f7ba866919"
}

/**
 * Utility Types
 */

export type Bytes = runtime.Bytes
export type JsonObject = runtime.JsonObject
export type JsonArray = runtime.JsonArray
export type JsonValue = runtime.JsonValue
export type InputJsonObject = runtime.InputJsonObject
export type InputJsonArray = runtime.InputJsonArray
export type InputJsonValue = runtime.InputJsonValue


export const NullTypes = {
  DbNull: runtime.NullTypes.DbNull as (new (secret: never) => typeof runtime.DbNull),
  JsonNull: runtime.NullTypes.JsonNull as (new (secret: never) => typeof runtime.JsonNull),
  AnyNull: runtime.NullTypes.AnyNull as (new (secret: never) => typeof runtime.AnyNull),
}
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const DbNull = runtime.DbNull

/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const JsonNull = runtime.JsonNull

/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const AnyNull = runtime.AnyNull


type SelectAndInclude = {
  select: any
  include: any
}

type SelectAndOmit = {
  select: any
  omit: any
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

export type Enumerable<T> = T | Array<T>;

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
} &
  (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {})

/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
} &
  K

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> =
  T extends object ?
  U extends object ?
    (Without<T, U> & U) | (Without<U, T> & T)
  : U : T


/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any>
? False
: T extends Date
? False
: T extends Uint8Array
? False
: T extends BigInt
? False
: T extends object
? True
: False


/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

/**
 * From ts-toolbelt
 */

type __Either<O extends object, K extends Key> = Omit<O, K> &
  {
    // Merge all but K
    [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
  }[K]

type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

type _Either<
  O extends object,
  K extends Key,
  strict extends Boolean
> = {
  1: EitherStrict<O, K>
  0: EitherLoose<O, K>
}[strict]

export type Either<
  O extends object,
  K extends Key,
  strict extends Boolean = 1
> = O extends unknown ? _Either<O, K, strict> : never

export type Union = any

export type PatchUndefined<O extends object, O1 extends object> = {
  [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
} & {}

/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};

type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;

type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];

export type ComputeRaw<A extends any> = A extends Function ? A : {
  [K in keyof A]: A[K];
} & {};

export type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

// cause typescript not to expand types and preserve names
type NoExpand<T> = T extends unknown ? T : never;

// this type assumes the passed object is entirely optional
export type AtLeast<O extends object, K extends string> = NoExpand<
  O extends unknown
  ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
    | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
  : never>;

type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/

export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

export type Boolean = True | False

export type True = 1

export type False = 0

export type Not<B extends Boolean> = {
  0: 1
  1: 0
}[B]

export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0 // anything `never` is false
  : A1 extends A2
  ? 1
  : 0

export type Has<U extends Union, U1 extends Union> = Not<
  Extends<Exclude<U1, U>, U1>
>

export type Or<B1 extends Boolean, B2 extends Boolean> = {
  0: {
    0: 0
    1: 1
  }
  1: {
    0: 1
    1: 1
  }
}[B1][B2]

export type Keys<U extends Union> = U extends unknown ? keyof U : never

export type GetScalarType<T, O> = O extends object ? {
  [P in keyof T]: P extends keyof O
    ? O[P]
    : never
} : never

type FieldPaths<
  T,
  U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
> = IsObject<T> extends True ? U : T

export type GetHavingFields<T> = {
  [K in keyof T]: Or<
    Or<Extends<'OR', K>, Extends<'AND', K>>,
    Extends<'NOT', K>
  > extends True
    ? // infer is only needed to not hit TS limit
      // based on the brilliant idea of Pierre-Antoine Mills
      // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
      T[K] extends infer TK
      ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
      : never
    : {} extends FieldPaths<T[K]>
    ? never
    : K
}[keyof T]

/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


export const ModelName = {
  Arborist: 'Arborist',
  TreeAssessment: 'TreeAssessment',
  MunicipalOrdinance: 'MunicipalOrdinance',
  Report: 'Report'
} as const

export type ModelName = (typeof ModelName)[keyof typeof ModelName]



export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
  returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>
}

export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
  globalOmitOptions: {
    omit: GlobalOmitOptions
  }
  meta: {
    modelProps: "arborist" | "treeAssessment" | "municipalOrdinance" | "report"
    txIsolationLevel: TransactionIsolationLevel
  }
  model: {
    Arborist: {
      payload: Prisma.$ArboristPayload<ExtArgs>
      fields: Prisma.ArboristFieldRefs
      operations: {
        findUnique: {
          args: Prisma.ArboristFindUniqueArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload> | null
        }
        findUniqueOrThrow: {
          args: Prisma.ArboristFindUniqueOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        findFirst: {
          args: Prisma.ArboristFindFirstArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload> | null
        }
        findFirstOrThrow: {
          args: Prisma.ArboristFindFirstOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        findMany: {
          args: Prisma.ArboristFindManyArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>[]
        }
        create: {
          args: Prisma.ArboristCreateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        createMany: {
          args: Prisma.ArboristCreateManyArgs<ExtArgs>
          result: BatchPayload
        }
        createManyAndReturn: {
          args: Prisma.ArboristCreateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>[]
        }
        delete: {
          args: Prisma.ArboristDeleteArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        update: {
          args: Prisma.ArboristUpdateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        deleteMany: {
          args: Prisma.ArboristDeleteManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateMany: {
          args: Prisma.ArboristUpdateManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateManyAndReturn: {
          args: Prisma.ArboristUpdateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>[]
        }
        upsert: {
          args: Prisma.ArboristUpsertArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ArboristPayload>
        }
        aggregate: {
          args: Prisma.ArboristAggregateArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.AggregateArborist>
        }
        groupBy: {
          args: Prisma.ArboristGroupByArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.ArboristGroupByOutputType>[]
        }
        count: {
          args: Prisma.ArboristCountArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.ArboristCountAggregateOutputType> | number
        }
      }
    }
    TreeAssessment: {
      payload: Prisma.$TreeAssessmentPayload<ExtArgs>
      fields: Prisma.TreeAssessmentFieldRefs
      operations: {
        findUnique: {
          args: Prisma.TreeAssessmentFindUniqueArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload> | null
        }
        findUniqueOrThrow: {
          args: Prisma.TreeAssessmentFindUniqueOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        findFirst: {
          args: Prisma.TreeAssessmentFindFirstArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload> | null
        }
        findFirstOrThrow: {
          args: Prisma.TreeAssessmentFindFirstOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        findMany: {
          args: Prisma.TreeAssessmentFindManyArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>[]
        }
        create: {
          args: Prisma.TreeAssessmentCreateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        createMany: {
          args: Prisma.TreeAssessmentCreateManyArgs<ExtArgs>
          result: BatchPayload
        }
        createManyAndReturn: {
          args: Prisma.TreeAssessmentCreateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>[]
        }
        delete: {
          args: Prisma.TreeAssessmentDeleteArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        update: {
          args: Prisma.TreeAssessmentUpdateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        deleteMany: {
          args: Prisma.TreeAssessmentDeleteManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateMany: {
          args: Prisma.TreeAssessmentUpdateManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateManyAndReturn: {
          args: Prisma.TreeAssessmentUpdateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>[]
        }
        upsert: {
          args: Prisma.TreeAssessmentUpsertArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$TreeAssessmentPayload>
        }
        aggregate: {
          args: Prisma.TreeAssessmentAggregateArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.AggregateTreeAssessment>
        }
        groupBy: {
          args: Prisma.TreeAssessmentGroupByArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.TreeAssessmentGroupByOutputType>[]
        }
        count: {
          args: Prisma.TreeAssessmentCountArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.TreeAssessmentCountAggregateOutputType> | number
        }
      }
    }
    MunicipalOrdinance: {
      payload: Prisma.$MunicipalOrdinancePayload<ExtArgs>
      fields: Prisma.MunicipalOrdinanceFieldRefs
      operations: {
        findUnique: {
          args: Prisma.MunicipalOrdinanceFindUniqueArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload> | null
        }
        findUniqueOrThrow: {
          args: Prisma.MunicipalOrdinanceFindUniqueOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        findFirst: {
          args: Prisma.MunicipalOrdinanceFindFirstArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload> | null
        }
        findFirstOrThrow: {
          args: Prisma.MunicipalOrdinanceFindFirstOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        findMany: {
          args: Prisma.MunicipalOrdinanceFindManyArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>[]
        }
        create: {
          args: Prisma.MunicipalOrdinanceCreateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        createMany: {
          args: Prisma.MunicipalOrdinanceCreateManyArgs<ExtArgs>
          result: BatchPayload
        }
        createManyAndReturn: {
          args: Prisma.MunicipalOrdinanceCreateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>[]
        }
        delete: {
          args: Prisma.MunicipalOrdinanceDeleteArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        update: {
          args: Prisma.MunicipalOrdinanceUpdateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        deleteMany: {
          args: Prisma.MunicipalOrdinanceDeleteManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateMany: {
          args: Prisma.MunicipalOrdinanceUpdateManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateManyAndReturn: {
          args: Prisma.MunicipalOrdinanceUpdateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>[]
        }
        upsert: {
          args: Prisma.MunicipalOrdinanceUpsertArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$MunicipalOrdinancePayload>
        }
        aggregate: {
          args: Prisma.MunicipalOrdinanceAggregateArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.AggregateMunicipalOrdinance>
        }
        groupBy: {
          args: Prisma.MunicipalOrdinanceGroupByArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.MunicipalOrdinanceGroupByOutputType>[]
        }
        count: {
          args: Prisma.MunicipalOrdinanceCountArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.MunicipalOrdinanceCountAggregateOutputType> | number
        }
      }
    }
    Report: {
      payload: Prisma.$ReportPayload<ExtArgs>
      fields: Prisma.ReportFieldRefs
      operations: {
        findUnique: {
          args: Prisma.ReportFindUniqueArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload> | null
        }
        findUniqueOrThrow: {
          args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        findFirst: {
          args: Prisma.ReportFindFirstArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload> | null
        }
        findFirstOrThrow: {
          args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        findMany: {
          args: Prisma.ReportFindManyArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[]
        }
        create: {
          args: Prisma.ReportCreateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        createMany: {
          args: Prisma.ReportCreateManyArgs<ExtArgs>
          result: BatchPayload
        }
        createManyAndReturn: {
          args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[]
        }
        delete: {
          args: Prisma.ReportDeleteArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        update: {
          args: Prisma.ReportUpdateArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        deleteMany: {
          args: Prisma.ReportDeleteManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateMany: {
          args: Prisma.ReportUpdateManyArgs<ExtArgs>
          result: BatchPayload
        }
        updateManyAndReturn: {
          args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>[]
        }
        upsert: {
          args: Prisma.ReportUpsertArgs<ExtArgs>
          result: runtime.Types.Utils.PayloadToResult<Prisma.$ReportPayload>
        }
        aggregate: {
          args: Prisma.ReportAggregateArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.AggregateReport>
        }
        groupBy: {
          args: Prisma.ReportGroupByArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.ReportGroupByOutputType>[]
        }
        count: {
          args: Prisma.ReportCountArgs<ExtArgs>
          result: runtime.Types.Utils.Optional<Prisma.ReportCountAggregateOutputType> | number
        }
      }
    }
  }
} & {
  other: {
    payload: any
    operations: {
      $executeRaw: {
        args: [query: TemplateStringsArray | Sql, ...values: any[]],
        result: any
      }
      $executeRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
      }
      $queryRaw: {
        args: [query: TemplateStringsArray | Sql, ...values: any[]],
        result: any
      }
      $queryRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
      }
    }
  }
}

/**
 * Enums
 */

export const TransactionIsolationLevel = runtime.makeStrictEnum({
  Serializable: 'Serializable'
} as const)

export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


export const ArboristScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  isaCertificationNum: 'isaCertificationNum',
  isaExpirationDate: 'isaExpirationDate',
  companyName: 'companyName',
  phone: 'phone',
  citiesServed: 'citiesServed',
  createdAt: 'createdAt'
} as const

export type ArboristScalarFieldEnum = (typeof ArboristScalarFieldEnum)[keyof typeof ArboristScalarFieldEnum]


export const TreeAssessmentScalarFieldEnum = {
  id: 'id',
  arboristId: 'arboristId',
  propertyAddress: 'propertyAddress',
  city: 'city',
  county: 'county',
  parcelNumber: 'parcelNumber',
  treeSpeciesCommon: 'treeSpeciesCommon',
  treeSpeciesScientific: 'treeSpeciesScientific',
  dbhInches: 'dbhInches',
  heightFt: 'heightFt',
  canopySpreadFt: 'canopySpreadFt',
  conditionRating: 'conditionRating',
  healthNotes: 'healthNotes',
  structuralNotes: 'structuralNotes',
  isProtected: 'isProtected',
  protectionReason: 'protectionReason',
  recommendedAction: 'recommendedAction',
  mitigationRequired: 'mitigationRequired',
  photos: 'photos',
  locationLat: 'locationLat',
  locationLng: 'locationLng',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  certifiedAt: 'certifiedAt'
} as const

export type TreeAssessmentScalarFieldEnum = (typeof TreeAssessmentScalarFieldEnum)[keyof typeof TreeAssessmentScalarFieldEnum]


export const MunicipalOrdinanceScalarFieldEnum = {
  id: 'id',
  cityName: 'cityName',
  state: 'state',
  protectedSpecies: 'protectedSpecies',
  defaultDbhThresholdNative: 'defaultDbhThresholdNative',
  defaultDbhThresholdNonnative: 'defaultDbhThresholdNonnative',
  certifierRequirement: 'certifierRequirement',
  mitigationRules: 'mitigationRules',
  heritageTreeRules: 'heritageTreeRules',
  permitProcessNotes: 'permitProcessNotes',
  ordinanceUrl: 'ordinanceUrl',
  codeReference: 'codeReference',
  lastUpdated: 'lastUpdated'
} as const

export type MunicipalOrdinanceScalarFieldEnum = (typeof MunicipalOrdinanceScalarFieldEnum)[keyof typeof MunicipalOrdinanceScalarFieldEnum]


export const ReportScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  arboristId: 'arboristId',
  reportType: 'reportType',
  aiDraftContent: 'aiDraftContent',
  finalContent: 'finalContent',
  citySections: 'citySections',
  eSignatureText: 'eSignatureText',
  certifiedAt: 'certifiedAt',
  pdfUrl: 'pdfUrl',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} as const

export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


export const SortOrder = {
  asc: 'asc',
  desc: 'desc'
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export const NullsOrder = {
  first: 'first',
  last: 'last'
} as const

export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]



/**
 * Field references
 */


/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    

/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
  count: number
}

export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>
export type DefaultPrismaClient = PrismaClient
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
export type PrismaClientOptions = ({
  /**
   * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
   */
  adapter: runtime.SqlDriverAdapterFactory
  accelerateUrl?: never
} | {
  /**
   * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
   */
  accelerateUrl: string
  adapter?: never
}) & {
  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat
  /**
   * @example
   * ```
   * // Shorthand for `emit: 'stdout'`
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events only
   * log: [
   *   { emit: 'event', level: 'query' },
   *   { emit: 'event', level: 'info' },
   *   { emit: 'event', level: 'warn' }
   *   { emit: 'event', level: 'error' }
   * ]
   * 
   * / Emit as events and log to stdout
   * og: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * 
   * ```
   * Read more in our [docs](https://pris.ly/d/logging).
   */
  log?: (LogLevel | LogDefinition)[]
  /**
   * The default values for transactionOptions
   * maxWait ?= 2000
   * timeout ?= 5000
   */
  transactionOptions?: {
    maxWait?: number
    timeout?: number
    isolationLevel?: TransactionIsolationLevel
  }
  /**
   * Global configuration for omitting model fields by default.
   * 
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   omit: {
   *     user: {
   *       password: true
   *     }
   *   }
   * })
   * ```
   */
  omit?: GlobalOmitConfig
  /**
   * SQL commenter plugins that add metadata to SQL queries as comments.
   * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
   * 
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter,
   *   comments: [
   *     traceContext(),
   *     queryInsights(),
   *   ],
   * })
   * ```
   */
  comments?: runtime.SqlCommenterPlugin[]
}
export type GlobalOmitConfig = {
  arborist?: Prisma.ArboristOmit
  treeAssessment?: Prisma.TreeAssessmentOmit
  municipalOrdinance?: Prisma.MunicipalOrdinanceOmit
  report?: Prisma.ReportOmit
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

export type GetLogType<T> = CheckIsLogLevel<
  T extends LogDefinition ? T['level'] : T
>;

export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
  ? GetLogType<T[number]>
  : never;

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findUnique'
  | 'findUniqueOrThrow'
  | 'findMany'
  | 'findFirst'
  | 'findFirstOrThrow'
  | 'create'
  | 'createMany'
  | 'createManyAndReturn'
  | 'update'
  | 'updateMany'
  | 'updateManyAndReturn'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'
  | 'count'
  | 'runCommandRaw'
  | 'findRaw'
  | 'groupBy'

/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>


```

### lib/generated/prisma/internal/prismaNamespaceBrowser.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the browser.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */

import * as runtime from "@prisma/client/runtime/index-browser"

export type * from '../models'
export type * from './prismaNamespace'

export const Decimal = runtime.Decimal


export const NullTypes = {
  DbNull: runtime.NullTypes.DbNull as (new (secret: never) => typeof runtime.DbNull),
  JsonNull: runtime.NullTypes.JsonNull as (new (secret: never) => typeof runtime.JsonNull),
  AnyNull: runtime.NullTypes.AnyNull as (new (secret: never) => typeof runtime.AnyNull),
}
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const DbNull = runtime.DbNull

/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const JsonNull = runtime.JsonNull

/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const AnyNull = runtime.AnyNull


export const ModelName = {
  Arborist: 'Arborist',
  TreeAssessment: 'TreeAssessment',
  MunicipalOrdinance: 'MunicipalOrdinance',
  Report: 'Report'
} as const

export type ModelName = (typeof ModelName)[keyof typeof ModelName]

/*
 * Enums
 */

export const TransactionIsolationLevel = runtime.makeStrictEnum({
  Serializable: 'Serializable'
} as const)

export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


export const ArboristScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  isaCertificationNum: 'isaCertificationNum',
  isaExpirationDate: 'isaExpirationDate',
  companyName: 'companyName',
  phone: 'phone',
  citiesServed: 'citiesServed',
  createdAt: 'createdAt'
} as const

export type ArboristScalarFieldEnum = (typeof ArboristScalarFieldEnum)[keyof typeof ArboristScalarFieldEnum]


export const TreeAssessmentScalarFieldEnum = {
  id: 'id',
  arboristId: 'arboristId',
  propertyAddress: 'propertyAddress',
  city: 'city',
  county: 'county',
  parcelNumber: 'parcelNumber',
  treeSpeciesCommon: 'treeSpeciesCommon',
  treeSpeciesScientific: 'treeSpeciesScientific',
  dbhInches: 'dbhInches',
  heightFt: 'heightFt',
  canopySpreadFt: 'canopySpreadFt',
  conditionRating: 'conditionRating',
  healthNotes: 'healthNotes',
  structuralNotes: 'structuralNotes',
  isProtected: 'isProtected',
  protectionReason: 'protectionReason',
  recommendedAction: 'recommendedAction',
  mitigationRequired: 'mitigationRequired',
  photos: 'photos',
  locationLat: 'locationLat',
  locationLng: 'locationLng',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  certifiedAt: 'certifiedAt'
} as const

export type TreeAssessmentScalarFieldEnum = (typeof TreeAssessmentScalarFieldEnum)[keyof typeof TreeAssessmentScalarFieldEnum]


export const MunicipalOrdinanceScalarFieldEnum = {
  id: 'id',
  cityName: 'cityName',
  state: 'state',
  protectedSpecies: 'protectedSpecies',
  defaultDbhThresholdNative: 'defaultDbhThresholdNative',
  defaultDbhThresholdNonnative: 'defaultDbhThresholdNonnative',
  certifierRequirement: 'certifierRequirement',
  mitigationRules: 'mitigationRules',
  heritageTreeRules: 'heritageTreeRules',
  permitProcessNotes: 'permitProcessNotes',
  ordinanceUrl: 'ordinanceUrl',
  codeReference: 'codeReference',
  lastUpdated: 'lastUpdated'
} as const

export type MunicipalOrdinanceScalarFieldEnum = (typeof MunicipalOrdinanceScalarFieldEnum)[keyof typeof MunicipalOrdinanceScalarFieldEnum]


export const ReportScalarFieldEnum = {
  id: 'id',
  assessmentId: 'assessmentId',
  arboristId: 'arboristId',
  reportType: 'reportType',
  aiDraftContent: 'aiDraftContent',
  finalContent: 'finalContent',
  citySections: 'citySections',
  eSignatureText: 'eSignatureText',
  certifiedAt: 'certifiedAt',
  pdfUrl: 'pdfUrl',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} as const

export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


export const SortOrder = {
  asc: 'asc',
  desc: 'desc'
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export const NullsOrder = {
  first: 'first',
  last: 'last'
} as const

export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


```

### lib/generated/prisma/models.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This is a barrel export file for all models and their related types.
 *
 * 🟢 You can import this file directly.
 */
export type * from './models/Arborist'
export type * from './models/TreeAssessment'
export type * from './models/MunicipalOrdinance'
export type * from './models/Report'
export type * from './commonInputTypes'
```

### lib/generated/prisma/models/Arborist.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file exports the `Arborist` model and its related types.
 *
 * 🟢 You can import this file directly.
 */
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model Arborist
 * 
 */
export type ArboristModel = runtime.Types.Result.DefaultSelection<Prisma.$ArboristPayload>

export type AggregateArborist = {
  _count: ArboristCountAggregateOutputType | null
  _min: ArboristMinAggregateOutputType | null
  _max: ArboristMaxAggregateOutputType | null
}

export type ArboristMinAggregateOutputType = {
  id: string | null
  name: string | null
  email: string | null
  isaCertificationNum: string | null
  isaExpirationDate: Date | null
  companyName: string | null
  phone: string | null
  citiesServed: string | null
  createdAt: Date | null
}

export type ArboristMaxAggregateOutputType = {
  id: string | null
  name: string | null
  email: string | null
  isaCertificationNum: string | null
  isaExpirationDate: Date | null
  companyName: string | null
  phone: string | null
  citiesServed: string | null
  createdAt: Date | null
}

export type ArboristCountAggregateOutputType = {
  id: number
  name: number
  email: number
  isaCertificationNum: number
  isaExpirationDate: number
  companyName: number
  phone: number
  citiesServed: number
  createdAt: number
  _all: number
}


export type ArboristMinAggregateInputType = {
  id?: true
  name?: true
  email?: true
  isaCertificationNum?: true
  isaExpirationDate?: true
  companyName?: true
  phone?: true
  citiesServed?: true
  createdAt?: true
}

export type ArboristMaxAggregateInputType = {
  id?: true
  name?: true
  email?: true
  isaCertificationNum?: true
  isaExpirationDate?: true
  companyName?: true
  phone?: true
  citiesServed?: true
  createdAt?: true
}

export type ArboristCountAggregateInputType = {
  id?: true
  name?: true
  email?: true
  isaCertificationNum?: true
  isaExpirationDate?: true
  companyName?: true
  phone?: true
  citiesServed?: true
  createdAt?: true
  _all?: true
}

export type ArboristAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Arborist to aggregate.
   */
  where?: Prisma.ArboristWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Arborists to fetch.
   */
  orderBy?: Prisma.ArboristOrderByWithRelationInput | Prisma.ArboristOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.ArboristWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Arborists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Arborists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned Arborists
  **/
  _count?: true | ArboristCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: ArboristMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: ArboristMaxAggregateInputType
}

export type GetArboristAggregateType<T extends ArboristAggregateArgs> = {
      [P in keyof T & keyof AggregateArborist]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateArborist[P]>
    : Prisma.GetScalarType<T[P], AggregateArborist[P]>
}




export type ArboristGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ArboristWhereInput
  orderBy?: Prisma.ArboristOrderByWithAggregationInput | Prisma.ArboristOrderByWithAggregationInput[]
  by: Prisma.ArboristScalarFieldEnum[] | Prisma.ArboristScalarFieldEnum
  having?: Prisma.ArboristScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ArboristCountAggregateInputType | true
  _min?: ArboristMinAggregateInputType
  _max?: ArboristMaxAggregateInputType
}

export type ArboristGroupByOutputType = {
  id: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date
  companyName: string | null
  phone: string | null
  citiesServed: string
  createdAt: Date
  _count: ArboristCountAggregateOutputType | null
  _min: ArboristMinAggregateOutputType | null
  _max: ArboristMaxAggregateOutputType | null
}

type GetArboristGroupByPayload<T extends ArboristGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ArboristGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ArboristGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ArboristGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ArboristGroupByOutputType[P]>
      }
    >
  >



export type ArboristWhereInput = {
  AND?: Prisma.ArboristWhereInput | Prisma.ArboristWhereInput[]
  OR?: Prisma.ArboristWhereInput[]
  NOT?: Prisma.ArboristWhereInput | Prisma.ArboristWhereInput[]
  id?: Prisma.StringFilter<"Arborist"> | string
  name?: Prisma.StringFilter<"Arborist"> | string
  email?: Prisma.StringFilter<"Arborist"> | string
  isaCertificationNum?: Prisma.StringFilter<"Arborist"> | string
  isaExpirationDate?: Prisma.DateTimeFilter<"Arborist"> | Date | string
  companyName?: Prisma.StringNullableFilter<"Arborist"> | string | null
  phone?: Prisma.StringNullableFilter<"Arborist"> | string | null
  citiesServed?: Prisma.StringFilter<"Arborist"> | string
  createdAt?: Prisma.DateTimeFilter<"Arborist"> | Date | string
  assessments?: Prisma.TreeAssessmentListRelationFilter
  reports?: Prisma.ReportListRelationFilter
}

export type ArboristOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  email?: Prisma.SortOrder
  isaCertificationNum?: Prisma.SortOrder
  isaExpirationDate?: Prisma.SortOrder
  companyName?: Prisma.SortOrderInput | Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  citiesServed?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  assessments?: Prisma.TreeAssessmentOrderByRelationAggregateInput
  reports?: Prisma.ReportOrderByRelationAggregateInput
}

export type ArboristWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  email?: string
  AND?: Prisma.ArboristWhereInput | Prisma.ArboristWhereInput[]
  OR?: Prisma.ArboristWhereInput[]
  NOT?: Prisma.ArboristWhereInput | Prisma.ArboristWhereInput[]
  name?: Prisma.StringFilter<"Arborist"> | string
  isaCertificationNum?: Prisma.StringFilter<"Arborist"> | string
  isaExpirationDate?: Prisma.DateTimeFilter<"Arborist"> | Date | string
  companyName?: Prisma.StringNullableFilter<"Arborist"> | string | null
  phone?: Prisma.StringNullableFilter<"Arborist"> | string | null
  citiesServed?: Prisma.StringFilter<"Arborist"> | string
  createdAt?: Prisma.DateTimeFilter<"Arborist"> | Date | string
  assessments?: Prisma.TreeAssessmentListRelationFilter
  reports?: Prisma.ReportListRelationFilter
}, "id" | "email">

export type ArboristOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  email?: Prisma.SortOrder
  isaCertificationNum?: Prisma.SortOrder
  isaExpirationDate?: Prisma.SortOrder
  companyName?: Prisma.SortOrderInput | Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  citiesServed?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  _count?: Prisma.ArboristCountOrderByAggregateInput
  _max?: Prisma.ArboristMaxOrderByAggregateInput
  _min?: Prisma.ArboristMinOrderByAggregateInput
}

export type ArboristScalarWhereWithAggregatesInput = {
  AND?: Prisma.ArboristScalarWhereWithAggregatesInput | Prisma.ArboristScalarWhereWithAggregatesInput[]
  OR?: Prisma.ArboristScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ArboristScalarWhereWithAggregatesInput | Prisma.ArboristScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Arborist"> | string
  name?: Prisma.StringWithAggregatesFilter<"Arborist"> | string
  email?: Prisma.StringWithAggregatesFilter<"Arborist"> | string
  isaCertificationNum?: Prisma.StringWithAggregatesFilter<"Arborist"> | string
  isaExpirationDate?: Prisma.DateTimeWithAggregatesFilter<"Arborist"> | Date | string
  companyName?: Prisma.StringNullableWithAggregatesFilter<"Arborist"> | string | null
  phone?: Prisma.StringNullableWithAggregatesFilter<"Arborist"> | string | null
  citiesServed?: Prisma.StringWithAggregatesFilter<"Arborist"> | string
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Arborist"> | Date | string
}

export type ArboristCreateInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  assessments?: Prisma.TreeAssessmentCreateNestedManyWithoutArboristInput
  reports?: Prisma.ReportCreateNestedManyWithoutArboristInput
}

export type ArboristUncheckedCreateInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  assessments?: Prisma.TreeAssessmentUncheckedCreateNestedManyWithoutArboristInput
  reports?: Prisma.ReportUncheckedCreateNestedManyWithoutArboristInput
}

export type ArboristUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessments?: Prisma.TreeAssessmentUpdateManyWithoutArboristNestedInput
  reports?: Prisma.ReportUpdateManyWithoutArboristNestedInput
}

export type ArboristUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessments?: Prisma.TreeAssessmentUncheckedUpdateManyWithoutArboristNestedInput
  reports?: Prisma.ReportUncheckedUpdateManyWithoutArboristNestedInput
}

export type ArboristCreateManyInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
}

export type ArboristUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ArboristUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ArboristCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  email?: Prisma.SortOrder
  isaCertificationNum?: Prisma.SortOrder
  isaExpirationDate?: Prisma.SortOrder
  companyName?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  citiesServed?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type ArboristMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  email?: Prisma.SortOrder
  isaCertificationNum?: Prisma.SortOrder
  isaExpirationDate?: Prisma.SortOrder
  companyName?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  citiesServed?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type ArboristMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  name?: Prisma.SortOrder
  email?: Prisma.SortOrder
  isaCertificationNum?: Prisma.SortOrder
  isaExpirationDate?: Prisma.SortOrder
  companyName?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  citiesServed?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type ArboristScalarRelationFilter = {
  is?: Prisma.ArboristWhereInput
  isNot?: Prisma.ArboristWhereInput
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type ArboristCreateNestedOneWithoutAssessmentsInput = {
  create?: Prisma.XOR<Prisma.ArboristCreateWithoutAssessmentsInput, Prisma.ArboristUncheckedCreateWithoutAssessmentsInput>
  connectOrCreate?: Prisma.ArboristCreateOrConnectWithoutAssessmentsInput
  connect?: Prisma.ArboristWhereUniqueInput
}

export type ArboristUpdateOneRequiredWithoutAssessmentsNestedInput = {
  create?: Prisma.XOR<Prisma.ArboristCreateWithoutAssessmentsInput, Prisma.ArboristUncheckedCreateWithoutAssessmentsInput>
  connectOrCreate?: Prisma.ArboristCreateOrConnectWithoutAssessmentsInput
  upsert?: Prisma.ArboristUpsertWithoutAssessmentsInput
  connect?: Prisma.ArboristWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ArboristUpdateToOneWithWhereWithoutAssessmentsInput, Prisma.ArboristUpdateWithoutAssessmentsInput>, Prisma.ArboristUncheckedUpdateWithoutAssessmentsInput>
}

export type ArboristCreateNestedOneWithoutReportsInput = {
  create?: Prisma.XOR<Prisma.ArboristCreateWithoutReportsInput, Prisma.ArboristUncheckedCreateWithoutReportsInput>
  connectOrCreate?: Prisma.ArboristCreateOrConnectWithoutReportsInput
  connect?: Prisma.ArboristWhereUniqueInput
}

export type ArboristUpdateOneRequiredWithoutReportsNestedInput = {
  create?: Prisma.XOR<Prisma.ArboristCreateWithoutReportsInput, Prisma.ArboristUncheckedCreateWithoutReportsInput>
  connectOrCreate?: Prisma.ArboristCreateOrConnectWithoutReportsInput
  upsert?: Prisma.ArboristUpsertWithoutReportsInput
  connect?: Prisma.ArboristWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ArboristUpdateToOneWithWhereWithoutReportsInput, Prisma.ArboristUpdateWithoutReportsInput>, Prisma.ArboristUncheckedUpdateWithoutReportsInput>
}

export type ArboristCreateWithoutAssessmentsInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  reports?: Prisma.ReportCreateNestedManyWithoutArboristInput
}

export type ArboristUncheckedCreateWithoutAssessmentsInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  reports?: Prisma.ReportUncheckedCreateNestedManyWithoutArboristInput
}

export type ArboristCreateOrConnectWithoutAssessmentsInput = {
  where: Prisma.ArboristWhereUniqueInput
  create: Prisma.XOR<Prisma.ArboristCreateWithoutAssessmentsInput, Prisma.ArboristUncheckedCreateWithoutAssessmentsInput>
}

export type ArboristUpsertWithoutAssessmentsInput = {
  update: Prisma.XOR<Prisma.ArboristUpdateWithoutAssessmentsInput, Prisma.ArboristUncheckedUpdateWithoutAssessmentsInput>
  create: Prisma.XOR<Prisma.ArboristCreateWithoutAssessmentsInput, Prisma.ArboristUncheckedCreateWithoutAssessmentsInput>
  where?: Prisma.ArboristWhereInput
}

export type ArboristUpdateToOneWithWhereWithoutAssessmentsInput = {
  where?: Prisma.ArboristWhereInput
  data: Prisma.XOR<Prisma.ArboristUpdateWithoutAssessmentsInput, Prisma.ArboristUncheckedUpdateWithoutAssessmentsInput>
}

export type ArboristUpdateWithoutAssessmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  reports?: Prisma.ReportUpdateManyWithoutArboristNestedInput
}

export type ArboristUncheckedUpdateWithoutAssessmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  reports?: Prisma.ReportUncheckedUpdateManyWithoutArboristNestedInput
}

export type ArboristCreateWithoutReportsInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  assessments?: Prisma.TreeAssessmentCreateNestedManyWithoutArboristInput
}

export type ArboristUncheckedCreateWithoutReportsInput = {
  id?: string
  name: string
  email: string
  isaCertificationNum: string
  isaExpirationDate: Date | string
  companyName?: string | null
  phone?: string | null
  citiesServed?: string
  createdAt?: Date | string
  assessments?: Prisma.TreeAssessmentUncheckedCreateNestedManyWithoutArboristInput
}

export type ArboristCreateOrConnectWithoutReportsInput = {
  where: Prisma.ArboristWhereUniqueInput
  create: Prisma.XOR<Prisma.ArboristCreateWithoutReportsInput, Prisma.ArboristUncheckedCreateWithoutReportsInput>
}

export type ArboristUpsertWithoutReportsInput = {
  update: Prisma.XOR<Prisma.ArboristUpdateWithoutReportsInput, Prisma.ArboristUncheckedUpdateWithoutReportsInput>
  create: Prisma.XOR<Prisma.ArboristCreateWithoutReportsInput, Prisma.ArboristUncheckedCreateWithoutReportsInput>
  where?: Prisma.ArboristWhereInput
}

export type ArboristUpdateToOneWithWhereWithoutReportsInput = {
  where?: Prisma.ArboristWhereInput
  data: Prisma.XOR<Prisma.ArboristUpdateWithoutReportsInput, Prisma.ArboristUncheckedUpdateWithoutReportsInput>
}

export type ArboristUpdateWithoutReportsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessments?: Prisma.TreeAssessmentUpdateManyWithoutArboristNestedInput
}

export type ArboristUncheckedUpdateWithoutReportsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  isaCertificationNum?: Prisma.StringFieldUpdateOperationsInput | string
  isaExpirationDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  companyName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citiesServed?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessments?: Prisma.TreeAssessmentUncheckedUpdateManyWithoutArboristNestedInput
}


/**
 * Count Type ArboristCountOutputType
 */

export type ArboristCountOutputType = {
  assessments: number
  reports: number
}

export type ArboristCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assessments?: boolean | ArboristCountOutputTypeCountAssessmentsArgs
  reports?: boolean | ArboristCountOutputTypeCountReportsArgs
}

/**
 * ArboristCountOutputType without action
 */
export type ArboristCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the ArboristCountOutputType
   */
  select?: Prisma.ArboristCountOutputTypeSelect<ExtArgs> | null
}

/**
 * ArboristCountOutputType without action
 */
export type ArboristCountOutputTypeCountAssessmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.TreeAssessmentWhereInput
}

/**
 * ArboristCountOutputType without action
 */
export type ArboristCountOutputTypeCountReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ReportWhereInput
}


export type ArboristSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  name?: boolean
  email?: boolean
  isaCertificationNum?: boolean
  isaExpirationDate?: boolean
  companyName?: boolean
  phone?: boolean
  citiesServed?: boolean
  createdAt?: boolean
  assessments?: boolean | Prisma.Arborist$assessmentsArgs<ExtArgs>
  reports?: boolean | Prisma.Arborist$reportsArgs<ExtArgs>
  _count?: boolean | Prisma.ArboristCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["arborist"]>

export type ArboristSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  name?: boolean
  email?: boolean
  isaCertificationNum?: boolean
  isaExpirationDate?: boolean
  companyName?: boolean
  phone?: boolean
  citiesServed?: boolean
  createdAt?: boolean
}, ExtArgs["result"]["arborist"]>

export type ArboristSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  name?: boolean
  email?: boolean
  isaCertificationNum?: boolean
  isaExpirationDate?: boolean
  companyName?: boolean
  phone?: boolean
  citiesServed?: boolean
  createdAt?: boolean
}, ExtArgs["result"]["arborist"]>

export type ArboristSelectScalar = {
  id?: boolean
  name?: boolean
  email?: boolean
  isaCertificationNum?: boolean
  isaExpirationDate?: boolean
  companyName?: boolean
  phone?: boolean
  citiesServed?: boolean
  createdAt?: boolean
}

export type ArboristOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "isaCertificationNum" | "isaExpirationDate" | "companyName" | "phone" | "citiesServed" | "createdAt", ExtArgs["result"]["arborist"]>
export type ArboristInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assessments?: boolean | Prisma.Arborist$assessmentsArgs<ExtArgs>
  reports?: boolean | Prisma.Arborist$reportsArgs<ExtArgs>
  _count?: boolean | Prisma.ArboristCountOutputTypeDefaultArgs<ExtArgs>
}
export type ArboristIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
export type ArboristIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

export type $ArboristPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Arborist"
  objects: {
    assessments: Prisma.$TreeAssessmentPayload<ExtArgs>[]
    reports: Prisma.$ReportPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    name: string
    email: string
    isaCertificationNum: string
    isaExpirationDate: Date
    companyName: string | null
    phone: string | null
    citiesServed: string
    createdAt: Date
  }, ExtArgs["result"]["arborist"]>
  composites: {}
}

export type ArboristGetPayload<S extends boolean | null | undefined | ArboristDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ArboristPayload, S>

export type ArboristCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ArboristFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ArboristCountAggregateInputType | true
  }

export interface ArboristDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Arborist'], meta: { name: 'Arborist' } }
  /**
   * Find zero or one Arborist that matches the filter.
   * @param {ArboristFindUniqueArgs} args - Arguments to find a Arborist
   * @example
   * // Get one Arborist
   * const arborist = await prisma.arborist.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends ArboristFindUniqueArgs>(args: Prisma.SelectSubset<T, ArboristFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one Arborist that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {ArboristFindUniqueOrThrowArgs} args - Arguments to find a Arborist
   * @example
   * // Get one Arborist
   * const arborist = await prisma.arborist.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends ArboristFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ArboristFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Arborist that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristFindFirstArgs} args - Arguments to find a Arborist
   * @example
   * // Get one Arborist
   * const arborist = await prisma.arborist.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends ArboristFindFirstArgs>(args?: Prisma.SelectSubset<T, ArboristFindFirstArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Arborist that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristFindFirstOrThrowArgs} args - Arguments to find a Arborist
   * @example
   * // Get one Arborist
   * const arborist = await prisma.arborist.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends ArboristFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ArboristFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more Arborists that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Arborists
   * const arborists = await prisma.arborist.findMany()
   * 
   * // Get first 10 Arborists
   * const arborists = await prisma.arborist.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const arboristWithIdOnly = await prisma.arborist.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends ArboristFindManyArgs>(args?: Prisma.SelectSubset<T, ArboristFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a Arborist.
   * @param {ArboristCreateArgs} args - Arguments to create a Arborist.
   * @example
   * // Create one Arborist
   * const Arborist = await prisma.arborist.create({
   *   data: {
   *     // ... data to create a Arborist
   *   }
   * })
   * 
   */
  create<T extends ArboristCreateArgs>(args: Prisma.SelectSubset<T, ArboristCreateArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many Arborists.
   * @param {ArboristCreateManyArgs} args - Arguments to create many Arborists.
   * @example
   * // Create many Arborists
   * const arborist = await prisma.arborist.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends ArboristCreateManyArgs>(args?: Prisma.SelectSubset<T, ArboristCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many Arborists and returns the data saved in the database.
   * @param {ArboristCreateManyAndReturnArgs} args - Arguments to create many Arborists.
   * @example
   * // Create many Arborists
   * const arborist = await prisma.arborist.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many Arborists and only return the `id`
   * const arboristWithIdOnly = await prisma.arborist.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends ArboristCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ArboristCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a Arborist.
   * @param {ArboristDeleteArgs} args - Arguments to delete one Arborist.
   * @example
   * // Delete one Arborist
   * const Arborist = await prisma.arborist.delete({
   *   where: {
   *     // ... filter to delete one Arborist
   *   }
   * })
   * 
   */
  delete<T extends ArboristDeleteArgs>(args: Prisma.SelectSubset<T, ArboristDeleteArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one Arborist.
   * @param {ArboristUpdateArgs} args - Arguments to update one Arborist.
   * @example
   * // Update one Arborist
   * const arborist = await prisma.arborist.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends ArboristUpdateArgs>(args: Prisma.SelectSubset<T, ArboristUpdateArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more Arborists.
   * @param {ArboristDeleteManyArgs} args - Arguments to filter Arborists to delete.
   * @example
   * // Delete a few Arborists
   * const { count } = await prisma.arborist.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends ArboristDeleteManyArgs>(args?: Prisma.SelectSubset<T, ArboristDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Arborists.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Arborists
   * const arborist = await prisma.arborist.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends ArboristUpdateManyArgs>(args: Prisma.SelectSubset<T, ArboristUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Arborists and returns the data updated in the database.
   * @param {ArboristUpdateManyAndReturnArgs} args - Arguments to update many Arborists.
   * @example
   * // Update many Arborists
   * const arborist = await prisma.arborist.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more Arborists and only return the `id`
   * const arboristWithIdOnly = await prisma.arborist.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends ArboristUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ArboristUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one Arborist.
   * @param {ArboristUpsertArgs} args - Arguments to update or create a Arborist.
   * @example
   * // Update or create a Arborist
   * const arborist = await prisma.arborist.upsert({
   *   create: {
   *     // ... data to create a Arborist
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Arborist we want to update
   *   }
   * })
   */
  upsert<T extends ArboristUpsertArgs>(args: Prisma.SelectSubset<T, ArboristUpsertArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of Arborists.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristCountArgs} args - Arguments to filter Arborists to count.
   * @example
   * // Count the number of Arborists
   * const count = await prisma.arborist.count({
   *   where: {
   *     // ... the filter for the Arborists we want to count
   *   }
   * })
  **/
  count<T extends ArboristCountArgs>(
    args?: Prisma.Subset<T, ArboristCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ArboristCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a Arborist.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends ArboristAggregateArgs>(args: Prisma.Subset<T, ArboristAggregateArgs>): Prisma.PrismaPromise<GetArboristAggregateType<T>>

  /**
   * Group by Arborist.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ArboristGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends ArboristGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ArboristGroupByArgs['orderBy'] }
      : { orderBy?: ArboristGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, ArboristGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArboristGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the Arborist model
 */
readonly fields: ArboristFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for Arborist.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ArboristClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  assessments<T extends Prisma.Arborist$assessmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Arborist$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  reports<T extends Prisma.Arborist$reportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Arborist$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the Arborist model
 */
export interface ArboristFieldRefs {
  readonly id: Prisma.FieldRef<"Arborist", 'String'>
  readonly name: Prisma.FieldRef<"Arborist", 'String'>
  readonly email: Prisma.FieldRef<"Arborist", 'String'>
  readonly isaCertificationNum: Prisma.FieldRef<"Arborist", 'String'>
  readonly isaExpirationDate: Prisma.FieldRef<"Arborist", 'DateTime'>
  readonly companyName: Prisma.FieldRef<"Arborist", 'String'>
  readonly phone: Prisma.FieldRef<"Arborist", 'String'>
  readonly citiesServed: Prisma.FieldRef<"Arborist", 'String'>
  readonly createdAt: Prisma.FieldRef<"Arborist", 'DateTime'>
}
    

// Custom InputTypes
/**
 * Arborist findUnique
 */
export type ArboristFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter, which Arborist to fetch.
   */
  where: Prisma.ArboristWhereUniqueInput
}

/**
 * Arborist findUniqueOrThrow
 */
export type ArboristFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter, which Arborist to fetch.
   */
  where: Prisma.ArboristWhereUniqueInput
}

/**
 * Arborist findFirst
 */
export type ArboristFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter, which Arborist to fetch.
   */
  where?: Prisma.ArboristWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Arborists to fetch.
   */
  orderBy?: Prisma.ArboristOrderByWithRelationInput | Prisma.ArboristOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Arborists.
   */
  cursor?: Prisma.ArboristWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Arborists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Arborists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Arborists.
   */
  distinct?: Prisma.ArboristScalarFieldEnum | Prisma.ArboristScalarFieldEnum[]
}

/**
 * Arborist findFirstOrThrow
 */
export type ArboristFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter, which Arborist to fetch.
   */
  where?: Prisma.ArboristWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Arborists to fetch.
   */
  orderBy?: Prisma.ArboristOrderByWithRelationInput | Prisma.ArboristOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Arborists.
   */
  cursor?: Prisma.ArboristWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Arborists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Arborists.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Arborists.
   */
  distinct?: Prisma.ArboristScalarFieldEnum | Prisma.ArboristScalarFieldEnum[]
}

/**
 * Arborist findMany
 */
export type ArboristFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter, which Arborists to fetch.
   */
  where?: Prisma.ArboristWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Arborists to fetch.
   */
  orderBy?: Prisma.ArboristOrderByWithRelationInput | Prisma.ArboristOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing Arborists.
   */
  cursor?: Prisma.ArboristWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Arborists from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Arborists.
   */
  skip?: number
  distinct?: Prisma.ArboristScalarFieldEnum | Prisma.ArboristScalarFieldEnum[]
}

/**
 * Arborist create
 */
export type ArboristCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * The data needed to create a Arborist.
   */
  data: Prisma.XOR<Prisma.ArboristCreateInput, Prisma.ArboristUncheckedCreateInput>
}

/**
 * Arborist createMany
 */
export type ArboristCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many Arborists.
   */
  data: Prisma.ArboristCreateManyInput | Prisma.ArboristCreateManyInput[]
}

/**
 * Arborist createManyAndReturn
 */
export type ArboristCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * The data used to create many Arborists.
   */
  data: Prisma.ArboristCreateManyInput | Prisma.ArboristCreateManyInput[]
}

/**
 * Arborist update
 */
export type ArboristUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * The data needed to update a Arborist.
   */
  data: Prisma.XOR<Prisma.ArboristUpdateInput, Prisma.ArboristUncheckedUpdateInput>
  /**
   * Choose, which Arborist to update.
   */
  where: Prisma.ArboristWhereUniqueInput
}

/**
 * Arborist updateMany
 */
export type ArboristUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update Arborists.
   */
  data: Prisma.XOR<Prisma.ArboristUpdateManyMutationInput, Prisma.ArboristUncheckedUpdateManyInput>
  /**
   * Filter which Arborists to update
   */
  where?: Prisma.ArboristWhereInput
  /**
   * Limit how many Arborists to update.
   */
  limit?: number
}

/**
 * Arborist updateManyAndReturn
 */
export type ArboristUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * The data used to update Arborists.
   */
  data: Prisma.XOR<Prisma.ArboristUpdateManyMutationInput, Prisma.ArboristUncheckedUpdateManyInput>
  /**
   * Filter which Arborists to update
   */
  where?: Prisma.ArboristWhereInput
  /**
   * Limit how many Arborists to update.
   */
  limit?: number
}

/**
 * Arborist upsert
 */
export type ArboristUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * The filter to search for the Arborist to update in case it exists.
   */
  where: Prisma.ArboristWhereUniqueInput
  /**
   * In case the Arborist found by the `where` argument doesn't exist, create a new Arborist with this data.
   */
  create: Prisma.XOR<Prisma.ArboristCreateInput, Prisma.ArboristUncheckedCreateInput>
  /**
   * In case the Arborist was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.ArboristUpdateInput, Prisma.ArboristUncheckedUpdateInput>
}

/**
 * Arborist delete
 */
export type ArboristDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
  /**
   * Filter which Arborist to delete.
   */
  where: Prisma.ArboristWhereUniqueInput
}

/**
 * Arborist deleteMany
 */
export type ArboristDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Arborists to delete
   */
  where?: Prisma.ArboristWhereInput
  /**
   * Limit how many Arborists to delete.
   */
  limit?: number
}

/**
 * Arborist.assessments
 */
export type Arborist$assessmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  where?: Prisma.TreeAssessmentWhereInput
  orderBy?: Prisma.TreeAssessmentOrderByWithRelationInput | Prisma.TreeAssessmentOrderByWithRelationInput[]
  cursor?: Prisma.TreeAssessmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.TreeAssessmentScalarFieldEnum | Prisma.TreeAssessmentScalarFieldEnum[]
}

/**
 * Arborist.reports
 */
export type Arborist$reportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  where?: Prisma.ReportWhereInput
  orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[]
  cursor?: Prisma.ReportWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[]
}

/**
 * Arborist without action
 */
export type ArboristDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Arborist
   */
  select?: Prisma.ArboristSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Arborist
   */
  omit?: Prisma.ArboristOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ArboristInclude<ExtArgs> | null
}

```

### lib/generated/prisma/models/MunicipalOrdinance.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file exports the `MunicipalOrdinance` model and its related types.
 *
 * 🟢 You can import this file directly.
 */
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model MunicipalOrdinance
 * 
 */
export type MunicipalOrdinanceModel = runtime.Types.Result.DefaultSelection<Prisma.$MunicipalOrdinancePayload>

export type AggregateMunicipalOrdinance = {
  _count: MunicipalOrdinanceCountAggregateOutputType | null
  _avg: MunicipalOrdinanceAvgAggregateOutputType | null
  _sum: MunicipalOrdinanceSumAggregateOutputType | null
  _min: MunicipalOrdinanceMinAggregateOutputType | null
  _max: MunicipalOrdinanceMaxAggregateOutputType | null
}

export type MunicipalOrdinanceAvgAggregateOutputType = {
  defaultDbhThresholdNative: number | null
  defaultDbhThresholdNonnative: number | null
}

export type MunicipalOrdinanceSumAggregateOutputType = {
  defaultDbhThresholdNative: number | null
  defaultDbhThresholdNonnative: number | null
}

export type MunicipalOrdinanceMinAggregateOutputType = {
  id: string | null
  cityName: string | null
  state: string | null
  protectedSpecies: string | null
  defaultDbhThresholdNative: number | null
  defaultDbhThresholdNonnative: number | null
  certifierRequirement: string | null
  mitigationRules: string | null
  heritageTreeRules: string | null
  permitProcessNotes: string | null
  ordinanceUrl: string | null
  codeReference: string | null
  lastUpdated: Date | null
}

export type MunicipalOrdinanceMaxAggregateOutputType = {
  id: string | null
  cityName: string | null
  state: string | null
  protectedSpecies: string | null
  defaultDbhThresholdNative: number | null
  defaultDbhThresholdNonnative: number | null
  certifierRequirement: string | null
  mitigationRules: string | null
  heritageTreeRules: string | null
  permitProcessNotes: string | null
  ordinanceUrl: string | null
  codeReference: string | null
  lastUpdated: Date | null
}

export type MunicipalOrdinanceCountAggregateOutputType = {
  id: number
  cityName: number
  state: number
  protectedSpecies: number
  defaultDbhThresholdNative: number
  defaultDbhThresholdNonnative: number
  certifierRequirement: number
  mitigationRules: number
  heritageTreeRules: number
  permitProcessNotes: number
  ordinanceUrl: number
  codeReference: number
  lastUpdated: number
  _all: number
}


export type MunicipalOrdinanceAvgAggregateInputType = {
  defaultDbhThresholdNative?: true
  defaultDbhThresholdNonnative?: true
}

export type MunicipalOrdinanceSumAggregateInputType = {
  defaultDbhThresholdNative?: true
  defaultDbhThresholdNonnative?: true
}

export type MunicipalOrdinanceMinAggregateInputType = {
  id?: true
  cityName?: true
  state?: true
  protectedSpecies?: true
  defaultDbhThresholdNative?: true
  defaultDbhThresholdNonnative?: true
  certifierRequirement?: true
  mitigationRules?: true
  heritageTreeRules?: true
  permitProcessNotes?: true
  ordinanceUrl?: true
  codeReference?: true
  lastUpdated?: true
}

export type MunicipalOrdinanceMaxAggregateInputType = {
  id?: true
  cityName?: true
  state?: true
  protectedSpecies?: true
  defaultDbhThresholdNative?: true
  defaultDbhThresholdNonnative?: true
  certifierRequirement?: true
  mitigationRules?: true
  heritageTreeRules?: true
  permitProcessNotes?: true
  ordinanceUrl?: true
  codeReference?: true
  lastUpdated?: true
}

export type MunicipalOrdinanceCountAggregateInputType = {
  id?: true
  cityName?: true
  state?: true
  protectedSpecies?: true
  defaultDbhThresholdNative?: true
  defaultDbhThresholdNonnative?: true
  certifierRequirement?: true
  mitigationRules?: true
  heritageTreeRules?: true
  permitProcessNotes?: true
  ordinanceUrl?: true
  codeReference?: true
  lastUpdated?: true
  _all?: true
}

export type MunicipalOrdinanceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which MunicipalOrdinance to aggregate.
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of MunicipalOrdinances to fetch.
   */
  orderBy?: Prisma.MunicipalOrdinanceOrderByWithRelationInput | Prisma.MunicipalOrdinanceOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.MunicipalOrdinanceWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` MunicipalOrdinances from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` MunicipalOrdinances.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned MunicipalOrdinances
  **/
  _count?: true | MunicipalOrdinanceCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to average
  **/
  _avg?: MunicipalOrdinanceAvgAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to sum
  **/
  _sum?: MunicipalOrdinanceSumAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: MunicipalOrdinanceMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: MunicipalOrdinanceMaxAggregateInputType
}

export type GetMunicipalOrdinanceAggregateType<T extends MunicipalOrdinanceAggregateArgs> = {
      [P in keyof T & keyof AggregateMunicipalOrdinance]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateMunicipalOrdinance[P]>
    : Prisma.GetScalarType<T[P], AggregateMunicipalOrdinance[P]>
}




export type MunicipalOrdinanceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.MunicipalOrdinanceWhereInput
  orderBy?: Prisma.MunicipalOrdinanceOrderByWithAggregationInput | Prisma.MunicipalOrdinanceOrderByWithAggregationInput[]
  by: Prisma.MunicipalOrdinanceScalarFieldEnum[] | Prisma.MunicipalOrdinanceScalarFieldEnum
  having?: Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: MunicipalOrdinanceCountAggregateInputType | true
  _avg?: MunicipalOrdinanceAvgAggregateInputType
  _sum?: MunicipalOrdinanceSumAggregateInputType
  _min?: MunicipalOrdinanceMinAggregateInputType
  _max?: MunicipalOrdinanceMaxAggregateInputType
}

export type MunicipalOrdinanceGroupByOutputType = {
  id: string
  cityName: string
  state: string
  protectedSpecies: string
  defaultDbhThresholdNative: number | null
  defaultDbhThresholdNonnative: number | null
  certifierRequirement: string | null
  mitigationRules: string
  heritageTreeRules: string
  permitProcessNotes: string | null
  ordinanceUrl: string | null
  codeReference: string | null
  lastUpdated: Date
  _count: MunicipalOrdinanceCountAggregateOutputType | null
  _avg: MunicipalOrdinanceAvgAggregateOutputType | null
  _sum: MunicipalOrdinanceSumAggregateOutputType | null
  _min: MunicipalOrdinanceMinAggregateOutputType | null
  _max: MunicipalOrdinanceMaxAggregateOutputType | null
}

type GetMunicipalOrdinanceGroupByPayload<T extends MunicipalOrdinanceGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<MunicipalOrdinanceGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof MunicipalOrdinanceGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], MunicipalOrdinanceGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], MunicipalOrdinanceGroupByOutputType[P]>
      }
    >
  >



export type MunicipalOrdinanceWhereInput = {
  AND?: Prisma.MunicipalOrdinanceWhereInput | Prisma.MunicipalOrdinanceWhereInput[]
  OR?: Prisma.MunicipalOrdinanceWhereInput[]
  NOT?: Prisma.MunicipalOrdinanceWhereInput | Prisma.MunicipalOrdinanceWhereInput[]
  id?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  cityName?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  state?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  protectedSpecies?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  defaultDbhThresholdNative?: Prisma.FloatNullableFilter<"MunicipalOrdinance"> | number | null
  defaultDbhThresholdNonnative?: Prisma.FloatNullableFilter<"MunicipalOrdinance"> | number | null
  certifierRequirement?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  mitigationRules?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  heritageTreeRules?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  permitProcessNotes?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  ordinanceUrl?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  codeReference?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  lastUpdated?: Prisma.DateTimeFilter<"MunicipalOrdinance"> | Date | string
}

export type MunicipalOrdinanceOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  cityName?: Prisma.SortOrder
  state?: Prisma.SortOrder
  protectedSpecies?: Prisma.SortOrder
  defaultDbhThresholdNative?: Prisma.SortOrderInput | Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrderInput | Prisma.SortOrder
  certifierRequirement?: Prisma.SortOrderInput | Prisma.SortOrder
  mitigationRules?: Prisma.SortOrder
  heritageTreeRules?: Prisma.SortOrder
  permitProcessNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  ordinanceUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  codeReference?: Prisma.SortOrderInput | Prisma.SortOrder
  lastUpdated?: Prisma.SortOrder
}

export type MunicipalOrdinanceWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  cityName?: string
  AND?: Prisma.MunicipalOrdinanceWhereInput | Prisma.MunicipalOrdinanceWhereInput[]
  OR?: Prisma.MunicipalOrdinanceWhereInput[]
  NOT?: Prisma.MunicipalOrdinanceWhereInput | Prisma.MunicipalOrdinanceWhereInput[]
  state?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  protectedSpecies?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  defaultDbhThresholdNative?: Prisma.FloatNullableFilter<"MunicipalOrdinance"> | number | null
  defaultDbhThresholdNonnative?: Prisma.FloatNullableFilter<"MunicipalOrdinance"> | number | null
  certifierRequirement?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  mitigationRules?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  heritageTreeRules?: Prisma.StringFilter<"MunicipalOrdinance"> | string
  permitProcessNotes?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  ordinanceUrl?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  codeReference?: Prisma.StringNullableFilter<"MunicipalOrdinance"> | string | null
  lastUpdated?: Prisma.DateTimeFilter<"MunicipalOrdinance"> | Date | string
}, "id" | "cityName">

export type MunicipalOrdinanceOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  cityName?: Prisma.SortOrder
  state?: Prisma.SortOrder
  protectedSpecies?: Prisma.SortOrder
  defaultDbhThresholdNative?: Prisma.SortOrderInput | Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrderInput | Prisma.SortOrder
  certifierRequirement?: Prisma.SortOrderInput | Prisma.SortOrder
  mitigationRules?: Prisma.SortOrder
  heritageTreeRules?: Prisma.SortOrder
  permitProcessNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  ordinanceUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  codeReference?: Prisma.SortOrderInput | Prisma.SortOrder
  lastUpdated?: Prisma.SortOrder
  _count?: Prisma.MunicipalOrdinanceCountOrderByAggregateInput
  _avg?: Prisma.MunicipalOrdinanceAvgOrderByAggregateInput
  _max?: Prisma.MunicipalOrdinanceMaxOrderByAggregateInput
  _min?: Prisma.MunicipalOrdinanceMinOrderByAggregateInput
  _sum?: Prisma.MunicipalOrdinanceSumOrderByAggregateInput
}

export type MunicipalOrdinanceScalarWhereWithAggregatesInput = {
  AND?: Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput | Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput[]
  OR?: Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput[]
  NOT?: Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput | Prisma.MunicipalOrdinanceScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  cityName?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  state?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  protectedSpecies?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  defaultDbhThresholdNative?: Prisma.FloatNullableWithAggregatesFilter<"MunicipalOrdinance"> | number | null
  defaultDbhThresholdNonnative?: Prisma.FloatNullableWithAggregatesFilter<"MunicipalOrdinance"> | number | null
  certifierRequirement?: Prisma.StringNullableWithAggregatesFilter<"MunicipalOrdinance"> | string | null
  mitigationRules?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  heritageTreeRules?: Prisma.StringWithAggregatesFilter<"MunicipalOrdinance"> | string
  permitProcessNotes?: Prisma.StringNullableWithAggregatesFilter<"MunicipalOrdinance"> | string | null
  ordinanceUrl?: Prisma.StringNullableWithAggregatesFilter<"MunicipalOrdinance"> | string | null
  codeReference?: Prisma.StringNullableWithAggregatesFilter<"MunicipalOrdinance"> | string | null
  lastUpdated?: Prisma.DateTimeWithAggregatesFilter<"MunicipalOrdinance"> | Date | string
}

export type MunicipalOrdinanceCreateInput = {
  id?: string
  cityName: string
  state?: string
  protectedSpecies?: string
  defaultDbhThresholdNative?: number | null
  defaultDbhThresholdNonnative?: number | null
  certifierRequirement?: string | null
  mitigationRules?: string
  heritageTreeRules?: string
  permitProcessNotes?: string | null
  ordinanceUrl?: string | null
  codeReference?: string | null
  lastUpdated?: Date | string
}

export type MunicipalOrdinanceUncheckedCreateInput = {
  id?: string
  cityName: string
  state?: string
  protectedSpecies?: string
  defaultDbhThresholdNative?: number | null
  defaultDbhThresholdNonnative?: number | null
  certifierRequirement?: string | null
  mitigationRules?: string
  heritageTreeRules?: string
  permitProcessNotes?: string | null
  ordinanceUrl?: string | null
  codeReference?: string | null
  lastUpdated?: Date | string
}

export type MunicipalOrdinanceUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  cityName?: Prisma.StringFieldUpdateOperationsInput | string
  state?: Prisma.StringFieldUpdateOperationsInput | string
  protectedSpecies?: Prisma.StringFieldUpdateOperationsInput | string
  defaultDbhThresholdNative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  defaultDbhThresholdNonnative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  certifierRequirement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  mitigationRules?: Prisma.StringFieldUpdateOperationsInput | string
  heritageTreeRules?: Prisma.StringFieldUpdateOperationsInput | string
  permitProcessNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ordinanceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  codeReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MunicipalOrdinanceUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  cityName?: Prisma.StringFieldUpdateOperationsInput | string
  state?: Prisma.StringFieldUpdateOperationsInput | string
  protectedSpecies?: Prisma.StringFieldUpdateOperationsInput | string
  defaultDbhThresholdNative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  defaultDbhThresholdNonnative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  certifierRequirement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  mitigationRules?: Prisma.StringFieldUpdateOperationsInput | string
  heritageTreeRules?: Prisma.StringFieldUpdateOperationsInput | string
  permitProcessNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ordinanceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  codeReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MunicipalOrdinanceCreateManyInput = {
  id?: string
  cityName: string
  state?: string
  protectedSpecies?: string
  defaultDbhThresholdNative?: number | null
  defaultDbhThresholdNonnative?: number | null
  certifierRequirement?: string | null
  mitigationRules?: string
  heritageTreeRules?: string
  permitProcessNotes?: string | null
  ordinanceUrl?: string | null
  codeReference?: string | null
  lastUpdated?: Date | string
}

export type MunicipalOrdinanceUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  cityName?: Prisma.StringFieldUpdateOperationsInput | string
  state?: Prisma.StringFieldUpdateOperationsInput | string
  protectedSpecies?: Prisma.StringFieldUpdateOperationsInput | string
  defaultDbhThresholdNative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  defaultDbhThresholdNonnative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  certifierRequirement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  mitigationRules?: Prisma.StringFieldUpdateOperationsInput | string
  heritageTreeRules?: Prisma.StringFieldUpdateOperationsInput | string
  permitProcessNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ordinanceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  codeReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MunicipalOrdinanceUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  cityName?: Prisma.StringFieldUpdateOperationsInput | string
  state?: Prisma.StringFieldUpdateOperationsInput | string
  protectedSpecies?: Prisma.StringFieldUpdateOperationsInput | string
  defaultDbhThresholdNative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  defaultDbhThresholdNonnative?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  certifierRequirement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  mitigationRules?: Prisma.StringFieldUpdateOperationsInput | string
  heritageTreeRules?: Prisma.StringFieldUpdateOperationsInput | string
  permitProcessNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ordinanceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  codeReference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MunicipalOrdinanceCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  cityName?: Prisma.SortOrder
  state?: Prisma.SortOrder
  protectedSpecies?: Prisma.SortOrder
  defaultDbhThresholdNative?: Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrder
  certifierRequirement?: Prisma.SortOrder
  mitigationRules?: Prisma.SortOrder
  heritageTreeRules?: Prisma.SortOrder
  permitProcessNotes?: Prisma.SortOrder
  ordinanceUrl?: Prisma.SortOrder
  codeReference?: Prisma.SortOrder
  lastUpdated?: Prisma.SortOrder
}

export type MunicipalOrdinanceAvgOrderByAggregateInput = {
  defaultDbhThresholdNative?: Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrder
}

export type MunicipalOrdinanceMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  cityName?: Prisma.SortOrder
  state?: Prisma.SortOrder
  protectedSpecies?: Prisma.SortOrder
  defaultDbhThresholdNative?: Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrder
  certifierRequirement?: Prisma.SortOrder
  mitigationRules?: Prisma.SortOrder
  heritageTreeRules?: Prisma.SortOrder
  permitProcessNotes?: Prisma.SortOrder
  ordinanceUrl?: Prisma.SortOrder
  codeReference?: Prisma.SortOrder
  lastUpdated?: Prisma.SortOrder
}

export type MunicipalOrdinanceMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  cityName?: Prisma.SortOrder
  state?: Prisma.SortOrder
  protectedSpecies?: Prisma.SortOrder
  defaultDbhThresholdNative?: Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrder
  certifierRequirement?: Prisma.SortOrder
  mitigationRules?: Prisma.SortOrder
  heritageTreeRules?: Prisma.SortOrder
  permitProcessNotes?: Prisma.SortOrder
  ordinanceUrl?: Prisma.SortOrder
  codeReference?: Prisma.SortOrder
  lastUpdated?: Prisma.SortOrder
}

export type MunicipalOrdinanceSumOrderByAggregateInput = {
  defaultDbhThresholdNative?: Prisma.SortOrder
  defaultDbhThresholdNonnative?: Prisma.SortOrder
}



export type MunicipalOrdinanceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  cityName?: boolean
  state?: boolean
  protectedSpecies?: boolean
  defaultDbhThresholdNative?: boolean
  defaultDbhThresholdNonnative?: boolean
  certifierRequirement?: boolean
  mitigationRules?: boolean
  heritageTreeRules?: boolean
  permitProcessNotes?: boolean
  ordinanceUrl?: boolean
  codeReference?: boolean
  lastUpdated?: boolean
}, ExtArgs["result"]["municipalOrdinance"]>

export type MunicipalOrdinanceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  cityName?: boolean
  state?: boolean
  protectedSpecies?: boolean
  defaultDbhThresholdNative?: boolean
  defaultDbhThresholdNonnative?: boolean
  certifierRequirement?: boolean
  mitigationRules?: boolean
  heritageTreeRules?: boolean
  permitProcessNotes?: boolean
  ordinanceUrl?: boolean
  codeReference?: boolean
  lastUpdated?: boolean
}, ExtArgs["result"]["municipalOrdinance"]>

export type MunicipalOrdinanceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  cityName?: boolean
  state?: boolean
  protectedSpecies?: boolean
  defaultDbhThresholdNative?: boolean
  defaultDbhThresholdNonnative?: boolean
  certifierRequirement?: boolean
  mitigationRules?: boolean
  heritageTreeRules?: boolean
  permitProcessNotes?: boolean
  ordinanceUrl?: boolean
  codeReference?: boolean
  lastUpdated?: boolean
}, ExtArgs["result"]["municipalOrdinance"]>

export type MunicipalOrdinanceSelectScalar = {
  id?: boolean
  cityName?: boolean
  state?: boolean
  protectedSpecies?: boolean
  defaultDbhThresholdNative?: boolean
  defaultDbhThresholdNonnative?: boolean
  certifierRequirement?: boolean
  mitigationRules?: boolean
  heritageTreeRules?: boolean
  permitProcessNotes?: boolean
  ordinanceUrl?: boolean
  codeReference?: boolean
  lastUpdated?: boolean
}

export type MunicipalOrdinanceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cityName" | "state" | "protectedSpecies" | "defaultDbhThresholdNative" | "defaultDbhThresholdNonnative" | "certifierRequirement" | "mitigationRules" | "heritageTreeRules" | "permitProcessNotes" | "ordinanceUrl" | "codeReference" | "lastUpdated", ExtArgs["result"]["municipalOrdinance"]>

export type $MunicipalOrdinancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "MunicipalOrdinance"
  objects: {}
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    cityName: string
    state: string
    protectedSpecies: string
    defaultDbhThresholdNative: number | null
    defaultDbhThresholdNonnative: number | null
    certifierRequirement: string | null
    mitigationRules: string
    heritageTreeRules: string
    permitProcessNotes: string | null
    ordinanceUrl: string | null
    codeReference: string | null
    lastUpdated: Date
  }, ExtArgs["result"]["municipalOrdinance"]>
  composites: {}
}

export type MunicipalOrdinanceGetPayload<S extends boolean | null | undefined | MunicipalOrdinanceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload, S>

export type MunicipalOrdinanceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<MunicipalOrdinanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MunicipalOrdinanceCountAggregateInputType | true
  }

export interface MunicipalOrdinanceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MunicipalOrdinance'], meta: { name: 'MunicipalOrdinance' } }
  /**
   * Find zero or one MunicipalOrdinance that matches the filter.
   * @param {MunicipalOrdinanceFindUniqueArgs} args - Arguments to find a MunicipalOrdinance
   * @example
   * // Get one MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends MunicipalOrdinanceFindUniqueArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one MunicipalOrdinance that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {MunicipalOrdinanceFindUniqueOrThrowArgs} args - Arguments to find a MunicipalOrdinance
   * @example
   * // Get one MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends MunicipalOrdinanceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first MunicipalOrdinance that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceFindFirstArgs} args - Arguments to find a MunicipalOrdinance
   * @example
   * // Get one MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends MunicipalOrdinanceFindFirstArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceFindFirstArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first MunicipalOrdinance that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceFindFirstOrThrowArgs} args - Arguments to find a MunicipalOrdinance
   * @example
   * // Get one MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends MunicipalOrdinanceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more MunicipalOrdinances that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all MunicipalOrdinances
   * const municipalOrdinances = await prisma.municipalOrdinance.findMany()
   * 
   * // Get first 10 MunicipalOrdinances
   * const municipalOrdinances = await prisma.municipalOrdinance.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const municipalOrdinanceWithIdOnly = await prisma.municipalOrdinance.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends MunicipalOrdinanceFindManyArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a MunicipalOrdinance.
   * @param {MunicipalOrdinanceCreateArgs} args - Arguments to create a MunicipalOrdinance.
   * @example
   * // Create one MunicipalOrdinance
   * const MunicipalOrdinance = await prisma.municipalOrdinance.create({
   *   data: {
   *     // ... data to create a MunicipalOrdinance
   *   }
   * })
   * 
   */
  create<T extends MunicipalOrdinanceCreateArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceCreateArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many MunicipalOrdinances.
   * @param {MunicipalOrdinanceCreateManyArgs} args - Arguments to create many MunicipalOrdinances.
   * @example
   * // Create many MunicipalOrdinances
   * const municipalOrdinance = await prisma.municipalOrdinance.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends MunicipalOrdinanceCreateManyArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many MunicipalOrdinances and returns the data saved in the database.
   * @param {MunicipalOrdinanceCreateManyAndReturnArgs} args - Arguments to create many MunicipalOrdinances.
   * @example
   * // Create many MunicipalOrdinances
   * const municipalOrdinance = await prisma.municipalOrdinance.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many MunicipalOrdinances and only return the `id`
   * const municipalOrdinanceWithIdOnly = await prisma.municipalOrdinance.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends MunicipalOrdinanceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a MunicipalOrdinance.
   * @param {MunicipalOrdinanceDeleteArgs} args - Arguments to delete one MunicipalOrdinance.
   * @example
   * // Delete one MunicipalOrdinance
   * const MunicipalOrdinance = await prisma.municipalOrdinance.delete({
   *   where: {
   *     // ... filter to delete one MunicipalOrdinance
   *   }
   * })
   * 
   */
  delete<T extends MunicipalOrdinanceDeleteArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceDeleteArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one MunicipalOrdinance.
   * @param {MunicipalOrdinanceUpdateArgs} args - Arguments to update one MunicipalOrdinance.
   * @example
   * // Update one MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends MunicipalOrdinanceUpdateArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceUpdateArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more MunicipalOrdinances.
   * @param {MunicipalOrdinanceDeleteManyArgs} args - Arguments to filter MunicipalOrdinances to delete.
   * @example
   * // Delete a few MunicipalOrdinances
   * const { count } = await prisma.municipalOrdinance.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends MunicipalOrdinanceDeleteManyArgs>(args?: Prisma.SelectSubset<T, MunicipalOrdinanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more MunicipalOrdinances.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many MunicipalOrdinances
   * const municipalOrdinance = await prisma.municipalOrdinance.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends MunicipalOrdinanceUpdateManyArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more MunicipalOrdinances and returns the data updated in the database.
   * @param {MunicipalOrdinanceUpdateManyAndReturnArgs} args - Arguments to update many MunicipalOrdinances.
   * @example
   * // Update many MunicipalOrdinances
   * const municipalOrdinance = await prisma.municipalOrdinance.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more MunicipalOrdinances and only return the `id`
   * const municipalOrdinanceWithIdOnly = await prisma.municipalOrdinance.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends MunicipalOrdinanceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one MunicipalOrdinance.
   * @param {MunicipalOrdinanceUpsertArgs} args - Arguments to update or create a MunicipalOrdinance.
   * @example
   * // Update or create a MunicipalOrdinance
   * const municipalOrdinance = await prisma.municipalOrdinance.upsert({
   *   create: {
   *     // ... data to create a MunicipalOrdinance
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the MunicipalOrdinance we want to update
   *   }
   * })
   */
  upsert<T extends MunicipalOrdinanceUpsertArgs>(args: Prisma.SelectSubset<T, MunicipalOrdinanceUpsertArgs<ExtArgs>>): Prisma.Prisma__MunicipalOrdinanceClient<runtime.Types.Result.GetResult<Prisma.$MunicipalOrdinancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of MunicipalOrdinances.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceCountArgs} args - Arguments to filter MunicipalOrdinances to count.
   * @example
   * // Count the number of MunicipalOrdinances
   * const count = await prisma.municipalOrdinance.count({
   *   where: {
   *     // ... the filter for the MunicipalOrdinances we want to count
   *   }
   * })
  **/
  count<T extends MunicipalOrdinanceCountArgs>(
    args?: Prisma.Subset<T, MunicipalOrdinanceCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], MunicipalOrdinanceCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a MunicipalOrdinance.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends MunicipalOrdinanceAggregateArgs>(args: Prisma.Subset<T, MunicipalOrdinanceAggregateArgs>): Prisma.PrismaPromise<GetMunicipalOrdinanceAggregateType<T>>

  /**
   * Group by MunicipalOrdinance.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MunicipalOrdinanceGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends MunicipalOrdinanceGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: MunicipalOrdinanceGroupByArgs['orderBy'] }
      : { orderBy?: MunicipalOrdinanceGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, MunicipalOrdinanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMunicipalOrdinanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the MunicipalOrdinance model
 */
readonly fields: MunicipalOrdinanceFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for MunicipalOrdinance.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MunicipalOrdinanceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the MunicipalOrdinance model
 */
export interface MunicipalOrdinanceFieldRefs {
  readonly id: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly cityName: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly state: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly protectedSpecies: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly defaultDbhThresholdNative: Prisma.FieldRef<"MunicipalOrdinance", 'Float'>
  readonly defaultDbhThresholdNonnative: Prisma.FieldRef<"MunicipalOrdinance", 'Float'>
  readonly certifierRequirement: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly mitigationRules: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly heritageTreeRules: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly permitProcessNotes: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly ordinanceUrl: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly codeReference: Prisma.FieldRef<"MunicipalOrdinance", 'String'>
  readonly lastUpdated: Prisma.FieldRef<"MunicipalOrdinance", 'DateTime'>
}
    

// Custom InputTypes
/**
 * MunicipalOrdinance findUnique
 */
export type MunicipalOrdinanceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter, which MunicipalOrdinance to fetch.
   */
  where: Prisma.MunicipalOrdinanceWhereUniqueInput
}

/**
 * MunicipalOrdinance findUniqueOrThrow
 */
export type MunicipalOrdinanceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter, which MunicipalOrdinance to fetch.
   */
  where: Prisma.MunicipalOrdinanceWhereUniqueInput
}

/**
 * MunicipalOrdinance findFirst
 */
export type MunicipalOrdinanceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter, which MunicipalOrdinance to fetch.
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of MunicipalOrdinances to fetch.
   */
  orderBy?: Prisma.MunicipalOrdinanceOrderByWithRelationInput | Prisma.MunicipalOrdinanceOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for MunicipalOrdinances.
   */
  cursor?: Prisma.MunicipalOrdinanceWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` MunicipalOrdinances from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` MunicipalOrdinances.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of MunicipalOrdinances.
   */
  distinct?: Prisma.MunicipalOrdinanceScalarFieldEnum | Prisma.MunicipalOrdinanceScalarFieldEnum[]
}

/**
 * MunicipalOrdinance findFirstOrThrow
 */
export type MunicipalOrdinanceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter, which MunicipalOrdinance to fetch.
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of MunicipalOrdinances to fetch.
   */
  orderBy?: Prisma.MunicipalOrdinanceOrderByWithRelationInput | Prisma.MunicipalOrdinanceOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for MunicipalOrdinances.
   */
  cursor?: Prisma.MunicipalOrdinanceWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` MunicipalOrdinances from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` MunicipalOrdinances.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of MunicipalOrdinances.
   */
  distinct?: Prisma.MunicipalOrdinanceScalarFieldEnum | Prisma.MunicipalOrdinanceScalarFieldEnum[]
}

/**
 * MunicipalOrdinance findMany
 */
export type MunicipalOrdinanceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter, which MunicipalOrdinances to fetch.
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of MunicipalOrdinances to fetch.
   */
  orderBy?: Prisma.MunicipalOrdinanceOrderByWithRelationInput | Prisma.MunicipalOrdinanceOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing MunicipalOrdinances.
   */
  cursor?: Prisma.MunicipalOrdinanceWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` MunicipalOrdinances from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` MunicipalOrdinances.
   */
  skip?: number
  distinct?: Prisma.MunicipalOrdinanceScalarFieldEnum | Prisma.MunicipalOrdinanceScalarFieldEnum[]
}

/**
 * MunicipalOrdinance create
 */
export type MunicipalOrdinanceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * The data needed to create a MunicipalOrdinance.
   */
  data: Prisma.XOR<Prisma.MunicipalOrdinanceCreateInput, Prisma.MunicipalOrdinanceUncheckedCreateInput>
}

/**
 * MunicipalOrdinance createMany
 */
export type MunicipalOrdinanceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many MunicipalOrdinances.
   */
  data: Prisma.MunicipalOrdinanceCreateManyInput | Prisma.MunicipalOrdinanceCreateManyInput[]
}

/**
 * MunicipalOrdinance createManyAndReturn
 */
export type MunicipalOrdinanceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * The data used to create many MunicipalOrdinances.
   */
  data: Prisma.MunicipalOrdinanceCreateManyInput | Prisma.MunicipalOrdinanceCreateManyInput[]
}

/**
 * MunicipalOrdinance update
 */
export type MunicipalOrdinanceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * The data needed to update a MunicipalOrdinance.
   */
  data: Prisma.XOR<Prisma.MunicipalOrdinanceUpdateInput, Prisma.MunicipalOrdinanceUncheckedUpdateInput>
  /**
   * Choose, which MunicipalOrdinance to update.
   */
  where: Prisma.MunicipalOrdinanceWhereUniqueInput
}

/**
 * MunicipalOrdinance updateMany
 */
export type MunicipalOrdinanceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update MunicipalOrdinances.
   */
  data: Prisma.XOR<Prisma.MunicipalOrdinanceUpdateManyMutationInput, Prisma.MunicipalOrdinanceUncheckedUpdateManyInput>
  /**
   * Filter which MunicipalOrdinances to update
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * Limit how many MunicipalOrdinances to update.
   */
  limit?: number
}

/**
 * MunicipalOrdinance updateManyAndReturn
 */
export type MunicipalOrdinanceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * The data used to update MunicipalOrdinances.
   */
  data: Prisma.XOR<Prisma.MunicipalOrdinanceUpdateManyMutationInput, Prisma.MunicipalOrdinanceUncheckedUpdateManyInput>
  /**
   * Filter which MunicipalOrdinances to update
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * Limit how many MunicipalOrdinances to update.
   */
  limit?: number
}

/**
 * MunicipalOrdinance upsert
 */
export type MunicipalOrdinanceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * The filter to search for the MunicipalOrdinance to update in case it exists.
   */
  where: Prisma.MunicipalOrdinanceWhereUniqueInput
  /**
   * In case the MunicipalOrdinance found by the `where` argument doesn't exist, create a new MunicipalOrdinance with this data.
   */
  create: Prisma.XOR<Prisma.MunicipalOrdinanceCreateInput, Prisma.MunicipalOrdinanceUncheckedCreateInput>
  /**
   * In case the MunicipalOrdinance was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.MunicipalOrdinanceUpdateInput, Prisma.MunicipalOrdinanceUncheckedUpdateInput>
}

/**
 * MunicipalOrdinance delete
 */
export type MunicipalOrdinanceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
  /**
   * Filter which MunicipalOrdinance to delete.
   */
  where: Prisma.MunicipalOrdinanceWhereUniqueInput
}

/**
 * MunicipalOrdinance deleteMany
 */
export type MunicipalOrdinanceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which MunicipalOrdinances to delete
   */
  where?: Prisma.MunicipalOrdinanceWhereInput
  /**
   * Limit how many MunicipalOrdinances to delete.
   */
  limit?: number
}

/**
 * MunicipalOrdinance without action
 */
export type MunicipalOrdinanceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the MunicipalOrdinance
   */
  select?: Prisma.MunicipalOrdinanceSelect<ExtArgs> | null
  /**
   * Omit specific fields from the MunicipalOrdinance
   */
  omit?: Prisma.MunicipalOrdinanceOmit<ExtArgs> | null
}

```

### lib/generated/prisma/models/Report.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file exports the `Report` model and its related types.
 *
 * 🟢 You can import this file directly.
 */
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model Report
 * 
 */
export type ReportModel = runtime.Types.Result.DefaultSelection<Prisma.$ReportPayload>

export type AggregateReport = {
  _count: ReportCountAggregateOutputType | null
  _min: ReportMinAggregateOutputType | null
  _max: ReportMaxAggregateOutputType | null
}

export type ReportMinAggregateOutputType = {
  id: string | null
  assessmentId: string | null
  arboristId: string | null
  reportType: string | null
  aiDraftContent: string | null
  finalContent: string | null
  citySections: string | null
  eSignatureText: string | null
  certifiedAt: Date | null
  pdfUrl: string | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type ReportMaxAggregateOutputType = {
  id: string | null
  assessmentId: string | null
  arboristId: string | null
  reportType: string | null
  aiDraftContent: string | null
  finalContent: string | null
  citySections: string | null
  eSignatureText: string | null
  certifiedAt: Date | null
  pdfUrl: string | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type ReportCountAggregateOutputType = {
  id: number
  assessmentId: number
  arboristId: number
  reportType: number
  aiDraftContent: number
  finalContent: number
  citySections: number
  eSignatureText: number
  certifiedAt: number
  pdfUrl: number
  status: number
  createdAt: number
  updatedAt: number
  _all: number
}


export type ReportMinAggregateInputType = {
  id?: true
  assessmentId?: true
  arboristId?: true
  reportType?: true
  aiDraftContent?: true
  finalContent?: true
  citySections?: true
  eSignatureText?: true
  certifiedAt?: true
  pdfUrl?: true
  status?: true
  createdAt?: true
  updatedAt?: true
}

export type ReportMaxAggregateInputType = {
  id?: true
  assessmentId?: true
  arboristId?: true
  reportType?: true
  aiDraftContent?: true
  finalContent?: true
  citySections?: true
  eSignatureText?: true
  certifiedAt?: true
  pdfUrl?: true
  status?: true
  createdAt?: true
  updatedAt?: true
}

export type ReportCountAggregateInputType = {
  id?: true
  assessmentId?: true
  arboristId?: true
  reportType?: true
  aiDraftContent?: true
  finalContent?: true
  citySections?: true
  eSignatureText?: true
  certifiedAt?: true
  pdfUrl?: true
  status?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type ReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Report to aggregate.
   */
  where?: Prisma.ReportWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Reports to fetch.
   */
  orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.ReportWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Reports from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Reports.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned Reports
  **/
  _count?: true | ReportCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: ReportMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: ReportMaxAggregateInputType
}

export type GetReportAggregateType<T extends ReportAggregateArgs> = {
      [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateReport[P]>
    : Prisma.GetScalarType<T[P], AggregateReport[P]>
}




export type ReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ReportWhereInput
  orderBy?: Prisma.ReportOrderByWithAggregationInput | Prisma.ReportOrderByWithAggregationInput[]
  by: Prisma.ReportScalarFieldEnum[] | Prisma.ReportScalarFieldEnum
  having?: Prisma.ReportScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ReportCountAggregateInputType | true
  _min?: ReportMinAggregateInputType
  _max?: ReportMaxAggregateInputType
}

export type ReportGroupByOutputType = {
  id: string
  assessmentId: string
  arboristId: string
  reportType: string
  aiDraftContent: string | null
  finalContent: string | null
  citySections: string
  eSignatureText: string | null
  certifiedAt: Date | null
  pdfUrl: string | null
  status: string
  createdAt: Date
  updatedAt: Date
  _count: ReportCountAggregateOutputType | null
  _min: ReportMinAggregateOutputType | null
  _max: ReportMaxAggregateOutputType | null
}

type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ReportGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>
      }
    >
  >



export type ReportWhereInput = {
  AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[]
  OR?: Prisma.ReportWhereInput[]
  NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[]
  id?: Prisma.StringFilter<"Report"> | string
  assessmentId?: Prisma.StringFilter<"Report"> | string
  arboristId?: Prisma.StringFilter<"Report"> | string
  reportType?: Prisma.StringFilter<"Report"> | string
  aiDraftContent?: Prisma.StringNullableFilter<"Report"> | string | null
  finalContent?: Prisma.StringNullableFilter<"Report"> | string | null
  citySections?: Prisma.StringFilter<"Report"> | string
  eSignatureText?: Prisma.StringNullableFilter<"Report"> | string | null
  certifiedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null
  pdfUrl?: Prisma.StringNullableFilter<"Report"> | string | null
  status?: Prisma.StringFilter<"Report"> | string
  createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Report"> | Date | string
  assessment?: Prisma.XOR<Prisma.TreeAssessmentScalarRelationFilter, Prisma.TreeAssessmentWhereInput>
  arborist?: Prisma.XOR<Prisma.ArboristScalarRelationFilter, Prisma.ArboristWhereInput>
}

export type ReportOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  assessmentId?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  reportType?: Prisma.SortOrder
  aiDraftContent?: Prisma.SortOrderInput | Prisma.SortOrder
  finalContent?: Prisma.SortOrderInput | Prisma.SortOrder
  citySections?: Prisma.SortOrder
  eSignatureText?: Prisma.SortOrderInput | Prisma.SortOrder
  certifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  pdfUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  assessment?: Prisma.TreeAssessmentOrderByWithRelationInput
  arborist?: Prisma.ArboristOrderByWithRelationInput
}

export type ReportWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  assessmentId?: string
  AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[]
  OR?: Prisma.ReportWhereInput[]
  NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[]
  arboristId?: Prisma.StringFilter<"Report"> | string
  reportType?: Prisma.StringFilter<"Report"> | string
  aiDraftContent?: Prisma.StringNullableFilter<"Report"> | string | null
  finalContent?: Prisma.StringNullableFilter<"Report"> | string | null
  citySections?: Prisma.StringFilter<"Report"> | string
  eSignatureText?: Prisma.StringNullableFilter<"Report"> | string | null
  certifiedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null
  pdfUrl?: Prisma.StringNullableFilter<"Report"> | string | null
  status?: Prisma.StringFilter<"Report"> | string
  createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Report"> | Date | string
  assessment?: Prisma.XOR<Prisma.TreeAssessmentScalarRelationFilter, Prisma.TreeAssessmentWhereInput>
  arborist?: Prisma.XOR<Prisma.ArboristScalarRelationFilter, Prisma.ArboristWhereInput>
}, "id" | "assessmentId">

export type ReportOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  assessmentId?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  reportType?: Prisma.SortOrder
  aiDraftContent?: Prisma.SortOrderInput | Prisma.SortOrder
  finalContent?: Prisma.SortOrderInput | Prisma.SortOrder
  citySections?: Prisma.SortOrder
  eSignatureText?: Prisma.SortOrderInput | Prisma.SortOrder
  certifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  pdfUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.ReportCountOrderByAggregateInput
  _max?: Prisma.ReportMaxOrderByAggregateInput
  _min?: Prisma.ReportMinOrderByAggregateInput
}

export type ReportScalarWhereWithAggregatesInput = {
  AND?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[]
  OR?: Prisma.ReportScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Report"> | string
  assessmentId?: Prisma.StringWithAggregatesFilter<"Report"> | string
  arboristId?: Prisma.StringWithAggregatesFilter<"Report"> | string
  reportType?: Prisma.StringWithAggregatesFilter<"Report"> | string
  aiDraftContent?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null
  finalContent?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null
  citySections?: Prisma.StringWithAggregatesFilter<"Report"> | string
  eSignatureText?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null
  certifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null
  pdfUrl?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null
  status?: Prisma.StringWithAggregatesFilter<"Report"> | string
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Report"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Report"> | Date | string
}

export type ReportCreateInput = {
  id?: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  assessment: Prisma.TreeAssessmentCreateNestedOneWithoutReportInput
  arborist: Prisma.ArboristCreateNestedOneWithoutReportsInput
}

export type ReportUncheckedCreateInput = {
  id?: string
  assessmentId: string
  arboristId: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ReportUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessment?: Prisma.TreeAssessmentUpdateOneRequiredWithoutReportNestedInput
  arborist?: Prisma.ArboristUpdateOneRequiredWithoutReportsNestedInput
}

export type ReportUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  assessmentId?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ReportCreateManyInput = {
  id?: string
  assessmentId: string
  arboristId: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ReportUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ReportUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  assessmentId?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ReportListRelationFilter = {
  every?: Prisma.ReportWhereInput
  some?: Prisma.ReportWhereInput
  none?: Prisma.ReportWhereInput
}

export type ReportOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type ReportNullableScalarRelationFilter = {
  is?: Prisma.ReportWhereInput | null
  isNot?: Prisma.ReportWhereInput | null
}

export type ReportCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  assessmentId?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  reportType?: Prisma.SortOrder
  aiDraftContent?: Prisma.SortOrder
  finalContent?: Prisma.SortOrder
  citySections?: Prisma.SortOrder
  eSignatureText?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
  pdfUrl?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ReportMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  assessmentId?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  reportType?: Prisma.SortOrder
  aiDraftContent?: Prisma.SortOrder
  finalContent?: Prisma.SortOrder
  citySections?: Prisma.SortOrder
  eSignatureText?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
  pdfUrl?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ReportMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  assessmentId?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  reportType?: Prisma.SortOrder
  aiDraftContent?: Prisma.SortOrder
  finalContent?: Prisma.SortOrder
  citySections?: Prisma.SortOrder
  eSignatureText?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
  pdfUrl?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ReportCreateNestedManyWithoutArboristInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput> | Prisma.ReportCreateWithoutArboristInput[] | Prisma.ReportUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutArboristInput | Prisma.ReportCreateOrConnectWithoutArboristInput[]
  createMany?: Prisma.ReportCreateManyArboristInputEnvelope
  connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
}

export type ReportUncheckedCreateNestedManyWithoutArboristInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput> | Prisma.ReportCreateWithoutArboristInput[] | Prisma.ReportUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutArboristInput | Prisma.ReportCreateOrConnectWithoutArboristInput[]
  createMany?: Prisma.ReportCreateManyArboristInputEnvelope
  connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
}

export type ReportUpdateManyWithoutArboristNestedInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput> | Prisma.ReportCreateWithoutArboristInput[] | Prisma.ReportUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutArboristInput | Prisma.ReportCreateOrConnectWithoutArboristInput[]
  upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutArboristInput | Prisma.ReportUpsertWithWhereUniqueWithoutArboristInput[]
  createMany?: Prisma.ReportCreateManyArboristInputEnvelope
  set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  update?: Prisma.ReportUpdateWithWhereUniqueWithoutArboristInput | Prisma.ReportUpdateWithWhereUniqueWithoutArboristInput[]
  updateMany?: Prisma.ReportUpdateManyWithWhereWithoutArboristInput | Prisma.ReportUpdateManyWithWhereWithoutArboristInput[]
  deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[]
}

export type ReportUncheckedUpdateManyWithoutArboristNestedInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput> | Prisma.ReportCreateWithoutArboristInput[] | Prisma.ReportUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutArboristInput | Prisma.ReportCreateOrConnectWithoutArboristInput[]
  upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutArboristInput | Prisma.ReportUpsertWithWhereUniqueWithoutArboristInput[]
  createMany?: Prisma.ReportCreateManyArboristInputEnvelope
  set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[]
  update?: Prisma.ReportUpdateWithWhereUniqueWithoutArboristInput | Prisma.ReportUpdateWithWhereUniqueWithoutArboristInput[]
  updateMany?: Prisma.ReportUpdateManyWithWhereWithoutArboristInput | Prisma.ReportUpdateManyWithWhereWithoutArboristInput[]
  deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[]
}

export type ReportCreateNestedOneWithoutAssessmentInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAssessmentInput
  connect?: Prisma.ReportWhereUniqueInput
}

export type ReportUncheckedCreateNestedOneWithoutAssessmentInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAssessmentInput
  connect?: Prisma.ReportWhereUniqueInput
}

export type ReportUpdateOneWithoutAssessmentNestedInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAssessmentInput
  upsert?: Prisma.ReportUpsertWithoutAssessmentInput
  disconnect?: Prisma.ReportWhereInput | boolean
  delete?: Prisma.ReportWhereInput | boolean
  connect?: Prisma.ReportWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ReportUpdateToOneWithWhereWithoutAssessmentInput, Prisma.ReportUpdateWithoutAssessmentInput>, Prisma.ReportUncheckedUpdateWithoutAssessmentInput>
}

export type ReportUncheckedUpdateOneWithoutAssessmentNestedInput = {
  create?: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
  connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAssessmentInput
  upsert?: Prisma.ReportUpsertWithoutAssessmentInput
  disconnect?: Prisma.ReportWhereInput | boolean
  delete?: Prisma.ReportWhereInput | boolean
  connect?: Prisma.ReportWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ReportUpdateToOneWithWhereWithoutAssessmentInput, Prisma.ReportUpdateWithoutAssessmentInput>, Prisma.ReportUncheckedUpdateWithoutAssessmentInput>
}

export type ReportCreateWithoutArboristInput = {
  id?: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  assessment: Prisma.TreeAssessmentCreateNestedOneWithoutReportInput
}

export type ReportUncheckedCreateWithoutArboristInput = {
  id?: string
  assessmentId: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ReportCreateOrConnectWithoutArboristInput = {
  where: Prisma.ReportWhereUniqueInput
  create: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput>
}

export type ReportCreateManyArboristInputEnvelope = {
  data: Prisma.ReportCreateManyArboristInput | Prisma.ReportCreateManyArboristInput[]
}

export type ReportUpsertWithWhereUniqueWithoutArboristInput = {
  where: Prisma.ReportWhereUniqueInput
  update: Prisma.XOR<Prisma.ReportUpdateWithoutArboristInput, Prisma.ReportUncheckedUpdateWithoutArboristInput>
  create: Prisma.XOR<Prisma.ReportCreateWithoutArboristInput, Prisma.ReportUncheckedCreateWithoutArboristInput>
}

export type ReportUpdateWithWhereUniqueWithoutArboristInput = {
  where: Prisma.ReportWhereUniqueInput
  data: Prisma.XOR<Prisma.ReportUpdateWithoutArboristInput, Prisma.ReportUncheckedUpdateWithoutArboristInput>
}

export type ReportUpdateManyWithWhereWithoutArboristInput = {
  where: Prisma.ReportScalarWhereInput
  data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutArboristInput>
}

export type ReportScalarWhereInput = {
  AND?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[]
  OR?: Prisma.ReportScalarWhereInput[]
  NOT?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[]
  id?: Prisma.StringFilter<"Report"> | string
  assessmentId?: Prisma.StringFilter<"Report"> | string
  arboristId?: Prisma.StringFilter<"Report"> | string
  reportType?: Prisma.StringFilter<"Report"> | string
  aiDraftContent?: Prisma.StringNullableFilter<"Report"> | string | null
  finalContent?: Prisma.StringNullableFilter<"Report"> | string | null
  citySections?: Prisma.StringFilter<"Report"> | string
  eSignatureText?: Prisma.StringNullableFilter<"Report"> | string | null
  certifiedAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null
  pdfUrl?: Prisma.StringNullableFilter<"Report"> | string | null
  status?: Prisma.StringFilter<"Report"> | string
  createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Report"> | Date | string
}

export type ReportCreateWithoutAssessmentInput = {
  id?: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  arborist: Prisma.ArboristCreateNestedOneWithoutReportsInput
}

export type ReportUncheckedCreateWithoutAssessmentInput = {
  id?: string
  arboristId: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ReportCreateOrConnectWithoutAssessmentInput = {
  where: Prisma.ReportWhereUniqueInput
  create: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
}

export type ReportUpsertWithoutAssessmentInput = {
  update: Prisma.XOR<Prisma.ReportUpdateWithoutAssessmentInput, Prisma.ReportUncheckedUpdateWithoutAssessmentInput>
  create: Prisma.XOR<Prisma.ReportCreateWithoutAssessmentInput, Prisma.ReportUncheckedCreateWithoutAssessmentInput>
  where?: Prisma.ReportWhereInput
}

export type ReportUpdateToOneWithWhereWithoutAssessmentInput = {
  where?: Prisma.ReportWhereInput
  data: Prisma.XOR<Prisma.ReportUpdateWithoutAssessmentInput, Prisma.ReportUncheckedUpdateWithoutAssessmentInput>
}

export type ReportUpdateWithoutAssessmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  arborist?: Prisma.ArboristUpdateOneRequiredWithoutReportsNestedInput
}

export type ReportUncheckedUpdateWithoutAssessmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ReportCreateManyArboristInput = {
  id?: string
  assessmentId: string
  reportType: string
  aiDraftContent?: string | null
  finalContent?: string | null
  citySections?: string
  eSignatureText?: string | null
  certifiedAt?: Date | string | null
  pdfUrl?: string | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ReportUpdateWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assessment?: Prisma.TreeAssessmentUpdateOneRequiredWithoutReportNestedInput
}

export type ReportUncheckedUpdateWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  assessmentId?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ReportUncheckedUpdateManyWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  assessmentId?: Prisma.StringFieldUpdateOperationsInput | string
  reportType?: Prisma.StringFieldUpdateOperationsInput | string
  aiDraftContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  finalContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  citySections?: Prisma.StringFieldUpdateOperationsInput | string
  eSignatureText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  pdfUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}



export type ReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  assessmentId?: boolean
  arboristId?: boolean
  reportType?: boolean
  aiDraftContent?: boolean
  finalContent?: boolean
  citySections?: boolean
  eSignatureText?: boolean
  certifiedAt?: boolean
  pdfUrl?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}, ExtArgs["result"]["report"]>

export type ReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  assessmentId?: boolean
  arboristId?: boolean
  reportType?: boolean
  aiDraftContent?: boolean
  finalContent?: boolean
  citySections?: boolean
  eSignatureText?: boolean
  certifiedAt?: boolean
  pdfUrl?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}, ExtArgs["result"]["report"]>

export type ReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  assessmentId?: boolean
  arboristId?: boolean
  reportType?: boolean
  aiDraftContent?: boolean
  finalContent?: boolean
  citySections?: boolean
  eSignatureText?: boolean
  certifiedAt?: boolean
  pdfUrl?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}, ExtArgs["result"]["report"]>

export type ReportSelectScalar = {
  id?: boolean
  assessmentId?: boolean
  arboristId?: boolean
  reportType?: boolean
  aiDraftContent?: boolean
  finalContent?: boolean
  citySections?: boolean
  eSignatureText?: boolean
  certifiedAt?: boolean
  pdfUrl?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type ReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "assessmentId" | "arboristId" | "reportType" | "aiDraftContent" | "finalContent" | "citySections" | "eSignatureText" | "certifiedAt" | "pdfUrl" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
export type ReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}
export type ReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}
export type ReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assessment?: boolean | Prisma.TreeAssessmentDefaultArgs<ExtArgs>
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}

export type $ReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Report"
  objects: {
    assessment: Prisma.$TreeAssessmentPayload<ExtArgs>
    arborist: Prisma.$ArboristPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    assessmentId: string
    arboristId: string
    reportType: string
    aiDraftContent: string | null
    finalContent: string | null
    citySections: string
    eSignatureText: string | null
    certifiedAt: Date | null
    pdfUrl: string | null
    status: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["report"]>
  composites: {}
}

export type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReportPayload, S>

export type ReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReportCountAggregateInputType | true
  }

export interface ReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
  /**
   * Find zero or one Report that matches the filter.
   * @param {ReportFindUniqueArgs} args - Arguments to find a Report
   * @example
   * // Get one Report
   * const report = await prisma.report.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends ReportFindUniqueArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one Report that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
   * @example
   * // Get one Report
   * const report = await prisma.report.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Report that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportFindFirstArgs} args - Arguments to find a Report
   * @example
   * // Get one Report
   * const report = await prisma.report.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends ReportFindFirstArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Report that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
   * @example
   * // Get one Report
   * const report = await prisma.report.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more Reports that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Reports
   * const reports = await prisma.report.findMany()
   * 
   * // Get first 10 Reports
   * const reports = await prisma.report.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends ReportFindManyArgs>(args?: Prisma.SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a Report.
   * @param {ReportCreateArgs} args - Arguments to create a Report.
   * @example
   * // Create one Report
   * const Report = await prisma.report.create({
   *   data: {
   *     // ... data to create a Report
   *   }
   * })
   * 
   */
  create<T extends ReportCreateArgs>(args: Prisma.SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many Reports.
   * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
   * @example
   * // Create many Reports
   * const report = await prisma.report.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends ReportCreateManyArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many Reports and returns the data saved in the database.
   * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
   * @example
   * // Create many Reports
   * const report = await prisma.report.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many Reports and only return the `id`
   * const reportWithIdOnly = await prisma.report.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a Report.
   * @param {ReportDeleteArgs} args - Arguments to delete one Report.
   * @example
   * // Delete one Report
   * const Report = await prisma.report.delete({
   *   where: {
   *     // ... filter to delete one Report
   *   }
   * })
   * 
   */
  delete<T extends ReportDeleteArgs>(args: Prisma.SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one Report.
   * @param {ReportUpdateArgs} args - Arguments to update one Report.
   * @example
   * // Update one Report
   * const report = await prisma.report.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends ReportUpdateArgs>(args: Prisma.SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more Reports.
   * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
   * @example
   * // Delete a few Reports
   * const { count } = await prisma.report.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends ReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Reports.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Reports
   * const report = await prisma.report.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends ReportUpdateManyArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Reports and returns the data updated in the database.
   * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
   * @example
   * // Update many Reports
   * const report = await prisma.report.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more Reports and only return the `id`
   * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one Report.
   * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
   * @example
   * // Update or create a Report
   * const report = await prisma.report.upsert({
   *   create: {
   *     // ... data to create a Report
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Report we want to update
   *   }
   * })
   */
  upsert<T extends ReportUpsertArgs>(args: Prisma.SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of Reports.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportCountArgs} args - Arguments to filter Reports to count.
   * @example
   * // Count the number of Reports
   * const count = await prisma.report.count({
   *   where: {
   *     // ... the filter for the Reports we want to count
   *   }
   * })
  **/
  count<T extends ReportCountArgs>(
    args?: Prisma.Subset<T, ReportCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ReportCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a Report.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends ReportAggregateArgs>(args: Prisma.Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

  /**
   * Group by Report.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {ReportGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends ReportGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ReportGroupByArgs['orderBy'] }
      : { orderBy?: ReportGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the Report model
 */
readonly fields: ReportFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for Report.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  assessment<T extends Prisma.TreeAssessmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TreeAssessmentDefaultArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  arborist<T extends Prisma.ArboristDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ArboristDefaultArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the Report model
 */
export interface ReportFieldRefs {
  readonly id: Prisma.FieldRef<"Report", 'String'>
  readonly assessmentId: Prisma.FieldRef<"Report", 'String'>
  readonly arboristId: Prisma.FieldRef<"Report", 'String'>
  readonly reportType: Prisma.FieldRef<"Report", 'String'>
  readonly aiDraftContent: Prisma.FieldRef<"Report", 'String'>
  readonly finalContent: Prisma.FieldRef<"Report", 'String'>
  readonly citySections: Prisma.FieldRef<"Report", 'String'>
  readonly eSignatureText: Prisma.FieldRef<"Report", 'String'>
  readonly certifiedAt: Prisma.FieldRef<"Report", 'DateTime'>
  readonly pdfUrl: Prisma.FieldRef<"Report", 'String'>
  readonly status: Prisma.FieldRef<"Report", 'String'>
  readonly createdAt: Prisma.FieldRef<"Report", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Report", 'DateTime'>
}
    

// Custom InputTypes
/**
 * Report findUnique
 */
export type ReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter, which Report to fetch.
   */
  where: Prisma.ReportWhereUniqueInput
}

/**
 * Report findUniqueOrThrow
 */
export type ReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter, which Report to fetch.
   */
  where: Prisma.ReportWhereUniqueInput
}

/**
 * Report findFirst
 */
export type ReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter, which Report to fetch.
   */
  where?: Prisma.ReportWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Reports to fetch.
   */
  orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Reports.
   */
  cursor?: Prisma.ReportWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Reports from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Reports.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Reports.
   */
  distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[]
}

/**
 * Report findFirstOrThrow
 */
export type ReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter, which Report to fetch.
   */
  where?: Prisma.ReportWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Reports to fetch.
   */
  orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Reports.
   */
  cursor?: Prisma.ReportWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Reports from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Reports.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Reports.
   */
  distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[]
}

/**
 * Report findMany
 */
export type ReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter, which Reports to fetch.
   */
  where?: Prisma.ReportWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Reports to fetch.
   */
  orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing Reports.
   */
  cursor?: Prisma.ReportWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Reports from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Reports.
   */
  skip?: number
  distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[]
}

/**
 * Report create
 */
export type ReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * The data needed to create a Report.
   */
  data: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>
}

/**
 * Report createMany
 */
export type ReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many Reports.
   */
  data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[]
}

/**
 * Report createManyAndReturn
 */
export type ReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * The data used to create many Reports.
   */
  data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[]
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportIncludeCreateManyAndReturn<ExtArgs> | null
}

/**
 * Report update
 */
export type ReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * The data needed to update a Report.
   */
  data: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>
  /**
   * Choose, which Report to update.
   */
  where: Prisma.ReportWhereUniqueInput
}

/**
 * Report updateMany
 */
export type ReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update Reports.
   */
  data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>
  /**
   * Filter which Reports to update
   */
  where?: Prisma.ReportWhereInput
  /**
   * Limit how many Reports to update.
   */
  limit?: number
}

/**
 * Report updateManyAndReturn
 */
export type ReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * The data used to update Reports.
   */
  data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>
  /**
   * Filter which Reports to update
   */
  where?: Prisma.ReportWhereInput
  /**
   * Limit how many Reports to update.
   */
  limit?: number
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportIncludeUpdateManyAndReturn<ExtArgs> | null
}

/**
 * Report upsert
 */
export type ReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * The filter to search for the Report to update in case it exists.
   */
  where: Prisma.ReportWhereUniqueInput
  /**
   * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
   */
  create: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>
  /**
   * In case the Report was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>
}

/**
 * Report delete
 */
export type ReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  /**
   * Filter which Report to delete.
   */
  where: Prisma.ReportWhereUniqueInput
}

/**
 * Report deleteMany
 */
export type ReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Reports to delete
   */
  where?: Prisma.ReportWhereInput
  /**
   * Limit how many Reports to delete.
   */
  limit?: number
}

/**
 * Report without action
 */
export type ReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
}

```

### lib/generated/prisma/models/TreeAssessment.ts
```ts

/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file exports the `TreeAssessment` model and its related types.
 *
 * 🟢 You can import this file directly.
 */
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model TreeAssessment
 * 
 */
export type TreeAssessmentModel = runtime.Types.Result.DefaultSelection<Prisma.$TreeAssessmentPayload>

export type AggregateTreeAssessment = {
  _count: TreeAssessmentCountAggregateOutputType | null
  _avg: TreeAssessmentAvgAggregateOutputType | null
  _sum: TreeAssessmentSumAggregateOutputType | null
  _min: TreeAssessmentMinAggregateOutputType | null
  _max: TreeAssessmentMaxAggregateOutputType | null
}

export type TreeAssessmentAvgAggregateOutputType = {
  dbhInches: number | null
  heightFt: number | null
  canopySpreadFt: number | null
  conditionRating: number | null
  locationLat: number | null
  locationLng: number | null
}

export type TreeAssessmentSumAggregateOutputType = {
  dbhInches: number | null
  heightFt: number | null
  canopySpreadFt: number | null
  conditionRating: number | null
  locationLat: number | null
  locationLng: number | null
}

export type TreeAssessmentMinAggregateOutputType = {
  id: string | null
  arboristId: string | null
  propertyAddress: string | null
  city: string | null
  county: string | null
  parcelNumber: string | null
  treeSpeciesCommon: string | null
  treeSpeciesScientific: string | null
  dbhInches: number | null
  heightFt: number | null
  canopySpreadFt: number | null
  conditionRating: number | null
  healthNotes: string | null
  structuralNotes: string | null
  isProtected: boolean | null
  protectionReason: string | null
  recommendedAction: string | null
  mitigationRequired: string | null
  photos: string | null
  locationLat: number | null
  locationLng: number | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
  certifiedAt: Date | null
}

export type TreeAssessmentMaxAggregateOutputType = {
  id: string | null
  arboristId: string | null
  propertyAddress: string | null
  city: string | null
  county: string | null
  parcelNumber: string | null
  treeSpeciesCommon: string | null
  treeSpeciesScientific: string | null
  dbhInches: number | null
  heightFt: number | null
  canopySpreadFt: number | null
  conditionRating: number | null
  healthNotes: string | null
  structuralNotes: string | null
  isProtected: boolean | null
  protectionReason: string | null
  recommendedAction: string | null
  mitigationRequired: string | null
  photos: string | null
  locationLat: number | null
  locationLng: number | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
  certifiedAt: Date | null
}

export type TreeAssessmentCountAggregateOutputType = {
  id: number
  arboristId: number
  propertyAddress: number
  city: number
  county: number
  parcelNumber: number
  treeSpeciesCommon: number
  treeSpeciesScientific: number
  dbhInches: number
  heightFt: number
  canopySpreadFt: number
  conditionRating: number
  healthNotes: number
  structuralNotes: number
  isProtected: number
  protectionReason: number
  recommendedAction: number
  mitigationRequired: number
  photos: number
  locationLat: number
  locationLng: number
  status: number
  createdAt: number
  updatedAt: number
  certifiedAt: number
  _all: number
}


export type TreeAssessmentAvgAggregateInputType = {
  dbhInches?: true
  heightFt?: true
  canopySpreadFt?: true
  conditionRating?: true
  locationLat?: true
  locationLng?: true
}

export type TreeAssessmentSumAggregateInputType = {
  dbhInches?: true
  heightFt?: true
  canopySpreadFt?: true
  conditionRating?: true
  locationLat?: true
  locationLng?: true
}

export type TreeAssessmentMinAggregateInputType = {
  id?: true
  arboristId?: true
  propertyAddress?: true
  city?: true
  county?: true
  parcelNumber?: true
  treeSpeciesCommon?: true
  treeSpeciesScientific?: true
  dbhInches?: true
  heightFt?: true
  canopySpreadFt?: true
  conditionRating?: true
  healthNotes?: true
  structuralNotes?: true
  isProtected?: true
  protectionReason?: true
  recommendedAction?: true
  mitigationRequired?: true
  photos?: true
  locationLat?: true
  locationLng?: true
  status?: true
  createdAt?: true
  updatedAt?: true
  certifiedAt?: true
}

export type TreeAssessmentMaxAggregateInputType = {
  id?: true
  arboristId?: true
  propertyAddress?: true
  city?: true
  county?: true
  parcelNumber?: true
  treeSpeciesCommon?: true
  treeSpeciesScientific?: true
  dbhInches?: true
  heightFt?: true
  canopySpreadFt?: true
  conditionRating?: true
  healthNotes?: true
  structuralNotes?: true
  isProtected?: true
  protectionReason?: true
  recommendedAction?: true
  mitigationRequired?: true
  photos?: true
  locationLat?: true
  locationLng?: true
  status?: true
  createdAt?: true
  updatedAt?: true
  certifiedAt?: true
}

export type TreeAssessmentCountAggregateInputType = {
  id?: true
  arboristId?: true
  propertyAddress?: true
  city?: true
  county?: true
  parcelNumber?: true
  treeSpeciesCommon?: true
  treeSpeciesScientific?: true
  dbhInches?: true
  heightFt?: true
  canopySpreadFt?: true
  conditionRating?: true
  healthNotes?: true
  structuralNotes?: true
  isProtected?: true
  protectionReason?: true
  recommendedAction?: true
  mitigationRequired?: true
  photos?: true
  locationLat?: true
  locationLng?: true
  status?: true
  createdAt?: true
  updatedAt?: true
  certifiedAt?: true
  _all?: true
}

export type TreeAssessmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which TreeAssessment to aggregate.
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of TreeAssessments to fetch.
   */
  orderBy?: Prisma.TreeAssessmentOrderByWithRelationInput | Prisma.TreeAssessmentOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.TreeAssessmentWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` TreeAssessments from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` TreeAssessments.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned TreeAssessments
  **/
  _count?: true | TreeAssessmentCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to average
  **/
  _avg?: TreeAssessmentAvgAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to sum
  **/
  _sum?: TreeAssessmentSumAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: TreeAssessmentMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: TreeAssessmentMaxAggregateInputType
}

export type GetTreeAssessmentAggregateType<T extends TreeAssessmentAggregateArgs> = {
      [P in keyof T & keyof AggregateTreeAssessment]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateTreeAssessment[P]>
    : Prisma.GetScalarType<T[P], AggregateTreeAssessment[P]>
}




export type TreeAssessmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.TreeAssessmentWhereInput
  orderBy?: Prisma.TreeAssessmentOrderByWithAggregationInput | Prisma.TreeAssessmentOrderByWithAggregationInput[]
  by: Prisma.TreeAssessmentScalarFieldEnum[] | Prisma.TreeAssessmentScalarFieldEnum
  having?: Prisma.TreeAssessmentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: TreeAssessmentCountAggregateInputType | true
  _avg?: TreeAssessmentAvgAggregateInputType
  _sum?: TreeAssessmentSumAggregateInputType
  _min?: TreeAssessmentMinAggregateInputType
  _max?: TreeAssessmentMaxAggregateInputType
}

export type TreeAssessmentGroupByOutputType = {
  id: string
  arboristId: string
  propertyAddress: string
  city: string
  county: string
  parcelNumber: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt: number | null
  canopySpreadFt: number | null
  conditionRating: number
  healthNotes: string | null
  structuralNotes: string | null
  isProtected: boolean
  protectionReason: string | null
  recommendedAction: string
  mitigationRequired: string | null
  photos: string
  locationLat: number | null
  locationLng: number | null
  status: string
  createdAt: Date
  updatedAt: Date
  certifiedAt: Date | null
  _count: TreeAssessmentCountAggregateOutputType | null
  _avg: TreeAssessmentAvgAggregateOutputType | null
  _sum: TreeAssessmentSumAggregateOutputType | null
  _min: TreeAssessmentMinAggregateOutputType | null
  _max: TreeAssessmentMaxAggregateOutputType | null
}

type GetTreeAssessmentGroupByPayload<T extends TreeAssessmentGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<TreeAssessmentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof TreeAssessmentGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], TreeAssessmentGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], TreeAssessmentGroupByOutputType[P]>
      }
    >
  >



export type TreeAssessmentWhereInput = {
  AND?: Prisma.TreeAssessmentWhereInput | Prisma.TreeAssessmentWhereInput[]
  OR?: Prisma.TreeAssessmentWhereInput[]
  NOT?: Prisma.TreeAssessmentWhereInput | Prisma.TreeAssessmentWhereInput[]
  id?: Prisma.StringFilter<"TreeAssessment"> | string
  arboristId?: Prisma.StringFilter<"TreeAssessment"> | string
  propertyAddress?: Prisma.StringFilter<"TreeAssessment"> | string
  city?: Prisma.StringFilter<"TreeAssessment"> | string
  county?: Prisma.StringFilter<"TreeAssessment"> | string
  parcelNumber?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  treeSpeciesCommon?: Prisma.StringFilter<"TreeAssessment"> | string
  treeSpeciesScientific?: Prisma.StringFilter<"TreeAssessment"> | string
  dbhInches?: Prisma.FloatFilter<"TreeAssessment"> | number
  heightFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  canopySpreadFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  conditionRating?: Prisma.IntFilter<"TreeAssessment"> | number
  healthNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  structuralNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  isProtected?: Prisma.BoolFilter<"TreeAssessment"> | boolean
  protectionReason?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  recommendedAction?: Prisma.StringFilter<"TreeAssessment"> | string
  mitigationRequired?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  photos?: Prisma.StringFilter<"TreeAssessment"> | string
  locationLat?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  locationLng?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  status?: Prisma.StringFilter<"TreeAssessment"> | string
  createdAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  certifiedAt?: Prisma.DateTimeNullableFilter<"TreeAssessment"> | Date | string | null
  arborist?: Prisma.XOR<Prisma.ArboristScalarRelationFilter, Prisma.ArboristWhereInput>
  report?: Prisma.XOR<Prisma.ReportNullableScalarRelationFilter, Prisma.ReportWhereInput> | null
}

export type TreeAssessmentOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  propertyAddress?: Prisma.SortOrder
  city?: Prisma.SortOrder
  county?: Prisma.SortOrder
  parcelNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  treeSpeciesCommon?: Prisma.SortOrder
  treeSpeciesScientific?: Prisma.SortOrder
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrderInput | Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrderInput | Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  healthNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  structuralNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  isProtected?: Prisma.SortOrder
  protectionReason?: Prisma.SortOrderInput | Prisma.SortOrder
  recommendedAction?: Prisma.SortOrder
  mitigationRequired?: Prisma.SortOrderInput | Prisma.SortOrder
  photos?: Prisma.SortOrder
  locationLat?: Prisma.SortOrderInput | Prisma.SortOrder
  locationLng?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  arborist?: Prisma.ArboristOrderByWithRelationInput
  report?: Prisma.ReportOrderByWithRelationInput
}

export type TreeAssessmentWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.TreeAssessmentWhereInput | Prisma.TreeAssessmentWhereInput[]
  OR?: Prisma.TreeAssessmentWhereInput[]
  NOT?: Prisma.TreeAssessmentWhereInput | Prisma.TreeAssessmentWhereInput[]
  arboristId?: Prisma.StringFilter<"TreeAssessment"> | string
  propertyAddress?: Prisma.StringFilter<"TreeAssessment"> | string
  city?: Prisma.StringFilter<"TreeAssessment"> | string
  county?: Prisma.StringFilter<"TreeAssessment"> | string
  parcelNumber?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  treeSpeciesCommon?: Prisma.StringFilter<"TreeAssessment"> | string
  treeSpeciesScientific?: Prisma.StringFilter<"TreeAssessment"> | string
  dbhInches?: Prisma.FloatFilter<"TreeAssessment"> | number
  heightFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  canopySpreadFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  conditionRating?: Prisma.IntFilter<"TreeAssessment"> | number
  healthNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  structuralNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  isProtected?: Prisma.BoolFilter<"TreeAssessment"> | boolean
  protectionReason?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  recommendedAction?: Prisma.StringFilter<"TreeAssessment"> | string
  mitigationRequired?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  photos?: Prisma.StringFilter<"TreeAssessment"> | string
  locationLat?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  locationLng?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  status?: Prisma.StringFilter<"TreeAssessment"> | string
  createdAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  certifiedAt?: Prisma.DateTimeNullableFilter<"TreeAssessment"> | Date | string | null
  arborist?: Prisma.XOR<Prisma.ArboristScalarRelationFilter, Prisma.ArboristWhereInput>
  report?: Prisma.XOR<Prisma.ReportNullableScalarRelationFilter, Prisma.ReportWhereInput> | null
}, "id">

export type TreeAssessmentOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  propertyAddress?: Prisma.SortOrder
  city?: Prisma.SortOrder
  county?: Prisma.SortOrder
  parcelNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  treeSpeciesCommon?: Prisma.SortOrder
  treeSpeciesScientific?: Prisma.SortOrder
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrderInput | Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrderInput | Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  healthNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  structuralNotes?: Prisma.SortOrderInput | Prisma.SortOrder
  isProtected?: Prisma.SortOrder
  protectionReason?: Prisma.SortOrderInput | Prisma.SortOrder
  recommendedAction?: Prisma.SortOrder
  mitigationRequired?: Prisma.SortOrderInput | Prisma.SortOrder
  photos?: Prisma.SortOrder
  locationLat?: Prisma.SortOrderInput | Prisma.SortOrder
  locationLng?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  _count?: Prisma.TreeAssessmentCountOrderByAggregateInput
  _avg?: Prisma.TreeAssessmentAvgOrderByAggregateInput
  _max?: Prisma.TreeAssessmentMaxOrderByAggregateInput
  _min?: Prisma.TreeAssessmentMinOrderByAggregateInput
  _sum?: Prisma.TreeAssessmentSumOrderByAggregateInput
}

export type TreeAssessmentScalarWhereWithAggregatesInput = {
  AND?: Prisma.TreeAssessmentScalarWhereWithAggregatesInput | Prisma.TreeAssessmentScalarWhereWithAggregatesInput[]
  OR?: Prisma.TreeAssessmentScalarWhereWithAggregatesInput[]
  NOT?: Prisma.TreeAssessmentScalarWhereWithAggregatesInput | Prisma.TreeAssessmentScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  arboristId?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  propertyAddress?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  city?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  county?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  parcelNumber?: Prisma.StringNullableWithAggregatesFilter<"TreeAssessment"> | string | null
  treeSpeciesCommon?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  treeSpeciesScientific?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  dbhInches?: Prisma.FloatWithAggregatesFilter<"TreeAssessment"> | number
  heightFt?: Prisma.FloatNullableWithAggregatesFilter<"TreeAssessment"> | number | null
  canopySpreadFt?: Prisma.FloatNullableWithAggregatesFilter<"TreeAssessment"> | number | null
  conditionRating?: Prisma.IntWithAggregatesFilter<"TreeAssessment"> | number
  healthNotes?: Prisma.StringNullableWithAggregatesFilter<"TreeAssessment"> | string | null
  structuralNotes?: Prisma.StringNullableWithAggregatesFilter<"TreeAssessment"> | string | null
  isProtected?: Prisma.BoolWithAggregatesFilter<"TreeAssessment"> | boolean
  protectionReason?: Prisma.StringNullableWithAggregatesFilter<"TreeAssessment"> | string | null
  recommendedAction?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  mitigationRequired?: Prisma.StringNullableWithAggregatesFilter<"TreeAssessment"> | string | null
  photos?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  locationLat?: Prisma.FloatNullableWithAggregatesFilter<"TreeAssessment"> | number | null
  locationLng?: Prisma.FloatNullableWithAggregatesFilter<"TreeAssessment"> | number | null
  status?: Prisma.StringWithAggregatesFilter<"TreeAssessment"> | string
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"TreeAssessment"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TreeAssessment"> | Date | string
  certifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"TreeAssessment"> | Date | string | null
}

export type TreeAssessmentCreateInput = {
  id?: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
  arborist: Prisma.ArboristCreateNestedOneWithoutAssessmentsInput
  report?: Prisma.ReportCreateNestedOneWithoutAssessmentInput
}

export type TreeAssessmentUncheckedCreateInput = {
  id?: string
  arboristId: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
  report?: Prisma.ReportUncheckedCreateNestedOneWithoutAssessmentInput
}

export type TreeAssessmentUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  arborist?: Prisma.ArboristUpdateOneRequiredWithoutAssessmentsNestedInput
  report?: Prisma.ReportUpdateOneWithoutAssessmentNestedInput
}

export type TreeAssessmentUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  report?: Prisma.ReportUncheckedUpdateOneWithoutAssessmentNestedInput
}

export type TreeAssessmentCreateManyInput = {
  id?: string
  arboristId: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
}

export type TreeAssessmentUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type TreeAssessmentUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type TreeAssessmentListRelationFilter = {
  every?: Prisma.TreeAssessmentWhereInput
  some?: Prisma.TreeAssessmentWhereInput
  none?: Prisma.TreeAssessmentWhereInput
}

export type TreeAssessmentOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type TreeAssessmentCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  propertyAddress?: Prisma.SortOrder
  city?: Prisma.SortOrder
  county?: Prisma.SortOrder
  parcelNumber?: Prisma.SortOrder
  treeSpeciesCommon?: Prisma.SortOrder
  treeSpeciesScientific?: Prisma.SortOrder
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  healthNotes?: Prisma.SortOrder
  structuralNotes?: Prisma.SortOrder
  isProtected?: Prisma.SortOrder
  protectionReason?: Prisma.SortOrder
  recommendedAction?: Prisma.SortOrder
  mitigationRequired?: Prisma.SortOrder
  photos?: Prisma.SortOrder
  locationLat?: Prisma.SortOrder
  locationLng?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
}

export type TreeAssessmentAvgOrderByAggregateInput = {
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  locationLat?: Prisma.SortOrder
  locationLng?: Prisma.SortOrder
}

export type TreeAssessmentMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  propertyAddress?: Prisma.SortOrder
  city?: Prisma.SortOrder
  county?: Prisma.SortOrder
  parcelNumber?: Prisma.SortOrder
  treeSpeciesCommon?: Prisma.SortOrder
  treeSpeciesScientific?: Prisma.SortOrder
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  healthNotes?: Prisma.SortOrder
  structuralNotes?: Prisma.SortOrder
  isProtected?: Prisma.SortOrder
  protectionReason?: Prisma.SortOrder
  recommendedAction?: Prisma.SortOrder
  mitigationRequired?: Prisma.SortOrder
  photos?: Prisma.SortOrder
  locationLat?: Prisma.SortOrder
  locationLng?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
}

export type TreeAssessmentMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  arboristId?: Prisma.SortOrder
  propertyAddress?: Prisma.SortOrder
  city?: Prisma.SortOrder
  county?: Prisma.SortOrder
  parcelNumber?: Prisma.SortOrder
  treeSpeciesCommon?: Prisma.SortOrder
  treeSpeciesScientific?: Prisma.SortOrder
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  healthNotes?: Prisma.SortOrder
  structuralNotes?: Prisma.SortOrder
  isProtected?: Prisma.SortOrder
  protectionReason?: Prisma.SortOrder
  recommendedAction?: Prisma.SortOrder
  mitigationRequired?: Prisma.SortOrder
  photos?: Prisma.SortOrder
  locationLat?: Prisma.SortOrder
  locationLng?: Prisma.SortOrder
  status?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  certifiedAt?: Prisma.SortOrder
}

export type TreeAssessmentSumOrderByAggregateInput = {
  dbhInches?: Prisma.SortOrder
  heightFt?: Prisma.SortOrder
  canopySpreadFt?: Prisma.SortOrder
  conditionRating?: Prisma.SortOrder
  locationLat?: Prisma.SortOrder
  locationLng?: Prisma.SortOrder
}

export type TreeAssessmentScalarRelationFilter = {
  is?: Prisma.TreeAssessmentWhereInput
  isNot?: Prisma.TreeAssessmentWhereInput
}

export type TreeAssessmentCreateNestedManyWithoutArboristInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput> | Prisma.TreeAssessmentCreateWithoutArboristInput[] | Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput | Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput[]
  createMany?: Prisma.TreeAssessmentCreateManyArboristInputEnvelope
  connect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
}

export type TreeAssessmentUncheckedCreateNestedManyWithoutArboristInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput> | Prisma.TreeAssessmentCreateWithoutArboristInput[] | Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput | Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput[]
  createMany?: Prisma.TreeAssessmentCreateManyArboristInputEnvelope
  connect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
}

export type TreeAssessmentUpdateManyWithoutArboristNestedInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput> | Prisma.TreeAssessmentCreateWithoutArboristInput[] | Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput | Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput[]
  upsert?: Prisma.TreeAssessmentUpsertWithWhereUniqueWithoutArboristInput | Prisma.TreeAssessmentUpsertWithWhereUniqueWithoutArboristInput[]
  createMany?: Prisma.TreeAssessmentCreateManyArboristInputEnvelope
  set?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  disconnect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  delete?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  connect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  update?: Prisma.TreeAssessmentUpdateWithWhereUniqueWithoutArboristInput | Prisma.TreeAssessmentUpdateWithWhereUniqueWithoutArboristInput[]
  updateMany?: Prisma.TreeAssessmentUpdateManyWithWhereWithoutArboristInput | Prisma.TreeAssessmentUpdateManyWithWhereWithoutArboristInput[]
  deleteMany?: Prisma.TreeAssessmentScalarWhereInput | Prisma.TreeAssessmentScalarWhereInput[]
}

export type TreeAssessmentUncheckedUpdateManyWithoutArboristNestedInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput> | Prisma.TreeAssessmentCreateWithoutArboristInput[] | Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput[]
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput | Prisma.TreeAssessmentCreateOrConnectWithoutArboristInput[]
  upsert?: Prisma.TreeAssessmentUpsertWithWhereUniqueWithoutArboristInput | Prisma.TreeAssessmentUpsertWithWhereUniqueWithoutArboristInput[]
  createMany?: Prisma.TreeAssessmentCreateManyArboristInputEnvelope
  set?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  disconnect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  delete?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  connect?: Prisma.TreeAssessmentWhereUniqueInput | Prisma.TreeAssessmentWhereUniqueInput[]
  update?: Prisma.TreeAssessmentUpdateWithWhereUniqueWithoutArboristInput | Prisma.TreeAssessmentUpdateWithWhereUniqueWithoutArboristInput[]
  updateMany?: Prisma.TreeAssessmentUpdateManyWithWhereWithoutArboristInput | Prisma.TreeAssessmentUpdateManyWithWhereWithoutArboristInput[]
  deleteMany?: Prisma.TreeAssessmentScalarWhereInput | Prisma.TreeAssessmentScalarWhereInput[]
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type NullableFloatFieldUpdateOperationsInput = {
  set?: number | null
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type TreeAssessmentCreateNestedOneWithoutReportInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutReportInput, Prisma.TreeAssessmentUncheckedCreateWithoutReportInput>
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutReportInput
  connect?: Prisma.TreeAssessmentWhereUniqueInput
}

export type TreeAssessmentUpdateOneRequiredWithoutReportNestedInput = {
  create?: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutReportInput, Prisma.TreeAssessmentUncheckedCreateWithoutReportInput>
  connectOrCreate?: Prisma.TreeAssessmentCreateOrConnectWithoutReportInput
  upsert?: Prisma.TreeAssessmentUpsertWithoutReportInput
  connect?: Prisma.TreeAssessmentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.TreeAssessmentUpdateToOneWithWhereWithoutReportInput, Prisma.TreeAssessmentUpdateWithoutReportInput>, Prisma.TreeAssessmentUncheckedUpdateWithoutReportInput>
}

export type TreeAssessmentCreateWithoutArboristInput = {
  id?: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
  report?: Prisma.ReportCreateNestedOneWithoutAssessmentInput
}

export type TreeAssessmentUncheckedCreateWithoutArboristInput = {
  id?: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
  report?: Prisma.ReportUncheckedCreateNestedOneWithoutAssessmentInput
}

export type TreeAssessmentCreateOrConnectWithoutArboristInput = {
  where: Prisma.TreeAssessmentWhereUniqueInput
  create: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput>
}

export type TreeAssessmentCreateManyArboristInputEnvelope = {
  data: Prisma.TreeAssessmentCreateManyArboristInput | Prisma.TreeAssessmentCreateManyArboristInput[]
}

export type TreeAssessmentUpsertWithWhereUniqueWithoutArboristInput = {
  where: Prisma.TreeAssessmentWhereUniqueInput
  update: Prisma.XOR<Prisma.TreeAssessmentUpdateWithoutArboristInput, Prisma.TreeAssessmentUncheckedUpdateWithoutArboristInput>
  create: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutArboristInput, Prisma.TreeAssessmentUncheckedCreateWithoutArboristInput>
}

export type TreeAssessmentUpdateWithWhereUniqueWithoutArboristInput = {
  where: Prisma.TreeAssessmentWhereUniqueInput
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateWithoutArboristInput, Prisma.TreeAssessmentUncheckedUpdateWithoutArboristInput>
}

export type TreeAssessmentUpdateManyWithWhereWithoutArboristInput = {
  where: Prisma.TreeAssessmentScalarWhereInput
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateManyMutationInput, Prisma.TreeAssessmentUncheckedUpdateManyWithoutArboristInput>
}

export type TreeAssessmentScalarWhereInput = {
  AND?: Prisma.TreeAssessmentScalarWhereInput | Prisma.TreeAssessmentScalarWhereInput[]
  OR?: Prisma.TreeAssessmentScalarWhereInput[]
  NOT?: Prisma.TreeAssessmentScalarWhereInput | Prisma.TreeAssessmentScalarWhereInput[]
  id?: Prisma.StringFilter<"TreeAssessment"> | string
  arboristId?: Prisma.StringFilter<"TreeAssessment"> | string
  propertyAddress?: Prisma.StringFilter<"TreeAssessment"> | string
  city?: Prisma.StringFilter<"TreeAssessment"> | string
  county?: Prisma.StringFilter<"TreeAssessment"> | string
  parcelNumber?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  treeSpeciesCommon?: Prisma.StringFilter<"TreeAssessment"> | string
  treeSpeciesScientific?: Prisma.StringFilter<"TreeAssessment"> | string
  dbhInches?: Prisma.FloatFilter<"TreeAssessment"> | number
  heightFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  canopySpreadFt?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  conditionRating?: Prisma.IntFilter<"TreeAssessment"> | number
  healthNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  structuralNotes?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  isProtected?: Prisma.BoolFilter<"TreeAssessment"> | boolean
  protectionReason?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  recommendedAction?: Prisma.StringFilter<"TreeAssessment"> | string
  mitigationRequired?: Prisma.StringNullableFilter<"TreeAssessment"> | string | null
  photos?: Prisma.StringFilter<"TreeAssessment"> | string
  locationLat?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  locationLng?: Prisma.FloatNullableFilter<"TreeAssessment"> | number | null
  status?: Prisma.StringFilter<"TreeAssessment"> | string
  createdAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"TreeAssessment"> | Date | string
  certifiedAt?: Prisma.DateTimeNullableFilter<"TreeAssessment"> | Date | string | null
}

export type TreeAssessmentCreateWithoutReportInput = {
  id?: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
  arborist: Prisma.ArboristCreateNestedOneWithoutAssessmentsInput
}

export type TreeAssessmentUncheckedCreateWithoutReportInput = {
  id?: string
  arboristId: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
}

export type TreeAssessmentCreateOrConnectWithoutReportInput = {
  where: Prisma.TreeAssessmentWhereUniqueInput
  create: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutReportInput, Prisma.TreeAssessmentUncheckedCreateWithoutReportInput>
}

export type TreeAssessmentUpsertWithoutReportInput = {
  update: Prisma.XOR<Prisma.TreeAssessmentUpdateWithoutReportInput, Prisma.TreeAssessmentUncheckedUpdateWithoutReportInput>
  create: Prisma.XOR<Prisma.TreeAssessmentCreateWithoutReportInput, Prisma.TreeAssessmentUncheckedCreateWithoutReportInput>
  where?: Prisma.TreeAssessmentWhereInput
}

export type TreeAssessmentUpdateToOneWithWhereWithoutReportInput = {
  where?: Prisma.TreeAssessmentWhereInput
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateWithoutReportInput, Prisma.TreeAssessmentUncheckedUpdateWithoutReportInput>
}

export type TreeAssessmentUpdateWithoutReportInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  arborist?: Prisma.ArboristUpdateOneRequiredWithoutAssessmentsNestedInput
}

export type TreeAssessmentUncheckedUpdateWithoutReportInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  arboristId?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}

export type TreeAssessmentCreateManyArboristInput = {
  id?: string
  propertyAddress: string
  city: string
  county?: string
  parcelNumber?: string | null
  treeSpeciesCommon: string
  treeSpeciesScientific: string
  dbhInches: number
  heightFt?: number | null
  canopySpreadFt?: number | null
  conditionRating: number
  healthNotes?: string | null
  structuralNotes?: string | null
  isProtected?: boolean
  protectionReason?: string | null
  recommendedAction?: string
  mitigationRequired?: string | null
  photos?: string
  locationLat?: number | null
  locationLng?: number | null
  status?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  certifiedAt?: Date | string | null
}

export type TreeAssessmentUpdateWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  report?: Prisma.ReportUpdateOneWithoutAssessmentNestedInput
}

export type TreeAssessmentUncheckedUpdateWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  report?: Prisma.ReportUncheckedUpdateOneWithoutAssessmentNestedInput
}

export type TreeAssessmentUncheckedUpdateManyWithoutArboristInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  propertyAddress?: Prisma.StringFieldUpdateOperationsInput | string
  city?: Prisma.StringFieldUpdateOperationsInput | string
  county?: Prisma.StringFieldUpdateOperationsInput | string
  parcelNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  treeSpeciesCommon?: Prisma.StringFieldUpdateOperationsInput | string
  treeSpeciesScientific?: Prisma.StringFieldUpdateOperationsInput | string
  dbhInches?: Prisma.FloatFieldUpdateOperationsInput | number
  heightFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  canopySpreadFt?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  conditionRating?: Prisma.IntFieldUpdateOperationsInput | number
  healthNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  structuralNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  isProtected?: Prisma.BoolFieldUpdateOperationsInput | boolean
  protectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  recommendedAction?: Prisma.StringFieldUpdateOperationsInput | string
  mitigationRequired?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  photos?: Prisma.StringFieldUpdateOperationsInput | string
  locationLat?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  locationLng?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null
  status?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  certifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
}



export type TreeAssessmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  arboristId?: boolean
  propertyAddress?: boolean
  city?: boolean
  county?: boolean
  parcelNumber?: boolean
  treeSpeciesCommon?: boolean
  treeSpeciesScientific?: boolean
  dbhInches?: boolean
  heightFt?: boolean
  canopySpreadFt?: boolean
  conditionRating?: boolean
  healthNotes?: boolean
  structuralNotes?: boolean
  isProtected?: boolean
  protectionReason?: boolean
  recommendedAction?: boolean
  mitigationRequired?: boolean
  photos?: boolean
  locationLat?: boolean
  locationLng?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  certifiedAt?: boolean
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
  report?: boolean | Prisma.TreeAssessment$reportArgs<ExtArgs>
}, ExtArgs["result"]["treeAssessment"]>

export type TreeAssessmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  arboristId?: boolean
  propertyAddress?: boolean
  city?: boolean
  county?: boolean
  parcelNumber?: boolean
  treeSpeciesCommon?: boolean
  treeSpeciesScientific?: boolean
  dbhInches?: boolean
  heightFt?: boolean
  canopySpreadFt?: boolean
  conditionRating?: boolean
  healthNotes?: boolean
  structuralNotes?: boolean
  isProtected?: boolean
  protectionReason?: boolean
  recommendedAction?: boolean
  mitigationRequired?: boolean
  photos?: boolean
  locationLat?: boolean
  locationLng?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  certifiedAt?: boolean
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}, ExtArgs["result"]["treeAssessment"]>

export type TreeAssessmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  arboristId?: boolean
  propertyAddress?: boolean
  city?: boolean
  county?: boolean
  parcelNumber?: boolean
  treeSpeciesCommon?: boolean
  treeSpeciesScientific?: boolean
  dbhInches?: boolean
  heightFt?: boolean
  canopySpreadFt?: boolean
  conditionRating?: boolean
  healthNotes?: boolean
  structuralNotes?: boolean
  isProtected?: boolean
  protectionReason?: boolean
  recommendedAction?: boolean
  mitigationRequired?: boolean
  photos?: boolean
  locationLat?: boolean
  locationLng?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  certifiedAt?: boolean
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}, ExtArgs["result"]["treeAssessment"]>

export type TreeAssessmentSelectScalar = {
  id?: boolean
  arboristId?: boolean
  propertyAddress?: boolean
  city?: boolean
  county?: boolean
  parcelNumber?: boolean
  treeSpeciesCommon?: boolean
  treeSpeciesScientific?: boolean
  dbhInches?: boolean
  heightFt?: boolean
  canopySpreadFt?: boolean
  conditionRating?: boolean
  healthNotes?: boolean
  structuralNotes?: boolean
  isProtected?: boolean
  protectionReason?: boolean
  recommendedAction?: boolean
  mitigationRequired?: boolean
  photos?: boolean
  locationLat?: boolean
  locationLng?: boolean
  status?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  certifiedAt?: boolean
}

export type TreeAssessmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "arboristId" | "propertyAddress" | "city" | "county" | "parcelNumber" | "treeSpeciesCommon" | "treeSpeciesScientific" | "dbhInches" | "heightFt" | "canopySpreadFt" | "conditionRating" | "healthNotes" | "structuralNotes" | "isProtected" | "protectionReason" | "recommendedAction" | "mitigationRequired" | "photos" | "locationLat" | "locationLng" | "status" | "createdAt" | "updatedAt" | "certifiedAt", ExtArgs["result"]["treeAssessment"]>
export type TreeAssessmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
  report?: boolean | Prisma.TreeAssessment$reportArgs<ExtArgs>
}
export type TreeAssessmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}
export type TreeAssessmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  arborist?: boolean | Prisma.ArboristDefaultArgs<ExtArgs>
}

export type $TreeAssessmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "TreeAssessment"
  objects: {
    arborist: Prisma.$ArboristPayload<ExtArgs>
    report: Prisma.$ReportPayload<ExtArgs> | null
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    arboristId: string
    propertyAddress: string
    city: string
    county: string
    parcelNumber: string | null
    treeSpeciesCommon: string
    treeSpeciesScientific: string
    dbhInches: number
    heightFt: number | null
    canopySpreadFt: number | null
    conditionRating: number
    healthNotes: string | null
    structuralNotes: string | null
    isProtected: boolean
    protectionReason: string | null
    recommendedAction: string
    mitigationRequired: string | null
    photos: string
    locationLat: number | null
    locationLng: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    certifiedAt: Date | null
  }, ExtArgs["result"]["treeAssessment"]>
  composites: {}
}

export type TreeAssessmentGetPayload<S extends boolean | null | undefined | TreeAssessmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload, S>

export type TreeAssessmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<TreeAssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TreeAssessmentCountAggregateInputType | true
  }

export interface TreeAssessmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreeAssessment'], meta: { name: 'TreeAssessment' } }
  /**
   * Find zero or one TreeAssessment that matches the filter.
   * @param {TreeAssessmentFindUniqueArgs} args - Arguments to find a TreeAssessment
   * @example
   * // Get one TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends TreeAssessmentFindUniqueArgs>(args: Prisma.SelectSubset<T, TreeAssessmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one TreeAssessment that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {TreeAssessmentFindUniqueOrThrowArgs} args - Arguments to find a TreeAssessment
   * @example
   * // Get one TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends TreeAssessmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TreeAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first TreeAssessment that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentFindFirstArgs} args - Arguments to find a TreeAssessment
   * @example
   * // Get one TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends TreeAssessmentFindFirstArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first TreeAssessment that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentFindFirstOrThrowArgs} args - Arguments to find a TreeAssessment
   * @example
   * // Get one TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends TreeAssessmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more TreeAssessments that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all TreeAssessments
   * const treeAssessments = await prisma.treeAssessment.findMany()
   * 
   * // Get first 10 TreeAssessments
   * const treeAssessments = await prisma.treeAssessment.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const treeAssessmentWithIdOnly = await prisma.treeAssessment.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends TreeAssessmentFindManyArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a TreeAssessment.
   * @param {TreeAssessmentCreateArgs} args - Arguments to create a TreeAssessment.
   * @example
   * // Create one TreeAssessment
   * const TreeAssessment = await prisma.treeAssessment.create({
   *   data: {
   *     // ... data to create a TreeAssessment
   *   }
   * })
   * 
   */
  create<T extends TreeAssessmentCreateArgs>(args: Prisma.SelectSubset<T, TreeAssessmentCreateArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many TreeAssessments.
   * @param {TreeAssessmentCreateManyArgs} args - Arguments to create many TreeAssessments.
   * @example
   * // Create many TreeAssessments
   * const treeAssessment = await prisma.treeAssessment.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends TreeAssessmentCreateManyArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many TreeAssessments and returns the data saved in the database.
   * @param {TreeAssessmentCreateManyAndReturnArgs} args - Arguments to create many TreeAssessments.
   * @example
   * // Create many TreeAssessments
   * const treeAssessment = await prisma.treeAssessment.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many TreeAssessments and only return the `id`
   * const treeAssessmentWithIdOnly = await prisma.treeAssessment.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends TreeAssessmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a TreeAssessment.
   * @param {TreeAssessmentDeleteArgs} args - Arguments to delete one TreeAssessment.
   * @example
   * // Delete one TreeAssessment
   * const TreeAssessment = await prisma.treeAssessment.delete({
   *   where: {
   *     // ... filter to delete one TreeAssessment
   *   }
   * })
   * 
   */
  delete<T extends TreeAssessmentDeleteArgs>(args: Prisma.SelectSubset<T, TreeAssessmentDeleteArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one TreeAssessment.
   * @param {TreeAssessmentUpdateArgs} args - Arguments to update one TreeAssessment.
   * @example
   * // Update one TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends TreeAssessmentUpdateArgs>(args: Prisma.SelectSubset<T, TreeAssessmentUpdateArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more TreeAssessments.
   * @param {TreeAssessmentDeleteManyArgs} args - Arguments to filter TreeAssessments to delete.
   * @example
   * // Delete a few TreeAssessments
   * const { count } = await prisma.treeAssessment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends TreeAssessmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, TreeAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more TreeAssessments.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many TreeAssessments
   * const treeAssessment = await prisma.treeAssessment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends TreeAssessmentUpdateManyArgs>(args: Prisma.SelectSubset<T, TreeAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more TreeAssessments and returns the data updated in the database.
   * @param {TreeAssessmentUpdateManyAndReturnArgs} args - Arguments to update many TreeAssessments.
   * @example
   * // Update many TreeAssessments
   * const treeAssessment = await prisma.treeAssessment.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more TreeAssessments and only return the `id`
   * const treeAssessmentWithIdOnly = await prisma.treeAssessment.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends TreeAssessmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TreeAssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one TreeAssessment.
   * @param {TreeAssessmentUpsertArgs} args - Arguments to update or create a TreeAssessment.
   * @example
   * // Update or create a TreeAssessment
   * const treeAssessment = await prisma.treeAssessment.upsert({
   *   create: {
   *     // ... data to create a TreeAssessment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the TreeAssessment we want to update
   *   }
   * })
   */
  upsert<T extends TreeAssessmentUpsertArgs>(args: Prisma.SelectSubset<T, TreeAssessmentUpsertArgs<ExtArgs>>): Prisma.Prisma__TreeAssessmentClient<runtime.Types.Result.GetResult<Prisma.$TreeAssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of TreeAssessments.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentCountArgs} args - Arguments to filter TreeAssessments to count.
   * @example
   * // Count the number of TreeAssessments
   * const count = await prisma.treeAssessment.count({
   *   where: {
   *     // ... the filter for the TreeAssessments we want to count
   *   }
   * })
  **/
  count<T extends TreeAssessmentCountArgs>(
    args?: Prisma.Subset<T, TreeAssessmentCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], TreeAssessmentCountAggregateOutputType>
      : number
  >

  /**
   * Allows you to perform aggregations operations on a TreeAssessment.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends TreeAssessmentAggregateArgs>(args: Prisma.Subset<T, TreeAssessmentAggregateArgs>): Prisma.PrismaPromise<GetTreeAssessmentAggregateType<T>>

  /**
   * Group by TreeAssessment.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {TreeAssessmentGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends TreeAssessmentGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: TreeAssessmentGroupByArgs['orderBy'] }
      : { orderBy?: TreeAssessmentGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, TreeAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreeAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
/**
 * Fields of the TreeAssessment model
 */
readonly fields: TreeAssessmentFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for TreeAssessment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TreeAssessmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  arborist<T extends Prisma.ArboristDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ArboristDefaultArgs<ExtArgs>>): Prisma.Prisma__ArboristClient<runtime.Types.Result.GetResult<Prisma.$ArboristPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  report<T extends Prisma.TreeAssessment$reportArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TreeAssessment$reportArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the TreeAssessment model
 */
export interface TreeAssessmentFieldRefs {
  readonly id: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly arboristId: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly propertyAddress: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly city: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly county: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly parcelNumber: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly treeSpeciesCommon: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly treeSpeciesScientific: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly dbhInches: Prisma.FieldRef<"TreeAssessment", 'Float'>
  readonly heightFt: Prisma.FieldRef<"TreeAssessment", 'Float'>
  readonly canopySpreadFt: Prisma.FieldRef<"TreeAssessment", 'Float'>
  readonly conditionRating: Prisma.FieldRef<"TreeAssessment", 'Int'>
  readonly healthNotes: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly structuralNotes: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly isProtected: Prisma.FieldRef<"TreeAssessment", 'Boolean'>
  readonly protectionReason: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly recommendedAction: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly mitigationRequired: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly photos: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly locationLat: Prisma.FieldRef<"TreeAssessment", 'Float'>
  readonly locationLng: Prisma.FieldRef<"TreeAssessment", 'Float'>
  readonly status: Prisma.FieldRef<"TreeAssessment", 'String'>
  readonly createdAt: Prisma.FieldRef<"TreeAssessment", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"TreeAssessment", 'DateTime'>
  readonly certifiedAt: Prisma.FieldRef<"TreeAssessment", 'DateTime'>
}
    

// Custom InputTypes
/**
 * TreeAssessment findUnique
 */
export type TreeAssessmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter, which TreeAssessment to fetch.
   */
  where: Prisma.TreeAssessmentWhereUniqueInput
}

/**
 * TreeAssessment findUniqueOrThrow
 */
export type TreeAssessmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter, which TreeAssessment to fetch.
   */
  where: Prisma.TreeAssessmentWhereUniqueInput
}

/**
 * TreeAssessment findFirst
 */
export type TreeAssessmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter, which TreeAssessment to fetch.
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of TreeAssessments to fetch.
   */
  orderBy?: Prisma.TreeAssessmentOrderByWithRelationInput | Prisma.TreeAssessmentOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for TreeAssessments.
   */
  cursor?: Prisma.TreeAssessmentWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` TreeAssessments from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` TreeAssessments.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of TreeAssessments.
   */
  distinct?: Prisma.TreeAssessmentScalarFieldEnum | Prisma.TreeAssessmentScalarFieldEnum[]
}

/**
 * TreeAssessment findFirstOrThrow
 */
export type TreeAssessmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter, which TreeAssessment to fetch.
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of TreeAssessments to fetch.
   */
  orderBy?: Prisma.TreeAssessmentOrderByWithRelationInput | Prisma.TreeAssessmentOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for TreeAssessments.
   */
  cursor?: Prisma.TreeAssessmentWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` TreeAssessments from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` TreeAssessments.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of TreeAssessments.
   */
  distinct?: Prisma.TreeAssessmentScalarFieldEnum | Prisma.TreeAssessmentScalarFieldEnum[]
}

/**
 * TreeAssessment findMany
 */
export type TreeAssessmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter, which TreeAssessments to fetch.
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of TreeAssessments to fetch.
   */
  orderBy?: Prisma.TreeAssessmentOrderByWithRelationInput | Prisma.TreeAssessmentOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing TreeAssessments.
   */
  cursor?: Prisma.TreeAssessmentWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` TreeAssessments from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` TreeAssessments.
   */
  skip?: number
  distinct?: Prisma.TreeAssessmentScalarFieldEnum | Prisma.TreeAssessmentScalarFieldEnum[]
}

/**
 * TreeAssessment create
 */
export type TreeAssessmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * The data needed to create a TreeAssessment.
   */
  data: Prisma.XOR<Prisma.TreeAssessmentCreateInput, Prisma.TreeAssessmentUncheckedCreateInput>
}

/**
 * TreeAssessment createMany
 */
export type TreeAssessmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many TreeAssessments.
   */
  data: Prisma.TreeAssessmentCreateManyInput | Prisma.TreeAssessmentCreateManyInput[]
}

/**
 * TreeAssessment createManyAndReturn
 */
export type TreeAssessmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * The data used to create many TreeAssessments.
   */
  data: Prisma.TreeAssessmentCreateManyInput | Prisma.TreeAssessmentCreateManyInput[]
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentIncludeCreateManyAndReturn<ExtArgs> | null
}

/**
 * TreeAssessment update
 */
export type TreeAssessmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * The data needed to update a TreeAssessment.
   */
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateInput, Prisma.TreeAssessmentUncheckedUpdateInput>
  /**
   * Choose, which TreeAssessment to update.
   */
  where: Prisma.TreeAssessmentWhereUniqueInput
}

/**
 * TreeAssessment updateMany
 */
export type TreeAssessmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update TreeAssessments.
   */
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateManyMutationInput, Prisma.TreeAssessmentUncheckedUpdateManyInput>
  /**
   * Filter which TreeAssessments to update
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * Limit how many TreeAssessments to update.
   */
  limit?: number
}

/**
 * TreeAssessment updateManyAndReturn
 */
export type TreeAssessmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * The data used to update TreeAssessments.
   */
  data: Prisma.XOR<Prisma.TreeAssessmentUpdateManyMutationInput, Prisma.TreeAssessmentUncheckedUpdateManyInput>
  /**
   * Filter which TreeAssessments to update
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * Limit how many TreeAssessments to update.
   */
  limit?: number
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
}

/**
 * TreeAssessment upsert
 */
export type TreeAssessmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * The filter to search for the TreeAssessment to update in case it exists.
   */
  where: Prisma.TreeAssessmentWhereUniqueInput
  /**
   * In case the TreeAssessment found by the `where` argument doesn't exist, create a new TreeAssessment with this data.
   */
  create: Prisma.XOR<Prisma.TreeAssessmentCreateInput, Prisma.TreeAssessmentUncheckedCreateInput>
  /**
   * In case the TreeAssessment was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.TreeAssessmentUpdateInput, Prisma.TreeAssessmentUncheckedUpdateInput>
}

/**
 * TreeAssessment delete
 */
export type TreeAssessmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
  /**
   * Filter which TreeAssessment to delete.
   */
  where: Prisma.TreeAssessmentWhereUniqueInput
}

/**
 * TreeAssessment deleteMany
 */
export type TreeAssessmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which TreeAssessments to delete
   */
  where?: Prisma.TreeAssessmentWhereInput
  /**
   * Limit how many TreeAssessments to delete.
   */
  limit?: number
}

/**
 * TreeAssessment.report
 */
export type TreeAssessment$reportArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Report
   */
  select?: Prisma.ReportSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Report
   */
  omit?: Prisma.ReportOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.ReportInclude<ExtArgs> | null
  where?: Prisma.ReportWhereInput
}

/**
 * TreeAssessment without action
 */
export type TreeAssessmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the TreeAssessment
   */
  select?: Prisma.TreeAssessmentSelect<ExtArgs> | null
  /**
   * Omit specific fields from the TreeAssessment
   */
  omit?: Prisma.TreeAssessmentOmit<ExtArgs> | null
  /**
   * Choose, which related nodes to fetch as well
   */
  include?: Prisma.TreeAssessmentInclude<ExtArgs> | null
}

```

### lib/markdown-to-docx.ts
```ts
/**
 * Converts a subset of markdown (as produced by Claude AI) into docx
 * Paragraph/Table objects using the `docx` npm package.
 *
 * Handles: # ## ### headings, **bold**, *italic*, - unordered lists,
 * 1. ordered lists, | tables |, --- horizontal rules, and paragraphs.
 */

import {
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
} from "docx";

// ---------------------------------------------------------------------------
// Inline formatting parser
// ---------------------------------------------------------------------------

function parseInlineRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  // Match **bold**, *italic*, or plain text
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      runs.push(new TextRun({ text: match[2], bold: true }));
    } else if (match[3]) {
      // Italic
      runs.push(new TextRun({ text: match[3], italics: true }));
    } else if (match[4]) {
      // Plain
      runs.push(new TextRun({ text: match[4] }));
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ text })];
}

// ---------------------------------------------------------------------------
// Table builder
// ---------------------------------------------------------------------------

function buildTable(lines: string[]): Table {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s\-:|]+\|$/)) // skip separator
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim())
    );

  if (rows.length === 0) {
    return new Table({ rows: [] });
  }

  const headerCells = rows[0];
  const bodyRows = rows.slice(1);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headerCells.map(
      (cell) =>
        new TableCell({
          shading: {
            type: ShadingType.SOLID,
            color: "2d5016",
            fill: "2d5016",
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell,
                  bold: true,
                  color: "ffffff",
                  size: 18,
                }),
              ],
            }),
          ],
        })
    ),
  });

  const dataRows = bodyRows.map(
    (row, rowIdx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              shading:
                rowIdx % 2 === 1
                  ? {
                      type: ShadingType.SOLID,
                      color: "f9f9f6",
                      fill: "f9f9f6",
                    }
                  : undefined,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 18 })],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ---------------------------------------------------------------------------
// Main converter
// ---------------------------------------------------------------------------

export function markdownToDocxElements(
  markdown: string
): (Paragraph | Table)[] {
  const lines = markdown.split("\n");
  const elements: (Paragraph | Table)[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(
        new Paragraph({
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: "999999",
            },
          },
          spacing: { before: 200, after: 200 },
        })
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith("### ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: line.slice(4),
              color: "2d5016",
              size: 24,
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 80 },
        })
      );
      i++;
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: line.slice(3),
              color: "2d5016",
              size: 28,
              bold: true,
            }),
          ],
          spacing: { before: 320, after: 120 },
        })
      );
      i++;
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: line.slice(2),
              color: "2d5016",
              size: 32,
              bold: true,
            }),
          ],
          spacing: { before: 400, after: 160 },
        })
      );
      i++;
      continue;
    }

    // Table
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      elements.push(buildTable(tableLines));
      continue;
    }

    // Unordered list
    if (line.trimStart().startsWith("- ")) {
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        const itemText = lines[i].trimStart().slice(2);
        elements.push(
          new Paragraph({
            bullet: { level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        const itemText = lines[i].trimStart().replace(/^\d+\.\s/, "");
        elements.push(
          new Paragraph({
            numbering: { reference: "ordered-list", level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Paragraph: collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].trimStart().startsWith("|") &&
      !lines[i].trimStart().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        new Paragraph({
          children: parseInlineRuns(paraLines.join(" ")),
          spacing: { before: 80, after: 80 },
        })
      );
    }
  }

  return elements;
}

```

### lib/markdown.ts
```ts
/**
 * Lightweight markdown-to-HTML renderer for arborist report content.
 * Handles the subset of markdown produced by Claude: headings, bold, italic,
 * lists, tables, horizontal rules, and paragraphs.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return result;
}

function renderTable(lines: string[]): string {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s-:|]+\|$/)) // skip separator row
    .map((line) => {
      const cells = line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      return cells;
    });

  if (rows.length === 0) return "";

  const headerCells = rows[0]
    .map((c) => `<th>${renderInline(c)}</th>`)
    .join("");
  const bodyRows = rows
    .slice(1)
    .map(
      (row) =>
        `<tr>${row.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`
    )
    .join("\n");

  return `<table>
<thead><tr>${headerCells}</tr></thead>
<tbody>${bodyRows}</tbody>
</table>`;
}

export function renderMarkdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      output.push("<hr />");
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      output.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      output.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      output.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // Table: collect consecutive lines starting with |
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    // Unordered list: collect consecutive - items
    if (line.trimStart().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        listItems.push(lines[i].trimStart().slice(2));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ul>${lis}</ul>`);
      continue;
    }

    // Ordered list: collect consecutive numbered items
    if (/^\d+\.\s/.test(line.trimStart())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        listItems.push(lines[i].trimStart().replace(/^\d+\.\s/, ""));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ol>${lis}</ol>`);
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].trimStart().startsWith("|") &&
      !lines[i].trimStart().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      output.push(`<p>${renderInline(paraLines.join(" "))}</p>`);
    }
  }

  return output.join("\n");
}

```

### lib/ordinances.ts
```ts
import { prisma } from "./db";
import { getSpeciesByName } from "./species";

export interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}

export interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}

export interface HeritageTreeRules {
  dbhThreshold: number;
  reviewProcess: string;
  notes: string;
}

export interface OrdinanceData {
  cityName: string;
  state: string;
  protectedSpecies: ProtectedSpeciesRule[];
  defaultDbhThresholdNative: number | null;
  defaultDbhThresholdNonnative: number | null;
  certifierRequirement: string | null;
  mitigationRules: MitigationRules;
  heritageTreeRules: HeritageTreeRules;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  codeReference: string | null;
}

export async function getOrdinanceByCity(
  cityName: string
): Promise<OrdinanceData | null> {
  const ord = await prisma.municipalOrdinance.findUnique({
    where: { cityName },
  });
  if (!ord) return null;

  return {
    ...ord,
    protectedSpecies: JSON.parse(ord.protectedSpecies) as ProtectedSpeciesRule[],
    mitigationRules: JSON.parse(ord.mitigationRules) as MitigationRules,
    heritageTreeRules: JSON.parse(ord.heritageTreeRules) as HeritageTreeRules,
  };
}

export interface ProtectionCheckResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
}

export async function checkTreeProtection(
  cityName: string,
  speciesCommon: string,
  dbhInches: number
): Promise<ProtectionCheckResult> {
  const ordinance = await getOrdinanceByCity(cityName);

  if (!ordinance) {
    return {
      isProtected: false,
      reason: `No ordinance data available for ${cityName}`,
      isHeritage: false,
      heritageReason: null,
      mitigationRequired: null,
      codeReference: null,
    };
  }

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";

  // Check species-specific rules first
  const speciesRule = ordinance.protectedSpecies.find(
    (s) =>
      s.species.toLowerCase() === speciesCommon.toLowerCase() ||
      s.species.toLowerCase() === "any tree"
  );

  let isProtected = false;
  let reason = "";

  if (speciesRule) {
    if (dbhInches >= speciesRule.dbhThreshold) {
      isProtected = true;
      reason = `${speciesCommon} with ${dbhInches}" DBH exceeds ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} with ${dbhInches}" DBH does not meet ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    }
  } else {
    // Fall back to default thresholds
    const threshold = isNative
      ? ordinance.defaultDbhThresholdNative
      : ordinance.defaultDbhThresholdNonnative;

    if (threshold && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH exceeds ${threshold}" ${isNative ? "native" : "non-native"} threshold per ${ordinance.codeReference}`;
    } else if (threshold) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `No applicable DBH threshold found for this species in ${cityName}`;
    }
  }

  // Check heritage status
  let isHeritage = false;
  let heritageReason: string | null = null;
  if (ordinance.heritageTreeRules.dbhThreshold && dbhInches >= ordinance.heritageTreeRules.dbhThreshold) {
    isHeritage = true;
    heritageReason = `Tree qualifies as heritage (${dbhInches}" DBH >= ${ordinance.heritageTreeRules.dbhThreshold}" threshold). ${ordinance.heritageTreeRules.reviewProcess}. ${ordinance.heritageTreeRules.notes}`;
  }

  // Mitigation info
  let mitigationRequired: string | null = null;
  if (isProtected) {
    mitigationRequired = `Replanting ratio: ${ordinance.mitigationRules.replantingRatio}. ${ordinance.mitigationRules.notes}`;
  }

  return {
    isProtected,
    reason,
    isHeritage,
    heritageReason,
    mitigationRequired,
    codeReference: ordinance.codeReference,
  };
}

```

### lib/report-templates.ts
```ts
/**
 * Report templates define per-type boilerplate language, required sections,
 * and AI prompt additions for different arborist report types.
 */

export interface ReportTemplate {
  reportType: string;
  displayName: string;
  boilerplateIntro: string;
  requiredSections: string[];
  aiPromptAdditions: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    reportType: "removal_permit",
    displayName: "Tree Removal Permit Application",
    boilerplateIntro: `This report has been prepared in support of a tree removal permit application pursuant to the applicable municipal tree preservation ordinance. The purpose of this assessment is to evaluate the health, structural condition, and protected status of the subject tree(s) and to provide a professional recommendation regarding the proposed removal.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Protected Status Summary",
      "Removal Justification",
      "Recommendations",
      "Mitigation Requirements",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Focus on removal justification using ISA-recognized criteria: hazard potential, structural failure risk, disease/pest infestation, interference with infrastructure, and declining health beyond remediation. Reference the specific municipal code sections that govern tree removal permits. For each tree proposed for removal, clearly state whether it meets the criteria for removal under the ordinance and what the required findings are. Include replacement tree ratios and in-lieu fee calculations where applicable. When type-specific assessment data is provided (risk rating, risk factors, removal reason, retention feasibility, retention notes, estimated remaining lifespan), use these arborist-provided values directly in the risk assessment and removal justification sections. Present retention feasibility analysis for each tree, particularly when retention is feasible with conditions — describe those conditions clearly.`,
  },
  {
    reportType: "tree_valuation",
    displayName: "Tree Valuation Report",
    boilerplateIntro: `This report provides a professional valuation of the subject tree(s) using the Council of Tree and Landscape Appraisers (CTLA) Trunk Formula Method as described in the Guide for Plant Appraisal, 10th Edition. The valuation considers species rating, condition, location, and size to determine the appraised value of each tree.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Valuation Methodology",
      "Tree Inventory",
      "Individual Tree Valuations",
      "Aggregate Property Value",
      "Recommendations",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Use the CTLA Trunk Formula Method for valuation. When type-specific valuation data is provided (trunk area, species rating %, condition rating %, location rating %, cost per sq inch, appraised value), use these pre-calculated values directly — do not recalculate them. Present the per-tree valuation breakdown showing all factors. Include an aggregate total value for all trees. Use realistic species ratings based on the Western Chapter ISA species classification guide. Format currency values clearly.`,
  },
  {
    reportType: "construction_encroachment",
    displayName: "Construction Impact Report",
    boilerplateIntro: `This report has been prepared to evaluate the potential impact of proposed construction activities on existing trees at the subject property. The assessment identifies trees within the construction zone of influence, defines Tree Protection Zones (TPZ) and Critical Root Zones (CRZ), and provides recommendations for tree preservation during construction.`,
    requiredSections: [
      "Scope of Assignment",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Tree Protection Zone Analysis",
      "Construction Impact Assessment",
      "Tree Protection Plan",
      "Monitoring Schedule",
      "Mitigation Requirements",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `When type-specific assessment data is provided (TPZ radius, SRZ radius, manual TPZ/SRZ overrides, encroachment description, encroachment %, impact assessment, protection measures list, monitoring frequency), use these pre-calculated and arborist-provided values directly — do not recalculate TPZ or SRZ. If manual TPZ/SRZ overrides are provided, use those values instead of auto-calculated ones and note the override. Present the TPZ and SRZ values in the Tree Protection Zone Analysis section. When project information is included in the property data (project description, permit number, developer, architect), reference these in the Scope of Assignment section. When a protection measures list is provided, incorporate each measure into the Tree Protection Plan with specific implementation details. Include the monitoring frequency in the Monitoring Schedule section. Provide a detailed Tree Protection Plan with specific measures: tree protection fencing specifications (6-foot chain link), root pruning protocols, grade change restrictions, and pre-construction treatments. Reference ANSI A300 Part 5 (Management of Trees During Site Planning, Site Development, and Construction) standards.`,
  },
  {
    reportType: "health_assessment",
    displayName: "Tree Health Assessment",
    boilerplateIntro: `This report presents a comprehensive health and risk assessment of the subject tree(s) conducted in accordance with ISA Best Management Practices for Tree Risk Assessment (TRAQ methodology). The assessment evaluates each tree's health, structural condition, site factors, and overall risk rating to inform management decisions.`,
    requiredSections: [
      "Scope of Assignment",
      "Assessment Methodology",
      "Site Observations",
      "Tree Inventory",
      "Individual Tree Assessments",
      "Risk Assessment Summary",
      "Prognosis and Life Expectancy",
      "Recommendations",
      "Arborist Certification Statement",
    ],
    aiPromptAdditions: `Use ISA TRAQ (Tree Risk Assessment Qualification) methodology and terminology throughout. For each tree, use the arborist-provided TRAQ values when available: (1) Likelihood of Failure (improbable, possible, probable, imminent), (2) Likelihood of Impacting a Target (very low, low, medium, high), (3) Consequences of Failure (negligible, minor, significant, severe), (4) Overall Risk Rating (low, moderate, high, extreme). When a target description is provided, incorporate it into the risk assessment. When maintenance items (multi-select list) are provided, list each recommended maintenance action with specific implementation guidance. Include the arborist-provided priority and timeline for maintenance work. Include detailed observations on crown health indicators, trunk and root flare condition, pest/pathogen signs, and structural defects. Provide a prognosis for each tree including estimated remaining useful life. When type-specific assessment data is provided (TRAQ ratings, target description, maintenance items, priority, timeline, estimated cost), incorporate these directly into each tree's assessment and recommendations sections.`,
  },
];

/**
 * Look up a report template by type slug.
 */
export function getReportTemplate(
  reportType: string
): ReportTemplate | undefined {
  return REPORT_TEMPLATES.find((t) => t.reportType === reportType);
}

```

### lib/report-types.ts
```ts
/**
 * Report type configuration and type-specific data interfaces.
 * The report type drives the entire assessment workflow.
 */

// ---------------------------------------------------------------------------
// Report type metadata
// ---------------------------------------------------------------------------

export interface ReportTypeConfig {
  id: string;
  label: string;
  description: string;
  icon: "Stethoscope" | "Axe" | "DollarSign" | "HardHat";
  color: string; // Tailwind color prefix (e.g. "green", "red")
}

export const REPORT_TYPES: ReportTypeConfig[] = [
  {
    id: "health_assessment",
    label: "Health Assessment / Inventory",
    description: "Tree condition evaluation with maintenance recommendations and risk prognosis",
    icon: "Stethoscope",
    color: "green",
  },
  {
    id: "removal_permit",
    label: "Removal Permit Application",
    description: "Justify tree removal with risk analysis, retention feasibility, and mitigation plan",
    icon: "Axe",
    color: "red",
  },
  {
    id: "tree_valuation",
    label: "Tree Valuation",
    description: "CTLA Trunk Formula appraisal with per-tree and aggregate dollar values",
    icon: "DollarSign",
    color: "amber",
  },
  {
    id: "construction_encroachment",
    label: "Construction Encroachment",
    description: "TPZ/SRZ analysis with tree protection zones and construction impact plan",
    icon: "HardHat",
    color: "blue",
  },
];

export function getReportTypeConfig(id: string): ReportTypeConfig | undefined {
  return REPORT_TYPES.find((rt) => rt.id === id);
}

// ---------------------------------------------------------------------------
// Type-specific tree data interfaces
// ---------------------------------------------------------------------------

export interface HealthAssessmentData {
  // TRAQ fields
  likelihoodOfFailure?: "improbable" | "possible" | "probable" | "imminent";
  likelihoodOfImpact?: "very_low" | "low" | "medium" | "high";
  consequences?: "negligible" | "minor" | "significant" | "severe";
  overallRiskRating?: string; // auto-calculated
  targetDescription?: string;
  // Maintenance
  maintenanceItems?: string[]; // multi-select checkboxes
  maintenancePriority?: "low" | "moderate" | "high" | "urgent";
  maintenanceTimeline?: string;
  estimatedMaintenanceCost?: number;
  // Legacy field - kept for backwards compat
  maintenanceRecommendations?: string;
}

export interface RemovalPermitData {
  riskRating?: "low" | "moderate" | "high" | "extreme";
  riskFactors?: string[];
  removalReason?: string;
  retentionFeasibility?: "feasible" | "not_feasible" | "feasible_with_conditions";
  retentionNotes?: string;
  estimatedRemainingLifespan?: string;
}

export interface TreeValuationData {
  valuationMethod?: string; // default "CTLA Trunk Formula"
  speciesRating?: number; // 0-100 %
  conditionRating?: number; // 0-100 %
  locationRating?: number; // 0-100 %
  costPerSquareInch?: number; // regional rate, default $75
  trunkArea?: number; // auto-calc: pi * (DBH/2)^2
  appraisedValue?: number; // auto-calc
}

export interface ConstructionEncroachmentData {
  tpzRadius?: number; // auto-calc: DBH inches → feet
  srzRadius?: number; // auto-calc: sqrt(DBH * 0.1524) * 3.28084
  tpzOverride?: boolean;
  tpzManual?: number;
  srzManual?: number;
  encroachmentDescription?: string;
  encroachmentPercent?: number; // 0-100
  impactAssessment?: "none" | "minor" | "moderate" | "significant" | "severe";
  protectionMeasuresList?: string[]; // multi-select
  monitoringFrequency?: string;
  // Legacy fields
  protectionMeasures?: string;
  monitoringSchedule?: string;
}

export type TypeSpecificData =
  | HealthAssessmentData
  | RemovalPermitData
  | TreeValuationData
  | ConstructionEncroachmentData;

// ---------------------------------------------------------------------------
// Auto-calculation helpers
// ---------------------------------------------------------------------------

/** Calculate trunk cross-sectional area in square inches from DBH. */
export function calcTrunkArea(dbhInches: number): number {
  return Math.PI * Math.pow(dbhInches / 2, 2);
}

/** Calculate CTLA appraised value. */
export function calcAppraisedValue(
  trunkArea: number,
  costPerSqInch: number,
  speciesRatingPct: number,
  conditionRatingPct: number,
  locationRatingPct: number
): number {
  return (
    trunkArea *
    costPerSqInch *
    (speciesRatingPct / 100) *
    (conditionRatingPct / 100) *
    (locationRatingPct / 100)
  );
}

/** Calculate TPZ radius in feet (1 inch DBH = 1 foot radius per ISA standard). */
export function calcTpzRadius(dbhInches: number): number {
  return dbhInches; // 1:1 ratio
}

/** Calculate SRZ radius in feet from DBH inches (ISA formula). */
export function calcSrzRadius(dbhInches: number): number {
  // SRZ = sqrt(DBH_in_meters) in meters, converted to feet
  const dbhMeters = dbhInches * 0.0254;
  const srzMeters = Math.sqrt(dbhMeters);
  return srzMeters * 3.28084;
}

/** Map condition rating (0-5) to a percentage for CTLA valuation. */
export function conditionToPercent(rating: number): number {
  const map: Record<number, number> = { 0: 0, 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 };
  return map[rating] ?? 60;
}

/** Lookup species rating % for common CA species. Returns default 50 if unknown. */
export function getSpeciesRating(speciesCommon: string): number {
  const normalized = speciesCommon.toLowerCase().trim();
  const ratings: Record<string, number> = {
    "coast live oak": 90,
    "valley oak": 90,
    "blue oak": 85,
    "california sycamore": 80,
    "western sycamore": 80,
    "coast redwood": 95,
    "monterey pine": 60,
    "monterey cypress": 70,
    "eucalyptus": 40,
    "blue gum eucalyptus": 35,
    "red ironbark": 45,
    "london plane": 70,
    "chinese elm": 50,
    "camphor tree": 55,
    "japanese maple": 75,
    "deodar cedar": 70,
    "atlas cedar": 70,
    "incense cedar": 80,
    "white alder": 60,
    "red alder": 55,
    "california bay laurel": 75,
    "california buckeye": 65,
    "italian stone pine": 55,
    "canary island pine": 50,
    "aleppo pine": 45,
    "southern magnolia": 70,
    "cork oak": 80,
    "interior live oak": 85,
    "black walnut": 70,
    "california black walnut": 75,
    "sweetgum": 60,
    "liquidambar": 60,
    "ginkgo": 75,
    "jacaranda": 60,
    "brazilian pepper": 30,
    "tree of heaven": 20,
    "palm": 40,
    "mexican fan palm": 35,
    "queen palm": 40,
    "date palm": 50,
  };

  for (const [key, value] of Object.entries(ratings)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return 50; // default
}

/** Calculate TRAQ overall risk rating from the three components. */
export function calcTRAQRisk(
  likelihood?: string,
  impact?: string,
  consequences?: string
): string {
  if (!likelihood || !impact || !consequences) return "";

  // ISA TRAQ matrix simplified:
  // Combine likelihood of failure + likelihood of impact into "likelihood" score
  const lofScore: Record<string, number> = {
    improbable: 1, possible: 2, probable: 3, imminent: 4,
  };
  const loiScore: Record<string, number> = {
    very_low: 1, low: 2, medium: 3, high: 4,
  };
  const conScore: Record<string, number> = {
    negligible: 1, minor: 2, significant: 3, severe: 4,
  };

  const lof = lofScore[likelihood] ?? 1;
  const loi = loiScore[impact] ?? 1;
  const con = conScore[consequences] ?? 1;

  // Combined likelihood = lof * loi weight
  const combined = lof * loi;
  // Risk = combined * consequences
  const risk = combined * con;

  if (risk >= 32) return "extreme";
  if (risk >= 12) return "high";
  if (risk >= 4) return "moderate";
  return "low";
}

// ---------------------------------------------------------------------------
// Risk factors for removal permit
// ---------------------------------------------------------------------------

export const RISK_FACTORS = [
  "Root damage / decay",
  "Trunk decay / cavity",
  "Canopy dieback",
  "Significant lean",
  "Co-dominant stems",
  "Dead branches",
  "Fungal fruiting bodies",
  "Bark damage / wounds",
] as const;

// ---------------------------------------------------------------------------
// Maintenance items for health assessment
// ---------------------------------------------------------------------------

export const MAINTENANCE_ITEMS = [
  "Crown cleaning",
  "Deadwood removal",
  "Structural pruning",
  "Cable/brace",
  "Root crown excavation",
  "Pest treatment",
  "Soil improvement",
  "Clearance pruning",
] as const;

// ---------------------------------------------------------------------------
// Protection measures for construction encroachment
// ---------------------------------------------------------------------------

export const PROTECTION_MEASURES = [
  "Tree protection fencing",
  "Root pruning",
  "Trunk protection wrap",
  "Grade board installation",
  "Mulch application",
  "Irrigation plan",
  "Arborist supervision during excavation",
  "Crown pruning for clearance",
] as const;

```

### lib/species.ts
```ts
export interface TreeSpecies {
  common: string;
  scientific: string;
  category: "native" | "nonnative";
  commonOnPeninsula: boolean;
}

export const PENINSULA_SPECIES: TreeSpecies[] = [
  // ---------------------------------------------------------------------------
  // Native Oaks
  // ---------------------------------------------------------------------------
  { common: "Coast Live Oak", scientific: "Quercus agrifolia", category: "native", commonOnPeninsula: true },
  { common: "Valley Oak", scientific: "Quercus lobata", category: "native", commonOnPeninsula: true },
  { common: "Blue Oak", scientific: "Quercus douglasii", category: "native", commonOnPeninsula: true },
  { common: "California Black Oak", scientific: "Quercus kelloggii", category: "native", commonOnPeninsula: true },
  { common: "Canyon Live Oak", scientific: "Quercus chrysolepis", category: "native", commonOnPeninsula: true },
  { common: "Interior Live Oak", scientific: "Quercus wislizeni", category: "native", commonOnPeninsula: true },
  { common: "Oregon White Oak", scientific: "Quercus garryana", category: "native", commonOnPeninsula: true },
  { common: "Tan Oak", scientific: "Notholithocarpus densiflorus", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Redwoods & Sequoias
  // ---------------------------------------------------------------------------
  { common: "Coast Redwood", scientific: "Sequoia sempervirens", category: "native", commonOnPeninsula: true },
  { common: "Giant Sequoia", scientific: "Sequoiadendron giganteum", category: "native", commonOnPeninsula: false },
  { common: "Dawn Redwood", scientific: "Metasequoia glyptostroboides", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Pines
  // ---------------------------------------------------------------------------
  { common: "Monterey Pine", scientific: "Pinus radiata", category: "native", commonOnPeninsula: true },
  { common: "Bishop Pine", scientific: "Pinus muricata", category: "native", commonOnPeninsula: false },
  { common: "Knobcone Pine", scientific: "Pinus attenuata", category: "native", commonOnPeninsula: false },
  { common: "Gray Pine", scientific: "Pinus sabiniana", category: "native", commonOnPeninsula: false },
  { common: "Ponderosa Pine", scientific: "Pinus ponderosa", category: "native", commonOnPeninsula: false },
  { common: "Sugar Pine", scientific: "Pinus lambertiana", category: "native", commonOnPeninsula: false },
  { common: "Torrey Pine", scientific: "Pinus torreyana", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Native Cypresses & Cedars
  // ---------------------------------------------------------------------------
  { common: "Monterey Cypress", scientific: "Hesperocyparis macrocarpa", category: "native", commonOnPeninsula: true },
  { common: "Incense Cedar", scientific: "Calocedrus decurrens", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Native Conifers
  // ---------------------------------------------------------------------------
  { common: "Douglas Fir", scientific: "Pseudotsuga menziesii", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Broadleaf Trees
  // ---------------------------------------------------------------------------
  { common: "California Bay Laurel", scientific: "Umbellularia californica", category: "native", commonOnPeninsula: true },
  { common: "California Buckeye", scientific: "Aesculus californica", category: "native", commonOnPeninsula: true },
  { common: "Madrone", scientific: "Arbutus menziesii", category: "native", commonOnPeninsula: true },
  { common: "Big Leaf Maple", scientific: "Acer macrophyllum", category: "native", commonOnPeninsula: true },
  { common: "Western Sycamore", scientific: "Platanus racemosa", category: "native", commonOnPeninsula: true },
  { common: "White Alder", scientific: "Alnus rhombifolia", category: "native", commonOnPeninsula: true },
  { common: "Arroyo Willow", scientific: "Salix lasiolepis", category: "native", commonOnPeninsula: true },
  { common: "Catalina Ironwood", scientific: "Lyonothamnus floribundus", category: "native", commonOnPeninsula: false },
  { common: "California Fan Palm", scientific: "Washingtonia filifera", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Non-native Eucalyptus
  // ---------------------------------------------------------------------------
  { common: "Eucalyptus (Blue Gum)", scientific: "Eucalyptus globulus", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Red Gum)", scientific: "Eucalyptus camaldulensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Lemon Gum)", scientific: "Corymbia citriodora", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Silver Dollar)", scientific: "Eucalyptus polyanthemos", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Palms
  // ---------------------------------------------------------------------------
  { common: "Mexican Fan Palm", scientific: "Washingtonia robusta", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Date Palm", scientific: "Phoenix canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "King Palm", scientific: "Archontophoenix cunninghamiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Queen Palm", scientific: "Syagrus romanzoffiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Windmill Palm", scientific: "Trachycarpus fortunei", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Pines & Cedars
  // ---------------------------------------------------------------------------
  { common: "Italian Stone Pine", scientific: "Pinus pinea", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Pine", scientific: "Pinus canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Aleppo Pine", scientific: "Pinus halepensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Deodar Cedar", scientific: "Cedrus deodara", category: "nonnative", commonOnPeninsula: true },
  { common: "Atlas Cedar", scientific: "Cedrus atlantica", category: "nonnative", commonOnPeninsula: true },
  { common: "Western Red Cedar", scientific: "Thuja plicata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Fruit & Ornamental
  // ---------------------------------------------------------------------------
  { common: "Olive", scientific: "Olea europaea", category: "nonnative", commonOnPeninsula: true },
  { common: "Fig", scientific: "Ficus carica", category: "nonnative", commonOnPeninsula: true },
  { common: "Avocado", scientific: "Persea americana", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Lemon)", scientific: "Citrus limon", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Orange)", scientific: "Citrus sinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Japanese Maple", scientific: "Acer palmatum", category: "nonnative", commonOnPeninsula: true },
  { common: "Southern Magnolia", scientific: "Magnolia grandiflora", category: "nonnative", commonOnPeninsula: true },
  { common: "Jacaranda", scientific: "Jacaranda mimosifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Crepe Myrtle", scientific: "Lagerstroemia indica", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Elms, Planes & Shade Trees
  // ---------------------------------------------------------------------------
  { common: "Chinese Elm", scientific: "Ulmus parvifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "American Elm", scientific: "Ulmus americana", category: "nonnative", commonOnPeninsula: true },
  { common: "London Plane", scientific: "Platanus x acerifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Sweetgum", scientific: "Liquidambar styraciflua", category: "nonnative", commonOnPeninsula: true },
  { common: "Tulip Tree", scientific: "Liriodendron tulipifera", category: "nonnative", commonOnPeninsula: true },
  { common: "Camphor Tree", scientific: "Cinnamomum camphora", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Street Trees
  // ---------------------------------------------------------------------------
  { common: "Brisbane Box", scientific: "Lophostemon confertus", category: "nonnative", commonOnPeninsula: true },
  { common: "Fern Pine", scientific: "Afrocarpus gracilior", category: "nonnative", commonOnPeninsula: true },
  { common: "New Zealand Christmas Tree", scientific: "Metrosideros excelsa", category: "nonnative", commonOnPeninsula: true },
  { common: "Flowering Pear", scientific: "Pyrus calleryana", category: "nonnative", commonOnPeninsula: true },
  { common: "Chinese Pistache", scientific: "Pistacia chinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Zelkova", scientific: "Zelkova serrata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Non-native
  // ---------------------------------------------------------------------------
  { common: "Cork Oak", scientific: "Quercus suber", category: "nonnative", commonOnPeninsula: true },
  { common: "Acacia (Bailey)", scientific: "Acacia baileyana", category: "nonnative", commonOnPeninsula: true },
  { common: "Norfolk Island Pine", scientific: "Araucaria heterophylla", category: "nonnative", commonOnPeninsula: true },
];

export function searchSpecies(query: string): TreeSpecies[] {
  const q = query.toLowerCase();
  return PENINSULA_SPECIES.filter(
    (s) =>
      s.common.toLowerCase().includes(q) ||
      s.scientific.toLowerCase().includes(q)
  );
}

export function getSpeciesByName(common: string): TreeSpecies | undefined {
  return PENINSULA_SPECIES.find(
    (s) => s.common.toLowerCase() === common.toLowerCase()
  );
}

```

### lib/uploads.ts
```ts
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/svg+xml",
]);

export const ALLOWED_AUDIO_TYPES = new Set([
  "audio/webm",
  "audio/mp4",
  "audio/wav",
  "audio/ogg",
  "audio/mpeg",
  "audio/webm;codecs=opus",
]);

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25 MB (Whisper limit)

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

/** Project root — two levels up from lib/ */
const PROJECT_ROOT = path.resolve(process.cwd());
const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads");

/**
 * Get the absolute upload directory for a tree's media, creating it if needed.
 */
export function getUploadDir(
  treeRecordId: string,
  type: "photos" | "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "trees", treeRecordId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the absolute upload directory for property-level media (audio), creating it if needed.
 */
export function getPropertyUploadDir(
  propertyId: string,
  type: "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "properties", propertyId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for a property-level uploaded file.
 */
export function getPropertyServingUrl(
  propertyId: string,
  type: "audio",
  filename: string
): string {
  return `/api/uploads/properties/${propertyId}/${type}/${filename}`;
}

/**
 * Get the absolute upload directory for arborist assets (logo, etc.), creating it if needed.
 */
export function getArboristUploadDir(arboristId: string): string {
  const dir = path.join(UPLOADS_ROOT, "arborist", arboristId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for an arborist's uploaded file.
 */
export function getArboristServingUrl(
  arboristId: string,
  filename: string
): string {
  return `/api/uploads/arborist/${arboristId}/${filename}`;
}

/**
 * Generate a collision-safe filename from the original.
 * Format: {timestamp}_{random}_{sanitized-original}
 */
export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const rand = crypto.randomBytes(4).toString("hex");
  // Sanitize: keep only alphanumeric, dots, hyphens, underscores
  const sanitized = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-60);
  return `${timestamp}_${rand}_${sanitized}`;
}

/**
 * Get the serving URL for an uploaded file.
 */
export function getServingUrl(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): string {
  return `/api/uploads/trees/${treeRecordId}/${type}/${filename}`;
}

/**
 * Delete an uploaded file from disk. Silently ignores if file doesn't exist.
 */
export function deleteFile(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): void {
  const filePath = path.join(
    UPLOADS_ROOT,
    "trees",
    treeRecordId,
    type,
    filename
  );
  try {
    fs.unlinkSync(filePath);
  } catch (err: unknown) {
    // Ignore if file doesn't exist
    if (err && typeof err === "object" && "code" in err && err.code !== "ENOENT") {
      throw err;
    }
  }
}

/**
 * Resolve a relative path to an absolute one within the uploads directory.
 * Returns null if the path escapes the uploads root (path traversal).
 */
export function resolveUploadPath(relativePath: string): string | null {
  const resolved = path.resolve(UPLOADS_ROOT, relativePath);
  if (!resolved.startsWith(UPLOADS_ROOT)) {
    return null; // path traversal attempt
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// MIME type detection
// ---------------------------------------------------------------------------

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".webm": "audio/webm",
  ".mp4": "audio/mp4",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
};

export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_MAP[ext] || "application/octet-stream";
}

```

### lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

### middleware.ts
```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploads/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

```

### next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

### next.config.mjs
```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

```

### package.json
```json
{
  "name": "treecertify",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "npx tsx prisma/seed.ts"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.78.0",
    "@clerk/nextjs": "^6.39.0",
    "@hookform/resolvers": "^5.2.2",
    "@prisma/client": "^5.22.0",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-pdf/renderer": "^4.3.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "docx": "^9.6.0",
    "fabric": "^7.2.0",
    "lucide-react": "^0.575.0",
    "mapbox-gl": "^3.19.0",
    "next": "14.2.35",
    "openai": "^6.25.0",
    "prisma": "^5.22.0",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.71.2",
    "tailwind-merge": "^3.5.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@mapbox/point-geometry": "^1.1.0",
    "@types/mapbox-gl": "^3.4.1",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.21.0",
    "typescript": "^5"
  }
}

```

### postcss.config.mjs
```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

### prisma/migrations/20260228194318_init_property_tree_model/migration.sql
```sql
-- CreateTable
CREATE TABLE "Arborist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isaCertificationNum" TEXT NOT NULL,
    "isaExpirationDate" DATETIME NOT NULL,
    "companyName" TEXT,
    "phone" TEXT,
    "citiesServed" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arboristId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'CA',
    "zip" TEXT,
    "county" TEXT NOT NULL DEFAULT 'San Mateo',
    "parcelNumber" TEXT,
    "lat" REAL,
    "lng" REAL,
    "lotSizeSqft" REAL,
    "homeownerName" TEXT,
    "homeownerEmail" TEXT,
    "homeownerPhone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_arboristId_fkey" FOREIGN KEY ("arboristId") REFERENCES "Arborist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "treeNumber" INTEGER NOT NULL,
    "pinLat" REAL,
    "pinLng" REAL,
    "speciesCommon" TEXT NOT NULL DEFAULT '',
    "speciesScientific" TEXT NOT NULL DEFAULT '',
    "dbhInches" REAL NOT NULL DEFAULT 0,
    "heightFt" REAL,
    "canopySpreadFt" REAL,
    "conditionRating" INTEGER NOT NULL DEFAULT 0,
    "healthNotes" TEXT,
    "structuralNotes" TEXT,
    "isProtected" BOOLEAN NOT NULL DEFAULT false,
    "protectionReason" TEXT,
    "recommendedAction" TEXT NOT NULL DEFAULT 'retain',
    "mitigationRequired" TEXT,
    "photos" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TreeRecord_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MunicipalOrdinance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cityName" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'CA',
    "protectedSpecies" TEXT NOT NULL DEFAULT '[]',
    "defaultDbhThresholdNative" REAL,
    "defaultDbhThresholdNonnative" REAL,
    "certifierRequirement" TEXT,
    "mitigationRules" TEXT NOT NULL DEFAULT '{}',
    "heritageTreeRules" TEXT NOT NULL DEFAULT '{}',
    "permitProcessNotes" TEXT,
    "ordinanceUrl" TEXT,
    "codeReference" TEXT,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "arboristId" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "aiDraftContent" TEXT,
    "finalContent" TEXT,
    "citySections" TEXT NOT NULL DEFAULT '{}',
    "eSignatureText" TEXT,
    "certifiedAt" DATETIME,
    "pdfUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Report_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_arboristId_fkey" FOREIGN KEY ("arboristId") REFERENCES "Arborist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Arborist_email_key" ON "Arborist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MunicipalOrdinance_cityName_key" ON "MunicipalOrdinance"("cityName");

```

### prisma/migrations/20260228212520_add_tree_photos_and_audio/migration.sql
```sql
-- CreateTable
CREATE TABLE "TreePhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "treeRecordId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TreePhoto_treeRecordId_fkey" FOREIGN KEY ("treeRecordId") REFERENCES "TreeRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TreeAudioNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "treeRecordId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "rawTranscription" TEXT,
    "cleanedTranscription" TEXT,
    "durationSeconds" REAL,
    "status" TEXT NOT NULL DEFAULT 'uploading',
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TreeAudioNote_treeRecordId_fkey" FOREIGN KEY ("treeRecordId") REFERENCES "TreeRecord" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

```

### prisma/migrations/migration_lock.toml
```toml
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "sqlite"
```

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Arborist {
  id                  String   @id @default(cuid())
  clerkUserId         String?  @unique
  name                String
  email               String   @unique
  isaCertificationNum String
  isaExpirationDate   DateTime
  companyName         String?
  phone               String?
  citiesServed        String   @default("[]") // JSON array stored as string for SQLite

  // Branding & profile fields
  companyLogoUrl   String?
  companyAddress   String?
  companyPhone     String?
  companyEmail     String?
  companyWebsite   String?
  licenseNumbers   String?
  signatureName    String?

  createdAt DateTime @default(now())

  properties Property[]
  reports    Report[]
}

model Property {
  id          String @id @default(cuid())
  arboristId  String
  address     String
  city        String
  state       String @default("CA")
  zip         String?
  county      String @default("San Mateo")
  parcelNumber String?
  lat         Float?
  lng         Float?
  lotSizeSqft Float?

  homeownerName  String?
  homeownerEmail String?
  homeownerPhone String?

  // Report type drives the entire workflow
  reportType         String   @default("health_assessment")

  // Construction encroachment project fields
  projectDescription String?
  permitNumber       String?
  developerName      String?
  architectName      String?

  // Site-level assessment fields
  siteObservations    String?
  scopeOfAssignment   String?

  status    String   @default("active") // active, archived
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  arborist           Arborist             @relation(fields: [arboristId], references: [id])
  trees              TreeRecord[]
  reports            Report[]
  propertyAudioNotes PropertyAudioNote[]
}

model TreeRecord {
  id         String @id @default(cuid())
  propertyId String
  treeNumber Int    // auto-increment per property (1, 2, 3...)

  pinLat Float?
  pinLng Float?

  tagNumber         String?

  speciesCommon     String   @default("")
  speciesScientific String   @default("")
  dbhInches         Float    @default(0)
  heightFt          Float?
  canopySpreadFt    Float?
  conditionRating   Int      @default(0) // 1-5 scale
  healthNotes       String?
  structuralNotes   String?

  isProtected        Boolean @default(false)
  protectionReason   String?
  recommendedAction  String  @default("retain") // retain, remove, prune, monitor
  mitigationRequired String?

  // Type-specific assessment data (JSON string, parsed per reportType)
  typeSpecificData String?

  photos String @default("[]") // DEPRECATED - use treePhotos relation instead
  status String @default("draft") // draft, assessed, certified

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  property       Property        @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  treePhotos     TreePhoto[]
  treeAudioNotes TreeAudioNote[]
}

model TreePhoto {
  id           String   @id @default(cuid())
  treeRecordId String
  filename     String
  url          String
  caption      String?
  sortOrder    Int      @default(0)
  createdAt    DateTime @default(now())

  // Annotation fields
  originalFilename String?
  originalUrl      String?
  isAnnotated      Boolean @default(false)

  treeRecord TreeRecord @relation(fields: [treeRecordId], references: [id], onDelete: Cascade)
}

model TreeAudioNote {
  id                   String   @id @default(cuid())
  treeRecordId         String
  filename             String
  audioUrl             String
  rawTranscription     String?
  cleanedTranscription String?
  durationSeconds      Float?
  status               String   @default("uploading")
  errorMessage         String?
  createdAt            DateTime @default(now())

  treeRecord TreeRecord @relation(fields: [treeRecordId], references: [id], onDelete: Cascade)
}

model PropertyAudioNote {
  id                   String   @id @default(cuid())
  propertyId           String
  filename             String
  audioUrl             String
  rawTranscription     String?
  cleanedTranscription String?
  durationSeconds      Float?
  status               String   @default("uploading")
  errorMessage         String?
  createdAt            DateTime @default(now())

  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}

model MunicipalOrdinance {
  id        String @id @default(cuid())
  cityName  String @unique
  state     String @default("CA")

  protectedSpecies              String @default("[]") // JSON array with per-species DBH thresholds
  defaultDbhThresholdNative     Float?
  defaultDbhThresholdNonnative  Float?
  certifierRequirement          String? // e.g. "ISA Certified Only"
  mitigationRules               String @default("{}") // JSON
  heritageTreeRules             String @default("{}") // JSON
  permitProcessNotes            String?
  ordinanceUrl                  String?
  codeReference                 String?
  lastUpdated                   DateTime @default(now())
}

model Report {
  id         String @id @default(cuid())
  propertyId String
  arboristId String

  reportType     String // removal_permit, construction_encroachment, health_assessment, tree_valuation
  aiDraftContent String? // markdown
  finalContent   String? // markdown after edits
  citySections   String  @default("{}") // JSON
  eSignatureText String?
  certifiedAt    DateTime?
  pdfUrl         String?

  status String @default("draft") // draft, review, certified, filed

  property Property @relation(fields: [propertyId], references: [id])
  arborist Arborist @relation(fields: [arboristId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

```

### prisma/seed.ts
```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed demo arborist
  const arborist = await prisma.arborist.upsert({
    where: { email: "demo@treecertify.com" },
    update: {},
    create: {
      name: "Alex Rivera, ISA Certified Arborist",
      email: "demo@treecertify.com",
      isaCertificationNum: "WE-12345A",
      isaExpirationDate: new Date("2027-06-15"),
      companyName: "Peninsula Tree Consulting",
      phone: "(650) 555-0123",
      citiesServed: JSON.stringify([
        "Palo Alto",
        "Menlo Park",
        "Atherton",
        "Woodside",
        "Portola Valley",
      ]),
    },
  });

  // Seed Municipal Ordinances
  const ordinances = [
    {
      cityName: "Palo Alto",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 12, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 12, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 12, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 12, category: "native" },
      ]),
      defaultDbhThresholdNative: 12,
      defaultDbhThresholdNonnative: 18,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "3:1",
        inLieuFee: "Per city schedule",
        notes: "Three replacement trees or in-lieu fee per tree removed. Replacement trees must be minimum 24-inch box size.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 48,
        reviewProcess: "Public hearing required",
        notes: "Any tree with DBH 48 inches or greater requires public hearing before Planning Commission.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit Application to Urban Forestry Division. 30-day public notice required for protected trees. Heritage trees require Planning Commission hearing.",
      ordinanceUrl: "https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-63702",
      codeReference: "Palo Alto Municipal Code Title 8, Chapter 8.10",
    },
    {
      cityName: "Menlo Park",
      protectedSpecies: JSON.stringify([
        { species: "Any tree", scientific: "All species", dbhThreshold: 10, category: "all" },
      ]),
      defaultDbhThresholdNative: 10,
      defaultDbhThresholdNonnative: 10,
      certifierRequirement: "ISA Certified or Licensed Contractor",
      mitigationRules: JSON.stringify({
        replantingRatio: "2:1",
        inLieuFee: "Per city schedule",
        notes: "Two replacement trees per tree removed. Replacement trees must be minimum 15-gallon size.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 36,
        reviewProcess: "Staff review only",
        notes: "Heritage trees reviewed by city arborist. No public hearing required.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit to Community Development. Staff review within 14 days.",
      ordinanceUrl: "https://www.menlopark.gov/",
      codeReference: "Menlo Park Municipal Code Chapter 13.24",
    },
    {
      cityName: "Atherton",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 8, category: "heritage" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 8, category: "heritage" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 8, category: "heritage" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 14, category: "native" },
        { species: "Heritage Elm", scientific: "Ulmus spp.", dbhThreshold: 8, category: "heritage" },
      ]),
      defaultDbhThresholdNative: 14,
      defaultDbhThresholdNonnative: 14,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per council determination",
        inLieuFee: "$500-$2,500",
        notes: "In-lieu fee ranges from $500 to $2,500 depending on tree size and species. Council may require replanting instead.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 8,
        reviewProcess: "Council vote for oaks",
        notes: "All oaks 8 inches DBH or greater require Town Council approval for removal.",
      }),
      permitProcessNotes: "Submit Tree Removal Application to Planning Department. Heritage oaks require Town Council hearing. 45-day review period.",
      ordinanceUrl: "https://www.ci.atherton.ca.us/",
      codeReference: "Atherton Municipal Code Chapter 8.10",
    },
    {
      cityName: "Woodside",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 6, category: "native" },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 6, category: "native" },
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 6, category: "native" },
      ]),
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1",
        inLieuFee: "Not available",
        notes: "One-to-one replanting required for any protected tree removed. No in-lieu fee option.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 24,
        reviewProcess: "Automatic heritage designation",
        notes: "Any tree 24 inches DBH or greater is automatically designated as heritage. Requires Planning Commission review.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Planning and Building. Heritage trees require Planning Commission hearing.",
      ordinanceUrl: "https://www.woodsidetown.org/",
      codeReference: "Woodside Municipal Code",
    },
    {
      cityName: "Portola Valley",
      protectedSpecies: JSON.stringify([
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 6, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 6, category: "native" },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 6, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 6, category: "native" },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 6, category: "native" },
      ]),
      defaultDbhThresholdNative: 6,
      defaultDbhThresholdNonnative: 12,
      certifierRequirement: "ISA Certified Only",
      mitigationRules: JSON.stringify({
        replantingRatio: "2:1",
        inLieuFee: "Per town schedule",
        notes: "Two-to-one replanting ratio. Native species required for replacements.",
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: 30,
        reviewProcess: "Planning Commission review",
        notes: "Trees 30 inches DBH or greater designated heritage. Requires Planning Commission hearing.",
      }),
      permitProcessNotes: "Submit Tree Removal Permit to Planning Department. Conservation Committee review may be required.",
      ordinanceUrl: "https://www.portolavalley.net/",
      codeReference: "Portola Valley Municipal Code Chapter 15.12",
    },
  ];

  for (const ord of ordinances) {
    await prisma.municipalOrdinance.upsert({
      where: { cityName: ord.cityName },
      update: ord,
      create: ord,
    });
  }

  // Create a sample property with trees
  const property = await prisma.property.create({
    data: {
      arboristId: arborist.id,
      address: "123 University Ave",
      city: "Palo Alto",
      state: "CA",
      county: "Santa Clara",
      parcelNumber: "132-40-001",
      lat: 37.4439,
      lng: -122.1622,
      status: "active",
    },
  });

  // Seed sample tree records on the property
  await prisma.treeRecord.createMany({
    data: [
      {
        propertyId: property.id,
        treeNumber: 1,
        pinLat: 37.44395,
        pinLng: -122.16225,
        speciesCommon: "Coast Live Oak",
        speciesScientific: "Quercus agrifolia",
        dbhInches: 24,
        heightFt: 45,
        canopySpreadFt: 35,
        conditionRating: 4,
        healthNotes: "Good overall vigor. Minor deadwood in upper canopy.",
        structuralNotes: "Co-dominant stems with included bark at primary union. Recommend monitoring.",
        isProtected: true,
        protectionReason: 'Native oak with 24" DBH exceeds 12" threshold per Palo Alto Municipal Code 8.10',
        recommendedAction: "retain",
        mitigationRequired: "N/A - retention recommended. If removal is required: 3:1 replanting ratio.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 2,
        pinLat: 37.44388,
        pinLng: -122.16210,
        speciesCommon: "Valley Oak",
        speciesScientific: "Quercus lobata",
        dbhInches: 18,
        heightFt: 55,
        canopySpreadFt: 42,
        conditionRating: 3,
        healthNotes: "Moderate crown dieback. Some chlorosis in upper canopy.",
        structuralNotes: "Previous limb failure on south side. Wound compartmentalization progressing.",
        isProtected: true,
        protectionReason: 'Native oak with 18" DBH exceeds 12" threshold per Palo Alto Municipal Code 8.10',
        recommendedAction: "prune",
        mitigationRequired: "3:1 replanting ratio if removal required.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 3,
        pinLat: 37.44402,
        pinLng: -122.16235,
        speciesCommon: "Japanese Maple",
        speciesScientific: "Acer palmatum",
        dbhInches: 8,
        heightFt: 15,
        canopySpreadFt: 12,
        conditionRating: 5,
        healthNotes: "Excellent health. Vigorous spring growth.",
        structuralNotes: "Good form. No defects noted.",
        isProtected: false,
        protectionReason: null,
        recommendedAction: "retain",
        mitigationRequired: null,
        status: "assessed",
      },
    ],
  });

  console.log("Seed data created successfully.");
  console.log(`  - Arborist: ${arborist.name}`);
  console.log(`  - Property: ${property.address}, ${property.city}`);
  console.log(`  - Trees: 3 sample tree records`);
  console.log(`  - Ordinances: ${ordinances.length} cities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

### tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

```

### tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

### types/mapbox.d.ts
```ts
declare module "@mapbox/point-geometry" {
  class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
  }
  export = Point;
}

```

