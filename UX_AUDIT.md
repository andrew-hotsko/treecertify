# TreeCertify UX Research Audit

**Date:** 2026-03-10
**Methodology:** Code-level flow tracing across 6 primary user flows
**Researcher:** UX Research Agent (Claude Opus 4.6)

---

## Executive Summary

TreeCertify is a feature-rich product with strong domain expertise baked into every flow. The core happy path (onboarding through certification through PDF delivery) is well-designed and moves the user through a clear progression. However, the application has accumulated significant complexity across 35 development sessions, and several friction points have emerged that impact first-time user success, mobile usability, and settings manageability.

**Top 5 Critical Findings:**

1. **Onboarding Step 2 is a dead end for motivation** -- the sample report preview is passive and does not give users a reason to advance. No interactive element; users read and click "Continue."
2. **Settings page has 12 cards with 7 different save buttons** -- fragmented save model creates confusion about what has been saved and what has not.
3. **Mobile report editor defaults to Quick Review** only if the user knows the URL parameter. On mobile, Edit/Split/Preview buttons are `hidden sm:flex`, leaving Quick Review as the only visible view toggle, but the user must still navigate there.
4. **Certification ceremony requires 3 steps with 5 clicks minimum** -- appropriate for legal weight, but Step 1 validation check failures have no inline fix path on mobile (links open in the same view, losing context).
5. **New tree photos cannot be added until the tree is saved** -- field mode shows "Save the tree first to add photos" which breaks the natural field workflow of snap-then-save.

---

## Flow 1: New User Onboarding

**Source:** `app/onboarding/page.tsx` (897 lines, single client component)

### Step-by-Step Trace

| Step | Screen | User Action | Clicks |
|------|--------|-------------|--------|
| 1 | Spinner while profile loads | Wait | 0 |
| 2 | Step 1: "Your Info" | Fill name, ISA cert #, service area dropdown | 3 fields + 1 button |
| 3 | API call: POST /api/arborist/onboard | Wait for save | 0 |
| 4 | Step 2: "See It In Action" | Read sample report preview, see 3 feature callouts | 1 click (Continue) |
| 5 | Step 3: "First Assessment" | Fill address, city, select report type | 3 fields + 1 selection + 1 button |
| 6 | API calls: geocode, create property, PATCH onboard | Wait | 0 |
| 7 | Redirect to `/properties/{id}` | Automatic | 0 |

**Total clicks to first property:** 9-10 (3 fields + Continue + Continue + 3 fields + 1 report type + Create Assessment)
**Total wait points:** 3 (initial load, step 1 save, step 3 property creation with geocoding)
**Estimated time:** 2-3 minutes (matches stated goal)

### Friction Points

**F1.1: Step 2 is passive content with no interaction.**
The sample report preview is a static HTML rendering (lines 229-337). Users scroll through a table and an excerpt, then click "Continue." There is no interactive element (no "try clicking here" or "see what happens when you change a condition rating"). The step exists to show value, but the user has no agency. The "View sample PDF" link opens in a new tab, which on mobile creates a jarring context switch.

**F1.2: City validation shows a warning wall for unsupported cities.**
When a user types a city not in the 5 verified Peninsula cities (lines 771-790), they see a multi-line amber warning naming all supported cities. This is discouraging for users in any of the 16 other supported-but-not-fully-verified cities. The `SUPPORTED_CITIES` array (line 74-80) only contains 5 cities, even though the app supports 21.

**F1.3: Service area dropdown is single-select but arborists typically serve multiple cities.**
The `serviceArea` state is a single string (line 354). Arborists commonly serve 5-10 cities. The dropdown allows only one selection. The saved value is wrapped in a JSON array (`JSON.stringify([serviceArea])`, line 440), suggesting multi-select was intended but not implemented.

**F1.4: No state/zip fields in Step 3.**
The property creation form has address and city but no state or zip. State is hardcoded to "CA" in the geocode call (line 480). This silently fails for Reno (Nevada) and Tahoe Basin users who selected those service areas in Step 1.

**F1.5: "Create Assessment" button text is ambiguous.**
The CTA says "Create Assessment" but the user is creating a property. They have not assessed anything yet. This conflates two concepts and may create an expectation mismatch when they land on an empty map.

