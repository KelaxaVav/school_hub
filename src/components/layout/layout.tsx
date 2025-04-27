"use client";

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
import { Home, User, Users, Package, PencilRuler, Settings, Shield, Users2, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/Loading';


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
  {
    label: "Staff",
    href: "/staff",
    icon: Users,
  },
   {
    label: "Users",
    href: "/users",
    icon: Users2,
  },
   {
    label: "Leaves",
    href: "/leaves",
    icon: Calendar,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: PencilRuler,
  },
   {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
     {
    label: "Roles & Permissions",
    href: "/roles-permissions",
    icon: Shield,
  },
];

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

export function Layout({ children, hideNavigation }: LayoutProps) {
  const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const username = useSelector((state: any) => state.user.username);
    const isLoading = useSelector((state: any) => state.loading.isLoading);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                router.push("/login");
            }
        };

        checkLoginStatus();
    }, [router]);

    if (!isLoggedIn) {
        return null;
    }

  return (
    
      <SidebarProvider>
       <Loading/>
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
            <p className="text-sm">{username}</p>
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleLogout}>
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
