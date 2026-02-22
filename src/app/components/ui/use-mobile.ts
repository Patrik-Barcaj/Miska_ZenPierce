import * as React from "react"; // Core React library for hooks

const MOBILE_BREAKPOINT = 768; // Defining the pixel width for mobile devices

export function useIsMobile() { // Custom hook to detect if the user is on a mobile device
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>( // State to track mobile status
    undefined, // initially undefined to avoid SSR mismatch
  ); // closing hook

  React.useEffect(() => { // Hook for media query event listeners
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`); // creating media query listener
    const onChange = () => { // Handler for breakpoint crossover
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // updating state based on window width
    }; // closing handler
    mql.addEventListener("change", onChange); // binding listener to change events
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); // performing initial check
    return () => mql.removeEventListener("change", onChange); // cleaning up listener on unmount
  }, []); // single execution on mount

  return !!isMobile; // returning boolean status (fallback to false if undefined)
} // Closing hook block
