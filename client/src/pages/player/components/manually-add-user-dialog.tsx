import { useId, useState } from "react"

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
import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Add01Icon, Cancel01Icon, TagsIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "NL", label: "Netherlands" },
  { value: "BR", label: "Brazil" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "NZ", label: "New Zealand" },
] as const

const TIMEZONES = [
  "UTC",
  "Pacific/Honolulu",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
] as const

type TagEntry = { id: string; key: string; value: string }

export type ManuallyAddUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManuallyAddUserDialog({
  open,
  onOpenChange,
}: ManuallyAddUserDialogProps) {
  const formId = useId()

  const [email, setEmail] = useState("")
  const [country, setCountry] = useState<string>(COUNTRIES[0].value)
  const [timezone, setTimezone] = useState<string>(TIMEZONES[0])
  const [phone, setPhone] = useState("")
  const [externalPlayerId, setExternalPlayerId] = useState("")
  const [tags, setTags] = useState<TagEntry[]>([])
  const [tagKeyInput, setTagKeyInput] = useState("")
  const [tagValueInput, setTagValueInput] = useState("")

  const tagListDescriptionId = `${formId}-tags-help`

  function reset() {
    setEmail("")
    setCountry(COUNTRIES[0].value)
    setTimezone(TIMEZONES[0])
    setPhone("")
    setExternalPlayerId("")
    setTags([])
    setTagKeyInput("")
    setTagValueInput("")
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next)
    if (!next) reset()
  }

  function addTagFromInputs() {
    const key = tagKeyInput.trim()
    if (!key) return
    const value = tagValueInput.trim()
    setTags((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key, value },
    ])
    setTagKeyInput("")
    setTagValueInput("")
  }

  function removeTag(id: string) {
    setTags((rows) => rows.filter((r) => r.id !== id))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[min(90vh,840px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex max-h-full min-h-0 flex-col"
        >
          <div className="shrink-0 space-y-1.5 px-6 pt-6 pr-14">
            <DialogHeader className="gap-0 text-left">
              <DialogTitle>Manually add user</DialogTitle>
              <DialogDescription>
                Create a single player record. Required fields are marked with
                an asterisk.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-email`}
                  className="text-sm font-medium"
                >
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <span className="text-sm font-medium">Country</span>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <span className="text-sm font-medium">Timezone</span>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-phone`}
                  className="text-sm font-medium"
                >
                  Phone number
                </label>
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                  autoComplete="tel"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor={`${formId}-external-id`}
                  className="text-sm font-medium"
                >
                  External player ID
                </label>
                <Input
                  id={`${formId}-external-id`}
                  value={externalPlayerId}
                  onChange={(e) => setExternalPlayerId(e.target.value)}
                  placeholder="e.g. CRM or legacy system id"
                  autoComplete="off"
                />
              </div>

              <Separator className="my-1" />

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Tags</p>
                  <p
                    id={tagListDescriptionId}
                    className="text-muted-foreground text-xs leading-relaxed"
                  >
                    Optional key-value pairs merged onto the player profile
                    (e.g. source, campaign, tier).
                  </p>
                </div>

                {tags.length > 0 ? (
                  <ul
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Added tags"
                  >
                    {tags.map((tag) => (
                      <li key={tag.id}>
                        <div
                          className={cn(
                            badgeVariants({ variant: "secondary" }),
                            "inline-flex min-w-[40px] max-w-full items-center gap-1.5 rounded-lg px-2 py-1 pl-1.5 pr-1 text-xs font-normal"
                          )}
                        >
                          <HugeiconsIcon
                            icon={TagsIcon}
                            strokeWidth={2}
                            className="size-3.5 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                          <span className="min-w-0 truncate font-medium">
                            {tag.key}
                          </span>
                          <span
                            className="text-muted-foreground"
                            aria-hidden
                          >
                            :
                          </span>
                          <span className="min-w-0 truncate">
                            {tag.value || "—"}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-5 shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeTag(tag.id)}
                            aria-label={`Remove tag ${tag.key}`}
                          >
                            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div
                  role="group"
                  aria-describedby={tagListDescriptionId}
                  className="space-y-2"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="grid flex-1 gap-1.5">
                      <label
                        htmlFor={`${formId}-tag-key`}
                        className="text-muted-foreground text-xs font-medium"
                      >
                        Key
                      </label>
                      <Input
                        id={`${formId}-tag-key`}
                        value={tagKeyInput}
                        onChange={(e) => setTagKeyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTagFromInputs()
                          }
                        }}
                        placeholder="e.g. tier"
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid flex-1 gap-1.5">
                      <label
                        htmlFor={`${formId}-tag-value`}
                        className="text-muted-foreground text-xs font-medium"
                      >
                        Value
                      </label>
                      <Input
                        id={`${formId}-tag-value`}
                        value={tagValueInput}
                        onChange={(e) => setTagValueInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTagFromInputs()
                          }
                        }}
                        placeholder="e.g. gold"
                        autoComplete="off"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-1.5 sm:shrink-0"
                      onClick={addTagFromInputs}
                      disabled={!tagKeyInput.trim()}
                    >
                      <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
                      Add tag
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="shrink-0 border-t border-border/60 bg-muted/20 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add user</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
