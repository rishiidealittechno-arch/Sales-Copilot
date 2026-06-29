import { CreateTriggerDialog, QuickStartCards, TriggersTable } from "./components"

export default function TriggersPage() {
  return (
    <div className="space-y-6 px-8 py-4">
      <div className="flex items-start sm:justify-end">
        <CreateTriggerDialog />
      </div>
      <div className="flex items-start sm:justify-end">
        <QuickStartCards />
      </div>
      <TriggersTable />
    </div>
  )
}