### What Works Well

- Resume from saved progress works correctly (lines 373-413). If a user abandons onboarding and returns, they pick up where they left off.
- Name pre-populates from Clerk user data (line 352).
- Report type selector with colored cards and descriptions (lines 800-840) is visually clear and well-differentiated.
- "I'll do this later" skip option (lines 884-891) prevents abandonment.

---

## Flow 2: Returning User Dashboard

**Source:** `app/(app)/dashboard/page.tsx` (188 lines, RSC) + `components/dashboard-content.tsx` (~700 lines, client)

### Step-by-Step Trace

| Step | Screen | User Action | What They See |
|------|--------|-------------|---------------|
| 1 | Loading skeleton | Wait | Skeleton cards |
| 2 | Dashboard | Scan | Greeting, context message, 4 stat cards |
| 3 | Dashboard (scrolling) | Scan | Next Action Needed, Permit Pipeline, Properties list |

**Quick actions available:**
- "New Property" button (top-right, always visible)
- Stat cards are clickable (filter properties by status)
- "Next Action Needed" rows link to Quick Review or properties list
- "View all" in Properties card header
- Each property row links to `/properties/{id}`

### Friction Points

**F2.1: "Next Action Needed" only links to filtered property lists, not specific actions.**
When `needTreeAssessment > 0`, the link goes to `/properties?status=inProgress` (line 363) -- a filtered list. The user must then find the right property and navigate to it. There is no deep link to the specific property that needs trees. Only the "readyToCertify" section (lines 389-444) shows specific property addresses with Quick Review links, and only when there are 3 or fewer certifiable properties.

**F2.2: Dashboard computes `welcomeState` but provides vague CTAs.**
- `no_trees` state says "Open a property and pin trees on the map" with a "View Properties" button (line 183). This is two clicks away from the actual tree-pinning action.
- `no_reports` state says "Generate an AI-powered arborist report" with "View Properties" (line 190). Again, two clicks away.

**F2.3: Context message logic has a gap.**
`getContextMessage()` (lines 15-20) returns null when there are no overdue reports and no drafts but some trees exist. A returning user with trees but no reports sees no context message, just the stat cards. They might not realize they should generate a report.

**F2.4: Properties list caps at 20 items.**
The query uses `take: 20` (line 33). For an arborist managing 50+ properties, the dashboard shows only the 20 most recently updated. The "View all" link goes to `/properties` but there is no indicator that more properties exist beyond the 20 shown.

**F2.5: Permit Pipeline only appears for certified reports with permit status.**
An arborist with removal permits who has not yet submitted any to the city sees no Permit Pipeline card at all. This is a missed opportunity to prompt them: "You have 3 certified reports -- ready to submit?"

### What Works Well

- Server-rendered with all queries in a single `Promise.all` (line 30) -- fast load.
- Personalized greeting with first name and ISA number (lines 152-157).
- Weekly tree trend indicator (lines 322-335) gives a sense of momentum.
- Filter pills on properties list allow quick switching between status categories.
- Outstanding Payments card only appears when relevant (lines 497-514).

---

## Flow 3: Field Mode (Mobile Tree Entry)

**Source:** `components/mobile-field-mode.tsx` (915 lines) + `components/property-map-view.tsx`

### Step-by-Step Trace (Rapid Multi-Tree Entry)

| Step | Screen | User Action | Clicks/Taps |
|------|--------|-------------|-------------|
| 1 | Property map (mobile) | Tap map to place pin | 1 tap |
| 2 | Field mode opens (full screen) | See Species section | 0 |
| 3 | Species | Tap recent species chip OR search | 1-3 taps |
| 4 | Measurements | Type DBH (large numeric input) | 1 tap + typing |
| 5 | Condition | Tap condition button (0-5 grid) | 1 tap |
| 6 | Observations | Tap checkboxes or "No significant concerns" | 1-3 taps |
| 7 | Action | Tap action button (auto-selected from recommendation map) | 0-1 taps |
| 8 | Bottom bar | Tap "Save & Next Tree" | 1 tap |
| 9 | Form resets, new pin placed at map center | Repeat from step 3 | 0 |

