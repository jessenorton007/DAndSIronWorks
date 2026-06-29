# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Commerce env:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, `SMTP_USER`, `SMTP_PASS` — sends contact and purchase notifications through SMTP
  - `ORDER_NOTIFICATION_TO` or `CONTACT_NOTIFICATION_TO` — recipient for submitted contact/purchase details, defaults to `dandsiron@yahoo.com`
  - `QUICKBOOKS_PAYMENT_URL` — optional hosted QuickBooks payment link used after a pre-made item purchase request is created
  - Full QuickBooks API charging still requires Intuit OAuth/payment credentials before live card processing should be enabled

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

D&S Iron Works website for custom ironwork, pre-made fire pits, pre-made rocket stoves, Etsy products, contact requests, analytics, and backend-backed purchase requests.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Do not collect raw card details in the React app. QuickBooks payment should happen through a hosted/authorized QuickBooks payment flow.
- Contact and purchase forms fall back to local browser storage in preview if the API is unavailable, but production should run the API server so SMTP notifications are sent.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
