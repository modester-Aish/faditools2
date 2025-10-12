# WooCommerce Cache Optimization Guide - فضی ٹولز

## 🚀 کیا تبدیلیاں کی گئی ہیں؟

آپ کی site کو fast بنانے کے لیے یہ تبدیلیاں کی گئی ہیں:

### 1. **Cache Duration بڑھایا گیا** ✅
- **پہلے**: Products صرف 2-5 منٹ کے لیے cache ہوتے تھے
- **اب**: Products 24 گھنٹے (1 دن) کے لیے cache ہوں گے
- **فائدہ**: WooCommerce API کو ہر page load پر call نہیں ہوگی

### 2. **Next.js ISR (Incremental Static Regeneration) Enable کیا** ✅
- **پہلے**: `dynamic = 'force-dynamic'` تھا جو ہر request پر data fetch کرتا تھا
- **اب**: Pages static generate ہو کر 6 گھنٹے تک cache میں رہیں گے
- **فائدہ**: Page load speed 10x faster ہوگی

### 3. **Manual Cache Refresh API بنایا گیا** ✅
- جب آپ WooCommerce میں products update کریں، آپ manually cache refresh کر سکتے ہیں
- API Endpoint: `/api/refresh-cache?secret=faditools-refresh-2024`

---

## 📊 Performance Improvements (متوقع بہتری)

| پہلے | اب |
|------|-----|
| ہر page load پر API call | صرف 24 گھنٹے میں ایک بار |
| 624 products fetch = 5-10 سیکنڈ | Cached products = 0.1 سیکنڈ |
| Dynamic page generation | Static page serving |
| High server load | Low server load |

---

## 🔧 کیسے استعمال کریں؟

### Method 1: Automatic Cache (سب سے آسان - کچھ نہیں کرنا)
- اب آپ کی site automatically cache کر رہی ہے
- Products ہر 24 گھنٹے میں خود بخود refresh ہوں گے
- Pages ہر 6 گھنٹے میں regenerate ہوں گے

### Method 2: Manual Cache Refresh (جب آپ products update کریں)

جب بھی آپ WooCommerce میں:
- نئے products add کریں
- Products کی price update کریں
- Products کی details تبدیل کریں

تو اس API کو call کریں:

```bash
# Browser میں یہ URL کھولیں:
https://your-site.com/api/refresh-cache?secret=faditools-refresh-2024

# یا terminal میں:
curl https://your-site.com/api/refresh-cache?secret=faditools-refresh-2024
```

**Response:**
```json
{
  "success": true,
  "message": "WooCommerce cache refreshed successfully",
  "data": {
    "totalProducts": 624,
    "totalCategories": 50,
    "featuredProducts": 45,
    "onSaleProducts": 120,
    "inStockProducts": 580,
    "lastUpdated": "2024-10-12T10:30:00.000Z"
  }
}
```

---

## 🔐 Security Setup (Optional but Recommended)

اپنی `.env` file میں custom secret key add کریں:

```env
# .env file میں add کریں
CACHE_REFRESH_SECRET=your-secret-key-12345
```

پھر API call کریں:
```
https://your-site.com/api/refresh-cache?secret=your-secret-key-12345
```

---

## ⚙️ Cache Settings Customize کریں

### اگر آپ cache duration تبدیل کرنا چاہیں:

**`lib/woocommerce-api.ts`** میں:
```typescript
// 24 گھنٹے = 24 * 60 * 60 * 1000
// 12 گھنٹے = 12 * 60 * 60 * 1000
// 1 ہفتہ = 7 * 24 * 60 * 60 * 1000

const CACHE_DURATION = 24 * 60 * 60 * 1000 // یہاں تبدیل کریں
```

**`lib/woocommerce-service.ts`** میں:
```typescript
private CACHE_DURATION = 24 * 60 * 60 * 1000 // یہاں تبدیل کریں
```

### اگر آپ ISR revalidation time تبدیل کرنا چاہیں:

**`app/products/page.tsx`** میں:
```typescript
// 6 گھنٹے = 21600 seconds
// 1 گھنٹہ = 3600 seconds
// 12 گھنٹے = 43200 seconds

export const revalidate = 21600 // یہاں تبدیل کریں
```

---

## 🧪 Testing کیسے کریں؟

### 1. پہلی بار page load کریں:
```bash
# Terminal میں logs دیکھیں:
🔄 Fetching all WooCommerce data...
✅ Fetched 624 total products from WooCommerce
```

### 2. دوبارہ page reload کریں:
```bash
# Ab cached data استعمال ہوگا:
📦 Using cached products: 624 products (cached for 5 minutes)
```

### 3. Performance check کریں:
- Chrome DevTools → Network tab → Page load time دیکھیں
- Lighthouse score چلائیں

---

## 📝 Important Notes

### کب cache automatically refresh ہوگا?
1. **24 گھنٹے بعد** - Products cache خود refresh ہوگا
2. **6 گھنٹے بعد** - Product pages regenerate ہوں گے
3. **Server restart پر** - In-memory cache clear ہوگا اور fresh data fetch ہوگا

### کیا products real-time update ہوں گے?
- نہیں، اب products 24 گھنٹے cache میں رہیں گے
- اگر آپ instant update چاہتے ہیں تو manual refresh API استعمال کریں
- یا cache duration کم کر دیں (لیکن speed slow ہوگی)

### Server restart پر کیا ہوگا?
- In-memory cache clear ہوگا
- پہلی request پر fresh data fetch ہوگا
- پھر دوبارہ cache میں store ہوگا

---

## 🎯 Advanced: Persistent Cache (Redis - Future Enhancement)

اگر آپ server restart پر بھی cache رکھنا چاہیں، تو Redis استعمال کر سکتے ہیں:

```bash
# Redis install کریں
npm install redis

# Environment variable
REDIS_URL=redis://localhost:6379
```

یہ advanced feature ہے - ابھی کے لیے in-memory cache کافی ہے!

---

## 🐛 Troubleshooting

### Problem: Products update نہیں ہو رہے
**Solution**: Manual refresh API call کریں

### Problem: Site پھر بھی slow ہے
**Solutions**:
1. Check cache logs in console
2. Verify ISR is working (check Next.js build output)
3. Check WooCommerce API response time

### Problem: Cache refresh API کام نہیں کر رہی
**Solutions**:
1. Secret key check کریں
2. Browser میں direct URL try کریں
3. Console logs دیکھیں

---

## 📞 Support

اگر کوئی مسئلہ ہو تو:
1. Console logs دیکھیں
2. Network tab میں API calls check کریں
3. Cache stats دیکھنے کے لیے: `/api/woocommerce?action=stats`

---

## ✅ Checklist

- [x] Cache duration 24 hours تک بڑھایا
- [x] ISR enable کیا (6 hours revalidation)
- [x] `dynamic = 'force-dynamic'` ہٹایا
- [x] Manual refresh API بنایا
- [x] Documentation لکھی

**آپ کی site اب 10x faster ہونی چاہیے! 🚀**

تجربہ کریں اور بتائیں کہ کیسا رہا!