**Minimum taps for a basic tree:** 5 (species chip + DBH + condition + "No concerns" + Save & Next)
**Photo capture available:** Only after tree is saved (existing tree, not new)

### Friction Points

**F3.1: Photos cannot be taken on new trees (critical field workflow issue).**
Line 835: `{!isNewTree && tree?.id && (` -- the camera button is only rendered for saved trees. Line 870-874 shows "Save the tree first to add photos." In the field, arborists typically photograph the tree *before* or *during* data entry, not after saving. This forces a two-pass workflow: save tree, then reopen to add photos.

**F3.2: Progress dots are tiny (2.5x2.5 = 10px) and close together.**
Lines 497-508: Progress dots are `h-2.5 w-2.5` with `gap-1.5`. While they have `minWidth: 10, minHeight: 10` inline styles, they are tightly spaced. In outdoor conditions with gloves or sweaty fingers, these are hard to tap precisely.

**F3.3: Auto-scroll on condition select may confuse users.**
Line 359: After selecting a condition rating, the view auto-scrolls to the observations section with a 150ms delay. This is meant to guide flow, but if the user wanted to adjust the measurement they just entered (section above), the scroll moves them away. There is no way to disable this behavior.

**F3.4: "Copy from previous tree" copies species AND measurements.**
`handleCopyFromLast` (lines 332-346) copies speciesCommon, speciesScientific, dbhInches, heightFt, and canopySpreadFt. For a multi-trunk situation or a row of the same species but different sizes, copying DBH is wrong. Species-only copy would be more appropriate.

**F3.5: Draft auto-save interval is 30 seconds.**
Lines 283-319: `setInterval` at 30000ms. In the field, if the app crashes or the user navigates away within 30 seconds of changes, data is lost. The draft is saved to localStorage, not the server. If the user switches devices, drafts are lost.

**F3.6: Connectivity indicator is a tiny 2px dot.**
Line 481-483: Online/offline is shown as a `h-2 w-2` dot (8px). In bright outdoor conditions, this is nearly invisible. There is no text label or banner for offline state.

### What Works Well

- Haptic feedback on condition select and save (line 104-108).
- Large numeric inputs for measurements (`h-14 text-xl font-mono text-center`, line 612).
- Ordinance protection auto-checks with 500ms debounce (lines 249-276).
- Recent species chips for rapid entry (lines 548-563) with 44px min-height touch targets.
- `inputMode="decimal"` on numeric fields (line 604) shows mobile number pad.
- Safe area inset handling for modern mobile devices (line 477).
- "Copy from Tree #N" button for consecutive similar trees (lines 535-545).

---

## Flow 4: Report Generation, Certification, and PDF

**Source:** `app/(app)/properties/[id]/report/page.tsx` (~2900 lines)

### Sub-Flow 4A: Report Generation

| Step | Screen | User Action | Clicks |
|------|--------|-------------|--------|
| 1 | "Generate AI Report" card | See property address, tree count, report type | 0 |
| 2 | Click "Generate AI Draft" | -- | 1 |
| 3 | Data quality dialog (if warnings) | Review warnings, click "Generate Anyway" or "Go Back" | 1-2 |
| 4 | Streaming progress modal | Watch AI write report in real-time | 0 (wait 30-60s) |
| 5 | Editor opens in split view | Report content loaded | 0 |

**Wait point:** 30-60 seconds for AI generation (line 1371-1372). Timer and word count shown during wait.

### Sub-Flow 4B: Certification Ceremony

| Step | Screen | User Action | Clicks |
|------|--------|-------------|--------|
| 1 | Click "Certify" in toolbar | Opens ceremony dialog | 1 |
| 2 | Step 1: Review | See property summary, validation checklist | 0 |
| 3 | Check "I have reviewed" | -- | 1 |
| 4 | If warnings: check "I have reviewed these items" | -- | 0-1 |
| 5 | Click "Next: Attestation" | -- | 1 |
| 6 | Step 2: Read certification statement | -- | 0 |
| 7 | Check "I agree to the above" | -- | 1 |
| 8 | Click "Next: Sign" | -- | 1 |
| 9 | Step 3: Type signature name | -- | typing |
| 10 | Click "Certify Report" | -- | 1 |
| 11 | Success state in dialog | -- | 0 |
| 12 | Completion modal with Share + Download | -- | 0 |

