# Prompt: "Choose Your Perfect Plan" Section Design

## Overview
Create a pricing cards section with the title "Choose Your Perfect Plan" that features interactive 3D flip cards with hover effects, animations, and a modern gradient design.

## Section Structure

### Header Section
- **Container**: 
  - Width: 100%
  - Height: Auto
  - Margin Bottom: 64px (mb-16 = 4rem)
  - Text Alignment: Centered
  
- **Title**: "Choose Your Perfect Plan" 
  - **Font Size**: 
    - Mobile: 30px (text-3xl = 1.875rem)
    - Desktop: 36px (text-4xl = 2.25rem)
  - **Font Weight**: Bold (font-bold = 700)
  - **Color**: text-gray-900
  - **Width**: 100%
  - **Height**: Auto
  - **Margin Bottom**: 16px (mb-4 = 1rem)
  - **Alignment**: Centered (text-center)
  - **Line Height**: Auto
  
- **Subtitle**: "Get instant access to premium tools at unbeatable prices"
  - **Font Size**: 18px (text-lg = 1.125rem)
  - **Color**: text-gray-600
  - **Width**: 100%
  - **Height**: Auto
  - **Alignment**: Centered (text-center)
  - **Line Height**: Auto
  - **Margin**: 0 (no additional margin)

### Layout
- **Container**: 
  - Max Width: 1280px (max-w-7xl)
  - Width: 100% (responsive)
  - Padding: 16px mobile (px-4), 24px tablet (px-6), 32px desktop (px-8)
  - Centered with auto margins
- **Section**: 
  - Padding Top/Bottom: 64px (py-16 = 4rem)
- **Grid**: 
  - Mobile: 1 column (100% width)
  - Tablet: 2 columns (md:grid-cols-2) - each card ~50% width minus gap
  - Desktop: 3 columns (lg:grid-cols-3) - each card ~33.33% width minus gap
- **Gap between cards**: 24px (gap-6 = 1.5rem)

## Card Design (Front Side)

### Card Container
- **Width**: 100% of grid column (auto, responsive)
  - Mobile: ~100% width (minus padding)
  - Tablet: ~48% width (2 columns with gap)
  - Desktop: ~31% width (3 columns with gap)
- **Height**: Fixed at 500px (h-[500px])
- **Padding**: 24px all sides (p-6 = 1.5rem)
- **Background**: Gradient from emerald-25 to emerald-50 with backdrop blur
- **Border**: 1px solid emerald-500/15, increases to emerald-500/30 on hover
- **Border Radius**: 16px (rounded-2xl = 1rem)
- **Shadow**: 
  - Default: shadow-lg (0 10px 15px -3px rgba(0,0,0,0.1))
  - Hover: shadow-2xl (0 25px 50px -12px rgba(0,0,0,0.25)) with emerald glow
- **Hover Effect**: 
  - Translates up 16px (-translate-y-4 = -1rem)
  - Shadow increases with emerald glow (shadow-emerald-500/20)
  - Smooth transition (duration-500 = 500ms)
- **Position**: Relative with overflow hidden
- **3D Perspective**: 1000px for flip animation (perspective: 1000px)

### Popular Badge (Optional)
- **Position**: Absolute, top: -12px (-top-3), right: 16px (right-4)
- **Width**: Auto (based on content)
- **Height**: Auto (based on content)
- **Padding**: 8px horizontal (px-4), 8px vertical (py-2)
- **Background**: Gradient from red-600 to red-700
- **Text**: "Most Popular" in white, bold, 14px (text-sm)
- **Shape**: Fully rounded (rounded-full)
- **Font Size**: 14px (text-sm)
- **Animation**: Subtle bounce animation (animate-bounce-subtle)
- **Z-index**: 50

### Icon Section
- **Container**: Centered, circular, flex container
- **Width**: 64px (w-16 = 4rem)
- **Height**: 64px (h-16 = 4rem)
- **Border Radius**: 50% (rounded-full)
- **Background**: Gradient (varies per card: blue, orange, purple)
- **Icon**: Emoji or symbol (⭐, ⚡, 👑)
- **Icon Size**: 30px (text-3xl = 1.875rem)
- **Hover**: Scales to 110% (scale-110 = 70.4px x 70.4px)
- **Margin Bottom**: 16px (mb-4 = 1rem)
- **Animation**: Floating animation (animate-float-delay-1)

