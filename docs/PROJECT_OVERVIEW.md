# 🎨 GenHQ Platform - Project Overview

**Last Updated:** November 13, 2025

## 📋 Vision

GenHQ is the **ultimate platform for creative AI image and video designers** to:

- Showcase stunning portfolios with rich media embeds
- Engage socially through posts, comments, and interactions
- Connect with business clients who can discover and hire them
- Share knowledge through public templates and workflows
- Build their reputation in the AI creative community

## 🎯 Core Features

### 1. **Portfolio Showcase** 🎨

- Multi-image and video project uploads
- Rich video embeds (YouTube, Vimeo, Loom)
- Project categories and tags
- Featured projects
- Lightbox gallery views
- AI tools used tracking

### 2. **Social Engagement** 💬

- Create posts with text, images, videos
- Comment system (threaded/nested)
- Likes, reactions, and shares
- Follow/unfollow users
- Hashtags and @mentions
- Multiple feed types (following, discover, trending)

### 3. **Client-Designer Connections** 🤝

- Custom category management (CRUD) for clients
- Advanced designer search and filtering
- Favorite/bookmark designers
- Inquiry and contact forms
- Proposal system
- Client can organize designers by custom categories (e.g., "3D Artists", "Midjourney Experts")

###4. **Rich Profile Integration** 👤

- Professional avatars and cover images
- Comprehensive bio sections
- **Social links integration:**
  - Instagram, Twitter/X, LinkedIn
  - YouTube, TikTok, Behance, Dribbble
  - Personal website
- Skills and expertise showcase
- Hourly rates and availability
- Years of experience
- Favorite AI tools

### 5. **Job Marketplace** 💼

- Clients post freelance opportunities
- Designers browse and apply
- Proposal management
- Budget tracking (hourly/fixed/negotiable)
- Timeline management

### 6. **Knowledge Base** 📚

- Public workflow templates library
- File sharing (PSDs, prompts, configs)
- Download and usage tracking
- Categories and search
- Community ratings and comments

### 7. **Messaging System** 💌

- Real-time direct messaging (Supabase Realtime)
- File sharing in messages
- Read receipts
- Typing indicators

### 8. **Admin Dashboard** ⚙️

- Platform management
- User moderation
- Content management
- Analytics and insights

## 🏗️ Technical Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend & Data

- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **API:** tRPC v11 (type-safe APIs)
- **Validation:** Zod

### Infrastructure & DevOps

- **Deployment:** Vercel
- **Analytics:** Vercel Analytics + Speed Insights
- **Error Tracking:** Sentry (when Next.js 16 support added)
- **Rate Limiting:** Upstash Redis
- **CDN:** Vercel Edge Network

### Developer Experience

- **Testing:** Vitest (unit) + Playwright (E2E)
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged
- **Environment:** Type-safe env vars (@t3-oss/env-nextjs)
- **Turbopack:** Fast dev server

## 📁 Project Structure

```
genhq-platform/
├── docs/                    # 📚 Complete project documentation (THIS IS THE SOURCE OF TRUTH!)
│   ├── PROJECT_OVERVIEW.md  # Vision, features, tech stack
│   ├── ARCHITECTURE.md      # System design, patterns
│   ├── DATABASE_SCHEMA.md   # Complete schema docs
│   ├── FEATURES.md          # Detailed feature specs
│   ├── DESIGN_SYSTEM.md     # Colors, typography, components
│   ├── PROGRESS.md          # What's done, what's next
│   ├── API_DOCS.md          # API reference
│   └── SETUP.md             # Dev setup instructions
├── app/                     # Next.js App Router
│   ├── (auth)/             # Protected routes
│   ├── (public)/           # Public routes
│   ├── admin/              # Admin dashboard
│   └── api/                # API routes
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── portfolio/          # Portfolio components
│   ├── feed/               # Social feed components
│   ├── jobs/               # Job marketplace components
│   ├── knowledge/          # Knowledge base components
│   └── auth/               # Authentication components
├── lib/                     # Utilities & middleware
│   ├── supabase/           # Supabase clients
│   ├── rate-limit.ts       # Rate limiting
│   ├── api-middleware.ts   # API helpers
│   ├── env.ts              # Environment validation
│   └── utils.ts            # General utilities
├── hooks/                   # Custom React hooks
├── contexts/                # React context providers
├── types/                   # TypeScript definitions
├── supabase/                # Supabase config & migrations
│   └── migrations/         # Database migrations
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   └── e2e/                # E2E tests
└── public/                  # Static assets
```

