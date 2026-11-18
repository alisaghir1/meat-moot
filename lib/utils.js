import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Show prices as stored: 45 -> "45", 497.7 -> "497.7", 12.25 -> "12.25"
export function formatPrice(price) {
  const n = Number(price)
  if (!Number.isFinite(n)) return ''
  return String(Math.round(n * 100) / 100)
}
