import { CheckIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type PlanId = "starter" | "growth" | "enterprise"

type Plan = {
  id: PlanId
  name: string
  description: string
  price: string
  priceDetail: string
  features: string[]
  cta: string
  highlighted?: boolean
  current?: boolean
}

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals and small teams getting started.",
    price: "$0",
    priceDetail: "Free forever",
    features: [
      "Up to 3 team members",
      "1,000 AI credits per month",
      "5,000 CRM records",
      "Core CRM modules",
      "Email support",
    ],
    cta: "Downgrade",
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing teams that need scale and automation.",
    price: "$449",
    priceDetail: "per month, billed monthly",
    features: [
      "Up to 25 team members",
      "50,000 AI credits per month",
      "250,000 MAU included",
      "Webhooks & API access",
      "Priority support",
    ],
    highlighted: true,
    current: true,
    cta: "Current plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced security needs.",
    price: "Custom",
    priceDetail: "Annual contracts available",
    features: [
      "Unlimited team members",
      "Custom AI credit allocation",
      "SSO & advanced security",
      "Dedicated success manager",
      "SLA & custom contracts",
    ],
    cta: "Contact sales",
  },
]

const COMPARISON_ROWS: {
  label: string
  starter: string
  growth: string
  enterprise: string
}[] = [
  {
    label: "Team members",
    starter: "Up to 3",
    growth: "Up to 25",
    enterprise: "Unlimited",
  },
  {
    label: "AI credits / month",
    starter: "1,000",
    growth: "50,000",
    enterprise: "Custom",
  },
  {
    label: "Included MAU",
    starter: "—",
    growth: "250,000",
    enterprise: "Custom",
  },
  {
    label: "CRM records",
    starter: "5,000",
    growth: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    label: "API & webhooks",
    starter: "—",
    growth: "Included",
    enterprise: "Included",
  },
  {
    label: "SSO",
    starter: "—",
    growth: "—",
    enterprise: "Included",
  },
  {
    label: "Support",
    starter: "Email",
    growth: "Priority",
    enterprise: "Dedicated",
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col",
        plan.highlighted && "ring-2 ring-primary shadow-md",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{plan.name}</CardTitle>
          {plan.current ? (
            <Badge variant="secondary" className="shrink-0 font-normal">
              Current plan
            </Badge>
          ) : null}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6">
        <div>
          <p className="text-3xl font-semibold tracking-tight">{plan.price}</p>
          <p className="text-muted-foreground mt-1 text-sm">{plan.priceDetail}</p>
        </div>
        <ul className="space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <HugeiconsIcon
                icon={CheckIcon}
                className="mt-0.5 size-4 shrink-0 text-primary"
                strokeWidth={2}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          type="button"
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
          size="sm"
          disabled={plan.current}
        >
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function PlansPage() {
  return (
    <div className="mx-start max-w-5xl space-y-10">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Plans</h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Compare workspace plans and choose the right level of credits, seats,
          and support. Changes take effect at the start of your next billing
          cycle.
        </p>
      </div>

      <section
        className="grid gap-4 lg:grid-cols-3"
        aria-labelledby="plans-grid-heading"
      >
        <h3 id="plans-grid-heading" className="sr-only">
          Available plans
        </h3>
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="plans-compare-heading">
        <div className="space-y-1">
          <h3
            id="plans-compare-heading"
            className="text-base font-semibold tracking-tight"
          >
            Compare plans
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A quick overview of what&apos;s included in each tier.
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg ">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%] pl-4">Feature</TableHead>
                <TableHead>Starter</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead className="pr-4">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARISON_ROWS.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="pl-4 font-medium">{row.label}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.starter}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.growth}
                  </TableCell>
                  <TableCell className="pr-4 text-muted-foreground">
                    {row.enterprise}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Separator />

      <section className="space-y-2" aria-labelledby="plans-billing-heading">
        <h3
          id="plans-billing-heading"
          className="text-base font-semibold tracking-tight"
        >
          Billing & invoices
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Payment methods, renewal dates, and invoice history are managed on
          the billing page.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/settings/billing">Go to billing</Link>
        </Button>
      </section>
    </div>
  )
}
