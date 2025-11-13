# 🏗️ GenHQ Platform - System Architecture

**Last Updated:** November 13, 2025

## 📐 Architecture Overview

GenHQ follows a modern **jamstack architecture** with server-side rendering, edge functions, and real-time capabilities.

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │    Mobile    │  │     PWA      │      │
│  │  (Next.js)   │  │  (Reactive)  │  │   (Future)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  Vercel Edge    │
                   │    Network      │
                   └────────┬────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     APPLICATION LAYER                        │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Next.js  │  │    tRPC    │  │   API      │            │
│  │ App Router │  │  Routers   │  │  Routes    │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │               │               │                     │
│  ┌─────▼───────────────▼───────────────▼──────┐            │
│  │          Middleware Layer                    │            │
│  │  - Rate Limiting (Upstash Redis)            │            │
│  │  - Authentication (Supabase Auth)           │            │
│  │  - Validation (Zod)                         │            │
│  │  - Error Tracking (Future: Sentry)          │            │
│  └──────────────────────────────────────────────┘            │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                       DATA LAYER                             │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Supabase  │  │  Supabase  │  │  Supabase  │            │
│  │ PostgreSQL │  │   Storage  │  │  Realtime  │            │
│  │  (Tables)  │  │  (Files)   │  │ (WebSockets)│            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Core Technologies

### Frontend Stack

#### Next.js 16 (App Router)

- **Server Components:** Default for better performance
- **Client Components:** Only when interactivity needed
- **Streaming:** Progressive rendering
- **Turbopack:** Fast development server
- **Image Optimization:** next/image for all images
- **Font Optimization:** next/font for web fonts

#### React 19

- **Concurrent Features:** Automatic batching, transitions
- **Server Actions:** Form submissions without API routes
- **use() Hook:** Resource loading
- **Suspense:** Declarative loading states

#### TypeScript (Strict Mode)

- Full type safety across frontend and backend
- No `any` types allowed
- Strict null checks
- Path aliases configured (`@/`)

#### Styling Architecture

- **Tailwind CSS v4:** Utility-first styling
- **CSS Variables:** Design tokens in `globals.css`
- **shadcn/ui:** Accessible, customizable components
- **Framer Motion:** Smooth animations
- **Class Variance Authority:** Component variants

### Backend Stack

#### Supabase

**PostgreSQL Database:**

- Row Level Security (RLS) for auth
- Triggers for updated_at timestamps
- Indexes for performance
- Full-text search capabilities
- JSON columns for flexible data

**Authentication:**

- Email/password
- OAuth (Google, GitHub, etc.)
- Magic links
- JWT tokens
- Role-based access control

**Storage:**

- File uploads (images, videos, documents)
- CDN delivery
- Automatic image transformations
- Access control via RLS

**Realtime:**

- WebSocket connections
- Live queries
- Presence (online users)
- Broadcast channels
- Database changes subscriptions

#### tRPC v11

- **End-to-end type safety:** TypeScript from DB to UI
- **No code generation:** Direct TypeScript inference
- **React Query integration:** Automatic caching, refetching
- **Middleware support:** Auth, logging, error handling
- **Batch requests:** Optimize network calls

#### API Layer

- **REST endpoints:** For external integrations
- **Rate limiting:** Upstash Redis-based
- **Validation:** Zod schemas
- **Error handling:** Consistent error responses
- **Authentication:** API keys or Supabase Auth

### Infrastructure

#### Vercel

- **Edge Network:** Global CDN
- **Serverless Functions:** API routes auto-scaled
- **Edge Functions:** Ultra-low latency
- **Analytics:** Privacy-friendly tracking
- **Speed Insights:** Real-user monitoring
- **Automatic HTTPS:** Free SSL certificates

#### Upstash Redis

- **Rate Limiting:** Sliding window algorithm
- **Caching:** Session data, frequently accessed data
- **Global replication:** Low latency worldwide
- **Serverless:** Pay per request

## 🎨 Design Patterns

### Component Architecture

```typescript
// Component structure
components/
├── ui/               // Primitive components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
├── feature/          // Feature-specific components
│   ├── FeatureList.tsx
│   ├── FeatureCard.tsx
│   └── FeatureDetail.tsx
└── layout/           // Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Sidebar.tsx
```

**Principles:**

- **Composition over inheritance**
- **Single responsibility**
- **Props over state when possible**
- **Colocate related code**

### State Management

#### Server State (React Query + tRPC)

