# GatePack

A frontend-only, mobile-first, clickable prototype of **GatePack** built for the live university exhibition (Course STET301, Human-Computer Interaction, Vijaybhoomi University).

## Context & Problem

Couriers (Amazon, Flipkart, Myntra) drop parcels at two campus gates: **Gate 1** (Main Gate / Security Post 1) and **Gate 2** (Hostel Quad / Security Post 2). Hostels are up to a 15-minute uphill walk away in ~34 °C heat. Courier apps mark items "Delivered" while boxes remain sealed in bulk sacks, causing students to walk down prematurely, go to the wrong gate, and search through unsorted boxes.

GatePack fixes three core usability flaws:
1. **H5 Error Prevention**: OTP is locked until the parcel is physically shelved ("Do not walk down" banner, live unboxing progress, "Notify me when shelved").
2. **H1 System Status / H6 Recognition over Recall**: Location mismatch screen alerts students ("At Gate 2, not Gate 1") with walking distance and gate-bound OTPs.
3. **H3 User Control & Freedom**: Reversible navigation on every screen ("Back", "Return to dashboard"), confirmation sheets before handover completion, and OTP state preservation across screen departures.

## Getting Started

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Commands
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run type checks
npm run typecheck

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## URL Parameters

- `?kiosk=1`: Kiosk mode for exhibition displays. Automatically resets the demo after 180 seconds of user inactivity (pointer, touch, or keyboard).
- `?presenter=0`: Hides the facilitator controls panel on desktop viewports (≥900px).
- `?shelveDelay=<seconds>`: Customizes the simulated security unboxing timer for the pending parcel (default: 10 seconds).

## Facilitator Controls (Desktop ≥ 900px)

On wider viewports, a wireframe-styled facilitator panel appears to the right of the phone frame with controls for interactive demonstrations:
- **Reset demo**: Instantly restores seed state.
- **Shelve Flipkart parcel now**: Forces unboxing completion and moves parcel to Gate 1, Bin A-2.
- **Expire current OTP now**: Simulates OTP expiration to demonstrate renewal workflows.
- **Simulate network failure**: Toggles simulated network failure when tapping "Yes, complete handover".
- **State readout**: Real-time read-only status of all parcels.

## Deployment to GitHub Pages

The project uses `HashRouter` and `base: './'` in `vite.config.ts`, making it 100% static and zero-config for GitHub Pages:

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` directory to GitHub Pages (or use the provided GitHub Actions workflow at `.github/workflows/deploy.yml`).
