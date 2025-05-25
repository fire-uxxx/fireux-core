# misebox-app

## Overview

Misebox is a Nuxt 3 app powered by FireUX.

## Prerequisites

See [../../README/Prerequisites.txt](../../README/Prerequisites.txt) for full system and service requirements.

## Setup

1. Clone the repo:
   ```sh
   git clone https://github.com/fire-uxxx/misebox-app.git
   cd misebox-app
   ```
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
3. Configure environment:
   - Create a `.env` file with your Firebase and Stripe keys (see Prerequisites).
   - Place your Firebase service account in `/config/service-account.json` if needed.
4. Run the app:
   ```sh
   yarn dev
   # or
   npm run dev
   ```

## More Info

- [Copilot/AI prompts](copilot/README-app.md)
- [Full prerequisites](../../README/Prerequisites.txt)
