"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Moon, Sun } from 'lucide-react'
import * as React from "react"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer self-stretch h-full data-[state=unchecked]:justify-start data-[state=checked]:justify-end inline-flex w-12 shrink-0 cursor-pointer items-center rounded-sm border-0 p-[2px] border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-white transition-all",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "group pointer-events-none h-full w-auto font-mono uppercase text-2xl aspect-square rounded-[3px] bg-background ring-0 transition-all flex items-center justify-center"
      )}
    >
      <span className="group-data-[state=checked]:hidden group-data-[state=unchecked]:block"><Moon size={14} /></span>
      <span className="group-data-[state=checked]:block group-data-[state=unchecked]:hidden"><Sun size={14} /></span>
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
