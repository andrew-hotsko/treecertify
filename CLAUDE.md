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
- Ordinance data for 14 Peninsula cities/jurisdictions is in `prisma/seed.ts` and stored in the `MunicipalOrdinance` table. Original 5 + 9 expansion cities added 2026-03-06.
- **Verified against municipal code text (March 2026):** Palo Alto (PAMC §8.10.020), Menlo Park (MPMC §13.24.020), Atherton (AMC §8.10.020), Portola Valley (PVMC §15.12.060).
- **NEEDS_VERIFICATION:** Woodside species-specific DBH thresholds (WMC §153.005 table is in a PDF that couldn't be fully extracted — native threshold ~9.5" DBH confirmed by Almanac reporting but per-species breakdown unverified). Woodside replanting ratios not found in code text. Portola Valley replanting ratios not found in code text. Menlo Park in-lieu fee schedule amounts may be outdated. All 9 expansion city thresholds are approximate — phone numbers and office hours unverified. Redwood City measures circumference at 24" above grade (non-standard) — tip included in contacts.
- The check logic is in `lib/ordinances.ts` — `checkTreeProtection()` evaluates species-specific thresholds first, then falls back to default native/non-native thresholds. Heritage status is checked separately.
- City name matching is case-insensitive: `getOrdinanceByCity()` normalizes input to title case and uses Prisma `mode: "insensitive"`. Property creation/update API routes also normalize city to title case on storage.
- Test script at `scripts/test-ordinances.ts` validates 5 representative scenarios.

## AI Report Generation
- Report prompts are in `lib/report-templates.ts` (prompt v2.1). Each report type has versioned `systemInstructions` with section-by-section writing guidance.
- The generation route is `app/api/ai/generate-report/route.ts` (prompt v2.1). It sends STRUCTURED DATA + DETAILED SYSTEM PROMPT — Claude generates the narrative from data, not from pre-written text.
- `MASTER_VOICE_INSTRUCTIONS` constant in `lib/report-templates.ts` — injected into ALL report prompts to transform raw voice dictation into professional ISA arborist language. Covers tone, banned casual words, observation checkbox weaving, report depth scaling, and site observations transformation.
- Raw health/structural notes and site observations are labeled as "(raw field dictation — transform to professional language)" in the data block sent to Claude.
- Report depth scales to assessment complexity: removal/critical trees get 2-3 detailed paragraphs; healthy retained trees get 2-4 concise sentences.
- Scope of Assignment auto-generates per report type on property creation (server-side) and on page load (client-side). AI uses scope as foundation for Section 1.
- Standards referenced: ISA BMP, ISA TRAQ, ANSI A300, CTLA Trunk Formula Method (10th Edition), ANSI A300 Part 5 (construction).
- Mock fallback (no ANTHROPIC_API_KEY) does not fabricate observations — uses "No concerns noted" language when arborist left fields blank.
- Streaming via SSE to the report editor UI. Excluded sections: "Tree Inventory" and "Arborist Certification Statement" (handled by PDF template).

## Brand Guide
- Colors: Forest #1D4E3E (primary), Forest Light #2A6B55 (hover), Forest Muted #3D7D68 (accents). Warm neutral scale #FEFDFB–#0A0A09. No dark mode.
- Fonts: Instrument Sans (`font-display`) for headings, Roboto (`font-body`, default) for UI, IBM Plex Mono (`font-mono`) for data/measurements/ISA numbers.
- Tailwind: `forest.DEFAULT`/`.light`/`.muted` + brand `neutral` scale in `tailwind.config.ts`. CSS variables in `globals.css` use HSL format.
- Instrument Sans loaded via CSS `@import` in `globals.css`. Roboto + IBM Plex Mono via `next/font/google` in `app/layout.tsx`.
- Condition dot colors (emerald-500, gray-400/700, etc.) in `CONDITION_DOT_COLOR` maps are data visualization — do NOT change to brand colors.

## PDF Generation
- PDF route: `app/api/reports/[id]/pdf/route.ts` — Puppeteer renders HTML template to PDF.
- Professional layout: Instrument Sans headings, Roboto body, Dancing Script e-signatures.
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
- PDF TRAQ appendix formats these cleanly via `formatNotesForTRAQ()` in the PDF route — strips "Observed:" prefix, formats as "Observed conditions: X, Y." sentence, shows free text below.
- These are standard ISA terminology — not customizable per arborist.

## Dictation
- Inline mic button on each notes field = raw OpenAI Whisper transcription (no Claude parsing). Component: `components/voice-input.tsx`.
- Inline VoiceInput also on Site Information fields (Scope of Assignment, Site Observations) in property-map-view.
- Smart Dictation (separate modal) = full Claude field extraction with ISA terminology matching.
- Voice input has a visible red pulsing recording state with elapsed timer for field usability.
- "Site Audio Notes" card has been removed from property page. Existing PropertyAudioNote transcriptions are lazily migrated into siteObservations on page load.

## Mobile Field Mode
- Full-screen mobile assessment flow at `components/mobile-field-mode.tsx`. Opens instead of TreeSidePanel when viewport < 768px.
- Single vertical scroll with 5 sections: Species, Measurements, Condition, Observations, Action & Photos.
- Progress dots track viewport section via IntersectionObserver. Tappable for jump navigation.
- "Save & Next Tree" creates continuous entry flow — saves current tree, auto-creates next pin at map center, resets form.
- Field/Desktop toggle in top bar lets arborist switch between modes. Mobile defaults to Field Mode.
- Shared observation utilities extracted to `lib/observation-helpers.ts` (used by both tree-side-panel and mobile-field-mode).
- Touch targets minimum 44px (Apple HIG). Numeric inputs use inputMode="decimal" for mobile keypad.
- Haptic feedback (navigator.vibrate) on condition select, save success, photo capture.
- Ordinance protection banner auto-shows when species + DBH entered.
- Camera button uses capture="environment" for back-facing camera on mobile.
- Desktop TreeSidePanel unchanged.

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
- `FeedbackButton` component: floating forest FAB (bottom-right) on all `/(app)/` pages. Dialog with type selector (bug/suggestion/question), description textarea, and auto-screenshot via `html2canvas`.
- Screenshot capture: dynamic import of `html2canvas`, 0.5x scale, uploaded to `POST /api/feedback/screenshot` → stored in `uploads/feedback/`.
- Feedback API: `POST /api/feedback` creates a `Feedback` record with auto-captured context (pageUrl, metadata JSON with userAgent, propertyId, viewport, timestamp).
- `Feedback` model: id, arboristId, type, description, screenshotUrl, pageUrl, metadata, status (new/reviewed/resolved), createdAt.

## Dashboard Welcome State
- Dashboard computes `welcomeState`: `no_properties` | `no_trees` | `no_reports` | `normal`.
- `WelcomeCard` component renders above stat cards for non-normal states with contextual CTA (dashed-border forest card).

## Pre-Beta Stability (Session 12)
- Smoke test script at `scripts/smoke-test.ts` — tests all API routes via `npx tsx scripts/smoke-test.ts`. Checks GET returns 200/401 (not 500), POST with empty body returns 400/401 (not 500).
- Mobile fixes: Settings page form grids use `grid-cols-1 sm:grid-cols-2`. Ordinances page species table has `overflow-x-auto` wrapper. Ordinances mitigation/heritage grid responsive. Tree summary panel table scrolls horizontally. Report preview uses tighter mobile padding (24px 16px) with desktop override via media query. Report preview tables have `display:block; overflow-x:auto`.
- Error handling: PDF/Word downloads use fetch-then-download with error toast instead of blind `a.click()`. Photo upload/delete shows toast on failure. Tree delete, project info save, and site info save show toast on failure. Ordinance check failure shows toast. Quick photo capture shows toast on non-ok response.
- `DRY_RUN_CHECKLIST.md` at project root — manual testing checklist for full end-to-end dry run.

## Deletion
- Property DELETE (`DELETE /api/properties/[id]`) cascades: manually deletes ReportVersions + Reports in a `$transaction`, then deletes Property (which Prisma-cascades TreeRecord→TreePhoto/TreeAudioNote, PropertyAudioNote).
- Report DELETE (`DELETE /api/reports/[id]`) deletes report only — ReportVersions cascade automatically via `onDelete: Cascade`. Tree data is NOT deleted.
- Tree DELETE (`DELETE /api/properties/[id]/trees/[treeId]`) — API path must include property ID. Session 15 fixed a bug where the UI called `/api/trees/[id]` (non-existent). Tree numbers are NOT renumbered after deletion.
- All delete UIs use AlertDialog confirmation with details about what will be deleted.

## Audio Transcription
- Requires `OPENAI_API_KEY` in `.env`. If empty, voice input shows a destructive toast explaining the missing key.
- Session 15 fixed error surfacing — the transcription code was fully functional, but VoiceInput and SmartDictation silently swallowed API errors.

## Dashboard Pipeline Filtering
- Permit pipeline cards in the dashboard are clickable when count > 0, linking to `/properties?permitStatus=X`.
- Properties list accepts `initialPermitFilter` prop and shows a filter banner with clear button.

## Smart Share Page
- Share page (`app/share/[token]/page.tsx`) is a public RSC — fetches property + latest report + arborist via share token.
- Document-like layout: `max-w-2xl` container for focused reading experience.
- **Branded header**: company logo, "CERTIFIED ARBORIST REPORT" label (or "DRAFT — PENDING CERTIFICATION"), property address, arborist name/ISA cert, certification date with green checkmark.
- **Client note**: arborist can write a personal note in the report page (certified view only) via `clientNote` field on Report model. Displayed at top of share page in forest-tinted card with "FROM YOUR ARBORIST" label.
- **Plain-language summary**: template-based stats (not AI) per report type — removal (removal/retention/protected counts), health (good/fair/needs attention), valuation (total appraised value parsed from `typeSpecificData`), construction (protection/removal counts). 2×2 stat grid with explanation paragraph.
- **Enhanced tree cards**: condition color dot, species common + scientific name, measurements row (DBH/height/spread in font-mono), condition in plain English, action text, protected badge with ShieldCheck icon.
- **City-specific "What Happens Next"**: static submission guides in `lib/city-submission-guides.ts` for 5 Peninsula cities. 4-step numbered flow (submit, documents, review, after approval) with tips and city website link. Generic fallback for unsupported cities. Simpler guidance for non-removal report types.
- **PDF download**: contextual text per report type ("Submit this PDF with your permit application to [City] [Department]"). Full-width button on mobile.
- **Arborist contact card**: tap-to-call and tap-to-email buttons in forest-tinted style, website link.
- Not-certified state: shows only branded header (DRAFT badge), amber in-progress banner, tree count, arborist contact. Hides summary, tree details, next steps, PDF.

## Invoice Infrastructure (Dormant)
- `Invoice` model in `prisma/schema.prisma` — linked to Arborist, Report, and Property. Line items stored as JSON string. Status: unpaid/paid.
- CRUD routes: `app/api/invoices/route.ts` (POST + GET), `app/api/invoices/[id]/route.ts` (GET + PUT + DELETE).
- Invoice PDF route: `app/api/invoices/[id]/pdf/route.ts` — Puppeteer, same auth pattern as report PDF (share token + showOnSharePage, OR Clerk session).
- Arborist model retains 5 invoice settings fields (`invoiceHourlyRate`, `invoiceDefaultFee`, `invoicePaymentInstructions`, `invoicePrefix`, `invoiceNetTerms`).
- Middleware: `/api/invoices/(.*)/pdf` in public routes. Property cascade delete includes `prisma.invoice.deleteMany`.
- **No UI surfaces** — `InvoiceDialog` removed. Invoice routes available as API infrastructure for future formal invoicing if needed.

## Client Billing (Simple)
- Report model has 5 billing fields: `billingAmount` (Float?), `billingLineItems` (JSON string: `[{description, amount}]`), `billingPaymentInstructions` (String?), `billingIncluded` (Boolean, default false), `billingPaidAt` (DateTime?).
- Arborist model has 3 billing settings: `showBillingOnShare` (Boolean, default true), `defaultReportFee` (Float?), `billingPaymentInstructions` (String?).
- NOT an invoicing product — just a "here's what you owe" section. No invoice numbers, no invoice PDFs, no payment processing.
- Two-gate visibility: arborist-level `showBillingOnShare` controls whether billing card appears on report page; per-report `billingIncluded` controls whether billing shows on public share page.
- Report page (certified view): collapsible billing card below client note. Amount, optional line items, payment instructions, "Include on share page" switch, "Mark as Paid" button.
- Share page: billing section after PDF download (when `billingIncluded && billingAmount > 0`). Receipt-style card with amount, line items, paid status, payment instructions.
- Dashboard: "Outstanding Payments" counter (count + $ total of unpaid billing). Only shows when unpaid billing exists.
- Settings page: "Client Billing" card with Default Report Fee, Payment Instructions, "Show billing on share page" toggle.
- Billing fields saved via report PUT route (`/api/reports/[id]`), not separate API.

## City Submission Contacts
- `lib/city-contacts.ts` — detailed department contact info for 14 Peninsula cities/jurisdictions: Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley (original 5) + Redwood City, San Mateo, Los Altos, Los Altos Hills, Mountain View, Hillsborough, San Carlos, Burlingame, San Mateo County (expansion 9, added 2026-03-06).
- `CityContact` interface: department, phone, email, address, hours, portalUrl, websiteUrl, submissionMethod, requiredDocuments[], typicalTimeline, applicationFee, mitigationSummary, tips[] (array, not string).
- `CITY_ALIASES` map: "Unincorporated San Mateo County" → "San Mateo County". `getCityContact()` resolves aliases before lookup.
- `getCityContact(city, reportType?)` — returns contact for removal_permit type only. Returns null for other report types.
- `getNextStepsText(reportType)` — generic guidance for non-removal report types (health_assessment, tree_valuation, construction_encroachment).
- Share page "What Happens Next" section: tap-to-call phone links, tap-to-email links, office address with MapPin icon, office hours, portal URL as CTA button, tips as bulleted list, required documents checklist.
- Share page fallback for uncovered cities: 3-step generic guidance (contact city, get application, submit with PDF) instead of bare "contact your planning department" text. Only shows for removal_permit on cities not in the database.
- `lib/city-submission-guides.ts` still exists (legacy, not imported anywhere). Can be removed in future cleanup.
- All expansion city entries NEED VERIFICATION before GA — phone numbers, office hours, and thresholds are approximate. Marked with `// VERIFY` comments.
- Note: Redwood City measures circumference at 24" above grade (non-standard); San Carlos on 4/10 schedule (closed Fridays) — both surfaced in tips.

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
