// lib/utils/formatPrice.js

/**
 * Formats a number as Indian Rupees.
 * formatPrice(385)  → '₹385'
 * formatPrice(1250) → '₹1,250'
 */
export function formatPrice(amount) {
  if (amount == null) return ''
  return '₹' + Number(amount).toLocaleString('en-IN')
}

/**
 * Returns the discount percentage between original and sale price.
 * getDiscount(385, 520) → 26
 */
export function getDiscount(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}