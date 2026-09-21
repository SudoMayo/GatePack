# GatePack: Exhibition Prototype (Master Prompt)

> Paste everything below this line into Antigravity. Attach the 5 wireframe PNGs to the same message, and also keep them in the workspace at `docs/wireframes/`.

---

## 0. Working agreement

You are a senior product engineer with strong HCI/UX judgment. Build a **frontend-only, mobile-first, clickable prototype** of an app called **GatePack** for a live university exhibition (course STET301, Human-Computer Interaction). Visitors will pick up a phone or laptop and try it with no instructions, so it has to be self-explanatory and must never dead-end.

How to work:

1. Read this whole brief first. Then open every image in `docs/wireframes/`. Then write a short implementation plan (as an artifact) that maps the stages in section 14 to files. Then build.
2. Do not ask me questions unless you are truly blocked. When something is ambiguous, choose the option closest to the wireframes and record it under "Assumptions" in your final report.
3. Build in the stages from section 14 and pass each verify gate before moving on. `git init` locally and commit after each stage. **Never push, publish or deploy anything without my explicit instruction.**
4. Scope discipline: build only what this brief lists. If you think of a good extra, put it under "Suggestions" in the final report and do not build it. (Course rule: iteration must not turn into a "Frankenstein design".)
5. Simple beats clever. Small readable components. No abstractions you don't need, no dead code, no TODO comments, no placeholder text.

## 1. Product context (what and why)

**Setting:** Vijaybhoomi University. Couriers (Amazon, Flipkart, Myntra) drop parcels at two campus gates: **Gate 1** (Main Gate / Security Post 1) and **Gate 2** (Hostel Quad / Security Post 2). Hostels are up to a 15-minute uphill walk away, in ~34 °C heat.

**The problem:** Courier apps mark parcels "Delivered" while the boxes are still sealed in bulk bags. Students walk down for nothing, go to the wrong gate, then dig through 80+ unsorted boxes.

**The solution (GatePack):** Guards put parcels on labelled shelf bins and log them. The student's app then shows the truth: which gate, which bin, whether the parcel is actually shelved yet, and a one-time OTP the guard uses to hand over the parcel in seconds.

**Core user:** Harshit, a 1st-year student with a packed timetable. Anxious about urgent items (replacement laptop charger, medicine), tired of pointless walks, doesn't want to bother the guards. He often checks his phone **outdoors in bright sun**.

