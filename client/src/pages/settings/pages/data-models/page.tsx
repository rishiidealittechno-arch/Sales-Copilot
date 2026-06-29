import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

import { DataModelsTable } from "./components"

export default function DataModelsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Data models</h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Define the entities and schemas your journeys, segments, and
            analytics use. Published models are available across the workspace.
          </p>
        </div>
        <Button size="sm">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          New model
        </Button>
      </div>
      <DataModelsTable />
    </div>
  )
}
