# TreeCertify

AI-assisted report generation for ISA-certified arborists on the SF Peninsula.

TreeCertify streamlines the creation of professional tree assessment reports — from field data collection with voice dictation and photo annotation to PDF export with ISA-standard TRAQ forms. Built for arborists who need to produce removal permits, health assessments, tree valuations, and construction encroachment analyses.

## Features

### AI-Powered Report Generation
- Claude (Anthropic) drafts full arborist reports from tree assessment data
- Type-specific prompts for removal permits, health assessments, valuations, and construction impact
- Editable markdown drafts — review and refine before certification

### Smart Field Dictation
- Record voice notes in the field using your phone or laptop
- OpenAI Whisper transcribes audio to text
- Claude parses transcriptions into structured fields (species, DBH, condition, notes)
- Fields auto-populate in the tree assessment form

### Interactive Satellite Maps
- Mapbox GL satellite view of each property
- Click to place tree pins, drag to reposition
- Condition-based pin colors (green = excellent, red = dead/remove)
- Protection and heritage tree indicators (colored outlines)
- TPZ/SRZ circle overlays for construction encroachment projects
- Style toggle: Satellite, Streets, Outdoors

### ISA TRAQ Risk Assessment
- Full TRAQ Level 2 Basic Assessment fields
- Likelihood of Failure, Likelihood of Impact, Consequences
- Auto-calculated risk rating using both ISA matrices
- Rendered as a faithful ISA form in PDF output with matrix cell highlighting

### CTLA Tree Valuation
- Council of Tree & Landscape Appraisers Trunk Formula Method
- Species rating lookup for California trees
- Auto-calculates: trunk area, species rating, condition %, appraised value
- Aggregate property-level valuation summary

### Construction Encroachment Analysis
- Auto-calculated TPZ and SRZ radii per ISA/ANSI A300 standards
- Manual override with side-by-side comparison to calculated values
- Impact assessment ratings
- Protection measures checklist and monitoring frequency

### Municipal Ordinance Enforcement
- Database of SF Peninsula city tree protection ordinances
- Auto-checks if a tree is protected by species, DBH threshold, or heritage status
- Flags mitigation requirements (replanting ratios, in-lieu fees)
- Integrated into the removal permit workflow with override capability

### Photo Documentation & Annotation
- Upload multiple photos per tree with captions and sort ordering
- Fabric.js annotation editor — draw arrows, circles, and text on photos to mark defects
- Annotated and original photos embedded in PDF reports

### PDF & Word Export
- Puppeteer-generated PDF with cover page, report body, tree inventory, and photos
- ISA TRAQ form appendix with both risk matrices
- Word (.docx) export for clients who need editable documents
- E-signature certification with ISA credential number

### Property Sharing
- Generate unique share links for read-only property access
- Clients and stakeholders can view property maps and tree data without login

### Dashboard & Workflow
- Activity feed with recent properties and overdue reports
- Quick-action cards for reports ready to certify
- Property list with city and report type filters
- CSV export of tree inventory data

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Database | PostgreSQL (Neon) via Prisma 5 |
| Auth | Clerk |
| UI | Tailwind CSS + shadcn/ui (Radix primitives) |
| Maps | Mapbox GL JS |
| AI | Anthropic Claude (reports & parsing) |
| Speech | OpenAI Whisper (transcription) |
| PDF | Puppeteer (HTML-to-PDF) |
| Word | docx library |
| Annotation | Fabric.js (canvas editor) |
| Icons | Lucide React |
| Validation | Zod + React Hook Form |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) serverless Postgres)
- Clerk account for authentication
- Mapbox account for satellite maps
- Anthropic API key for AI report generation
- OpenAI API key for audio transcription

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Mapbox (satellite maps)
NEXT_PUBLIC_MAPBOX_TOKEN="pk...."

# Anthropic (AI report generation & audio parsing)
ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI (Whisper audio transcription)
OPENAI_API_KEY="sk-..."
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client and run migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
treecertify/
├── app/
│   ├── (app)/                    # Protected routes (Clerk auth required)
│   │   ├── dashboard/            # Main dashboard
│   │   ├── properties/           # Property CRUD + detail + report editor
│   │   ├── settings/             # Arborist profile & preferences
│   │   └── ordinances/           # Municipal ordinance browser
│   ├── api/
│   │   ├── ai/generate-report/   # Claude report generation
│   │   ├── arborist/             # Profile, logo, photo upload
│   │   ├── audio/                # Whisper transcription & Claude parsing
│   │   ├── geocode/              # Address-to-coordinates
│   │   ├── ordinances/           # Ordinance CRUD + protection check
│   │   ├── properties/           # Property CRUD, trees, photos, audio
│   │   ├── reports/              # Report CRUD, PDF, Word, certify
│   │   └── uploads/              # Static file serving
│   ├── onboarding/               # New user setup
│   ├── share/[token]/            # Public read-only property view
│   ├── sign-in/                  # Clerk login
│   └── sign-up/                  # Clerk registration
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── type-fields/              # Report-type-specific form sections
│   ├── property-map.tsx          # Mapbox GL map component
│   ├── property-map-view.tsx     # Full-page map + side panels
│   ├── tree-side-panel.tsx       # Tree assessment editor
│   ├── tree-summary-panel.tsx    # Sortable tree inventory table
│   ├── condition-rating.tsx      # 0-5 condition selector
│   ├── smart-dictation.tsx       # Voice input with AI parsing
│   ├── photo-markup-editor.tsx   # Fabric.js annotation canvas
│   └── report-preview.tsx        # Markdown report preview
├── lib/
│   ├── report-types.ts           # Type definitions, TRAQ/CTLA calculations
│   ├── report-templates.ts       # Per-type sections & AI prompts
│   ├── species.ts                # Peninsula tree species database (150+)
│   ├── ordinances.ts             # Protection check logic
│   ├── uploads.ts                # File handling & MIME validation
│   ├── markdown.ts               # Markdown-to-HTML renderer
│   ├── auth.ts                   # Clerk helper functions
│   └── db.ts                     # Prisma singleton
├── prisma/
│   └── schema.prisma             # Database schema (8 models)
├── middleware.ts                  # Clerk route protection
└── uploads/                      # User-uploaded media (gitignored)
```

## Database Models

| Model | Description |
|-------|-------------|
| `Arborist` | ISA-certified user profile with company branding and credentials |
| `Property` | Assessed property with location, homeowner, and report type |
| `TreeRecord` | Individual tree with measurements, condition, and type-specific data |
| `TreePhoto` | Tree photos with optional Fabric.js annotations |
| `TreeAudioNote` | Voice recordings with Whisper transcriptions |
| `PropertyAudioNote` | Property-level audio notes |
| `MunicipalOrdinance` | City tree protection rules (thresholds, mitigation, heritage) |
| `Report` | Generated report with AI draft, final content, and certification |

## Report Types

| Type | Use Case |
|------|----------|
| **Health Assessment** | General tree health evaluation with optional TRAQ risk analysis |
| **Removal Permit** | Justification for tree removal with retention feasibility analysis |
| **Tree Valuation** | CTLA Trunk Formula appraisal for insurance or development |
| **Construction Encroachment** | Impact analysis with TPZ/SRZ calculations and protection plans |

## License

Private. All rights reserved.
