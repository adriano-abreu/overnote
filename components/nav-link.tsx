'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronRight, Home, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
export function NavLink() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="default"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href="/" className="flex gap-2 items-center p-1">
            <Home className="size-5" />
            <span className="truncate text-base font-bold">Home</span>
          </Link>
          <ChevronRight className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton
          size="default"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href="/dashboard" className="flex gap-2 items-center p-1">
            <LayoutDashboard className="size-5" />
            <span className="truncate text-base font-semibold">Dashboard</span>
          </Link>
          <ChevronRight className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
