# Cloudflare Speed Optimizations Checklist

**Site:** collections.paperlanterns.ink
**Last Updated:** 2025-11-22
**Worker:** paper-lanterns-collections

---

## ✅ Already Configured

### Worker-Level Optimizations (wrangler.toml)
- ✅ **Workers Assets** - Serving static files from global CDN
- ✅ **Auto-trailing-slash** - Automatic URL normalization
- ✅ **Observability enabled** - Performance monitoring
- ✅ **Modern compatibility date** - Latest features (2024-11-18)

### Build-Level Optimizations (Astro)
- ✅ **Static output** - Pre-rendered HTML for maximum speed
- ✅ **CSS code splitting** - Separate CSS bundles per page
- ✅ **HTML compression** - Minified HTML output
- ✅ **Async font loading** - Non-blocking Google Fonts
- ✅ **Optimized images** - Compile-time image processing
- ✅ **Inline critical CSS** - Auto-inlining for faster FCP

### HTTP Headers (_headers file)
- ✅ **Long-term asset caching** - 1 year cache for _assets/*
- ✅ **Security headers** - X-Frame-Options, X-Content-Type-Options, etc.
- ✅ **Referrer policy** - Privacy and security

---

## 🎯 Cloudflare Dashboard Optimizations to Enable

Go to: **Cloudflare Dashboard** → **paperlanterns.ink** → **Speed**

### 1. Auto Minify
**Path:** Speed → Optimization → Auto Minify

Enable all three:
- ☐ **JavaScript** - Minify JS files automatically
- ☐ **CSS** - Minify CSS files automatically
- ☐ **HTML** - Minify HTML files automatically

**Why:** Reduces file sizes by removing whitespace and comments (20-30% smaller)

---

### 2. Brotli Compression
**Path:** Speed → Optimization → Brotli

- ☐ **Enable Brotli** - Superior compression vs gzip (15-20% better)

**Why:** Better compression ratio than gzip, supported by all modern browsers

---

### 3. Early Hints
**Path:** Speed → Optimization → Early Hints

- ☐ **Enable Early Hints** - Send 103 Early Hints responses

**Why:** Allows browsers to preload resources before full page response (up to 30% faster LCP)

---

### 4. HTTP/3 (with QUIC)
**Path:** Network → HTTP/3 (with QUIC)

- ☐ **Enable HTTP/3** - Next generation protocol

**Why:** Faster connection establishment, better performance on poor networks

---

### 5. 0-RTT Connection Resumption
**Path:** Network → 0-RTT Connection Resumption

- ☐ **Enable 0-RTT** - Faster TLS handshakes for repeat visitors

**Why:** Eliminates round-trip time for returning visitors (up to 300ms faster)

---

### 6. WebSockets
**Path:** Network → WebSockets

- ☐ **Enable WebSockets** - Enable WebSocket proxying

**Why:** Required for some modern features, no downside to enabling

---

### 7. Rocket Loader
**Path:** Speed → Optimization → Rocket Loader

- ☐ **Enable Rocket Loader** - Asynchronous JavaScript loading

**Why:** Defers JavaScript loading to improve page load time

⚠️ **Note:** Test this carefully - can sometimes break sites. Try with **Auto** first, disable if issues occur.

---

### 8. Mirage (Image Optimization)
**Path:** Speed → Optimization → Mirage

- ☐ **Enable Mirage** - Lazy load images, optimize for slow connections

**Why:** Progressive JPEG loading, lazy loading for images below fold

**Available on:** Business plan and above (not free plan)

---

### 9. Polish (Image Compression)
**Path:** Speed → Optimization → Polish

- ☐ **Enable Polish** - Automatic image compression
- ☐ Select: **Lossy** (recommended) or **Lossless**
- ☐ **WebP** - Convert images to WebP format

**Why:** Reduces image sizes by 30-50% without visible quality loss

**Available on:** Pro plan and above (not free plan)

---

### 10. Caching Level
**Path:** Caching → Configuration → Caching Level

- ☐ Set to: **Standard** (default) or **Aggressive**

**Why:** Aggressive caching can improve performance but may cache query strings

**Recommendation:** Keep **Standard** for this site (we have query-based search)

---

### 11. Browser Cache TTL
**Path:** Caching → Configuration → Browser Cache TTL

- ☐ Set to: **4 hours** to **1 year** (currently Auto)

**Why:** Controls how long browsers cache resources

**Recommendation:** Keep **Auto** (respects our _headers file)

---

### 12. Always Online
**Path:** Caching → Configuration → Always Online

- ☐ **Enable Always Online** - Serve cached version if origin is down

**Why:** Cloudflare serves cached copy if Workers are down (unlikely but good backup)

---

### 13. Tiered Cache
**Path:** Caching → Tiered Cache

- ☐ **Enable Tiered Cache** - Multi-level caching hierarchy

**Why:** Better cache hit rates, especially for global audiences

**Available on:** All plans (free too!)

---

### 14. Cache Reserve (Optional)
**Path:** Caching → Cache Reserve

- ☐ **Enable Cache Reserve** - Persistent cache storage

**Why:** Keeps content cached longer, better for infrequently accessed pages

**Available on:** Paid add-on ($0.36/GB per month)

**Recommendation:** Not needed for free tier, site is small enough

---

### 15. Argo Smart Routing (Premium)
**Path:** Traffic → Argo Smart Routing

- ☐ **Enable Argo** - Intelligent routing via Cloudflare's network

**Why:** 30% faster average, routes around congestion

**Cost:** $5/month + $0.10 per GB

**Recommendation:** Consider if budget allows, great performance boost

---

### 16. Load Balancing (Optional)
**Path:** Traffic → Load Balancing

**Skip for now** - Only needed if you have multiple origins

---

### 17. Zaraz (Tag Management)
**Path:** Zaraz (if using analytics/tracking)

- ☐ Configure **Zaraz** for third-party scripts if needed

**Why:** Loads tracking scripts via Workers, faster than traditional tags

**Recommendation:** Only if you add Google Analytics or similar

---

## 🔥 Advanced Performance: Page Rules

**Path:** Rules → Page Rules

Create these optimization rules (3 free rules on free plan):

### Rule 1: Cache Everything for Static Assets
```
URL Pattern: collections.paperlanterns.ink/_assets/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 year
  - Browser Cache TTL: 1 year
```

### Rule 2: Bypass Cache for Search
```
URL Pattern: collections.paperlanterns.ink/search*
Settings:
  - Cache Level: Bypass
```

### Rule 3: Cache HTML Pages
```
URL Pattern: collections.paperlanterns.ink/*
Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 hour
  - Browser Cache TTL: 1 hour
```

---

## 🚀 DNS Optimizations

**Path:** DNS → Settings

- ✅ **CNAME Flattening** - Should be automatic for CNAME at root
- ✅ **Cloudflare CDN** - Orange cloud enabled for collections subdomain
- ☐ **DNSSEC** - Enable for additional security

---

## 📊 Performance Monitoring

### Cloudflare Analytics
**Path:** Analytics → Performance

Monitor:
- **Cache Hit Ratio** - Should be >90% after warming up
- **Bandwidth Savings** - See compression effectiveness
- **Origin Response Time** - Workers should be <10ms
- **Visitor Geography** - See where users are coming from

### Cloudflare Web Analytics
**Path:** Analytics → Web Analytics

- ☐ **Enable Web Analytics** - Privacy-focused, no cookies
- ☐ Add beacon to site if desired (currently not added)

---

## 🔍 Testing Performance

After enabling optimizations, test with:

### 1. PageSpeed Insights
```
https://pagespeed.web.dev/analysis?url=https://collections.paperlanterns.ink
```

**Target Scores:**
- Performance: >95
- Accessibility: >90
- Best Practices: 100
- SEO: 100

### 2. GTmetrix
```
https://gtmetrix.com/
```

**Test URL:** https://collections.paperlanterns.ink

**Target:**
- Performance: A (>90%)
- Structure: A (>90%)
- LCP: <1.2s
- TBT: <200ms

### 3. WebPageTest
```
https://www.webpagetest.org/
```

**Target:**
- First Byte: <200ms
- Start Render: <800ms
- Fully Loaded: <2s

### 4. Cloudflare Observatory
```
https://observatory.cloudflare.com/
```

Test your domain for security and performance best practices.

---

## ✅ Implementation Checklist

### Immediate (Free - Do Now)
- [ ] Enable Auto Minify (JS, CSS, HTML)
- [ ] Enable Brotli compression
- [ ] Enable HTTP/3 (QUIC)
- [ ] Enable 0-RTT Connection Resumption
- [ ] Enable Early Hints
- [ ] Enable WebSockets
- [ ] Enable Tiered Cache
- [ ] Enable Always Online
- [ ] Set up 3 Page Rules (see above)
- [ ] Enable DNSSEC

### Test Before Enabling (Free)
- [ ] Test Rocket Loader on staging/preview first
- [ ] Monitor cache hit ratio in analytics

### Paid Upgrades (Optional)
- [ ] Polish (Pro+): $20/month - Image optimization
- [ ] Mirage (Business+): $200/month - Advanced image features
- [ ] Argo Smart Routing: $5/month + $0.10/GB - 30% faster routing
- [ ] Cache Reserve: $0.36/GB/month - Persistent cache

---

## 📈 Expected Performance Gains

After enabling all free optimizations:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| First Contentful Paint | ~1.0s | ~0.6s | 40% faster |
| Largest Contentful Paint | ~1.5s | ~0.9s | 40% faster |
| Time to Interactive | ~1.8s | ~1.1s | 39% faster |
| Total Page Size | 2.3 MB | 1.8 MB | 22% smaller |
| Lighthouse Score | ~90 | ~98 | +8 points |

---

## 🎯 Priority Order

1. **High Impact, Zero Risk** (Do immediately):
   - Auto Minify
   - Brotli
   - HTTP/3
   - 0-RTT
   - Early Hints
   - Tiered Cache

2. **High Impact, Low Risk** (Do soon):
   - Page Rules
   - DNSSEC

3. **Test First** (Monitor after enabling):
   - Rocket Loader (can break JS-heavy sites)

4. **Paid Upgrades** (Evaluate based on budget):
   - Argo Smart Routing ($5/mo) - Best ROI
   - Polish ($20/mo Pro plan) - Good for image-heavy sites

---

## 📝 Notes

- Most settings take effect immediately
- Some changes may take up to 5 minutes to propagate globally
- Always test on staging/preview before applying to production
- Monitor analytics for 24-48 hours after changes
- Cache warming: First visitors after deployment will be slower, subsequent visits much faster

---

**Next Steps:**
1. Go to Cloudflare Dashboard
2. Follow this checklist section by section
3. Test performance after each major change
4. Monitor analytics for any issues
5. Celebrate your blazing-fast site! 🎉
