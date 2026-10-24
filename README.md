# Next.js Auth boilerplate

A Next.js 14 (App Router) starter with TypeScript, Tailwind CSS and NextAuth credentials login.

## What's included

- Credentials sign-in through NextAuth, backed by an external API (defaults to [DummyJSON](https://dummyjson.com/docs/auth)).
- JWT sessions with access and refresh tokens, plus a token-refresh path in the `jwt` callback.
- Route protection via `src/middleware.tsx` and a custom `/login` page.
- Axios service layer in `src/services`.
- ESLint, Prettier and Husky pre-commit hooks.

## Prerequisites

- Node.js 18+ and npm

## Getting started

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/FaranMustafa/next-auth-ts-boilerplate.git
   cd next-auth-ts-boilerplate
   npm install
   ```

2. Create your environment file from the example:

   ```bash
   cp .env.example .env
   ```

3. Generate your own secret and paste it into `NEXTAUTH_SECRET` in `.env`:

   ```bash
   openssl rand -base64 32
   ```

   See the [NextAuth secret docs](https://next-auth.js.org/configuration/options#nextauth_secret). Never commit `.env`; it is listed in `.gitignore`.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 and sign in with one of the DummyJSON test users from their [auth docs](https://dummyjson.com/docs/auth).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (runs format and lint first) |
| `npm run lint` | ESLint |
| `npm run check-types` | TypeScript type check |
