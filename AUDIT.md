# TreeCertify: Comprehensive Audit and Rebuild Plan

**Date:** March 10, 2026
**Scope:** App repo, marketing site repo, live site (treecertify.com), pitch deck
**Stack:** Next.js 14 / TypeScript / Tailwind / PostgreSQL (Prisma) / Claude API / Vercel / Supabase / Stripe
**Methodology:** Full codebase review, live site walkthrough, mobile viewport simulation, pitch deck context analysis

---

## Executive Summary

TreeCertify is a well-conceived product solving a genuine pain point: ISA-certified arborists spend 45+ minutes per permit report cross-referencing municipal ordinances, formatting documents, and writing boilerplate. The AI-powered approach of matching tree data to the correct ordinance and generating a compliant first draft is the right idea, and the existing codebase demonstrates real depth of domain knowledge (21 municipal ordinances, 5 report types, CTLA valuation, construction encroachment zones, heritage tree detection).

However, the product has two critical gaps that will block adoption. First, **the marketing site is completely non-responsive** -- zero `@media` queries in 940 lines of CSS. An arborist discovering TreeCertify on their phone (the device they use in the field, where the pain is felt most acutely) sees an unusable, overflowing page. Second, **the app's field mode has a broken photo workflow** -- the most natural action an arborist takes (photograph the tree, then record data) is blocked because photos require a saved tree record. These two issues, combined with several other friction points documented below, create a gap between the product's promise and its delivery.

The good news: the architecture is sound, the data model is thorough, and the fixes are tractable. This audit identifies 27 specific issues across 3 severity tiers, then prescribes a rebuild focused on the 10 changes that would make the biggest difference for a working arborist.

---

## 1. What's Working Well

Before tearing it apart, credit where it's due. Several aspects of TreeCertify are genuinely strong and should be preserved in any rebuild.

| Strength | Evidence |
|----------|----------|
| **Domain depth** | 21 municipal ordinances encoded with specific code references, DBH thresholds, heritage designations, and mitigation requirements. This is the moat. |
| **Report type flexibility** | Five distinct report types (removal permit, health assessment, construction encroachment, tree valuation, real estate package) with type-specific fields and AI prompts. |
| **Offline awareness** | ConnectivityProvider with localStorage queue, offline indicator, and automatic sync on reconnect. The foundation for field reliability exists. |
| **Voice input** | Whisper transcription + Claude parsing on every notes field. Reduces typing in the field. |
| **Certification ceremony** | Three-step review/attest/sign flow adds appropriate gravity to a legal document. Arborists take their ISA credential seriously; this respects that. |
| **Share page** | Public homeowner-facing view with branded header, tree cards, permit pipeline, and city-specific next steps. A genuine value-add for the arborist's client relationship. |
| **Arborist customization** | Observation libraries, species presets, recommendation maps, scope templates, writing style preferences. The product adapts to each arborist's workflow. |
| **Marketing site copy** | The Before/After comparison (2 hours vs. 10 minutes with itemized breakdowns) is the strongest section. The liability statement ("You certify, not the AI") directly addresses the #1 objection. |

---

## 2. What's Broken

### 2.1 Marketing Site: Zero Mobile Responsiveness

This is the single most damaging issue across both codebases. The marketing site at `treecertify.com` contains **zero `@media` queries** in its 940-line single-file CSS. Every layout uses fixed pixel padding (`padding: 120px 48px`), multi-column grids with no breakpoints (`grid-template-columns: repeat(3, 1fr)`), and a desktop-only navigation bar.

The consequences are severe for a product targeting field professionals:

| Element | Desktop Behavior | Mobile Behavior |
|---------|-----------------|-----------------|
| Navigation | 5 items + CTA in a row | Items overflow, overlap, or disappear |
| Hero section | 2-column grid (text + card demo) | Card demo overflows viewport, text unreadable |
| Stats strip | 4-column grid | Numbers overlap, text truncated |
| Before/After | 2-column comparison | Columns stack but overflow horizontally |
| Pricing | 2-column grid | Cards overflow |
| Testimonials | 3-column grid | Cards overflow |
| Trust/Privacy | 3-column grid | Cards overflow |
| All sections | `padding: 120px 48px` | 48px horizontal padding wastes 30%+ of mobile viewport |
| Modal | `max-width: 480px; width: 90%` | This one actually works on mobile |

