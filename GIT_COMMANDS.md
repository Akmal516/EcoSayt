# Git Commands - GitHub'ga Yuklash Qo'llanmasi

Bu qo'llanma "Ekologiya va Chiqindi" loyihasini Git commands yordamida GitHub'ga yuklash jarayonini step-by-step ko'rsatadi.

## 1. Dastlabki Tayyorgarlik

### GitHub Repository Yaratish
1. [GitHub.com](https://github.com)ga kiring
2. "New repository" tugmasini bosing
3. Repository ma'lumotlarini kiriting:
   - **Repository name**: `ekologiya-sayt` (yoki o'zingiz tanlagan nom)
   - **Description**: `O'zbekiston ekologik ma'lumot sayti - chiqindi muammosini hal qilish`
   - **Visibility**: Public (GitHub Pages uchun zarur)
   - **Initialize with**: Hech narsa tanlamang (bo'sh repository yarating)

## 2. Git Commands Ketma-ketligi

### Loyihani Git Repository qilish
```bash
# Git repository'ni initialize qiling
git init

# Default branch nomini main qilib o'rnating
git branch -M main
```

### Fayllarni staging'ga qo'shish
```bash
# Barcha fayllarni ko'rish
git status

# Barcha fayllarni staging'ga qo'shish
git add .

# Yoki ayrim fayllarni alohida qo'shish
git add src/
git add package.json
git add README.md
git add DEPLOYMENT.md
```

### Commit yaratish
```bash
# Birinchi commit
git commit -m "Initial commit: Ekologiya va Chiqindi sayt

- React + TypeScript + Vite loyihasi
- EcologyHomePage: hero, video, statistics, gallery
- EcoActionPage: 3-step interactive process  
- ShopPage: e-commerce cart functionality
- PartnersPage: detailed partner information
- GitHub Pages deployment konfiguratsiyasi
- Framer Motion animatsiyalar
- Tailwind CSS styling"
```

### GitHub Repository'ga ulash
```bash
# GitHub repository'ni remote sifatida qo'shish
# SIZNING_USERNAME va REPOSITORY_NOMI o'zingiznikiga almashtiring
git remote add origin https://github.com/SIZNING_USERNAME/REPOSITORY_NOMI.git

# Remote repository'ni tekshirish
git remote -v
```

### Kodni GitHub'ga yuklash
```bash
# Main branch'ga push qilish
git push -u origin main

# Keyingi push'lar uchun oddiy command
git push
```

## 3. Muammolar va Yechimlar

### Agar remote repository bo'sh bo'lmasa:
```bash
# GitHub'dagi o'zgarishlarni local'ga tortib olish
git pull origin main --allow-unrelated-histories

# Keyin push qilish
git push -u origin main
```

### Agar authentication muammosi bo'lsa:
```bash
# Personal Access Token (PAT) yarating:
# GitHub → Settings → Developer settings → Personal access tokens → Generate new token

# Token bilan ulash:
git remote set-url origin https://SIZNING_USERNAME:SIZNING_TOKEN@github.com/SIZNING_USERNAME/REPOSITORY_NOMI.git
```

### SSH kaliti bilan ulash (tavsiya etiladi):
```bash
# SSH kalitini yaratish (agar mavjud bo'lmasa)
ssh-keygen -t ed25519 -C "sizning_email@example.com"

# SSH kalitini GitHub'ga qo'shish:
# GitHub → Settings → SSH and GPG keys → New SSH key

# SSH remote qo'shish
git remote set-url origin git@github.com:SIZNING_USERNAME/REPOSITORY_NOMI.git
```

## 4. Keyingi O'zgarishlar Uchun Workflow

### Yangi o'zgarishlarni yuklash:
```bash
# O'zgarishlarni ko'rish
git status

# Yangi yoki o'zgargan fayllarni qo'shish
git add .

# Commit yaratish (ma'noli xabar bilan)
git commit -m "Add: yangi feature qo'shildi" 
# yoki
git commit -m "Fix: bug tuzatildi"
# yoki
git commit -m "Update: dizayn yaxshilandi"

# GitHub'ga yuklash
git push
```

### Branch'lar bilan ishlash:
```bash
# Yangi branch yaratish
git checkout -b feature/yangi-sahifa

# Branch'da ishlash
git add .
git commit -m "Add: yangi sahifa yaratildi"

# GitHub'ga yuklash
git push origin feature/yangi-sahifa

# Main branch'ga qaytish
git checkout main

# Branch'ni merge qilish
git merge feature/yangi-sahifa
git push
```

## 5. Loyiha Holatini Kuzatish

### Status va tarix:
```bash
# Hozirgi holat
git status

# Commit tarixi
git log --oneline

# O'zgarishlarni ko'rish
git diff

# Staging area'dagi o'zgarishlar
git diff --staged
```

### Fayllarni bekor qilish:
```bash
# Staging'dan chiqarish
git restore --staged fayl_nomi.txt

# O'zgarishlarni bekor qilish
git restore fayl_nomi.txt

# Oxirgi commit'ga qaytish
git reset --hard HEAD
```

## 6. GitHub Pages Avtomatik Deploy

Kodni GitHub'ga yukladiganingizdan so'ng:

1. **Repository → Settings** ga o'ting
2. **Pages** bo'limini toping
3. **Source**: "GitHub Actions" ni tanlang
4. Kod push qilingandan so'ng avtomatik deploy boshlanadi
5. Deploy tugagach sayt `https://SIZNING_USERNAME.github.io/REPOSITORY_NOMI` da mavjud bo'ladi

## 7. Foydalanishga Tayyor Commands

### Kundalik ishlar uchun:
```bash
# Yangilanishlarni tekshirish
git status

# Hamma o'zgarishlarni qo'shish va commit qilish
git add . && git commit -m "Update: yangi o'zgarishlar"

# GitHub'ga yuklash  
git push

# Loyihani build qilish
npm run build
```

### Build va deploy tekshirish:
```bash
# Dependencies o'rnatish
npm install

# Production build
npm run build

# Build muvaffaqiyatli bo'lganini tekshirish
ls -la dist/

# Git va push
git add . && git commit -m "Build: yangi versiya tayyor" && git push
```

## 8. Muhim Eslatmalar

- **Commit xabarlari**: Har doim ma'noli va tushunarli xabar yozing
- **Regular push**: Katta o'zgarishlarni kichik qismlarga bo'lib yuklang
- **Build check**: Har safar push qilishdan oldin `npm run build` bajaring
- **File size**: Katta fayllar (.env, node_modules) `.gitignore`da bo'lishini tekshiring
- **Backup**: Muhim loyihalar uchun kopya repository'lar yarating

---

**Keyingi qadam**: Deployment muvaffaqiyatli bo'lgach, saytni real foydalanuvchilarga ko'rsatishingiz mumkin!