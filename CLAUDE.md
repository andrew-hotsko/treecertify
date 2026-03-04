# CLAUDE.md — Project Rules

## Verification
- Do NOT use the preview/screenshot tool to verify changes. Clerk auth redirects block the preview. Verify through build checks and server logs only.

## Workflow
- Always commit and push when you finish a task.

## Tech Stack
- This is a Next.js App Router project with Prisma (PostgreSQL via Neon), Clerk auth, Tailwind CSS, and shadcn/ui components.

## Certification
- Reports must pass validation before certification. `lib/report-validation.ts` exports `validateReportForCertification()` which runs blocking (fail) and advisory (warning) checks.
- The certify API route (`app/api/reports/[id]/certify/route.ts`) enforces server-side validation — returns 400 if any check has status `fail`.
- The UI shows validation results in Step 1 of the certification ceremony dialog and as a status indicator in the toolbar.

## Auth
- Do not break existing authentication — all routes under /(app)/ are protected by Clerk middleware.

## Ordinance Data
- Ordinance data for 5 Peninsula cities is in `prisma/seed.ts` and stored in the `MunicipalOrdinance` table.
- **Verified against municipal code text (March 2026):** Palo Alto (PAMC §8.10.020), Menlo Park (MPMC §13.24.020), Atherton (AMC §8.10.020), Portola Valley (PVMC §15.12.060).
- **NEEDS_VERIFICATION:** Woodside species-specific DBH thresholds (WMC §153.005 table is in a PDF that couldn't be fully extracted — native threshold ~9.5" DBH confirmed by Almanac reporting but per-species breakdown unverified). Woodside replanting ratios not found in code text. Portola Valley replanting ratios not found in code text. Menlo Park in-lieu fee schedule amounts may be outdated.
- The check logic is in `lib/ordinances.ts` — `checkTreeProtection()` evaluates species-specific thresholds first, then falls back to default native/non-native thresholds. Heritage status is checked separately.
- Test script at `scripts/test-ordinances.ts` validates 5 representative scenarios.

## AI Report Generation
- Report prompts are in `lib/report-templates.ts` (prompt v2.0). Each report type has versioned `systemInstructions` with section-by-section writing guidance.
- The generation route is `app/api/ai/generate-report/route.ts` (prompt v2.0). It sends STRUCTURED DATA + DETAILED SYSTEM PROMPT — Claude generates the narrative from data, not from pre-written text.
- Standards referenced: ISA BMP, ISA TRAQ, ANSI A300, CTLA Trunk Formula Method (10th Edition), ANSI A300 Part 5 (construction).
- Mock fallback (no ANTHROPIC_API_KEY) does not fabricate observations — uses "No concerns noted" language when arborist left fields blank.
- Streaming via SSE to the report editor UI. Excluded sections: "Tree Inventory" and "Arborist Certification Statement" (handled by PDF template).

## Report Versioning
- `ReportVersion` model stores full markdown snapshots at key moments: "AI Draft" (generation), "Edit" (before each save), "Pre-certification" (before certify).
- Versions API: `GET /api/reports/[id]/versions` returns all versions newest-first.
- Version History UI: Sheet in report editor toolbar with preview Dialog and restore. Restore creates a new "Edit" version of the previous content automatically (via PUT route).

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
