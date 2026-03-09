#!/bin/bash
set -e

PROJECT_DIR="/c/Users/Andre/OneDrive/Desktop/treecertify"
OUTPUT="$PROJECT_DIR/CODEBASE_SNAPSHOT.md"

get_lang() {
  case "$1" in
    *.tsx) echo "tsx" ;;
    *.ts) echo "typescript" ;;
    *.js) echo "javascript" ;;
    *.mjs) echo "javascript" ;;
    *.jsx) echo "jsx" ;;
    *.css) echo "css" ;;
    *.json) echo "json" ;;
    *.md) echo "markdown" ;;
    *.prisma) echo "prisma" ;;
    *.sql) echo "sql" ;;
    *.toml) echo "toml" ;;
    *.env*) echo "bash" ;;
    *) echo "" ;;
  esac
}

# Write header
printf '# TreeCertify — Codebase Snapshot\n\n' > "$OUTPUT"
printf '**Date:** March 3, 2026\n\n' >> "$OUTPUT"
printf '## Directory Tree\n\n' >> "$OUTPUT"
printf '```\n' >> "$OUTPUT"
cat >> "$OUTPUT" << 'TREE'
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
TREE
printf '```\n\n' >> "$OUTPUT"
printf '## Source Files\n' >> "$OUTPUT"

