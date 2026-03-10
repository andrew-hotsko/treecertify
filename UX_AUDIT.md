# TreeCertify UX Audit

**Date:** 2026-03-10
**Phase:** 1 of 4 (UX Audit & Information Architecture)
**Methodology:** Code-level flow tracing, component analysis, information architecture review
**Agents:** UX Architect, UX Researcher (Claude Opus 4.6)

---

## Table of Contents

1. [Screen Inventory](#1-screen-inventory)
2. [Flow Maps](#2-flow-maps)
3. [Two-Mode Experience Analysis](#3-two-mode-experience-analysis)
4. [Information Architecture Review](#4-information-architecture-review)
5. [Prioritized Friction List](#5-prioritized-friction-list)
6. [Recommendations by Effort](#6-recommendations-by-effort)

---

## 1. Screen Inventory

### 1.1 All Pages

| # | Route | Purpose | Rendering | Has loading.tsx | Mobile-Aware |
|---|-------|---------|-----------|-----------------|--------------|
| 1 | `/` | Landing/sign-in; redirects auth'd users to dashboard | RSC | No | Centered layout |
| 2 | `/onboarding` | 3-step first-run (credentials, sample preview, first property) | Client | No | Full-width cards |
| 3 | `/dashboard` | Hub: stats, activity feed, permit pipeline, next actions | RSC → Client | Yes | 2-col → 1-col grid |
| 4 | `/properties` | Filterable/searchable property list with status badges | RSC → Client | Yes | Full-width cards |
| 5 | `/properties/new` | Report type selection + address entry → creates property | Client | No (parent covers) | 1-col form grid |
| 6 | `/properties/[id]` | Full-screen Mapbox map + tree assessment (side panel or field mode) | RSC → Dynamic Client (no SSR) | Yes | Field mode < 768px |
| 7 | `/properties/[id]/report` | Report lifecycle: AI gen, editing, certification, versioning, billing | Client | No | Quick Review only |
| 8 | `/settings` | 12 cards: profile, company, observations, species, billing, AI style, etc. | Client | Yes | 1-col form grids |
| 9 | `/ordinances` | Read-only municipal tree protection reference (21 cities) | RSC | No | Scroll-wrapped tables |
| 10 | `/admin` | Platform analytics (gated by ADMIN_ARBORIST_ID) | RSC | No | Basic responsive |
| 11 | `/share/[token]` | Public homeowner view: branded report summary, next steps, PDF download | RSC (cached) | No | max-w-2xl, full-width CTA |

### 1.2 Component Inventory (58 total)

**Business Components (27):** DashboardContent, PropertiesList, PropertyMapView, PropertyMap, TreeSidePanel, MobileFieldMode, TreeSummaryPanel, TreePhotos, ReportPreview, QuickReview, PermitStatusPipeline, SubmissionChecklistDialog, StatusBadge, SpeciesSearch, ConditionRating, VoiceInput, SmartDictation, FeedbackButton, ConnectivityIndicator, AppProviders, ErrorBoundary, Sidebar, MobileNav, OnboardingHint, PhotoMarkupEditor, TreeAudioNotes, PropertyAudioNotes

**Type-Specific Fields (4):** RemovalPermitFields, HealthAssessmentFields, ConstructionEncroachmentFields, TreeValuationFields

**UI Primitives (27 shadcn/ui):** Button, Input, Label, Select, Textarea, Badge, Card, Dialog, AlertDialog, Sheet, Tabs, Table, Separator, ScrollArea, DropdownMenu, Tooltip, Progress, Avatar, Popover, Form, Command, Switch, Checkbox, Toast, Toaster, Skeleton, ButtonSelector, MultiCheckbox

### 1.3 API Routes (49 files, ~75 handlers)

| Category | Routes | Key Endpoints |
|----------|--------|---------------|
| AI | 2 | generate-report (SSE), regenerate-tree-section |
| Arborist | 5 | profile CRUD, logo/photo upload, onboarding, usage stats |
| Properties | 16 | CRUD, trees, photos, audio, share tokens, valuation defaults |
| Reports | 9 | CRUD, certify/amend, PDF/Word, validate, versions |
| Audio | 2 | transcribe (Whisper), smart parse (Claude) |
| Settings | 4 | observations, species, PDF/share, valuation |
| Ordinances | 2 | list, check protection |
| Invoices | 3 | CRUD + PDF (dormant, no UI) |
| Other | 4 | geocode, uploads, feedback, sample report |

### 1.4 Navigation Structure

**Desktop:** Fixed dark sidebar (256px, `hidden md:flex`) with logo, "New Property" CTA, 4 nav items (Dashboard, Properties, Ordinances, Settings), conditional Admin link, Sample Report link, user info with online indicator.

**Mobile:** Top bar (h-14, `md:hidden`) with hamburger → slide-out sidebar overlay. Same nav items. Safe-area padding at bottom. Closes on navigation.

**Route protection:** Clerk middleware protects all routes except `/`, `/sign-in`, `/sign-up`, `/share/*`, `/api/uploads/*`, `/api/reports/*/pdf`, `/api/invoices/*/pdf`. App layout redirects to `/onboarding` if `hasCompletedOnboarding` is false.

```
Landing (/) ──[auth?]──▶ Dashboard (/dashboard)
       │                      │
       ▼ (no auth)     ┌──────┼──────┬──────────┐
    Sign In (Clerk)     ▼      ▼      ▼          ▼
       │            Properties Settings Ordinances Admin
       ▼ (first login)     │
    Onboarding (/onboarding)│
       │                    ▼
       ▼              Property Detail ──▶ Report Editor
    Dashboard         (/properties/[id])   (/properties/[id]/report)
                                                  │
                                           ┌──────┴──────┐
                                           ▼              ▼
                                    Share Page      PDF Download
                                 (/share/[token])
```

---

## 2. Flow Maps

### Flow 1: New User Onboarding → First Property → First Tree → First Report

| Step | Screen | Action | Clicks | Wait |
|------|--------|--------|--------|------|
| 1 | `/` | Sign up via Clerk | 2-3 | Auth redirect |
| 2 | `/onboarding` (loading) | Spinner while profile loads | 0 | ~1s |
| 3 | Step 1: "Your Info" | Fill name, ISA cert #, service area dropdown | 3 fields | — |
| 4 | Step 1: "Your Info" | Click "Continue" | 1 | POST save ~1s |
| 5 | Step 2: "See It In Action" | Read static sample report preview | 0 | — |
| 6 | Step 2: "See It In Action" | Click "Continue" | 1 | — |
| 7 | Step 3: "First Assessment" | Enter address, city, select report type | 3 fields + 1 select | — |
| 8 | Step 3: "First Assessment" | Click "Create Assessment" | 1 | Geocode + create ~2s |
| 9 | `/properties/[id]` | Map loads, see contextual hint | 0 | Map tiles ~1-2s |
| 10 | Map | Tap to place first tree pin | 1 | — |
| 11 | TreeSidePanel / FieldMode | Enter species, DBH, condition | 3-5 | — |
| 12 | TreeSidePanel / FieldMode | Save tree | 1 | ~0.5s |
| 13 | Map | Click "Report" button in toolbar | 1 | Navigation |
| 14 | `/properties/[id]/report` | Click "Generate AI Draft" | 1 | — |
| 15 | Report generation | Watch streaming AI output | 0 | **30-60s** |
| 16 | Report editor | Report loaded in split view | 0 | — |

**Total clicks: 16-19 | Total waits: 5 (largest: AI generation 30-60s)**
**Time to first "aha": ~3-5 minutes (seeing AI-written report)**

**Friction points in this flow:**
- Step 2 is passive — user just reads and clicks Continue. No agency.
- Step 7: city validation shows a warning for 16 of 21 supported cities because `SUPPORTED_CITIES` only lists 5. Discouraging.
- Step 7: No state/zip fields — state hardcoded to "CA". Fails silently for Reno (NV) or Tahoe users.
- Step 8: "Create Assessment" button text is misleading — they're creating a property, not an assessment.
- Step 10→12: No way to take photos during first tree entry (photos require a saved tree).

### Flow 2: Returning User Dashboard → Continue Existing Report

| Step | Screen | Action | Clicks | Wait |
|------|--------|--------|--------|------|
| 1 | `/dashboard` | Skeleton loads | 0 | ~1s |
| 2 | Dashboard | Scan stat cards, "Next Action Needed" | 0 | — |
| 3a | *If ≤3 certifiable* | Click specific property's Quick Review link | 1 | Navigation |
| 3b | *If >3 certifiable* | Click "N reports ready to certify" → `/properties?status=inProgress` | 1 | Navigation |
| 4b | Properties list | Find property, click it | 1 | Navigation |
| 5b | Property detail | Click "Report" button | 1 | Navigation |
| 6 | Report page | Continue editing or certify | 0 | — |

**Optimal path: 1 click (Quick Review deep link). Worst case: 3 clicks.**

**Friction points:**
- "Need tree assessment" and "Need report" items link to filtered property lists (`/properties?status=inProgress`), not specific properties. Adds +1-2 clicks.
- Welcome states (`no_trees`, `no_reports`) have "View Properties" CTA — 2 clicks from the action.
- Dashboard caps at 20 properties with no "showing 20 of N" indicator.
- Permit Pipeline doesn't appear until at least one report has a permit status — missed opportunity to prompt submission.
- Context message gap: user with trees but no reports sees no guidance.

### Flow 3: Field Mode — Arrive at Property → Enter 5+ Trees Rapidly

| Step | Screen | Action | Taps | Wait |
|------|--------|--------|------|------|
| 1 | `/properties/[id]` | Map loads | 0 | ~1-2s |
| 2 | Map | Tap to place pin | 1 | — |
| 3 | Field Mode opens (full screen) | Auto-scroll to Species | 0 | — |
| 4 | Species | Tap recent species chip | 1 | — |
| 5 | Measurements | Tap DBH field, type number | 1 + typing | — |
| 6 | Condition | Tap condition button (0-5) | 1 | Haptic + auto-scroll |
| 7 | Observations | Tap "No significant concerns" | 1 | — |
| 8 | Action | Auto-selected from recommendation map | 0 | — |
| 9 | Bottom bar | Tap "Save & Next Tree" | 1 | ~0.5s save |
| 10 | Form resets, new pin at map center | Repeat from step 4 | 0 | — |

**Per tree (after first): 5 taps minimum (species + DBH + condition + observations + save)**
**5 trees total: ~25 taps, ~3 minutes**

**Friction points:**
- **P0: Photos cannot be taken on new trees.** Camera button only rendered for saved trees (`!isNewTree && tree?.id`). Shows "Save the tree first to add photos." Breaks natural field workflow of photograph → assess → save. Forces two-pass: save, reopen, photograph.
- Progress dots are 10px (`h-2.5 w-2.5`) with `gap-1.5`. Below 44px touch target. Hard to tap in outdoor conditions.
- Connectivity indicator is an 8px dot (`h-2 w-2`) — nearly invisible outdoors.
- Auto-scroll after condition select moves user away from measurements section if they want to edit.
- "Copy from previous tree" copies species AND measurements (including DBH). Species-only copy would be more useful for rows of same species.
- Draft auto-save is 30s interval to localStorage only. App crash within 30s loses data. No server sync.

### Flow 4: Report Generation → Review → Certify → Export PDF

| Step | Screen | Action | Clicks | Wait |
|------|--------|--------|--------|------|
| 1 | Report page (no report) | See "Generate AI Report" card | 0 | — |
| 2 | | Click "Generate AI Draft" | 1 | — |
| 3 | Data quality dialog (if warnings) | Review warnings, click "Generate Anyway" | 1-2 | — |
| 4 | Streaming modal | Watch AI write report | 0 | **30-60s** |
| 5 | Editor (split view) | Review/edit report | varies | — |
| 6 | Toolbar | Click "Certify" | 1 | — |
| 7 | Ceremony Step 1: Review | See validation checklist, check "I have reviewed" | 1 | — |
| 8 | | Click "Next: Attestation" | 1 | — |
| 9 | Ceremony Step 2: Attest | Read statement, check "I agree" | 1 | — |
| 10 | | Click "Next: Sign" | 1 | — |
| 11 | Ceremony Step 3: Sign | Type signature name | typing | — |
| 12 | | Click "Certify Report" | 1 | ~1-2s |
| 13 | Completion modal | See Share + Download buttons | 0 | — |
| 14 | | Click "Download PDF" | 1 | **5-10s Puppeteer** |

**Total clicks: 9-11 (generation + certification). Total waits: 2 (AI: 30-60s, PDF: 5-10s)**

**Friction points:**
- **P1: Certification "Fix" links navigate away from dialog.** Validation failures show "Fix" with ExternalLink icon — clicking navigates to the property page, losing the certification dialog. Must re-navigate to report, re-open dialog, re-verify. +3-5 clicks on mobile.
- Report page is a ~2900-line client component with 45+ `useState` calls. Handles editing, certification, billing, listing info, delivery, versioning, amendments, validation, per-tree regeneration, Quick Review — all in one file. Slow to render on mobile.
- Signature must match `arborist.signatureName` if set (case-insensitive). New users who haven't set this in settings get any-text behavior. Inconsistent.
- Regenerate confirmation uses `window.confirm` — only instance in the app. All other destructive actions use styled AlertDialog.
- Mobile: Edit/Split/Preview view modes are `hidden sm:flex`. Only Quick Review visible on mobile. No way to access formatted preview on phone.
- PDF download has no progress bar. Button shows spinner for 5-10 seconds with no time estimate.
- Save errors shown as amber bar at top of toolbar — if user is scrolled into editor, they miss it.

### Flow 5: Homeowner Receives Share Link → Views Report → Understands Next Steps

| Step | Screen | What They See | Interaction |
|------|--------|---------------|-------------|
| 1 | Open share link | Branded header (logo, report type, address, arborist credentials) | Read |
| 2 | | Client note from arborist (if set) | Read |
| 3 | | Summary stats (2x2 grid, varies by report type) | Read |
| 4 | | Permit status pipeline (if submitted) | Read |
| 5 | | Permit processing timeline (removal/construction only) | Read |
| 6 | | Tree cards (species, measurements, condition, action, protected badge) | Read |
| 7 | | "What Happens Next" section (city-specific) | Tap phone/email links |
| 8 | | PDF Download button | 1 click |
| 9 | | Billing section (if included) | Read |
| 10 | | Arborist contact card | Tap-to-call/email |
| 11 | | Footer ("Powered by TreeCertify") | — |

**If NOT certified:** Sees DRAFT header, amber "still being prepared" banner, tree count only. No report content, no next steps, no PDF. Only arborist contact.

**Friction points:**
- **P1: Uncertified share page is a dead end.** Homeowner sees almost nothing — no progress indicator, no estimated completion, no notification opt-in. Just "still being prepared" with a tree count.
- Condition labels ("Fair condition") have no explanation. A homeowner doesn't know what "Fair" means for their tree.
- "What Happens Next" section handles 5 different rendering paths (no_permit, regional, city/county, unsupported, non-removal). For supported cities, shows department, address, phone, email, hours, portal, tips, required documents. Dense for a homeowner.
- PDF download button text varies by report type — removal permit text assumes homeowner understands permit applications.
- No `@media print` stylesheet. Printing the page produces web layout with scrollbar artifacts.

### Flow 6: Settings — Update Credentials, Company Info, Report Preferences

| Step | Screen | Action | Wait |
|------|--------|--------|------|
| 1 | `/settings` | Skeleton loads, then 12 cards render | ~2s (single fetch + 7 JSON parses) |
| 2 | Any card | Edit fields | — |
| 3 | | **Must find the correct save button** | — |

**The 7 save buttons and their scopes:**

| Button | Saves | API Route |
|--------|-------|-----------|
| Save Profile | Cards 1, 2, 4, 7, 8 (personal, company, report defaults, writing style, billing) | PUT /api/arborist/profile |
| Save Observation Library | Card 5 only | PUT /api/settings/observations |
| Save Species Presets | Card 6 only | PUT /api/settings/species-presets |
| Save PDF & Share Preferences | Card 9 only | PUT /api/settings/pdf-share |
| Save Valuation Defaults | Card 10 only | PUT /api/settings/valuation |
| Logo/photo upload | Card 3 (immediate on file select) | POST /api/arborist/logo |
| AI Usage | Card 11 (read-only, no save) | — |

**Friction points:**
- **P1: 7 different save buttons with non-obvious scopes.** "Save Profile" saves 5 distant cards. Observations, species, PDF, and valuation each have their own button. User cannot tell which save covers which fields without trial and error.
- No unsaved changes indicator anywhere. User can modify 6 fields across 3 cards, navigate away, and lose everything.
- Single shared success/error banner at top of page. Saving observations shows success, then immediately saving profile (which fails) replaces the success with an error.
- Settings is a 2000+ line single client component. All 12 cards load as one unit. Slow on mobile.
- Observation library mobile arrows are 14px (`h-3.5 w-3.5`) — below 44px minimum.
- Recommendation map and scope templates buried inside "Report Defaults" card. Different features, same card.
- AI Writing Style has no preview. User can't see how preferences affect output without generating a full report.

---

## 3. Two-Mode Experience Analysis

TreeCertify serves two distinct usage contexts:

### 3.1 Field Mode (Mobile, Outdoors)

**Needs:** Speed, large tap targets, minimal typing, camera, GPS, glare readability

| Aspect | Implementation | Assessment |
|--------|---------------|------------|
| **Mode switching** | `MobileFieldMode` replaces `TreeSidePanel` at viewport < 768px | Good — automatic, no user action |
| **Touch targets** | Min 44px stated; most buttons compliant. Exceptions below. | Mostly good |
| **Numeric input** | `inputMode="decimal"` on DBH/height/spread | Good — shows number pad |
| **Voice input** | Inline mic on every notes field + Smart Dictation modal | Good — reduces typing |
| **Camera** | `capture="environment"` for back-facing | Good — but only on saved trees |
| **Haptic feedback** | `navigator.vibrate()` on condition, save, photo | Good — tactile confirmation |
| **Theme** | Forces light mode on mobile | Good — outdoor visibility |
| **Offline** | localStorage drafts every 30s; ConnectivityProvider | Weak — 30s data loss window, no server sync |
| **Progress tracking** | 5 section dots with IntersectionObserver | Concept good, dots too small |

**Where field mode fails:**
1. Photos blocked until tree is saved — breaks snap-then-save workflow
2. Progress dots (10px) and connectivity dot (8px) below touch/visibility standards
3. Auto-scroll after condition select is disorienting if user wants to go back
4. Draft save to localStorage only — device switch loses data
5. No offline queue for tree saves — requires connectivity

### 3.2 Office Mode (Desktop, Seated)

**Needs:** Detail, multi-panel layouts, keyboard shortcuts, PDF preview, editing tools

| Aspect | Implementation | Assessment |
|--------|---------------|------------|
| **Layout** | Fixed sidebar (256px) + main content area | Good — standard pattern |
| **Tree assessment** | Side panel (right drawer) with tabbed interface | Good — map stays visible |
| **Report editing** | Split view (editor + preview) | Good — WYSIWYG-adjacent |
| **Keyboard shortcuts** | None implemented | Missing — no Ctrl+S, no shortcuts for save/certify |
| **PDF preview** | ReportPreview matches PDF typography closely | Good — font/color alignment |
| **Multi-panel** | Map + side panel; editor + preview | Good — effective use of width |
| **Batch operations** | "Apply Valuation Defaults" for all trees | Good for valuation; no batch for other types |

**Where office mode fails:**
1. No keyboard shortcuts anywhere — save, certify, navigate between trees all require mouse
2. Report page is one massive component — no way to view certification dialog and report simultaneously
3. No breadcrumb trail — user in report editor can't see property address without going back
4. Settings page requires scrolling through all 12 cards — no jump navigation or tabs

### 3.3 Cross-Mode Issues

| Issue | Field Impact | Office Impact |
|-------|-------------|---------------|
| No keyboard shortcuts | N/A | Significant — arborists typing reports need shortcuts |
| Photo requires saved tree | Blocks natural workflow | Minor — can save quickly on desktop |
| Report page 2900 lines | Slow render on mobile | Slow initial paint even on desktop |
| Settings page monolith | Very slow, hard to scroll | Annoying but functional |
| No breadcrumbs | Less critical (single-task) | Significant — loses context in deep flows |

---

## 4. Information Architecture Review

### 4.1 Navigation Depth Analysis

| Task | Clicks from Dashboard | Verdict |
|------|----------------------|---------|
| Start new property | 1 (sidebar CTA or dashboard button) | Good |
| View existing property | 1 (dashboard feed) or 2 (Properties → row) | Good |
| Enter trees on property | 2 (Properties → Property → tap map) | Good |
| Generate report | 3 (Properties → Property → Report → Generate) | Acceptable |
| Certify report | 4 (Properties → Property → Report → Certify → ceremony) | Acceptable for legal weight |
| Download PDF | 5 (above + Download from completion modal) | Could be fewer |
| View ordinances | 1 (sidebar) | Good |
| Change ISA cert # | 2 (Settings → scroll to card 1) | Good, but scroll distance varies |
| Update observation library | 2 (Settings → scroll to card 5) | Card is far down the page |
| View permit pipeline | 1 (dashboard) or 2 (properties with filter) | Good |
| Quick Review on mobile | 1 (dashboard deep link) or 3 (nav to report) | Good with deep link |

**Verdict:** Most tasks are reachable in 1-3 clicks. The settings page is the weakest — everything is 2 clicks away but requires significant scrolling within the page.

### 4.2 Feature Grouping

| Grouping | Assessment |
|----------|-----------|
| Property → Trees → Report | **Logical.** Clear parent-child hierarchy. |
| Report → Certification → PDF | **Logical.** Linear progression, appropriate gating. |
| Report → Billing → Share | **Reasonable.** Billing is part of delivery, shown post-certification. |
| Settings: Profile + Company + Report Defaults + Writing Style + Billing | **Scattered.** "Save Profile" saves 5 conceptually distinct cards. |
| Settings: Observations + Species Presets | **Related but separate saves.** Both affect tree assessment but have different save buttons. |
| Ordinances (standalone page) | **Odd.** Ordinance data is mostly consumed in-context (tree protection checks, share page next steps). The standalone page is a reference, rarely revisited. |

**Recommendations:**
- Group settings into tabs: "Profile & Company" | "Assessment" (observations, species, recommendation map) | "Reports & PDF" (writing style, PDF/share, valuation) | "Billing"
- Consider moving ordinance reference into a collapsible panel within the property/tree context rather than a standalone page
- Surface PDF download directly in the property detail toolbar (currently only accessible from report page)

### 4.3 Settings Organization

Current order (top to bottom): Personal Info → Company Info → Logo → Report Defaults → Observation Library → Species Presets → Writing Style → Billing → PDF & Share → Valuation → AI Usage

**Frequency analysis:**

| Card | How Often Changed | Where It Should Be |
|------|------------------|--------------------|
| Personal Info | Once (setup), rarely updated | Bottom or separate "Account" tab |
| Company Info | Once (setup), rarely updated | Bottom or separate "Account" tab |
| Logo | Once (setup) | Bottom or separate "Account" tab |
| Report Defaults | Occasionally (new report types, scope templates) | Mid-frequency |
| Observation Library | Occasionally (customize per workflow) | Mid-frequency |
| Species Presets | Set once, add species as encountered | Mid-frequency |
| Writing Style | Rarely (set once, tweak occasionally) | Low-frequency |
| Billing | Set once | Low-frequency |
| PDF & Share | Set once, rarely changed | Low-frequency |
| Valuation | Set once per market | Low-frequency |
| AI Usage | Read-only, checked occasionally | Separate "Usage" tab or dashboard |

**Problem:** Highest-frequency items (observations, species) are in the middle of the page. Set-once items (profile, company) are at the top. The order is setup-centric, not workflow-centric.

### 4.4 Dashboard Utility

**What it shows:**
- Personalized greeting with first name + ISA number
- Context message (overdue reports, drafts in progress)
- 4 stat cards (properties, trees, certified, outstanding)
- Next Action Needed (filterable links)
- Permit Pipeline (clickable when count > 0)
- Recent properties (last 5 from 20)
- Outstanding Payments (when present)
- Weekly tree trend

**What's missing for daily use:**
- No "recently accessed" — dashboard shows properties by `updatedAt`, not by user's last visit
- No calendar/schedule view — arborists plan by appointment dates
- Next Action links go to filtered lists, not specific properties (for "need trees" and "need report" categories)
- No quick-access to latest report being worked on
- Properties capped at 20 with no indicator that more exist
- Permit Pipeline absent until first report has a permit status

---

## 5. Prioritized Friction List

### P0 — Blocks Task Completion (5 issues)

| ID | Location | Issue | Impact |
|----|----------|-------|--------|
| P0-1 | Field Mode | **Photos blocked on new trees.** `!isNewTree && tree?.id` check prevents camera until tree is saved. Breaks natural field workflow. | Arborists take photos first, then record data. Forcing save-first means they must revisit every tree. |
| P0-2 | Certification | **"Fix" links navigate away from ceremony dialog.** Validation failures link to property page, losing certification state. | User must re-navigate (3-5 extra clicks) to retry certification. On mobile, especially jarring. |
| P0-3 | Onboarding | **City validation rejects 16 of 21 supported cities.** `SUPPORTED_CITIES` array only has 5 Peninsula cities. | New users in Santa Rosa, Napa, Reno, etc. see discouraging warning despite full app support. |
| P0-4 | Onboarding | **State hardcoded to "CA" in geocode.** No state field in property creation. | Reno (NV) and Tahoe users get wrong geocoding silently. |
| P0-5 | Mobile Report | **3 of 4 view modes hidden on mobile.** Edit, Split, Preview are `hidden sm:flex`. Only Quick Review visible. | Mobile users cannot access formatted preview or edit raw markdown. |

### P1 — Slows User Down Significantly (10 issues)

| ID | Location | Issue | Impact |
|----|----------|-------|--------|
| P1-1 | Settings | **7 different save buttons with non-obvious scopes.** "Save Profile" saves 5 cards; 4 other cards have own saves. | Users save wrong button, lose changes, or don't save at all. |
| P1-2 | Settings | **No unsaved changes indicator.** Navigate away and changes are silently lost. | Frustrating data loss, especially on mobile with accidental back-swipe. |
| P1-3 | Dashboard | **Next Action links go to filtered lists, not specific properties.** "Need trees" → `/properties?status=inProgress`. | Extra 1-2 clicks to find the right property. |
| P1-4 | Share Page | **Uncertified page is a dead end.** Homeowner sees amber banner + tree count. No progress, no timeline, no notification. | Homeowner has no idea when to check back. May think link is broken. |
| P1-5 | Field Mode | **Progress dots 10px.** `h-2.5 w-2.5` below 44px touch minimum. | Hard to tap with gloves or sweaty fingers outdoors. |
| P1-6 | Field Mode | **Draft auto-save to localStorage only, 30s interval.** No server sync. | App crash within 30s loses data. Device switch loses all drafts. |
| P1-7 | Report Page | **2900-line monolith with 45+ state variables.** | Slow render on mobile, hard to maintain, risk of regressions. |
| P1-8 | Report Page | **PDF download has no progress indicator.** Spinner only, no time estimate. | User doesn't know if it's working. May click again. 5-10s feels broken. |
| P1-9 | Certification | **Signature name must match settings value if set.** No error explains what the expected value is. | Confusing inconsistency between users who set vs. didn't set signature name. |
| P1-10 | Field Mode | **Connectivity indicator is 8px dot.** No text label, no banner for offline. | Nearly invisible in bright outdoor conditions. |

### P2 — Looks Bad / Minor Friction (12 issues)

| ID | Location | Issue | Impact |
|----|----------|-------|--------|
| P2-1 | Report Page | **`window.confirm` for regenerate.** Only instance; all others use AlertDialog. | Inconsistent UX pattern. |
| P2-2 | Onboarding | **Step 2 is passive.** User reads sample report preview, clicks Continue. No interaction. | Missed opportunity to show value through interaction. |
| P2-3 | Onboarding | **Service area is single-select.** Arborists serve 5-10 cities. State saved as JSON array wrapping single value. | Incomplete data collection; hints at unfinished multi-select. |
| P2-4 | Dashboard | **Properties capped at 20.** No "showing 20 of N" indicator. | Power users don't know more exist. |
| P2-5 | Dashboard | **Context message gap.** Trees exist but no reports → no guidance shown. | Returning user doesn't know they should generate a report. |
| P2-6 | Field Mode | **Auto-scroll on condition select.** Scrolls to observations with 150ms delay. | Disorienting if user wants to go back to measurements. |
| P2-7 | Field Mode | **"Copy from previous" copies DBH.** Species-only copy more useful for same-species rows. | Minor annoyance, easy to clear. |
| P2-8 | Settings | **Observation library mobile arrows 14px.** `h-3.5 w-3.5` below 44px minimum. | Hard to tap on phone. |
| P2-9 | Settings | **Recommendation map and scope templates buried in Report Defaults card.** | Two distinct features hidden in one card. |
| P2-10 | Share Page | **No print stylesheet.** `@media print` absent. | Homeowners printing get web layout with artifacts. |
| P2-11 | Share Page | **Condition labels unexplained.** "Fair condition" with no tooltip or context. | Homeowner doesn't understand severity. |
| P2-12 | Report Page | **Save errors shown in toolbar.** If user scrolled into editor, error is invisible. | May miss save failures. |

---

## 6. Recommendations by Effort

### Quick Wins (< 30 minutes each)

| # | Recommendation | Fixes | Effort |
|---|---------------|-------|--------|
| QW-1 | **Expand `SUPPORTED_CITIES` in onboarding to all 21 jurisdictions.** Change the array in `app/onboarding/page.tsx` line ~74-80. | P0-3 | 5 min |
| QW-2 | **Add state dropdown to property creation forms.** Default to CA but allow NV for Reno/Tahoe. | P0-4 | 15 min |
| QW-3 | **Replace `window.confirm` with AlertDialog** for report regeneration. | P2-1 | 10 min |
| QW-4 | **Add "showing N of M" text** when dashboard property list is truncated at 20. | P2-4 | 5 min |
| QW-5 | **Increase field mode progress dots** to minimum 44px touch area (use padding, keep visual dot small). | P1-5 | 10 min |
| QW-6 | **Increase connectivity indicator** to a visible banner or larger icon with "Offline" text label. | P1-10 | 15 min |
| QW-7 | **Increase observation library mobile arrows** to 44px touch area. | P2-8 | 10 min |
| QW-8 | **Add context message for "has trees, no reports" state** in dashboard. | P2-5 | 10 min |
| QW-9 | **Add `@media print` stylesheet to share page.** Hide non-essential elements, optimize for paper. | P2-10 | 20 min |
| QW-10 | **Show expected signature name** in certification dialog if `arborist.signatureName` is set. | P1-9 | 10 min |

### Medium Effort (1-2 hours each)

| # | Recommendation | Fixes | Effort |
|---|---------------|-------|--------|
| ME-1 | **Allow photo capture before tree save.** Queue photos in component state (or IndexedDB). Attach to tree after save completes. | P0-1 | 1-2 hrs |
| ME-2 | **Inline certification validation fixes.** Instead of navigate-away "Fix" links, show fix UI in a side sheet or expandable section within the ceremony dialog. | P0-2 | 1-2 hrs |
| ME-3 | **Add unsaved changes indicator to settings.** Track dirty state per-card, show persistent "Unsaved changes" bar with global save button. | P1-2 | 1 hr |
| ME-4 | **Deep-link dashboard Next Actions** to specific properties (for "need trees" → `/properties/[id]`, for "need report" → `/properties/[id]/report`). | P1-3 | 1 hr |
| ME-5 | **Add PDF download progress bar.** Server-Sent Events or polling for Puppeteer render status. Or at minimum, show elapsed time and "This usually takes 5-10 seconds" text. | P1-8 | 1 hr |
| ME-6 | **Make onboarding Step 2 interactive.** Let user click tree rows, toggle condition ratings, see how the report changes. | P2-2 | 2 hrs |
| ME-7 | **Add "Copy species only" option** alongside "Copy from previous tree" in field mode. | P2-7 | 30 min |
| ME-8 | **Add tooltips to share page condition labels.** "Fair condition: This tree has moderate health or structural concerns that may require attention." | P2-11 | 30 min |
| ME-9 | **Show Permit Pipeline on dashboard even with 0 permits** as a prompt: "You have N certified reports — ready to submit?" | P1-3 (partial) | 30 min |
| ME-10 | **Add a mobile Preview mode** (unhide the Preview button on mobile, even if Edit/Split stay hidden). | P0-5 (partial) | 30 min |

### Large Effort (Half day+)

| # | Recommendation | Fixes | Effort |
|---|---------------|-------|--------|
| LE-1 | **Restructure settings into tabbed sections.** Profile & Company, Assessment (obs/species/rec map), Reports & PDF (writing/defaults/PDF/valuation), Billing. Each tab loads independently. | P1-1, P2-9, settings monolith | 4-6 hrs |
| LE-2 | **Split report page into sub-components.** Extract: EditorView, CertificationCeremony, BillingCard, ListingInfoCard, PermitPipeline, VersionHistory, QuickReviewMode. Share state via context or URL params. | P1-7 | 6-8 hrs |
| LE-3 | **Offline-first field mode.** Service worker + IndexedDB for tree data and photo queue. Background sync when connectivity returns. | P1-6, field mode reliability | 1-2 days |
| LE-4 | **Enrich uncertified share page.** Add progress indicator (N of M steps complete), estimated completion timeline, email notification opt-in when report is certified. | P1-4 | 4-6 hrs |
| LE-5 | **Add keyboard shortcuts for office mode.** Ctrl+S (save), Ctrl+Enter (certify), arrow keys (navigate trees), Cmd+P (preview). Use a command palette (Cmd+K) for power users. | Office mode gap | 4-6 hrs |
| LE-6 | **Add breadcrumb navigation.** Show "Dashboard > Properties > 123 Oak St > Report" across all deep pages. Maintain context across the property → report → certification flow. | Context loss | 2-3 hrs |
| LE-7 | **Redesign dashboard "Next Action Needed"** with specific property cards showing address, tree count, and direct-action buttons (not filtered list links). Cap at 5 with "View all" link. | P1-3, P2-4 | 3-4 hrs |

---

## Appendix A: Loading State Coverage

| Route | Has `loading.tsx` | Pattern | Recommendation |
|-------|-------------------|---------|---------------|
| `/dashboard` | Yes | Header + 4 stat cards + 2-col grid | Good |
| `/properties` | Yes | Header + search bar + 5 rows | Good |
| `/properties/[id]` | Yes | Full-height map skeleton | Good |
| `/properties/[id]/report` | **No** | ErrorBoundary only | Add skeleton (toolbar + content area) |
| `/settings` | Yes | Title + 3 card skeletons | Good (but only 3 of 12 cards) |
| `/ordinances` | **No** | Blank screen | Add skeleton |
| `/admin` | **No** | Blank screen | Add skeleton |
| `/onboarding` | **No** | Spinner in component | Add skeleton |
| `/share/[token]` | **No** | Blank screen | Add skeleton |

## Appendix B: Component Size Analysis

| Component | Lines | State Variables | Recommendation |
|-----------|-------|-----------------|---------------|
| Report page (`report/page.tsx`) | ~2900 | 45+ `useState` | Split into 6-8 sub-components |
| Settings page (`settings/page.tsx`) | ~2000 | 30+ | Split into tabbed sections |
| Mobile Field Mode (`mobile-field-mode.tsx`) | ~915 | 15+ | Acceptable — single-purpose |
| Property Map View (`property-map-view.tsx`) | ~1200 | 20+ | Consider extracting toolbar + site info |
| Dashboard Content (`dashboard-content.tsx`) | ~700 | 5+ | Acceptable |
| Tree Side Panel (`tree-side-panel.tsx`) | ~1000 | 20+ | Consider extracting tabs into sub-components |
| Share Page (`share/[token]/page.tsx`) | ~900 | 0 (RSC) | Acceptable — server-rendered |

## Appendix C: Inconsistent Patterns

| Pattern | Where It's Used | Where It's Not | Impact |
|---------|----------------|----------------|--------|
| AlertDialog for destructive actions | Tree delete, property delete, report delete, amend | Report regenerate (`window.confirm`) | P2-1 |
| Toast for action feedback | Photo upload, tree save, download errors | Settings save (banner), certification (inline) | Minor |
| Skeleton loading | 4 routes | 5 routes missing | Blank screens on first load |
| 44px touch targets | Most buttons, mobile nav | Progress dots, obs arrows, connectivity dot | P1-5, P1-10, P2-8 |
| Fetch-then-download for exports | PDF download, Word download | — | Consistent but lacks progress |
| Auto-save | Report editor (30s) | Settings (manual only) | P1-2 |

---

*This audit was conducted by reading actual source code for every flow, tracing user interactions through component logic, state management, and API calls. Line numbers are referenced throughout for traceability. No visual testing was performed (per CLAUDE.md: Clerk auth blocks preview tool).*
