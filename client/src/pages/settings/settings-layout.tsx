import { Outlet } from "react-router-dom"

export default function SettingsLayout() {
  return (
    <div className="min-w-0 px-8 pb-8">
      <Outlet />
    </div>
  )
}
