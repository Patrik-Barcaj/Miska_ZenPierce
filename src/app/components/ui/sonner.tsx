"use client"; // Client-side component for toast notifications using Sonner

import { useTheme } from "next-themes"; // Importing theme provider hook
import { Toaster as Sonner, ToasterProps } from "sonner"; // Importing Sonner functional toaster

const Toaster = ({ ...props }: ToasterProps) => { // Wrapper component for consistent toast styling
  const { theme = "system" } = useTheme(); // accessing active theme state

  return ( // Returning functional toaster
    <Sonner // The physical notification engine
      theme={theme as ToasterProps["theme"]} // binding theme state
      className="toaster group" // identifier classes
      style={ // overriding default CSS variables for project design tokens
        {
          "--normal-bg": "var(--popover)", // binding background color
          "--normal-text": "var(--popover-foreground)", // binding text color
          "--normal-border": "var(--border)", // binding border color
        } as React.CSSProperties // TS casting
      } // closing style block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
}; // Closing Toaster block

export { Toaster }; // Exporting component
