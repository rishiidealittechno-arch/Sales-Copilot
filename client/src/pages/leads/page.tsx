import { QueryWorkspaceState } from "@/components/crm/query-workspace-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAccounts } from "@/hooks/queries"

export default function LeadsPage() {
  const { data: accounts, isPending, isError, error } = useAccounts()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Leads
        </h2>
        <p className="text-muted-foreground text-sm">
          Accounts in your workspace shown as leads.
        </p>
      </div>

      <QueryWorkspaceState
        isLoading={isPending}
        isError={isError}
        error={error}
        isEmpty={!accounts?.length}
        emptyMessage="No accounts yet. Create one in workspace settings or via the API."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts?.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.industry ?? "—"}</TableCell>
                <TableCell>{account.website ?? "—"}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {account.description ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryWorkspaceState>
    </div>
  )
}
