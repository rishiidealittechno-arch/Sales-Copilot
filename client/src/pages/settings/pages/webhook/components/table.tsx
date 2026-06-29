import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAMES = [
  "Production events",
  "Staging smoke tests",
  "Zapier inbound",
  "Slack incidents",
  "Billing alerts",
  "Partner Acme",
  "Data warehouse sync",
  "Mobile analytics",
  "Security audit stream",
  "Campaign completions",
  "Journey errors",
  "Segment exports",
  "API health",
  "EU region only",
  "Load test harness",
  "PagerDuty critical",
  "Snowflake pipe",
  "Retool mutations",
  "Compliance archive",
  "Sandbox mirror",
] as const

const rows = NAMES.map((name, i) => ({
  id: `wh-${i + 1}`,
  name,
  url: [
    "https://api.acme.io/hooks/events",
    "https://hooks.stripe.com/...",
    "https://hooks.zapier.com/hooks/catch/123/abc",
    "https://hooks.slack.com/services/T00/B00/xxx",
    "https://billing.internal/hooks/notify",
    "https://partner.acme.com/webhook/v1",
    "https://snowflake.acme.io/ingest/webhook",
    "https://mobile.pipe.net/v2/webhook",
    "https://siem.vendor.net/collector",
    "https://comms.acme.io/campaign/done",
    "https://journeys.acme.io/failures",
    "https://exports.acme.io/segment-ready",
    "https://status.acme.io/ping",
    "https://eu-gateway.acme.io/hook",
    "https://k6.local/webhook",
    "https://events.pagerduty.com/...",
    "https://pipe.snowflake/notify",
    "https://retool.internal/hooks/update",
    "https://archive.legal/worm",
    "https://sandbox.acme.io/mirror",
  ][i],
  events: [
    "event.*",
    "checkout.*",
    "zapier.test",
    "incident.*",
    "invoice.paid",
    "profile.updated",
    "export.ready",
    "session.start",
    "auth.failure",
    "campaign.sent",
    "journey.error",
    "segment.build",
    "api.error_rate",
    "event.eu_only",
    "stress.*",
    "severity.critical",
    "batch.complete",
    "admin.action",
    "audit.log",
    "sandbox.*",
  ][i],
  status: (["Active", "Active", "Active", "Paused", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Draft", "Active", "Active", "Disabled", "Active", "Active", "Active", "Active", "Active"] as const)[i],
  lastDelivery: ["2m ago", "1h ago", "—", "3d ago", "30m ago", "5m ago", "4h ago", "12m ago", "1m ago", "6h ago", "45m ago", "—", "8m ago", "2h ago", "—", "1d ago", "20m ago", "3h ago", "1w ago", "15m ago"][i],
  created: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"][i],
}))

export function WebhookTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Endpoint</TableHead>
              <TableHead className="h-9 py-2">Events</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-[220px] truncate py-2 font-mono text-xs">
                  {row.url}
                </TableCell>
                <TableCell className="py-2 font-mono text-xs">{row.events}</TableCell>
                <TableCell className="py-2">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
