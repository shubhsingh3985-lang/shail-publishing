// lib/utils/slugify.js

/**
 * Converts a string to a URL-safe slug.
 * slugify('Advanced Mathematics Class XII') → 'advanced-mathematics-class-xii'
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/[\s_-]+/g, '-')   // spaces and underscores → hyphens
    .replace(/^-+|-+$/g, '')    // trim leading/trailing hyphens
}