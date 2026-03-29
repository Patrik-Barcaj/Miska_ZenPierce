// Import React and the useState hook for managing component state
import React, { useState } from 'react'

// Define a constant string containing a base64 encoded SVG image for error fallback
const ERROR_IMG_SRC =
  // The actual base64 encoded data string representing the fallback image placeholder
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Export the ImageWithFallback functional component, accepting standard HTML image attributes
export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Initialize state variable didError to track if the main image failed to load
  const [didError, setDidError] = useState(false)

  // Define a handler function to be called when an image load error occurs
  const handleError = () => {
    // Set the didError state to true, triggering a re-render with the fallback
    setDidError(true)
    // Close the error handler function
  }

  // Destructure the expected props to handle them specifically, collecting the rest
  const { src, alt, style, className, ...rest } = props

  // Conditionally return either the fallback UI or the main image attempt
  return didError ? (
    // Render a fallback container div if an error occurred
    <div
      // Combine base styling classes with any externally provided container classes
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      // Apply any externally provided inline styles to the wrapping container
      style={style}
    >
      {/* Inner flex container to center the fallback image within the space */}
      <div className="flex items-center justify-center w-full h-full">
        {/* Render the actual fallback image using the constant SVG source */}
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        {/* Close the inner centering container */}
      </div>
      {/* Close the outer fallback container */}
    </div>
    // The alternative branch if no error has occurred yet
  ) : (
    // Render the primary image attempt, attaching the error handler
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
    // Close the ternary return statement
  )
  // Close the parent component definition
}
