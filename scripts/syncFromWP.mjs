import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function getBaseUrls() {
  const backend = requireEnv('WORDPRESS_BACKEND_URL').replace(/\/$/, '')
  const syncBase = ((process.env.WORDPRESS_SYNC_URL || '') || backend).replace(
    /\/$/,
    '',
  )
  return { backend, syncBase }
}

function getWpAuthHeaders() {
  const username = process.env.WORDPRESS_USERNAME
  const password = process.env.WORDPRESS_APPLICATION_PASSWORD

  if (!username || !password) {
    throw new Error(
      'WORDPRESS_USERNAME and WORDPRESS_APPLICATION_PASSWORD must be set for WordPress REST API auth',
    )
  }
  const token = Buffer.from(`${username}:${password}`).toString('base64')
  return {
    Authorization: `Basic ${token}`,
  }
}

async function fetchWithPagination(url, config = {}) {
  const all = []
  let page = 1
  // Use per_page=100 to reduce request count; WordPress max is usually 100
  const perPage = 100

  while (true) {
    try {
      const response = await axios.get(url, {
        ...config,
        params: {
          per_page: perPage,
          page,
          ...(config.params || {}),
        },
      })
      const data = Array.isArray(response.data) ? response.data : []
      if (data.length === 0) break
      all.push(...data)

      // If fewer than perPage, no more pages
      if (data.length < perPage) break

      page += 1
    } catch (error) {
      // If we hit a 400 on a higher page, it usually means "no more pages"
      if (error.response && error.response.status === 400 && page > 1) {
        break
      }
      throw error
    }
  }

  return all
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  await fs.mkdir(dataDir, { recursive: true })
  return dataDir
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

async function readExistingJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function syncHomepageMeta(dataDir, backendUrl) {
  console.log('Syncing homepage meta (Yoast)...')
  const targetUrl = backendUrl

  const yoastEndpoint = `${backendUrl}/wp-json/yoast/v1/get_head`

  try {
    const response = await axios.get(yoastEndpoint, {
      params: { url: targetUrl },
    })

    const payload = response.data || {}
    const yoastJson = payload.json || payload.yoast_head_json || {}

    const metaTitle =
      yoastJson.title || payload.title || yoastJson.og_title || null
    const metaDescription =
      yoastJson.description ||
      payload.description ||
      yoastJson.og_description ||
      null

    const homepageData = {
      fetchedAt: new Date().toISOString(),
      contentSectionHtml: '',
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      rawYoast: yoastJson || null,
    }

    const outPath = path.join(dataDir, 'homepageContent.json')
    await writeJson(outPath, homepageData)

    console.log('Homepage meta synced -> data/homepageContent.json')
    return { success: true }
  } catch (error) {
    console.error(
      'Failed to sync homepage meta from Yoast:',
      error.response
        ? `${error.response.status} ${error.response.statusText}`
        : error.message,
    )
    return { success: false, error }
  }
}

async function syncPages(dataDir, syncBase) {
  console.log('Syncing pages...')
  const pagesEndpoint = `${syncBase}/wp-json/wp/v2/pages`

  try {
    const pages = await fetchWithPagination(pagesEndpoint, {
      headers: getWpAuthHeaders(),
      params: { _embed: 1 },
    })

    const normalized = pages.map(page => {
      const yoast = page.yoast_head_json || {}
      let featuredImage = null
      if (
        page._embedded &&
        page._embedded['wp:featuredmedia'] &&
        Array.isArray(page._embedded['wp:featuredmedia']) &&
        page._embedded['wp:featuredmedia'][0]
      ) {
        const media = page._embedded['wp:featuredmedia'][0]
        featuredImage = media.source_url || (media.guid && media.guid.rendered) || null
      }
      return {
        id: page.id,
        slug: page.slug,
        title: page.title?.rendered ?? '',
        content: page.content?.rendered ?? '',
        excerpt: page.excerpt?.rendered ?? '',
        date: page.date ?? '',
        modified: page.modified ?? '',
        status: page.status ?? '',
        type: page.type ?? '',
        menu_order: page.menu_order ?? 0,
        featured_image: featuredImage,
        meta_title: yoast.title || null,
        meta_description: yoast.description || null,
        yoast_head_json: yoast || null,
      }
    })

    const outPath = path.join(dataDir, 'pages.json')
    await writeJson(outPath, normalized)

    console.log(`Pages synced -> data/pages.json (count: ${normalized.length})`)
    return { success: true, count: normalized.length }
  } catch (error) {
    console.error(
      'Failed to sync pages:',
      error.response
        ? `${error.response.status} ${error.response.statusText}`
        : error.message,
    )
    return { success: false, error }
  }
}

async function syncPosts(dataDir, syncBase) {
  console.log('Syncing posts...')
  const postsEndpoint = `${syncBase}/wp-json/wp/v2/posts`

  try {
    const posts = await fetchWithPagination(postsEndpoint, {
      headers: getWpAuthHeaders(),
      params: { _embed: 1 },
    })

    const normalized = posts.map(post => {
      const yoast = post.yoast_head_json || {}
      let featuredImage = null
      if (
        post._embedded &&
        post._embedded['wp:featuredmedia'] &&
        Array.isArray(post._embedded['wp:featuredmedia']) &&
        post._embedded['wp:featuredmedia'][0]
      ) {
        const media = post._embedded['wp:featuredmedia'][0]
        featuredImage = media.source_url || (media.guid && media.guid.rendered) || null
      }
      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered ?? '',
        content: post.content?.rendered ?? '',
        excerpt: post.excerpt?.rendered ?? '',
        date: post.date ?? '',
        status: post.status ?? '',
        type: post.type ?? '',
        featured_image: featuredImage,
        meta_title: yoast.title || null,
        meta_description: yoast.description || null,
        yoast_head_json: yoast || null,
      }
    })

    const outPath = path.join(dataDir, 'posts.json')
    await writeJson(outPath, normalized)

    console.log(`Posts synced -> data/posts.json (count: ${normalized.length})`)
    return { success: true, count: normalized.length }
  } catch (error) {
    console.error(
      'Failed to sync posts:',
      error.response
        ? `${error.response.status} ${error.response.statusText}`
        : error.message,
    )
    return { success: false, error }
  }
}

