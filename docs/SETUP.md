# 🚀 GenHQ Platform - Development Setup Guide

**Last Updated:** November 13, 2025

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Git** for version control
- **A code editor** (VS Code recommended)
- **Supabase account** (free tier available)
- **Vercel account** (optional, for deployment)

---

## 📦 Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/genhq-platform.git
cd genhq-platform
```

### 2. Install Dependencies

```bash
npm install
```

This will install all production and development dependencies, including:

- Next.js 16, React 19, TypeScript
- tRPC, React Query, Zod
- Supabase client libraries
- Testing tools (Vitest, Playwright)
- Code quality tools (ESLint, Prettier, Husky)

---

## 🔧 Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your credentials:

```env
# Required: Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 3. Set Up Database Schema

Run the initial migration:

```bash
# If using Supabase CLI (recommended)
npx supabase db push

# Or manually:
# 1. Go to Supabase SQL Editor
# 2. Copy contents of supabase/migrations/20251113142624_initial_schema.sql
# 3. Execute the SQL
```

### 4. Optional: Configure Rate Limiting

Sign up for free at [upstash.com](https://upstash.com) (10,000 requests/day):

```env
# Optional: Upstash Redis for rate limiting
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

**Note:** If not configured, rate limiting will be disabled but the app will still work.

### 5. Optional: API Secret Key

Generate a secure API key for protected routes:

```bash
openssl rand -base64 32
```

Add to `.env.local`:

```env
# Optional: API authentication
API_SECRET_KEY="your-generated-secret-key"
```

**Note:** If not set, API routes will be unprotected (development mode).

---

## 🗄️ Database Setup

### Option 1: Supabase CLI (Recommended)

```bash
# Link to your project
npx supabase link --project-ref your-project-ref

# Push migrations
npx supabase db push

# Open Prisma Studio
npm run db:studio
```

### Option 2: Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Open SQL Editor
3. Run the migration file: `supabase/migrations/20251113142624_initial_schema.sql`

### Verify Setup

Check that all tables are created:

- profiles
- skills
- user_skills
- projects
- jobs
- proposals
- posts
- comments
- likes
- follows
- reviews

---

## 🏃 Running the Development Server

### Start Dev Server

```bash
npm run dev
```

This will:

- Start Next.js on `http://localhost:3000`
- Enable Turbopack for fast refreshes
- Watch for file changes
- Provide detailed error messages

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
npm run typecheck    # Run TypeScript type checking

# Testing
npm run test         # Run Vitest unit tests
npm run test:ui      # Open Vitest UI
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Open Playwright UI
```

---

## 🧪 Testing Setup

### Unit Tests (Vitest)

Tests are located in `tests/unit/` or colocated with components (`.test.tsx`).

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Open UI
npm run test:ui
```

### E2E Tests (Playwright)

Tests are located in `tests/e2e/`.

```bash
# Run E2E tests
npm run test:e2e

# Open Playwright UI
npm run test:e2e:ui

# Install browsers (first time only)
npx playwright install
```

---

## 📝 Git Workflow

### Pre-commit Hooks (Husky)

Automatically configured to run before each commit:

1. ESLint fixes
2. Prettier formatting
3. Type checking

### Committing Changes

```bash
git add .
git commit -m "feat: add user authentication"
```

Husky will automatically:

- Lint changed files
- Format code
- Prevent commits with errors

---

## 🔗 External Services Setup

### Vercel Analytics (Optional)

Already integrated! Just deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Analytics will automatically activate.

### Upstash Redis (Optional)

1. Sign up at [upstash.com](https://upstash.com)
2. Create a Redis database
3. Copy REST URL and token to `.env.local`

### Sentry (Future)

Will be added when Next.js 16 support is available.

---

## 📁 Project Structure

```
genhq-platform/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Protected routes
│   ├── (public)/           # Public routes
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Feature components
├── lib/                     # Utilities
│   ├── supabase/           # Supabase clients
│   ├── api-middleware.ts   # API helpers
│   ├── rate-limit.ts       # Rate limiting
│   ├── env.ts              # Env validation
│   └── utils.ts            # General utilities
├── hooks/                   # Custom React hooks
├── contexts/                # React context providers
├── types/                   # TypeScript definitions
├── supabase/                # Supabase config
│   └── migrations/         # Database migrations
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   └── e2e/                # E2E tests
├── docs/                    # Documentation (YOU ARE HERE!)
└── public/                  # Static assets
```

---

## 🛠️ IDE Setup (VS Code)

### Recommended Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "ms-playwright.playwright"
  ]
}
```

### Workspace Settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Regenerate types
npm run typecheck
```

### Supabase Connection Issues

1. Check `.env.local` credentials
2. Verify Supabase project is running
3. Check network connection
4. Verify API keys are correct

### Build Errors

```bash
# Type check first
npm run typecheck

# Lint and fix
npm run lint -- --fix

# Format code
npm run format
```

---

## 📚 Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [tRPC Docs](https://trpc.io)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Community

- GenHQ Skool Community
- [Next.js Discord](https://nextjs.org/discord)
- [Supabase Discord](https://discord.supabase.com)

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts server on port 3000
- [ ] Homepage loads at `http://localhost:3000`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] No linting errors: `npm run lint`
- [ ] Code formats correctly: `npm run format`
- [ ] Unit tests run: `npm run test`
- [ ] Supabase connection works (check database in Supabase dashboard)
- [ ] Environment variables are set in `.env.local`

---

**🎉 You're all set! Happy coding!**

For questions or issues, refer to `/docs/` or contact the team.