**Total clicks for certification:** 6-7 minimum (plus typing)
**Total steps in ceremony:** 3 (Review, Attest, Sign)

### Sub-Flow 4C: Quick Review (Mobile Certification Path)

| Step | Screen | User Action | Clicks |
|------|--------|-------------|--------|
| 1 | Open Quick Review (from dashboard link or toolbar toggle) | See full-screen scrollable report | 0 |
| 2 | Read sections | Scroll through report sections | scroll |
| 3 | (Optional) Flag sections | Tap "Flag this section", write note | 2+ per flag |
| 4 | Tap "Certify Report" (bottom bar) | Opens certification ceremony | 1 |

### Friction Points

**F4.1: Report page has 45+ state variables.**
Lines 297-398 declare 45+ `useState` calls. This is a single monolithic component handling: content editing, certification, billing, listing info, delivery, versioning, amendments, validation, per-tree regeneration, and Quick Review mode. This is not a user-facing issue directly, but it makes the page heavy and slow to render, especially on mobile.

**F4.2: Validation failures in certification Step 1 have "Fix" links that navigate away.**
Lines 2712-2717: Failed validation checks show a "Fix" link with `ExternalLink` icon. Clicking navigates to the fix path (e.g., back to property page), but the certification dialog is lost. The user must re-navigate to the report, re-open certification, and re-check Step 1. On mobile, this is especially jarring.

**F4.3: Signature must match `arborist.signatureName` exactly.**
Lines 2857-2870: If the arborist has set a signature name in settings, the typed signature must match case-insensitively. If they have not set a signature name, any text works. New users who skip settings may not realize they should set a signature name, leading to a confusing inconsistency.

**F4.4: "Regenerate" confirmation uses `window.confirm` -- not a styled dialog.**
Line 860: `if (!window.confirm("Regenerating will replace the current AI draft..."))` -- this is the only `window.confirm` in the app. All other destructive actions use `AlertDialog`. Inconsistent UX pattern.

**F4.5: Save error shows as amber bar at top but can be missed.**
The error state (line 564) sets an error string, but if the user is scrolled into the editor, they may not see the toolbar-level error. There is no inline toast for save failures in the auto-save path (silent saves).

**F4.6: Mobile view mode toggle only shows "Quick Review" button.**
Lines 1451-1491: Edit, Split, and Preview buttons are `hidden sm:flex`. On mobile, Quick Review is the only visible view toggle. If a mobile user wants to preview the formatted report (not Quick Review mode), there is no way to access Preview mode.

**F4.7: PDF download uses fetch-then-download pattern with no progress indicator.**
The PDF download triggers a fetch, waits for the response (Puppeteer rendering can take 5-10 seconds), then creates a download. During this time, the button shows a spinner, but there is no indication of how long the wait will be.

### What Works Well

- Streaming SSE shows the report being written in real-time (lines 776-839).
- Data quality check before generation warns about missing data without blocking (lines 693-738).
- Auto-save every 30 seconds with "unsaved changes" indicator (lines 656-680).
- Per-tree regeneration allows targeted AI rewrites without losing edits to other sections.
- Certification ceremony has appropriate legal weight: 3-step process with validation, attestation, and signature.
- Completion modal after certification offers immediate Share and Download actions (line 985).
- Amendment flow preserves history and share links (lines 920-948).

---

## Flow 5: Share Page (Homeowner View)

**Source:** `app/share/[token]/page.tsx` (~900+ lines, RSC)

### What the Homeowner Sees (Certified Report)

| Section | Content | Interaction |
|---------|---------|-------------|
| A. Branded Header | Company logo, report type label, address, arborist name/ISA#, cert date | Read-only |
| B. Client Note | Personal message from arborist (if set) | Read-only |
| C. Summary Stats | 2x2 grid (varies by report type) + explanation paragraph | Read-only |
| D. Canopy Value (RE/valuation) | Large dollar figure | Read-only |
| E. Permit Status Pipeline | Visual stepper (if submitted) | Read-only |
| F. Permit Timeline | Vertical timeline with estimated dates | Read-only |
| G. Tree Cards | Per-tree: species, measurements, condition, action, protected badge | Read-only |
| H. What Happens Next | City-specific submission guidance | Links (phone, email) |
| I. PDF Download | Full-width button | 1 click |
| J. Billing | Amount, line items, payment status | Read-only |
| K. Arborist Contact | Tap-to-call, tap-to-email, website | Links |
| L. Footer | "Powered by TreeCertify" | Read-only |

