# متجري CRM — دليل النشر على Vercel

## الخطوة 1 — Supabase
1. اذهب إلى supabase.com → New Project
2. افتح SQL Editor وشغّل ملف `supabase-setup.sql`
3. اذهب إلى Authentication → Users → أضف إيميلات الفريق

## الخطوة 2 — GitHub
1. أنشئ حساب على github.com
2. أنشئ Repository جديد باسم `matajari-crm`
3. ارفع كل ملفات هذا المجلد

## الخطوة 3 — Vercel
1. اذهب إلى vercel.com → New Project
2. اربط بـ GitHub repository
3. أضف Environment Variables:
   - SUPABASE_URL
   - SUPABASE_SERVICE_KEY
   - SHOPIFY_STORE (اختياري)
   - SHOPIFY_TOKEN (اختياري)
4. اضغط Deploy

## الخطوة 4 — شارك الرابط
Vercel سيعطيك رابطاً مثل: https://matajari-crm.vercel.app
شاركه مع الفريق — يعمل 24/7 مجاناً
