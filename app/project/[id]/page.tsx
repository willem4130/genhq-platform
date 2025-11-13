'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { mockProjects } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function ProjectDetailPage() {
  const params = useParams()
  const project = mockProjects.find((p) => p.id === params.id)
  const [isLiked, setIsLiked] = useState(project?.isLiked || false)
  const [isBookmarked, setIsBookmarked] = useState(project?.isBookmarked || false)
  const [comment, setComment] = useState('')

  if (!project) {
    return <div>Project not found</div>
  }

  const relatedProjects = mockProjects.filter((p) => p.id !== project.id).slice(0, 4)

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Additional Images (Mock Gallery) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} detail 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} detail 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Project Description */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-2">
                About this project
              </h2>
              <p className="text-foreground leading-relaxed">
                This project showcases a unique approach to modern creative work, combining
                technical excellence with artistic vision. The composition emphasizes clean lines
                and thoughtful use of space, creating a visual narrative that engages viewers and
                invites deeper exploration.
              </p>
              <p className="text-foreground leading-relaxed">
                Every element has been carefully considered, from the initial concept through to the
                final execution. The result is a cohesive body of work that demonstrates both
                technical proficiency and creative innovation.
              </p>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">{project.comments} Comments</h3>

              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button size="sm">Post Comment</Button>
                </div>
              </div>

              {/* Mock Comments */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted flex-shrink-0">
                      <Image
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&q=80`}
                        alt="Commenter"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">User {i}</span>
                        <span className="text-xs text-muted-foreground">{i}d ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Amazing work! The attention to detail is incredible. Love the composition.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="sticky top-24 space-y-6">
              {/* Title & Actions */}
              <div>
                <h1 className="text-2xl font-bold mb-4">{project.title}</h1>

                {/* Engagement Actions */}
                <div className="flex items-center gap-2 mb-6">
                  <Button
                    variant={isLiked ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex-1"
                  >
                    <Heart className={cn('h-4 w-4 mr-2', isLiked && 'fill-current')} />
                    {project.likes + (isLiked ? 1 : 0)}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                  </Button>

                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-y py-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {project.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {project.comments}
                  </span>
                </div>
              </div>

              {/* Creator Info */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-3">
                  Creator
                </h3>
                <Link
                  href={`/profile/${project.creator.username}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={project.creator.avatar}
                      alt={project.creator.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.creator.name}</p>
                    <p className="text-sm text-muted-foreground">@{project.creator.username}</p>
                  </div>
                </Link>
                <Button className="w-full mt-3">Follow</Button>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Photography', 'Architecture', 'Urban', 'Modern'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More from {project.creator.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} {...relatedProject} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
