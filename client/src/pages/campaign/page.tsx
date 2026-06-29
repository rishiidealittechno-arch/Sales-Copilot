import { CampaignTable, CreateCampaignDialog } from "./components"

export default function CampaignPage() {
  return (
    <div className="space-y-6 px-8 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <CreateCampaignDialog />
      </div>
      <CampaignTable />
    </div>
  )
}