### Plan Name
- **Font Size**: 24px (text-2xl = 1.5rem)
- **Font Weight**: Bold (font-bold = 700)
- **Color**: text-gray-900, changes to text-emerald-600 on hover
- **Alignment**: Centered (text-center)
- **Line Height**: Auto
- **Margin Bottom**: 8px (mb-2 = 0.5rem)
- **Width**: 100%

### Description
- **Font Size**: 14px (text-sm = 0.875rem)
- **Color**: text-gray-600
- **Alignment**: Centered (text-center)
- **Line Height**: Auto
- **Margin Bottom**: 16px (mb-4 = 1rem)
- **Width**: 100%

### Price Section
- **Container**: Centered flex container
- **Price Font Size**: 36px (text-4xl = 2.25rem)
- **Price Font Weight**: Bold (font-bold = 700)
- **Price Color**: text-red-600
- **Period Font Size**: 18px (text-lg = 1.125rem)
- **Period Color**: text-gray-600
- **Alignment**: Centered (text-center)
- **Margin Bottom**: 16px (mb-4 = 1rem)
- **Width**: 100%

### Tool Count
- **Font Size**: 14px (text-sm = 0.875rem)
- **Font Weight**: Semibold (font-semibold = 600)
- **Color**: text-gray-700
- **Alignment**: Centered (text-center)
- **Margin Bottom**: 24px (mb-6 = 1.5rem)
- **Width**: 100%

### Benefits List
- **Container**: Flex column, flex-1 (takes available space)
- **Layout**: Vertical list with spacing
- **Gap Between Items**: 12px (space-y-3 = 0.75rem)
- **Margin Bottom**: 24px (mb-6 = 1.5rem)
- **Width**: 100%
- **Items**: 
  - **Checkmark Icon**: 
    - Width: 20px (w-5 = 1.25rem)
    - Height: 20px (h-5 = 1.25rem)
    - Color: text-green-500
    - Margin Right: 8px (mr-2 = 0.5rem)
  - **Text**: 
    - Font Size: 14px (text-sm = 0.875rem)
    - Color: text-gray-700
  - **Item Layout**: Flex row with items-center

### View Tools Button
- **Style**: Underlined text link (underline)
- **Width**: Auto (based on content)
- **Height**: Auto (based on content)
- **Color**: text-red-600, changes to text-red-700 on hover
- **Font Size**: 14px (text-sm = 0.875rem)
- **Font Weight**: Medium (font-medium = 500)
- **Action**: Triggers card flip animation
- **Margin Bottom**: 16px (mb-4 = 1rem)
- **Alignment**: Centered (text-center)
- **Cursor**: Pointer

### Get Access Button
- **Width**: 100% (w-full)
- **Height**: Auto (based on padding and content)
- **Padding**: 
  - Vertical: 12px (py-3 = 0.75rem)
  - Horizontal: Auto (centered text)
- **Border Radius**: 8px (rounded-lg = 0.5rem)
- **Font Size**: 16px (default)
- **Font Weight**: Semibold (font-semibold = 600)
- **Text**: "Get Instant Access"
- **Text Alignment**: Centered (text-center)
- **Colors**: 
  - Default: bg-emerald-600, text-white
  - Popular cards: bg-red-600, text-white
  - Hover: bg-emerald-700 or bg-red-700
- **Hover**: Scale to 105% (scale-105)
- **Shadow**: shadow-lg (0 10px 15px -3px rgba(0,0,0,0.1))
- **Link**: External link to signup page
- **Cursor**: Pointer

### Background Overlays
- **Hover Overlay**: 
  - Position: Absolute, inset-0 (covers full card)
  - Width: 100% of card
  - Height: 100% of card (500px)
  - Background: Gradient from emerald-100 to emerald-200
  - Opacity: 0 default, 100% on hover
  - Border Radius: 16px (matches card)
- **Shimmer Effect**: 
  - Position: Absolute, inset-0
  - Width: 100% of card
  - Height: 100% of card
  - Background: Gradient stripe (from-transparent via-white/20 to-transparent)
  - Transform: translate-x-full default, translate-x-0 on hover
  - Duration: 1000ms transition

## Card Design (Back Side)

### Back Container
- **Width**: 100% of card (same as front)
- **Height**: 500px (same as front, h-[500px])
- **Padding**: 24px all sides (p-6 = 1.5rem)
- **Position**: Absolute, inset-0 (covers full card area)
- **Background**: Same gradient as front (emerald-25 to emerald-50)
- **Border**: Same as front (border-emerald-500/15)
- **Border Radius**: 16px (rounded-2xl)
- **Shadow**: shadow-2xl
- **Same styling as front** but rotated 180 degrees
- **Content**: Tools list
- **Visibility**: Hidden until card is flipped (backface-hidden)
- **Transform**: rotateY(180deg)
- **Display**: Flex column (flex flex-col)
- **Overflow**: Hidden

