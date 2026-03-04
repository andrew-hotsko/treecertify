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
- City name matching is case-insensitive: `getOrdinanceByCity()` normalizes input to title case and uses Prisma `mode: "insensitive"`. Property creation/update API routes also normalize city to title case on storage.
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
- `photoToBase64()` converts `/api/uploads/` paths to base64 data URIs for Puppeteer rendering. If conversion fails (file missing/deleted), a "Photo unavailable" placeholder is shown instead of a broken image.

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

## Permit Lifecycle Tracking
- Report model has 9 permit fields: `permitStatus` (submitted/under_review/approved/denied/revision_requested), `submittedAt`, `submittedTo`, `reviewerName`, `reviewerNotes`, `conditionsOfApproval`, `denialReason`, `approvedAt`, `permitExpiresAt`. All nullable.
- `PermitStatusPipeline` component (`components/permit-status-pipeline.tsx`) — reusable horizontal stepper with interactive (arborist) and readonly (homeowner) modes. Supports `friendlyLabels` prop for homeowner-facing text.
- Report page shows the pipeline after certification with forms to advance permit status.
- Dashboard shows a "Permit Pipeline" card with counts: pending submission, submitted/under review, approved, needing revision.
- PDF route (`/api/reports/[id]/pdf`) supports public access via `?token=` query param validated against `property.shareToken`. Middleware allows `/api/reports/(.*)/pdf` as a public route.

## Client Share Page
- Share page (`app/share/[token]/page.tsx`) is a public RSC — fetches property + latest report + arborist via share token.
- Shows arborist company branding (logo, name), permit status pipeline with homeowner-friendly labels, PDF download button (certified only), tree cards with plain-English recommendations, arborist contact info.
- If report is not certified, shows "Assessment In Progress" banner and hides report details.
- Action translations: retain → "healthy and will be preserved", remove → "removal recommended", prune → "maintenance pruning recommended", monitor → "will be monitored".

## Observation Checkboxes
- ISA-standard health and structural observations are shown as checkbox grids in the tree side panel, above the free-text notes textareas.
- 12 health observations (chlorosis, crown dieback, decay, pest damage, etc.) and 12 structural observations (codominant stems, included bark, cavities, etc.).
- "No significant concerns" is an exclusive toggle — selecting it unchecks all others and vice versa.
- Stored in existing `healthNotes`/`structuralNotes` fields using `"Observed: X, Y\n\n{free text}"` prefix format. No schema changes needed.
- Helper functions: `parseObservedLine()`, `extractFreeText()`, `buildNotesWithObserved()` in `components/tree-side-panel.tsx`.
- These are standard ISA terminology — not customizable per arborist.

## Dictation
- Inline mic button on each notes field = raw OpenAI Whisper transcription (no Claude parsing). Component: `components/voice-input.tsx`.
- Smart Dictation (separate modal) = full Claude field extraction with ISA terminology matching.
- Voice input has a visible red pulsing recording state with elapsed timer for field usability.

## Map Snapshot
- PDF site map uses Mapbox Static Images API with colored pin overlays matching the interactive map's condition-based color scheme.
- Configurable via `includeSiteMap` in report options (default: true). Graceful degradation if Mapbox fetch fails.
- Pin colors: green (good/excellent), yellow (fair), orange (poor), red (critical/remove), gray (unassessed).

## Beta Onboarding
- 3-step onboarding flow at `/onboarding`: Step 1 (Professional Credentials), Step 2 (Company Branding with live cover page preview), Step 3 (First Property walkthrough with supported city validation).
- `Arborist.onboardingStep` tracks progress (0=not started, 1=credentials, 2=branding, 3=complete). On page mount, profile is fetched and flow resumes at `onboardingStep + 1`.
- Step-based saves via `POST /api/arborist/onboard` with `body.step` (1 or 2). `PATCH` marks complete (`onboardingStep = 3`).
- Step 3 creates a real property via existing `POST /api/properties`, then calls PATCH to finalize.
- Supported cities (5): Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley. Unsupported cities show amber warning but still allow property creation.

## In-App Feedback
- `FeedbackButton` component: floating emerald FAB (bottom-right) on all `/(app)/` pages. Dialog with type selector (bug/suggestion/question), description textarea, and auto-screenshot via `html2canvas`.
- Screenshot capture: dynamic import of `html2canvas`, 0.5x scale, uploaded to `POST /api/feedback/screenshot` → stored in `uploads/feedback/`.
- Feedback API: `POST /api/feedback` creates a `Feedback` record with auto-captured context (pageUrl, metadata JSON with userAgent, propertyId, viewport, timestamp).
- `Feedback` model: id, arboristId, type, description, screenshotUrl, pageUrl, metadata, status (new/reviewed/resolved), createdAt.

## Dashboard Welcome State
- Dashboard computes `welcomeState`: `no_properties` | `no_trees` | `no_reports` | `normal`.
- `WelcomeCard` component renders above stat cards for non-normal states with contextual CTA (dashed-border emerald card).

## Pre-Beta Stability (Session 12)
- Smoke test script at `scripts/smoke-test.ts` — tests all API routes via `npx tsx scripts/smoke-test.ts`. Checks GET returns 200/401 (not 500), POST with empty body returns 400/401 (not 500).
- Mobile fixes: Settings page form grids use `grid-cols-1 sm:grid-cols-2`. Ordinances page species table has `overflow-x-auto` wrapper. Ordinances mitigation/heritage grid responsive. Tree summary panel table scrolls horizontally. Report preview uses tighter mobile padding (24px 16px) with desktop override via media query. Report preview tables have `display:block; overflow-x:auto`.
- Error handling: PDF/Word downloads use fetch-then-download with error toast instead of blind `a.click()`. Photo upload/delete shows toast on failure. Tree delete, project info save, and site info save show toast on failure. Ordinance check failure shows toast. Quick photo capture shows toast on non-ok response.
- `DRY_RUN_CHECKLIST.md` at project root — manual testing checklist for full end-to-end dry run.

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
