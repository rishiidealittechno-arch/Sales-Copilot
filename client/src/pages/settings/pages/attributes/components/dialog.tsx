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
import { Switch } from "@/components/ui/switch"

const typeOptions = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "enum", label: "Enum" },
  { value: "datetime", label: "Datetime" },
] as const

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
}

export function AddAttributeDialog() {
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [fieldKey, setFieldKey] = useState("")
  const [keyTouched, setKeyTouched] = useState(false)
  const [type, setType] = useState<(typeof typeOptions)[number]["value"]>("string")
  const [description, setDescription] = useState("")
  const [pii, setPii] = useState(false)
  const [segmentFilter, setSegmentFilter] = useState(true)

  function onDisplayNameChange(value: string) {
    setDisplayName(value)
    if (!keyTouched) {
      const s = slugify(value)
      if (s) setFieldKey(s)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    setDisplayName("")
    setFieldKey("")
    setKeyTouched(false)
    setType("string")
    setDescription("")
    setPii(false)
    setSegmentFilter(true)
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add attribute
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add custom attribute</DialogTitle>
              <DialogDescription>
                Player fields you define here can be set via API or imports and
                used as filters when building segments.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="attr-label" className="text-sm font-medium">
                  Display name
                </label>
                <Input
                  id="attr-label"
                  value={displayName}
                  onChange={(e) => onDisplayNameChange(e.target.value)}
                  placeholder="e.g. VIP tier"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="attr-key" className="text-sm font-medium">
                  Field key
                </label>
                <Input
                  id="attr-key"
                  value={fieldKey}
                  onChange={(e) => {
                    setKeyTouched(true)
                    setFieldKey(e.target.value.replace(/\s/g, "_").toLowerCase())
                  }}
                  placeholder="vip_tier"
                  required
                  autoComplete="off"
                  className="font-mono text-sm"
                />
                <p className="text-muted-foreground text-xs">
                  Snake case, stable identifier for API and segment rules.
                </p>
              </div>
              <div className="grid gap-2">
                <span id="attr-type-label" className="text-sm font-medium">
                  Type
                </span>
                <Select
                  value={type}
                  onValueChange={(v) =>
                    setType(v as (typeof typeOptions)[number]["value"])
                  }
                >
                  <SelectTrigger
                    id="attr-type"
                    aria-labelledby="attr-type-label"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="attr-desc" className="text-sm font-medium">
                  Description{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  id="attr-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Shown to builders in the segment UI"
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 px-3 py-3">
                <div className="space-y-0.5 pr-2">
                  <p className="text-sm font-medium">Contains PII</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Restricts export and some integrations for this field.
                  </p>
                </div>
                <Switch checked={pii} onCheckedChange={setPii} />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 px-3 py-3">
                <div className="space-y-0.5 pr-2">
                  <p className="text-sm font-medium">Use in segment filters</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    When on, the field appears when filtering players in
                    segments.
                  </p>
                </div>
                <Switch checked={segmentFilter} onCheckedChange={setSegmentFilter} />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create attribute</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
