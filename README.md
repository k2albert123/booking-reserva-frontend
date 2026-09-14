# BookingReserva Frontend

This is the React frontend for BookingReserva, a local service booking and reservation platform built to help customers discover and book services from nearby businesses while giving business owners a cleaner way to manage appointments, staff, profiles, and availability.

The app is designed for service-based businesses such as barbershops, clinics, hospitals, salons, hotels, and wellness centers. It creates a central digital space where customers can find local services, compare businesses, and schedule appointments easily.

## Purpose of the App

BookingReserva exists to simplify how local businesses connect with the people who need them. Instead of relying on manual calls, scattered messages, or informal scheduling, the platform offers a single, modern experience where:

- customers can discover local service providers
- businesses can present their services and staff
- appointments can be booked online
- users can create profiles and upload images
- business owners can manage availability and customer appointments
- admin users can monitor and manage the platform

## Main Frontend Features

- modern landing page with premium visual styling and motion effects
- business listing and discovery screens
- detailed business pages and service presentation
- registration, login, and role-based access flows
- OTP email verification for new users
- forgot password and password reset screens
- dashboard views for customer, business owner, and admin users
- image upload support for profile pictures and business/staff photos
- appointment scheduling and management flows
- responsive layout for desktop and mobile use

## User Roles

The frontend adapts based on the signed-in user:

- Customer: browse businesses, book appointments, and manage their profile
- Business Owner: create or manage business details, staff, and booking availability
- Admin: manage platform operations and support the system

## Frontend Stack

- React
- React Router
- Material UI
- Axios
- React Toastify
- custom reusable components and styling utilities

## Project Structure

```text
frontend/
├── src/
│   ├── App.js                 # routes and app-level layout
│   ├── components/            # pages and reusable UI blocks
│   ├── services/              # API functions for backend communication
│   ├── features/              # redux slices and state logic
│   ├── store.js               # global app store
│   ├── assets/                # images, fonts, and icons
│   ├── styles/                # styling and design helpers
│   └── utils/                 # utility functions
├── public/                    # static assets and HTML entrypoint
├── package.json               # dependencies and scripts
├── README.md                  # frontend documentation
├── build/                     # production output
└── src/index.js               # app entry point
```

## Important Screens

The frontend includes pages for:

- Landing Page
- Login and Register
- OTP Verification
- Forgot Password and Reset Password
- Business List
- Business Details
- Client Dashboard
- Business Owner Dashboard
- Admin Dashboard
- About and Contact pages
- Profile management

## Running the Frontend

From the `frontend` directory:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Production Build

To build the app for production:

```bash
npm run build
```

## Backend Connection

This frontend communicates with the Spring Boot backend running on:

```text
http://localhost:8090
```

The backend provides data for authentication, businesses, bookings, users, profiles, and uploaded media.

## Development Notes

- make sure the backend is running before testing authenticated features
- verify the CORS configuration if the frontend cannot reach the API
- uploaded images require backend storage to be configured correctly
- role-based pages depend on JWT tokens returned after login

## Design Goals

The UI is designed to feel:

- premium and modern
- responsive across screen sizes
- trustworthy for local businesses
- easy for users to understand and navigate

This matters because the platform is meant to help local service providers present themselves professionally and make booking easier for customers.

## Summary

The frontend is the customer-facing part of BookingReserva. It transforms the backend services into a modern, visually rich booking experience that helps local businesses grow and helps customers book services quickly and confidently.
