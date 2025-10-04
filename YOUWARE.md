# "Ekologiya va Chiqindi" Interactive Website + Ekologik Magazin

Bu O'zbekiston va dunyodagi chiqindi muammosini ko'rsatuvchi, odamlarni hushyor qiluvchi ekologik ma'lumot sayti. Videolar, 3D animatsiyalar va kuchli vizual effektlar orqali tabiatni asrashga undaydi. Saytga qo'shimcha ravishda ekologik mahsulotlar sotadigan onlayn magazin qo'shilgan.

## Project Status

- **Project Type**: React + TypeScript Ekologik Ma'lumot Sayti
- **Entry Point**: `src/main.tsx` (React application entry)
- **Build System**: Vite 7.0.0 (Fast development and build)
- **Styling System**: Tailwind CSS 3.4.17 + Framer Motion animations

## Project Features

### Implemented Components

1. **EcologyHomePage** (`src/pages/EcologyHomePage.tsx`):
   - Fixed header navigation: "EkoSayt" branding, "Hamkorlar" va "Magazin" tugmalari
   - Hero section: chiqindi bilan to'lib ketgan shahar fonida "Biz qayerda yashayapmiz?" savoli
   - Video bo'limi: ekologik hujjatli videolar va plastik ma'lumotlari
   - Enhanced Partner Brands section: katta hajmli mahsulotlar grid layout
   - Faktlar va statistikalar: dinamik raqam sanash animatsiyasi (counter animation)
   - Galereya: hover effektlari bilan suratlar
   - YeChIM bo'limi: qayta ishlash, ko'kalamzorlashtirish, ta'lim
   - Kontakt va ijtimoiy tarmoqlar: fikr-mulohaza shakli

2. **EcoActionPage** (`src/pages/EcoActionPage.tsx`):
   - 3 bosqichli interaktiv jarayon: Ajratish → Suratga olish → Rag'batlantirish
   - Fayl yuklash imkoniyati chiqindi suratlarini yuklash uchun
   - Ball to'plash tizimi va mukofotlar
   - Jamiyat ishtirokchilari statistikasi
   - Progress tracking va step-by-step UI

3. **ShopPage** (`src/pages/ShopPage.tsx`):
   - Ekologik onlayn magazin: Pepsi, Coca-Cola, Canvas sumkalar
   - Mahsulot kategoriyalari: Ichimliklar (1,500 so'm), Sumkalar (5,000 so'm)
   - Shopping cart: savatcha funksiyasi, miqdorni boshqarish
   - Real mahsulot rasmlar CDN orqali
   - Rating tizimi va mahsulot tavsifi
   - Responsive product cards va checkout interface

4. **PartnersPage** (`src/pages/PartnersPage.tsx`):
   - Partner brands overview grid layout with large product displays
   - Detailed partner information modal/view system
   - Partner statistics: recycling rates, eco products, partnerships
   - Company information: establishment date, headquarters, achievements
   - Eco initiatives and contact information for each partner
   - Interactive partner selection with detailed view transitions

### Design Principles

- **Qora-Yashil Kontrastli Dizayn**: tabiat va chiqindi kontrastini ko'rsatish
- **3D Animatsiyalar**: plastik butilka tuproqqa kirib ketish animatsiyasi
- **Scroll Trigger Animatsiyalar**: har bir bo'limda parallax va motion effect
- **Responsive Mobile-First**: barcha qurilmalar uchun moslashtirilgan
- **O'zbek Tili**: barcha kontent o'zbek tilida

### Technical Implementation

- **State Management**: React hooks page navigation va step tracking uchun
- **Animation Library**: Framer Motion barcha transition va effects uchun
- **Icons**: Lucide React icon library
- **Background Images**: Real pollution va recycling images from search results
- **Dynamic Counters**: Animated statistics with useEffect timers

## Core Architecture

### Directory Structure

```
src/
├── App.tsx                    # Main app with 4-page routing
├── pages/
│   ├── EcologyHomePage.tsx    # Landing page with header navigation
│   ├── EcoActionPage.tsx      # Interactive 3-step action process
│   ├── ShopPage.tsx           # E-commerce shop with cart functionality
│   └── PartnersPage.tsx       # Partner brands detailed information page
└── [other standard directories]
```

### Navigation Flow

1. **EcologyHomePage**: Hero, Video, Partner Brands, Statistics, Gallery, Solutions
2. **Header Navigation**: 
   - "Hamkorlar" tugmasi → PartnersPage transition
   - "Magazin" tugmasi → ShopPage transition
3. **Action Button**: "Siz ham ishtirok eting" tugmasi → EcoActionPage transition
4. **PartnersPage**: Detailed partner information, statistics, contact details
5. **ShopPage**: Ekologik mahsulotlar, shopping cart, checkout process
6. **Return Navigation**: "Orqaga" tugmasi bilan HomePage ga qaytish

## Development Commands

