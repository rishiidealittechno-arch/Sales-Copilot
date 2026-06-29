import { Navigate, Route, Routes } from "react-router-dom"
import { PageContent } from "./components/layouts/page-content"
import { PageLayout } from "./components/layouts/page-layout"
import { settingsSidebarMenu, type SettingsSidebarPath } from "./components/layouts/setting-sidebar-menus"
import { sidebarMenus } from "./components/layouts/sidebar-menus"
import DashboardPage from "@/pages/dashboard/page"
import SettingsProfilePage from "@/pages/settings/pages/profile/page"
import WorkspaceSettingsPage from "@/pages/settings/pages/workspace/page"
import AppearanceSettingsPage from "@/pages/settings/pages/appearance/page"
import WebhookSettingsPage from "@/pages/settings/pages/webhook/page"
import ApiKeySettingsPage from "@/pages/settings/pages/api-key/page"
import BrandChannelsSettingsPage from "@/pages/settings/pages/brand-channels/page"
import BillingSettingsPage from "@/pages/settings/pages/billing/page"
import SecuritySettingsPage from "@/pages/settings/pages/security/page"
import NotificationSettingsPage from "@/pages/settings/pages/notification/page"
import IntegrationsSettingsPage from "@/pages/settings/pages/integrations/page"
import MembersSettingsPage from "@/pages/settings/pages/members/page"
import DataModelsPage from "@/pages/settings/pages/data-models/page"
import TasksPage from "@/pages/tasks/page"
import type { ReactNode } from "react"
import LeadsPage from "@/pages/leads/page"
import ContactsPage from "@/pages/contacts/page"
import OpportunitiesPage from "@/pages/opportunities/page"
import DealsPage from "@/pages/deals/page"
import LoginPage from "@/pages/login/page"
import PlansPage from "@/pages/plans/page"

const settingsRouteElements = {
  "/settings/profile": <SettingsProfilePage />,
  "/settings/workspace": <WorkspaceSettingsPage />,
  "/settings/appearance": <AppearanceSettingsPage />,
  "/settings/webhooks": <WebhookSettingsPage />,
  "/settings/api-key": <ApiKeySettingsPage />,
  "/settings/communication": <BrandChannelsSettingsPage />,
  "/settings/billing": <BillingSettingsPage />,
  "/settings/security": <SecuritySettingsPage />,
  "/settings/plans": <PlansPage />,
  "/settings/notifications": <NotificationSettingsPage />,
  "/settings/integrations": <IntegrationsSettingsPage />,
  "/settings/data-models": <DataModelsPage />,
  "/settings/members": <MembersSettingsPage />,
} satisfies Record<SettingsSidebarPath, ReactNode>

const routeElements: Partial<
  Record<(typeof sidebarMenus)[number]["path"], ReactNode>
> = {
  "/": <DashboardPage />,
  "/leads": <LeadsPage />,
  "/contacts": <ContactsPage />,
  "/opportunities": <OpportunitiesPage />,
  "/deals": <DealsPage />,
  "/tasks": <TasksPage />,
}

export function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PageLayout />}>
        <Route index element={<DashboardPage />} />

        {sidebarMenus
          .filter((menu) => menu.path !== "/settings" && menu.path !== "/")
          .map((menu) => (
            <Route
              key={menu.path}
              path={menu.path.slice(1)}
              element={routeElements[menu.path] ?? <PageContent />}
            />
          ))}

        <Route path="settings">
          <Route index element={<Navigate to="/settings/profile" replace />} />
          {settingsSidebarMenu.map((menu) => {
            const subPath = menu.path.replace("/settings/", "")
            return (
              <Route
                key={menu.path}
                path={subPath}
                element={settingsRouteElements[menu.path]}
              />
            )
          })}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
