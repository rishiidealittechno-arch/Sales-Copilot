import { Card, CardContent } from "@/components/ui/card"
import { Lightning } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const quickStartCardsSegmentation = [
  {
    id: 1,
    name: "Balance & value tier",
    description:
      "Slice by wallet size and activity so limits, promos, and risk rules match how players actually spend.",
  },
  {
    id: 2,
    name: "Geo & jurisdiction",
    description:
      "Group by country, region, or timezone for compliance, localized offers, and support routing.",
  },
  {
    id: 3,
    name: "Acquisition & channel",
    description:
      "Build cohorts from source, campaign, or referral so you can compare ROI and tailor first-touch journeys.",
  },
] as const

export function QuickStartCards() {
  return (
    <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5">
      {quickStartCardsSegmentation.map((item) => (
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
