"use client"; // Client-side hydration for responsive calculations

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"; // Importing Radix UI Aspect Ratio primitives

function AspectRatio({ // Main AspectRatio component wrapper
  ...props // Spreading incoming props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) { // Inheriting prop types from Radix primitive
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />; // Rendering Radix Root with a data identifier for consistent styling
} // Closing AspectRatio component

export { AspectRatio }; // Exporting component for use in layouts
