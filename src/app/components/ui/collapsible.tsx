"use client"; // Indicating this is a client-side component for handling collapse/expand state

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"; // Importing Radix UI Collapsible primitives

function Collapsible({ // Main coordination component for collapsible content
  ...props // spreading props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) { // TS type definition from Radix
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />; // Rendering the functional root provider
} // Closing Collapsible component block

function CollapsibleTrigger({ // Component that toggles the open state
  ...props // spreading props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) { // TS type definition
  return ( // Returning functional trigger
    <CollapsiblePrimitive.CollapsibleTrigger // Radix Trigger primitive
      data-slot="collapsible-trigger" // identifier
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CollapsibleTrigger component block

function CollapsibleContent({ // Component for the content that appears/disappears
  ...props // spreading props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) { // TS type definition
  return ( // Returning toggleable content
    <CollapsiblePrimitive.CollapsibleContent // Radix Content primitive
      data-slot="collapsible-content" // identifier
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CollapsibleContent component block

export { Collapsible, CollapsibleTrigger, CollapsibleContent }; // Exporting coordinated components
