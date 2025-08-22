import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines class names with clsx, then merges Tailwind classes to handle conflicts
// Handy utility to keep className logic clean and avoid duplication
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
