# Deployment Guide - Paper Lanterns Collections

## Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account with Workers enabled
2. **Domain**: `paperlanterns.ink` should be added to your Cloudflare account
3. **Wrangler CLI**: Already installed as dev dependency

## Initial Setup

### 1. Login to Cloudflare

```bash
npm run cf:login
```

This will open a browser window to authenticate with Cloudflare.

### 2. Get Your Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Copy the Account ID from the right sidebar
4. Update `wrangler.toml` with your account ID:

```toml
account_id = "your-account-id-here"
```

### 3. Set Up Custom Domain

In `wrangler.toml`, uncomment and configure the routes:

```toml
routes = [
  { pattern = "collections.paperlanterns.ink/*", zone_name = "paperlanterns.ink" }
]
```

Or set up the route manually in Cloudflare Dashboard:
- Go to Workers & Pages
- Select your worker
- Add route: `collections.paperlanterns.ink/*`
- Select zone: `paperlanterns.ink`

## Deployment Commands

### Build Only (Test)

```bash
npm run build
```

This creates the production build in the `dist/` directory.

### Dry Run (Preview Deployment)

```bash
npm run deploy:dry
```

This shows what will be deployed without actually deploying.

### Deploy to Production

```bash
npm run deploy
```

This builds and deploys to Cloudflare Workers.

## Post-Deployment Steps

### 1. Set Up DNS (if not already done)

In Cloudflare DNS settings for `paperlanterns.ink`:

1. Add a CNAME record:
   - Name: `collections`
   - Target: `your-worker-name.workers.dev` (or use orange cloud for proxied)
   - Proxy status: Proxied (orange cloud)

### 2. Verify SSL/TLS

- Go to SSL/TLS settings
- Ensure SSL/TLS encryption mode is set to "Full" or "Full (strict)"

### 3. Configure Caching (Optional)

The `_headers` file in `public/` already sets cache headers, but you can also configure:

1. Page Rules for additional caching
2. Cache Everything rule for static assets
3. Browser Cache TTL

### 4. Set Up Analytics (Optional)

- Enable Workers Analytics in Cloudflare Dashboard
- Consider adding Google Analytics if desired

## Performance Optimizations Applied

✅ **Font Loading**
- Async font loading with swap fallback
- Preconnect to Google Fonts

✅ **Caching Headers**
- Static assets: 1 year cache
- HTML pages: 1 hour with revalidation
- RSS/Sitemap: 1 day cache

✅ **Build Optimizations**
- CSS code splitting enabled
- HTML compression enabled
- Inline stylesheets for critical CSS

✅ **Security Headers**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection enabled
- Referrer-Policy configured

## SEO Optimizations Applied

✅ **Structured Data**
- Homepage: WebSite + SearchAction schema
- Letter pages: Article + Breadcrumb schema
- About page: AboutPage + Organization schema

✅ **Meta Tags**
- Complete Open Graph tags
- Twitter Card tags
- Canonical URLs
- Meta descriptions

✅ **Sitemap & RSS**
- XML sitemap at `/sitemap.xml`
- RSS feed at `/rss.xml`
- Submitted to search engines via robots.txt

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Focus states
- Responsive design

## Monitoring & Maintenance

### Check Deployment Status

```bash
wrangler deployments list
```

### View Logs

```bash
wrangler tail
```

### Update Deployment

Just run the deploy command again:

```bash
npm run deploy
```

Workers deployments are versioned, so you can always rollback if needed.

## Troubleshooting

### Issue: Build Fails

- Check Node.js version (should be 20+)
- Run `npm install` to ensure all dependencies are installed
- Check Astro and Cloudflare adapter compatibility

### Issue: Deployment Fails

- Verify account ID in `wrangler.toml`
- Ensure you're logged in: `npm run cf:login`
- Check Cloudflare Workers quota limits

### Issue: Site Not Accessible

- Verify DNS settings
- Check route configuration in Cloudflare Dashboard
- Wait 5-10 minutes for DNS propagation

### Issue: 404 Errors

- Ensure `output: 'server'` in `astro.config.mjs`
- Verify adapter mode is `'directory'`
- Check that routes are properly configured

## Cost Estimate

**Cloudflare Workers Free Tier:**
- 100,000 requests per day (free)
- More than enough for this project

**Paid Plan (if needed):**
- $5/month for 10 million requests
- Additional $0.50 per million requests

For a small-to-medium traffic site like this, you'll likely stay within the free tier.

## Support

If you encounter issues:
- Check Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Open an issue in the project repository

---

**Last Updated**: 2025-11-22
**Status**: Ready for deployment
