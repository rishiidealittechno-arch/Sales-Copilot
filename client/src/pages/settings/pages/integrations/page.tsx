import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type IntegrationStatus = "connected" | "available" | "error"

const CONNECTED = [
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data warehouse",
    description: "Sync segments and event aggregates to your warehouse on a schedule.",
    status: "connected" as const,
    detail: "Last sync · 2 hours ago",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Notifications",
    description: "Post alerts and campaign summaries to a channel.",
    status: "connected" as const,
    detail: "Workspace · acme-corp.slack.com",
  },
] as const

const AVAILABLE = [
  {
    id: "google-ads",
    name: "Google Ads",
    category: "Advertising",
    description: "Send conversion events and audiences for remarketing.",
    status: "available" as const,
  },
  {
    id: "segment",
    name: "Segment",
    category: "CDP",
    description: "Mirror events to your CDP for downstream analytics tools.",
    status: "available" as const,
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Support",
    description: "Open tickets from player profiles and sync conversation tags.",
    status: "available" as const,
  },
] as const

function StatusBadge({ status }: { status: IntegrationStatus }) {
  if (status === "connected") {
    return (
      <Badge variant="secondary" className="font-normal">
        Connected
      </Badge>
    )
  }
  if (status === "error") {
    return (
      <Badge variant="destructive" className="font-normal">
        Needs attention
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="font-normal">
      Not connected
    </Badge>
  )
}

function IntegrationRow({
  name,
  category,
  description,
  status,
  detail,
}: {
  name: string
  category: string
  description: string
  status: IntegrationStatus
  detail?: string
}) {
  const connected = status === "connected"
  return (
    <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <div
          className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
          aria-hidden
        >
          {name.slice(0, 1)}
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold leading-none">{name}</p>
            <span className="text-muted-foreground text-xs">{category}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          {detail ? (
            <p className="text-muted-foreground text-xs">{detail}</p>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
        <StatusBadge status={status} />
        <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto">
          {connected ? "Manage" : "Connect"}
        </Button>
      </div>
    </div>
  )
}

export default function IntegrationsSettingsPage() {
  return (
    <div className="mx-start max-w-xl space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Connect data warehouses, ad platforms, support tools, and CDPs. OAuth
          connections are scoped to this workspace; rotate credentials from each
          integration&apos;s settings.
        </p>
      </div>

      <section className="space-y-2" aria-labelledby="integrations-connected-heading">
        <h3
          id="integrations-connected-heading"
          className="text-base font-semibold tracking-tight"
        >
          Connected
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Active integrations sync on their configured schedule. Pause or
          disconnect from Manage.
        </p>
        <div className="divide-y divide-border/60 rounded-lg border border-border/80 px-4">
          {CONNECTED.map((item) => (
            <div key={item.id}>
              <IntegrationRow
                name={item.name}
                category={item.category}
                description={item.description}
                status={item.status}
                detail={item.detail}
              />
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-2" aria-labelledby="integrations-available-heading">
        <h3
          id="integrations-available-heading"
          className="text-base font-semibold tracking-tight"
        >
          Available integrations
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Add a new connection. You will be asked to authorize this workspace.
        </p>
        <div className="divide-y divide-border/60 rounded-lg border border-border/80 px-4">
          {AVAILABLE.map((item) => (
            <div key={item.id}>
              <IntegrationRow
                name={item.name}
                category={item.category}
                description={item.description}
                status={item.status}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
