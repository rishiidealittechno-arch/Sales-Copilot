import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { JourneysTable } from "./components"

export default function JourneysPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 px-8 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button type="button" onClick={() => navigate("/create-journey")}>
          Create journey
        </Button>
      </div>
      <JourneysTable />
    </div>
  )
}