- **Install dependencies**: `npm install`
- **Build project**: `npm run build`
- **Development**: Project uses production builds only

## Key Features Implemented

### Section 1: Hero Section
- Chiqindi bilan to'lib ketgan shahar yoki tabiat sahnasi background
- "Biz qayerda yashayapmiz?" matn va "Videoni ko'ring" tugma
- Floating particles va 3D gradient text effects

### Section 2: Video va Ma'lumotlar
- YouTube iframe embed qo'llab-quvvatlash
- Plastik butilka 450 yil, Germaniya-Yaponiya 95%, O'zbekiston 10% ma'lumotlari
- Side-by-side video va ma'lumot layout

### Section 3: Hamkor Brendlar
- Pepsi, Coca-Cola va Gidrolife hamkor brendlarining katta suv idishlarini ko'rsatish
- 3D floating animatsiya har bir brend uchun
- "HAMKOR" belgilari va brendga mos ranglar
- Hamkorlik haqida ma'lumot va xabar

### Section 4: Statistikalar
- "O'zbekistonda 10% chiqindi qayta ishlanadi, 73% ifloslantiradi"
- Counter animation with useEffect hooks
- 3-column responsive grid layout

### Section 5: Galereya
- Real pollution va recycling images
- Hover effects: zoom, blur, text overlay
- CDN-hosted images from search results

### Section 6: YeChIM
- Qayta ishlash, ko'kalamzorlashtirish, ta'lim bo'yicha 3D piktogramma
- "Siz ham ishtirok eting" action button
- Animated icons va hover effects

### Section 7: Kontakt
- Telegram, Instagram, YouTube ijtimoiy tarmoq linklari
- Fikr-mulohaza shakli
- Glass-morphism styled form inputs

### Interactive Action Page
- 3-step process: Chiqindilarni Ajrating → Suratga Oling → Rag'batlantirish
- File upload functionality with preview
- Point system: 100 points per step, 50 points per uploaded image
- Reward system: Ekologik Sertifikat (500 ball), Daraxt Ekish (1000 ball)
- Community statistics display

## Color Scheme & Design

- **Primary Background**: Dark gradient from gray-900 via green-900 to blue-900
- **Accent Colors**: Green-blue gradients symbolizing nature and water
- **Text**: White primary text with glass-morphism containers
- **Interactive Elements**: Hover animations with scale and color transitions
- **Success States**: Green tones for completed actions and rewards

## Animation Details

- **Page Transitions**: AnimatePresence with slide effects
- **3D Transforms**: Perspective and rotateX/Y transforms
- **Scroll Animations**: whileInView triggers for section reveals
- **Micro-interactions**: Button hover, scale, and tap animations
- **Particle Systems**: Floating elements background animations
- **Counter Animations**: Progressive number counting with timers
- **Parallax Effects**: 
  - **useScroll & useTransform**: Scroll-based parallax transformations
  - **Smooth Springs**: useSpring for fluid motion with stiffness/damping control
  - **Background Parallax**: Multi-layer depth effects with background images
  - **Particle Parallax**: Enhanced floating particles with scroll-responsive movement
  - **Hero Parallax**: Text and content movement based on scroll position
  - **Performance Optimized**: Hardware-accelerated transforms with proper overflow handling

## E-commerce Features

### Shop Page Implementation
- **Product Categories**: Ichimliklar (Pepsi, Coca-Cola) va Sumkalar (Canvas, Shoper)
- **Pricing Structure**: Suvlar 150 ball, Sumkalar 500 ball
- **Shopping Cart**: Add/remove functionality, quantity management
- **Product Display**: Real images via CDN, ratings, descriptions
- **Order Process**: Order form with name, phone, email, delivery date
- **Order History**: LocalStorage-based order tracking with status display
- **Order Status Tracking**: Processing status with animated indicators
- **Delivery Restriction**: Only available in Yashnobod district
- **Eco Message**: "Bir canvas sumka 1000+ plastik paketni almashtiradi"

### Product Data Structure
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'drink' | 'bag';
  description: string;
  rating: number;
}
```

### Cart Management
- State-based cart with quantity tracking
- Real-time total price calculation
- Persistent cart state during session
- Add/remove with animated feedback
- Shopping cart overlay with backdrop blur
- Order history sidebar with LocalStorage persistence
- Order status display with animated processing indicators
- Historical order tracking with detailed order information

## Future Enhancement Notes

- Real video content can replace YouTube placeholders
- Backend integration for user submission storage and order processing
- Real-time statistics can be connected to actual data
- Payment gateway integration for shop functionality
- User accounts and order history
- Inventory management system
- Social sharing functionality can be implemented
- Multi-language support can be added

## Critical Implementation Notes

- **Build System**: Always run `npm run build` after changes
- **Animation Performance**: Optimized for 60fps on mobile devices
- **Image Assets**: CDN-hosted optimized images
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Proper semantic HTML and ARIA attributes