"use client"; // Client-side component for modal interactions

import * as React from "react"; // Importing core React library
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"; // Importing Radix UI Alert Dialog primitives

import { cn } from "./utils"; // Importing utility for conditional class merging
import { buttonVariants } from "./button"; // Importing standard button styles

function AlertDialog({ // Main context provider for the alert dialog
  ...props // Spreading remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) { // TS type definition from Radix
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />; // Rendering the root dialog logic
} // Closing AlertDialog component

function AlertDialogTrigger({ // Component that triggers the dialog opening
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) { // TS type definition from Radix
  return ( // Returning the trigger JSX
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} /> // Rendering standard Radix trigger
  ); // Closing return statement
} // Closing AlertDialogTrigger component

function AlertDialogPortal({ // Component that renders the dialog content into a separate DOM branch
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) { // TS type definition from Radix
  return ( // Returning the portal JSX
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} /> // Rendering standard Radix portal
  ); // Closing return statement
} // Closing AlertDialogPortal component

function AlertDialogOverlay({ // Component for the dimmed background behind the dialog
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) { // TS type definition from Radix
  return ( // Returning JSX for the overlay
    <AlertDialogPrimitive.Overlay // Radix Overlay primitive
      data-slot="alert-dialog-overlay" // Slot identifier
      className={cn( // Merging styles
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", // Styling for background wash and animations
        className, // Custom override
      )} // Closing cn function
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AlertDialogOverlay component

function AlertDialogContent({ // Main content container for the alert dialog
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) { // TS type definition from Radix
  return ( // Returning JSX for the content within a portal
    <AlertDialogPortal> // Rendering in a portal for proper Z-indexing
      <AlertDialogOverlay /> // Rendering the background overlay
      <AlertDialogPrimitive.Content // Main modal container primitive
        data-slot="alert-dialog-content" // Slot identifier
        className={cn( // Complex styling for layout, positioning, and animations
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", // Professional modal styling
          className, // Custom override
        )} // Closing cn function
        {...props} // Spreading props
      /> // Closing content primitive
    </AlertDialogPortal> // Closing portal
  ); // Closing return statement
} // Closing AlertDialogContent component

function AlertDialogHeader({ // Component for the dialog header section
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"div">) { // Standard div props
  return ( // Returning JSX for the header
    <div // simple div wrapper
      data-slot="alert-dialog-header" // Slot identifier
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)} // Header layout styling
      {...props} // Spreading props
    /> // Closing div tag
  ); // Closing return statement
} // Closing AlertDialogHeader component

function AlertDialogFooter({ // Component for the dialog button section at the bottom
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"div">) { // Standard div props
  return ( // Returning JSX for the footer
    <div // flex container
      data-slot="alert-dialog-footer" // Slot identifier
      className={cn( // Action area styling
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", // Responsive layout for buttons
        className, // Custom override
      )} // Closing cn function
      {...props} // Spreading props
    /> // Closing div tag
  ); // Closing return statement
} // Closing AlertDialogFooter component

function AlertDialogTitle({ // Component for the main dialog headline
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) { // TS type definition from Radix
  return ( // Returning JSX for the title
    <AlertDialogPrimitive.Title // Radix Title primitive for accessibility
      data-slot="alert-dialog-title" // Slot identifier
      className={cn("text-lg font-semibold", className)} // Semi-bold heading style
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AlertDialogTitle component

function AlertDialogDescription({ // Component for the secondary explanatory text
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) { // TS type definition from Radix
  return ( // Returning JSX for the description
    <AlertDialogPrimitive.Description // Radix Description primitive for screen readers
      data-slot="alert-dialog-description" // Slot identifier
      className={cn("text-muted-foreground text-sm", className)} // Muted small text style
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AlertDialogDescription component

function AlertDialogAction({ // Component for the primary positive action button
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) { // TS type definition from Radix
  return ( // Returning JSX for the action button
    <AlertDialogPrimitive.Action // Radix Action primitive
      className={cn(buttonVariants(), className)} // Applying standard primary button variant
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AlertDialogAction component

function AlertDialogCancel({ // Component for the dismissive action button
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) { // TS type definition from Radix
  return ( // Returning JSX for the cancel button
    <AlertDialogPrimitive.Cancel // Radix Cancel primitive
      className={cn(buttonVariants({ variant: "outline" }), className)} // Applying outline button variant
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AlertDialogCancel component

export { // Exporting components for modular use
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}; // Closing export block
