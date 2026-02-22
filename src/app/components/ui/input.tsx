import * as React from "react"; // Importing core React library

import { cn } from "./utils"; // Importing utility for conditional class merging

function Input({ className, type, ...props }: React.ComponentProps<"input">) { // Standardized text input component
  return ( // Returning stylized HTML input
    <input // raw HTML input element
      type={type} // binding input type (text, password, etc)
      data-slot="input" // identifier
      className={cn( // styling the input field
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", // comprehensive typography and state styles
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", // focus ring highlight
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", // error state indicators
        className, // overrides
      )} // closing cn block
      {...props} // spreading functional props
    /> // closing input tag
  ); // closing return
} // Closing Input component block

export { Input }; // Exporting component