### What the Homeowner Sees (NOT Certified)

| Section | Content |
|---------|---------|
| A. Header | "DRAFT -- PENDING CERTIFICATION" |
| B. In-Progress Banner | "This report is still being prepared" + tree count |
| K. Arborist Contact | Only if arborist exists |

### Friction Points

**F5.1: Uncertified share page has almost no content.**
Lines 604-623: A homeowner who receives a share link before certification sees only an amber banner and a tree count. There is no indication of when the report might be ready, no progress indicator, and no way to request a notification. The page feels like a dead end.

**F5.2: Tree cards show condition numbers (0-5) without clear meaning.**
The `CONDITION_FRIENDLY` map (lines 94-101) translates ratings to text, but the tree cards show condition as text only. A homeowner seeing "Fair condition" has no context for what that means for their tree. There is no tooltip or expandable explanation.

**F5.3: "What Happens Next" section is complex.**
The section handles 5 different cases (no_permit, regional, city/county, unsupported city, non-removal). For supported cities, it shows department name, address, phone, email, hours, portal URL, tips, and required documents. This is comprehensive but dense. A homeowner may be overwhelmed.

**F5.4: PDF download button text varies by report type but is not always clear.**
The download button says "Submit this PDF with your permit application to [City] [Department]" for removal permits. For health assessments, it says "Download Assessment Report." The removal permit text assumes the homeowner knows what a permit application is.

**F5.5: No print-friendly stylesheet.**
Despite CLAUDE.md mentioning "print-friendly" as a goal, there is no `@media print` styling in the share page. Homeowners who try to print the page will get the full web layout with navigation chrome.

### What Works Well

- Report type-specific summary stats are well-differentiated (lines 138-288).
- City-specific "What Happens Next" with tap-to-call and tap-to-email links.
- Prominent canopy value display for real estate packages (lines 672-693).
- OG meta tags for link previews (lines 52-78).
- Rate-limited analytics for share link opens (lines 437-454).
- Billing section with receipt-style card when `billingIncluded` (lines 517-528).
- Branded header with company logo creates professional appearance.
- Action translations use plain English ("healthy and will be preserved" instead of "retain").

---

## Flow 6: Settings

**Source:** `app/(app)/settings/page.tsx` (~2000+ lines, single client component)

### Card Inventory (12 cards, 7 separate save flows)

| # | Card Title | Fields | Save Mechanism |
|---|-----------|--------|----------------|
| 1 | Personal Information | Name, email, ISA cert #, phone, signature name, TRAQ toggle, additional certs, licenses | Single "Save Profile" button (saves all 12+ fields) |
| 2 | Company Information | Company name, address, phone, email, website | Same "Save Profile" button |
| 3 | Company Logo | File upload, profile photo upload | Immediate on file select (separate API) |
| 4 | Report Defaults | Toggles (TRAQ, cover letter, photos, appendix), default report type, disclaimer textarea, recommendation map, scope templates | Same "Save Profile" button |
| 5 | Observation Library | Drag-and-drop list (health + structural), enable/disable toggles, rename, add custom, reset | Separate "Save Observation Library" button |
| 6 | Species Presets | Tag input with autocomplete | Separate "Save Species Presets" button |
| 7 | Report Writing Style | Tone radio, preferred/avoid terms, disclaimer, custom instructions | Same "Save Profile" button |
| 8 | Client Billing | Default fee, payment instructions, show on share toggle | Same "Save Profile" button |
| 9 | PDF & Share | TRAQ appendix toggle, city contacts toggle, photo count, share message, thank-you message | Separate "Save PDF & Share Preferences" button |
| 10 | Valuation Defaults | Unit price, limiting conditions textarea | Separate "Save Valuation Defaults" button |
| 11 | AI Usage | Monthly/all-time cost, token counts, per-endpoint breakdown | Read-only (no save) |
| 12 | Danger Zone | (Not explicitly a card, but implied) | N/A |

