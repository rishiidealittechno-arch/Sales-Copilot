import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const DATA_MODELS = [
  {
    id: "player",
    name: "Player",
    description: "Core player profile and lifecycle fields",
    records: "2.4M",
    status: "Published",
  },
  {
    id: "session",
    name: "Session",
    description: "Gameplay sessions and device context",
    records: "18.1M",
    status: "Published",
  },
  {
    id: "transaction",
    name: "Transaction",
    description: "Deposits, withdrawals, and balance events",
    records: "6.8M",
    status: "Published",
  },
  {
    id: "campaign_event",
    name: "Campaign event",
    description: "Outbound sends, opens, and conversions",
    records: "42.0M",
    status: "Published",
  },
  {
    id: "segment_snapshot",
    name: "Segment snapshot",
    description: "Point-in-time audience membership rows",
    records: "890K",
    status: "Draft",
  },
] as const

export function DataModelsTable() {
  return (
    <div className="overflow-hidden rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="h-9 py-2">Model</TableHead>
            <TableHead className="h-9 py-2">Description</TableHead>
            <TableHead className="h-9 py-2">Records</TableHead>
            <TableHead className="h-9 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DATA_MODELS.map((model) => (
            <TableRow key={model.id}>
              <TableCell className="py-2">
                <div className="font-medium">{model.name}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  {model.id}
                </div>
              </TableCell>
              <TableCell className="max-w-xs py-2 text-muted-foreground">
                {model.description}
              </TableCell>
              <TableCell className="py-2 tabular-nums">{model.records}</TableCell>
              <TableCell className="py-2">
                <Badge
                  variant={
                    model.status === "Published" ? "secondary" : "outline"
                  }
                >
                  {model.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
