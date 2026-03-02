# TreeCertify — Project Summary

**Generated:** March 2, 2026
**Repository:** https://github.com/andrew-hotsko/treecertify
**Branch:** main
**Latest Commit:** `ce84970` — Update map pins to color by condition rating instead of completion status

---

## Overview

TreeCertify is an AI-assisted arborist operating system designed for ISA-certified arborists on the San Francisco Peninsula. It automates the full lifecycle of tree assessment reporting — from field data capture (voice dictation, photo annotation, interactive maps) to AI-drafted reports, PDF/Word export, and digital certification.

---

## Project Metrics

| Metric | Value |
|--------|-------|
| Total Commits | 29 |
| TypeScript/TSX Lines | ~30,800 |
| Prisma Models | 8 |
| React Components | 46 |
| API Routes | 32 |
| App Pages | 10 |
| Library Modules | 22 |

---

## Architecture

```
Next.js 14 App Router
├── Clerk Auth (middleware-based route protection)
├── PostgreSQL via Prisma 5 ORM
├── Anthropic Claude (AI report drafting + audio field parsing)
├── OpenAI Whisper (audio-to-text transcription)
├── Mapbox GL JS (satellite property maps with tree pins)
├── Puppeteer (HTML-to-PDF generation)
├── Fabric.js (photo annotation canvas)
└── shadcn/ui + Tailwind CSS (component library)
```

---

## Feature Inventory

### Core Workflow
- **Property Management** — Create properties with address, homeowner, parcel info, geocoded coordinates
- **Tree Assessment** — Click-to-place pins on satellite map, assess each tree (species, DBH, height, canopy, condition 0-5, health/structural notes)
- **AI Report Generation** — Claude drafts full arborist reports from structured tree data with type-specific prompts
- **Report Editing** — Markdown editor with live HTML preview, section-by-section refinement
- **Digital Certification** — E-signature with ISA credential number, locks report as certified
- **PDF Export** — Professional multi-page PDF via Puppeteer with cover page, report body, tree inventory table, photos, and TRAQ appendix
- **Word Export** — .docx generation for clients needing editable documents

### Report Types
| Type | Key Features |
|------|-------------|
| Health Assessment | TRAQ Level 2 risk fields, ISA risk matrices, maintenance items checklist |
| Removal Permit | Retention feasibility analysis, risk factors, ordinance integration |
| Tree Valuation | CTLA Trunk Formula with auto-calculated species rating, condition %, trunk area, appraised value |
| Construction Encroachment | Auto TPZ/SRZ radii (AS4970/ISA), manual overrides, protection measures, monitoring |

### Field Data Collection
- **Smart Dictation** — Record audio in the field, Whisper transcribes, Claude parses to structured fields (species, DBH, condition, notes), auto-populates form
- **Photo Upload & Annotation** — Multiple photos per tree with captions, Fabric.js canvas for marking defects with arrows/circles/text
- **Audio Notes** — Property-level and tree-level voice memos with transcription

### Map & Visualization
- **Satellite Property Map** — Mapbox GL with click-to-add pins, drag-to-reposition
- **Condition-Based Pin Colors** — Green (excellent) through red (dead/critical/remove), gray (unassessed)
- **Protection Indicators** — Green outline = protected, gold outline = heritage
- **TPZ/SRZ Overlays** — Dashed orange (TPZ) and solid red (SRZ) circles for construction projects
- **Style Toggle** — Satellite, Streets, Outdoors views
- **flyTo Animation** — Click table row to fly to tree on map

### Regulatory Compliance
- **Municipal Ordinance Database** — SF Peninsula city tree protection rules
- **Auto Protection Check** — Evaluates species, DBH, heritage status against city ordinances
- **Mitigation Tracking** — Replanting ratios, in-lieu fees, permit requirements
- **Arborist Override** — Professional judgment override with documented rationale

### User Experience
- **Dashboard** — Activity feed, overdue reports, ready-to-certify cards
- **Property List** — Filterable by city, report type, with search
- **Tree Summary Table** — Sortable columns (species, DBH, condition, action, value), click-to-select synced with map
- **Onboarding Flow** — New arborist setup with ISA credentials, company info
- **Settings** — Profile photo, company logo, certification management, report template defaults
- **Public Sharing** — Unique token-based read-only links for clients
- **CSV Export** — Tree inventory data export

---

## Data Model

```
Arborist (1) ──── (N) Property (1) ──── (N) TreeRecord
    │                    │                       │
    │                    ├── (N) Report           ├── (N) TreePhoto
    │                    └── (N) PropertyAudioNote└── (N) TreeAudioNote
    └── (N) Report

MunicipalOrdinance (standalone — city protection rules)
```

### Key Fields per Model

**Arborist:** clerkUserId, ISA cert#, company info, TRAQ certified flag, report defaults (JSON)

**Property:** address/coordinates, homeowner, reportType, scopeOfAssignment, siteObservations, shareToken, status

