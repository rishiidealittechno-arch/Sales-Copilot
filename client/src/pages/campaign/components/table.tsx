import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const CAMPAIGNS = [
  "Spring launch",
  "Win-back offer",
  "Feature announcement",
  "Onboarding drip",
  "Holiday promo",
  "Flash sale 48h",
  "Referral boost",
  "Weekly product digest",
  "SMS cart reminder",
  "Webinar series invite",
  "Loyalty tier upgrade",
  "Price drop alert",
  "Dormant user rescue",
  "Cross-sell bundle",
  "App update reminder",
  "NPS survey follow-up",
  "Birthday rewards",
  "B2B nurture track",
  "Partner spotlight",
  "Policy update notice",
] as const

const rows = CAMPAIGNS.map((name, i) => ({
  id: `campaign-${i + 1}`,
  name,
  channel: (["Email", "SMS", "Email", "Email", "Push", "Email", "In-app", "Email", "SMS", "Email", "Email", "Push", "Email", "Email", "Push", "Email", "Email", "Email", "Email", "Email"] as const)[i],
  status: (["Running", "Scheduled", "Completed", "Running", "Draft", "Running", "Active", "Scheduled", "Running", "Completed", "Running", "Running", "Paused", "Draft", "Scheduled", "Running", "Scheduled", "Running", "Draft", "Completed"] as const)[i],
  sent: ["54.2k", "—", "120k", "8.9k", "—", "22k", "—", "—", "18k", "65k", "12k", "40k", "—", "—", "—", "34k", "—", "9k", "—", "200k"][i],
  opened: ["24%", "—", "31%", "42%", "—", "19%", "—", "28%", "36%", "22%", "45%", "12%", "—", "—", "—", "18%", "—", "33%", "—", "41%"][i],
  owner: (["Marketing", "Growth", "Product", "Lifecycle", "Marketing", "Commerce", "Growth", "Product", "Commerce", "Marketing", "Lifecycle", "Commerce", "Marketing", "Sales", "Mobile", "CS", "Lifecycle", "Sales", "Partners", "Legal"] as const)[i % 10],
  updated: ["1h ago", "3h ago", "2d ago", "30m ago", "5d ago", "15m ago", "1d ago", "4h ago", "20m ago", "1w ago", "6h ago", "45m ago", "2w ago", "3d ago", "1d ago", "2h ago", "1w ago", "5d ago", "4d ago", "6d ago"][i],
  goal: (["Conversions", "Reactivation", "Adoption", "Activation", "Revenue", "Revenue", "Acquisition", "Retention", "Recovery", "Leads", "LTV", "Commerce", "Reactivation", "Cross-sell", "Adoption", "Feedback", "Engagement", "Pipeline", "Brand", "Compliance"] as const)[i % 10],
}))

export default function CampaignTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Campaign</TableHead>
              <TableHead className="h-9 py-2">Channel</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Sent</TableHead>
              <TableHead className="h-9 py-2">Opened</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Updated</TableHead>
              <TableHead className="h-9 py-2">Goal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow onClick={()=>{window.location.href = `/campaign-details`}} key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.channel}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.sent}</TableCell>
                <TableCell className="py-2">{row.opened}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.updated}</TableCell>
                <TableCell className="py-2">{row.goal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
