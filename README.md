# GatePack 📦

> **Exhibition Prototype** | Course STET301: Human-Computer Interaction | Vijaybhoomi University

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://sudomayo.github.io/GatePack/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A frontend-only, mobile-first, clickable prototype of **GatePack** built for a live university exhibition. Designed to be completely self-explanatory, glare-resistant, and impossible to dead-end.

---

## 🌐 Live Showcase

Experience the live interactive prototype on your phone, tablet, or desktop:

👉 **[https://sudomayo.github.io/GatePack/](https://sudomayo.github.io/GatePack/)**

- **Mobile Viewports (≤500px)**: Fills `100dvh` natively without phone borders or fake status bars. Optimized for outdoor glare and touchscreen touch targets (≥44px).
- **Desktop Viewports (>500px)**: Displays an iPhone 15/16-proportioned frame (393×852 px) with a realistic status bar and subtle presentation elevation, set against a neutral canvas designed for portfolio and Behance showcases.

---

## 📍 Problem & HCI Context

**Setting**: Vijaybhoomi University. Couriers (Amazon, Flipkart, Myntra) drop parcels at two campus gates:
- **Gate 1**: Main Gate / Security Post 1
- **Gate 2**: Hostel Quad / Security Post 2

Hostels are up to a 15-minute uphill walk away in ~34 °C heat. Commercial courier apps mark packages "Delivered" while boxes are still sealed in unsorted bulk bags. Students walk down prematurely, arrive at the wrong gate, and search through 80+ unsorted boxes.

### Core Usability Flaws Fixed (Exhibition Story)

| # | Heuristic | Flaw in Early Sketch | Fix Visible in Prototype |
|---|-----------|----------------------|--------------------------|
| **1** | **H5: Error Prevention** | OTP shown the moment courier said "Delivered", prompting pointless walks | **Package Pending Screen**: OTP **locked**, prominent "Do not walk down" banner, 3-step live unboxing stepper, wait estimate, and "Notify me when shelved". |
| **2** | **H1: System Status** &<br>**H6: Recognition over Recall** | Students defaulted to Gate 1 out of habit | **Location Mismatch Screen**: Inverted alert banner ("At Gate 2, not Gate 1"), bold actual location card, walking distance (650 m, ~8 min), and gate-bound OTP. |
| **3** | **H3: User Control & Freedom** | OTP redemption was a one-way tunnel | **Reversible Navigation**: "Back" control on every child screen, "Return to dashboard" links, bottom sheet confirmation before handover, and OTP state preserved across navigation. |

---

## 📱 Five Core Screens

All five screens are built faithful to the exhibition wireframes (`docs/wireframes/`):

1. **Dashboard (`/`)**
   - Header with wordmark and student chip (`ID: 248`).
   - Accessible ARIA tabs: **Active (n)** and **History (n)** with arrow-key navigation.
   - Ready parcel card with urgent chip (`Urgent: lab gear`), horizontal 3-step intake stepper, and location block (`Gate 1 | Shelf Bin B-3`).
   - "Other updates" section routing directly to pending unboxing or location mismatch states.
   - Clean brand footer.

2. **Parcel OTP (`/parcel/:id/otp`)**
   - High-contrast location card and intake timestamp.
   - **Hero `OtpBoxes`**: 56×68 px boxes with 2 px ink border, centered, bold mono digits.
   - Real generated vector QR code (`qrcode.react`) with a live 15-minute countdown timer.
   - Reassurance notice: *"Your OTP stays valid if you leave this screen."*
   - Sticky footer with confirmation sheet trigger.

3. **Handover Complete (`/parcel/:id/done`)**
   - 72 px ink check badge with auto-focused heading for screen readers.
   - Monospace Transaction Record receipt (Retrieved time, OTP reference, Security Post).
   - Atomic navigation (`replace`) preventing stale backward navigation.

4. **Package Pending (`/parcel/:id/pending`)**
   - Full-bleed warning banner: *"Do not walk down. Unboxing in progress."*
   - Vertical stepper (`<ol>`) displaying Dropped (Done), Security unboxing (In progress), and Shelved (Pending).
   - Dashed locked OTP box (*"Generates once shelved"*).
   - Notification toggle simulating security shelving (updates in-place or via toast).

5. **Location Mismatch (`/parcel/:id/mismatch`)**
   - Inverted ink banner: *"At Gate 2, not Gate 1"*.
   - Destination card with Gate 2 indicator and Bin chip.
   - Walk distance strip (`Walk: 650 m (~8 min across quad)`).
   - Gate-bound OTP with clear guard restriction notice.

---

## 🎮 Interactive Features & URL Parameters

| Parameter | Purpose | Behavior |
|-----------|---------|----------|
| `?kiosk=1` | **Exhibition Kiosk Mode** | Automatically resets the prototype after **180 seconds** of user inactivity (pointer, touch, key, or scroll). |
| `?shelveDelay=<sec>` | **Unboxing Timer Override** | Customizes the simulated unboxing delay for the pending Flipkart parcel (default: 10 seconds). |

---

## 🎨 Design System & Anti-Slop Discipline

- **Curated Neutral Palette (Engineered for Behance & Sunlight Readability)**:
  - `--bg-app`: `#E7E3DA` (App background — visible warm neutral stone/concrete that cleanly contrasts against Behance's pure white `#FFFFFF` canvas)
  - `--card-bg`: `#F7F5F0` (Card & interactive surface background — clean warm off-white)
  - `--surface`: `#D8D2C5` (Secondary surface: unselected tabs, info blocks, recessed rows)
  - `--white`: `#FFFFFF` (Crisp contrast for text & icons on dark buttons and badges)
  - `--ink`: `#181716` (Primary text, primary buttons, 2px borders, alert banners)
  - `--ink-2`: `#2C2A28` (Pressed state for ink surfaces)
  - `--muted`: `#59554E` (Secondary text, ≥5.5:1 on app bg, ≥6.5:1 on cards)
  - `--outline`: `#8C867B` (1px control borders, ≥3:1 contrast)
  - `--page`: `#CDC6B8` (Desktop backdrop behind the device frame)
- **Anti-Slop Rules**: Zero generic SaaS gradients, zero pastel fluff, zero stock avatars/emojis. Style is utilitarian, physical, and restrained — inspired by Dieter Rams and Swiss railway signage.
- **Typography**: Self-hosted `@fontsource/ibm-plex-sans` for interface copy, `@fontsource/ibm-plex-mono` strictly for fixed-width data (OTPs, parcel references, timestamps).
- **Accessibility**: Full WCAG AA compliance, semantic HTML, ARIA tablist patterns, focus traps in modals, `prefers-reduced-motion` support.

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Commands
```bash
# Navigate to project directory
cd gatepack

# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🚢 Continuous Deployment

GatePack uses automated CI/CD via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):
- Runs on every push to `main`.
- Automatically executes `typecheck`, `lint`, and `build`.
- Deploys static bundle directly to GitHub Pages.

---

## 📁 Repository Structure

```
GatePack/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD deployment
├── docs/
│   └── wireframes/             # Original exhibition wireframe PNGs (01 - 05)
├── gatepack/
│   ├── public/
│   │   └── favicon.svg         # Minimalist brand package icon
│   ├── src/
│   │   ├── components/         # Modular UI components (PhoneFrame, OtpBoxes, ConfirmSheet, etc.)
│   │   ├── hooks/              # Custom hooks (useKiosk)
│   │   ├── screens/            # The 5 core screens (Dashboard, ParcelOtp, HandoverComplete, etc.)
│   │   ├── state/              # Context & useReducer state machine
│   │   ├── styles/             # Design tokens and vanilla CSS
│   │   ├── App.tsx             # Root routing with ParcelGuard
│   │   ├── data.ts             # Initial seed data
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── main.tsx            # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

---

*Designed and engineered for university exhibition visitors. Zero dead-ends, glare-optimized, and fully interactive.*