**The three usability flaws the final design fixes (this is the exhibition's story, so the UI must make each one visible):**

| # | Heuristic | Flaw in early sketch | Fix that must be visible in the prototype |
|---|-----------|---------------------|-------------------------------------------|
| 1 | H5 Error prevention | OTP shown the moment the courier said "delivered", so students walked down too early | Package Pending screen: OTP **locked**, "Do not walk down" banner, 3-stage progress, wait estimate, "Notify me when shelved" |
| 2 | H1 System status, H6 Recognition over recall | Students defaulted to Gate 1 from habit | Location Mismatch screen: "At Gate 2, not Gate 1", bold destination card, walking distance, gate-bound OTP |
| 3 | H3 User control and freedom | OTP screen was a one-way tunnel | Back button on every child screen, "Return to dashboard" link, and the OTP stays valid when you leave the screen |

## 2. Source of truth

- **Layout and visual structure:** the five PNGs in `docs/wireframes/` (393×852, i.e. iPhone 15/16 size). If this text and an image disagree about *layout*, the image wins.
- **Behaviour, states, copy details:** this brief. If this text and an image disagree about *behaviour*, this brief wins.

Intentional deviations from the wireframes (these are deliberate; do not "fix" them back):

1. Wireframe bracket notation (`[< Back]`, `[COMPLETE HANDOVER]`, `[!]`, `[QR CODE]`) becomes real UI: a real back control, real buttons, real icons, and a **real generated QR code**.
2. Sentence case for labels and buttons instead of ALL CAPS (all-caps hurts readability in glare).
3. Stepper labels are unified everywhere as **Dropped → Unboxing → Shelved** (the wireframes mixed "Intake/Ready" and "Security Unboxing/Shelved").
4. A "Package" row is added to screens 04 and 05, and the "Other updates" rows are two lines, because with three parcels the user must be able to tell which one is which (H6).
5. Muted grays are darkened for sunlight legibility (see tokens).
6. Added: confirm sheet before "Complete handover", live OTP countdown, OTP-expired state, empty state, reset link. All of these serve H1, H3 and H5.
7. The dashboard footer "GatePack Wireframe v1.0" becomes "GatePack prototype v1.0" plus a "Reset demo" text button.
8. Screen 02 also gets a "Return to dashboard" text link under the primary button (required by the heuristic report).

## 3. Design principles (non-negotiable)

- **Function over form.** The structure of the wireframes is the design. Style is restrained and quiet.
- **Spend boldness in exactly one place: the OTP digits.** They are the hero of the whole app. Everything else stays calm.
- **Designed for glare.** Pure white background, near-black ink, large OTP, no light-gray text. Minimum text size 12 px, and only for non-essential labels.
- **Never rely on colour.** The palette is deliberately monochrome. State is carried by icon + text + fill pattern (filled, ring, empty, dashed).
- **Visual structure is information:** 2 px ink border = primary/actionable; 1 px border = secondary; dashed border = locked/disabled; inverted (ink background) = alert. Nothing is decorative.
- **Real, messy content only.** No Lorem Ipsum, no "John Doe". Long real product names must wrap gracefully (clamp to 2 lines) and never break the layout. (Course rule: real data breaks designs, and you want it to break now.)
- **Design the unhappy paths.** For every success screen there is a loading, empty, expired or error counterpart (course rule: the "happy path tunnel vision" trap).
- **Only prototype what a developer could ship in a day.** No confetti, no 3D, no spring physics, no page-load choreography. Motion only responds to a user action, and is ≤200 ms.
- **Consistency (H4).** One name per thing throughout: "OTP", "shelved", "Gate 1", "Bin B-3", "Complete handover". An action keeps its name across the flow (button "Complete handover" leads to the screen "Handover complete").
- **Plain language from the user's side.** CTAs say what happens. Errors say what happened and what to do, and never apologise. Empty states point to the next step.

## 4. Scope (MoSCoW)

**Must (wireframe-faithful):**
- The 5 screens: Dashboard, Parcel OTP, Handover Complete, Package Pending, Location Mismatch, with the exact content and navigation of the wireframes.
- Back button on every child screen, plus "Return to dashboard" / "Back to dashboard".
- Locked OTP on Pending; inverted alert banner on Mismatch; urgent tag on the parcel card.

**Should:**
- One shared state store so the flows are consistent: Notify, then shelved, then OTP unlocks, then collected, then History updates.
- History tab (4 seeded entries), Active empty state, toast on shelved.
- Confirm sheet before completing handover; live OTP countdown; route guards.

**Could (Stage 3, only after everything else passes):**
- OTP-expired state with "Get a new OTP".
- Facilitator panel (desktop only) with Wizard-of-Oz controls.
- `?kiosk=1` idle auto-reset.
- Simulated network failure on "Complete handover".

**Won't:**
- Backend, auth, real scanning, push notifications, persistence (a page reload must reset the demo), dark mode, i18n, extra screens (settings, marketplace, lockers, shuttle, analytics), A/B infrastructure, any animation library, any UI kit.

## 5. Tech stack

- **Vite + React 18 + TypeScript (strict)**. Verify Node ≥ 20 first.
- **react-router-dom v6 with `HashRouter`** (works on GitHub Pages and from a local file server without server config).
- **Plain CSS** with CSS custom properties (one `tokens.css`, one `base.css`, component styles co-located or in one `components.css`). **No Tailwind, no component library.**
- **State:** React Context + `useReducer`. In-memory only (no `localStorage`).
- **Icons:** `lucide-react` (2 px stroke, 18–20 px, decorative icons get `aria-hidden`). Verify each icon name exists in the installed version; e.g. `TriangleAlert` may be exported as `AlertTriangle` in older versions. Icons to use: `ChevronLeft`, `ChevronRight`, `TriangleAlert`, `Clock`, `Lock`, `LockOpen`, `Check`, `Bell`, `Footprints`, `X`, plus `Signal`, `Wifi`, `BatteryFull` for the desktop frame status bar.
- **QR:** `qrcode.react` (`QRCodeSVG`). Payload example: `gatepack://pickup?parcel=AMZ-90214&otp=4829&gate=1`.
- **Fonts (self-hosted, so it works offline):** `@fontsource/ibm-plex-sans` (400, 500, 600, 700) and `@fontsource/ibm-plex-mono` (400, 500, 700). Sans for everything; mono **only** for data that benefits from fixed width: OTP digits, parcel refs like `AMZ-90214`, times, the countdown and the receipt.
- **No external network requests at runtime.** No CDN fonts, no analytics.
- `vite.config.ts`: `base: './'`.
- Scripts: `dev`, `build`, `preview`, `lint`, `typecheck` (`tsc --noEmit`). ESLint with the react-hooks plugin.

## 6. Design tokens (`tokens.css`)

```css
:root {
  /* Colour: 6 values. That's the whole palette. */
  --white:   #FFFFFF;  /* screen background */
  --ink:     #111827;  /* text, primary buttons, 2px borders, alert banners */
  --ink-2:   #374151;  /* pressed state for ink surfaces */
  --muted:   #4B5563;  /* secondary text (>= 6.6:1 on surface, safe in glare) */
  --outline: #6B7280;  /* 1px control borders (>= 3:1) */
  --surface: #F3F4F6;  /* info blocks, unselected tabs, rows */
  --line:    #E5E7EB;  /* decorative dividers only */
  --page:    #E5E7EB;  /* desktop backdrop behind the phone frame */

  /* Type */
  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --fs-12: 12px; --fs-13: 13px; --fs-15: 15px; --fs-17: 17px; --fs-22: 22px; --fs-24: 24px; --fs-otp: 36px;
  /* Body 15/1.45. Titles 600-700. Line length is never an issue on 393px. */

  /* Space (4px base) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 20px; --s-6: 24px; --s-8: 32px;

  /* Shape */
  --r-sm: 6px;   /* buttons, chips, boxes */
  --r-md: 8px;   /* cards, rows */
  --r-frame: 32px;

  /* Controls */
  --tap: 44px;   /* minimum touch target */
  --cta-h: 52px; /* primary buttons */
}
```

Rules: no gradients, no box-shadows (borders only; the only shadow allowed is a scrim behind the confirm sheet), radii are only 6 or 8, screen padding 16 px.

Buttons: primary = ink background, white text, 52 px high, full width, 600 weight, `:active` uses `--ink-2`, disabled = `--surface` background + `--muted` text. Secondary = white background, 2 px ink border. Text link = underlined, 13 px, 44 px tall hit area. Every interactive element has a visible focus ring: `outline: 2px solid var(--ink); outline-offset: 2px`. Add `touch-action: manipulation` to controls.

## 7. App shell and responsive behaviour

- **Phone (viewport ≤ 500 px wide):** the app fills `100dvh`. No frame, no fake status bar. Respect safe-area insets (`viewport-fit=cover`). Support widths 360–430 px.
- **Desktop (> 500 px):** centre a **phone frame** on `--page`: width **393 px**, height `min(852px, calc(100dvh - 32px))`, 1.5 px ink border, `--r-frame` radius, `overflow: hidden`, white inside. Draw a static status bar at the top of the frame (`9:41` on the left, Signal/Wifi/BatteryFull on the right). Screens inside are flex columns: the header is fixed, `main` scrolls, and the primary action sits in a **sticky footer** (padding 16 px + bottom safe area). No scrollbars visible outside the frame.
- **Facilitator panel:** only at ≥ 900 px wide, placed to the right of the frame (Stage 3). Hidden on smaller screens and with `?presenter=0`.
- `<html lang="en">`, `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, `<meta name="theme-color" content="#111827">`. Do **not** disable pinch-zoom. Set `document.title` per screen (e.g. "GatePack: Verification").

## 8. Data model and seed data (`types.ts`, `data.ts`)

```ts
type ParcelStatus = 'unboxing' | 'shelved' | 'collected';

interface Parcel {
  id: string;
  courier: string;
  ref: string;               // e.g. 'AMZ-90214'
  item: string;
  weightKg: number;
  urgentLabel?: string;      // e.g. 'lab gear'
  status: ParcelStatus;
  gate: 1 | 2;
  gateName: string;          // 'Main Gate' | 'Hostel Quad'
  bin: string | null;
  post: string;              // 'Security Post 1' | 'Security Post 2'
  otp: string | null;        // 4 digits
  otpExpiresAt: number | null; // epoch ms; null until first issued
  intakeAt: string | null;   // display string
  retrievedAt: string;       // display string used on the receipt / history
  notifyOn: boolean;
  walk?: { meters: number; minutes: number; note: string };
}

type Kind = 'ready' | 'pending' | 'mismatch' | 'collected';
// kind: collected -> 'collected'; unboxing -> 'pending'; shelved && gate !== 1 -> 'mismatch'; else 'ready'
```

Seed parcels (use these exact strings):

```ts
A: { id:'amz-90214', courier:'Amazon',   ref:'AMZ-90214', item:'Replacement Laptop Charger',
     weightKg:2.4, urgentLabel:'lab gear', status:'shelved', gate:1, gateName:'Main Gate', bin:'B-3',
     post:'Security Post 1', otp:'4829', intakeAt:'11:22 AM', retrievedAt:'11:42 AM' }

B: { id:'fkt-55021', courier:'Flipkart', ref:'FKT-55021',
     item:'Milton Thermosteel Flip Lid Flask, 1000 ml (Pack of 2)',
     weightKg:1.6, status:'unboxing', gate:1, gateName:'Main Gate', bin:null,
     post:'Security Post 1', otp:null, intakeAt:null, retrievedAt:'12:10 PM' }
   // when shelved: bin 'A-2', otp '3157', intakeAt '11:58 AM'

C: { id:'myn-30871', courier:'Myntra',   ref:'MYN-30871',
     item:'Roadster Men Oversized Hooded Sweatshirt, Size L',
     weightKg:0.8, status:'shelved', gate:2, gateName:'Hostel Quad', bin:'D-1',
     post:'Security Post 2', otp:'7104', intakeAt:'11:31 AM', retrievedAt:'12:25 PM',
     walk:{ meters:650, minutes:8, note:'across quad' } }
```

Seed history (4 entries, already collected; rows are display-only):

1. Flipkart #FKT-20418, "Wooden Study Desk Lamp with Wireless Charger", collected Sat 12 Sep, 4:10 PM, Gate 1, Bin A-2
2. Amazon #AMZ-88763, "Atomic Habits Paperback", collected Tue 8 Sep, 6:45 PM, Gate 1, Bin C-4
3. Myntra #MYN-27390, "Puma Men's Running Shoes, UK 9", collected Fri 4 Sep, 1:15 PM, Gate 2, Bin D-3
4. Amazon #AMZ-85519, "Cello Ball Pens, Pack of 50", collected Mon 31 Aug, 5:30 PM, Gate 1, Bin B-1

Student ID chip: `ID: 248`.

## 9. Screens

Shared components: `BackHeader` (left: `ChevronLeft` + "Back", 44 px hit area; right: screen title, 17/600; 1 px `--line` bottom border), `Banner`, `OtpBoxes`, `Stepper` (horizontal and vertical variants), `PackageRow`, `StickyFooter`, `Toast`, `ConfirmSheet`.

`OtpBoxes`: four boxes, each 56×68 px, 2 px ink border, `--r-sm`, white, mono `--fs-otp` 700, 10 px gap, centred. Rendered as one element `role="img"` with `aria-label="OTP: 4, 8, 2, 9"`; the digits are `aria-hidden`. This is the one visually loud element in the app.

`PackageRow`: `--surface` block, `--r-md`, padding 12 16. Label "Package" (12/600 muted) above the value (15/600), value clamped to 2 lines.

`Back` and every "Return to dashboard" / "Back to dashboard" control **navigate straight to `/`** (they do not use `history.back()`, so a deep link can never strand the user).

### 9.1 Dashboard: route `/` (wireframe 01)

- **Header:** wordmark "GatePack" (22/700, left). Right: `ID: 248` as a flat tag (mono 12, `--surface` background, no border, so it does not look tappable).
- **Tabs** (`role="tablist"`, arrow-key navigation): two equal buttons, 44 px: "Active (n)" and "History (n)". Selected = ink background + white text. Unselected = white + 1 px outline + ink text. `n` is derived from state.
- **Active tab, ready parcels** (kind `ready`): one `ParcelCard` each.
  - 2 px ink border, `--r-md`, padding 16, 12 px vertical gap.
  - Row 1: left, if `urgentLabel`: inverted chip (ink bg, white text, `--r-sm`, `TriangleAlert` 14 px, text `Urgent: lab gear`, 12/600). Right: ref in mono 12 muted, e.g. `AMZ-90214`.
  - Title `Amazon #AMZ-90214` (17/600). Under it `Est. weight: 2.4 kg` (13 muted).
  - Horizontal stepper: three ink-filled nodes joined by a 2 px ink line, labels below (12/500): **Dropped, Unboxing, Shelved**.
  - Location block: `--surface`, 1 px outline, `--r-sm`, padding 12. Label "Location assigned" (12/600 muted). Value `Gate 1 | Shelf Bin B-3` (17/700).
  - Primary button "View pickup OTP" + `ChevronRight`, goes to `/parcel/:id/otp`.
- **Active empty state** (no ready parcels): centred, "Nothing ready to collect yet" (17/600) and "We'll list a parcel here once security has shelved it." (13 muted).
- **"Other updates"** (section label 13/600 muted; hidden if none). One `UpdateRow` per parcel of kind `pending` or `mismatch`. Each row is a full-width button, `--surface`, 1 px outline, `--r-md`, min-height 60, padding 12 14, icon on the left, two text lines, `ChevronRight` on the right:
  - pending: `Clock` icon; title "Unboxing in progress (wait 15–20 min)"; second line "Flipkart #FKT-55021"; goes to `/parcel/fkt-55021/pending`.
  - mismatch: `TriangleAlert` icon; title "Arrived at Gate 2 instead"; second line "Myntra #MYN-30871"; goes to `/parcel/myn-30871/mismatch`.
- **History tab:** display-only rows (no chevron, not focusable as buttons). Each row: title `Flipkart #FKT-20418` (15/600); item name (13 muted, 2-line clamp); "Collected Sat 12 Sep, 4:10 PM" (13 muted); at right "Gate 1, Bin A-2" (mono 12). Newly collected parcels are inserted at the top with their `retrievedAt` (e.g. "Collected today, 11:42 AM").
- **Footer** (pushed to the bottom with `margin-top: auto`, muted mono 12): "GatePack prototype v1.0" and a text button "Reset demo".

### 9.2 Parcel OTP: route `/parcel/:id/otp` (wireframe 02; only for kind `ready`)

Top to bottom:

1. `BackHeader`, title "Verification".
2. Location card (2 px ink border): `Gate 1 | Bin B-3` (18/700) and `Intake: 11:22 AM` (mono 13 muted).
3. Label "Show to guard" (13/600, centred).
4. `OtpBoxes` (the hero).
5. **QR code:** real QR, ~168 px, inside a white block with a 1 px outline and 12 px padding, centred. Under it, a live countdown "Expires in 14:52" (mono 13, `role="timer"`, not an aria-live region).
6. `PackageRow`: "Amazon – Replacement Laptop Charger".
7. Reassurance line (13 muted, centred): "Your OTP stays valid if you leave this screen."
8. **Sticky footer:** primary "Complete handover", and below it the text link "Return to dashboard".

Behaviour:
- **OTP validity is 15 minutes, starting the first time this screen is opened for that parcel** (store `otpExpiresAt` in state; leaving and coming back must **not** reset it or change the digits).
- **Confirm sheet** (bottom sheet, `role="dialog"`, `aria-modal`, focus trap, Esc and scrim-tap close it): title "Did the guard hand you your parcel?", body "Confirm only when you're holding it. This can't be undone." Buttons: primary "Yes, complete handover" and secondary "Not yet". **Initial focus goes to "Not yet"** (the safe choice).
- On confirm: the button shows "Confirming…" and is disabled for ~700 ms (a loading state), then the parcel becomes `collected` and the app navigates to `/parcel/:id/done` with `replace`.
- **Expired state (Could):** when the countdown hits 0, the boxes become dashed, disabled and read "Code expired"; the QR is hidden; the line reads "This OTP expired. Get a new one and try again."; the footer button becomes "Get a new OTP" (~500 ms "Getting new OTP…" loading state, then new random 4 digits different from the old ones, and a fresh 15-minute timer). "Complete handover" is not available while expired, and a confirm attempted after expiry closes the sheet and shows the expired state.
- **Simulated network failure (Could):** if enabled, "Yes, complete handover" fails after the loading state and shows an inline error in the sheet (`role="alert"`): "Couldn't confirm the handover. Check your connection and try again." Buttons: "Try again" and "Cancel".

### 9.3 Handover Complete: route `/parcel/:id/done` (wireframe 03; only for kind `collected`)

- **No header** (as in the wireframe). Content centred, ~96 px top padding.
- 72 px ink circle with a white `Check` (stroke 3). Heading "Handover complete" (24/700; focus it on mount with `tabIndex={-1}` so screen readers announce it). Under it, `Gate 1, Bin B-3` (15 muted).
- **Receipt card:** `--surface`, 1 px outline, `--r-md`, padding 16, mono 13. Centred title "Transaction record" (bold), then a 1 px dashed divider, then three left-aligned lines:
  - `Retrieved: 11:42 AM`
  - `OTP: #4829`
  - `Security Post 1`
- Sticky footer: primary "Back to dashboard".
- Because the handover navigates with `replace`, the browser back button must not return to the OTP screen. The parcel now appears in History (count +1) and Active loses it.

### 9.4 Package Pending: route `/parcel/:id/pending` (wireframe 04; for kind `pending`, and the in-place "shelved" variant)

Top to bottom:

1. `BackHeader`, title "Package pending".
2. **Banner** (full-bleed): `--surface` background, 2 px ink bottom border, `TriangleAlert` + "Do not walk down. Unboxing in progress." (14/700).
3. `PackageRow`: "Flipkart – Milton Thermosteel Flip Lid Flask, 1000 ml (Pack of 2)".
4. **Vertical stepper** (`<ol>`, active step has `aria-current="step"`), 3 steps joined by a 2 px line:
   - "Dropped": ring with `Check`, status text "Done".
   - "Security unboxing": ring with a filled dot, 600 weight, status "In progress".
   - "Shelved": empty ring, status "Pending".
5. Strip (`--surface`, `--r-sm`, padding 12): "Est. wait: 15–20 min" (15/600).
6. **Locked OTP box:** 1.5 px **dashed** outline, `--r-md`, padding 16, centred: `Lock` + "OTP locked" (15/700) and "Generates once shelved" (13 muted).
7. **Sticky footer:** notify toggle, and the text link "Return to dashboard".
   - Off: primary button with `Bell` + "Notify me when shelved", `aria-pressed="false"`.
   - On: secondary button (white, 2 px ink border) with `Check` + "Notification on. Tap to turn off", `aria-pressed="true"`, and helper text above it (13 muted): "We'll alert you as soon as it's on the shelf."

Behaviour (this is the payoff of fix #1):
- Turning notify **on** starts a simulated timer (default **10 s**, override with `?shelveDelay=<seconds>`). Turning it **off** cancels it.
- When the timer fires (or the facilitator presses "Shelve now"), the parcel becomes `shelved` at Gate 1 with bin `A-2`, OTP `3157`, intake `11:58 AM`.
- **If the user is still on this screen**, it updates in place (the "shelved variant"): banner becomes inverted ink with `Check` + "Ready. Go to Gate 1, Bin A-2"; stepper shows all three done; the est. wait strip becomes a location card `Gate 1 | Bin A-2`; the locked box becomes a solid 1 px box with `LockOpen` + "Your OTP is ready"; the footer becomes the primary "View pickup OTP" (goes to `/otp`).
- **If the user is elsewhere and notify was on**, show the toast (below). If notify was off, do not toast; the dashboard simply reflects the new state.

**Toast:** overlay inside the phone frame, below the status bar / safe-area top, 12 px from the edges. Ink background, white text, `--r-md`. Line 1 "Parcel shelved" (15/600). Line 2 "Flipkart #FKT-55021 is ready at Gate 1, Bin A-2." (13). The whole toast is a button that goes to `/parcel/fkt-55021/otp`. A 44 px `X` button dismisses it. `role="status"`, `aria-live="polite"`. Auto-dismisses after 10 s. Never show it while the user is on that parcel's pending screen.

### 9.5 Location Mismatch: route `/parcel/:id/mismatch` (wireframe 05; for kind `mismatch`)

Top to bottom:

1. `BackHeader`, title "Location mismatch".
2. **Inverted banner** (full-bleed, ink background, white text): `TriangleAlert` + "At Gate 2, not Gate 1" (14/700).
3. **Destination card** (2 px ink border): label "Actual location" (12/600 muted); value "Gate 2 (Hostel Quad)" (22/700); a small chip "Bin D-1" (`--surface`, mono 13, `--r-sm`).
4. Walk strip (`--surface`, `--r-sm`): `Footprints` + "Walk: 650 m (~8 min across quad)".
5. `PackageRow`: "Myntra – Roadster Men Oversized Hooded Sweatshirt, Size L".
6. Label "Gate 2 OTP" (13/600, centred), `OtpBoxes` showing `7 1 0 4`, and the caption "Gate 1 guard cannot redeem this code." (13 muted, centred).
7. Sticky footer: primary "Back to dashboard".

No countdown, no QR, no complete-handover here (faithful to the wireframe).

## 10. Routes, guards and state transitions

Routes: `/`, `/parcel/:id/otp`, `/parcel/:id/pending`, `/parcel/:id/mismatch`, `/parcel/:id/done`. Anything unknown redirects to `/`.

**Guard** (wrap the parcel routes): compute the parcel's `kind` and allow only:
- `otp` for `ready`
- `pending` for `pending` and for `ready` (the in-place shelved variant)
- `mismatch` for `mismatch`
- `done` for `collected`

Otherwise redirect: `ready` → `/otp`, `pending` → `/pending`, `mismatch` → `/mismatch`, `collected` → `/`, unknown id → `/`. So a deep link or the browser back button can never show a wrong or unreachable state.

Reducer actions: `OPEN_OTP`, `REGENERATE_OTP`, `COMPLETE_HANDOVER`, `TOGGLE_NOTIFY`, `SHELVE`, `SET_TAB`, `EXPIRE_OTP`, `SET_TOAST` / `DISMISS_TOAST`, `SET_SIMULATE_FAILURE`, `RESET`. Derive counts and lists with pure selectors. The countdown uses `Date.now()` against `otpExpiresAt` (a 1 s interval to re-render), never a decrementing counter.

`RESET` restores the seed state, clears toast and timers, sets the tab to Active, and navigates to `/`. It is reachable from the dashboard footer link ("Reset demo"), and a full page reload also resets everything.

## 11. Copy rules

Sentence case. Use the exact strings in section 9. Keep the vocabulary consistent (section 3). No exclamation marks, no emoji, no greetings, no apologies in errors. Times use 12-hour format with AM/PM; distances in m; weights in kg. Avoid middle-dot separators and arrow glyphs in text (use two lines or plain punctuation, and real chevron icons).

## 12. Accessibility and quality floor

- WCAG AA: text contrast ≥ 4.5:1 (the tokens already comply); non-text UI contrast ≥ 3:1; touch targets ≥ 44 px; visible focus on everything interactive.
- Semantic HTML: `header`, `main`, `nav` where relevant, a single `h1` per screen, real `button`s and links.
- Tabs follow the ARIA tab pattern. The sheet traps focus and restores focus to the trigger on close. Toast is polite and non-blocking.
- `prefers-reduced-motion: reduce` disables all transitions.
- Motion budget: toast slide-in (≤180 ms) and sheet slide-up (≤200 ms) only.
- Long strings wrap or clamp; nothing overflows at 360 px width.
- No console errors or warnings in dev or production build.

## 13. Anti-slop rules (this must not look like generated UI)

Do **not** use: gradients, glow, glassmorphism, blur, coloured or stacked soft-grey shadows, emoji, illustrations, stock avatars, purple/blue-violet accents, a uniform grid of identical rounded cards with one radius everywhere, tracked-out all-caps eyebrow labels above headings, middle-dot meta strings, "→" appended to buttons, numbered decorative markers, fake stats, greetings, entrance animations on every section, hover transitions on every card, or a monospace face used as decoration. Hierarchy comes from border weight, surface tone, type size and spacing, as defined above. Before finishing each stage, critique your own screenshots and remove one thing that isn't earning its place.

## 14. Build stages and verify gates

**Stage 0: Scaffold and foundations.**
Create the Vite React TS project (in the workspace root or a `gatepack/` folder, whichever the workspace already implies), install the dependencies from section 5, configure ESLint and `tsc`, add `tokens.css` and `base.css`, fonts, `PhoneFrame` (desktop frame + mobile full-bleed), the router shell, and the `types.ts` / `data.ts` seed.
*Gate:* `npm run typecheck`, `npm run lint`, `npm run build` all pass; the empty shell renders correctly at 393×852 and at desktop 1440×900.

**Stage 1: Five static screens, wireframe-faithful.**
Build all five screens with the seed data and the navigation from section 9 (Back, Return/Back to dashboard, dashboard rows and CTA). No shared state yet beyond the seed.
*Gate:* take screenshots of each screen at 393×852 and compare side by side with the PNGs in `docs/wireframes/`. Fix layout drift. Check 360×740 and long product names (no overflow).

**Stage 2: State and behaviour.**
Reducer + context, route guards, tabs with live counts, History, Active empty state, OTP validity + countdown, confirm sheet with loading state, handover to done, notify → timer → shelved → in-place update and toast, reset link.
*Gate:* run these flows in the browser tool and confirm each:
- **A:** Dashboard → View pickup OTP → OTP screen (4829, QR, countdown) → Complete handover → sheet → "Not yet" closes → Complete → "Confirming…" → Handover complete → Back to dashboard → Active empty state, History shows the new entry at the top.
- **B:** Dashboard → Unboxing row → Pending → Notify on → (≈10 s) in-place update to "Ready. Go to Gate 1, Bin A-2" → View pickup OTP shows 3157 → complete it. Repeat, but leave for the dashboard after turning notify on, and confirm the toast appears and opens the OTP screen.
- **C:** Dashboard → "Arrived at Gate 2 instead" → Mismatch → Back to dashboard.
- **D:** Back buttons and return links land on `/` from every child screen; browser back never shows a stale or wrong state; unknown URLs go to `/`; reload resets the demo.

**Stage 3: Could-haves, polish, accessibility, handoff.**
OTP-expired state and regeneration; simulated network failure; facilitator panel (desktop ≥ 900 px, right of the frame) with: "Reset demo", "Shelve Flipkart parcel now", "Expire current OTP now", a "Simulate network failure" checkbox, and a small read-only readout of the three parcels' current states. Style it plainly and clearly separate from the app (a wireframe-like bordered box titled "Facilitator controls (prototype only)"). `?kiosk=1` resets the demo after 180 s without pointer, touch or key input; `?presenter=0` hides the panel. Then do the accessibility pass (keyboard-only walkthrough of every flow, focus order, reduced motion), write a short `README.md` (run, build, preview, URL params, how to deploy to GitHub Pages: `npm run build`, publish `dist/`), and prepare the deploy config **without deploying**.
*Gate:* keyboard-only run of flows A–C; no console errors; production build verified with `npm run preview`, including with the network disabled (fonts and assets must all be local).

**Stage 4 (optional, DO NOT BUILD unless I say "go stage 4"):** Delegate pickup, from the V2 information architecture (proxy pickup lives inside the active parcel view). A text button "Delegate pickup" on the Active card opens a bottom sheet with three saved contacts (radio list: "Rohan Deshpande-Iyer, Room 214", "Anaya Krishnamurthy, Room 207", "Siddharth Venkataraghavan, Room 301"), the note "They'll use the same OTP and can collect until 6:00 PM.", and buttons "Authorize" / "Cancel". After authorizing, the card shows "Delegated to Rohan D." with a "Revoke" text button.

## 15. Definition of done

- [ ] All five screens match the wireframe layouts (screenshot-compared), with the intentional deviations from section 2 only.
- [ ] Flows A–D pass; every child screen has Back and a return link that goes to `/`.
- [ ] Pending shows a locked OTP and the Do-not-walk-down banner; Mismatch shows the inverted banner and a gate-bound OTP.
- [ ] Every success screen has its counterpart state (loading, empty, expired or error).
- [ ] Zero console errors; `typecheck`, `lint`, `build` clean; works offline after build.
- [ ] Looks calm and intentional: monochrome, no shadows or gradients, one loud element (the OTP).
- [ ] Nothing was built that isn't in this brief.

## 16. Final report format

When finished, reply with: (1) what was built per stage, (2) how to run and build it, (3) URL params, (4) **Assumptions** you made, (5) **Suggestions** you did not build, (6) known limitations. Keep it short.
