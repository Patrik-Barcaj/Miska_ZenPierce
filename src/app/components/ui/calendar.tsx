"use client"; // Indicating this is a client-side component for handling date interactions

import * as React from "react"; // Importing core React library
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing navigation arrow icons
import { DayPicker } from "react-day-picker"; // Importing the main date picker engine

import { cn } from "./utils"; // Importing utility for conditional class merging
import { buttonVariants } from "./button"; // Importing standard button styles for calendar interaction

function Calendar({ // Main Calendar component exported for application consumption
  className, // Optional custom CSS classes
  classNames, // Custom sub-element style overrides
  showOutsideDays = true, // Boolean to toggle whether days from other months are visible
  ...props // Remaining props from react-day-picker
}: React.ComponentProps<typeof DayPicker>) { // Inheriting comprehensive props from the external library
  return ( // Returning the DayPicker implementation with complex Tailwind styling
    <DayPicker // The component providing all date picking logic
      showOutsideDays={showOutsideDays} // Enabling/disabling outside month dates
      className={cn("p-3", className)} // Main wrapper padding
      classNames={{ // Defining individual element styles for the calendar
        months: "flex flex-col sm:flex-row gap-2", // Layout for single month views
        month: "flex flex-col gap-4", // Individual month container
        caption: "flex justify-center pt-1 relative items-center w-full", // Month/Year display container
        caption_label: "text-sm font-medium", // Month title typography
        nav: "flex items-center gap-1", // Navigation buttons container
        nav_button: cn( // Merging variant and base button styles
          buttonVariants({ variant: "outline" }), // Standard outline look
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100", // Responsive size and interaction states
        ), // Closing cn call
        nav_button_previous: "absolute left-1", // Absolute alignment for previous month button
        nav_button_next: "absolute right-1", // Absolute alignment for next month button
        table: "w-full border-collapse space-x-1", // Main grid for month dates
        head_row: "flex", // Day of week row layout
        head_cell: // Individual weekday label styling
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", // Small muted typography
        row: "flex w-full mt-2", // Individual week row
        cell: cn( // Complex styling for individual date cells including range states
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md", // Interaction and standard selection highlights
          props.mode === "range" // conditional logic for range selection UI
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" // Rounded corners patterns for date ranges
            : "[&:has([aria-selected])]:rounded-md", // Standard rounded corners for single dates
        ), // Closing cn call
        day: cn( // Individual day button styling
          buttonVariants({ variant: "ghost" }), // Invisible by default
          "size-8 p-0 font-normal aria-selected:opacity-100", // Standard interaction look
        ), // Closing cn call
        day_range_start: // Higher focus state for beginning of a range
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground", // Brand primary background
        day_range_end: // Higher focus state for end of a range
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground", // Brand primary background
        day_selected: // Highlights for standard selected state
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Brand consistent selection
        day_today: "bg-accent text-accent-foreground", // Indicator for the current real-world date
        day_outside: // styling for days not in the current month
          "day-outside text-muted-foreground aria-selected:text-muted-foreground", // Muted look
        day_disabled: "text-muted-foreground opacity-50", // Unclickable date state
        day_range_middle: // Highlight for dates between start and end of a range
          "aria-selected:bg-accent aria-selected:text-accent-foreground", // Secondary selection color
        day_hidden: "invisible", // Fully hidding dates as requested
        ...classNames, // Allowing external override passed via props
      }} // Closing classNames mapping
      components={{ // Injecting custom icons into library components
        IconLeft: ({ className, ...props }) => ( // mapping the left arrow
          <ChevronLeft className={cn("size-4", className)} {...props} /> // Lucide left arrow component
        ), // closing left arrow sub-component
        IconRight: ({ className, ...props }) => ( // mapping the right arrow
          <ChevronRight className={cn("size-4", className)} {...props} /> // Lucide right arrow component
        ), // closing right arrow sub-component
      }} // Closing components mapping
      {...props} // Spreading all remaining logic-related props (selected, onSelect, etc.)
    /> // Closing DayPicker component
  ); // Closing return statement
} // Closing Calendar component block

export { Calendar }; // Exporting component for use in forms and booking systems
