"use client"; // Client-side component for handling form state and validation UI

import * as React from "react"; // Importing core React library
import * as LabelPrimitive from "@radix-ui/react-label"; // Importing Radix UI Label primitives
import { Slot } from "@radix-ui/react-slot"; // Importing Slot for flexible component composition
import { // Importing React Hook Form utilities
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "./utils"; // Importing utility for conditional class merging
import { Label } from "./label"; // Importing local Label component

const Form = FormProvider; // Aliasing FormProvider for cleaner usage

type FormFieldContextValue< // Defining context structure for individual form fields
  TFieldValues extends FieldValues = FieldValues, // standard field values
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // field path type
> = { // context object type
  name: TName; // the registered name of the field
}; // closing type definition

const FormFieldContext = React.createContext<FormFieldContextValue>( // Creating context to share field name
  {} as FormFieldContextValue, // initial dummy value
); // closing create context

const FormField = < // Wrapper component for individual controlled fields
  TFieldValues extends FieldValues = FieldValues, // generics for types
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>, // generics for name
>({ // component props
  ...props // spreading react-hook-form controller props
}: ControllerProps<TFieldValues, TName>) => { // TS definition
  return ( // Returning provider and controller
    <FormFieldContext.Provider value={{ name: props.name }}> // Providing name to children
      <Controller {...props} /> // The actual brain of the controlled field
    </FormFieldContext.Provider> // closing provider
  ); // closing return
}; // Closing FormField block

const useFormField = () => { // Custom hook to access field state and context
  const fieldContext = React.useContext(FormFieldContext); // access field name
  const itemContext = React.useContext(FormItemContext); // access item ID
  const { getFieldState } = useFormContext(); // access hook form state accessors
  const formState = useFormState({ name: fieldContext.name }); // access overall form state
  const fieldState = getFieldState(fieldContext.name, formState); // extract specific field state (error, dirty, etc)

  if (!fieldContext) { // logic check
    throw new Error("useFormField should be used within <FormField>"); // enforce proper hierarchy
  } // closing error check

  const { id } = itemContext; // destructuring unique ID

  return { // returning coordinated state object
    id, // basic ID
    name: fieldContext.name, // field name
    formItemId: `${id}-form-item`, // unique ID for HTML associations
    formDescriptionId: `${id}-form-item-description`, // ID for ARIA description
    formMessageId: `${id}-form-item-message`, // ID for ARIA message
    ...fieldState, // spreading error and validity state
  }; // closing return object
}; // Closing useFormField block

type FormItemContextValue = { // Context for ensuring unique IDs within an item wrapper
  id: string; // the unique string identifier
}; // closing type definition

const FormItemContext = React.createContext<FormItemContextValue>( // Creating the context
  {} as FormItemContextValue, // initial value
); // closing block

function FormItem({ className, ...props }: React.ComponentProps<"div">) { // Wrapper for a label-control-message trio
  const id = React.useId(); // generating a unique ID for this instance

  return ( // Returning provider and grid wrapper
    <FormItemContext.Provider value={{ id }}> // providing the unique ID
      <div // layout container
        data-slot="form-item" // identifier
        className={cn("grid gap-2", className)} // vertical grid spacing
        {...props} // spreading remaining props
      /> // closing div
    </FormItemContext.Provider> // closing provider
  ); // closing return
} // Closing FormItem block

function FormLabel({ // Specialized label that reacts to field errors
  className, // optional classes
  ...props // remaining label props
}: React.ComponentProps<typeof LabelPrimitive.Root>) { // identifying props
  const { error, formItemId } = useFormField(); // accessing error state and ID

  return ( // Returning coordinated label
    <Label // Using local Label component
      data-slot="form-label" // identifier
      data-error={!!error} // binding error attribute
      className={cn("data-[error=true]:text-destructive", className)} // turning red on error
      htmlFor={formItemId} // linking to control via ID
      {...props} // spreading remaining props
    /> // closing tag
  ); // closing return
} // Closing FormLabel block

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) { // Wrapper for the interactive input element
  const { error, formItemId, formDescriptionId, formMessageId } = // accessing state and IDs
    useFormField(); // calling hook

  return ( // Returning accessible slot
    <Slot // Passing props to child without extra DOM element
      data-slot="form-control" // identifier
      id={formItemId} // binding unique ID
      aria-describedby={ // linking to description or error message
        !error // ternary branch
          ? `${formDescriptionId}` // only description
          : `${formDescriptionId} ${formMessageId}` // both description and error
      } // closing binding
      aria-invalid={!!error} // accessibility validity flag
      {...props} // spreading props
    /> // closing slot
  ); // closing return
} // Closing FormControl block

function FormDescription({ className, ...props }: React.ComponentProps<"p">) { // Helper text for a form field
  const { formDescriptionId } = useFormField(); // accessing ID

  return ( // Returning descriptive text
    <p // simple paragraph
      data-slot="form-description" // identifier
      id={formDescriptionId} // unique ID for accessibility link
      className={cn("text-muted-foreground text-sm", className)} // muted smaller text
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing FormDescription block

function FormMessage({ className, ...props }: React.ComponentProps<"p">) { // Error message display for a form field
  const { error, formMessageId } = useFormField(); // accessing state and ID
  const body = error ? String(error?.message ?? "") : props.children; // extracting message or using manual content

  if (!body) { // guard clause
    return null; // hide if no message
  } // closing check

  return ( // Returning error message
    <p // simple paragraph
      data-slot="form-message" // identifier
      id={formMessageId} // unique ID for accessibility link
      className={cn("text-destructive text-sm", className)} // red smaller text
      {...props} // spreading props
    > // closing opening tag
      {body} // rendering error text
    </p> // closing tag
  ); // closing return
} // Closing FormMessage block

export { // Exporting coordinated components for full form construction
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}; // closing export block