### Return Instruction
- **Text**: "← Hover out to return"
- **Font Size**: 14px (text-sm = 0.875rem)
- **Color**: text-gray-500
- **Width**: 100%
- **Height**: Auto
- **Margin Bottom**: 16px (mb-4 = 1rem)

### Tools List Title
- **Text**: "{Plan Name} Tools"
- **Font Size**: 20px (text-xl = 1.25rem)
- **Font Weight**: Bold (font-bold = 700)
- **Color**: text-gray-900
- **Width**: 100%
- **Height**: Auto
- **Margin Bottom**: 16px (mb-4 = 1rem)

### Tools Grid
- **Container**: 
  - Width: 100%
  - Height: Auto (flex-1 to fill available space)
  - Max Height: 400px (for scrolling)
  - Overflow: Vertical scroll (overflow-y-auto)
  - Padding Right: 8px (pr-2 = 0.5rem) for scrollbar space
- **Layout**: 2 columns grid (grid-cols-2)
- **Gap**: 8px (gap-2 = 0.5rem) between grid items
- **Scrollbar**: 
  - Width: 6px
  - Track: #f1f1f1 background, 3px border-radius
  - Thumb: #888 background, 3px border-radius
  - Thumb Hover: #555 background
- **Each Tool Item**:
  - **Container**: Flex row, items-start
  - **Checkmark Icon**: 
    - Width: 16px (w-4 = 1rem)
    - Height: 16px (h-4 = 1rem)
    - Color: text-red-600
    - Margin Right: 4px (mr-1 = 0.25rem)
    - Margin Top: 2px (mt-0.5 = 0.125rem)
    - Flex Shrink: 0 (flex-shrink-0)
  - **Tool Name**: 
    - Font Size: 14px (text-sm = 0.875rem)
    - Color: text-gray-700
    - Width: Auto (flex-1)
    - Height: Auto
    - Line Height: Auto

## Animations

### Fade In Up
- **Effect**: Cards fade in from bottom with staggered delay
- **Starting Position**: 
  - Opacity: 0
  - Transform: translateY(30px)
- **Ending Position**:
  - Opacity: 1
  - Transform: translateY(0)
- **Animation Delay**: index * 0.15s (staggered per card)
- **Duration**: 600ms (0.6s) ease-out
- **Timing Function**: ease-out

### Float Animation
- **Effect**: Icon gently floats up and down
- **Starting Position**: translateY(0px)
- **Mid Position**: translateY(-10px) at 50%
- **Ending Position**: translateY(0px) at 100%
- **Duration**: 3s, infinite loop
- **Timing Function**: ease-in-out
- **Movement Range**: 10px vertical distance

### Bounce Subtle
- **Effect**: Popular badge subtle bounce
- **Starting Position**: translateY(0)
- **Mid Position**: translateY(-5px) at 50%
- **Ending Position**: translateY(0) at 100%
- **Duration**: 2s, infinite loop
- **Timing Function**: ease-in-out
- **Movement Range**: 5px vertical distance

### Flip Animation
- **Effect**: 3D card flip on click of "View included tools"
- **Starting Transform**: rotateY(0deg)
- **Ending Transform**: rotateY(180deg)
- **Duration**: 700ms
- **Timing Function**: Default (ease)
- **Perspective**: 1000px (on parent container)
- **Trigger**: Click button or hover
- **Return**: Mouse leave from card container (rotates back to 0deg)
- **Transform Style**: preserve-3d
- **Backface Visibility**: hidden

## Color Scheme

### Primary Colors
- **Emerald**: 
  - Light: emerald-25, emerald-50, emerald-100, emerald-200
  - Medium: emerald-500, emerald-600, emerald-700
- **Red**: red-600, red-700 (for price and popular badge)
- **Gray**: gray-600, gray-700, gray-900 (for text)

### Icon Background Gradients
- Blue: from-blue-500 to-blue-600
- Orange: from-orange-500 to-orange-600
- Purple: from-purple-500 to-purple-600

## Responsive Design

### Mobile (< 768px)
- **Breakpoint**: 0px - 767px
- **Grid Layout**: Single column (grid-cols-1)
- **Card Width**: ~100% (minus container padding 16px each side)
  - Actual width: calc(100% - 32px)