### Friction Points

**F6.1: Seven different save buttons with different scopes.**
The "Save Profile" button saves cards 1, 2, 4, 7, and 8 together. But cards 5, 6, 9, and 10 each have their own save button hitting different API endpoints (`PUT /api/settings/observations`, `PUT /api/settings/species-presets`, `PUT /api/settings/pdf-share`, `PUT /api/settings/valuation`). The profile save also includes AI writing preferences. Users cannot tell which "Save" button saves which fields.

**F6.2: No unsaved changes indicator.**
Unlike the report editor (which shows "Unsaved changes" in amber), the settings page has no indication of pending changes. A user could modify 6 fields across 3 cards, then navigate away and lose everything except the observation library (which has its own change tracking via `obsChanged` state, line 332).

**F6.3: Success/error message is a single shared banner.**
Lines 268-271: `message` state is a single `{type, text}` object. Saving profile shows "Profile saved successfully" at the top of the page. Saving observations shows "Observation library saved." But if the user saves observations, then immediately saves profile and it fails, the error replaces the observation success message.

**F6.4: Settings page is a single 2000+ line client component.**
All 12 cards, their state, and their save logic are in one file. Initial load fetches the profile, then parses 7+ JSON fields with try/catch blocks (lines 372-477). This is slow on mobile and blocks the entire page if any parse fails.

**F6.5: Observation library drag-and-drop does not work on mobile.**
The drag handle is `hidden sm:block` (line 167). Mobile users see up/down arrow buttons instead (lines 175-192). While this is a functional fallback, the arrows are `h-3.5 w-3.5` (14px) -- below the 44px touch target minimum stated in CLAUDE.md.

**F6.6: Recommendation map and scope templates are nested inside "Report Defaults" card.**
These are conceptually different features (auto-action based on condition vs. scope of assignment text) bundled into one card. The recommendation map is a 6-row condition-to-action mapping. The scope templates are per-report-type text fields. Finding either requires scrolling through the Report Defaults card.

**F6.7: AI Writing Style card has no preview.**
Users set tone, preferred terms, and avoid terms, but cannot see how these preferences affect report output until they generate a report. A "Preview with these settings" button would provide immediate feedback.

### What Works Well

- Profile photo and company logo upload are immediate (no save button needed).
- Observation library has "Reset to defaults" button for recovery.
- Species presets autocomplete against a known species database.
- Usage stats card provides cost transparency.
- Each card has a descriptive icon and title using the display font.

---

## Cross-Flow Friction Summary

### Dead Ends (No Clear Next Action)

| Location | Issue | Severity |
|----------|-------|----------|
| Share page (uncertified) | Homeowner sees banner + tree count, nothing else | High |
| Dashboard (no_trees state) | "View Properties" button is 2 clicks from action | Medium |
| Dashboard (no context message) | Trees exist but no reports: no guidance shown | Medium |
| Step 2 onboarding | Passive content, user just clicks Continue | Low |

### Redundant Clicks

| Location | Issue | Extra Clicks |
|----------|-------|-------------|
| Dashboard "Need tree assessment" | Links to filtered list, not specific property | +2 |
| Settings: save observations + save profile | Two save actions for conceptually one session | +1 |
| Certification "Fix" link | Navigates away, must re-navigate back | +3-5 |
| Photo upload in field mode | Must save tree first, then reopen for photos | +2 |

### Context Loss

| Location | Issue |
|----------|-------|
| Certification Step 1 "Fix" links | User navigates to property page, loses certification dialog |
| Report editor on mobile | Edit/Split/Preview hidden, only Quick Review visible |
| Settings save feedback | Single message banner replaced by next action |

### Mobile Pain Points

| Location | Issue | Standard Violated |
|----------|-------|-------------------|
| Observation library arrows | 14px touch targets | 44px minimum (Apple HIG) |
| Field mode progress dots | 10px dots with 6px gaps | 44px minimum |
| Field mode connectivity dot | 8px with no label | Visibility in outdoor conditions |
| Report view mode toggle | 3 of 4 modes hidden on mobile | Feature parity |
| Settings page | 2000+ line component, slow render | Performance |

