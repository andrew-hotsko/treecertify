# TreeCertify Dry Run Checklist

## Setup
- [ ] Open app on phone (Safari/Chrome mobile)
- [ ] Log in with test account
- [ ] Verify onboarding completed with real ISA credentials and company info

## Property Creation
- [ ] Create new property: use a real Palo Alto address
- [ ] Verify geocoding places the map correctly
- [ ] Verify report type selection works (choose Removal Permit)

## Field Assessment (do this outside if possible, or simulate)
- [ ] Place first tree pin on the map
- [ ] Enter species using species search — verify autocomplete works
- [ ] Enter DBH, height, canopy measurements
- [ ] Select condition rating — verify pin color updates
- [ ] Add health notes and structural notes
- [ ] Select recommended action (Remove)
- [ ] Verify ordinance auto-check runs and shows protection status
- [ ] Save tree — verify data persists on page refresh
- [ ] Add 2 more trees with different species
- [ ] Take photos for each tree
- [ ] Try voice dictation for one tree (if in a quiet place)

## Report Generation
- [ ] Click "Generate Report"
- [ ] Verify AI generation starts and streams/loads
- [ ] Read the generated report — check for:
  - [ ] Correct property address and city
  - [ ] All 3 trees listed in inventory
  - [ ] Ordinance section citations
  - [ ] Retention Feasibility section
  - [ ] Limitations section
  - [ ] No fabricated observations for empty notes
- [ ] Edit a section — verify editor works
- [ ] Check version history

## Certification
- [ ] Review quality gate checklist
- [ ] Address any warnings
- [ ] Type signature, check agreement box
- [ ] Certify — verify ceremony animation plays
- [ ] Verify report locks after certification

## PDF Export
- [ ] Download PDF
- [ ] Open on phone AND computer
- [ ] Check cover page: company info, "Prepared For" block, report title
- [ ] Check page numbers and running headers
- [ ] Check tree inventory table
- [ ] Check individual tree assessments
- [ ] Check photos (if included)
- [ ] Check signature block at the end
- [ ] Would you submit this to Palo Alto Planning? If not, note what's wrong.

## Share Link
- [ ] Generate share link
- [ ] Open in an incognito/private browser window
- [ ] Verify it loads without login
- [ ] Check homeowner-friendly language
- [ ] Try downloading PDF from share page

## Stress Tests
- [ ] Turn off wifi — try to save a tree — verify offline handling
- [ ] Try uploading a very large photo (10MB+) — verify it doesn't crash
- [ ] Try generating a report with 0 trees — verify error message
- [ ] Try certifying without signing — verify button is disabled

## Feedback System
- [ ] Verify feedback button (green circle) appears on dashboard
- [ ] Click it — verify dialog opens
- [ ] Select "Bug" type — verify pill highlights red
- [ ] Type a description
- [ ] Click "Attach Screenshot" — verify it captures and shows checkmark
- [ ] Submit — verify success toast appears
- [ ] Verify feedback button does NOT appear on share page

## Onboarding (reset onboardingStep to 0 to test)
- [ ] Navigate to /onboarding
- [ ] Step 1: Fill in credentials — verify "Continue" saves and advances
- [ ] Step 2: Upload logo — verify live preview shows it
- [ ] Step 2: Fill company fields — verify preview updates
- [ ] Step 2: Click "Skip" — verify it advances without requiring fields
- [ ] Step 3: Enter address and city — verify supported city gets green check
- [ ] Step 3: Enter unsupported city — verify amber warning appears
- [ ] Step 3: Submit — verify property is created and redirects
- [ ] Refresh at step 2 — verify it resumes from correct step

## Dashboard Welcome States
- [ ] With 0 properties: verify "Create your first property" card appears
- [ ] With properties but 0 trees: verify "Add tree assessments" card appears
- [ ] With trees but no reports: verify "Ready to generate..." card appears
- [ ] With certified report: verify normal dashboard (no welcome card)

## Notes & Issues Found
(Write down everything — every hesitation, confusion, or bug)
