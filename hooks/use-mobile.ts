import * as React from "react"

const MOBILE_BREAKPOINT = 768 // px - common breakpoint for mobile devices

// Custom hook to detect if current viewport width qualifies as mobile
export function useIsMobile() {
  // Start with undefined until we check window size on mount
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set up media query listener for viewport changes below breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const onChange = () => {
      // Update state based on window size in real time
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check when component mounts
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Listen for changes and clean up on unmount
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Provide boolean (defaulting false if undefined for rendering safety)
  return !!isMobile
}
