import { useLocation } from "react-router-dom"

import { settingsSidebarMenu } from "./setting-sidebar-menus"
import { sidebarMenus } from "./sidebar-menus"

const allMenus = [...sidebarMenus, ...settingsSidebarMenu]

export function PageContent() {
  const { pathname } = useLocation()
  const menu = allMenus.find((item) => item.path === pathname)

  if (!menu) {
    return null
  }

  return (
    <div className="space-y-2">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {menu.heading}
      </h1>
      <p className="text-muted-foreground">{menu.description}</p>
    </div>
  )
}
