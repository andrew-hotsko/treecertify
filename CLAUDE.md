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
- 12 health observations (chlorosis, crown dieback, decay, pest damage, etc.) and 11 structural observations (codominant stems, included bark, cavities, etc.).
- "No significant concerns" is an exclusive toggle — selecting it unchecks all others and vice versa. NOT part of the observation library — handled as `exclusiveOption` prop on MultiCheckbox.
- Stored in existing `healthNotes`/`structuralNotes` fields using `"Observed: X, Y\n\n{free text}"` prefix format.
- Canonical terms also saved to `healthObservationCanonical`/`structuralObservationCanonical` fields as comma-separated ISA terms (e.g., `"chlorosis, crown_dieback"`).
- Helper functions: `parseObservedLine()`, `extractFreeText()`, `buildNotesWithObserved()` in `components/tree-side-panel.tsx`.
- PDF TRAQ appendix formats these cleanly via `formatNotesForTRAQ()` in the PDF route — strips "Observed:" prefix, formats as "Observed conditions: X, Y." sentence, shows free text below.
- Observations are customizable per arborist via the Observation Library (see Arborist Customization below). Falls back to hardcoded defaults in `lib/observation-helpers.ts` when arborist has no customizations.

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

## Arborist Customization
- `lib/default-observations.ts` — `Observation` interface (id, label, canonical, enabled, builtIn) and factory functions for default health (12) and structural (11) observations.
- Canonical terms: stable snake_case ISA identifiers (e.g., `chlorosis`, `codominant_stems`) for AI pipeline stability. Custom observations added by arborists get `canonical: "(custom) {label}"`.
- `LOCKED_OBSERVATION_COUNT = 6` — first 6 observations per category cannot be hidden (always enabled).
- **Observation Library** (Settings page): drag-and-drop reordering via `@dnd-kit/sortable`, toggle enable/disable, inline rename, add custom observations, reset to defaults. Saved as JSON to `Arborist.healthObservations`/`structuralObservations` via `PUT /api/settings/observations`.
- **Species Presets** (Settings page): tag-style input with autocomplete against `PENINSULA_SPECIES`. Arborist's common species appear first in species dropdown. Saved as JSON string array to `Arborist.commonSpecies` via `PUT /api/settings/species-presets`. Max 30 items.
- **Recommendation Map** (Settings page, Report Defaults card): condition rating (0–5) → default action (retain/remove/prune/monitor). Auto-selects recommended action when condition rating changes in tree assessment. Saved in `reportDefaults` JSON via existing profile PUT route. Default: Dead/Critical/Poor → remove, Fair → monitor, Good/Excellent → retain.
- **Scope Templates** (Settings page, Report Defaults card): per-report-type scope of assignment templates with `{count}` and `{address}` placeholders. Used by `property-map-view.tsx` when auto-generating scope on report type change (arborist template takes precedence over built-in `generateScopeTemplate()`). Saved in `reportDefaults` JSON.
- **PDF & Share Preferences** (Settings page): toggles for TRAQ appendix and city contacts in PDF, required photo count per tree (1–10), default share message, thank-you message. Saved to individual Arborist model fields via `PUT /api/settings/pdf-share`.
- `property-map-view.tsx` fetches arborist profile on mount and passes customization props to `TreeSidePanel` and `MobileFieldMode`. Both components compute effective observation lists with fallback to hardcoded defaults.
- AI report generation (`app/api/ai/generate-report/route.ts`) includes canonical terms in tree data block alongside raw notes. Backward compatible: pre-customization trees have null canonical fields, AI falls back to notes.
- Arborist model has 12 new customization fields. TreeRecord has 2 new canonical fields (`healthObservationCanonical`, `structuralObservationCanonical`).

## CTLA Tree Valuation (10th Edition)
- Implements the CTLA Trunk Formula Technique (TFT) from the *Guide for Plant Appraisal, 10th Edition* (2019) — the legal standard for tree appraisal in California.
- **Calculation engine**: `lib/valuation.ts` — `calculateTFT()` computes Appraised Value = Trunk Area × Unit Price × Condition × Species × Location.
  - Condition = geometric mean of Health%, Structure%, Form% — `(H × S × F)^(1/3)` (10th Ed. method, NOT a single percentage).
  - Location = arithmetic average of Site% and Contribution% — `(Site + Contribution) / 2`.
  - If any condition sub-rating is 0, condition = 0 (zero-value protection).
