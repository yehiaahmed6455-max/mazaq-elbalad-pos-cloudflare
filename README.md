# Mazaq Elbalad POS — Cloudflare Pages + Supabase adapter

This repository contains the Mazaq Elbalad POS frontend adapted to run on Cloudflare Pages and use Supabase for optional server-backed checks.

What I changed

- Replaced the direct Postgres/drizzle health check with a lightweight Supabase URL HEAD check so the project can be built on Cloudflare Pages (which doesn't allow direct TCP Postgres connections).
- Added a small Supabase client helper at `src/lib/supabase.ts` so you can use the Supabase JS client from server/client code when needed.
- Kept the original IndexedDB local-store approach — most application data still lives in the browser by default.

How to deploy on Cloudflare Pages (recommended flow)

1. Create a Supabase project
   - Go to https://app.supabase.com and create a new project.
   - After creation, copy the project URL (https://<project>.supabase.co) and the ANON/public key.

2. Connect the repository to Cloudflare Pages
   - In Cloudflare dashboard → Pages → Create a project → Connect to GitHub and choose this repository (`yehiaahmed6455-max/mazaq-elbalad-pos-cloudflare`).

3. Set environment variables in Pages
   - In Pages project settings → Environment variables, add the following for both Preview and Production:
     - `SUPABASE_URL` = `https://<your-project>.supabase.co`
     - `SUPABASE_ANON_KEY` = `<your-anon-key>`
   - (Optional) also set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if you want the client-side Supabase client to use them.

4. Build settings
   - Build command: `npm run build`
   - Build output directory: leave default (Cloudflare will detect Next.js)

5. Deploy
   - Trigger a deploy from Cloudflare Pages. The site will be built and published.

Notes and security

- Do NOT share your Supabase keys or Cloudflare API tokens publicly. Set them only in the Cloudflare Pages UI.
- The original server-side Postgres code (drizzle/pg) is left in the repository for reference but the Pages build cannot use direct Postgres connections at edge. If you need server-side Postgres-backed APIs, consider using a separate Node host (Vercel, Render) and front it with Cloudflare.

If you want, I can:
- Open a Pull Request on this repository with the adapter changes (I already pushed them to a branch).
- Walk you through creating the Pages project and adding the environment variables step-by-step.

