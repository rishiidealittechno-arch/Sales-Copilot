import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const KEYS = [
  "Production — write",
  "Analytics read-only",
  "Staging test",
  "Partner integration",
  "Revoked — mobile v1",
  "CI deploy bot",
  "Snowflake export",
  "Zapier connector",
  "Mobile app — prod",
  "Support impersonation",
  "Billing sync",
  "Webhook ingress",
  "Datadog monitor",
  "Load test key",
  "Sandbox playground",
  "EU data residency",
  "Read replica BI",
  "Lambda ingestion",
  "Retool internal",
  "Security scanner",
] as const

const rows = KEYS.map((name, i) => ({
  id: `api-${i + 1}`,
  name,
  created: ["Jan 2024", "Mar 2024", "Apr 2025", "Dec 2024", "Jun 2023", "Feb 2025", "Aug 2024", "May 2024", "Sep 2024", "Jan 2025", "Oct 2024", "Nov 2024", "Jul 2024", "Apr 2024", "Jun 2024", "Mar 2025", "Feb 2024", "Dec 2024", "Jan 2024", "Mar 2024"][i],
  lastUsed: ["2m ago", "1h ago", "3d ago", "30m ago", "—", "5m ago", "4h ago", "1d ago", "10m ago", "—", "45m ago", "2h ago", "15m ago", "—", "1w ago", "20m ago", "6h ago", "8m ago", "12h ago", "3h ago"][i],
  scopes: [
    "events:write, profiles:read",
    "events:read, segments:read",
    "events:write",
    "profiles:read",
    "—",
    "deploy:write",
    "exports:read",
    "campaigns:read",
    "events:write, push:send",
    "users:impersonate",
    "billing:read",
    "webhooks:receive",
    "metrics:read",
    "events:write",
    "sandbox:*",
    "profiles:read (EU)",
    "events:read",
    "ingest:batch",
    "internal:read",
    "security:scan",
  ][i],
  status: (["Active", "Active", "Active", "Restricted", "Revoked", "Active", "Active", "Active", "Active", "Restricted", "Active", "Active", "Active", "Revoked", "Active", "Active", "Active", "Active", "Active", "Active"] as const)[i],
  env: (["Prod", "Prod", "Staging", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Staging", "Sandbox", "Prod", "Prod", "Prod", "Prod", "Prod"] as const)[i % 8],
  rotation: ["90d", "Never", "Never", "180d", "—", "30d", "Never", "90d", "180d", "—", "Never", "Never", "Never", "—", "Never", "90d", "Never", "60d", "Never", "90d"][i],
  ipAllow: ["3 rules", "Office VPN", "Any", "Partner CIDR", "—", "GitHub IPs", "Snowflake", "Zapier", "App Store", "Break-glass", "Stripe", "Public", "Datadog", "—", "Any", "EU egress", "BI subnet", "AWS Lambda", "Retool cloud", "Scanner net"][i],
}))

export default function ApiTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Key</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
              <TableHead className="h-9 py-2">Last used</TableHead>
              <TableHead className="h-9 py-2">Scopes</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Environment</TableHead>
              <TableHead className="h-9 py-2">Rotation</TableHead>
              <TableHead className="h-9 py-2">IP allowlist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.created}</TableCell>
                <TableCell className="py-2">{row.lastUsed}</TableCell>
                <TableCell className="py-2">{row.scopes}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.env}</TableCell>
                <TableCell className="py-2">{row.rotation}</TableCell>
                <TableCell className="py-2">{row.ipAllow}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
