# Kriovya Labs Portfolio

Next.js portfolio and lead-generation site for `operionlabs.in`, built from the
`operionlabs_top_tier_portfolio_build_deploy_security_guide.pdf` implementation guide.

## Stack

- Next.js App Router, TypeScript and Tailwind CSS
- Supabase PostgreSQL for contact, quote and demo requests
- Resend for lead notification email
- Zod, React Hook Form and server route validation
- Security headers, honeypots and launch-ready rate limits
- Playwright smoke and security tests

## Local Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill production values only on the machine or
deployment environment:

- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `AI_API_KEY`
- `ENABLE_HSTS=true` only after HTTPS is stable on `operionlabs.in` and `www.operionlabs.in`

Never commit `.env.local`. The service role key must stay server-side only.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor. Keep RLS enabled. The browser
does not insert directly into Supabase; all public forms call Next.js route handlers.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run e2e
```

Install Playwright browsers with `npx playwright install` before running e2e tests on
a fresh machine.

## Deploy

Import the GitHub repository into Vercel, set the environment variables for Preview
and Production, then map `operionlabs.in` and `www.operionlabs.in` in Vercel Domains.
Copy DNS values exactly from Vercel and Resend. Keep `ENABLE_HSTS=false` until SSL is
verified.
