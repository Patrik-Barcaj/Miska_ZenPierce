"use client"; // Client-side component for tabbed content interfaces

import * as React from "react"; // Core React library
import * as TabsPrimitive from "@radix-ui/react-tabs"; // Radix UI Tabs primitives

import { cn } from "./utils"; // Utility for merging Tailwind classes

function Tabs({ // Root container managing the state of active tabs
  className, // optional classes
  ...props // tabs root props
}: React.ComponentProps<typeof TabsPrimitive.Root>) { // TS definition extension
  return ( // Returning functional tabs layout
    <TabsPrimitive.Root // physical Radix primitive
      data-slot="tabs" // identifier
      className={cn("flex flex-col gap-2", className)} // vertical gap between list and content
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Tabs component block

function TabsList({ // Container for the interactive tab buttons
  className, // optional classes
  ...props // list props
}: React.ComponentProps<typeof TabsPrimitive.List>) { // TS extension
  return ( // Returning functional list layout
    <TabsPrimitive.List // physical list primitive
      data-slot="tabs-list" // identifier
      className={cn( // styling the physical strip
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex", // compact layout with thematic background and rounded corners
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TabsList block

function TabsTrigger({ // An individual clickable selector for a specific tab panel
  className, // optional classes
  ...props // trigger props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) { // TS extension
  return ( // Returning functional button
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn( // styling the interactive trigger
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // comprehensive interactive and active-state styles with theme-specific logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TabsTrigger block

function TabsContent({ // The actual content panel that reveals when its corresponding trigger is active
  className, // optional classes
  ...props // content props
}: React.ComponentProps<typeof TabsPrimitive.Content>) { // TS extension
  return ( // Returning visibility-controlled panel
    <TabsPrimitive.Content // physical content primitive
      data-slot="tabs-content" // identifier
      className={cn("flex-1 outline-none", className)} // flexible container with focus management
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TabsContent block

export { Tabs, TabsList, TabsTrigger, TabsContent };
