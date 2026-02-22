"use client"; // Client-side component for handling modal dialog interactivity

import * as React from "react"; // Importing core React library
import * as DialogPrimitive from "@radix-ui/react-dialog"; // Importing Radix UI Dialog primitives
import { XIcon } from "lucide-react"; // Importing the close icon

import { cn } from "./utils"; // Importing utility for conditional class merging

function Dialog({ // Main coordination component for the modal
  ...props // spreading props
}: React.ComponentProps<typeof DialogPrimitive.Root>) { // TS type definition from Radix
  return <DialogPrimitive.Root data-slot="dialog" {...props} />; // Rendering the functional root provider
} // Closing Dialog component block

function DialogTrigger({ // Item that activates the modal when clicked
  ...props // spreading props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) { // TS type definition
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />; // Rendering the functional trigger
} // Closing DialogTrigger component block

function DialogPortal({ // Portal for escaping container clipping and centering in viewport
  ...props // spreading props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) { // TS type definition
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />; // Rendering the portal provider
} // Closing DialogPortal component block

function DialogClose({ // Item that deactivates the modal
  ...props // spreading props
}: React.ComponentProps<typeof DialogPrimitive.Close>) { // TS type definition
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />; // Rendering the functional close trigger
} // Closing DialogClose component block

function DialogOverlay({ // Backdrop that dims the background when modal is open
  className, // optional external classes
  ...props // remaining props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) { // identifying props
  return ( // Returning functional overlay
    <DialogPrimitive.Overlay // Radix Overlay primitive
      data-slot="dialog-overlay" // identifier
      className={cn( // styling the full-screen backdrop
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", // animations and absolute fill
        className, // overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DialogOverlay component block

function DialogContent({ // The actual modal card housing the content
  className, // optional classes
  children, // inner content elements
  ...props // remaining content props
}: React.ComponentProps<typeof DialogPrimitive.Content>) { // identifying props
  return ( // Returning content inside portal and overlay
    <DialogPortal data-slot="dialog-portal"> // Wrapping in portal
      <DialogOverlay /> // Dimming the background
      <DialogPrimitive.Content // The actual card
        data-slot="dialog-content" // identifier
        className={cn( // styling the centered card
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", // complex centering and entry animations
          className, // overrides
        )} // closing cn call
        {...props} // spreading props
      > // closing opening tag
        {children} // rendering inner elements
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"> // Absolute positioned close button
          <XIcon /> // rendering X icon
          <span className="sr-only">Close</span> // accessibility label
        </DialogPrimitive.Close> // closing close trigger
      </DialogPrimitive.Content> // closing primary content
    </DialogPortal> // closing portal
  ); // closing return
} // Closing DialogContent component block

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) { // Container for dialog title and description
  return ( // Returning text wrapper
    <div // simple div
      data-slot="dialog-header" // identifier
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)} // vertical list with responsive alignment
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DialogHeader component block

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) { // Container for dialog actions (buttons)
  return ( // Returning actions wrapper
    <div // simple div
      data-slot="dialog-footer" // identifier
      className={cn( // styling the action row
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", // stacking on mobile, rowing on desktop
        className, // overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DialogFooter component block

function DialogTitle({ // Semantically correct heading for accessibility
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DialogPrimitive.Title>) { // identifying props
  return ( // Returning functional title
    <DialogPrimitive.Title // Radix Title primitive
      data-slot="dialog-title" // identifier
      className={cn("text-lg leading-none font-semibold", className)} // bold primary heading style
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DialogTitle component block

function DialogDescription({ // Accessible description for screen readers
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DialogPrimitive.Description>) { // identifying props
  return ( // Returning functional description
    <DialogPrimitive.Description // Radix Description primitive
      data-slot="dialog-description" // identifier
      className={cn("text-muted-foreground text-sm", className)} // muted secondary text style
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DialogDescription component block

export { // Exporting coordinated components for dialog construction
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}; // closing export block
