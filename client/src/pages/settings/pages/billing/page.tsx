import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const INVOICES = [
  {
    id: "inv-2026-0142",
    date: "Mar 1, 2026",
    amount: "$449.00",
    status: "Paid" as const,
  },
  {
    id: "inv-2026-0118",
    date: "Feb 1, 2026",
    amount: "$449.00",
    status: "Paid" as const,
  },
  {
    id: "inv-2026-0094",
    date: "Jan 1, 2026",
    amount: "$449.00",
    status: "Paid" as const,
  },
]

export default function BillingSettingsPage() {
  return (
    <div className="mx-start max-w-xl space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Billing</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Plans, payment method, and invoices for this workspace. Usage-based
          charges appear on your monthly statement.
        </p>
      </div>

      <section className="space-y-4" aria-labelledby="billing-plan-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h3
              id="billing-plan-heading"
              className="text-base font-semibold tracking-tight"
            >
              Current plan
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You are on the Growth plan. Renews automatically unless cancelled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm">
              Change plan
            </Button>
            <Button type="button" variant="ghost" size="sm">
              Cancel subscription
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-2xl font-semibold tracking-tight">Growth</span>
          <Badge variant="secondary" className="font-normal">
            Active
          </Badge>
        </div>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Price</dt>
            <dd className="font-medium">$449 / month</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Next renewal</dt>
            <dd className="font-medium">April 1, 2026</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Included MAU</dt>
            <dd className="font-medium">Up to 250,000</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Overage (est.)</dt>
            <dd className="font-medium">$12.40 this period</dd>
          </div>
        </dl>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="billing-payment-heading">
        <h3
          id="billing-payment-heading"
          className="text-base font-semibold tracking-tight"
        >
          Payment method
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Charges are billed to the card on file. Update details before renewal
          if your card expires.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-muted-foreground">Expires 09 / 2027</p>
          </div>
          <Button type="button" variant="outline" size="sm">
            Update payment method
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="billing-contact-heading">
        <h3
          id="billing-contact-heading"
          className="text-base font-semibold tracking-tight"
        >
          Billing contacts
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Invoices and payment receipts are sent to this address.
        </p>
        <p className="text-sm font-medium">finance@acmegaming.example</p>
        <Button type="button" variant="outline" size="sm">
          Edit billing email
        </Button>
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="billing-invoices-heading">
        <div className="space-y-1">
          <h3
            id="billing-invoices-heading"
            className="text-base font-semibold tracking-tight"
          >
            Invoice history
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Download PDFs for your records. Charges typically post within 24
            hours of the invoice date.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-0">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="pr-0 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-xs pl-0">{inv.id}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {inv.amount}
                </TableCell>
                <TableCell className="pr-0 text-right">
                  <Badge variant="secondary" className="font-normal">
                    {inv.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="button" variant="ghost" size="sm" className="px-0">
          View all invoices
        </Button>
      </section>
    </div>
  )
}
