# Chat Buttons Setup Guide

## ✅ Installation Complete!

Aapki site pe ab floating chat buttons install ho gaye hain. Yeh buttons bottom-right corner mein show honge.

## 📋 WordPress Settings Kahan Hain

1. **WordPress Admin Panel** mein login karo
2. **Settings** menu mein jao
3. **Chat Settings** option ko click karo

## ⚙️ Settings Configure Karna

### WhatsApp Setup:
- **WhatsApp Number**: Country code ke saath number dalo (e.g., `+923001234567`)
- **Enable WhatsApp Button**: Checkbox ko check karo button show karne ke liye

### Facebook Setup:
- **Facebook Page Link**: Apne Facebook page ka complete URL dalo (e.g., `https://www.facebook.com/faditools`)
- **Enable Facebook Button**: Checkbox ko check karo button show karne ke liye

### Email Setup:
- **Email Address**: Support email dalo (e.g., `support@faditools.com`)
- **Enable Email Button**: Checkbox ko check karo button show karne ke liye

## 🎨 Kaise Dikhega

### Frontend (Users ko dikhega):
```
Bottom-right corner mein:
┌────────────────┐
│  💬 (Main btn) │ ← Click karoge to options khulenge
└────────────────┘

Jab click karoge:
┌────────────────┐
│      ✕         │ ← Close button
├────────────────┤
│  🟢 WhatsApp   │ ← WhatsApp par chat
├────────────────┤
│  🔵 Facebook   │ ← Facebook messenger
├────────────────┤
│  🔴 Email      │ ← Email bhejne ke liye
└────────────────┘
```

## 🔄 Testing

1. WordPress admin se settings save karo
2. Frontend pe jao (kisi bhi page pe)
3. Bottom-right corner mein floating button dikhega
4. Click karo aur options check karo
5. Har button test karo (WhatsApp, Facebook, Email)

## 📝 Notes

- Sirf enabled buttons hi show honge
- Agar koi button enable nahi hai to wo hide rahega
- Buttons responsive hain (mobile pe bhi kaam karenge)
- Beautiful hover animations hain
- Auto-bounce animation main button pe hai

## 🎯 REST API Endpoint

Agar manually check karna ho:
```
GET: https://yourdomain.com/wp-json/faditools/v1/chat-settings
```

Response:
```json
{
  "whatsapp": {
    "number": "+923001234567",
    "enabled": true
  },
  "facebook": {
    "link": "https://facebook.com/faditools",
    "enabled": true
  },
  "email": {
    "address": "support@faditools.com",
    "enabled": true
  }
}
```

## 🚀 Ab Kya Karein

1. WordPress admin se settings configure karo
2. Numbers/links add karo
3. Buttons enable karo
4. Save Settings click karo
5. Frontend refresh karo aur check karo!

**Done! Enjoy your new chat buttons! 🎉**