**TreeRecord:** treeNumber, tagNumber, species, DBH, height, canopy, conditionRating (0-5), health/structural notes, recommendedAction (retain/remove/prune/monitor), isProtected, typeSpecificData (JSON)

**Report:** reportType, status (draft/review/certified/filed), aiDraftContent (markdown), finalContent, reportOptions (JSON: includeTraq, includeCoverLetter), certifiedAt

---

## API Surface

### Authentication & Profile (4 routes)
`POST /api/arborist/onboard` | `GET|PUT /api/arborist/profile` | `POST /api/arborist/logo` | `POST /api/arborist/photo`

### Properties (4 routes)
`GET|POST /api/properties` | `GET|PUT /api/properties/[id]` | `POST /api/properties/[id]/share` | `GET /api/properties/[id]/trees/export`

### Trees (3 routes)
`GET|POST /api/properties/[id]/trees` | `GET|PUT|DELETE /api/properties/[id]/trees/[treeId]`

### Tree Photos (4 routes)
`POST .../photos` | `DELETE .../photos/[photoId]` | `POST .../photos/reorder` | `POST .../photos/[photoId]/annotate`

### Audio (8 routes)
`POST /api/audio/transcribe` | `POST /api/audio/parse` | Tree-level: upload, delete, transcribe | Property-level: upload, delete, transcribe

### Reports (5 routes)
`GET|POST /api/reports` | `GET|PUT /api/reports/[id]` | `POST .../certify` | `GET .../pdf` | `GET .../word`

### AI (1 route)
`POST /api/ai/generate-report`

### Ordinances & Utility (3 routes)
`GET|POST /api/ordinances` | `POST /api/ordinances/check` | `POST /api/geocode`

---

## Development Sessions (Commit History)

| # | Commit | Session Focus |
|---|--------|---------------|
| 1 | `23d9f52` | Initial platform: Prisma schema, basic CRUD, property/tree management |
| 2 | `a5b2413` | Clerk authentication with onboarding flow |
| 3 | `4713978` | Tree assessment overhaul, map pins, AI report generation |
| 4 | `26a3050` | Report editor, certification, PDF export pipeline |
| 5 | `4ae1f84` | Puppeteer PDF, share button, download fixes |
| 6 | `30116f8` | Demo polish, UX cleanup |
| 7 | `e9a7aa9` | Professional PDF output quality |
| 8 | `48724bf` | AI report quality hardening, dedup sections |
| 9 | `8cd885d` | Mobile responsiveness across all views |
| 10 | `58c177a` | Onboarding polish, sample property for new users |
| 11 | `53157e8` | Dashboard pipeline, neededByDate, properties list upgrade |
| 12 | `ce30d1f` | Sleek pins, species shortcuts, quick-entry, quality check |
| 13 | `dec7193` | Streaming AI generation, report delivery, ordinance popovers |
| 14 | `1739564` | SQLite-to-PostgreSQL (Neon) migration |
| 15 | `9ba8216` | TRAQ forms, permit cover letter, mitigation table, credentials |
| 16 | `2d9d507` | Map tooltips, tree list panel, filter chips, legend, voice input |
| 17 | `bf02d97` | Tree inventory CSV export |
| 18 | `6c3bf86` | Ordinance-driven permit workflow with requirements |
| 19 | `947dd5d` | Report template defaults in settings |
| 20 | `76f31a4` | Shareable property map (public share page) |
| 21 | `de1014e` | Arborist profile photo upload |
| 22 | `e466649` | Smart dictation with Claude parsing |
| 23 | `b932e1a` | UI polish: spinners, scrollbars, mobile safe area |
| 24 | `e179227` | Session 9B: TRAQ risk banner, map style toggle, certification ceremony, split view, activity feed, filters, connectivity |
| 25 | `0867f5c` | Bug fixes: map pin offset, PDF photos (base64), TRAQ form ISA overhaul |
| 26 | `ce84970` | Map pins: condition-based coloring instead of completion status |

---

## Environment Requirements

```env
DATABASE_URL                          # PostgreSQL (Neon recommended)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY     # Clerk public key
CLERK_SECRET_KEY                      # Clerk secret key
NEXT_PUBLIC_MAPBOX_TOKEN              # Mapbox GL public token
ANTHROPIC_API_KEY                     # Claude API key
OPENAI_API_KEY                        # Whisper API key
```

---

## Key Technical Decisions

1. **Markdown as report source of truth** — AI generates markdown, arborist edits markdown, renders to HTML/PDF/Word from single source
2. **JSON typeSpecificData** — Flexible per-report-type fields without schema changes for each type
3. **Base64 photo embedding in PDF** — Puppeteer can't access Next.js API routes; photos converted to data URIs
4. **Condition-based pin colors** — Professional color coding (green-to-red gradient) replaces completion-based coloring
5. **ISA TRAQ form reproduction** — Faithful rendering of both ISA risk matrices with computed cell highlighting in PDF
6. **Cascading deletes** — Property deletion cleanly removes all child trees, photos, audio, and reports
7. **Dynamic imports** — Mapbox GL and Fabric.js loaded client-side only (SSR incompatible)
