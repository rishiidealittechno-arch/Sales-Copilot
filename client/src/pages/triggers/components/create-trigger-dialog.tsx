import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

/** Matches campaign ids/names on the Campaigns page for the selector. */
const CAMPAIGNS = [
  "Spring launch",
  "Win-back offer",
  "Feature announcement",
  "Onboarding drip",
  "Holiday promo",
  "Flash sale 48h",
  "Referral boost",
  "Weekly product digest",
  "SMS cart reminder",
  "Webinar series invite",
  "Loyalty tier upgrade",
  "Price drop alert",
  "Dormant user rescue",
  "Cross-sell bundle",
  "App update reminder",
  "NPS survey follow-up",
  "Birthday rewards",
  "B2B nurture track",
  "Partner spotlight",
  "Policy update notice",
] as const

export function CreateTriggerDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [eventType, setEventType] = useState("")
  const [campaignId, setCampaignId] = useState<string>("")

  function reset() {
    setName("")
    setDescription("")
    setEventType("")
    setCampaignId("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    reset()
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create trigger
      </Button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create trigger</DialogTitle>
              <DialogDescription>
                Link an event type to a campaign. You can refine this later in
                trigger settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="trigger-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="trigger-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cart abandoned — reminder"
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="trigger-description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="trigger-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short summary of what this trigger does"
                  className="min-h-20 resize-y"
                />
                <p className="text-muted-foreground text-xs">
                  Shown in trigger dropdowns when someone picks a trigger
                  elsewhere in the app—keep it clear so people choose the right
                  one.
                </p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="trigger-event-type" className="text-sm font-medium">
                  Event type
                </label>
                <Input
                  id="trigger-event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g. checkout.abandoned, user.signed_up"
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <span className="text-sm font-medium">Campaign</span>
                <Select
                  value={campaignId || undefined}
                  onValueChange={setCampaignId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMPAIGNS.map((label, i) => (
                      <SelectItem key={label} value={`campaign-${i + 1}`}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create trigger</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
