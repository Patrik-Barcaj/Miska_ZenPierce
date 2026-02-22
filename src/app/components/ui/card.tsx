import * as React from "react"; // Importing React core library

import { cn } from "./utils"; // Importing utility for conditional class merging

function Card({ className, ...props }: React.ComponentProps<"div">) { // Main high-level container for information blocks
  return ( // Returning JSX for the card wrapper
    <div // main container div
      data-slot="card" // Slot identifier for systematic styling
      className={cn( // Applying base and custom styles
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", // Professional surfacing styling with borders and shadows
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading remaining props
    /> // Closing tag
  ); // Closing return statement
} // Closing Card component block

function CardHeader({ className, ...props }: React.ComponentProps<"div">) { // Component for the upper section of a card
  return ( // Returning JSX for the header container
    <div // specialized header div
      data-slot="card-header" // Slot identifier
      className={cn( // Applying layout styles
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", // Complex grid layout for titles/actions
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardHeader component block

function CardTitle({ className, ...props }: React.ComponentProps<"div">) { // Component for the main card headline
  return ( // Returning JSX for the title
    <h4 // semantic heading element
      data-slot="card-title" // Slot identifier
      className={cn("leading-none", className)} // standard heading styling
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardTitle component block

function CardDescription({ className, ...props }: React.ComponentProps<"div">) { // Component for secondary card text
  return ( // Returning JSX for description
    <p // semantic paragraph element
      data-slot="card-description" // Slot identifier
      className={cn("text-muted-foreground", className)} // standard muted typography
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardDescription component block

function CardAction({ className, ...props }: React.ComponentProps<"div">) { // Component for additional actions placed in the header
  return ( // Returning JSX for the action container
    <div // action area div
      data-slot="card-action" // Slot identifier
      className={cn( // Style positioning
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end", // absolute grid positioning within header
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardAction component block

function CardContent({ className, ...props }: React.ComponentProps<"div">) { // Component for the main body content of the card
  return ( // Returning JSX for content wrapper
    <div // body container div
      data-slot="card-content" // Slot identifier
      className={cn("px-6 [&:last-child]:pb-6", className)} // Standard padding for the main area
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardContent component block

function CardFooter({ className, ...props }: React.ComponentProps<"div">) { // Component for the bottom section of the card (e.g., buttons)
  return ( // Returning JSX for the footer container
    <div // footer area div
      data-slot="card-footer" // Slot identifier
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)} // flex layout for standard footer placement
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing CardFooter component block

export { // Exporting sub-components for modular card composition
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}; // Closing export block
