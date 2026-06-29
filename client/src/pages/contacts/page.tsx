import { QueryWorkspaceState } from "@/components/crm/query-workspace-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useContacts } from "@/hooks/queries"

function contactName(firstName: string | null, lastName: string | null) {
  return [firstName, lastName].filter(Boolean).join(" ") || "Unnamed contact"
}

export default function ContactsPage() {
  const { data: contacts, isPending, isError, error } = useContacts()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Contacts
        </h2>
        <p className="text-muted-foreground text-sm">
          People linked to accounts in your workspace.
        </p>
      </div>

      <QueryWorkspaceState
        isLoading={isPending}
        isError={isError}
        error={error}
        isEmpty={!contacts?.length}
        emptyMessage="No contacts yet."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Account ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts?.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  {contactName(contact.firstName, contact.lastName)}
                </TableCell>
                <TableCell>{contact.email ?? "—"}</TableCell>
                <TableCell>{contact.phone ?? "—"}</TableCell>
                <TableCell>{contact.title ?? "—"}</TableCell>
                <TableCell className="font-mono text-xs">
                  {contact.accountId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </QueryWorkspaceState>
    </div>
  )
}
