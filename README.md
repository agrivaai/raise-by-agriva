# AGRIVA Web Platform

Responsive Bengali agricultural knowledge platform foundation using Next.js, Payload CMS and PostgreSQL. It is configured for Netlify's Next.js runtime.

## Current status

- **Implemented in source:** responsive public landing page, published-article search/list/detail templates, CMS-managed tips, interactive source-backed quizzes, moderated community question queue, an editorial research brief desk for search signals/evidence/content plans, Payload admin/API scaffold, Bengali/English content fields, crop knowledge entities, contributor/editor/expert/farmer/admin roles, review records, draft version history, server-side editorial approval checks, high-risk agronomist review gate, metadata, robots and dynamic sitemap.
- **Checks completed:** TypeScript check and ESLint pass. Next.js compiled the application, but the full production build and dev server could not finish in this restricted environment because Next.js/Node worker processes were rejected (`spawn EPERM`). This is not a production-build pass.
- **Not production-ready:** database migrations have not been generated/applied; there is no Netlify project attached, and database, object storage, email, AI agent/live web research, weather, market rates and analytics are not connected. The research brief desk is currently manually maintained; it does not fetch trends or generate posts. Quiz pages work once reviewed quiz content is entered in the CMS. Community reading/moderation is scaffolded; public account registration, question submission and answers are not live. Marketplace checkout/listings and custom contributor/expert screens remain future work. No claims of Google Discover placement are made.
- **No seeded sample articles:** empty content is shown explicitly; no placeholder agricultural advice or fabricated data is public.

## Requirements

- Node.js `20.9+` (project pinned to Node 24 in `.nvmrc`)
- pnpm `11.25+`
- PostgreSQL database
- Strong `PAYLOAD_SECRET`
- Persistent object storage (R2/S3 adapter is a pending integration before media upload is enabled)

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (or `NETLIFY_DB_URL` when configured), `PAYLOAD_SECRET` and `NEXT_PUBLIC_SITE_URL`.
2. Install with `pnpm install`.
3. Generate and review a migration with `pnpm db:migrate:create`, then run `pnpm db:migrate` only against the intended database. Do not use schema push against production.
4. Create the first administrator with the one-time bootstrap command below.
5. Run `pnpm dev`, then sign in at `/admin/`.

One-time administrator bootstrap (run in a trusted local shell; do not deploy bootstrap credentials):

```powershell
$env:BOOTSTRAP_ADMIN_EMAIL = 'admin@example.com'
$env:BOOTSTRAP_ADMIN_PASSWORD = 'use-a-long-unique-password'
$env:BOOTSTRAP_ADMIN_NAME = 'AGRIVA Admin'
pnpm admin:bootstrap
Remove-Item Env:BOOTSTRAP_ADMIN_EMAIL,Env:BOOTSTRAP_ADMIN_PASSWORD,Env:BOOTSTRAP_ADMIN_NAME
```

The bootstrap command refuses to run if an admin already exists. No public signup or first-user admin endpoint is enabled.

## Netlify setup

- Connect this repository to Netlify; the Next.js adapter is auto-detected.
- Set `DATABASE_URL` or a configured `NETLIFY_DB_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL` in Netlify environment settings for build and runtime as required. Netlify Database provisioning is not enabled by this source project.
- Run reviewed database migrations through a controlled release step. Do not run destructive schema reset commands against production.
- Add persistent file storage before enabling image/media uploads. Netlify's deploy filesystem is not treated as permanent user upload storage.
- Configure the custom domain only after the production deploy is verified. DNS is not changed by this project.

## Editorial safeguards

- Anonymous readers can fetch only published articles.
- Contributors can create and edit their own drafts but cannot publish or edit published content.
- Only editors/admins can publish ordinary articles.
- High-risk articles require an approved, evidence-checked review record from an assigned and admin-verified agronomist before publication.
- Publishing any article requires at least one valid HTTP(S) source URL.
- Expert profiles are not publicly displayed until a separate public profile/consent page is implemented.

## Next implementation priorities

1. Provide a PostgreSQL database and production `PAYLOAD_SECRET`; generate/review migrations with `pnpm db:migrate:create`, then apply them through a controlled release.
2. Connect a Git repository to Netlify and configure runtime/build environment variables. Keep the existing `agriva.com.bd` DNS unchanged until the separate production rollout is approved.
3. Configure durable media storage and email before enabling uploads or account notifications.
4. Build custom contributor submission UX, expert review queue screens and consent-based public expert profiles.
5. Add approved-content AI/RAG, research jobs, quizzes, moderated community, marketplace and analytics only after the corresponding data, providers, privacy rules and moderation owners are in place.
