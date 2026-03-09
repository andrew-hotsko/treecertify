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
        <h1 className="text-2xl font-semibold tracking-tight font-display text-foreground">
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-forest shrink-0" />
                      {ord.cityName}
                    </CardTitle>
                    {ord.codeReference && (
                      <p className="text-sm text-muted-foreground font-mono mt-1">
                        {ord.codeReference}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {ord.certifierRequirement && (
                      <Badge
                        variant="outline"
                        className="border-forest/20 text-forest bg-forest/5"
                      >
                        {ord.certifierRequirement}
                      </Badge>
                    )}
                    {ord.ordinanceUrl && (
                      <a
                        href={ord.ordinanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-forest hover:text-forest-light"
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
                    <div className="bg-forest/5 rounded-lg px-4 py-3">
                      <p className="text-xs text-forest font-medium uppercase tracking-wide">
                        Native Threshold
                      </p>
                      <p className="text-2xl font-mono font-bold text-forest">
                        {ord.defaultDbhThresholdNative}&quot;
                      </p>
                      <p className="text-xs text-forest">DBH</p>
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
                    <Shield className="h-4 w-4 text-forest" />
                    Protected Species
                  </h4>
                  <div className="overflow-x-auto -mx-1">
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
                </div>

                <Separator />

                {/* Mitigation & Heritage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Scale className="h-4 w-4 text-forest" />
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
