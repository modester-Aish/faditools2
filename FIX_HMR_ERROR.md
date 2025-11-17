# Fix HMR Error - Steps

## Problem:
Next.js HMR (Hot Module Replacement) error - module factory not available

## Solution:

### Step 1: Stop the Development Server
- Press `Ctrl + C` in the terminal where `npm run dev` is running
- Wait for the server to completely stop

### Step 2: Clear Next.js Cache
Run these commands in PowerShell:

```powershell
# Navigate to project directory
cd faditools-main

# Delete .next folder
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Delete node_modules/.cache if exists
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
```

### Step 3: Restart Development Server
```powershell
npm run dev
```

## Alternative: If above doesn't work

### Option 1: Full Clean
```powershell
# Stop server first (Ctrl + C)
cd faditools-main
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules/.cache
npm run dev
```

### Option 2: Reinstall Dependencies (if needed)
```powershell
# Stop server first
cd faditools-main
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

## Why This Happens:
- HMR update ke dauran module factory missing ho gaya
- Build cache corrupt ho gaya
- Server restart ki zarurat hai

## Note:
Agar server running hai to `.next` folder delete nahi hoga. Pehle server stop karein (Ctrl + C).

