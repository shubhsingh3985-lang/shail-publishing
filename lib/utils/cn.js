// lib/utils/cn.js
// Merges class names, resolving Tailwind conflicts cleanly.
// Usage: cn('px-4 py-2', isActive && 'bg-gold', className)

import { clsx }        from 'clsx'
import { twMerge }     from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}