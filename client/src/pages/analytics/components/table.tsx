import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const REPORTS = [
  "Funnel overview",
  "Cohort retention",
  "Channel ROI",
  "Event quality",
  "Journey outcomes",
  "LTV by segment",
  "Attribution paths",
  "Experiment readout",
  "Email heatmap",
  "Push engagement",
  "Revenue by region",
  "Support CSAT impact",
  "Trial funnel",
  "Webhook failures",
  "Schema drift",
  "Audience overlap",
  "Campaign holdout",
  "Search zero-results",
  "API usage by key",
  "Data freshness SLA",
] as const

const rows = REPORTS.map((report, i) => ({
  id: `analytics-${i + 1}`,
  report,
  type: (["Dashboard", "Export", "Dashboard", "Alert", "Export", "Dashboard", "Export", "Dashboard", "Dashboard", "Dashboard", "Export", "Dashboard", "Export", "Alert", "Alert", "Dashboard", "Export", "Dashboard", "Export", "Alert"] as const)[i],
  lastRun: ["10m ago", "2h ago", "1d ago", "5m ago", "3d ago", "4h ago", "1w ago", "30m ago", "6h ago", "12h ago", "2d ago", "1d ago", "8h ago", "15m ago", "1h ago", "45m ago", "5d ago", "20m ago", "3h ago", "25m ago"][i],
  owner: (["Growth", "Product", "Marketing", "Data", "Lifecycle", "Finance", "Growth", "Product", "Comms", "Mobile", "Sales", "Support", "Growth", "Platform", "Data", "Marketing", "Data", "Product", "Platform", "Data"] as const)[i % 10],
  cadence: (["Live", "Daily", "Weekly", "Hourly", "Weekly", "Daily", "Weekly", "Daily", "Daily", "Daily", "Weekly", "Weekly", "Daily", "Hourly", "Hourly", "Live", "Weekly", "Live", "Daily", "Hourly"] as const)[i % 8],
  status: (["OK", "OK", "Stale", "OK", "OK", "OK", "OK", "OK", "OK", "Stale", "OK", "OK", "OK", "Warn", "Warn", "OK", "OK", "OK", "OK", "OK"] as const)[i % 11],
  audience: ["All users", "Signups", "Paid", "Pipeline", "Journeys", "Enterprise", "Organic", "Holdout", "Subscribers", "DAU", "EMEA", "Tickets", "Trials", "Prod", "Events", "Overlap", "Control", "Site", "Partners", "Warehouse"][i],
  link: (["View", "CSV", "View", "Logs", "Sheet", "View", "CSV", "View", "View", "View", "XLSX", "View", "CSV", "Pager", "Slack", "View", "CSV", "View", "JSON", "View"] as const)[i % 10],
}))

export default function AnalyticsTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Report</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Last run</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Cadence</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Audience</TableHead>
              <TableHead className="h-9 py-2">Output</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.report}</TableCell>
                <TableCell className="py-2">{row.type}</TableCell>
                <TableCell className="py-2">{row.lastRun}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.cadence}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.audience}</TableCell>
                <TableCell className="py-2">{row.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