### Information Overload

| Location | Issue |
|----------|-------|
| Settings page | 12 cards, 7 save buttons, ~50 fields |
| Share page "What Happens Next" | 5 different rendering paths with dense city data |
| Report editor toolbar | 10+ action buttons when uncertified |
| Certification Step 1 | Validation checklist can show 10+ items |

### Missing Feedback

| Location | Issue |
|----------|-------|
| Settings page | No unsaved changes indicator |
| Auto-save (report editor) | Silent failures not surfaced to user |
| PDF download | No progress bar or time estimate |
| Onboarding Step 3 geocoding | Silent fallback if geocoding fails |
| Field mode draft save | localStorage only, no server sync |

---

## Recommendations (Prioritized)

### High Priority (Immediate Action)

1. **Allow photo capture before tree save in field mode.** Queue photos locally and attach after save completes. This matches the natural field workflow.

2. **Unify settings save model.** Either auto-save all fields on change (with debounce) or provide a single "Save All Settings" button. Eliminate the 7-button fragmentation.

3. **Add inline fix for certification validation failures.** Instead of navigating away, open the fix in a side sheet or expand the validation item with an inline form.

4. **Expand `SUPPORTED_CITIES` in onboarding to include all 21 jurisdictions.** The warning text is discouraging and inaccurate -- the app does support these cities at various confidence levels.

5. **Add unsaved changes indicators to settings page.** Show a persistent "Unsaved changes" bar with a global save button when any field has been modified.

### Medium Priority (Next Quarter)

6. **Break settings page into tabbed sections** (Profile, Observations, Reports, Billing, Advanced). Each tab loads independently.

7. **Add estimated ready date or notification opt-in to uncertified share page.** Reduce the dead-end feeling for homeowners.

8. **Make onboarding Step 2 interactive.** Let users click on tree rows to see assessment detail, or toggle between report types. Give them agency.

9. **Increase touch targets for observation library arrows, progress dots, and connectivity indicator.** Minimum 44px per Apple HIG.

10. **Replace `window.confirm` in regenerate flow with styled AlertDialog.** Consistency with rest of app.

### Long-term Opportunities

11. **Split report page into sub-components.** The 2900-line component with 45+ state variables could be broken into: EditorView, CertificationDialog, BillingCard, ListingInfoCard, PermitPipeline, VersionHistory.

12. **Add offline-first architecture for field mode.** Service worker + IndexedDB for tree data and photo queue. Currently, a network drop during field work loses unsaved data after the 30-second localStorage interval.

13. **Add print stylesheet to share page.** CSS `@media print` to hide non-essential elements and optimize for paper.

14. **Dashboard "Next Action Needed" should deep-link to the specific action** (e.g., directly to the property map for tree entry, or to the report page for generation).

15. **Settings preview for AI writing style.** Show a sample paragraph that changes based on the selected tone, preferred terms, and avoid terms.

---

## Methodology Notes

This audit was conducted by reading the actual source code for each flow, tracing user interactions through component logic, state management, and API calls. No assumptions were made about behavior that could not be verified in the code. File line numbers are referenced throughout for traceability.

**Files read:**
- `app/onboarding/page.tsx` (897 lines)
- `app/(app)/dashboard/page.tsx` (188 lines)
- `components/dashboard-content.tsx` (~700 lines)
- `components/mobile-field-mode.tsx` (915 lines)
- `components/property-map-view.tsx` (partial, header + types)
- `app/(app)/properties/[id]/report/page.tsx` (~2900 lines)
- `components/quick-review.tsx` (150 lines header)
- `app/share/[token]/page.tsx` (~900+ lines)
- `app/(app)/settings/page.tsx` (~2000+ lines)

**Limitations:**
- CSS computed styles were not visually verified (per CLAUDE.md: no preview/screenshot tool).
- API response times and real AI generation latency were estimated from code comments, not measured.
- Accessibility audit (ARIA roles, screen reader compatibility, keyboard navigation) was not in scope for this flow-tracing exercise.
