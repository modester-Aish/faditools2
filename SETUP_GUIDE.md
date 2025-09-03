# WordPress + Next.js Setup Guide

## Overview
This guide will help you set up the complete WordPress + Next.js integration with SEO support and WooCommerce products.

## 1. WordPress Backend Setup

### Required Plugins
1. **Advanced Custom Fields (ACF)** - For custom fields
2. **Yoast SEO** - For SEO optimization (or RankMath)
3. **WooCommerce** - For products
4. **Elementor** (Optional) - For page building

### Install the Custom Plugin
1. Copy `wordpress-plugin-fields.php` to your WordPress site
2. Place it in `/wp-content/plugins/enhanced-rest-api-fields/`
3. Activate the plugin from WordPress Admin → Plugins

### Configure Permalinks
1. Go to WordPress Admin → Settings → Permalinks
2. Select "Post name" (recommended: `/sample-post/`)
3. Save changes

### WooCommerce API Setup
1. Go to WordPress Admin → WooCommerce → Settings → Advanced → REST API
2. Click "Add Key"
3. Set Description: "Next.js Frontend"
4. Set Permissions: "Read"
5. Click "Generate API Key"
6. Copy the Consumer Key and Consumer Secret

## 2. Next.js Frontend Setup

### Environment Variables
Create a `.env.local` file in your Next.js project root:

```env
# WooCommerce API Credentials
WOO_CONSUMER_KEY=your_woocommerce_consumer_key_here
WOO_CONSUMER_SECRET=your_woocommerce_consumer_secret_here

# WordPress API Base URL (if different from default)
# WORDPRESS_API_BASE=https://your-wordpress-site.com/wp-json/wp/v2
# WOOCOMMERCE_API_BASE=https://your-wordpress-site.com/wp-json/wc/v3
```

### Update API Configuration
In `lib/api.ts`, update the API base URLs if needed:

```typescript
const API_BASE = 'https://your-wordpress-site.com/wp-json/wp/v2'
const WOOCOMMERCE_API = 'https://your-wordpress-site.com/wp-json/wc/v3'
```

## 3. Content Structure

### Pages
- Create pages in WordPress Admin → Pages
- Add custom fields using ACF
- Configure SEO using Yoast or RankMath
- Use Elementor for enhanced layouts

### Posts (Blog)
- Create posts in WordPress Admin → Posts
- Add custom fields and SEO as needed
- These will appear in `/blog` listing

### Products (WooCommerce)
- Create products in WordPress Admin → Products
- Add product images, descriptions, and attributes
- Configure SEO for products
- These will appear in `/products` listing

## 4. SEO Configuration

### Yoast SEO Setup
1. Install and activate Yoast SEO
2. Configure global SEO settings
3. For each page/post/product:
   - Set focus keyword
   - Write meta title and description
   - Configure social media settings
   - Set canonical URL if needed

### RankMath SEO Setup
1. Install and activate RankMath SEO
2. Run the setup wizard
3. For each page/post/product:
   - Set focus keyword
   - Configure meta title and description
   - Set canonical URL if needed

## 5. Testing

### Test WordPress API Endpoints
```bash
# Test Pages
curl "https://your-wordpress-site.com/wp-json/wp/v2/pages?_embed&acf=1"

# Test Posts
curl "https://your-wordpress-site.com/wp-json/wp/v2/posts?_embed&acf=1"

# Test WooCommerce Products
curl "https://your-wordpress-site.com/wp-json/wc/v3/products" \
  -H "Authorization: Basic $(echo -n 'consumer_key:consumer_secret' | base64)"
```

### Test Next.js Frontend
1. Run your Next.js development server
2. Visit individual pages via `/slug` (e.g., `/about-us`, `/contact`)
3. Visit `/blog` to see the posts listing
4. Visit `/products` to see the products listing
5. Click on individual items to see detail pages

## 6. Features Included

### SEO Features
- ✅ Meta titles and descriptions from Yoast/RankMath
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Robots meta tags
- ✅ Structured data support

### Content Features
- ✅ Dynamic pages from WordPress
- ✅ Blog posts with SEO data
- ✅ WooCommerce products with SEO data
- ✅ ACF custom fields support
- ✅ Elementor content support
- ✅ Featured images
- ✅ Product attributes and images

### Navigation Features
- ✅ Dynamic Pages dropdown in header
- ✅ Clean URLs (`/slug` instead of `/pages/slug`)
- ✅ 404 handling for old URLs
- ✅ Responsive design

## 7. Troubleshooting

### Plugin Fields Not Showing
1. Ensure the Enhanced REST API plugin is activated
2. Check if required plugins (ACF, Yoast, etc.) are installed
3. Verify API endpoints include `_embed&acf=1` parameters

### WooCommerce Products Not Loading
1. Check WooCommerce API credentials in `.env.local`
2. Verify WooCommerce is installed and activated
3. Ensure products are published and have proper permissions

### SEO Data Not Appearing
1. Check if Yoast SEO or RankMath is properly configured
2. Verify meta fields are filled in WordPress admin
3. Check browser developer tools for any API errors

### CORS Issues
1. The plugin includes CORS headers for Next.js
2. If issues persist, check your server configuration
3. Ensure your WordPress site allows cross-origin requests

## 8. Performance Optimization

### Caching
- Consider implementing API response caching
- Use Next.js ISR (Incremental Static Regeneration)
- Optimize images in WordPress

### API Optimization
- Use the custom `/faditools/v1/pages` endpoint for better performance
- Consider implementing pagination for large datasets
- Optimize database queries in WordPress

## 9. Security Considerations

1. **API Access**: The plugin allows public access to the REST API
2. **CORS**: Configured to allow cross-origin requests
3. **Data Exposure**: Only published content is exposed
4. **Rate Limiting**: Consider implementing rate limiting for production

## 10. Support

For issues with:
- **WordPress Setup**: Check plugin documentation
- **API Issues**: Verify endpoint URLs and parameters
- **Next.js Integration**: Check the API functions in `/lib/api.ts`
- **SEO Issues**: Verify plugin configuration in WordPress

## Next Steps

1. Install and configure the WordPress plugin
2. Set up WooCommerce API credentials
3. Create some test content in WordPress
4. Test the Next.js frontend
5. Configure SEO settings for your content
6. Deploy to production

Your Next.js frontend now has complete WordPress integration with SEO support! 🎉
