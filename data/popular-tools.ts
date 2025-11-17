export interface PopularTool {
  id: string
  name: string
  slug: string
  price: string
  originalPrice: string
  image: string
  description: string
  longDescription?: string
  features?: string[]
  useCases?: string[]
  category?: string
  buyUrl?: string
  productId?: string
}

export const popularTools: PopularTool[] = [
  {
    id: 'ahrefs',
    name: 'AHREF$',
    slug: 'ahrefs',
    price: '$30.00',
    originalPrice: '$99.00',
    image: '/images/tools/ahrefs-logo.svg',
    description: 'Comprehensive SEO toolkit for keyword research and backlink analysis',
    productId: '53',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/53/c/',
    longDescription: `Ahrefs is one of the most powerful SEO tools available, trusted by digital marketing professionals worldwide. It provides comprehensive keyword research, backlink analysis, competitor research, and rank tracking capabilities.

With Ahrefs, you can discover profitable keywords, analyze your competitors' backlink profiles, track your search rankings, and identify content opportunities. The tool offers extensive data on over 200 million keywords and billions of backlinks, making it an essential resource for any serious SEO campaign.

Key features include Site Explorer for analyzing any website's backlink profile, Keywords Explorer for finding the best keywords to target, Content Explorer for discovering top-performing content, and Rank Tracker for monitoring your search rankings.`,
    features: [
      'Site Explorer - Analyze any website\'s backlink profile',
      'Keywords Explorer - Find profitable keywords with search volume data',
      'Content Explorer - Discover top-performing content in your niche',
      'Rank Tracker - Monitor your search engine rankings',
      'Backlink Checker - Analyze your backlink profile and competitors',
      'Site Audit - Identify technical SEO issues',
      'Content Gap Analysis - Find content opportunities',
      'Historical Data - Track changes over time'
    ],
    useCases: [
      'Keyword research and discovery',
      'Backlink analysis and building',
      'Competitor research',
      'Content marketing strategy',
      'Technical SEO audits',
      'Rank tracking and monitoring'
    ],
    category: 'SEO Tools'
  },
  {
    id: 'semrush',
    name: 'SEMRU$H',
    slug: 'semrush',
    price: '$4.99',
    originalPrice: '$119.95',
    image: '/images/tools/semrush-logo.svg',
    description: 'All-in-one marketing toolkit for competitive analysis',
    productId: '8',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/8/c/',
    longDescription: `SEMrush is a comprehensive digital marketing toolkit that helps businesses improve their online visibility and discover marketing insights. It's an all-in-one platform for SEO, PPC, content, social media, and competitive research.

SEMrush provides powerful tools for keyword research, competitor analysis, backlink auditing, site auditing, and social media management. With access to over 20 billion keywords and 800+ million domains, SEMrush offers unparalleled insights into your digital marketing landscape.

The platform is trusted by over 10 million marketers worldwide and is used by leading agencies and Fortune 500 companies. Whether you're running SEO campaigns, managing PPC ads, or creating content strategies, SEMrush provides the data and tools you need to succeed.`,
    features: [
      'Keyword Research - Find profitable keywords with search volume',
      'Competitor Analysis - Analyze competitors\' strategies',
      'Backlink Audit - Monitor and analyze backlinks',
      'Site Audit - Identify and fix SEO issues',
      'Position Tracking - Monitor search rankings',
      'Content Marketing - Discover content ideas and opportunities',
      'Social Media Management - Schedule and analyze posts',
      'PPC Keyword Tool - Find keywords for paid campaigns'
    ],
    useCases: [
      'SEO optimization and research',
      'Competitive intelligence',
      'Content marketing planning',
      'PPC campaign management',
      'Social media strategy',
      'Link building campaigns'
    ],
    category: 'Marketing Tools'
  },
  {
    id: 'moz',
    name: 'Moz Pro',
    slug: 'moz',
    price: '$4.99',
    originalPrice: '$99.00',
    image: '/images/tools/moz-logo.svg',
    description: 'Professional SEO software for rank tracking and optimization',
    productId: '19',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/19/c/',
    longDescription: `Moz Pro is a comprehensive SEO software suite designed to help businesses improve their search engine rankings and online visibility. It's one of the most trusted SEO tools in the industry, known for its user-friendly interface and powerful features.

Moz Pro offers tools for keyword research, link building, site auditing, rank tracking, and local SEO. The platform provides access to the Moz Keyword Explorer, which includes search volume data, difficulty scores, and opportunity metrics for millions of keywords.

With Moz Pro, you can track your search rankings, analyze your backlink profile, identify technical SEO issues, and discover new link building opportunities. The tool is particularly strong in local SEO, making it ideal for businesses targeting local customers.`,
    features: [
      'Keyword Explorer - Research keywords with difficulty scores',
      'Link Explorer - Analyze backlink profiles',
      'Site Crawl - Identify technical SEO issues',
      'Rank Tracker - Monitor search engine rankings',
      'Local SEO - Optimize for local search results',
      'Page Optimization - On-page SEO recommendations',
      'Domain Authority - Measure website authority',
      'Link Building - Discover link opportunities'
    ],
    useCases: [
      'Rank tracking and monitoring',
      'Link building campaigns',
      'Technical SEO audits',
      'Local SEO optimization',
      'Keyword research',
      'Competitor analysis'
    ],
    category: 'SEO Tools'
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    slug: 'canva',
    price: '$4.99',
    originalPrice: '$12.99',
    image: 'https://img.icons8.com/color/96/canva.png',
    description: 'Professional design platform with premium templates',
    productId: '65',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/65/c/',
    longDescription: `Canva Pro is a powerful graphic design platform that makes it easy for anyone to create professional-quality designs. With millions of templates, photos, fonts, and design elements, Canva Pro empowers users to create stunning visuals for social media, marketing materials, presentations, and more.

Canva Pro includes access to premium templates, stock photos, fonts, and design elements. It also offers advanced features like background removal, brand kit management, magic resize, and access to over 100 million premium stock photos and videos.

Whether you're creating social media posts, marketing materials, presentations, or print designs, Canva Pro provides all the tools you need to create professional designs without the need for expensive design software or professional designers.`,
    features: [
      'Premium Templates - Access to millions of professional templates',
      'Stock Photos - Over 100 million premium stock photos and videos',
      'Brand Kit - Manage your brand colors, fonts, and logos',
      'Magic Resize - Resize designs for different platforms instantly',
      'Background Remover - Remove backgrounds with one click',
      'Premium Fonts - Access to thousands of premium fonts',
      'Team Collaboration - Work with your team in real-time',
      'Unlimited Storage - Store all your designs in the cloud'
    ],
    useCases: [
      'Social media graphics',
      'Marketing materials',
      'Presentations and slides',
      'Print designs',
      'Logo creation',
      'Video editing'
    ],
    category: 'Design Tools'
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    slug: 'chatgpt-plus',
    price: '$4.99',
    originalPrice: '$20.00',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    description: 'Best text Based AI Co pilot',
    productId: '29',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/29/c/',
    longDescription: `ChatGPT Plus is the premium version of OpenAI's revolutionary AI assistant. It provides access to GPT-4, the most advanced language model available, along with faster response times, priority access during peak times, and access to new features and improvements.

ChatGPT Plus is an essential tool for content creators, marketers, developers, and professionals who need AI assistance for writing, coding, research, analysis, and more. With GPT-4, you get more accurate responses, better reasoning capabilities, and the ability to handle complex tasks.

The platform can help with a wide range of tasks including content writing, code generation, data analysis, research, translation, summarization, and creative writing. It's like having a knowledgeable assistant available 24/7 to help with any task.`,
    features: [
      'GPT-4 Access - Use the most advanced AI model',
      'Faster Responses - Priority access for faster responses',
      'Priority Access - Access even during peak times',
      'New Features - Early access to new features and improvements',
      'Code Generation - Write and debug code',
      'Content Writing - Create high-quality content',
      'Data Analysis - Analyze and interpret data',
      'Multilingual Support - Work in multiple languages'
    ],
    useCases: [
      'Content creation and writing',
      'Code generation and debugging',
      'Research and analysis',
      'Translation and summarization',
      'Creative writing',
      'Business communication'
    ],
    category: 'AI Tools'
  },
  {
    id: 'runwayml',
    name: 'RunwayML',
    slug: 'runwayml',
    price: '$4.99',
    originalPrice: '$35.00',
    image: 'https://img.icons8.com/color/96/runway.png',
    description: 'Best AI video Maker',
    productId: '127',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/127/c/',
    longDescription: `RunwayML is a cutting-edge AI-powered video creation platform that makes professional video editing accessible to everyone. It uses advanced machine learning to provide powerful video editing tools, effects, and features that were previously only available to professional video editors.

With RunwayML, you can create stunning videos using AI-powered tools like green screen removal, object removal, motion tracking, style transfer, and more. The platform offers both web-based and desktop applications, making it easy to create professional videos from anywhere.

RunwayML is perfect for content creators, marketers, filmmakers, and anyone who needs to create high-quality videos quickly and easily. The platform supports various video formats and offers cloud-based rendering, so you don't need powerful hardware to create professional videos.`,
    features: [
      'AI Video Editing - Advanced AI-powered editing tools',
      'Green Screen - Remove backgrounds with AI',
      'Object Removal - Remove unwanted objects from videos',
      'Motion Tracking - Track and follow objects',
      'Style Transfer - Apply artistic styles to videos',
      'Color Grading - Professional color correction',
      'Cloud Rendering - Render videos in the cloud',
      'Multiple Formats - Support for various video formats'
    ],
    useCases: [
      'Video editing and post-production',
      'Social media video creation',
      'Marketing video production',
      'Content creation',
      'Film and video projects',
      'Educational videos'
    ],
    category: 'Video Tools'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    slug: 'netflix',
    price: '$4.99',
    originalPrice: '$15.99',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
    description: 'Entertainment from TV series',
    productId: '52',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/52/c/',
    longDescription: `Netflix is the world's leading streaming entertainment service, offering thousands of movies, TV shows, documentaries, and original content. With a Netflix subscription, you get unlimited access to a vast library of content that you can watch anytime, anywhere, on any device.

Netflix offers content in multiple languages and genres, including original series and movies that you can't find anywhere else. The platform uses advanced algorithms to recommend content based on your viewing history, making it easy to discover new shows and movies you'll love.

Whether you're looking for the latest blockbuster movies, binge-worthy TV series, documentaries, or original Netflix productions, you'll find it all on Netflix. The service supports multiple profiles, so everyone in your household can have their own personalized experience.`,
    features: [
      'Unlimited Streaming - Watch as much as you want',
      'HD & 4K Quality - High-quality video streaming',
      'Multiple Devices - Watch on any device',
      'Download for Offline - Download content to watch offline',
      'Multiple Profiles - Create profiles for family members',
      'Original Content - Exclusive Netflix originals',
      'No Ads - Ad-free viewing experience',
      'Multiple Languages - Content in various languages'
    ],
    useCases: [
      'Entertainment and relaxation',
      'Movie and TV show streaming',
      'Family entertainment',
      'Educational documentaries',
      'Original content viewing',
      'Offline entertainment'
    ],
    category: 'Entertainment'
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    price: '$4.99',
    originalPrice: '$20.00',
    image: '/images/tools/claude-logo.svg',
    description: 'AI coding vibe',
    productId: '113',
    buyUrl: 'https://members.seotoolsgroupbuy.us/cart/index/product/id/113/c/',
    longDescription: `Claude is an advanced AI assistant developed by Anthropic, designed to be helpful, harmless, and honest. It's particularly powerful for coding, analysis, writing, and complex reasoning tasks. Claude offers a more nuanced understanding of context and can handle longer conversations and documents.

Claude is known for its excellent coding capabilities, making it a favorite among developers. It can help with code generation, debugging, code review, documentation, and explaining complex code. The AI is also excellent at analysis, research, writing, and creative tasks.

With Claude, you get access to advanced reasoning capabilities, the ability to process long documents, and a more conversational AI experience. It's particularly useful for technical tasks, research, writing, and any situation where you need a thoughtful and accurate AI assistant.`,
    features: [
      'Advanced Coding - Excellent code generation and debugging',
      'Code Review - Review and improve code quality',
      'Documentation - Generate and improve documentation',
      'Long Context - Process long documents and conversations',
      'Analysis - Deep analysis of complex topics',
      'Writing - High-quality writing and editing',
      'Research - Research and information gathering',
      'Reasoning - Advanced reasoning capabilities'
    ],
    useCases: [
      'Code generation and debugging',
      'Technical documentation',
      'Code review and optimization',
      'Research and analysis',
      'Content writing',
      'Problem solving'
    ],
    category: 'AI Tools'
  }
]

export function getPopularToolBySlug(slug: string): PopularTool | undefined {
  return popularTools.find(tool => tool.slug === slug)
}

export function getAllPopularTools(): PopularTool[] {
  return popularTools
}

