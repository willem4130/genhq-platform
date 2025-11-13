# 🗄️ GenHQ Platform - Database Schema

**Last Updated:** November 13, 2025

## 📊 Overview

GenHQ uses **Supabase PostgreSQL** with Row Level Security (RLS) for data access control.

**Key Features:**

- Row Level Security (RLS) on all tables
- Automatic timestamp updates via triggers
- Indexes on frequently queried columns
- Enum types for type safety
- Foreign key constraints for data integrity

---

## 📐 Schema Diagram

```
profiles ──┬─── projects
           ├─── posts
           ├─── comments
           ├─── likes
           ├─── user_skills
           ├─── follows (as follower)
           ├─── follows (as following)
           ├─── jobs (as client)
           ├─── proposals (as designer)
           └─── reviews (as reviewer/reviewee)

skills ─── user_skills

jobs ──┬─── proposals
       └─── reviews

posts ──┬─── comments
        └─── likes
```

---

## 📋 Tables

### 1. **profiles**

Extends Supabase auth.users with additional profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'designer',          -- 'designer' | 'client' | 'admin'
  status user_status DEFAULT 'active',        -- 'active' | 'inactive' | 'suspended'
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  linkedin TEXT,
  twitter TEXT,
  hourly_rate DECIMAL(10, 2),
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**

- `idx_profiles_username` on `username`
- `idx_profiles_role` on `role`
- `idx_profiles_status` on `status`

**RLS Policies:**

- SELECT: Public (everyone can view profiles)
- INSERT: Users can create their own profile
- UPDATE: Users can update only their own profile

---

### 2. **skills**

Predefined skills that designers can associate with.

```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Default Skills Included:**

- AI Image Generation: Midjourney, DALL-E, Stable Diffusion
- AI Text: ChatGPT, Claude
- AI Video: RunwayML, Pika Labs
- AI Audio: ElevenLabs
- AI Skills: Prompt Engineering
- Design: Image Editing, Video Editing, Graphic Design, UI/UX, 3D, Animation
- Software: Photoshop, Illustrator, Figma, Blender, After Effects

**RLS Policies:**

- SELECT: Public (read-only)

---

### 3. **user_skills**

Junction table linking users to their skills.

```sql
CREATE TABLE user_skills (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency INTEGER DEFAULT 1 CHECK (proficiency >= 1 AND proficiency <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id)
);
```

**Proficiency Levels:**

- 1: Beginner
- 2: Intermediate
- 3: Advanced
- 4: Expert
- 5: Master

**RLS Policies:**

- SELECT: Public
- INSERT/UPDATE/DELETE: Users can manage their own skills

---

### 4. **projects**

Portfolio items created by designers.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status project_status DEFAULT 'published',   -- 'published' | 'draft' | 'archived'
  cover_image TEXT,
  images TEXT[] DEFAULT '{}',
  project_url TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**

- `idx_projects_user_id` on `user_id`
- `idx_projects_status` on `status`
- `idx_projects_created_at` on `created_at DESC`

**RLS Policies:**

- SELECT: Published projects visible to all, drafts only to owner
- INSERT: Users can create their own projects
- UPDATE/DELETE: Users can modify only their own projects

---

### 5. **jobs**

Freelance opportunities posted by clients.

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status job_status DEFAULT 'open',            -- 'open' | 'in_progress' | 'completed' | 'cancelled'
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  budget_type budget_type DEFAULT 'negotiable', -- 'hourly' | 'fixed' | 'negotiable'
  required_skills TEXT[] DEFAULT '{}',
  timeline TEXT,
  category TEXT NOT NULL,
  proposals_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

**Indexes:**

- `idx_jobs_client_id` on `client_id`
- `idx_jobs_status` on `status`
- `idx_jobs_category` on `category`
- `idx_jobs_created_at` on `created_at DESC`

**RLS Policies:**

- SELECT: Open jobs visible to all, others only to client
- INSERT: Clients can create jobs
- UPDATE/DELETE: Clients can modify only their own jobs

---

### 6. **proposals**

Job applications submitted by designers.

```sql
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  designer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT NOT NULL,
  proposed_rate DECIMAL(10, 2),
  estimated_duration TEXT,
  status proposal_status DEFAULT 'pending',    -- 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  portfolio_samples TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, designer_id)
);
```

**Indexes:**

- `idx_proposals_job_id` on `job_id`
- `idx_proposals_designer_id` on `designer_id`
- `idx_proposals_status` on `status`

**RLS Policies:**

- SELECT: Visible to job owner and designer
- INSERT: Designers can create proposals
- UPDATE/DELETE: Designers can modify their own proposals

---

### 7. **posts**

Social feed content.

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  hashtags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**

- `idx_posts_user_id` on `user_id`
- `idx_posts_created_at` on `created_at DESC`

**RLS Policies:**

- SELECT: Public
- INSERT: Authenticated users can create posts
- UPDATE/DELETE: Users can modify only their own posts

---

### 8. **comments**

Comments on posts.

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**

- `idx_comments_post_id` on `post_id`

**RLS Policies:**

- SELECT: Public
- INSERT: Authenticated users can comment
- UPDATE/DELETE: Users can modify only their own comments

---

### 9. **likes**

Post likes.

```sql
CREATE TABLE likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);
```

**Indexes:**

- `idx_likes_post_id` on `post_id`

**RLS Policies:**

- SELECT: Public
- INSERT: Users can like posts
- DELETE: Users can unlike posts

---

### 10. **follows**

User following relationships.

```sql
CREATE TABLE follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);
```

**Indexes:**

- `idx_follows_follower_id` on `follower_id`
- `idx_follows_following_id` on `following_id`

**RLS Policies:**

- SELECT: Public
- INSERT: Users can follow others
- DELETE: Users can unfollow

---

### 11. **reviews**

Ratings and reviews after job completion.

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, reviewer_id, reviewee_id)
);
```

**RLS Policies:**

- SELECT: Public
- INSERT: Only job participants can create reviews

---

## 🔄 Triggers

### Auto-update `updated_at` timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Applied to: profiles, projects, jobs, proposals, posts, comments
```

---

## 🚀 Future Enhancements

### Planned Tables

- **messages** - Direct messaging between users
- **notifications** - User notifications
- **resources** - Knowledge base items
- **categories** - Custom client categories for organizing designers
- **favorites** - Client bookmarked designers
- **sessions** - Active user sessions
- **api_keys** - API access tokens

### Planned Indexes

- Full-text search on projects, posts, jobs
- GIN indexes on array columns for better array queries
- Composite indexes for common query patterns

---

## 📝 Migration Files

All schema changes are tracked in `/supabase/migrations/`:

- `20251113142624_initial_schema.sql` - Initial complete schema

**Adding new migrations:**

```bash
supabase migration new feature_name
```

**Applying migrations:**

```bash
supabase db push
```

---

**⚠️ IMPORTANT:** Always create migrations for schema changes. Never modify the database directly in production!
