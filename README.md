# T2T — Trash to Treasure 🌿✨
### *Upcycled Handcrafted Living*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-success?logo=vercel&style=flat-square)](https://trash-to-treasure.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?logo=github&style=flat-square)](https://madhu2007-offical.github.io/Origins.Co/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff?logo=vite&style=flat-square)](https://vitejs.dev/)

An upcycling social-commerce platform connecting conscious patrons directly with regional artisans who transform reclaimed scrap materials into durable handcrafted treasures with verified provenance.

---

## 🌐 Live Deployments

| Platform | URL | Status |
| :--- | :--- | :---: |
| **Vercel (Primary)** | [https://trash-to-treasure.vercel.app](https://trash-to-treasure.vercel.app) | 🟢 Active |
| **Vercel (Secondary)** | [https://t2t-trash-to-treasure.vercel.app](https://t2t-trash-to-treasure.vercel.app) | 🟢 Active |
| **GitHub Pages Mirror** | [https://madhu2007-offical.github.io/Origins.Co/](https://madhu2007-offical.github.io/Origins.Co/) | 🟢 Active |

---

## ✨ Key Features

### 🎬 Cinematic Opening Splash Animation
- **Drift (0.0s–0.8s):** 26 felt cut-out waste items (plastic bottles, tin cans, cardboard scraps, textiles, tires, glass jars, etc.) with tactile dashed stitching drift onto the screen.
- **Vortex Swirl (0.8s–2.0s):** Items spiral inward in a swirling vortex toward the center, accompanied by a soft Web Audio synthesizer whoosh.
- **Treasure Merge (2.0s–2.6s):** Waste merges into the glowing central **T2T Treasure Emblem** (recycling arrows forming a leaf/heart), triggering a golden sparkle burst and harmonic chime chord.
- **Brand Reveal (2.6s–3.3s):** Wordmark *"Trash to Treasure"* and tagline *"Upcycled Handcrafted Living"* fade up.
- **Curtain Door Reveal (3.3s–4.0s):** The screen parts open like double doors, seamlessly uncovering the preloaded application without layout shift.
- **Responsive & Accessible:** Tap-anywhere to skip on mobile, keyboard shortcuts (<kbd>Esc</kbd>, <kbd>Space</kbd>, <kbd>Enter</kbd>), `prefers-reduced-motion` compliance, and safe-area inset support (`env(safe-area-inset-*)`).

### 🛍️ Handcrafted Marketplace & Verified Origin QR Certificates
- Discover curated upcycled pieces categorized by craft (Textiles, Woodcraft, Pottery, Metalwork, Paper & Glass).
- Each product is stamped with a unique **Verified Origin QR Certificate ID** certifying raw scrap origins and regional artisan provenance.

### 📸 Customer Order Customization & Scrap Photo Upload
- **Material Customization at Checkout:** Patrons can describe their preferred scrap material specifications and attach scrap photos directly at checkout.
- **Order Ledger Editor in Dashboard:** Customers can update order notes and upload material photos anytime using device file selection or direct image URLs with instant previews.

### 🛠️ Artisan Studio & Customer Dashboard
- **Artisan Inbox:** Artisans review customer specifications and inspect high-resolution scrap material photos directly in incoming orders.
- **Patron Dashboard:** Track active orders, provenance milestones, and environmental impact metrics.

### 🔐 Authentication & Verification
- Real account sign-in and sign-up with email, phone number, and password.
- Real Gmail OTP verification flow with one-click code auto-fill.
- One-click Google sign-in modal with instant account provisioning.

---

## 💻 Tech Stack

- **Frontend:** React 19, JavaScript (ES Module)
- **Tooling & Build:** Vite 8, Oxlint
- **Motion & Animations:** Framer Motion 14, Hardware-Accelerated CSS
- **Audio:** Web Audio API (Synthesized chime and wind whoosh; zero external audio files)
- **Icons:** Lucide React
- **Hosting:** Vercel & GitHub Pages

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/madhu2007-offical/Origins.Co.git

# Navigate to project directory
cd Origins.Co

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Deploy to Vercel
npx vercel --prod --yes
```

---

## 📁 Project Structure

```
Origins.Co/
├── public/                 # Static assets & favicons (t2t-logo.jpg)
├── src/
│   ├── assets/             # Brand logos & imagery
│   ├── components/
│   │   ├── AuthView.jsx    # Authentication & OTP verification portal
│   │   ├── AuthView.css
│   │   ├── SplashScreen.jsx# Cinematic opening video animation
│   │   └── SplashScreen.css
│   ├── data/
│   │   └── mockData.js     # Default artisans, products & stories
│   ├── utils/
│   │   └── storage.js      # LocalStorage persistence & migration
│   ├── App.jsx             # Main router, header, feed, shop, dashboards
│   ├── App.css
│   ├── index.css           # Core theme variables & design tokens
│   └── main.jsx
├── vercel.json             # Vercel SPA routing rewrite configuration
├── package.json
└── vite.config.js
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
