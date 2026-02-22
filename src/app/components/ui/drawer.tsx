"use client"; // Client-side component for handling bottom/side panel interactivity

import * as React from "react"; // Importing core React library
import { Drawer as DrawerPrimitive } from "vaul"; // Importing the Vaul drawer library primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Drawer({ // Main coordination component for the drawer
  ...props // spreading props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) { // TS type definition from Vaul
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />; // Rendering the functional root provider
} // Closing Drawer component block

function DrawerTrigger({ // Item that activates the panel when clicked
  ...props // spreading props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) { // identifying props
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />; // Rendering the functional activation trigger
} // Closing DrawerTrigger component block

function DrawerPortal({ // Portal for escaping container clipping
  ...props // spreading props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) { // identifying props
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />; // Rendering the portal provider
} // Closing DrawerPortal component block

function DrawerClose({ // Item that deactivates the panel
  ...props // spreading props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) { // identifying props
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />; // Rendering the functional deactivation trigger
} // Closing DrawerClose component block

function DrawerOverlay({ // Backdrop that dims the background when panel is open
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) { // identifying props
  return ( // Returning functional overlay
    <DrawerPrimitive.Overlay // Vaul Overlay primitive
      data-slot="drawer-overlay" // identifier
      className={cn( // styling the full-screen backdrop
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", // animations and absolute fill
        className, // overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DrawerOverlay component block

function DrawerContent({ // The actual panel card housing the content
  className, // optional classes
  children, // inner content elements
  ...props // remaining content props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) { // identifying props
  return ( // Returning content inside portal and overlay
    <DrawerPortal data-slot="drawer-portal"> // Wrapping in portal
      <DrawerOverlay /> // Dimming the background
      <DrawerPrimitive.Content // The actual panel
        data-slot="drawer-content" // identifier
        className={cn( // styling the mobile-first panel
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col", // base containers
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b", // top direction styles
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t", // bottom direction styles
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm", // right direction styles
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm", // left direction styles
          className, // overrides
        )} // closing cn call
        {...props} // spreading props
      > // closing opening content tag
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" /> // visual drag handle for bottom panel
        {children} // rendering inner elements
      </DrawerPrimitive.Content> // closing primary content
    </DrawerPortal> // closing portal
  ); // closing return
} // Closing DrawerContent component block

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) { // Container for panel title and description
  return ( // Returning text wrapper
    <div // simple div
      data-slot="drawer-header" // identifier
      className={cn("flex flex-col gap-1.5 p-4", className)} // standard padded layout
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DrawerHeader component block

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) { // Container for panel actions
  return ( // Returning actions wrapper
    <div // simple div
      data-slot="drawer-footer" // identifier
      className={cn("mt-auto flex flex-col gap-2 p-4", className)} // push to bottom and padded
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DrawerFooter component block

function DrawerTitle({ // Semantically correct heading for accessibility
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) { // identifying props
  return ( // Returning functional title
    <DrawerPrimitive.Title // Vaul Title primitive
      data-slot="drawer-title" // identifier
      className={cn("text-foreground font-semibold", className)} // bold primary heading
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DrawerTitle component block

function DrawerDescription({ // Accessible description for screen readers
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) { // identifying props
  return ( // Returning description JSX
    <DrawerPrimitive.Description // Vaul Description primitive
      data-slot="drawer-description" // identifier
      className={cn("text-muted-foreground text-sm", className)} // muted secondary text
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DrawerDescription component block

export { // Exporting coordinated components for full assembly
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}; // closing export block
