# 🎨 GenHQ - Creative AI Designer Marketplace

A modern platform for creative AI designers to showcase portfolios, engage socially, and connect with clients for freelance opportunities.

## Features

- 🎯 **Portfolio Builder** - Showcase your AI-generated work with drag-and-drop ease
- 💼 **Job Marketplace** - Connect designers with clients for freelance projects
- 📱 **Social Feed** - LinkedIn-style engagement with posts, likes, and comments
- 🤝 **Smart Matchmaking** - Algorithm-based job recommendations
- ⭐ **Reviews & Ratings** - Build trust through transparent feedback
- 🔍 **Advanced Search** - Find designers or jobs by skills, budget, and more

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment**: Vercel
- **UI Components**: shadcn/ui, Framer Motion, Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/genhq-platform.git
   cd genhq-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API to get your credentials
   - Copy the SQL from `supabase/schema.sql`
   - Run it in your Supabase SQL Editor

4. **Configure environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
genhq-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   └── (marketing)/       # Public marketing pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── portfolio/        # Portfolio-related components
│   ├── jobs/             # Job marketplace components
│   ├── feed/             # Social feed components
│   └── auth/             # Authentication components
├── lib/                   # Utility functions
│   └── supabase/         # Supabase client configs
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── contexts/             # React context providers
```

## Database Schema

The platform includes:
- **Profiles** - User accounts (designers & clients)
- **Projects** - Portfolio items
- **Jobs** - Freelance opportunities
- **Proposals** - Job applications
- **Posts** - Social feed content
- **Comments, Likes, Follows** - Social interactions
- **Reviews** - Ratings and feedback
- **Skills** - Designer capabilities

See `supabase/schema.sql` for complete schema.

## Development Roadmap

### Phase 1: MVP (Weeks 1-8)
- [x] Project setup
- [ ] User authentication
- [ ] Basic portfolio pages
- [ ] Simple job board
- [ ] Social feed

### Phase 2: Core Features (Weeks 9-12)
- [ ] Advanced portfolio builder
- [ ] Proposal system
- [ ] Messaging
- [ ] Search & filters

### Phase 3: Engagement (Weeks 13-14)
- [ ] Matchmaking algorithm
- [ ] Reviews & ratings
- [ ] Analytics dashboard
- [ ] Mobile optimization

## Contributing

This is a project for the GenHQ Skool community by Rourke Heath. Contributions welcome!

## License

MIT License - see LICENSE file for details

---

Built with ❤️ for the AI creative community
