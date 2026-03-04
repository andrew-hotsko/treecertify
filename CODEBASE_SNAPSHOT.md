# TreeCertify — Codebase Snapshot

**Date:** March 3, 2026

## Directory Tree

```
treecertify/
├── app/
│   ├── (app)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── ordinances/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── report/
│   │   │   │       └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── api/
│   │   ├── ai/
│   │   │   └── generate-report/
│   │   │       └── route.ts
│   │   ├── arborist/
│   │   │   ├── logo/
│   │   │   │   └── route.ts
│   │   │   ├── onboard/
│   │   │   │   └── route.ts
│   │   │   ├── photo/
│   │   │   │   └── route.ts
│   │   │   ├── profile/
│   │   │   │   └── route.ts
│   │   │   └── usage/
│   │   │       └── route.ts
│   │   ├── audio/
│   │   │   ├── parse/
│   │   │   │   └── route.ts
│   │   │   └── transcribe/
│   │   │       └── route.ts
│   │   ├── geocode/
│   │   │   └── route.ts
│   │   ├── ordinances/
│   │   │   ├── check/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── properties/
│   │   │   ├── [id]/
│   │   │   │   ├── audio/
│   │   │   │   │   ├── [audioId]/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   └── transcribe/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── share/
│   │   │   │   │   └── route.ts
│   │   │   │   └── trees/
│   │   │   │       ├── [treeId]/
│   │   │   │       │   ├── audio/
│   │   │   │       │   │   ├── [audioId]/
│   │   │   │       │   │   │   ├── route.ts
│   │   │   │       │   │   │   └── transcribe/
│   │   │   │       │   │   │       └── route.ts
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── photos/
│   │   │   │       │   │   ├── [photoId]/
│   │   │   │       │   │   │   ├── annotate/
│   │   │   │       │   │   │   │   └── route.ts
│   │   │   │       │   │   │   └── route.ts
│   │   │   │       │   │   ├── reorder/
│   │   │   │       │   │   │   └── route.ts
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── route.ts
│   │   │   │       ├── export/
│   │   │   │       │   └── route.ts
│   │   │   │       └── route.ts
│   │   │   └── route.ts
│   │   ├── reports/
│   │   │   ├── [id]/
│   │   │   │   ├── certify/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── pdf/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── route.ts
│   │   │   │   ├── validate/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── versions/
│   │   │   │   │   └── route.ts
│   │   │   │   └── word/
│   │   │   │       └── route.ts
│   │   │   ├── route.ts
│   │   │   └── usage/
│   │   │       └── route.ts
│   │   └── uploads/
│   │       └── [...path]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── onboarding/
│   │   └── page.tsx
│   ├── page.tsx
│   └── share/
│       └── [token]/
│           └── page.tsx
├── components/
│   ├── app-providers.tsx
│   ├── condition-rating.tsx
│   ├── connectivity-indicator.tsx
│   ├── dashboard-content.tsx
│   ├── mobile-nav.tsx
│   ├── permit-status-pipeline.tsx
│   ├── photo-markup-editor.tsx
│   ├── properties-list.tsx
│   ├── property-audio-notes.tsx
│   ├── property-map-view.tsx
│   ├── property-map.tsx
│   ├── report-preview.tsx
│   ├── sidebar.tsx
│   ├── smart-dictation.tsx
│   ├── species-search.tsx
│   ├── status-badge.tsx
│   ├── tree-audio-notes.tsx
│   ├── tree-photos.tsx
│   ├── tree-side-panel.tsx
│   ├── tree-summary-panel.tsx
│   ├── type-fields/
│   │   ├── construction-encroachment-fields.tsx
│   │   ├── health-assessment-fields.tsx
│   │   ├── removal-permit-fields.tsx
│   │   └── tree-valuation-fields.tsx
│   ├── ui/
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button-selector.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── multi-checkbox.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   └── voice-input.tsx
├── hooks/
│   ├── use-audio-recorder.ts
│   └── use-toast.ts
├── lib/
│   ├── api-queue.ts
│   ├── api-usage.ts
│   ├── auth.ts
│   ├── connectivity.tsx
│   ├── db.ts
│   ├── markdown-to-docx.ts
│   ├── markdown.ts
│   ├── ordinances.ts
│   ├── photo-categories.ts
│   ├── photo-queue.ts
│   ├── report-templates.ts
│   ├── report-types.ts
│   ├── report-validation.ts
│   ├── species.ts
│   ├── uploads.ts
│   └── utils.ts
├── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── scripts/
│   └── test-ordinances.ts
├── types/
│   └── mapbox.d.ts
├── .env.example
├── .eslintrc.json
├── .gitignore
├── CLAUDE.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Source Files

### CLAUDE.md

```markdown
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

## Session Completion
- When all tasks are complete, always end with **SESSION COMPLETE** in bold, followed by a numbered list of what was done and what was changed.
```

### package.json

```json
{
  "name": "treecertify",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "npx tsx prisma/seed.ts"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.78.0",
    "@clerk/nextjs": "^6.39.0",
    "@hookform/resolvers": "^5.2.2",
    "@prisma/client": "^5.22.0",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-pdf/renderer": "^4.3.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "docx": "^9.6.0",
    "exif-parser": "^0.1.12",
    "fabric": "^7.2.0",
    "lucide-react": "^0.575.0",
    "mapbox-gl": "^3.19.0",
    "next": "14.2.35",
    "openai": "^6.25.0",
    "prisma": "^5.22.0",
    "puppeteer": "^24.37.5",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.71.2",
    "tailwind-merge": "^3.5.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@mapbox/point-geometry": "^1.1.0",
    "@types/mapbox-gl": "^3.4.1",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.35",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.21.0",
    "typescript": "^5"
  }
}
```

### middleware.ts

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploads/(.*)",
  "/share(.*)",
  "/api/reports/(.*)/pdf",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

### prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Arborist {
  id                  String   @id @default(cuid())
  clerkUserId         String?  @unique
  name                String
  email               String   @unique
  isaCertificationNum String
  isaExpirationDate   DateTime
  companyName         String?
  phone               String?
  citiesServed        String   @default("[]") // JSON array stored as string

  // Branding & profile fields
  companyLogoUrl   String?
  companyAddress   String?
  companyPhone     String?
  companyEmail     String?
  companyWebsite   String?
  licenseNumbers   String?
  signatureName    String?
  profilePhotoUrl  String?
  traqCertified    Boolean  @default(false)
  additionalCerts  String   @default("[]") // JSON array: ["BCMA", "Utility Specialist", etc.]
  reportDefaults   String?  // JSON string for report template defaults

  createdAt DateTime @default(now())

  properties   Property[]
  reports      Report[]
  apiUsageLogs ApiUsageLog[]
}

model Property {
  id          String @id @default(cuid())
  arboristId  String
  address     String
  city        String
  state       String @default("CA")
  zip         String?
  county      String @default("San Mateo")
  parcelNumber String?
  lat         Float?
  lng         Float?
  lotSizeSqft Float?

  homeownerName  String?
  homeownerEmail String?
  homeownerPhone String?

  // Report type drives the entire workflow
  reportType         String   @default("health_assessment")

  // Construction encroachment project fields
  projectDescription String?
  permitNumber       String?
  developerName      String?
  architectName      String?

  // Site-level assessment fields
  siteObservations    String?
  scopeOfAssignment   String?
  neededByDate        DateTime?

  shareToken String?  @unique

  status    String   @default("active") // active, archived
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  arborist           Arborist             @relation(fields: [arboristId], references: [id])
  trees              TreeRecord[]
  reports            Report[]
  propertyAudioNotes PropertyAudioNote[]
}

model TreeRecord {
  id         String @id @default(cuid())
  propertyId String
  treeNumber Int    // auto-increment per property (1, 2, 3...)

  pinLat Float?
  pinLng Float?

  tagNumber         String?

  speciesCommon     String   @default("")
  speciesScientific String   @default("")
  dbhInches         Float    @default(0)
  heightFt          Float?
  canopySpreadFt    Float?
  conditionRating   Int      @default(0) // 1-5 scale
  healthNotes       String?
  structuralNotes   String?

  isProtected        Boolean @default(false)
  protectionReason   String?
  recommendedAction  String  @default("retain") // retain, remove, prune, monitor
  mitigationRequired String?

  // Type-specific assessment data (JSON string, parsed per reportType)
  typeSpecificData String?

  photos String @default("[]") // DEPRECATED - use treePhotos relation instead
  status String @default("draft") // draft, assessed, certified

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  property       Property        @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  treePhotos     TreePhoto[]
  treeAudioNotes TreeAudioNote[]
}

model TreePhoto {
  id           String   @id @default(cuid())
  treeRecordId String
  filename     String
  url          String
  caption      String?
  sortOrder    Int      @default(0)
  createdAt    DateTime @default(now())

  // Annotation fields
  originalFilename String?
  originalUrl      String?
  isAnnotated      Boolean @default(false)

  // Photo categorization
  category String? // e.g. "full_tree", "defect_detail", "root_collar", etc.

  // EXIF metadata extracted on upload
  exifLat     Float?
  exifLng     Float?
  exifTakenAt DateTime?

  treeRecord TreeRecord @relation(fields: [treeRecordId], references: [id], onDelete: Cascade)
}

model TreeAudioNote {
  id                   String   @id @default(cuid())
  treeRecordId         String
  filename             String
  audioUrl             String
  rawTranscription     String?
  cleanedTranscription String?
  durationSeconds      Float?
  status               String   @default("uploading")
  errorMessage         String?
  createdAt            DateTime @default(now())

  treeRecord TreeRecord @relation(fields: [treeRecordId], references: [id], onDelete: Cascade)
}

model PropertyAudioNote {
  id                   String   @id @default(cuid())
  propertyId           String
  filename             String
  audioUrl             String
  rawTranscription     String?
  cleanedTranscription String?
  durationSeconds      Float?
  status               String   @default("uploading")
  errorMessage         String?
  createdAt            DateTime @default(now())

  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}

model MunicipalOrdinance {
  id        String @id @default(cuid())
  cityName  String @unique
  state     String @default("CA")

  protectedSpecies              String @default("[]") // JSON array with per-species DBH thresholds
  defaultDbhThresholdNative     Float?
  defaultDbhThresholdNonnative  Float?
  certifierRequirement          String? // e.g. "ISA Certified Only"
  mitigationRules               String @default("{}") // JSON
  heritageTreeRules             String @default("{}") // JSON
  permitProcessNotes            String?
  ordinanceUrl                  String?
  codeReference                 String?
  lastUpdated                   DateTime @default(now())
}

model Report {
  id         String @id @default(cuid())
  propertyId String
  arboristId String

  reportType     String // removal_permit, construction_encroachment, health_assessment, tree_valuation
  aiDraftContent String? // markdown
  finalContent   String? // markdown after edits
  citySections   String  @default("{}") // JSON
  eSignatureText String?
  certifiedAt    DateTime?
  pdfUrl         String?
  reportOptions  String  @default("{}") // JSON — toggleable options like includeTraq, includeCoverLetter

  // Permit lifecycle tracking
  permitStatus         String?    // submitted, under_review, approved, denied, revision_requested
  submittedAt          DateTime?
  submittedTo          String?    // e.g. "City of Palo Alto Planning Dept"
  reviewerName         String?
  reviewerNotes        String?
  conditionsOfApproval String?
  denialReason         String?
  approvedAt           DateTime?
  permitExpiresAt      DateTime?

  status String @default("draft") // draft, review, certified, filed

  property Property @relation(fields: [propertyId], references: [id])
  arborist Arborist @relation(fields: [arboristId], references: [id])
  versions ReportVersion[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ReportVersion {
  id        String   @id @default(cuid())
  reportId  String
  content   String   // full markdown content at this point
  label     String   // "AI Draft", "Edit", "Pre-certification", "Restored from ..."
  createdAt DateTime @default(now())

  report Report @relation(fields: [reportId], references: [id], onDelete: Cascade)
}

model ApiUsageLog {
  id              String   @id @default(cuid())
  arboristId      String
  propertyId      String?
  reportId        String?
  provider        String   // "anthropic" or "openai"
  endpoint        String   // "generate-report", "parse-audio", "transcribe"
  model           String   // "claude-sonnet-4-20250514", "whisper-1"
  inputTokens     Int      @default(0)
  outputTokens    Int      @default(0)
  audioDuration   Float?   // seconds, for Whisper
  estimatedCostUsd Float   @default(0)
  createdAt       DateTime @default(now())

  arborist Arborist @relation(fields: [arboristId], references: [id])
}
```

### prisma/seed.ts

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed demo arborist
  const arborist = await prisma.arborist.upsert({
    where: { email: "demo@treecertify.com" },
    update: {},
    create: {
      name: "Alex Rivera, ISA Certified Arborist",
      email: "demo@treecertify.com",
      isaCertificationNum: "WE-12345A",
      isaExpirationDate: new Date("2027-06-15"),
      companyName: "Peninsula Tree Consulting",
      phone: "(650) 555-0123",
      citiesServed: JSON.stringify([
        "Palo Alto",
        "Menlo Park",
        "Atherton",
        "Woodside",
        "Portola Valley",
      ]),
    },
  });

  // ---------------------------------------------------------------------------
  // Seed Municipal Ordinances
  //
  // Sources verified March 2026 via web search of municipal codes.
  // Fields marked NEEDS_VERIFICATION could not be confirmed from primary
  // code text and should be cross-checked against the cited ordinance URLs.
  // ---------------------------------------------------------------------------
  const ordinances = [
    // ----- PALO ALTO -----
    // Source: PAMC §8.10.020 (Ord. 5612, 2024)
    // https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-65934
    {
      cityName: "Palo Alto",
      protectedSpecies: JSON.stringify([
        // Six named native species protected at 11.5" DBH (36" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 11.5, category: "native" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 11.5, category: "native" },
        { species: "California Incense Cedar", scientific: "Calocedrus decurrens", dbhThreshold: 11.5, category: "native" },
        // Coast Redwood protected at 18" DBH (57" circumference)
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
      ]),
      // "Protected Mature Tree": all other non-invasive, non-high-water-use species at 15" DBH
      defaultDbhThresholdNative: 15,
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per Tree and Landscape Technical Manual (TLTM) Table 3-1",
        inLieuFee: "Fair market value per 24-inch box tree, paid to Forestry Fund per TLTM",
        notes: "Replacement ratios determined by Urban Forester per TLTM. Replacements must prioritize locally native species. Goal of net canopy increase within 15 years. In-lieu fee paid to Forestry Fund when on-site planting infeasible. Penalty for illegal removal: $10,000 per tree or 2x replacement value, whichever is higher.",
      }),
      heritageTreeRules: JSON.stringify({
        // Heritage trees in Palo Alto are designated by City Council resolution, not by DBH threshold
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "City Council designation required",
        notes: "Heritage trees are individually designated by City Council for historical value or as exemplary specimens. Currently 8 heritage trees in Palo Alto. No automatic DBH-based heritage status.",
      }),
      permitProcessNotes: "Submit Protected Tree Removal Permit to Urban Forestry Division. Arborist report required. Invasive species and high water users excluded from protection. TLTM governs replacement calculations. Permit fee ~$507.",
      ordinanceUrl: "https://codelibrary.amlegal.com/codes/paloalto/latest/paloalto_ca/0-0-0-65934",
      codeReference: "PAMC §8.10.020 (protected tree definition), §8.10.050 (removal), §8.10.055 (replacement)",
    },

    // ----- MENLO PARK -----
    // Source: MPMC Chapter 13.24 — Heritage Trees
    // https://www.codepublishing.com/CA/MenloPark/html/MenloPark13/MenloPark1324.html
    // Note: Menlo Park uses the term "Heritage Tree" for ALL protected trees, not just large/historic ones
    {
      cityName: "Menlo Park",
      protectedSpecies: JSON.stringify([
        // California native oaks: 10" DBH (31.4" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 10, category: "native_oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 10, category: "native_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 10, category: "native_oak" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 10, category: "native_oak" },
        { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 10, category: "native_oak" },
        { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 10, category: "native_oak" },
        { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 10, category: "native_oak" },
      ]),
      // Non-oak trees (all species): 15" DBH (47.1" circumference at 54" above grade)
      defaultDbhThresholdNative: 15,
      defaultDbhThresholdNonnative: 15,
      certifierRequirement: "ISA Certified Arborist or city arborist review",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1 replacement tree or in-lieu fee",
        inLieuFee: "Based on trunk diameter: 10-15\" oak = $100, 15-20\" = $200, 20-30\" = $400 (NEEDS_VERIFICATION — fee schedule may have been updated)",
        notes: "Replacement tree from city arborist approved species list. Goal: replace removed canopy within 15-20 years. In-lieu fee deposited into Heritage Tree Fund. Penalty for violation: up to $5,000 per tree or appraised replacement value, whichever is higher.",
      }),
      heritageTreeRules: JSON.stringify({
        // In Menlo Park, all protected trees are called "heritage trees" — no separate heritage tier
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "City Council may designate trees of historical significance by resolution",
        notes: "Menlo Park uses 'heritage tree' as the general protected tree category, not a special tier. Council can also designate specific trees or groves regardless of size. Multi-trunk trees under 12 ft height are excluded.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit application to Public Works. City arborist reviews within 14 days. Major pruning (>25% of crown/roots) also requires permit. Appeal within 15 days to city manager. Work within Tree Protection Zone (10x trunk diameter) requires tree protection plan.",
      ordinanceUrl: "https://www.codepublishing.com/CA/MenloPark/html/MenloPark13/MenloPark1324.html",
      codeReference: "MPMC §13.24.020 (definitions), §13.24.040 (permit required), §13.24.050 (removal criteria)",
    },

    // ----- ATHERTON -----
    // Source: Atherton Municipal Code Chapter 8.10
    // https://atherton.municipal.codes/Code/8.10
    // Atherton only protects oaks and redwoods as "heritage trees" — other species are NOT protected
    {
      cityName: "Atherton",
      protectedSpecies: JSON.stringify([
        // Oaks: 15.2" DBH (48" circumference at 54" above grade)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 15.2, category: "heritage_oak" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 15.2, category: "heritage_oak" },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 15.2, category: "heritage_oak" },
        // Coast Redwood: same threshold per some ordinance versions
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 15.2, category: "heritage" },
      ]),
      // Trees outside the Main Buildable Area: any species at 15.2" DBH is also heritage
      defaultDbhThresholdNative: 15.2,
      // Non-native trees in the buildable area are NOT protected unless designated
      defaultDbhThresholdNonnative: null,
      certifierRequirement: "ISA Certified Arborist (project arborist required for development)",
      mitigationRules: JSON.stringify({
        replantingRatio: "1:1 for heritage oaks (48-inch box oak). Non-oak heritage: 3x 15-gal, or 2x 24-inch box, or 1x 15-gal + 1x 36-inch box, at Planning Commission discretion",
        inLieuFee: "No standard in-lieu fee — penalty is based on appraised tree value",
        notes: "Heritage oak replacements must be oak species at 48-inch container size. Replacement trees shall not be disfavored species. Maintenance agreement required (1-3 years). Maintenance bond equal to appraised value of replacement trees. Penalty for damage: 1/2 appraised value. Penalty for illegal removal: 2x appraised value.",
      }),
      heritageTreeRules: JSON.stringify({
        // In Atherton, "heritage tree" IS the protected tree definition — not a separate tier
        dbhThreshold: 15.2,
        speciesRestricted: true,
        protectedSpecies: ["Quercus agrifolia", "Quercus lobata", "Quercus douglasii", "Sequoia sempervirens"],
        reviewProcess: "Planning Commission review; may require Town Council hearing",
        notes: "Heritage tree = oak (Quercus lobata, Q. agrifolia, Q. douglasii) or redwood (Sequoia sempervirens) with 48\" circumference (15.2\" DBH) at 54\" above grade. Trees outside the Main Buildable Area of any species at 15.2\" DBH are also heritage. CEQA review triggered if >2 heritage trees removed on parcels <1 acre.",
      }),
      permitProcessNotes: "Submit Heritage Tree Removal Permit to Planning Department. Project arborist must provide Tree Protection and Preservation Plan. Quarterly inspections required during construction. Retroactive permit required for illegal removal with full penalties.",
      ordinanceUrl: "https://atherton.municipal.codes/Code/8.10",
      codeReference: "AMC §8.10.020 (definitions), §8.10.030 (prohibition), §8.10.040 (permit process), §8.10.070 (penalties)",
    },

    // ----- WOODSIDE -----
    // Source: Woodside Municipal Code §153.005 (Definitions) and §153.430-435 (Tree Protection)
    // https://library.municode.com/ca/woodside/codes/municipal_code
    // Woodside uses the term "Significant Tree" — measured by circumference at 48" above grade
    // NEEDS_VERIFICATION: exact per-species thresholds from §153.005 table (PDF not fully extractable)
    {
      cityName: "Woodside",
      protectedSpecies: JSON.stringify([
        // Standard native species: ~30" circumference = ~9.5" DBH (confirmed by Almanac reporting)
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 9.5, category: "native", NEEDS_VERIFICATION: true },
        // Slow-growing species: ~24" circumference = ~7.6" DBH
        { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
        { species: "Tan Oak", scientific: "Notholithocarpus densiflorus", dbhThreshold: 7.6, category: "native_slow", NEEDS_VERIFICATION: true },
      ]),
      // Default for unlisted species
      defaultDbhThresholdNative: 9.5,
      defaultDbhThresholdNonnative: 11.5,
      certifierRequirement: "ISA Certified Arborist (may be required by Planning Director)",
      mitigationRules: JSON.stringify({
        replantingRatio: "Per Planning Commission conditions (NEEDS_VERIFICATION — no standard ratio found in code)",
        inLieuFee: "No standard in-lieu fee found in code",
        notes: "Permit conditions set by Planning Director or ASRB. Penalties for unpermitted removal: $5,000 first tree, $7,500 second, $10,000 each additional. Fees waived for Eucalyptus, Acacia, and Monterey Pine. Defensible Space/Home Hardening removals exempt from fees.",
        NEEDS_VERIFICATION: true,
      }),
      heritageTreeRules: JSON.stringify({
        // Woodside has a separate Heritage Tree Award program (not a permit/protection tier)
        dbhThreshold: null,
        designatedByCommittee: true,
        reviewProcess: "Heritage Tree Committee nomination and review",
        notes: "Heritage Tree Award is a recognition program for outstanding specimens of oak, redwood, or cedar. Judged by Heritage Tree Committee. Separate from the Significant Tree permit requirement. No automatic DBH threshold for heritage designation.",
        NEEDS_VERIFICATION: true,
      }),
      permitProcessNotes: "Submit Tree Destruction Permit to Planning Department. Site sketch with tree locations, proximity to structures, property lines, streams, and trails required. Photos with trees marked (orange ribbon). Planning Director may require arborist report. Permit valid 2 years. Eucalyptus, Acacia, and Monterey Pine exempt from fees.",
      ordinanceUrl: "https://library.municode.com/ca/woodside/codes/municipal_code?nodeId=CD_ORD_TITXVLAUS_CH153ZO_153.430TRPR",
      codeReference: "WMC §153.005 (definitions/significant tree table), §153.430-435 (tree protection/permits)",
    },

    // ----- PORTOLA VALLEY -----
    // Source: PVMC Chapter 15.12 — Site Development and Tree Protection
    // https://library.municode.com/ca/portola_valley/codes/code_of_ordinances
    // Confirmed species table from Town website:
    // https://www.portolavalley.net/departments/planning-building-department/resource-center/general-information-and-handouts/tree-removal
    {
      cityName: "Portola Valley",
      protectedSpecies: JSON.stringify([
        // Oaks and Bay Laurel: 36" circumference = 11.5" DBH at 54" above grade
        { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
        { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
        { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
        { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 11.5, category: "native" },
        // Redwood and Douglas Fir: 54" circumference = 17.2" DBH
        { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 17.2, category: "native" },
        { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 17.2, category: "native" },
        // Blue Oak: 16" circumference = 5.0" DBH (lower threshold)
        { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 5.0, category: "native" },
        // Big Leaf Maple and Madrone: 24" circumference = 7.6" DBH
        { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native" },
        { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native" },
      ]),
      // Non-listed species (Monterey Pine, Eucalyptus, Magnolia, etc.) are NOT protected
      defaultDbhThresholdNative: null,
      defaultDbhThresholdNonnative: null,
      certifierRequirement: "ISA Certified Arborist recommended; arborist letter may be included with application",
      mitigationRules: JSON.stringify({
        replantingRatio: "Replacement with native species from Town's Native Plant List (NEEDS_VERIFICATION — no specific ratio found in code)",
        inLieuFee: "No in-lieu fee provision found in code",
        notes: "Conservation Committee reviews removal applications and conducts site inspection. Dead trees (including from Sudden Oak Death) still require permit but fee is waived. Tree removal only Monday-Friday 8am-5:30pm per PVMC §9.10. Trimming/thinning does not require permit unless it substantially reduces tree size.",
        NEEDS_VERIFICATION: true,
      }),
      heritageTreeRules: JSON.stringify({
        dbhThreshold: null,
        designatedByCouncil: true,
        reviewProcess: "Town Council designation",
        notes: "Heritage trees are those of historic significance designated by Town Council action. Separate from the Significant Tree species/size table. No automatic DBH-based heritage status.",
      }),
      permitProcessNotes: "Submit Application for Site Development Permit (Tree Removal) to Planning Department. Fee waived for dead trees (including SOD). Conservation Committee reviews and conducts site inspection. Appeal to Planning Commission if disagreeing with Conservation Committee findings.",
      ordinanceUrl: "https://library.municode.com/ca/portola_valley/codes/code_of_ordinances?nodeId=TIT15BUCO_CH15.12SIDETRPR",
      codeReference: "PVMC §15.12.060 (definitions), §15.12.070 (permit required), §15.12.275 (tree protection standards)",
    },
  ];

  for (const ord of ordinances) {
    await prisma.municipalOrdinance.upsert({
      where: { cityName: ord.cityName },
      update: ord,
      create: ord,
    });
  }

  // Create a sample property with trees
  const property = await prisma.property.create({
    data: {
      arboristId: arborist.id,
      address: "123 University Ave",
      city: "Palo Alto",
      state: "CA",
      county: "Santa Clara",
      parcelNumber: "132-40-001",
      lat: 37.4439,
      lng: -122.1622,
      status: "active",
    },
  });

  // Seed sample tree records on the property
  await prisma.treeRecord.createMany({
    data: [
      {
        propertyId: property.id,
        treeNumber: 1,
        pinLat: 37.44395,
        pinLng: -122.16225,
        speciesCommon: "Coast Live Oak",
        speciesScientific: "Quercus agrifolia",
        dbhInches: 24,
        heightFt: 45,
        canopySpreadFt: 35,
        conditionRating: 4,
        healthNotes: "Good overall vigor. Minor deadwood in upper canopy.",
        structuralNotes: "Co-dominant stems with included bark at primary union. Recommend monitoring.",
        isProtected: true,
        protectionReason: 'Coast Live Oak with 24" DBH exceeds 11.5" threshold per PAMC §8.10.020',
        recommendedAction: "retain",
        mitigationRequired: "N/A - retention recommended. If removal required: replacement per TLTM Table 3-1, in-lieu fee to Forestry Fund.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 2,
        pinLat: 37.44388,
        pinLng: -122.16210,
        speciesCommon: "Valley Oak",
        speciesScientific: "Quercus lobata",
        dbhInches: 18,
        heightFt: 55,
        canopySpreadFt: 42,
        conditionRating: 3,
        healthNotes: "Moderate crown dieback. Some chlorosis in upper canopy.",
        structuralNotes: "Previous limb failure on south side. Wound compartmentalization progressing.",
        isProtected: true,
        protectionReason: 'Valley Oak with 18" DBH exceeds 11.5" threshold per PAMC §8.10.020',
        recommendedAction: "prune",
        mitigationRequired: "Replacement per TLTM Table 3-1 if removal required.",
        status: "assessed",
      },
      {
        propertyId: property.id,
        treeNumber: 3,
        pinLat: 37.44402,
        pinLng: -122.16235,
        speciesCommon: "Japanese Maple",
        speciesScientific: "Acer palmatum",
        dbhInches: 8,
        heightFt: 15,
        canopySpreadFt: 12,
        conditionRating: 5,
        healthNotes: "Excellent health. Vigorous spring growth.",
        structuralNotes: "Good form. No defects noted.",
        isProtected: false,
        protectionReason: null,
        recommendedAction: "retain",
        mitigationRequired: null,
        status: "assessed",
      },
    ],
  });

  console.log("Seed data created successfully.");
  console.log(`  - Arborist: ${arborist.name}`);
  console.log(`  - Property: ${property.address}, ${property.city}`);
  console.log(`  - Trees: 3 sample tree records`);
  console.log(`  - Ordinances: ${ordinances.length} cities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

### next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

### postcss.config.mjs

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

### next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

### .env.example

```bash
# Database — PostgreSQL (Neon recommended)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Mapbox — for property maps
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token

# OpenAI API key — for Whisper audio transcription
OPENAI_API_KEY=your_openai_api_key

# Anthropic API key — for report generation and transcription cleanup
ANTHROPIC_API_KEY=your_anthropic_api_key

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

### .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

/lib/generated/prisma

# uploaded files (photos, audio)
/uploads

# database
*.db
*.db-journal

# env
.env

# OS
Thumbs.db
nul
```

### app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "TreeCertify — Arborist OS",
  description:
    "AI-assisted report generation for ISA-certified arborists on the SF Peninsula",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### app/page.tsx

```tsx
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TreePine } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-600 p-3">
            <TreePine className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TreeCertify</h1>
            <p className="text-sm text-gray-500">Arborist OS</p>
          </div>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary:
                "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600",
            },
          }}
        />
      </div>
    </div>
  );
}
```

### app/globals.css

```css
@import "mapbox-gl/dist/mapbox-gl.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    --background: 40 20% 98%;
    --foreground: 150 10% 15%;
    --card: 0 0% 100%;
    --card-foreground: 150 10% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 150 10% 15%;
    --primary: 152 45% 28%;
    --primary-foreground: 0 0% 98%;
    --secondary: 40 20% 94%;
    --secondary-foreground: 150 10% 15%;
    --muted: 40 15% 95%;
    --muted-foreground: 150 5% 45%;
    --accent: 30 40% 50%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 40 15% 88%;
    --input: 40 15% 88%;
    --ring: 152 45% 28%;
    --chart-1: 152 45% 28%;
    --chart-2: 30 40% 50%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar: 150 20% 18%;
    --sidebar-foreground: 40 20% 92%;
    --sidebar-muted: 150 15% 25%;
    --sidebar-accent: 152 45% 35%;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground));
}
```

### app/(app)/layout.tsx

```tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ConnectivityIndicator } from "@/components/connectivity-indicator";
import { AppProviders } from "@/components/app-providers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });

  // Onboarding page gets rendered without sidebar
  if (!arborist) {
    redirect("/onboarding");
  }

  return (
    <AppProviders>
      <div className="min-h-screen bg-background">
        <ConnectivityIndicator />
        <Sidebar arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} />
        <MobileNav arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} />
        <main className="pl-0 md:pl-64">
          <div className="mx-auto max-w-7xl px-4 md:px-6 pt-16 md:pt-8 pb-8">{children}</div>
        </main>
      </div>
    </AppProviders>
  );
}
```

### app/(app)/dashboard/page.tsx

```tsx
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardContent } from "@/components/dashboard-content";
import { Plus } from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getContextMessage(props: { draftCount: number; overdueCount: number; totalTrees: number }): string | null {
  if (props.overdueCount > 0) return `You have ${props.overdueCount} overdue ${props.overdueCount === 1 ? "report" : "reports"} to finish.`;
  if (props.draftCount > 0) return `${props.draftCount} ${props.draftCount === 1 ? "report is" : "reports are"} ready to certify.`;
  if (props.totalTrees === 0) return "Get started by creating a property and pinning trees on the map.";
  return null;
}

export default async function DashboardPage() {
  const arborist = await requireArborist();

  const [allProperties, totalTrees, recentActivity] = await Promise.all([
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: {
        trees: {
          select: { id: true, isProtected: true },
          orderBy: { treeNumber: "asc" },
        },
        reports: {
          select: { id: true, status: true, permitStatus: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
    prisma.treeRecord.count({
      where: { property: { arboristId: arborist.id } },
    }),
    // Recent activity: last 5 updated properties
    prisma.property.findMany({
      where: { arboristId: arborist.id },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        address: true,
        city: true,
        updatedAt: true,
        _count: { select: { trees: true } },
        reports: {
          select: { status: true, certifiedAt: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
  ]);

  // Compute contextual stats
  const draftCount = allProperties.filter(
    (p) => p.reports[0] && p.reports[0].status !== "certified"
  ).length;
  const now = new Date();
  const overdueCount = allProperties.filter((p) => {
    const due = p.neededByDate;
    return due && new Date(due) < now && (!p.reports[0] || p.reports[0].status !== "certified");
  }).length;

  // Permit pipeline stats
  const certifiedReports = allProperties
    .filter((p) => p.reports[0]?.status === "certified")
    .map((p) => p.reports[0]);
  const permitStats = {
    pendingSubmission: certifiedReports.filter((r) => !r.permitStatus).length,
    submittedOrReview: certifiedReports.filter(
      (r) => r.permitStatus === "submitted" || r.permitStatus === "under_review"
    ).length,
    approved: certifiedReports.filter((r) => r.permitStatus === "approved").length,
    needingRevision: certifiedReports.filter(
      (r) => r.permitStatus === "denied" || r.permitStatus === "revision_requested"
    ).length,
  };

  // Next Actions
  const nextActions = {
    needTreeAssessment: allProperties.filter((p) => p.trees.length === 0).length,
    needReport: allProperties.filter((p) => p.trees.length > 0 && !p.reports[0]).length,
    readyToCertify: allProperties.filter(
      (p) => p.reports[0] && (p.reports[0].status === "draft" || p.reports[0].status === "review")
    ).length,
  };

  // Weekly activity comparison
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const [treesThisWeek, treesLastWeek] = await Promise.all([
    prisma.treeRecord.count({
      where: {
        property: { arboristId: arborist.id },
        createdAt: { gte: oneWeekAgo },
      },
    }),
    prisma.treeRecord.count({
      where: {
        property: { arboristId: arborist.id },
        createdAt: { gte: twoWeeksAgo, lt: oneWeekAgo },
      },
    }),
  ]);

  const greeting = getGreeting();
  const contextMessage = getContextMessage({ draftCount, overdueCount, totalTrees });

  const activityFeed = recentActivity.map((p) => ({
    id: p.id,
    address: p.address,
    city: p.city,
    updatedAt: p.updatedAt.toISOString(),
    treeCount: p._count.trees,
    reportStatus: p.reports[0]?.status || null,
    certifiedAt: p.reports[0]?.certifiedAt?.toISOString() || null,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            {greeting}, {arborist.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">
            ISA #{arborist.isaCertificationNum} &middot;{" "}
            {arborist.companyName ?? "Independent Arborist"}
          </p>
          {contextMessage && (
            <p className="mt-1 text-sm text-emerald-600 font-medium">
              {contextMessage}
            </p>
          )}
        </div>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto"
        >
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            New Property
          </Link>
        </Button>
      </div>

      <DashboardContent
        properties={JSON.parse(JSON.stringify(allProperties))}
        totalTrees={totalTrees}
        activityFeed={activityFeed}
        permitStats={permitStats}
        nextActions={nextActions}
        treesThisWeek={treesThisWeek}
        treesLastWeek={treesLastWeek}
      />
    </div>
  );
}
```

### app/(app)/properties/page.tsx

```tsx
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertiesList } from "@/components/properties-list";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const arborist = await requireArborist();
  const properties = await prisma.property.findMany({
    where: { arboristId: arborist.id },
    include: {
      trees: {
        select: { id: true, isProtected: true, status: true },
        orderBy: { treeNumber: "asc" },
      },
      reports: {
        select: { id: true, status: true },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Serialize for client component
  const serialized = JSON.parse(JSON.stringify(properties));

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Properties
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {properties.length} propert{properties.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link href="/properties/new" className="self-start sm:self-auto">
          <Button className="bg-emerald-700 hover:bg-emerald-600">
            <Plus className="h-4 w-4 mr-2" />
            New Property
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <PropertiesList properties={serialized} initialFilter={searchParams.status} />
      </div>
    </div>
  );
}
```

### app/(app)/properties/new/page.tsx

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  ArrowLeft,
  Loader2,
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
  Check,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { REPORT_TYPES } from "@/lib/report-types";
import { cn } from "@/lib/utils";

const COUNTY_MAP: Record<string, string> = {
  "Palo Alto": "Santa Clara",
  "Los Altos": "Santa Clara",
  "Los Altos Hills": "Santa Clara",
  "Mountain View": "Santa Clara",
  "Sunnyvale": "Santa Clara",
  "Cupertino": "Santa Clara",
  "Saratoga": "Santa Clara",
  "Los Gatos": "Santa Clara",
  "San Jose": "Santa Clara",
  "Menlo Park": "San Mateo",
  "Atherton": "San Mateo",
  "Woodside": "San Mateo",
  "Portola Valley": "San Mateo",
  "Redwood City": "San Mateo",
  "San Carlos": "San Mateo",
  "Belmont": "San Mateo",
  "San Mateo": "San Mateo",
  "Hillsborough": "San Mateo",
  "Burlingame": "San Mateo",
  "Foster City": "San Mateo",
  "Half Moon Bay": "San Mateo",
  "Pacifica": "San Mateo",
  "Daly City": "San Mateo",
  "South San Francisco": "San Mateo",
};

const ICON_MAP = {
  Stethoscope,
  Axe,
  DollarSign,
  HardHat,
} as const;

const COLOR_MAP: Record<string, { border: string; bg: string; ring: string; icon: string; check: string }> = {
  green: {
    border: "border-l-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-600",
    icon: "text-emerald-700",
    check: "bg-emerald-600",
  },
  red: {
    border: "border-l-red-600",
    bg: "bg-red-50",
    ring: "ring-red-600",
    icon: "text-red-700",
    check: "bg-red-600",
  },
  amber: {
    border: "border-l-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-600",
    icon: "text-amber-700",
    check: "bg-amber-600",
  },
  blue: {
    border: "border-l-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-600",
    icon: "text-blue-700",
    check: "bg-blue-600",
  },
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Report type
  const [reportType, setReportType] = useState<string | null>(null);

  // Property details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [parcelNumber, setParcelNumber] = useState("");
  const [neededByDate, setNeededByDate] = useState("");
  const [homeownerName, setHomeownerName] = useState("");
  const [homeownerEmail, setHomeownerEmail] = useState("");
  const [homeownerPhone, setHomeownerPhone] = useState("");

  // Construction encroachment project fields
  const [projectDescription, setProjectDescription] = useState("");
  const [permitNumber, setPermitNumber] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [architectName, setArchitectName] = useState("");

  const handleCityChange = (value: string) => {
    setCity(value);
    const matchedCounty = COUNTY_MAP[value.trim()];
    if (matchedCounty) {
      setCounty(matchedCounty);
    }
  };

  const handleSubmit = async () => {
    if (!address.trim() || !city || !reportType) {
      setError("Report type, address, and city are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Geocode the address
      let lat: number | undefined;
      let lng: number | undefined;

      try {
        const geoRes = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: address.trim(), city, state: "CA" }),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          lat = geoData.lat;
          lng = geoData.lng;
        }
      } catch {
        // Geocoding failure is non-fatal
        console.warn("Geocoding failed, proceeding without coordinates");
      }

      // 2. Create the property
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.trim(),
          city,
          county,
          zip: zip.trim() || undefined,
          parcelNumber: parcelNumber.trim() || undefined,
          lat,
          lng,
          reportType,
          ...(neededByDate && { neededByDate }),
          ...(homeownerName.trim() && { homeownerName: homeownerName.trim() }),
          ...(homeownerEmail.trim() && { homeownerEmail: homeownerEmail.trim() }),
          ...(homeownerPhone.trim() && { homeownerPhone: homeownerPhone.trim() }),
          // Construction encroachment project fields
          ...(reportType === "construction_encroachment" && {
            ...(projectDescription.trim() && { projectDescription: projectDescription.trim() }),
            ...(permitNumber.trim() && { permitNumber: permitNumber.trim() }),
            ...(developerName.trim() && { developerName: developerName.trim() }),
            ...(architectName.trim() && { architectName: architectName.trim() }),
          }),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create property");
      }

      const property = await res.json();
      router.push(`/properties/${property.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const isValid = address.trim() && city && reportType;

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">New Property</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select a report type and enter the property address to get started.
        </p>
      </div>

      <div className="space-y-6">
        {/* Report Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {REPORT_TYPES.map((rt) => {
            const Icon = ICON_MAP[rt.icon];
            const colors = COLOR_MAP[rt.color] || COLOR_MAP.green;
            const selected = reportType === rt.id;

            return (
              <button
                key={rt.id}
                onClick={() => setReportType(rt.id)}
                className={cn(
                  "relative text-left p-5 rounded-lg border-2 border-l-4 transition-all",
                  colors.border,
                  selected
                    ? `${colors.bg} ring-2 ${colors.ring} border-transparent`
                    : "bg-white hover:bg-gray-50 border-border"
                )}
              >
                {selected && (
                  <div
                    className={cn(
                      "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",
                      colors.check
                    )}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <Icon className={cn("h-7 w-7 mb-3", colors.icon)} />
                <h3 className="font-semibold text-sm text-foreground">
                  {rt.label}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {rt.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Property Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-emerald-600" />
              Property Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>City *</Label>
                <Input
                  placeholder="e.g., Palo Alto"
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>County</Label>
                <Input
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="mt-1"
                  placeholder="e.g., San Mateo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  placeholder="94301"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="apn">APN / Parcel Number</Label>
                <Input
                  id="apn"
                  placeholder="132-40-001"
                  value={parcelNumber}
                  onChange={(e) => setParcelNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="neededByDate" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                Needed By Date
              </Label>
              <Input
                id="neededByDate"
                type="date"
                value={neededByDate}
                onChange={(e) => setNeededByDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Construction encroachment project info */}
        {reportType === "construction_encroachment" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <HardHat className="h-4 w-4 text-blue-600" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="projectDescription">Project Description</Label>
                <Input
                  id="projectDescription"
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permitNumber">Permit Number</Label>
                  <Input
                    id="permitNumber"
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="developerName">Developer / Contractor</Label>
                  <Input
                    id="developerName"
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="architectName">Architect</Label>
                <Input
                  id="architectName"
                  placeholder="Jane Smith, AIA"
                  value={architectName}
                  onChange={(e) => setArchitectName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Homeowner Info (optional) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Homeowner Information{" "}
              <span className="text-muted-foreground font-normal text-sm">
                (Optional)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="homeownerName">Name</Label>
              <Input
                id="homeownerName"
                placeholder="John Smith"
                value={homeownerName}
                onChange={(e) => setHomeownerName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="homeownerEmail">Email</Label>
                <Input
                  id="homeownerEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={homeownerEmail}
                  onChange={(e) => setHomeownerEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="homeownerPhone">Phone</Label>
                <Input
                  id="homeownerPhone"
                  placeholder="(650) 555-0100"
                  value={homeownerPhone}
                  onChange={(e) => setHomeownerPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error display */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" asChild>
            <Link href="/properties">Cancel</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="bg-emerald-700 hover:bg-emerald-600"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Create &amp; Open Map
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### app/(app)/properties/[id]/page.tsx

```tsx
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const PropertyMapView = dynamic(
  () => import("@/components/property-map-view").then((mod) => mod.PropertyMapView),
  { ssr: false }
);

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      trees: { orderBy: { treeNumber: "asc" } },
      reports: { orderBy: { updatedAt: "desc" } },
      arborist: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="-mx-6 -my-8">
      <PropertyMapView property={JSON.parse(JSON.stringify(property))} />
    </div>
  );
}
```

### app/(app)/properties/[id]/report/page.tsx

```tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReportPreview } from "@/components/report-preview";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { getReportTypeConfig } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Sparkles,
  Save,
  CheckCircle2,
  Loader2,
  Download,
  FileDown,
  Eye,
  Pencil,
  Lock,
  Unlock,
  RefreshCw,
  List,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Share2,
  Send,
  Settings2,
  X,
  ClipboardCheck,
  ExternalLink,
  History,
  RotateCcw,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  isProtected: boolean;
  recommendedAction: string;
  status: string;
}

interface Property {
  id: string;
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
  reportType?: string;
  homeownerName?: string | null;
  homeownerEmail?: string | null;
  trees: TreeRecord[];
  reports: Report[];
}

interface Report {
  id: string;
  propertyId: string;
  reportType: string;
  aiDraftContent: string | null;
  finalContent: string | null;
  eSignatureText: string | null;
  certifiedAt: string | null;
  status: string;
  reportOptions?: string;
  // Permit lifecycle
  permitStatus: string | null;
  submittedAt: string | null;
  submittedTo: string | null;
  reviewerName: string | null;
  reviewerNotes: string | null;
  conditionsOfApproval: string | null;
  denialReason: string | null;
  approvedAt: string | null;
  permitExpiresAt: string | null;
}

interface ReportOptions {
  includeTraq?: boolean;
  includeCoverLetter?: boolean;
  includeMitigation?: boolean;
  includeSiteMap?: boolean;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
  signatureName?: string | null;
}

interface Section {
  id: string;
  title: string;
  level: number;
}

interface ValidationCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  message: string;
  fixPath?: string;
}

interface ValidationResult {
  checks: ValidationCheck[];
  hasFailures: boolean;
  hasWarnings: boolean;
  allPassed: boolean;
}

interface ReportVersionItem {
  id: string;
  label: string;
  content: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractSections(markdown: string): Section[] {
  const sections: Section[] = [];
  for (const line of markdown.split("\n")) {
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      sections.push({ id: slugify(title), title, level: 3 });
    } else if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      sections.push({ id: slugify(title), title, level: 2 });
    } else if (line.startsWith("# ")) {
      const title = line.slice(2).trim();
      sections.push({ id: slugify(title), title, level: 1 });
    }
  }
  return sections;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PropertyReportPage() {
  const params = useParams();
  const propertyId = params.id as string;

  // Data state
  const [property, setProperty] = useState<Property | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [arborist, setArborist] = useState<ArboristInfo | null>(null);
  const [reportType, setReportType] = useState("");
  const [content, setContent] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  // Certification state
  const [signatureText, setSignatureText] = useState("");
  const [certifyAgreed, setCertifyAgreed] = useState(false);
  const [showCertifyPanel, setShowCertifyPanel] = useState(false);
  const [certifyStep, setCertifyStep] = useState(1); // 1=Review, 2=Attest, 3=Sign
  const [reviewChecked, setReviewChecked] = useState(false);
  const [certifySuccess, setCertifySuccess] = useState(false);

  // UI state
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certifying, setCertifying] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(true);
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">("split");
  const [showQualityDialog, setShowQualityDialog] = useState(false);
  const [qualityWarnings, setQualityWarnings] = useState<string[]>([]);
  const [streamingText, setStreamingText] = useState("");

  // Report options state (PDF appendix toggles)
  const [reportOptions, setReportOptions] = useState<ReportOptions>({});

  // Report delivery state
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Pre-certification validation state
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationLoading, setValidationLoading] = useState(false);
  const [warningsAcknowledged, setWarningsAcknowledged] = useState(false);

  // Version history state
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState<ReportVersionItem[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [previewVersion, setPreviewVersion] = useState<ReportVersionItem | null>(null);
  const [showVersionPreview, setShowVersionPreview] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [reportCost, setReportCost] = useState<number | null>(null);

  // Refs
  const previewRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedContentRef = useRef("");
  const lastSavedRef = useRef<Date | null>(null);

  // Derived state
  const isCertified = report?.status === "certified";
  const sections = useMemo(() => extractSections(content), [content]);

  // -------------------------------------------------------------------------
  // Load data
  // -------------------------------------------------------------------------

  useEffect(() => {
    async function loadData() {
      try {
        const [propRes, arbRes] = await Promise.all([
          fetch(`/api/properties/${propertyId}`),
          fetch("/api/arborist/profile"),
        ]);

        if (!propRes.ok) throw new Error("Failed to load property");
        const data = await propRes.json();
        setProperty(data);
        setReportType(data.reportType || "health_assessment");

        if (arbRes.ok) {
          const arbData = await arbRes.json();
          setArborist(arbData);
        }

        if (data.reports && data.reports.length > 0) {
          const r = data.reports[0];
          setReport(r);
          const c = r.finalContent || r.aiDraftContent || "";
          setContent(c);
          savedContentRef.current = c;
          setPreviewHtml(renderMarkdownToHtml(c));
          setReportType(r.reportType);
          setViewMode(r.status === "certified" ? "preview" : "split");
          // Parse report options
          try {
            setReportOptions(JSON.parse(r.reportOptions || "{}"));
          } catch { /* default empty */ }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  // Fetch per-report API cost
  useEffect(() => {
    if (!report?.id) return;
    fetch(`/api/reports/usage?reportId=${report.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.totalCost != null) setReportCost(data.totalCost);
      })
      .catch(() => {});
  }, [report?.id]);

  // -------------------------------------------------------------------------
  // Fetch validation checks
  // -------------------------------------------------------------------------

  const fetchValidation = useCallback(async (reportId: string) => {
    setValidationLoading(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/validate`);
      if (res.ok) {
        const data = await res.json();
        setValidationResult(data);
      }
    } catch {
      // Validation fetch is best-effort
    } finally {
      setValidationLoading(false);
    }
  }, []);

  // Run validation when report is loaded and not yet certified
  useEffect(() => {
    if (report && report.status !== "certified") {
      fetchValidation(report.id);
    }
  }, [report?.id, report?.status, fetchValidation]);

  // -------------------------------------------------------------------------
  // Debounced preview (500ms)
  // -------------------------------------------------------------------------

  const updatePreview = useCallback((md: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPreviewHtml(renderMarkdownToHtml(md));
    }, 500);
  }, []);

  // -------------------------------------------------------------------------
  // Content change handler
  // -------------------------------------------------------------------------

  const handleContentChange = useCallback(
    (value: string) => {
      setContent(value);
      setHasUnsavedChanges(value !== savedContentRef.current);
      updatePreview(value);
    },
    [updatePreview]
  );

  // -------------------------------------------------------------------------
  // Save report
  // -------------------------------------------------------------------------

  const saveReport = useCallback(
    async (silent = false) => {
      if (!report || isCertified) return;
      if (!silent) setSaving(true);
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalContent: content,
            status: report.status === "draft" ? "review" : report.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to save");
        const updated = await res.json();
        setReport(updated);
        savedContentRef.current = content;
        setHasUnsavedChanges(false);
        const now = new Date();
        setLastSaved(now);
        lastSavedRef.current = now;
      } catch (err) {
        if (!silent) {
          setError(err instanceof Error ? err.message : "Save failed");
        }
      } finally {
        if (!silent) setSaving(false);
      }
    },
    [report, isCertified, content]
  );

  // -------------------------------------------------------------------------
  // Update permit status
  // -------------------------------------------------------------------------

  const updatePermitStatus = useCallback(
    async (data: Record<string, unknown>) => {
      if (!report) return;
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update permit status");
        const updated = await res.json();
        setReport(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update permit status");
      }
    },
    [report]
  );

  // -------------------------------------------------------------------------
  // Auto-save every 30s
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!report || isCertified) return;

    autoSaveRef.current = setInterval(() => {
      if (savedContentRef.current !== content) {
        saveReport(true);
      }
    }, 30000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [report, isCertified, content, saveReport]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Refresh "saved X ago" text
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 15000);
    return () => clearInterval(t);
  }, []);

  // -------------------------------------------------------------------------
  // Data quality check
  // -------------------------------------------------------------------------

  function assessDataQuality(trees: TreeRecord[]) {
    const warnings: string[] = [];
    const treesWithoutNotes: number[] = [];
    const treesWithoutCondition: number[] = [];
    const treesWithoutDBH: number[] = [];

    trees.forEach((tree) => {
      if (!tree.healthNotes && !tree.structuralNotes) {
        treesWithoutNotes.push(tree.treeNumber);
      }
      if (!tree.conditionRating || tree.conditionRating === 0) {
        treesWithoutCondition.push(tree.treeNumber);
      }
      if (!tree.dbhInches || tree.dbhInches === 0) {
        treesWithoutDBH.push(tree.treeNumber);
      }
    });

    if (treesWithoutDBH.length > 0) {
      warnings.push(
        `Tree${treesWithoutDBH.length > 1 ? "s" : ""} #${treesWithoutDBH.join(", #")} missing DBH measurement`
      );
    }
    if (treesWithoutCondition.length > 0) {
      warnings.push(
        `Tree${treesWithoutCondition.length > 1 ? "s" : ""} #${treesWithoutCondition.join(", #")} missing condition rating`
      );
    }
    if (treesWithoutNotes.length > 0) {
      warnings.push(
        `Tree${treesWithoutNotes.length > 1 ? "s" : ""} #${treesWithoutNotes.join(", #")} have no health or structural notes \u2014 the AI will generate generic observations`
      );
    }

    return warnings;
  }

  const handleGenerateClick = () => {
    if (!property) return;
    const warnings = assessDataQuality(property.trees);
    if (warnings.length > 0) {
      setQualityWarnings(warnings);
      setShowQualityDialog(true);
    } else {
      generateReport();
    }
  };

  // -------------------------------------------------------------------------
  // Generate report
  // -------------------------------------------------------------------------

  const generateReport = async () => {
    setGenerating(true);
    setStreamingText("");
    setError(null);
    try {
      const res = await fetch("/api/ai/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, reportType }),
      });
      if (!res.ok) {
        // Non-streaming error — try to parse JSON
        const data = await res.json().catch(() => ({ error: "Failed to generate report" }));
        throw new Error(data.error || "Failed to generate report");
      }

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("text/event-stream") && res.body) {
        // Streaming SSE path
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last potentially incomplete line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const payload = JSON.parse(line.slice(6));
              if (payload.type === "text") {
                accumulated += payload.text;
                setStreamingText(accumulated);
              } else if (payload.type === "done") {
                // Report saved on server — set it locally
                setReport({
                  id: payload.reportId,
                  propertyId,
                  reportType,
                  aiDraftContent: accumulated,
                  finalContent: null,
                  eSignatureText: null,
                  certifiedAt: null,
                  status: "draft",
                  permitStatus: null,
                  submittedAt: null,
                  submittedTo: null,
                  reviewerName: null,
                  reviewerNotes: null,
                  conditionsOfApproval: null,
                  denialReason: null,
                  approvedAt: null,
                  permitExpiresAt: null,
                });
                setContent(accumulated);
                savedContentRef.current = accumulated;
                setPreviewHtml(renderMarkdownToHtml(accumulated));
                setViewMode("split");
              } else if (payload.type === "error") {
                throw new Error(payload.error || "Streaming error");
              }
            } catch (parseErr) {
              // Skip malformed SSE lines
              if (parseErr instanceof Error && parseErr.message !== "Streaming error") continue;
              throw parseErr;
            }
          }
        }
      } else {
        // Non-streaming JSON path (mock fallback)
        const newReport = await res.json();
        setReport(newReport);
        const c = newReport.aiDraftContent || "";
        setContent(c);
        savedContentRef.current = c;
        setPreviewHtml(renderMarkdownToHtml(c));
        setViewMode("split");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
      setStreamingText("");
    }
  };

  const regenerateReport = () => {
    if (
      !window.confirm(
        "Regenerating will replace the current AI draft. Your edits will be lost. Continue?"
      )
    )
      return;
    generateReport();
  };

  // -------------------------------------------------------------------------
  // Certify report
  // -------------------------------------------------------------------------

  const certifyReport = async () => {
    if (!report || !signatureText.trim() || !certifyAgreed) return;
    setCertifying(true);
    try {
      // Save content first
      await fetch(`/api/reports/${report.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalContent: content, status: "review" }),
      });

      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eSignatureText: signatureText.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        if (errData?.validation) {
          setValidationResult(errData.validation);
        }
        throw new Error(errData?.error || "Failed to certify");
      }
      const updated = await res.json();
      setReport(updated);
      setCertifySuccess(true);
      savedContentRef.current = content;
      setHasUnsavedChanges(false);
      // Auto-close after 3 seconds
      setTimeout(() => {
        setShowCertifyPanel(false);
        setViewMode("preview");
        setCertifySuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Certification failed");
    } finally {
      setCertifying(false);
    }
  };

  // -------------------------------------------------------------------------
  // Unlock (uncertify) report
  // -------------------------------------------------------------------------

  const unlockReport = async () => {
    if (
      !window.confirm(
        "Unlocking will revert the report to review status. The certification will be removed. Continue?"
      )
    )
      return;

    if (!report) return;
    setUnlocking(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/certify`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to unlock");
      const updated = await res.json();
      setReport(updated);
      setViewMode("split");
      setSignatureText("");
      setCertifyAgreed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unlock failed");
    } finally {
      setUnlocking(false);
    }
  };

  // -------------------------------------------------------------------------
  // Open delivery dialog (pre-fill from property data)
  // -------------------------------------------------------------------------

  const openDeliveryDialog = useCallback(() => {
    if (!property || !report) return;
    const reportLabel =
      getReportTypeConfig(report.reportType)?.label ||
      report.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    setRecipientEmail(property.homeownerEmail || "");
    setEmailSubject(
      `${reportLabel} — ${property.address}, ${property.city}`
    );
    setEmailBody(
      `Dear ${property.homeownerName || "Client"},\n\nPlease find attached the ${reportLabel} for the property at ${property.address}, ${property.city}.\n\nIf you have any questions regarding this report, please don't hesitate to contact me.\n\nBest regards`
    );
    setShowDeliveryDialog(true);
  }, [property, report]);

  // -------------------------------------------------------------------------
  // Version History
  // -------------------------------------------------------------------------

  const loadVersions = useCallback(async () => {
    if (!report) return;
    setVersionsLoading(true);
    try {
      const res = await fetch(`/api/reports/${report.id}/versions`);
      if (res.ok) {
        const data = await res.json();
        setVersions(data);
      }
    } catch {
      // Best-effort
    } finally {
      setVersionsLoading(false);
    }
  }, [report]);

  const openVersionHistory = useCallback(() => {
    setShowVersionHistory(true);
    loadVersions();
  }, [loadVersions]);

  const restoreVersion = useCallback(
    async (version: ReportVersionItem) => {
      if (!report) return;
      setRestoring(true);
      try {
        const res = await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            finalContent: version.content,
            status: report.status === "draft" ? "review" : report.status,
          }),
        });
        if (!res.ok) throw new Error("Failed to restore");
        const updated = await res.json();
        setReport(updated);
        setContent(version.content);
        savedContentRef.current = version.content;
        setHasUnsavedChanges(false);
        setPreviewHtml(renderMarkdownToHtml(version.content));
        setShowVersionPreview(false);
        setPreviewVersion(null);
        setShowVersionHistory(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Restore failed");
      } finally {
        setRestoring(false);
      }
    },
    [report]
  );

  // -------------------------------------------------------------------------
  // Update report options (PDF appendix toggles)
  // -------------------------------------------------------------------------

  const updateReportOptions = useCallback(
    async (partial: Partial<ReportOptions>) => {
      if (!report) return;
      const updated = { ...reportOptions, ...partial };
      setReportOptions(updated);
      try {
        await fetch(`/api/reports/${report.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reportOptions: JSON.stringify(updated) }),
        });
      } catch {
        // Silently fail — options saved next time report is saved
      }
    },
    [report, reportOptions]
  );

  // -------------------------------------------------------------------------
  // Section nav click — scroll preview to heading
  // -------------------------------------------------------------------------

  const scrollToSection = (sectionId: string) => {
    if (previewRef.current) {
      const heading = previewRef.current.querySelector(
        `[data-section-id="${sectionId}"]`
      );
      if (heading) {
        heading.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // -------------------------------------------------------------------------
  // Render: Loading
  // -------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        Property not found
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: No report yet — generate UI
  // -------------------------------------------------------------------------

  if (!report) {
    return (
      <div>
        <Link
          href={`/properties/${propertyId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Property
        </Link>

        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-bold">Generate AI Report</h2>
                <p className="text-muted-foreground mt-1">
                  {property.address}, {property.city}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Report Type:</span>
                <Badge variant="outline">
                  {getReportTypeConfig(reportType)?.label ||
                    reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800">
                <p className="font-medium mb-2">
                  The AI will generate a comprehensive report including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Scope of Assignment &amp; Site Observations</li>
                  <li>
                    Tree Inventory table ({property.trees.length} trees)
                  </li>
                  <li>Individual Tree Assessments</li>
                  <li>Recommendations &amp; Mitigation</li>
                  <li>Arborist Certification Statement</li>
                </ul>
              </div>

              <Button
                onClick={handleGenerateClick}
                disabled={generating || property.trees.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Draft
                  </>
                )}
              </Button>

              {property.trees.length === 0 && (
                <p className="text-sm text-amber-600 text-center">
                  Add at least one tree before generating a report.
                </p>
              )}

              {/* Data Quality Check Dialog */}
              {showQualityDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="w-full max-w-lg mx-4">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold">Ready to Generate Report</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Property:</span> {property.address}, {property.city}</p>
                        <p><span className="font-medium text-foreground">Report Type:</span> {getReportTypeConfig(reportType)?.label || reportType}</p>
                        <p><span className="font-medium text-foreground">Trees:</span> {property.trees.length} assessed</p>
                      </div>

                      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                          <AlertTriangle className="h-4 w-4" />
                          Data Quality Notes
                        </div>
                        <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                          {qualityWarnings.map((w, i) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        The AI will fill in missing details with professional language, but the report will be stronger with complete field data.
                      </p>

                      <div className="flex gap-3 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setShowQualityDialog(false)}
                        >
                          Go Back and Complete
                        </Button>
                        <Button
                          onClick={() => {
                            setShowQualityDialog(false);
                            generateReport();
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Anyway
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Streaming Progress Modal */}
              {generating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <Card className="w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1 overflow-hidden gap-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold">Generating Report</h3>
                          <p className="text-sm text-muted-foreground">
                            AI is writing your {getReportTypeConfig(reportType)?.label || "report"}...
                          </p>
                        </div>
                      </div>
                      {streamingText ? (
                        <ScrollArea className="flex-1 min-h-0 rounded-lg border bg-muted/30">
                          <div
                            className="p-4 prose prose-sm max-w-none dark:prose-invert text-sm"
                            dangerouslySetInnerHTML={{
                              __html: renderMarkdownToHtml(streamingText),
                            }}
                          />
                        </ScrollArea>
                      ) : (
                        <div className="flex-1 flex items-center justify-center rounded-lg border bg-muted/30 min-h-[200px]">
                          <div className="text-center text-muted-foreground">
                            <Sparkles className="h-8 w-8 mx-auto mb-2 text-blue-400 animate-pulse" />
                            <p className="text-sm">Preparing report structure...</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {streamingText
                            ? `${streamingText.split(/\s+/).length} words generated`
                            : "Connecting to AI..."}
                        </span>
                        <span>This may take 30–60 seconds</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Render: Report exists — editor / preview
  // -------------------------------------------------------------------------

  const signatureNameMatch =
    arborist?.signatureName &&
    signatureText.trim().toLowerCase() ===
      arborist.signatureName.trim().toLowerCase();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* ---- Header Bar ---- */}
      <div className="flex-none border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/properties/${propertyId}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Report Editor</h1>
                <StatusBadge status={report.status} />
                <Badge variant="outline" className="text-xs">
                  {getReportTypeConfig(report.reportType)?.label ||
                    report.reportType
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span>
                  {property.address}, {property.city}
                </span>
                {lastSaved && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Saved {timeAgo(lastSaved)}
                  </span>
                )}
                {hasUnsavedChanges && (
                  <span className="text-amber-600 font-medium">
                    Unsaved changes
                  </span>
                )}
                {reportCost != null && reportCost > 0 && (
                  <span className="flex items-center gap-1 text-gray-400" title="Estimated API cost for this report">
                    <Sparkles className="h-3 w-3" />
                    API: ${reportCost.toFixed(3)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Edit actions */}
            {!isCertified && (
              <>
                {/* View mode toggle: Edit / Split / Preview */}
                <div className="flex rounded-lg border bg-muted p-0.5">
                  <button
                    onClick={() => setViewMode("edit")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "edit"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setViewMode("split")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "split"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Split
                  </button>
                  <button
                    onClick={() => setViewMode("preview")}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      viewMode === "preview"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                </div>

                {/* Report Options (PDF appendix toggles) */}
                {(reportType === "health_assessment" || reportType === "removal_permit" || reportType === "tree_valuation" || reportType === "construction_encroachment") && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings2 className="h-3.5 w-3.5 mr-1.5" />
                        Report Options
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72" align="end">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">PDF Appendices</h4>
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">TRAQ Risk Assessment Forms</p>
                            <p className="text-xs text-muted-foreground">ISA Level 2 Basic Assessment per tree</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeTraq ?? (reportType === "health_assessment")}
                            onCheckedChange={(checked) => updateReportOptions({ includeTraq: checked })}
                          />
                        </label>
                        {reportType === "removal_permit" && (
                          <label className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium">Permit Cover Letter</p>
                              <p className="text-xs text-muted-foreground">Auto-generated letter to city</p>
                            </div>
                            <Switch
                              checked={reportOptions.includeCoverLetter ?? true}
                              onCheckedChange={(checked) => updateReportOptions({ includeCoverLetter: checked })}
                            />
                          </label>
                        )}
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">Mitigation Summary</p>
                            <p className="text-xs text-muted-foreground">Auto-calculated replacement requirements</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeMitigation ?? true}
                            onCheckedChange={(checked) => updateReportOptions({ includeMitigation: checked })}
                          />
                        </label>
                        <label className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">Site Map</p>
                            <p className="text-xs text-muted-foreground">Satellite map with tree pins</p>
                          </div>
                          <Switch
                            checked={reportOptions.includeSiteMap ?? true}
                            onCheckedChange={(checked) => updateReportOptions({ includeSiteMap: checked })}
                          />
                        </label>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* Regenerate */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerateReport}
                  disabled={generating}
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 mr-1.5 ${generating ? "animate-spin" : ""}`}
                  />
                  Regenerate
                </Button>

                {/* Save */}
                {(viewMode === "edit" || viewMode === "split") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => saveReport(false)}
                    disabled={saving || !hasUnsavedChanges}
                  >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    {saving ? "Saving..." : "Save"}
                  </Button>
                )}

                {/* Validation status indicator */}
                {validationResult && !validationLoading && (
                  <span className="text-xs flex items-center gap-1">
                    {validationResult.hasFailures ? (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-red-600">
                          {validationResult.checks.filter((c) => c.status === "fail").length} issue{validationResult.checks.filter((c) => c.status === "fail").length !== 1 ? "s" : ""}
                        </span>
                      </>
                    ) : validationResult.hasWarnings ? (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600">
                          {validationResult.checks.filter((c) => c.status === "warning").length} warning{validationResult.checks.filter((c) => c.status === "warning").length !== 1 ? "s" : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Ready</span>
                      </>
                    )}
                  </span>
                )}

                {/* Certify */}
                <Button
                  size="sm"
                  className="bg-emerald-700 hover:bg-emerald-600"
                  onClick={() => {
                    setCertifyStep(1);
                    setReviewChecked(false);
                    setCertifyAgreed(false);
                    setSignatureText("");
                    setCertifySuccess(false);
                    setWarningsAcknowledged(false);
                    if (report) fetchValidation(report.id);
                    setShowCertifyPanel(true);
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Certify
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Certified actions */}
            {isCertified && (
              <>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={openDeliveryDialog}
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Send Report
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={unlockReport}
                  disabled={unlocking}
                >
                  <Unlock className="h-3.5 w-3.5 mr-1.5" />
                  {unlocking ? "Unlocking..." : "Unlock & Revise"}
                </Button>

                <Separator orientation="vertical" className="h-6" />
              </>
            )}

            {/* Version History */}
            <Button
              variant="outline"
              size="sm"
              onClick={openVersionHistory}
            >
              <History className="h-3.5 w-3.5 mr-1.5" />
              Versions
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Export actions — always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/reports/${report.id}/pdf`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/reports/${report.id}/word`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
              Word
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const pdfUrl = `/api/reports/${report.id}/pdf`;
                if (navigator.share) {
                  try {
                    const res = await fetch(pdfUrl);
                    const blob = await res.blob();
                    const file = new File(
                      [blob],
                      `report-${report.id}.pdf`,
                      { type: "application/pdf" }
                    );
                    await navigator.share({
                      title: `Tree Report — ${property?.address ?? ""}`,
                      files: [file],
                    });
                  } catch {
                    // User cancelled or share failed — silent
                  }
                } else {
                  const a = document.createElement("a");
                  a.href = pdfUrl;
                  a.download = "";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              }}
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* ---- Error Bar ---- */}
      {error && (
        <div className="flex-none border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ---- Main Content ---- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Section Navigation Sidebar */}
        {sections.length > 0 && showSectionNav && (viewMode === "edit" || viewMode === "split") && (
          <div className="flex-none w-48 border-r bg-muted/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sections
              </span>
              <button
                onClick={() => setShowSectionNav(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-0.5">
                {sections.map((section, idx) => (
                  <button
                    key={`${section.id}-${idx}`}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left text-xs px-2 py-1.5 rounded hover:bg-accent transition-colors truncate ${
                      section.level === 1
                        ? "font-semibold"
                        : section.level === 2
                          ? "pl-4 text-muted-foreground"
                          : "pl-6 text-muted-foreground/70"
                    }`}
                    title={section.title}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Toggle section nav when hidden */}
        {!showSectionNav && (viewMode === "edit" || viewMode === "split") && sections.length > 0 && (
          <button
            onClick={() => setShowSectionNav(true)}
            className="flex-none w-8 border-r bg-muted/30 flex items-center justify-center hover:bg-muted transition-colors"
            title="Show section navigation"
          >
            <List className="h-4 w-4 text-muted-foreground" />
          </button>
        )}

        {/* Editor + Preview layout based on viewMode */}
        {(viewMode === "edit" || viewMode === "split") && !isCertified ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Markdown Editor — full width in edit mode, 35% in split */}
            {(viewMode === "edit" || viewMode === "split") && (
              <div className={`flex flex-col border-r ${viewMode === "split" ? "w-[35%]" : "flex-1"}`}>
                <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                  <Pencil className="h-3 w-3" />
                  Markdown Editor
                  {viewMode === "edit" && (
                    <span className="ml-auto">
                      Use # headings, **bold**, *italic*, - lists, | tables |
                    </span>
                  )}
                </div>
                <textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="flex-1 resize-none border-0 bg-background p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Live Preview — 65% in split mode */}
            {viewMode === "split" && (
            <div className="w-[65%] flex flex-col overflow-hidden">
              <div className="flex-none px-3 py-1.5 border-b bg-muted/30 text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="h-3 w-3" />
                Live Preview
              </div>
              <ScrollArea className="flex-1">
                <div
                  ref={previewRef}
                  className="p-6 prose prose-sm max-w-none dark:prose-invert report-live-preview"
                >
                  <style>{`
                    .report-live-preview h1,
                    .report-live-preview h2,
                    .report-live-preview h3 {
                      color: #2d5016;
                      scroll-margin-top: 16px;
                    }
                    .dark .report-live-preview h1,
                    .dark .report-live-preview h2,
                    .dark .report-live-preview h3 {
                      color: #6fcf3b;
                    }
                    .report-live-preview table {
                      width: 100%;
                      border-collapse: collapse;
                      font-size: 0.8rem;
                    }
                    .report-live-preview table th {
                      background: #2d5016;
                      color: white;
                      padding: 4px 8px;
                      text-align: left;
                    }
                    .dark .report-live-preview table th {
                      background: #1a3a0a;
                    }
                    .report-live-preview table td {
                      padding: 4px 8px;
                      border: 1px solid #ddd;
                    }
                    .dark .report-live-preview table td {
                      border-color: #3f3f46;
                    }
                    .report-live-preview table tr:nth-child(even) {
                      background: #f9f9f6;
                    }
                    .dark .report-live-preview table tr:nth-child(even) {
                      background: #18181b;
                    }
                    .report-live-preview hr {
                      border: none;
                      border-top: 1px solid #ddd;
                      margin: 16px 0;
                    }
                  `}</style>
                  <div
                    dangerouslySetInnerHTML={{ __html: addSectionIds(previewHtml) }}
                  />
                </div>
              </ScrollArea>
            </div>
            )}
          </div>
        ) : (
          /* Full Preview Mode (or certified read-only) */
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="max-w-4xl mx-auto py-6 px-4">
                {isCertified && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 mb-4">
                    <Lock className="h-4 w-4 shrink-0" />
                    This report has been certified and is locked. Use
                    &ldquo;Unlock &amp; Revise&rdquo; to make changes.
                  </div>
                )}
                {isCertified && report && (
                  <PermitStatusPipeline
                    permitStatus={report.permitStatus}
                    submittedAt={report.submittedAt}
                    submittedTo={report.submittedTo}
                    reviewerName={report.reviewerName}
                    reviewerNotes={report.reviewerNotes}
                    conditionsOfApproval={report.conditionsOfApproval}
                    denialReason={report.denialReason}
                    approvedAt={report.approvedAt}
                    permitExpiresAt={report.permitExpiresAt}
                    certifiedAt={report.certifiedAt}
                    mode="interactive"
                    onUpdatePermitStatus={updatePermitStatus}
                  />
                )}
                <ReportPreview
                  content={content}
                  property={property}
                  trees={property.trees}
                  arborist={arborist}
                  reportType={report.reportType}
                  certifiedAt={report.certifiedAt}
                  eSignatureText={report.eSignatureText}
                />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* ---- Certification Ceremony Dialog ---- */}
      {showCertifyPanel && !isCertified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg mx-4">
            <CardContent className="p-6 space-y-4">
              {/* Success state */}
              {certifySuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800">Report Certified</h3>
                  <p className="text-sm text-muted-foreground">
                    Your report has been certified and locked. You can now download or share it.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header with step indicator */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-700" />
                      Certify Report
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCertifyPanel(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Step indicator */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            certifyStep >= step
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step}
                        </div>
                        <span className={`text-xs font-medium ${certifyStep >= step ? "text-foreground" : "text-muted-foreground"}`}>
                          {step === 1 ? "Review" : step === 2 ? "Attest" : "Sign"}
                        </span>
                        {step < 3 && <div className={`flex-1 h-0.5 ${certifyStep > step ? "bg-emerald-600" : "bg-gray-200"}`} />}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Review + Validation Checklist */}
                  {certifyStep === 1 && (
                    <div className="space-y-3">
                      <div className="rounded-lg border p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property</span>
                          <span className="font-medium">{property?.address}, {property?.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Report Type</span>
                          <span className="font-medium">
                            {getReportTypeConfig(reportType)?.label || reportType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trees Assessed</span>
                          <span className="font-medium">{property?.trees.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Arborist</span>
                          <span className="font-medium">{arborist?.name} (ISA #{arborist?.isaCertificationNum})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      </div>

                      {/* Validation Checklist */}
                      {validationLoading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground p-3">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Running quality checks...
                        </div>
                      ) : validationResult ? (
                        <div className="rounded-lg border p-3 space-y-1.5">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Quality Checklist
                            </span>
                            {validationResult.allPassed && (
                              <Badge className="ml-auto bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px]">All passed</Badge>
                            )}
                          </div>
                          {/* Failures first */}
                          {validationResult.checks
                            .filter((c) => c.status === "fail")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md bg-red-50 border border-red-100">
                                <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-red-800">{check.label}</span>
                                  <p className="text-xs text-red-600">{check.message}</p>
                                </div>
                                {check.fixPath && (
                                  <Link href={check.fixPath} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-0.5 shrink-0">
                                    Fix <ExternalLink className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          {/* Warnings */}
                          {validationResult.checks
                            .filter((c) => c.status === "warning")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md bg-amber-50 border border-amber-100">
                                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-amber-800">{check.label}</span>
                                  <p className="text-xs text-amber-600">{check.message}</p>
                                </div>
                                {check.fixPath && (
                                  <Link href={check.fixPath} className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-0.5 shrink-0">
                                    Fix <ExternalLink className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          {/* Passes */}
                          {validationResult.checks
                            .filter((c) => c.status === "pass")
                            .map((check) => (
                              <div key={check.id} className="flex items-start gap-2 text-sm p-2 rounded-md">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-muted-foreground">{check.label}</span>
                                  <p className="text-xs text-muted-foreground/70">{check.message}</p>
                                </div>
                              </div>
                            ))}

                          {/* Blocking failures message */}
                          {validationResult.hasFailures && (
                            <p className="text-xs text-red-600 font-medium pt-1">
                              Resolve required items before certifying
                            </p>
                          )}

                          {/* Warning acknowledgement checkbox */}
                          {!validationResult.hasFailures && validationResult.hasWarnings && (
                            <label className="flex items-start gap-2 text-sm cursor-pointer p-2 rounded-md border border-amber-200 bg-amber-50/50 mt-1">
                              <input
                                type="checkbox"
                                checked={warningsAcknowledged}
                                onChange={(e) => setWarningsAcknowledged(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                              />
                              <span className="text-amber-800">
                                I have reviewed these items and confirm this report is ready for certification
                              </span>
                            </label>
                          )}
                        </div>
                      ) : null}

                      <label className="flex items-start gap-2 text-sm cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={reviewChecked}
                          onChange={(e) => setReviewChecked(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>I have reviewed the report content and all tree data is accurate.</span>
                      </label>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => setCertifyStep(2)}
                          disabled={
                            !reviewChecked ||
                            (validationResult?.hasFailures ?? false) ||
                            (validationResult?.hasWarnings && !warningsAcknowledged)
                          }
                          className="bg-emerald-700 hover:bg-emerald-600"
                        >
                          Next: Attestation
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Attestation */}
                  {certifyStep === 2 && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm leading-relaxed">
                        <p className="font-semibold text-emerald-900 mb-2">Professional Certification Statement</p>
                        <p className="text-emerald-800">
                          I certify that I have personally inspected the tree(s) described in this report and
                          that the information contained herein is accurate to the best of my professional
                          knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are
                          based on my professional training, experience, and education. This report was
                          prepared in accordance with ISA standards and accepted arboricultural practices.
                        </p>
                      </div>

                      <label className="flex items-start gap-2 text-sm cursor-pointer p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={certifyAgreed}
                          onChange={(e) => setCertifyAgreed(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>I agree to the above certification statement and confirm all information is accurate.</span>
                      </label>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCertifyStep(1)}>
                          Back
                        </Button>
                        <Button
                          onClick={() => setCertifyStep(3)}
                          disabled={!certifyAgreed}
                          className="bg-emerald-700 hover:bg-emerald-600"
                        >
                          Next: Sign
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Electronic Signature */}
                  {certifyStep === 3 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Electronic Signature
                          {arborist?.signatureName && (
                            <span className="text-muted-foreground font-normal ml-1">
                              (type: {arborist.signatureName})
                            </span>
                          )}
                        </label>
                        <Input
                          placeholder="Type your full name"
                          value={signatureText}
                          onChange={(e) => setSignatureText(e.target.value)}
                          className={`text-lg ${
                            signatureText.trim() &&
                            arborist?.signatureName &&
                            !signatureNameMatch
                              ? "border-amber-300 focus-visible:ring-amber-400"
                              : ""
                          }`}
                          autoFocus
                        />
                        {signatureText.trim() &&
                          arborist?.signatureName &&
                          !signatureNameMatch && (
                            <p className="text-xs text-amber-600 mt-1">
                              Must match: {arborist.signatureName}
                            </p>
                          )}
                      </div>

                      {/* Signature preview */}
                      {signatureText.trim() && (
                        <div className="p-4 rounded-lg border bg-white text-center">
                          <p className="text-2xl italic text-gray-800" style={{ fontFamily: "Georgia, serif" }}>
                            {signatureText}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCertifyStep(2)}>
                          Back
                        </Button>
                        <Button
                          onClick={certifyReport}
                          disabled={
                            !signatureText.trim() ||
                            !certifyAgreed ||
                            certifying ||
                            (arborist?.signatureName ? !signatureNameMatch : false)
                          }
                          className="bg-emerald-700 hover:bg-emerald-600"
                        >
                          {certifying ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Certifying...
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Certify &amp; Lock Report
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- Certified details bar ---- */}
      {isCertified && report && (
        <div className="flex-none border-t bg-emerald-50/50 dark:bg-emerald-950/10 px-6 py-3">
          <div className="flex items-center gap-4 text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            <span className="font-medium text-emerald-800">
              Certified
            </span>
            <span className="text-muted-foreground">
              Signed by {report.eSignatureText}
            </span>
            {report.certifiedAt && (
              <span className="text-muted-foreground">
                on{" "}
                {new Date(report.certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ---- Streaming Progress Modal (regeneration) ---- */}
      {generating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
            <CardContent className="p-6 flex flex-col flex-1 overflow-hidden gap-4">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Regenerating Report</h3>
                  <p className="text-sm text-muted-foreground">
                    AI is rewriting your {getReportTypeConfig(reportType)?.label || "report"}...
                  </p>
                </div>
              </div>
              {streamingText ? (
                <ScrollArea className="flex-1 min-h-0 rounded-lg border bg-muted/30">
                  <div
                    className="p-4 prose prose-sm max-w-none dark:prose-invert text-sm"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdownToHtml(streamingText),
                    }}
                  />
                </ScrollArea>
              ) : (
                <div className="flex-1 flex items-center justify-center rounded-lg border bg-muted/30 min-h-[200px]">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-blue-400 animate-pulse" />
                    <p className="text-sm">Preparing report structure...</p>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {streamingText
                    ? `${streamingText.split(/\s+/).length} words generated`
                    : "Connecting to AI..."}
                </span>
                <span>This may take 30–60 seconds</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ---- Delivery Dialog ---- */}
      {showDeliveryDialog && report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg mx-4">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  Send Report
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowDeliveryDialog(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-email" className="text-sm">Recipient Email</Label>
                  <Input
                    id="delivery-email"
                    type="email"
                    placeholder="client@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-subject" className="text-sm">Subject</Label>
                  <Input
                    id="delivery-subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="delivery-body" className="text-sm">Message</Label>
                  <Textarea
                    id="delivery-body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={5}
                    className="text-sm"
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This will open your email client with the message pre-filled. Download the PDF first, then attach it to the email.
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Download PDF
                    const a = document.createElement("a");
                    a.href = `/api/reports/${report.id}/pdf`;
                    a.download = "";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    const subject = encodeURIComponent(emailSubject);
                    const body = encodeURIComponent(emailBody);
                    const mailto = `mailto:${encodeURIComponent(recipientEmail)}?subject=${subject}&body=${body}`;
                    window.open(mailto, "_blank");
                    setShowDeliveryDialog(false);
                  }}
                  disabled={!recipientEmail.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Open Email Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* ---- Version History Sheet ---- */}
      <Sheet open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <SheetContent className="w-[400px] sm:w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Version History
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {versionsLoading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading versions...
              </div>
            ) : versions.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                No versions yet. Versions are created automatically when you save edits.
              </p>
            ) : (
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="space-y-2 pr-4">
                  {versions.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setPreviewVersion(v);
                        setShowVersionPreview(true);
                      }}
                      className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          variant={
                            v.label === "AI Draft"
                              ? "default"
                              : v.label === "Pre-certification"
                              ? "secondary"
                              : v.label.startsWith("Restored")
                              ? "outline"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {v.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(new Date(v.createdAt))}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {v.content.replace(/[#*_\-|>]/g, "").slice(0, 120)}...
                      </p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* ---- Version Preview Dialog ---- */}
      <Dialog open={showVersionPreview} onOpenChange={setShowVersionPreview}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewVersion?.label}
              <span className="text-sm font-normal text-muted-foreground">
                {previewVersion && timeAgo(new Date(previewVersion.createdAt))}
              </span>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-2 border rounded-md">
            <div
              className="prose prose-sm max-w-none p-6"
              dangerouslySetInnerHTML={{
                __html: previewVersion
                  ? renderMarkdownToHtml(previewVersion.content)
                  : "",
              }}
            />
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowVersionPreview(false)}
            >
              Close
            </Button>
            {!isCertified && (
              <Button
                onClick={() => {
                  if (
                    previewVersion &&
                    window.confirm(
                      `Restore this version? Your current content will be replaced with the "${previewVersion.label}" version.`
                    )
                  ) {
                    restoreVersion(previewVersion);
                  }
                }}
                disabled={restoring}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                {restoring ? "Restoring..." : "Restore this version"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Adds data-section-id attributes to headings in HTML for section nav scrolling
// ---------------------------------------------------------------------------

function addSectionIds(html: string): string {
  return html.replace(
    /<(h[1-3])>(.*?)<\/h[1-3]>/g,
    (match, tag, content) => {
      const text = content.replace(/<[^>]+>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `<${tag} data-section-id="${id}">${content}</${tag}>`;
    }
  );
}
```

### app/(app)/settings/page.tsx

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Save,
  Upload,
  Trash2,
  Building2,
  User,
  Globe,
  ImageIcon,
  FileText,
  X,
  Camera,
  DollarSign,
  Sparkles,
  Mic,
  Cpu,
} from "lucide-react";

interface ArboristProfile {
  id: string;
  name: string;
  email: string;
  isaCertificationNum: string;
  companyName: string | null;
  phone: string | null;
  companyLogoUrl: string | null;
  companyAddress: string | null;
  companyPhone: string | null;
  companyEmail: string | null;
  companyWebsite: string | null;
  licenseNumbers: string | null;
  signatureName: string | null;
  traqCertified: boolean;
  additionalCerts: string | null;
  reportDefaults?: string | null;
  profilePhotoUrl?: string | null;
}

interface ReportDefaults {
  includeTraq: boolean;
  includeCoverLetter: boolean;
  includePhotos: boolean;
  includeAppendix: boolean;
  defaultReportType: string;
  companyDisclaimer: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ArboristProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Usage data state
  interface UsageData {
    monthly: {
      cost: number;
      inputTokens: number;
      outputTokens: number;
      callCount: number;
      reportCount: number;
      avgCostPerReport: number;
      byEndpoint: Record<string, { count: number; cost: number }>;
    };
    allTime: {
      cost: number;
      callCount: number;
      inputTokens: number;
      outputTokens: number;
    };
  }
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [usageLoading, setUsageLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    isaCertificationNum: "",
    companyName: "",
    phone: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    licenseNumbers: "",
    signatureName: "",
    traqCertified: false,
    additionalCerts: "",
  });

  const defaultReportDefaults: ReportDefaults = {
    includeTraq: true,
    includeCoverLetter: true,
    includePhotos: true,
    includeAppendix: true,
    defaultReportType: "health_assessment",
    companyDisclaimer: "",
  };

  const [reportDefaults, setReportDefaults] = useState<ReportDefaults>(defaultReportDefaults);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/arborist/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data: ArboristProfile = await res.json();
        setProfile(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          isaCertificationNum: data.isaCertificationNum || "",
          companyName: data.companyName || "",
          phone: data.phone || "",
          companyAddress: data.companyAddress || "",
          companyPhone: data.companyPhone || "",
          companyEmail: data.companyEmail || "",
          companyWebsite: data.companyWebsite || "",
          licenseNumbers: data.licenseNumbers || "",
          signatureName: data.signatureName || "",
          traqCertified: data.traqCertified ?? false,
          additionalCerts: data.additionalCerts || "",
        });
        // Parse report defaults
        try {
          const parsed = JSON.parse(data.reportDefaults || "{}");
          setReportDefaults({
            includeTraq: parsed.includeTraq ?? true,
            includeCoverLetter: parsed.includeCoverLetter ?? true,
            includePhotos: parsed.includePhotos ?? true,
            includeAppendix: parsed.includeAppendix ?? true,
            defaultReportType: parsed.defaultReportType || "health_assessment",
            companyDisclaimer: parsed.companyDisclaimer || "",
          });
        } catch {
          // Use defaults if parsing fails
        }
      } catch (err) {
        setMessage({
          type: "error",
          text: err instanceof Error ? err.message : "Failed to load",
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Load usage data
  useEffect(() => {
    async function loadUsage() {
      setUsageLoading(true);
      try {
        const res = await fetch("/api/arborist/usage");
        if (res.ok) {
          setUsageData(await res.json());
        }
      } catch {
        // Non-critical — silently fail
      } finally {
        setUsageLoading(false);
      }
    }
    loadUsage();
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          reportDefaults: JSON.stringify(reportDefaults),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const updated = await res.json();
      setProfile(updated);
      setMessage({ type: "success", text: "Profile saved successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/arborist/logo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: data.companyLogoUrl } : prev
      );
      setMessage({ type: "success", text: "Logo uploaded successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteLogo = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/logo", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProfile((prev) =>
        prev ? { ...prev, companyLogoUrl: null } : prev
      );
      setMessage({ type: "success", text: "Logo removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  const uploadPhoto = async (file: File) => {
    setUploadingPhoto(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/arborist/photo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setProfile((prev) =>
        prev ? { ...prev, profilePhotoUrl: data.url } : prev
      );
      setMessage({ type: "success", text: "Profile photo uploaded successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const deletePhoto = async () => {
    setMessage(null);
    try {
      const res = await fetch("/api/arborist/photo", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProfile((prev) =>
        prev ? { ...prev, profilePhotoUrl: null } : prev
      );
      setMessage({ type: "success", text: "Profile photo removed" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your arborist profile and company branding
      </p>

      {message && (
        <div
          className={`rounded-lg border p-3 text-sm mb-6 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Photo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="h-5 w-5 text-emerald-600" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                {profile?.profilePhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profilePhotoUrl}
                    alt="Profile photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                )}
              </div>
              {profile?.profilePhotoUrl && (
                <button
                  onClick={deletePhoto}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  title="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                ref={photoInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadPhoto(file);
                  e.target.value = "";
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => photoInputRef.current?.click()}
                disabled={uploadingPhoto}
              >
                {uploadingPhoto ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-1.5" />
                )}
                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Square image recommended &bull; Max 10 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Logo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-5 w-5 text-emerald-600" />
            Company Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-hidden shrink-0">
              {profile?.companyLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.companyLogoUrl}
                  alt="Company logo"
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <Building2 className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadLogo(file);
                  e.target.value = "";
                }}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-1.5" />
                  )}
                  {uploading ? "Uploading..." : "Upload Logo"}
                </Button>
                {profile?.companyLogoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteLogo}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP, or SVG &bull; Max 10 MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arborist Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5 text-emerald-600" />
            Arborist Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ISA Certification #</Label>
              <Input
                value={form.isaCertificationNum}
                onChange={(e) =>
                  updateField("isaCertificationNum", e.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>License Numbers</Label>
              <Input
                placeholder="e.g., CA-QCLP #1234"
                value={form.licenseNumbers}
                onChange={(e) => updateField("licenseNumbers", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Signature Name (for certifications)</Label>
            <Input
              placeholder="e.g., Alex Rivera, ISA Board Certified Master Arborist"
              value={form.signatureName}
              onChange={(e) => updateField("signatureName", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="traq-certified"
              checked={form.traqCertified}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, traqCertified: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <Label htmlFor="traq-certified" className="cursor-pointer">
              TRAQ Qualified (ISA Tree Risk Assessment Qualification)
            </Label>
          </div>
          <div>
            <Label>Additional Certifications</Label>
            <Input
              placeholder="e.g., BCMA, Utility Specialist, Municipal Specialist"
              value={form.additionalCerts}
              onChange={(e) => updateField("additionalCerts", e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated list of additional ISA or industry certifications
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-5 w-5 text-emerald-600" />
            Company Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
              placeholder="123 Main St, City, CA 94000"
              value={form.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.companyEmail}
                onChange={(e) => updateField("companyEmail", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                placeholder="https://example.com"
                value={form.companyWebsite}
                onChange={(e) => updateField("companyWebsite", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Defaults */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5 text-emerald-600" />
            Report Defaults
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Toggle switches */}
          <div className="space-y-3">
            {[
              { key: "includeTraq" as const, label: "Include TRAQ Assessment" },
              { key: "includeCoverLetter" as const, label: "Include Cover Letter" },
              { key: "includePhotos" as const, label: "Include Photo Appendix" },
              { key: "includeAppendix" as const, label: "Include Tree Data Appendix" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="cursor-pointer" htmlFor={`rd-${key}`}>
                  {label}
                </Label>
                <button
                  id={`rd-${key}`}
                  type="button"
                  role="switch"
                  aria-checked={reportDefaults[key]}
                  onClick={() =>
                    setReportDefaults((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                    reportDefaults[key] ? "bg-emerald-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
                      reportDefaults[key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Default report type */}
          <div>
            <Label htmlFor="default-report-type">Default Report Type</Label>
            <select
              id="default-report-type"
              value={reportDefaults.defaultReportType}
              onChange={(e) =>
                setReportDefaults((prev) => ({
                  ...prev,
                  defaultReportType: e.target.value,
                }))
              }
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="health_assessment">Health Assessment</option>
              <option value="removal_permit">Removal Permit</option>
              <option value="tree_valuation">Tree Valuation</option>
              <option value="construction_encroachment">Construction &amp; Encroachment</option>
            </select>
          </div>

          {/* Company disclaimer */}
          <div>
            <Label htmlFor="company-disclaimer">Company Disclaimer</Label>
            <textarea
              id="company-disclaimer"
              rows={3}
              placeholder="Optional disclaimer text to appear in report footers..."
              value={reportDefaults.companyDisclaimer}
              onChange={(e) =>
                setReportDefaults((prev) => ({
                  ...prev,
                  companyDisclaimer: e.target.value,
                }))
              }
              className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text will appear as a footer disclaimer on generated reports
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <Button
          onClick={saveProfile}
          disabled={saving}
          className="bg-emerald-700 hover:bg-emerald-600"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      {/* Usage & Costs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Usage &amp; Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usageLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          ) : usageData ? (
            <div className="space-y-5">
              {/* Monthly overview stats */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  This Month
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      ${usageData.monthly.cost.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Total Cost</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {usageData.monthly.callCount}
                    </p>
                    <p className="text-xs text-gray-500">API Calls</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      ${usageData.monthly.avgCostPerReport.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Avg / Report</p>
                  </div>
                </div>
              </div>

              {/* Breakdown by endpoint */}
              {Object.keys(usageData.monthly.byEndpoint).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Breakdown by Endpoint
                  </p>
                  <div className="space-y-2">
                    {Object.entries(usageData.monthly.byEndpoint).map(
                      ([endpoint, data]) => (
                        <div
                          key={endpoint}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex items-center gap-2 text-gray-700">
                            {endpoint === "generate-report" && (
                              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                            )}
                            {endpoint === "parse-audio" && (
                              <Cpu className="h-3.5 w-3.5 text-blue-500" />
                            )}
                            {endpoint === "transcribe" && (
                              <Mic className="h-3.5 w-3.5 text-amber-500" />
                            )}
                            {endpoint.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                          <span className="text-gray-500">
                            {data.count} calls &middot; ${data.cost.toFixed(3)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* All time */}
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  All Time
                </p>
                <p className="text-sm text-gray-600">
                  {usageData.allTime.callCount} API calls &middot; $
                  {usageData.allTime.cost.toFixed(2)} estimated cost
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No usage data available yet. API costs will appear here after
              generating reports or using voice dictation.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### app/(app)/ordinances/page.tsx

```tsx
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Shield, Scale, ExternalLink } from "lucide-react";

interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}
interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}
interface HeritageTreeRules {
  dbhThreshold: number;
  reviewProcess: string;
  notes: string;
}

export default async function OrdinancesPage() {
  const ordinances = await prisma.municipalOrdinance.findMany({
    orderBy: { cityName: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Municipal Ordinance Database
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Protected tree ordinances for SF Peninsula cities
        </p>
      </div>

      <div className="space-y-6">
        {ordinances.map((ord) => {
          const species = JSON.parse(
            ord.protectedSpecies
          ) as ProtectedSpeciesRule[];
          const mitigation = JSON.parse(
            ord.mitigationRules
          ) as MitigationRules;
          const heritage = JSON.parse(
            ord.heritageTreeRules
          ) as HeritageTreeRules;

          return (
            <Card key={ord.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-emerald-600" />
                      {ord.cityName}
                    </CardTitle>
                    {ord.codeReference && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {ord.codeReference}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {ord.certifierRequirement && (
                      <Badge
                        variant="outline"
                        className="border-emerald-200 text-emerald-700 bg-emerald-50"
                      >
                        {ord.certifierRequirement}
                      </Badge>
                    )}
                    {ord.ordinanceUrl && (
                      <a
                        href={ord.ordinanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-500"
                      >
                        View Code
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default thresholds */}
                <div className="flex gap-6">
                  {ord.defaultDbhThresholdNative && (
                    <div className="bg-emerald-50 rounded-lg px-4 py-3">
                      <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
                        Native Threshold
                      </p>
                      <p className="text-2xl font-mono font-bold text-emerald-800">
                        {ord.defaultDbhThresholdNative}&quot;
                      </p>
                      <p className="text-xs text-emerald-600">DBH</p>
                    </div>
                  )}
                  {ord.defaultDbhThresholdNonnative && (
                    <div className="bg-amber-50 rounded-lg px-4 py-3">
                      <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                        Non-native Threshold
                      </p>
                      <p className="text-2xl font-mono font-bold text-amber-800">
                        {ord.defaultDbhThresholdNonnative}&quot;
                      </p>
                      <p className="text-xs text-amber-600">DBH</p>
                    </div>
                  )}
                </div>

                {/* Protected Species Table */}
                <div>
                  <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    Protected Species
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Common Name</TableHead>
                        <TableHead>Scientific Name</TableHead>
                        <TableHead className="text-right">
                          DBH Threshold
                        </TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {species.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">
                            {s.species}
                          </TableCell>
                          <TableCell className="italic text-muted-foreground">
                            {s.scientific}
                          </TableCell>
                          <TableCell className="text-right font-mono font-bold">
                            {s.dbhThreshold}&quot;
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {s.category}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                {/* Mitigation & Heritage */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Scale className="h-4 w-4 text-emerald-600" />
                      Mitigation Requirements
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">
                          Replanting Ratio
                        </dt>
                        <dd className="font-medium">
                          {mitigation.replantingRatio}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">In-Lieu Fee</dt>
                        <dd className="font-medium">{mitigation.inLieuFee}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Notes</dt>
                        <dd className="text-muted-foreground">
                          {mitigation.notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-amber-600" />
                      Heritage Tree Rules
                    </h4>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">
                          Heritage Threshold
                        </dt>
                        <dd className="font-mono font-bold">
                          {heritage.dbhThreshold}&quot; DBH
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">
                          Review Process
                        </dt>
                        <dd className="font-medium">
                          {heritage.reviewProcess}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Notes</dt>
                        <dd className="text-muted-foreground">
                          {heritage.notes}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {ord.permitProcessNotes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Permit Process
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {ord.permitProcessNotes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

### app/onboarding/page.tsx

```tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TreePine,
  Loader2,
  User,
  ShieldCheck,
  Building2,
  Upload,
  ImageIcon,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    phone: "",
    isaCertificationNum: "",
    isaExpirationDate: "",
    licenseNumbers: "",
    signatureName: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/arborist/logo", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      setLogoUrl(data.companyLogoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logo upload failed");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.isaCertificationNum || !form.isaExpirationDate) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/arborist/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          isaCertificationNum: form.isaCertificationNum,
          isaExpirationDate: form.isaExpirationDate,
          companyName: form.companyName || null,
          phone: form.phone || null,
          licenseNumbers: form.licenseNumbers || null,
          signatureName: form.signatureName || null,
          companyAddress: form.companyAddress || null,
          companyPhone: form.companyPhone || null,
          companyEmail: form.companyEmail || null,
          companyWebsite: form.companyWebsite || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create profile");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 rounded-full bg-emerald-100 p-3 w-fit">
            <TreePine className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to TreeCertify
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Set up your arborist profile to get started. This information will
            appear on your certified reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Your Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Your Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="(650) 555-1234"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: ISA Credentials */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  ISA Credentials
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isaCertificationNum">
                      ISA Certification Number{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isaCertificationNum"
                      value={form.isaCertificationNum}
                      onChange={(e) =>
                        updateField("isaCertificationNum", e.target.value)
                      }
                      placeholder="WE-12345A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isaExpirationDate">
                      Expiration Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isaExpirationDate"
                      type="date"
                      value={form.isaExpirationDate}
                      onChange={(e) =>
                        updateField("isaExpirationDate", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumbers">License Numbers</Label>
                  <Input
                    id="licenseNumbers"
                    value={form.licenseNumbers}
                    onChange={(e) =>
                      updateField("licenseNumbers", e.target.value)
                    }
                    placeholder="e.g., CA-QCLP #1234, TRAQ"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatureName">
                    How should your name appear on certified reports?
                  </Label>
                  <Input
                    id="signatureName"
                    value={form.signatureName}
                    onChange={(e) =>
                      updateField("signatureName", e.target.value)
                    }
                    placeholder="e.g., Andrew Hotsko, ISA Board Certified Master Arborist"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the name that will appear in your certification
                    signature
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Company Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Company Details
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Optional &mdash; this information will appear on report headers
              </p>
              <div className="space-y-4">
                {/* Logo upload */}
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 overflow-hidden shrink-0">
                      {logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logoUrl}
                          alt="Company logo"
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-zinc-300" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadLogo(file);
                          e.target.value = "";
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4 mr-1.5" />
                        )}
                        {uploading ? "Uploading..." : "Upload Logo"}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, WebP, or SVG
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={form.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      placeholder="Peninsula Tree Care"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input
                      id="companyPhone"
                      value={form.companyPhone}
                      onChange={(e) =>
                        updateField("companyPhone", e.target.value)
                      }
                      placeholder="(650) 555-0100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input
                    id="companyAddress"
                    value={form.companyAddress}
                    onChange={(e) =>
                      updateField("companyAddress", e.target.value)
                    }
                    placeholder="123 Main St, City, CA 94000"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={form.companyEmail}
                      onChange={(e) =>
                        updateField("companyEmail", e.target.value)
                      }
                      placeholder="info@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={form.companyWebsite}
                      onChange={(e) =>
                        updateField("companyWebsite", e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error display */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              "Create My Profile & Get Started"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

### app/share/[token]/page.tsx

```tsx
import { prisma } from "@/lib/db";
import { Clock, Download, TreePine, Mail, Phone, Globe } from "lucide-react";
import { PermitStatusPipeline } from "@/components/permit-status-pipeline";

export const metadata = {
  title: "Tree Assessment Report | TreeCertify",
};

// ---------------------------------------------------------------------------
// Condition labels & colors (duplicated from condition-rating.tsx for RSC use)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Homeowner-friendly action translations
// ---------------------------------------------------------------------------

const ACTION_FRIENDLY: Record<string, string> = {
  retain: "This tree is healthy and will be preserved",
  remove: "Removal is recommended — see report for details",
  prune: "Maintenance pruning is recommended",
  monitor: "This tree will be monitored over time",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

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
      reports: {
        orderBy: { updatedAt: "desc" },
        take: 1,
        include: {
          arborist: true,
        },
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

  const report = property.reports[0] ?? null;
  const arborist = report?.arborist ?? null;
  const isCertified = report?.status === "certified";

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const hasCoords = property.lat != null && property.lng != null;

  // Build static Mapbox URL with tree pins
  let mapImageUrl: string | null = null;
  if (hasCoords && mapboxToken) {
    const lng = property.lng!;
    const lat = property.lat!;

    const treePins = property.trees
      .filter((t) => t.pinLat != null && t.pinLng != null)
      .slice(0, 50)
      .map((t) => `pin-s-${t.treeNumber}+16a34a(${t.pinLng},${t.pinLat})`)
      .join(",");

    const markers = treePins ? `${treePins}/` : "";
    mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${markers}${lng},${lat},17,0/800x400@2x?access_token=${mapboxToken}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---- Header ---- */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {arborist?.companyLogoUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={arborist.companyLogoUrl}
                  alt={arborist.companyName ?? "Company logo"}
                  className="h-10 w-10 rounded-lg object-contain border"
                />
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {property.address}
                </h1>
                <p className="text-sm text-gray-500">
                  {arborist?.companyName ?? "Tree Assessment Report"} &middot; {property.city}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium tracking-wider uppercase hidden sm:inline">
              TreeCertify
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* ---- In Progress Banner (not certified) ---- */}
        {!isCertified && (
          <section>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <Clock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h2 className="text-lg font-semibold text-amber-800">
                Assessment In Progress
              </h2>
              <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
                Your arborist is still working on this tree assessment report.
                Check back soon.
              </p>
              {arborist && (
                <p className="text-xs text-amber-600 mt-3">
                  Arborist: {arborist.name}
                  {arborist.companyName ? ` — ${arborist.companyName}` : ""}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ---- Permit Status Pipeline (certified only) ---- */}
        {isCertified && report && (
          <section>
            <PermitStatusPipeline
              permitStatus={report.permitStatus}
              submittedAt={report.submittedAt?.toISOString() ?? null}
              submittedTo={report.submittedTo}
              reviewerName={report.reviewerName}
              reviewerNotes={report.reviewerNotes}
              conditionsOfApproval={report.conditionsOfApproval}
              denialReason={report.denialReason}
              approvedAt={report.approvedAt?.toISOString() ?? null}
              permitExpiresAt={report.permitExpiresAt?.toISOString() ?? null}
              certifiedAt={report.certifiedAt?.toISOString() ?? null}
              mode="readonly"
              friendlyLabels
            />
          </section>
        )}

        {/* ---- Download Report (certified only) ---- */}
        {isCertified && report && (
          <section className="flex justify-center">
            <a
              href={`/api/reports/${report.id}/pdf?token=${token}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
              download
            >
              <Download className="h-4 w-4" />
              Download Report (PDF)
            </a>
          </section>
        )}

        {/* ---- Map Section ---- */}
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

        {/* ---- Tree Summary (certified: full details; otherwise: basic count) ---- */}
        {isCertified && property.trees.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TreePine className="h-4 w-4" />
              Trees on This Property ({property.trees.length})
            </h2>
            <div className="space-y-3">
              {property.trees.map((tree) => (
                <div
                  key={tree.id}
                  className="bg-white rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500">
                          #{tree.treeNumber}
                        </span>
                        <h3 className="font-medium text-gray-900">
                          {tree.speciesCommon || "Unidentified Species"}
                        </h3>
                      </div>
                      {tree.speciesScientific && (
                        <p className="text-xs text-gray-400 italic mb-2">
                          {tree.speciesScientific}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {ACTION_FRIENDLY[tree.recommendedAction] ??
                          tree.recommendedAction ??
                          "No recommendation yet"}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap ${
                        CONDITION_COLORS[tree.conditionRating] ?? "text-gray-400"
                      }`}
                    >
                      {CONDITION_LABELS[tree.conditionRating] ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Not certified — just show tree count */}
        {!isCertified && property.trees.length > 0 && (
          <section>
            <div className="bg-white rounded-lg border p-6 text-center text-gray-500 text-sm">
              <TreePine className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              {property.trees.length} tree{property.trees.length !== 1 ? "s" : ""} assessed on this property.
              Full details will be available once the report is complete.
            </div>
          </section>
        )}

        {/* ---- Arborist Contact Card ---- */}
        {arborist && (
          <section>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Your Arborist
              </h2>
              <div className="flex items-start gap-4">
                {arborist.companyLogoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={arborist.companyLogoUrl}
                    alt=""
                    className="h-12 w-12 rounded-lg object-contain border shrink-0"
                  />
                )}
                <div className="space-y-1 text-sm min-w-0">
                  <p className="font-medium text-gray-900">{arborist.name}</p>
                  {arborist.companyName && (
                    <p className="text-gray-600">{arborist.companyName}</p>
                  )}
                  <p className="text-gray-500">
                    ISA Certified Arborist #{arborist.isaCertificationNum}
                  </p>
                  {arborist.companyPhone && (
                    <p className="flex items-center gap-1.5 text-gray-600">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <a
                        href={`tel:${arborist.companyPhone}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        {arborist.companyPhone}
                      </a>
                    </p>
                  )}
                  {arborist.companyEmail && (
                    <p className="flex items-center gap-1.5 text-gray-600">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <a
                        href={`mailto:${arborist.companyEmail}`}
                        className="hover:text-emerald-600 transition-colors truncate"
                      >
                        {arborist.companyEmail}
                      </a>
                    </p>
                  )}
                  {arborist.companyWebsite && (
                    <p className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-gray-600 shrink-0" />
                      <a
                        href={arborist.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline truncate"
                      >
                        {arborist.companyWebsite.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
          Shared via TreeCertify
          {arborist?.companyName ? ` · ${arborist.companyName}` : ""}
        </div>
      </footer>
    </div>
  );
}
```

### app/api/ai/generate-report/route.ts

```typescript
/**
 * AI Report Generation — Prompt v2.0 (2026-03-03)
 *
 * Data-driven generation: structured tree/property/ordinance data is sent
 * alongside detailed system prompt instructions. Claude generates the
 * narrative from data rather than polishing pre-written text.
 *
 * Prompt version: 2.0
 */
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrdinanceByCity } from "@/lib/ordinances";
import { getReportTemplate } from "@/lib/report-templates";
import Anthropic from "@anthropic-ai/sdk";
import { logApiUsage } from "@/lib/api-usage";

interface TreeRecordData {
  treeNumber: number;
  tagNumber?: string | null;
  speciesCommon: string;
  speciesScientific: string | null;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string | null;
  structuralNotes: string | null;
  isProtected: boolean;
  protectionReason: string | null;
  recommendedAction: string;
  mitigationRequired: string | null;
  typeSpecificData?: string | null;
}

interface PropertyData {
  address: string;
  city: string;
  state: string | null;
  zip: string | null;
  county: string | null;
  parcelNumber: string | null;
  scopeOfAssignment?: string | null;
  siteObservations?: string | null;
}

/**
 * Format type-specific tree assessment data for inclusion in AI prompts.
 */
function formatTypeSpecificBlock(
  reportType: string,
  raw: string | null | undefined
): string {
  if (!raw) return "";
  try {
    const d = JSON.parse(raw);
    switch (reportType) {
      case "health_assessment":
        return [
          d.likelihoodOfFailure
            ? `    - TRAQ Likelihood of Failure: ${d.likelihoodOfFailure}`
            : "",
          d.likelihoodOfImpact
            ? `    - TRAQ Likelihood of Impact: ${d.likelihoodOfImpact}`
            : "",
          d.consequences
            ? `    - TRAQ Consequences: ${d.consequences}`
            : "",
          d.overallRiskRating
            ? `    - TRAQ Overall Risk Rating: ${d.overallRiskRating}`
            : "",
          d.targetDescription
            ? `    - Target Description: ${d.targetDescription}`
            : "",
          d.maintenanceItems?.length
            ? `    - Maintenance Items: ${d.maintenanceItems.join(", ")}`
            : "",
          d.maintenanceRecommendations
            ? `    - Maintenance Recommendations: ${d.maintenanceRecommendations}`
            : "",
          d.maintenancePriority
            ? `    - Maintenance Priority: ${d.maintenancePriority}`
            : "",
          d.maintenanceTimeline
            ? `    - Maintenance Timeline: ${d.maintenanceTimeline}`
            : "",
          d.estimatedMaintenanceCost != null
            ? `    - Estimated Maintenance Cost: $${d.estimatedMaintenanceCost}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "removal_permit":
        return [
          d.riskRating ? `    - Risk Rating: ${d.riskRating}` : "",
          d.riskFactors?.length
            ? `    - Risk Factors: ${d.riskFactors.join(", ")}`
            : "",
          d.removalReason ? `    - Removal Reason: ${d.removalReason}` : "",
          d.retentionFeasibility
            ? `    - Retention Feasibility: ${d.retentionFeasibility.replace(/_/g, " ")}`
            : "",
          d.retentionNotes
            ? `    - Retention Notes: ${d.retentionNotes}`
            : "",
          d.estimatedRemainingLifespan
            ? `    - Estimated Remaining Lifespan: ${d.estimatedRemainingLifespan}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "tree_valuation":
        return [
          d.valuationMethod
            ? `    - Valuation Method: ${d.valuationMethod}`
            : "",
          d.speciesRating != null
            ? `    - Species Rating: ${d.speciesRating}%`
            : "",
          d.conditionRating != null
            ? `    - Condition Rating (Valuation): ${d.conditionRating}%`
            : "",
          d.locationRating != null
            ? `    - Location Rating: ${d.locationRating}%`
            : "",
          d.costPerSquareInch != null
            ? `    - Cost per Sq Inch: $${d.costPerSquareInch}`
            : "",
          d.trunkArea != null
            ? `    - Trunk Area: ${d.trunkArea.toFixed(1)} sq in`
            : "",
          d.appraisedValue != null
            ? `    - Appraised Value: $${Number(d.appraisedValue).toLocaleString()}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      case "construction_encroachment":
        return [
          d.tpzRadius != null ? `    - TPZ Radius (auto): ${d.tpzRadius} ft` : "",
          d.tpzOverride && d.tpzManual != null
            ? `    - TPZ Radius (manual override): ${d.tpzManual} ft`
            : "",
          d.srzRadius != null
            ? `    - SRZ Radius (auto): ${d.srzRadius.toFixed(1)} ft`
            : "",
          d.tpzOverride && d.srzManual != null
            ? `    - SRZ Radius (manual override): ${d.srzManual} ft`
            : "",
          d.encroachmentDescription
            ? `    - Encroachment Description: ${d.encroachmentDescription}`
            : "",
          d.encroachmentPercent != null
            ? `    - Encroachment: ${d.encroachmentPercent}%`
            : "",
          d.impactAssessment
            ? `    - Impact Assessment: ${d.impactAssessment}`
            : "",
          d.protectionMeasuresList?.length
            ? `    - Protection Measures: ${d.protectionMeasuresList.join(", ")}`
            : d.protectionMeasures
            ? `    - Protection Measures: ${d.protectionMeasures}`
            : "",
          d.monitoringFrequency
            ? `    - Monitoring Frequency: ${d.monitoringFrequency}`
            : d.monitoringSchedule
            ? `    - Monitoring Schedule: ${d.monitoringSchedule}`
            : "",
        ]
          .filter(Boolean)
          .join("\n");

      default:
        return "";
    }
  } catch {
    return "";
  }
}

/**
 * Generate a mock/fallback report when no ANTHROPIC_API_KEY is configured.
 * This is a simplified structural draft — not the AI-quality output.
 */
function generateMockReport(
  property: PropertyData,
  trees: TreeRecordData[],
  reportType: string
): string {
  const reportTypeLabel = reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const state = property.state || "CA";
  const treeCount = trees.length;
  const protectedCount = trees.filter((t) => t.isProtected).length;

  const conditionLabels: Record<number, string> = {
    0: "Dead", 1: "Critical", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent",
  };

  const individualAssessments = trees
    .map((t) => {
      const conditionDesc = conditionLabels[t.conditionRating] || `${t.conditionRating}/5`;
      const dims = [
        `${t.dbhInches}-inch DBH`,
        t.heightFt ? `approximately ${t.heightFt} feet in height` : null,
        t.canopySpreadFt ? `with a canopy spread of ${t.canopySpreadFt} feet` : null,
      ].filter(Boolean).join(", ");

      // Use arborist notes directly — do not fabricate observations
      const healthLine = t.healthNotes
        ? t.healthNotes
        : t.conditionRating >= 4
        ? "No specific health concerns were noted during the Level 2 visual assessment."
        : t.conditionRating >= 3
        ? "The tree exhibits moderate signs of stress consistent with its assigned condition rating. Further monitoring is recommended."
        : t.conditionRating >= 1
        ? "The tree exhibits signs of decline consistent with its assigned condition rating. Further diagnostic evaluation may be warranted."
        : "The tree is dead with no viable foliage or cambial activity detected.";

      const structuralLine = t.structuralNotes
        ? t.structuralNotes
        : t.conditionRating >= 4
        ? "No significant structural defects were observed during the visual assessment."
        : t.conditionRating >= 3
        ? "Minor structural concerns were noted. These should be addressed through maintenance pruning per ANSI A300 standards."
        : t.conditionRating >= 1
        ? "Structural defects were observed that warrant further evaluation and may require corrective action."
        : "Structural assessment is not applicable for a dead tree.";

      const bottomLine =
        t.recommendedAction === "retain"
          ? `The ${t.speciesCommon} should be retained and preserved.`
          : t.recommendedAction === "remove"
          ? `Removal of this ${t.speciesCommon} is recommended.${t.isProtected ? ` A removal permit is required from the City of ${property.city}.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning in accordance with ANSI A300 standards is recommended.`
          : `Continued monitoring at regular intervals by a certified arborist is recommended.`;

      return `### Tree #${t.treeNumber} \u2014 ${t.speciesCommon}${t.speciesScientific ? ` (*${t.speciesScientific}*)` : ""}

The ${t.speciesCommon} is a ${dims} specimen located on the subject property.

**Condition Rating: ${t.conditionRating}/5 (${conditionDesc})**

**Health Observations:** ${healthLine}

**Structural Assessment:** ${structuralLine}

${bottomLine}`;
    })
    .join("\n\n");

  const recommendationSummaries = trees
    .map((t) => {
      const actionDesc =
        t.recommendedAction === "retain"
          ? `Retain and preserve.`
          : t.recommendedAction === "remove"
          ? `Removal is recommended.${t.isProtected ? ` A removal permit must be obtained from the City of ${property.city}.` : ""}`
          : t.recommendedAction === "prune"
          ? `Pruning per ANSI A300 standards is recommended.`
          : `Continued monitoring is recommended.`;

      return `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${actionDesc}`;
    })
    .join("\n");

  const protectedTrees = trees.filter((t) => t.isProtected);
  const protectedDetails = protectedTrees.length
    ? protectedTrees
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}, ${t.dbhInches}" DBH):** ${t.protectionReason || "Meets protection criteria under the municipal ordinance."}`
        )
        .join("\n")
    : "No trees on this property meet the criteria for protected status under the applicable municipal ordinance.";

  const treesNeedingMitigation = trees.filter(
    (t) => t.isProtected && t.recommendedAction === "remove"
  );
  const mitigationContent = treesNeedingMitigation.length
    ? treesNeedingMitigation
        .map(
          (t) =>
            `- **Tree #${t.treeNumber} (${t.speciesCommon}):** ${t.mitigationRequired || `As a protected tree, removal will require mitigation in accordance with the ${property.city} municipal ordinance.`}`
        )
        .join("\n")
    : "No mitigation is required at this time based on the current assessment and recommended actions.";

  return `# ${reportTypeLabel}

**Date:** ${date}
**Property Address:** ${property.address}
**City:** ${property.city}, ${state}
**County:** ${property.county || "N/A"}
**Parcel Number:** ${property.parcelNumber || "N/A"}
**Total Trees Assessed:** ${treeCount}

---

## 1. Assignment and Purpose

This report has been prepared to provide a professional arborist assessment of ${treeCount} tree${treeCount !== 1 ? "s" : ""} located at ${property.address}, ${property.city}, ${state}. All trees were assessed from ground level using a Level 2 Basic visual assessment per ISA TRAQ methodology.

---

## 2. Site Observations

The subject trees are located on the property at ${property.address}.${property.siteObservations ? ` ${property.siteObservations}` : ""}

---

## 3. Individual Tree Assessments

${individualAssessments}

---

## 4. Protected Status Summary

**Protected Trees:** ${protectedCount} of ${treeCount} total

${protectedDetails}

---

## 5. Recommendations

${recommendationSummaries}

---

## 6. Mitigation Requirements

${mitigationContent}

---

## 7. Limitations and Assumptions

This assessment was conducted as a Level 2 Basic visual assessment from ground level per ISA TRAQ methodology. No below-ground examination, aerial inspection, or invasive testing was performed. Trees are living organisms and conditions can change; this assessment reflects conditions at the time of inspection.

---

*This report was generated as a draft and requires review and certification by the assigned arborist.*
`;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const arboristId = arborist.id;
    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
          include: {
            treePhotos: { orderBy: { sortOrder: "asc" } },
            treeAudioNotes: {
              where: { status: "ready" },
              orderBy: { createdAt: "asc" },
            },
          },
        },
        propertyAudioNotes: {
          where: { status: "ready" },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.trees.length === 0) {
      return NextResponse.json(
        { error: "Property has no tree records. Add trees before generating a report." },
        { status: 400 }
      );
    }

    const ordinance = await getOrdinanceByCity(property.city);

    let aiDraftContent: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const reportTypeLabel = body.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

      const treeCount = property.trees.length;

      // Build structured tree data block
      const treeDataBlock = property.trees
        .map(
          (t) => {
            const photoLines = t.treePhotos.length > 0
              ? t.treePhotos
                  .map((p, i) => `      Photo ${i + 1}: ${p.caption || "No caption"}`)
                  .join("\n")
              : "      None";

            const audioLines = t.treeAudioNotes.length > 0
              ? t.treeAudioNotes
                  .map((a, i) => `      Audio Note ${i + 1}: ${a.cleanedTranscription || ""}`)
                  .join("\n")
              : "      None recorded";

            const typeBlock = formatTypeSpecificBlock(body.reportType, t.typeSpecificData);

            return `  Tree #${t.treeNumber}:
    - Tag Number: ${t.tagNumber || "N/A"}
    - Species: ${t.speciesCommon}${t.speciesScientific ? ` (${t.speciesScientific})` : ""}
    - DBH: ${t.dbhInches} inches
    - Height: ${t.heightFt ? `${t.heightFt} feet` : "Not measured"}
    - Canopy Spread: ${t.canopySpreadFt ? `${t.canopySpreadFt} feet` : "Not measured"}
    - Condition Rating: ${t.conditionRating}/5
    - Health Notes: ${t.healthNotes || "None provided by arborist"}
    - Structural Notes: ${t.structuralNotes || "None provided by arborist"}
    - Protected Status: ${t.isProtected ? "Yes" : "No"}
    - Protection Reason: ${t.protectionReason || "N/A"}
    - Recommended Action: ${t.recommendedAction}
    - Mitigation Required: ${t.mitigationRequired || "None"}
    - Photos on File: ${t.treePhotos.length > 0 ? `${t.treePhotos.length} photo(s)` : "None"}
${t.treePhotos.length > 0 ? photoLines : ""}
    - Field Audio Notes:
${audioLines}${typeBlock ? `\n    - Type-Specific Assessment:\n${typeBlock}` : ""}`;
          }
        )
        .join("\n\n");

      // Property-level site audio notes
      const propertyAudioBlock =
        property.propertyAudioNotes && property.propertyAudioNotes.length > 0
          ? `\nPROPERTY-LEVEL FIELD NOTES (recorded by the arborist during site visit):
${property.propertyAudioNotes
  .map(
    (a: { cleanedTranscription: string | null }, i: number) =>
      `  Site Note ${i + 1}: ${a.cleanedTranscription || ""}`
  )
  .join("\n")}`
          : "";

      // Look up template for this report type
      const template = getReportTemplate(body.reportType);

      // Filter out sections handled by the PDF template
      const excludedSections = ["Tree Inventory", "Arborist Certification Statement"];
      const filteredSections = template
        ? template.requiredSections.filter((s) => !excludedSections.includes(s))
        : [
            "Assignment and Purpose",
            "Site Observations",
            "Individual Tree Assessments",
            "Protected Status Summary",
            "Recommendations",
            "Mitigation Requirements",
            "Limitations and Assumptions",
          ];

      const sectionsList = filteredSections
        .map((s, i) => `${i + 1}. **${s}**`)
        .join("\n");

      // Build the data-driven system prompt (v2.0)
      const systemPrompt = `You are an expert ISA Certified Arborist generating a professional ${reportTypeLabel} report from structured field data. Your task is to GENERATE a complete, submission-ready narrative from the data below — not to polish or refine pre-written text.

PROMPT VERSION: ${template?.promptVersion || "2.0"}

${template?.systemInstructions || `Write a professional arborist report following ISA standards and best practices.`}

═══════════════════════════════════════════════════════════
STRUCTURED DATA — Generate the report narrative from this data
═══════════════════════════════════════════════════════════

MUNICIPAL ORDINANCE CONTEXT:
${
  ordinance
    ? `City: ${ordinance.cityName}, ${ordinance.state}
Code Reference: ${ordinance.codeReference || "N/A"}
Ordinance URL: ${ordinance.ordinanceUrl || "N/A"}
Protected Species Rules: ${JSON.stringify(ordinance.protectedSpecies)}
Default Native DBH Threshold: ${ordinance.defaultDbhThresholdNative ?? "N/A"} inches
Default Non-Native DBH Threshold: ${ordinance.defaultDbhThresholdNonnative ?? "N/A"} inches
Mitigation Rules: ${JSON.stringify(ordinance.mitigationRules)}
Heritage Tree Rules: ${JSON.stringify(ordinance.heritageTreeRules)}
Certifier Requirement: ${ordinance.certifierRequirement || "N/A"}
Permit Process Notes: ${ordinance.permitProcessNotes || "N/A"}`
    : `No specific ordinance data available for ${property.city}. Use general California arborist reporting standards. Do not cite specific code sections.`
}

PROPERTY DATA:
- Address: ${property.address}
- City: ${property.city}, ${property.state || "CA"}
- County: ${property.county || "N/A"}
- Parcel Number: ${property.parcelNumber || "N/A"}
- Report Type: ${reportTypeLabel}
- Total Trees: ${treeCount}
- Scope of Assignment: ${property.scopeOfAssignment || "Not specified"}
- Site Observations: ${property.siteObservations || "Not specified"}${
  body.reportType === "construction_encroachment"
    ? `\n- Project Description: ${(property as Record<string, unknown>).projectDescription || "N/A"}\n- Permit Number: ${(property as Record<string, unknown>).permitNumber || "N/A"}\n- Developer/Contractor: ${(property as Record<string, unknown>).developerName || "N/A"}\n- Architect: ${(property as Record<string, unknown>).architectName || "N/A"}`
    : ""
}

TREE ASSESSMENT DATA:
${treeDataBlock}
${propertyAudioBlock}

═══════════════════════════════════════════════════════════
OUTPUT INSTRUCTIONS
═══════════════════════════════════════════════════════════

Generate the complete report in markdown format with these sections:

${sectionsList}

FORMATTING RULES:
- Use ## for section headers (numbered: ## 1. Assignment and Purpose)
- Use ### for per-tree sub-headers within Individual Tree Assessments
- Use **bold** for emphasis on key findings
- Use horizontal rules (---) between major sections
- Incorporate measurements naturally in prose: "The 24-inch DBH Coast Live Oak..." not "DBH: 24 inches"

DATA INTEGRITY RULES:
- When the arborist provided health notes, use them. When health notes say "None provided by arborist," write "No specific health concerns were noted during the Level 2 visual assessment" for trees rated 4-5/5, or note decline consistent with the rating for lower-rated trees. Do NOT fabricate specific diseases, pests, or symptoms that were not reported.
- When the arborist provided structural notes, use them. When structural notes say "None provided by arborist," write "No significant structural defects were observed during the visual assessment" for trees rated 4-5/5. Do NOT fabricate specific structural defects that were not reported.
- When type-specific assessment data is provided (TRAQ ratings, risk factors, retention feasibility, valuation data, TPZ/SRZ values), use those values directly — they are arborist-provided measurements.
- When field audio notes are provided, incorporate them naturally as "Per field observations..." or "The arborist noted during field inspection that..." Do not mention audio recordings.
- When property-level field notes are provided, weave them into Site Observations as "Site conditions noted during the field inspection include..."
- When photos are on file, reference them: "See Photo 1."

CRITICAL: Do NOT include a "Tree Inventory" section or table — the PDF template generates that separately. Do NOT include an "Arborist Certification Statement" — the certification is handled by the PDF template with the arborist's e-signature. End the report after the final content section.`;

      // Stream the response for real-time progress
      const stream = anthropic.messages.stream({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        messages: [
          {
            role: "user",
            content: `Generate the complete ${reportTypeLabel} report for the ${treeCount}-tree property at ${property.address}, ${property.city} based on the structured assessment data provided.`,
          },
        ],
        system: systemPrompt,
      });

      const encoder = new TextEncoder();

      const readableStream = new ReadableStream({
        async start(controller) {
          let fullText = "";
          let usageInput = 0;
          let usageOutput = 0;

          try {
            for await (const event of stream) {
              if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
              ) {
                const text = event.delta.text;
                fullText += text;
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ type: "text", text })}\n\n`
                  )
                );
              } else if (event.type === "message_delta") {
                usageOutput = (event as unknown as { usage?: { output_tokens?: number } }).usage?.output_tokens ?? 0;
              } else if (event.type === "message_start") {
                usageInput = (event as unknown as { message?: { usage?: { input_tokens?: number } } }).message?.usage?.input_tokens ?? 0;
              }
            }

            // Save to database after streaming completes
            const report = await prisma.report.create({
              data: {
                propertyId: body.propertyId,
                arboristId,
                reportType: body.reportType,
                aiDraftContent: fullText,
              },
            });

            // Create "AI Draft" version snapshot
            await prisma.reportVersion.create({
              data: {
                reportId: report.id,
                content: fullText,
                label: "AI Draft",
              },
            });

            // Log API usage (fire-and-forget)
            logApiUsage({
              arboristId,
              propertyId: body.propertyId,
              reportId: report.id,
              provider: "anthropic",
              endpoint: "generate-report",
              model: "claude-sonnet-4-20250514",
              inputTokens: usageInput,
              outputTokens: usageOutput,
            });

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "done", reportId: report.id })}\n\n`
              )
            );
          } catch (err) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", error: String(err) })}\n\n`
              )
            );
          }

          controller.close();
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else {
      aiDraftContent = generateMockReport(property, property.trees, body.reportType);
    }

    // Mock path: non-streaming fallback
    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId,
        reportType: body.reportType,
        aiDraftContent,
      },
    });

    // Create "AI Draft" version snapshot
    await prisma.reportVersion.create({
      data: {
        reportId: report.id,
        content: aiDraftContent,
        label: "AI Draft",
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
```

### app/api/arborist/logo/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  getArboristUploadDir,
  getArboristServingUrl,
  generateFilename,
} from "@/lib/uploads";

// POST /api/arborist/logo — upload a company logo
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("logo") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No logo file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: JPG, PNG, WebP, SVG`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10 MB)" },
        { status: 400 }
      );
    }

    // Delete existing logo file if present
    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    // Save new logo
    const filename = generateFilename(file.name);
    const uploadDir = getArboristUploadDir(arborist.id);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoUrl = getArboristServingUrl(arborist.id, filename);

    // Update arborist record
    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: logoUrl },
    });

    return NextResponse.json({
      companyLogoUrl: updated.companyLogoUrl,
    });
  } catch (error) {
    console.error("Error uploading logo:", error);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }
}

// DELETE /api/arborist/logo — remove the company logo
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    if (arborist.companyLogoUrl) {
      const existingFilename = arborist.companyLogoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore
        }
      }
    }

    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { companyLogoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting logo:", error);
    return NextResponse.json(
      { error: "Failed to delete logo" },
      { status: 500 }
    );
  }
}
```

### app/api/arborist/onboard/route.ts

```typescript
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Profile already exists" },
      { status: 409 }
    );
  }

  const body = await request.json();

  if (!body.name || !body.isaCertificationNum || !body.isaExpirationDate) {
    return NextResponse.json(
      { error: "Missing required fields: name, isaCertificationNum, isaExpirationDate" },
      { status: 400 }
    );
  }

  const arborist = await prisma.arborist.create({
    data: {
      clerkUserId: userId,
      name: body.name,
      email: body.email || "",
      isaCertificationNum: body.isaCertificationNum,
      isaExpirationDate: new Date(body.isaExpirationDate),
      companyName: body.companyName || null,
      phone: body.phone || null,
      licenseNumbers: body.licenseNumbers || null,
      signatureName: body.signatureName || null,
      companyAddress: body.companyAddress || null,
      companyPhone: body.companyPhone || null,
      companyEmail: body.companyEmail || null,
      companyWebsite: body.companyWebsite || null,
    },
  });

  // Create a sample property so the dashboard isn't empty
  try {
    await prisma.property.create({
      data: {
        arboristId: arborist.id,
        address: "123 Sample Street",
        city: "Palo Alto",
        state: "CA",
        county: "Santa Clara",
        reportType: "health_assessment",
        lat: 37.4419,
        lng: -122.143,
        scopeOfAssignment:
          "This is a sample property to demonstrate TreeCertify's workflow. You can explore the trees, generate a report, and see how the certification process works. Feel free to delete this property when you're ready.",
        siteObservations:
          "The property features mature native and ornamental trees in a residential setting. The trees are generally well-maintained with adequate spacing and good soil conditions.",
        trees: {
          create: [
            {
              treeNumber: 1,
              speciesCommon: "Coast Live Oak",
              speciesScientific: "Quercus agrifolia",
              dbhInches: 24,
              heightFt: 35,
              canopySpreadFt: 40,
              conditionRating: 4,
              healthNotes:
                "Full, well-distributed crown with dense foliage. No visible signs of disease or pest infestation. Minor deadwood present in interior canopy, typical for species.",
              structuralNotes:
                "Strong central leader with well-spaced scaffold branches. No significant included bark or co-dominant stems. Root flare visible and stable.",
              isProtected: true,
              protectionReason:
                "Native oak exceeding 12-inch DBH threshold per Palo Alto Municipal Code Section 8.10.",
              recommendedAction: "retain",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "improbable",
                likelihoodOfImpact: "low",
                consequences: "minor",
                overallRiskRating: "low",
                targetDescription:
                  "Pedestrian walkway and residential structure within fall zone",
                maintenanceItems: ["deadwood removal", "crown cleaning"],
                maintenancePriority: "low",
                maintenanceTimeline: "Within 12 months",
              }),
            },
            {
              treeNumber: 2,
              speciesCommon: "Monterey Pine",
              speciesScientific: "Pinus radiata",
              dbhInches: 18,
              heightFt: 45,
              canopySpreadFt: 25,
              conditionRating: 2,
              healthNotes:
                "Significant crown thinning with approximately 40% dieback in upper canopy. Pine pitch canker (Fusarium circinatum) symptoms observed including resinous lesions on branches. Bark beetle exit holes noted on lower trunk.",
              structuralNotes:
                "Moderate lean toward adjacent structure (approximately 10 degrees). Two co-dominant stems with included bark at 12-foot height. Evidence of prior branch failure on north side.",
              isProtected: false,
              protectionReason: null,
              recommendedAction: "remove",
              mitigationRequired:
                "No mitigation required — tree does not meet protection thresholds.",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "probable",
                likelihoodOfImpact: "medium",
                consequences: "significant",
                overallRiskRating: "high",
                targetDescription:
                  "Residential structure, driveway, and vehicle parking area",
                maintenanceItems: ["removal"],
                maintenancePriority: "high",
                maintenanceTimeline: "Within 30 days",
              }),
            },
            {
              treeNumber: 3,
              speciesCommon: "Japanese Maple",
              speciesScientific: "Acer palmatum",
              dbhInches: 8,
              heightFt: 15,
              canopySpreadFt: 12,
              conditionRating: 5,
              healthNotes:
                "Excellent health with vibrant foliage color and strong new growth. No signs of disease, pest damage, or nutritional deficiency. Crown is symmetrical and well-formed.",
              structuralNotes:
                "Multi-stemmed form typical of cultivar. All stems well-attached with no included bark. No structural concerns identified.",
              isProtected: false,
              protectionReason: null,
              recommendedAction: "retain",
              status: "assessed",
              typeSpecificData: JSON.stringify({
                likelihoodOfFailure: "improbable",
                likelihoodOfImpact: "very_low",
                consequences: "negligible",
                overallRiskRating: "low",
                targetDescription: "Garden bed and lawn area",
                maintenanceItems: ["routine pruning"],
                maintenancePriority: "low",
                maintenanceTimeline: "Annual maintenance cycle",
              }),
            },
          ],
        },
      },
    });
  } catch (err) {
    // Sample property creation is non-fatal — log and continue
    console.error("Failed to create sample property:", err);
  }

  return NextResponse.json(arborist, { status: 201 });
}
```

### app/api/arborist/photo/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  getArboristUploadDir,
  getArboristServingUrl,
  generateFilename,
} from "@/lib/uploads";

// POST /api/arborist/photo — upload a profile photo
export async function POST(request: NextRequest) {
  try {
    const arborist = await requireArborist();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed: JPG, PNG, WebP, SVG`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10 MB)" },
        { status: 400 }
      );
    }

    // Delete existing photo file if present
    if (arborist.profilePhotoUrl) {
      const existingFilename = arborist.profilePhotoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore if file doesn't exist
        }
      }
    }

    // Save new photo
    const filename = generateFilename(file.name);
    const uploadDir = getArboristUploadDir(arborist.id);
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const photoUrl = getArboristServingUrl(arborist.id, filename);

    // Update arborist record
    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { profilePhotoUrl: photoUrl },
    });

    return NextResponse.json({ url: photoUrl });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

// DELETE /api/arborist/photo — remove the profile photo
export async function DELETE() {
  try {
    const arborist = await requireArborist();

    if (arborist.profilePhotoUrl) {
      const existingFilename = arborist.profilePhotoUrl.split("/").pop();
      if (existingFilename) {
        const existingPath = path.join(
          getArboristUploadDir(arborist.id),
          existingFilename
        );
        try {
          fs.unlinkSync(existingPath);
        } catch {
          // ignore if file doesn't exist
        }
      }
    }

    await prisma.arborist.update({
      where: { id: arborist.id },
      data: { profilePhotoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
```

### app/api/arborist/profile/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// GET /api/arborist/profile — fetch the current arborist profile
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }
    return NextResponse.json(arborist);
  } catch (error) {
    console.error("Error fetching arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to load profile" },
      { status: 500 }
    );
  }
}

// PUT /api/arborist/profile — update arborist profile fields
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Whitelist of updatable fields
    const allowedStringFields = [
      "name",
      "email",
      "isaCertificationNum",
      "companyName",
      "phone",
      "companyAddress",
      "companyPhone",
      "companyEmail",
      "companyWebsite",
      "licenseNumbers",
      "signatureName",
      "additionalCerts",
      "reportDefaults",
    ];

    const updateData: Record<string, string | boolean | null> = {};
    for (const field of allowedStringFields) {
      if (field in body) {
        updateData[field] = body[field] ?? null;
      }
    }
    // Boolean fields
    if ("traqCertified" in body) {
      updateData.traqCertified = !!body.traqCertified;
    }

    const updated = await prisma.arborist.update({
      where: { id: arborist.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating arborist profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
```

### app/api/arborist/usage/route.ts

```typescript
import { NextResponse } from "next/server";
import { requireArborist } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const arborist = await requireArborist();

  // Current month boundaries
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [monthlyLogs, allTimeLogs] = await Promise.all([
    prisma.apiUsageLog.findMany({
      where: {
        arboristId: arborist.id,
        createdAt: { gte: monthStart, lt: monthEnd },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.apiUsageLog.aggregate({
      where: { arboristId: arborist.id },
      _sum: { estimatedCostUsd: true, inputTokens: true, outputTokens: true },
      _count: true,
    }),
  ]);

  // Monthly totals
  const monthlyCost = monthlyLogs.reduce((sum, l) => sum + l.estimatedCostUsd, 0);
  const monthlyInputTokens = monthlyLogs.reduce((sum, l) => sum + l.inputTokens, 0);
  const monthlyOutputTokens = monthlyLogs.reduce((sum, l) => sum + l.outputTokens, 0);

  // Breakdown by endpoint
  const byEndpoint: Record<string, { count: number; cost: number }> = {};
  for (const log of monthlyLogs) {
    if (!byEndpoint[log.endpoint]) {
      byEndpoint[log.endpoint] = { count: 0, cost: 0 };
    }
    byEndpoint[log.endpoint].count++;
    byEndpoint[log.endpoint].cost += log.estimatedCostUsd;
  }

  // Per-report costs (unique reportIds this month)
  const reportIdSet = new Set<string>();
  for (const l of monthlyLogs) {
    if (l.reportId) reportIdSet.add(l.reportId);
  }
  const reportCount = reportIdSet.size;
  const avgCostPerReport = reportCount > 0 ? monthlyCost / reportCount : 0;

  return NextResponse.json({
    monthly: {
      cost: monthlyCost,
      inputTokens: monthlyInputTokens,
      outputTokens: monthlyOutputTokens,
      callCount: monthlyLogs.length,
      reportCount,
      avgCostPerReport,
      byEndpoint,
    },
    allTime: {
      cost: allTimeLogs._sum.estimatedCostUsd ?? 0,
      callCount: allTimeLogs._count,
      inputTokens: allTimeLogs._sum.inputTokens ?? 0,
      outputTokens: allTimeLogs._sum.outputTokens ?? 0,
    },
  });
}
```

### app/api/audio/parse/route.ts

```typescript
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { requireArborist } from "@/lib/auth";
import { logApiUsage } from "@/lib/api-usage";

export async function POST(req: Request) {
  const arborist = await requireArborist();

  const { text } = await req.json();
  if (!text?.trim()) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: `You are an assistant that extracts structured tree assessment data from an arborist's spoken field notes. Extract ONLY the fields that are explicitly mentioned. Return a JSON object with these possible fields:

- speciesCommon (string): Common name of the tree species
- speciesScientific (string): Scientific name if mentioned
- dbhInches (number): Diameter at breast height in inches
- heightFt (number): Height in feet
- canopySpreadFt (number): Canopy spread in feet
- conditionRating (number 0-5): 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent
- healthNotes (string): Any health observations mentioned
- structuralNotes (string): Any structural observations mentioned
- recommendedAction (string): One of "retain", "remove", "prune", "monitor" - only if explicitly stated
- tagNumber (string): Tag number if mentioned

Only include fields that were clearly stated. Do not guess or infer values that weren't mentioned. Return ONLY valid JSON, no explanation.`,
    messages: [{ role: "user", content: text }],
  });

  // Log API usage (fire-and-forget)
  logApiUsage({
    arboristId: arborist.id,
    provider: "anthropic",
    endpoint: "parse-audio",
    model: "claude-sonnet-4-20250514",
    inputTokens: response.usage?.input_tokens ?? 0,
    outputTokens: response.usage?.output_tokens ?? 0,
  });

  try {
    const content = response.content[0];
    if (content.type === "text") {
      // Parse JSON, stripping any markdown fences
      let jsonStr = content.text.trim();
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr
          .replace(/^```(?:json)?\n?/, "")
          .replace(/\n?```$/, "");
      }
      const parsed = JSON.parse(jsonStr);
      return NextResponse.json({ parsed, rawText: text });
    }
  } catch {
    // If parsing fails, return the raw text as healthNotes fallback
    return NextResponse.json({ parsed: { healthNotes: text }, rawText: text });
  }

  return NextResponse.json({ parsed: { healthNotes: text }, rawText: text });
}
```

### app/api/audio/transcribe/route.ts

```typescript
import { NextResponse } from "next/server";
import { getCurrentArborist } from "@/lib/auth";
import { logApiUsage } from "@/lib/api-usage";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob | null;

    if (!audio) {
      return NextResponse.json({ error: "No audio" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "No OPENAI_API_KEY configured" },
        { status: 500 }
      );
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const file = new File([audio], "recording.webm", { type: audio.type });

    const transcription = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file,
      language: "en",
      response_format: "verbose_json",
    });

    // Log API usage if arborist is authenticated (fire-and-forget)
    const arborist = await getCurrentArborist();
    if (arborist) {
      logApiUsage({
        arboristId: arborist.id,
        provider: "openai",
        endpoint: "transcribe",
        model: "whisper-1",
        audioDuration: (transcription as unknown as { duration?: number }).duration ?? null,
      });
    }

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error("Voice transcription error:", error);
    return NextResponse.json(
      { error: "Transcription failed" },
      { status: 500 }
    );
  }
}
```

### app/api/geocode/route.ts

```typescript
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
```

### app/api/ordinances/check/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { checkTreeProtection } from "@/lib/ordinances";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const species = searchParams.get("species");
    const dbh = searchParams.get("dbh");

    if (!city || !species || !dbh) {
      return NextResponse.json(
        { error: "Missing required query parameters: city, species, dbh" },
        { status: 400 }
      );
    }

    const dbhNum = parseFloat(dbh);
    if (isNaN(dbhNum)) {
      return NextResponse.json(
        { error: "dbh must be a valid number" },
        { status: 400 }
      );
    }

    const result = await checkTreeProtection(city, species, dbhNum);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking tree protection:", error);
    return NextResponse.json(
      { error: "Failed to check tree protection" },
      { status: 500 }
    );
  }
}
```

### app/api/ordinances/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ordinances = await prisma.municipalOrdinance.findMany({
      orderBy: { cityName: "asc" },
    });

    const parsed = ordinances.map((ord) => ({
      ...ord,
      protectedSpecies: JSON.parse(ord.protectedSpecies),
      mitigationRules: JSON.parse(ord.mitigationRules),
      heritageTreeRules: JSON.parse(ord.heritageTreeRules),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching ordinances:", error);
    return NextResponse.json(
      { error: "Failed to fetch ordinances" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/audio/[audioId]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getPropertyUploadDir } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error fetching property audio note:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    const audioNote = await prisma.propertyAudioNote.update({
      where: { id: params.audioId },
      data: {
        ...(body.cleanedTranscription !== undefined && {
          cleanedTranscription: body.cleanedTranscription,
        }),
      },
    });

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error updating property audio note:", error);
    return NextResponse.json(
      { error: "Failed to update audio note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  try {
    const { id: propertyId, audioId } = params;

    const existing = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Delete file from disk
    const filePath = path.join(
      getPropertyUploadDir(propertyId, "audio"),
      existing.filename
    );
    try {
      fs.unlinkSync(filePath);
    } catch {
      // ignore
    }

    // Delete database record
    await prisma.propertyAudioNote.delete({ where: { id: audioId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting property audio note:", error);
    return NextResponse.json(
      { error: "Failed to delete audio note" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/audio/[audioId]/transcribe/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; audioId: string } }
) {
  const { id: propertyId, audioId } = params;

  try {
    const audioNote = await prisma.propertyAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Resolve audio file path
    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const audioFilePath = path.join(
      uploadsRoot,
      "properties",
      propertyId,
      "audio",
      audioNote.filename
    );

    if (!fs.existsSync(audioFilePath)) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage: "Audio file not found on disk",
        },
      });
      return NextResponse.json(
        { error: "Audio file not found on disk" },
        { status: 404 }
      );
    }

    // ---- Step 1: Whisper transcription ----
    let rawTranscription: string;

    if (process.env.OPENAI_API_KEY) {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: { status: "transcribing" },
      });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const fileStream = fs.createReadStream(audioFilePath);
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "en",
        response_format: "text",
      });

      rawTranscription =
        typeof transcription === "string"
          ? transcription
          : String(transcription);
    } else {
      // No OpenAI key — mark as ready with placeholder
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "ready",
          rawTranscription: "(No OPENAI_API_KEY configured)",
          cleanedTranscription:
            "(Transcription unavailable — set OPENAI_API_KEY in .env to enable Whisper transcription)",
        },
      });
      return NextResponse.json({ status: "ready", message: "No API key" });
    }

    // Save raw transcription
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        rawTranscription,
        status: "cleaning",
      },
    });

    // ---- Step 2: Claude cleanup ----
    let cleanedTranscription: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `You are cleaning up a voice note from an ISA-certified arborist recording site-level observations at a property. The raw transcription may contain filler words, false starts, repetition, and casual speech.

Clean it up into clear, professional site observation notes that could be included in the executive summary or site observations section of a certified arborist report. Preserve all technical details about the site, soil conditions, access, structures, utilities, slopes, drainage, neighboring properties, and general landscape context. Organize into logical paragraphs if the note covers multiple topics. Do not add information that wasn't in the original. Just clean and structure what's there.

Return ONLY the cleaned text with no preamble or explanation.`,
        messages: [
          {
            role: "user",
            content: `Raw transcription:\n\n${rawTranscription}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      cleanedTranscription = textBlock?.text || rawTranscription;
    } else {
      cleanedTranscription = rawTranscription;
    }

    // Save cleaned transcription and mark as ready
    await prisma.propertyAudioNote.update({
      where: { id: audioId },
      data: {
        cleanedTranscription,
        status: "ready",
      },
    });

    return NextResponse.json({ status: "ready" });
  } catch (error) {
    console.error("Property transcription pipeline error:", error);

    try {
      await prisma.propertyAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage:
            error instanceof Error
              ? error.message
              : "Unknown transcription error",
        },
      });
    } catch {
      // Ignore
    }

    return NextResponse.json(
      { error: "Transcription pipeline failed" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/audio/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getPropertyUploadDir,
  generateFilename,
  getPropertyServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const audioNotes = await prisma.propertyAudioNote.findMany({
      where: { propertyId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching property audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const durationStr = formData.get("durationSeconds") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate type
    const baseType = file.type.split(";")[0].trim();
    if (
      !ALLOWED_AUDIO_TYPES.has(baseType) &&
      !ALLOWED_AUDIO_TYPES.has(file.type)
    ) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    const extMap: Record<string, string> = {
      "audio/webm": ".webm",
      "audio/mp4": ".m4a",
      "audio/wav": ".wav",
      "audio/ogg": ".ogg",
      "audio/mpeg": ".mp3",
    };
    const ext = extMap[baseType] || ".webm";
    const originalName = file.name || `recording${ext}`;

    const filename = generateFilename(originalName);
    const uploadDir = getPropertyUploadDir(propertyId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getPropertyServingUrl(propertyId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.propertyAudioNote.create({
      data: {
        propertyId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading property audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
        },
        reports: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const property = await prisma.property.update({
      where: { id },
      data: {
        ...(body.address !== undefined && { address: body.address }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.zip !== undefined && { zip: body.zip }),
        ...(body.county !== undefined && { county: body.county }),
        ...(body.parcelNumber !== undefined && { parcelNumber: body.parcelNumber }),
        ...(body.lat !== undefined && { lat: body.lat }),
        ...(body.lng !== undefined && { lng: body.lng }),
        ...(body.lotSizeSqft !== undefined && { lotSizeSqft: body.lotSizeSqft }),
        ...(body.homeownerName !== undefined && { homeownerName: body.homeownerName }),
        ...(body.homeownerEmail !== undefined && { homeownerEmail: body.homeownerEmail }),
        ...(body.homeownerPhone !== undefined && { homeownerPhone: body.homeownerPhone }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.reportType !== undefined && { reportType: body.reportType }),
        ...(body.projectDescription !== undefined && { projectDescription: body.projectDescription }),
        ...(body.permitNumber !== undefined && { permitNumber: body.permitNumber }),
        ...(body.developerName !== undefined && { developerName: body.developerName }),
        ...(body.architectName !== undefined && { architectName: body.architectName }),
        ...(body.siteObservations !== undefined && { siteObservations: body.siteObservations }),
        ...(body.scopeOfAssignment !== undefined && { scopeOfAssignment: body.scopeOfAssignment }),
        ...(body.neededByDate !== undefined && {
          neededByDate: body.neededByDate ? new Date(body.neededByDate) : null,
        }),
      },
      include: {
        trees: {
          orderBy: { treeNumber: "asc" },
        },
        reports: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/share/route.ts

```typescript
import { prisma } from "@/lib/db";
import { requireArborist } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arborist = await requireArborist();
    const { id } = params;

    // Verify property belongs to this arborist
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.arboristId !== arborist.id) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    // If already has a share token, return it
    if (property.shareToken) {
      return NextResponse.json({ shareToken: property.shareToken });
    }

    // Generate a new share token
    const shareToken = crypto.randomUUID().slice(0, 12);

    await prisma.property.update({
      where: { id },
      data: { shareToken },
    });

    return NextResponse.json({ shareToken });
  } catch (error) {
    console.error("Error creating share link:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const arborist = await requireArborist();
    const { id } = params;

    // Verify property belongs to this arborist
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.arboristId !== arborist.id) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 403 }
      );
    }

    await prisma.property.update({
      where: { id },
      data: { shareToken: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking share link:", error);
    return NextResponse.json(
      { error: "Failed to revoke share link" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/audio/[audioId]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const audioNote = await prisma.treeAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error fetching audio note:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio note" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.treeAudioNote.findUnique({
      where: { id: params.audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    const audioNote = await prisma.treeAudioNote.update({
      where: { id: params.audioId },
      data: {
        ...(body.cleanedTranscription !== undefined && {
          cleanedTranscription: body.cleanedTranscription,
        }),
      },
    });

    return NextResponse.json(audioNote);
  } catch (error) {
    console.error("Error updating audio note:", error);
    return NextResponse.json(
      { error: "Failed to update audio note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  try {
    const { treeId, audioId } = params;

    const existing = await prisma.treeAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Delete file from disk
    deleteFile(treeId, "audio", existing.filename);

    // Delete database record
    await prisma.treeAudioNote.delete({ where: { id: audioId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting audio note:", error);
    return NextResponse.json(
      { error: "Failed to delete audio note" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/audio/[audioId]/transcribe/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; audioId: string } }
) {
  const { audioId } = params;

  try {
    const audioNote = await prisma.treeAudioNote.findUnique({
      where: { id: audioId },
    });

    if (!audioNote) {
      return NextResponse.json(
        { error: "Audio note not found" },
        { status: 404 }
      );
    }

    // Resolve audio file path
    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const audioFilePath = path.join(
      uploadsRoot,
      "trees",
      params.treeId,
      "audio",
      audioNote.filename
    );

    if (!fs.existsSync(audioFilePath)) {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: { status: "error", errorMessage: "Audio file not found on disk" },
      });
      return NextResponse.json(
        { error: "Audio file not found on disk" },
        { status: 404 }
      );
    }

    // ---- Step 1: Whisper transcription ----
    let rawTranscription: string;

    if (process.env.OPENAI_API_KEY) {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: { status: "transcribing" },
      });

      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const fileStream = fs.createReadStream(audioFilePath);
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
        language: "en",
        response_format: "text",
      });

      rawTranscription = typeof transcription === "string"
        ? transcription
        : String(transcription);
    } else {
      // No OpenAI key — mark as ready with placeholder
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: {
          status: "ready",
          rawTranscription: "(No OPENAI_API_KEY configured)",
          cleanedTranscription:
            "(Transcription unavailable — set OPENAI_API_KEY in .env to enable Whisper transcription)",
        },
      });
      return NextResponse.json({ status: "ready", message: "No API key" });
    }

    // Save raw transcription
    await prisma.treeAudioNote.update({
      where: { id: audioId },
      data: {
        rawTranscription,
        status: "cleaning",
      },
    });

    // ---- Step 2: Claude cleanup ----
    let cleanedTranscription: string;

    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: `You are cleaning up a voice note from an ISA-certified arborist inspecting a tree. The raw transcription may contain filler words, false starts, repetition, and casual speech.

Clean it up into clear, professional field notes that could be included in a certified arborist report. Preserve all technical details (species, measurements, conditions, recommendations). Organize into logical paragraphs if the note covers multiple topics. Do not add information that wasn't in the original. Just clean and structure what's there.

Return ONLY the cleaned text with no preamble or explanation.`,
        messages: [
          {
            role: "user",
            content: `Raw transcription:\n\n${rawTranscription}`,
          },
        ],
      });

      const textBlock = message.content.find((b) => b.type === "text");
      cleanedTranscription = textBlock?.text || rawTranscription;
    } else {
      // No Anthropic key — use raw transcription as cleaned
      cleanedTranscription = rawTranscription;
    }

    // Save cleaned transcription and mark as ready
    await prisma.treeAudioNote.update({
      where: { id: audioId },
      data: {
        cleanedTranscription,
        status: "ready",
      },
    });

    return NextResponse.json({ status: "ready" });
  } catch (error) {
    console.error("Transcription pipeline error:", error);

    // Mark as error
    try {
      await prisma.treeAudioNote.update({
        where: { id: audioId },
        data: {
          status: "error",
          errorMessage:
            error instanceof Error ? error.message : "Unknown transcription error",
        },
      });
    } catch {
      // Ignore if the update fails too
    }

    return NextResponse.json(
      { error: "Transcription pipeline failed" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/audio/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_AUDIO_TYPES,
  MAX_AUDIO_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const audioNotes = await prisma.treeAudioNote.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(audioNotes);
  } catch (error) {
    console.error("Error fetching audio notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id: propertyId, treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const durationStr = formData.get("durationSeconds") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Validate type — check base type (ignore codec params)
    const baseType = file.type.split(";")[0].trim();
    if (!ALLOWED_AUDIO_TYPES.has(baseType) && !ALLOWED_AUDIO_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported audio type: ${file.type}` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        { error: "Audio file too large (max 25 MB)" },
        { status: 400 }
      );
    }

    // Determine file extension from type
    const extMap: Record<string, string> = {
      "audio/webm": ".webm",
      "audio/mp4": ".m4a",
      "audio/wav": ".wav",
      "audio/ogg": ".ogg",
      "audio/mpeg": ".mp3",
    };
    const ext = extMap[baseType] || ".webm";
    const originalName = file.name || `recording${ext}`;

    const filename = generateFilename(originalName);
    const uploadDir = getUploadDir(treeId, "audio");
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const audioUrl = getServingUrl(treeId, "audio", filename);
    const durationSeconds = durationStr ? parseFloat(durationStr) : null;

    const audioNote = await prisma.treeAudioNote.create({
      data: {
        treeRecordId: treeId,
        filename,
        audioUrl,
        durationSeconds,
        status: "transcribing",
      },
    });

    // Fire-and-forget: kick off the transcription pipeline
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(
      `${baseUrl}/api/properties/${propertyId}/trees/${treeId}/audio/${audioNote.id}/transcribe`,
      { method: "POST" }
    ).catch((err) => {
      console.error("Failed to trigger transcription:", err);
    });

    return NextResponse.json(audioNote, { status: 201 });
  } catch (error) {
    console.error("Error uploading audio:", error);
    return NextResponse.json(
      { error: "Failed to upload audio" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/photos/[photoId]/annotate/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUploadDir, getServingUrl, generateFilename, deleteFile } from "@/lib/uploads";
import fs from "fs";
import path from "path";

/**
 * POST — Save an annotated version of a photo.
 * Stores the annotated image alongside the original, updates the TreePhoto
 * record so the annotated version becomes the primary (url/filename) and
 * the original is preserved in originalUrl/originalFilename.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    // Generate filename for annotated version
    const annotatedFilename = generateFilename(`annotated_${photo.filename.replace(/\.[^.]+$/, "")}.png`);
    const uploadDir = getUploadDir(treeId, "photos");
    const filePath = path.join(uploadDir, annotatedFilename);

    // Write annotated image to disk
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const annotatedUrl = getServingUrl(treeId, "photos", annotatedFilename);

    // If already annotated, delete the previous annotated file (but keep original)
    if (photo.isAnnotated && photo.filename) {
      try {
        deleteFile(treeId, "photos", photo.filename);
      } catch {
        // Ignore — file may not exist
      }
    }

    // Store original info (only on first annotation)
    const originalFilename = photo.isAnnotated
      ? photo.originalFilename
      : photo.filename;
    const originalUrl = photo.isAnnotated ? photo.originalUrl : photo.url;

    // Update database record
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: annotatedFilename,
        url: annotatedUrl,
        originalFilename: originalFilename,
        originalUrl: originalUrl,
        isAnnotated: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error saving annotation:", error);
    return NextResponse.json(
      { error: "Failed to save annotation" },
      { status: 500 }
    );
  }
}

/**
 * DELETE — Revert to the original photo (remove annotation).
 * Deletes the annotated file and restores the original url/filename.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const photo = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    if (!photo.isAnnotated || !photo.originalFilename || !photo.originalUrl) {
      return NextResponse.json(
        { error: "Photo is not annotated" },
        { status: 400 }
      );
    }

    // Delete annotated file from disk
    try {
      deleteFile(treeId, "photos", photo.filename);
    } catch {
      // Ignore
    }

    // Restore original
    const updated = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        filename: photo.originalFilename,
        url: photo.originalUrl,
        originalFilename: null,
        originalUrl: null,
        isAnnotated: false,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error reverting annotation:", error);
    return NextResponse.json(
      { error: "Failed to revert annotation" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/photos/[photoId]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/uploads";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { photoId } = params;
    const body = await request.json();

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photo = await prisma.treePhoto.update({
      where: { id: photoId },
      data: {
        ...(body.caption !== undefined && { caption: body.caption }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
        ...(body.category !== undefined && { category: body.category }),
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error("Error updating photo:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string; photoId: string } }
) {
  try {
    const { treeId, photoId } = params;

    const existing = await prisma.treePhoto.findUnique({
      where: { id: photoId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete file from disk
    deleteFile(treeId, "photos", existing.filename);

    // Delete database record
    await prisma.treePhoto.delete({ where: { id: photoId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/photos/reorder/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { error: "orderedIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Batch-update sort orders in a transaction
    await prisma.$transaction(
      orderedIds.map((id: string, index: number) =>
        prisma.treePhoto.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error reordering photos:", error);
    return NextResponse.json(
      { error: "Failed to reorder photos" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/photos/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUploadDir,
  generateFilename,
  getServingUrl,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/lib/uploads";
import fs from "fs";
import path from "path";

/**
 * Extract EXIF GPS coords and date from a JPEG buffer.
 * Returns partial data — fields may be undefined if not present.
 */
function extractExif(buffer: Buffer): {
  lat?: number;
  lng?: number;
  takenAt?: Date;
} {
  try {
    // exif-parser works on JPEG/TIFF buffers
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ExifParser = require("exif-parser");
    const parser = ExifParser.create(buffer);
    parser.enableSimpleValues(true);
    const result = parser.parse();

    const tags = result.tags || {};
    const lat =
      typeof tags.GPSLatitude === "number" ? tags.GPSLatitude : undefined;
    const lng =
      typeof tags.GPSLongitude === "number" ? tags.GPSLongitude : undefined;

    let takenAt: Date | undefined;
    // DateTimeOriginal is a unix timestamp (seconds) in exif-parser
    if (tags.DateTimeOriginal && typeof tags.DateTimeOriginal === "number") {
      takenAt = new Date(tags.DateTimeOriginal * 1000);
    }

    return { lat, lng, takenAt };
  } catch {
    // Not a JPEG, no EXIF, or parse error — return empty
    return {};
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const photos = await prisma.treePhoto.findMany({
      where: { treeRecordId: params.treeId },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { treeId } = params;

    // Verify tree exists
    const tree = await prisma.treeRecord.findUnique({
      where: { id: treeId },
    });
    if (!tree) {
      return NextResponse.json({ error: "Tree not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const captionsRaw = formData.get("captions") as string | null;
    const captions: string[] = captionsRaw ? JSON.parse(captionsRaw) : [];
    const categoriesRaw = formData.get("categories") as string | null;
    const categories: string[] = categoriesRaw
      ? JSON.parse(categoriesRaw)
      : [];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Get current max sort order
    const maxSort = await prisma.treePhoto.aggregate({
      where: { treeRecordId: treeId },
      _max: { sortOrder: true },
    });
    let nextSortOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const uploadDir = getUploadDir(treeId, "photos");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate type
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        continue; // skip unsupported files
      }

      // Validate size
      if (file.size > MAX_IMAGE_SIZE) {
        continue; // skip oversized files
      }

      const filename = generateFilename(file.name);
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      // Extract EXIF data
      const exif = extractExif(buffer);

      const url = getServingUrl(treeId, "photos", filename);
      const caption = captions[i] || null;
      const category = categories[i] || null;

      await prisma.treePhoto.create({
        data: {
          treeRecordId: treeId,
          filename,
          url,
          caption,
          category,
          sortOrder: nextSortOrder++,
          ...(exif.lat !== undefined && { exifLat: exif.lat }),
          ...(exif.lng !== undefined && { exifLng: exif.lng }),
          ...(exif.takenAt !== undefined && { exifTakenAt: exif.takenAt }),
        },
      });
    }

    // Return all photos for the tree
    const allPhotos = await prisma.treePhoto.findMany({
      where: { treeRecordId: treeId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(allPhotos, { status: 201 });
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json(
      { error: "Failed to upload photos" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/[treeId]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const tree = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!tree) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error fetching tree:", error);
    return NextResponse.json(
      { error: "Failed to fetch tree" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;
    const body = await request.json();

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    const tree = await prisma.treeRecord.update({
      where: { id: treeId },
      data: {
        ...(body.pinLat !== undefined && { pinLat: body.pinLat }),
        ...(body.pinLng !== undefined && { pinLng: body.pinLng }),
        ...(body.speciesCommon !== undefined && { speciesCommon: body.speciesCommon }),
        ...(body.speciesScientific !== undefined && { speciesScientific: body.speciesScientific }),
        ...(body.dbhInches !== undefined && { dbhInches: body.dbhInches }),
        ...(body.heightFt !== undefined && { heightFt: body.heightFt }),
        ...(body.canopySpreadFt !== undefined && { canopySpreadFt: body.canopySpreadFt }),
        ...(body.conditionRating !== undefined && { conditionRating: body.conditionRating }),
        ...(body.healthNotes !== undefined && { healthNotes: body.healthNotes }),
        ...(body.structuralNotes !== undefined && { structuralNotes: body.structuralNotes }),
        ...(body.isProtected !== undefined && { isProtected: body.isProtected }),
        ...(body.protectionReason !== undefined && { protectionReason: body.protectionReason }),
        ...(body.recommendedAction !== undefined && { recommendedAction: body.recommendedAction }),
        ...(body.mitigationRequired !== undefined && { mitigationRequired: body.mitigationRequired }),
        ...(body.photos !== undefined && { photos: body.photos }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.tagNumber !== undefined && { tagNumber: body.tagNumber }),
        ...(body.typeSpecificData !== undefined && { typeSpecificData: body.typeSpecificData }),
      },
    });

    return NextResponse.json(tree);
  } catch (error) {
    console.error("Error updating tree:", error);
    return NextResponse.json(
      { error: "Failed to update tree" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; treeId: string } }
) {
  try {
    const { id, treeId } = params;

    const existing = await prisma.treeRecord.findFirst({
      where: {
        id: treeId,
        propertyId: id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Tree not found" },
        { status: 404 }
      );
    }

    await prisma.treeRecord.delete({
      where: { id: treeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tree:", error);
    return NextResponse.json(
      { error: "Failed to delete tree" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/export/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

/** Escape a value for CSV: wrap in double quotes if it contains commas, quotes, or newlines. */
function csvEscape(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
      select: { id: true, address: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const trees = await prisma.treeRecord.findMany({
      where: { propertyId: id },
      orderBy: { treeNumber: "asc" },
    });

    const headers = [
      "Tree #",
      "Tag #",
      "Species (Common)",
      "Species (Scientific)",
      "DBH (inches)",
      "Height (ft)",
      "Canopy Spread (ft)",
      "Condition Rating",
      "Condition Label",
      "Health Notes",
      "Structural Notes",
      "Recommended Action",
      "Protected",
      "Protection Reason",
    ];

    const rows = trees.map((tree) => [
      csvEscape(tree.treeNumber),
      csvEscape(tree.tagNumber),
      csvEscape(tree.speciesCommon),
      csvEscape(tree.speciesScientific),
      csvEscape(tree.dbhInches),
      csvEscape(tree.heightFt),
      csvEscape(tree.canopySpreadFt),
      csvEscape(tree.conditionRating),
      csvEscape(CONDITION_LABELS[tree.conditionRating] ?? ""),
      csvEscape(tree.healthNotes),
      csvEscape(tree.structuralNotes),
      csvEscape(tree.recommendedAction),
      csvEscape(tree.isProtected ? "Yes" : "No"),
      csvEscape(tree.protectionReason),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    // Sanitize address for filename
    const safeAddress = property.address
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 50);
    const filename = `tree_inventory_${safeAddress}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting trees:", error);
    return NextResponse.json(
      { error: "Failed to export trees" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/[id]/trees/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const trees = await prisma.treeRecord.findMany({
      where: { propertyId: id },
      orderBy: { treeNumber: "asc" },
    });

    return NextResponse.json(trees);
  } catch (error) {
    console.error("Error fetching trees:", error);
    return NextResponse.json(
      { error: "Failed to fetch trees" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Verify property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Auto-calculate treeNumber: max existing + 1, or 1 if none exist
    const maxTree = await prisma.treeRecord.findFirst({
      where: { propertyId: id },
      orderBy: { treeNumber: "desc" },
      select: { treeNumber: true },
    });

    const nextTreeNumber = maxTree ? maxTree.treeNumber + 1 : 1;

    const tree = await prisma.treeRecord.create({
      data: {
        propertyId: id,
        treeNumber: nextTreeNumber,
        pinLat: body.pinLat ?? null,
        pinLng: body.pinLng ?? null,
        speciesCommon: body.speciesCommon ?? "",
        speciesScientific: body.speciesScientific ?? "",
        dbhInches: body.dbhInches ?? 0,
        heightFt: body.heightFt ?? null,
        canopySpreadFt: body.canopySpreadFt ?? null,
        conditionRating: body.conditionRating ?? 0,
        healthNotes: body.healthNotes ?? null,
        structuralNotes: body.structuralNotes ?? null,
        isProtected: body.isProtected ?? false,
        protectionReason: body.protectionReason ?? null,
        recommendedAction: body.recommendedAction ?? "retain",
        mitigationRequired: body.mitigationRequired ?? null,
        tagNumber: body.tagNumber ?? null,
        typeSpecificData: body.typeSpecificData ?? null,
      },
    });

    return NextResponse.json(tree, { status: 201 });
  } catch (error) {
    console.error("Error creating tree:", error);
    return NextResponse.json(
      { error: "Failed to create tree" },
      { status: 500 }
    );
  }
}
```

### app/api/properties/route.ts

```typescript
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const properties = await prisma.property.findMany({
      where: { arboristId: arborist.id },
      include: {
        trees: true,
        reports: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    // Add tree count to each property
    const propertiesWithCount = properties.map((property) => ({
      ...property,
      _count: { trees: property.trees.length },
    }));

    return NextResponse.json(propertiesWithCount);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.address || !body.city) {
      return NextResponse.json(
        { error: "Missing required fields: address, city" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        arboristId: arborist.id,
        address: body.address,
        city: body.city,
        county: body.county ?? "San Mateo",
        state: body.state ?? "CA",
        zip: body.zip ?? null,
        parcelNumber: body.parcelNumber ?? null,
        lat: body.lat ?? null,
        lng: body.lng ?? null,
        lotSizeSqft: body.lotSizeSqft ?? null,
        homeownerName: body.homeownerName ?? null,
        homeownerEmail: body.homeownerEmail ?? null,
        homeownerPhone: body.homeownerPhone ?? null,
        reportType: body.reportType ?? "health_assessment",
        projectDescription: body.projectDescription ?? null,
        permitNumber: body.permitNumber ?? null,
        developerName: body.developerName ?? null,
        architectName: body.architectName ?? null,
        neededByDate: body.neededByDate ? new Date(body.neededByDate) : null,
      },
      include: {
        trees: true,
        reports: true,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/[id]/certify/route.ts

```typescript
import { prisma } from "@/lib/db";
import { validateReportForCertification } from "@/lib/report-validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body.eSignatureText) {
      return NextResponse.json(
        { error: "Missing required field: eSignatureText" },
        { status: 400 }
      );
    }

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // Server-side validation gate — block if any check fails
    const validation = await validateReportForCertification(id);
    if (validation.hasFailures) {
      return NextResponse.json(
        {
          error: "Report cannot be certified — resolve required items first",
          validation,
        },
        { status: 400 }
      );
    }

    // Snapshot content before certification
    const certContent = existing.finalContent || existing.aiDraftContent;
    if (certContent) {
      await prisma.reportVersion.create({
        data: {
          reportId: id,
          content: certContent,
          label: "Pre-certification",
        },
      });
    }

    const now = new Date();

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: body.eSignatureText,
        certifiedAt: now,
        status: "certified",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "certified" },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error certifying report:", error);
    return NextResponse.json(
      { error: "Failed to certify report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    if (existing.status !== "certified") {
      return NextResponse.json(
        { error: "Report is not certified" },
        { status: 400 }
      );
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        eSignatureText: null,
        certifiedAt: null,
        status: "review",
      },
    });

    await prisma.treeRecord.updateMany({
      where: { propertyId: report.propertyId },
      data: { status: "assessed" },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error uncertifying report:", error);
    return NextResponse.json(
      { error: "Failed to uncertify report" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/[id]/pdf/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { renderMarkdownToHtml } from "@/lib/markdown";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Professional report-type titles (formal, uppercase style)
// ---------------------------------------------------------------------------
const REPORT_TYPE_TITLES: Record<string, string> = {
  removal_permit: "Tree Removal Permit Assessment",
  health_assessment: "Tree Health Assessment Report",
  tree_valuation: "Tree Appraisal & Valuation Report",
  construction_encroachment: "Tree Protection & Construction Impact Assessment",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let browser;
  try {
    // --- Auth: share token or Clerk session ---
    const url = new URL(request.url);
    const shareToken = url.searchParams.get("token");

    if (shareToken) {
      // Public access via share token — validate token and require certified
      const check = await prisma.report.findUnique({
        where: { id: params.id },
        select: { status: true, property: { select: { shareToken: true } } },
      });
      if (!check || check.property.shareToken !== shareToken || check.status !== "certified") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else {
      // Authenticated access via Clerk
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
              include: {
                treePhotos: { orderBy: { sortOrder: "asc" } },
              },
            },
          },
        },
        arborist: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const content = report.finalContent || report.aiDraftContent || "";
    const property = report.property;
    const trees = property.trees;
    const arborist = report.arborist;
    const isCertified = report.status === "certified";

    const reportTitle =
      REPORT_TYPE_TITLES[report.reportType] ||
      report.reportType
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    // Parse report options
    let reportOpts: Record<string, boolean> = {};
    try {
      reportOpts = JSON.parse(report.reportOptions || "{}");
    } catch {
      /* default empty */
    }

    const includeTraq =
      reportOpts.includeTraq ??
      report.reportType === "health_assessment";
    const includeCoverLetter =
      reportOpts.includeCoverLetter ??
      report.reportType === "removal_permit";
    const includeMitigation = reportOpts.includeMitigation ?? true;
    const includeSiteMap = reportOpts.includeSiteMap ?? true;

    // Render markdown to HTML
    const bodyHtml = renderMarkdownToHtml(content);

    // Build condition labels
    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // Condition color mapping for inventory table
    const conditionColors: Record<number, string> = {
      0: "#6b7280",
      1: "#dc2626",
      2: "#ea580c",
      3: "#d97706",
      4: "#65a30d",
      5: "#16a34a",
    };

    // Action color mapping
    const actionColors: Record<string, string> = {
      retain: "#16a34a",
      remove: "#dc2626",
      prune: "#d97706",
      monitor: "#2563eb",
    };

    // =========================================================================
    // COMPANY LOGO (base64)
    // =========================================================================
    let logoBase64 = "";
    if (arborist.companyLogoUrl) {
      const b64 = photoToBase64(arborist.companyLogoUrl);
      if (b64) logoBase64 = b64;
    }

    // =========================================================================
    // TREE INVENTORY TABLE (with protection status & summary row)
    // =========================================================================
    const actionCounts: Record<string, number> = {};
    trees.forEach((t) => {
      const a = t.recommendedAction || "retain";
      actionCounts[a] = (actionCounts[a] || 0) + 1;
    });
    const summaryParts = Object.entries(actionCounts)
      .map(
        ([action, count]) =>
          `${count} ${action.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`
      )
      .join(", ");

    const treeRows = trees
      .map((tree, idx) => {
        const condLabel =
          conditionLabels[tree.conditionRating] ??
          `${tree.conditionRating}`;
        const condColor =
          conditionColors[tree.conditionRating] ?? "#6b7280";
        const actionRaw = tree.recommendedAction || "";
        const actionLabel =
          actionRaw
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A";
        const actionColor = actionColors[actionRaw] || "#374151";

        // Protection status with shield + code reference
        let protCell = '<span style="color:#ccc;">\u2014</span>';
        if (tree.isProtected) {
          const reason = tree.protectionReason
            ? `<br/><span style="font-size:6.5pt;color:#666;">${esc(tree.protectionReason)}</span>`
            : "";
          protCell = `<span style="color:#2d5016;font-size:10pt;">\u{1F6E1}</span>${reason}`;
        }

        return `
      <tr${idx % 2 === 1 ? ' class="alt"' : ""}>
        <td class="num-cell">${tree.treeNumber}</td>
        <td class="center">${esc(tree.tagNumber || "\u2014")}</td>
        <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
        <td class="num-cell">${tree.dbhInches}"</td>
        <td class="num-cell">${tree.heightFt ? `${tree.heightFt}'` : "\u2014"}</td>
        <td class="num-cell">${tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "\u2014"}</td>
        <td class="center"><span style="color:${condColor}; font-weight:600;">${condLabel}</span> <span style="color:#999; font-size:7pt;">(${tree.conditionRating}/5)</span></td>
        <td class="center">${protCell}</td>
        <td><span style="color:${actionColor}; font-weight:600;">${actionLabel}</span></td>
      </tr>`;
      })
      .join("\n");

    // Summary row
    const summaryRow = `
    <tr class="summary-row">
      <td colspan="3"><strong>TOTAL: ${trees.length} Trees</strong></td>
      <td colspan="6"><strong>Actions:</strong> ${summaryParts}${protectedCount > 0 ? ` &nbsp;|&nbsp; <strong>${protectedCount} Protected</strong>` : ""}</td>
    </tr>`;

    // =========================================================================
    // PHOTO DOCUMENTATION (2-column grid grouped by tree)
    // =========================================================================
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    const photoPages = treesWithPhotos
      .map((tree) => {
        const photos = tree.treePhotos || [];
        // Split into chunks of 4 photos per page
        const chunks: typeof photos[] = [];
        for (let i = 0; i < photos.length; i += 4) {
          chunks.push(photos.slice(i, i + 4));
        }

        return chunks
          .map(
            (chunk, chunkIdx) => `
      <div class="photo-group${chunkIdx > 0 ? " page-break" : ""}">
        ${chunkIdx === 0 ? `<h3 class="photo-tree-header">Tree #${tree.treeNumber} \u2014 ${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</h3>` : `<h3 class="photo-tree-header">Tree #${tree.treeNumber} (continued)</h3>`}
        <div class="photo-grid-2col">
          ${chunk
            .map(
              (
                photo: {
                  url: string;
                  caption?: string | null;
                  isAnnotated?: boolean;
                  originalUrl?: string | null;
                  createdAt?: Date | string;
                  category?: string | null;
                  exifTakenAt?: Date | string | null;
                },
                i: number
              ) => {
                const srcUrl =
                  photo.isAnnotated && photo.originalUrl
                    ? photo.url
                    : photo.url;
                const base64 = photoToBase64(srcUrl);
                const imgSrc = base64 || srcUrl;
                // Prefer EXIF date, fall back to upload date
                const dateSource = photo.exifTakenAt || photo.createdAt;
                const photoDate = dateSource
                  ? new Date(dateSource).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "";
                const catLabel = photo.category
                  ? photo.category.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
                  : "";
                return `
            <div class="photo-cell">
              <img src="${imgSrc}" alt="Tree #${tree.treeNumber} photo ${chunkIdx * 4 + i + 1}" />
              <div class="photo-meta">
                <span class="photo-ref">Tree #${tree.treeNumber}${catLabel ? ` &mdash; ${catLabel}` : ""}${photo.isAnnotated ? " (annotated)" : ""}</span>
                ${photo.caption ? `<span class="photo-caption-text">${esc(photo.caption)}</span>` : ""}
                ${photoDate ? `<span class="photo-date">${photoDate}</span>` : ""}
              </div>
            </div>`;
              }
            )
            .join("")}
        </div>
      </div>`
          )
          .join("\n");
      })
      .join("\n");

    // =========================================================================
    // COVER LETTER (removal permit only, when enabled)
    // =========================================================================
    let coverLetterHtml = "";
    if (includeCoverLetter && report.reportType === "removal_permit") {
      const removalCount = trees.filter(
        (t) => t.recommendedAction === "remove"
      ).length;
      const ordinance = await prisma.municipalOrdinance.findUnique({
        where: { cityName: property.city },
      });

      coverLetterHtml = `
  <div class="cover-letter">
    <div class="cl-letterhead">
      ${arborist.companyName ? `<p class="cl-company">${esc(arborist.companyName)}</p>` : ""}
      ${arborist.companyAddress ? `<p class="cl-contact">${esc(arborist.companyAddress)}</p>` : ""}
      <p class="cl-contact">
        ${[arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).join(" &bull; ")}
      </p>
    </div>

    <p class="cl-date">${dateStr}</p>

    <div class="cl-recipient">
      <p>${esc(property.city)} Planning Department</p>
      <p>Urban Forestry / Tree Preservation</p>
      <p>${esc(property.city)}, ${property.state || "CA"}</p>
    </div>

    <p class="cl-re">
      <strong>RE: Tree Removal Permit Application</strong><br>
      Property: ${esc(property.address)}, ${esc(property.city)}, ${property.state || "CA"}<br>
      ${property.parcelNumber ? `APN: ${esc(property.parcelNumber)}<br>` : ""}
    </p>

    <p>Dear Urban Forestry Division,</p>

    <p>This letter accompanies the attached Arborist Report in support of a tree removal permit application for
    ${removalCount} tree${removalCount !== 1 ? "s" : ""} at the above-referenced property${ordinance?.codeReference ? ` pursuant to ${esc(ordinance.codeReference)}` : ""}.</p>

    <p>As a certified arborist (ISA #${esc(arborist.isaCertificationNum)}), I have conducted a Level 2 Basic Assessment
    of ${trees.length} tree${trees.length !== 1 ? "s" : ""} on the property in accordance with ISA Tree Risk Assessment
    Qualification (TRAQ) methodology and ANSI A300 standards. The attached report provides detailed findings including
    individual tree assessments, risk analysis, and recommendations.</p>

    ${
      protectedCount > 0
        ? `
    <p><strong>Protected Trees:</strong> ${protectedCount} of ${trees.length} trees assessed meet the criteria for
    protected status under the applicable municipal tree ordinance. The report includes detailed justification for
    the requested removal${protectedCount > 1 ? "s" : ""}, including risk assessment findings, retention feasibility
    analysis, and proposed mitigation measures as required.</p>`
        : ""
    }

    <p>The enclosed report includes:</p>
    <ul>
      <li>Complete tree inventory with species, dimensions, and condition ratings</li>
      <li>Individual tree health and structural assessments</li>
      <li>Risk analysis and removal justification for each tree proposed for removal</li>
      ${includeTraq ? "<li>ISA TRAQ Level 2 Basic Assessment forms for each tree</li>" : ""}
      ${includeMitigation && protectedCount > 0 ? "<li>Mitigation requirements and replacement calculations</li>" : ""}
      <li>Arborist certification and credentials</li>
    </ul>

    <p>I am available to discuss these findings or provide additional information as needed to facilitate
    the permit review process. Please do not hesitate to contact me at the information provided above.</p>

    <p>Respectfully submitted,</p>

    <div class="cl-signature">
      <p class="cl-sig-name">${esc(arborist.name)}</p>
      <p>ISA Certified Arborist #${esc(arborist.isaCertificationNum)}</p>
      ${arborist.companyName ? `<p>${esc(arborist.companyName)}</p>` : ""}
    </div>
  </div>
  <div class="page-break"></div>
  `;
    }

    // =========================================================================
    // TRAQ APPENDIX
    // =========================================================================
    let traqAppendix = "";
    if (
      includeTraq &&
      (report.reportType === "health_assessment" ||
        report.reportType === "removal_permit")
    ) {
      const traqForms = trees
        .map((tree) => {
          let data: Record<string, unknown> = {};
          if (tree.typeSpecificData) {
            try {
              data = JSON.parse(tree.typeSpecificData);
            } catch {
              // skip
            }
          }

          const lof = (
            (data.likelihoodOfFailure as string) || ""
          ).toLowerCase();
          const loi = (
            (data.likelihoodOfImpact as string) || ""
          ).toLowerCase();
          const con = ((data.consequences as string) || "").toLowerCase();
          const overallRisk = fmtEnum(data.overallRiskRating as string);
          const overallRiskRaw = (
            (data.overallRiskRating as string) || ""
          ).toLowerCase();
          const target = (data.targetDescription as string) || "";
          const targetZone = (data.targetZone as string) || "";
          const occupancy = (data.occupancyRate as string) || "Frequent";
          const maintenance = Array.isArray(data.maintenanceItems)
            ? (data.maintenanceItems as string[]).join(", ")
            : "None specified";

          const chk = (val: string, match: string) =>
            val === match ? "\u2611" : "\u2610";

          const m1Lookup: Record<string, Record<string, string>> = {
            imminent: {
              very_low: "Unlikely",
              low: "Somewhat likely",
              medium: "Likely",
              high: "Very likely",
            },
            probable: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Somewhat likely",
              high: "Likely",
            },
            possible: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Unlikely",
              high: "Somewhat likely",
            },
            improbable: {
              very_low: "Unlikely",
              low: "Unlikely",
              medium: "Unlikely",
              high: "Unlikely",
            },
          };
          const failureAndImpact =
            lof && loi ? m1Lookup[lof]?.[loi] || "N/A" : "N/A";
          const faiKey = failureAndImpact.toLowerCase().replace(/ /g, "_");

          const m2Lookup: Record<string, Record<string, string>> = {
            very_likely: {
              negligible: "Low",
              minor: "Moderate",
              significant: "High",
              severe: "Extreme",
            },
            likely: {
              negligible: "Low",
              minor: "Moderate",
              significant: "High",
              severe: "High",
            },
            somewhat_likely: {
              negligible: "Low",
              minor: "Low",
              significant: "Moderate",
              severe: "Moderate",
            },
            unlikely: {
              negligible: "Low",
              minor: "Low",
              significant: "Low",
              severe: "Low",
            },
          };
          const computedRisk =
            faiKey && con
              ? m2Lookup[faiKey]?.[con] || overallRisk
              : overallRisk;

          const m1Cell = (rowKey: string, colKey: string) => {
            const isActive = lof === rowKey && loi === colKey;
            return isActive ? 'class="matrix-active"' : "";
          };
          const m2Cell = (rowKey: string, colKey: string) => {
            const isActive = faiKey === rowKey && con === colKey;
            return isActive ? 'class="matrix-active"' : "";
          };

          return `
    <div class="traq-form">
      <div class="traq-header">
        <h3>ISA TRAQ Level 2 \u2014 Basic Assessment</h3>
        <p class="traq-subtitle">Tree Risk Assessment Qualification</p>
      </div>

      <table class="traq-info-table">
        <tr>
          <td class="traq-label">Assessor</td>
          <td>${esc(arborist.name)} (ISA #${esc(arborist.isaCertificationNum)})</td>
          <td class="traq-label">Date</td>
          <td>${dateStr}</td>
        </tr>
        <tr>
          <td class="traq-label">Address</td>
          <td colspan="3">${esc(property.address)}, ${esc(property.city)}, ${property.state || "CA"}</td>
        </tr>
        <tr>
          <td class="traq-label">Tree Species</td>
          <td>${esc(tree.speciesCommon)}${tree.speciesScientific ? ` <em>(${esc(tree.speciesScientific)})</em>` : ""}</td>
          <td class="traq-label">Tree #</td>
          <td>${tree.treeNumber}${tree.tagNumber ? ` (Tag: ${esc(tree.tagNumber)})` : ""}</td>
        </tr>
        <tr>
          <td class="traq-label">DBH</td>
          <td>${tree.dbhInches}"</td>
          <td class="traq-label">Height</td>
          <td>${tree.heightFt ? tree.heightFt + "'" : "N/A"}</td>
        </tr>
        <tr>
          <td class="traq-label">Crown Spread</td>
          <td>${tree.canopySpreadFt ? tree.canopySpreadFt + "'" : "N/A"}</td>
          <td class="traq-label">Condition</td>
          <td>${conditionLabels[tree.conditionRating] ?? tree.conditionRating} (${tree.conditionRating}/5)</td>
        </tr>
      </table>

      <div class="traq-section-header">Targets</div>
      <table class="traq-target-table">
        <thead>
          <tr><th>#</th><th>Target Description</th><th>Target Zone</th><th>Occupancy Rate</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>${esc(target || "\u2014")}</td>
            <td>${esc(targetZone || "\u2014")}</td>
            <td>${esc(occupancy)}</td>
          </tr>
        </tbody>
      </table>

      <div class="traq-section-header">Tree Health &amp; Structural Assessment</div>
      <table class="traq-data-table">
        <tr>
          <td class="traq-label">Tree Health</td>
          <td>
            ${chk(String(tree.conditionRating <= 1 ? 1 : 0), "1")} Dead/Dying &nbsp;
            ${chk(String(tree.conditionRating === 2 ? 1 : 0), "1")} Poor &nbsp;
            ${chk(String(tree.conditionRating === 3 ? 1 : 0), "1")} Fair &nbsp;
            ${chk(String(tree.conditionRating >= 4 ? 1 : 0), "1")} Good
          </td>
        </tr>
        <tr>
          <td class="traq-label">Health Notes</td>
          <td>${esc(tree.healthNotes || "No health defects noted.")}</td>
        </tr>
        <tr>
          <td class="traq-label">Structural Notes</td>
          <td>${esc(tree.structuralNotes || "No structural defects noted.")}</td>
        </tr>
      </table>

      <div class="traq-section-header">Risk Rating</div>
      <table class="traq-risk-table">
        <tr>
          <td class="traq-label">Likelihood of Failure</td>
          <td>
            ${chk(lof, "improbable")} Improbable &nbsp;
            ${chk(lof, "possible")} Possible &nbsp;
            ${chk(lof, "probable")} Probable &nbsp;
            ${chk(lof, "imminent")} Imminent
          </td>
        </tr>
        <tr>
          <td class="traq-label">Likelihood of Impact</td>
          <td>
            ${chk(loi, "very_low")} Very Low &nbsp;
            ${chk(loi, "low")} Low &nbsp;
            ${chk(loi, "medium")} Medium &nbsp;
            ${chk(loi, "high")} High
          </td>
        </tr>
        <tr>
          <td class="traq-label">Consequences</td>
          <td>
            ${chk(con, "negligible")} Negligible &nbsp;
            ${chk(con, "minor")} Minor &nbsp;
            ${chk(con, "significant")} Significant &nbsp;
            ${chk(con, "severe")} Severe
          </td>
        </tr>
      </table>

      <div class="traq-overall-risk traq-risk-${overallRiskRaw || "none"}">
        <strong>OVERALL RISK RATING:</strong>
        <span class="traq-risk-value">${(computedRisk || overallRisk || "N/A").toUpperCase()}</span>
      </div>

      <div class="traq-matrices">
        <div class="matrix-pair">
          <div class="matrix">
            <p class="matrix-title">Matrix 1: Likelihood of Failure &amp; Impact</p>
            <table class="matrix-table">
              <thead>
                <tr><th>Failure \u2193 / Impact \u2192</th><th>Very Low</th><th>Low</th><th>Medium</th><th>High</th></tr>
              </thead>
              <tbody>
                <tr><td>Imminent</td><td ${m1Cell("imminent", "very_low")}>Unlikely</td><td ${m1Cell("imminent", "low")}>Somewhat</td><td ${m1Cell("imminent", "medium")}>Likely</td><td ${m1Cell("imminent", "high")}>Very likely</td></tr>
                <tr><td>Probable</td><td ${m1Cell("probable", "very_low")}>Unlikely</td><td ${m1Cell("probable", "low")}>Unlikely</td><td ${m1Cell("probable", "medium")}>Somewhat</td><td ${m1Cell("probable", "high")}>Likely</td></tr>
                <tr><td>Possible</td><td ${m1Cell("possible", "very_low")}>Unlikely</td><td ${m1Cell("possible", "low")}>Unlikely</td><td ${m1Cell("possible", "medium")}>Unlikely</td><td ${m1Cell("possible", "high")}>Somewhat</td></tr>
                <tr><td>Improbable</td><td ${m1Cell("improbable", "very_low")}>Unlikely</td><td ${m1Cell("improbable", "low")}>Unlikely</td><td ${m1Cell("improbable", "medium")}>Unlikely</td><td ${m1Cell("improbable", "high")}>Unlikely</td></tr>
              </tbody>
            </table>
          </div>
          <div class="matrix">
            <p class="matrix-title">Matrix 2: Risk Rating</p>
            <table class="matrix-table">
              <thead>
                <tr><th>F&amp;I \u2193 / Conseq. \u2192</th><th>Negligible</th><th>Minor</th><th>Significant</th><th>Severe</th></tr>
              </thead>
              <tbody>
                <tr><td>Very likely</td><td ${m2Cell("very_likely", "negligible")}>Low</td><td ${m2Cell("very_likely", "minor")}>Moderate</td><td ${m2Cell("very_likely", "significant")}>High</td><td ${m2Cell("very_likely", "severe")}>Extreme</td></tr>
                <tr><td>Likely</td><td ${m2Cell("likely", "negligible")}>Low</td><td ${m2Cell("likely", "minor")}>Moderate</td><td ${m2Cell("likely", "significant")}>High</td><td ${m2Cell("likely", "severe")}>High</td></tr>
                <tr><td>Somewhat likely</td><td ${m2Cell("somewhat_likely", "negligible")}>Low</td><td ${m2Cell("somewhat_likely", "minor")}>Low</td><td ${m2Cell("somewhat_likely", "significant")}>Moderate</td><td ${m2Cell("somewhat_likely", "severe")}>Moderate</td></tr>
                <tr><td>Unlikely</td><td ${m2Cell("unlikely", "negligible")}>Low</td><td ${m2Cell("unlikely", "minor")}>Low</td><td ${m2Cell("unlikely", "significant")}>Low</td><td ${m2Cell("unlikely", "severe")}>Low</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="traq-section-header">Recommended Action &amp; Mitigation</div>
      <table class="traq-data-table">
        <tr>
          <td class="traq-label">Recommended Action</td>
          <td>${fmtEnum(tree.recommendedAction)}</td>
          <td class="traq-label">Priority</td>
          <td>${fmtEnum((data.maintenancePriority as string) || "N/A")}</td>
        </tr>
        <tr>
          <td class="traq-label">Timeline</td>
          <td>${(data.maintenanceTimeline as string) || "N/A"}</td>
          <td class="traq-label">Mitigation</td>
          <td>${tree.mitigationRequired || "None"}</td>
        </tr>
        <tr>
          <td class="traq-label">Maintenance Items</td>
          <td colspan="3">${esc(maintenance)}</td>
        </tr>
      </table>

      <div class="traq-footer-note">
        <p>Inspection limitations: Visual assessment from ground level. Tools: N/A</p>
        <p>Data: \u2611 Final &nbsp; \u2610 Preliminary</p>
      </div>

      <div class="traq-signature">
        <div class="traq-sig-line">
          <span>${isCertified ? esc(report.eSignatureText || arborist.name) : "________________________"}</span>
          <p>Assessor Signature</p>
        </div>
        <div class="traq-sig-line">
          <span>${arborist.isaCertificationNum}</span>
          <p>ISA Certification #</p>
        </div>
        <div class="traq-sig-line">
          <span>${dateStr}</span>
          <p>Date</p>
        </div>
      </div>
    </div>`;
        })
        .join("\n");

      traqAppendix = `
      <div class="page-break"></div>
      <h2 class="section-title">Appendix: TRAQ Risk Assessment Forms</h2>
      <p class="appendix-subtitle">ISA Tree Risk Assessment Qualification (TRAQ) \u2014 Level 2 Basic Assessment</p>
      ${traqForms}`;
    }

    // =========================================================================
    // MITIGATION SUMMARY TABLE
    // =========================================================================
    let mitigationHtml = "";
    if (includeMitigation) {
      const protectedRemovalTrees = trees.filter(
        (t) => t.isProtected && t.recommendedAction === "remove"
      );

      if (protectedRemovalTrees.length > 0) {
        const ordinance = await prisma.municipalOrdinance.findUnique({
          where: { cityName: property.city },
        });

        let mitigationRules: Record<string, unknown> = {};
        if (ordinance?.mitigationRules) {
          try {
            mitigationRules = JSON.parse(ordinance.mitigationRules);
          } catch {
            /* ignore */
          }
        }

        const replacementRatio =
          (mitigationRules.replantingRatio as string) || "3:1";
        const minBoxSize =
          (mitigationRules.minBoxSize as string) || "24-inch box";
        const inLieuFeePerTree =
          (mitigationRules.inLieuFeePerTree as number) || null;

        const ratioNum = parseInt(replacementRatio.split(":")[0]) || 3;

        const rows = protectedRemovalTrees
          .map((tree) => {
            const replacementsRequired = ratioNum;
            const feeTotal = inLieuFeePerTree
              ? inLieuFeePerTree * replacementsRequired
              : null;

            return `
          <tr>
            <td class="center">#${tree.treeNumber}</td>
            <td>${esc(tree.speciesCommon)}</td>
            <td class="center">${tree.dbhInches}"</td>
            <td>${esc(tree.protectionReason || "Protected")}</td>
            <td class="center">${replacementRatio}</td>
            <td class="center">${replacementsRequired} tree${replacementsRequired !== 1 ? "s" : ""}</td>
            <td class="center">${minBoxSize} min.</td>
            ${inLieuFeePerTree ? `<td class="center">$${feeTotal!.toLocaleString()}</td>` : ""}
          </tr>`;
          })
          .join("\n");

        const totalReplacements = protectedRemovalTrees.length * ratioNum;
        const totalFee = inLieuFeePerTree
          ? totalReplacements * inLieuFeePerTree
          : null;

        mitigationHtml = `
    <div class="page-break"></div>
    <h2 class="section-title">Appendix: Mitigation Requirements Summary</h2>
    <p class="mitigation-intro">The following mitigation is required for the removal of protected trees
    ${ordinance?.codeReference ? `per ${esc(ordinance.codeReference)}` : "per applicable municipal tree ordinance"}.</p>

    <table class="mitigation-table">
      <thead>
        <tr>
          <th>Tree</th>
          <th>Species</th>
          <th>DBH</th>
          <th>Protection Basis</th>
          <th>Ratio</th>
          <th>Replacements</th>
          <th>Min. Size</th>
          ${inLieuFeePerTree ? "<th>In-Lieu Fee</th>" : ""}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
      <tfoot>
        <tr class="mitigation-total">
          <td colspan="5"><strong>TOTAL MITIGATION REQUIRED</strong></td>
          <td class="center"><strong>${totalReplacements} trees</strong></td>
          <td class="center"><strong>${minBoxSize}</strong></td>
          ${totalFee ? `<td class="center"><strong>$${totalFee.toLocaleString()}</strong></td>` : ""}
        </tr>
      </tfoot>
    </table>

    ${
      inLieuFeePerTree
        ? `
    <p class="mitigation-note">
      <strong>Note:</strong> The property owner may elect to plant replacement trees on-site at the required ratio
      and size, or pay the in-lieu fee of $${inLieuFeePerTree.toLocaleString()} per required replacement tree to
      the city's tree replacement fund. Contact the city Urban Forestry division for current fee schedules and
      approved replacement species lists.
    </p>`
        : `
    <p class="mitigation-note">
      <strong>Note:</strong> Contact the ${esc(property.city)} Urban Forestry division for current mitigation
      requirements, approved replacement species lists, and any applicable in-lieu fee options.
    </p>`
    }
    `;
      }
    }

    // =========================================================================
    // ADDITIONAL CERTS
    // =========================================================================
    let additionalCertsArr: string[] = [];
    try {
      const parsed = JSON.parse(arborist.additionalCerts || "[]");
      if (Array.isArray(parsed)) additionalCertsArr = parsed;
    } catch {
      if (
        arborist.additionalCerts &&
        arborist.additionalCerts !== "[]"
      ) {
        additionalCertsArr = arborist.additionalCerts
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }

    // =========================================================================
    // SITE MAP — Mapbox Static Image with colored tree pins
    // =========================================================================
    let siteMapHtml = "";
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (
      includeSiteMap &&
      property.lat &&
      property.lng &&
      mapboxToken
    ) {
      try {
        // Build pin overlays for Mapbox Static API
        const pinOverlays: string[] = [];
        for (const t of trees) {
          if (t.pinLat == null || t.pinLng == null) continue;

          // Determine pin color (same logic as property-map.tsx)
          let color = "9ca3af"; // gray — unassessed
          if (t.recommendedAction === "remove") {
            color = "dc2626"; // red
          } else if (t.conditionRating != null) {
            if (t.conditionRating <= 1) color = "dc2626"; // red
            else if (t.conditionRating === 2) color = "ea580c"; // orange
            else if (t.conditionRating === 3) color = "eab308"; // yellow
            else if (t.conditionRating === 4) color = "84cc16"; // lime
            else if (t.conditionRating >= 5) color = "22c55e"; // green
          }

          pinOverlays.push(
            `pin-s-${t.treeNumber}+${color}(${t.pinLng},${t.pinLat})`
          );
        }

        if (pinOverlays.length > 0) {
          const overlay = pinOverlays.join(",");
          const staticUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${overlay}/${property.lng},${property.lat},18,0/1200x800@2x?access_token=${mapboxToken}`;

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);

          const mapRes = await fetch(staticUrl, { signal: controller.signal });
          clearTimeout(timeout);

          if (mapRes.ok) {
            const mapBuffer = Buffer.from(await mapRes.arrayBuffer());
            const mapBase64 = `data:image/png;base64,${mapBuffer.toString("base64")}`;

            // Count trees by condition for legend
            const condCounts = { good: 0, fair: 0, poor: 0, critical: 0, unassessed: 0 };
            for (const t of trees) {
              if (t.pinLat == null || t.pinLng == null) continue;
              if (t.recommendedAction === "remove" || (t.conditionRating != null && t.conditionRating <= 1)) condCounts.critical++;
              else if (t.conditionRating === 2) condCounts.poor++;
              else if (t.conditionRating === 3) condCounts.fair++;
              else if (t.conditionRating != null && t.conditionRating >= 4) condCounts.good++;
              else condCounts.unassessed++;
            }

            const legendItems: string[] = [];
            if (condCounts.good > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#22c55e"></span> Good/Excellent (${condCounts.good})</span>`);
            if (condCounts.fair > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#eab308"></span> Fair (${condCounts.fair})</span>`);
            if (condCounts.poor > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#ea580c"></span> Poor (${condCounts.poor})</span>`);
            if (condCounts.critical > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#dc2626"></span> Critical/Remove (${condCounts.critical})</span>`);
            if (condCounts.unassessed > 0) legendItems.push(`<span class="legend-item"><span class="legend-dot" style="background:#9ca3af"></span> Unassessed (${condCounts.unassessed})</span>`);

            siteMapHtml = `
              <div class="page-break"></div>
              <h2 class="section-title">Site Map</h2>
              <div class="site-map-container">
                <img class="site-map-image" src="${mapBase64}" alt="Satellite map showing assessed trees" />
                <p class="site-map-caption">${esc(property.address)}, ${esc(property.city)} &mdash; ${pinOverlays.length} tree${pinOverlays.length !== 1 ? "s" : ""} assessed</p>
                <div class="site-map-legend">${legendItems.join("")}</div>
              </div>`;
          }
        }
      } catch (err) {
        // Gracefully degrade — skip site map if fetch fails
        console.error("Site map generation failed:", err);
      }
    }

    // =========================================================================
    // TABLE OF CONTENTS — section list
    // =========================================================================
    const tocSections: { title: string; desc: string }[] = [];
    if (siteMapHtml) {
      tocSections.push({
        title: "Site Map",
        desc: "Satellite overview with tree locations",
      });
    }
    tocSections.push({
      title: "Tree Inventory",
      desc: `${trees.length} trees assessed`,
    });

    // Parse H1 sections from the report body
    const h1Regex = /^#\s+(.+)$/gm;
    let h1Match;
    while ((h1Match = h1Regex.exec(content)) !== null) {
      tocSections.push({ title: h1Match[1], desc: "" });
    }

    if (treesWithPhotos.length > 0) {
      tocSections.push({
        title: "Photo Documentation",
        desc: `${treesWithPhotos.reduce((sum, t) => sum + (t.treePhotos?.length || 0), 0)} photos`,
      });
    }
    if (traqAppendix) {
      tocSections.push({
        title: "Appendix: TRAQ Risk Assessment Forms",
        desc: `${trees.length} forms`,
      });
    }
    if (mitigationHtml) {
      tocSections.push({
        title: "Appendix: Mitigation Requirements Summary",
        desc: "",
      });
    }
    tocSections.push({
      title: "Arborist Certification & Signature",
      desc: "",
    });

    const tocRows = tocSections
      .map(
        (s, i) => `
      <tr>
        <td class="toc-num">${i + 1}.</td>
        <td class="toc-title">${esc(s.title)}<span class="toc-dots"></span></td>
        <td class="toc-desc">${esc(s.desc)}</td>
      </tr>`
      )
      .join("\n");

    // =========================================================================
    // COVER PAGE — "Prepared For" block
    // =========================================================================
    const preparedForLines: string[] = [];
    if (property.homeownerName) {
      preparedForLines.push(esc(property.homeownerName));
    }
    preparedForLines.push(esc(property.address));
    preparedForLines.push(
      `${esc(property.city)}, ${esc(property.state || "CA")}${property.zip ? ` ${esc(property.zip)}` : ""}`
    );
    preparedForLines.push(""); // spacer
    preparedForLines.push(`City of ${esc(property.city)}`);
    preparedForLines.push("Planning & Development Services");

    // =========================================================================
    // SIGNATURE BLOCK
    // =========================================================================
    const certDateStr = report.certifiedAt
      ? new Date(report.certifiedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : dateStr;

    const signatureBlock = `
    <div class="signature-block">
      <h2 class="section-title">Arborist Certification & Signature</h2>
      <div class="cert-statement">
        <p>I, the undersigned, certify that I have personally inspected the tree(s) described in this
        report and that the information contained herein is accurate to the best of my professional
        knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based
        on my professional training, experience, and education.</p>
        <p>I have no personal interest or bias with respect to the parties involved. The analysis,
        opinions, and conclusions stated herein are my own, and are based on current scientific
        procedures and facts.</p>
      </div>

      <div class="sig-area">
        ${
          isCertified
            ? `
        <div class="sig-line-group">
          <div class="sig-esignature">${esc(report.eSignatureText || arborist.name)}</div>
          <div class="sig-rule"></div>
          <div class="sig-label">Signature</div>
        </div>
        `
            : `
        <div class="sig-line-group">
          <div class="sig-rule" style="margin-top:40px;"></div>
          <div class="sig-label">Signature</div>
        </div>
        `
        }
        <div class="sig-details">
          <div class="sig-detail-row"><span class="sig-detail-label">Name:</span> ${esc(arborist.name)}</div>
          <div class="sig-detail-row"><span class="sig-detail-label">ISA Certified Arborist:</span> #${esc(arborist.isaCertificationNum)}</div>
          ${arborist.traqCertified ? `<div class="sig-detail-row"><span class="sig-detail-label">Qualification:</span> ISA Tree Risk Assessment Qualified</div>` : ""}
          ${additionalCertsArr.length > 0 ? `<div class="sig-detail-row"><span class="sig-detail-label">Additional Certifications:</span> ${esc(additionalCertsArr.join(", "))}</div>` : ""}
          ${arborist.licenseNumbers ? `<div class="sig-detail-row"><span class="sig-detail-label">License(s):</span> ${esc(arborist.licenseNumbers)}</div>` : ""}
          ${arborist.companyName ? `<div class="sig-detail-row"><span class="sig-detail-label">Company:</span> ${esc(arborist.companyName)}</div>` : ""}
          <div class="sig-detail-row"><span class="sig-detail-label">Date:</span> ${certDateStr}</div>
        </div>
      </div>
    </div>`;

    // Draft watermark
    const draftWatermark = !isCertified
      ? `<div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-35deg); font-size:140pt; font-weight:bold; color:rgba(200,200,200,0.08); letter-spacing:24px; pointer-events:none; z-index:0; white-space:nowrap;">DRAFT</div>`
      : "";

    // Header/footer values for Puppeteer
    const headerCompany = esc(
      arborist.companyName || arborist.name
    );
    const headerTitle = esc(reportTitle);

    // =========================================================================
    // FULL HTML DOCUMENT
    // =========================================================================
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${esc(reportTitle)} \u2014 ${esc(property.address)}, ${esc(property.city)}</title>
  <style>
    /* =========================================================================
       BASE TYPOGRAPHY & LAYOUT
       ========================================================================= */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;600;700&family=Dancing+Script:wght@400;700&display=swap');

    * { box-sizing: border-box; }
    body {
      font-family: 'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1a1a1a;
      font-size: 10.5pt;
      line-height: 1.55;
      margin: 0;
      padding: 0;
      position: relative;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-break { page-break-before: always; }

    /* Cover page: hide from running header/footer via @page :first */
    @page :first {
      margin-top: 0.5in;
      margin-bottom: 0.5in;
    }

    /* =========================================================================
       COVER LETTER
       ========================================================================= */
    .cover-letter {
      font-size: 10.5pt;
      line-height: 1.6;
      padding: 0.5in 0;
    }
    .cl-letterhead {
      border-bottom: 2px solid #2d5016;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .cl-company {
      font-size: 14pt;
      font-weight: bold;
      color: #2d5016;
      margin: 0;
    }
    .cl-contact {
      font-size: 9pt;
      color: #666;
      margin: 2px 0;
    }
    .cl-date { margin-bottom: 20px; }
    .cl-recipient { margin-bottom: 20px; }
    .cl-recipient p { margin: 0; }
    .cl-re {
      margin-bottom: 20px;
      padding: 8px 12px;
      border-left: 3px solid #2d5016;
      background-color: #f8faf5;
    }
    .cover-letter ul { padding-left: 24px; margin: 8px 0; }
    .cover-letter li { margin-bottom: 4px; }
    .cl-signature { margin-top: 40px; }
    .cl-sig-name {
      font-weight: bold;
      font-style: italic;
      margin-bottom: 2px;
    }
    .cl-signature p { margin: 2px 0; font-size: 9.5pt; }

    /* =========================================================================
       COVER PAGE
       ========================================================================= */
    .cover-page {
      display: flex;
      flex-direction: column;
      min-height: 9.5in;
      position: relative;
      padding: 0;
    }

    /* Company block */
    .cover-company-block {
      text-align: center;
      padding: 40px 0 24px 0;
      border-bottom: 2.5px solid #2d5016;
      margin-bottom: 0;
    }
    .cover-logo-img {
      max-width: 180px;
      max-height: 80px;
      width: auto;
      height: auto;
      margin-bottom: 12px;
    }
    .cover-company-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18pt;
      font-weight: 700;
      color: #2d5016;
      letter-spacing: 1px;
      margin: 0;
    }
    .cover-company-detail {
      font-size: 9.5pt;
      color: #666;
      margin: 2px 0;
      line-height: 1.4;
    }

    /* Report title area */
    .cover-title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 36px 40px;
    }
    .cover-rule {
      width: 240px;
      border: none;
      border-top: 3px double #2d5016;
      margin: 0 auto 28px auto;
    }
    .cover-report-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26pt;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }
    .cover-property-address {
      font-size: 15pt;
      color: #333;
      margin: 0 0 4px 0;
      font-weight: 400;
    }
    .cover-property-city {
      font-size: 11pt;
      color: #666;
      margin: 0 0 20px 0;
    }
    .cover-status-badge {
      font-size: 8.5pt;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      display: inline-block;
      padding: 5px 24px;
      border-radius: 20px;
      margin-bottom: 4px;
    }
    .badge-certified { background: #2d5016; color: #fff; }
    .badge-draft { background: #e5e7eb; color: #6b7280; }
    .cover-rule-bottom {
      width: 240px;
      border: none;
      border-top: 3px double #2d5016;
      margin: 24px auto 0 auto;
    }

    /* Prepared For block */
    .cover-prepared-block {
      display: flex;
      justify-content: space-between;
      padding: 24px 0;
      gap: 40px;
    }
    .cover-prepared-col {
      flex: 1;
    }
    .cover-prepared-label {
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #999;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .cover-prepared-value {
      font-size: 10pt;
      color: #333;
      line-height: 1.5;
    }
    .cover-prepared-value .name {
      font-weight: 600;
      color: #1a1a1a;
      font-size: 10.5pt;
    }

    /* Cover footer */
    .cover-footer {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid #ddd;
      margin-top: auto;
    }
    .cover-credentials-line {
      font-size: 9pt;
      color: #555;
      margin: 2px 0;
    }
    .cover-draft-badge {
      font-size: 14pt;
      color: #b0b0b0;
      letter-spacing: 6px;
      text-transform: uppercase;
      border: 2px solid #d0d0d0;
      padding: 6px 32px;
      display: inline-block;
      margin-bottom: 12px;
    }
    .cover-confidential {
      font-size: 7pt;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 8px;
    }

    /* =========================================================================
       TABLE OF CONTENTS
       ========================================================================= */
    .toc-page {
      padding: 40px 0;
    }
    .toc-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18pt;
      color: #2d5016;
      font-weight: 700;
      margin: 0 0 6px 0;
      border-bottom: 2.5px solid #2d5016;
      padding-bottom: 8px;
    }
    .toc-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    .toc-table tr {
      border-bottom: 1px dotted #ccc;
    }
    .toc-table td {
      padding: 8px 4px;
      vertical-align: bottom;
    }
    .toc-num {
      width: 30px;
      color: #2d5016;
      font-weight: 600;
      font-size: 10pt;
    }
    .toc-table .toc-title-cell {
      font-size: 10.5pt;
      color: #1a1a1a;
      font-weight: 500;
    }
    .toc-dots {
      display: inline;
    }
    .toc-desc {
      text-align: right;
      font-size: 9pt;
      color: #888;
      white-space: nowrap;
      width: 120px;
    }
    .toc-note {
      margin-top: 20px;
      font-size: 9pt;
      color: #999;
      font-style: italic;
    }

    /* =========================================================================
       SITE MAP
       ========================================================================= */
    .site-map-container {
      text-align: center;
      margin-top: 10px;
    }
    .site-map-image {
      width: 100%;
      max-width: 100%;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    .site-map-caption {
      margin-top: 10px;
      font-size: 10pt;
      color: #555;
      font-style: italic;
    }
    .site-map-legend {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 9pt;
      color: #666;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .legend-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(0,0,0,0.15);
    }

    /* =========================================================================
       REPORT BODY
       ========================================================================= */
    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      color: #2d5016;
      margin: 28px 0 8px 0;
      border-bottom: 2.5px solid #2d5016;
      padding-bottom: 5px;
      font-weight: 700;
    }
    .report-body h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      color: #2d5016;
      border-bottom: 2.5px solid #2d5016;
      padding-bottom: 5px;
      margin: 32px 0 10px 0;
      font-weight: 700;
    }
    .report-body h2 {
      font-size: 12pt;
      color: #1a1a1a;
      margin: 22px 0 8px 0;
      font-weight: 600;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 3px;
    }
    .report-body h3 {
      font-size: 10.5pt;
      color: #333;
      margin: 16px 0 6px 0;
      font-weight: 600;
    }
    .report-body p { margin: 6px 0; }
    .report-body ul, .report-body ol { margin: 6px 0; padding-left: 24px; }
    .report-body li { margin: 3px 0; }
    .report-body hr { border: none; border-top: 1px solid #ccc; margin: 16px 0; }
    .report-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9pt;
    }
    .report-body table th {
      background: #2d5016;
      color: white;
      padding: 5px 8px;
      text-align: left;
      font-weight: bold;
      font-size: 8.5pt;
    }
    .report-body table td {
      padding: 4px 8px;
      border: 1px solid #ddd;
    }
    .report-body table tr:nth-child(even) { background: #f7f9f5; }

    /* Limitations section — distinct visual treatment */
    .report-body h1:has(+ *),
    .report-body h2:has(+ *) {
      /* These are generic selectors; the limitations box is applied via JS post-processing */
    }
    .limitations-box {
      background-color: #f5f5f2;
      border: 1px solid #e0e0dd;
      border-radius: 3px;
      padding: 14px 18px;
      margin: 12px 0 20px 0;
      font-size: 9.5pt;
      color: #555;
      line-height: 1.5;
    }
    .limitations-box h1,
    .limitations-box h2,
    .limitations-box h3 {
      font-size: 11pt;
      color: #444;
      border-bottom-color: #ddd;
      margin-top: 0;
    }
    .limitations-box p {
      font-size: 9.5pt;
      color: #555;
    }
    .limitations-box ul, .limitations-box ol {
      font-size: 9.5pt;
      color: #555;
    }

    /* =========================================================================
       TREE INVENTORY TABLE
       ========================================================================= */
    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 8.5pt;
    }
    .inventory-table th {
      background: #2d5016;
      color: white;
      padding: 7px 6px;
      text-align: left;
      font-weight: 600;
      font-size: 8pt;
      letter-spacing: 0.3px;
    }
    .inventory-table td {
      padding: 5px 6px;
      border-bottom: 1px solid #e5e7eb;
    }
    .inventory-table tr.alt { background: #f7f9f5; }
    .inventory-table td.center,
    .inventory-table th.center { text-align: center; }
    .inventory-table td.num-cell { text-align: right; font-variant-numeric: tabular-nums; }
    .inventory-table th.num-cell { text-align: right; }
    .summary-row {
      background-color: #f0f4ec !important;
      border-top: 2px solid #2d5016;
      font-size: 8.5pt;
    }
    .summary-row td {
      padding: 7px 6px;
    }
    .inventory-legend {
      font-size: 7.5pt;
      color: #999;
      margin-top: 6px;
      font-style: italic;
    }

    /* =========================================================================
       PHOTO DOCUMENTATION — 2-column grid
       ========================================================================= */
    .photo-group {
      margin-bottom: 20px;
    }
    .photo-tree-header {
      font-family: 'Source Sans 3', sans-serif;
      font-size: 11pt;
      color: #2d5016;
      margin: 0 0 10px 0;
      font-weight: 600;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
    }
    .photo-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .photo-cell {
      page-break-inside: avoid;
    }
    .photo-cell img {
      width: 100%;
      max-height: 230px;
      object-fit: contain;
      border: 1px solid #d0d0d0;
      border-radius: 3px;
      background: #fafafa;
    }
    .photo-meta {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin-top: 4px;
    }
    .photo-ref {
      font-size: 7.5pt;
      color: #2d5016;
      font-weight: 600;
    }
    .photo-caption-text {
      font-size: 8pt;
      color: #555;
      font-style: italic;
    }
    .photo-date {
      font-size: 7pt;
      color: #999;
    }

    /* =========================================================================
       TRAQ FORM STYLES
       ========================================================================= */
    .appendix-subtitle {
      font-size: 9pt;
      color: #666;
      font-style: italic;
      margin: 0 0 12px 0;
    }
    .traq-form {
      page-break-inside: avoid;
      page-break-before: always;
      border: 1.5px solid #3d5c2e;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 9px;
      line-height: 1.3;
    }
    .traq-header {
      text-align: center;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #3d5c2e;
      padding-bottom: 6px;
    }
    .traq-header h3 {
      font-size: 13px;
      margin: 0;
      color: #3d5c2e;
    }
    .traq-subtitle {
      font-size: 9px;
      color: #666;
      margin: 2px 0 0 0;
    }
    .traq-section-header {
      background: #3d5c2e;
      color: white;
      font-weight: 700;
      font-size: 9px;
      padding: 3px 8px;
      margin: 8px 0 4px 0;
      border-radius: 2px;
    }
    .traq-info-table, .traq-data-table, .traq-target-table, .traq-risk-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 4px;
    }
    .traq-info-table td, .traq-data-table td, .traq-target-table td, .traq-target-table th, .traq-risk-table td {
      padding: 3px 6px;
      border: 0.5px solid #ddd;
      font-size: 9px;
      vertical-align: top;
    }
    .traq-label {
      font-weight: 700;
      width: 120px;
      background: #f8f8f8;
      white-space: nowrap;
      font-size: 8.5px;
      color: #444;
    }
    .traq-target-table th {
      background: #f0f0f0;
      font-size: 8px;
      font-weight: 700;
      text-align: left;
      padding: 2px 6px;
    }
    .traq-overall-risk {
      border: 2px solid #3d5c2e;
      padding: 6px 12px;
      margin: 8px 0;
      text-align: center;
      font-size: 11px;
    }
    .traq-risk-value {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      margin-left: 8px;
    }
    .traq-risk-low { background-color: #e8f5e9; }
    .traq-risk-low .traq-risk-value { color: #2d5016; }
    .traq-risk-moderate { background-color: #fff8e1; }
    .traq-risk-moderate .traq-risk-value { color: #b8860b; }
    .traq-risk-high { background-color: #fff3e0; }
    .traq-risk-high .traq-risk-value { color: #e65100; }
    .traq-risk-extreme { background-color: #ffebee; }
    .traq-risk-extreme .traq-risk-value { color: #c62828; }
    .traq-risk-none { background-color: #f0f0f0; }
    .traq-risk-none .traq-risk-value { color: #666; }
    .traq-matrices { margin: 6px 0; }
    .matrix-pair { display: flex; gap: 8px; }
    .matrix { flex: 1; }
    .matrix-title {
      font-size: 8px;
      font-weight: 700;
      margin: 0 0 2px 0;
      text-align: center;
    }
    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7px;
    }
    .matrix-table th, .matrix-table td {
      padding: 1px 3px;
      border: 0.5px solid #ccc;
      text-align: center;
    }
    .matrix-table th {
      background: #f0f0f0;
      font-weight: 700;
    }
    .matrix-table td:first-child, .matrix-table th:first-child {
      text-align: left;
      font-weight: 600;
      width: 70px;
    }
    .matrix-active {
      background-color: #3d5c2e;
      color: white;
      font-weight: 700;
    }
    .traq-signature {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #ccc;
    }
    .traq-sig-line { text-align: center; width: 30%; }
    .traq-sig-line span {
      display: block;
      font-size: 9px;
      font-style: italic;
      border-bottom: 1px solid #333;
      padding-bottom: 2px;
      margin-bottom: 2px;
      min-height: 14px;
    }
    .traq-sig-line p {
      font-size: 7px;
      color: #666;
      margin: 2px 0 0 0;
    }
    .traq-footer-note {
      margin-top: 6px;
      font-size: 8px;
      color: #666;
      border-top: 0.5px solid #ddd;
      padding-top: 4px;
    }
    .traq-footer-note p { margin: 1px 0; }

    /* =========================================================================
       MITIGATION TABLE
       ========================================================================= */
    .mitigation-intro {
      font-size: 10pt;
      margin-bottom: 12px;
    }
    .mitigation-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
      margin-bottom: 16px;
    }
    .mitigation-table th {
      background-color: #2d5016;
      color: white;
      padding: 6px 8px;
      text-align: left;
      font-size: 8.5pt;
    }
    .mitigation-table td {
      border: 1px solid #ddd;
      padding: 5px 8px;
    }
    .mitigation-total {
      background-color: #f5f5f0;
      border-top: 2px solid #2d5016;
    }
    .mitigation-note {
      font-size: 8.5pt;
      color: #555;
      font-style: italic;
      border-left: 3px solid #eab308;
      padding: 6px 10px;
      background-color: #fefce8;
    }
    .center { text-align: center; }

    /* =========================================================================
       SIGNATURE BLOCK
       ========================================================================= */
    .signature-block {
      page-break-before: always;
      padding-top: 20px;
    }
    .cert-statement {
      border: 2px solid #2d5016;
      background: #f8faf5;
      padding: 24px 28px;
      margin: 16px 0 32px 0;
      border-radius: 2px;
    }
    .cert-statement p {
      font-size: 10pt;
      line-height: 1.6;
      margin: 6px 0;
    }
    .sig-area {
      margin-top: 24px;
    }
    .sig-line-group {
      margin-bottom: 24px;
    }
    .sig-esignature {
      font-family: 'Dancing Script', cursive;
      font-size: 22pt;
      color: #1a1a1a;
      padding-bottom: 4px;
    }
    .sig-rule {
      border-bottom: 1px solid #333;
      width: 340px;
      margin-bottom: 4px;
    }
    .sig-label {
      font-size: 8pt;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .sig-details {
      margin-top: 16px;
      border: 1.5px solid #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
    }
    .sig-detail-row {
      padding: 6px 14px;
      font-size: 9.5pt;
      border-bottom: 1px solid #f0f0f0;
    }
    .sig-detail-row:last-child { border-bottom: none; }
    .sig-detail-row:nth-child(even) { background: #fafbf8; }
    .sig-detail-label {
      font-weight: 600;
      color: #555;
      display: inline-block;
      min-width: 180px;
    }

    /* Draft not-certified watermark in signature area */
    .draft-not-certified {
      text-align: center;
      margin: 24px 0;
      padding: 12px;
      border: 2px dashed #ccc;
      color: #999;
      font-size: 14pt;
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    /* =========================================================================
       UTILITY
       ========================================================================= */
    .avoid-break { page-break-inside: avoid; }
  </style>
</head>
<body>
  ${draftWatermark}

  <!-- ========== COVER LETTER (removal permits) ========== -->
  ${coverLetterHtml}

  <!-- ========== COVER PAGE ========== -->
  <div class="cover-page">
    <!-- Company block — centered logo + info -->
    <div class="cover-company-block">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Company Logo" class="cover-logo-img" /><br/>` : ""}
      <div class="cover-company-name">${esc(arborist.companyName || arborist.name)}</div>
      ${arborist.companyAddress ? `<div class="cover-company-detail">${esc(arborist.companyAddress)}</div>` : ""}
      <div class="cover-company-detail">
        ${[arborist.companyPhone, arborist.companyEmail, arborist.companyWebsite].filter(Boolean).map((v) => esc(v!)).join(" &nbsp;&bull;&nbsp; ")}
      </div>
    </div>

    <!-- Report title -->
    <div class="cover-title-area">
      <hr class="cover-rule" />
      <div class="cover-report-title">${esc(reportTitle)}</div>
      <div class="cover-property-address">${esc(property.address)}</div>
      <div class="cover-property-city">
        ${esc(property.city)}, ${esc(property.state || "CA")}${property.county ? ` \u2014 ${esc(property.county)} County` : ""}
      </div>
      <div class="cover-status-badge ${isCertified ? "badge-certified" : "badge-draft"}">
        ${isCertified ? "\u2713 Certified" : "Draft"}
      </div>
      <hr class="cover-rule-bottom" />
    </div>

    <!-- Prepared For / Prepared By -->
    <div class="cover-prepared-block">
      <div class="cover-prepared-col">
        <div class="cover-prepared-label">Prepared For</div>
        <div class="cover-prepared-value">
          ${preparedForLines.map((line) => (line === "" ? "<br/>" : `<div${line.startsWith(esc(property.homeownerName || "__NOMATCH__")) ? ' class="name"' : ""}>${line}</div>`)).join("\n")}
        </div>
      </div>
      <div class="cover-prepared-col" style="text-align:right;">
        <div class="cover-prepared-label">Report Date</div>
        <div class="cover-prepared-value" style="font-weight:600;margin-bottom:12px;">${dateStr}</div>
        ${property.parcelNumber ? `<div class="cover-prepared-label">APN</div><div class="cover-prepared-value">${esc(property.parcelNumber)}</div>` : ""}
      </div>
    </div>

    <!-- Cover footer -->
    <div class="cover-footer">
      ${!isCertified ? '<div class="cover-draft-badge">DRAFT</div><br/>' : ""}
      <div class="cover-credentials-line">${esc(arborist.name)} &nbsp;&bull;&nbsp; ISA Certified Arborist #${esc(arborist.isaCertificationNum)}</div>
      ${arborist.traqCertified ? '<div class="cover-credentials-line">ISA Tree Risk Assessment Qualified</div>' : ""}
      <div class="cover-confidential">Confidential \u2014 Prepared for property owner and authorized parties only</div>
    </div>
  </div>

  <!-- ========== TABLE OF CONTENTS ========== -->
  <div class="page-break"></div>
  <div class="toc-page">
    <div class="toc-title">Table of Contents</div>
    <table class="toc-table">
      ${tocRows}
    </table>
    <p class="toc-note">
      <!-- TODO: Exact page numbers require a two-pass PDF render. Section titles are listed for reference. -->
      This report contains ${trees.length} trees assessed across ${tocSections.length} sections.
    </p>
  </div>

  <!-- ========== SITE MAP ========== -->
  ${siteMapHtml}

  <!-- ========== TREE INVENTORY TABLE ========== -->
  <div class="page-break"></div>
  <h2 class="section-title">Tree Inventory</h2>
  <table class="inventory-table">
    <thead>
      <tr>
        <th class="num-cell" style="width:5%">#</th>
        <th class="center" style="width:5%">Tag</th>
        <th>Species</th>
        <th class="num-cell" style="width:6%">DBH</th>
        <th class="num-cell" style="width:5%">Ht.</th>
        <th class="num-cell" style="width:6%">Canopy</th>
        <th class="center" style="width:12%">Condition</th>
        <th class="center" style="width:8%">Protection</th>
        <th style="width:10%">Action</th>
      </tr>
    </thead>
    <tbody>
      ${treeRows}
      ${summaryRow}
    </tbody>
  </table>
  <p class="inventory-legend">
    Condition: 0 = Dead &bull; 1 = Critical &bull; 2 = Poor &bull; 3 = Fair &bull; 4 = Good &bull; 5 = Excellent &nbsp;|&nbsp;
    \u{1F6E1} = Protected under local tree ordinance
  </p>

  <!-- ========== REPORT BODY ========== -->
  <div class="page-break"></div>
  <div class="report-body">
    ${bodyHtml}
  </div>

  <!-- ========== PHOTO DOCUMENTATION ========== -->
  ${
    treesWithPhotos.length > 0
      ? `
  <div class="page-break"></div>
  <h2 class="section-title">Photo Documentation</h2>
  ${photoPages}`
      : ""
  }

  <!-- ========== TRAQ APPENDIX ========== -->
  ${traqAppendix}

  <!-- ========== MITIGATION SUMMARY ========== -->
  ${mitigationHtml}

  <!-- ========== SIGNATURE BLOCK ========== -->
  ${signatureBlock}

</body>
</html>`;

    // =========================================================================
    // POST-PROCESS: Wrap Limitations section in a gray box
    // =========================================================================
    // Find the "Limitations and Assumptions" section in the rendered HTML
    // and wrap its content in a .limitations-box div
    let processedHtml = html;
    const limRegex =
      /(<h[12][^>]*>(?:[^<]*Limitations?\s+and\s+Assumptions?[^<]*)<\/h[12]>)([\s\S]*?)(?=<h[12][ >]|<div class="page-break"|<div class="signature-block"|$)/i;
    const limMatch = processedHtml.match(limRegex);
    if (limMatch) {
      const fullMatch = limMatch[0];
      const heading = limMatch[1];
      const sectionContent = limMatch[2];
      const replacement = `${heading}<div class="limitations-box">${sectionContent}</div>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    }

    // =========================================================================
    // RENDER PDF
    // =========================================================================
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(processedHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "1in",
        right: "0.85in",
        bottom: "0.85in",
        left: "0.85in",
      },
      displayHeaderFooter: true,
      // Running header: company left, report title right, hairline rule
      // Cover page (page 1) gets blank header via conditional display
      headerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; padding:0 0.85in; margin:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:4px; border-bottom:0.5px solid #ccc;">
            <span style="font-weight:600;">${headerCompany}</span>
            <span style="font-style:italic;">${headerTitle}</span>
          </div>
        </div>
      `,
      // Page X of Y, centered, gray
      footerTemplate: `
        <div style="width:100%; font-size:9px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#666; text-align:center; padding:0 0.85in;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();
    browser = undefined;

    const filename = `Arborist_Report_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fmtEnum(value: string | undefined | null): string {
  if (!value) return "N/A";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Convert a serving URL like /api/uploads/trees/{id}/photos/{file}
 * to a base64 data URI by reading the file from disk.
 */
function photoToBase64(photoUrl: string): string | null {
  try {
    // Strip the /api/uploads/ prefix to get the relative path within uploads/
    const relativePath = photoUrl.replace(/^\/api\/uploads\//, "");
    const uploadsRoot = path.join(process.cwd(), "uploads");
    const photoPath = path.resolve(uploadsRoot, relativePath);

    // Security: prevent path traversal
    if (!photoPath.startsWith(uploadsRoot)) return null;
    if (!fs.existsSync(photoPath)) return null;

    const photoData = fs.readFileSync(photoPath);
    const ext = path.extname(photoPath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".heic"
            ? "image/heic"
            : "image/jpeg";

    return `data:${mimeType};base64,${photoData.toString("base64")}`;
  } catch {
    return null;
  }
}
```

### app/api/reports/[id]/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.report.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // Snapshot previous content as a version before overwriting
    if (body.finalContent !== undefined) {
      const previousContent = existing.finalContent || existing.aiDraftContent;
      if (previousContent && previousContent !== body.finalContent) {
        await prisma.reportVersion.create({
          data: {
            reportId: id,
            content: previousContent,
            label: "Edit",
          },
        });
      }
    }

    // Validate permitStatus if provided
    const VALID_PERMIT_STATUSES = [null, "submitted", "under_review", "approved", "denied", "revision_requested"];
    if (body.permitStatus !== undefined && !VALID_PERMIT_STATUSES.includes(body.permitStatus)) {
      return NextResponse.json({ error: "Invalid permit status" }, { status: 400 });
    }

    const report = await prisma.report.update({
      where: { id },
      data: {
        ...(body.finalContent !== undefined && { finalContent: body.finalContent }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.eSignatureText !== undefined && { eSignatureText: body.eSignatureText }),
        ...(body.reportOptions !== undefined && { reportOptions: body.reportOptions }),
        // Permit lifecycle fields
        ...(body.permitStatus !== undefined && { permitStatus: body.permitStatus }),
        ...(body.submittedAt !== undefined && { submittedAt: body.submittedAt }),
        ...(body.submittedTo !== undefined && { submittedTo: body.submittedTo }),
        ...(body.reviewerName !== undefined && { reviewerName: body.reviewerName }),
        ...(body.reviewerNotes !== undefined && { reviewerNotes: body.reviewerNotes }),
        ...(body.conditionsOfApproval !== undefined && { conditionsOfApproval: body.conditionsOfApproval }),
        ...(body.denialReason !== undefined && { denialReason: body.denialReason }),
        ...(body.approvedAt !== undefined && { approvedAt: body.approvedAt }),
        ...(body.permitExpiresAt !== undefined && { permitExpiresAt: body.permitExpiresAt }),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/[id]/validate/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateReportForCertification } from "@/lib/report-validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await validateReportForCertification(params.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error validating report:", error);
    return NextResponse.json(
      { error: "Failed to validate report" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/[id]/versions/route.ts

```typescript
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const versions = await prisma.reportVersion.findMany({
      where: { reportId: id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        label: true,
        content: true,
        createdAt: true,
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error("Error fetching report versions:", error);
    return NextResponse.json(
      { error: "Failed to fetch versions" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/[id]/word/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { markdownToDocxElements } from "@/lib/markdown-to-docx";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  ShadingType,
  BorderStyle,
  ImageRun,
  PageBreak,
} from "docx";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        property: {
          include: {
            trees: {
              orderBy: { treeNumber: "asc" },
              include: {
                treePhotos: { orderBy: { sortOrder: "asc" } },
              },
            },
          },
        },
        arborist: true,
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const content = report.finalContent || report.aiDraftContent || "";
    const property = report.property;
    const trees = property.trees;
    const arborist = report.arborist;
    const isCertified = report.status === "certified";

    const reportTypeLabel = report.reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const protectedCount = trees.filter((t) => t.isProtected).length;

    const conditionLabels: Record<number, string> = {
      0: "Dead",
      1: "Critical",
      2: "Poor",
      3: "Fair",
      4: "Good",
      5: "Excellent",
    };

    // ------------------------------------------------------------------
    // COVER PAGE section
    // ------------------------------------------------------------------

    const coverChildren: (Paragraph | Table)[] = [];

    // Logo
    if (arborist.companyLogoUrl) {
      try {
        const urlParts = arborist.companyLogoUrl.replace(/^\/api\/uploads\//, "");
        const logoPath = path.join(process.cwd(), "uploads", urlParts);

        if (fs.existsSync(logoPath)) {
          const logoData = fs.readFileSync(logoPath);
          const ext = path.extname(logoPath).toLowerCase();

          if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
            coverChildren.push(
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    data: logoData,
                    transformation: { width: 160, height: 80 },
                    type: ext === ".png" ? "png" : "jpg",
                  }),
                ],
                spacing: { after: 200 },
              })
            );
          }
        }
      } catch {
        // Skip logo on error
      }
    }

    // Company name
    if (arborist.companyName) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: arborist.companyName,
              bold: true,
              size: 28,
              color: "333333",
            }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    // Contact info
    const contactParts = [
      arborist.companyAddress,
      arborist.companyPhone,
      arborist.companyEmail,
      arborist.companyWebsite,
    ].filter(Boolean);
    if (contactParts.length > 0) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: contactParts.join(" \u2022 "),
              size: 18,
              color: "666666",
            }),
          ],
          spacing: { after: 600 },
        })
      );
    }

    // Separator
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "333333" },
        },
        spacing: { after: 600 },
        children: [],
      })
    );

    // Title
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "ARBORIST REPORT",
            bold: true,
            size: 56,
            color: "1a1a1a",
          }),
        ],
        spacing: { after: 120 },
      })
    );

    // Address
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: property.address, size: 28, bold: true }),
        ],
        spacing: { after: 60 },
      })
    );

    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${property.city}, ${property.state || "CA"}${property.county ? ` \u2014 ${property.county} County` : ""}`,
            size: 22,
            color: "666666",
          }),
        ],
        spacing: { after: 200 },
      })
    );

    // Report type
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: reportTypeLabel,
            size: 22,
            color: "555555",
          }),
        ],
        spacing: { after: 600 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
        },
      })
    );

    // Meta info
    const metaLines = [
      `Prepared by: ${arborist.name}, ISA #${arborist.isaCertificationNum}`,
      `Date: ${dateStr}`,
      `Property APN: ${property.parcelNumber || "N/A"}`,
      `Trees Assessed: ${trees.length}${protectedCount > 0 ? ` (${protectedCount} protected)` : ""}`,
    ];

    for (const line of metaLines) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: line, size: 20, color: "555555" })],
          spacing: { after: 40 },
        })
      );
    }

    // Draft label
    if (!isCertified) {
      coverChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "DRAFT",
              bold: true,
              size: 32,
              color: "999999",
            }),
          ],
          spacing: { before: 400 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "cccccc" },
          },
        })
      );
    }

    // ------------------------------------------------------------------
    // BODY section children
    // ------------------------------------------------------------------

    const bodyChildren: (Paragraph | Table)[] = [];

    // ---- Tree Inventory Table ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Tree Inventory",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 100, after: 120 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    const inventoryHeaders = [
      "Tree #",
      "Tag",
      "Species",
      "DBH",
      "Height",
      "Canopy",
      "Condition",
      "Protected",
      "Action",
    ];

    const treeHeader = new TableRow({
      tableHeader: true,
      children: inventoryHeaders.map(
        (h) =>
          new TableCell({
            shading: {
              type: ShadingType.SOLID,
              color: "333333",
              fill: "333333",
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: h,
                    bold: true,
                    color: "ffffff",
                    size: 16,
                    font: "Helvetica",
                  }),
                ],
              }),
            ],
          })
      ),
    });

    const treeDataRows = trees.map(
      (tree, idx) =>
        new TableRow({
          children: [
            cellParagraph(String(tree.treeNumber), AlignmentType.CENTER),
            cellParagraph(tree.tagNumber || "\u2014"),
            cellParagraph(
              `${tree.speciesCommon}${tree.speciesScientific ? ` (${tree.speciesScientific})` : ""}`
            ),
            cellParagraph(`${tree.dbhInches}"`, AlignmentType.CENTER),
            cellParagraph(
              tree.heightFt ? `${tree.heightFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.canopySpreadFt ? `${tree.canopySpreadFt}'` : "N/A",
              AlignmentType.CENTER
            ),
            cellParagraph(
              conditionLabels[tree.conditionRating] ??
                String(tree.conditionRating),
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.isProtected ? "Yes" : "No",
              AlignmentType.CENTER
            ),
            cellParagraph(
              tree.recommendedAction
                ?.replace(/_/g, " ")
                .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "N/A"
            ),
          ].map(
            (para) =>
              new TableCell({
                shading:
                  idx % 2 === 1
                    ? {
                        type: ShadingType.SOLID,
                        color: "f7f7f7",
                        fill: "f7f7f7",
                      }
                    : undefined,
                children: [para],
              })
          ),
        })
    );

    bodyChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [treeHeader, ...treeDataRows],
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Condition Scale: 0=Dead, 1=Critical, 2=Poor, 3=Fair, 4=Good, 5=Excellent",
            size: 16,
            color: "999999",
            italics: true,
          }),
        ],
        spacing: { before: 40, after: 200 },
      })
    );

    // Page break before report body
    bodyChildren.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    // ---- Report Content (markdown → docx) ----
    const contentElements = markdownToDocxElements(content);
    bodyChildren.push(...contentElements);

    // ---- Photo Documentation ----
    const treesWithPhotos = trees.filter(
      (t) => t.treePhotos && t.treePhotos.length > 0
    );
    if (treesWithPhotos.length > 0) {
      bodyChildren.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "Photo Documentation",
              bold: true,
              size: 28,
              color: "1a1a1a",
              font: "Helvetica",
            }),
          ],
          spacing: { before: 400, after: 120 },
          pageBreakBefore: true,
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
          },
        })
      );

      for (const tree of treesWithPhotos) {
        bodyChildren.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: `Tree #${tree.treeNumber} \u2014 ${tree.speciesCommon}`,
                bold: true,
                size: 24,
                color: "333333",
                font: "Helvetica",
              }),
            ],
            spacing: { before: 200, after: 80 },
          })
        );

        for (const photo of tree.treePhotos) {
          try {
            const urlPath = photo.url.replace(/^\/api\/uploads\//, "");
            const photoPath = path.join(process.cwd(), "uploads", urlPath);

            if (fs.existsSync(photoPath)) {
              const photoData = fs.readFileSync(photoPath);
              const ext = path.extname(photoPath).toLowerCase();

              if (
                ext === ".png" ||
                ext === ".jpg" ||
                ext === ".jpeg" ||
                ext === ".webp"
              ) {
                bodyChildren.push(
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: photoData,
                        transformation: { width: 300, height: 200 },
                        type: ext === ".png" ? "png" : "jpg",
                      }),
                    ],
                    spacing: { after: 40 },
                  })
                );

                if (photo.caption) {
                  bodyChildren.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: photo.caption,
                          italics: true,
                          size: 18,
                          color: "666666",
                        }),
                      ],
                      spacing: { after: 120 },
                    })
                  );
                }
              }
            }
          } catch {
            // Skip photo on error
          }
        }
      }
    }

    // ---- Certification Section ----
    bodyChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Arborist Certification",
            bold: true,
            size: 28,
            color: "1a1a1a",
            font: "Helvetica",
          }),
        ],
        spacing: { before: 400, after: 120 },
        pageBreakBefore: true,
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 2, color: "333333" },
        },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I, the undersigned, certify that I have personally inspected the tree(s) described in this report and that the information contained herein is accurate to the best of my professional knowledge and belief. I am an ISA Certified Arborist and the opinions expressed are based on my professional training, experience, and education.",
            size: 20,
          }),
        ],
        spacing: { after: 80 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "I have no personal interest or bias with respect to the parties involved. The analysis, opinions, and conclusions stated herein are my own, and are based on current scientific procedures and facts.",
            size: 20,
          }),
        ],
        spacing: { after: 200 },
      })
    );

    if (isCertified) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Electronically Signed: ",
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: report.eSignatureText || "",
              size: 20,
              italics: true,
            }),
          ],
          spacing: { after: 60 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "cccccc" },
          },
        })
      );
    }

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Name: ", bold: true, size: 20 }),
          new TextRun({ text: arborist.name, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    bodyChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "ISA Certification #: ",
            bold: true,
            size: 20,
          }),
          new TextRun({ text: arborist.isaCertificationNum, size: 20 }),
        ],
        spacing: { after: 40 },
      })
    );

    if (arborist.companyName) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Company: ", bold: true, size: 20 }),
            new TextRun({ text: arborist.companyName, size: 20 }),
          ],
          spacing: { after: 40 },
        })
      );
    }

    if (isCertified && report.certifiedAt) {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Date Certified: ", bold: true, size: 20 }),
            new TextRun({
              text: new Date(report.certifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              size: 20,
            }),
          ],
        })
      );
    } else {
      bodyChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "This report has not yet been certified.",
              size: 20,
              color: "999999",
              italics: true,
            }),
          ],
          spacing: { before: 80 },
        })
      );
    }

    // ------------------------------------------------------------------
    // Build the Document with two sections: cover page + body
    // ------------------------------------------------------------------

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "ordered-list",
            levels: [
              {
                level: 0,
                format: "decimal",
                text: "%1.",
                alignment: AlignmentType.START,
              },
            ],
          },
        ],
      },
      styles: {
        default: {
          document: {
            run: {
              font: "Georgia",
              size: 22,
            },
          },
          heading1: {
            run: {
              font: "Helvetica",
              size: 28,
              bold: true,
              color: "1a1a1a",
            },
            paragraph: {
              spacing: { before: 360, after: 120 },
            },
          },
          heading2: {
            run: {
              font: "Helvetica",
              size: 24,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 240, after: 80 },
            },
          },
          heading3: {
            run: {
              font: "Helvetica",
              size: 22,
              bold: true,
              color: "333333",
            },
            paragraph: {
              spacing: { before: 200, after: 60 },
            },
          },
        },
      },
      sections: [
        // Cover page section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: coverChildren,
        },
        // Body section
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children: bodyChildren,
        },
      ],
    });

    // ------------------------------------------------------------------
    // Generate the buffer and return
    // ------------------------------------------------------------------

    const buffer = await Packer.toBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    const filename = `Arborist_Report_${property.address.replace(/[^a-zA-Z0-9]/g, "_")}.docx`;

    return new NextResponse(uint8, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Word generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate Word document" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helper: create a simple cell paragraph
// ---------------------------------------------------------------------------

function cellParagraph(
  text: string,
  alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.START
): Paragraph {
  return new Paragraph({
    alignment,
    children: [new TextRun({ text, size: 16 })],
  });
}
```

### app/api/reports/route.ts

```typescript
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const arborist = await prisma.arborist.findUnique({
      where: { clerkUserId: userId },
    });
    if (!arborist) {
      return NextResponse.json(
        { error: "No arborist found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.propertyId || !body.reportType) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, reportType" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: body.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const report = await prisma.report.create({
      data: {
        propertyId: body.propertyId,
        arboristId: arborist.id,
        reportType: body.reportType,
        aiDraftContent: body.aiDraftContent ?? null,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
```

### app/api/reports/usage/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { requireArborist } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const arborist = await requireArborist();

  const reportId = req.nextUrl.searchParams.get("reportId");
  if (!reportId) {
    return NextResponse.json({ error: "reportId required" }, { status: 400 });
  }

  const logs = await prisma.apiUsageLog.findMany({
    where: {
      arboristId: arborist.id,
      reportId,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalCost = logs.reduce((sum, l) => sum + l.estimatedCostUsd, 0);

  return NextResponse.json({ totalCost, logs });
}
```

### app/api/uploads/[...path]/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { resolveUploadPath, getMimeType } from "@/lib/uploads";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path: segments } = params;

    if (!segments || segments.length === 0) {
      return NextResponse.json({ error: "No path specified" }, { status: 400 });
    }

    const relativePath = segments.join("/");
    const absolutePath = resolveUploadPath(relativePath);

    if (!absolutePath) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) {
      return NextResponse.json(
        { error: "Not a file" },
        { status: 400 }
      );
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const mimeType = getMimeType(relativePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving upload:", error);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}
```

### lib/api-queue.ts

```typescript
"use client";

// ---------------------------------------------------------------------------
// Offline API Queue — stores failed requests in localStorage and replays
// them when the app comes back online.
// ---------------------------------------------------------------------------

export interface QueuedRequest {
  id: string;
  endpoint: string;
  method: "POST" | "PUT";
  body: string; // JSON stringified
  timestamp: number;
  retryCount: number;
  treeLocalId?: string; // dedup key for new trees (POST)
  propertyId?: string;
}

const QUEUE_KEY = "treecertify_queue";
const MAX_RETRIES = 3;

// ---------------------------------------------------------------------------
// Read / write helpers
// ---------------------------------------------------------------------------

export function getQueue(): QueuedRequest[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveQueue(queue: QueuedRequest[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    /* localStorage full — best-effort */
  }
}

// ---------------------------------------------------------------------------
// Enqueue a failed request (with dedup)
// ---------------------------------------------------------------------------

export function enqueueRequest(
  req: Omit<QueuedRequest, "id" | "timestamp" | "retryCount">,
  setPendingCount?: (count: number) => void
): string {
  const queue = getQueue();

  // Dedup: find existing item that should be replaced
  let existingIdx = -1;
  if (req.method === "PUT") {
    // For PUT: same endpoint = same resource, last-write-wins
    existingIdx = queue.findIndex(
      (q) => q.endpoint === req.endpoint && q.method === "PUT"
    );
  } else if (req.method === "POST" && req.treeLocalId) {
    // For POST: same treeLocalId = same pending tree, replace
    existingIdx = queue.findIndex(
      (q) =>
        q.endpoint === req.endpoint &&
        q.method === "POST" &&
        q.treeLocalId === req.treeLocalId
    );
  }

  const id = existingIdx >= 0 ? queue[existingIdx].id : crypto.randomUUID();
  const item: QueuedRequest = {
    ...req,
    id,
    timestamp: Date.now(),
    retryCount: 0,
  };

  if (existingIdx >= 0) {
    queue[existingIdx] = item;
  } else {
    queue.push(item);
  }

  saveQueue(queue);
  setPendingCount?.(queue.length);
  return id;
}

// ---------------------------------------------------------------------------
// Process the queue (FIFO). Called when app comes back online.
// ---------------------------------------------------------------------------

export async function processQueue(
  setPendingCount?: (count: number) => void
): Promise<{ succeeded: number; failed: number }> {
  const queue = getQueue();
  if (queue.length === 0) return { succeeded: 0, failed: 0 };

  let succeeded = 0;
  let failed = 0;
  const remaining: QueuedRequest[] = [];

  for (const item of queue) {
    try {
      const res = await fetch(item.endpoint, {
        method: item.method,
        headers: { "Content-Type": "application/json" },
        body: item.body,
      });

      if (res.ok) {
        succeeded++;
      } else if (res.status >= 400 && res.status < 500) {
        // Client error (e.g. 404, 422) — don't retry
        failed++;
      } else {
        // Server error — retry if under limit
        if (item.retryCount < MAX_RETRIES) {
          remaining.push({ ...item, retryCount: item.retryCount + 1 });
        } else {
          failed++;
        }
      }
    } catch {
      // Network error — retry if under limit
      if (item.retryCount < MAX_RETRIES) {
        remaining.push({ ...item, retryCount: item.retryCount + 1 });
      } else {
        failed++;
      }
    }
  }

  saveQueue(remaining);
  setPendingCount?.(remaining.length);
  return { succeeded, failed };
}

// ---------------------------------------------------------------------------
// Remove a specific item (e.g. after a successful online save)
// ---------------------------------------------------------------------------

export function dequeueRequest(
  id: string,
  setPendingCount?: (count: number) => void
): void {
  const queue = getQueue().filter((q) => q.id !== id);
  saveQueue(queue);
  setPendingCount?.(queue.length);
}
```

### lib/api-usage.ts

```typescript
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Pricing constants (per-unit rates as of 2026-03)
// ---------------------------------------------------------------------------

export const PRICING = {
  anthropic: {
    "claude-sonnet-4-20250514": {
      inputPerMillion: 3.0,
      outputPerMillion: 15.0,
    },
  },
  openai: {
    "whisper-1": {
      perMinute: 0.006,
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Cost estimation helpers
// ---------------------------------------------------------------------------

export function estimateAnthropicCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const rates =
    (PRICING.anthropic as Record<string, { inputPerMillion: number; outputPerMillion: number }>)[
      model
    ] ?? PRICING.anthropic["claude-sonnet-4-20250514"];

  return (
    (inputTokens / 1_000_000) * rates.inputPerMillion +
    (outputTokens / 1_000_000) * rates.outputPerMillion
  );
}

export function estimateWhisperCost(durationSeconds: number): number {
  const minutes = durationSeconds / 60;
  return minutes * PRICING.openai["whisper-1"].perMinute;
}

// ---------------------------------------------------------------------------
// Fire-and-forget logger
// ---------------------------------------------------------------------------

export interface LogApiUsageParams {
  arboristId: string;
  propertyId?: string | null;
  reportId?: string | null;
  provider: "anthropic" | "openai";
  endpoint: string; // "generate-report", "parse-audio", "transcribe"
  model: string;
  inputTokens?: number;
  outputTokens?: number;
  audioDuration?: number | null; // seconds
}

export function logApiUsage(params: LogApiUsageParams): void {
  const {
    arboristId,
    propertyId,
    reportId,
    provider,
    endpoint,
    model,
    inputTokens = 0,
    outputTokens = 0,
    audioDuration,
  } = params;

  let estimatedCostUsd = 0;

  if (provider === "anthropic") {
    estimatedCostUsd = estimateAnthropicCost(model, inputTokens, outputTokens);
  } else if (provider === "openai" && audioDuration != null) {
    estimatedCostUsd = estimateWhisperCost(audioDuration);
  }

  // Fire-and-forget — don't await, don't block the response
  prisma.apiUsageLog
    .create({
      data: {
        arboristId,
        propertyId: propertyId ?? null,
        reportId: reportId ?? null,
        provider,
        endpoint,
        model,
        inputTokens,
        outputTokens,
        audioDuration: audioDuration ?? null,
        estimatedCostUsd,
      },
    })
    .catch((err) => {
      console.error("Failed to log API usage:", err);
    });
}
```

### lib/auth.ts

```typescript
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function getCurrentArborist() {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });
}

export async function requireArborist() {
  const arborist = await getCurrentArborist();
  if (!arborist) {
    throw new Error("No arborist profile found for authenticated user");
  }
  return arborist;
}
```

### lib/connectivity.tsx

```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface ConnectivityState {
  isOnline: boolean;
  pendingCount: number;
  setPendingCount: (count: number) => void;
}

const ConnectivityContext = createContext<ConnectivityState>({
  isOnline: true,
  pendingCount: 0,
  setPendingCount: () => {},
});

export function useConnectivity(): ConnectivityState {
  return useContext(ConnectivityContext);
}

export function ConnectivityProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    // Initialize pending count from localStorage queue
    try {
      const queue = JSON.parse(
        localStorage.getItem("treecertify_queue") || "[]"
      );
      setPendingCount(queue.length);
    } catch {
      /* ignore */
    }

    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <ConnectivityContext.Provider
      value={{ isOnline, pendingCount, setPendingCount }}
    >
      {children}
    </ConnectivityContext.Provider>
  );
}
```

### lib/db.ts

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### lib/markdown-to-docx.ts

```typescript
/**
 * Converts a subset of markdown (as produced by Claude AI) into docx
 * Paragraph/Table objects using the `docx` npm package.
 *
 * Handles: # ## ### headings, **bold**, *italic*, - unordered lists,
 * 1. ordered lists, | tables |, --- horizontal rules, and paragraphs.
 */

import {
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
} from "docx";

// ---------------------------------------------------------------------------
// Inline formatting parser
// ---------------------------------------------------------------------------

function parseInlineRuns(text: string): TextRun[] {
  const runs: TextRun[] = [];
  // Match **bold**, *italic*, or plain text
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      runs.push(new TextRun({ text: match[2], bold: true }));
    } else if (match[3]) {
      // Italic
      runs.push(new TextRun({ text: match[3], italics: true }));
    } else if (match[4]) {
      // Plain
      runs.push(new TextRun({ text: match[4] }));
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ text })];
}

// ---------------------------------------------------------------------------
// Table builder
// ---------------------------------------------------------------------------

function buildTable(lines: string[]): Table {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s\-:|]+\|$/)) // skip separator
    .map((line) =>
      line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim())
    );

  if (rows.length === 0) {
    return new Table({ rows: [] });
  }

  const headerCells = rows[0];
  const bodyRows = rows.slice(1);

  const headerRow = new TableRow({
    tableHeader: true,
    children: headerCells.map(
      (cell) =>
        new TableCell({
          shading: {
            type: ShadingType.SOLID,
            color: "2d5016",
            fill: "2d5016",
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cell,
                  bold: true,
                  color: "ffffff",
                  size: 18,
                }),
              ],
            }),
          ],
        })
    ),
  });

  const dataRows = bodyRows.map(
    (row, rowIdx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              shading:
                rowIdx % 2 === 1
                  ? {
                      type: ShadingType.SOLID,
                      color: "f9f9f6",
                      fill: "f9f9f6",
                    }
                  : undefined,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 18 })],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ---------------------------------------------------------------------------
// Main converter
// ---------------------------------------------------------------------------

export function markdownToDocxElements(
  markdown: string
): (Paragraph | Table)[] {
  const lines = markdown.split("\n");
  const elements: (Paragraph | Table)[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(
        new Paragraph({
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: "999999",
            },
          },
          spacing: { before: 200, after: 200 },
        })
      );
      i++;
      continue;
    }

    // Heading 3
    if (line.startsWith("### ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: line.slice(4),
              color: "2d5016",
              size: 24,
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 80 },
        })
      );
      i++;
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: line.slice(3),
              color: "2d5016",
              size: 28,
              bold: true,
            }),
          ],
          spacing: { before: 320, after: 120 },
        })
      );
      i++;
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: line.slice(2),
              color: "2d5016",
              size: 32,
              bold: true,
            }),
          ],
          spacing: { before: 400, after: 160 },
        })
      );
      i++;
      continue;
    }

    // Table
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      elements.push(buildTable(tableLines));
      continue;
    }

    // Unordered list
    if (line.trimStart().startsWith("- ")) {
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        const itemText = lines[i].trimStart().slice(2);
        elements.push(
          new Paragraph({
            bullet: { level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        const itemText = lines[i].trimStart().replace(/^\d+\.\s/, "");
        elements.push(
          new Paragraph({
            numbering: { reference: "ordered-list", level: 0 },
            children: parseInlineRuns(itemText),
            spacing: { before: 40, after: 40 },
          })
        );
        i++;
      }
      continue;
    }

    // Paragraph: collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].trimStart().startsWith("|") &&
      !lines[i].trimStart().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        new Paragraph({
          children: parseInlineRuns(paraLines.join(" ")),
          spacing: { before: 80, after: 80 },
        })
      );
    }
  }

  return elements;
}
```

### lib/markdown.ts

```typescript
/**
 * Lightweight markdown-to-HTML renderer for arborist report content.
 * Handles the subset of markdown produced by Claude: headings, bold, italic,
 * lists, tables, horizontal rules, and paragraphs.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return result;
}

function renderTable(lines: string[]): string {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s-:|]+\|$/)) // skip separator row
    .map((line) => {
      const cells = line
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      return cells;
    });

  if (rows.length === 0) return "";

  const headerCells = rows[0]
    .map((c) => `<th>${renderInline(c)}</th>`)
    .join("");
  const bodyRows = rows
    .slice(1)
    .map(
      (row) =>
        `<tr>${row.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`
    )
    .join("\n");

  return `<table>
<thead><tr>${headerCells}</tr></thead>
<tbody>${bodyRows}</tbody>
</table>`;
}

export function renderMarkdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      output.push("<hr />");
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      output.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      output.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      output.push(`<h1>${renderInline(line.slice(2))}</h1>`);
      i++;
      continue;
    }

    // Table: collect consecutive lines starting with |
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    // Unordered list: collect consecutive - items
    if (line.trimStart().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        listItems.push(lines[i].trimStart().slice(2));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ul>${lis}</ul>`);
      continue;
    }

    // Ordered list: collect consecutive numbered items
    if (/^\d+\.\s/.test(line.trimStart())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        listItems.push(lines[i].trimStart().replace(/^\d+\.\s/, ""));
        i++;
      }
      const lis = listItems
        .map((item) => `<li>${renderInline(item)}</li>`)
        .join("\n");
      output.push(`<ol>${lis}</ol>`);
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].trimStart().startsWith("|") &&
      !lines[i].trimStart().startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i].trimStart()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      output.push(`<p>${renderInline(paraLines.join(" "))}</p>`);
    }
  }

  return output.join("\n");
}
```

### lib/ordinances.ts

```typescript
import { prisma } from "./db";
import { getSpeciesByName } from "./species";

export interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}

export interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}

export interface HeritageTreeRules {
  dbhThreshold: number | null;
  reviewProcess: string;
  notes: string;
  designatedByCouncil?: boolean;
  designatedByCommittee?: boolean;
  speciesRestricted?: boolean;
  protectedSpecies?: string[];
}

export interface OrdinanceData {
  cityName: string;
  state: string;
  protectedSpecies: ProtectedSpeciesRule[];
  defaultDbhThresholdNative: number | null;
  defaultDbhThresholdNonnative: number | null;
  certifierRequirement: string | null;
  mitigationRules: MitigationRules;
  heritageTreeRules: HeritageTreeRules;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  codeReference: string | null;
}

export async function getOrdinanceByCity(
  cityName: string
): Promise<OrdinanceData | null> {
  const ord = await prisma.municipalOrdinance.findUnique({
    where: { cityName },
  });
  if (!ord) return null;

  return {
    ...ord,
    protectedSpecies: JSON.parse(ord.protectedSpecies) as ProtectedSpeciesRule[],
    mitigationRules: JSON.parse(ord.mitigationRules) as MitigationRules,
    heritageTreeRules: JSON.parse(ord.heritageTreeRules) as HeritageTreeRules,
  };
}

export interface OrdinanceContext {
  nativeThreshold: number | null;
  nonnativeThreshold: number | null;
  heritageThreshold: number | null;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  replantingRatio: string | null;
  inLieuFee: string | null;
  certifierRequirement: string | null;
}

export interface ProtectionCheckResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
  ordinanceContext: OrdinanceContext | null;
}

export async function checkTreeProtection(
  cityName: string,
  speciesCommon: string,
  dbhInches: number
): Promise<ProtectionCheckResult> {
  const ordinance = await getOrdinanceByCity(cityName);

  if (!ordinance) {
    return {
      isProtected: false,
      reason: `No ordinance data available for ${cityName}`,
      isHeritage: false,
      heritageReason: null,
      mitigationRequired: null,
      codeReference: null,
      ordinanceContext: null,
    };
  }

  const ordinanceContext: OrdinanceContext = {
    nativeThreshold: ordinance.defaultDbhThresholdNative,
    nonnativeThreshold: ordinance.defaultDbhThresholdNonnative,
    heritageThreshold: ordinance.heritageTreeRules.dbhThreshold ?? null,
    permitProcessNotes: ordinance.permitProcessNotes,
    ordinanceUrl: ordinance.ordinanceUrl,
    replantingRatio: ordinance.mitigationRules.replantingRatio || null,
    inLieuFee: ordinance.mitigationRules.inLieuFee || null,
    certifierRequirement: ordinance.certifierRequirement,
  };

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";
  const scientificName = species?.scientific?.toLowerCase();

  // Check species-specific rules first — match by common name OR scientific name
  const speciesRule = ordinance.protectedSpecies.find(
    (s) =>
      s.species.toLowerCase() === speciesCommon.toLowerCase() ||
      (scientificName && s.scientific.toLowerCase() === scientificName) ||
      s.species.toLowerCase() === "any tree"
  );

  let isProtected = false;
  let reason = "";

  if (speciesRule) {
    if (dbhInches >= speciesRule.dbhThreshold) {
      isProtected = true;
      reason = `${speciesCommon} with ${dbhInches}" DBH meets or exceeds ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} with ${dbhInches}" DBH does not meet ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    }
  } else {
    // Fall back to default thresholds based on native/non-native status
    const threshold = isNative
      ? ordinance.defaultDbhThresholdNative
      : ordinance.defaultDbhThresholdNonnative;

    if (threshold != null && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH meets or exceeds ${threshold}" ${isNative ? "native" : "non-native"} threshold per ${ordinance.codeReference}`;
    } else if (threshold != null) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} is not a regulated species under ${cityName}'s tree ordinance (${ordinance.codeReference})`;
    }
  }

  // Check heritage status — only if the ordinance uses a DBH-based heritage threshold
  let isHeritage = false;
  let heritageReason: string | null = null;
  const heritageRules = ordinance.heritageTreeRules;

  if (heritageRules.dbhThreshold != null && dbhInches >= heritageRules.dbhThreshold) {
    // Some cities restrict heritage status to certain species (e.g., Atherton: oaks + redwoods only)
    const speciesQualifies = !heritageRules.speciesRestricted ||
      (heritageRules.protectedSpecies && scientificName &&
        heritageRules.protectedSpecies.some(
          (s) => s.toLowerCase() === scientificName
        ));

    if (speciesQualifies) {
      isHeritage = true;
      isProtected = true; // Heritage always implies protected
      heritageReason = `Tree qualifies as heritage (${dbhInches}" DBH >= ${heritageRules.dbhThreshold}" threshold). ${heritageRules.reviewProcess}. ${heritageRules.notes}`;
      // Update reason to reflect heritage status if it wasn't already protected
      if (!reason.includes("meets or exceeds")) {
        reason = `${speciesCommon} with ${dbhInches}" DBH qualifies as heritage tree per ${ordinance.codeReference}`;
      }
    }
  } else if (heritageRules.designatedByCouncil || heritageRules.designatedByCommittee) {
    // Heritage is by designation only — we can't auto-determine, just note it
    heritageReason = `Heritage status in ${cityName} is by ${heritageRules.designatedByCouncil ? "City Council" : "committee"} designation only. ${heritageRules.notes}`;
  }

  // Mitigation info — only if protected
  let mitigationRequired: string | null = null;
  if (isProtected) {
    mitigationRequired = `${ordinance.mitigationRules.replantingRatio}. ${ordinance.mitigationRules.notes}`;
  }

  return {
    isProtected,
    reason,
    isHeritage,
    heritageReason,
    mitigationRequired,
    codeReference: ordinance.codeReference,
    ordinanceContext,
  };
}
```

### lib/photo-categories.ts

```typescript
// ---------------------------------------------------------------------------
// Photo category definitions per report type
// ---------------------------------------------------------------------------

export interface PhotoCategory {
  value: string;
  label: string;
  required: boolean;
}

export const PHOTO_CATEGORIES: Record<string, PhotoCategory[]> = {
  removal_permit: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "defect_detail", label: "Defect/Concern Detail", required: true },
    { value: "root_collar", label: "Root Collar / Base", required: false },
    { value: "canopy_below", label: "Canopy from Below", required: false },
    { value: "site_context", label: "Site Context", required: false },
  ],
  health_assessment: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "crown_detail", label: "Crown Detail", required: false },
    { value: "trunk_bark", label: "Trunk / Bark Detail", required: false },
    { value: "root_zone", label: "Root Zone", required: false },
    { value: "defects_noted", label: "Any Defects Noted", required: false },
  ],
  construction_encroachment: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "tpz_area", label: "TPZ / Construction Proximity", required: false },
    { value: "root_zone_grade", label: "Root Zone / Grade at Base", required: false },
    { value: "protection_measures", label: "Existing Protection Measures", required: false },
  ],
  tree_valuation: [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "trunk_dbh", label: "Trunk at DBH Height", required: false },
    { value: "crown_spread", label: "Crown Spread Reference", required: false },
    { value: "site_landscape", label: "Site / Landscape Context", required: false },
  ],
};

/**
 * Get photo categories for a report type. Falls back to a basic set.
 */
export function getCategoriesForReportType(reportType: string): PhotoCategory[] {
  return PHOTO_CATEGORIES[reportType] || [
    { value: "full_tree", label: "Full Tree", required: true },
    { value: "detail", label: "Detail", required: false },
    { value: "site_context", label: "Site Context", required: false },
  ];
}

/**
 * Generate an auto-caption from category, tree number, and species.
 */
export function autoCaptionFromCategory(
  categoryValue: string,
  treeNumber: number,
  speciesCommon: string,
  reportType: string
): string {
  const categories = getCategoriesForReportType(reportType);
  const cat = categories.find((c) => c.value === categoryValue);
  const catLabel = cat?.label || categoryValue.replace(/_/g, " ");
  return `${catLabel} — Tree #${treeNumber} (${speciesCommon || "Unknown species"})`;
}
```

### lib/photo-queue.ts

```typescript
"use client";

// ---------------------------------------------------------------------------
// Offline Photo Queue — stores File objects in IndexedDB for deferred upload
// when the app comes back online. Photos are too large for localStorage.
// ---------------------------------------------------------------------------

export interface QueuedPhoto {
  id: string;
  propertyId: string;
  treeId: string;
  file: File;
  timestamp: number;
  retryCount: number;
}

const DB_NAME = "treecertify_photos";
const DB_VERSION = 1;
const STORE_NAME = "photo_queue";
const MAX_RETRIES = 3;

// ---------------------------------------------------------------------------
// IndexedDB helpers
// ---------------------------------------------------------------------------

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function enqueuePhoto(
  photo: Omit<QueuedPhoto, "id" | "timestamp" | "retryCount">
): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();
  const item: QueuedPhoto = {
    ...photo,
    id,
    timestamp: Date.now(),
    retryCount: 0,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(item);
    req.onsuccess = () => resolve(id);
    req.onerror = () => reject(req.error);
  });
}

export async function getQueuedPhotos(): Promise<QueuedPhoto[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getQueuedPhotosForTree(
  treeId: string
): Promise<QueuedPhoto[]> {
  const all = await getQueuedPhotos();
  return all.filter((p) => p.treeId === treeId);
}

export async function removeQueuedPhoto(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Process queued photos one at a time to avoid overwhelming slow connections.
export async function processPhotoQueue(): Promise<{
  succeeded: number;
  failed: number;
}> {
  let photos: QueuedPhoto[];
  try {
    photos = await getQueuedPhotos();
  } catch {
    return { succeeded: 0, failed: 0 };
  }
  if (photos.length === 0) return { succeeded: 0, failed: 0 };

  let succeeded = 0;
  let failed = 0;

  for (const photo of photos) {
    try {
      const formData = new FormData();
      formData.append("files", photo.file, photo.file.name || "photo.jpg");

      const res = await fetch(
        `/api/properties/${photo.propertyId}/trees/${photo.treeId}/photos`,
        { method: "POST", body: formData }
      );

      if (res.ok) {
        await removeQueuedPhoto(photo.id);
        succeeded++;
      } else if (res.status >= 400 && res.status < 500) {
        // Client error — don't retry
        await removeQueuedPhoto(photo.id);
        failed++;
      } else {
        // Server error — retry if under limit
        if (photo.retryCount >= MAX_RETRIES) {
          await removeQueuedPhoto(photo.id);
          failed++;
        }
        // else leave in queue for next cycle
      }
    } catch {
      // Network error — retry if under limit
      if (photo.retryCount >= MAX_RETRIES) {
        await removeQueuedPhoto(photo.id);
        failed++;
      }
    }
  }

  return { succeeded, failed };
}
```

### lib/report-templates.ts

```typescript
/**
 * Report templates — prompt v2.0 (2026-03-03)
 *
 * Each template defines the report-type-specific system prompt instructions
 * that tell Claude HOW to generate the report from structured data.
 * The route.ts file provides the structured data; these templates provide
 * the professional writing instructions.
 *
 * Prompt version: 2.0
 * Changes from v1.0:
 *   - Switched from "polish pre-written text" to "data-driven generation"
 *   - Added ISA/ANSI/CTLA standard references per report type
 *   - Added Retention Feasibility Analysis + Risk Assessment for removal_permit
 *   - Added CTLA Trunk Formula step-by-step for tree_valuation
 *   - Added TPZ/SRZ formulas + ANSI A300 Part 5 for construction_encroachment
 *   - Added TRAQ methodology detail for health_assessment
 *   - Added Limitations and Assumptions section to all report types
 */

export interface ReportTemplate {
  reportType: string;
  displayName: string;
  promptVersion: string;
  requiredSections: string[];
  systemInstructions: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    reportType: "removal_permit",
    displayName: "Tree Removal Permit Application",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Individual Tree Assessments",
      "Retention Feasibility Analysis",
      "Risk Assessment",
      "Protected Status and Regulatory Compliance",
      "Recommendations",
      "Mitigation Requirements",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Removal Permit Application (v2.0)

VOICE AND STANDARDS:
- Write in professional third person throughout. Never "I" or "we." Use "the consulting arborist," "this arborist," or passive voice.
- Reference ISA Best Management Practices (BMP) for Tree Risk Assessment.
- Reference ANSI A300 standards for pruning, removal, and tree care operations.
- Cite specific municipal code sections from the ordinance data when discussing protected status, removal findings, and mitigation.
- DBH is measured at 54 inches (4.5 feet) above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   Write 2-3 paragraphs stating what was requested, the date of field inspection, the assessment method (Level 2 — Basic visual assessment per ISA TRAQ methodology), and the specific municipal ordinance under which the permit is sought. Use the Scope of Assignment if provided. Include the property address, city, county, and parcel number.

2. **Site Observations**
   Describe the property setting, topography, soil conditions (if noted), proximity to structures, and any relevant environmental factors. If property-level field notes are provided, incorporate them naturally. If site observations are provided by the arborist, use them. Do not fabricate site details not supported by the data.

3. **Individual Tree Assessments**
   For each tree, write a 2-3 paragraph narrative that reads like a field observation walk-through:
   - Opening sentence incorporating species, DBH, height, canopy spread naturally: "The 24-inch DBH Coast Live Oak located in the rear yard..."
   - Health observations paragraph: Use the arborist's health notes if provided. If no health notes were provided, write "No specific health concerns were noted during the Level 2 assessment" for trees rated 4-5, or "The tree exhibits signs of decline consistent with its condition rating" for trees rated 1-2, adding detail appropriate to the species. Do NOT fabricate specific symptoms, diseases, or pest issues that were not reported by the arborist.
   - Structural assessment paragraph: Use the arborist's structural notes if provided. If no structural notes were provided, write "No significant structural defects were observed during the visual assessment" for trees rated 4-5, or note the general category of concern for lower-rated trees without inventing specific defects.
   - End with a one-sentence bottom line: what action is recommended and why.
   - Reference photos where available: "See Photo 1."

4. **Retention Feasibility Analysis**
   For EACH tree proposed for removal, present a retention feasibility analysis:
   - If the arborist provided retention feasibility data (feasible, feasible_with_conditions, not_feasible), use it directly.
   - When feasibility is "feasible_with_conditions," describe those conditions from the retention notes.
   - When feasibility is "not_feasible," explain why retention is not viable based on the provided data.
   - If no retention feasibility data was provided, assess based on condition rating, health notes, and structural notes. Trees rated 4-5 with no defects noted should generally be described as "retention appears feasible" unless removal reason suggests otherwise.

5. **Risk Assessment**
   Use ISA TRAQ risk assessment matrix terminology:
   - Likelihood of Failure: improbable, possible, probable, imminent
   - Likelihood of Impacting a Target: very low, low, medium, high
   - Consequences of Failure: negligible, minor, significant, severe
   - Overall Risk Rating: low, moderate, high, extreme
   When TRAQ values are provided in the type-specific data, use them directly. When not provided, derive reasonable ratings from the condition rating and any noted defects — but clearly state "Based on the Level 2 visual assessment" rather than presenting inferred ratings as definitive.
   Present as a summary table or structured list per tree.

6. **Protected Status and Regulatory Compliance**
   For each tree, state whether it qualifies as protected under the municipal ordinance, citing:
   - The specific code section (e.g., "PAMC §8.10.020")
   - The applicable DBH threshold
   - The species category (native, heritage, etc.)
   - Heritage tree status if applicable
   Use the protection reason from the tree data. State what findings the city requires for removal approval.

7. **Recommendations**
   Per-tree recommendations with specific actions:
   - For removal: State the removal recommendation, the justification (citing specific defects/conditions from the assessment), and reference the ordinance permit requirement if protected.
   - For retention: Recommend specific maintenance (pruning per ANSI A300, monitoring frequency, soil management).
   - For pruning: Specify pruning type (crown cleaning, crown reduction, deadwood removal) per ANSI A300.
   - Include estimated remaining lifespan if provided.

8. **Mitigation Requirements**
   For each protected tree recommended for removal:
   - State the replanting ratio from the ordinance data
   - State the in-lieu fee structure from the ordinance data
   - Note any species-specific replacement requirements
   - Reference the specific ordinance section governing mitigation

9. **Limitations and Assumptions**
   Include a standard limitations paragraph:
   - Assessment was a Level 2 Basic visual assessment from ground level per ISA TRAQ methodology
   - No below-ground examination, aerial inspection, or invasive testing was performed unless noted
   - Trees are living organisms and conditions can change; this assessment reflects conditions at the time of inspection
   - The arborist assumes no responsibility for conditions not observable at ground level
   - Recommendations are based on generally accepted arboricultural practices at the time of the assessment`,
  },
  {
    reportType: "health_assessment",
    displayName: "Tree Health Assessment",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Assessment Methodology",
      "Site Observations",
      "Individual Tree Assessments",
      "Risk Assessment Summary",
      "Maintenance Recommendations",
      "Prognosis and Life Expectancy",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Health Assessment (v2.0)

VOICE AND STANDARDS:
- Write in professional third person. Use ISA TRAQ (Tree Risk Assessment Qualification) methodology and terminology throughout.
- Reference ANSI A300 for all pruning and maintenance recommendations.
- Reference ISA BMP for Tree Risk Assessment.
- Cite municipal code sections from ordinance data when discussing protected status.
- DBH measured at 54 inches above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (health and risk assessment), date of inspection, assessment level (Level 2 — Basic), property details, and who requested the assessment. Use Scope of Assignment if provided.

2. **Assessment Methodology**
   Describe the TRAQ assessment process: Level 2 Basic assessment consisting of a 360-degree visual inspection from ground level. Note tools used (if any): diameter tape, clinometer, mallet for sounding. State that no invasive testing (resistograph, sonic tomography) was performed unless noted otherwise.

3. **Site Observations**
   Describe property setting, environmental factors affecting tree health (soil compaction, grade changes, irrigation, construction, etc.). Use arborist-provided site observations and field notes.

4. **Individual Tree Assessments**
   For each tree, write a distinct narrative (not a form being filled out):
   - Opening with species, size, and location context
   - Crown assessment: density, dieback percentage, foliage color, epicormic growth. Use arborist health notes if provided. If no health notes: "No specific health concerns were noted" for 4-5 rated trees; "Signs of decline consistent with the assigned condition rating" for 1-2 rated trees. Do NOT fabricate specific diseases or pest issues.
   - Trunk and root flare: cavities, cracks, conks, included bark, root plate stability. Use arborist structural notes if provided. If none: "No significant structural defects were observed" for 4-5 rated trees.
   - TRAQ risk components: Use provided TRAQ values (likelihood of failure, likelihood of impact, consequences, overall risk rating) directly. If not provided, derive reasonable estimates from condition rating but state "estimated based on visual assessment."
   - Target description if provided
   - Bottom line: overall health status and recommended action

5. **Risk Assessment Summary**
   Tabular or structured summary of TRAQ ratings for all trees:
   - Tree number, species, DBH, likelihood of failure, likelihood of impact, consequences, overall risk rating
   - Note any trees rated high or extreme risk that require priority attention

6. **Maintenance Recommendations**
   For each tree with recommended maintenance:
   - Specific maintenance items from the arborist's checklist (crown cleaning, deadwood removal, cable/brace, etc.)
   - Priority level and timeline from arborist data
   - Estimated cost if provided
   - All pruning recommendations reference ANSI A300 standards
   - Monitoring frequency for trees under observation
   Group by priority (urgent, high, moderate, routine) when multiple trees have maintenance needs.

7. **Prognosis and Life Expectancy**
   Per-tree prognosis based on current condition, species longevity characteristics, and site factors. Use arborist-provided estimated remaining lifespan if available. When not provided, provide general species-appropriate expectations based on condition rating.

8. **Limitations and Assumptions**
   Standard limitations: Level 2 visual assessment, no subsurface or aerial inspection, conditions may change, recommendations reflect current accepted practices. Trees are living organisms subject to forces of nature.`,
  },
  {
    reportType: "tree_valuation",
    displayName: "Tree Valuation Report",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Valuation Methodology",
      "Individual Tree Valuations",
      "Basis of Value",
      "Aggregate Property Value",
      "Recommendations",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Tree Valuation Report (v2.0)

VOICE AND STANDARDS:
- Write in professional third person.
- Use the Council of Tree and Landscape Appraisers (CTLA) Trunk Formula Method as described in the Guide for Plant Appraisal, 10th Edition.
- Reference ISA standards for condition assessment.
- Cite municipal code sections when discussing protected status and mitigation obligations.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (tree valuation for insurance, damage assessment, or ordinance compliance), property details, date of inspection, and appraisal standard used (CTLA Trunk Formula Method, 10th Edition).

2. **Site Observations**
   Property description, landscape context, and factors that affect tree location rating (proximity to structures, visibility, contribution to property aesthetics).

3. **Valuation Methodology**
   Explain the CTLA Trunk Formula Method step by step:

   **Formula:** Appraised Value = Trunk Area × Regional Cost Factor × Species Rating % × Condition Rating % × Location Rating %

   **Step-by-step:**
   a. **Trunk Area** = π × (DBH/2)² — the cross-sectional area in square inches
   b. **Regional Cost Factor** (Cost per Square Inch) — the installed cost of the largest commonly available transplant size, divided by its trunk area. Use the value from the arborist data if provided.
   c. **Species Rating %** — from the Western Chapter ISA Species Classification Guide. Use the arborist-provided percentage if available.
   d. **Condition Rating %** — based on the arborist's field assessment of health, structure, and form. Use the arborist-provided percentage.
   e. **Location Rating %** — site contribution, placement contribution, and community contribution factors. Use the arborist-provided percentage.

4. **Individual Tree Valuations**
   For each tree:
   - Show the calculation with all input values
   - Trunk Area: π × (DBH/2)² = X sq in
   - Appraised Value: X sq in × $Y/sq in × Z% species × W% condition × V% location = $TOTAL
   - Use the pre-calculated values from the arborist data directly — do not recalculate
   - Brief narrative explaining the species rating choice and condition/location factors
   - Format currency values with commas and two decimal places

5. **Basis of Value**
   State the basis: CTLA Trunk Formula Method, 10th Edition. Note the regional cost factor source. Explain that values represent the contributory value of the tree to the property, not replacement cost. Note any adjustments made for specific conditions.

6. **Aggregate Property Value**
   Total appraised value of all trees. Present as a summary table: tree number, species, DBH, appraised value, then total.

7. **Recommendations**
   Maintenance recommendations to preserve or enhance tree value. For damaged trees, note how condition improvements would affect appraised value.

8. **Limitations and Assumptions**
   Standard limitations plus: valuation is an opinion of value based on CTLA methodology, not a guarantee of market value. Values may vary based on regional cost factors, appraiser judgment, and market conditions. This appraisal does not constitute a real estate appraisal.`,
  },
  {
    reportType: "construction_encroachment",
    displayName: "Construction Impact Report",
    promptVersion: "2.0",
    requiredSections: [
      "Assignment and Purpose",
      "Site Observations",
      "Individual Tree Assessments",
      "Tree Protection Zone Analysis",
      "Construction Impact Assessment",
      "Tree Protection Plan",
      "Monitoring Schedule",
      "Limitations and Assumptions",
    ],
    systemInstructions: `REPORT-TYPE INSTRUCTIONS — Construction Impact Report (v2.0)

VOICE AND STANDARDS:
- Write in professional third person.
- Reference ANSI A300 Part 5: Management of Trees During Site Planning, Site Development, and Construction.
- Reference ISA BMP for Tree Risk Assessment and Managing Trees During Construction.
- Cite municipal code sections when discussing protected status and permit requirements.
- DBH measured at 54 inches above natural grade per ISA standard.

SECTION-BY-SECTION INSTRUCTIONS:

1. **Assignment and Purpose**
   State the purpose (pre-construction tree assessment), property details, project description, permit number, developer/contractor, and architect if provided. Reference the applicable tree preservation ordinance. State the assessment date and methodology.

2. **Site Observations**
   Describe existing site conditions, topography, soil type if noted, drainage patterns, and proximity of trees to proposed construction. Use arborist-provided site observations and field notes.

3. **Individual Tree Assessments**
   For each tree, provide:
   - Species, DBH, height, canopy spread, condition rating
   - Current health and structural condition using arborist notes
   - Protected status with code citation
   - Proximity to proposed construction activity

4. **Tree Protection Zone Analysis**
   For each tree, present TPZ and SRZ calculations:

   **TPZ (Tree Protection Zone):**
   - Formula: TPZ radius = DBH (inches) × 1.0 foot (per ISA BMP)
   - Example: A 24-inch DBH tree has a TPZ radius of 24 feet
   - If the arborist provided a manual TPZ override, use that value and note: "TPZ adjusted to X feet based on site conditions"

   **SRZ (Structural Root Zone):**
   - Formula: SRZ radius = (DBH × 0.12)^0.945 × 0.3048 (meters, converted to feet)
   - Present both the auto-calculated and any manual override values
   - The SRZ is the minimum root area needed for tree stability

   Present as a table: tree number, species, DBH, TPZ radius, SRZ radius, encroachment percentage.

5. **Construction Impact Assessment**
   For each tree within the construction zone of influence:
   - Describe the nature and extent of encroachment (excavation, grading, paving, demolition)
   - State the encroachment percentage into the TPZ
   - Use the arborist's impact assessment if provided (no impact, minor, moderate, significant, severe)
   - Assess viability: can the tree be preserved with protection measures, or is removal likely necessary?
   - Reference ANSI A300 Part 5 standards for acceptable encroachment limits

6. **Tree Protection Plan**
   Specific, actionable protection measures that a general contractor can follow:
   - **Tree Protection Fencing:** 6-foot chain-link fence installed at the TPZ perimeter (or adjusted TPZ). Specify exact distances from trunk for each tree. Fencing shall be installed before any site work begins and remain in place until project completion.
   - **Root Pruning Protocol:** Where encroachment is unavoidable, roots shall be cleanly cut with sharp tools (no tearing/breaking). Root pruning shall be performed by or supervised by a certified arborist.
   - **Grade Changes:** No grade changes (fill or excavation) within the TPZ without arborist approval. Where grade changes are permitted, specify maximum depth.
   - **Boring/Tunneling:** For utilities within TPZ, directional boring at minimum 24 inches below grade is required.
   - **Pre-Construction Treatments:** Crown cleaning per ANSI A300, supplemental irrigation, mulch application within TPZ.
   - **Prohibited Activities:** No storage of materials, equipment, or debris within TPZ. No attachment of signs, lights, or utilities to trees.
   Use the arborist's protection measures list if provided, incorporating each with specific implementation details.

7. **Monitoring Schedule**
   Use the arborist-provided monitoring frequency if available. If not provided, recommend:
   - Pre-construction baseline inspection
   - During construction: Monthly during active construction within TPZ proximity
   - Post-construction: Quarterly for first year, semi-annually for years 2-3
   Specify what to monitor: crown condition, soil compaction, root damage, lean, stress indicators.

8. **Limitations and Assumptions**
   Standard limitations plus: construction impact predictions are estimates based on current project plans. Actual impacts may vary based on construction methods, weather, and unforeseen conditions. The Tree Protection Plan requires compliance by all contractors and subcontractors. The arborist assumes no liability for damage resulting from non-compliance.`,
  },
];

/**
 * Look up a report template by type slug.
 */
export function getReportTemplate(
  reportType: string
): ReportTemplate | undefined {
  return REPORT_TEMPLATES.find((t) => t.reportType === reportType);
}
```

### lib/report-types.ts

```typescript
/**
 * Report type configuration and type-specific data interfaces.
 * The report type drives the entire assessment workflow.
 */

// ---------------------------------------------------------------------------
// Report type metadata
// ---------------------------------------------------------------------------

export interface ReportTypeConfig {
  id: string;
  label: string;
  description: string;
  icon: "Stethoscope" | "Axe" | "DollarSign" | "HardHat";
  color: string; // Tailwind color prefix (e.g. "green", "red")
}

export const REPORT_TYPES: ReportTypeConfig[] = [
  {
    id: "health_assessment",
    label: "Health Assessment / Inventory",
    description: "Tree condition evaluation with maintenance recommendations and risk prognosis",
    icon: "Stethoscope",
    color: "green",
  },
  {
    id: "removal_permit",
    label: "Removal Permit Application",
    description: "Justify tree removal with risk analysis, retention feasibility, and mitigation plan",
    icon: "Axe",
    color: "red",
  },
  {
    id: "tree_valuation",
    label: "Tree Valuation",
    description: "CTLA Trunk Formula appraisal with per-tree and aggregate dollar values",
    icon: "DollarSign",
    color: "amber",
  },
  {
    id: "construction_encroachment",
    label: "Construction Encroachment",
    description: "TPZ/SRZ analysis with tree protection zones and construction impact plan",
    icon: "HardHat",
    color: "blue",
  },
];

export function getReportTypeConfig(id: string): ReportTypeConfig | undefined {
  return REPORT_TYPES.find((rt) => rt.id === id);
}

// ---------------------------------------------------------------------------
// Type-specific tree data interfaces
// ---------------------------------------------------------------------------

export interface HealthAssessmentData {
  // TRAQ fields
  likelihoodOfFailure?: "improbable" | "possible" | "probable" | "imminent";
  likelihoodOfImpact?: "very_low" | "low" | "medium" | "high";
  consequences?: "negligible" | "minor" | "significant" | "severe";
  overallRiskRating?: string; // auto-calculated
  targetDescription?: string;
  // Maintenance
  maintenanceItems?: string[]; // multi-select checkboxes
  maintenancePriority?: "low" | "moderate" | "high" | "urgent";
  maintenanceTimeline?: string;
  estimatedMaintenanceCost?: number;
  // Legacy field - kept for backwards compat
  maintenanceRecommendations?: string;
}

export interface RemovalPermitData {
  riskRating?: "low" | "moderate" | "high" | "extreme";
  riskFactors?: string[];
  removalReason?: string;
  retentionFeasibility?: "feasible" | "not_feasible" | "feasible_with_conditions";
  retentionNotes?: string;
  estimatedRemainingLifespan?: string;
  // Optional TRAQ fields (shown when TRAQ toggle is on)
  likelihoodOfFailure?: "improbable" | "possible" | "probable" | "imminent";
  likelihoodOfImpact?: "very_low" | "low" | "medium" | "high";
  consequences?: "negligible" | "minor" | "significant" | "severe";
  overallRiskRating?: string;
  targetDescription?: string;
}

export interface TreeValuationData {
  valuationMethod?: string; // default "CTLA Trunk Formula"
  speciesRating?: number; // 0-100 %
  conditionRating?: number; // 0-100 %
  locationRating?: number; // 0-100 %
  costPerSquareInch?: number; // regional rate, default $75
  trunkArea?: number; // auto-calc: pi * (DBH/2)^2
  appraisedValue?: number; // auto-calc
}

export interface ConstructionEncroachmentData {
  tpzRadius?: number; // auto-calc: DBH inches → feet
  srzRadius?: number; // auto-calc: sqrt(DBH * 0.1524) * 3.28084
  tpzOverride?: boolean;
  tpzManual?: number;
  srzManual?: number;
  encroachmentDescription?: string;
  encroachmentPercent?: number; // 0-100
  impactAssessment?: "none" | "minor" | "moderate" | "significant" | "severe";
  protectionMeasuresList?: string[]; // multi-select
  monitoringFrequency?: string;
  // Legacy fields
  protectionMeasures?: string;
  monitoringSchedule?: string;
}

export type TypeSpecificData =
  | HealthAssessmentData
  | RemovalPermitData
  | TreeValuationData
  | ConstructionEncroachmentData;

// ---------------------------------------------------------------------------
// Auto-calculation helpers
// ---------------------------------------------------------------------------

/** Calculate trunk cross-sectional area in square inches from DBH. */
export function calcTrunkArea(dbhInches: number): number {
  return Math.PI * Math.pow(dbhInches / 2, 2);
}

/** Calculate CTLA appraised value. */
export function calcAppraisedValue(
  trunkArea: number,
  costPerSqInch: number,
  speciesRatingPct: number,
  conditionRatingPct: number,
  locationRatingPct: number
): number {
  return (
    trunkArea *
    costPerSqInch *
    (speciesRatingPct / 100) *
    (conditionRatingPct / 100) *
    (locationRatingPct / 100)
  );
}

/** Calculate TPZ radius in feet (1 inch DBH = 1 foot radius per ISA standard). */
export function calcTpzRadius(dbhInches: number): number {
  return dbhInches; // 1:1 ratio
}

/** Calculate SRZ radius in feet from DBH inches (ISA formula). */
export function calcSrzRadius(dbhInches: number): number {
  // SRZ = sqrt(DBH_in_meters) in meters, converted to feet
  const dbhMeters = dbhInches * 0.0254;
  const srzMeters = Math.sqrt(dbhMeters);
  return srzMeters * 3.28084;
}

/** Map condition rating (0-5) to a percentage for CTLA valuation. */
export function conditionToPercent(rating: number): number {
  const map: Record<number, number> = { 0: 0, 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 };
  return map[rating] ?? 60;
}

/** Lookup species rating % for common CA species. Returns default 50 if unknown. */
export function getSpeciesRating(speciesCommon: string): number {
  const normalized = speciesCommon.toLowerCase().trim();
  const ratings: Record<string, number> = {
    "coast live oak": 90,
    "valley oak": 90,
    "blue oak": 85,
    "california sycamore": 80,
    "western sycamore": 80,
    "coast redwood": 95,
    "monterey pine": 60,
    "monterey cypress": 70,
    "eucalyptus": 40,
    "blue gum eucalyptus": 35,
    "red ironbark": 45,
    "london plane": 70,
    "chinese elm": 50,
    "camphor tree": 55,
    "japanese maple": 75,
    "deodar cedar": 70,
    "atlas cedar": 70,
    "incense cedar": 80,
    "white alder": 60,
    "red alder": 55,
    "california bay laurel": 75,
    "california buckeye": 65,
    "italian stone pine": 55,
    "canary island pine": 50,
    "aleppo pine": 45,
    "southern magnolia": 70,
    "cork oak": 80,
    "interior live oak": 85,
    "black walnut": 70,
    "california black walnut": 75,
    "sweetgum": 60,
    "liquidambar": 60,
    "ginkgo": 75,
    "jacaranda": 60,
    "brazilian pepper": 30,
    "tree of heaven": 20,
    "palm": 40,
    "mexican fan palm": 35,
    "queen palm": 40,
    "date palm": 50,
  };

  for (const [key, value] of Object.entries(ratings)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return 50; // default
}

/** Calculate TRAQ overall risk rating from the three components. */
export function calcTRAQRisk(
  likelihood?: string,
  impact?: string,
  consequences?: string
): string {
  if (!likelihood || !impact || !consequences) return "";

  // ISA TRAQ matrix simplified:
  // Combine likelihood of failure + likelihood of impact into "likelihood" score
  const lofScore: Record<string, number> = {
    improbable: 1, possible: 2, probable: 3, imminent: 4,
  };
  const loiScore: Record<string, number> = {
    very_low: 1, low: 2, medium: 3, high: 4,
  };
  const conScore: Record<string, number> = {
    negligible: 1, minor: 2, significant: 3, severe: 4,
  };

  const lof = lofScore[likelihood] ?? 1;
  const loi = loiScore[impact] ?? 1;
  const con = conScore[consequences] ?? 1;

  // Combined likelihood = lof * loi weight
  const combined = lof * loi;
  // Risk = combined * consequences
  const risk = combined * con;

  if (risk >= 32) return "extreme";
  if (risk >= 12) return "high";
  if (risk >= 4) return "moderate";
  return "low";
}

// ---------------------------------------------------------------------------
// Risk factors for removal permit
// ---------------------------------------------------------------------------

export const RISK_FACTORS = [
  "Root damage / decay",
  "Trunk decay / cavity",
  "Canopy dieback",
  "Significant lean",
  "Co-dominant stems",
  "Dead branches",
  "Fungal fruiting bodies",
  "Bark damage / wounds",
] as const;

// ---------------------------------------------------------------------------
// Maintenance items for health assessment
// ---------------------------------------------------------------------------

export const MAINTENANCE_ITEMS = [
  "Crown cleaning",
  "Deadwood removal",
  "Structural pruning",
  "Cable/brace",
  "Root crown excavation",
  "Pest treatment",
  "Soil improvement",
  "Clearance pruning",
] as const;

// ---------------------------------------------------------------------------
// Protection measures for construction encroachment
// ---------------------------------------------------------------------------

export const PROTECTION_MEASURES = [
  "Tree protection fencing",
  "Root pruning",
  "Trunk protection wrap",
  "Grade board installation",
  "Mulch application",
  "Irrigation plan",
  "Arborist supervision during excavation",
  "Crown pruning for clearance",
] as const;
```

### lib/report-validation.ts

```typescript
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValidationCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
  message: string;
  fixPath?: string;
}

export interface ValidationResult {
  checks: ValidationCheck[];
  hasFailures: boolean;
  hasWarnings: boolean;
  allPassed: boolean;
}

// ---------------------------------------------------------------------------
// Main validation function
// ---------------------------------------------------------------------------

export async function validateReportForCertification(
  reportId: string
): Promise<ValidationResult> {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    include: {
      arborist: true,
      property: {
        include: {
          trees: {
            include: {
              treePhotos: { select: { id: true, category: true } },
            },
          },
        },
      },
    },
  });

  if (!report) {
    return {
      checks: [
        {
          id: "report_exists",
          label: "Report exists",
          status: "fail",
          message: "Report not found",
        },
      ],
      hasFailures: true,
      hasWarnings: false,
      allPassed: false,
    };
  }

  const checks: ValidationCheck[] = [];
  const { arborist, property } = report;
  const trees = property.trees;
  const reportType = report.reportType;

  // ---- Blocking checks (fail) ----

  // 1. Arborist has ISA certification number
  if (!arborist.isaCertificationNum || arborist.isaCertificationNum.trim() === "") {
    checks.push({
      id: "isa_cert",
      label: "ISA certification number",
      status: "fail",
      message: "Your profile is missing an ISA certification number",
      fixPath: "/settings",
    });
  } else {
    checks.push({
      id: "isa_cert",
      label: "ISA certification number",
      status: "pass",
      message: `ISA #${arborist.isaCertificationNum}`,
    });
  }

  // 2. At least one tree exists
  if (trees.length === 0) {
    checks.push({
      id: "trees_exist",
      label: "Trees assessed",
      status: "fail",
      message: "No trees have been added to this property",
      fixPath: `/properties/${property.id}`,
    });
  } else {
    checks.push({
      id: "trees_exist",
      label: "Trees assessed",
      status: "pass",
      message: `${trees.length} tree${trees.length === 1 ? "" : "s"} on this property`,
    });
  }

  // 3. Report has content
  const reportContent = report.finalContent || report.aiDraftContent || "";
  if (!reportContent.trim()) {
    checks.push({
      id: "report_content",
      label: "Report content",
      status: "fail",
      message: "The report has no content — generate or write the report first",
    });
  } else {
    checks.push({
      id: "report_content",
      label: "Report content",
      status: "pass",
      message: `${reportContent.split(/\s+/).length} words`,
    });
  }

  // ---- Warning checks ----

  // 4. Trees with incomplete core data
  const incompleteCoreTrees = trees.filter(
    (t) =>
      !t.speciesCommon || t.speciesCommon.trim() === "" ||
      !t.dbhInches || t.dbhInches === 0 ||
      !t.conditionRating || t.conditionRating === 0
  );
  if (incompleteCoreTrees.length > 0) {
    const nums = incompleteCoreTrees.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "tree_data",
      label: "Tree data completeness",
      status: "warning",
      message: `${incompleteCoreTrees.length} tree${incompleteCoreTrees.length === 1 ? " is" : "s are"} missing species, DBH, or condition rating (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0) {
    checks.push({
      id: "tree_data",
      label: "Tree data completeness",
      status: "pass",
      message: "All trees have species, DBH, and condition rating",
    });
  }

  // 5. Trees with no photos
  const treesWithoutPhotos = trees.filter((t) => t.treePhotos.length === 0);
  if (treesWithoutPhotos.length > 0) {
    const nums = treesWithoutPhotos.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "tree_photos",
      label: "Tree photos",
      status: "warning",
      message: `${treesWithoutPhotos.length} tree${treesWithoutPhotos.length === 1 ? " has" : "s have"} no photos (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0) {
    checks.push({
      id: "tree_photos",
      label: "Tree photos",
      status: "pass",
      message: "All trees have at least one photo",
    });
  }

  // 5b. Trees missing a "full tree" photo (categorized)
  const treesWithPhotosButNoFullTree = trees.filter(
    (t) =>
      t.treePhotos.length > 0 &&
      !t.treePhotos.some((p) => p.category === "full_tree")
  );
  if (treesWithPhotosButNoFullTree.length > 0) {
    const nums = treesWithPhotosButNoFullTree.map((t) => `#${t.treeNumber}`).join(", ");
    checks.push({
      id: "full_tree_photo",
      label: "Full tree photo",
      status: "warning",
      message: `${treesWithPhotosButNoFullTree.length} tree${treesWithPhotosButNoFullTree.length === 1 ? " is" : "s are"} missing a photo categorized as "Full tree" (${nums})`,
      fixPath: `/properties/${property.id}`,
    });
  } else if (trees.length > 0 && treesWithoutPhotos.length === 0) {
    checks.push({
      id: "full_tree_photo",
      label: "Full tree photo",
      status: "pass",
      message: "All trees have a full tree photo",
    });
  }

  // 6. Type-specific checks
  if (reportType === "removal_permit") {
    const removeTrees = trees.filter((t) => t.recommendedAction === "remove");
    const uncheckedRemoveTrees = removeTrees.filter(
      (t) => !t.isProtected && !t.protectionReason
    );
    if (uncheckedRemoveTrees.length > 0) {
      const nums = uncheckedRemoveTrees.map((t) => `#${t.treeNumber}`).join(", ");
      checks.push({
        id: "ordinance_check",
        label: "Ordinance check",
        status: "warning",
        message: `${uncheckedRemoveTrees.length} tree${uncheckedRemoveTrees.length === 1 ? "" : "s"} marked for removal without an ordinance check (${nums})`,
        fixPath: `/properties/${property.id}`,
      });
    } else if (removeTrees.length > 0) {
      checks.push({
        id: "ordinance_check",
        label: "Ordinance check",
        status: "pass",
        message: "All removal trees have been checked against ordinances",
      });
    }
  }

  if (reportType === "health_assessment") {
    // Check for TRAQ completeness if TRAQ is enabled
    let traqEnabled = false;
    try {
      const opts = JSON.parse(report.reportOptions || "{}");
      traqEnabled = !!opts.includeTraq;
    } catch { /* ignore */ }

    if (traqEnabled) {
      const incompleteTRAQ = trees.filter((t) => {
        if (!t.typeSpecificData) return true;
        try {
          const data = JSON.parse(t.typeSpecificData);
          return !data.likelihoodOfFailure || !data.likelihoodOfImpact || !data.consequences;
        } catch {
          return true;
        }
      });
      if (incompleteTRAQ.length > 0) {
        const nums = incompleteTRAQ.map((t) => `#${t.treeNumber}`).join(", ");
        checks.push({
          id: "traq_data",
          label: "TRAQ risk assessment",
          status: "warning",
          message: `${incompleteTRAQ.length} tree${incompleteTRAQ.length === 1 ? " is" : "s are"} missing TRAQ fields (${nums})`,
          fixPath: `/properties/${property.id}`,
        });
      } else {
        checks.push({
          id: "traq_data",
          label: "TRAQ risk assessment",
          status: "pass",
          message: "All trees have complete TRAQ data",
        });
      }
    }
  }

  if (reportType === "tree_valuation") {
    const incompleteValuation = trees.filter((t) => {
      if (!t.typeSpecificData) return true;
      try {
        const data = JSON.parse(t.typeSpecificData);
        return !data.speciesRating || !data.conditionRating;
      } catch {
        return true;
      }
    });
    if (incompleteValuation.length > 0) {
      const nums = incompleteValuation.map((t) => `#${t.treeNumber}`).join(", ");
      checks.push({
        id: "valuation_data",
        label: "Valuation data",
        status: "warning",
        message: `${incompleteValuation.length} tree${incompleteValuation.length === 1 ? " is" : "s are"} missing species rating or condition percentage (${nums})`,
        fixPath: `/properties/${property.id}`,
      });
    } else {
      checks.push({
        id: "valuation_data",
        label: "Valuation data",
        status: "pass",
        message: "All trees have valuation data",
      });
    }
  }

  // 7. Report sections shorter than 50 characters (placeholder content)
  if (reportContent.trim()) {
    const sectionPattern = /^#{1,3}\s+.+$/gm;
    const sectionHeaders = reportContent.match(sectionPattern) || [];
    const sections = reportContent.split(/^#{1,3}\s+.+$/m).slice(1); // content after each header
    const shortSections: string[] = [];

    for (let i = 0; i < sections.length; i++) {
      const sectionContent = sections[i].trim();
      if (sectionContent.length > 0 && sectionContent.length < 50) {
        const header = sectionHeaders[i]?.replace(/^#+\s+/, "") || `Section ${i + 1}`;
        shortSections.push(header);
      }
    }

    if (shortSections.length > 0) {
      checks.push({
        id: "section_length",
        label: "Report section depth",
        status: "warning",
        message: `${shortSections.length} section${shortSections.length === 1 ? " appears" : "s appear"} to have placeholder content`,
      });
    } else if (sectionHeaders.length > 0) {
      checks.push({
        id: "section_length",
        label: "Report section depth",
        status: "pass",
        message: `${sectionHeaders.length} sections with substantive content`,
      });
    }
  }

  // ---- Compute summary ----

  const hasFailures = checks.some((c) => c.status === "fail");
  const hasWarnings = checks.some((c) => c.status === "warning");
  const allPassed = !hasFailures && !hasWarnings;

  return { checks, hasFailures, hasWarnings, allPassed };
}
```

### lib/species.ts

```typescript
export interface TreeSpecies {
  common: string;
  scientific: string;
  category: "native" | "nonnative";
  commonOnPeninsula: boolean;
}

export const PENINSULA_SPECIES: TreeSpecies[] = [
  // ---------------------------------------------------------------------------
  // Native Oaks
  // ---------------------------------------------------------------------------
  { common: "Coast Live Oak", scientific: "Quercus agrifolia", category: "native", commonOnPeninsula: true },
  { common: "Valley Oak", scientific: "Quercus lobata", category: "native", commonOnPeninsula: true },
  { common: "Blue Oak", scientific: "Quercus douglasii", category: "native", commonOnPeninsula: true },
  { common: "California Black Oak", scientific: "Quercus kelloggii", category: "native", commonOnPeninsula: true },
  { common: "Canyon Live Oak", scientific: "Quercus chrysolepis", category: "native", commonOnPeninsula: true },
  { common: "Interior Live Oak", scientific: "Quercus wislizeni", category: "native", commonOnPeninsula: true },
  { common: "Oregon White Oak", scientific: "Quercus garryana", category: "native", commonOnPeninsula: true },
  { common: "Tan Oak", scientific: "Notholithocarpus densiflorus", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Redwoods & Sequoias
  // ---------------------------------------------------------------------------
  { common: "Coast Redwood", scientific: "Sequoia sempervirens", category: "native", commonOnPeninsula: true },
  { common: "Giant Sequoia", scientific: "Sequoiadendron giganteum", category: "native", commonOnPeninsula: false },
  { common: "Dawn Redwood", scientific: "Metasequoia glyptostroboides", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Pines
  // ---------------------------------------------------------------------------
  { common: "Monterey Pine", scientific: "Pinus radiata", category: "native", commonOnPeninsula: true },
  { common: "Bishop Pine", scientific: "Pinus muricata", category: "native", commonOnPeninsula: false },
  { common: "Knobcone Pine", scientific: "Pinus attenuata", category: "native", commonOnPeninsula: false },
  { common: "Gray Pine", scientific: "Pinus sabiniana", category: "native", commonOnPeninsula: false },
  { common: "Ponderosa Pine", scientific: "Pinus ponderosa", category: "native", commonOnPeninsula: false },
  { common: "Sugar Pine", scientific: "Pinus lambertiana", category: "native", commonOnPeninsula: false },
  { common: "Torrey Pine", scientific: "Pinus torreyana", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Native Cypresses & Cedars
  // ---------------------------------------------------------------------------
  { common: "Monterey Cypress", scientific: "Hesperocyparis macrocarpa", category: "native", commonOnPeninsula: true },
  { common: "Incense Cedar", scientific: "Calocedrus decurrens", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Native Conifers
  // ---------------------------------------------------------------------------
  { common: "Douglas Fir", scientific: "Pseudotsuga menziesii", category: "native", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Native Broadleaf Trees
  // ---------------------------------------------------------------------------
  { common: "California Bay Laurel", scientific: "Umbellularia californica", category: "native", commonOnPeninsula: true },
  { common: "California Buckeye", scientific: "Aesculus californica", category: "native", commonOnPeninsula: true },
  { common: "Madrone", scientific: "Arbutus menziesii", category: "native", commonOnPeninsula: true },
  { common: "Big Leaf Maple", scientific: "Acer macrophyllum", category: "native", commonOnPeninsula: true },
  { common: "Western Sycamore", scientific: "Platanus racemosa", category: "native", commonOnPeninsula: true },
  { common: "White Alder", scientific: "Alnus rhombifolia", category: "native", commonOnPeninsula: true },
  { common: "Arroyo Willow", scientific: "Salix lasiolepis", category: "native", commonOnPeninsula: true },
  { common: "Catalina Ironwood", scientific: "Lyonothamnus floribundus", category: "native", commonOnPeninsula: false },
  { common: "California Fan Palm", scientific: "Washingtonia filifera", category: "native", commonOnPeninsula: false },

  // ---------------------------------------------------------------------------
  // Non-native Eucalyptus
  // ---------------------------------------------------------------------------
  { common: "Eucalyptus (Blue Gum)", scientific: "Eucalyptus globulus", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Red Gum)", scientific: "Eucalyptus camaldulensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Lemon Gum)", scientific: "Corymbia citriodora", category: "nonnative", commonOnPeninsula: true },
  { common: "Eucalyptus (Silver Dollar)", scientific: "Eucalyptus polyanthemos", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Palms
  // ---------------------------------------------------------------------------
  { common: "Mexican Fan Palm", scientific: "Washingtonia robusta", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Date Palm", scientific: "Phoenix canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "King Palm", scientific: "Archontophoenix cunninghamiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Queen Palm", scientific: "Syagrus romanzoffiana", category: "nonnative", commonOnPeninsula: true },
  { common: "Windmill Palm", scientific: "Trachycarpus fortunei", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Pines & Cedars
  // ---------------------------------------------------------------------------
  { common: "Italian Stone Pine", scientific: "Pinus pinea", category: "nonnative", commonOnPeninsula: true },
  { common: "Canary Island Pine", scientific: "Pinus canariensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Aleppo Pine", scientific: "Pinus halepensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Deodar Cedar", scientific: "Cedrus deodara", category: "nonnative", commonOnPeninsula: true },
  { common: "Atlas Cedar", scientific: "Cedrus atlantica", category: "nonnative", commonOnPeninsula: true },
  { common: "Western Red Cedar", scientific: "Thuja plicata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Fruit & Ornamental
  // ---------------------------------------------------------------------------
  { common: "Olive", scientific: "Olea europaea", category: "nonnative", commonOnPeninsula: true },
  { common: "Fig", scientific: "Ficus carica", category: "nonnative", commonOnPeninsula: true },
  { common: "Avocado", scientific: "Persea americana", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Lemon)", scientific: "Citrus limon", category: "nonnative", commonOnPeninsula: true },
  { common: "Citrus (Orange)", scientific: "Citrus sinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Japanese Maple", scientific: "Acer palmatum", category: "nonnative", commonOnPeninsula: true },
  { common: "Southern Magnolia", scientific: "Magnolia grandiflora", category: "nonnative", commonOnPeninsula: true },
  { common: "Jacaranda", scientific: "Jacaranda mimosifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Crepe Myrtle", scientific: "Lagerstroemia indica", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Elms, Planes & Shade Trees
  // ---------------------------------------------------------------------------
  { common: "Chinese Elm", scientific: "Ulmus parvifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "American Elm", scientific: "Ulmus americana", category: "nonnative", commonOnPeninsula: true },
  { common: "London Plane", scientific: "Platanus x acerifolia", category: "nonnative", commonOnPeninsula: true },
  { common: "Sweetgum", scientific: "Liquidambar styraciflua", category: "nonnative", commonOnPeninsula: true },
  { common: "Tulip Tree", scientific: "Liriodendron tulipifera", category: "nonnative", commonOnPeninsula: true },
  { common: "Camphor Tree", scientific: "Cinnamomum camphora", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Non-native Street Trees
  // ---------------------------------------------------------------------------
  { common: "Brisbane Box", scientific: "Lophostemon confertus", category: "nonnative", commonOnPeninsula: true },
  { common: "Fern Pine", scientific: "Afrocarpus gracilior", category: "nonnative", commonOnPeninsula: true },
  { common: "New Zealand Christmas Tree", scientific: "Metrosideros excelsa", category: "nonnative", commonOnPeninsula: true },
  { common: "Flowering Pear", scientific: "Pyrus calleryana", category: "nonnative", commonOnPeninsula: true },
  { common: "Chinese Pistache", scientific: "Pistacia chinensis", category: "nonnative", commonOnPeninsula: true },
  { common: "Zelkova", scientific: "Zelkova serrata", category: "nonnative", commonOnPeninsula: true },

  // ---------------------------------------------------------------------------
  // Other Non-native
  // ---------------------------------------------------------------------------
  { common: "Cork Oak", scientific: "Quercus suber", category: "nonnative", commonOnPeninsula: true },
  { common: "Acacia (Bailey)", scientific: "Acacia baileyana", category: "nonnative", commonOnPeninsula: true },
  { common: "Norfolk Island Pine", scientific: "Araucaria heterophylla", category: "nonnative", commonOnPeninsula: true },
];

export function searchSpecies(query: string): TreeSpecies[] {
  const q = query.toLowerCase();
  return PENINSULA_SPECIES.filter(
    (s) =>
      s.common.toLowerCase().includes(q) ||
      s.scientific.toLowerCase().includes(q)
  );
}

export function getSpeciesByName(common: string): TreeSpecies | undefined {
  return PENINSULA_SPECIES.find(
    (s) => s.common.toLowerCase() === common.toLowerCase()
  );
}
```

### lib/uploads.ts

```typescript
import fs from "fs";
import path from "path";
import crypto from "crypto";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/svg+xml",
]);

export const ALLOWED_AUDIO_TYPES = new Set([
  "audio/webm",
  "audio/mp4",
  "audio/wav",
  "audio/ogg",
  "audio/mpeg",
  "audio/webm;codecs=opus",
]);

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25 MB (Whisper limit)

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

/** Project root — two levels up from lib/ */
const PROJECT_ROOT = path.resolve(process.cwd());
const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads");

/**
 * Get the absolute upload directory for a tree's media, creating it if needed.
 */
export function getUploadDir(
  treeRecordId: string,
  type: "photos" | "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "trees", treeRecordId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the absolute upload directory for property-level media (audio), creating it if needed.
 */
export function getPropertyUploadDir(
  propertyId: string,
  type: "audio"
): string {
  const dir = path.join(UPLOADS_ROOT, "properties", propertyId, type);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for a property-level uploaded file.
 */
export function getPropertyServingUrl(
  propertyId: string,
  type: "audio",
  filename: string
): string {
  return `/api/uploads/properties/${propertyId}/${type}/${filename}`;
}

/**
 * Get the absolute upload directory for arborist assets (logo, etc.), creating it if needed.
 */
export function getArboristUploadDir(arboristId: string): string {
  const dir = path.join(UPLOADS_ROOT, "arborist", arboristId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Get the serving URL for an arborist's uploaded file.
 */
export function getArboristServingUrl(
  arboristId: string,
  filename: string
): string {
  return `/api/uploads/arborist/${arboristId}/${filename}`;
}

/**
 * Generate a collision-safe filename from the original.
 * Format: {timestamp}_{random}_{sanitized-original}
 */
export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const rand = crypto.randomBytes(4).toString("hex");
  // Sanitize: keep only alphanumeric, dots, hyphens, underscores
  const sanitized = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-60);
  return `${timestamp}_${rand}_${sanitized}`;
}

/**
 * Get the serving URL for an uploaded file.
 */
export function getServingUrl(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): string {
  return `/api/uploads/trees/${treeRecordId}/${type}/${filename}`;
}

/**
 * Delete an uploaded file from disk. Silently ignores if file doesn't exist.
 */
export function deleteFile(
  treeRecordId: string,
  type: "photos" | "audio",
  filename: string
): void {
  const filePath = path.join(
    UPLOADS_ROOT,
    "trees",
    treeRecordId,
    type,
    filename
  );
  try {
    fs.unlinkSync(filePath);
  } catch (err: unknown) {
    // Ignore if file doesn't exist
    if (err && typeof err === "object" && "code" in err && err.code !== "ENOENT") {
      throw err;
    }
  }
}

/**
 * Resolve a relative path to an absolute one within the uploads directory.
 * Returns null if the path escapes the uploads root (path traversal).
 */
export function resolveUploadPath(relativePath: string): string | null {
  const resolved = path.resolve(UPLOADS_ROOT, relativePath);
  if (!resolved.startsWith(UPLOADS_ROOT)) {
    return null; // path traversal attempt
  }
  return resolved;
}

// ---------------------------------------------------------------------------
// MIME type detection
// ---------------------------------------------------------------------------

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
  ".webm": "audio/webm",
  ".mp4": "audio/mp4",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
};

export function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_MAP[ext] || "application/octet-stream";
}
```

### lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### hooks/use-audio-recorder.ts

```typescript
"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface UseAudioRecorderReturn {
  isRecording: boolean;
  duration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob>;
  error: string | null;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveStopRef = useRef<((blob: Blob) => void) | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setDuration(0);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine best supported MIME type
      let mimeType = "audio/webm;codecs=opus";
      if (typeof MediaRecorder !== "undefined") {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          if (MediaRecorder.isTypeSupported("audio/webm")) {
            mimeType = "audio/webm";
          } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
            mimeType = "audio/mp4";
          } else {
            mimeType = ""; // let the browser choose
          }
        }
      }

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        // Stop all tracks
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;

        // Clear interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        setIsRecording(false);

        // Resolve the stop promise
        if (resolveStopRef.current) {
          resolveStopRef.current(blob);
          resolveStopRef.current = null;
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250); // collect chunks every 250ms
      setIsRecording(true);

      // Duration timer
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to start recording";
      setError(msg);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        reject(new Error("No active recording"));
        return;
      }

      resolveStopRef.current = resolve;
      recorder.stop();
    });
  }, []);

  return {
    isRecording,
    duration,
    startRecording,
    stopRecording,
    error,
  };
}
```

### hooks/use-toast.ts

```typescript
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

### scripts/test-ordinances.ts

```typescript
/**
 * Test script for ordinance check logic.
 * Simulates checkTreeProtection without requiring a database connection
 * by using the seed data directly.
 *
 * Run: npx tsx scripts/test-ordinances.ts
 */

import { getSpeciesByName } from "../lib/species";

// --- Types (mirroring lib/ordinances.ts) ---
interface ProtectedSpeciesRule {
  species: string;
  scientific: string;
  dbhThreshold: number;
  category: string;
}

interface MitigationRules {
  replantingRatio: string;
  inLieuFee: string;
  notes: string;
}

interface HeritageTreeRules {
  dbhThreshold: number | null;
  reviewProcess: string;
  notes: string;
  designatedByCouncil?: boolean;
  designatedByCommittee?: boolean;
  speciesRestricted?: boolean;
  protectedSpecies?: string[];
}

interface OrdinanceData {
  cityName: string;
  protectedSpecies: ProtectedSpeciesRule[];
  defaultDbhThresholdNative: number | null;
  defaultDbhThresholdNonnative: number | null;
  mitigationRules: MitigationRules;
  heritageTreeRules: HeritageTreeRules;
  codeReference: string | null;
}

// --- Seed data (parsed from seed.ts) ---
const ordinances: OrdinanceData[] = [
  {
    cityName: "Palo Alto",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 11.5, category: "native" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 11.5, category: "native" },
      { species: "California Incense Cedar", scientific: "Calocedrus decurrens", dbhThreshold: 11.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 18, category: "native" },
    ],
    defaultDbhThresholdNative: 15,
    defaultDbhThresholdNonnative: 15,
    mitigationRules: { replantingRatio: "Per TLTM Table 3-1", inLieuFee: "Fair market value per 24-inch box tree", notes: "Replacement per TLTM." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "City Council designation", notes: "Heritage by Council designation only." },
    codeReference: "PAMC §8.10.020, §8.10.050, §8.10.055",
  },
  {
    cityName: "Menlo Park",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 10, category: "native_oak" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 10, category: "native_oak" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 10, category: "native_oak" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 10, category: "native_oak" },
      { species: "Canyon Live Oak", scientific: "Quercus chrysolepis", dbhThreshold: 10, category: "native_oak" },
      { species: "Interior Live Oak", scientific: "Quercus wislizeni", dbhThreshold: 10, category: "native_oak" },
      { species: "Oregon White Oak", scientific: "Quercus garryana", dbhThreshold: 10, category: "native_oak" },
    ],
    defaultDbhThresholdNative: 15,
    defaultDbhThresholdNonnative: 15,
    mitigationRules: { replantingRatio: "1:1", inLieuFee: "Based on trunk diameter", notes: "Replacement from approved list." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "Council designation", notes: "Heritage by designation." },
    codeReference: "MPMC §13.24.020, §13.24.040, §13.24.050",
  },
  {
    cityName: "Atherton",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 15.2, category: "heritage_oak" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 15.2, category: "heritage" },
    ],
    defaultDbhThresholdNative: 15.2,
    defaultDbhThresholdNonnative: null,
    mitigationRules: { replantingRatio: "1:1 oak (48-inch box)", inLieuFee: "Based on appraised value", notes: "Oak replacements must be oak species." },
    heritageTreeRules: {
      dbhThreshold: 15.2,
      speciesRestricted: true,
      protectedSpecies: ["Quercus agrifolia", "Quercus lobata", "Quercus douglasii", "Sequoia sempervirens"],
      reviewProcess: "Planning Commission",
      notes: "Heritage = oak/redwood at 15.2\" DBH.",
    },
    codeReference: "AMC §8.10.020, §8.10.030, §8.10.040, §8.10.070",
  },
  {
    cityName: "Woodside",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 9.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 9.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 9.5, category: "native" },
      { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 9.5, category: "native" },
      { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 9.5, category: "native" },
      { species: "California Buckeye", scientific: "Aesculus californica", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native_slow" },
      { species: "White Alder", scientific: "Alnus rhombifolia", dbhThreshold: 7.6, category: "native_slow" },
      { species: "Tan Oak", scientific: "Notholithocarpus densiflorus", dbhThreshold: 7.6, category: "native_slow" },
    ],
    defaultDbhThresholdNative: 9.5,
    defaultDbhThresholdNonnative: 11.5,
    mitigationRules: { replantingRatio: "Per Planning Commission", inLieuFee: "None", notes: "Penalties: $5K first tree, $7.5K second, $10K each additional." },
    heritageTreeRules: { dbhThreshold: null, designatedByCommittee: true, reviewProcess: "Heritage Tree Committee", notes: "Heritage by nomination." },
    codeReference: "WMC §153.005, §153.430-435",
  },
  {
    cityName: "Portola Valley",
    protectedSpecies: [
      { species: "Coast Live Oak", scientific: "Quercus agrifolia", dbhThreshold: 11.5, category: "native" },
      { species: "Valley Oak", scientific: "Quercus lobata", dbhThreshold: 11.5, category: "native" },
      { species: "California Black Oak", scientific: "Quercus kelloggii", dbhThreshold: 11.5, category: "native" },
      { species: "California Bay Laurel", scientific: "Umbellularia californica", dbhThreshold: 11.5, category: "native" },
      { species: "Coast Redwood", scientific: "Sequoia sempervirens", dbhThreshold: 17.2, category: "native" },
      { species: "Douglas Fir", scientific: "Pseudotsuga menziesii", dbhThreshold: 17.2, category: "native" },
      { species: "Blue Oak", scientific: "Quercus douglasii", dbhThreshold: 5.0, category: "native" },
      { species: "Big Leaf Maple", scientific: "Acer macrophyllum", dbhThreshold: 7.6, category: "native" },
      { species: "Madrone", scientific: "Arbutus menziesii", dbhThreshold: 7.6, category: "native" },
    ],
    defaultDbhThresholdNative: null,
    defaultDbhThresholdNonnative: null,
    mitigationRules: { replantingRatio: "Native species replacement", inLieuFee: "None", notes: "Conservation Committee review." },
    heritageTreeRules: { dbhThreshold: null, designatedByCouncil: true, reviewProcess: "Town Council", notes: "Heritage by Council designation." },
    codeReference: "PVMC §15.12.060, §15.12.070, §15.12.275",
  },
];

// --- Check logic (mirroring lib/ordinances.ts checkTreeProtection) ---
function checkTreeProtection(cityName: string, speciesCommon: string, dbhInches: number) {
  const ordinance = ordinances.find((o) => o.cityName === cityName);
  if (!ordinance) return { isProtected: false, reason: `No data for ${cityName}`, isHeritage: false, heritageReason: null, codeReference: null };

  const species = getSpeciesByName(speciesCommon);
  const isNative = species?.category === "native";
  const scientificName = species?.scientific?.toLowerCase();

  // Species-specific check first
  const speciesRule = ordinance.protectedSpecies.find(
    (s) =>
      s.species.toLowerCase() === speciesCommon.toLowerCase() ||
      (scientificName && s.scientific.toLowerCase() === scientificName) ||
      s.species.toLowerCase() === "any tree"
  );

  let isProtected = false;
  let reason = "";

  if (speciesRule) {
    if (dbhInches >= speciesRule.dbhThreshold) {
      isProtected = true;
      reason = `${speciesCommon} with ${dbhInches}" DBH meets or exceeds ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} with ${dbhInches}" DBH does not meet ${speciesRule.dbhThreshold}" threshold per ${ordinance.codeReference}`;
    }
  } else {
    const threshold = isNative ? ordinance.defaultDbhThresholdNative : ordinance.defaultDbhThresholdNonnative;
    if (threshold != null && dbhInches >= threshold) {
      isProtected = true;
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH meets or exceeds ${threshold}" threshold per ${ordinance.codeReference}`;
    } else if (threshold != null) {
      reason = `${isNative ? "Native" : "Non-native"} tree with ${dbhInches}" DBH does not meet ${threshold}" threshold per ${ordinance.codeReference}`;
    } else {
      reason = `${speciesCommon} is not a regulated species under ${cityName}'s tree ordinance (${ordinance.codeReference})`;
    }
  }

  // Heritage check
  let isHeritage = false;
  let heritageReason: string | null = null;
  const hr = ordinance.heritageTreeRules;

  if (hr.dbhThreshold != null && dbhInches >= hr.dbhThreshold) {
    const speciesQualifies = !hr.speciesRestricted ||
      (hr.protectedSpecies && scientificName && hr.protectedSpecies.some((s) => s.toLowerCase() === scientificName));
    if (speciesQualifies) {
      isHeritage = true;
      isProtected = true;
      heritageReason = `Heritage tree (${dbhInches}" DBH >= ${hr.dbhThreshold}" threshold). ${hr.reviewProcess}. ${hr.notes}`;
    }
  } else if (hr.designatedByCouncil || hr.designatedByCommittee) {
    heritageReason = `Heritage status in ${cityName} is by ${hr.designatedByCouncil ? "Council" : "committee"} designation only.`;
  }

  return { isProtected, reason, isHeritage, heritageReason, codeReference: ordinance.codeReference };
}

// --- Test Cases ---
console.log("=".repeat(80));
console.log("ORDINANCE CHECK TEST RESULTS");
console.log("=".repeat(80));

const tests = [
  { city: "Palo Alto", species: "Coast Live Oak", dbh: 24, expectProtected: true, expectHeritage: false, label: "Test 1" },
  { city: "Palo Alto", species: "Flowering Pear", dbh: 6, expectProtected: false, expectHeritage: false, label: "Test 2" },
  { city: "Atherton", species: "Valley Oak", dbh: 36, expectProtected: true, expectHeritage: true, label: "Test 3" },
  { city: "Menlo Park", species: "Coast Redwood", dbh: 14, expectProtected: false, expectHeritage: false, label: "Test 4" },
  { city: "Woodside", species: "Coast Live Oak", dbh: 30, expectProtected: true, expectHeritage: false, label: "Test 5" },
];

let pass = 0;
let fail = 0;

for (const t of tests) {
  const result = checkTreeProtection(t.city, t.species, t.dbh);
  const protectedOk = result.isProtected === t.expectProtected;
  const heritageOk = result.isHeritage === t.expectHeritage;
  const ok = protectedOk && heritageOk;

  if (ok) pass++;
  else fail++;

  console.log(`\n${t.label}: ${t.species}, ${t.dbh}" DBH, ${t.city}`);
  console.log(`  Protected: ${result.isProtected} ${protectedOk ? "OK" : `FAIL (expected ${t.expectProtected})`}`);
  console.log(`  Heritage:  ${result.isHeritage} ${heritageOk ? "OK" : `FAIL (expected ${t.expectHeritage})`}`);
  console.log(`  Reason:    ${result.reason}`);
  if (result.heritageReason) console.log(`  Heritage:  ${result.heritageReason}`);
  console.log(`  Code ref:  ${result.codeReference}`);
  console.log(`  Result:    ${ok ? "PASS" : "FAIL"}`);
}

console.log(`\n${"=".repeat(80)}`);
console.log(`Results: ${pass}/${tests.length} passed, ${fail} failed`);
console.log("=".repeat(80));

process.exit(fail > 0 ? 1 : 0);
```

### types/mapbox.d.ts

```typescript
declare module "@mapbox/point-geometry" {
  class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
  }
  export = Point;
}
```

### components/app-providers.tsx

```tsx
"use client";

import { ConnectivityProvider } from "@/lib/connectivity";
import { type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ConnectivityProvider>{children}</ConnectivityProvider>;
}
```

### components/condition-rating.tsx

```tsx
"use client";

interface ConditionRatingProps {
  value: number;
  onChange: (rating: number) => void;
  size?: "sm" | "md";
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

function getButtonClasses(rating: number, isSelected: boolean): string {
  if (!isSelected) return "border-muted hover:border-muted-foreground/40";

  switch (rating) {
    case 0:
      return "border-gray-700 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    case 1:
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case 2:
      return "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case 3:
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    case 4:
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case 5:
      return "border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
    default:
      return "border-muted";
  }
}

export function ConditionRating({
  value,
  onChange,
  size = "md",
}: ConditionRatingProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5">
      {[0, 1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg border-2 transition-colors ${
            isSm ? "px-1 py-2 text-xs" : "px-1.5 py-3 text-sm"
          } ${getButtonClasses(rating, value === rating)}`}
          style={{ minHeight: 44 }}
        >
          <span className={`font-bold ${isSm ? "text-sm" : "text-lg"}`}>
            {rating}
          </span>
          <span
            className={`leading-tight font-medium ${
              isSm ? "text-[8px]" : "text-[9px]"
            }`}
          >
            {CONDITION_LABELS[rating]}
          </span>
        </button>
      ))}
    </div>
  );
}
```

### components/connectivity-indicator.tsx

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { WifiOff } from "lucide-react";
import { useConnectivity } from "@/lib/connectivity";

export function ConnectivityIndicator() {
  const { isOnline, pendingCount } = useConnectivity();
  const [wasOffline, setWasOffline] = useState(false);
  const prevOnline = useRef(true);

  useEffect(() => {
    if (isOnline && !prevOnline.current) {
      // Just came back online
      setWasOffline(true);
      const t = setTimeout(() => setWasOffline(false), 3000);
      return () => clearTimeout(t);
    }
    if (!isOnline) {
      prevOnline.current = false;
    } else {
      prevOnline.current = true;
    }
  }, [isOnline]);

  if (isOnline && !wasOffline) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] text-center py-2 px-4 text-sm font-medium transition-colors ${
        isOnline ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
      }`}
    >
      {isOnline ? (
        pendingCount > 0 ? (
          `Back online — syncing ${pendingCount} change${pendingCount !== 1 ? "s" : ""}...`
        ) : (
          "Back online"
        )
      ) : (
        <span className="flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          You are offline — changes will sync when reconnected
          {pendingCount > 0 && ` (${pendingCount} pending)`}
        </span>
      )}
    </div>
  );
}
```

### components/dashboard-content.tsx

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  TreePine,
  Clock,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Plus,
  Send,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  ClipboardList,
  FileText,
  Award,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DashboardTree {
  id: string;
  isProtected: boolean;
}

interface DashboardReport {
  id: string;
  status: string;
  permitStatus: string | null;
}

interface DashboardProperty {
  id: string;
  address: string;
  city: string;
  county: string;
  reportType: string;
  neededByDate: string | null;
  updatedAt: string;
  trees: DashboardTree[];
  reports: DashboardReport[];
}

interface ActivityItem {
  id: string;
  address: string;
  city: string;
  updatedAt: string;
  treeCount: number;
  reportStatus: string | null;
  certifiedAt: string | null;
}

interface PermitStats {
  pendingSubmission: number;
  submittedOrReview: number;
  approved: number;
  needingRevision: number;
}

interface NextActions {
  needTreeAssessment: number;
  needReport: number;
  readyToCertify: number;
}

interface DashboardContentProps {
  properties: DashboardProperty[];
  totalTrees: number;
  activityFeed?: ActivityItem[];
  permitStats?: PermitStats;
  nextActions?: NextActions;
  treesThisWeek?: number;
  treesLastWeek?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";

function getWorkflowStatus(property: DashboardProperty) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", color: "bg-gray-100 text-gray-600" };
  if (!latestReport)
    return { label: "Assessing", color: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", color: "bg-emerald-100 text-emerald-700" };
  return { label: "Draft", color: "bg-blue-100 text-blue-700" };
}

function getFilterCategory(property: DashboardProperty): FilterStatus {
  const latestReport = property.reports[0];
  if (!latestReport) return "inProgress";
  if (latestReport.status === "certified") return "certified";
  return "draft";
}

function getDueIndicator(neededByDate: string | null) {
  if (!neededByDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(neededByDate);
  due.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 0)
    return { label: "Overdue", className: "text-red-600 bg-red-50" };
  if (daysUntil === 0)
    return { label: "Due today", className: "text-amber-600 bg-amber-50" };
  if (daysUntil <= 7)
    return {
      label: `Due in ${daysUntil}d`,
      className: "text-amber-600 bg-amber-50",
    };
  return null;
}

function formatReportType(reportType: string) {
  return reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function getActivityDescription(item: ActivityItem): string {
  if (item.certifiedAt) {
    return "Report certified";
  }
  if (item.reportStatus === "draft" || item.reportStatus === "review") {
    return "Report drafted";
  }
  if (item.treeCount > 0) {
    return `${item.treeCount} tree${item.treeCount !== 1 ? "s" : ""} assessed`;
  }
  return "Property created";
}

export function DashboardContent({
  properties,
  totalTrees,
  activityFeed,
  permitStats,
  nextActions,
  treesThisWeek,
  treesLastWeek,
}: DashboardContentProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Compute counts
  const counts = {
    all: properties.length,
    inProgress: properties.filter((p) => getFilterCategory(p) === "inProgress")
      .length,
    draft: properties.filter((p) => getFilterCategory(p) === "draft").length,
    certified: properties.filter((p) => getFilterCategory(p) === "certified")
      .length,
  };

  // Filter properties
  const filtered =
    filter === "all"
      ? properties
      : properties.filter((p) => getFilterCategory(p) === filter);

  const stats = [
    {
      title: "In Progress",
      value: counts.inProgress,
      icon: Clock,
      accent: "text-amber-600",
      bg: "bg-amber-50",
      filterKey: "inProgress" as FilterStatus,
    },
    {
      title: "Ready to Certify",
      value: counts.draft,
      icon: FileCheck,
      accent: "text-blue-600",
      bg: "bg-blue-50",
      filterKey: "draft" as FilterStatus,
    },
    {
      title: "Certified",
      value: counts.certified,
      icon: ShieldCheck,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      filterKey: "certified" as FilterStatus,
    },
    {
      title: "Trees Assessed",
      value: totalTrees,
      icon: TreePine,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      filterKey: null,
    },
  ];

  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "inProgress", label: `In Progress (${counts.inProgress})` },
    { key: "draft", label: `Draft (${counts.draft})` },
    { key: "certified", label: `Certified (${counts.certified})` },
  ];

  return (
    <>
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isClickable = stat.filterKey !== null;
          const cardContent = (
            <Card
              key={stat.title}
              className={cn(
                "transition-all",
                isClickable && "hover:shadow-md hover:border-gray-300"
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-md p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.accent}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </div>
                {stat.title === "Trees Assessed" && treesThisWeek != null && (
                  <div className="flex items-center gap-1 mt-1">
                    {treesThisWeek > (treesLastWeek ?? 0) ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : treesThisWeek < (treesLastWeek ?? 0) ? (
                      <TrendingDown className="h-3 w-3 text-amber-500" />
                    ) : (
                      <Minus className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {treesThisWeek} this week
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );

          if (isClickable) {
            return (
              <Link key={stat.title} href={`/properties?status=${stat.filterKey}`}>
                {cardContent}
              </Link>
            );
          }
          return <div key={stat.title}>{cardContent}</div>;
        })}
      </div>

      {/* Next Action Needed */}
      {nextActions && (nextActions.needTreeAssessment + nextActions.needReport + nextActions.readyToCertify > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Next Action Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {nextActions.needTreeAssessment > 0 && (
                <Link
                  href="/properties?status=inProgress"
                  className="flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-gray-900">
                      {nextActions.needTreeAssessment} propert{nextActions.needTreeAssessment !== 1 ? "ies" : "y"} need tree assessment
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-amber-600" />
                </Link>
              )}
              {nextActions.needReport > 0 && (
                <Link
                  href="/properties?status=inProgress"
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-900">
                      {nextActions.needReport} propert{nextActions.needReport !== 1 ? "ies" : "y"} need a report
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </Link>
              )}
              {nextActions.readyToCertify > 0 && (
                <Link
                  href="/properties?status=draft"
                  className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-900">
                      {nextActions.readyToCertify} report{nextActions.readyToCertify !== 1 ? "s" : ""} ready to certify
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-600" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permit Pipeline Card */}
      {permitStats && (permitStats.pendingSubmission + permitStats.submittedOrReview + permitStats.approved + permitStats.needingRevision > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Permit Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Send className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{permitStats.pendingSubmission}</p>
                  <p className="text-xs text-gray-500">Pending Submission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50">
                <Clock className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{permitStats.submittedOrReview}</p>
                  <p className="text-xs text-gray-500">Submitted / Under Review</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{permitStats.approved}</p>
                  <p className="text-xs text-gray-500">Approved</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{permitStats.needingRevision}</p>
                  <p className="text-xs text-gray-500">Needing Revision</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Properties Card */}
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Properties
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/properties"
              className="text-emerald-600 hover:text-emerald-700"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        {/* Filter Pills */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  filter === f.key
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-50 p-3 mb-4">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                {filter === "all" ? "No properties yet" : "No properties match this filter"}
              </p>
              {filter === "all" && (
                <>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by adding your first property and pinning trees on the
                    map.
                  </p>
                  <Button
                    asChild
                    size="sm"
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link href="/properties/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Property
                    </Link>
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((property) => {
                const treeCount = property.trees.length;
                const protectedCount = property.trees.filter(
                  (t) => t.isProtected
                ).length;
                const workflow = getWorkflowStatus(property);
                const dueIndicator = getDueIndicator(property.neededByDate);

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-between gap-4 py-3.5 px-1 rounded-lg transition-colors hover:bg-gray-50 -mx-1 first:pt-0"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {property.address}
                          </p>
                          {property.address === "123 Sample Street" && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted-foreground/30 shrink-0"
                            >
                              Sample
                            </Badge>
                          )}
                          <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 hidden sm:inline">
                            {formatReportType(property.reportType)}
                          </span>
                        </div>
                        <p className="truncate text-xs text-gray-500">
                          {property.city}
                          {property.county ? `, ${property.county} County` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      {dueIndicator && (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded hidden sm:inline",
                            dueIndicator.className
                          )}
                        >
                          {dueIndicator.label}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <TreePine className="h-3.5 w-3.5" />
                        <span className="font-mono">{treeCount}</span>
                        {protectedCount > 0 && (
                          <span className="flex items-center gap-0.5 text-emerald-600">
                            <ShieldCheck className="h-3 w-3" />
                            {protectedCount}
                          </span>
                        )}
                      </div>
                      <span className="hidden md:inline-block text-xs text-gray-400">
                        {format(new Date(property.updatedAt), "MMM d, yyyy")}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full",
                          workflow.color
                        )}
                      >
                        {workflow.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {activityFeed && activityFeed.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <Link
                  key={item.id}
                  href={`/properties/${item.id}`}
                  className="flex items-center gap-3 text-sm hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    {item.certifiedAt ? (
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">{item.address}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 hidden sm:inline-flex">
                        {item.city}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{getActivityDescription(item)}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA for new users with only the sample property */}
      {properties.length > 0 && properties.length <= 1 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>
            The sample property above shows what a completed assessment looks
            like.
          </p>
          <p className="mt-1">
            Ready to start?{" "}
            <Link
              href="/properties/new"
              className="text-emerald-600 font-medium hover:underline"
            >
              Create your first property &rarr;
            </Link>
          </p>
        </div>
      )}
    </>
  );
}
```

### components/mobile-nav.tsx

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TreePine,
  LayoutDashboard,
  MapPin,
  BookOpen,
  Plus,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConnectivity } from "@/lib/connectivity";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: MapPin },
  { label: "Ordinances", href: "/ordinances", icon: BookOpen },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface MobileNavProps {
  arboristName: string;
  isaCertNum: string;
  profilePhotoUrl?: string;
}

export function MobileNav({ arboristName, isaCertNum, profilePhotoUrl }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isOnline, pendingCount } = useConnectivity();

  // Close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar — mobile only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
        <div className="flex items-center gap-2">
          <TreePine className="h-5 w-5 text-emerald-400" />
          <span className="font-bold text-sm">TreeCertify</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center h-11 w-11 -mr-2 rounded-lg"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out sidebar overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-[hsl(var(--sidebar-muted))] px-6">
          <TreePine className="h-6 w-6 text-emerald-400" />
          <div>
            <h1 className="text-base font-bold tracking-tight">TreeCertify</h1>
            <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))]/60">
              Arborist OS
            </p>
          </div>
        </div>

        {/* Quick action */}
        <div className="px-4 py-4">
          <Link
            href="/properties/new"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            <Plus className="h-4 w-4" />
            New Property
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[hsl(var(--sidebar-accent))] text-white"
                    : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-muted))] hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-[hsl(var(--sidebar-muted))] p-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              {profilePhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profilePhotoUrl}
                  alt={arboristName}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sidebar-muted))]">
                  <User className="h-5 w-5" />
                </div>
              )}
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[hsl(var(--sidebar))]",
                  isOnline ? "bg-emerald-500" : "bg-red-500 animate-pulse"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{arboristName}</p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50 truncate">
                ISA {isaCertNum}
              </p>
              {pendingCount > 0 && (
                <p className="text-[10px] text-orange-400 font-medium">
                  {pendingCount} pending
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

### components/permit-status-pipeline.tsx

```tsx
"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PermitStatusPipelineProps {
  permitStatus: string | null;
  submittedAt: string | null;
  submittedTo: string | null;
  reviewerName: string | null;
  reviewerNotes: string | null;
  conditionsOfApproval: string | null;
  denialReason: string | null;
  approvedAt: string | null;
  permitExpiresAt: string | null;
  certifiedAt: string | null;
  mode: "interactive" | "readonly";
  friendlyLabels?: boolean;
  onUpdatePermitStatus?: (data: Record<string, unknown>) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Stage definitions
// ---------------------------------------------------------------------------

interface Stage {
  key: string;
  label: string;
  friendlyLabel: string;
  icon: React.ElementType;
}

const STAGES: Stage[] = [
  { key: "certified", label: "Certified", friendlyLabel: "Report Complete", icon: ShieldCheck },
  { key: "submitted", label: "Submitted", friendlyLabel: "Submitted to City", icon: Send },
  { key: "under_review", label: "Under Review", friendlyLabel: "Under Review", icon: Clock },
];

const TERMINAL_STAGES: Record<string, { label: string; friendlyLabel: string; icon: React.ElementType; color: string }> = {
  approved: { label: "Approved", friendlyLabel: "Permit Approved", icon: ShieldCheck, color: "emerald" },
  denied: { label: "Denied", friendlyLabel: "Permit Denied", icon: XCircle, color: "red" },
  revision_requested: { label: "Revision Requested", friendlyLabel: "Revision Needed", icon: AlertTriangle, color: "amber" },
};

function getCurrentStageIndex(permitStatus: string | null, certifiedAt: string | null): number {
  if (!certifiedAt) return -1;
  if (!permitStatus) return 0;
  if (permitStatus === "submitted") return 1;
  if (permitStatus === "under_review") return 2;
  if (permitStatus in TERMINAL_STAGES) return 3;
  return 0;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PermitStatusPipeline({
  permitStatus,
  submittedAt,
  submittedTo,
  reviewerName,
  reviewerNotes,
  conditionsOfApproval,
  denialReason,
  approvedAt,
  permitExpiresAt,
  certifiedAt,
  mode,
  friendlyLabels = false,
  onUpdatePermitStatus,
}: PermitStatusPipelineProps) {
  const currentStage = getCurrentStageIndex(permitStatus, certifiedAt);
  const [expandedAction, setExpandedAction] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state for each action
  const [formSubmittedTo, setFormSubmittedTo] = useState("");
  const [formReviewerName, setFormReviewerName] = useState("");
  const [formConditions, setFormConditions] = useState("");
  const [formExpiresAt, setFormExpiresAt] = useState("");
  const [formDenialReason, setFormDenialReason] = useState("");
  const [formReviewerNotes, setFormReviewerNotes] = useState("");

  const handleUpdate = useCallback(
    async (data: Record<string, unknown>) => {
      if (!onUpdatePermitStatus) return;
      setSaving(true);
      try {
        await onUpdatePermitStatus(data);
        setExpandedAction(null);
      } finally {
        setSaving(false);
      }
    },
    [onUpdatePermitStatus]
  );

  // Determine terminal stage info
  const terminalInfo = permitStatus && TERMINAL_STAGES[permitStatus]
    ? TERMINAL_STAGES[permitStatus]
    : { label: "Approved", friendlyLabel: "Permit Approved", icon: ShieldCheck, color: "emerald" };

  // Build full stages list including terminal
  const allStages = [
    ...STAGES,
    {
      key: "terminal",
      label: terminalInfo.label,
      friendlyLabel: terminalInfo.friendlyLabel,
      icon: terminalInfo.icon,
    },
  ];

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Send className="h-4 w-4 text-emerald-600" />
          {friendlyLabels ? "Permit Status" : "Permit Status"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ---- Pipeline visualization ---- */}
        <div className="flex items-center gap-0 overflow-x-auto pb-2">
          {allStages.map((stage, idx) => {
            const isComplete = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isTerminal = idx === 3;
            const isTerminalDenied = isTerminal && permitStatus === "denied";
            const isTerminalRevision = isTerminal && permitStatus === "revision_requested";

            // Colors
            let circleColor = "bg-gray-200 text-gray-400";
            let lineColor = "bg-gray-200";
            let textColor = "text-gray-400";

            if (isComplete) {
              circleColor = "bg-emerald-600 text-white";
              lineColor = "bg-emerald-600";
              textColor = "text-emerald-700";
            } else if (isCurrent) {
              circleColor = "bg-amber-500 text-white";
              textColor = "text-amber-700 font-semibold";
              if (isTerminalDenied) {
                circleColor = "bg-red-500 text-white";
                textColor = "text-red-700 font-semibold";
              } else if (isTerminalRevision) {
                circleColor = "bg-amber-500 text-white";
                textColor = "text-amber-700 font-semibold";
              } else if (isTerminal && permitStatus === "approved") {
                circleColor = "bg-emerald-600 text-white";
                textColor = "text-emerald-700 font-semibold";
              }
            }

            const StageIcon = stage.icon;
            const label = friendlyLabels ? stage.friendlyLabel : stage.label;

            return (
              <div key={stage.key} className="flex items-center">
                {/* Connector line (before each stage except first) */}
                {idx > 0 && (
                  <div
                    className={cn(
                      "h-0.5 w-6 sm:w-10 shrink-0",
                      isComplete || isCurrent ? (isTerminalDenied ? "bg-red-300" : isTerminalRevision ? "bg-amber-300" : "bg-emerald-300") : lineColor
                    )}
                  />
                )}

                {/* Stage node */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                      circleColor
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <StageIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span className={cn("text-[10px] sm:text-xs text-center whitespace-nowrap", textColor)}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Status detail line ---- */}
        <div className="text-xs text-muted-foreground space-y-0.5">
          {submittedTo && submittedAt && (
            <p>
              Submitted to <span className="font-medium text-foreground">{submittedTo}</span> on{" "}
              {formatDate(submittedAt)}
            </p>
          )}
          {reviewerName && (
            <p>Reviewer: <span className="font-medium text-foreground">{reviewerName}</span></p>
          )}
          {permitStatus === "approved" && approvedAt && (
            <p>Approved on {formatDate(approvedAt)}</p>
          )}
          {permitStatus === "approved" && permitExpiresAt && (
            <p>Permit expires: {formatDate(permitExpiresAt)}</p>
          )}
          {permitStatus === "approved" && conditionsOfApproval && (
            <div className="mt-2 p-2 rounded bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">
              <p className="font-medium mb-1">Conditions of Approval</p>
              <p className="whitespace-pre-wrap">{conditionsOfApproval}</p>
            </div>
          )}
          {permitStatus === "denied" && denialReason && (
            <div className="mt-2 p-2 rounded bg-red-50 border border-red-100 text-xs text-red-800">
              <p className="font-medium mb-1">Reason for Denial</p>
              <p className="whitespace-pre-wrap">{denialReason}</p>
            </div>
          )}
          {permitStatus === "revision_requested" && reviewerNotes && (
            <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-100 text-xs text-amber-800">
              <p className="font-medium mb-1">Reviewer Notes</p>
              <p className="whitespace-pre-wrap">{reviewerNotes}</p>
            </div>
          )}
        </div>

        {/* ---- Interactive form section (arborist only) ---- */}
        {mode === "interactive" && (
          <div className="pt-2 border-t">
            {/* Stage 0: Mark as Submitted */}
            {currentStage === 0 && (
              <>
                {expandedAction !== "submit" ? (
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setExpandedAction("submit")}
                  >
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Submitted
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="submittedTo" className="text-xs">
                        Submitted to
                      </Label>
                      <Input
                        id="submittedTo"
                        placeholder="e.g. City of Palo Alto Planning Dept"
                        value={formSubmittedTo}
                        onChange={(e) => setFormSubmittedTo(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={!formSubmittedTo.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "submitted",
                            submittedAt: new Date().toISOString(),
                            submittedTo: formSubmittedTo.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Submission"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedAction(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Stage 1: Mark as Under Review */}
            {currentStage === 1 && (
              <>
                {expandedAction !== "review" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedAction("review")}
                  >
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    Mark as Under Review
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="reviewerName" className="text-xs">
                        Reviewer name (optional)
                      </Label>
                      <Input
                        id="reviewerName"
                        placeholder="e.g. John Smith, Planning Dept"
                        value={formReviewerName}
                        onChange={(e) => setFormReviewerName(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "under_review",
                            ...(formReviewerName.trim() && { reviewerName: formReviewerName.trim() }),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedAction(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Stage 2: Record decision */}
            {currentStage === 2 && (
              <>
                {!expandedAction ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setExpandedAction("approved")}
                    >
                      <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                      Approved
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => setExpandedAction("denied")}
                    >
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Denied
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => setExpandedAction("revision")}
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                      Revision Requested
                    </Button>
                  </div>
                ) : expandedAction === "approved" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="conditions" className="text-xs">
                        Conditions of approval (optional)
                      </Label>
                      <Textarea
                        id="conditions"
                        placeholder="e.g. Plant 2 replacement trees within 6 months"
                        value={formConditions}
                        onChange={(e) => setFormConditions(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="expiresAt" className="text-xs">
                        Permit expiration date (optional)
                      </Label>
                      <Input
                        id="expiresAt"
                        type="date"
                        value={formExpiresAt}
                        onChange={(e) => setFormExpiresAt(e.target.value)}
                        className="text-sm w-48"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "approved",
                            approvedAt: new Date().toISOString(),
                            ...(formConditions.trim() && { conditionsOfApproval: formConditions.trim() }),
                            ...(formExpiresAt && { permitExpiresAt: new Date(formExpiresAt).toISOString() }),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Approval"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : expandedAction === "denied" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="denialReason" className="text-xs">
                        Reason for denial
                      </Label>
                      <Textarea
                        id="denialReason"
                        placeholder="Enter the reason provided by the city..."
                        value={formDenialReason}
                        onChange={(e) => setFormDenialReason(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={!formDenialReason.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "denied",
                            denialReason: formDenialReason.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm Denial"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : expandedAction === "revision" ? (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="reviewerNotes" className="text-xs">
                        Reviewer notes / required changes
                      </Label>
                      <Textarea
                        id="reviewerNotes"
                        placeholder="What changes did the city request?"
                        value={formReviewerNotes}
                        onChange={(e) => setFormReviewerNotes(e.target.value)}
                        rows={3}
                        className="text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700"
                        disabled={!formReviewerNotes.trim() || saving}
                        onClick={() =>
                          handleUpdate({
                            permitStatus: "revision_requested",
                            reviewerNotes: formReviewerNotes.trim(),
                          })
                        }
                      >
                        {saving ? "Saving..." : "Confirm"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setExpandedAction(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {/* Stage 3: Terminal — allow reset for denied/revision */}
            {currentStage === 3 && (permitStatus === "denied" || permitStatus === "revision_requested") && (
              <Button
                size="sm"
                variant="outline"
                disabled={saving}
                onClick={() =>
                  handleUpdate({
                    permitStatus: "under_review",
                    denialReason: null,
                    reviewerNotes: null,
                  })
                }
              >
                <ChevronRight className="h-3.5 w-3.5 mr-1.5" />
                {saving ? "Saving..." : "Reset to Under Review"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### components/photo-markup-editor.tsx

```tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  Circle,
  Type,
  Undo2,
  Redo2,
  Trash2,
  Save,
  X,
  MousePointer2,
  MoveRight,
  Loader2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ToolMode = "select" | "draw" | "arrow" | "circle" | "text";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FabricModule = any;
type FabricCanvas = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface PhotoMarkupEditorProps {
  photoUrl: string;
  photoId: string;
  propertyId: string;
  treeId: string;
  onSave: (annotatedUrl: string) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

const COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#eab308" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
];

const LINE_WIDTHS = [2, 4, 6];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PhotoMarkupEditor({
  photoUrl,
  photoId,
  propertyId,
  treeId,
  onSave,
  onClose,
}: PhotoMarkupEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  // Store the dynamically-imported fabric module so mouse handlers can use it
  const fabricRef = useRef<FabricModule | null>(null);

  const [tool, setTool] = useState<ToolMode>("draw");
  const [color, setColor] = useState("#ef4444");
  const [lineWidth, setLineWidth] = useState(4);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Undo / redo stacks (JSON snapshots)
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Arrow drawing state
  const isDrawingArrow = useRef(false);
  const arrowStart = useRef<{ x: number; y: number } | null>(null);
  const tempArrowLine = useRef<FabricCanvas | null>(null);

  // Circle drawing state
  const isDrawingCircle = useRef(false);
  const circleStart = useRef<{ x: number; y: number } | null>(null);
  const tempCircle = useRef<FabricCanvas | null>(null);

  // Keep current tool/color/lineWidth in refs so event handlers stay up to date
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const lineWidthRef = useRef(lineWidth);
  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { lineWidthRef.current = lineWidth; }, [lineWidth]);

  // ------------------------------------------------------------------
  // Save canvas state snapshot for undo
  // ------------------------------------------------------------------
  const pushUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    undoStack.current.push(JSON.stringify(canvas.toJSON()));
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  // ------------------------------------------------------------------
  // Initialize Fabric canvas + attach mouse handlers (once)
  // ------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const fabricModule = await import("fabric");
      if (cancelled || !canvasRef.current) return;

      fabricRef.current = fabricModule;

      const canvas = new fabricModule.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 900,
        height: 600,
        selection: true,
      });

      fabricCanvasRef.current = canvas;

      // Load background image
      const img = await fabricModule.FabricImage.fromURL(photoUrl, {
        crossOrigin: "anonymous",
      });

      if (cancelled) return;

      // Scale image to fit canvas
      const scaleX = canvas.width! / (img.width || 1);
      const scaleY = canvas.height! / (img.height || 1);
      const scale = Math.min(scaleX, scaleY);

      img.set({
        scaleX: scale,
        scaleY: scale,
        originX: "left",
        originY: "top",
        left: (canvas.width! - (img.width || 1) * scale) / 2,
        top: (canvas.height! - (img.height || 1) * scale) / 2,
      });

      canvas.backgroundImage = img;
      canvas.renderAll();

      // Set up free drawing brush
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = "#ef4444";
        canvas.freeDrawingBrush.width = 4;
      }

      // Save initial state
      undoStack.current = [JSON.stringify(canvas.toJSON())];
      redoStack.current = [];
      setLoaded(true);

      // Listen for freehand path creation
      canvas.on("path:created", () => {
        pushUndo();
      });

      // ---- Mouse handlers for arrow / circle / text tools ----
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:down", (opt: any) => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);
        const t = toolRef.current;
        const c = colorRef.current;
        const lw = lineWidthRef.current;

        if (t === "arrow") {
          isDrawingArrow.current = true;
          arrowStart.current = { x: pointer.x, y: pointer.y };
          const line = new fb.Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            { stroke: c, strokeWidth: lw, selectable: false, evented: false }
          );
          canvas.add(line);
          tempArrowLine.current = line;
        }

        if (t === "circle") {
          isDrawingCircle.current = true;
          circleStart.current = { x: pointer.x, y: pointer.y };
          const ellipse = new fb.Ellipse({
            left: pointer.x,
            top: pointer.y,
            rx: 0,
            ry: 0,
            fill: "transparent",
            stroke: c,
            strokeWidth: lw,
            selectable: false,
            evented: false,
          });
          canvas.add(ellipse);
          tempCircle.current = ellipse;
        }

        if (t === "text") {
          const text = new fb.IText("Label", {
            left: pointer.x,
            top: pointer.y,
            fontSize: 20,
            fill: c,
            fontFamily: "Arial",
            fontWeight: "bold",
            editable: true,
            selectable: true,
            evented: true,
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          pushUndo();
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      canvas.on("mouse:move", (opt: any) => {
        if (!canvas) return;
        const pointer = canvas.getViewportPoint(opt.e);

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          tempArrowLine.current.set({ x2: pointer.x, y2: pointer.y });
          canvas.renderAll();
        }

        if (isDrawingCircle.current && tempCircle.current && circleStart.current) {
          const rx = Math.abs(pointer.x - circleStart.current.x) / 2;
          const ry = Math.abs(pointer.y - circleStart.current.y) / 2;
          const left = Math.min(pointer.x, circleStart.current.x);
          const top = Math.min(pointer.y, circleStart.current.y);
          tempCircle.current.set({ rx, ry, left, top });
          canvas.renderAll();
        }
      });

      canvas.on("mouse:up", () => {
        const fb = fabricRef.current;
        if (!fb || !canvas) return;
        const c = colorRef.current;

        if (isDrawingArrow.current && tempArrowLine.current && arrowStart.current) {
          const line = tempArrowLine.current;
          const x1 = line.x1!;
          const y1 = line.y1!;
          const x2 = line.x2!;
          const y2 = line.y2!;

          const angle = Math.atan2(y2 - y1, x2 - x1);
          const headLen = 15;

          const head = new fb.Polygon(
            [
              { x: x2, y: y2 },
              {
                x: x2 - headLen * Math.cos(angle - Math.PI / 6),
                y: y2 - headLen * Math.sin(angle - Math.PI / 6),
              },
              {
                x: x2 - headLen * Math.cos(angle + Math.PI / 6),
                y: y2 - headLen * Math.sin(angle + Math.PI / 6),
              },
            ],
            { fill: c, stroke: c, strokeWidth: 1, selectable: false, evented: false }
          );

          canvas.add(head);
          pushUndo();

          isDrawingArrow.current = false;
          arrowStart.current = null;
          tempArrowLine.current = null;
        }

        if (isDrawingCircle.current && tempCircle.current) {
          pushUndo();
          isDrawingCircle.current = false;
          circleStart.current = null;
          tempCircle.current = null;
        }
      });
    }

    init();

    return () => {
      cancelled = true;
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUrl]);

  // ------------------------------------------------------------------
  // Update brush when tool/color/lineWidth changes
  // ------------------------------------------------------------------
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (tool === "draw") {
      canvas.isDrawingMode = true;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = lineWidth;
      }
    } else {
      canvas.isDrawingMode = false;
    }

    if (tool === "select") {
      canvas.selection = true;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = true;
        obj.evented = true;
      });
    } else {
      canvas.selection = false;
      canvas.forEachObject((obj: FabricCanvas) => {
        obj.selectable = false;
        obj.evented = false;
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [tool, color, lineWidth]);

  // ------------------------------------------------------------------
  // Undo / Redo
  // ------------------------------------------------------------------
  const handleUndo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || undoStack.current.length <= 1) return;

    const current = undoStack.current.pop()!;
    redoStack.current.push(current);

    const prev = undoStack.current[undoStack.current.length - 1];
    canvas.loadFromJSON(prev).then(() => {
      canvas.renderAll();
      setCanUndo(undoStack.current.length > 1);
      setCanRedo(true);
    });
  }, []);

  const handleRedo = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    const next = redoStack.current.pop()!;
    undoStack.current.push(next);

    canvas.loadFromJSON(next).then(() => {
      canvas.renderAll();
      setCanUndo(true);
      setCanRedo(redoStack.current.length > 0);
    });
  }, []);

  // ------------------------------------------------------------------
  // Clear all annotations
  // ------------------------------------------------------------------
  const handleClearAll = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj: FabricCanvas) => canvas.remove(obj));
    canvas.renderAll();
    pushUndo();
  }, [pushUndo]);

  // ------------------------------------------------------------------
  // Save annotated image
  // ------------------------------------------------------------------
  const handleSave = useCallback(async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setSaving(true);
    try {
      canvas.discardActiveObject();
      canvas.renderAll();

      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 1,
      });

      // Convert data URL to blob
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();

      const formData = new FormData();
      formData.append("image", blob, "annotated.png");

      const res = await fetch(
        `/api/properties/${propertyId}/trees/${treeId}/photos/${photoId}/annotate`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to save annotation");

      const data = await res.json();
      onSave(data.url);
    } catch (err) {
      console.error("Save annotation failed:", err);
    } finally {
      setSaving(false);
    }
  }, [photoId, propertyId, treeId, onSave]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[960px] max-h-[95vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Photo Markup Editor</DialogTitle>

        <div className="flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 p-2 border-b bg-zinc-50 dark:bg-zinc-900 flex-wrap">
            {/* Tool buttons */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<MousePointer2 className="h-4 w-4" />}
                label="Select"
                active={tool === "select"}
                onClick={() => setTool("select")}
              />
              <ToolButton
                icon={<Pencil className="h-4 w-4" />}
                label="Draw"
                active={tool === "draw"}
                onClick={() => setTool("draw")}
              />
              <ToolButton
                icon={<MoveRight className="h-4 w-4" />}
                label="Arrow"
                active={tool === "arrow"}
                onClick={() => setTool("arrow")}
              />
              <ToolButton
                icon={<Circle className="h-4 w-4" />}
                label="Circle"
                active={tool === "circle"}
                onClick={() => setTool("circle")}
              />
              <ToolButton
                icon={<Type className="h-4 w-4" />}
                label="Text"
                active={tool === "text"}
                onClick={() => setTool("text")}
              />
            </div>

            {/* Color picker */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  className={`h-6 w-6 rounded-full border-2 transition-all ${
                    color === c.value
                      ? "border-blue-500 scale-110"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>

            {/* Line width */}
            <div className="flex items-center gap-1 border-r pr-2 mr-1">
              {LINE_WIDTHS.map((w) => (
                <button
                  key={w}
                  className={`flex items-center justify-center h-7 w-7 rounded transition-colors ${
                    lineWidth === w
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setLineWidth(w)}
                  title={`${w}px`}
                >
                  <div
                    className="rounded-full bg-current"
                    style={{ width: w + 2, height: w + 2 }}
                  />
                </button>
              ))}
            </div>

            {/* Undo / Redo / Clear */}
            <div className="flex items-center gap-0.5 border-r pr-2 mr-1">
              <ToolButton
                icon={<Undo2 className="h-4 w-4" />}
                label="Undo"
                active={false}
                onClick={handleUndo}
                disabled={!canUndo}
              />
              <ToolButton
                icon={<Redo2 className="h-4 w-4" />}
                label="Redo"
                active={false}
                onClick={handleRedo}
                disabled={!canRedo}
              />
              <ToolButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Clear All"
                active={false}
                onClick={handleClearAll}
              />
            </div>

            {/* Save / Cancel */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="bg-emerald-700 hover:bg-emerald-600"
              >
                <Save className="h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save Markup"}
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex items-center justify-center bg-zinc-800 p-2 overflow-auto">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 z-10">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
            <canvas ref={canvasRef} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Toolbar button helper
// ---------------------------------------------------------------------------

function ToolButton({
  icon,
  label,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center h-8 w-8 rounded transition-colors ${
        active
          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {icon}
    </button>
  );
}
```

### components/properties-list.tsx

```tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Plus,
  TreePine,
  ShieldCheck,
  ArrowRight,
  Search,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PropertyTree {
  id: string;
  isProtected: boolean;
  status: string;
}

interface PropertyReport {
  id: string;
  status: string;
}

interface PropertyItem {
  id: string;
  address: string;
  city: string;
  county: string;
  reportType: string;
  neededByDate: string | null;
  updatedAt: string;
  trees: PropertyTree[];
  reports: PropertyReport[];
}

interface PropertiesListProps {
  properties: PropertyItem[];
  initialFilter?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FilterStatus = "all" | "inProgress" | "draft" | "certified";
type SortKey = "recent" | "oldest" | "cityAZ" | "dueSoonest";

function getWorkflowStatus(property: PropertyItem) {
  const latestReport = property.reports[0];
  if (property.trees.length === 0)
    return { label: "No Trees", color: "bg-gray-100 text-gray-600" };
  if (!latestReport)
    return { label: "Assessing", color: "bg-amber-100 text-amber-700" };
  if (latestReport.status === "certified")
    return { label: "Certified", color: "bg-emerald-100 text-emerald-700" };
  return { label: "Draft", color: "bg-blue-100 text-blue-700" };
}

function getFilterCategory(property: PropertyItem): FilterStatus {
  const latestReport = property.reports[0];
  if (!latestReport) return "inProgress";
  if (latestReport.status === "certified") return "certified";
  return "draft";
}

function getDueIndicator(neededByDate: string | null) {
  if (!neededByDate) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(neededByDate);
  due.setHours(0, 0, 0, 0);
  const daysUntil = Math.ceil(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil < 0)
    return { label: "Overdue", className: "text-red-600 bg-red-50" };
  if (daysUntil === 0)
    return { label: "Due today", className: "text-amber-600 bg-amber-50" };
  if (daysUntil <= 7)
    return {
      label: `Due in ${daysUntil}d`,
      className: "text-amber-600 bg-amber-50",
    };
  return null;
}

function formatReportType(reportType: string) {
  return reportType
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const VALID_FILTERS: FilterStatus[] = ["all", "inProgress", "draft", "certified"];

export function PropertiesList({ properties, initialFilter }: PropertiesListProps) {
  const [filter, setFilter] = useState<FilterStatus>(
    VALID_FILTERS.includes(initialFilter as FilterStatus) ? (initialFilter as FilterStatus) : "all"
  );
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Derive unique cities and report types for filter dropdowns
  const uniqueCities = useMemo(() => {
    const cities = Array.from(new Set(properties.map((p) => p.city))).filter(Boolean).sort();
    return cities;
  }, [properties]);

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(properties.map((p) => p.reportType))).filter(Boolean).sort();
    return types;
  }, [properties]);

  // Counts
  const counts = useMemo(
    () => ({
      all: properties.length,
      inProgress: properties.filter((p) => getFilterCategory(p) === "inProgress")
        .length,
      draft: properties.filter((p) => getFilterCategory(p) === "draft").length,
      certified: properties.filter(
        (p) => getFilterCategory(p) === "certified"
      ).length,
    }),
    [properties]
  );

  // Filter + search + sort
  const filteredProperties = useMemo(() => {
    let result = properties;

    // Filter by status
    if (filter !== "all") {
      result = result.filter((p) => getFilterCategory(p) === filter);
    }

    // Filter by city
    if (cityFilter !== "all") {
      result = result.filter((p) => p.city === cityFilter);
    }

    // Filter by report type
    if (typeFilter !== "all") {
      result = result.filter((p) => p.reportType === typeFilter);
    }

    // Search by address or city
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortKey) {
        case "recent":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "cityAZ":
          return a.city.localeCompare(b.city);
        case "dueSoonest": {
          const aDue = a.neededByDate
            ? new Date(a.neededByDate).getTime()
            : Infinity;
          const bDue = b.neededByDate
            ? new Date(b.neededByDate).getTime()
            : Infinity;
          return aDue - bDue;
        }
        default:
          return 0;
      }
    });

    return result;
  }, [properties, filter, search, sortKey, cityFilter, typeFilter]);

  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "inProgress", label: `In Progress (${counts.inProgress})` },
    { key: "draft", label: `Draft (${counts.draft})` },
    { key: "certified", label: `Certified (${counts.certified})` },
  ];

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "recent", label: "Most Recent" },
    { key: "oldest", label: "Oldest First" },
    { key: "cityAZ", label: "City A-Z" },
    { key: "dueSoonest", label: "Due Date" },
  ];

  return (
    <>
      {/* Search + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by address or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 text-gray-700"
          >
            {sortOptions.find((s) => s.key === sortKey)?.label}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-lg z-10 py-1 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setShowSort(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50",
                    sortKey === opt.key
                      ? "text-emerald-700 font-medium"
                      : "text-gray-600"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* City & Type Filters */}
      {(uniqueCities.length > 1 || uniqueTypes.length > 1) && (
        <div className="flex flex-wrap gap-2">
          {uniqueCities.length > 1 && (
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-md border bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
          {uniqueTypes.length > 1 && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-md border bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Report Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{formatReportType(type)}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              filter === f.key
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Property List */}
      {filteredProperties.length === 0 ? (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-50 p-4 mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">
              {properties.length === 0
                ? "No properties yet"
                : "No properties match your search"}
            </p>
            {properties.length === 0 && (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  Add your first property to start pinning trees on the
                  satellite map and generating AI-assisted reports.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link href="/properties/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Property
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredProperties.map((property) => {
            const treeCount = property.trees.length;
            const protectedCount = property.trees.filter(
              (t) => t.isProtected
            ).length;
            const assessedCount = property.trees.filter(
              (t) => t.status !== "draft"
            ).length;
            const workflow = getWorkflowStatus(property);
            const dueIndicator = getDueIndicator(property.neededByDate);

            return (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="block"
              >
                <Card className="hover:border-emerald-300 transition-colors cursor-pointer">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="flex-shrink-0 hidden sm:block">
                          <div className="rounded-full bg-emerald-50 p-2">
                            <MapPin className="h-5 w-5 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                              {property.address}
                            </h3>
                            {property.address === "123 Sample Street" && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 text-muted-foreground border-muted-foreground/30 shrink-0"
                              >
                                Sample
                              </Badge>
                            )}
                            <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                              {formatReportType(property.reportType)}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0",
                                workflow.color
                              )}
                            >
                              {workflow.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="truncate">
                              {property.city}
                              {property.county
                                ? `, ${property.county} County`
                                : ""}
                            </span>
                            {dueIndicator && (
                              <span
                                className={cn(
                                  "text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0",
                                  dueIndicator.className
                                )}
                              >
                                {dueIndicator.label}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                        <div className="hidden sm:block text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <TreePine className="h-4 w-4 text-emerald-600" />
                            <span className="font-mono font-medium">
                              {treeCount}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {protectedCount > 0 && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600">
                                <ShieldCheck className="h-3 w-3" />
                                {protectedCount}
                              </span>
                            )}
                            {assessedCount > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {assessedCount}/{treeCount}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Mobile tree count */}
                        <span className="flex items-center gap-1 sm:hidden text-xs shrink-0">
                          <TreePine className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="font-mono">{treeCount}</span>
                        </span>

                        <span className="hidden md:inline-block text-xs text-muted-foreground">
                          {format(
                            new Date(property.updatedAt),
                            "MMM d, yyyy"
                          )}
                        </span>

                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
```

### components/property-audio-notes.tsx

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Loader2,
  Trash2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AudioNote {
  id: string;
  propertyId: string;
  filename: string;
  audioUrl: string;
  rawTranscription: string | null;
  cleanedTranscription: string | null;
  durationSeconds: number | null;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface PropertyAudioNotesProps {
  propertyId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ready":
      return "default";
    case "error":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "transcribing":
      return "Transcribing";
    case "cleaning":
      return "Cleaning up";
    case "ready":
      return "Ready";
    case "error":
      return "Error";
    default:
      return status;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyAudioNotes({ propertyId }: PropertyAudioNotesProps) {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isRecording,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useAudioRecorder();

  const basePath = `/api/properties/${propertyId}/audio`;

  // ---- Fetch audio notes ----
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setAudioNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch property audio notes:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---- Poll for pending transcriptions ----
  useEffect(() => {
    const pendingIds = audioNotes
      .filter((n) => n.status !== "ready" && n.status !== "error")
      .map((n) => n.id);

    if (pendingIds.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      for (const noteId of pendingIds) {
        try {
          const res = await fetch(`${basePath}/${noteId}`);
          if (res.ok) {
            const updated: AudioNote = await res.json();
            if (
              updated.status === "ready" ||
              updated.status === "error" ||
              updated.status !== audioNotes.find((n) => n.id === noteId)?.status
            ) {
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
            }
          }
        } catch {
          // ignore polling errors
        }
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [audioNotes, basePath]);

  // ---- Recording flow ----
  async function handleStopRecording() {
    try {
      const blob = await stopRecording();
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }

  function handleDiscardPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewBlob(null);
    setPreviewUrl(null);
  }

  async function handleUploadRecording() {
    if (!previewBlob) return;
    setUploading(true);

    try {
      const formData = new FormData();
      const ext = previewBlob.type.includes("mp4") ? ".m4a" : ".webm";
      formData.append("file", previewBlob, `site-note${ext}`);
      formData.append("durationSeconds", String(recordingDuration));

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setAudioNotes((prev) => [newNote, ...prev]);
        handleDiscardPreview();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  // ---- Delete ----
  async function handleDelete(noteId: string) {
    try {
      const res = await fetch(`${basePath}/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Retry transcription ----
  async function handleRetry(noteId: string) {
    setAudioNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, status: "transcribing", errorMessage: null }
          : n
      )
    );
    try {
      await fetch(`${basePath}/${noteId}/transcribe`, { method: "POST" });
    } catch (err) {
      console.error("Retry failed:", err);
    }
  }

  // ---- Update transcription ----
  async function handleTranscriptionEdit(noteId: string, text: string) {
    try {
      await fetch(`${basePath}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanedTranscription: text }),
      });
      setAudioNotes((prev) =>
        prev.map((n) =>
          n.id === noteId ? { ...n, cleanedTranscription: text } : n
        )
      );
    } catch (err) {
      console.error("Transcription edit failed:", err);
    }
  }

  // ---- Playback ----
  function togglePlay(noteId: string) {
    const audio = audioPlayerRefs.current.get(noteId);
    if (!audio) return;

    if (playingId === noteId) {
      audio.pause();
      setPlayingId(null);
    } else {
      if (playingId) {
        audioPlayerRefs.current.get(playingId)?.pause();
      }
      audio.play();
      setPlayingId(noteId);
    }
  }

  // ---- Render ----
  return (
    <div className="space-y-4">
      {/* Record Section */}
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
        {!isRecording && !previewUrl && !recorderError && (
          <>
            <button
              onClick={startRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition-all"
              title="Record site observation"
            >
              <Mic className="h-6 w-6" />
            </button>
            <p className="text-xs text-muted-foreground">
              Record site observations
            </p>
          </>
        )}

        {isRecording && (
          <>
            <button
              onClick={handleStopRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
              title="Stop recording"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
            <p className="text-sm font-mono font-semibold text-red-600">
              {formatDuration(recordingDuration)}
            </p>
            <p className="text-xs text-muted-foreground">Recording...</p>
          </>
        )}

        {previewUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <audio src={previewUrl} controls className="w-full h-10" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUploadRecording}
                disabled={uploading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload & Transcribe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardPreview}
                disabled={uploading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {recorderError && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-3 space-y-2">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {recorderError.toLowerCase().includes("permission")
                ? "Microphone access denied"
                : recorderError}
            </p>
            <p className="text-[11px] text-red-500/80 dark:text-red-400/70">
              {recorderError.toLowerCase().includes("permission")
                ? "Your browser blocked microphone access. Click the lock/site-settings icon in your address bar, allow microphone access, then try again."
                : "Make sure your device has a microphone connected and try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              onClick={startRecording}
            >
              <RotateCcw className="h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Audio Notes List */}
      {audioNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {audioNotes.length} site note{audioNotes.length !== 1 ? "s" : ""}
          </p>

          {audioNotes.map((note) => (
            <div key={note.id} className="rounded-lg border p-3 space-y-2">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(note.status)}>
                    {(note.status === "transcribing" ||
                      note.status === "cleaning" ||
                      note.status === "uploading") && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {statusLabel(note.status)}
                  </Badge>
                  {note.durationSeconds != null && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDuration(Math.round(note.durationSeconds))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {note.status === "error" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRetry(note.id)}
                      title="Retry transcription"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-700"
                    onClick={() => setDeleteConfirmId(note.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePlay(note.id)}
                >
                  {playingId === note.id ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <audio
                  ref={(el) => {
                    if (el) audioPlayerRefs.current.set(note.id, el);
                    else audioPlayerRefs.current.delete(note.id);
                  }}
                  src={note.audioUrl}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      playingId === note.id
                        ? "bg-emerald-500 animate-pulse w-1/2"
                        : "bg-muted-foreground/30 w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Transcription */}
              {note.status === "ready" && note.cleanedTranscription && (
                <Textarea
                  value={note.cleanedTranscription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAudioNotes((prev) =>
                      prev.map((n) =>
                        n.id === note.id
                          ? { ...n, cleanedTranscription: value }
                          : n
                      )
                    );
                  }}
                  onBlur={() =>
                    handleTranscriptionEdit(
                      note.id,
                      note.cleanedTranscription || ""
                    )
                  }
                  rows={3}
                  className="text-xs resize-none"
                />
              )}

              {(note.status === "transcribing" ||
                note.status === "cleaning") && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {note.status === "transcribing"
                      ? "Transcribing audio with Whisper..."
                      : "Cleaning up transcription with Claude..."}
                  </span>
                </div>
              )}

              {note.status === "error" && (
                <p className="text-xs text-red-500 p-2 rounded bg-red-50 dark:bg-red-950/30">
                  {note.errorMessage || "Transcription failed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Site Audio Note</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this site audio note and its
            transcription? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### components/property-map-view.tsx

```tsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { enqueueRequest, processQueue } from "@/lib/api-queue";
import { processPhotoQueue } from "@/lib/photo-queue";
import { useConnectivity } from "@/lib/connectivity";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TreeSidePanel, type TreeFormData } from "@/components/tree-side-panel";
import { TreeSummaryPanel } from "@/components/tree-summary-panel";
import type { TreePin, CircleOverlay } from "@/components/property-map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyAudioNotes } from "@/components/property-audio-notes";
import { getReportTypeConfig, calcTpzRadius, calcSrzRadius } from "@/lib/report-types";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/status-badge";
import {
  ChevronLeft,
  FileText,
  TreePine,
  Mic,
  ChevronDown,
  HardHat,
  Loader2,
  ClipboardList,
  Download,
  FileDown,
  Share2,
  Copy,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Dynamically import PropertyMap with SSR disabled (Mapbox GL needs window/DOM)
const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeData {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  pinLat: number;
  pinLng: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface PropertyData {
  id: string;
  address: string;
  city: string;
  lat: number | null;
  lng: number | null;
  reportType?: string;
  projectDescription?: string | null;
  permitNumber?: string | null;
  developerName?: string | null;
  architectName?: string | null;
  siteObservations?: string | null;
  scopeOfAssignment?: string | null;
  neededByDate?: string | null;
  trees: TreeData[];
  reports: { id: string; status: string; reportType: string; certifiedAt?: string | null }[];
}

interface PropertyMapViewProps {
  property: PropertyData;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isTreeComplete(tree: TreeData): boolean {
  return !!(
    tree.speciesCommon?.trim() &&
    tree.dbhInches && tree.dbhInches > 0 &&
    tree.conditionRating && tree.conditionRating > 0 &&
    (tree.healthNotes?.trim() || tree.structuralNotes?.trim())
  );
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_DOT_COLOR: Record<number, string> = {
  0: "bg-gray-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-500",
};

type FilterKey = "all" | "incomplete" | "protected" | "remove" | "retain";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMapView({ property }: PropertyMapViewProps) {
  const router = useRouter();
  const [trees, setTrees] = useState<TreeData[]>(property.trees ?? []);
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);
  const [pendingPin, setPendingPin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flyToId, setFlyToId] = useState<string | null>(null);
  const [audioOpen, setAudioOpen] = useState(false);

  // Quick-entry mode: auto-advance after save
  const [showPlacementPrompt, setShowPlacementPrompt] = useState(false);
  const [lastSavedNumber, setLastSavedNumber] = useState(0);

  // Quick Add mode — keep panel open after save, auto-create next pending pin
  const [quickAddMode, setQuickAddMode] = useState(false);
  const mapGetCenterRef = useRef<(() => { lat: number; lng: number }) | null>(null);

  // Copy from last tree
  const [lastSavedTree, setLastSavedTree] = useState<TreeData | null>(null);

  // Recent species tracking (last 3 unique species for quick-tap chips)
  const [recentSpecies, setRecentSpecies] = useState<
    { common: string; scientific: string }[]
  >([]);

  // Tree list panel (desktop only)
  const [showTreeList, setShowTreeList] = useState(true);

  // Filter chips
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Map legend
  const [showLegend, setShowLegend] = useState(false);

  // Share link
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [showSharePopover, setShowSharePopover] = useState(false);
  const [sharingLoading, setSharingLoading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Construction encroachment project fields
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectDescription, setProjectDescription] = useState(
    property.projectDescription ?? ""
  );
  const [permitNumber, setPermitNumber] = useState(
    property.permitNumber ?? ""
  );
  const [developerName, setDeveloperName] = useState(
    property.developerName ?? ""
  );
  const [architectName, setArchitectName] = useState(
    property.architectName ?? ""
  );
  const [savingProject, setSavingProject] = useState(false);

  // Site information fields
  const [siteInfoOpen, setSiteInfoOpen] = useState(false);
  const [scopeOfAssignment, setScopeOfAssignment] = useState(
    property.scopeOfAssignment ?? ""
  );
  const [siteObservations, setSiteObservations] = useState(
    property.siteObservations ?? ""
  );
  const [neededByDate, setNeededByDate] = useState(
    property.neededByDate ? property.neededByDate.split("T")[0] : ""
  );
  const [savingSiteInfo, setSavingSiteInfo] = useState(false);

  const reportType = property.reportType ?? "health_assessment";
  const reportTypeConfig = getReportTypeConfig(reportType);

  // ---- Connectivity + offline queue ----
  const { isOnline, setPendingCount } = useConnectivity();
  const { toast } = useToast();
  const prevOnlineRef = useRef(isOnline);

  // Process queued saves + photos when coming back online
  useEffect(() => {
    if (isOnline && !prevOnlineRef.current) {
      (async () => {
        const { succeeded, failed } = await processQueue(setPendingCount);
        const photoResult = await processPhotoQueue();
        const totalSucceeded = succeeded + photoResult.succeeded;
        const totalFailed = failed + photoResult.failed;

        if (totalSucceeded > 0) {
          toast({
            title: "All changes synced",
            description: `${totalSucceeded} change${totalSucceeded !== 1 ? "s" : ""} synced successfully.`,
          });
          router.refresh();
        }
        if (totalFailed > 0) {
          toast({
            title: "Some changes failed to sync",
            description: `${totalFailed} change${totalFailed !== 1 ? "s" : ""} could not be synced after multiple retries.`,
            variant: "destructive",
          });
        }
      })();
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline, setPendingCount, toast, router]);

  // ---- Derived ----
  const selectedTree = trees.find((t) => t.id === selectedTreeId) ?? null;

  const center = {
    lat: property.lat ?? 37.4419,
    lng: property.lng ?? -122.143,
  };

  // Progress counts
  const assessedCount = trees.filter((t) => isTreeComplete(t)).length;
  const protectedCount = trees.filter((t) => t.isProtected).length;

  // Filter logic: compute dimmed pin IDs
  const dimmedPinIds =
    activeFilter === "all"
      ? []
      : trees
          .filter((t) => {
            switch (activeFilter) {
              case "incomplete":
                return isTreeComplete(t);
              case "protected":
                return !t.isProtected;
              case "remove":
                return t.recommendedAction !== "remove";
              case "retain":
                return t.recommendedAction !== "retain";
              default:
                return false;
            }
          })
          .map((t) => t.id);

  // Convert trees to pins
  const pins: TreePin[] = trees.map((t) => ({
    id: t.id,
    treeNumber: t.treeNumber,
    lat: t.pinLat,
    lng: t.pinLng,
    status: (t.status ?? "draft") as TreePin["status"],
    speciesCommon: t.speciesCommon,
    dbhInches: t.dbhInches,
    conditionRating: t.conditionRating,
    healthNotes: t.healthNotes,
    structuralNotes: t.structuralNotes,
    recommendedAction: t.recommendedAction,
    isProtected: t.isProtected,
  }));

  // Add pending pin if exists
  if (pendingPin) {
    pins.push({
      id: "pending",
      treeNumber: trees.length + 1,
      lat: pendingPin.lat,
      lng: pendingPin.lng,
      status: "draft",
    });
  }

  // Filter chip definitions
  const filterChips: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: trees.length },
    { key: "incomplete", label: "Needs Data", count: trees.filter((t) => !isTreeComplete(t)).length },
    { key: "protected", label: "Protected", count: trees.filter((t) => t.isProtected).length },
    { key: "remove", label: "Remove", count: trees.filter((t) => t.recommendedAction === "remove").length },
    { key: "retain", label: "Retain", count: trees.filter((t) => t.recommendedAction === "retain").length },
  ];

  // ---- Handlers ----
  const handlePinAdd = useCallback(
    (lat: number, lng: number) => {
      setPendingPin({ lat, lng });
      setSelectedTreeId(null);
      setShowSidePanel(true);
      setShowPlacementPrompt(false);
    },
    []
  );

  const handlePinClick = useCallback(
    (id: string) => {
      if (id === "pending") return;
      setPendingPin(null);
      setSelectedTreeId(id);
      setShowSidePanel(true);
    },
    []
  );

  const handlePinMove = useCallback(
    async (id: string, lat: number, lng: number) => {
      if (id === "pending") {
        setPendingPin({ lat, lng });
        return;
      }

      // Optimistic update
      setTrees((prev) =>
        prev.map((t) => (t.id === id ? { ...t, pinLat: lat, pinLng: lng } : t))
      );

      try {
        const res = await fetch(`/api/trees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinLat: lat, pinLng: lng }),
        });
        if (!res.ok) throw new Error("Pin move failed");
      } catch {
        // Queue for offline sync
        enqueueRequest(
          {
            endpoint: `/api/trees/${id}`,
            method: "PUT",
            body: JSON.stringify({ pinLat: lat, pinLng: lng }),
            propertyId: property.id,
          },
          setPendingCount
        );
      }
    },
    [property.id, setPendingCount]
  );

  const handleSave = useCallback(
    async (data: TreeFormData) => {
      setSaving(true);
      try {
        if (pendingPin) {
          // Create new tree
          const res = await fetch(`/api/properties/${property.id}/trees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...data,
              pinLat: pendingPin.lat,
              pinLng: pendingPin.lng,
              treeNumber: trees.length + 1,
            }),
          });

          if (!res.ok) throw new Error("Failed to create tree");
          const newTree = await res.json();

          setTrees((prev) => [...prev, newTree]);
          setLastSavedTree(newTree);
          setLastSavedNumber(newTree.treeNumber);

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }

          if (quickAddMode) {
            // Quick Add: create new pending pin at map center, reset panel
            const mapCenter = mapGetCenterRef.current?.();
            const nextCenter = mapCenter ?? {
              lat: pendingPin.lat + 0.00002,
              lng: pendingPin.lng + 0.00002,
            };
            setPendingPin(nextCenter);
            setSelectedTreeId(null);
            // showSidePanel stays true — panel resets via new pendingPin
          } else {
            // Normal: close panel and show placement prompt
            setPendingPin(null);
            setSelectedTreeId(null);
            setShowSidePanel(false);
            setShowPlacementPrompt(true);
          }
        } else if (selectedTreeId) {
          // Update existing tree
          const res = await fetch(`/api/trees/${selectedTreeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!res.ok) throw new Error("Failed to update tree");
          const updatedTree = await res.json();

          setTrees((prev) =>
            prev.map((t) => (t.id === selectedTreeId ? updatedTree : t))
          );
          setLastSavedTree(updatedTree);

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }
        }
      } catch (err) {
        console.error("Save failed:", err);

        // ---- OFFLINE FALLBACK: Queue the request + optimistic update ----
        if (pendingPin) {
          const body = {
            ...data,
            pinLat: pendingPin.lat,
            pinLng: pendingPin.lng,
            treeNumber: trees.length + 1,
          };
          const treeLocalId = `offline_${Date.now()}`;
          enqueueRequest(
            {
              endpoint: `/api/properties/${property.id}/trees`,
              method: "POST",
              body: JSON.stringify(body),
              treeLocalId,
              propertyId: property.id,
            },
            setPendingCount
          );

          // Optimistic local state update with temp ID
          const tempTree: TreeData = {
            id: treeLocalId,
            treeNumber: trees.length + 1,
            pinLat: pendingPin.lat,
            pinLng: pendingPin.lng,
            speciesCommon: data.speciesCommon,
            speciesScientific: data.speciesScientific,
            dbhInches: data.dbhInches,
            heightFt: data.heightFt,
            canopySpreadFt: data.canopySpreadFt,
            conditionRating: data.conditionRating,
            healthNotes: data.healthNotes,
            structuralNotes: data.structuralNotes,
            recommendedAction: data.recommendedAction,
            isProtected: data.isProtected,
            protectionReason: data.protectionReason,
            mitigationRequired: data.mitigationRequired,
            status: "draft",
            typeSpecificData: data.typeSpecificData,
          };
          setTrees((prev) => [...prev, tempTree]);
          setLastSavedTree(tempTree);
          setLastSavedNumber(tempTree.treeNumber);

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }

          // Preserve Quick Add flow
          if (quickAddMode) {
            const mapCenter = mapGetCenterRef.current?.();
            const nextCenter = mapCenter ?? {
              lat: pendingPin.lat + 0.00002,
              lng: pendingPin.lng + 0.00002,
            };
            setPendingPin(nextCenter);
            setSelectedTreeId(null);
          } else {
            setPendingPin(null);
            setSelectedTreeId(null);
            setShowSidePanel(false);
            setShowPlacementPrompt(true);
          }
        } else if (selectedTreeId) {
          enqueueRequest(
            {
              endpoint: `/api/trees/${selectedTreeId}`,
              method: "PUT",
              body: JSON.stringify(data),
              propertyId: property.id,
            },
            setPendingCount
          );

          // Optimistic local state update
          setTrees((prev) =>
            prev.map((t) =>
              t.id === selectedTreeId
                ? {
                    ...t,
                    ...data,
                    typeSpecificData: data.typeSpecificData ?? t.typeSpecificData,
                  }
                : t
            )
          );
          setLastSavedTree(
            trees.find((t) => t.id === selectedTreeId)
              ? { ...trees.find((t) => t.id === selectedTreeId)!, ...data }
              : null
          );

          // Track recent species
          if (data.speciesCommon?.trim()) {
            setRecentSpecies((prev) => {
              const filtered = prev.filter(
                (s) => s.common !== data.speciesCommon
              );
              return [
                { common: data.speciesCommon, scientific: data.speciesScientific },
                ...filtered,
              ].slice(0, 3);
            });
          }
        }

        toast({
          title: "Saved offline",
          description: "Your changes will sync when you're back online.",
        });
      } finally {
        setSaving(false);
      }
    },
    [pendingPin, selectedTreeId, property.id, trees, trees.length, quickAddMode, setPendingCount, toast]
  );

  const handleDelete = useCallback(async () => {
    if (!selectedTreeId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/trees/${selectedTreeId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete tree");

      setTrees((prev) => prev.filter((t) => t.id !== selectedTreeId));
      setSelectedTreeId(null);
      setShowSidePanel(false);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSaving(false);
    }
  }, [selectedTreeId]);

  const handleClosePanel = useCallback(() => {
    setShowSidePanel(false);
    setSelectedTreeId(null);
    setPendingPin(null);
  }, []);

  const handleMapReady = useCallback(
    (helpers: { getCenter: () => { lat: number; lng: number } }) => {
      mapGetCenterRef.current = helpers.getCenter;
    },
    []
  );

  const handleSelectTreeFromSummary = useCallback((id: string) => {
    setPendingPin(null);
    setSelectedTreeId(id);
    setShowSidePanel(true);
    setFlyToId(id);
  }, []);

  const handleSelectTreeFromList = useCallback((id: string) => {
    setPendingPin(null);
    setSelectedTreeId(id);
    setShowSidePanel(true);
    setFlyToId(id);
  }, []);

  const handleSaveProject = useCallback(async () => {
    setSavingProject(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectDescription.trim() || null,
          permitNumber: permitNumber.trim() || null,
          developerName: developerName.trim() || null,
          architectName: architectName.trim() || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save project info:", err);
    } finally {
      setSavingProject(false);
    }
  }, [property.id, projectDescription, permitNumber, developerName, architectName]);

  const handleSaveSiteInfo = useCallback(async () => {
    setSavingSiteInfo(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scopeOfAssignment: scopeOfAssignment.trim() || null,
          siteObservations: siteObservations.trim() || null,
          neededByDate: neededByDate || null,
        }),
      });
    } catch (err) {
      console.error("Failed to save site info:", err);
    } finally {
      setSavingSiteInfo(false);
    }
  }, [property.id, scopeOfAssignment, siteObservations, neededByDate]);

  const handleDuplicate = useCallback(async () => {
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: "(New Property)",
          city: property.city,
          county: "",
          reportType,
          scopeOfAssignment: property.scopeOfAssignment || undefined,
        }),
      });
      if (res.ok) {
        const newProperty = await res.json();
        router.push(`/properties/${newProperty.id}`);
      }
    } catch (err) {
      console.error("Failed to duplicate:", err);
    }
  }, [property.city, property.scopeOfAssignment, reportType, router]);

  const handleShare = useCallback(async () => {
    setSharingLoading(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/share`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setShareToken(data.shareToken);
        setShowSharePopover(true);
      }
    } catch (err) {
      console.error("Failed to create share link:", err);
    } finally {
      setSharingLoading(false);
    }
  }, [property.id]);

  const handleRevokeShare = useCallback(async () => {
    setSharingLoading(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/share`, {
        method: "DELETE",
      });
      if (res.ok) {
        setShareToken(null);
        setShowSharePopover(false);
        setShareCopied(false);
      }
    } catch (err) {
      console.error("Failed to revoke share link:", err);
    } finally {
      setSharingLoading(false);
    }
  }, [property.id]);

  const handleCopyShareLink = useCallback(() => {
    if (!shareToken) return;
    const url = `${window.location.origin}/share/${shareToken}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }, [shareToken]);

  // ---- Current side panel data ----
  const sidePanelTree = pendingPin
    ? { pinLat: pendingPin.lat, pinLng: pendingPin.lng }
    : selectedTree;
  const sidePanelTreeNumber = pendingPin
    ? trees.length + 1
    : selectedTree?.treeNumber ?? 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/properties" className="shrink-0">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold truncate">
                {property.address}
              </h1>
              {reportTypeConfig && (
                <Badge variant="outline" className="text-xs shrink-0 hidden sm:inline-flex">
                  {reportTypeConfig.label}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">{property.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Add toggle */}
          <div className="flex items-center gap-1.5">
            <label
              htmlFor="quick-add-toggle"
              className={`flex items-center gap-1 text-xs cursor-pointer select-none ${
                quickAddMode ? "text-amber-700 font-medium" : "text-muted-foreground"
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${quickAddMode ? "text-amber-500" : ""}`} />
              <span className="hidden sm:inline">Quick Add</span>
            </label>
            <Switch
              id="quick-add-toggle"
              checked={quickAddMode}
              onCheckedChange={setQuickAddMode}
              className="scale-75"
            />
          </div>
          <Badge variant="secondary" className="gap-1">
            <TreePine className="h-3 w-3" />
            {trees.length} tree{trees.length !== 1 ? "s" : ""}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            title="Duplicate property setup"
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            <span className="hidden sm:inline">Duplicate</span>
          </Button>
          {trees.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a");
                a.href = `/api/properties/${property.id}/trees/export`;
                a.download = "";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              title="Export tree inventory as CSV"
            >
              <FileDown className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          )}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              disabled={sharingLoading}
              title="Share property map"
            >
              {sharingLoading ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
              )}
              <span className="hidden sm:inline">Share</span>
            </Button>
            {showSharePopover && shareToken && (
              <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-lg border shadow-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Share Link</h3>
                  <button
                    onClick={() => {
                      setShowSharePopover(false);
                      setShareCopied(false);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareToken}`}
                    className="flex-1 text-xs bg-gray-50 border rounded px-2 py-1.5 text-gray-700 select-all"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyShareLink}
                    className="shrink-0"
                  >
                    {shareCopied ? (
                      <span className="text-emerald-600 text-xs">Copied!</span>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view the property map and tree inventory.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRevokeShare}
                  disabled={sharingLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                >
                  {sharingLoading ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  ) : (
                    "Revoke Link"
                  )}
                </Button>
              </div>
            )}
          </div>
          {property.reports && property.reports.length > 0 ? (
            <div className="flex items-center gap-2">
              <StatusBadge status={property.reports[0].status} />
              <Link href={`/properties/${property.id}/report`}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">
                    {property.reports[0].status === "certified"
                      ? "View Report"
                      : "Edit Report"}
                  </span>
                </Button>
              </Link>
              {property.reports[0].status === "certified" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = `/api/reports/${property.reports[0].id}/pdf`;
                      a.download = "";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = `/api/reports/${property.reports[0].id}/word`;
                      a.download = "";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                  >
                    <FileDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const pdfUrl = `/api/reports/${property.reports[0].id}/pdf`;
                      if (navigator.share) {
                        try {
                          const res = await fetch(pdfUrl);
                          const blob = await res.blob();
                          const file = new File(
                            [blob],
                            `report-${property.reports[0].id}.pdf`,
                            { type: "application/pdf" }
                          );
                          await navigator.share({
                            title: `Tree Report — ${property.address}`,
                            files: [file],
                          });
                        } catch {
                          // User cancelled or share failed
                        }
                      } else {
                        const a = document.createElement("a");
                        a.href = pdfUrl;
                        a.download = "";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }
                    }}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Link href={`/properties/${property.id}/report`}>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Generate Report
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Sample property banner */}
      {property.address === "123 Sample Street" && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
          This is a sample property to help you explore TreeCertify. Feel free to generate a report, try the certification flow, or delete it when you&apos;re ready.
        </div>
      )}

      {/* Construction Encroachment: Project Info Card */}
      {reportType === "construction_encroachment" && (
        <Card>
          <CardHeader
            className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setProjectOpen((v) => !v)}
          >
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <HardHat className="h-4 w-4 text-blue-600" />
              Project Information
              <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    projectOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </CardTitle>
          </CardHeader>
          {projectOpen && (
            <CardContent className="pt-0 px-3 md:px-6 space-y-3">
              <div>
                <Label htmlFor="mv-proj-desc" className="text-xs">
                  Project Description
                </Label>
                <Input
                  id="mv-proj-desc"
                  placeholder="New addition, foundation work, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="mv-permit" className="text-xs">
                    Permit Number
                  </Label>
                  <Input
                    id="mv-permit"
                    placeholder="BP-2024-001234"
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mv-developer" className="text-xs">
                    Developer / Contractor
                  </Label>
                  <Input
                    id="mv-developer"
                    placeholder="ABC Construction"
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Label htmlFor="mv-architect" className="text-xs">
                    Architect
                  </Label>
                  <Input
                    id="mv-architect"
                    placeholder="Jane Smith, AIA"
                    value={architectName}
                    onChange={(e) => setArchitectName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleSaveProject}
                  disabled={savingProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {savingProject ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Site Information */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setSiteInfoOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <ClipboardList className="h-4 w-4 text-violet-600" />
            Site Information
            <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  siteInfoOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </CardTitle>
        </CardHeader>
        {siteInfoOpen && (
          <CardContent className="pt-0 px-3 md:px-6 space-y-3">
            <div>
              <Label htmlFor="mv-needed-by" className="text-xs">
                Needed By
              </Label>
              <Input
                id="mv-needed-by"
                type="date"
                value={neededByDate}
                onChange={(e) => setNeededByDate(e.target.value)}
                className="mt-1 w-48"
              />
            </div>
            <div>
              <Label htmlFor="mv-scope" className="text-xs">
                Scope of Assignment
              </Label>
              <Textarea
                id="mv-scope"
                placeholder="Describe the scope and purpose of this assessment..."
                value={scopeOfAssignment}
                onChange={(e) => setScopeOfAssignment(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="mv-site-obs" className="text-xs">
                Site Observations
              </Label>
              <Textarea
                id="mv-site-obs"
                placeholder="Describe site conditions, terrain, surrounding land use..."
                value={siteObservations}
                onChange={(e) => setSiteObservations(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSaveSiteInfo}
                disabled={savingSiteInfo}
                className="bg-violet-600 hover:bg-violet-700 text-white"
              >
                {savingSiteInfo ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Site Audio Notes */}
      <Card>
        <CardHeader
          className="pb-2 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setAudioOpen((v) => !v)}
        >
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Mic className="h-4 w-4 text-emerald-600" />
            Site Audio Notes
            <span className="ml-auto flex items-center justify-center h-11 w-11 -mr-3">
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  audioOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </CardTitle>
        </CardHeader>
        {audioOpen && (
          <CardContent className="pt-0 px-3 md:px-6">
            <PropertyAudioNotes propertyId={property.id} />
          </CardContent>
        )}
      </Card>

      {/* Protected Trees Permit Warning Banner */}
      {trees.some((t) => t.isProtected) && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 px-4 py-3">
          <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Protected trees on this property may require permits before work
            begins. Check individual tree details for permit requirements.
          </p>
        </div>
      )}

      {/* Filter Chips */}
      {trees.length > 0 && (
        <div className="flex items-center gap-1.5 px-1 overflow-x-auto">
          {filterChips
            .filter((f) => f.key === "all" || f.count > 0)
            .map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
        </div>
      )}

      {/* Main Area: Tree List + Map + Side Panel */}
      <div className="flex gap-0 rounded-xl border overflow-hidden relative">
        {/* Quick-entry placement prompt */}
        {showPlacementPrompt && !selectedTreeId && !pendingPin && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span>&#10003; Tree #{lastSavedNumber} saved</span>
            <span className="text-emerald-200">&middot;</span>
            <span>Tap map to place Tree #{lastSavedNumber + 1}</span>
            <button
              onClick={() => setShowPlacementPrompt(false)}
              className="ml-1 text-emerald-200 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Tree List Panel — desktop only */}
        {showTreeList && trees.length > 0 && (
          <div className="hidden md:flex flex-col w-60 border-r bg-white overflow-hidden flex-shrink-0">
            <div className="p-3 border-b flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trees ({trees.length})
              </h3>
              <button
                onClick={() => setShowTreeList(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y overflow-y-auto flex-1">
              {[...trees]
                .sort((a, b) => a.treeNumber - b.treeNumber)
                .map((tree) => {
                  const isDimmed = dimmedPinIds.includes(tree.id);
                  return (
                    <button
                      key={tree.id}
                      onClick={() => handleSelectTreeFromList(tree.id)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        selectedTreeId === tree.id
                          ? "bg-emerald-50 border-l-2 border-emerald-600"
                          : ""
                      } ${isDimmed ? "opacity-40" : ""}`}
                    >
                      <span className="font-mono font-semibold text-muted-foreground w-6">
                        #{tree.treeNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">
                          {tree.speciesCommon || "Unidentified"}
                        </p>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          {tree.dbhInches ? (
                            <span>{tree.dbhInches}&quot;</span>
                          ) : null}
                          {tree.conditionRating != null && tree.conditionRating > 0 ? (
                            <span className="flex items-center gap-0.5">
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full ${
                                  CONDITION_DOT_COLOR[tree.conditionRating] ?? "bg-gray-400"
                                }`}
                              />
                              {CONDITION_LABELS[tree.conditionRating]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {tree.isProtected && (
                        <ShieldCheck className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* Map area — with relative positioning for overlays */}
        <div className="w-full md:flex-1 relative" style={{ minHeight: 400 }}>
          {/* Tree list toggle button (when list is hidden) */}
          {!showTreeList && trees.length > 0 && (
            <button
              onClick={() => setShowTreeList(true)}
              className="hidden md:flex absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground items-center gap-1"
            >
              <PanelLeftOpen className="h-3.5 w-3.5" />
              Trees
            </button>
          )}

          {/* Tree count progress badge */}
          {trees.length > 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-full shadow-md border px-3 py-1.5 text-xs font-medium flex items-center gap-2">
              <TreePine className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {trees.length} tree{trees.length !== 1 ? "s" : ""}
              </span>
              <span className="text-muted-foreground">&middot;</span>
              <span className="text-emerald-600">{assessedCount} assessed</span>
              {protectedCount > 0 && (
                <>
                  <span className="text-muted-foreground">&middot;</span>
                  <span className="text-emerald-600">
                    {protectedCount} protected
                  </span>
                </>
              )}
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-10">
            {showLegend ? (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border p-2.5 text-[10px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">
                    Legend
                  </span>
                  <button
                    onClick={() => setShowLegend(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white shadow-sm" />
                    <span>Excellent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#84cc16] border-2 border-white shadow-sm" />
                    <span>Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#eab308] border-2 border-white shadow-sm" />
                    <span>Fair</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f97316] border-2 border-white shadow-sm" />
                    <span>Poor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] border-2 border-white shadow-sm" />
                    <span>Dead / Critical / Remove</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#9ca3af] border-2 border-white shadow-sm" />
                    <span>Unassessed</span>
                  </div>
                  <div className="border-t pt-1 mt-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white outline outline-2 outline-[#22c55e]"
                        style={{ outlineOffset: "1px" }}
                      />
                      <span>Protected</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white outline outline-2 outline-[#eab308]"
                        style={{ outlineOffset: "1px" }}
                      />
                      <span>Heritage</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLegend(true)}
                className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground"
              >
                Legend
              </button>
            )}
          </div>

          <PropertyMap
            center={center}
            pins={pins}
            dimmedPinIds={dimmedPinIds}
            onMapReady={handleMapReady}
            circles={
              reportType === "construction_encroachment"
                ? trees
                    .filter((t) => t.pinLat && t.pinLng && t.dbhInches > 0)
                    .map(
                      (t): CircleOverlay => ({
                        id: t.id,
                        lat: t.pinLat,
                        lng: t.pinLng,
                        tpzRadiusFt: calcTpzRadius(t.dbhInches),
                        srzRadiusFt: calcSrzRadius(t.dbhInches),
                      })
                    )
                : undefined
            }
            onPinAdd={handlePinAdd}
            onPinClick={handlePinClick}
            onPinMove={handlePinMove}
            selectedPinId={pendingPin ? "pending" : selectedTreeId}
            flyToId={flyToId}
            interactive
            className="h-full w-full"
          />
        </div>

        {/* Side Panel — bottom sheet on mobile, right panel on desktop */}
        {showSidePanel && (
          <TreeSidePanel
            tree={sidePanelTree}
            treeNumber={sidePanelTreeNumber}
            totalTrees={trees.length}
            propertyId={property.id}
            propertyCity={property.city}
            reportType={reportType}
            onSave={handleSave}
            onDelete={
              selectedTree ? handleDelete : undefined
            }
            onClose={handleClosePanel}
            saving={saving}
            lastSavedTree={lastSavedTree}
            recentSpecies={recentSpecies}
            quickAddMode={quickAddMode}
          />
        )}
      </div>

      {/* Summary Panel */}
      <TreeSummaryPanel
        trees={trees}
        selectedTreeId={selectedTreeId}
        onSelectTree={handleSelectTreeFromSummary}
        reportType={reportType}
      />
    </div>
  );
}
```

### components/property-map.tsx

```tsx
"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreePin {
  id: string;
  treeNumber: number;
  lat: number;
  lng: number;
  status: "draft" | "assessed" | "certified";
  speciesCommon?: string;
  dbhInches?: number;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  isProtected?: boolean;
  isHeritage?: boolean;
}

export interface CircleOverlay {
  id: string;
  lat: number;
  lng: number;
  tpzRadiusFt: number;
  srzRadiusFt: number;
}

interface PropertyMapProps {
  center: { lat: number; lng: number };
  pins: TreePin[];
  circles?: CircleOverlay[];
  dimmedPinIds?: string[];
  onPinAdd?: (lat: number, lng: number) => void;
  onPinMove?: (id: string, lat: number, lng: number) => void;
  onPinClick?: (id: string) => void;
  selectedPinId?: string | null;
  flyToId?: string | null;
  interactive?: boolean;
  className?: string;
  onMapReady?: (helpers: { getCenter: () => { lat: number; lng: number }; fitAllTrees: () => void }) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const MAP_STYLES = [
  { id: "satellite-streets-v12", label: "Satellite" },
  { id: "streets-v12", label: "Streets" },
  { id: "outdoors-v12", label: "Outdoors" },
];

/** Color by condition rating + recommended action */
function pinColor(pin: TreePin): string {
  // Trees marked for removal are always red
  if (pin.recommendedAction === "remove") return "#ef4444"; // red

  // Color by condition rating
  if (pin.conditionRating != null) {
    if (pin.conditionRating <= 1) return "#ef4444"; // red (Dead / Critical)
    if (pin.conditionRating === 2) return "#f97316"; // orange (Poor)
    if (pin.conditionRating === 3) return "#eab308"; // yellow (Fair)
    if (pin.conditionRating === 4) return "#84cc16"; // lime (Good)
    if (pin.conditionRating >= 5) return "#22c55e"; // green (Excellent)
  }

  return "#9ca3af"; // gray — unassessed
}

function createMarkerElement(
  pin: TreePin,
  isSelected: boolean,
  isDimmed: boolean
): HTMLDivElement {
  const pinSize = isSelected ? 26 : 22;

  // Wrapper provides a 36px tap target while keeping visible pin small
  const wrapper = document.createElement("div");
  wrapper.style.width = "36px";
  wrapper.style.height = "36px";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.cursor = "pointer";
  wrapper.style.position = "relative";
  wrapper.style.overflow = "visible";

  const el = document.createElement("div");
  el.style.width = `${pinSize}px`;
  el.style.height = `${pinSize}px`;
  el.style.lineHeight = `${pinSize}px`;
  el.style.textAlign = "center";
  el.style.borderRadius = "50%";
  el.style.color = "white";
  el.style.fontWeight = "600";
  el.style.fontSize = "10px";
  el.style.cursor = "pointer";
  el.style.userSelect = "none";
  el.style.backgroundColor = pinColor(pin);
  el.style.border = "2px solid white";
  el.style.transition = "box-shadow 0.15s, opacity 0.2s";

  // Dimming for filtered pins
  if (isDimmed) {
    el.style.opacity = "0.3";
  }

  // Protection / heritage ring via outline
  if (pin.isHeritage) {
    el.style.outline = "2px solid #eab308";
    el.style.outlineOffset = "1px";
  } else if (pin.isProtected) {
    el.style.outline = "2px solid #22c55e";
    el.style.outlineOffset = "1px";
  }

  if (isSelected) {
    el.style.boxShadow =
      "0 0 0 3px rgba(22, 163, 74, 0.4), 0 2px 4px rgba(0,0,0,0.3)";
  } else {
    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
  }

  el.textContent = String(pin.treeNumber);
  wrapper.appendChild(el);

  // ---- Tooltip ----
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.bottom = "100%";
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%) translateY(-6px)";
  tooltip.style.whiteSpace = "nowrap";
  tooltip.style.padding = "4px 8px";
  tooltip.style.borderRadius = "6px";
  tooltip.style.backgroundColor = "rgba(0,0,0,0.85)";
  tooltip.style.color = "white";
  tooltip.style.fontSize = "11px";
  tooltip.style.fontWeight = "500";
  tooltip.style.pointerEvents = "none";
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity 0.15s";
  tooltip.style.zIndex = "10";
  tooltip.style.lineHeight = "1.3";

  // Build tooltip content
  const species = pin.speciesCommon || "Unidentified";
  const dbh = pin.dbhInches ? `${pin.dbhInches}"` : "";
  const condition =
    pin.conditionRating != null && pin.conditionRating >= 0
      ? CONDITION_LABELS[pin.conditionRating] ?? ""
      : "";
  const parts = [species, dbh, condition].filter(Boolean);
  tooltip.textContent = `#${pin.treeNumber} — ${parts.join(" \u00b7 ")}`;

  wrapper.appendChild(tooltip);

  // Hover effect — shadow + tooltip
  wrapper.addEventListener("mouseenter", () => {
    if (!isSelected) {
      el.style.boxShadow =
        "0 0 0 2px rgba(22, 163, 74, 0.3), 0 2px 4px rgba(0,0,0,0.3)";
      tooltip.style.opacity = "1";
    }
  });
  wrapper.addEventListener("mouseleave", () => {
    if (!isSelected) {
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
    }
    tooltip.style.opacity = "0";
  });

  return wrapper;
}

/** Generate a GeoJSON circle polygon (no turf dependency). */
function createCirclePolygon(
  center: [number, number], // [lng, lat]
  radiusFeet: number,
  points = 64
): GeoJSON.Polygon {
  const radiusMeters = radiusFeet * 0.3048;
  const coords: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const lat = center[1] + dy / 111320;
    const lng =
      center[0] + dx / (111320 * Math.cos((center[1] * Math.PI) / 180));
    coords.push([lng, lat]);
  }
  return { type: "Polygon", coordinates: [coords] };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PropertyMap({
  center,
  pins,
  circles,
  dimmedPinIds,
  onPinAdd,
  onPinMove,
  onPinClick,
  selectedPinId,
  flyToId,
  interactive = true,
  className,
  onMapReady,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const markerClickedRef = useRef(false);
  const circleSourceIdsRef = useRef<string[]>([]);
  const initialFitDoneRef = useRef(false);
  const [activeStyle, setActiveStyle] = useState("satellite-streets-v12");

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const handleStyleChange = useCallback((styleId: string) => {
    setActiveStyle(styleId);
    const map = mapRef.current;
    if (map) {
      map.setStyle(`mapbox://styles/mapbox/${styleId}`);
    }
  }, []);

  // ---- Cleanup helper ----
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }, []);

  // ---- Initialize map ----
  useEffect(() => {
    if (!token || !mapContainerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [center.lng, center.lat],
      zoom: 19,
      maxZoom: 22,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Hide cluttering map labels for cleaner satellite view (fires on initial load + style changes)
    map.on("style.load", () => {
      const layersToHide = [
        "poi-label",
        "transit-label",
        "natural-point-label",
        "waterway-label",
      ];
      layersToHide.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", "none");
        }
      });
    });

    mapRef.current = map;

    // Expose helpers to parent
    if (onMapReady) {
      onMapReady({
        getCenter: () => {
          const c = map.getCenter();
          return { lat: c.lat, lng: c.lng };
        },
        fitAllTrees: () => {
          if (pins.length < 2) return;
          const bounds = new mapboxgl.LngLatBounds();
          pins.forEach((p) => bounds.extend([p.lng, p.lat]));
          map.fitBounds(bounds, { padding: 50, maxZoom: 20, duration: 800 });
        },
      });
    }

    return () => {
      clearMarkers();
      map.remove();
      mapRef.current = null;
    };
    // Only re-init if center changes substantially or token changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ---- Map click -> add pin ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !interactive || !onPinAdd) return;

    function handleMapClick(e: mapboxgl.MapMouseEvent) {
      // Skip if a marker was just clicked
      if (markerClickedRef.current) {
        markerClickedRef.current = false;
        return;
      }
      onPinAdd!(e.lngLat.lat, e.lngLat.lng);
    }

    map.on("click", handleMapClick);
    return () => {
      map.off("click", handleMapClick);
    };
  }, [interactive, onPinAdd]);

  // ---- Sync markers with pins ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    clearMarkers();

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId;
      const isDimmed = dimmedPinIds?.includes(pin.id) ?? false;
      const el = createMarkerElement(pin, isSelected, isDimmed);

      // Prevent map click when clicking marker
      el.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
      });

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        markerClickedRef.current = true;
        onPinClick?.(pin.id);
      });

      const marker = new mapboxgl.Marker({
        element: el,
        draggable: interactive,
        anchor: 'center',
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);

      if (interactive && onPinMove) {
        marker.on("dragend", () => {
          const lngLat = marker.getLngLat();
          onPinMove(pin.id, lngLat.lat, lngLat.lng);
        });
      }

      markersRef.current.push(marker);
    });

    // Auto zoom-to-fit all pins on initial render
    if (pins.length >= 2 && !initialFitDoneRef.current) {
      initialFitDoneRef.current = true;
      const bounds = new mapboxgl.LngLatBounds();
      pins.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 20, duration: 800 });
    }
  }, [pins, selectedPinId, dimmedPinIds, interactive, onPinClick, onPinMove, clearMarkers]);

  // ---- flyTo support ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToId) return;

    const pin = pins.find((p) => p.id === flyToId);
    if (pin) {
      map.flyTo({ center: [pin.lng, pin.lat], zoom: 20, duration: 800 });
    }
  }, [flyToId, pins]);

  // ---- Sync circle overlays (TPZ/SRZ) ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    function syncCircles() {
      // Remove old circle layers/sources
      for (const sourceId of circleSourceIdsRef.current) {
        if (map!.getLayer(`${sourceId}-tpz-fill`))
          map!.removeLayer(`${sourceId}-tpz-fill`);
        if (map!.getLayer(`${sourceId}-tpz-line`))
          map!.removeLayer(`${sourceId}-tpz-line`);
        if (map!.getLayer(`${sourceId}-srz-fill`))
          map!.removeLayer(`${sourceId}-srz-fill`);
        if (map!.getLayer(`${sourceId}-srz-line`))
          map!.removeLayer(`${sourceId}-srz-line`);
        if (map!.getSource(sourceId)) map!.removeSource(sourceId);
      }
      circleSourceIdsRef.current = [];

      if (!circles || circles.length === 0) return;

      // Build a combined FeatureCollection for TPZ and SRZ
      const tpzFeatures: GeoJSON.Feature[] = [];
      const srzFeatures: GeoJSON.Feature[] = [];

      for (const c of circles) {
        if (c.tpzRadiusFt > 0) {
          tpzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "TPZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.tpzRadiusFt),
          });
        }
        if (c.srzRadiusFt > 0) {
          srzFeatures.push({
            type: "Feature",
            properties: { id: c.id, zone: "SRZ" },
            geometry: createCirclePolygon([c.lng, c.lat], c.srzRadiusFt),
          });
        }
      }

      // TPZ source + layers
      if (tpzFeatures.length > 0) {
        const tpzSourceId = "tpz-circles";
        map!.addSource(tpzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: tpzFeatures },
        });
        map!.addLayer({
          id: `${tpzSourceId}-fill`,
          type: "fill",
          source: tpzSourceId,
          paint: {
            "fill-color": "#f97316", // orange
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${tpzSourceId}-line`,
          type: "line",
          source: tpzSourceId,
          paint: {
            "line-color": "#f97316",
            "line-width": 2,
            "line-dasharray": [4, 2],
          },
        });
        circleSourceIdsRef.current.push(tpzSourceId);
      }

      // SRZ source + layers
      if (srzFeatures.length > 0) {
        const srzSourceId = "srz-circles";
        map!.addSource(srzSourceId, {
          type: "geojson",
          data: { type: "FeatureCollection", features: srzFeatures },
        });
        map!.addLayer({
          id: `${srzSourceId}-fill`,
          type: "fill",
          source: srzSourceId,
          paint: {
            "fill-color": "#ef4444", // red
            "fill-opacity": 0.1,
          },
        });
        map!.addLayer({
          id: `${srzSourceId}-line`,
          type: "line",
          source: srzSourceId,
          paint: {
            "line-color": "#ef4444",
            "line-width": 2,
          },
        });
        circleSourceIdsRef.current.push(srzSourceId);
      }
    }

    // Sync on initial load and every style change (so circles survive base layer switches)
    map.on("style.load", syncCircles);
    if (map.isStyleLoaded()) {
      syncCircles();
    }
    return () => {
      map.off("style.load", syncCircles);
    };
  }, [circles]);

  // ---- No token placeholder ----
  if (!token) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center text-sm text-muted-foreground ${className ?? ""}`}
      >
        <p>
          Set <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> in{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">.env</code> to enable the satellite map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={mapContainerRef}
        className={`rounded-xl overflow-hidden ${className ?? ""}`}
        style={{ minHeight: 400 }}
      />
      {/* Map Style Toggle */}
      <div className="absolute top-2 right-12 z-10 flex bg-white/90 backdrop-blur-sm rounded-lg shadow-md border overflow-hidden">
        {MAP_STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleStyleChange(s.id)}
            className={`px-2.5 py-1.5 text-[10px] font-medium transition-colors ${
              activeStyle === s.id
                ? "bg-gray-800 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {/* Legend for circle overlays */}
      {circles && circles.length > 0 && (
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-md">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-orange-500" />
            <span className="text-gray-700">TPZ (Tree Protection Zone)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-red-500" />
            <span className="text-gray-700">SRZ (Structural Root Zone)</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

### components/report-preview.tsx

```tsx
"use client";

import { renderMarkdownToHtml } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeRecord {
  id: string;
  treeNumber: number;
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  conditionRating: number;
  isProtected: boolean;
  recommendedAction: string;
}

interface PropertyInfo {
  address: string;
  city: string;
  county: string;
  state?: string;
  zip?: string;
  parcelNumber: string | null;
}

interface ArboristInfo {
  name: string;
  companyName: string | null;
  isaCertificationNum: string;
  companyLogoUrl?: string | null;
  companyAddress?: string | null;
  companyPhone?: string | null;
  companyEmail?: string | null;
  companyWebsite?: string | null;
}

interface ReportPreviewProps {
  content: string;
  property: PropertyInfo;
  trees: TreeRecord[];
  arborist?: ArboristInfo | null;
  reportType: string;
  certifiedAt?: string | null;
  eSignatureText?: string | null;
}

// ---------------------------------------------------------------------------
// Report type display names
// ---------------------------------------------------------------------------

const REPORT_TYPE_LABELS: Record<string, string> = {
  removal_permit: "Tree Removal Permit Application",
  construction_encroachment: "Construction Impact Report",
  health_assessment: "Tree Health Assessment",
  tree_valuation: "Tree Valuation Report",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReportPreview({
  content,
  property,
  trees,
  arborist,
  reportType,
  certifiedAt,
  eSignatureText,
}: ReportPreviewProps) {
  const reportHtml = renderMarkdownToHtml(content);
  const reportLabel =
    REPORT_TYPE_LABELS[reportType] ||
    reportType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const protectedCount = trees.filter((t) => t.isProtected).length;

  return (
    <div className="report-preview-container bg-white dark:bg-zinc-950 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* ---- Styles scoped to .report-preview ---- */}
      <style>{`
        .report-preview {
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a1a;
          font-size: 11pt;
          line-height: 1.6;
          padding: 48px 56px;
          max-width: 8.5in;
          margin: 0 auto;
        }
        .dark .report-preview {
          color: #e4e4e7;
        }
        .report-preview h1,
        .report-preview h2,
        .report-preview h3 {
          color: #2d5016;
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .dark .report-preview h1,
        .dark .report-preview h2,
        .dark .report-preview h3 {
          color: #6fcf3b;
        }
        .report-preview h1 { font-size: 18pt; }
        .report-preview h2 { font-size: 14pt; }
        .report-preview h3 { font-size: 12pt; }
        .report-preview p {
          margin: 8px 0;
        }
        .report-preview ul, .report-preview ol {
          margin: 8px 0;
          padding-left: 24px;
        }
        .report-preview li {
          margin: 4px 0;
        }
        .report-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 9pt;
        }
        .report-preview table th {
          background: #2d5016;
          color: white;
          padding: 6px 8px;
          text-align: left;
          font-weight: bold;
        }
        .dark .report-preview table th {
          background: #1a3a0a;
        }
        .report-preview table td {
          padding: 5px 8px;
          border: 1px solid #ddd;
        }
        .dark .report-preview table td {
          border-color: #3f3f46;
        }
        .report-preview table tr:nth-child(even) {
          background: #f9f9f6;
        }
        .dark .report-preview table tr:nth-child(even) {
          background: #18181b;
        }
        .report-preview hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 24px 0;
        }
        .dark .report-preview hr {
          border-color: #3f3f46;
        }
        .report-preview strong {
          font-weight: 700;
        }
        .report-preview em {
          font-style: italic;
        }
      `}</style>

      <div className="report-preview">
        {/* ---- Company Branding Header ---- */}
        {arborist?.companyLogoUrl && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={arborist.companyLogoUrl}
                alt="Company logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                {arborist.companyName && (
                  <p className="font-bold text-[12pt]">
                    {arborist.companyName}
                  </p>
                )}
                {arborist.companyAddress && (
                  <p className="text-[9pt] text-zinc-500 dark:text-zinc-400">
                    {arborist.companyAddress}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right text-[9pt] text-zinc-500 dark:text-zinc-400">
              {arborist.companyPhone && <p>{arborist.companyPhone}</p>}
              {arborist.companyEmail && <p>{arborist.companyEmail}</p>}
              {arborist.companyWebsite && <p>{arborist.companyWebsite}</p>}
            </div>
          </div>
        )}

        {/* ---- Header ---- */}
        <div className="text-center border-b-[3px] border-double border-[#2d5016] dark:border-[#6fcf3b] pb-5 mb-8">
          <h1 className="text-[18pt] tracking-[2px] uppercase !mt-0 !mb-1">
            Arborist Report
          </h1>
          <h2 className="!text-zinc-700 dark:!text-zinc-300 font-normal !mt-0 !mb-2">
            {property.address}
          </h2>
          <p className="text-[10pt] text-zinc-500 dark:text-zinc-400">
            {property.city}
            {property.state ? `, ${property.state}` : ", CA"}
            {property.county ? ` \u2014 ${property.county} County` : ""}
          </p>
        </div>

        {/* ---- Report Type Badge ---- */}
        <div className="text-center mb-6">
          <Badge
            variant="outline"
            className="text-[10pt] px-4 py-1.5 border-[#2d5016] text-[#2d5016] dark:border-[#6fcf3b] dark:text-[#6fcf3b]"
          >
            {reportLabel}
          </Badge>
        </div>

        {/* ---- Meta Table ---- */}
        <table className="!text-[10pt]" style={{ marginBottom: 24 }}>
          <tbody>
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold w-[28%]">
                Report Type
              </td>
              <td>{reportLabel}</td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold w-[18%]">
                Date
              </td>
              <td>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            {arborist && (
              <tr>
                <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                  Arborist
                </td>
                <td>{arborist.name}</td>
                <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                  ISA #
                </td>
                <td>{arborist.isaCertificationNum}</td>
              </tr>
            )}
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                Property
              </td>
              <td>{property.address}</td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                APN
              </td>
              <td>{property.parcelNumber || "N/A"}</td>
            </tr>
            <tr>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                City
              </td>
              <td>
                {property.city}
                {property.state ? `, ${property.state}` : ", CA"}
                {property.zip ? ` ${property.zip}` : ""}
              </td>
              <td className="!bg-zinc-100 dark:!bg-zinc-800 !font-bold">
                Trees
              </td>
              <td>
                {trees.length} assessed &middot; {protectedCount} protected
              </td>
            </tr>
          </tbody>
        </table>

        {/* ---- Tree Inventory Table ---- */}
        {trees.length > 0 && (
          <>
            <h2 className="!text-[13pt]">Tree Inventory</h2>
            <table>
              <thead>
                <tr>
                  <th className="text-center">Tree&nbsp;#</th>
                  <th>Species</th>
                  <th className="text-center">DBH</th>
                  <th className="text-center">Height</th>
                  <th className="text-center">Condition</th>
                  <th className="text-center">Protected</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree) => (
                  <tr key={tree.id}>
                    <td className="text-center font-bold">{tree.treeNumber}</td>
                    <td>
                      {tree.speciesCommon || "Unidentified"}
                      {tree.speciesScientific && (
                        <em className="text-zinc-500 dark:text-zinc-400 ml-1">
                          ({tree.speciesScientific})
                        </em>
                      )}
                    </td>
                    <td className="text-center">{tree.dbhInches}&Prime;</td>
                    <td className="text-center">
                      {tree.heightFt ? `${tree.heightFt}'` : "N/A"}
                    </td>
                    <td className="text-center">{tree.conditionRating}/5</td>
                    <td className="text-center">
                      {tree.isProtected ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Yes
                        </span>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td>{tree.recommendedAction || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ---- Report Content (rendered markdown) ---- */}
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: reportHtml }}
        />

        {/* ---- Certification Box ---- */}
        {certifiedAt && eSignatureText && (
          <div className="mt-10 border-2 border-[#2d5016] dark:border-[#6fcf3b] rounded-lg p-5 bg-[#f8faf5] dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-[#2d5016] dark:text-[#6fcf3b] mb-3">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="!mt-0 !mb-0 text-[12pt]">
                Arborist Certification
              </h3>
            </div>
            <p className="text-[10pt]">
              I, the undersigned, certify that I have personally inspected the
              tree(s) described in this report and that the information contained
              herein is accurate to the best of my professional knowledge and
              belief.
            </p>
            <div className="mt-4 space-y-1 text-[10pt]">
              <p>
                <strong>Electronically signed:</strong> {eSignatureText}
              </p>
              {arborist && (
                <p>
                  <strong>ISA Certification #:</strong>{" "}
                  {arborist.isaCertificationNum}
                </p>
              )}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(certifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### components/sidebar.tsx

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TreePine,
  LayoutDashboard,
  MapPin,
  BookOpen,
  Plus,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useConnectivity } from "@/lib/connectivity";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Properties",
    href: "/properties",
    icon: MapPin,
  },
  {
    label: "Ordinances",
    href: "/ordinances",
    icon: BookOpen,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  arboristName: string;
  isaCertNum: string;
  profilePhotoUrl?: string;
}

export function Sidebar({ arboristName, isaCertNum, profilePhotoUrl }: SidebarProps) {
  const pathname = usePathname();
  const { isOnline, pendingCount } = useConnectivity();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 w-64 flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-[hsl(var(--sidebar-muted))] px-6">
        <TreePine className="h-7 w-7 text-emerald-400" />
        <div>
          <h1 className="text-lg font-bold tracking-tight">TreeCertify</h1>
          <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))]/60">
            Arborist OS
          </p>
        </div>
      </div>

      {/* Quick action */}
      <div className="px-4 py-4">
        <Link
          href="/properties/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" />
          New Property
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-white"
                  : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-muted))] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-[hsl(var(--sidebar-muted))] p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {profilePhotoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profilePhotoUrl}
                alt={arboristName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sidebar-muted))]">
                <User className="h-5 w-5" />
              </div>
            )}
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[hsl(var(--sidebar))]",
                isOnline ? "bg-emerald-500" : "bg-red-500 animate-pulse"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{arboristName}</p>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))]/50 truncate">
              ISA {isaCertNum}
            </p>
            {pendingCount > 0 && (
              <p className="text-[10px] text-orange-400 font-medium">
                {pendingCount} pending
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
```

### components/smart-dictation.tsx

```tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { MicOff, Loader2, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParsedFields {
  speciesCommon?: string;
  speciesScientific?: string;
  dbhInches?: number;
  heightFt?: number;
  canopySpreadFt?: number;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  tagNumber?: string;
}

interface SmartDictationProps {
  onApply: (fields: ParsedFields) => void;
}

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const FIELD_LABELS: Record<string, string> = {
  speciesCommon: "Species (Common)",
  speciesScientific: "Species (Scientific)",
  dbhInches: "DBH (inches)",
  heightFt: "Height (ft)",
  canopySpreadFt: "Canopy Spread (ft)",
  conditionRating: "Condition",
  healthNotes: "Health Notes",
  structuralNotes: "Structural Notes",
  recommendedAction: "Recommended Action",
  tagNumber: "Tag Number",
};

export function SmartDictation({ onApply }: SmartDictationProps) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [parsed, setParsed] = useState<ParsedFields | null>(null);
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      setError("");
      setParsed(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Determine supported MIME type
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : MediaRecorder.isTypeSupported("audio/mp4")
            ? "audio/mp4"
            : "";

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });
        await processAudio(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError("Microphone access denied");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, []);

  async function processAudio(blob: Blob) {
    setProcessing(true);
    try {
      // Step 1: Transcribe
      setProcessingStep("Transcribing...");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const transcribeRes = await fetch("/api/audio/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!transcribeRes.ok) throw new Error("Transcription failed");
      const { text } = await transcribeRes.json();
      if (!text?.trim()) throw new Error("No speech detected");

      setRawText(text);

      // Step 2: Parse with Claude
      setProcessingStep("Extracting fields...");
      const parseRes = await fetch("/api/audio/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!parseRes.ok) throw new Error("Parsing failed");
      const { parsed: fields } = await parseRes.json();

      setParsed(fields);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Processing failed";
      setError(message);
    } finally {
      setProcessing(false);
      setProcessingStep("");
    }
  }

  function formatValue(key: string, value: unknown): string {
    if (key === "conditionRating" && typeof value === "number")
      return `${value} — ${CONDITION_LABELS[value] || "Unknown"}`;
    if (key === "recommendedAction" && typeof value === "string")
      return value.charAt(0).toUpperCase() + value.slice(1);
    return String(value);
  }

  function handleApply() {
    if (parsed) {
      onApply(parsed);
      setParsed(null);
      setRawText("");
    }
  }

  function handleDismiss() {
    setParsed(null);
    setRawText("");
    setError("");
  }

  // Render the confirmation card if we have parsed data
  // Otherwise render just the mic button
  return (
    <div>
      {/* Mic button */}
      {!parsed && !processing && (
        <Button
          type="button"
          variant={recording ? "destructive" : "outline"}
          size="sm"
          onClick={recording ? stopRecording : startRecording}
          className={recording ? "animate-pulse" : ""}
        >
          {recording ? (
            <>
              <MicOff className="h-3.5 w-3.5 mr-1" />
              Stop
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Smart Dictate
            </>
          )}
        </Button>
      )}

      {/* Processing indicator */}
      {processing && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {processingStep}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 mt-1 flex items-center gap-1">
          <X className="h-3.5 w-3.5" />
          {error}
          <button
            onClick={() => setError("")}
            className="underline ml-1 text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Confirmation card */}
      {parsed && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Extracted from voice
            </p>
          </div>

          {rawText && (
            <p className="text-xs text-muted-foreground italic">
              &ldquo;{rawText}&rdquo;
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {Object.entries(parsed).map(([key, value]) => {
              if (value === undefined || value === null || value === "")
                return null;
              return (
                <div key={key} className="contents">
                  <span className="text-xs text-muted-foreground">
                    {FIELD_LABELS[key] || key}
                  </span>
                  <span className="text-xs font-medium text-gray-900">
                    {formatValue(key, value)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleApply}
              className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Apply Fields
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-7 text-xs"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### components/species-search.tsx

```tsx
"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PENINSULA_SPECIES, type TreeSpecies } from "@/lib/species";

// ---------------------------------------------------------------------------
// Common species shortcuts — one-tap selection for the 15 most frequent species
// ---------------------------------------------------------------------------

const COMMON_SPECIES = [
  { common: "Coast Live Oak", scientific: "Quercus agrifolia" },
  { common: "Valley Oak", scientific: "Quercus lobata" },
  { common: "Blue Oak", scientific: "Quercus douglasii" },
  { common: "California Black Oak", scientific: "Quercus kelloggii" },
  { common: "Coast Redwood", scientific: "Sequoia sempervirens" },
  { common: "Monterey Pine", scientific: "Pinus radiata" },
  { common: "Blue Gum Eucalyptus", scientific: "Eucalyptus globulus" },
  { common: "Red Ironbark", scientific: "Eucalyptus sideroxylon" },
  { common: "Japanese Maple", scientific: "Acer palmatum" },
  { common: "London Plane", scientific: "Platanus × acerifolia" },
  { common: "Western Sycamore", scientific: "Platanus racemosa" },
  { common: "Deodar Cedar", scientific: "Cedrus deodara" },
  { common: "Italian Stone Pine", scientific: "Pinus pinea" },
  { common: "Southern Magnolia", scientific: "Magnolia grandiflora" },
  { common: "Chinese Elm", scientific: "Ulmus parvifolia" },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SpeciesSearchProps {
  value: string;
  onChange: (common: string, scientific: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SpeciesSearch({ value, onChange, className }: SpeciesSearchProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Reset search when popover closes
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  // Split species into native and non-native groups
  const natives = PENINSULA_SPECIES.filter((s) => s.category === "native");
  const nonnatives = PENINSULA_SPECIES.filter((s) => s.category === "nonnative");

  function handleSelect(species: TreeSpecies) {
    onChange(species.common, species.scientific);
    setOpen(false);
  }

  function handleCommonSelect(sp: { common: string; scientific: string }) {
    onChange(sp.common, sp.scientific);
    setOpen(false);
  }

  function handleCustomEntry() {
    if (search.trim()) {
      onChange(search.trim(), "");
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">
            {value || "Search species..."}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command
          filter={(itemValue, searchQuery) => {
            // cmdk filter: match against both common + scientific names
            const q = searchQuery.toLowerCase();
            if (!q) return 1;
            const species = PENINSULA_SPECIES.find(
              (s) => s.common === itemValue
            );
            if (!species) return 0;
            const common = species.common.toLowerCase();
            const scientific = species.scientific.toLowerCase();
            if (common.includes(q) || scientific.includes(q)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder="Search by common or scientific name..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-2">
                <p className="text-muted-foreground text-xs">No species found</p>
                {search.trim() && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomEntry}
                    className="gap-1.5"
                  >
                    <TreePine className="h-3.5 w-3.5" />
                    Use &ldquo;{search.trim()}&rdquo; as custom species
                  </Button>
                )}
              </div>
            </CommandEmpty>

            {/* Common species shortcuts — shown when search is empty */}
            {!search && (
              <div className="p-2 border-b">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Common Species
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SPECIES.map((sp) => (
                    <button
                      key={sp.scientific}
                      onClick={() => handleCommonSelect(sp)}
                      className={cn(
                        "text-xs px-2.5 py-1.5 rounded-full transition-colors border",
                        value === sp.common
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                      )}
                    >
                      {sp.common}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <CommandGroup heading="Native Species">
              {natives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="default"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Non-native Species">
              {nonnatives.map((species) => (
                <CommandItem
                  key={species.scientific}
                  value={species.common}
                  keywords={[species.scientific]}
                  onSelect={() => handleSelect(species)}
                >
                  <Check
                    className={cn(
                      "mr-1.5 h-3.5 w-3.5 shrink-0",
                      value === species.common ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{species.common}</span>
                    <span className="ml-1.5 text-muted-foreground italic text-xs">
                      ({species.scientific})
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="ml-2 shrink-0 text-[10px] px-1.5 py-0"
                  >
                    non-native
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

### components/status-badge.tsx

```tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  ai_generated: {
    label: "AI Generated",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  arborist_reviewed: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  review: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  certified: {
    label: "Certified",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  filed: {
    label: "Filed",
    className: "bg-teal-50 text-teal-700 border-teal-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-500 border-gray-200",
  },
  assessed: {
    label: "Assessed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
```

### components/tree-audio-notes.tsx

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import {
  Mic,
  Square,
  Play,
  Pause,
  Loader2,
  Trash2,
  RotateCcw,
  Upload,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AudioNote {
  id: string;
  treeRecordId: string;
  filename: string;
  audioUrl: string;
  rawTranscription: string | null;
  cleanedTranscription: string | null;
  durationSeconds: number | null;
  status: string;
  errorMessage: string | null;
  createdAt: string;
}

interface TreeAudioNotesProps {
  propertyId: string;
  treeId: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function statusBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "ready":
      return "default";
    case "error":
      return "destructive";
    default:
      return "secondary";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "uploading":
      return "Uploading";
    case "transcribing":
      return "Transcribing";
    case "cleaning":
      return "Cleaning up";
    case "ready":
      return "Ready";
    case "error":
      return "Error";
    default:
      return status;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeAudioNotes({ propertyId, treeId }: TreeAudioNotesProps) {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayerRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    isRecording,
    duration: recordingDuration,
    startRecording,
    stopRecording,
    error: recorderError,
  } = useAudioRecorder();

  const basePath = `/api/properties/${propertyId}/trees/${treeId}/audio`;

  // ---- Fetch audio notes ----
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setAudioNotes(data);
      }
    } catch (err) {
      console.error("Failed to fetch audio notes:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ---- Poll for pending transcriptions ----
  useEffect(() => {
    const pendingIds = audioNotes
      .filter((n) => n.status !== "ready" && n.status !== "error")
      .map((n) => n.id);

    if (pendingIds.length === 0) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    if (pollingRef.current) return; // already polling

    pollingRef.current = setInterval(async () => {
      let changed = false;
      for (const noteId of pendingIds) {
        try {
          const res = await fetch(`${basePath}/${noteId}`);
          if (res.ok) {
            const updated: AudioNote = await res.json();
            if (updated.status === "ready" || updated.status === "error") {
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
              changed = true;
            } else if (updated.status !== audioNotes.find(n => n.id === noteId)?.status) {
              // Status changed but not final — still update
              setAudioNotes((prev) =>
                prev.map((n) => (n.id === noteId ? updated : n))
              );
            }
          }
        } catch {
          // ignore polling errors
        }
      }
      if (changed) {
        // Re-check if we still need to poll
        // The effect will re-run and clear the interval if no more pending
      }
    }, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [audioNotes, basePath]);

  // ---- Recording flow ----
  async function handleStopRecording() {
    try {
      const blob = await stopRecording();
      setPreviewBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }

  function handleDiscardPreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewBlob(null);
    setPreviewUrl(null);
  }

  async function handleUploadRecording() {
    if (!previewBlob) return;
    setUploading(true);

    try {
      const formData = new FormData();
      // Determine extension from blob type
      const ext = previewBlob.type.includes("mp4") ? ".m4a" : ".webm";
      formData.append("file", previewBlob, `recording${ext}`);
      formData.append("durationSeconds", String(recordingDuration));

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newNote = await res.json();
        setAudioNotes((prev) => [newNote, ...prev]);
        handleDiscardPreview();
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  // ---- Delete ----
  async function handleDelete(noteId: string) {
    try {
      const res = await fetch(`${basePath}/${noteId}`, { method: "DELETE" });
      if (res.ok) {
        setAudioNotes((prev) => prev.filter((n) => n.id !== noteId));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Retry transcription ----
  async function handleRetry(noteId: string) {
    setAudioNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, status: "transcribing", errorMessage: null } : n
      )
    );
    try {
      await fetch(`${basePath}/${noteId}/transcribe`, { method: "POST" });
    } catch (err) {
      console.error("Retry failed:", err);
    }
  }

  // ---- Update transcription ----
  async function handleTranscriptionEdit(noteId: string, text: string) {
    try {
      await fetch(`${basePath}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cleanedTranscription: text }),
      });
      setAudioNotes((prev) =>
        prev.map((n) =>
          n.id === noteId ? { ...n, cleanedTranscription: text } : n
        )
      );
    } catch (err) {
      console.error("Transcription edit failed:", err);
    }
  }

  // ---- Playback ----
  function togglePlay(noteId: string) {
    const audio = audioPlayerRefs.current.get(noteId);
    if (!audio) return;

    if (playingId === noteId) {
      audio.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing
      if (playingId) {
        audioPlayerRefs.current.get(playingId)?.pause();
      }
      audio.play();
      setPlayingId(noteId);
    }
  }

  // ---- Render ----
  return (
    <div className="space-y-4">
      {/* Record Section */}
      <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4">
        {!isRecording && !previewUrl && !recorderError && (
          <>
            <button
              onClick={startRecording}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:scale-95 transition-all"
              title="Start recording"
            >
              <Mic className="h-7 w-7" />
            </button>
            <p className="text-xs text-muted-foreground">
              Tap to record a voice note
            </p>
          </>
        )}

        {isRecording && (
          <>
            <button
              onClick={handleStopRecording}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse"
              title="Stop recording"
            >
              <Square className="h-6 w-6 fill-current" />
            </button>
            <p className="text-sm font-mono font-semibold text-red-600">
              {formatDuration(recordingDuration)}
            </p>
            <p className="text-xs text-muted-foreground">Recording...</p>
          </>
        )}

        {previewUrl && (
          <div className="flex flex-col items-center gap-3 w-full">
            <audio src={previewUrl} controls className="w-full h-10" />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUploadRecording}
                disabled={uploading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    Upload & Transcribe
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscardPreview}
                disabled={uploading}
              >
                <XCircle className="h-3.5 w-3.5" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {recorderError && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-3 space-y-2">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {recorderError.toLowerCase().includes("permission")
                ? "Microphone access denied"
                : recorderError}
            </p>
            <p className="text-[11px] text-red-500/80 dark:text-red-400/70">
              {recorderError.toLowerCase().includes("permission")
                ? "Your browser blocked microphone access. Click the lock/site-settings icon in your address bar, allow microphone access, then try again."
                : "Make sure your device has a microphone connected and try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              onClick={startRecording}
            >
              <RotateCcw className="h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </div>

      {/* Audio Notes List */}
      {audioNotes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {audioNotes.length} recording{audioNotes.length !== 1 ? "s" : ""}
          </p>

          {audioNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border p-3 space-y-2"
            >
              {/* Header row: status + duration + actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={statusBadgeVariant(note.status)}>
                    {(note.status === "transcribing" ||
                      note.status === "cleaning" ||
                      note.status === "uploading") && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {statusLabel(note.status)}
                  </Badge>
                  {note.durationSeconds != null && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDuration(Math.round(note.durationSeconds))}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {note.status === "error" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRetry(note.id)}
                      title="Retry transcription"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-700"
                    onClick={() => setDeleteConfirmId(note.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePlay(note.id)}
                >
                  {playingId === note.id ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                </Button>
                <audio
                  ref={(el) => {
                    if (el) audioPlayerRefs.current.set(note.id, el);
                    else audioPlayerRefs.current.delete(note.id);
                  }}
                  src={note.audioUrl}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      playingId === note.id
                        ? "bg-emerald-500 animate-pulse w-1/2"
                        : "bg-muted-foreground/30 w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Transcription */}
              {note.status === "ready" && note.cleanedTranscription && (
                <Textarea
                  value={note.cleanedTranscription}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAudioNotes((prev) =>
                      prev.map((n) =>
                        n.id === note.id
                          ? { ...n, cleanedTranscription: value }
                          : n
                      )
                    );
                  }}
                  onBlur={() =>
                    handleTranscriptionEdit(
                      note.id,
                      note.cleanedTranscription || ""
                    )
                  }
                  rows={3}
                  className="text-xs resize-none"
                />
              )}

              {(note.status === "transcribing" ||
                note.status === "cleaning") && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {note.status === "transcribing"
                      ? "Transcribing audio with Whisper..."
                      : "Cleaning up transcription with Claude..."}
                  </span>
                </div>
              )}

              {note.status === "error" && (
                <p className="text-xs text-red-500 p-2 rounded bg-red-50 dark:bg-red-950/30">
                  {note.errorMessage || "Transcription failed"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Audio Note</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this audio note and its
            transcription? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### components/tree-photos.tsx

```tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ImageIcon,
  Trash2,
  Pencil,
  RotateCcw,
  Clock,
  CheckCircle2,
  Circle,
  Tag,
} from "lucide-react";
import {
  enqueuePhoto,
  getQueuedPhotosForTree,
  type QueuedPhoto,
} from "@/lib/photo-queue";
import { useToast } from "@/hooks/use-toast";
import {
  getCategoriesForReportType,
  autoCaptionFromCategory,
  type PhotoCategory,
} from "@/lib/photo-categories";

// Dynamically import markup editor (Fabric.js needs window/DOM)
const PhotoMarkupEditor = dynamic(
  () =>
    import("@/components/photo-markup-editor").then(
      (mod) => mod.PhotoMarkupEditor
    ),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreePhoto {
  id: string;
  treeRecordId: string;
  filename: string;
  url: string;
  caption: string | null;
  sortOrder: number;
  createdAt: string;
  isAnnotated?: boolean;
  originalUrl?: string | null;
  category?: string | null;
  exifLat?: number | null;
  exifLng?: number | null;
  exifTakenAt?: string | null;
}

interface TreePhotosProps {
  propertyId: string;
  treeId: string;
  reportType?: string;
  treeNumber?: number;
  speciesCommon?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreePhotos({
  propertyId,
  treeId,
  reportType,
  treeNumber,
  speciesCommon,
}: TreePhotosProps) {
  const [photos, setPhotos] = useState<TreePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [markupPhotoId, setMarkupPhotoId] = useState<string | null>(null);
  const [lightboxViewOriginal, setLightboxViewOriginal] = useState(false);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Category picker state — shows after file selection
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null);
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);

  // Offline photo queue
  const [queuedPhotos, setQueuedPhotos] = useState<QueuedPhoto[]>([]);

  const basePath = `/api/properties/${propertyId}/trees/${treeId}/photos`;

  // Photo categories for this report type
  const categories: PhotoCategory[] = useMemo(
    () => (reportType ? getCategoriesForReportType(reportType) : []),
    [reportType]
  );

  // ---- Fetch photos ----
  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch(basePath);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Failed to fetch photos:", err);
    }
  }, [basePath]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Load queued (offline) photos for this tree
  useEffect(() => {
    getQueuedPhotosForTree(treeId)
      .then(setQueuedPhotos)
      .catch(() => {});
  }, [treeId]);

  // Memoize blob URLs for queued photos (revoke on unmount/change)
  const queuedPhotoUrls = useMemo(() => {
    return queuedPhotos.map((qp) => ({
      ...qp,
      previewUrl: URL.createObjectURL(qp.file),
    }));
  }, [queuedPhotos]);

  useEffect(() => {
    return () => {
      queuedPhotoUrls.forEach((qp) => URL.revokeObjectURL(qp.previewUrl));
    };
  }, [queuedPhotoUrls]);

  // ---- Checklist: which categories are covered ----
  const coveredCategories = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return set;
  }, [photos]);

  // ---- File selection → show category picker ----
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArr = Array.from(files);

    if (categories.length > 0) {
      // Show category picker
      setPendingFiles(fileArr);
      setPendingCategories(fileArr.map(() => ""));
    } else {
      // No categories — upload directly
      uploadFiles(fileArr, []);
    }

    // Reset input so the same file(s) can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ---- Upload with categories ----
  async function uploadFiles(files: File[], cats: string[]) {
    setUploading(true);
    setPendingFiles(null);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      // Auto-generate captions from categories
      const captions: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (cats[i] && treeNumber && reportType) {
          captions.push(
            autoCaptionFromCategory(
              cats[i],
              treeNumber,
              speciesCommon || "",
              reportType
            )
          );
        } else {
          captions.push("");
        }
      }

      if (cats.some((c) => c)) {
        formData.append("categories", JSON.stringify(cats));
      }
      if (captions.some((c) => c)) {
        formData.append("captions", JSON.stringify(captions));
      }

      const res = await fetch(basePath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);

      // Queue files for offline upload via IndexedDB
      try {
        for (let i = 0; i < files.length; i++) {
          await enqueuePhoto({ propertyId, treeId, file: files[i] });
        }
        const queued = await getQueuedPhotosForTree(treeId);
        setQueuedPhotos(queued);
        toast({
          title: "Photos saved offline",
          description: "Photos will upload when you're back online.",
        });
      } catch {
        // IndexedDB unavailable — fall back to silent failure
      }
    } finally {
      setUploading(false);
    }
  }

  // ---- Category update on existing photo ----
  async function updateCategory(photoId: string, category: string | null) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) => (p.id === photoId ? { ...p, category } : p))
        );
      }
    } catch (err) {
      console.error("Category update failed:", err);
    }
  }

  // ---- Delete ----
  async function handleDelete(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, { method: "DELETE" });
      if (res.ok) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        setDeleteConfirmId(null);
        if (lightboxIndex !== null) {
          const deletedIdx = photos.findIndex((p) => p.id === photoId);
          if (deletedIdx === lightboxIndex) setLightboxIndex(null);
          else if (deletedIdx < lightboxIndex)
            setLightboxIndex(lightboxIndex - 1);
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  // ---- Caption update ----
  async function saveCaption(photoId: string) {
    try {
      const res = await fetch(`${basePath}/${photoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: captionDraft || null }),
      });
      if (res.ok) {
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === photoId ? { ...p, caption: captionDraft || null } : p
          )
        );
      }
    } catch (err) {
      console.error("Caption update failed:", err);
    }
    setEditingCaptionId(null);
  }

  // ---- Markup save callback ----
  const handleMarkupSave = useCallback(
    (annotatedUrl: string) => {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === markupPhotoId
            ? { ...p, url: annotatedUrl, isAnnotated: true }
            : p
        )
      );
      setMarkupPhotoId(null);
      fetchPhotos();
    },
    [markupPhotoId, fetchPhotos]
  );

  // ---- Revert annotation ----
  async function handleRevertAnnotation(photoId: string) {
    setRevertingId(photoId);
    try {
      const res = await fetch(`${basePath}/${photoId}/annotate`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchPhotos();
      }
    } catch (err) {
      console.error("Revert failed:", err);
    } finally {
      setRevertingId(null);
    }
  }

  // ---- Lightbox navigation ----
  const lightboxPhoto =
    lightboxIndex !== null ? photos[lightboxIndex] : null;

  function navigateLightbox(delta: number) {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + delta;
    if (next >= 0 && next < photos.length) {
      setLightboxIndex(next);
      setLightboxViewOriginal(false);
    }
  }

  const lightboxUrl =
    lightboxPhoto && lightboxViewOriginal && lightboxPhoto.originalUrl
      ? lightboxPhoto.originalUrl
      : lightboxPhoto?.url;

  const markupPhoto = photos.find((p) => p.id === markupPhotoId);

  // Format EXIF date
  function formatExifDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  // Get category label from value
  function getCategoryLabel(catValue: string | null | undefined): string {
    if (!catValue) return "";
    const cat = categories.find((c) => c.value === catValue);
    return cat?.label || catValue.replace(/_/g, " ");
  }

  // ---- Render ----
  return (
    <div className="space-y-3">
      {/* Required Photos Checklist */}
      {categories.length > 0 && (
        <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Recommended Photos
          </p>
          <div className="space-y-1">
            {categories.map((cat) => {
              const covered = coveredCategories.has(cat.value);
              return (
                <div
                  key={cat.value}
                  className="flex items-center gap-2 text-xs"
                >
                  {covered ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                  <span
                    className={`${cat.required ? "font-semibold" : ""} ${covered ? "text-green-700" : "text-muted-foreground"}`}
                  >
                    {cat.label}
                    {cat.required && !covered && (
                      <span className="text-amber-600 ml-1">*</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Header + Upload Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="h-3.5 w-3.5" />
              Add Photos
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Category Picker Dialog — shown after file selection */}
      {pendingFiles && pendingFiles.length > 0 && (
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              // Upload without categories if dismissed
              uploadFiles(pendingFiles, pendingCategories);
            }
          }}
        >
          <DialogContent className="max-w-sm">
            <DialogTitle className="text-sm font-semibold">
              Categorize Photo{pendingFiles.length > 1 ? "s" : ""}
            </DialogTitle>
            <div className="space-y-3">
              {pendingFiles.map((file, idx) => (
                <div key={idx} className="space-y-2">
                  {pendingFiles.length > 1 && (
                    <p className="text-xs text-muted-foreground">
                      {file.name}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setPendingCategories((prev) => {
                            const next = [...prev];
                            next[idx] =
                              next[idx] === cat.value ? "" : cat.value;
                            return next;
                          });
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          pendingCategories[idx] === cat.value
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-background hover:bg-muted border-border"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => uploadFiles(pendingFiles, [])}
              >
                Skip
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  uploadFiles(pendingFiles, pendingCategories)
                }
              >
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Thumbnail Grid */}
      {photos.length === 0 && queuedPhotoUrls.length === 0 ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-muted-foreground hover:border-muted-foreground/40 hover:text-muted-foreground/80 transition-colors w-full"
        >
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm">Tap to add photos</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="group relative">
              {/* Thumbnail */}
              <button
                className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxViewOriginal(false);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Category badge */}
                {photo.category && (
                  <Badge
                    variant="secondary"
                    className="absolute top-1 left-1 text-[8px] px-1 py-0 bg-emerald-700 text-white hover:bg-emerald-700 max-w-[90%] truncate"
                  >
                    {getCategoryLabel(photo.category)}
                  </Badge>
                )}

                {/* Annotated badge */}
                {photo.isAnnotated && (
                  <Badge
                    variant="secondary"
                    className="absolute bottom-1 left-1 text-[9px] px-1 py-0 bg-blue-600 text-white hover:bg-blue-600"
                  >
                    Annotated
                  </Badge>
                )}
              </button>

              {/* Hover overlay with markup button */}
              <div className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/30 transition-colors pointer-events-none" />
              <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Category tag button */}
                {categories.length > 0 && (
                  <button
                    className="rounded-full bg-black/60 p-1 text-white hover:bg-emerald-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Cycle through categories + uncategorized
                      const currentIdx = categories.findIndex(
                        (c) => c.value === photo.category
                      );
                      const nextIdx = (currentIdx + 1) % (categories.length + 1);
                      const nextCat =
                        nextIdx < categories.length
                          ? categories[nextIdx].value
                          : null;
                      updateCategory(photo.id, nextCat);
                    }}
                    title="Change category"
                  >
                    <Tag className="h-3 w-3" />
                  </button>
                )}
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-blue-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMarkupPhotoId(photo.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  className="rounded-full bg-black/60 p-1 text-white hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmId(photo.id);
                  }}
                  title="Delete photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Caption + EXIF date */}
              {editingCaptionId === photo.id ? (
                <Input
                  value={captionDraft}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(photo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(photo.id);
                    if (e.key === "Escape") setEditingCaptionId(null);
                  }}
                  className="mt-1 h-6 text-[10px] px-1"
                  autoFocus
                  placeholder="Add caption..."
                />
              ) : (
                <button
                  className="mt-1 w-full text-left"
                  onClick={() => {
                    setEditingCaptionId(photo.id);
                    setCaptionDraft(photo.caption || "");
                  }}
                >
                  <p className="text-[10px] text-muted-foreground truncate hover:text-foreground transition-colors">
                    {photo.caption || "Add caption..."}
                  </p>
                </button>
              )}
              {photo.exifTakenAt && (
                <p className="text-[9px] text-muted-foreground/60 truncate">
                  Taken: {formatExifDate(photo.exifTakenAt)}
                </p>
              )}
            </div>
          ))}

          {/* Queued (offline) photo thumbnails */}
          {queuedPhotoUrls.map((qp) => (
            <div key={qp.id} className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted opacity-75">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qp.previewUrl}
                  alt="Pending upload"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-[10px] text-orange-500 mt-1 truncate">
                Pending upload
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogTitle>Delete Photo</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this photo? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) {
            setLightboxIndex(null);
            setLightboxViewOriginal(false);
          }
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {lightboxPhoto && (
            <div className="flex flex-col">
              {/* Image */}
              <div className="relative bg-black flex items-center justify-center min-h-[400px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxUrl}
                  alt={lightboxPhoto.caption || "Photo"}
                  className="max-h-[70vh] max-w-full object-contain"
                />

                {/* Nav arrows */}
                {lightboxIndex! > 0 && (
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(-1)}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {lightboxIndex! < photos.length - 1 && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors"
                    onClick={() => navigateLightbox(1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* Counter + badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  {lightboxPhoto.category && (
                    <Badge className="bg-emerald-700 text-white hover:bg-emerald-700 text-xs">
                      {getCategoryLabel(lightboxPhoto.category)}
                    </Badge>
                  )}
                  {lightboxPhoto.isAnnotated && (
                    <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs">
                      Annotated
                    </Badge>
                  )}
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {lightboxIndex! + 1} of {photos.length}
                  </span>
                </div>

                {/* View original / annotated toggle */}
                {lightboxPhoto.isAnnotated && lightboxPhoto.originalUrl && (
                  <button
                    className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white hover:bg-black/80 transition-colors"
                    onClick={() =>
                      setLightboxViewOriginal(!lightboxViewOriginal)
                    }
                  >
                    {lightboxViewOriginal ? "View Annotated" : "View Original"}
                  </button>
                )}

                {/* EXIF date in lightbox */}
                {lightboxPhoto.exifTakenAt && (
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    Taken: {formatExifDate(lightboxPhoto.exifTakenAt)}
                  </div>
                )}
              </div>

              {/* Caption + Actions bar */}
              <div className="flex items-center gap-2 p-3 border-t">
                <Input
                  value={
                    editingCaptionId === lightboxPhoto.id
                      ? captionDraft
                      : lightboxPhoto.caption || ""
                  }
                  placeholder="Add a caption..."
                  className="flex-1 text-sm"
                  onFocus={() => {
                    setEditingCaptionId(lightboxPhoto.id);
                    setCaptionDraft(lightboxPhoto.caption || "");
                  }}
                  onChange={(e) => setCaptionDraft(e.target.value)}
                  onBlur={() => saveCaption(lightboxPhoto.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCaption(lightboxPhoto.id);
                  }}
                />

                {/* Category picker in lightbox */}
                {categories.length > 0 && (
                  <select
                    value={lightboxPhoto.category || ""}
                    onChange={(e) =>
                      updateCategory(
                        lightboxPhoto.id,
                        e.target.value || null
                      )
                    }
                    className="text-xs border rounded px-2 py-1.5 bg-background"
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* Mark up button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => {
                    setLightboxIndex(null);
                    setMarkupPhotoId(lightboxPhoto.id);
                  }}
                  title="Mark up photo"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* Revert annotation button */}
                {lightboxPhoto.isAnnotated && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    onClick={() =>
                      handleRevertAnnotation(lightboxPhoto.id)
                    }
                    disabled={revertingId === lightboxPhoto.id}
                    title="Revert to original"
                  >
                    {revertingId === lightboxPhoto.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeleteConfirmId(lightboxPhoto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Photo Markup Editor Dialog */}
      {markupPhoto && (
        <PhotoMarkupEditor
          photoUrl={
            markupPhoto.isAnnotated && markupPhoto.originalUrl
              ? markupPhoto.originalUrl
              : markupPhoto.url
          }
          photoId={markupPhoto.id}
          propertyId={propertyId}
          treeId={treeId}
          onSave={handleMarkupSave}
          onClose={() => setMarkupPhotoId(null)}
        />
      )}
    </div>
  );
}
```

### components/tree-side-panel.tsx

```tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { SpeciesSearch } from "@/components/species-search";
import { ConditionRating } from "@/components/condition-rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreePhotos } from "@/components/tree-photos";
import { TreeAudioNotes } from "@/components/tree-audio-notes";
import { VoiceInput } from "@/components/voice-input";
import { SmartDictation } from "@/components/smart-dictation";
import { HealthAssessmentFields } from "@/components/type-fields/health-assessment-fields";
import { RemovalPermitFields } from "@/components/type-fields/removal-permit-fields";
import { TreeValuationFields } from "@/components/type-fields/tree-valuation-fields";
import { ConstructionEncroachmentFields } from "@/components/type-fields/construction-encroachment-fields";
import {
  getReportTypeConfig,
  type HealthAssessmentData,
  type RemovalPermitData,
  type TreeValuationData,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  X,
  Save,
  Trash2,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Loader2,
  Camera,
  Mic,
  PenLine,
  ExternalLink,
  Info,
  Copy,
  ClipboardList,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// ---------------------------------------------------------------------------
// ISA Standard Observation Checklists
// ---------------------------------------------------------------------------

const HEALTH_OBSERVATIONS = [
  "Chlorosis (yellowing)",
  "Crown dieback",
  "Decay / fungal fruiting bodies",
  "Pest / insect damage",
  "Girdling roots",
  "Poor vigor / sparse canopy",
  "Leaf scorch / burn",
  "Crown thinning",
  "Epicormic sprouting",
  "Root damage / cut roots",
  "Cankers / lesions",
  "No significant concerns",
];

const STRUCTURAL_OBSERVATIONS = [
  "Codominant stems",
  "Included bark",
  "Cavity / hollow",
  "Lean (note degree if significant)",
  "Root plate heaving / lifting",
  "Asymmetric crown",
  "Deadwood in crown",
  "Cracks / splits",
  "Weak branch attachments",
  "Trunk wound / damage",
  "Hangers / broken branches",
  "No significant concerns",
];

function parseObservedLine(notes: string): string[] {
  const match = notes.match(/^Observed:\s*(.+?)(\n|$)/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function extractFreeText(notes: string): string {
  return notes.replace(/^Observed:\s*.+?(\n\n|\n|$)/, "").trim();
}

function buildNotesWithObserved(checks: string[], freeText: string): string {
  const prefix = checks.length > 0 ? `Observed: ${checks.join(", ")}` : "";
  const trimmed = freeText.trim();
  if (prefix && trimmed) return `${prefix}\n\n${trimmed}`;
  if (prefix) return prefix;
  return trimmed;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TreeFormData {
  speciesCommon: string;
  speciesScientific: string;
  dbhInches: number;
  heightFt: number | null;
  canopySpreadFt: number | null;
  conditionRating: number;
  healthNotes: string;
  structuralNotes: string;
  recommendedAction: string;
  isProtected: boolean;
  protectionReason: string | null;
  mitigationRequired: string | null;
  tagNumber: string;
  typeSpecificData?: string; // JSON string
}

interface OrdinanceContext {
  nativeThreshold: number | null;
  nonnativeThreshold: number | null;
  heritageThreshold: number | null;
  permitProcessNotes: string | null;
  ordinanceUrl: string | null;
  replantingRatio: string | null;
  inLieuFee: string | null;
  certifierRequirement: string | null;
}

interface ProtectionResult {
  isProtected: boolean;
  reason: string;
  isHeritage: boolean;
  heritageReason: string | null;
  mitigationRequired: string | null;
  codeReference: string | null;
  ordinanceContext?: OrdinanceContext | null;
}

interface TreeRecord {
  id?: string;
  treeNumber?: number;
  pinLat?: number;
  pinLng?: number;
  tagNumber?: string | null;
  speciesCommon?: string;
  speciesScientific?: string;
  dbhInches?: number;
  heightFt?: number | null;
  canopySpreadFt?: number | null;
  conditionRating?: number;
  healthNotes?: string;
  structuralNotes?: string;
  recommendedAction?: string;
  isProtected?: boolean;
  protectionReason?: string | null;
  isHeritage?: boolean;
  heritageReason?: string | null;
  mitigationRequired?: string | null;
  status?: string;
  typeSpecificData?: string | null;
}

interface TreeSidePanelProps {
  tree: TreeRecord | null;
  treeNumber: number;
  totalTrees?: number;
  propertyId: string;
  propertyCity: string;
  reportType?: string;
  onSave: (data: TreeFormData) => void;
  onDelete?: () => void;
  onClose: () => void;
  saving?: boolean;
  lastSavedTree?: TreeRecord | null;
  recentSpecies?: { common: string; scientific: string }[];
  quickAddMode?: boolean;
}

const ACTION_OPTIONS = [
  { value: "retain", label: "Retain", color: "green" },
  { value: "remove", label: "Remove", color: "red" },
  { value: "prune", label: "Prune", color: "amber" },
  { value: "monitor", label: "Monitor", color: "blue" },
];

// ---------------------------------------------------------------------------
// Quick Photo types
// ---------------------------------------------------------------------------

interface QuickPhoto {
  id: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSidePanel({
  tree,
  treeNumber,
  totalTrees,
  propertyId,
  propertyCity,
  reportType,
  onSave,
  onDelete,
  onClose,
  saving = false,
  lastSavedTree,
  recentSpecies = [],
  quickAddMode = false,
}: TreeSidePanelProps) {
  // ---- Form state ----
  const [tagNumber, setTagNumber] = useState(tree?.tagNumber ?? "");
  const [speciesCommon, setSpeciesCommon] = useState(tree?.speciesCommon ?? "");
  const [speciesScientific, setSpeciesScientific] = useState(
    tree?.speciesScientific ?? ""
  );
  const [dbhInches, setDbhInches] = useState<string>(
    tree?.dbhInches != null ? String(tree.dbhInches) : ""
  );
  const [heightFt, setHeightFt] = useState<string>(
    tree?.heightFt != null ? String(tree.heightFt) : ""
  );
  const [canopySpreadFt, setCanopySpreadFt] = useState<string>(
    tree?.canopySpreadFt != null ? String(tree.canopySpreadFt) : ""
  );
  const [conditionRating, setConditionRating] = useState<number>(
    tree?.conditionRating ?? 0
  );
  const [healthNotes, setHealthNotes] = useState(tree?.healthNotes ?? "");
  const [structuralNotes, setStructuralNotes] = useState(
    tree?.structuralNotes ?? ""
  );
  const [healthChecks, setHealthChecks] = useState<string[]>(() =>
    parseObservedLine(tree?.healthNotes ?? "")
  );
  const [structuralChecks, setStructuralChecks] = useState<string[]>(() =>
    parseObservedLine(tree?.structuralNotes ?? "")
  );
  const [recommendedAction, setRecommendedAction] = useState(
    tree?.recommendedAction ?? ""
  );

  // ---- Type-specific data state ----
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [typeData, setTypeData] = useState<any>(() => {
    if (tree?.typeSpecificData) {
      try {
        return JSON.parse(tree.typeSpecificData);
      } catch {
        return {};
      }
    }
    return {};
  });

  // ---- Quick photos state ----
  const [photos, setPhotos] = useState<QuickPhoto[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Load photos when tree exists
  const isExisting = tree != null && tree.id != null;
  useEffect(() => {
    if (isExisting && tree?.id) {
      fetch(`/api/properties/${propertyId}/trees/${tree.id}/photos`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => setPhotos(data.map((p: { id: string; url: string }) => ({ id: p.id, url: p.url }))))
        .catch(() => setPhotos([]));
    }
  }, [isExisting, tree?.id, propertyId]);

  // ---- Protection check state ----
  const [protectionResult, setProtectionResult] =
    useState<ProtectionResult | null>(
      tree?.isProtected != null
        ? {
            isProtected: tree.isProtected,
            reason: tree.protectionReason ?? "",
            isHeritage: tree.isHeritage ?? false,
            heritageReason: tree.heritageReason ?? null,
            mitigationRequired: tree.mitigationRequired ?? null,
            codeReference: null,
          }
        : null
    );
  const [checkingProtection, setCheckingProtection] = useState(false);
  const [overrideProtection, setOverrideProtection] = useState(false);
  const [overrideIsProtected, setOverrideIsProtected] = useState(
    tree?.isProtected ?? false
  );
  const [overrideReason, setOverrideReason] = useState(
    tree?.protectionReason ?? ""
  );

  // ---- Auto-check ordinance debounce ----
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkProtection = useCallback(async () => {
    if (!speciesCommon || !dbhInches || !propertyCity) return;
    setCheckingProtection(true);
    try {
      const params = new URLSearchParams({
        city: propertyCity,
        species: speciesCommon,
        dbh: dbhInches,
      });
      const res = await fetch(`/api/ordinances/check?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to check protection");
      const data: ProtectionResult = await res.json();
      setProtectionResult(data);
    } catch {
      setProtectionResult(null);
    } finally {
      setCheckingProtection(false);
    }
  }, [speciesCommon, dbhInches, propertyCity]);

  // Auto-trigger ordinance check when species + DBH both have values
  useEffect(() => {
    if (!speciesCommon || !dbhInches) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      checkProtection();
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [speciesCommon, dbhInches, checkProtection]);

  // ---- Floating dictation modal ----
  const [showDictationModal, setShowDictationModal] = useState(false);

  // ---- Auto-save draft ----
  const draftKey = `treecertify_draft_${propertyId}_${tree?.id || "new_" + treeNumber}`;
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const draftRef = useRef<Record<string, any> | null>(null);

  // Check for existing draft on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(draftKey);
      if (!stored) return;
      const draft = JSON.parse(stored);
      const hasContent =
        draft.speciesCommon || draft.dbhInches || draft.healthNotes || draft.structuralNotes;
      if (hasContent) {
        draftRef.current = draft;
        setDraftTimestamp(draft.timestamp);
        setShowDraftBanner(true);
      }
    } catch {
      /* ignore */
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          draftKey,
          JSON.stringify({
            tagNumber,
            speciesCommon,
            speciesScientific,
            dbhInches,
            heightFt,
            canopySpreadFt,
            conditionRating,
            healthNotes,
            structuralNotes,
            recommendedAction,
            typeData,
            overrideProtection,
            overrideIsProtected,
            overrideReason,
            timestamp: Date.now(),
          })
        );
        setDraftSavedAt(Date.now());
      } catch {
        /* localStorage full */
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [
    draftKey,
    tagNumber,
    speciesCommon,
    speciesScientific,
    dbhInches,
    heightFt,
    canopySpreadFt,
    conditionRating,
    healthNotes,
    structuralNotes,
    recommendedAction,
    typeData,
    overrideProtection,
    overrideIsProtected,
    overrideReason,
  ]);

  function restoreDraft() {
    const d = draftRef.current;
    if (!d) return;
    if (d.tagNumber !== undefined) setTagNumber(d.tagNumber);
    if (d.speciesCommon !== undefined) setSpeciesCommon(d.speciesCommon);
    if (d.speciesScientific !== undefined) setSpeciesScientific(d.speciesScientific);
    if (d.dbhInches !== undefined) setDbhInches(d.dbhInches);
    if (d.heightFt !== undefined) setHeightFt(d.heightFt);
    if (d.canopySpreadFt !== undefined) setCanopySpreadFt(d.canopySpreadFt);
    if (d.conditionRating !== undefined) setConditionRating(d.conditionRating);
    if (d.healthNotes !== undefined) setHealthNotes(d.healthNotes);
    if (d.structuralNotes !== undefined) setStructuralNotes(d.structuralNotes);
    if (d.recommendedAction !== undefined) setRecommendedAction(d.recommendedAction);
    if (d.typeData !== undefined) setTypeData(d.typeData);
    if (d.overrideProtection !== undefined) setOverrideProtection(d.overrideProtection);
    if (d.overrideIsProtected !== undefined) setOverrideIsProtected(d.overrideIsProtected);
    if (d.overrideReason !== undefined) setOverrideReason(d.overrideReason);
    setShowDraftBanner(false);
  }

  function dismissDraft() {
    setShowDraftBanner(false);
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
  }

  // ---- Derived ----
  const statusDot =
    tree?.status === "certified"
      ? "bg-emerald-500"
      : tree?.status === "assessed"
        ? "bg-blue-500"
        : "bg-gray-400";

  const reportTypeConfig = reportType
    ? getReportTypeConfig(reportType)
    : undefined;

  // Is this a new tree (no id)?
  const isNewTree = !tree?.id;

  // ---- Handlers ----
  function handleSpeciesChange(common: string, scientific: string) {
    setSpeciesCommon(common);
    setSpeciesScientific(scientific);
    setProtectionResult(null);
  }

  function handleCopyFromLast() {
    if (!lastSavedTree) return;
    setSpeciesCommon(lastSavedTree.speciesCommon ?? "");
    setSpeciesScientific(lastSavedTree.speciesScientific ?? "");
    setDbhInches(lastSavedTree.dbhInches != null ? String(lastSavedTree.dbhInches) : "");
    setHeightFt(lastSavedTree.heightFt != null ? String(lastSavedTree.heightFt) : "");
    setCanopySpreadFt(lastSavedTree.canopySpreadFt != null ? String(lastSavedTree.canopySpreadFt) : "");
    setConditionRating(lastSavedTree.conditionRating ?? 0);
    setRecommendedAction(lastSavedTree.recommendedAction ?? "");
    // Don't copy: healthNotes, structuralNotes, photos, pin location
  }

  function handleSave() {
    const useOverride = overrideProtection;
    onSave({
      speciesCommon,
      speciesScientific,
      dbhInches: Number(dbhInches) || 0,
      heightFt: heightFt ? Number(heightFt) : null,
      canopySpreadFt: canopySpreadFt ? Number(canopySpreadFt) : null,
      conditionRating,
      healthNotes,
      structuralNotes,
      recommendedAction,
      isProtected: useOverride
        ? overrideIsProtected
        : (protectionResult?.isProtected ?? false),
      protectionReason: useOverride
        ? overrideReason || null
        : (protectionResult?.reason ?? null),
      mitigationRequired: useOverride
        ? null
        : (protectionResult?.mitigationRequired ?? null),
      tagNumber,
      typeSpecificData:
        reportType && Object.keys(typeData).length > 0
          ? JSON.stringify(typeData)
          : undefined,
    });
    // Clear draft after save (data is either sent to server or queued for offline sync)
    try {
      localStorage.removeItem(draftKey);
    } catch {
      /* ignore */
    }
    setDraftSavedAt(null);
  }

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tree?.id) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `/api/properties/${propertyId}/trees/${tree.id}/photos`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const photo = await res.json();
        setPhotos((prev) => [...prev, { id: photo.id, url: photo.url }]);
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
    } finally {
      setUploadingPhoto(false);
    }

    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  // ---- Render ----
  return (
    <div className={cn(
      "flex flex-col bg-background",
      // Mobile: bottom sheet overlay
      "fixed inset-x-0 bottom-0 z-50",
      "max-h-[75vh] rounded-t-2xl shadow-2xl",
      // Desktop: right side panel
      "md:relative md:inset-auto md:z-auto",
      "md:h-full md:w-96 md:max-h-none md:rounded-none md:shadow-none md:border-l"
    )}>
      {/* Mobile drag handle */}
      <div className="md:hidden mx-auto mt-2 mb-1 h-1 w-10 rounded-full bg-gray-300" />
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
          <h2 className="text-lg font-semibold">Tree #{treeNumber}</h2>
          {quickAddMode && isNewTree && totalTrees != null && (
            <span className="text-xs text-muted-foreground">
              of {totalTrees + 1}
            </span>
          )}
          <Input
            placeholder="Tag #"
            value={tagNumber}
            onChange={(e) => setTagNumber(e.target.value)}
            className="h-7 w-20 text-xs font-mono"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Coordinates */}
      {tree?.pinLat != null && tree?.pinLng != null && (
        <div className="border-b px-4 py-2">
          <p className="text-xs text-muted-foreground font-mono">
            {tree.pinLat.toFixed(6)}, {tree.pinLng.toFixed(6)}
          </p>
        </div>
      )}

      {/* Draft restore banner */}
      {showDraftBanner && draftTimestamp && (
        <div className="mx-4 mt-2 rounded-lg border border-amber-300 bg-amber-50 p-3">
          <p className="text-xs text-amber-800 font-medium">
            Unsaved changes found from{" "}
            {formatDistanceToNow(new Date(draftTimestamp), { addSuffix: true })}
          </p>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={restoreDraft} className="text-xs h-7">
              Restore
            </Button>
            <Button size="sm" variant="ghost" onClick={dismissDraft} className="text-xs h-7">
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Tabbed content */}
      <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="photos" className="text-xs gap-1">
            <Camera className="h-3 w-3" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="audio" className="text-xs gap-1">
            <Mic className="h-3 w-3" />
            Audio
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="flex-1 overflow-y-auto px-4 py-4 space-y-5 mt-0">

        {/* Copy from last tree button */}
        {isNewTree && lastSavedTree && (
          <button
            onClick={handleCopyFromLast}
            className="w-full text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 py-1.5 px-3 rounded border border-emerald-200 border-dashed transition-colors flex items-center justify-center gap-1.5"
          >
            <Copy className="h-3 w-3" />
            Copy species &amp; size from Tree #{lastSavedTree.treeNumber}
          </button>
        )}

        {/* Quick Photos Section */}
        {isExisting && tree?.id && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Photos</Label>
              <span className="text-[10px] text-muted-foreground">
                {photos.length} photo{photos.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Photo thumbnails row */}
            {photos.length > 0 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    className="w-12 h-12 rounded object-cover border flex-shrink-0"
                    alt=""
                  />
                ))}
              </div>
            )}

            {/* Camera capture button */}
            <label className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 py-2 px-3 rounded border border-emerald-200 border-dashed cursor-pointer transition-colors">
              {uploadingPhoto ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              <span>{uploadingPhoto ? "Uploading..." : "Take Photo"}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoCapture}
                disabled={uploadingPhoto}
              />
            </label>
          </div>
        )}

        {/* Smart Dictation — fill multiple fields from voice */}
        <SmartDictation
          onApply={(fields) => {
            if (fields.speciesCommon !== undefined) setSpeciesCommon(fields.speciesCommon);
            if (fields.speciesScientific !== undefined) setSpeciesScientific(fields.speciesScientific);
            if (fields.dbhInches !== undefined) setDbhInches(String(fields.dbhInches));
            if (fields.heightFt !== undefined) setHeightFt(String(fields.heightFt));
            if (fields.canopySpreadFt !== undefined) setCanopySpreadFt(String(fields.canopySpreadFt));
            if (fields.conditionRating !== undefined) setConditionRating(fields.conditionRating);
            if (fields.healthNotes !== undefined) {
              const existing = extractFreeText(healthNotes);
              const combined = existing ? existing + " " + fields.healthNotes : fields.healthNotes;
              setHealthNotes(buildNotesWithObserved(healthChecks, combined));
            }
            if (fields.structuralNotes !== undefined) {
              const existing = extractFreeText(structuralNotes);
              const combined = existing ? existing + " " + fields.structuralNotes : fields.structuralNotes;
              setStructuralNotes(buildNotesWithObserved(structuralChecks, combined));
            }
            if (fields.recommendedAction !== undefined) setRecommendedAction(fields.recommendedAction);
            if (fields.tagNumber !== undefined) setTagNumber(fields.tagNumber);
          }}
        />

        {/* Species */}
        <div className="space-y-2">
          <Label>Species</Label>

          {/* Recent species chips */}
          {recentSpecies.length > 0 && !speciesCommon && (
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 -mt-0.5">
              {recentSpecies.map((sp) => (
                <button
                  key={sp.common}
                  type="button"
                  onClick={() => handleSpeciesChange(sp.common, sp.scientific)}
                  className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {sp.common}
                </button>
              ))}
            </div>
          )}

          <SpeciesSearch
            value={speciesCommon}
            onChange={handleSpeciesChange}
          />
          {speciesScientific && (
            <p className="text-xs text-muted-foreground italic">
              {speciesScientific}
            </p>
          )}
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="sp-dbh" className="text-xs">
              DBH (in)
            </Label>
            <Input
              id="sp-dbh"
              type="number"
              min="0"
              step="0.5"
              placeholder="0"
              value={dbhInches}
              onChange={(e) => {
                setDbhInches(e.target.value);
                setProtectionResult(null);
              }}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-height" className="text-xs">
              Height (ft)
            </Label>
            <Input
              id="sp-height"
              type="number"
              min="0"
              placeholder="0"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sp-canopy" className="text-xs">
              Canopy (ft)
            </Label>
            <Input
              id="sp-canopy"
              type="number"
              min="0"
              placeholder="0"
              value={canopySpreadFt}
              onChange={(e) => setCanopySpreadFt(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        {/* Condition Rating */}
        <div className="space-y-2">
          <Label>Condition Rating</Label>
          <ConditionRating
            value={conditionRating}
            onChange={setConditionRating}
            size="sm"
          />
        </div>

        {/* Health Observations + Notes */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Health Observations</Label>
            <MultiCheckbox
              options={HEALTH_OBSERVATIONS}
              selected={healthChecks}
              onChange={(selected) => {
                setHealthChecks(selected);
                setHealthNotes(
                  buildNotesWithObserved(selected, extractFreeText(healthNotes))
                );
              }}
              columns={2}
              exclusiveOption="No significant concerns"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="sp-health" className="text-xs">
                Additional Health Notes
              </Label>
              <VoiceInput
                onTranscript={(text) => {
                  const existing = extractFreeText(healthNotes);
                  const combined = existing ? existing + " " + text : text;
                  setHealthNotes(
                    buildNotesWithObserved(healthChecks, combined)
                  );
                }}
              />
            </div>
            <Textarea
              id="sp-health"
              placeholder="Additional observations not covered above..."
              value={extractFreeText(healthNotes)}
              onChange={(e) =>
                setHealthNotes(
                  buildNotesWithObserved(healthChecks, e.target.value)
                )
              }
              rows={2}
            />
          </div>
        </div>

        {/* Structural Observations + Notes */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Structural Observations</Label>
            <MultiCheckbox
              options={STRUCTURAL_OBSERVATIONS}
              selected={structuralChecks}
              onChange={(selected) => {
                setStructuralChecks(selected);
                setStructuralNotes(
                  buildNotesWithObserved(
                    selected,
                    extractFreeText(structuralNotes)
                  )
                );
              }}
              columns={2}
              exclusiveOption="No significant concerns"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="sp-structural" className="text-xs">
                Additional Structural Notes
              </Label>
              <VoiceInput
                onTranscript={(text) => {
                  const existing = extractFreeText(structuralNotes);
                  const combined = existing ? existing + " " + text : text;
                  setStructuralNotes(
                    buildNotesWithObserved(structuralChecks, combined)
                  );
                }}
              />
            </div>
            <Textarea
              id="sp-structural"
              placeholder="Additional structural observations not covered above..."
              value={extractFreeText(structuralNotes)}
              onChange={(e) =>
                setStructuralNotes(
                  buildNotesWithObserved(structuralChecks, e.target.value)
                )
              }
              rows={2}
            />
          </div>
        </div>

        {/* Recommended Action — Pill Buttons */}
        <div className="space-y-1.5">
          <Label className="text-xs">Recommended Action</Label>
          <ButtonSelector
            options={ACTION_OPTIONS}
            value={recommendedAction}
            onChange={setRecommendedAction}
            size="sm"
          />
        </div>

        {/* Protection Status — Auto-check */}
        <div className="space-y-2">
          <Label className="text-xs">Protection Status</Label>

          {/* Loading state */}
          {checkingProtection && (
            <div className="flex items-center gap-2 rounded-lg border p-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking ordinance...</span>
            </div>
          )}

          {/* No data yet — prompt */}
          {!checkingProtection && !protectionResult && (!speciesCommon || !dbhInches) && (
            <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              Enter species and DBH to auto-check protection status.
            </div>
          )}

          {/* Result card */}
          {!checkingProtection && protectionResult && (
            <div
              className={`rounded-lg border-2 p-3 text-sm ${
                protectionResult.isProtected
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-gray-300 bg-gray-50 dark:bg-gray-900/30"
              }`}
            >
              <div className="flex items-center gap-2">
                {protectionResult.isProtected ? (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <ShieldX className="h-5 w-5 shrink-0 text-gray-400" />
                )}
                <span
                  className={`font-semibold ${
                    protectionResult.isProtected
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {protectionResult.isProtected ? "Protected" : "Not Protected"}
                </span>
                {protectionResult.isHeritage && (
                  <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                    Heritage
                  </Badge>
                )}
              </div>
              <p
                className={`mt-1.5 text-xs ${
                  protectionResult.isProtected
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {protectionResult.reason ||
                  `No specific protection under ${propertyCity} ordinance`}
              </p>
              {protectionResult.mitigationRequired && (
                <div className="mt-2 rounded border bg-muted/50 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Mitigation Required
                  </p>
                  <p className="mt-0.5 text-xs">
                    {protectionResult.mitigationRequired}
                  </p>
                </div>
              )}

              {/* Ordinance details popover */}
              {protectionResult.ordinanceContext && (
                <div className="mt-2 flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Info className="h-3 w-3" />
                        View ordinance details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-72 p-3 space-y-2 text-xs"
                    >
                      <p className="font-semibold text-sm">
                        {propertyCity} Tree Ordinance
                      </p>
                      {protectionResult.codeReference && (
                        <p className="text-muted-foreground">
                          {protectionResult.codeReference}
                        </p>
                      )}
                      <div className="space-y-1.5 pt-1">
                        {protectionResult.ordinanceContext.nativeThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Native threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.nativeThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.nonnativeThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Non-native threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.nonnativeThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.heritageThreshold != null && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Heritage threshold</span>
                            <span className="font-mono font-medium">
                              {protectionResult.ordinanceContext.heritageThreshold}&quot; DBH
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.replantingRatio && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Replanting ratio</span>
                            <span className="font-medium">
                              {protectionResult.ordinanceContext.replantingRatio}
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.inLieuFee && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">In-lieu fee</span>
                            <span className="font-medium">
                              {protectionResult.ordinanceContext.inLieuFee}
                            </span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.certifierRequirement && (
                          <div className="pt-1 border-t">
                            <span className="text-muted-foreground">Certifier: </span>
                            <span>{protectionResult.ordinanceContext.certifierRequirement}</span>
                          </div>
                        )}
                        {protectionResult.ordinanceContext.permitProcessNotes && (
                          <div className="pt-1 border-t">
                            <span className="text-muted-foreground">Permit process: </span>
                            <span>{protectionResult.ordinanceContext.permitProcessNotes}</span>
                          </div>
                        )}
                      </div>
                      {protectionResult.ordinanceContext.ordinanceUrl && (
                        <a
                          href={protectionResult.ordinanceContext.ordinanceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 pt-1 border-t"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View full ordinance
                        </a>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          )}

          {/* Permit Requirements — shown when tree is protected and ordinance has permit process notes */}
          {!checkingProtection &&
            protectionResult?.isProtected &&
            protectionResult.ordinanceContext?.permitProcessNotes && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    Permit Requirements
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {protectionResult.ordinanceContext.permitProcessNotes}
                </p>
                {protectionResult.ordinanceContext.ordinanceUrl && (
                  <a
                    href={protectionResult.ordinanceContext.ordinanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Ordinance
                  </a>
                )}
              </div>
            )}

          {/* Arborist Override */}
          <button
            type="button"
            onClick={() => setOverrideProtection((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <PenLine className="h-3 w-3" />
            {overrideProtection ? "Cancel override" : "Override protection status"}
          </button>

          {overrideProtection && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/20 p-3 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Manual Override
                </span>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={overrideIsProtected}
                  onChange={(e) => setOverrideIsProtected(e.target.checked)}
                  className="rounded border-input h-3.5 w-3.5"
                />
                Tree is protected
              </label>
              <Textarea
                placeholder="Reason for protection status..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                rows={2}
                className="text-xs"
              />
            </div>
          )}
        </div>

        {/* ============ Type-Specific Fields ============ */}
        {reportType && reportTypeConfig && (
          <div className="border-t pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {reportTypeConfig.label}
            </p>

            {reportType === "health_assessment" && (
              <HealthAssessmentFields
                data={typeData as HealthAssessmentData}
                onChange={setTypeData}
              />
            )}

            {reportType === "removal_permit" && (
              <RemovalPermitFields
                data={typeData as RemovalPermitData}
                onChange={setTypeData}
              />
            )}

            {reportType === "tree_valuation" && (
              <TreeValuationFields
                data={typeData as TreeValuationData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
                conditionRating={conditionRating}
                speciesCommon={speciesCommon}
              />
            )}

            {reportType === "construction_encroachment" && (
              <ConstructionEncroachmentFields
                data={typeData as ConstructionEncroachmentData}
                onChange={setTypeData}
                dbhInches={Number(dbhInches) || 0}
              />
            )}
          </div>
        )}

        {/* Spacer so floating button doesn't overlap content */}
        <div className="h-14" />

        {/* Floating dictation button */}
        <div className="sticky bottom-2 flex justify-end pointer-events-none">
          <button
            type="button"
            onClick={() => setShowDictationModal(true)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            title="Smart Dictate — fill fields with voice"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>

        {/* Dictation modal overlay */}
        {showDictationModal && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/40">
            <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-sm mx-auto p-5 space-y-3 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center gap-1.5">
                  <Mic className="h-4 w-4 text-emerald-600" />
                  Smart Dictation
                </h3>
                <button
                  onClick={() => setShowDictationModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Describe the tree and its condition. AI will extract species, DBH, condition, and notes.
              </p>
              <SmartDictation
                onApply={(fields) => {
                  if (fields.speciesCommon !== undefined) setSpeciesCommon(fields.speciesCommon);
                  if (fields.speciesScientific !== undefined) setSpeciesScientific(fields.speciesScientific);
                  if (fields.dbhInches !== undefined) setDbhInches(String(fields.dbhInches));
                  if (fields.heightFt !== undefined) setHeightFt(String(fields.heightFt));
                  if (fields.canopySpreadFt !== undefined) setCanopySpreadFt(String(fields.canopySpreadFt));
                  if (fields.conditionRating !== undefined) setConditionRating(fields.conditionRating);
                  if (fields.healthNotes !== undefined) {
                    const existing = extractFreeText(healthNotes);
                    const combined = existing ? existing + " " + fields.healthNotes : fields.healthNotes;
                    setHealthNotes(buildNotesWithObserved(healthChecks, combined));
                  }
                  if (fields.structuralNotes !== undefined) {
                    const existing = extractFreeText(structuralNotes);
                    const combined = existing ? existing + " " + fields.structuralNotes : fields.structuralNotes;
                    setStructuralNotes(buildNotesWithObserved(structuralChecks, combined));
                  }
                  if (fields.recommendedAction !== undefined) setRecommendedAction(fields.recommendedAction);
                  if (fields.tagNumber !== undefined) setTagNumber(fields.tagNumber);
                  setShowDictationModal(false);
                }}
              />
            </div>
          </div>
        )}
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreePhotos
              propertyId={propertyId}
              treeId={tree.id}
              reportType={reportType}
              treeNumber={treeNumber}
              speciesCommon={speciesCommon}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Camera className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add photos.</p>
            </div>
          )}
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="flex-1 overflow-y-auto px-4 py-4 mt-0">
          {isExisting && tree?.id ? (
            <TreeAudioNotes propertyId={propertyId} treeId={tree.id} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Mic className="h-8 w-8" />
              <p className="text-sm">Save this tree first to add audio notes.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="border-t px-4 py-3 space-y-1.5">
        {draftSavedAt && (
          <p className="text-[10px] text-muted-foreground text-center">
            Draft saved {formatDistanceToNow(new Date(draftSavedAt), { addSuffix: true })}
          </p>
        )}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleSave}
          disabled={saving || !speciesCommon || !dbhInches}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : quickAddMode && isNewTree ? (
            <>
              <Zap className="h-4 w-4" />
              Save &amp; Next
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          )}
        </Button>

        {isExisting && onDelete && (
          <Button
            variant="outline"
            onClick={onDelete}
            disabled={saving}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <Button variant="outline" onClick={onClose} disabled={saving}>
          Close
        </Button>
      </div>
      </div>
    </div>
  );
}
```

### components/tree-summary-panel.tsx

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, TreePine, MapPin, ArrowUpDown } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeSummaryItem {
  id: string;
  treeNumber: number;
  tagNumber?: string | null;
  speciesCommon: string;
  dbhInches: number | null;
  conditionRating: number | null;
  isProtected: boolean;
  recommendedAction?: string | null;
  status: string;
  typeSpecificData?: string | null;
}

interface TreeSummaryPanelProps {
  trees: TreeSummaryItem[];
  selectedTreeId?: string | null;
  onSelectTree: (id: string) => void;
  reportType?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type SortKey = "treeNumber" | "species" | "dbh" | "condition" | "action";
type SortDir = "asc" | "desc";

const CONDITION_LABELS: Record<number, string> = {
  0: "Dead",
  1: "Critical",
  2: "Poor",
  3: "Fair",
  4: "Good",
  5: "Excellent",
};

const CONDITION_DOT_COLOR: Record<number, string> = {
  0: "bg-gray-700",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-500",
  5: "bg-green-500",
};

const ACTION_LABELS: Record<string, { label: string; className: string }> = {
  retain: { label: "Retain", className: "bg-green-100 text-green-800" },
  remove: { label: "Remove", className: "bg-red-100 text-red-800" },
  prune: { label: "Prune", className: "bg-amber-100 text-amber-800" },
  monitor: { label: "Monitor", className: "bg-blue-100 text-blue-800" },
};

function getAppraisedValue(typeSpecificData?: string | null): number | null {
  if (!typeSpecificData) return null;
  try {
    const parsed = JSON.parse(typeSpecificData);
    return typeof parsed.appraisedValue === "number"
      ? parsed.appraisedValue
      : null;
  } catch {
    return null;
  }
}

function sortTrees(
  trees: TreeSummaryItem[],
  key: SortKey,
  dir: SortDir
): TreeSummaryItem[] {
  const sorted = [...trees].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "treeNumber":
        cmp = a.treeNumber - b.treeNumber;
        break;
      case "species":
        cmp = (a.speciesCommon || "").localeCompare(b.speciesCommon || "");
        break;
      case "dbh":
        cmp = (a.dbhInches ?? 0) - (b.dbhInches ?? 0);
        break;
      case "condition":
        cmp = (a.conditionRating ?? -1) - (b.conditionRating ?? -1);
        break;
      case "action":
        cmp = (a.recommendedAction || "").localeCompare(
          b.recommendedAction || ""
        );
        break;
    }
    return dir === "asc" ? cmp : -cmp;
  });
  return sorted;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TreeSummaryPanel({
  trees,
  selectedTreeId,
  onSelectTree,
  reportType,
}: TreeSummaryPanelProps) {
  const [sortKey, setSortKey] = useState<SortKey>("treeNumber");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const protectedCount = trees.filter((t) => t.isProtected).length;
  const showValue = reportType === "tree_valuation";
  const sortedTrees = sortTrees(trees, sortKey, sortDir);

  // Scroll selected row into view when selectedTreeId changes
  useEffect(() => {
    if (selectedTreeId && rowRefs.current[selectedTreeId]) {
      rowRefs.current[selectedTreeId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedTreeId]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortHeader({
    label,
    sortKeyVal,
    className,
  }: {
    label: string;
    sortKeyVal: SortKey;
    className?: string;
  }) {
    const active = sortKey === sortKeyVal;
    return (
      <th
        className={`px-3 py-2 text-left text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors ${className ?? ""}`}
        onClick={() => handleSort(sortKeyVal)}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <ArrowUpDown
            className={`h-3 w-3 ${active ? "text-foreground" : "text-muted-foreground/40"}`}
          />
        </span>
      </th>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <TreePine className="h-4 w-4 text-emerald-600" />
            Site Overview
          </span>
          <div className="flex items-center gap-2">
            {protectedCount > 0 && (
              <Badge variant="outline" className="text-xs gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                {protectedCount} protected
              </Badge>
            )}
            <Badge variant="secondary">{trees.length} trees</Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {trees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2 text-muted-foreground/40" />
            <p>Click the map to add your first tree.</p>
          </div>
        ) : (
          <div className="max-h-72 overflow-y-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <SortHeader label="#" sortKeyVal="treeNumber" className="w-12" />
                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-16">
                    Tag
                  </th>
                  <SortHeader label="Species" sortKeyVal="species" />
                  <SortHeader label="DBH" sortKeyVal="dbh" className="w-16" />
                  <SortHeader label="Condition" sortKeyVal="condition" className="w-24" />
                  <th className="px-3 py-2 text-center text-xs font-medium text-muted-foreground w-8">
                    <ShieldCheck className="h-3.5 w-3.5 mx-auto" />
                  </th>
                  <SortHeader label="Action" sortKeyVal="action" className="w-20" />
                  {showValue && (
                    <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground w-24">
                      Value
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedTrees.map((tree) => {
                  const isSelected = tree.id === selectedTreeId;
                  const action = tree.recommendedAction
                    ? ACTION_LABELS[tree.recommendedAction]
                    : null;
                  const value = showValue
                    ? getAppraisedValue(tree.typeSpecificData)
                    : null;

                  return (
                    <tr
                      key={tree.id}
                      ref={(el) => {
                        rowRefs.current[tree.id] = el;
                      }}
                      onClick={() => onSelectTree(tree.id)}
                      className={`cursor-pointer transition-colors hover:bg-accent ${
                        isSelected
                          ? "bg-emerald-50 dark:bg-emerald-950/20"
                          : ""
                      }`}
                    >
                      <td className="px-3 py-2 font-mono font-semibold text-xs">
                        {tree.treeNumber}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                        {tree.tagNumber || "—"}
                      </td>
                      <td className="px-3 py-2 truncate max-w-[200px]">
                        {tree.speciesCommon || (
                          <span className="text-muted-foreground italic">
                            Unknown
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">
                        {tree.dbhInches != null ? `${tree.dbhInches}"` : "—"}
                      </td>
                      <td className="px-3 py-2">
                        {tree.conditionRating != null && tree.conditionRating >= 0 ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                CONDITION_DOT_COLOR[tree.conditionRating] ?? "bg-gray-400"
                              }`}
                            />
                            <span className="text-xs">
                              {CONDITION_LABELS[tree.conditionRating] ?? tree.conditionRating}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {tree.isProtected ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-600 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {action ? (
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${action.className}`}
                          >
                            {action.label}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      {showValue && (
                        <td className="px-3 py-2 text-right font-mono text-xs">
                          {value != null ? formatter.format(value) : "—"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### components/voice-input.tsx

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());

        // Send to transcription API
        setTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", blob, "recording.webm");

          const res = await fetch("/api/audio/transcribe", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            const { text } = await res.json();
            if (text?.trim()) {
              onTranscript(text.trim());
            }
          }
        } catch (err) {
          console.error("Transcription failed:", err);
        } finally {
          setTranscribing(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={disabled || transcribing}
        onClick={recording ? stopRecording : startRecording}
        className={`h-9 w-9 p-0 ${
          recording
            ? "bg-red-100 text-red-600 animate-pulse ring-2 ring-red-300"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title={recording ? "Stop recording" : "Voice input"}
      >
        {transcribing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : recording ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      {recording && (
        <span className="text-xs font-mono text-red-500 tabular-nums">
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}
```

### components/type-fields/construction-encroachment-fields.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTpzRadius,
  calcSrzRadius,
  PROTECTION_MEASURES,
  type ConstructionEncroachmentData,
} from "@/lib/report-types";

interface ConstructionEncroachmentFieldsProps {
  data: ConstructionEncroachmentData;
  onChange: (data: ConstructionEncroachmentData) => void;
  dbhInches: number;
}

const IMPACT_OPTIONS = [
  { value: "none", label: "None", color: "gray" },
  { value: "minor", label: "Minor", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

const MONITORING_OPTIONS = [
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Bi-annually",
];

export function ConstructionEncroachmentFields({
  data,
  onChange,
  dbhInches,
}: ConstructionEncroachmentFieldsProps) {
  const [overrideEnabled, setOverrideEnabled] = useState(
    data.tpzOverride ?? false
  );

  // Auto-calculate TPZ/SRZ when DBH changes
  useEffect(() => {
    if (dbhInches <= 0) return;
    const tpzRadius = calcTpzRadius(dbhInches);
    const srzRadius = calcSrzRadius(dbhInches);

    if (
      Math.abs((data.tpzRadius ?? 0) - tpzRadius) > 0.01 ||
      Math.abs((data.srzRadius ?? 0) - srzRadius) > 0.01
    ) {
      onChange({ ...data, tpzRadius, srzRadius });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbhInches]);

  function update(partial: Partial<ConstructionEncroachmentData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* TPZ/SRZ Display */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            Protection Zones
          </p>
          <button
            type="button"
            onClick={() => {
              setOverrideEnabled(!overrideEnabled);
              update({ tpzOverride: !overrideEnabled });
            }}
            className="text-[10px] text-blue-600 hover:text-blue-800 underline"
          >
            {overrideEnabled ? "Use auto-calc" : "Manual override"}
          </button>
        </div>

        {!overrideEnabled ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">TPZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.tpzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-700">SRZ Radius</span>
              <span className="font-mono text-sm font-semibold text-blue-800">
                {(data.srzRadius ?? 0).toFixed(1)} ft
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">TPZ</span>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={data.tpzManual ?? data.tpzRadius ?? ""}
                onChange={(e) =>
                  update({
                    tpzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.tpzRadius ?? 0).toFixed(1)})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700 w-12">SRZ</span>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={data.srzManual ?? data.srzRadius ?? ""}
                onChange={(e) =>
                  update({
                    srzManual: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-7 text-xs font-mono flex-1"
              />
              <span className="text-xs text-blue-600">ft</span>
              <span className="text-[10px] text-blue-400">
                (auto: {(data.srzRadius ?? 0).toFixed(1)})
              </span>
            </div>
          </div>
        )}

        {dbhInches <= 0 && (
          <p className="text-[10px] italic text-blue-600">
            Enter DBH above to calculate zones
          </p>
        )}
      </div>

      {/* Encroachment details */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-encroach-desc" className="text-xs">
          Encroachment Description
        </Label>
        <Textarea
          id="tsd-encroach-desc"
          placeholder="Describe the construction activity within the TPZ..."
          value={data.encroachmentDescription ?? ""}
          onChange={(e) =>
            update({ encroachmentDescription: e.target.value })
          }
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-encroach-pct" className="text-xs">
            Encroachment %
          </Label>
          <Input
            id="tsd-encroach-pct"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="0"
            value={data.encroachmentPercent ?? ""}
            onChange={(e) =>
              update({
                encroachmentPercent: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
        <div /> {/* spacer */}
      </div>

      {/* Impact Assessment */}
      <div className="space-y-1.5">
        <Label className="text-xs">Impact Assessment</Label>
        <ButtonSelector
          options={IMPACT_OPTIONS}
          value={data.impactAssessment ?? ""}
          onChange={(v) =>
            update({
              impactAssessment: v as ConstructionEncroachmentData["impactAssessment"],
            })
          }
          size="sm"
        />
      </div>

      {/* Protection Measures */}
      <div className="space-y-1.5">
        <Label className="text-xs">Protection Measures</Label>
        <MultiCheckbox
          options={[...PROTECTION_MEASURES]}
          selected={data.protectionMeasuresList ?? []}
          onChange={(items) => update({ protectionMeasuresList: items })}
        />
      </div>

      {/* Monitoring Frequency */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-monitoring" className="text-xs">
          Monitoring Frequency
        </Label>
        <select
          id="tsd-monitoring"
          value={data.monitoringFrequency ?? ""}
          onChange={(e) =>
            update({ monitoringFrequency: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {MONITORING_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

### components/type-fields/health-assessment-fields.tsx

```tsx
"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import {
  calcTRAQRisk,
  MAINTENANCE_ITEMS,
  type HealthAssessmentData,
} from "@/lib/report-types";

interface HealthAssessmentFieldsProps {
  data: HealthAssessmentData;
  onChange: (data: HealthAssessmentData) => void;
}

const LOF_OPTIONS = [
  { value: "improbable", label: "Improbable", color: "green" },
  { value: "possible", label: "Possible", color: "amber" },
  { value: "probable", label: "Probable", color: "orange" },
  { value: "imminent", label: "Imminent", color: "red" },
];

const LOI_OPTIONS = [
  { value: "very_low", label: "Very Low", color: "green" },
  { value: "low", label: "Low", color: "amber" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "red" },
];

const CONSEQUENCES_OPTIONS = [
  { value: "negligible", label: "Negligible", color: "green" },
  { value: "minor", label: "Minor", color: "amber" },
  { value: "significant", label: "Significant", color: "orange" },
  { value: "severe", label: "Severe", color: "red" },
];

function riskBadgeColor(risk: string): string {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800 border-green-300";
    case "moderate":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "extreme":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
}

export function HealthAssessmentFields({
  data,
  onChange,
}: HealthAssessmentFieldsProps) {
  function update(partial: Partial<HealthAssessmentData>) {
    onChange({ ...data, ...partial });
  }

  // Auto-calculate risk rating
  useEffect(() => {
    const risk = calcTRAQRisk(
      data.likelihoodOfFailure,
      data.likelihoodOfImpact,
      data.consequences
    );
    if (risk && risk !== data.overallRiskRating) {
      onChange({ ...data, overallRiskRating: risk });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.likelihoodOfFailure, data.likelihoodOfImpact, data.consequences]);

  return (
    <div className="space-y-4">
      {/* TRAQ Risk Assessment */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          TRAQ Risk Assessment
        </p>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Failure</Label>
          <ButtonSelector
            options={LOF_OPTIONS}
            value={data.likelihoodOfFailure ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfFailure: v as HealthAssessmentData["likelihoodOfFailure"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Likelihood of Impact</Label>
          <ButtonSelector
            options={LOI_OPTIONS}
            value={data.likelihoodOfImpact ?? ""}
            onChange={(v) =>
              update({
                likelihoodOfImpact: v as HealthAssessmentData["likelihoodOfImpact"],
              })
            }
            size="sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Consequences</Label>
          <ButtonSelector
            options={CONSEQUENCES_OPTIONS}
            value={data.consequences ?? ""}
            onChange={(v) =>
              update({
                consequences: v as HealthAssessmentData["consequences"],
              })
            }
            size="sm"
          />
        </div>

        {/* Auto-calculated risk rating — full-width colored banner */}
        {data.overallRiskRating && (
          <div className={`text-center py-2 rounded-lg border font-semibold text-sm ${riskBadgeColor(data.overallRiskRating)}`}>
            Overall Risk: {data.overallRiskRating.charAt(0).toUpperCase() + data.overallRiskRating.slice(1)}
          </div>
        )}
      </div>

      {/* Target Description */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-target" className="text-xs">
          Target Description
        </Label>
        <Textarea
          id="tsd-target"
          placeholder="Describe the target (people, property, infrastructure)..."
          value={data.targetDescription ?? ""}
          onChange={(e) => update({ targetDescription: e.target.value })}
          rows={2}
        />
      </div>

      {/* Maintenance Items */}
      <div className="space-y-1.5">
        <Label className="text-xs">Maintenance Recommendations</Label>
        <MultiCheckbox
          options={[...MAINTENANCE_ITEMS]}
          selected={data.maintenanceItems ?? []}
          onChange={(items) => update({ maintenanceItems: items })}
        />
      </div>

      {/* Priority & Timeline */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-priority" className="text-xs">
            Priority
          </Label>
          <select
            id="tsd-priority"
            value={data.maintenancePriority ?? ""}
            onChange={(e) =>
              update({
                maintenancePriority: (e.target.value || undefined) as
                  | HealthAssessmentData["maintenancePriority"]
                  | undefined,
              })
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select...</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-timeline" className="text-xs">
            Timeline
          </Label>
          <Input
            id="tsd-timeline"
            placeholder="Within 6 months"
            value={data.maintenanceTimeline ?? ""}
            onChange={(e) => update({ maintenanceTimeline: e.target.value })}
          />
        </div>
      </div>

      {/* Estimated Cost */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost" className="text-xs">
          Estimated Maintenance Cost
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost"
            type="number"
            min="0"
            step="50"
            placeholder="0"
            value={data.estimatedMaintenanceCost ?? ""}
            onChange={(e) =>
              update({
                estimatedMaintenanceCost: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
```

### components/type-fields/removal-permit-fields.tsx

```tsx
"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ButtonSelector } from "@/components/ui/button-selector";
import { MultiCheckbox } from "@/components/ui/multi-checkbox";
import { RISK_FACTORS, type RemovalPermitData } from "@/lib/report-types";

interface RemovalPermitFieldsProps {
  data: RemovalPermitData;
  onChange: (data: RemovalPermitData) => void;
}

const RISK_RATING_OPTIONS = [
  { value: "low", label: "Low", color: "green" },
  { value: "moderate", label: "Moderate", color: "amber" },
  { value: "high", label: "High", color: "orange" },
  { value: "extreme", label: "Extreme", color: "red" },
];

const RETENTION_OPTIONS = [
  { value: "feasible", label: "Feasible", color: "green" },
  { value: "not_feasible", label: "Not Feasible", color: "red" },
  { value: "feasible_with_conditions", label: "With Conditions", color: "amber" },
];

const LIFESPAN_OPTIONS = [
  "< 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const REMOVAL_REASONS = [
  "Dead/Dying",
  "Hazardous",
  "Disease/Pest",
  "Infrastructure Conflict",
  "Development",
  "Declining Beyond Remediation",
  "Other",
];

export function RemovalPermitFields({
  data,
  onChange,
}: RemovalPermitFieldsProps) {
  function update(partial: Partial<RemovalPermitData>) {
    onChange({ ...data, ...partial });
  }

  return (
    <div className="space-y-4">
      {/* Risk Rating */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Rating</Label>
        <ButtonSelector
          options={RISK_RATING_OPTIONS}
          value={data.riskRating ?? ""}
          onChange={(v) =>
            update({
              riskRating: v as RemovalPermitData["riskRating"],
            })
          }
          size="sm"
        />
      </div>

      {/* Risk Factors */}
      <div className="space-y-1.5">
        <Label className="text-xs">Risk Factors</Label>
        <MultiCheckbox
          options={[...RISK_FACTORS]}
          selected={data.riskFactors ?? []}
          onChange={(factors) => update({ riskFactors: factors })}
        />
      </div>

      {/* Primary Removal Reason */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-removal-reason" className="text-xs">
          Primary Removal Reason
        </Label>
        <select
          id="tsd-removal-reason"
          value={data.removalReason ?? ""}
          onChange={(e) => update({ removalReason: e.target.value || undefined })}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select reason...</option>
          {REMOVAL_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Retention Feasibility */}
      <div className="space-y-1.5">
        <Label className="text-xs">Retention Feasibility</Label>
        <ButtonSelector
          options={RETENTION_OPTIONS}
          value={data.retentionFeasibility ?? ""}
          onChange={(v) =>
            update({
              retentionFeasibility: v as RemovalPermitData["retentionFeasibility"],
            })
          }
          size="sm"
        />
        {data.retentionFeasibility === "feasible_with_conditions" && (
          <Textarea
            placeholder="Describe conditions required for retention..."
            value={data.retentionNotes ?? ""}
            onChange={(e) => update({ retentionNotes: e.target.value })}
            rows={2}
            className="mt-2"
          />
        )}
      </div>

      {/* Estimated Remaining Lifespan */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-lifespan" className="text-xs">
          Estimated Remaining Lifespan
        </Label>
        <select
          id="tsd-lifespan"
          value={data.estimatedRemainingLifespan ?? ""}
          onChange={(e) =>
            update({ estimatedRemainingLifespan: e.target.value || undefined })
          }
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Select...</option>
          {LIFESPAN_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

### components/type-fields/tree-valuation-fields.tsx

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  calcTrunkArea,
  calcAppraisedValue,
  conditionToPercent,
  getSpeciesRating,
  type TreeValuationData,
} from "@/lib/report-types";

interface TreeValuationFieldsProps {
  data: TreeValuationData;
  onChange: (data: TreeValuationData) => void;
  dbhInches: number;
  conditionRating: number;
  speciesCommon: string;
}

export function TreeValuationFields({
  data,
  onChange,
  dbhInches,
  conditionRating,
  speciesCommon,
}: TreeValuationFieldsProps) {
  const initializedRef = useRef(false);

  // Auto-populate species rating and condition % on mount (once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const updates: Partial<TreeValuationData> = {};
    if (speciesCommon && data.speciesRating == null) {
      updates.speciesRating = getSpeciesRating(speciesCommon);
    }
    if (conditionRating > 0 && data.conditionRating == null) {
      updates.conditionRating = conditionToPercent(conditionRating);
    }
    if (Object.keys(updates).length > 0) {
      onChange({ ...data, ...updates });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-calculate on DBH or rating changes
  useEffect(() => {
    const trunkArea = dbhInches > 0 ? calcTrunkArea(dbhInches) : 0;
    const costPerSqInch = data.costPerSquareInch ?? 75;
    const speciesRatingVal = data.speciesRating ?? 70;
    const conditionRatingVal = data.conditionRating ?? 70;
    const locationRating = data.locationRating ?? 70;
    const appraisedValue =
      trunkArea > 0
        ? calcAppraisedValue(
            trunkArea,
            costPerSqInch,
            speciesRatingVal,
            conditionRatingVal,
            locationRating
          )
        : 0;

    if (
      Math.abs((data.trunkArea ?? 0) - trunkArea) > 0.01 ||
      Math.abs((data.appraisedValue ?? 0) - appraisedValue) > 0.01
    ) {
      onChange({ ...data, trunkArea, appraisedValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dbhInches,
    data.costPerSquareInch,
    data.speciesRating,
    data.conditionRating,
    data.locationRating,
  ]);

  function update(partial: Partial<TreeValuationData>) {
    onChange({ ...data, ...partial });
  }

  const suggestedSpecies = speciesCommon
    ? getSpeciesRating(speciesCommon)
    : null;
  const suggestedCondition =
    conditionRating > 0 ? conditionToPercent(conditionRating) : null;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-4">
      {/* Valuation Method (read-only) */}
      <div className="space-y-1.5">
        <Label className="text-xs">Valuation Method</Label>
        <div className="flex h-9 w-full items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
          CTLA Trunk Formula
        </div>
      </div>

      {/* Rating inputs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsd-species-rating" className="text-xs">
            Species %
          </Label>
          <Input
            id="tsd-species-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.speciesRating ?? ""}
            onChange={(e) =>
              update({
                speciesRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
          {suggestedSpecies != null && (
            <p className="text-[10px] text-muted-foreground">
              Suggested: {suggestedSpecies}%
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-condition-rating" className="text-xs">
            Condition %
          </Label>
          <Input
            id="tsd-condition-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.conditionRating ?? ""}
            onChange={(e) =>
              update({
                conditionRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
          {suggestedCondition != null && (
            <p className="text-[10px] text-muted-foreground">
              From rating: {suggestedCondition}%
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tsd-location-rating" className="text-xs">
            Location %
          </Label>
          <Input
            id="tsd-location-rating"
            type="number"
            min="0"
            max="100"
            step="5"
            placeholder="70"
            value={data.locationRating ?? ""}
            onChange={(e) =>
              update({
                locationRating: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="font-mono"
          />
        </div>
      </div>

      {/* Cost per sq inch */}
      <div className="space-y-1.5">
        <Label htmlFor="tsd-cost-sq-in" className="text-xs">
          Cost per Sq Inch (Regional Rate)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="tsd-cost-sq-in"
            type="number"
            min="0"
            step="5"
            placeholder="75"
            value={data.costPerSquareInch ?? ""}
            onChange={(e) =>
              update({
                costPerSquareInch: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="pl-7 font-mono"
          />
        </div>
      </div>

      {/* Auto-calculated values */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
          Auto-Calculated
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Trunk Area</span>
          <span className="font-mono text-sm font-semibold text-emerald-800">
            {(data.trunkArea ?? 0).toFixed(1)} sq in
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700">Appraised Value</span>
          <span className="font-mono text-lg font-bold text-emerald-800">
            {formatter.format(data.appraisedValue ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
```

### components/ui/avatar.tsx

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

### components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

### components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### components/ui/button-selector.tsx

```tsx
"use client";

interface ButtonOption {
  value: string;
  label: string;
  color?: string; // Tailwind color prefix e.g. "red", "amber", "green"
}

interface ButtonSelectorProps {
  options: ButtonOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

function getSelectedClasses(color?: string): string {
  switch (color) {
    case "red":
      return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case "orange":
      return "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
    case "amber":
      return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    case "green":
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case "blue":
      return "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    case "gray":
      return "border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
  }
}

export function ButtonSelector({
  options,
  value,
  onChange,
  size = "md",
}: ButtonSelectorProps) {
  const isSm = size === "sm";

  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border-2 font-medium transition-colors ${
              isSm ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
            } ${
              isSelected
                ? getSelectedClasses(opt.color)
                : "border-muted hover:border-muted-foreground/40"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
```

### components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### components/ui/command.tsx

```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

### components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

### components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

### components/ui/form.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

### components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

### components/ui/label.tsx

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

### components/ui/multi-checkbox.tsx

```tsx
"use client";

interface MultiCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2;
  exclusiveOption?: string;
}

export function MultiCheckbox({
  options,
  selected,
  onChange,
  columns = 2,
  exclusiveOption,
}: MultiCheckboxProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      // Unchecking
      onChange(selected.filter((s) => s !== option));
    } else {
      // Checking
      if (exclusiveOption && option === exclusiveOption) {
        // Exclusive option selected — uncheck all others
        onChange([exclusiveOption]);
      } else if (exclusiveOption && selected.includes(exclusiveOption)) {
        // Non-exclusive selected while exclusive is checked — remove exclusive
        onChange(
          selected.filter((s) => s !== exclusiveOption).concat(option)
        );
      } else {
        onChange([...selected, option]);
      }
    }
  }

  return (
    <div
      className={`grid gap-x-3 gap-y-1.5 ${
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-xs cursor-pointer min-h-[40px] md:min-h-0"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="rounded border-input h-3.5 w-3.5 shrink-0"
          />
          <span className="leading-tight">{option}</span>
        </label>
      ))}
    </div>
  );
}
```

### components/ui/popover.tsx

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
```

### components/ui/progress.tsx

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

### components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

### components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

### components/ui/separator.tsx

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

### components/ui/sheet.tsx

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

### components/ui/switch.tsx

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

### components/ui/table.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

### components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

### components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
```

### components/ui/toast.tsx

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

### components/ui/toaster.tsx

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

### components/ui/tooltip.tsx

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```
