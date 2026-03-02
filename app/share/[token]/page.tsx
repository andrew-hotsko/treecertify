import { prisma } from "@/lib/db";

export const metadata = {
  title: "Shared Property Map | TreeCertify",
};

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_COLORS: Record<number, string> = {
  0: "text-gray-700",
  1: "text-red-600",
  2: "text-orange-500",
  3: "text-amber-500",
  4: "text-emerald-500",
  5: "text-green-600",
};

export default async function SharedPropertyPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const property = await prisma.property.findUnique({
    where: { shareToken: token },
    include: {
      trees: {
        orderBy: { treeNumber: "asc" },
      },
    },
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">🔗</div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            This link is no longer active
          </h1>
          <p className="text-gray-500 text-sm">
            The property owner may have revoked sharing access, or this link may
            have expired.
          </p>
        </div>
      </div>
    );
  }

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const hasCoords = property.lat != null && property.lng != null;

  // Build static Mapbox URL with tree pins
  let mapImageUrl: string | null = null;
  if (hasCoords && mapboxToken) {
    const lng = property.lng!;
    const lat = property.lat!;

    // Build pin markers for trees
    const treePins = property.trees
      .filter((t) => t.pinLat != null && t.pinLng != null)
      .slice(0, 50) // Mapbox static API has URL length limits
      .map((t) => `pin-s-${t.treeNumber}+16a34a(${t.pinLng},${t.pinLat})`)
      .join(",");

    const markers = treePins ? `${treePins}/` : "";
    mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${markers}${lng},${lat},17,0/800x400@2x?access_token=${mapboxToken}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {property.address}
            </h1>
            <p className="text-sm text-gray-500">{property.city}</p>
          </div>
          <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
            TreeCertify
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Map Section */}
        <section>
          {mapImageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={mapImageUrl}
              alt={`Satellite map of ${property.address}`}
              className="w-full rounded-lg shadow-sm border"
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm border">
              No map available
            </div>
          )}
        </section>

        {/* Tree Inventory Table */}
        {property.trees.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Tree Inventory ({property.trees.length} tree
              {property.trees.length !== 1 ? "s" : ""})
            </h2>
            <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">
                      Tree #
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">
                      Species
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">
                      DBH
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">
                      Condition
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {property.trees.map((tree) => (
                    <tr key={tree.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-mono text-gray-700">
                        #{tree.treeNumber}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="font-medium text-gray-900">
                          {tree.speciesCommon || "Unidentified"}
                        </div>
                        {tree.speciesScientific && (
                          <div className="text-xs text-gray-400 italic">
                            {tree.speciesScientific}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-gray-700">
                        {tree.dbhInches > 0 ? `${tree.dbhInches}"` : "—"}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`font-medium ${
                            CONDITION_COLORS[tree.conditionRating] ??
                            "text-gray-400"
                          }`}
                        >
                          {CONDITION_LABELS[tree.conditionRating] ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 capitalize text-gray-700">
                        {tree.recommendedAction || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <div className="bg-white rounded-lg border p-8 text-center text-gray-400 text-sm">
            No trees have been inventoried yet.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
          Shared via TreeCertify
        </div>
      </footer>
    </div>
  );
}
