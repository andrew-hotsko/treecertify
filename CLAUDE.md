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
- Ordinance data for 21 cities/jurisdictions is in `prisma/seed.ts` and stored in the `MunicipalOrdinance` table. Original 5 + 9 Peninsula expansion (2026-03-06) + 7 North Bay/Tahoe/Reno expansion (2026-03-09).
- **Verified against municipal code text (March 2026):** Palo Alto (PAMC §8.10.020), Menlo Park (MPMC §13.24.020), Atherton (AMC §8.10.020), Portola Valley (PVMC §15.12.060).
- **HIGH confidence (March 2026):** Sonoma County (§26-88-010(m), 31 species at 6"+ DBH, confirmed from PJR-151 form), Santa Rosa (Chapter 17-24, 15 heritage species with species-specific thresholds, confirmed from ecode360), Healdsburg (Chapter 20.24, heritage = 30" at 2 ft above grade — non-standard measurement point, confirmed from codepublishing.com), Windsor (Chapter 27.36, native oaks at 6" DBH, confirmed from multiple official sources), TRPA/Tahoe Basin (Chapter 61, 14" standard residential threshold, confirmed from TRPA official website), Reno (no private property permit, confirmed from City FAQ).
- **MEDIUM confidence:** City of Napa (Chapter 12.45, oak thresholds confirmed but full 14-species list not fully extracted — only ~7 species confirmed with specific thresholds). Sonoma County scientific names inferred from standard California flora references. Santa Rosa Black Oak threshold (18") confirmed by search synthesis but gap in original ecode360 table. Santa Rosa in-lieu fee ($100/tree) may be outdated from 1990 adoption.
- **NEEDS_VERIFICATION (Peninsula):** Woodside species-specific DBH thresholds. Woodside/Portola Valley replanting ratios. Menlo Park in-lieu fee schedule. All 9 Peninsula expansion city thresholds approximate. Redwood City measures circumference at 24" above grade (non-standard).
- **NEEDS_VERIFICATION (North Bay/Tahoe/Reno):** All North Bay phone numbers and office hours. City of Napa full 14-species list with per-species thresholds. Healdsburg in-lieu fee amount (set by Council resolution, not in code). Windsor section numbers may have changed under new Zoning Code (Ord. 2024-394, effective Dec 2024). Healdsburg hours (9/80 schedule reported but may vary).
- **Non-standard measurement points:** Healdsburg measures at 2 ft above grade (NOT standard DBH 4.5 ft). Redwood City measures circumference at 24" above grade. TRPA lakefront threshold is 6" DBH (between house and lake), vs 14" standard residential.
- The check logic is in `lib/ordinances.ts` — `checkTreeProtection()` evaluates species-specific thresholds first, then falls back to default native/non-native thresholds. Heritage status is checked separately. When no ordinance data exists for a city, returns `isProtected: false` with "protection status unknown" messaging (not "not protected").
- City name matching is case-insensitive: `getOrdinanceByCity()` normalizes input to title case and uses Prisma `mode: "insensitive"`. Property creation/update API routes also normalize city to title case on storage.
- Test script at `scripts/test-ordinances.ts` validates 10 representative scenarios (5 original Peninsula + 5 expansion cities).

## AI Report Generation
- Report prompts are in `lib/report-templates.ts` (prompt v2.1). Each report type has versioned `systemInstructions` with section-by-section writing guidance.
- The generation route is `app/api/ai/generate-report/route.ts` (prompt v2.1). It sends STRUCTURED DATA + DETAILED SYSTEM PROMPT — Claude generates the narrative from data, not from pre-written text.
- `getMasterVoiceInstructions(reportType)` function in `lib/report-templates.ts` — injected into ALL report prompts to transform raw voice dictation into professional ISA arborist language. Covers tone, banned casual words, observation checkbox weaving, report depth scaling, and site observations transformation. **Audience-scoped**: municipal types (removal_permit, construction_encroachment) get "submitted to city planners, reviewed by attorneys" framing; other types (health_assessment, tree_valuation, real_estate_package) get neutral "professional deliverable" framing. Deprecated `MASTER_VOICE_INSTRUCTIONS` constant still exported for backward compat.
- Raw health/structural notes and site observations are labeled as "(raw field dictation — transform to professional language)" in the data block sent to Claude.
- Report depth scales to assessment complexity: removal/critical trees get 2-3 detailed paragraphs; healthy retained trees get 2-4 concise sentences.
- Scope of Assignment auto-generates per report type on property creation (server-side) and on page load (client-side). AI uses scope as foundation for Section 1.
- Standards referenced: ISA BMP, ISA TRAQ, ANSI A300, CTLA Trunk Formula Method (10th Edition), ANSI A300 Part 5 (construction).
- Mock fallback (no ANTHROPIC_API_KEY) does not fabricate observations — uses "No concerns noted" language when arborist left fields blank. `real_estate_package` has a dedicated `generateMockRealEstateReport()` with correct RE sections (Introduction and Scope, Executive Tree Summary, Canopy Valuation Summary, Maintenance Outlook, etc.) and buyer-friendly language.
- Streaming via SSE to the report editor UI. Excluded sections: "Tree Inventory" and "Arborist Certification Statement" (handled by PDF template).
- **SSE resilience**: Client tracks `receivedDone` flag. If stream ends without "done" event, attempts to reload property from API to recover server-saved report. Server sends "done" event immediately after `prisma.report.create()` — version snapshot is fire-and-forget to avoid blocking confirmation.
- **Generation UI**: Centered `max-w-lg` card with forest green brand colors, h-12 generate button, timed progress messages in modal (Connecting → Analyzing → Writing → Drafting → Finalizing). 90-second AbortController timeout with clear retry prompt. Amber error card with "Try Again" button.

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
- Report model has 9 permit fields: `permitStatus` (submitted/under_review/approved/approved_with_conditions/denied/revision_requested), `submittedAt`, `submittedTo`, `reviewerName`, `reviewerNotes`, `conditionsOfApproval`, `denialReason`, `approvedAt`, `permitExpiresAt`. All nullable.
- `PermitStatusPipeline` component (`components/permit-status-pipeline.tsx`) — reusable horizontal stepper with interactive (arborist) and readonly (homeowner) modes. Supports `friendlyLabels` prop for homeowner-facing text. Renders on report page and share page.
- `PermitTracker` component (`components/permit-tracker.tsx`) — simplified permit tracking card for the property overview page. 4-step horizontal indicator (Not Submitted → Submitted → Under Review → Decision) with colored dots (forest green = completed, amber = current, neutral = upcoming, red = denied). Status detail line, city contact info block (when submitted/under_review), and "Update Status" dialog with conditional fields per status.
- PermitTracker renders on property overview only for certified `removal_permit` or `construction_encroachment` reports. Uses optimistic local state (`permitData` in `property-map-view.tsx`) — updates via PUT `/api/reports/[id]`.
- Report page shows the `PermitStatusPipeline` after certification with forms to advance permit status.
- **Dashboard**: 2 permit-related action cards (shown only when count > 0): "N permits awaiting city review" (teal, Send icon) links to `/properties?permitStatus=submitted`; "N mitigation deadlines approaching" (orange, Clock icon) links to `/properties?filter=mitigation-due`.
- **Properties list**: Certified cards with active `permitStatus` show a third line: "Permit: {Status} · {date}". Supports `?filter=mitigation-due` and `?permitStatus=submitted` query params from dashboard links.
- PDF route (`/api/reports/[id]/pdf`) supports public access via `?token=` query param validated against `property.shareToken`. Middleware allows `/api/reports/(.*)/pdf` as a public route.

## Client Share Page
- Share page (`app/share/[token]/page.tsx`) is a public RSC — fetches property + latest report + arborist via share token.
- Shows arborist company branding (logo, name), permit status pipeline with homeowner-friendly labels, PDF download button (certified only), tree cards with plain-English recommendations, arborist contact info.
- If report is not certified, shows "Assessment In Progress" banner and hides report details.
- Action translations: retain → "healthy and will be preserved", remove → "removal recommended", prune → "maintenance pruning recommended", monitor → "will be monitored".

## Observation Checkboxes
- ISA-standard health and structural observations are shown as checkbox grids in the tree side panel, above the free-text notes textareas.
- **Collapsible sections**: Health Observations, Structural Observations, TRAQ Risk Assessment, and Maintenance Recommendations are wrapped in `CollapsibleSection` components (`components/ui/collapsible-section.tsx`). Each shows a badge with item count or risk rating. Sections auto-open when data exists. Multiple sections can be open simultaneously (non-exclusive). Animated expand/collapse with CSS grid transition.
- 12 health observations (chlorosis, crown dieback, decay, pest damage, etc.) and 11 structural observations (codominant stems, included bark, cavities, etc.).
- "No significant concerns" is an exclusive toggle — selecting it unchecks all others and vice versa. NOT part of the observation library — handled as `exclusiveOption` prop on MultiCheckbox.
- Stored in existing `healthNotes`/`structuralNotes` fields using `"Observed: X, Y\n\n{free text}"` prefix format.
- Canonical terms also saved to `healthObservationCanonical`/`structuralObservationCanonical` fields as comma-separated ISA terms (e.g., `"chlorosis, crown_dieback"`).
- Helper functions: `parseObservedLine()`, `extractFreeText()`, `buildNotesWithObserved()` in `components/tree-side-panel.tsx`.
- PDF TRAQ appendix formats these cleanly via `formatNotesForTRAQ()` in the PDF route — strips "Observed:" prefix, formats as "Observed conditions: X, Y." sentence, shows free text below.
- Observations are customizable per arborist via the Observation Library (see Arborist Customization below). Falls back to hardcoded defaults in `lib/observation-helpers.ts` when arborist has no customizations.

## Dictation
- Inline mic button on each notes field = raw OpenAI Whisper transcription (no Claude parsing). Component: `components/voice-input.tsx`.
- Inline VoiceInput also on Site Information fields (Scope of Assignment, Site Observations) in property-map-view, and TRAQ Target Description in `health-assessment-fields.tsx`.
- Smart Dictation component (`components/smart-dictation.tsx`) exists but is **not rendered in UI** (removed from tree-side-panel in Session 39). Component code preserved for potential future use.
- Voice input has a visible red pulsing recording state with elapsed timer for field usability.
- "Site Audio Notes" card has been removed from property page. Existing PropertyAudioNote transcriptions are lazily migrated into siteObservations on page load.

## Mobile Field Mode
- **5-screen wizard** at `components/mobile-field-mode.tsx`. Opens instead of TreeSidePanel when viewport < 768px.
- **Screen 1 — Pin Drop** (new trees only): `components/pin-drop-map.tsx` (dynamic import, SSR disabled). Satellite map with centered CSS crosshair pin, GPS accuracy indicator, existing tree context dots, "Confirm Location" button. User drags map — pin stays centered. Returns coordinates via `onConfirm(lat, lng)`.
- **Screen 2 — Species & Measurements**: Full-screen species selector via `components/species-sheet.tsx` (shadcn Sheet, bottom, 100dvh). Search + recent species chips + arborist presets + native/non-native grouped list. DBH large input (h-14, text-2xl, font-mono), height/spread side-by-side. 6 condition circles (52px), 4 action pills. "Copy from Tree #N" for repeat species. Ordinance check auto-fires on species + DBH change (debounced 500ms).
- **Screen 3 — Health & Structural**: 2-column observation checkbox grid with 44px+ tap targets. Abbreviated labels for mobile fit (display-only — canonical terms stored unchanged). VoiceInput mic button on each section. "No significant concerns" exclusive toggle.
- **Screen 4 — Photos & Notes**: Camera button with `capture="environment"`. "Add from Library" button. Photo thumbnails in 72px horizontal scroll. For new trees: photos queued as local File[] state, uploaded after save. Required photo checklist from `getCategoriesForReportType()`. Additional notes textarea with mic dictation.
- **Screen 5 — Review & Save**: Summary cards (tappable → jump back to edit). Protection status check prominently displayed. "Save & Add Next Tree" (forest green, h-14) + "Save & Finish" (outline, h-14).
- **Pin coordinates flow**: Extended `TreeFormData & { pinLat?: number; pinLng?: number }`. `property-map-view.tsx` handleSave prefers wizard pin coords, falls back to `pendingPin` for backward compat. `key` prop forces remount on tree change.
- **New props**: `propertyCenter`, `existingPins` passed from property-map-view.
- Shared observation utilities in `lib/observation-helpers.ts` (used by both tree-side-panel and mobile-field-mode).
- Touch targets minimum 44px (Apple HIG). Numeric inputs use inputMode="decimal" for mobile keypad.
- Haptic feedback (navigator.vibrate) on condition select, save success, photo capture.
- **Light mode enforced**: `color-scheme: light` + explicit white/neutral colors on wizard container.
- Auto-save draft to localStorage every 30s. Restore on mount (if < 1 hour old).
- Offline: amber "Offline — data will sync" bar when disconnected. Saves queue via existing api-queue.ts.
- Desktop TreeSidePanel completely unaffected.

## Google Maps Integration (Session 40)
- **Replaced Mapbox with Google Maps** across all map surfaces for better satellite imagery at residential property level.
- Singleton loader: `lib/google-maps-loader.ts` — one `<script>` tag, one Promise, reused by `property-map.tsx` and `pin-drop-map.tsx`.
- **Interactive map** (`components/property-map.tsx`): `google.maps.Map` with `AdvancedMarkerElement` for tree pins. Satellite/roadmap/terrain toggle. `google.maps.Circle` for TPZ/SRZ overlays (solid strokes — no dash pattern support in Google Maps).
- **Pin drop map** (`components/pin-drop-map.tsx`): Google Maps in satellite mode with CSS crosshair overlay.
- **Geocoding** (`app/api/geocode/route.ts`): Google Geocoding REST API replacing Mapbox Geocoding v5. Same return shape `{ lat, lng, formattedAddress }`.
- **Static maps**: PDF route and share page use Google Maps Static API. Pin labels: single character (1-9 numbers, 10+ letters A-Z). Pin colors use `0x{hex}` format.
- **Environment**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` required. Optional `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` for AdvancedMarkerElement features (falls back to basic markers without it).
- **Condition-based pin colors**: 5→#1D4E3E (forest), 4→#3D7D68 (forest muted), 3→#D4A017 (gold), 2→#E07B3C (orange), 1/0→#C0392B (red), null→#9CA3AF (gray).
- **Pin states**: 32px circles with IBM Plex Mono numbers, 44px tap targets. Hover: scale(1.15). Selected: scale(1.2) + white ring (box-shadow: 0 0 0 3px white) + z-index 20. Dimmed (other pins): opacity 0.5.
- **Protection/heritage borders**: Protected: 2.5px solid #F59E0B (amber). Heritage: 2.5px solid #A855F7 (purple).
- `pinColorHex()` exported from `property-map.tsx` for static map color matching.

## Map Layout & Interaction (Session 40)
- **Map fills viewport**: Desktop `calc(100vh - 4rem)`, mobile `h-[55vh]`. Tree list panel widened to `w-[400px]`.
- **"Tag a Tree" toggle**: Floating button on map (bottom-left) + inline toolbar button. Repurposes `quickAddMode` state.
  - Active: forest green bg, crosshair cursor on map, map click → `onPinAdd(lat, lng)`.
  - Inactive: white bg, normal cursor, map click → deselect tree & close side panel.
- **Copy-from-last-tree**: Copies species, condition, action, observation checkboxes (NOT measurements). Updated in both `tree-side-panel.tsx` and `mobile-field-mode.tsx`.

## Map Snapshot
- PDF site map uses Google Maps Static API with colored pin overlays matching the interactive map's condition-based color scheme.
- Configurable via `includeSiteMap` in report options (default: true). Graceful degradation if Google Maps fetch fails.
- Pin colors: forest (good/excellent), gold (fair), orange (poor), red (critical/remove), gray (unassessed).

## Section-Based Report Editor (Session 40)
- **Replaces split textarea/preview editor** with a document-like reading view where sections are individually editable.
- **Component**: `components/section-editor.tsx` (~550 lines). Props: `{ content, reportId, trees, onContentChange, readOnly? }`.
- **Section parsing**: `parseIntoSections()` splits report markdown by `#`, `##`, `###` headings into `ParsedSection[]` objects (id, title, level, content, body). `reassembleSections()` reconstructs full markdown from edited sections.
- **Default state**: Rendered HTML sections styled to match PDF typography (forest green headings, branded tables). Each section card shows hover ghost "Edit" (Pencil) and "AI Rewrite" (Sparkles) buttons top-right.
- **Edit mode** (per section): Click "Edit" → textarea with raw markdown. "Save" (forest green) updates section and triggers `onContentChange`. "Cancel" reverts. Only one section editable at a time.
- **AI Rewrite mode** (per section): Click "AI Rewrite" → instruction input appears ("What should change?"). "Rewrite" button → calls `POST /api/ai/rewrite-section`. Loading state with spinner. Result shows diff-like view: original dimmed + rewritten highlighted, with "Accept" / "Reject" buttons.
- **API route**: `app/api/ai/rewrite-section/route.ts` — POST body: `{ reportId, sectionTitle, sectionContent, instruction }`. Returns `{ content: string }`. Uses `buildArboristStyleInstructions()` and `getMasterVoiceInstructions()` for consistent voice. Logs API usage via `logApiUsage()`. Mock fallback when ANTHROPIC_API_KEY not set.
- **Auto-generated sections**: Valuation Summary, TRAQ Risk Assessment, Limiting Conditions, Arborist Certification detected by title match — rendered as collapsible, non-editable cards with "Auto-generated" badge.
- **Photo thumbnails**: Tree sections (`### Tree #N`) show photo thumbnails via `getTreePhotosHtml()` using `TreePhoto` data passed from report page.
- **Built-in section navigation**: Left sidebar lists all section titles. Click → smooth scroll to that section.
- **Report page changes** (`app/(app)/properties/[id]/report/page.tsx`):
  - `viewMode` changed from `"edit" | "split" | "preview" | "quickReview"` to `"editor" | "preview" | "quickReview"`.
  - Split textarea + live preview editor replaced with `<SectionEditor>` component.
  - Removed: raw textarea, `previewHtml` state, `editorRef`, section navigation sidebar (built into SectionEditor now), "Save as Template" button (depended on textarea text selection).
  - Template insert: appends to end of content instead of cursor position.
  - Auto-save (debounced 30s) and certification flow unchanged.

## Onboarding (First-Run Experience)
- 3-step onboarding at `/onboarding`: Step 1 "Your Info" (name, ISA cert#, service area — 3 fields only), Step 2 "See It In Action" (inline sample report preview + callout cards), Step 3 "First Assessment" (create property or skip to dashboard).
- `Arborist.hasCompletedOnboarding` (Boolean, default false) gates access to `/(app)/` routes. Layout guard in `app/(app)/layout.tsx` redirects to `/onboarding` if false.
- `Arborist.onboardingStep` (Int) tracks resume position within the flow. Step 1 POST saves profile, PATCH sets `hasCompletedOnboarding = true`.
- Step 2 renders an inline `SampleReportPreview` component (certification header, 3-tree inventory table, assessment excerpt, limitations) — NOT a PDF iframe. "View sample PDF" link opens `/api/sample-report?showcase=true` in new tab.
- Step 3 creates a real property via `POST /api/properties`, or "I'll do this later" skips to dashboard. Both call PATCH to finalize.
- Contextual hints (`components/onboarding-hint.tsx`): dismissable banners using `localStorage` key `tc_hint_dismissed_{hintId}`. Placed on first tree placement (assessment page), first report generation (report page), and share link popover.
- Sidebar and mobile nav include "Sample Report" link to `/api/sample-report?showcase=true`.
- Migration script: `scripts/migrate-onboarding.ts` — sets `hasCompletedOnboarding = true` for existing arborists. Run with `npx tsx scripts/migrate-onboarding.ts`.

## In-App Feedback
- `FeedbackButton` component: floating forest FAB (bottom-right) on all `/(app)/` pages. Dialog with type selector (bug/suggestion/question), description textarea, and auto-screenshot via `html2canvas`.
- Screenshot capture: dynamic import of `html2canvas`, 0.5x scale, uploaded to `POST /api/feedback/screenshot` → stored in `uploads/feedback/`.
- Feedback API: `POST /api/feedback` creates a `Feedback` record with auto-captured context (pageUrl, metadata JSON with userAgent, propertyId, viewport, timestamp).
- `Feedback` model: id, arboristId, type, description, screenshotUrl, pageUrl, metadata, status (new/reviewed/resolved), createdAt.

## Dashboard (Action-Oriented)
- Dashboard redesigned as "What needs attention" view. No stats, no charts, no vanity metrics.
- **Greeting + date**: Time-of-day greeting with arborist's first name, today's date on the right.
- **Action cards**: 4 computed cards shown only when count > 0, ordered by urgency:
  1. "Properties need tree assessments" (amber) — properties with 0 trees → `/properties?filter=needs-trees`
  2. "Reports ready to generate" (blue) — trees entered, no report → `/properties?filter=ready-to-generate`
  3. "Reports ready to certify" (forest green) — draft/review status → `/properties?filter=ready-to-certify`
  4. "Reports awaiting payment" (neutral) — billing included, unpaid → `/properties?filter=awaiting-payment`
- **"All caught up"** empty state when all counts are 0 and properties exist. Centered CheckCircle2 + "New Property" button.
- **Recent activity feed**: Last 5 properties by `updatedAt`. Action description + address + city + relative timestamp. Tappable rows.
- **New Property button**: Desktop button at bottom. Mobile FAB (fixed bottom-right, forest green, `+` icon).
- **Properties page filters**: `?filter=` query param handled by `PropertiesList` via `initialDashboardFilter` prop. Shows filter banner with "Clear" button. Dashboard filters are: `needs-trees`, `ready-to-generate`, `ready-to-certify`, `awaiting-payment`.
- Old `DashboardContent` component removed. New component: `components/dashboard-view.tsx` (client). Server page: `app/(app)/dashboard/page.tsx` queries properties + billing in parallel.

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

## Properties List
- `components/properties-list.tsx` — client component with 5 status tabs: All, Needs Trees, In Progress, Ready, Certified.
- **Tab categories**: `needsTrees` (0 trees), `inProgress` (has trees, no report), `ready` (report in draft/review/amendment), `certified` (report certified). Each tab shows count. Active tab has forest green underline.
- **Dashboard filter mapping**: `?filter=` param from dashboard action cards maps to initial tab: `needs-trees` → Needs Trees, `ready-to-generate` → In Progress, `ready-to-certify` → Ready. `awaiting-payment` shown as secondary banner (doesn't map to a tab).
- **Legacy filter mapping**: `?status=` param from older links maps: `inProgress` → In Progress, `draft` → Ready, `certified` → Certified.
- **Permit filter**: `?permitStatus=` param shown as secondary banner with clear button.
- **Search**: Filters within active tab by address or city. No sort controls — fixed to most recent first.
- **Property cards**: 3-line layout — address + city, report type + tree count + status dot, relative timestamp + chevron. Delete button appears on hover (desktop).
- **Per-tab empty states**: Contextual messages per tab. "All" empty shows + New Property button.
- **Mobile FAB**: Fixed bottom-right forest green + icon for new property.
- **Removed**: Sort dropdown, city/type filter dropdowns, map pin icons, badge chips. Simplified from ~600 lines to ~340 lines.

## Smart Share Page
- Share page (`app/share/[token]/page.tsx`) is a public RSC — fetches property + latest report + arborist via share token.
- Document-like layout: `max-w-2xl` container for focused reading experience.
- **Branded header**: company logo, "CERTIFIED ARBORIST REPORT" label (or "DRAFT — PENDING CERTIFICATION"), property address, arborist name/ISA cert, certification date with green checkmark.
- **Client note**: arborist can write a personal note in the report page (certified view only) via `clientNote` field on Report model. Displayed at top of share page in forest-tinted card with "FROM YOUR ARBORIST" label.
- **Plain-language summary**: template-based stats (not AI) per report type — removal (removal/retention/protected counts), health (good/fair/needs attention), valuation (total appraised value parsed from `typeSpecificData`), construction (protection/removal counts). 2×2 stat grid with explanation paragraph.
- **Enhanced tree cards**: condition color dot, species common + scientific name, measurements row (DBH/height/spread in font-mono), condition in plain English, action text, protected badge with ShieldCheck icon.
- **City-specific "What Happens Next"**: powered by `lib/city-contacts.ts` for 21 jurisdictions. Handles 5 cases: no_permit (emerald card), regional (amber warning + standard steps), city/county (standard steps), unsupported city fallback, non-removal generic guidance.
- **PDF download**: contextual text per report type ("Submit this PDF with your permit application to [City] [Department]"). Full-width button on mobile.
- **Arborist contact card**: tap-to-call and tap-to-email buttons in forest-tinted style, website link.
- Not-certified state: shows only branded header (DRAFT badge), amber in-progress banner, tree count, arborist contact. Hides summary, tree details, next steps, PDF.

## Client Billing (Simple)
- **Invoice model removed** (Session 37). Standalone invoice system (model, API routes, PDF route, 5 arborist settings fields) deleted. Only share-page billing remains.
- Report model has 4 billing fields: `billingAmount` (Float?), `billingPaymentInstructions` (String?), `billingIncluded` (Boolean, default false), `billingPaidAt` (DateTime?).
- Arborist model has 3 billing settings: `showBillingOnShare` (Boolean, default false), `defaultReportFee` (Float?), `billingPaymentInstructions` (String?).
- NOT an invoicing product — just a "here's what you owe" section. No invoice numbers, no invoice PDFs, no payment processing.
- **Share Report dialog**: "Share with Client" button opens a dialog combining: client note textarea, billing toggle + fee + payment instructions. "Share & Copy Link" saves billing + note to report, creates share token, copies URL, closes dialog. Pre-fills billing from arborist defaults.
- **Inline billing status bar**: shown in certified content area when `billingIncluded && billingAmount > 0`. Shows amount + paid/awaiting status + Mark Paid / Undo button. Compact single-line bar, not a collapsible card.
- Share page: billing section after PDF download (when `billingIncluded && billingAmount > 0`). Receipt-style card with amount, paid status, payment instructions.
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
- **Coverage**: Peninsula (Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley + Redwood City, San Mateo, Los Altos, Los Altos Hills, Mountain View, Hillsborough, San Carlos, Burlingame, San Mateo County), North Bay (Sonoma County, Santa Rosa, City of Napa, Windsor, Healdsburg), Tahoe Basin (TRPA), Reno.
- `CityContact` interface: department, phone, email, address, hours, portalUrl, websiteUrl, submissionMethod, requiredDocuments[], typicalTimeline, applicationFee, mitigationSummary, tips[] (array, not string).
- **JurisdictionType** union: `"city"` | `"county"` | `"regional"` | `"no_permit"` — added to `CityContact` interface. Determines share page display logic.
- **Tahoe Basin**: TRPA is a bi-state regional authority that overrides local city/county for tree permits. `CITY_ALIASES` map resolves South Lake Tahoe, Incline Village, Tahoe City, Kings Beach, Stateline, Zephyr Cove, Tahoe Vista, Crystal Bay → "Tahoe Basin". Share page shows amber warning callout explaining TRPA is the sole permit authority.
- **Reno**: `no_permit` jurisdiction — no private-property tree removal permit required. Share page shows positive "good news" framing with emerald styling. Supports both `removal_permit` and `health_assessment` report types.
- `getCityContact(city, reportType?)` — resolves city aliases, then looks up by city and report type. Returns null if no contact info exists.
- `getNextStepsText(reportType)` — generic guidance for non-removal report types when no city-specific contact exists.
- **Title-case normalization**: `toTitleCase()` extracted to `lib/utils.ts` — shared between `lib/city-contacts.ts` and `lib/ordinances.ts`. Single source of truth for city name normalization.
- Share page "What Happens Next" section: handles 5 cases — no_permit (emerald card), regional (amber warning + standard steps), city/county (standard steps), unsupported city fallback, non-removal generic guidance. Tap-to-call phone links, tap-to-email links, office address with MapPin icon, office hours, portal URL as CTA button, tips as bulleted list, required documents checklist.
- Share page fallback for uncovered cities: 3-step generic guidance (contact city, get application, submit with PDF) instead of bare "contact your planning department" text.
- **VERIFY**: All North Bay, Reno, and expansion city contact info marked `// VERIFY` — phone confirmation needed before beta launch.
- **GAP**: No `MunicipalOrdinance` data seeded for North Bay, Tahoe, or Reno cities — `checkTreeProtection()` does not cover these regions yet. Future session needed to add ordinance data.
- All expansion city entries NEED VERIFICATION before GA — phone numbers, office hours, and thresholds are approximate. Marked with `// VERIFY` comments.
- Note: Redwood City measures circumference at 24" above grade (non-standard); San Carlos on 4/10 schedule (closed Fridays) — both surfaced in tips.
- **Permit Processing Timeline**: `PermitTimeline` and `PermitTimelineStage` interfaces in `lib/city-contacts.ts`. `getPermitTimeline(city)` returns city-specific stage data, never null (falls back to generic 4-stage timeline).
- Timeline data for 5 verified Peninsula cities: Palo Alto (5 stages, public notice for heritage), Menlo Park (4 stages, streamlined), Atherton (5 stages, Planning Commission), Woodside (4 stages), Portola Valley (5 stages, Conservation Committee). Generic fallback: 4 stages, 4-8 weeks.
- Share page renders a vertical timeline between `PermitStatusPipeline` and PDF download. Shows for `removal_permit` and `construction_encroachment` only. Status-aware styling: forest (completed), ring glow (active), red (denied), amber (revision). Dates calculated from `submittedAt + typicalDaysFromSubmission`. Disclaimer with city contact info at bottom.
- `computeTimelineProgress()` maps `permitStatus` to completed/active/terminal stage sets. `getStageDate()` returns actual dates for past stages, estimated dates for future stages. Both are inline helpers in the share page RSC.

## Sample Report (Onboarding & Showcase)
- Static ISA-quality content in `lib/sample-report-data.ts` — never AI-generated. 3-tree removal permit scenario (Coast Live Oak retain, Monterey Pine remove, Valley Oak heritage retain) at 1247 University Avenue, Palo Alto. Includes `certifier` object (Jane Rodriguez, WE-12345A, TRAQ Qualified, Peninsula Tree Consulting).
- API route: `app/api/sample-report/route.ts` — GET returns cached PDF, POST generates + caches per-arborist. `?showcase=true` generates with Jane Rodriguez identity (shared cache at `showcase.pdf`).
- `generateSamplePdfBuffer(arboristData)` extracted as shared function — used by both showcase and personalized modes. `SHOWCASE_ARBORIST` constant uses `SAMPLE_REPORT.certifier` data.
- Onboarding Step 2 renders inline HTML preview (not PDF iframe). "View sample PDF" link opens showcase PDF in new tab. Sidebar "Sample Report" link also opens showcase PDF.

## Analytics Events
- `AnalyticsEvent` model in `prisma/schema.prisma` — `id`, `arboristId?`, `eventType`, `metadata` (JSON string), `createdAt`. Indexed on arboristId, eventType, createdAt.
- Fire-and-forget helper: `logEvent()` in `lib/analytics.ts`. Never blocks the main request. Errors are caught and logged to console.
- Instrumented routes: property_created, tree_added, tree_saved, report_generated, report_edited (with editWordDelta), report_certified (with treeCount, minutesToCertify), pdf_downloaded (with source detection), share_link_opened (rate-limited to 1 per token per hour).

## Admin Dashboard
- Route: `app/(app)/admin/page.tsx` — server-rendered RSC, no client-side polling.
- Access gated by `ADMIN_ARBORIST_ID` env var (comma-separated IDs). Non-admin users redirected to `/dashboard`.
- Sections: 7-day + all-time summary stats (4 cards), per-arborist activity table (30d), report type distribution, AI edit rate (avg distance, heavy/minimal counts), share link performance (open rate, download rate), recent 50 events feed.
- Sidebar shows "Admin" link (Shield icon) only for admin users. `isAdmin` prop passed from `app/(app)/layout.tsx`.

## Per-Tree AI Regeneration
- POST `/api/ai/regenerate-tree-section` — regenerates one tree's narrative without touching the rest of the report. Body: `{ reportId, treeId, treeNumber }`. Returns `{ content: string }`.
- `parseReportSections()` and `replaceTreeSection()` in `lib/report-sections.ts` — split and reassemble report markdown by tree section (`### Tree #N` boundaries).
- Regenerate dropdown in the report editor toolbar lists all trees by number/species. Confirmation dialog warns edits to that section will be replaced.
- Per-tree regeneration uses the same prompt style as full generation but scoped to one tree. Not streaming (JSON response).

## Report Amendment Flow
- Certified reports can be amended via POST `/api/reports/[id]/amend` — reopens for editing, preserves share link and version history.
- `amendment_in_progress` status added to report status flow: `certified → amendment_in_progress → certified (amended)`.
- Schema fields on Report: `amendmentReason` (String?), `amendmentNumber` (Int, default 0), `originalCertifiedAt` (DateTime?).
- During amendment, share page shows the last certified version (based on `originalCertifiedAt`).
- Re-certification after amendment works through the normal certification flow. Version snapshot label: `"Amendment #N — Certified"`.
- Amended PDFs show amendment disclosure on cover page: original cert date, amendment date, reason.
- "Issue Amendment" button (amber) appears in the certified toolbar. Amendment dialog requires a reason.

## AI Writing Preferences
- Schema fields on Arborist: `aiTonePreference` (formal/conversational/technical), `aiPreferredTerms` (JSON array), `aiAvoidTerms` (JSON array), `aiStandardDisclaimer` (String), `aiCustomInstructions` (String).
- Settings page "Report Writing Style" card: tone radio, tag inputs for preferred/avoid terms (avoid capped at 20), disclaimer textarea, custom instructions textarea.
- `buildArboristStyleInstructions()` in `lib/ai-writing-preferences.ts` — builds prompt instructions from arborist preferences.
- Writing preferences applied to both full report generation and per-tree regeneration prompts.
- `aiStandardDisclaimer` is appended verbatim after AI generation (not sent to Claude) — ensures exact arborist text.

## Document Templates (Letter Library)
- `DocumentTemplate` model: id, arboristId, name, content (@db.Text), category, cityTag, reportTypeTag, usageCount, createdAt, updatedAt. Indexed on arboristId.
- API routes: `app/api/templates/route.ts` (GET all + POST create), `app/api/templates/[id]/route.ts` (PUT update/incrementUsage + DELETE).
- 3 default templates seeded on arborist creation in `app/api/arborist/onboard/route.ts`: Standard Limitations, Methodology Statement, Qualifications Summary. Defined in `lib/default-templates.ts`.
- Settings page: "Document Templates" card after "Report Writing Style". List view with category/city/type badges, edit/delete buttons. New/Edit modal with name, category select, city select (from `citiesServed`), report type select, content textarea.
- Report editor: "Templates" button in draft toolbar opens a Sheet panel. Templates split into "Suggested" (matching current city or report type) and "All Templates". Search filter. Insert at cursor position (or append). `usageCount` incremented on insert.
- Report editor: "Save as Template" button appears when text is selected in the textarea. Pre-fills content from selection, cityTag from property, reportTypeTag from report.
- AI context: `buildTemplateContext()` in `lib/ai-writing-preferences.ts` formats top 5 relevant templates into system prompt. Injected after `buildArboristStyleInstructions()` in `app/api/ai/generate-report/route.ts`. Templates filtered by city + report type match, ordered by usageCount desc.

## Real Estate Package
- `real_estate_package` report type bundles health assessment + CTLA valuation for real estate transactions. Generates a "Certified Tree Canopy Report."
- Report model has 7 RE listing fields: `reListingAddress`, `reRealtorName`, `reRealtorEmail`, `reRealtorPhone`, `reRealtorCompany`, `reListingPrice` (Float), `rePackageNotes`. All nullable.
- Shares CTLA valuation columns with `tree_valuation` on TreeRecord (valuationUnitPrice, valuationAppraisedValue, etc.) — NOT typeSpecificData JSON.
- Report page: violet-themed "Listing Information" card (certified view) for realtor contact and listing details. Saves via existing report PUT API.
- Share page: buyer-friendly experience with `isRealEstatePackage` routing flag (skips city contact/next-steps lookup). Prominent canopy value highlight (large forest-green number), compact tree cards with `<details>/<summary>` for expandable valuation breakdowns, "About This Report" section, realtor contact card before arborist card, listing price in header. `RE_ACTION_FRIENDLY` map provides positive action text (no "removal" language).
- PDF: "Certified Tree Canopy Report" title, prominent canopy total on cover page (36pt forest green), "Prepared For" shows realtor info instead of city planning, valuation summary section included, purpose defaults to "Real Estate Transaction."
- AI template in `lib/report-templates.ts`: buyer-friendly language, asset-oriented tone, 7 required sections (Introduction, Site Description, Executive Tree Summary, Individual Assessments, Canopy Valuation, Maintenance Outlook, Limitations). AI generation route adds RE-specific language overrides: avoid "hazard"/"failure"/"mitigation", use "asset"/"specimen"/"amenity", frame removals diplomatically.
- Dashboard: green `bg-forest/10` badge for RE properties, Home icon instead of MapPin on property rows.
- Icon: Home (lucide), color: violet. Appears in new property page, onboarding, and report type selectors.
- Tree side panel and property-map-view show CTLA valuation fields for `real_estate_package` (same as `tree_valuation`).

## Session 25 Hardening
- **Dual condition rating**: Valuation types (`tree_valuation`, `real_estate_package`) hide the standalone 1-5 condition picker. Condition auto-derives from CTLA geometric mean via `ctlaConditionTo15Scale()` in `lib/valuation.ts`. The derived 1-5 rating feeds into tree inventory dots, share page labels, and recommendation map lookups.
- **City contact aliases**: `CITY_ALIASES` in `lib/city-contacts.ts` maps "Napa" → "City Of Napa". Truckee is NOT aliased to Tahoe Basin (separate jurisdiction). Sonoma County tips include critical DBH threshold guidance.
- **Certification validation for valuation**: 5 blocking checks (appraised value, unit price, condition components, purpose, basis) and 3 advisory checks (low condition, low total, missing realtor). Reads from dedicated `TreeRecord` columns, not stale `typeSpecificData` JSON.
- **Limiting conditions (USPAP)**: `DEFAULT_LIMITING_CONDITIONS` in `lib/valuation.ts` — 6 standard CTLA/USPAP conditions. Stored per-arborist as `valuationLimitingConditions` JSON string. Rendered in PDF between valuation summary and signature block. Customizable in Settings > Valuation Defaults.
- **AI valuation narrative calibration**: Prompt includes CTLA percentage → language mapping (90+ = "excellent/exceptional", 70-89 = "good/sound", 50-69 = "moderate/declining", etc.).
- **Valuation share page**: Standalone `tree_valuation` gets "CERTIFIED TREE APPRAISAL" header, prominent total with CTLA attribution, expandable tree cards with appraised values, "About This Appraisal" section with purpose, formal download text. Routing flags: `isValuation`, `isValuationType` (combines RE + valuation).
- **Workflow accelerators**: `POST /api/properties/[id]/trees/apply-valuation-defaults` fills null valuation fields with defaults. "Copy from previous tree" button in tree side panel copies unit price + location ratings. Multi-trunk DBH calculator: `√(d₁² + d₂² + … + dₙ²)` inline in tree form for valuation types.
- **UX polish**: Observation library mobile arrow buttons (sm:hidden, replaces drag handle). Billing card positioned after arborist contact for RE/valuation types. Word export hidden for valuation types (formatting doesn't support valuation tables). "Email Realtor" mailto button on report page for RE. OG meta tags via `generateMetadata` on share page. Photo categories updated for tree_valuation (trunk_dbh required) and real_estate_package.

## Cleanup Session (Session 26)
- **Critical fix**: 4 broken tree save routes in `property-map-view.tsx` — `/api/trees/${id}` → `/api/properties/${property.id}/trees/${id}`. Tree pin moves and saves were silently 404ing.
- **Dead code removed**: `lib/city-submission-guides.ts` (159 lines, replaced by `lib/city-contacts.ts`) and `components/invoice-dialog.tsx` (621 lines, no imports).
- **Legacy photos field**: `TreeRecord.photos` annotated as DEPRECATED in schema, dead write removed from tree PUT route. All photo writes use `TreePhoto` model.
- **Error logging**: 11 silent catch blocks now log errors — 4 `console.error` for fetch failures (report usage, validation, usage stats, arborist settings), 7 `console.warn` for JSON parse fallbacks in settings (valuationLimitingConditions, reportDefaults, observations, commonSpecies, recommendationMap, aiPreferredTerms, aiAvoidTerms).
- **Noisy logging cleaned**: Removed API key prefix logging from transcribe route; audio blob logging gated behind `NODE_ENV === 'development'`.
- **Dormant invoice fields**: 5 Arborist invoice settings fields annotated as DORMANT in Prisma schema.

## UX Polish (Session 27)
- **Typography system**: All page titles standardized to `text-2xl font-semibold tracking-tight font-display text-foreground` across 6 pages (dashboard, properties, settings, ordinances, new property, admin).
- **Card foundation**: Base card shadow reduced from `shadow` to `shadow-sm` in `components/ui/card.tsx`. Card background CSS variable lightened (`--card: 40 15% 98%`).
- **Dashboard**: Redesigned in Session 36 — stat cards and pipeline replaced with action-oriented "Needs Attention" cards + recent activity feed.
- **Settings page**: All 12 card titles use `font-display` for Instrument Sans consistency. Loading spinner replaced with skeleton card layout matching settings structure.
- **Report editor**: Toolbar title `font-bold` → `font-semibold`. Certified view content area narrowed from `max-w-4xl` to `max-w-3xl` with more padding for document-like feel. Loading spinner replaced with toolbar skeleton. Report preview line-height increased to 1.7, shadow reduced.
- **Share page**: Header padding increased. Footer text changed from "Shared via" to "Powered by TreeCertify". Color tokens standardized.
- **Skeleton component**: `components/ui/skeleton.tsx` created (standard shadcn pattern with `bg-neutral-200/70`).
- **Skipped** (would take >30 min each): comprehensive button loading audit, page fade-in transitions, certification "sealed" visual treatment.

## Editor Preview / PDF Alignment (Session 30)
- **Typography alignment**: Report preview in `components/report-preview.tsx` now uses the same font stack as the PDF: Roboto body (`10.5pt`, `line-height: 1.55`, `color: #3A3A36`), Instrument Sans headings. All #2d5016 olive green replaced with #1D4E3E forest brand color.
- **Heading sizes**: H1 = `14pt`, 700 weight, `2.5px solid #1D4E3E` bottom border. H2 = `12pt`, 600 weight, `1px solid #e5e4df` bottom border. H3 = `10.5pt`, 600 weight, `color: #333`. All match PDF route exactly.
- **Table styling**: Header `background: #1D4E3E`, `font-size: 8.5pt`, `letter-spacing: 0.3px`. Cell borders: bottom-only `#e5e4df` (not all-sides). Alt-row shading `#FEFDFB`.
- **Inventory table**: Color-coded condition labels (Dead=gray, Critical=red, Poor=orange, Fair=amber, Good=lime, Excellent=green). Color-coded actions (retain=green, remove=red, monitor=amber, prune=blue). Unicode shield `🛡` with code reference for protected trees. Summary row with action counts + protected count. Legend line below table.
- **Photo thumbnails**: 80×80px thumbnails injected after each `### Tree #N` heading via `injectPhotoThumbnails()` regex post-processing. Max 4 shown with "+N more" overflow. Click opens `PhotoLightbox` component. Photos sourced from `TreePhoto` relation (included in property API).
- **Collapsible auto-generated sections**: `CollapsibleSection` component (inline, collapsed by default). Visual divider: "Auto-Generated Sections (included in final PDF)". Sections: Valuation Summary (tree_valuation/real_estate_package), Mitigation Requirements (removal_permit with protected removal trees), TRAQ Risk Assessment (when TRAQ data exists), Limiting Conditions (valuation types with arborist customization or defaults).
- **Certification box**: `2px solid #1D4E3E` border, `border-radius: 2px`, `background: #FBF9F6`. Full credential detail table with alternating rows: Name, ISA #, TRAQ qualification, additional certs, licenses, company, date.
- **Property API**: `GET /api/properties/[id]` now includes `treePhotos` relation on each tree (select: id, url, caption, category, sortOrder).
- **Files changed**: `components/report-preview.tsx` (complete rewrite), `app/(app)/properties/[id]/report/page.tsx` (ArboristInfo + TreeRecord interfaces, reportOptions prop), `app/api/properties/[id]/route.ts` (treePhotos include).

## Premium Details (Session 31)
- **PDF cover page: QR code** linking to share page when available. Uses `qrcode` npm package, renders as 80×80px image in cover footer with forest-green color (#1D4E3E). Only shown when `property.shareToken` exists. Caption: "Scan to view online report" in 7pt #888.
- **PDF filenames: smart naming pattern** (`TreeReport-Address-City-Date.pdf`). `buildSmartFilename()` helper in PDF route. Report type prefix varies: `TreeReport` (removal_permit), `HealthAssessment`, `TreeValuation`, `RealEstatePackage`, `ConstructionImpact`. Share page downloads prepend company name. Max 100 chars, date always preserved.
- **Certification: completion modal** with Share + Download actions. `showCertifyCompletion` state in report page. Shows BadgeCheck icon, ISA credential line, "Share with Client" (creates share link + copies to clipboard) and "Download PDF" buttons. Full-screen sheet on mobile, centered dialog on desktop. Only appears on the moment of certification, not on revisit.
- **Error states**: Branded "report link is no longer available" page for invalid share links (TreeCertify wordmark, contact arborist guidance). "This report is still being prepared" for uncertified share links. Amber error card with retry button for AI generation failures. Amber error bar (not red) with retry for save failures.
- **TOC: cleaned up** — removed TODO comment about two-pass rendering. TOC section titles now use Instrument Sans font. Dot leaders hidden. Clean section list with descriptions.
- **Terminology: standardized** to Assessment/Report/Property/Certified/Submitted/Property Owner. Changes: status badge "Filed" → "Submitted", report-types.ts "evaluation" → "assessment", share page RE action text, AI prompt instructions ("field inspection" → "field assessment", "evaluation" → "assessment" in mock text and prompt instructions), amend route error message.

## City Submission Checklist (Session 32)
- **Jurisdiction-specific submission requirements** shown before marking a report as submitted. Intercepts "Mark as Submitted" flow for `removal_permit` and `construction_encroachment` report types.
- **Data layer**: `lib/city-submission-requirements.ts` — structured checklist configs for 14 Peninsula cities (5 verified with city-specific requirements, 9 expansion with common requirements). Types: `SubmissionRequirement` (id, label, description, category, autoCheckId, required) and `CitySubmissionConfig` (cityName, isVerified, submissionMethod, submissionNotes, typicalProcessingTime, requirements).
- **Auto-verification** for: certification status (`report.status === 'certified'`), photo documentation (every tree has ≥1 photo). Failed auto-checks show amber warnings with specific tree numbers missing photos.
- **Checklist dialog**: `components/submission-checklist-dialog.tsx` — full-screen sheet on mobile, centered card on desktop. Groups requirements by category (Documents, Forms, Fees, Site Requirements, Notifications). Auto-verified items show green CheckCircle2 with "Auto-verified" label. Required items must all be checked before "Confirm Submission" is enabled. "Save Progress" persists partial checklist without changing status.
- **Submission info section**: City contact details (department, address, phone, email), submission method, typical processing time, and submission notes — all pulled from `lib/city-contacts.ts`.
- **Checklist state persisted** on Report model as `submissionChecklist` (JSON string). Stores checkedItems, autoCheckedItems, submittedTo, isGeneric, completedAt. Viewable post-submission as collapsible `<details>` summary below permit pipeline showing "{n}/{total} verified".
- **Fallback for unknown cities**: Generic checklist with common requirements (certified report, application form, site plan, photos, fee, owner authorization) + amber note to confirm with city directly. Shows whatever contact info is available from `getCityContact()`.
- **PermitStatusPipeline**: New `onSubmitClick?` prop — when provided, "Mark as Submitted" button calls it instead of expanding inline form. Only used for removal_permit and construction_encroachment types; other report types keep inline flow.
- **City-specific details**: Palo Alto (TLTM worksheet, ~$507 fee, neighbor notification), Menlo Park (mitigation plan, TPZ plan), Atherton (Tree Protection & Preservation Plan, Planning Commission for heritage oaks, quarterly inspections), Woodside (orange ribbon photos, proximity sketch), Portola Valley (Site Development Permit, Conservation Committee review).
- Schema: `Report.submissionChecklist String?`. API: `PUT /api/reports/[id]` accepts `submissionChecklist`.

## Quick Review Mode (Session 33)
- Mobile-optimized read-and-certify flow for reviewing AI-generated reports from a phone. Eliminates the biggest certification drop-off by letting arborists review and certify in their truck after a field visit.
- **Component**: `components/quick-review.tsx` — full-screen mobile experience with sticky header (back, address, status badge, 3-dot menu), scrollable report content parsed into sections, tree inventory cards, and sticky bottom action bar.
- **Section flagging**: Each report section (split by `## ` headings) has a "Flag this section" button. Arborist can add a note describing what needs to change. Flagged sections show amber left border + flag note. Flags stored as `ReviewFlag[]` (sectionId, sectionTitle, note, createdAt).
- **Bottom action bar** (three states): No flags → "Certify Report" (forest green). Has flags → "Send Back for Revision (N flags)" (amber) + "Certify anyway" link. Certified → "Share with Client" + Download button.
- **"Send Back for Revision"**: Saves flags to `Report.reviewFlags` JSON field and sets status to `"review"`. In the full editor, an amber banner shows "N sections flagged for revision" with section names and a "Clear flags" button.
- **Report page integration**: `viewMode` is `"editor" | "preview" | "quickReview"` (Session 40 replaced split editor with section-based editor). Quick Review button added to view mode toggle (visible on all screen sizes, but the only visible option on mobile since Editor/Preview are `hidden sm:flex`). Certified reports also get a Quick Review button in the toolbar. Auto-opens via `?view=quickReview` query parameter.
- **Dashboard integration**: "Ready to certify" action card links to `/properties?filter=ready-to-certify` where arborists can open Quick Review for any draft report.
- Schema: `Report.reviewFlags String?` — JSON array of `ReviewFlag` objects. API: `PUT /api/reports/[id]` accepts `reviewFlags`.

## Performance Optimization (Session 34)
- **Database indexes**: 12 `@@index` directives added across 8 models (Property, TreeRecord, TreePhoto, TreeAudioNote, PropertyAudioNote, Report, ReportVersion, Invoice) covering all foreign key fields used in WHERE clauses. Pushed via `prisma db push`.
- **Dashboard query consolidation**: Eliminated duplicate `recentActivity` query (was fetching same properties twice). Moved billing + weekly tree counts into single `Promise.all` with 5 parallel queries (was 3 sequential groups). Replaced 8+ `Array.filter()` passes with single for-loop computing all stats in one pass. Activity feed derived from `allProperties.slice(0, 5)` instead of separate query.
- **Share page deduplication**: `generateMetadata()` and page component both called `prisma.property.findUnique`. Wrapped in React `cache()` to deduplicate within the same request.
- **Property detail optimization**: Removed `arborist: true` include (data fetched client-side via `/api/arborist/profile`). Added `select` clause to reports include to reduce over-fetching.
- **Ordinance caching**: `getOrdinanceByCity()` in `lib/ordinances.ts` now uses in-memory `Map` cache with 1-hour TTL. Null results also cached to avoid repeated lookups for unsupported cities.
- **Loading skeletons**: Added `loading.tsx` for 4 routes (dashboard, properties, properties/[id], settings). Uses `Skeleton` component from `components/ui/skeleton.tsx`. Previously zero loading files — users saw blank screens during server rendering.
- **Bundle sizes (post-optimization)**: Dashboard 2.72 kB (103 kB first load), Properties 6.86 kB (129 kB), Property detail 49.2 kB (199 kB), Report 54 kB (198 kB), Settings 29.8 kB (133 kB), Share 3.71 kB (103 kB). Shared chunks 87.9 kB.
- **Remaining bottlenecks (not addressed)**: Property detail/report pages are ~200 kB first load — driven by Google Maps + rich editor bundles, already dynamically imported. No further easy wins without feature removal.

## Onboarding Rewrite (Session 35)
- **Redesigned first-run experience**: 3-step flow targeting <3 minutes to first "aha" moment. Step 1 (Your Info): 3 fields only (name, ISA cert#, service area). Step 2 (See It In Action): inline sample report preview + callout cards. Step 3 (First Assessment): create property or skip.
- **Schema**: Added `hasCompletedOnboarding Boolean @default(false)` to Arborist model. Layout guard checks this field (not just arborist existence).
- **Sample report fixture**: Rewrote `lib/sample-report-data.ts` with 3-tree removal permit at 1247 University Avenue, Palo Alto (Coast Live Oak retain, Monterey Pine remove, Valley Oak heritage retain). Added `certifier` object for showcase identity.
- **Showcase PDF**: `app/api/sample-report/route.ts` refactored with `generateSamplePdfBuffer(arboristData)` shared function. `?showcase=true` uses Jane Rodriguez identity. Sidebar and mobile nav link to showcase PDF.
- **Contextual hints**: `components/onboarding-hint.tsx` — dismissable banners stored in `localStorage`. Placed on: first tree placement (assessment page), first report generation (report page), share link popover.
- **Migration**: `scripts/migrate-onboarding.ts` sets `hasCompletedOnboarding = true` for existing arborists (by onboardingStep ≥ 3 OR having properties).
- **Build fixes**: Added `isaExpirationDate` default (1 year out) for new arborist creation. Fixed `Buffer` → `Uint8Array` type conversion in sample report API.

---

## UX Polish (Session 39)
- **Tree tagging layout**: Map min-height increased from 400px to `calc(65vh - 48px)` for better field visibility. Container gap reduced. Redundant tree count badge removed from map overlay.
- **Smart Dictation removed from UI**: Inline SmartDictation, floating FAB button, and dictation modal all removed from tree-side-panel. Component code preserved in `components/smart-dictation.tsx`.
- **Collapsible sections**: `CollapsibleSection` component (`components/ui/collapsible-section.tsx`) wraps Health Observations, Structural Observations, TRAQ Risk Assessment, and Maintenance Recommendations. Badge shows item count or risk rating. Auto-opens when data exists. Multiple open simultaneously.
- **TRAQ Target Description**: VoiceInput mic button added for field dictation.
- **Estimated Maintenance Cost**: Removed from UI (DB field `estimatedMaintenanceCost` preserved on HealthAssessmentData).
- **Report generation UX**: Centered max-w-lg card with forest green brand colors. h-12 generate button. Timed progress messages in streaming modal (Connecting → Analyzing → Writing → Drafting → Finalizing). 90-second AbortController timeout. SSE resilience: `receivedDone` tracking, server-saved report recovery, version snapshot fire-and-forget.

## Current Status (as of Session 40, 2026-03-12)

### What's Built and Working
- **Full assessment workflow**: Property → trees → AI report → certification → PDF → share
- **5 report types**: removal_permit, health_assessment, tree_valuation, real_estate_package, construction_encroachment
- **21 jurisdictions**: Ordinance database with species-specific thresholds (5 verified Peninsula, 9 expansion Peninsula, 7 North Bay/Tahoe/Reno)
- **Google Maps integration**: Satellite imagery for property-level tree assessment, color-coded condition pins, static maps for PDF/share
- **Section-based report editor**: Click-to-edit sections with per-section AI rewrite (instruction-based)
- **AI report generation**: Claude-powered narrative with ISA-quality prose, voice dictation, per-tree regeneration, per-section rewrite
- **CTLA valuation**: Full Trunk Formula Technique engine with 100+ species ratings
- **Mobile field mode**: Full-screen assessment flow with haptic feedback, camera integration
- **PDF output**: Professional Puppeteer-rendered PDFs with cover page, TOC, QR code, photo documentation
- **Share page**: Homeowner-friendly public view with permit timeline, next steps, city contacts
- **Onboarding**: 3-step flow (credentials → sample report preview → first property)
- **Settings**: 12+ customization cards (observations, species, valuation, writing style, PDF preferences)
- **Admin dashboard**: Analytics, per-arborist activity, usage stats

### Known Issues / Gaps
- **`.next` cache corruption**: OneDrive symlink conflicts cause `EINVAL: readlink` errors on build. Fix: `rm -rf .next` before `npm run build`. Not a code bug.
- **North Bay/Tahoe/Reno contacts UNVERIFIED**: All phone numbers, office hours, and fee amounts marked `// VERIFY` in `lib/city-contacts.ts`. DO NOT rely on these for production.
- **City of Napa**: Only ~7 of 14 protected species confirmed with specific thresholds. Full species list incomplete.
- **No MunicipalOrdinance data** for North Bay, Tahoe, or Reno in database — `checkTreeProtection()` returns "protection status unknown" for these cities. Ordinance data only in `lib/city-contacts.ts` (share page), not in `prisma/seed.ts` (protection checker).
- **TreeRecord.photos field DEPRECATED**: Legacy JSON string field still in schema. All writes use TreePhoto model. Safe to drop column.
- **`lib/city-submission-guides.ts` still exists**: 159 lines, not imported anywhere. Replaced by `lib/city-contacts.ts`. Safe to delete.
- **Largest page bundles**: property detail (200 kB first load) and report editor (199 kB first load) — driven by Google Maps + rich editor. Already dynamically imported; no easy wins without feature removal.

### Architecture Decisions
- **Prisma `db push`** (not migrations) for schema changes — project uses Neon PostgreSQL
- **JSON strings** for complex data (observations, billing line items, report defaults, etc.) rather than separate tables — trade-off: simpler schema, harder to query
- **Static sample data** in `lib/sample-report-data.ts` — never AI-generated, ensures consistent quality
- **`hasCompletedOnboarding` boolean** gates app access (not just arborist record existence) — allows incomplete onboarding resume
- **Showcase PDF** shared globally (not per-arborist) via `SHOWCASE_ARBORIST` constant — avoids Puppeteer overhead per visitor
- **localStorage** for contextual hints (not database) — no API calls, survives page refreshes, no data needed server-side

### File Structure Summary
| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/(app)/` | Protected pages (dashboard, properties, settings, admin) | 10 page files + 4 loading skeletons |
| `app/api/` | 40+ API routes | AI generation, CRUD, PDF, auth, feedback |
| `app/onboarding/` | First-run experience | `page.tsx` (3-step flow) |
| `app/share/[token]/` | Public homeowner view | `page.tsx` (RSC) |
| `components/` | 59 components | UI primitives (shadcn), business components, type-specific fields |
| `lib/` | Business logic | Ordinances, valuation, report templates, city contacts, analytics |
| `prisma/` | Database | `schema.prisma` (13 models), `seed.ts` (21 cities) |
| `scripts/` | Utilities | `smoke-test.ts`, `test-ordinances.ts`, `migrate-onboarding.ts` |

### Environment Variables
```
DATABASE_URL                          # PostgreSQL (Neon)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY       # Google Maps JS + Static + Geocoding
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID        # Google Maps Map ID (optional, for AdvancedMarkerElement)
OPENAI_API_KEY                        # Whisper transcription
ANTHROPIC_API_KEY                     # Claude report generation
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY     # Clerk auth (public)
CLERK_SECRET_KEY                      # Clerk auth (server)
ADMIN_ARBORIST_ID                     # Comma-separated admin IDs
```

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
