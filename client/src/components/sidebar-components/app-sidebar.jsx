"use client"

import React, { useEffect, useState } from "react"
import { NavMain } from "@/components/sidebar-components/nav-main"
import { NavSecondary } from "@/components/sidebar-components/nav-secondary"
import { NavUser } from "@/components/sidebar-components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { data } from "./Sidebar-links-data"
import { TrainFront } from "lucide-react"

export function AppSidebar({ ...props }) {
  const [navMainItems, setNavMainItems] = useState([])
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))

    if (storedUser) {
      setUserData(storedUser)

      let filteredNav = []

      if (storedUser.is_admin) {
        filteredNav = data.navMain.filter(item => item.title === "Admin Page" || item.title === "Settings")
      } else if (storedUser.is_staff) {
        filteredNav = data.navMain.filter(item => 
          ["Home", "Employee", "Settings"].includes(item.title)
        )
      } else {
        filteredNav = data.navMain.filter(item => item.title === "Home" || item.title === "Settings")
      }

      setNavMainItems(filteredNav)
    }
  }, [])

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TrainFront />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data.navTop.boldText}</span>
                  <span className="truncate text-xs">{data.navTop.smallText}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData || data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
