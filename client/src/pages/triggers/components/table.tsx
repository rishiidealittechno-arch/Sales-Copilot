import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TRIGGER_NAMES = [
  "Welcome email",
  "Cart abandoned",
  "Re-engagement",
  "Order confirmed",
  "Segment entered",
  "Invoice paid",
  "Trial ending",
  "Password reset",
  "Slack alert — errors",
  "Webhook retry exhausted",
  "Lead score threshold",
  "Inventory low",
  "Shipment delivered",
  "Subscription canceled",
  "GDPR export ready",
  "API rate limit warning",
  "Dunning email",
  "Meeting booked",
  "Certificate expiring",
  "Data sync failed",
] as const

const rows = TRIGGER_NAMES.map((name, i) => ({
  id: `trg-${i + 1}`,
  name,
  type: (["Event", "Schedule", "Segment", "Event", "Segment", "Event", "Schedule", "Event", "Alert", "System", "Score", "Event", "Event", "Event", "System", "System", "Schedule", "Event", "Schedule", "System"] as const)[i],
  status: (["Active", "Active", "Paused", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Paused", "Active", "Draft", "Active"] as const)[i],
  lastFired: ["12m ago", "3m ago", "2d ago", "1m ago", "8m ago", "4m ago", "1h ago", "30m ago", "5m ago", "1d ago", "15m ago", "2h ago", "6h ago", "3d ago", "20m ago", "10m ago", "—", "1h ago", "—", "45m ago"][i],
  created: ["Jan 4, 2025", "Dec 18, 2024", "Nov 2, 2024", "Jan 1, 2025", "Oct 9, 2024", "Aug 14, 2024", "Sep 1, 2024", "Jan 10, 2025", "Mar 3, 2024", "Feb 2, 2025", "Jul 7, 2024", "May 5, 2024", "Jun 6, 2024", "Apr 4, 2024", "Jan 20, 2025", "Nov 11, 2024", "Dec 1, 2024", "Oct 20, 2024", "Jan 15, 2025", "Feb 28, 2025"][i],
  owner: (["Lifecycle", "Commerce", "Growth", "Ops", "Marketing", "Finance", "Growth", "Security", "Platform", "Platform", "Sales", "Ops", "Logistics", "Finance", "Legal", "Platform", "Finance", "Sales", "IT", "Data"] as const)[i % 10],
  volume: ["1.2k / 24h", "420 / 24h", "—", "8.4k / 24h", "310 / 24h", "2.1k / 24h", "88 / 24h", "640 / 24h", "12 / 24h", "3 / 24h", "54 / 24h", "29 / 24h", "5.1k / 24h", "120 / 24h", "17 / 24h", "840 / 24h", "—", "22 / 24h", "—", "9 / 24h"][i],
  channel: (["Email", "Email", "Push", "Email", "Journey", "Email", "Email", "Email", "Slack", "Webhook", "CRM", "Email", "SMS", "Email", "Email", "Email", "Email", "Calendar", "Email", "Pager"] as const)[i % 10],
}))

export default function TriggersTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Trigger</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Last fired</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Volume</TableHead>
              <TableHead className="h-9 py-2">Channel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.type}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.lastFired}</TableCell>
                <TableCell className="py-2">{row.created}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.volume}</TableCell>
                <TableCell className="py-2">{row.channel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
