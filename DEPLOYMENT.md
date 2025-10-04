# GitHub Pages Deployment Guide

Bu qo'llanma "Ekologiya va Chiqindi" loyihasini GitHub Pages orqali deploy qilish jarayonini tushuntiradi.

## 1. Loyihani GitHub'ga yuklash

### GitHub Repository yaratish
1. GitHub'da yangi repository yarating
2. Repository nomini kiriting (masalan: `ekologiya-sayt`)
3. Repository'ni public qiling (GitHub Pages uchun zarur)

### Kodni yuklash
```bash
# Git repository'ni initialize qiling
git init

# Barcha fayllarni staging'ga qo'shing
git add .

# Commit yarating
git commit -m "Initial commit: Ekologiya va Chiqindi sayt"

# GitHub repository'ni remote sifatida qo'shing
git remote add origin https://github.com/SIZNING_USERNAME/REPOSITORY_NOMI.git

# Main branch'ga push qiling
git push -u origin main
```

## 2. GitHub Actions Workflow

Loyihada `.github/workflows/deploy.yml` fayli mavjud bo'lib, u avtomatik deployment uchun konfiguratsiya qilingan.

### Workflow xususiyatlari:
- **Trigger**: `main` branch'ga push qilinganda ishga tushadi
- **Node.js versiya**: 18
- **Build jarayoni**: `npm ci` va `npm run build`
- **Deploy manzil**: `./dist` papkasidan GitHub Pages'ga

## 3. GitHub Pages Sozlash

### Repository Settings
1. GitHub repository'ga boring
2. **Settings** tab'ni oching
3. **Pages** bo'limini toping
4. **Source** sifatida **"GitHub Actions"**ni tanlang

### Deploy jarayoni
1. Kod `main` branch'ga push qilingandan so'ng avtomatik deploy boshlanadi
2. **Actions** tab'da jarayonni kuzatishingiz mumkin
3. Deploy muvaffaqiyatli tugagach, sayt `https://USERNAME.github.io/REPOSITORY_NOMI` manzilida mavjud bo'ladi

## 4. Konfiguratsiya tafsilotlari

### Vite Configuration
- **Base path**: `"/"` - GitHub Pages uchun to'g'ri konfiguratsiya
- **Build output**: `dist/` papkasi
- **Source maps**: Development uchun yoqilgan

### Project Structure
```
.github/
  workflows/
    deploy.yml          # GitHub Actions konfiguratsiyasi
dist/                   # Build output (avtomatik yaratiladi)
src/                    # Source code
public/                 # Static assets
vite.config.ts         # Vite konfiguratsiyasi
```

## 5. Troubleshooting

### Umumiy muammolar:
1. **404 Error**: Base path noto'g'ri sozlangan bo'lishi mumkin
2. **CSS/JS yuklanmaydi**: Vite base konfiguratsiyasini tekshiring
3. **Actions muvaffaqiyatsiz**: Node.js versiyasi va dependencies'ni tekshiring

### Deploy log'larini tekshirish:
1. GitHub repository → **Actions** tab
2. Oxirgi workflow run'ni oching
3. Har bir step'ning log'larini ko'ring

### Manual deploy (zarurat bo'lsa):
```bash
# Loyihani local'da build qiling
npm run build

# Build fayllarini tekshiring
ls -la dist/

# Fayllarni GitHub'ga push qiling
git add .
git commit -m "Update build"
git push origin main
```

## 6. Performance va Optimizatsiya

### Build optimizatsiyasi:
- Minification yoqilgan
- Tree shaking avtomatik
- Code splitting Vite tomonidan amalga oshiriladi

### Assets optimizatsiyasi:
- Rasmlar CDN orqali yuklanadi
- CSS va JS minify qilinadi
- Gzip compression GitHub Pages tomonidan avtomatik

## 7. Custom Domain (ixtiyoriy)

Agar sizning custom domain'ingiz bo'lsa:
1. Repository settings → Pages
2. Custom domain kiritng
3. `CNAME` fayl avtomatik yaratiladi
4. DNS'da A record yoki CNAME record sozlang

## 8. Monitoring va Analytics

Deploy bo'lgandan so'ng:
- Google Analytics qo'shishingiz mumkin
- Performance monitoring sozlashingiz mumkin
- User feedback sistemini yoqishingiz mumkin

---

**Eslatma**: GitHub Pages bepul xizmat bo'lib, public repository'lar uchun cheklovlar yo'q. Private repository'lar uchun GitHub Pro subscription zarur.