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
