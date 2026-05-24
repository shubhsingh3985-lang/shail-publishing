'use client'
// components/ui/Skeleton.jsx

import { cn } from '@/lib/utils/cn'

/** Base shimmer block */
export function Skeleton({ className }) {
  return <div className={cn('skeleton rounded', className)} aria-hidden="true" />
}

/** Matches BookCard dimensions */
export function BookCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[2/3]" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  )
}

/** Matches CategoryCard dimensions */
export function CategoryCardSkeleton() {
  return (
    <div className="card p-5">
      <Skeleton className="h-8 w-8 rounded-xl mb-3" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  )
}

/** Small horizontal book item (recently added strip) */
export function BookStripSkeleton() {
  return (
    <div className="flex-shrink-0 w-24">
      <div className="skeleton w-24 aspect-[2/3] rounded-lg mb-2" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-2.5 w-3/4" />
    </div>
  )
}

/** Featured large book card */
export function FeaturedBookSkeleton() {
  return (
    <div className="card p-5 flex gap-4">
      <div className="skeleton w-20 h-[120px] rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

/** Grid of N BookCard skeletons */
export function BookGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  )
}

/** Grid of N CategoryCard skeletons */
export function CategoryGridSkeleton({ count = 8 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}
