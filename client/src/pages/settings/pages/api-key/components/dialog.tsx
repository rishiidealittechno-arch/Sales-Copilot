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

const envOptions = [
  { value: "prod", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "sandbox", label: "Sandbox" },
] as const

export function ApiKeyDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [scopes, setScopes] = useState("events:read")
  const [environment, setEnvironment] =
    useState<(typeof envOptions)[number]["value"]>("prod")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    setName("")
    setScopes("events:read")
    setEnvironment("prod")
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Create API key
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>
              <DialogDescription>
                After creation you will see the secret once. Store it securely;
                we cannot show it again. Scope keys to the minimum access
                required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="api-key-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="api-key-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Production — write"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="api-key-environment"
                  className="text-sm font-medium"
                >
                  Environment
                </label>
                <Select
                  value={environment}
                  onValueChange={(v) =>
                    setEnvironment(
                      v as (typeof envOptions)[number]["value"]
                    )
                  }
                >
                  <SelectTrigger id="api-key-environment">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {envOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="api-key-scopes" className="text-sm font-medium">
                  Scopes
                </label>
                <Input
                  id="api-key-scopes"
                  value={scopes}
                  onChange={(e) => setScopes(e.target.value)}
                  placeholder="events:read, profiles:read"
                  required
                  autoComplete="off"
                />
                <p className="text-muted-foreground text-xs">
                  Comma-separated scope strings. Use the docs for the full list.
                </p>
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
              <Button type="submit">Create key</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
