import { QueryWorkspaceState } from "@/components/crm/query-workspace-state"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTasks } from "@/hooks/queries"

export default function TasksPage() {
  const { data: tasks, isPending, isError, error } = useTasks()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Tasks
        </h2>
        <p className="text-muted-foreground text-sm">
          Tasks linked to opportunities in your workspace.
        </p>
      </div>

      <QueryWorkspaceState
        isLoading={isPending}
        isError={isError}
        error={error}
        isEmpty={!tasks?.length}
        emptyMessage="No tasks yet."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Opportunity ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {task.description ?? "—"}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {task.opportunityId ?? "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryWorkspaceState>
    </div>
  )
}
