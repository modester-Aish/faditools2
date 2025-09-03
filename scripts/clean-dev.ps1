# Clean Development Environment Script
# This script helps resolve Next.js file permission issues on Windows

Write-Host "🧹 Cleaning Next.js development environment..." -ForegroundColor Yellow

# Kill any running Node.js processes
Write-Host "Stopping Node.js processes..." -ForegroundColor Cyan
taskkill /f /im node.exe 2>$null

# Remove .next directory
Write-Host "Removing .next directory..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ .next directory removed" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .next directory not found" -ForegroundColor Gray
}

# Remove node_modules cache if it exists
Write-Host "Cleaning node_modules cache..." -ForegroundColor Cyan
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✅ Cache removed" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No cache found" -ForegroundColor Gray
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Cyan
npm cache clean --force 2>$null
Write-Host "✅ NPM cache cleared" -ForegroundColor Green

Write-Host "`n🚀 Starting development server..." -ForegroundColor Yellow
Write-Host "If you still get permission errors, try running PowerShell as Administrator" -ForegroundColor Red

# Start the development server
npm run dev
