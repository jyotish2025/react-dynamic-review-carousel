import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Basic Card container with border, shadow, padding, and rounded corners.
 * Accepts extra class names and props for flexibility.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card"
          className={cn(
              "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
              className
          )}
          {...props}
      />
  )
}

/**
 * CardHeader supports layout with grid template, padding, and conditional styling
 * via container queries and data attributes for contextual actions.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-header"
          className={cn(
              "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
              className
          )}
          {...props}
      />
  )
}

/**
 * CardTitle for heading text inside a card. Semi-bold font and no extra line height.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-title"
          className={cn("leading-none font-semibold", className)}
          {...props}
      />
  )
}

/**
 * CardDescription for smaller, muted text describing card content.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
      />
  )
}

/**
 * CardAction for buttons or interactive elements aligned to the top-right.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-action"
          className={cn(
              "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
              className
          )}
          {...props}
      />
  )
}

/**
 * CardContent provides padding inside card body for main display content.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-content"
          className={cn("px-6", className)}
          {...props}
      />
  )
}

/**
 * CardFooter aligns content horizontally with padding and optional top border.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
          data-slot="card-footer"
          className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
          {...props}
      />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
