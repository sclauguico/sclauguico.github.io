// Single source of truth for where the site is served from.
// Changing DOMAIN repoints the canonical URL and every self-reference.
// Two files outside this module also carry the host and must be edited
// by hand, because their formats can't import TS:
//   - CNAME + public/CNAME  (only exist when a custom domain is bound)
//   - worker/wrangler.toml  (ALLOWED_ORIGINS, and the custom-domain route)
// The worker mirrors these values in worker/src/config.ts.

export const DOMAIN = 'sandylauguico.com';
export const SITE_URL = `https://${DOMAIN}`;

// Forwarded to Gmail by Cloudflare Email Routing; no mailbox is hosted.
export const CONTACT_EMAIL = `hello@${DOMAIN}`;
