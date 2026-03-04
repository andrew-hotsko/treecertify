/**
 * Smoke Test Script
 *
 * Tests all API routes for unhandled exceptions.
 * - GET routes should return 200 or 401 (auth required), NOT 500
 * - POST routes with empty body should return 400/401, NOT 500
 *
 * Usage: npx tsx scripts/smoke-test.ts
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

interface RouteTest {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: Record<string, unknown>;
  description: string;
}

// All API routes organized by method
const routes: RouteTest[] = [
  // === GET routes ===
  { method: "GET", path: "/api/arborist/profile", description: "Arborist profile" },
  { method: "GET", path: "/api/arborist/usage", description: "Arborist usage stats" },
  { method: "GET", path: "/api/ordinances", description: "All ordinances" },
  { method: "GET", path: "/api/properties", description: "List properties" },
  { method: "GET", path: "/api/properties/test-id-123", description: "Get property (fake ID)" },
  { method: "GET", path: "/api/properties/test-id-123/trees", description: "List trees (fake ID)" },
  { method: "GET", path: "/api/properties/test-id-123/trees/export", description: "Export trees CSV (fake ID)" },
  { method: "GET", path: "/api/properties/test-id-123/audio", description: "List property audio (fake ID)" },
  { method: "GET", path: "/api/reports", description: "List reports" },
  { method: "GET", path: "/api/reports/test-id-123", description: "Get report (fake ID)" },
  { method: "GET", path: "/api/reports/test-id-123/validate", description: "Validate report (fake ID)" },
  { method: "GET", path: "/api/reports/test-id-123/versions", description: "Report versions (fake ID)" },
  { method: "GET", path: "/api/reports/test-id-123/pdf", description: "Report PDF (fake ID)" },
  { method: "GET", path: "/api/reports/usage", description: "Report usage stats" },
  { method: "GET", path: "/api/uploads/nonexistent/file.png", description: "Upload serving (fake path)" },

  // === POST routes (empty body — should get 400, not 500) ===
  { method: "POST", path: "/api/arborist/onboard", description: "Onboard (empty body)", body: {} },
  { method: "POST", path: "/api/feedback", description: "Feedback (empty body)", body: {} },
  { method: "POST", path: "/api/geocode", description: "Geocode (empty body)", body: {} },
  { method: "POST", path: "/api/ordinances/check", description: "Ordinance check (empty body)", body: {} },
  { method: "POST", path: "/api/properties", description: "Create property (empty body)", body: {} },
  { method: "POST", path: "/api/reports", description: "Create report (empty body)", body: {} },
  { method: "POST", path: "/api/ai/generate-report", description: "Generate report (empty body)", body: {} },
  { method: "POST", path: "/api/properties/test-id-123/share", description: "Create share (fake ID)", body: {} },
  { method: "POST", path: "/api/properties/test-id-123/trees", description: "Create tree (empty body)", body: {} },
  { method: "POST", path: "/api/reports/test-id-123/certify", description: "Certify report (fake ID)", body: {} },

  // === PATCH routes ===
  { method: "PATCH", path: "/api/arborist/onboard", description: "Complete onboarding", body: {} },

  // === PUT routes ===
  { method: "PUT", path: "/api/properties/test-id-123", description: "Update property (fake ID)", body: {} },
  { method: "PUT", path: "/api/reports/test-id-123", description: "Update report (fake ID)", body: {} },

  // === DELETE routes ===
  { method: "DELETE", path: "/api/properties/test-id-123/share", description: "Revoke share (fake ID)" },
];

interface TestResult {
  route: RouteTest;
  status: number;
  pass: boolean;
  error?: string;
  body?: string;
}

async function testRoute(route: RouteTest): Promise<TestResult> {
  try {
    const options: RequestInit = {
      method: route.method,
      headers: { "Content-Type": "application/json" },
    };
    if (route.body && route.method !== "GET" && route.method !== "DELETE") {
      options.body = JSON.stringify(route.body);
    }

    const res = await fetch(`${BASE_URL}${route.path}`, options);

    // 200, 201, 301, 302, 400, 401, 403, 404 are all "expected" responses
    // 500+ is a crash/unhandled exception
    const pass = res.status < 500;
    let body: string | undefined;
    if (!pass) {
      try {
        body = await res.text();
        if (body.length > 200) body = body.slice(0, 200) + "...";
      } catch {
        body = "(could not read body)";
      }
    }

    return { route, status: res.status, pass, body };
  } catch (err) {
    return {
      route,
      status: 0,
      pass: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function main() {
  console.log(`\n🔥 Smoke Test — ${BASE_URL}`);
  console.log(`Testing ${routes.length} API routes...\n`);

  const results: TestResult[] = [];

  // Test routes sequentially to avoid overwhelming the dev server
  for (const route of routes) {
    const result = await testRoute(route);
    results.push(result);

    const icon = result.pass ? "✅" : "❌";
    const statusStr = result.status > 0 ? `${result.status}` : "ERR";
    console.log(
      `${icon} ${result.route.method.padEnd(6)} ${statusStr.padEnd(4)} ${result.route.path}  — ${result.route.description}`
    );
    if (!result.pass && result.error) {
      console.log(`   ↳ Error: ${result.error}`);
    }
    if (!result.pass && result.body) {
      console.log(`   ↳ Body: ${result.body}`);
    }
  }

  // Summary
  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed out of ${results.length} total`);

  if (failed > 0) {
    console.log(`\n❌ Failed routes:`);
    for (const r of results.filter((r) => !r.pass)) {
      console.log(`   ${r.route.method} ${r.route.path} → ${r.status || "CONNECTION ERROR"}`);
    }
  } else {
    console.log(`\n✅ All routes handled gracefully (no 500s)`);
  }

  console.log();
  process.exit(failed > 0 ? 1 : 0);
}

main();