**Why this matters:** Arborists are mobile-first users. They discover tools while on a job site, share links with colleagues via text, and evaluate software on their phones. A marketing site that breaks on mobile is a dead end for the exact user TreeCertify needs to convert.

### 2.2 App: Photo Workflow Blocks Natural Field Behavior

In `mobile-field-mode.tsx`, the camera button is conditionally rendered with `!isNewTree && tree?.id`. This means an arborist placing a new tree pin cannot take photos until the tree is saved. The UI shows a disabled state with the message "Save the tree first to add photos."

This breaks the natural field workflow, which is: walk up to tree, photograph it (bark, canopy, defects, root flare), then record measurements and observations while looking at the photos. Forcing a save-first approach means the arborist must either remember to come back for photos (they won't) or save a half-complete tree record just to unlock the camera (creating dirty data).

### 2.3 App: Onboarding Rejects Most Supported Cities

The `SUPPORTED_CITIES` array in `app/onboarding/page.tsx` contains only 5 cities:

> Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley

But the app actually supports 21 municipalities (the ordinances page lists them all). When an arborist in Redwood City, Los Altos, Mountain View, Sunnyvale, or any of the 16 other supported cities enters their location during onboarding, they see an amber warning: "Limited ordinance support." This is factually wrong and discouraging at the worst possible moment -- the user's first interaction with the product.

### 2.4 App: State Hardcoded to California

In `app/(app)/properties/new/page.tsx` line 150, the property creation form sends `state: "CA"` with no user input. The Prisma schema has a `state` field, and the service areas include Reno and Tahoe Basin (Nevada). An arborist in Reno creating a property will have their address geocoded with the wrong state, potentially placing the pin in the wrong location and matching the wrong ordinances.

### 2.5 App: Report Page View Modes Hidden on Mobile

Three of four view modes (Edit, Split, Preview) use `hidden sm:flex`, making them invisible below 640px. Only "Quick Review" is accessible on mobile. This means a mobile user cannot see the formatted report preview, cannot edit the raw markdown, and cannot use the split view. For an arborist reviewing a report on their phone before sending it to a client, this is a significant limitation.

### 2.6 App: Certification "Fix" Links Navigate Away

When the certification ceremony detects validation failures (missing tree data, incomplete fields), it shows "Fix" links with an `ExternalLink` icon. Clicking these navigates to the property page, destroying the certification dialog state. The user must then navigate back to the report page (2-3 clicks), reopen the certification dialog, and re-verify. On mobile, this is especially painful.

---

## 3. What's Confusing

### 3.1 Settings Page: 7 Save Buttons with Hidden Scopes

The settings page (`/settings`) renders 12 cards in a single scrollable view with 7 different save buttons. The mapping between buttons and cards is non-obvious:

| Save Button | Cards It Saves |
|-------------|---------------|
| Save Profile | Personal Info, Company Info, Report Defaults, Writing Style, Billing (5 cards) |
| Save Observation Library | Observation Library only |
| Save Species Presets | Species Presets only |
| Save PDF & Share Preferences | PDF & Share only |
| Save Valuation Defaults | Valuation only |
| Logo/photo upload | Immediate on file select |
| AI Usage | Read-only, no save |

There is no unsaved changes indicator anywhere. A user can modify fields across multiple cards, click the wrong save button, navigate away, and lose their changes silently. The 2,166-line single component with 32 `useState` calls compounds the problem -- the page is slow to render and difficult to navigate on mobile.

### 3.2 Dashboard Next Actions: Links to Lists, Not Properties

The "Next Action Needed" section on the dashboard shows categories like "Need tree assessment" and "Need report." Clicking these navigates to `/properties?status=inProgress` -- a filtered list -- rather than directly to the specific property that needs attention. This adds 1-2 unnecessary clicks for every return visit.

### 3.3 Report Page: 3,363-Line Monolith

The report page is a single client component with 70 `useState` calls handling report generation, editing, certification ceremony, billing, listing info, delivery, versioning, amendments, validation, per-tree regeneration, and Quick Review. This creates slow renders on mobile, difficult maintenance, and a high risk of regressions. The component should be decomposed into focused sub-components sharing state via context.

### 3.4 Inconsistent Destructive Action Patterns

Every destructive action in the app uses a styled `AlertDialog` -- except report regeneration, which uses `window.confirm()` (3 instances in the report page). This creates an inconsistent experience where one of the most consequential actions (overwriting an AI-generated report) gets the least ceremony.

---

## 4. What's Missing

### 4.1 Marketing Site: SEO and Social Fundamentals

The marketing site is missing several baseline requirements for discoverability:

| Missing Element | Impact |
|----------------|--------|
| `<meta name="description">` | No search snippet control |
| Open Graph tags (`og:title`, `og:description`, `og:image`) | No social preview when shared |
| Twitter Card tags | No Twitter/X preview |
| Favicon | Browser tab shows generic icon |
| Canonical URL | Potential duplicate content issues |
| Sitemap | Search engine crawling |
| `robots.txt` | Search engine directives |
| Structured data (JSON-LD) | No rich snippets |

### 4.2 Marketing Site: Dead Links and Inconsistencies

The Privacy and Terms footer links both point to `#` -- dead ends. The site claims "12 Peninsula municipalities covered" in the stats strip, but the app's ordinance database contains 21 jurisdictions. The FAQ mentions "12 Peninsula municipalities" while the coverage section lists 5 cities plus "+7 more." These inconsistencies undermine credibility.

### 4.3 App: Keyboard Shortcuts

No keyboard shortcuts exist anywhere in the app. For an arborist writing reports at their desk (the "office mode" use case), the absence of Ctrl+S to save, Ctrl+Enter to advance, or arrow keys to navigate between trees means every action requires a mouse click. This is a significant productivity gap for the report editing workflow.

### 4.4 App: Breadcrumb Navigation

Deep pages (report editor, certification) provide no breadcrumb trail. A user editing a report cannot see the property address without navigating back. The back button in the report toolbar goes to the property page, but there's no persistent context showing where the user is in the hierarchy.

### 4.5 App: Print Stylesheet for Share Page

The public share page has no `@media print` stylesheet. Homeowners who print the page get the web layout with scrollbar artifacts, navigation elements, and broken formatting. Adding a print stylesheet would make the share page a more professional deliverable.

---

## 5. What Should Be Removed or Rethought

### 5.1 Onboarding Step 2: Passive Sample Preview

Step 2 of
 onboarding is a static sample report preview. The user reads it and clicks "Continue." There is no interaction, no agency, and no personalization. This step adds a click and a page load without demonstrating value. It should either be made interactive (let the user click tree rows, toggle conditions, see the report update) or removed entirely, collapsing onboarding from 3 steps to 2.

### 5.2 Duplicate Marketing Site File

The marketing site repo contains both `index.html` and `index.html.html`. The duplicate should be removed.

### 5.3 Service Area Single-Select

The onboarding service area selector is a single-select dropdown, but arborists typically serve 5-10 cities. The value is stored as a JSON array wrapping a single string -- evidence of an unfinished multi-select implementation. This should either be completed as a multi-select or simplified to a text input.

---

## 6. Prioritized Issue Matrix

Every issue identified in this audit is categorized by severity and estimated effort. The **Impact Score** combines user-facing severity (how much it hurts the arborist) with business impact (how much it affects conversion or retention).

| ID | Issue | Severity | Effort | Impact Score |
|----|-------|----------|--------|-------------|
| **B-1** | Marketing site has zero mobile responsiveness | Critical | 3-4 hrs | **10/10** |
| **B-2** | Photo workflow blocked on new trees | Critical | 1-2 hrs | **9/10** |
| **B-3** | Onboarding rejects 16 of 21 supported cities | Critical | 15 min | **8/10** |
| **B-4** | State hardcoded to CA (breaks NV users) | Critical | 15 min | **7/10** |
| **B-5** | Report view modes hidden on mobile | High | 30 min | **7/10** |
| **B-6** | Certification "Fix" links navigate away | High | 1-2 hrs | **7/10** |
| **C-1** | Settings: 7 save buttons, no unsaved indicator | High | 2-3 hrs | **6/10** |
| **C-2** | Dashboard links to lists, not properties | Medium | 1 hr | **5/10** |
| **C-3** | Report page 3,363-line monolith | High | 6-8 hrs | **5/10** |
| **C-4** | `window.confirm` for regeneration | Low | 10 min | **3/10** |
| **M-1** | No SEO meta tags on marketing site | Medium | 30 min | **6/10** |
| **M-2** | Dead Privacy/Terms links | Medium | 15 min | **4/10** |
| **M-3** | Stats inconsistency (12 vs 21 cities) | Medium | 10 min | **4/10** |
| **M-4** | No favicon | Low | 5 min | **3/10** |
| **M-5** | Duplicate `index.html.html` file | Low | 1 min | **1/10** |
| **F-1** | Field mode progress dots below 44px touch target | Medium | 10 min | **5/10** |
| **F-2** | Connectivity indicator 8px, invisible outdoors | Medium | 15 min | **5/10** |
| **F-3** | Draft auto-save localStorage only, 30s interval | High | 4-6 hrs | **6/10** |
| **F-4** | Auto-scroll after condition select is disorienting | Low | 15 min | **3/10** |
| **F-5** | "Copy from previous" copies DBH (species-only more useful) | Low | 30 min | **3/10** |
| **S-1** | Share page: uncertified is a dead end | High | 4-6 hrs | **6/10** |
| **S-2** | Share page: no print stylesheet | Medium | 20 min | **4/10** |
| **S-3** | Share page: condition labels unexplained | Low | 30 min | **3/10** |
| **R-1** | PDF download has no progress indicator | Medium | 1 hr | **4/10** |
| **R-2** | Save errors shown in toolbar, invisible when scrolled | Medium | 30 min | **4/10** |
| **R-3** | Signature name validation confusing | Low | 10 min | **3/10** |
| **O-1** | No keyboard shortcuts anywhere | Medium | 4-6 hrs | **5/10** |

---

## 7. Rebuild Plan: The 10 Changes That Matter Most

Based on the prioritized matrix above, these are the changes that would make the biggest difference for an arborist using TreeCertify every day. They are ordered by impact-to-effort ratio.

### Rebuild 1: Make the Marketing Site Mobile-Responsive (B-1)

**Why:** This is the front door. If it breaks on a phone, no arborist signs up.

**What:** Add comprehensive `@media` queries for breakpoints at 768px and 480px. Convert the navigation to a hamburger menu on mobile. Stack all multi-column grids to single columns. Reduce section padding from 120px/48px to 60px/20px on mobile. Ensure the hero card demo scales or stacks below the headline. Make the modal full-screen on mobile.

### Rebuild 2: Fix the Onboarding City Validation (B-3)

**Why:** 15 minutes of work that stops discouraging 76% of new users.

**What:** Expand `SUPPORTED_CITIES` to include all cities that have ordinance data in the database. Cross-reference with the ordinances API to build the list dynamically, or at minimum, hardcode all 21 supported cities.

### Rebuild 3: Add State Field to Property Creation (B-4)

**Why:** 15 minutes of work that unblocks Nevada users entirely.

**What:** Add a state dropdown (defaulting to CA) in both the onboarding "First Assessment" step and the `/properties/new` page. Pass the selected state to the geocode API and property creation endpoint.

### Rebuild 4: Unhide Report Preview on Mobile (B-5)

**Why:** 30 minutes of work that gives mobile users access to formatted report output.

**What:** Change the Preview button from `hidden sm:flex` to `flex`. Keep Edit and Split hidden on mobile (they require more screen real estate), but Preview is a read-only view that works fine on small screens.

### Rebuild 5: Replace `window.confirm` with AlertDialog (C-4)

**Why:** 10 minutes of work for consistency across all destructive actions.

**What:** Replace the 3 `window.confirm` calls in the report page with the same `AlertDialog` pattern used everywhere else in the app.

### Rebuild 6: Add SEO Meta Tags to Marketing Site (M-1)

**Why:** 30 minutes of work for baseline search discoverability.

**What:** Add `<meta name="description">`, Open Graph tags, Twitter Card tags, favicon, and canonical URL to the marketing site `<head>`.

### Rebuild 7: Fix Marketing Site Inconsistencies (M-2, M-3, M-5)

**Why:** 15 minutes of work to eliminate credibility-damaging errors.

**What:** Update the stats strip to reflect actual coverage numbers. Fix or remove dead Privacy/Terms links. Delete the duplicate `index.html.html` file.

### Rebuild 8: Increase Field Mode Touch Targets (F-1, F-2)

**Why:** 25 minutes of work for outdoor usability.

**What:** Increase progress dots to 44px touch area (use padding around the visual dot). Replace the 8px connectivity indicator with a visible banner that says "Offline" when disconnected.

### Rebuild 9: Add Print Stylesheet to Share Page (S-2)

**Why:** 20 minutes of work that makes the homeowner deliverable more professional.

**What:** Add `@media print` rules to hide the footer, navigation, and non-essential elements. Optimize typography and spacing for paper output.

### Rebuild 10: Add Unsaved Changes Indicator to Settings (partial C-1)

**Why:** 1 hour of work that prevents the most common data loss scenario.

**What:** Track dirty state per settings section. Show a persistent "Unsaved changes" banner when any field has been modified. Warn on navigation away with `beforeunload`.

---

## 8. Marketing Site: Detailed Rebuild Specification

The marketing site rebuild (Rebuild 1) is the highest-impact single change. Here is the detailed specification for the responsive CSS that needs to be added.

### 8.1 Breakpoint Strategy

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| `max-width: 1024px` | Tablets | Reduce padding, adjust grid columns |
| `max-width: 768px` | Large phones / small tablets | Stack grids, hamburger nav, reduce font sizes |
| `max-width: 480px` | Small phones | Full-width everything, minimal padding |

### 8.2 Navigation

The current nav is a horizontal flex row with 5 items plus a CTA button. On mobile, this should collapse into a hamburger menu icon that opens a full-screen overlay with vertically stacked links and the CTA as a full-width button at the bottom.

### 8.3 Hero Section

The 2-column grid (`grid-template-columns: 1fr 1fr`) should stack to a single column on mobile, with the text content above and the card demo below. The card demo should be constrained to `max-width: 100%` with horizontal overflow hidden. The hero headline font size should scale down from `clamp(46px, 5.2vw, 68px)` to approximately 32-36px on mobile.

### 8.4 Content Sections

All multi-column grids (stats, how-it-works, before/after, ordinances, testimonials, pricing, privacy) should collapse to single columns on mobile. Section padding should reduce from `120px 48px` to `60px 20px`. Font sizes for section titles should scale down proportionally.

---

## 9. App Codebase: Architecture Observations

### 9.1 Component Size Distribution

| Component | Lines | useState Calls | Verdict |
|-----------|-------|---------------|---------|
| Report page | 3,363 | 70 | Needs decomposition |
| Settings page | 2,166 | 32 | Needs tabbed sections |
| Property Map View | 1,895 | 20+ | Borderline; extract toolbar |
| Tree Side Panel | 1,528 | 20+ | Acceptable (single-purpose) |
| Report Preview | 987 | Low | Acceptable |
| Mobile Field Mode | 915 | 15+ | Acceptable (single-purpose) |

### 9.2 API Surface

The app exposes 49 API route files with approximately 75 handlers. The API is well-organized by resource (properties, trees, reports, arborist) with consistent patterns. The AI generation endpoint uses Server-Sent Events for streaming, which is the right approach for the 30-60 second generation time.

### 9.3 Data Model

The Prisma schema is thorough with 12 models covering the full lifecycle from arborist onboarding through property creation, tree assessment, report generation, certification, invoicing, and sharing. The `typeSpecificData` JSON field on trees and `reportOptions` JSON field on reports provide flexibility for report-type-specific data without schema migrations.

### 9.4 Offline Strategy

The current offline approach (localStorage queue + ConnectivityProvider) is a reasonable v1 but has gaps: 30-second auto-save interval means data loss on crash, no server-side draft sync, and photo uploads require connectivity. A full offline-first approach with Service Worker + IndexedDB would be the right long-term investment but is a multi-day effort.

---

## 10. Recommendations for Post-Rebuild Investment

Beyond the immediate rebuild, these are the investments that would have the highest return over the next 6 months:

**Decompose the report page.** The 3,363-line monolith is the biggest maintenance risk. Extract CertificationCeremony, BillingCard, VersionHistory, QuickReviewMode, and ReportEditor into separate components sharing state via React Context. This is a 6-8 hour effort that pays dividends on every subsequent feature.

**Build offline-first field mode.** Service Worker + IndexedDB for tree data and photo queue, with background sync on reconnect. This is the feature that would make TreeCertify indispensable for arborists working in areas with poor cell coverage (which is most job sites with trees).

**Add keyboard shortcuts for office mode.** Ctrl+S to save, Ctrl+Enter to advance/certify, arrow keys to navigate between trees, Cmd+K command palette for power users. This is the feature that turns TreeCertify from a tool into a workflow.

**Restructure settings into tabs.** Group into Profile & Company, Assessment (observations, species, recommendation map), Reports & PDF (writing style, defaults, PDF/share, valuation), and Billing. Each tab loads independently with its own save button. This eliminates the 7-save-button confusion.

**Enrich the uncertified share page.** Add a progress indicator, estimated completion timeline, and email notification opt-in. Currently, a homeowner receiving an uncertified share link sees almost nothing -- a dead end that reflects poorly on the arborist.

---

*This audit was conducted through full codebase review of both repositories (app: 150+ files, marketing site: 1 file), live site walkthrough, pitch deck analysis, and mobile viewport evaluation. All line numbers and code references are traceable to the cloned repositories.*

---

## 11. Implemented Changes (Phase 2 Rebuild)

The following changes have been implemented and are ready to merge. Patch files are provided for both repositories.

### App Repository (`treecertify`) — 4 files changed, +132 / -33 lines

| Issue ID | File | Change |
|----------|------|--------|
| **B-3** | `app/onboarding/page.tsx` | Expanded `SUPPORTED_CITIES` from 5 to all 21 seeded municipalities (Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley, Los Altos, Los Altos Hills, Redwood City, Mountain View, Sunnyvale, Cupertino, San Carlos, Burlingame, Hillsborough, Foster City, Belmont, San Mateo, Millbrae, Santa Rosa, Reno, Tahoe/Truckee) |
| **B-4** | `app/(app)/properties/new/page.tsx` | Added state dropdown field (CA/NV/OR) between City and County. Default: CA. Value passed to property creation instead of hardcoded "CA" |
| **B-5** | `app/(app)/properties/[id]/report/page.tsx` | Changed Preview button from `hidden sm:flex` to `flex`, making it visible on mobile. Edit and Split remain desktop-only |
| **C-4** | `app/(app)/properties/[id]/report/page.tsx` | Replaced all 3 `window.confirm()` calls with proper `AlertDialog` components matching the existing per-tree regeneration pattern. Added state variables `showFullRegenConfirm`, `showUnlockConfirm`, `showRestoreConfirm` with dedicated confirm handlers |
| **F-1** | `components/mobile-field-mode.tsx` | Increased progress dot touch targets from 10px to 44px minimum (WCAG 2.5.8 compliant). Visual dot remains 10px; touch area uses padding wrapper |
| **F-2** | `components/mobile-field-mode.tsx` | Replaced always-visible 8px connectivity dot with an "Offline" badge that only appears when disconnected. Uses red background pill with text label, visible outdoors in direct sunlight |

### Marketing Site Repository (`treecertify-site`) — 1 file changed, +150 / -12 lines

| Issue ID | Change |
|----------|--------|
| **B-1** | Added 3 responsive breakpoints (1024px tablet, 768px mobile, 480px small mobile) with comprehensive media queries covering all 15+ layout sections. Added hamburger menu with animated open/close state and full-screen mobile nav overlay |
| **M-1** | Added `<meta name="description">`, Open Graph tags (`og:type`, `og:url`, `og:title`, `og:description`), Twitter Card tags, favicon (tree emoji SVG), and canonical URL |
| **M-2** | Fixed dead Privacy and Terms footer links to open email drafts (`mailto:hello@treecertify.com?subject=...`) instead of pointing to `#` |
| **M-3** | Updated all "12 municipalities" references to "21 municipalities" across stats strip, pricing features, FAQ, and ordinance coverage section. Updated "+7 more" to "+16 more" with expanded city list |

### How to Apply

```bash
# App repo
cd treecertify
git apply treecertify-app.patch

# Marketing site repo
cd treecertify-site
git apply treecertify-site.patch
```
