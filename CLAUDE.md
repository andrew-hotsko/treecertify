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

## PDF Generation
- PDF route: `app/api/reports/[id]/pdf/route.ts` — Puppeteer renders HTML template to PDF.
- Professional layout: Playfair Display headings, Source Sans 3 body, Dancing Script e-signatures.
- Cover page: centered company logo (base64), company info, "Prepared For" block, arborist credentials.
- Running headers (pages 2+): company name left, report title right, hairline rule. "Page X of Y" footer centered.
- Table of Contents page after cover — lists all report sections.
- Tree inventory table: alternating row shading, shield icon for protected trees with code reference, summary row with totals.
- Photo documentation: 2-column grid grouped by tree, max 4 per page, captions + dates.
- Limitations section: wrapped in gray background box for visual distinction from findings.
- Signature block: formal certification statement, Dancing Script e-signature when certified, credential details table.
- `photoToBase64()` converts `/api/uploads/` paths to base64 data URIs for Puppeteer rendering.

## Photo Documentation Workflow
- Photo categories defined in `lib/photo-categories.ts` — per-report-type checklists (removal_permit, health_assessment, construction_encroachment, tree_valuation).
- TreePhoto schema fields: `category String?`, `exifLat Float?`, `exifLng Float?`, `exifTakenAt DateTime?`.
- EXIF extraction via `exif-parser` in the photo upload API route — extracts GPS coords and DateTimeOriginal from JPEG headers.
- Category picker: shown as pill buttons after file selection. Categories stored on TreePhoto, auto-caption generated from category + tree info.
- Required photos checklist shown at top of Photos tab in tree-side-panel. "Full tree" is required for all report types.
- Validation: warning check "full_tree_photo" flags trees with photos but no "Full tree" categorized photo.
- PDF includes category labels and EXIF dates (preferred over upload date) under each photo.

## Report Versioning
- `ReportVersion` model stores full markdown snapshots at key moments: "AI Draft" (generation), "Edit" (before each save), "Pre-certification" (before certify).
- Versions API: `GET /api/reports/[id]/versions` returns all versions newest-first.
- Version History UI: Sheet in report editor toolbar with preview Dialog and restore. Restore creates a new "Edit" version of the previous content automatically (via PUT route).

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
