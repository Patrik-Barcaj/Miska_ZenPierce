import { cn } from "./utils"; // Importing utility for conditional class merging

function Skeleton({ className, ...props }: React.ComponentProps<"div">) { // Visual placeholder for loading states
  return ( // Returning stylized div
    <div // standard div tag
      data-slot="skeleton" // identifier
      className={cn("bg-accent animate-pulse rounded-md", className)} // pulsing animation and accent color
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Skeleton block

export { Skeleton }; // Exporting component
