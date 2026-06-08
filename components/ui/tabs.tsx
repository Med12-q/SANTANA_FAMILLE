"use client"
import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  "group/tabs-list relative flex rounded-xl bg-muted p-[3px] text-muted-foreground",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-muted",
        line: "rounded-none border-b border-border bg-transparent p-0",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function TabsList({ className, variant = "default", ...props }: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List data-slot="tabs-list" data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)} {...props} />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab data-slot="tabs-trigger"
      className={cn("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground data-active:bg-background data-active:text-foreground dark:data-active:bg-input/30", className)} {...props} />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("flex-1 text-sm outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
