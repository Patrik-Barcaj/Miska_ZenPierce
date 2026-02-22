"use client"; // Indicating this is a client-side component

import * as React from "react"; // Importing React core library
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Importing Radix UI Avatar primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Avatar({ // Main Avatar container component
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) { // TS type definition from Radix
  return ( // Returning JSX for the root
    <AvatarPrimitive.Root // Radix Root primitive
      data-slot="avatar" // Slot identifier for styling
      className={cn( // Merging styles
        "relative flex size-10 shrink-0 overflow-hidden rounded-full", // Default circular, flexbox layout styling
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing Avatar component

function AvatarImage({ // Component for the actual image within the avatar
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) { // TS type definition from Radix
  return ( // Returning JSX for the image
    <AvatarPrimitive.Image // Radix Image primitive
      data-slot="avatar-image" // Slot identifier
      className={cn("aspect-square size-full", className)} // Ensuring square aspect and full fill
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AvatarImage component

function AvatarFallback({ // Component for placeholder content when image fails to load
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) { // TS type definition from Radix
  return ( // Returning JSX for placeholder
    <AvatarPrimitive.Fallback // Radix Fallback primitive
      data-slot="avatar-fallback" // Slot identifier
      className={cn( // Merging styles
        "bg-muted flex size-full items-center justify-center rounded-full", // Centered layout with muted background
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AvatarFallback component

export { Avatar, AvatarImage, AvatarFallback }; // Exporting all avatar-related components
