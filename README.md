# Movie Search App (React + TypeScript) — OMDb API

**Summary:** Production-ready movie search app using the OMDb API. Debounced search, request cancellation, rate-limit handling, lazy-loaded details, accessible & responsive UI.

## Live demo & repository
> I can’t create the repo or deploy from here. Follow the “Deploy” steps to publish it on GitHub & Vercel — once deployed, include those links in your application email (sample below).

## Features
- Debounced search (350ms).
- AbortController request cancellation.
- Handles 429 rate-limit errors with retry.
- Lazy-load routes and images.
- Tailwind CSS mobile-first responsive layout.
- TypeScript types for OMDb responses.
- Jest + React Testing Library tests with msw mocks.
- GitHub Actions CI: lint + tests on push.

## Setup (local)
1. Clone or create the repo and add the project files.
2. Install:
```bash
npm install
