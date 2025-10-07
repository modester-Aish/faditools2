# Products Not Showing - FIX

## Problem
Your products are not showing because the WooCommerce API credentials are not configured.

## Solution

### Step 1: Create Environment File
Create a file named `.env.local` in the root directory of your project with the following content:

```env
# WooCommerce Configuration
WOOCOMMERCE_BASE_URL=https://app.faditools.com

# WooCommerce REST API Credentials
WC_CONSUMER_KEY=your_actual_consumer_key_here
WC_CONSUMER_SECRET=your_actual_consumer_secret_here

# Debug Mode (optional)
DEBUG_WOOCOMMERCE=true
```

### Step 2: Get WooCommerce API Credentials

1. Go to your WordPress admin panel at: `https://app.faditools.com/wp-admin`
2. Navigate to **WooCommerce → Settings → Advanced → REST API**
3. Click **Add Key** button
4. Fill in the form:
   - **Description**: Next.js FadiTools Integration
   - **User**: Select an admin user
   - **Permissions**: Select **Read/Write**
5. Click **Generate API Key**
6. Copy the **Consumer Key** and **Consumer Secret**
7. Replace the values in your `.env.local` file:
   - Replace `your_actual_consumer_key_here` with your Consumer Key
   - Replace `your_actual_consumer_secret_here` with your Consumer Secret

### Step 3: Restart Development Server

After creating the `.env.local` file:

1. Stop your development server (press Ctrl+C)
2. Restart it with: `npm run dev`

Your products should now load correctly!

## What Was Changed

I fixed the following in your code:
- Changed `export const dynamic = 'force-static'` to `export const dynamic = 'force-dynamic'`
- This allows the page to fetch data from WooCommerce at runtime instead of trying to pre-render it at build time

## Verify Setup

After completing the steps above:
1. Go to `http://localhost:3000/products`
2. You should see your products loading
3. Check the browser console for any errors
4. Look for "✅ Fetched X total products from WooCommerce" message

## Troubleshooting

If products still don't show:
1. Check that you copied the credentials correctly (no extra spaces)
2. Verify your WooCommerce store has published products
3. Check the browser console for error messages
4. Make sure your WooCommerce API is accessible (not blocked by firewall)
5. Verify the WOOCOMMERCE_BASE_URL is correct

