import { AddAttributeDialog, AttributesTable } from "./components"

export default function AttributesSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Attributes</h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Define custom fields on players. Attributes marked for segment
            filters appear when you build audience rules; types drive operators
            and validation in the segment editor.
          </p>
        </div>
        <AddAttributeDialog />
      </div>
      <AttributesTable />
    </div>
  )
}