## 🎨 Design Principles

1. **Modern & Beautiful:** Glassmorphism, smooth gradients, professional UI
2. **Interactive:** Hover effects, smooth transitions, micro-interactions
3. **Rich Media First:** Excellent video/image embed support with proper aspect ratios
4. **Performance:** Fast loading, optimized images, lazy loading
5. **Responsive:** Mobile-first approach, works beautifully on all devices
6. **Accessible:** WCAG compliant, keyboard navigation, screen reader support

## 🚀 Development Phases

### ✅ Phase 0: Foundation (COMPLETED)

- [x] Project setup
- [x] World-class architecture integration
- [x] Environment validation
- [x] Rate limiting infrastructure
- [x] API middleware
- [x] Testing setup (Vitest + Playwright)
- [x] Code quality tools (Husky + Prettier)
- [x] Comprehensive documentation

### 🔄 Phase 1: Core Infrastructure (IN PROGRESS)

- [ ] tRPC setup for type-safe APIs
- [ ] Vercel Analytics integration
- [ ] Create test directories structure
- [ ] Update .env.example with all vars

### 📋 Phase 2: Authentication & Profiles

- [ ] Supabase Auth setup
- [ ] Login/Signup flows
- [ ] Role-based access (Designer vs Client)
- [ ] Onboarding wizard
- [ ] Rich profile pages
- [ ] Social links integration
- [ ] Profile edit functionality

### 📋 Phase 3: Portfolio System

- [ ] Project CRUD operations
- [ ] Multi-image upload
- [ ] Video embed components
- [ ] Portfolio gallery layouts
- [ ] Project detail pages
- [ ] Lightbox functionality

### 📋 Phase 4: Social Feed

- [ ] Post creation and display
- [ ] Comment system
- [ ] Likes and reactions
- [ ] Follow system
- [ ] Feed algorithms
- [ ] Hashtags and mentions

### 📋 Phase 5: Client Connections

- [ ] Designer search and discovery
- [ ] Custom category management
- [ ] Favorite/bookmark system
- [ ] Contact and inquiry forms
- [ ] Proposal system

### 📋 Phase 6: Job Marketplace

- [ ] Job posting (clients)
- [ ] Job browsing (designers)
- [ ] Proposal submission
- [ ] Job management

### 📋 Phase 7: Knowledge Base

- [ ] Resource library
- [ ] File upload and sharing
- [ ] Search and filtering
- [ ] Downloads tracking

### 📋 Phase 8: Messaging

- [ ] Real-time chat
- [ ] Message inbox
- [ ] File sharing
- [ ] Notifications

### 📋 Phase 9: Admin Dashboard

- [ ] User management
- [ ] Content moderation
- [ ] Analytics

### 📋 Phase 10: Polish & Launch

- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Production deployment

## 🎯 Success Metrics

- Designer portfolio completion rate
- Client engagement rate
- Job posting to hire rate
- Platform retention (monthly active users)
- Average session duration
- Knowledge base resource downloads

## 📞 Key Contacts

- **Project Owner:** Willem van den Berg
- **Community:** GenHQ Skool Community by Rourke Heath

---

**⚠️ IMPORTANT:** This `/docs` directory is the **single source of truth** for the project. Always reference and update these docs when making changes, especially after chat clears!
