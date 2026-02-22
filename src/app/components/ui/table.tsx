"use client"; // Client-side component for tabular data display

import * as React from "react"; // Importing core React library

import { cn } from "./utils"; // Utility for merging Tailwind classes

function Table({ className, ...props }: React.ComponentProps<"table">) { // Main table container with responsive scroll
  return ( // Returning functional table layout
    <div // responsive wrapper
      data-slot="table-container" // identifier
      className="relative w-full overflow-x-auto" // horizontal scroll for mobile
    > // closing opening tag
      <table // physical table element
        data-slot="table" // identifier
        className={cn("w-full caption-bottom text-sm", className)} // full width with theme-specific typography
        {...props} // spreading props
      /> // closing table
    </div> // closing container
  ); // closing return
} // Closing Table block

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) { // Header section for column labels
  return ( // Returning thead
    <thead // semantic head tag
      data-slot="table-header" // identifier
      className={cn("[&_tr]:border-b", className)} // applying border to header rows
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableHeader block

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) { // Main body section for data rows
  return ( // Returning tbody
    <tbody // semantic body tag
      data-slot="table-body" // identifier
      className={cn("[&_tr:last-child]:border-0", className)} // cleaning up border on the last row
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableBody block

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) { // Footer section for summaries or totals
  return ( // Returning tfoot
    <tfoot // semantic footer tag
      data-slot="table-footer" // identifier
      className={cn( // styling the footer
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", // subdued background and font emphasis
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableFooter block

function TableRow({ className, ...props }: React.ComponentProps<"tr">) { // A single vertical entry within any table segment
  return ( // Returning tr
    <tr // semantic row tag
      data-slot="table-row" // identifier
      className={cn( // styling the physical row
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", // interactive hover and selection states
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableRow block

function TableHead({ className, ...props }: React.ComponentProps<"th">) { // A header cell representing a single column
  return ( // Returning th
    <th // semantic header cell tag
      data-slot="table-head" // identifier
      className={cn( // styling the cell
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", // alignment and typography with checkbox specific adjustments
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableHead block

function TableCell({ className, ...props }: React.ComponentProps<"td">) { // A standard data cell within a body row
  return ( // Returning td
    <td // semantic cell tag
      data-slot="table-cell" // identifier
      className={cn( // styling the cell
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", // spacing and alignment logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableCell block

function TableCaption({ // Descriptive text usually found at the bottom of the table
  className, // optional classes
  ...props // caption props
}: React.ComponentProps<"caption">) { // TS extension
  return ( // Returning caption
    <caption // semantic caption tag
      data-slot="table-caption" // identifier
      className={cn("text-muted-foreground mt-4 text-sm", className)} // subtle typography for metadata
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TableCaption block

export { // Exporting component set
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
