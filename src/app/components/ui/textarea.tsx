import * as React from "react"; // Importing core React library

import { cn } from "./utils"; // Utility for merging Tailwind classes

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) { // Multi-line text input field
  return ( // Returning functional textarea
    <textarea // standard HTML textarea element
      data-slot="textarea" // identifier
      className={cn( // styling the physical element
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // comprehensive interactive, placeholder, and validation styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Textarea component block

export { Textarea }; // Exporting component
