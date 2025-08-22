import type { Metadata } from 'next'
// Fonts for this project - Geist for body, Geist Mono for code blocks (looks nice!)
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

// Metadata for SEO - update 'generator' if you change platforms!
export const metadata: Metadata = {
    title: 'Review Carousel',
    description: 'Review Carousel - v1.'
}

// Note for future devs: At some point, you may want additional props (lang, theme, etc.)
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            {/* Set global fonts - customize these if project brand changes */}
            <style>
                {`
            html {
              font-family: ${GeistSans.style.fontFamily};
              --font-sans: ${GeistSans.variable};
              --font-mono: ${GeistMono.variable};
            }
          `}
            </style>
        </head>
        {/* Main app content - feel free to wrap with extra divs for theming */}
        <body>{children}</body>
        </html>
    )
}
