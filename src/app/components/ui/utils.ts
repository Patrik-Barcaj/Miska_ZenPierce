import { clsx, type ClassValue } from "clsx"; // Importing utility for conditional class objects
import { twMerge } from "tailwind-merge"; // Importing utility to intelligently merge Tailwind classes

export function cn(...inputs: ClassValue[]) { // Shared helper for dynamic class management
  return twMerge(clsx(inputs)); // returning the result of clsx passed through twMerge (deduplicating styles)
} // Closing helper block
