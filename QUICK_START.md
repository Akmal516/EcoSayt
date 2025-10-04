# Tezkor Boshlash - 5 Daqiqada GitHub'ga Deploy

Bu loyihani 5 daqiqada GitHub'ga yuklash va deploy qilish uchun eng qisqa yo'l.

## 1. GitHub Repository Yaratish (1 daqiqa)
1. [GitHub.com](https://github.com)ga kiring → "New repository"
2. **Name**: `ekologiya-sayt`
3. **Public** qilib belgilang → "Create repository"

## 2. Terminal Commands (2 daqiqa)

Repository yaratgandan so'ng, GitHub sizga commands ko'rsatadi. Quyidagilarni terminal'da bajaring:

```bash
# Git initialize
git init
git branch -M main

# Fayllarni qo'shish
git add .
git commit -m "Ekologiya sayt - birinchi versiya"

# GitHub'ga ulash (SIZNING_USERNAME va REPOSITORY_NOMI ni almashtiring)
git remote add origin https://github.com/SIZNING_USERNAME/ekologiya-sayt.git
git push -u origin main
```

## 3. GitHub Pages Yoqish (1 daqiqa)
1. Repository → **Settings** → **Pages**
2. **Source**: "GitHub Actions" ni tanlang
3. Tayyor! Deploy avtomatik boshlanadi

## 4. Deploy Kutish (1 daqiqa)
- **Actions** tab'da deploy jarayonini kuzating
- 2-3 daqiqada tayyor bo'ladi
- Sayt `https://SIZNING_USERNAME.github.io/ekologiya-sayt` da mavjud

## 5. Tekshirish
Deploy tugagach saytingizni oching va quyidagilar ishlashini tekshiring:
- ✅ Homepage yuklanadi
- ✅ "Hamkorlar" va "Magazin" tugmalari ishlaydi  
- ✅ Animatsiyalar ko'rinadi
- ✅ Responsive dizayn (mobil/desktop)

---

**Maslahat**: Agar authentication muammosi bo'lsa, Personal Access Token yarating (GitHub → Settings → Developer settings → Personal access tokens).