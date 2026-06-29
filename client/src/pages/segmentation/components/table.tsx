import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SEGMENTS = [
  "High-value purchasers",
  "Churn risk",
  "Newsletter subscribers",
  "Trial expiring",
  "EU only",
  "Mobile-first users",
  "Enterprise admins",
  "Cart abandoners (7d)",
  "Reactivated (30d)",
  "Paid social leads",
  "Content engagers",
  "Feature flag: beta UI",
  "Annual plan holders",
  "Support-heavy accounts",
  "Self-serve signup",
  "Partner referred",
  "Dormant payers",
  "NPS promoters",
  "Webhook-heavy tenants",
  "GDPR restricted region",
] as const

const rows = SEGMENTS.map((name, i) => ({
  id: `seg-${i + 1}`,
  name,
  members: ["12.4k", "3.1k", "48.2k", "890", "22.0k", "31k", "420", "5.6k", "2.2k", "8.9k", "15k", "6.4k", "1.8k", "340", "9.2k", "1.2k", "780", "4.4k", "96", "11.1k"][i],
  type: (["Behavioral", "Predictive", "Static", "Lifecycle", "Geographic", "Behavioral", "Static", "Behavioral", "Behavioral", "Attribution", "Engagement", "Feature", "Subscription", "Health", "Acquisition", "Attribution", "Lifecycle", "Survey", "Technical", "Compliance"] as const)[i],
  updated: ["2h ago", "1d ago", "3d ago", "5h ago", "1w ago", "4h ago", "2d ago", "30m ago", "6h ago", "1d ago", "12h ago", "3h ago", "5d ago", "1d ago", "45m ago", "2w ago", "4d ago", "1w ago", "20m ago", "3d ago"][i],
  owner: (["Marketing", "Growth", "Comms", "Product", "Legal", "Mobile", "Sales", "Commerce", "Lifecycle", "Growth", "Content", "Product", "Finance", "Support", "Growth", "Partners", "Finance", "CS", "Platform", "Legal"] as const)[i % 10],
  status: (["Active", "Active", "Active", "Draft", "Active", "Active", "Active", "Active", "Active", "Active", "Active", "Draft", "Active", "Active", "Active", "Active", "Paused", "Active", "Active", "Active"] as const)[i],
  rule: [
    "purchase_count ≥ 3 (90d)",
    "last_active > 21d",
    "opt_in = true",
    "trial_ends_in ≤ 3d",
    "country ∈ EU list",
    "last_platform = mobile",
    "role = admin AND plan = ent",
    "cart_added AND !purchase (7d)",
    "was_dormant AND session_7d",
    "utm_source = paid_social",
    "article_views ≥ 5 (14d)",
    "flag_beta_ui = on",
    "billing_cycle = annual",
    "tickets_30d ≥ 4",
    "signup_channel = self_serve",
    "referrer_domain ∈ partners",
    "paid AND sessions_60d = 0",
    "nps_score ≥ 9",
    "webhook_calls_24h > 10k",
    "region IN gdpr_list",
  ][i],
  channel: (["Email", "Push", "Email", "In-app", "All", "Push", "Email", "Email", "Email", "Email", "Email", "In-app", "Email", "Slack", "Email", "Email", "Email", "Email", "Webhook", "All"] as const)[i % 10],
}))

export default function SegmentationTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Segment</TableHead>
              <TableHead className="h-9 py-2">Members</TableHead>
              <TableHead className="h-9 py-2">Type</TableHead>
              <TableHead className="h-9 py-2">Last updated</TableHead>
              <TableHead className="h-9 py-2">Owner</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Rule</TableHead>
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
                <TableCell className="py-2">{row.members}</TableCell>
                <TableCell className="py-2">{row.type}</TableCell>
                <TableCell className="py-2">{row.updated}</TableCell>
                <TableCell className="py-2">{row.owner}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.rule}</TableCell>
                <TableCell className="py-2">{row.channel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
