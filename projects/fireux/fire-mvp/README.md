Here is the FIReMVP README, optimized for setup and Firebase configuration:

⸻

📄 FIReMVP README

⸻

# FIReMVP - Firebase & Stripe Starter Kit 🚀

**FIReMVP** is a Nuxt 3 starter template integrating **Firebase** for authentication & data storage and **Stripe** for payments.

## Overview

FIReMVP is a Nuxt 3 starter template integrating Firebase for authentication & data storage and Stripe for payments.

## Prerequisites

See [../../README/Prerequisites.txt](../../README/Prerequisites.txt) for full system and service requirements.

## Setup

1. Clone the repo:
   ```sh
   git clone https://github.com/fire-uxxx/fire-mvp.git
   cd fire-mvp
   ```
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
3. Configure environment:
   - Create a `.env` file with your Firebase and Stripe keys (see Prerequisites).
   - Place your Firebase service account in `/config/service-account.json`.
4. Run the app:
   ```sh
   yarn dev
   # or
   npm run dev
   ```

## Environment Variables Setup

To run this app, you must create a `.env` file in the project root. Use the template below and fill in the required values:

```env
GOOGLE_APPLICATION_CREDENTIALS=./config/service-account.json
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
FIREBASE_MEASUREMENT_ID=...
DOMAIN=http://localhost:3001
STRIPE_PUBLISHABLE_KEY=...
PIN=1234
TENANT_ID=fire-mvp
APP_NAME=Fire MVP
APP_SHORT_NAME=FireMVP
APP_THEME_COLOR=#2563eb
APP_BACKGROUND_COLOR=#ffffff
APP_ICON=/icon-192x192.png
AUTHOR_NAME=Daniel Watson (FireUX)
PROJECT_NAME=Fire MVP
OPENAI_API_KEY_NAME=...
OPENAI_API_KEY=...
NODE_ENV=development
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
GITHUB_TOKEN=...
```

### How to obtain each value

- **Firebase variables**: Get these from your Firebase project dashboard under Project Settings > General and Service Accounts.
- **DOMAIN**: Always set to `http://localhost:3001` for local development.
- **Stripe variables**: Get your publishable key, secret key, and webhook secret from the Stripe dashboard (Developers > API keys and Webhooks).
- **PIN**: Default is `1234` for all apps.
- **TENANT_ID**: Use the app's name in kebab-case (e.g., `fire-mvp`).
- **APP_NAME**: The full display name of your app (e.g., `Fire MVP`).
- **APP_SHORT_NAME**: A short version of your app name (e.g., `FireMVP`).
- **APP_THEME_COLOR, APP_BACKGROUND_COLOR, APP_ICON**: Customize as needed for your app's branding.
- **AUTHOR_NAME**: Your name or your team's name.
- **PROJECT_NAME**: The app's name in normal case (e.g., `Fire MVP`).
- **OpenAI and GitHub variables**: Get your API keys from the respective dashboards.
- **NODE_ENV**: Always set to `development` for local development.

- See `.env` in this repo for a full example.

## More Info

- [Copilot/AI prompts](copilot/README-app.md)
- [Full prerequisites](../../README/Prerequisites.txt)

⸻

🔥 FIReMVP is the foundation for all FIReUX applications.
👉 Visit FIReUX for details.

This version is **focused, simple, and ensures a smooth setup**. Let me know if you need modifications! 🚀
