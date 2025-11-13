'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Grid3x3,
  Heart,
  Bookmark,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { mockCreators, mockProjects } from '@/lib/mock-data'

export default function ProfilePage() {
  const params = useParams()
  const creator = mockCreators.find((c) => c.username === params.username)
  const [isFollowing, setIsFollowing] = useState(creator?.isFollowing || false)

  if (!creator) {
    return <div>Profile not found</div>
  }

  // Get creator's projects
  const creatorProjects = mockProjects.filter((p) => p.creator.username === creator.username)

  // Mock liked projects (for demo)
  const likedProjects = mockProjects.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted ring-4 ring-background shadow-lg">
              <Image
                src={creator.avatar}
                alt={creator.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{creator.name}</h1>
                <p className="text-muted-foreground">@{creator.username}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <span>
                  <strong className="text-foreground font-semibold">{creator.projectCount}</strong>{' '}
                  <span className="text-muted-foreground">projects</span>
                </span>
                <span>
                  <strong className="text-foreground font-semibold">
                    {creator.followers.toLocaleString()}
                  </strong>{' '}
                  <span className="text-muted-foreground">followers</span>
                </span>
                <span>
                  <strong className="text-foreground font-semibold">2.4k</strong>{' '}
                  <span className="text-muted-foreground">following</span>
                </span>
                <span>
                  <strong className="text-foreground font-semibold">
                    {creator.totalLikes.toLocaleString()}
                  </strong>{' '}
                  <span className="text-muted-foreground">likes</span>
                </span>
              </div>

              {/* Bio */}
              <p className="text-foreground leading-relaxed max-w-2xl">{creator.bio}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="hover:text-foreground transition-colors">
                    portfolio-website.com
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined March 2023
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="min-w-[120px]"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline">Message</Button>
                <Button variant="outline" size="icon">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="projects"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              <Grid3x3 className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              <Heart className="h-4 w-4 mr-2" />
              Liked
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-8">
            {creatorProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {creatorProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Grid3x3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No projects yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedProjects.slice(0, 4).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
