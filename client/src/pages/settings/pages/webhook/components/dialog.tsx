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

export function WebhookDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [events, setEvents] = useState("event.*")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    setName("")
    setUrl("")
    setEvents("event.*")
  }

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add webhook
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add webhook</DialogTitle>
              <DialogDescription>
                We will POST JSON payloads to your HTTPS endpoint. Use a
                secret to verify signatures in your handler.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label htmlFor="webhook-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="webhook-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Production events"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="webhook-url" className="text-sm font-medium">
                  Endpoint URL
                </label>
                <Input
                  id="webhook-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="webhook-events" className="text-sm font-medium">
                  Event filter
                </label>
                <Input
                  id="webhook-events"
                  value={events}
                  onChange={(e) => setEvents(e.target.value)}
                  placeholder="event.*, campaign.sent"
                  autoComplete="off"
                />
                <p className="text-muted-foreground text-xs">
                  Comma-separated patterns; * is a wildcard.
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
              <Button type="submit">Create webhook</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