```typescript
// Automatic caching, refetching, optimistic updates
const { data: projects } = trpc.projects.list.useQuery()
```

#### Client State (React Hooks)

```typescript
// Local UI state
const [isOpen, setIsOpen] = useState(false)
```

#### Global State (React Context)

```typescript
// Minimal global state (user, theme)
const { user } = useAuth()
```

### Data Flow

```
User Action
    ↓
React Component
    ↓
tRPC Client
    ↓
tRPC Router (Server)
    ↓
Supabase Client
    ↓
PostgreSQL Database
    ↓
Response (Type-safe)
    ↓
React Query Cache
    ↓
UI Update
```

## 🔐 Security Architecture

### Authentication Flow

```
1. User submits credentials
   ↓
2. Supabase Auth validates
   ↓
3. JWT token issued
   ↓
4. Token stored in httpOnly cookie
   ↓
5. Middleware validates on each request
   ↓
6. User object added to context
```

### Authorization Layers

1. **Database Level (RLS):**

   ```sql
   CREATE POLICY "Users can only update own profile"
   ON profiles FOR UPDATE
   USING (auth.uid() = id);
   ```

2. **API Level (Middleware):**

   ```typescript
   export const protectedRoute = withAuth(withRateLimit(handler))
   ```

3. **Component Level (React):**
   ```typescript
   if (!user || user.role !== 'admin') return <Forbidden />
   ```

### Rate Limiting Strategy

- **General endpoints:** 10 req/10s
- **Write operations:** 5 req/10s
- **Auth endpoints:** 3 req/60s
- **By IP address:** Using x-forwarded-for

## 📊 Data Architecture

### Database Design Principles

1. **Normalization:** Avoid data duplication
2. **Indexes:** On foreign keys and frequent queries
3. **Triggers:** Auto-update timestamps
4. **RLS:** Security at DB level
5. **Enums:** Type safety for status fields

### Caching Strategy

**Levels:**

1. **CDN (Vercel Edge):** Static assets
2. **Redis (Upstash):** Session data, rate limits
3. **React Query:** API responses
4. **Browser:** Service worker (future PWA)

**Cache Invalidation:**

- Mutations trigger automatic refetch
- Time-based expiry
- Manual invalidation for critical updates

## 🚀 Performance Optimization

### Frontend

- Code splitting (automatic with Next.js)
- Image optimization (next/image)
- Font optimization (next/font)
- Lazy loading components
- Prefetching links
- Bundle analysis

### Backend

- Database indexes on frequent queries
- Connection pooling (Supabase Pooler)
- Batch queries where possible
- Pagination for large datasets
- Optimistic updates

### Network

- HTTP/2 multiplexing
- Brotli compression
- Edge caching
- WebP/AVIF images
- Lazy loading off-screen content

## 🧪 Testing Strategy

### Unit Tests (Vitest)

- Pure functions
- React hooks
- Utility functions
- Component logic

### Integration Tests (Vitest + Testing Library)

- Component interactions
- Form submissions
- API calls (mocked)

### E2E Tests (Playwright)

- User flows
- Critical paths
- Cross-browser
- Mobile viewports

## 🔄 Deployment Pipeline

```
Git Push
    ↓
GitHub Actions (future)
    ↓
Vercel Build
    ↓
Tests Run
    ↓
Type Check
    ↓
Lint & Format
    ↓
Build Next.js
    ↓
Deploy to Edge
    ↓
Run Supabase Migrations
    ↓
Invalidate Cache
    ↓
Production Live
```

## 📁 File Organization Conventions

### Import Order

1. React/Next imports
2. Third-party libraries
3. Internal absolute imports (`@/`)
4. Relative imports
5. Type imports

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (`useAuth.ts`)
- **Utils:** camelCase (`formatDate.ts`)
- **Types:** PascalCase (`UserProfile` type)
- **Constants:** UPPER_SNAKE_CASE

### Folder Structure

- Group by feature, not by type
- Keep related files together
- Max 2-3 levels deep

## 🔗 External Integrations

### Current

- Supabase (Database, Auth, Storage, Realtime)
- Vercel (Hosting, Analytics)
- Upstash (Redis for rate limiting)

### Planned

- Sentry (Error tracking - when Next.js 16 supported)
- SendGrid/Resend (Transactional emails)
- Stripe (Future: Payments for premium features)

---

**Note:** This architecture is designed to scale from MVP to millions of users while maintaining developer productivity and code quality.