FILES=(
  "CLAUDE.md"
  "package.json"
  "middleware.ts"
  "prisma/schema.prisma"
  "prisma/seed.ts"
  "tailwind.config.ts"
  "next.config.mjs"
  "tsconfig.json"
  "components.json"
  "postcss.config.mjs"
  "next-env.d.ts"
  ".env.example"
  ".eslintrc.json"
  ".gitignore"
  "app/layout.tsx"
  "app/page.tsx"
  "app/globals.css"
  "app/(app)/layout.tsx"
  "app/(app)/dashboard/page.tsx"
  "app/(app)/properties/page.tsx"
  "app/(app)/properties/new/page.tsx"
  "app/(app)/properties/[id]/page.tsx"
  "app/(app)/properties/[id]/report/page.tsx"
  "app/(app)/settings/page.tsx"
  "app/(app)/ordinances/page.tsx"
  "app/onboarding/page.tsx"
  "app/share/[token]/page.tsx"
  "app/api/ai/generate-report/route.ts"
  "app/api/arborist/logo/route.ts"
  "app/api/arborist/onboard/route.ts"
  "app/api/arborist/photo/route.ts"
  "app/api/arborist/profile/route.ts"
  "app/api/arborist/usage/route.ts"
  "app/api/audio/parse/route.ts"
  "app/api/audio/transcribe/route.ts"
  "app/api/geocode/route.ts"
  "app/api/ordinances/check/route.ts"
  "app/api/ordinances/route.ts"
  "app/api/properties/[id]/audio/[audioId]/route.ts"
  "app/api/properties/[id]/audio/[audioId]/transcribe/route.ts"
  "app/api/properties/[id]/audio/route.ts"
  "app/api/properties/[id]/route.ts"
  "app/api/properties/[id]/share/route.ts"
  "app/api/properties/[id]/trees/[treeId]/audio/[audioId]/route.ts"
  "app/api/properties/[id]/trees/[treeId]/audio/[audioId]/transcribe/route.ts"
  "app/api/properties/[id]/trees/[treeId]/audio/route.ts"
  "app/api/properties/[id]/trees/[treeId]/photos/[photoId]/annotate/route.ts"
  "app/api/properties/[id]/trees/[treeId]/photos/[photoId]/route.ts"
  "app/api/properties/[id]/trees/[treeId]/photos/reorder/route.ts"
  "app/api/properties/[id]/trees/[treeId]/photos/route.ts"
  "app/api/properties/[id]/trees/[treeId]/route.ts"
  "app/api/properties/[id]/trees/export/route.ts"
  "app/api/properties/[id]/trees/route.ts"
  "app/api/properties/route.ts"
  "app/api/reports/[id]/certify/route.ts"
  "app/api/reports/[id]/pdf/route.ts"
  "app/api/reports/[id]/route.ts"
  "app/api/reports/[id]/validate/route.ts"
  "app/api/reports/[id]/versions/route.ts"
  "app/api/reports/[id]/word/route.ts"
  "app/api/reports/route.ts"
  "app/api/reports/usage/route.ts"
  "app/api/uploads/[...path]/route.ts"
  "lib/api-queue.ts"
  "lib/api-usage.ts"
  "lib/auth.ts"
  "lib/connectivity.tsx"
  "lib/db.ts"
  "lib/markdown-to-docx.ts"
  "lib/markdown.ts"
  "lib/ordinances.ts"
  "lib/photo-categories.ts"
  "lib/photo-queue.ts"
  "lib/report-templates.ts"
  "lib/report-types.ts"
  "lib/report-validation.ts"
  "lib/species.ts"
  "lib/uploads.ts"
  "lib/utils.ts"
  "hooks/use-audio-recorder.ts"
  "hooks/use-toast.ts"
  "scripts/test-ordinances.ts"
  "types/mapbox.d.ts"
  "components/app-providers.tsx"
  "components/condition-rating.tsx"
  "components/connectivity-indicator.tsx"
  "components/dashboard-content.tsx"
  "components/mobile-nav.tsx"
  "components/permit-status-pipeline.tsx"
  "components/photo-markup-editor.tsx"
  "components/properties-list.tsx"
  "components/property-audio-notes.tsx"
  "components/property-map-view.tsx"
  "components/property-map.tsx"
  "components/report-preview.tsx"
  "components/sidebar.tsx"
  "components/smart-dictation.tsx"
  "components/species-search.tsx"
  "components/status-badge.tsx"
  "components/tree-audio-notes.tsx"
  "components/tree-photos.tsx"
  "components/tree-side-panel.tsx"
  "components/tree-summary-panel.tsx"
  "components/voice-input.tsx"
  "components/type-fields/construction-encroachment-fields.tsx"
  "components/type-fields/health-assessment-fields.tsx"
  "components/type-fields/removal-permit-fields.tsx"
  "components/type-fields/tree-valuation-fields.tsx"
  "components/ui/avatar.tsx"
  "components/ui/badge.tsx"
  "components/ui/button.tsx"
  "components/ui/button-selector.tsx"
  "components/ui/card.tsx"
  "components/ui/command.tsx"
  "components/ui/dialog.tsx"
  "components/ui/dropdown-menu.tsx"
  "components/ui/form.tsx"
  "components/ui/input.tsx"
  "components/ui/label.tsx"
  "components/ui/multi-checkbox.tsx"
  "components/ui/popover.tsx"
  "components/ui/progress.tsx"
  "components/ui/scroll-area.tsx"
  "components/ui/select.tsx"
  "components/ui/separator.tsx"
  "components/ui/sheet.tsx"
  "components/ui/switch.tsx"
  "components/ui/table.tsx"
  "components/ui/tabs.tsx"
  "components/ui/textarea.tsx"
  "components/ui/toast.tsx"
  "components/ui/toaster.tsx"
  "components/ui/tooltip.tsx"
)

count=0
missing=0

for filepath in "${FILES[@]}"; do
  fullpath="$PROJECT_DIR/$filepath"

  if [ ! -f "$fullpath" ]; then
    echo "WARNING: File not found: $filepath" >&2
    missing=$((missing + 1))
    continue
  fi

  lang=$(get_lang "$filepath")

  printf '\n### %s\n\n' "$filepath" >> "$OUTPUT"
  printf '```%s\n' "$lang" >> "$OUTPUT"
  cat "$fullpath" >> "$OUTPUT"
  # Ensure file ends with newline before closing fence
  if [ "$(tail -c 1 "$fullpath" | wc -l)" -eq 0 ]; then
    printf '\n' >> "$OUTPUT"
  fi
  printf '```\n' >> "$OUTPUT"

  count=$((count + 1))
done

echo "=== COMPLETE ==="
echo "Files included: $count"
echo "Files missing: $missing"
ls -la "$OUTPUT"
wc -l "$OUTPUT"
