# Umumiy Muammolar va Yechimlar

GitHub'ga yuklash va deploy qilishda uchraydigan muammolar va ularning yechimlari.

## Git Authentication Muammlari

### 1. "Permission denied" xatosi
**Muammo**: `Permission denied (publickey)` yoki authentication failed

**Yechim 1 - Personal Access Token**:
```bash
# GitHub'da PAT yarating:
# Settings → Developer settings → Personal access tokens → Generate new token
# Permissions: repo, workflow, write:packages

# Remote URL'ni token bilan almashtiring:
git remote set-url origin https://USERNAME:TOKEN@github.com/USERNAME/REPO.git
```

**Yechim 2 - SSH kaliti**:
```bash
# SSH kaliti yaratish
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH kalitini GitHub'ga qo'shish
cat ~/.ssh/id_ed25519.pub
# Bu kalitni GitHub → Settings → SSH keys ga qo'shing

# SSH remote ishlatish
git remote set-url origin git@github.com:USERNAME/REPO.git
```

### 2. "Username for 'https://github.com':" so'raydi
**Yechim**: Personal Access Token ishlatish (yuqoridagi 1-yechim)

## Repository Muammlari

### 3. "Repository not found" xatosi
```bash
# Remote'ni tekshirish
git remote -v

# To'g'ri remote qo'yish
git remote set-url origin https://github.com/TO'G'RI_USERNAME/TO'G'RI_REPO.git
```

### 4. "Non-fast-forward" xatosi
```bash
# GitHub'dagi o'zgarishlarni local'ga olish
git pull origin main --rebase

# Keyin push qilish
git push origin main
```

## Build va Deploy Muammlari

### 5. GitHub Actions build failed
**Tekshirish**:
1. Repository → Actions → Failed workflow'ni oching
2. Log'larni o'qing

**Umumiy yechimlar**:
```bash
# Local'da build test qiling
npm install
npm run build

# Dependencies muammosi bo'lsa
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 6. 404 error saytda
**Muammo**: Sayt ochilmaydi yoki 404 ko'rsatadi

**Yechim 1**: GitHub Pages sozlamalarini tekshiring
- Settings → Pages → Source: "GitHub Actions"

**Yechim 2**: Base URL muammosi
```typescript
// vite.config.ts da tekshiring
export default defineConfig({
  base: "/",  // Yoki repository nomini: "/repository-name/"
});
```

### 7. CSS/JS fayllar yuklanmaydi
**Muammo**: Sayt ochiladi lekin styling yo'q

**Yechim**: Vite config'da base path to'g'ri qilin
```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/REPO_NOMI/' : '/',
});
```

## Performance Muammlari

### 8. Sayt sekin yuklanadi
**Yechimlar**:
- Rasm fayllar o'lchamini kamaytiring
- CDN'dan foydalaning (hozir ishlatilmoqda)
- Bundle size'ni tekshiring: `npm run build` va dist/ hajmini ko'ring

### 9. Mobile'da animatsiyalar sekin
**Vite config optimizatsiyasi**:
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

## Content Muammlari

### 10. Rasmlar ko'rinmaydi
**Tekshirish**:
```bash
# CDN URL'lar ishlayotganini tekshiring
curl -I "https://rasm-url.com/image.jpg"
```

**Yechim**: Local rasm fayllarni public/ ga qo'ying
```
public/
  images/
    hero-bg.jpg
    partners/
      pepsi.png
```

### 11. Video'lar yuklanmaydi
**Yechim**: YouTube embed URL formatini tekshiring
```typescript
// To'g'ri format
const embedUrl = "https://www.youtube.com/embed/VIDEO_ID";
```

## Development Muammlari

### 12. Npm install xatosi
```bash
# Cache'ni tozalash
npm cache clean --force

# Node modules'ni qayta o'rnatish
rm -rf node_modules package-lock.json
npm install
```

### 13. TypeScript xatolari
```bash
# Type checking
npm run type-check

# Common TypeScript xatolarni tuzatish
npm run build
```

## Monitoring va Debugging

### 14. Deploy holatiini kuzatish
```bash
# Local'da ham deploy test qilish
npm run build
npx serve dist

# Browser console'da xatolarni tekshirish
# F12 → Console → Network tab
```

### 15. GitHub Actions log'larni o'qish
1. Repository → Actions
2. Failed workflow → Job → Step'ni oching
3. Xato qatorini toping
4. Stack trace'ni tahlil qiling

---

**Maslahat**: Har doim dastlab local'da test qiling, keyin GitHub'ga push qiling!