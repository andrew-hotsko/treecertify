# TreeCertify — Existing Feature Inventory (March 2026)
# Paste this into any new session to prevent overlap with existing work.

## CRITICAL: These features are FULLY BUILT. Do NOT re-implement or duplicate them.

### Tech Stack
- Next.js 14 App Router, React 18, Prisma (PostgreSQL via Neon), Clerk auth, Tailwind CSS, shadcn/ui (Radix)
- Anthropic Claude SDK (AI report generation, streaming SSE), OpenAI Whisper (voice transcription)
- Puppeteer (PDF), Mapbox GL (maps), docx (Word export), fabric.js (photo annotation), html2canvas (feedback screenshots)
- Zod validation, react-hook-form, lucide-react icons

### Brand (DO NOT CHANGE)
- Colors: Forest #1D4E3E (primary), #2A6B55 (hover), #3D7D68 (accents). Warm neutral scale. NO dark mode.
- Fonts: Instrument Sans (headings), Roboto (body/UI), IBM Plex Mono (data/measurements)
- Condition dot colors (emerald-500, gray-400/700, etc.) are DATA VISUALIZATION — never change to brand colors.

---

## DATABASE MODELS (11 models in Prisma)

### Arborist
- Profile: name, email, ISA cert number + expiration, company branding (logo, address, phone, email, website), signature name, TRAQ cert, additional certs (JSON array), profile photo
- Onboarding: `onboardingStep` (0=not started, 1=credentials, 2=branding, 3=complete)
- Invoice settings (5 fields — DORMANT, no UI)
- Client billing settings: showBillingOnShare, defaultReportFee, billingPaymentInstructions

### Property
- Address/city/state/zip/county, parcel number, lat/lng, lot size
- Homeowner contact (name/email/phone)
- `reportType`: health_assessment | removal_permit | construction_encroachment | tree_valuation
- Construction fields: projectDescription, permitNumber, developerName, architectName
- Site fields: siteObservations, scopeOfAssignment, neededByDate
- `shareToken` (unique, for public share page)
- status: active | archived

### TreeRecord
- Per property, auto-increment `treeNumber`, pin lat/lng, tagNumber
- Species (common + scientific), DBH, height, canopy spread
- `conditionRating` (1-5), healthNotes, structuralNotes
- Notes use "Observed: X, Y\n\n{free text}" format for ISA checkbox observations
- isProtected, protectionReason, recommendedAction (retain/remove/prune/monitor), mitigationRequired
- `typeSpecificData` (JSON — TRAQ risk, valuation, TPZ/SRZ per report type)

### TreePhoto
- Per tree: filename, url, caption, sortOrder
- Annotation: originalFilename, originalUrl, isAnnotated
- Category: full_tree, defect_detail, root_collar, etc.
- EXIF: exifLat, exifLng, exifTakenAt

### TreeAudioNote / PropertyAudioNote
- Audio upload with raw + cleaned transcription, duration, status

### MunicipalOrdinance
- 5 Peninsula cities: Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley
- Per-species DBH thresholds (JSON array), default native/non-native thresholds
- Mitigation rules (JSON), heritage tree rules (JSON), code reference, ordinance URL

### Report
- Per property+arborist, reportType
- `aiDraftContent` (markdown from Claude), `finalContent` (edited markdown)
- citySections (JSON), reportOptions (JSON — includeTraq, includeCoverLetter, etc.)
- eSignatureText, certifiedAt, pdfUrl
- `clientNote` (shown on share page)
- 5 billing fields: billingAmount, billingLineItems (JSON), billingPaymentInstructions, billingIncluded (bool), billingPaidAt
- 9 permit fields: permitStatus (submitted/under_review/approved/denied/revision_requested), submittedAt, submittedTo, reviewerName, reviewerNotes, conditionsOfApproval, denialReason, approvedAt, permitExpiresAt
- status: draft | review | certified | filed

### ReportVersion
- Full markdown snapshots: "AI Draft", "Edit", "Pre-certification"
- Cascades on report delete

### ApiUsageLog — Anthropic/OpenAI token + cost tracking
### Feedback — In-app bug/suggestion/question with auto-screenshot
### Invoice — DORMANT (schema + API routes exist, NO UI)

---

## ALL PAGES (11 routes)

| Route | What It Does |
|-------|-------------|
| `/` | Landing/login redirect |
| `/onboarding` | 3-step: credentials → branding (live cover preview) → first property |
| `/(app)/dashboard` | Stats, welcome states, permit pipeline cards (clickable → filter), outstanding payments |
| `/(app)/properties` | Property list with permit status filtering |
| `/(app)/properties/new` | Create property with city validation + auto scope |
| `/(app)/properties/[id]` | Interactive Mapbox map, tree pins, tree side panel (desktop) / mobile field mode, site info |
| `/(app)/properties/[id]/report` | AI generation (SSE streaming), markdown editor, certification ceremony, version history, permit tracking, client note, billing |
| `/(app)/settings` | Profile, company branding, billing settings |
| `/(app)/ordinances` | Municipal ordinance reference for 5 cities |
| `/share/[token]` | PUBLIC client share page (no auth) |

