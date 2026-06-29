import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const JOURNEYS = [
  "Onboarding v2",
  "Post-purchase care",
  "Trial nurture",
  "Win-back",
  "Re-engagement push",
  "Lead magnet follow-up",
  "Upgrade nudge",
  "Cart rescue (SMS)",
  "Renewal reminder",
  "Feature education",
  "Abandoned form",
  "Welcome series (B2B)",
  "Loyalty milestone",
  "Sunset product notice",
  "Invoice overdue",
  "Community invite",
  "Survey thank-you",
  "Referral double-sided",
  "Security alert education",
  "Annual plan upsell",
] as const

const rows = JOURNEYS.map((name, i) => ({
  id: `journey-${i + 1}`,
  name,
  status: (["Live", "Live", "Draft", "Paused", "Live", "Live", "Live", "Live", "Scheduled", "Live", "Draft", "Live", "Live", "Draft", "Live", "Live", "Completed", "Live", "Live", "Scheduled"] as const)[i],
  entries: ["3.4k", "890", "—", "120", "2.1k", "560", "2.8k", "1.4k", "—", "6.2k", "—", "780", "340", "—", "210", "1.1k", "4.5k", "920", "3.3k", "—"][i],
  updated: ["4h ago", "1d ago", "2d ago", "1w ago", "6h ago", "12h ago", "3h ago", "45m ago", "5d ago", "1d ago", "2w ago", "8h ago", "3d ago", "1w ago", "30m ago", "2d ago", "1d ago", "4d ago", "5h ago", "2d ago"][i],
  owner: (["Lifecycle", "Commerce", "Growth", "Marketing", "Mobile", "Marketing", "Sales", "Commerce", "Finance", "Product", "Growth", "Sales", "Lifecycle", "Product", "Finance", "Community", "CS", "Growth", "Security", "Sales"] as const)[i % 10],
  steps: ["7", "4", "5", "3", "2", "6", "4", "3", "2", "5", "4", "8", "3", "2", "4", "2", "1", "5", "4", "3"][i],
  exitRate: ["18%", "9%", "—", "42%", "24%", "31%", "15%", "28%", "—", "12%", "—", "22%", "8%", "—", "55%", "19%", "4%", "33%", "17%", "—"][i],
  goal: (["Activation", "NPS", "Conversion", "Return", "Sessions", "MQL", "Expansion", "Recovery", "Cash", "Adoption", "Lead", "Activation", "Retention", "Sunset", "Payment", "Engagement", "Feedback", "Referral", "Trust", "ARR"] as const)[i % 10],
}))

export default function JourneysTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Journey</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Entries (7d)</TableHead>
              <TableHead className="h-9 py-2">Updated</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Steps</TableHead>
              <TableHead className="h-9 py-2">Exit rate</TableHead>
              <TableHead className="h-9 py-2">Goal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.entries}</TableCell>
                <TableCell className="py-2">{row.updated}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.steps}</TableCell>
                <TableCell className="py-2">{row.exitRate}</TableCell>
                <TableCell className="py-2">{row.goal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
