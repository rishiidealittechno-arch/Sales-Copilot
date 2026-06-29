import { WebhookDialog, WebhookTable } from "./components"

export default function WebhookSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Webhooks</h2>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Subscribe to delivery, engagement, and system events. Each
            endpoint receives signed POST bodies; rotate secrets from the
            endpoint detail view.
          </p>
        </div>
        <WebhookDialog />
      </div>
      <WebhookTable />
    </div>
  )
}
