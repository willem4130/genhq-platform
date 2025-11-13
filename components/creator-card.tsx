'use client'

import { UserPlus, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CreatorCardProps {
  username: string
  name: string
  avatar: string
  bio: string
  followers: number
  projectCount: number
  totalLikes: number
  recentProjects: {
    id: string
    imageUrl: string
  }[]
  isFollowing?: boolean
  className?: string
}

export function CreatorCard({
  username,
  name,
  avatar,
  bio,
  followers,
  projectCount,
  totalLikes,
  recentProjects,
  isFollowing: initialIsFollowing = false,
  className,
}: CreatorCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  return (
    <div className={cn('group relative', className)}>
      <Link href={`/profile/${username}`} className="block">
        {/* Recent Projects Grid */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
          <div className="grid grid-cols-2 gap-1 h-full">
            {recentProjects.slice(0, 4).map((project) => (
              <div key={project.id} className="relative overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium">View Profile</span>
          </div>
        </div>
      </Link>

      {/* Creator Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Link href={`/profile/${username}`}>
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted ring-2 ring-background">
              <Image src={avatar} alt={name} fill className="object-cover" />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link href={`/profile/${username}`}>
              <h3 className="font-semibold text-foreground hover:underline truncate">{name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            <strong className="text-foreground">{followers}</strong> followers
          </span>
          <span>
            <strong className="text-foreground">{projectCount}</strong> projects
          </span>
          <span>
            <strong className="text-foreground">{totalLikes}</strong> likes
          </span>
        </div>

        {/* Follow Button */}
        <Button
          variant={isFollowing ? 'outline' : 'default'}
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.preventDefault()
            setIsFollowing(!isFollowing)
          }}
        >
          {isFollowing ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
