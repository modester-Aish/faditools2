# WooCommerce Integration Setup Guide

This guide explains how to set up and use the WooCommerce product listing and detail pages in your Next.js application.

## Features Implemented

### 1. Product Listing Page (`/products`)
- ✅ Dynamic product fetching from WooCommerce REST API
- ✅ Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- ✅ Product cards with image, title, price, description, and action buttons
- ✅ Smooth hover effects and animations
- ✅ Pagination (12 products per page)
- ✅ Search functionality
- ✅ Category filtering
- ✅ Sorting options (name, price, date)
- ✅ View mode toggle (grid/list)
- ✅ SEO-friendly URLs

### 2. Product Detail Page (`/products/[slug]`)
- ✅ Dynamic routing with product slug
- ✅ Product image gallery with thumbnails
- ✅ Product information (title, price, description)
- ✅ Add to cart functionality
- ✅ Stock status display
- ✅ Product attributes
- ✅ Related products section
- ✅ Breadcrumb navigation
- ✅ SEO metadata generation
- ✅ 404 handling for non-existent products

### 3. Additional Features
- ✅ Loading skeletons
- ✅ Error handling
- ✅ Mobile responsive design
- ✅ Clean URL structure
- ✅ Cart integration
- ✅ Search and filter components

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
WOO_CONSUMER_KEY=your_woocommerce_consumer_key
WOO_CONSUMER_SECRET=your_woocommerce_consumer_secret
```

### 2. WooCommerce API Setup

1. Go to your WordPress admin panel
2. Navigate to **WooCommerce → Settings → Advanced → REST API**
3. Click **Add Key**
4. Set the following:
   - **Description**: Next.js Integration
   - **User**: Select an admin user
   - **Permissions**: Read/Write
5. Click **Generate API Key**
6. Copy the **Consumer Key** and **Consumer Secret**

### 3. WooCommerce Configuration

Ensure your WooCommerce store has:
- Products with proper titles, descriptions, and images
- Categories assigned to products
- Proper pricing (regular price, sale price if applicable)
- Stock status configured
- Product images uploaded

## File Structure

```
app/
├── products/
│   ├── page.tsx                 # Product listing page
│   ├── not-found.tsx           # 404 page for products
│   └── [slug]/
│       └── page.tsx            # Product detail page

components/
├── ProductCard.tsx             # Individual product card
├── ProductGrid.tsx             # Product grid with pagination
├── ProductDetail.tsx           # Product detail component
├── ProductSearch.tsx           # Search and filter component
└── ProductSkeleton.tsx         # Loading skeletons

lib/
└── api.ts                      # WooCommerce API functions

types/
├── index.ts                    # TypeScript interfaces
└── wordpress.ts               # WordPress/WooCommerce types
```

## API Functions

### `fetchProducts()`
Fetches all published products from WooCommerce.

### `fetchProductBySlug(slug)`
Fetches a single product by its slug.

### `fetchProductCategories()`
Fetches all product categories for filtering.

## Components Usage

### ProductCard
```tsx
<ProductCard 
  product={product} 
  onAddToCart={handleAddToCart}
/>
```

### ProductGrid
```tsx
<ProductGrid 
  products={products}
  currentPage={page}
  totalPages={totalPages}
  totalProducts={totalProducts}
  category={category}
  search={search}
/>
```

### ProductDetail
```tsx
<ProductDetail 
  product={product}
  relatedProducts={relatedProducts}
/>
```

### ProductSearch
```tsx
<ProductSearch 
  categories={categories}
  currentCategory={category}
  currentSearch={search}
/>
```

## URL Structure

- **Product Listing**: `/products`
- **Product Detail**: `/products/product-slug`
- **With Pagination**: `/products?page=2`
- **With Search**: `/products?search=keyword`
- **With Category**: `/products?category=electronics`
- **Combined**: `/products?page=2&search=phone&category=electronics`

## Styling

The components use Tailwind CSS with custom animations and responsive design. Key features:

- Glassmorphism effects with backdrop blur
- Smooth hover animations
- Responsive grid layouts
- Custom loading states
- Modern typography

## SEO Features

- Dynamic meta tags for each product
- Open Graph and Twitter Card support
- Canonical URLs
- Structured data for products
- Breadcrumb navigation

## Performance Optimizations

- Static generation for product pages
- Image optimization with lazy loading
- Pagination to limit data transfer
- Caching strategies
- Skeleton loading states

## Troubleshooting

### Common Issues

1. **Products not loading**
   - Check WooCommerce API credentials
   - Verify products are published
   - Check network connectivity

2. **Images not displaying**
   - Ensure product images are uploaded in WooCommerce
   - Check image URLs in API response

3. **Categories not working**
   - Verify categories are assigned to products
   - Check category slugs in WooCommerce

4. **Search not working**
   - Ensure product titles and descriptions contain search terms
   - Check search parameter handling

### Debug Mode

Enable debug logging by adding to your environment:

```env
DEBUG_WOOCOMMERCE=true
```

This will log API requests and responses to the console.

## Customization

### Adding New Fields

To add custom product fields:

1. Update the `Product` interface in `types/wordpress.ts`
2. Modify the API mapping in `lib/api.ts`
3. Update the components to display the new fields

### Styling Customization

Modify the Tailwind classes in the components or add custom CSS to `app/globals.css`.

### Adding New Features

The modular component structure makes it easy to add new features like:
- Wishlist functionality
- Product reviews
- Advanced filtering
- Product comparison
- Social sharing

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify WooCommerce configuration

## Changelog

### v1.0.0
- Initial implementation
- Product listing and detail pages
- Search and filtering
- Responsive design
- SEO optimization
