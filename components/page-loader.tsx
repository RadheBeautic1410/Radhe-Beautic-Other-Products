'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageLoaderProps {
  variant?: 'default' | 'minimal' | 'fullscreen'
  message?: string
  className?: string
}

export function PageLoader({ 
  variant = 'default', 
  message = 'Loading...',
  className 
}: PageLoaderProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (variant === 'fullscreen') {
    return (
      <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm', className)}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-accent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-semibold text-foreground">{message}</p>
          <div className="h-1 w-32 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-accent rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[60vh] py-16 px-4', className)}>
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-accent border-r-accent/50 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-serif font-bold text-foreground">{message}</h3>
          <p className="text-sm text-muted-foreground">Please wait while we load your content</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent via-primary to-accent rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  )
}

// Skeleton Loader for Content Sections
export function ContentSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-xl animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-primary/20 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-primary/10 rounded w-1/2 animate-pulse"></div>
            <div className="h-5 bg-accent/20 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Inline Loading Spinner
export function InlineLoader({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <Loader2 className={cn('animate-spin text-accent', sizeClasses[size], className)} />
  )
}

