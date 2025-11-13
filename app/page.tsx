'use client'

import { useState } from 'react'
import { Grid3x3, Users } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { ProjectCard } from '@/components/project-card'
import { CreatorCard } from '@/components/creator-card'
import { mockProjects, mockCreators } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type ViewMode = 'projects' | 'creators'

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('projects')

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* View Toggle + Categories */}
        <div className="mb-8 space-y-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('projects')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                viewMode === 'projects'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              <Grid3x3 className="h-4 w-4" />
              Projects
            </button>
            <button
              onClick={() => setViewMode('creators')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                viewMode === 'creators'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              )}
            >
              <Users className="h-4 w-4" />
              Creators
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              Photography
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              Design
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              Illustration
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              3D Art
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              Fashion
            </button>
            <button className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-medium hover:bg-muted/80 whitespace-nowrap">
              Architecture
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {viewMode === 'projects' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockCreators.map((creator) => (
              <CreatorCard key={creator.username} {...creator} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
            Load More {viewMode === 'projects' ? 'Projects' : 'Creators'}
          </button>
        </div>
      </main>
    </div>
  )
}
