const fs = require('fs')
const path = require('path')

const MIN = 4.99

function fixProduct(p) {
  let changed = false
  if (p.price != null && p.price !== '') {
    const n = parseFloat(String(p.price).replace(/[^0-9.]/g, ''))
    if (!Number.isNaN(n) && n > 0 && n < MIN) {
      p.price = '4.99'
      changed = true
    }
  }
  if (p.regular_price != null && p.regular_price !== '') {
    const n = parseFloat(String(p.regular_price).replace(/[^0-9.]/g, ''))
    if (!Number.isNaN(n) && n > 0 && n < MIN) {
      p.regular_price = '4.99'
      changed = true
    }
  }
  if (p.sale_price != null && p.sale_price !== '') {
    const n = parseFloat(String(p.sale_price).replace(/[^0-9.]/g, ''))
    if (!Number.isNaN(n) && n > 0 && n < MIN) {
      p.sale_price = '4.99'
      changed = true
    }
  }
  return changed
}

function run(filePath) {
  const full = path.join(process.cwd(), filePath)
  if (!fs.existsSync(full)) {
    console.warn('Skip (not found):', filePath)
    return
  }
  const raw = fs.readFileSync(full, 'utf-8')
  const data = JSON.parse(raw)
  const list = Array.isArray(data) ? data : (data.products || [])
  let count = 0
  for (const p of list) {
    if (fixProduct(p)) count++
  }
  fs.writeFileSync(full, JSON.stringify(data, null, 2), 'utf-8')
  console.log(filePath + ': ' + count + ' products updated to 4.99')
}

run('data/products.json')
run('public/data/products.json')
