import { Card, CardContent } from "@/components/ui/card"
import { Lightning } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const quickStartCards = [
  {
    id: 1,
    name: "Welcome email",
    description: "Runs when a user signs up; sends onboarding and next-step links.",
  },
  {
    id: 2,
    name: "Order confirmed",
    description: "Runs when a user purchases an item; sends a receipt and shipping updates.",
  },
  {
    id: 3,
    name: "Profile created",
    description: "Runs when a user creates a profile; sends a welcome email and onboarding links.",
  },
] as const

export function QuickStartCards() {
  return (
    <div className="mb-5 grid grid-cols-4 gap-5">
      {quickStartCards.map((item) => (
        <Card key={item.id} size="default" className="gap-0 items-start justify-end py-3 rounded-none shadow-sm cursor-pointer">
          <CardContent className="flex items-start gap-3 px-4 py-0">
            <HugeiconsIcon strokeWidth={1.5} size={30} icon={Lightning} />
            <div>
            <p className="text-sm font-medium">
              {item.name}
            </p>
            <p className="text-md font-semibold text-muted-foreground tracking-tight tabular-nums">
              {item.description}
            </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
