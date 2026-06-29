import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { motion, useReducedMotion } from "framer-motion"
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

import Navbar from "@/components/navbar-layouts/nav"
import { useAuthReady } from "@/hooks/use-workspace"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { useStore } from "@/store"

import { settingsSidebarMenu } from "./setting-sidebar-menus"
import { sidebarMenus } from "./sidebar-menus"
import ChatSheet from "../chat-sheet/chat-sheet"

const SIDEBAR_WIDTH_DEFAULT = "15.384%" // 2/13
const SIDEBAR_WIDTH_SETTINGS = "38.462%" // 5/13
const AI_PANEL_WIDTH = "20.846%" // 2/13

function SidebarNav({
  menus,
  align = "start",
}: {
  menus: readonly {
    title: string
    icon: typeof sidebarMenus[number]["icon"]
    path: string
  }[]
  align?: "start" | "end"
}) {
  return (
    <nav
      className={cn(
        "space-y-4",
        align === "end" && "flex flex-col items-end"
      )}
    >
      {menus.map((menu) => (
        <NavLink
          key={menu.path}
          to={menu.path}
          className={({ isActive }) =>
            cn(
              "flex cursor-pointer items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-0 duration-0",
              align === "end" && "justify-end",
              isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
            )
          }
        >
          <HugeiconsIcon strokeWidth={1.5} icon={menu.icon} />
          <div className="max-w-36 overflow-hidden opacity-100">
            <CardTitle className={`${cn("scroll-m-20 text-md font-semibold tracking-tight")}`}>
              {menu.title}
            </CardTitle>
          </div>
        </NavLink>
      ))}
    </nav>
  )
}

export function PageLayout() {
  return (
      <PageLayoutContent />
  )
}

function PageLayoutContent() {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const { isPending, isAuthenticated } = useAuthReady()
  const isSettings = pathname.startsWith("/settings")
  const prefersReducedMotion = useReducedMotion()
  const aiChatOpen = useStore((state) => state.aiChatOpen)

  if (isPending) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-muted/40">
      <Navbar />
      <div className="flex min-h-0 flex-1">
        <motion.aside
            className="shrink-0 lg:block hidden overflow-hidden px-6 py-2"
            initial={false}
            animate={{
              width: isSettings ? SIDEBAR_WIDTH_SETTINGS : SIDEBAR_WIDTH_DEFAULT,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: [0.32, 0.72, 0, 1] }
            }
          >
            {isSettings ? (
              <motion.div
                key="settings-nav"
                className="flex h-full flex-col items-end"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.18, ease: [0.32, 0.72, 0, 1] }
                }
              >
                <div className="flex items-start flex-col gap-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/")}
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      strokeWidth={1.5}
                      data-icon="inline-start"
                    />
                    Exit settings
                  </Button>
                  <SidebarNav menus={settingsSidebarMenu} align="start" />
                </div>
              </motion.div>
            ) : (
              <SidebarNav menus={sidebarMenus} />
            )}
          </motion.aside>

        <main
          className={cn(
            "min-h-0 min-w-0 flex-1 rounded-tl-3xl bg-background p-8 shadow-sm overflow-auto transition-[border-radius] duration-200",
            aiChatOpen && "rounded-tr-3xl",
          )}
        >
          <Outlet />
        </main>

        <motion.aside
          className="shrink-0 overflow-hidden"
          initial={false}
          animate={{
            width: aiChatOpen ? AI_PANEL_WIDTH : 0,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.32, 0.72, 0, 1] }
          }
        >
          {aiChatOpen ? (
            <ChatSheet />
          ) : null}
        </motion.aside>
      </div>
    </div>
  )
}

export default PageLayout
