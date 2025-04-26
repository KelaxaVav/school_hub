"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-navigation-menu").Root>,
  React.ComponentPropsWithoutRef<
    typeof import("@radix-ui/react-navigation-menu").Root
  >
>(({ className, children, ...props }, ref) => (
  <import("@radix-ui/react-navigation-menu").Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max items-center justify-center space-x-4 sm:space-x-6 md:space-x-10",
      className
    )}
    {...props}
  >
    {children}
  </import("@radix-ui/react-navigation-menu").Root>
))
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-navigation-menu").List>,
  React.ComponentPropsWithoutRef<
    typeof import("@radix-ui/react-navigation-menu").List
  >
>(({ className, children, ...props }, ref) => (
  <import("@radix-ui/react-navigation-menu").List
    ref={ref}
    className={cn(
      "group flex list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  >
    {children}
  </import("@radix-ui/react-navigation-menu").List>
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-navigation-menu").Item>,
  React.ComponentPropsWithoutRef<
    typeof import("@radix-ui/react-navigation-menu").Item
  >
>(({ className, children, ...props }, ref) => (
  <import("@radix-ui/react-navigation-menu").Item
    ref={ref}
    className={cn("block", className)}
    {...props}
  >
    {children}
  </import("@radix-ui/react-navigation-menu").Item>
))
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-navigation-menu").Trigger>,
  React.ComponentPropsWithoutRef<
    typeof import("@radix-ui/react-navigation-menu").Trigger
  >
>(({ className, children, ...props }, ref) => (
  <import("@radix-ui/react-navigation-menu").Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted/50 focus:bg-muted/50 data-[state=open]:bg-muted/50",
      className,
      navigationMenuTriggerStyle()
    )}
    {...props}
  >
    {children}
  </import("@radix-ui/react-navigation-menu").Trigger>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof import("@radix-ui/react-navigation-menu").Content>,
  React.ComponentPropsWithoutRef<
    typeof import("@radix-ui/react-navigation-menu").Content
  >
>(({ className, children, ...props }, ref) => (
  <import("@radix-ui/react-navigation-menu").Content
    ref={ref}
    className={cn(
      "absolute top-0 left-0 w-full sm:w-[360px]",
      "animate-in fade-in-80 slide-in-from-bottom-10 md:animate-none md:opacity-100",
      "group-data-[state=open]:animate-out group-data-[state=open]:fade-out-80 group-data-[state=open]:slide-out-to-top-10",
      "min-h-[var(--radix-navigation-menu-content-available-height)] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
      className
    )}
    {...props}
  >
    {children}
  </import("@radix-ui/react-navigation-menu").Content>
))
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, children, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      "block select-none space-y-0.5 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </Link>
))
NavigationMenuLink.displayName = "NavigationMenuLink"

function navigationMenuTriggerStyle(): string {
  return "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:shadow-sm"
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
}
