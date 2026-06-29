import { QueryWorkspaceState } from "@/components/crm/query-workspace-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useOpportunities } from "@/hooks/queries"

export default function OpportunitiesPage() {
  const { data: opportunities, isPending, isError, error } =
    useOpportunities()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Opportunities
        </h2>
        <p className="text-muted-foreground text-sm">
          Sales opportunities linked to accounts.
        </p>
      </div>

      <QueryWorkspaceState
        isLoading={isPending}
        isError={isError}
        error={error}
        isEmpty={!opportunities?.length}
        emptyMessage="No opportunities yet."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Close date</TableHead>
              <TableHead>Account ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities?.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell className="font-medium">{opportunity.name}</TableCell>
                <TableCell>{opportunity.stage ?? "—"}</TableCell>
                <TableCell>{opportunity.amount ?? "—"}</TableCell>
                <TableCell>{opportunity.closeDate ?? "—"}</TableCell>
                <TableCell className="font-mono text-xs">
                  {opportunity.accountId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryWorkspaceState>
    </div>
  )
}
