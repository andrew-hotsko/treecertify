# CLAUDE.md — Project Rules

## Verification
- Do NOT use the preview/screenshot tool to verify changes. Clerk auth redirects block the preview. Verify through build checks and server logs only.

## Workflow
- Always commit and push when you finish a task.

## Tech Stack
- This is a Next.js App Router project with Prisma (SQLite for now), Clerk auth, Tailwind CSS, and shadcn/ui components.

## Auth
- Do not break existing authentication — all routes under /(app)/ are protected by Clerk middleware.
