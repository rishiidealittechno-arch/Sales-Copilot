import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAMES = [
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

const rows = NAMES.map((name, i) => ({
  id: `settings-api-${i + 1}`,
  name,
  prefix: [
    "sk_live_Ab1…",
    "sk_live_Xy9…",
    "sk_test_7Qz…",
    "sk_live_Pm2…",
    "sk_live_—",
    "sk_live_Ci0…",
    "sk_live_Sf8…",
    "sk_live_Zp4…",
    "sk_live_Mo3…",
    "sk_live_Su1…",
    "sk_live_Bl6…",
    "sk_live_Wh5…",
    "sk_live_Dd9…",
    "sk_test_Ld2…",
    "sk_test_Sb0…",
    "sk_live_Eu7…",
    "sk_live_Rr3…",
    "sk_live_La8…",
    "sk_live_Rt4…",
    "sk_live_Sc6…",
  ][i],
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
  env: (["Prod", "Prod", "Staging", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Prod", "Staging", "Sandbox", "Prod", "Prod", "Prod", "Prod", "Prod"] as const)[i % 8],
  created: ["Jan 2024", "Mar 2024", "Apr 2025", "Dec 2024", "Jun 2023", "Feb 2025", "Aug 2024", "May 2024", "Sep 2024", "Jan 2025", "Oct 2024", "Nov 2024", "Jul 2024", "Apr 2024", "Jun 2024", "Mar 2025", "Feb 2024", "Dec 2024", "Jan 2024", "Mar 2024"][i],
  lastUsed: ["2m ago", "1h ago", "3d ago", "30m ago", "—", "5m ago", "4h ago", "1d ago", "10m ago", "—", "45m ago", "2h ago", "15m ago", "—", "1w ago", "20m ago", "6h ago", "8m ago", "12h ago", "3h ago"][i],
  status: (["Active", "Active", "Active", "Restricted", "Revoked", "Active", "Active", "Active", "Active", "Restricted", "Active", "Active", "Active", "Revoked", "Active", "Active", "Active", "Active", "Active", "Active"] as const)[i],
}))

export function ApiKeyTable() {
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
              <TableHead className="h-9 py-2">Key</TableHead>
              <TableHead className="h-9 py-2">Scopes</TableHead>
              <TableHead className="h-9 py-2">Environment</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
              <TableHead className="h-9 py-2">Last used</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2 font-mono text-xs">{row.prefix}</TableCell>
                <TableCell className="max-w-[200px] truncate py-2 text-xs">
                  {row.scopes}
                </TableCell>
                <TableCell className="py-2">{row.env}</TableCell>
                <TableCell className="py-2">{row.created}</TableCell>
                <TableCell className="py-2">{row.lastUsed}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
