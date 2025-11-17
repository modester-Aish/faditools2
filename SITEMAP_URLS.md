# Main Sitemap URLs

## Base URL
`https://faditools.com`

## Sitemap Structure

### 1. Static Pages (Priority: 1.0 - 0.7)
- `https://faditools.com/` (Priority: 1.0, Daily)
- `https://faditools.com/tools` (Priority: 0.8, Weekly)
- `https://faditools.com/packages` (Priority: 0.8, Weekly)
- `https://faditools.com/blog` (Priority: 0.7, Daily)
- `https://faditools.com/products` (Priority: 0.8, Weekly)
- `https://faditools.com/pages` (Priority: 0.7, Weekly)

### 2. Popular Tools Pages (Priority: 0.9, Weekly)
**Direct slug format - /[slug]**
- `https://faditools.com/ahrefs`
- `https://faditools.com/semrush`
- `https://faditools.com/moz`
- `https://faditools.com/canva`
- `https://faditools.com/chatgpt-plus`
- `https://faditools.com/runwayml`
- `https://faditools.com/netflix`
- `https://faditools.com/claude`

### 3. Legacy Tool Pages (Priority: 0.8, Weekly)
- `https://faditools.com/ahrefs`
- `https://faditools.com/semrush`
- `https://faditools.com/moz`
- `https://faditools.com/canva`
- `https://faditools.com/grammarly`
- `https://faditools.com/spyfu`
- `https://faditools.com/majestic`
- `https://faditools.com/buzzsumo`

### 4. Package Pages (Priority: 0.8, Weekly)
- `https://faditools.com/seo-combo`
- `https://faditools.com/heavy-pack`
- `https://faditools.com/mega-pack`
- `https://faditools.com/mega-combo`

### 5. WordPress Pages (Priority: 0.6, Monthly)
- `https://faditools.com/pages/[page-slug]` (Dynamic - from WordPress)

### 6. WordPress Posts (Priority: 0.5, Weekly)
- `https://faditools.com/[post-slug]` (Dynamic - from WordPress)

### 7. WooCommerce Products (Priority: 0.5, Weekly)
- `https://faditools.com/[product-slug]` (Dynamic - first 100 products)

## Sitemap Index URLs

### Main Sitemap Files:
- `https://faditools.com/sitemap.xml` - Main sitemap
- `https://faditools.com/sitemap-index.xml` - Sitemap index

### Sub-sitemaps:
- `https://faditools.com/sitemap-static.xml` - Static pages
- `https://faditools.com/sitemap-tools.xml` - Tools pages (API tools + Popular tools)
- `https://faditools.com/sitemap-packages.xml` - Package pages
- `https://faditools.com/sitemap-blog.xml` - Blog posts
- `https://faditools.com/sitemap-products.xml` - All products (500+)
- `https://faditools.com/sitemap-pages.xml` - WordPress pages

## Total URLs in Main Sitemap

**Static:** 6 pages
**Popular Tools:** 8 pages
**Legacy Tools:** 8 pages
**Packages:** 4 pages
**WordPress Pages:** Dynamic (varies)
**WordPress Posts:** Dynamic (varies)
**WooCommerce Products:** First 100 products

**Total Estimated:** 130+ URLs (excluding dynamic WordPress content)

## Notes

- Popular tools pages are at direct slug format: `/[slug]` (not `/tools/[slug]`)
- Main sitemap includes first 100 products only
- Full product list is in `sitemap-products.xml`
- Sitemap revalidates every hour (3600 seconds)
- All sitemaps are statically generated for performance

