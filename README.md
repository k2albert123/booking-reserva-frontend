# BookingReserva Frontend

React frontend for BookingReserva — a verified local service booking platform for barbershops, salons, clinics, spas, hotels, and more.

---

## Features

- Landing page with sticky navbar, animated background, two-column hero (text left, image right, CTAs centred below)
- Light / dark theme toggle and a simplified colour palette (blue `#2563eb`, emerald `#10b981`, amber `#f59e0b`)
- Custom app logo (`public/app-logo.png`) in navbar, footer, hero, login, and register
- Registration with role cards and required proof upload (ID for clients, business registration for owners)
- OTP email verification, forgot password, and reset password
- Verification lock screens for pending / rejected accounts
- Business list, business details, and service list
- Business details tabs: Services · Staff · Opening Hours · **Location & Proof Map** · **Customer Reviews**
- Slot-based booking form
- Reviews: "Rate & Review Service" for completed bookings, star breakdown, verified badges
- Google Maps embed with **Get Directions** and **Copy Address**
- Role-based dashboards for client, business owner, and admin

---

## Routes

| Path | Page |
| :--- | :--- |
| `/` | Landing page |
| `/login`, `/register` | Auth |
| `/verify-otp` | OTP verification |
| `/forgot-password`, `/reset-password` | Password recovery |
| `/about`, `/contact` | Info pages |
| `/businesses`, `/businesses/:id` | Business list / details |
| `/services` | Service list |
| `/book/:businessId/:serviceId` | Booking form (protected) |
| `/dashboard?view=...` | Role-based dashboard (protected) |

### Dashboard views

| Role | `view=` values |
| :--- | :--- |
| Client | `overview`, `appointments`, `businesses`, `profile` |
| Business Owner | `overview`, `businesses`, `location`, `appointments`, `reviews`, `services`, `staff`, `profile` |
| Admin | tabs: Overview, User Management, Business Registry, Bookings & Schedule, System Controls |

---

## Dashboards

### Client
- Upcoming and past bookings with status filters
- **Rate & Review Service** button on `COMPLETED` bookings → `WriteReviewModal`; shows "Review Submitted ★" afterwards
- Booking is locked until ID is approved

### Business Owner
- Business cards with **Edit & Location** and full create/edit dialog (general info, address, GPS, proof photos)
- **Location & Photos** page: storefront, interior, cover, and proof-document uploads; address and lat/lng fields; **Detect My GPS Coordinates**; live Google Map preview; Save
- Bookings: confirm, mark completed, decline
- Customer Reviews view, Services, Staff, Profile
- Locked until business proof is approved

### Admin
- KPIs and platform overview
- User management: create, edit, delete, change role, approve / reject proofs (with zoom view and rejection reason)
- Business registry: create, edit (incl. city/state/postal code/lat/lng/photo URLs), suspend, delete
  - **Map icon** → location inspector: storefront & interior photos (zoom lightbox), proof document, address, GPS, embedded map, suspend/activate
  - **Star icon** → reviews inspector: average rating, all reviews, delete (moderate) with confirmation
  - "Photos Verified" and "GPS Pinned" badges in the table
- Bookings management and system controls (broadcast banner, maintenance mode)

---

## Project Structure

```text
frontend/
├── public/
│   ├── index.html
│   └── app-logo.png
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── LandingPage.js
│   │   ├── animated/      # AuroraBackground, AnimatedGridBackground, AnimatedGradientText, SpotlightCard, ThemeToggle
│   │   ├── appointments/  # BookingForm
│   │   ├── auth/          # Login, Register, VerifyOtp, ForgotPassword, ResetPassword
│   │   ├── business/      # BusinessList, BusinessCard, BusinessDetails, LocationProofGallery
│   │   ├── common/        # Navbar, Footer, Layout, RoleGuard, ImageUpload, ReusableCard, GoogleMapLocation
│   │   ├── dashboard/     # ClientDashboard, BusinessOwnerDashboard, AdminDashboard, ProfileView
│   │   ├── reviews/       # WriteReviewModal, ReviewsList
│   │   └── services/      # ServiceList
│   ├── context/           # ThemeContext
│   ├── services/          # adminService, appointmentService, authService, businessService,
│   │                      # reviewService, serviceService, staffService, userService
│   └── utils/api.js       # Axios instance with JWT
├── .env
└── package.json
```

---

## Setup

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production build
```

The backend must be running on `http://localhost:8090`.

### Environment (`.env`)

```env
HOST=localhost
DANGEROUSLY_DISABLE_HOST_CHECK=true
WDS_SOCKET_PORT=0

# Google Maps — enable "Maps Embed API" and "Maps JavaScript API"
REACT_APP_GOOGLE_MAPS_API_KEY=
```

Restart `npm start` after editing `.env`. Without a key, maps use a keyless fallback embed.

---

## Development Notes

- Role-based pages rely on the JWT and the `user` object (incl. `verificationStatus`) stored in `localStorage` after login.
- Dashboards fall back to sample data when the backend returns nothing, so the UI is demoable offline.
- Uploaded images are served by the backend `/api/v1/files/download/...` endpoint.
- If API calls fail with CORS errors, check the backend `spring.web.cors.allowed-origins`.