async function syncProducts(dataDir, syncBase) {
  console.log('Syncing products (WooCommerce)...')
  const wooKey = process.env.WOOCOMMERCE_KEY
  const wooSecret = process.env.WOOCOMMERCE_SECRET

  if (!wooKey || !wooSecret) {
    console.warn(
      'WOOCOMMERCE_KEY / WOOCOMMERCE_SECRET not set, skipping products sync.',
    )
    return { success: false, skipped: true }
  }

  const productsEndpoint = `${syncBase}/wp-json/wc/v3/products`

  // Load existing products (for preserving images)
  const existingPath = path.join(dataDir, 'products.json')
  const existing = (await readExistingJson(existingPath)) || []
  const existingById = new Map()
  if (Array.isArray(existing)) {
    for (const product of existing) {
      if (product && typeof product.id === 'number') {
        if (Array.isArray(product.images)) {
          existingById.set(product.id, product.images)
        }
      }
    }
  }

  try {
    const allProducts = await fetchWithPagination(productsEndpoint, {
      auth: {
        username: wooKey,
        password: wooSecret,
      },
      params: {
        // You can add additional Woo filters here if needed
      },
    })

    const normalized = allProducts.map(prod => {
      const existingImages = existingById.get(prod.id)

      // We deliberately do NOT pull images from WP to keep image control local.
      const images = Array.isArray(existingImages) ? existingImages : []

      const yoast = prod.yoast_head_json || {}

      return {
        id: prod.id,
        slug: prod.slug,
        name: prod.name ?? '',
        short_description: prod.short_description ?? '',
        description: prod.description ?? '',
        price: prod.price ?? null,
        regular_price: prod.regular_price ?? null,
        sale_price: prod.sale_price ?? null,
        on_sale: prod.on_sale ?? false,
        stock_status: prod.stock_status ?? null,
        stock_quantity: prod.stock_quantity ?? null,
        status: prod.status ?? '',
        type: prod.type ?? '',
        sku: prod.sku ?? '',
        permalink: prod.permalink ?? null,
        external_url: prod.external_url ?? null,
        categories: Array.isArray(prod.categories)
          ? prod.categories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))
          : [],
        tags: Array.isArray(prod.tags)
          ? prod.tags.map(t => ({ id: t.id, name: t.name, slug: t.slug }))
          : [],
        attributes: Array.isArray(prod.attributes)
          ? prod.attributes.map(a => ({
              id: a.id,
              name: a.name,
              position: a.position,
              visible: a.visible,
              variation: a.variation,
              options: Array.isArray(a.options) ? a.options : [],
            }))
          : [],
        meta_data: Array.isArray(prod.meta_data) ? prod.meta_data : [],
        currency: prod.currency ?? null,
        images,
        meta_title: yoast.title || null,
        meta_description: yoast.description || null,
        yoast_head_json: yoast || null,
      }
    })

    const outPath = path.join(dataDir, 'products.json')
    await writeJson(outPath, normalized)

    console.log(
      `Products synced -> data/products.json (count: ${normalized.length})`,
    )
    return { success: true, count: normalized.length }
  } catch (error) {
    console.error(
      'Failed to sync products:',
      error.response
        ? `${error.response.status} ${error.response.statusText}`
        : error.message,
    )
    return { success: false, error }
  }
}

