<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Every page exists twice, as a Spanish route under `src/routes/es.*` and an English route under `src/routes/en.*`, registered in `src/i18n/pages.ts` (`PAGE_PATHS`); why: localized URLs with hreflang need one real route per language.
- All visible copy lives in `src/i18n/es.ts` (source of the `Dict` type) and `src/i18n/en.ts`; components read it with `useT()`; why: the type system forces both languages to stay complete.
- Business facts (phone, hours, address, prices, links, GA/Search Console IDs, legal owner data) live only in `src/content/site.ts` and `src/content/pricing.ts`; unconfirmed values stay `null` and the UI hides or flags them instead of inventing them.
- Page title/description/canonical/hreflang come from `pageHead()` in `src/lib/seo.ts`, called from each leaf route's `head()`; the root loader supplies the request origin; why: absolute URLs stay correct on any domain.
- Booking and the contact form open WhatsApp with a prefilled message (no data stored); swap to `site.bookingUrl` when an online booking system exists.
- Third-party scripts and embeds (Google Analytics, Google Maps) load only after consent via `ConsentProvider`; why: GDPR.
- Every route states its sitemap decision in `staticData.sitemap` (`src/lib/sitemap.ts` makes the field required); `/sitemap.xml` derives its URLs from the router and takes the public origin from `site.url`; why: a new page can never silently miss the sitemap, and the domain changes in one place.
- The palette lives only in `src/styles.css` as raw palette variables mapped to role tokens (`background`, `surface`, `panel`, `ink` bands, `neon` accent); components use role classes such as `text-neon` or `bg-panel`, never hex values; why: the whole identity can be re-themed in one file.
- Neon animations are CSS-only utilities in `src/styles.css` (`neon-breathe`, `neon-border`, `card-neon`, `led-line`, `neon-pulse`, `neon-particle` via `NeonParticles`), animate only opacity/transform where possible, and are switched off in the `prefers-reduced-motion` block; why: premium motion without hurting phones or motion-sensitive visitors.