---

## ALL API ROUTES (39 total)

**AI:** POST /api/ai/generate-report (Claude SSE streaming, prompt v2.1)
**Audio:** POST /api/audio/transcribe (Whisper), POST /api/audio/parse (Claude field extraction)
**Arborist:** profile GET/PUT, logo POST, photo POST, onboard POST/PATCH, usage GET
**Properties:** CRUD, share token, trees CRUD (nested under property), tree photos CRUD + annotate + reorder, tree audio, property audio, tree export
**Reports:** CRUD, certify POST, pdf GET (Puppeteer), word POST, validate POST, versions GET, usage GET
**Ordinances:** GET list, POST check
**Other:** geocode POST, feedback POST + screenshot POST, uploads serving, invoices CRUD + PDF (dormant)
**Public routes:** /share/*, /api/uploads/*, /api/reports/*/pdf (with token), /api/invoices/*/pdf

---

## FULLY BUILT FEATURES — DO NOT REBUILD

### 1. AI Report Generation
- Claude prompt v2.1 in `lib/report-templates.ts`
- MASTER_VOICE_INSTRUCTIONS transforms raw dictation → professional ISA language
- 4 report types with versioned systemInstructions
- Streaming SSE to report editor
- Standards: ISA BMP, ISA TRAQ, ANSI A300, CTLA Trunk Formula (10th Ed), ANSI A300 Part 5
- Mock fallback (no API key) uses "No concerns noted" — never fabricates
- Excluded from AI: "Tree Inventory" and "Arborist Certification Statement" (PDF template handles)

### 2. Certification Ceremony
- Multi-step dialog: validation → e-signature → confirm
- Server-side validation blocks if any check has status "fail"
- Creates "Pre-certification" version snapshot
- `lib/report-validation.ts` — blocking (fail) + advisory (warning) checks

### 3. PDF Generation (Puppeteer)
- Cover page: logo (base64), company info, "Prepared For", credentials
- TOC page after cover
- Running headers (pages 2+), "Page X of Y" footer
- Tree inventory table: alternating rows, shield icon for protected trees + code reference, summary row
- Photo documentation: 2-column grid by tree, max 4/page, captions + EXIF dates
- Site map: Mapbox Static Images API with condition-colored pins
- Limitations section in gray box
- Signature block: Dancing Script e-signature when certified
- photoToBase64() with "Photo unavailable" fallback

### 4. Word Export — docx library, markdown → .docx

### 5. Report Versioning
- ReportVersion snapshots: "AI Draft", "Edit", "Pre-certification"
- Version history sheet with preview + restore (creates new "Edit" version on restore)

### 6. Permit Lifecycle Tracking
- 5 statuses: submitted → under_review → approved/denied/revision_requested
- PermitStatusPipeline component: interactive (arborist) + readonly (homeowner) modes
- Dashboard pipeline cards (clickable → filter properties)
- Report page shows pipeline after certification with status advancement forms

### 7. Client Share Page (app/share/[token]/page.tsx)
- Public RSC, document-like layout (max-w-2xl)
- Branded header with cert status badge
- Client note card ("FROM YOUR ARBORIST")
- Template-based plain-language summary (NOT AI) — stats per report type
- Enhanced tree cards: condition dot, species, measurements (font-mono), action text, protected badge
- City-specific "What Happens Next" — static guides for 5 cities, 4-step flow, department contacts (phone/email/address/hours/portal)
- PDF download with contextual per-report-type text
- Arborist contact: tap-to-call, tap-to-email
- Uncertified: shows DRAFT badge + in-progress banner, hides details

### 8. Client Billing (Simple — NOT invoicing)
- Per-report: billingAmount, line items, payment instructions, billingIncluded toggle, paidAt
- Two-gate visibility: arborist-level showBillingOnShare + per-report billingIncluded
- Report page: collapsible billing card, "Mark as Paid"
- Share page: receipt-style card (when included + amount > 0)
- Dashboard: outstanding payments counter
- Settings: default fee, payment instructions, share toggle

### 9. Observation Checkboxes
- 12 health + 12 structural ISA-standard observations (checkbox grids)
- "No significant concerns" exclusive toggle
- Stored in healthNotes/structuralNotes: "Observed: X, Y\n\n{free text}" prefix
- Shared helpers in `lib/observation-helpers.ts`
- PDF TRAQ appendix: formatNotesForTRAQ() strips prefix

### 10. Photo Documentation
- Per-report-type category checklists (`lib/photo-categories.ts`)
- EXIF extraction (GPS + date) via exif-parser on upload
- Category picker pills, "Full tree" required for all types
- Photo annotation editor (fabric.js)
- Drag reorder
- Validation warning for missing "Full tree" category

### 11. Voice Input / Dictation
- Inline mic button: raw Whisper transcription (no Claude)
- Also on Site Information fields (Scope, Site Observations)
- Smart Dictation modal: Claude field extraction + ISA terminology matching
- Red pulsing recording state with elapsed timer
- Requires OPENAI_API_KEY (shows toast if missing)

### 12. Mobile Field Mode
- Full-screen single-scroll (viewport < 768px) — replaces TreeSidePanel
- 5 sections: Species, Measurements, Condition, Observations, Action & Photos
- Progress dots (IntersectionObserver), tappable jump nav
- "Save & Next Tree" continuous flow
- 44px touch targets, inputMode="decimal", haptic feedback
- Back camera via capture="environment"
- Ordinance protection banner auto-shows on species + DBH entry

### 13. Interactive Map
- Mapbox GL with tree pins (condition-colored), pin placement mode
- Map snapshot in PDF via Static Images API

### 14. Municipal Ordinances
- 5 cities seeded in `prisma/seed.ts`
- `checkTreeProtection()`: species-specific thresholds → default native/non-native fallback
- Heritage check separate
- Case-insensitive city matching (title case normalization)

### 15. Onboarding (3-step)
- Step 1: Professional credentials
- Step 2: Company branding with live cover page preview
- Step 3: First property walkthrough with supported city validation
- onboardingStep tracking on Arborist model

### 16. Dashboard
- Welcome states: no_properties → no_trees → no_reports → normal (WelcomeCard with CTA)
- Stat cards, permit pipeline (clickable), outstanding payments

### 17. In-App Feedback
- Floating FAB (bottom-right), dialog: bug/suggestion/question
- Auto-screenshot via html2canvas, context capture (pageUrl, userAgent, viewport)

### 18. City Submission Contacts
- `lib/city-contacts.ts`: department, phone, email, address, hours, portal, required docs, timeline, tips
- getCityContact(city, reportType?) — removal_permit only
- getNextStepsText(reportType) — generic for other types

### 19. Species Search — Autocomplete for 70+ Peninsula species (common + scientific)

### 20. Deletion Cascades
- Property DELETE: transaction deletes ReportVersions + Reports, then Property (cascades children)
- Report DELETE: keeps trees, versions cascade automatically
- Tree DELETE: API path includes property ID, numbers NOT renumbered

### 21. Error Handling (Pre-Beta)
- PDF/Word: fetch-then-download with error toast
- All major actions: toast on failure
- Smoke test: `scripts/smoke-test.ts`

### 22. Offline Support
- Client-side request queue (localStorage) with dedup (last-write-wins for PUT)
- Connectivity indicator component

---

## KEY LIB FILES

| File | What It Does |
|------|-------------|
| `lib/report-templates.ts` | Prompt v2.1, MASTER_VOICE_INSTRUCTIONS, per-type system instructions |
| `lib/report-validation.ts` | validateReportForCertification() — blocking + advisory checks |
| `lib/ordinances.ts` | getOrdinanceByCity(), checkTreeProtection() |
| `lib/report-types.ts` | Type interfaces, CTLA formulas (calcAppraisedValue, calcTrunkArea, calcTpzRadius, calcSrzRadius), TRAQ risk calc, RISK_FACTORS, MAINTENANCE_ITEMS, PROTECTION_MEASURES |
| `lib/observation-helpers.ts` | ISA checklists (12 health + 12 structural), parse/build helpers, ACTION_OPTIONS, CONDITION_LABELS |
| `lib/photo-categories.ts` | Per-report-type photo checklists, autoCaptionFromCategory() |
| `lib/species.ts` | PENINSULA_SPECIES[] (70+ trees, native/non-native, common on peninsula flag) |
| `lib/city-contacts.ts` | CityContact for 5 cities, getCityContact(), getNextStepsText() |
| `lib/api-usage.ts` | Pricing constants, estimateAnthropicCost(), estimateWhisperCost(), logApiUsage() |
| `lib/auth.ts` | getCurrentArborist(), requireArborist() (Clerk) |
| `lib/uploads.ts` | File management, allowed types, size limits |
| `lib/markdown.ts` | renderMarkdownToHtml() |
| `lib/markdown-to-docx.ts` | Markdown → DOCX |
| `lib/api-queue.ts` | Offline request queue (localStorage) |
| `lib/db.ts` | Prisma singleton |

---

## ARCHITECTURE CONSTRAINTS

1. All /(app)/ routes are Clerk-protected via middleware
2. City names MUST be title case on storage, matched case-insensitively
3. Scope of Assignment auto-generates per report type (server + client)
4. Photos stored in uploads/ dir, served via /api/uploads/[...path]
5. `photos` field on TreeRecord is DEPRECATED — use `treePhotos` relation
6. Invoice infrastructure exists but has NO UI (dormant)
7. `lib/city-submission-guides.ts` is legacy/unused (replaced by city-contacts.ts)
8. Woodside species DBH thresholds + some replanting ratios are UNVERIFIED
