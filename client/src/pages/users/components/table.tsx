import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PEOPLE = [
  { name: "Alex Morgan", email: "alex.morgan@acme.io" },
  { name: "Jordan Lee", email: "jordan.lee@acme.io" },
  { name: "Sam Rivera", email: "sam.rivera@partner.co" },
  { name: "Casey Kim", email: "casey.kim@acme.io" },
  { name: "Riley Chen", email: "riley.chen@acme.io" },
  { name: "Taylor Brooks", email: "t.brooks@acme.io" },
  { name: "Morgan Patel", email: "morgan.patel@acme.io" },
  { name: "Jamie Nguyen", email: "jamie.nguyen@acme.io" },
  { name: "Quinn Foster", email: "quinn.foster@partner.co" },
  { name: "Avery Singh", email: "avery.singh@acme.io" },
  { name: "Reese Okonkwo", email: "reese.okonkwo@acme.io" },
  { name: "Skyler Diaz", email: "skyler.diaz@acme.io" },
  { name: "Blake Murphy", email: "blake.murphy@acme.io" },
  { name: "Cameron Walsh", email: "cameron.walsh@acme.io" },
  { name: "Drew Hassan", email: "drew.hassan@partner.co" },
  { name: "Emery Santos", email: "emery.santos@acme.io" },
  { name: "Finley Rao", email: "finley.rao@acme.io" },
  { name: "Harper Li", email: "harper.li@acme.io" },
  { name: "Indigo Costa", email: "indigo.costa@acme.io" },
  { name: "Jules Meyer", email: "jules.meyer@acme.io" },
] as const

const rows = PEOPLE.map((p, i) => ({
  id: `user-${i + 1}`,
  name: p.name,
  email: p.email,
  role: (["Admin", "Editor", "Viewer", "Admin", "Editor", "Viewer", "Editor", "Admin", "Viewer", "Editor", "Viewer", "Editor", "Admin", "Editor", "Viewer", "Admin", "Editor", "Viewer", "Admin", "Editor"] as const)[i],
  status: (["Active", "Active", "Invited", "Suspended", "Active", "Active", "Active", "Active", "Active", "Invited", "Active", "Active", "Active", "Paused", "Active", "Active", "Active", "Active", "Active", "Active"] as const)[i],
  lastActive: ["Now", "2h ago", "—", "30d ago", "1d ago", "45m ago", "3h ago", "Now", "5d ago", "—", "20m ago", "1w ago", "4h ago", "2d ago", "Now", "6h ago", "12h ago", "Now", "1h ago", "3d ago"][i],
  workspace: (["Acme", "Acme", "Acme", "Partner", "Acme", "Acme", "Acme", "Acme", "Partner", "Acme", "Acme", "Partner", "Acme", "Acme", "Partner", "Acme", "Acme", "Acme", "Acme", "Acme"] as const)[i],
  mfa: (["On", "On", "Off", "On", "Off", "On", "On", "On", "On", "Off", "On", "On", "On", "On", "Off", "On", "On", "Off", "On", "On"] as const)[i],
  created: ["Jan 2024", "Mar 2024", "Apr 2025", "Nov 2023", "Aug 2024", "Feb 2024", "Jun 2024", "Sep 2024", "Jan 2025", "May 2024", "Jul 2024", "Oct 2024", "Dec 2023", "Mar 2025", "Apr 2024", "Nov 2024", "Jan 2023", "Feb 2025", "Jun 2023", "Aug 2023"][i],
}))

export default function UsersTable() {
  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-muted-foreground h-9 w-10 py-2 text-center text-xs font-medium">
                #
              </TableHead>
              <TableHead className="h-9 py-2">Name</TableHead>
              <TableHead className="h-9 py-2">Email</TableHead>
              <TableHead className="h-9 py-2">Role</TableHead>
              <TableHead className="h-9 py-2">Status</TableHead>
              <TableHead className="h-9 py-2">Last active</TableHead>
              <TableHead className="h-9 py-2">Workspace</TableHead>
              <TableHead className="h-9 py-2">MFA</TableHead>
              <TableHead className="h-9 py-2">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="text-muted-foreground py-2 text-center tabular-nums">
                  {index + 1}
                </TableCell>
                <TableCell className="py-2 font-medium">{row.name}</TableCell>
                <TableCell className="py-2">{row.email}</TableCell>
                <TableCell className="py-2">{row.role}</TableCell>
                <TableCell className="py-2">{row.status}</TableCell>
                <TableCell className="py-2">{row.lastActive}</TableCell>
                <TableCell className="py-2">{row.workspace}</TableCell>
                <TableCell className="py-2">{row.mfa}</TableCell>
                <TableCell className="py-2">{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
