# Troubleshooting Guide

## Common Issues and Solutions

### 1. Next.js File Permission Errors (Windows)

**Error:** `EPERM: operation not permitted, rename`

This is a common issue on Windows when Next.js tries to write temporary files but doesn't have the necessary permissions.

#### Quick Fix:
```bash
# Stop all Node.js processes
taskkill /f /im node.exe

# Remove .next directory
Remove-Item -Recurse -Force .next

# Restart development server
npm run dev
```

#### Using the Clean Script:
```bash
npm run clean-dev
```

#### Alternative Solutions:

1. **Run PowerShell as Administrator**
   - Right-click on PowerShell
   - Select "Run as Administrator"
   - Navigate to your project directory
   - Run `npm run dev`

2. **Use Windows Subsystem for Linux (WSL)**
   - Install WSL2
   - Run your development server in WSL environment

3. **Disable Antivirus Temporarily**
   - Some antivirus software can interfere with file operations
   - Temporarily disable real-time protection for your project folder

### 2. Port Already in Use

**Error:** `Port 3000 is already in use`

#### Solution:
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### 3. Module Not Found Errors

**Error:** `Cannot find module 'xxx'`

#### Solution:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 4. TypeScript Errors

**Error:** TypeScript compilation errors

#### Solution:
```bash
# Clear TypeScript cache
Remove-Item -Recurse -Force .next
Remove-Item tsconfig.tsbuildinfo

# Restart development server
npm run dev
```

### 5. Tailwind CSS Not Working

**Error:** Styles not applying

#### Solution:
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./app/globals.css -o ./app/output.css --watch
```

### 6. WooCommerce API Issues

**Error:** Cannot fetch products from WordPress

#### Solution:
1. Check if your WordPress site is accessible
2. Verify WooCommerce API credentials in environment variables
3. Ensure WooCommerce REST API is enabled
4. Check if the "Products" category exists in WordPress

### 7. Image Loading Issues

**Error:** Product images not loading

#### Solution:
1. Check if the image URLs are correct
2. Verify that the WordPress media library is accessible
3. Ensure proper image permissions on the server
4. Check if the featured_media ID exists

## Development Best Practices

### 1. Always Use the Clean Script
When encountering any file-related issues, use:
```bash
npm run clean-dev
```

### 2. Keep Dependencies Updated
```bash
npm update
npm audit fix
```

### 3. Use TypeScript Strict Mode
Enable strict TypeScript checking in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 4. Regular Maintenance
- Clear browser cache regularly
- Restart development server periodically
- Keep Node.js and npm updated

## Getting Help

If you're still experiencing issues:

1. Check the browser console for JavaScript errors
2. Check the terminal for server-side errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are properly installed
5. Try running the application in a different browser

## Environment Variables

Make sure these environment variables are set in your `.env.local` file:

```env
# WordPress/WooCommerce API
WOO_CONSUMER_KEY=your_consumer_key
WOO_CONSUMER_SECRET=your_consumer_secret

# WordPress Site URL
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```
