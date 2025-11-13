'use client'

import { Heart, Bookmark, MessageCircle, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  id: string
  title: string
  imageUrl: string
  creator: {
    name: string
    avatar: string
    username: string
  }
  likes: number
  views: number
  comments: number
  isLiked?: boolean
  isBookmarked?: boolean
  className?: string
}

export function ProjectCard({
  id,
  title,
  imageUrl,
  creator,
  likes,
  views,
  comments,
  isLiked = false,
  isBookmarked = false,
  className,
}: ProjectCardProps) {
  return (
    <div className={cn('group relative', className)}>
      <Link href={`/project/${id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Quick Actions on Hover */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {views}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {comments}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  // Handle like
                }}
              >
                <Heart className={cn('h-4 w-4', isLiked && 'fill-red-500 text-red-500')} />
              </Button>

              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  // Handle bookmark
                }}
              >
                <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Project Info */}
      <div className="mt-3 space-y-2">
        <Link href={`/project/${id}`}>
          <h3 className="font-medium text-foreground line-clamp-1 hover:underline">{title}</h3>
        </Link>

        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${creator.username}`}
            className="flex items-center gap-2 group/creator"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
              <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
            </div>
            <span className="text-sm text-muted-foreground group-hover/creator:text-foreground transition-colors">
              {creator.name}
            </span>
          </Link>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="h-3.5 w-3.5" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  )
}
