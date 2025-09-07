import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const testUrl = 'https://www.toolsurf.com/seo-tools/shutterstock-private-account/';
    
    console.log('🔍 Testing scraping for:', testUrl);
    
    const response = await axios.get(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const html = response.data;
    
    // Extract some key parts for debugging
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi);
    const priceMatches = html.match(/\$[\d,]+\.?\d*/gi);
    const imgMatches = html.match(/<img[^>]*src="([^"]+)"[^>]*>/gi);
    
    // Try to find product name in different ways
    const productTitleMatch = html.match(/<h1[^>]*class="[^"]*product[^"]*"[^>]*>(.*?)<\/h1>/i);
    const entryTitleMatch = html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>(.*?)<\/h1>/i);
    
    return NextResponse.json({
      success: true,
      url: testUrl,
      debug: {
        title: titleMatch ? titleMatch[1] : 'No title found',
        h1Elements: h1Matches ? h1Matches.slice(0, 3) : 'No h1 elements found',
        prices: priceMatches ? priceMatches.slice(0, 5) : 'No prices found',
        images: imgMatches ? imgMatches.slice(0, 3) : 'No images found',
        productTitleMatch: productTitleMatch ? productTitleMatch[1] : 'No product title match',
        entryTitleMatch: entryTitleMatch ? entryTitleMatch[1] : 'No entry title match',
        htmlLength: html.length,
        first500Chars: html.substring(0, 500)
      }
    });

  } catch (error: any) {
    console.error('❌ Debug scraping error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
      url: 'https://www.toolsurf.com/seo-tools/shutterstock-private-account/'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Debug scraping API endpoint',
    instructions: 'Send a POST request to debug scraping issues'
  });
}
