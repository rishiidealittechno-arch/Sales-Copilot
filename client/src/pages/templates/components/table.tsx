import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TEMPLATE_NAMES = [
  "Welcome — verify email",
  "Password reset",
  "Weekly digest",
  "Order confirmation",
  "Cart abandonment",
  "Invoice receipt",
  "Trial ending reminder",
  "Feature announcement",
  "Re-engagement offer",
  "Support ticket update",
  "Milestone celebration",
  "Security alert",
  "Newsletter — monthly",
  "Payment failed",
  "Account statement",
  "Team invite",
  "Survey follow-up",
  "Shipping notification",
  "Subscription renewed",
  "Policy update",
] as const

const rows = TEMPLATE_NAMES.map((name, i) => ({
  id: `tpl-${i + 1}`,
  name,
  subject: (["Verify your email", "Reset your password", "Your week in review", "Thanks for your order", "You left items behind", "Your receipt", "Your trial ends soon", "What’s new", "We miss you", "Ticket #{{id}} updated", "Congrats on your progress", "New sign-in detected", "The monthly roundup", "We couldn’t process payment", "Your statement is ready", "You’ve been invited", "We’d love your feedback", "Your package is on the way", "Subscription confirmed", "Important account update"] as const)[i],
  status: (["Published", "Published", "Draft", "Published", "Published", "Published", "Scheduled", "Draft", "Published", "Published", "Published", "Published", "Published", "Draft", "Published", "Published", "Draft", "Published", "Published", "Published"] as const)[i],
  updated: ["2h ago", "1d ago", "3d ago", "30m ago", "4h ago", "1w ago", "12h ago", "5d ago", "2d ago", "45m ago", "1d ago", "6h ago", "1w ago", "2d ago", "3h ago", "4d ago", "1w ago", "20m ago", "1d ago", "2w ago"][i],
  channel: "Email" as const,
}))

export default function EmailTemplatesTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Template</TableHead>
              <TableHead className="h-9 py-2">Subject</TableHead>
              <TableHead className="h-9 py-2">Channel</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-[240px] truncate py-2">
                  {row.subject}
                </TableCell>
                <TableCell className="py-2">{row.channel}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
