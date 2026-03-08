import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Server-side API route - backend URL is hidden from client
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'chatSettings.json')
    let data: any = null

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8')
      const parsed = JSON.parse(raw)
      data = parsed?.data ?? null
    }

    // Fallback: allow UI to render even if no settings exist
    if (!data) data = { enabled: false }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    })
  } catch (error) {
    console.error('Failed to fetch chat settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat settings' },
      { status: 500 }
    )
  }
}

