import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const EVENT_NAMES = [
  "page_viewed",
  "purchase_completed",
  "email_opened",
  "experiment_exposure",
  "legacy_click",
  "signup_started",
  "checkout_started",
  "payment_failed",
  "push_delivered",
  "journey_entered",
  "segment_updated",
  "api_batch_ingest",
  "form_submitted",
  "search_performed",
  "video_played",
  "subscription_renewed",
  "refund_requested",
  "invite_sent",
  "mfa_enabled",
  "export_downloaded",
] as const

const rows = EVENT_NAMES.map((name, i) => ({
  id: `evt-${i + 1}`,
  name,
  category: (["Product", "Commerce", "Marketing", "Growth", "Marketing", "Acquisition", "Commerce", "Commerce", "Mobile", "Automation", "Data", "Platform", "Product", "Product", "Product", "Commerce", "Support", "Growth", "Security", "Platform"] as const)[i],
  volume: ["842k", "12.4k", "210k", "1.1M", "0", "44k", "8.2k", "1.1k", "320k", "18k", "2.4k", "560", "9.8k", "120k", "64k", "3.4k", "890", "4.2k", "12k", "780"][i],
  status: (["Receiving", "Receiving", "Receiving", "Receiving", "Deprecated", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving", "Receiving"] as const)[i],
  schema: (["v3", "v2", "v1", "v4", "v1", "v2", "v2", "v1", "v2", "v3", "v1", "v1", "v2", "v3", "v2", "v2", "v1", "v1", "v2", "v1"] as const)[i % 10],
  pii: (["None", "Hashed", "None", "None", "None", "None", "Hashed", "None", "None", "None", "None", "None", "None", "None", "None", "Hashed", "Hashed", "None", "None", "None"] as const)[i % 10],
  owner: (["Web", "Commerce", "Comms", "Growth", "Data", "Growth", "Commerce", "Commerce", "Mobile", "Lifecycle", "Data", "Platform", "Marketing", "Search", "Media", "Finance", "Support", "Growth", "Security", "Data"] as const)[i % 10],
  sampled: ["No", "No", "10%", "No", "—", "No", "No", "25%", "No", "No", "No", "100%", "No", "5%", "No", "No", "No", "No", "No", "No"][i],
}))

export default function EventsTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Event</TableHead>
              <TableHead className="h-9 py-2">Category</TableHead>
              <TableHead className="h-9 py-2">Volume (24h)</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Schema</TableHead>
              <TableHead className="h-9 py-2">PII</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Sampled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.category}</TableCell>
                <TableCell className="py-2">{row.volume}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.schema}</TableCell>
                <TableCell className="py-2">{row.pii}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.sampled}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
