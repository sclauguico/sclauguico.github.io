// Mirror of src/data/site.ts — the worker is a separate build unit and
// can't import from the Astro app. Keep these in sync with it, and with
// ALLOWED_ORIGINS in wrangler.toml.

export const DOMAIN = 'sandylauguico.com';
export const SITE_URL = `https://${DOMAIN}`;

// Forwarded to Gmail by Cloudflare Email Routing; no mailbox is hosted.
export const CONTACT_EMAIL = `hello@${DOMAIN}`;
