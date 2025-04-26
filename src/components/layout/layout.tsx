"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Home, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    label: "Students",
    href: "/students",
    icon: User,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar
        width="280px"
        collapsible="icon"
        style={{
          "--sidebar-width": "240px",
          "--sidebar-width-collapsed": "52px",
        }}
      >
        <SidebarTrigger />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Campus Hub</SidebarGroupLabel>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton href={route.href} asChild isActive={pathname === route.href}>
                    <Link href={route.href} className="w-full flex items-center gap-2">
                      <route.icon className="mr-2 h-4 w-4" />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <div className="p-2">
            <Avatar className="mb-2">
              <AvatarImage src="https://picsum.photos/50/50" alt="Admin" />
              <AvatarFallback>Admin</AvatarFallback>
            </Avatar>
            <p className="text-sm">Admin User</p>
            <Button variant="outline" size="sm" className="w-full mt-2">
              Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="container py-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
