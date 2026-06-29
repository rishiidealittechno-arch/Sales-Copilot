import { QueryWorkspaceState } from "@/components/crm/query-workspace-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeals } from "@/hooks/queries"

export default function DealsPage() {
  const { data: deals, isPending, isError, error } = useDeals()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Deals
        </h2>
        <p className="text-muted-foreground text-sm">
          Deals linked to opportunities in your workspace.
        </p>
      </div>

      <QueryWorkspaceState
        isLoading={isPending}
        isError={isError}
        error={error}
        isEmpty={!deals?.length}
        emptyMessage="No deals yet."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opportunity ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals?.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell>{deal.value ?? "—"}</TableCell>
                <TableCell>{deal.status ?? "—"}</TableCell>
                <TableCell className="font-mono text-xs">
                  {deal.opportunityId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryWorkspaceState>
    </div>
  )
}
