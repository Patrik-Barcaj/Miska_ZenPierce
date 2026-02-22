import * as React from "react"; // Importing core React library
import { // Importing iconography icons
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils"; // Importing utility for conditional class merging
import { Button, buttonVariants } from "./button"; // Importing shared button styles

function Pagination({ className, ...props }: React.ComponentProps<"nav">) { // Primary navigation wrapper for paging
  return ( // Returning stylized nav block
    <nav // semantic navigation tag
      role="navigation" // accessibility role
      aria-label="pagination" // accessibility label
      data-slot="pagination" // identifier
      className={cn("mx-auto flex w-full justify-center", className)} // centered flex container
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Pagination component block

function PaginationContent({ // List container for individual page links
  className, // optional classes
  ...props // remaining list props
}: React.ComponentProps<"ul">) { // identifying props
  return ( // Returning functional list
    <ul // unordered list tag
      data-slot="pagination-content" // identifier
      className={cn("flex flex-row items-center gap-1", className)} // horizontal layout with small gaps
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing PaginationContent block

function PaginationItem({ ...props }: React.ComponentProps<"li">) { // List item wrapper for a link or ellipsis
  return <li data-slot="pagination-item" {...props} />; // functional list item wrapper
} // Closing PaginationItem block

type PaginationLinkProps = { // Prop definitions for individual page links
  isActive?: boolean; // toggle for current page state
} & Pick<React.ComponentProps<typeof Button>, "size"> & // inheriting shared button sizing
  React.ComponentProps<"a">; // standard anchor props

function PaginationLink({ // Actionable page link item
  className, // optional external classes
  isActive, // current page flag
  size = "icon", // appearance size (defaults to square icon)
  ...props // remaining anchor props
}: PaginationLinkProps) { // component implementation
  return ( // Returning stylized link
    <a // standard anchor tag
      aria-current={isActive ? "page" : undefined} // accessibility focus indicator
      data-slot="pagination-link" // identifier
      data-active={isActive} // binding state
      className={cn( // styling the interactive item
        buttonVariants({ // applying shared button styles
          variant: isActive ? "outline" : "ghost", // highlighted for active, subtle for others
          size, // binding size
        }), // closing variants call
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing PaginationLink block

function PaginationPrevious({ // Link specifically for going to the previous page
  className, // optional classes
  ...props // remaining link props
}: React.ComponentProps<typeof PaginationLink>) { // identifying props
  return ( // Returning functional link with icon
    <PaginationLink // using common link component
      aria-label="Go to previous page" // accessibility label
      size="default" // standard button width
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)} // spacing for text and icon
      {...props} // spreading props
    > // closing opening tag
      <ChevronLeftIcon /> // preceding arrow icon
      <span className="hidden sm:block">Previous</span> // responsive text label
    </PaginationLink> // closing link
  ); // closing return
} // Closing PaginationPrevious block

function PaginationNext({ // Link specifically for going to the next page
  className, // optional classes
  ...props // remaining link props
}: React.ComponentProps<typeof PaginationLink>) { // identifying props
  return ( // Returning functional link with icon
    <PaginationLink // using common link component
      aria-label="Go to next page" // accessibility label
      size="default" // standard button width
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)} // spacing for text and icon
      {...props} // spreading props
    > // closing opening tag
      <span className="hidden sm:block">Next</span> // responsive text label
      <ChevronRightIcon /> // trailing arrow icon
    </PaginationLink> // closing link
  ); // closing return
} // Closing PaginationNext block

function PaginationEllipsis({ // Visual indicator of skipped pages
  className, // optional classes
  ...props // remaining span props
}: React.ComponentProps<"span">) { // identifying props
  return ( // Returning ellipsis JSX
    <span // simple span
      aria-hidden // hiding from screen readers (semantic link found elsewhere)
      data-slot="pagination-ellipsis" // identifier
      className={cn("flex size-9 items-center justify-center", className)} // centered box
      {...props} // spreading props
    > // closing opening tag
      <MoreHorizontalIcon className="size-4" /> // rendering the dots
      <span className="sr-only">More pages</span> // screen reader only label
    </span> // closing tag
  ); // closing return
} // Closing PaginationEllipsis block

export { // Exporting coordinated components for full pagination construction
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}; // closing export block
