# Blog Post Detail Page Design Prompt

## Overview
Yeh ek modern, professional blog post detail page hai jo WordPress backend se posts fetch karke display karti hai. Design clean, readable, aur SEO-friendly hai.

## Layout Structure

### 1. Hero Section (Top Banner)
- **Background**: Primary color (emerald/green) gradient with subtle pattern overlay
- **Layout**: 2-column grid (responsive - mobile par single column)
- **Left Side**:
  - Blog Post badge (white/20 opacity with backdrop blur)
  - Post title (large, bold, white text)
  - Meta information: Date • Reading time (in minutes)
  - Breadcrumbs: Blog › Category › Post Title
- **Right Side**:
  - Featured image (if available)
  - Rounded corners with shadow
  - Responsive height (h-80 on mobile, h-96 on desktop)

### 2. Three-Column Main Layout

#### Left Sidebar (3 columns width) - Table of Contents
- **Sticky positioning** (top-24) - scroll ke saath move nahi hota
- **White card** with shadow and border
- **Features**:
  - Table of Contents heading with icon
  - Auto-generated from post content headings (H1-H6)
  - Nested structure based on heading levels:
    - H1: Bold, dark gray, no indent
    - H2: Medium weight, lighter gray, ml-2
    - H3: Normal weight, ml-4
    - H4-H6: Progressively lighter, more indent
  - Clickable links with smooth scroll to sections
  - Hover effect: text color changes to primary color
  - If no headings found: Shows "No headings found" message

#### Center Column (6 columns width) - Main Content
- **Article container** with prose styling
- **Excerpt box** (if available):
  - Primary color background (light tint)
  - Left border (4px, primary color)
  - Italic text, larger font size
  - Rounded right corners
- **Main content**:
  - WordPress HTML content rendered safely
  - Auto-generated IDs added to all headings for anchor links
  - Proper typography with line-height and spacing
  - Gray text color for readability

#### Right Sidebar (3 columns width) - Related Posts
- **Sticky positioning** (top-24)
- **White card** with shadow and border
- **Features**:
  - "Related Posts" heading with icon
  - Shows up to 6 related posts (excluding current post)
  - Each related post card includes:
    - Featured image (if available) - h-32, rounded, hover scale effect
    - Post title (2 lines max with line-clamp)
    - Meta: Date • Reading time
    - Hover effect: Title color changes to primary
  - If no related posts: Shows "No related posts found" message

### 3. Back to Blog Button
- Centered below main content
- Primary color background
- White text
- Rounded corners
- Left arrow icon
- Hover effect: Darker shade

### 4. Footer Section
- Dark background (#1A1A1A)
- White text
- 4-column grid layout:
  - **Column 1**: Company info, description, social links (Twitter, LinkedIn)
  - **Column 2**: Tools links (AHREF$, SEMRU$H, Moz Pro, etc.)
  - **Column 3**: Packages links
  - **Column 4**: Support links
- Bottom border with copyright text

## Design Features

### Colors
- **Primary**: Emerald/Green (#10B981 or similar)
- **Background**: White (#FFFFFF)
- **Text**: Dark gray (#1F2937) for content, white for hero
- **Borders**: Light gray (#E5E7EB)
- **Shadows**: Subtle shadows for depth

### Typography
- **Headings**: Bold, large sizes (3xl-4xl for main title)
- **Body**: Regular weight, readable line-height
- **Meta text**: Smaller, lighter gray
- **Prose styling**: Tailwind prose plugin for content

### Spacing
- **Padding**: Consistent px-4 sm:px-6 lg:px-8
- **Gaps**: 8px between grid items
- **Margins**: Proper spacing between sections

### Responsive Design
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column layout
- **Desktop**: Full 3-column layout
- **Breakpoints**: sm, md, lg, xl

### Interactive Elements
- **Hover effects**: Color transitions, scale transforms
- **Smooth scrolling**: Anchor links scroll smoothly
- **Sticky sidebars**: Stay visible while scrolling
- **Image hover**: Scale effect on related post images

## Technical Implementation

### Functions Used
1. **formatDate()**: Formats WordPress date to readable format
2. **getReadingTime()**: Calculates reading time (200 words/minute)
3. **getFeaturedImageUrl()**: Extracts featured image from WordPress _embedded data
4. **extractHeadings()**: Regex to find all H1-H6 headings in content
5. **addHeadingIds()**: Adds anchor IDs to headings for TOC links

### Data Fetching
- Fetches post by slug from WordPress API
- Fetches all posts for related posts section
- Uses WordPress REST API with _embed parameter for featured images

### SEO Features
- Proper heading hierarchy
- Meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter cards
- Structured data (if implemented)

## Key Components

1. **Header**: Site navigation
2. **Hero Section**: Post title and featured image
3. **Table of Contents**: Auto-generated from content
4. **Main Content**: WordPress HTML content
5. **Related Posts**: Similar posts sidebar
6. **Back Button**: Navigation to blog listing
7. **Footer**: Site-wide footer

## Accessibility
- Semantic HTML (article, nav, etc.)
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- ARIA labels where needed

## Performance
- Next.js Image optimization
- Server-side rendering
- Lazy loading for images
- Efficient re-renders

---

**Note**: Yeh design modern, clean, aur user-friendly hai. Table of Contents aur Related Posts features user experience ko improve karte hain. Responsive design sab devices par theek se kaam karta hai.