- **Species ratings**: `lib/species-ratings.ts` — 100+ species keyed by common name (matching `TreeRecord.speciesCommon` format). `getDefaultSpeciesRating()` with case-insensitive matching and partial match fallback. Default 60% for unlisted species.
- **Default unit price**: `DEFAULT_UNIT_PRICE = $38/sq in` (Bay Area, 2026). Editable per-arborist via `Arborist.defaultValuationUnitPrice` and per-tree via `TreeRecord.valuationUnitPrice`.
- **Valuation data storage**: 12 dedicated fields on `TreeRecord` (NOT in `typeSpecificData` JSON) — `valuationUnitPrice`, `valuationHealthRating`, `valuationStructureRating`, `valuationFormRating`, `valuationConditionRating` (computed), `valuationSpeciesRating`, `valuationSiteRating`, `valuationContributionRating`, `valuationLocationRating` (computed), `valuationBasicValue` (computed), `valuationAppraisedValue` (computed), `valuationNotes`.
- **Report-level fields**: `Report.valuationTotalValue` (Float), `Report.valuationPurpose` (String), `Report.valuationBasisStatement` (String).
- **Tree assessment UI**: `components/type-fields/tree-valuation-fields.tsx` — slider+number input combos for all sub-ratings (step=5 slider, 0-100 freeform input), live `calculateTFT()` calculation, full breakdown display. Species rating auto-fills from `getDefaultSpeciesRating()` with `userOverrodeSpeciesRef` to avoid overriding manual edits.
- **Report-level card**: `property-map-view.tsx` shows "Valuation Report Settings" card when report type is `tree_valuation` — purpose dropdown (`VALUATION_PURPOSES`), basis statement textarea, live total of all tree appraised values.
- **Settings**: "Valuation Defaults" card in settings page with default unit price. API: `PUT /api/settings/valuation`.
- **PDF output**: Per-tree valuation breakdown boxes showing all factors + formula steps. Valuation Summary table with all trees, their appraised values, and a prominent grand total row. Added to TOC.
- **AI generation**: Tree data block includes CTLA fields (unit price, sub-ratings, basic/appraised values). Report-level valuation context (purpose, basis, total) injected into system prompt. AI instructed NOT to include dollar figures in narrative paragraphs — values belong in the valuation table only.
- **Backward compatibility**: Old `TreeValuationData` interface in `report-types.ts` retained. Old `calcTrunkArea`/`calcAppraisedValue` marked `@deprecated`. `report-types.ts` re-exports `calculateTFT`, `formatCurrency`, `getDefaultSpeciesRating` from `lib/valuation.ts`.

## City Submission Contacts
- `lib/city-contacts.ts` — static city contact data for share page. No database queries.
- **Coverage**: Peninsula (Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley), North Bay (Sonoma County, Santa Rosa, City of Napa, Windsor, Healdsburg), Tahoe Basin (TRPA), Reno.
- **JurisdictionType** union: `"city"` | `"county"` | `"regional"` | `"no_permit"` — added to `CityContact` interface. Determines share page display logic.
- **Tahoe Basin**: TRPA is a bi-state regional authority that overrides local city/county for tree permits. `CITY_ALIASES` map resolves South Lake Tahoe, Incline Village, Tahoe City, Kings Beach, Stateline, Zephyr Cove, Tahoe Vista, Crystal Bay → "Tahoe Basin". Share page shows amber warning callout explaining TRPA is the sole permit authority.
- **Reno**: `no_permit` jurisdiction — no private-property tree removal permit required. Share page shows positive "good news" framing with emerald styling. Supports both `removal_permit` and `health_assessment` report types.
- `getCityContact(city, reportType?)` — resolves city aliases, then looks up by city and report type. Returns null if no contact info exists.
- `getNextStepsText(reportType)` — generic guidance for non-removal report types when no city-specific contact exists.
- **Title-case normalization**: `toTitleCase()` extracted to `lib/utils.ts` — shared between `lib/city-contacts.ts` and `lib/ordinances.ts`. Single source of truth for city name normalization.
- Share page "What Happens Next" section: handles 5 cases — no_permit (emerald card), regional (amber warning + standard steps), city/county (standard steps), unsupported city fallback, non-removal generic guidance.
- **VERIFY**: All North Bay and Reno contact info marked `// VERIFY` — phone confirmation needed before beta launch.
- **GAP**: No `MunicipalOrdinance` data seeded for North Bay, Tahoe, or Reno cities — `checkTreeProtection()` does not cover these regions yet. Future session needed to add ordinance data.
- `lib/city-submission-guides.ts` still exists (legacy, not imported anywhere). Can be removed in future cleanup.

## Real Estate Package
- `real_estate_package` report type bundles health assessment + CTLA valuation for real estate transactions. Generates a "Certified Tree Canopy Report."
- Report model has 7 RE listing fields: `reListingAddress`, `reRealtorName`, `reRealtorEmail`, `reRealtorPhone`, `reRealtorCompany`, `reListingPrice` (Float), `rePackageNotes`. All nullable.
- Shares CTLA valuation columns with `tree_valuation` on TreeRecord (valuationUnitPrice, valuationAppraisedValue, etc.) — NOT typeSpecificData JSON.
- Report page: violet-themed "Listing Information" card (certified view) for realtor contact and listing details. Saves via existing report PUT API.
- Share page: realtor contact card with violet styling, canopy value highlight in summary stats, "Share with Your Realtor" next-steps text.
- PDF: "Certified Tree Canopy Report" title, "Prepared For" shows realtor info instead of city planning, valuation summary section included, purpose defaults to "Real Estate Transaction."
- AI template in `lib/report-templates.ts`: buyer-friendly language, asset-oriented tone, 7 required sections (Introduction, Site Description, Executive Tree Summary, Individual Assessments, Canopy Valuation, Maintenance Outlook, Limitations).
- Icon: Home (lucide), color: violet. Appears in new property page, onboarding, and report type selectors.
- Tree side panel and property-map-view show CTLA valuation fields for `real_estate_package` (same as `tree_valuation`).

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