async function syncChatSettings(dataDir, backendUrl) {
  console.log('Syncing chat settings (optional)...')
  const endpoint = `${backendUrl}/wp-json/faditools/v1/chat-settings`

  try {
    const response = await axios.get(endpoint, { timeout: 15000 })
    const chatSettings = {
      fetchedAt: new Date().toISOString(),
      data: response.data ?? null,
    }

    const outPath = path.join(dataDir, 'chatSettings.json')
    await writeJson(outPath, chatSettings)
    console.log('Chat settings synced -> data/chatSettings.json')
    return { success: true }
  } catch (error) {
    const status = error.response?.status
    if (status === 404) {
      console.log('Chat settings endpoint not found (skipping).')
      return { success: false, skipped: true }
    }
    console.error(
      'Failed to sync chat settings:',
      error.response
        ? `${error.response.status} ${error.response.statusText}`
        : error.message,
    )
    return { success: false, error }
  }
}

async function main() {
  console.log('Starting WordPress -> local JSON sync...')

  try {
    // Manually load .env/.env.local since this is a standalone Node script (Next.js env loading doesn't apply here)
    const envFiles = ['.env', '.env.local']
    for (const file of envFiles) {
      try {
        const envPath = path.join(process.cwd(), file)
        const raw = await fs.readFile(envPath, 'utf8')
        raw
          .split('\n')
          .map(line => line.trim())
          .filter(line => line && !line.startsWith('#'))
          .forEach(line => {
            const idx = line.indexOf('=')
            if (idx === -1) return
            const key = line.slice(0, idx).trim()
            const value = line.slice(idx + 1).trim()
            if (!process.env[key]) {
              process.env[key] = value
            }
          })
      } catch {
        // ignore missing file
      }
    }

    const { backend, syncBase } = getBaseUrls()
    const dataDir = await ensureDataDir()

    const results = {
      homepage: await syncHomepageMeta(dataDir, backend),
      pages: await syncPages(dataDir, syncBase),
      posts: await syncPosts(dataDir, syncBase),
      products: await syncProducts(dataDir, syncBase),
      chatSettings: await syncChatSettings(dataDir, backend),
    }

    console.log('\nSync summary:')
    console.log(
      `  Homepage meta: ${results.homepage.success ? 'OK' : 'FAILED'}`,
    )
    console.log(
      `  Pages: ${
        results.pages.success ? `OK (${results.pages.count})` : 'FAILED'
      }`,
    )
    console.log(
      `  Posts: ${
        results.posts.success ? `OK (${results.posts.count})` : 'FAILED'
      }`,
    )
    if (results.products.skipped) {
      console.log('  Products: SKIPPED (no WooCommerce keys set)')
    } else {
      console.log(
        `  Products: ${
          results.products.success
            ? `OK (${results.products.count})`
            : 'FAILED'
        }`,
      )
    }
    if (results.chatSettings.skipped) {
      console.log('  Chat settings: SKIPPED (endpoint not found)')
    } else {
      console.log(
        `  Chat settings: ${results.chatSettings.success ? 'OK' : 'FAILED'}`,
      )
    }

    console.log('\nDone.')
  } catch (error) {
    console.error('Fatal error during sync:', error.message || error)
    process.exitCode = 1
  }
}

main()

