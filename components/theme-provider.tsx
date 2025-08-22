'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

// Wraps application with theme context provider from next-themes package.
// Feel free to extend this with additional theme logic or context in the future.
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // FYI: Props passed through as-is for now, but can tweak later if needed
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
