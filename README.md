# FadiTools - WordPress Backend Integration

A Next.js frontend application that integrates with a WordPress backend for data management. The WordPress backend is hosted on a subdomain and provides API endpoints for tools, packages, and testimonials.

## 🚀 Features

- **WordPress Backend Integration**: Fetches data from WordPress REST API endpoints
- **Dynamic Routing**: Individual pages for tools and packages with SEO optimization
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Built-in caching and error handling
- **SEO Friendly**: Meta tags, Open Graph, and structured data
- **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
faditools/
├── app/                    # Next.js 13+ App Router
│   ├── tools/             # Tools pages
│   ├── packages/          # Packages pages
│   ├── testimonials/      # Testimonials page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ToolCard.tsx      # Tool display component
│   ├── PackageCard.tsx   # Package display component
│   ├── TestimonialCard.tsx # Testimonial display component
│   └── ...               # Other components
├── lib/                  # Utility functions
│   └── api.ts           # WordPress API integration
├── types/               # TypeScript type definitions
│   └── index.ts        # Shared types
└── data/               # Static data (fallback)
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- WordPress backend running on `https://app.faditools.com`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd faditools
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 WordPress Backend Configuration

The application expects the following WordPress REST API endpoints:

### API Endpoints

- **Tools**: `https://app.faditools.com/wp-json/toolshub/v1/tools`
- **Packages**: `https://app.faditools.com/wp-json/toolshub/v1/packages`
- **Testimonials**: `https://app.faditools.com/wp-json/toolshub/v1/testimonials`

### Data Structure

#### Tools API Response
```json
{
  "id": 1,
  "name": "SEMrush",
  "price": "$5.00",
  "period": "Per user/month",
  "popular": true,
  "color": "from-red-400 to-red-600",
  "icon": "📊",
  "description": "Comprehensive SEO toolkit",
  "slug": "semrush"
}
```

#### Packages API Response
```json
{
  "id": 1,
  "name": "SEO Combo",
  "price": "$25.00",
  "tools": ["SEMrush", "Ahrefs", "Moz Pro"],
  "popular": false,
  "color": "from-blue-500 to-cyan-500",
  "icon": "🎯",
  "savings": "Save $15 vs individual",
  "toolCount": 3,
  "slug": "seo-combo"
}
```

#### Testimonials API Response
```json
{
  "id": 1,
  "title": "Amazing SEO Results!",
  "name": "Ahmed Hassan",
  "role": "Digital Marketing Expert",
  "company": "TechCorp Solutions",
  "location": "Karachi, Pakistan",
  "rating": 5,
  "avatar": "👨‍💼",
  "content": "Review content here..."
}
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages & Routes

### Main Pages
- `/` - Homepage with featured content
- `/tools` - All tools listing
- `/tools/[slug]` - Individual tool page
- `/packages` - All packages listing
- `/packages/[slug]` - Individual package page
- `/testimonials` - Customer testimonials

### Features
- **SEO Optimization**: Each page has proper meta tags and Open Graph data
- **Static Generation**: Pages are pre-rendered for better performance
- **Error Handling**: Graceful error boundaries and 404 pages
- **Caching**: API responses are cached for 5 minutes
- **Responsive**: Mobile-first design with Tailwind CSS

## 🎨 Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for animations and special effects
- **Responsive design** that works on all devices
- **Dark mode ready** (can be easily implemented)

## 🔒 Security

- No sensitive data is exposed to the frontend
- API calls are made server-side where possible
- Error messages don't expose internal details
- CORS is handled properly

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🔄 Updates

The application is designed to work with the WordPress backend. When the backend data changes, the frontend will automatically reflect those changes on the next page load or cache refresh.

---

**Note**: This frontend application is designed to work exclusively with the specified WordPress backend. No user authentication or admin functionality is included - it's purely for displaying content from the WordPress API.
