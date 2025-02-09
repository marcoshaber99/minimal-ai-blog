"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Filter,
  ChevronDown,
  LayoutDashboard,
  PenLineIcon,
  House,
  Star,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { DifficultySelect } from "./difficulty-select";
import { Card } from "@/components/ui/card";
import { DifficultyLevel } from "@/lib/validations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const mainNavItems = [
  { title: "Discover", icon: House, href: "/discover" },
  { title: "Create", icon: PenLineIcon, href: "/create" },
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Favorites", icon: Star, href: "/favorites" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Sidebar collapsible="icon">
      {/* Header with Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/discover" passHref legacyBehavior>
              <SidebarMenuButton size="lg" asChild tooltip="Vivlio">
                <a>
                  <div className="relative flex aspect-square size-8 items-center justify-center">
                    <Image
                      src="/assets/new-logo.svg"
                      alt="Vivlio Logo"
                      width={32}
                      height={32}
                      className="logo-glow"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold">Vivlio</span>
                    <span className="text-xs text-muted-foreground">
                      Developer Blog Platform
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <a>
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filters Section - Only show on Discover page */}
        {pathname === "/discover" && (
          <SidebarGroup className="mt-4 group-data-[collapsible=icon]:hidden">
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <Card className="mt-2 p-3 bg-sidebar-accent border-sidebar-border">
                    <DifficultySelect
                      defaultValue={
                        (searchParams.get("difficulty") as DifficultyLevel) ||
                        "all"
                      }
                    />
                  </Card>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer with User Navigation */}
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
