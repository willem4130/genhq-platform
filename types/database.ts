export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'designer' | 'client' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type JobStatus = 'open' | 'in_progress' | 'completed' | 'cancelled'
export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn'
export type ProjectStatus = 'published' | 'draft' | 'archived'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: UserRole
          status: UserStatus
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          linkedin: string | null
          twitter: string | null
          hourly_rate: number | null
          availability: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: UserRole
          status?: UserStatus
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          linkedin?: string | null
          twitter?: string | null
          hourly_rate?: number | null
          availability?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          status?: UserStatus
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          linkedin?: string | null
          twitter?: string | null
          hourly_rate?: number | null
          availability?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          created_at?: string
        }
      }
      user_skills: {
        Row: {
          user_id: string
          skill_id: string
          proficiency: number
          created_at: string
        }
        Insert: {
          user_id: string
          skill_id: string
          proficiency?: number
          created_at?: string
        }
        Update: {
          user_id?: string
          skill_id?: string
          proficiency?: number
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: ProjectStatus
          cover_image: string | null
          images: string[]
          project_url: string | null
          tags: string[]
          likes_count: number
          views_count: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: ProjectStatus
          cover_image?: string | null
          images?: string[]
          project_url?: string | null
          tags?: string[]
          likes_count?: number
          views_count?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: ProjectStatus
          cover_image?: string | null
          images?: string[]
          project_url?: string | null
          tags?: string[]
          likes_count?: number
          views_count?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          status: JobStatus
          budget_min: number | null
          budget_max: number | null
          budget_type: 'hourly' | 'fixed' | 'negotiable'
          required_skills: string[]
          timeline: string | null
          category: string
          proposals_count: number
          views_count: number
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          status?: JobStatus
          budget_min?: number | null
          budget_max?: number | null
          budget_type?: 'hourly' | 'fixed' | 'negotiable'
          required_skills?: string[]
          timeline?: string | null
          category: string
          proposals_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          title?: string
          description?: string
          status?: JobStatus
          budget_min?: number | null
          budget_max?: number | null
          budget_type?: 'hourly' | 'fixed' | 'negotiable'
          required_skills?: string[]
          timeline?: string | null
          category?: string
          proposals_count?: number
          views_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      proposals: {
        Row: {
          id: string
          job_id: string
          designer_id: string
          cover_letter: string
          proposed_rate: number | null
          estimated_duration: string | null
          status: ProposalStatus
          portfolio_samples: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          designer_id: string
          cover_letter: string
          proposed_rate?: number | null
          estimated_duration?: string | null
          status?: ProposalStatus
          portfolio_samples?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          designer_id?: string
          cover_letter?: string
          proposed_rate?: number | null
          estimated_duration?: string | null
          status?: ProposalStatus
          portfolio_samples?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          images: string[]
          likes_count: number
          comments_count: number
          shares_count: number
          hashtags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          images?: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          hashtags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          images?: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          hashtags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          job_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
  }
}