- **Card Height**: 500px (fixed)
- **Container Padding**: 16px horizontal (px-4)
- **Section Padding**: 64px vertical (py-16)
- **Gap Between Cards**: 24px (gap-6)
- **Title Font Size**: 30px (text-3xl)

### Tablet (768px - 1024px)
- **Breakpoint**: 768px - 1023px
- **Grid Layout**: 2 columns (md:grid-cols-2)
- **Card Width**: ~48% (each card in 2-column grid minus gap)
  - Calculation: (100% - 24px gap) / 2 = ~48% per card
- **Card Height**: 500px (fixed)
- **Container Padding**: 24px horizontal (px-6)
- **Section Padding**: 64px vertical (py-16)
- **Gap Between Cards**: 24px (gap-6)
- **Title Font Size**: 36px (text-4xl)

### Desktop (> 1024px)
- **Breakpoint**: 1024px and above
- **Grid Layout**: 3 columns (lg:grid-cols-3)
- **Card Width**: ~31% (each card in 3-column grid minus gaps)
  - Calculation: (100% - 48px total gaps) / 3 = ~31% per card
- **Card Height**: 500px (fixed)
- **Container Padding**: 32px horizontal (px-8)
- **Section Padding**: 64px vertical (py-16)
- **Gap Between Cards**: 24px (gap-6)
- **Title Font Size**: 36px (text-4xl)
- **Max Container Width**: 1280px (max-w-7xl)

## Technical Requirements

### Technologies
- React/Next.js with TypeScript
- Tailwind CSS for styling
- useState for flip state management
- CSS-in-JS for custom animations

### State Management
- Track flipped state per card using object: `{ [index]: boolean }`
- Handle flip on button click
- Handle return on mouse leave

### Custom Styles Needed
- Backface visibility hidden for 3D effect
- Transform style preserve-3d
- Custom scrollbar styling for tools list
- Keyframe animations for fade, float, and bounce

### Accessibility
- Proper semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for buttons

## Sample Card Data Structure

```typescript
interface PricingCard {
  name: string
  price: string
  toolCount: string
  description: string
  icon: string
  iconBgColor: string
  benefits: string[]
  tools: string[]
  isPopular?: boolean
}
```

## Key Features to Implement

1. ✅ 3D flip card animation
2. ✅ Hover effects with elevation
3. ✅ Gradient backgrounds
4. ✅ Shimmer effect on hover
5. ✅ Staggered fade-in animations
6. ✅ Floating icon animation
7. ✅ Popular badge with bounce
8. ✅ Responsive grid layout
9. ✅ Scrollable tools list on back
10. ✅ Smooth transitions throughout

## Quick Reference: Key Dimensions

### Container & Layout
- **Max Container Width**: 1280px (max-w-7xl)
- **Section Padding**: 64px top/bottom (py-16)
- **Container Padding**: 16px mobile, 24px tablet, 32px desktop
- **Grid Gap**: 24px (gap-6)

### Card Dimensions
- **Card Width**: 
  - Mobile: ~100% (minus 32px padding)
  - Tablet: ~48% (2 columns)
  - Desktop: ~31% (3 columns)
- **Card Height**: 500px (fixed)
- **Card Padding**: 24px all sides (p-6)
- **Border Radius**: 16px (rounded-2xl)

### Typography Sizes
- **Title**: 30px mobile, 36px desktop
- **Subtitle**: 18px
- **Plan Name**: 24px
- **Price**: 36px
- **Description**: 14px
- **Tool Count**: 14px
- **Benefits Text**: 14px
- **Tools Text**: 14px

### Icon & Badge Sizes
- **Icon Container**: 64px × 64px
- **Icon Size**: 30px
- **Icon Hover**: 70.4px × 70.4px (110% scale)
- **Checkmark (Benefits)**: 20px × 20px
- **Checkmark (Tools)**: 16px × 16px
- **Popular Badge**: Auto width/height

### Button Sizes
- **Get Access Button**: 100% width, auto height
- **Button Padding**: 12px vertical (py-3)
- **Button Border Radius**: 8px

### Scrollable Areas
- **Tools List Max Height**: 400px
- **Scrollbar Width**: 6px

### Animation Distances
- **Card Hover Lift**: 16px up (-translate-y-4)
- **Float Animation**: 10px vertical movement
- **Bounce Animation**: 5px vertical movement
- **Fade In Start**: 30px below (translateY)

---

**Use this prompt to recreate the exact same "Choose Your Perfect Plan" section design with all animations, hover effects, and styling details.**
